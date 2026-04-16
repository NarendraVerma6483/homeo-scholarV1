import Map "mo:core/Map";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";

import Common "../types/common";
import SpacedRepTypes "../types/spaced-rep";

module {
  public type SpacedRepCard = SpacedRepTypes.SpacedRepCard;

  let NANOS_PER_DAY : Int = 86_400_000_000_000;

  // Builds composite key for store lookup
  public func cardKey(userId : Principal, remedyId : Text) : Text {
    userId.toText() # "#" # remedyId;
  };

  // Returns all cards due for review (dueDate <= now) for the given user
  public func getDueCards(
    store : Map.Map<Text, SpacedRepCard>,
    userId : Principal,
    now : Common.Timestamp,
  ) : [SpacedRepCard] {
    store.entries()
      .filterMap<(Text, SpacedRepCard), SpacedRepCard>(func((_k, card) : (Text, SpacedRepCard)) : ?SpacedRepCard {
        if (card.userId == userId and card.dueDate <= now) { ?card } else { null }
      })
      .toArray();
  };

  // Returns all cards for the given user
  public func getAllCards(
    store : Map.Map<Text, SpacedRepCard>,
    userId : Principal,
  ) : [SpacedRepCard] {
    store.entries()
      .filterMap<(Text, SpacedRepCard), SpacedRepCard>(func((_k, card) : (Text, SpacedRepCard)) : ?SpacedRepCard {
        if (card.userId == userId) { ?card } else { null }
      })
      .toArray();
  };

  // Records a review using SM-2 algorithm; quality 0-5 (0-2 = wrong, 3-5 = correct)
  // Returns the updated card
  public func recordReview(
    store : Map.Map<Text, SpacedRepCard>,
    userId : Principal,
    remedyId : Text,
    quality : Nat,
    now : Common.Timestamp,
  ) : SpacedRepCard {
    let key = cardKey(userId, remedyId);
    let existing = switch (store.get(key)) {
      case (?card) card;
      case null Runtime.trap("Card not found for remedy: " # remedyId);
    };

    let updatedCard : SpacedRepCard = if (quality >= 3) {
      // Correct answer: advance interval using SM-2
      let prevIntervalFloat = existing.intervalDays.toFloat();
      let rawIntervalFloat = Float.nearest(prevIntervalFloat * existing.easeFactor);
      let rawIntervalInt = rawIntervalFloat.toInt();
      let newInterval : Nat = if (rawIntervalInt >= 1) { rawIntervalInt.toNat() } else { 1 };
      let qualityDiff = 5 - quality; // 0..2 (quality is 3..5, so this is Nat subtraction safe)
      let easeDelta = 0.1 - qualityDiff.toFloat() * 0.08;
      let newEase = Float.max(1.3, existing.easeFactor + easeDelta);
      let dueDate : Common.Timestamp = now + Int.fromNat(newInterval) * NANOS_PER_DAY;
      {
        existing with
        intervalDays = newInterval;
        easeFactor = newEase;
        repetitions = existing.repetitions + 1;
        lastReviewed = now;
        dueDate = dueDate;
      }
    } else {
      // Wrong answer: reset interval and reduce ease
      let newEase = Float.max(1.3, existing.easeFactor - 0.2);
      let dueDate : Common.Timestamp = now + NANOS_PER_DAY;
      {
        existing with
        intervalDays = 1;
        easeFactor = newEase;
        repetitions = 0;
        lastReviewed = now;
        dueDate = dueDate;
      }
    };

    store.add(key, updatedCard);
    updatedCard;
  };

  // Creates cards for all remedy IDs for the given user if they don't already exist
  public func initializeCards(
    store : Map.Map<Text, SpacedRepCard>,
    userId : Principal,
    remedyIds : [Text],
    now : Common.Timestamp,
  ) : () {
    for (remedyId in remedyIds.values()) {
      let key = cardKey(userId, remedyId);
      switch (store.get(key)) {
        case (?_) (); // already exists, skip
        case null {
          let card : SpacedRepCard = {
            remedyId = remedyId;
            userId = userId;
            dueDate = now;
            intervalDays = 1;
            easeFactor = 2.5;
            repetitions = 0;
            lastReviewed = now;
          };
          store.add(key, card);
        };
      };
    };
  };
};
