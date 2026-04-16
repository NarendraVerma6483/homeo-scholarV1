import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  FlaskConical,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { useIsBookmarked, useToggleBookmark } from "../hooks/useBookmarks";
import type { Remedy } from "../types";

const KINGDOM_COLORS: Record<string, string> = {
  Mineral: "bg-muted text-muted-foreground border-border",
  Plant: "bg-primary/10 text-primary border-primary/20",
  Animal: "bg-accent/10 text-accent-foreground border-accent/20",
};

interface RemedyCardProps {
  remedy: Remedy;
  index?: number;
  className?: string;
  compact?: boolean;
}

export function RemedyCard({
  remedy,
  index,
  className,
  compact = false,
}: RemedyCardProps) {
  const { isAuthenticated } = useAuth();
  const isBookmarked = useIsBookmarked(remedy.id);
  const toggleBookmark = useToggleBookmark();

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.info("Log in to save bookmarks");
      return;
    }
    try {
      const result = await toggleBookmark.mutateAsync(remedy.id);
      toast.success(result ? "Remedy bookmarked" : "Bookmark removed");
    } catch {
      toast.error("Failed to update bookmark");
    }
  };

  const kingdomClass = KINGDOM_COLORS[remedy.kingdom] ?? KINGDOM_COLORS.Mineral;

  return (
    <Link
      to="/remedy/$id"
      params={{ id: remedy.id }}
      data-ocid={`remedy.item.${index ?? 1}`}
      className={cn(
        "group block rounded-lg border border-border bg-card shadow-medical-sm",
        "hover:shadow-medical-md hover:border-primary/30 transition-smooth",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <FlaskConical className="h-4 w-4 text-primary shrink-0" />
              <h3 className="font-display font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200">
                {remedy.name}
              </h3>
            </div>
            {remedy.commonName && (
              <p className="text-body-sm text-muted-foreground ml-6 truncate">
                {remedy.commonName}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge
              variant="outline"
              className={cn("text-xs font-medium", kingdomClass)}
            >
              {remedy.kingdom}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full opacity-60 group-hover:opacity-100 transition-smooth"
              onClick={handleBookmark}
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              data-ocid={`remedy.bookmark_button.${index ?? 1}`}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Bookmark className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>

        {!compact && (
          <>
            <ul className="mt-3 space-y-1">
              {remedy.keySymptomsPhysical.slice(0, 3).map((s) => (
                <li
                  key={s}
                  className="text-body-sm text-muted-foreground flex items-start gap-1.5"
                >
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary/60 shrink-0" />
                  <span className="line-clamp-1">{s}</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {remedy.clinicalIndications.slice(0, 3).map((indication) => (
                <Badge key={indication} variant="secondary" className="text-xs">
                  {indication}
                </Badge>
              ))}
            </div>
          </>
        )}

        <div className="mt-3 flex items-center justify-between">
          <p className="text-body-sm text-muted-foreground">
            {remedy.keySymptomsPhysical.length +
              remedy.keySymptomsEmotional.length}{" "}
            symptoms
          </p>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-smooth" />
        </div>
      </div>
    </Link>
  );
}

export function RemedyCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card shadow-medical-sm p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="space-y-1.5 mb-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
      <div className="flex gap-1.5">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  );
}
