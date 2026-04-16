var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a;
import { ac as ProtocolError, ad as TimeoutWaitingForResponseErrorCode, ae as utf8ToBytes, af as ExternalError, ag as MissingRootKeyErrorCode, ah as Certificate, ai as lookupResultToBuffer, aj as RequestStatusResponseStatus, ak as UnknownError, al as RequestStatusDoneNoReplyErrorCode, am as RejectError, an as CertifiedRejectErrorCode, ao as UNREACHABLE_ERROR, ap as InputError, aq as InvalidReadStateRequestErrorCode, ar as ReadRequestType, E as Principal, as as IDL, at as MissingCanisterIdErrorCode, au as HttpAgent, av as encode, aw as QueryResponseStatus, ax as UncertifiedRejectErrorCode, ay as isV3ResponseBody, az as isV2ResponseBody, aA as UncertifiedRejectUpdateErrorCode, aB as UnexpectedErrorCode, aC as decode, a5 as Subscribable, aD as pendingThenable, aE as resolveEnabled, a6 as shallowEqualObjects, aF as resolveStaleTime, aa as noop, aG as environmentManager, aH as isValidTimeout, aI as timeUntilStale, aJ as timeoutManager, aK as focusManager, aL as fetchState, aM as replaceData, a9 as notifyManager, r as reactExports, ab as shouldThrowError, k as useQueryClient, aN as useInternetIdentity, aO as createActorWithConfig, aP as Record, aQ as Vec, aR as Opt, aS as Variant, aT as Service, aU as Func, aV as Text, aW as Nat, aX as Null, aY as Float64, aZ as Int, a_ as Principal$1, a$ as Bool } from "./index-DkGDOaWJ.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a2;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a2 = agent.createReadStateRequest) == null ? void 0 : _a2.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a2, _b;
      options = {
        ...options,
        ...(_b = (_a2 = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a2, _b;
      options = {
        ...options,
        ...(_b = (_a2 = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout2 = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout2));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
function hasAccessControl(actor) {
  return typeof actor === "object" && actor !== null && "_initializeAccessControl" in actor;
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity, isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actorOptions = {
        agentOptions: {
          identity
        }
      };
      const actor = await createActorWithConfig(createActor2, actorOptions);
      if (hasAccessControl(actor)) {
        await actor._initializeAccessControl();
      }
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
const AphorismInput = Record({
  "id": Opt(Nat),
  "keyThemes": Vec(Text),
  "section": Text,
  "number": Nat,
  "authenticText": Text,
  "commentary": Text
});
const RepertoryRemedy = Record({
  "remedyName": Text,
  "grade": Nat,
  "notes": Text,
  "remedyId": Text
});
const RepertoryEntryInput = Record({
  "id": Opt(Text),
  "description": Text,
  "symptomCategory": Text,
  "symptomName": Text,
  "remedies": Vec(RepertoryRemedy)
});
const MateriaSource = Variant({
  "boericke": Null,
  "allensKeynotes": Null,
  "lotus": Null
});
const SourcedRemedyModalities = Record({
  "better": Vec(Text),
  "worse": Vec(Text)
});
const SourcedRemedyInput = Record({
  "id": Opt(Text),
  "latinName": Text,
  "clinicalUses": Vec(Text),
  "source": MateriaSource,
  "physicalSymptoms": Vec(Text),
  "name": Text,
  "keynotes": Vec(Text),
  "modalities": SourcedRemedyModalities,
  "mentalSymptoms": Vec(Text),
  "constitution": Text,
  "remedyId": Text
});
const Timestamp = Int;
const SpacedRepCard = Record({
  "lastReviewed": Timestamp,
  "userId": Principal$1,
  "dueDate": Timestamp,
  "intervalDays": Nat,
  "remedyId": Text,
  "easeFactor": Float64,
  "repetitions": Nat
});
const Aphorism = Record({
  "id": Nat,
  "keyThemes": Vec(Text),
  "section": Text,
  "number": Nat,
  "authenticText": Text,
  "commentary": Text
});
const Time = Int;
const SavedCase = Record({
  "id": Text,
  "matchingRemedies": Vec(Text),
  "userId": Text,
  "name": Text,
  "createdAt": Time,
  "updatedAt": Time,
  "selectedSymptoms": Vec(Text),
  "clinicalNotes": Text
});
const Difficulty = Variant({
  "intermediate": Null,
  "beginner": Null,
  "advanced": Null
});
const LeaderboardEntry = Record({
  "total": Nat,
  "displayName": Text,
  "userId": Principal$1,
  "difficulty": Difficulty,
  "score": Nat,
  "timestamp": Timestamp,
  "percentage": Float64
});
const ThemePreference = Variant({
  "dark": Null,
  "light": Null
});
const UserProfile = Record({
  "principal": Principal$1,
  "displayName": Text,
  "createdAt": Timestamp,
  "themePreference": ThemePreference
});
const QuizAttempt = Record({
  "total": Nat,
  "attemptId": Text,
  "userId": Principal$1,
  "difficulty": Difficulty,
  "score": Nat,
  "timestamp": Timestamp,
  "timeSecs": Nat
});
const RemedyProgress = Record({
  "userId": Principal$1,
  "lastStudied": Timestamp,
  "incorrectCount": Nat,
  "correctCount": Nat,
  "remedyId": Text
});
const StudyMode = Variant({
  "flashcard": Null,
  "quiz": Null
});
const StudySession = Record({
  "durationSecs": Nat,
  "userId": Principal$1,
  "mode": StudyMode,
  "remedyIds": Vec(Text),
  "timestamp": Timestamp,
  "sessionId": Text,
  "accuracy": Float64
});
const UserStats = Record({
  "averageAccuracy": Float64,
  "totalSessions": Nat,
  "totalStudyTimeSecs": Nat
});
const Remedy = Record({
  "id": Text,
  "keySymptoms": Vec(Text),
  "latinName": Text,
  "physicalSymptoms": Vec(Text),
  "name": Text,
  "description": Text,
  "modalities": Text,
  "mentalPicture": Text,
  "category": Text,
  "clinicalNotes": Text
});
const RepertoryEntry = Record({
  "id": Text,
  "description": Text,
  "symptomCategory": Text,
  "symptomName": Text,
  "remedies": Vec(RepertoryRemedy)
});
const SourcedRemedy = Record({
  "id": Text,
  "latinName": Text,
  "clinicalUses": Vec(Text),
  "source": MateriaSource,
  "physicalSymptoms": Vec(Text),
  "name": Text,
  "keynotes": Vec(Text),
  "modalities": SourcedRemedyModalities,
  "mentalSymptoms": Vec(Text),
  "constitution": Text,
  "remedyId": Text
});
Service({
  "adminBulkImportAphorisms": Func(
    [Vec(AphorismInput)],
    [Nat],
    []
  ),
  "adminBulkImportRepertoryEntries": Func(
    [Vec(RepertoryEntryInput)],
    [Nat],
    []
  ),
  "adminBulkImportSourcedRemedies": Func(
    [Vec(SourcedRemedyInput)],
    [Nat],
    []
  ),
  "adminDeleteAphorism": Func([Nat], [Bool], []),
  "adminDeleteRepertoryEntry": Func([Text], [Bool], []),
  "adminDeleteSourcedRemedy": Func([Text], [Bool], []),
  "adminUpsertAphorism": Func([AphorismInput], [Nat], []),
  "adminUpsertRepertoryEntry": Func([RepertoryEntryInput], [Text], []),
  "adminUpsertSourcedRemedy": Func([SourcedRemedyInput], [Text], []),
  "bootstrapAdmin": Func([], [Bool], []),
  "deleteCase": Func([Text], [Bool], []),
  "deleteRemedy": Func([Text], [], []),
  "getAdminList": Func([], [Vec(Principal$1)], []),
  "getAllCards": Func([], [Vec(SpacedRepCard)], ["query"]),
  "getAphorism": Func([Nat], [Opt(Aphorism)], ["query"]),
  "getCaseById": Func([Text], [Opt(SavedCase)], ["query"]),
  "getDueCards": Func([], [Vec(SpacedRepCard)], ["query"]),
  "getLeaderboard": Func(
    [Difficulty],
    [Vec(LeaderboardEntry)],
    ["query"]
  ),
  "getMyBookmarks": Func([], [Vec(Text)], ["query"]),
  "getMyProfile": Func([], [Opt(UserProfile)], ["query"]),
  "getMyQuizHistory": Func([], [Vec(QuizAttempt)], ["query"]),
  "getMyRemedyProgress": Func([], [Vec(RemedyProgress)], ["query"]),
  "getMySessions": Func([], [Vec(StudySession)], ["query"]),
  "getMyStats": Func([], [UserStats], ["query"]),
  "getRemedy": Func([Text], [Opt(Remedy)], ["query"]),
  "getRepertoryEntry": Func(
    [Text],
    [Opt(RepertoryEntry)],
    ["query"]
  ),
  "getSourcedRemedy": Func(
    [Text],
    [Opt(SourcedRemedy)],
    ["query"]
  ),
  "grantAdmin": Func([Principal$1], [Bool], []),
  "initializeCards": Func([], [], []),
  "isAdmin": Func([], [Bool], ["query"]),
  "listAphorisms": Func([], [Vec(Aphorism)], ["query"]),
  "listMyCases": Func([], [Vec(SavedCase)], ["query"]),
  "listRemedies": Func([], [Vec(Remedy)], ["query"]),
  "listRepertoryEntries": Func([], [Vec(RepertoryEntry)], ["query"]),
  "listSourcedRemedies": Func([], [Vec(SourcedRemedy)], ["query"]),
  "listSourcedRemediesBySource": Func(
    [MateriaSource],
    [Vec(SourcedRemedy)],
    ["query"]
  ),
  "listSourcesByRemedyName": Func(
    [Text],
    [Vec(SourcedRemedy)],
    ["query"]
  ),
  "recordReview": Func([Text, Nat], [SpacedRepCard], []),
  "registerUser": Func([Text], [], []),
  "revokeAdmin": Func([Principal$1], [Bool], []),
  "saveCaseAnalysis": Func(
    [Text, Vec(Text), Text, Vec(Text)],
    [Text],
    []
  ),
  "saveQuizAttempt": Func([QuizAttempt], [], []),
  "saveStudySession": Func([StudySession], [], []),
  "searchAphorisms": Func([Text], [Vec(Aphorism)], ["query"]),
  "searchMyCases": Func([Text], [Vec(SavedCase)], ["query"]),
  "searchRemediesByName": Func([Text], [Vec(Remedy)], ["query"]),
  "searchRemediesBySymptom": Func(
    [Text],
    [Vec(Remedy)],
    ["query"]
  ),
  "searchRepertory": Func(
    [Text],
    [Vec(RepertoryEntry)],
    ["query"]
  ),
  "seedOrganon": Func([], [], []),
  "seedRemedies": Func([], [], []),
  "seedRepertory": Func([], [], []),
  "seedSourcedRemedies": Func([], [], []),
  "submitLeaderboardEntry": Func(
    [Text, Nat, Nat, Difficulty],
    [],
    []
  ),
  "toggleBookmark": Func([Text], [], []),
  "updateCase": Func([Text, Text, Text], [Bool], []),
  "updateRemedyProgress": Func([Text, Bool], [], []),
  "upsertRemedy": Func([Remedy], [], [])
});
const idlFactory = ({ IDL: IDL2 }) => {
  const AphorismInput2 = IDL2.Record({
    "id": IDL2.Opt(IDL2.Nat),
    "keyThemes": IDL2.Vec(IDL2.Text),
    "section": IDL2.Text,
    "number": IDL2.Nat,
    "authenticText": IDL2.Text,
    "commentary": IDL2.Text
  });
  const RepertoryRemedy2 = IDL2.Record({
    "remedyName": IDL2.Text,
    "grade": IDL2.Nat,
    "notes": IDL2.Text,
    "remedyId": IDL2.Text
  });
  const RepertoryEntryInput2 = IDL2.Record({
    "id": IDL2.Opt(IDL2.Text),
    "description": IDL2.Text,
    "symptomCategory": IDL2.Text,
    "symptomName": IDL2.Text,
    "remedies": IDL2.Vec(RepertoryRemedy2)
  });
  const MateriaSource2 = IDL2.Variant({
    "boericke": IDL2.Null,
    "allensKeynotes": IDL2.Null,
    "lotus": IDL2.Null
  });
  const SourcedRemedyModalities2 = IDL2.Record({
    "better": IDL2.Vec(IDL2.Text),
    "worse": IDL2.Vec(IDL2.Text)
  });
  const SourcedRemedyInput2 = IDL2.Record({
    "id": IDL2.Opt(IDL2.Text),
    "latinName": IDL2.Text,
    "clinicalUses": IDL2.Vec(IDL2.Text),
    "source": MateriaSource2,
    "physicalSymptoms": IDL2.Vec(IDL2.Text),
    "name": IDL2.Text,
    "keynotes": IDL2.Vec(IDL2.Text),
    "modalities": SourcedRemedyModalities2,
    "mentalSymptoms": IDL2.Vec(IDL2.Text),
    "constitution": IDL2.Text,
    "remedyId": IDL2.Text
  });
  const Timestamp2 = IDL2.Int;
  const SpacedRepCard2 = IDL2.Record({
    "lastReviewed": Timestamp2,
    "userId": IDL2.Principal,
    "dueDate": Timestamp2,
    "intervalDays": IDL2.Nat,
    "remedyId": IDL2.Text,
    "easeFactor": IDL2.Float64,
    "repetitions": IDL2.Nat
  });
  const Aphorism2 = IDL2.Record({
    "id": IDL2.Nat,
    "keyThemes": IDL2.Vec(IDL2.Text),
    "section": IDL2.Text,
    "number": IDL2.Nat,
    "authenticText": IDL2.Text,
    "commentary": IDL2.Text
  });
  const Time2 = IDL2.Int;
  const SavedCase2 = IDL2.Record({
    "id": IDL2.Text,
    "matchingRemedies": IDL2.Vec(IDL2.Text),
    "userId": IDL2.Text,
    "name": IDL2.Text,
    "createdAt": Time2,
    "updatedAt": Time2,
    "selectedSymptoms": IDL2.Vec(IDL2.Text),
    "clinicalNotes": IDL2.Text
  });
  const Difficulty2 = IDL2.Variant({
    "intermediate": IDL2.Null,
    "beginner": IDL2.Null,
    "advanced": IDL2.Null
  });
  const LeaderboardEntry2 = IDL2.Record({
    "total": IDL2.Nat,
    "displayName": IDL2.Text,
    "userId": IDL2.Principal,
    "difficulty": Difficulty2,
    "score": IDL2.Nat,
    "timestamp": Timestamp2,
    "percentage": IDL2.Float64
  });
  const ThemePreference2 = IDL2.Variant({
    "dark": IDL2.Null,
    "light": IDL2.Null
  });
  const UserProfile2 = IDL2.Record({
    "principal": IDL2.Principal,
    "displayName": IDL2.Text,
    "createdAt": Timestamp2,
    "themePreference": ThemePreference2
  });
  const QuizAttempt2 = IDL2.Record({
    "total": IDL2.Nat,
    "attemptId": IDL2.Text,
    "userId": IDL2.Principal,
    "difficulty": Difficulty2,
    "score": IDL2.Nat,
    "timestamp": Timestamp2,
    "timeSecs": IDL2.Nat
  });
  const RemedyProgress2 = IDL2.Record({
    "userId": IDL2.Principal,
    "lastStudied": Timestamp2,
    "incorrectCount": IDL2.Nat,
    "correctCount": IDL2.Nat,
    "remedyId": IDL2.Text
  });
  const StudyMode2 = IDL2.Variant({ "flashcard": IDL2.Null, "quiz": IDL2.Null });
  const StudySession2 = IDL2.Record({
    "durationSecs": IDL2.Nat,
    "userId": IDL2.Principal,
    "mode": StudyMode2,
    "remedyIds": IDL2.Vec(IDL2.Text),
    "timestamp": Timestamp2,
    "sessionId": IDL2.Text,
    "accuracy": IDL2.Float64
  });
  const UserStats2 = IDL2.Record({
    "averageAccuracy": IDL2.Float64,
    "totalSessions": IDL2.Nat,
    "totalStudyTimeSecs": IDL2.Nat
  });
  const Remedy2 = IDL2.Record({
    "id": IDL2.Text,
    "keySymptoms": IDL2.Vec(IDL2.Text),
    "latinName": IDL2.Text,
    "physicalSymptoms": IDL2.Vec(IDL2.Text),
    "name": IDL2.Text,
    "description": IDL2.Text,
    "modalities": IDL2.Text,
    "mentalPicture": IDL2.Text,
    "category": IDL2.Text,
    "clinicalNotes": IDL2.Text
  });
  const RepertoryEntry2 = IDL2.Record({
    "id": IDL2.Text,
    "description": IDL2.Text,
    "symptomCategory": IDL2.Text,
    "symptomName": IDL2.Text,
    "remedies": IDL2.Vec(RepertoryRemedy2)
  });
  const SourcedRemedy2 = IDL2.Record({
    "id": IDL2.Text,
    "latinName": IDL2.Text,
    "clinicalUses": IDL2.Vec(IDL2.Text),
    "source": MateriaSource2,
    "physicalSymptoms": IDL2.Vec(IDL2.Text),
    "name": IDL2.Text,
    "keynotes": IDL2.Vec(IDL2.Text),
    "modalities": SourcedRemedyModalities2,
    "mentalSymptoms": IDL2.Vec(IDL2.Text),
    "constitution": IDL2.Text,
    "remedyId": IDL2.Text
  });
  return IDL2.Service({
    "adminBulkImportAphorisms": IDL2.Func(
      [IDL2.Vec(AphorismInput2)],
      [IDL2.Nat],
      []
    ),
    "adminBulkImportRepertoryEntries": IDL2.Func(
      [IDL2.Vec(RepertoryEntryInput2)],
      [IDL2.Nat],
      []
    ),
    "adminBulkImportSourcedRemedies": IDL2.Func(
      [IDL2.Vec(SourcedRemedyInput2)],
      [IDL2.Nat],
      []
    ),
    "adminDeleteAphorism": IDL2.Func([IDL2.Nat], [IDL2.Bool], []),
    "adminDeleteRepertoryEntry": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "adminDeleteSourcedRemedy": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "adminUpsertAphorism": IDL2.Func([AphorismInput2], [IDL2.Nat], []),
    "adminUpsertRepertoryEntry": IDL2.Func(
      [RepertoryEntryInput2],
      [IDL2.Text],
      []
    ),
    "adminUpsertSourcedRemedy": IDL2.Func([SourcedRemedyInput2], [IDL2.Text], []),
    "bootstrapAdmin": IDL2.Func([], [IDL2.Bool], []),
    "deleteCase": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "deleteRemedy": IDL2.Func([IDL2.Text], [], []),
    "getAdminList": IDL2.Func([], [IDL2.Vec(IDL2.Principal)], []),
    "getAllCards": IDL2.Func([], [IDL2.Vec(SpacedRepCard2)], ["query"]),
    "getAphorism": IDL2.Func([IDL2.Nat], [IDL2.Opt(Aphorism2)], ["query"]),
    "getCaseById": IDL2.Func([IDL2.Text], [IDL2.Opt(SavedCase2)], ["query"]),
    "getDueCards": IDL2.Func([], [IDL2.Vec(SpacedRepCard2)], ["query"]),
    "getLeaderboard": IDL2.Func(
      [Difficulty2],
      [IDL2.Vec(LeaderboardEntry2)],
      ["query"]
    ),
    "getMyBookmarks": IDL2.Func([], [IDL2.Vec(IDL2.Text)], ["query"]),
    "getMyProfile": IDL2.Func([], [IDL2.Opt(UserProfile2)], ["query"]),
    "getMyQuizHistory": IDL2.Func([], [IDL2.Vec(QuizAttempt2)], ["query"]),
    "getMyRemedyProgress": IDL2.Func([], [IDL2.Vec(RemedyProgress2)], ["query"]),
    "getMySessions": IDL2.Func([], [IDL2.Vec(StudySession2)], ["query"]),
    "getMyStats": IDL2.Func([], [UserStats2], ["query"]),
    "getRemedy": IDL2.Func([IDL2.Text], [IDL2.Opt(Remedy2)], ["query"]),
    "getRepertoryEntry": IDL2.Func(
      [IDL2.Text],
      [IDL2.Opt(RepertoryEntry2)],
      ["query"]
    ),
    "getSourcedRemedy": IDL2.Func(
      [IDL2.Text],
      [IDL2.Opt(SourcedRemedy2)],
      ["query"]
    ),
    "grantAdmin": IDL2.Func([IDL2.Principal], [IDL2.Bool], []),
    "initializeCards": IDL2.Func([], [], []),
    "isAdmin": IDL2.Func([], [IDL2.Bool], ["query"]),
    "listAphorisms": IDL2.Func([], [IDL2.Vec(Aphorism2)], ["query"]),
    "listMyCases": IDL2.Func([], [IDL2.Vec(SavedCase2)], ["query"]),
    "listRemedies": IDL2.Func([], [IDL2.Vec(Remedy2)], ["query"]),
    "listRepertoryEntries": IDL2.Func([], [IDL2.Vec(RepertoryEntry2)], ["query"]),
    "listSourcedRemedies": IDL2.Func([], [IDL2.Vec(SourcedRemedy2)], ["query"]),
    "listSourcedRemediesBySource": IDL2.Func(
      [MateriaSource2],
      [IDL2.Vec(SourcedRemedy2)],
      ["query"]
    ),
    "listSourcesByRemedyName": IDL2.Func(
      [IDL2.Text],
      [IDL2.Vec(SourcedRemedy2)],
      ["query"]
    ),
    "recordReview": IDL2.Func([IDL2.Text, IDL2.Nat], [SpacedRepCard2], []),
    "registerUser": IDL2.Func([IDL2.Text], [], []),
    "revokeAdmin": IDL2.Func([IDL2.Principal], [IDL2.Bool], []),
    "saveCaseAnalysis": IDL2.Func(
      [IDL2.Text, IDL2.Vec(IDL2.Text), IDL2.Text, IDL2.Vec(IDL2.Text)],
      [IDL2.Text],
      []
    ),
    "saveQuizAttempt": IDL2.Func([QuizAttempt2], [], []),
    "saveStudySession": IDL2.Func([StudySession2], [], []),
    "searchAphorisms": IDL2.Func([IDL2.Text], [IDL2.Vec(Aphorism2)], ["query"]),
    "searchMyCases": IDL2.Func([IDL2.Text], [IDL2.Vec(SavedCase2)], ["query"]),
    "searchRemediesByName": IDL2.Func([IDL2.Text], [IDL2.Vec(Remedy2)], ["query"]),
    "searchRemediesBySymptom": IDL2.Func(
      [IDL2.Text],
      [IDL2.Vec(Remedy2)],
      ["query"]
    ),
    "searchRepertory": IDL2.Func(
      [IDL2.Text],
      [IDL2.Vec(RepertoryEntry2)],
      ["query"]
    ),
    "seedOrganon": IDL2.Func([], [], []),
    "seedRemedies": IDL2.Func([], [], []),
    "seedRepertory": IDL2.Func([], [], []),
    "seedSourcedRemedies": IDL2.Func([], [], []),
    "submitLeaderboardEntry": IDL2.Func(
      [IDL2.Text, IDL2.Nat, IDL2.Nat, Difficulty2],
      [],
      []
    ),
    "toggleBookmark": IDL2.Func([IDL2.Text], [], []),
    "updateCase": IDL2.Func([IDL2.Text, IDL2.Text, IDL2.Text], [IDL2.Bool], []),
    "updateRemedyProgress": IDL2.Func([IDL2.Text, IDL2.Bool], [], []),
    "upsertRemedy": IDL2.Func([Remedy2], [], [])
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async adminBulkImportAphorisms(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminBulkImportAphorisms(to_candid_vec_n1(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminBulkImportAphorisms(to_candid_vec_n1(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async adminBulkImportRepertoryEntries(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminBulkImportRepertoryEntries(to_candid_vec_n4(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminBulkImportRepertoryEntries(to_candid_vec_n4(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async adminBulkImportSourcedRemedies(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminBulkImportSourcedRemedies(to_candid_vec_n7(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminBulkImportSourcedRemedies(to_candid_vec_n7(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async adminDeleteAphorism(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminDeleteAphorism(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminDeleteAphorism(arg0);
      return result;
    }
  }
  async adminDeleteRepertoryEntry(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminDeleteRepertoryEntry(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminDeleteRepertoryEntry(arg0);
      return result;
    }
  }
  async adminDeleteSourcedRemedy(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminDeleteSourcedRemedy(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminDeleteSourcedRemedy(arg0);
      return result;
    }
  }
  async adminUpsertAphorism(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpsertAphorism(to_candid_AphorismInput_n2(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpsertAphorism(to_candid_AphorismInput_n2(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async adminUpsertRepertoryEntry(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpsertRepertoryEntry(to_candid_RepertoryEntryInput_n5(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpsertRepertoryEntry(to_candid_RepertoryEntryInput_n5(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async adminUpsertSourcedRemedy(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpsertSourcedRemedy(to_candid_SourcedRemedyInput_n8(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpsertSourcedRemedy(to_candid_SourcedRemedyInput_n8(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async bootstrapAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.bootstrapAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.bootstrapAdmin();
      return result;
    }
  }
  async deleteCase(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteCase(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteCase(arg0);
      return result;
    }
  }
  async deleteRemedy(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteRemedy(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteRemedy(arg0);
      return result;
    }
  }
  async getAdminList() {
    if (this.processError) {
      try {
        const result = await this.actor.getAdminList();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAdminList();
      return result;
    }
  }
  async getAllCards() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllCards();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllCards();
      return result;
    }
  }
  async getAphorism(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getAphorism(arg0);
        return from_candid_opt_n12(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAphorism(arg0);
      return from_candid_opt_n12(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCaseById(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getCaseById(arg0);
        return from_candid_opt_n13(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCaseById(arg0);
      return from_candid_opt_n13(this._uploadFile, this._downloadFile, result);
    }
  }
  async getDueCards() {
    if (this.processError) {
      try {
        const result = await this.actor.getDueCards();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getDueCards();
      return result;
    }
  }
  async getLeaderboard(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getLeaderboard(to_candid_Difficulty_n14(this._uploadFile, this._downloadFile, arg0));
        return from_candid_vec_n16(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLeaderboard(to_candid_Difficulty_n14(this._uploadFile, this._downloadFile, arg0));
      return from_candid_vec_n16(this._uploadFile, this._downloadFile, result);
    }
  }
  async getMyBookmarks() {
    if (this.processError) {
      try {
        const result = await this.actor.getMyBookmarks();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMyBookmarks();
      return result;
    }
  }
  async getMyProfile() {
    if (this.processError) {
      try {
        const result = await this.actor.getMyProfile();
        return from_candid_opt_n21(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMyProfile();
      return from_candid_opt_n21(this._uploadFile, this._downloadFile, result);
    }
  }
  async getMyQuizHistory() {
    if (this.processError) {
      try {
        const result = await this.actor.getMyQuizHistory();
        return from_candid_vec_n26(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMyQuizHistory();
      return from_candid_vec_n26(this._uploadFile, this._downloadFile, result);
    }
  }
  async getMyRemedyProgress() {
    if (this.processError) {
      try {
        const result = await this.actor.getMyRemedyProgress();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMyRemedyProgress();
      return result;
    }
  }
  async getMySessions() {
    if (this.processError) {
      try {
        const result = await this.actor.getMySessions();
        return from_candid_vec_n29(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMySessions();
      return from_candid_vec_n29(this._uploadFile, this._downloadFile, result);
    }
  }
  async getMyStats() {
    if (this.processError) {
      try {
        const result = await this.actor.getMyStats();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMyStats();
      return result;
    }
  }
  async getRemedy(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getRemedy(arg0);
        return from_candid_opt_n34(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getRemedy(arg0);
      return from_candid_opt_n34(this._uploadFile, this._downloadFile, result);
    }
  }
  async getRepertoryEntry(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getRepertoryEntry(arg0);
        return from_candid_opt_n35(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getRepertoryEntry(arg0);
      return from_candid_opt_n35(this._uploadFile, this._downloadFile, result);
    }
  }
  async getSourcedRemedy(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getSourcedRemedy(arg0);
        return from_candid_opt_n36(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSourcedRemedy(arg0);
      return from_candid_opt_n36(this._uploadFile, this._downloadFile, result);
    }
  }
  async grantAdmin(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.grantAdmin(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.grantAdmin(arg0);
      return result;
    }
  }
  async initializeCards() {
    if (this.processError) {
      try {
        const result = await this.actor.initializeCards();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.initializeCards();
      return result;
    }
  }
  async isAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.isAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isAdmin();
      return result;
    }
  }
  async listAphorisms() {
    if (this.processError) {
      try {
        const result = await this.actor.listAphorisms();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listAphorisms();
      return result;
    }
  }
  async listMyCases() {
    if (this.processError) {
      try {
        const result = await this.actor.listMyCases();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listMyCases();
      return result;
    }
  }
  async listRemedies() {
    if (this.processError) {
      try {
        const result = await this.actor.listRemedies();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listRemedies();
      return result;
    }
  }
  async listRepertoryEntries() {
    if (this.processError) {
      try {
        const result = await this.actor.listRepertoryEntries();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listRepertoryEntries();
      return result;
    }
  }
  async listSourcedRemedies() {
    if (this.processError) {
      try {
        const result = await this.actor.listSourcedRemedies();
        return from_candid_vec_n41(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listSourcedRemedies();
      return from_candid_vec_n41(this._uploadFile, this._downloadFile, result);
    }
  }
  async listSourcedRemediesBySource(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listSourcedRemediesBySource(to_candid_MateriaSource_n10(this._uploadFile, this._downloadFile, arg0));
        return from_candid_vec_n41(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listSourcedRemediesBySource(to_candid_MateriaSource_n10(this._uploadFile, this._downloadFile, arg0));
      return from_candid_vec_n41(this._uploadFile, this._downloadFile, result);
    }
  }
  async listSourcesByRemedyName(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listSourcesByRemedyName(arg0);
        return from_candid_vec_n41(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listSourcesByRemedyName(arg0);
      return from_candid_vec_n41(this._uploadFile, this._downloadFile, result);
    }
  }
  async recordReview(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.recordReview(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.recordReview(arg0, arg1);
      return result;
    }
  }
  async registerUser(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.registerUser(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.registerUser(arg0);
      return result;
    }
  }
  async revokeAdmin(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.revokeAdmin(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.revokeAdmin(arg0);
      return result;
    }
  }
  async saveCaseAnalysis(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.saveCaseAnalysis(arg0, arg1, arg2, arg3);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.saveCaseAnalysis(arg0, arg1, arg2, arg3);
      return result;
    }
  }
  async saveQuizAttempt(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.saveQuizAttempt(to_candid_QuizAttempt_n42(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.saveQuizAttempt(to_candid_QuizAttempt_n42(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async saveStudySession(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.saveStudySession(to_candid_StudySession_n44(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.saveStudySession(to_candid_StudySession_n44(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async searchAphorisms(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.searchAphorisms(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.searchAphorisms(arg0);
      return result;
    }
  }
  async searchMyCases(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.searchMyCases(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.searchMyCases(arg0);
      return result;
    }
  }
  async searchRemediesByName(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.searchRemediesByName(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.searchRemediesByName(arg0);
      return result;
    }
  }
  async searchRemediesBySymptom(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.searchRemediesBySymptom(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.searchRemediesBySymptom(arg0);
      return result;
    }
  }
  async searchRepertory(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.searchRepertory(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.searchRepertory(arg0);
      return result;
    }
  }
  async seedOrganon() {
    if (this.processError) {
      try {
        const result = await this.actor.seedOrganon();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.seedOrganon();
      return result;
    }
  }
  async seedRemedies() {
    if (this.processError) {
      try {
        const result = await this.actor.seedRemedies();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.seedRemedies();
      return result;
    }
  }
  async seedRepertory() {
    if (this.processError) {
      try {
        const result = await this.actor.seedRepertory();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.seedRepertory();
      return result;
    }
  }
  async seedSourcedRemedies() {
    if (this.processError) {
      try {
        const result = await this.actor.seedSourcedRemedies();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.seedSourcedRemedies();
      return result;
    }
  }
  async submitLeaderboardEntry(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.submitLeaderboardEntry(arg0, arg1, arg2, to_candid_Difficulty_n14(this._uploadFile, this._downloadFile, arg3));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.submitLeaderboardEntry(arg0, arg1, arg2, to_candid_Difficulty_n14(this._uploadFile, this._downloadFile, arg3));
      return result;
    }
  }
  async toggleBookmark(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.toggleBookmark(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.toggleBookmark(arg0);
      return result;
    }
  }
  async updateCase(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.updateCase(arg0, arg1, arg2);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateCase(arg0, arg1, arg2);
      return result;
    }
  }
  async updateRemedyProgress(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateRemedyProgress(arg0, arg1);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateRemedyProgress(arg0, arg1);
      return result;
    }
  }
  async upsertRemedy(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.upsertRemedy(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.upsertRemedy(arg0);
      return result;
    }
  }
}
function from_candid_Difficulty_n19(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n20(_uploadFile, _downloadFile, value);
}
function from_candid_LeaderboardEntry_n17(_uploadFile, _downloadFile, value) {
  return from_candid_record_n18(_uploadFile, _downloadFile, value);
}
function from_candid_MateriaSource_n39(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n40(_uploadFile, _downloadFile, value);
}
function from_candid_QuizAttempt_n27(_uploadFile, _downloadFile, value) {
  return from_candid_record_n28(_uploadFile, _downloadFile, value);
}
function from_candid_SourcedRemedy_n37(_uploadFile, _downloadFile, value) {
  return from_candid_record_n38(_uploadFile, _downloadFile, value);
}
function from_candid_StudyMode_n32(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n33(_uploadFile, _downloadFile, value);
}
function from_candid_StudySession_n30(_uploadFile, _downloadFile, value) {
  return from_candid_record_n31(_uploadFile, _downloadFile, value);
}
function from_candid_ThemePreference_n24(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n25(_uploadFile, _downloadFile, value);
}
function from_candid_UserProfile_n22(_uploadFile, _downloadFile, value) {
  return from_candid_record_n23(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n12(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n13(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n21(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_UserProfile_n22(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n34(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n35(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n36(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_SourcedRemedy_n37(_uploadFile, _downloadFile, value[0]);
}
function from_candid_record_n18(_uploadFile, _downloadFile, value) {
  return {
    total: value.total,
    displayName: value.displayName,
    userId: value.userId,
    difficulty: from_candid_Difficulty_n19(_uploadFile, _downloadFile, value.difficulty),
    score: value.score,
    timestamp: value.timestamp,
    percentage: value.percentage
  };
}
function from_candid_record_n23(_uploadFile, _downloadFile, value) {
  return {
    principal: value.principal,
    displayName: value.displayName,
    createdAt: value.createdAt,
    themePreference: from_candid_ThemePreference_n24(_uploadFile, _downloadFile, value.themePreference)
  };
}
function from_candid_record_n28(_uploadFile, _downloadFile, value) {
  return {
    total: value.total,
    attemptId: value.attemptId,
    userId: value.userId,
    difficulty: from_candid_Difficulty_n19(_uploadFile, _downloadFile, value.difficulty),
    score: value.score,
    timestamp: value.timestamp,
    timeSecs: value.timeSecs
  };
}
function from_candid_record_n31(_uploadFile, _downloadFile, value) {
  return {
    durationSecs: value.durationSecs,
    userId: value.userId,
    mode: from_candid_StudyMode_n32(_uploadFile, _downloadFile, value.mode),
    remedyIds: value.remedyIds,
    timestamp: value.timestamp,
    sessionId: value.sessionId,
    accuracy: value.accuracy
  };
}
function from_candid_record_n38(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    latinName: value.latinName,
    clinicalUses: value.clinicalUses,
    source: from_candid_MateriaSource_n39(_uploadFile, _downloadFile, value.source),
    physicalSymptoms: value.physicalSymptoms,
    name: value.name,
    keynotes: value.keynotes,
    modalities: value.modalities,
    mentalSymptoms: value.mentalSymptoms,
    constitution: value.constitution,
    remedyId: value.remedyId
  };
}
function from_candid_variant_n20(_uploadFile, _downloadFile, value) {
  return "intermediate" in value ? "intermediate" : "beginner" in value ? "beginner" : "advanced" in value ? "advanced" : value;
}
function from_candid_variant_n25(_uploadFile, _downloadFile, value) {
  return "dark" in value ? "dark" : "light" in value ? "light" : value;
}
function from_candid_variant_n33(_uploadFile, _downloadFile, value) {
  return "flashcard" in value ? "flashcard" : "quiz" in value ? "quiz" : value;
}
function from_candid_variant_n40(_uploadFile, _downloadFile, value) {
  return "boericke" in value ? "boericke" : "allensKeynotes" in value ? "allensKeynotes" : "lotus" in value ? "lotus" : value;
}
function from_candid_vec_n16(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_LeaderboardEntry_n17(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n26(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_QuizAttempt_n27(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n29(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_StudySession_n30(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n41(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_SourcedRemedy_n37(_uploadFile, _downloadFile, x));
}
function to_candid_AphorismInput_n2(_uploadFile, _downloadFile, value) {
  return to_candid_record_n3(_uploadFile, _downloadFile, value);
}
function to_candid_Difficulty_n14(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n15(_uploadFile, _downloadFile, value);
}
function to_candid_MateriaSource_n10(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n11(_uploadFile, _downloadFile, value);
}
function to_candid_QuizAttempt_n42(_uploadFile, _downloadFile, value) {
  return to_candid_record_n43(_uploadFile, _downloadFile, value);
}
function to_candid_RepertoryEntryInput_n5(_uploadFile, _downloadFile, value) {
  return to_candid_record_n6(_uploadFile, _downloadFile, value);
}
function to_candid_SourcedRemedyInput_n8(_uploadFile, _downloadFile, value) {
  return to_candid_record_n9(_uploadFile, _downloadFile, value);
}
function to_candid_StudyMode_n46(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n47(_uploadFile, _downloadFile, value);
}
function to_candid_StudySession_n44(_uploadFile, _downloadFile, value) {
  return to_candid_record_n45(_uploadFile, _downloadFile, value);
}
function to_candid_record_n3(_uploadFile, _downloadFile, value) {
  return {
    id: value.id ? candid_some(value.id) : candid_none(),
    keyThemes: value.keyThemes,
    section: value.section,
    number: value.number,
    authenticText: value.authenticText,
    commentary: value.commentary
  };
}
function to_candid_record_n43(_uploadFile, _downloadFile, value) {
  return {
    total: value.total,
    attemptId: value.attemptId,
    userId: value.userId,
    difficulty: to_candid_Difficulty_n14(_uploadFile, _downloadFile, value.difficulty),
    score: value.score,
    timestamp: value.timestamp,
    timeSecs: value.timeSecs
  };
}
function to_candid_record_n45(_uploadFile, _downloadFile, value) {
  return {
    durationSecs: value.durationSecs,
    userId: value.userId,
    mode: to_candid_StudyMode_n46(_uploadFile, _downloadFile, value.mode),
    remedyIds: value.remedyIds,
    timestamp: value.timestamp,
    sessionId: value.sessionId,
    accuracy: value.accuracy
  };
}
function to_candid_record_n6(_uploadFile, _downloadFile, value) {
  return {
    id: value.id ? candid_some(value.id) : candid_none(),
    description: value.description,
    symptomCategory: value.symptomCategory,
    symptomName: value.symptomName,
    remedies: value.remedies
  };
}
function to_candid_record_n9(_uploadFile, _downloadFile, value) {
  return {
    id: value.id ? candid_some(value.id) : candid_none(),
    latinName: value.latinName,
    clinicalUses: value.clinicalUses,
    source: to_candid_MateriaSource_n10(_uploadFile, _downloadFile, value.source),
    physicalSymptoms: value.physicalSymptoms,
    name: value.name,
    keynotes: value.keynotes,
    modalities: value.modalities,
    mentalSymptoms: value.mentalSymptoms,
    constitution: value.constitution,
    remedyId: value.remedyId
  };
}
function to_candid_variant_n11(_uploadFile, _downloadFile, value) {
  return value == "boericke" ? {
    boericke: null
  } : value == "allensKeynotes" ? {
    allensKeynotes: null
  } : value == "lotus" ? {
    lotus: null
  } : value;
}
function to_candid_variant_n15(_uploadFile, _downloadFile, value) {
  return value == "intermediate" ? {
    intermediate: null
  } : value == "beginner" ? {
    beginner: null
  } : value == "advanced" ? {
    advanced: null
  } : value;
}
function to_candid_variant_n47(_uploadFile, _downloadFile, value) {
  return value == "flashcard" ? {
    flashcard: null
  } : value == "quiz" ? {
    quiz: null
  } : value;
}
function to_candid_vec_n1(_uploadFile, _downloadFile, value) {
  return value.map((x) => to_candid_AphorismInput_n2(_uploadFile, _downloadFile, x));
}
function to_candid_vec_n4(_uploadFile, _downloadFile, value) {
  return value.map((x) => to_candid_RepertoryEntryInput_n5(_uploadFile, _downloadFile, x));
}
function to_candid_vec_n7(_uploadFile, _downloadFile, value) {
  return value.map((x) => to_candid_SourcedRemedyInput_n8(_uploadFile, _downloadFile, x));
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
export {
  useActor as a,
  createActor as c,
  useQuery as u
};
