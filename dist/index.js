"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/OTLPExporterBase.js
var OTLPExporterBase;
var init_OTLPExporterBase = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/OTLPExporterBase.js"() {
    "use strict";
    OTLPExporterBase = class {
      _delegate;
      constructor(_delegate) {
        this._delegate = _delegate;
      }
      /**
       * Export items.
       * @param items
       * @param resultCallback
       */
      export(items, resultCallback) {
        this._delegate.export(items, resultCallback);
      }
      forceFlush() {
        return this._delegate.forceFlush();
      }
      shutdown() {
        return this._delegate.shutdown();
      }
    };
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/types.js
var OTLPExporterError;
var init_types = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/types.js"() {
    "use strict";
    OTLPExporterError = class extends Error {
      code;
      name = "OTLPExporterError";
      data;
      constructor(message, code, data) {
        super(message);
        this.data = data;
        this.code = code;
      }
    };
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/shared-configuration.js
function validateTimeoutMillis(timeoutMillis) {
  if (Number.isFinite(timeoutMillis) && timeoutMillis > 0) {
    return timeoutMillis;
  }
  throw new Error(`Configuration: timeoutMillis is invalid, expected number greater than 0 (actual: '${timeoutMillis}')`);
}
function wrapStaticHeadersInFunction(headers) {
  if (headers == null) {
    return void 0;
  }
  return () => headers;
}
function mergeOtlpSharedConfigurationWithDefaults(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration) {
  return {
    timeoutMillis: validateTimeoutMillis(userProvidedConfiguration.timeoutMillis ?? fallbackConfiguration.timeoutMillis ?? defaultConfiguration.timeoutMillis),
    concurrencyLimit: userProvidedConfiguration.concurrencyLimit ?? fallbackConfiguration.concurrencyLimit ?? defaultConfiguration.concurrencyLimit,
    compression: userProvidedConfiguration.compression ?? fallbackConfiguration.compression ?? defaultConfiguration.compression
  };
}
function getSharedConfigurationDefaults() {
  return {
    timeoutMillis: 1e4,
    concurrencyLimit: 30,
    compression: "none"
  };
}
var init_shared_configuration = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/shared-configuration.js"() {
    "use strict";
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/legacy-node-configuration.js
var CompressionAlgorithm;
var init_legacy_node_configuration = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/legacy-node-configuration.js"() {
    "use strict";
    (function(CompressionAlgorithm2) {
      CompressionAlgorithm2["NONE"] = "none";
      CompressionAlgorithm2["GZIP"] = "gzip";
    })(CompressionAlgorithm || (CompressionAlgorithm = {}));
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/bounded-queue-export-promise-handler.js
function createBoundedQueueExportPromiseHandler(options2) {
  return new BoundedQueueExportPromiseHandler(options2.concurrencyLimit);
}
var BoundedQueueExportPromiseHandler;
var init_bounded_queue_export_promise_handler = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/bounded-queue-export-promise-handler.js"() {
    "use strict";
    BoundedQueueExportPromiseHandler = class {
      _concurrencyLimit;
      _sendingPromises = [];
      /**
       * @param concurrencyLimit maximum promises allowed in a queue at the same time.
       */
      constructor(concurrencyLimit) {
        this._concurrencyLimit = concurrencyLimit;
      }
      pushPromise(promise) {
        if (this.hasReachedLimit()) {
          throw new Error("Concurrency Limit reached");
        }
        this._sendingPromises.push(promise);
        const popPromise = () => {
          const index = this._sendingPromises.indexOf(promise);
          void this._sendingPromises.splice(index, 1);
        };
        promise.then(popPromise, popPromise);
      }
      hasReachedLimit() {
        return this._sendingPromises.length >= this._concurrencyLimit;
      }
      async awaitAll() {
        await Promise.all(this._sendingPromises);
      }
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js
function suppressTracing(context3) {
  return context3.setValue(SUPPRESS_TRACING_KEY, true);
}
function unsuppressTracing(context3) {
  return context3.deleteValue(SUPPRESS_TRACING_KEY);
}
function isTracingSuppressed(context3) {
  return context3.getValue(SUPPRESS_TRACING_KEY) === true;
}
var import_api, SUPPRESS_TRACING_KEY;
var init_suppress_tracing = __esm({
  "node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js"() {
    "use strict";
    import_api = require("@opentelemetry/api");
    SUPPRESS_TRACING_KEY = (0, import_api.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
  }
});

// node_modules/@opentelemetry/core/build/esm/baggage/constants.js
var BAGGAGE_KEY_PAIR_SEPARATOR, BAGGAGE_PROPERTIES_SEPARATOR, BAGGAGE_ITEMS_SEPARATOR, BAGGAGE_HEADER, BAGGAGE_MAX_NAME_VALUE_PAIRS, BAGGAGE_MAX_PER_NAME_VALUE_PAIRS, BAGGAGE_MAX_TOTAL_LENGTH;
var init_constants = __esm({
  "node_modules/@opentelemetry/core/build/esm/baggage/constants.js"() {
    "use strict";
    BAGGAGE_KEY_PAIR_SEPARATOR = "=";
    BAGGAGE_PROPERTIES_SEPARATOR = ";";
    BAGGAGE_ITEMS_SEPARATOR = ",";
    BAGGAGE_HEADER = "baggage";
    BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
    BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
    BAGGAGE_MAX_TOTAL_LENGTH = 8192;
  }
});

// node_modules/@opentelemetry/core/build/esm/baggage/utils.js
function serializeKeyPairs(keyPairs) {
  return keyPairs.reduce((hValue, current) => {
    const value = `${hValue}${hValue !== "" ? BAGGAGE_ITEMS_SEPARATOR : ""}${current}`;
    return value.length > BAGGAGE_MAX_TOTAL_LENGTH ? hValue : value;
  }, "");
}
function getKeyPairs(baggage) {
  return baggage.getAllEntries().map(([key, value]) => {
    let entry = `${encodeURIComponent(key)}=${encodeURIComponent(value.value)}`;
    if (value.metadata !== void 0) {
      entry += BAGGAGE_PROPERTIES_SEPARATOR + value.metadata.toString();
    }
    return entry;
  });
}
function parsePairKeyValue(entry) {
  const valueProps = entry.split(BAGGAGE_PROPERTIES_SEPARATOR);
  if (valueProps.length <= 0)
    return;
  const keyPairPart = valueProps.shift();
  if (!keyPairPart)
    return;
  const separatorIndex = keyPairPart.indexOf(BAGGAGE_KEY_PAIR_SEPARATOR);
  if (separatorIndex <= 0)
    return;
  const key = decodeURIComponent(keyPairPart.substring(0, separatorIndex).trim());
  const value = decodeURIComponent(keyPairPart.substring(separatorIndex + 1).trim());
  let metadata;
  if (valueProps.length > 0) {
    metadata = (0, import_api2.baggageEntryMetadataFromString)(valueProps.join(BAGGAGE_PROPERTIES_SEPARATOR));
  }
  return { key, value, metadata };
}
function parseKeyPairsIntoRecord(value) {
  const result = {};
  if (typeof value === "string" && value.length > 0) {
    value.split(BAGGAGE_ITEMS_SEPARATOR).forEach((entry) => {
      const keyPair = parsePairKeyValue(entry);
      if (keyPair !== void 0 && keyPair.value.length > 0) {
        result[keyPair.key] = keyPair.value;
      }
    });
  }
  return result;
}
var import_api2;
var init_utils = __esm({
  "node_modules/@opentelemetry/core/build/esm/baggage/utils.js"() {
    "use strict";
    import_api2 = require("@opentelemetry/api");
    init_constants();
  }
});

// node_modules/@opentelemetry/core/build/esm/baggage/propagation/W3CBaggagePropagator.js
var import_api3, W3CBaggagePropagator;
var init_W3CBaggagePropagator = __esm({
  "node_modules/@opentelemetry/core/build/esm/baggage/propagation/W3CBaggagePropagator.js"() {
    "use strict";
    import_api3 = require("@opentelemetry/api");
    init_suppress_tracing();
    init_constants();
    init_utils();
    W3CBaggagePropagator = class {
      inject(context3, carrier, setter) {
        const baggage = import_api3.propagation.getBaggage(context3);
        if (!baggage || isTracingSuppressed(context3))
          return;
        const keyPairs = getKeyPairs(baggage).filter((pair) => {
          return pair.length <= BAGGAGE_MAX_PER_NAME_VALUE_PAIRS;
        }).slice(0, BAGGAGE_MAX_NAME_VALUE_PAIRS);
        const headerValue = serializeKeyPairs(keyPairs);
        if (headerValue.length > 0) {
          setter.set(carrier, BAGGAGE_HEADER, headerValue);
        }
      }
      extract(context3, carrier, getter) {
        const headerValue = getter.get(carrier, BAGGAGE_HEADER);
        const baggageString = Array.isArray(headerValue) ? headerValue.join(BAGGAGE_ITEMS_SEPARATOR) : headerValue;
        if (!baggageString)
          return context3;
        const baggage = {};
        if (baggageString.length === 0) {
          return context3;
        }
        const pairs = baggageString.split(BAGGAGE_ITEMS_SEPARATOR);
        pairs.forEach((entry) => {
          const keyPair = parsePairKeyValue(entry);
          if (keyPair) {
            const baggageEntry = { value: keyPair.value };
            if (keyPair.metadata) {
              baggageEntry.metadata = keyPair.metadata;
            }
            baggage[keyPair.key] = baggageEntry;
          }
        });
        if (Object.entries(baggage).length === 0) {
          return context3;
        }
        return import_api3.propagation.setBaggage(context3, import_api3.propagation.createBaggage(baggage));
      }
      fields() {
        return [BAGGAGE_HEADER];
      }
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/common/anchored-clock.js
var AnchoredClock;
var init_anchored_clock = __esm({
  "node_modules/@opentelemetry/core/build/esm/common/anchored-clock.js"() {
    "use strict";
    AnchoredClock = class {
      _monotonicClock;
      _epochMillis;
      _performanceMillis;
      /**
       * Create a new AnchoredClock anchored to the current time returned by systemClock.
       *
       * @param systemClock should be a clock that returns the number of milliseconds since January 1 1970 such as Date
       * @param monotonicClock should be a clock that counts milliseconds monotonically such as window.performance or perf_hooks.performance
       */
      constructor(systemClock, monotonicClock) {
        this._monotonicClock = monotonicClock;
        this._epochMillis = systemClock.now();
        this._performanceMillis = monotonicClock.now();
      }
      /**
       * Returns the current time by adding the number of milliseconds since the
       * AnchoredClock was created to the creation epoch time
       */
      now() {
        const delta = this._monotonicClock.now() - this._performanceMillis;
        return this._epochMillis + delta;
      }
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/common/attributes.js
function sanitizeAttributes(attributes) {
  const out = {};
  if (typeof attributes !== "object" || attributes == null) {
    return out;
  }
  for (const [key, val] of Object.entries(attributes)) {
    if (!isAttributeKey(key)) {
      import_api4.diag.warn(`Invalid attribute key: ${key}`);
      continue;
    }
    if (!isAttributeValue(val)) {
      import_api4.diag.warn(`Invalid attribute value set for key: ${key}`);
      continue;
    }
    if (Array.isArray(val)) {
      out[key] = val.slice();
    } else {
      out[key] = val;
    }
  }
  return out;
}
function isAttributeKey(key) {
  return typeof key === "string" && key.length > 0;
}
function isAttributeValue(val) {
  if (val == null) {
    return true;
  }
  if (Array.isArray(val)) {
    return isHomogeneousAttributeValueArray(val);
  }
  return isValidPrimitiveAttributeValue(val);
}
function isHomogeneousAttributeValueArray(arr) {
  let type;
  for (const element of arr) {
    if (element == null)
      continue;
    if (!type) {
      if (isValidPrimitiveAttributeValue(element)) {
        type = typeof element;
        continue;
      }
      return false;
    }
    if (typeof element === type) {
      continue;
    }
    return false;
  }
  return true;
}
function isValidPrimitiveAttributeValue(val) {
  switch (typeof val) {
    case "number":
    case "boolean":
    case "string":
      return true;
  }
  return false;
}
var import_api4;
var init_attributes = __esm({
  "node_modules/@opentelemetry/core/build/esm/common/attributes.js"() {
    "use strict";
    import_api4 = require("@opentelemetry/api");
  }
});

// node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js
function loggingErrorHandler() {
  return (ex) => {
    import_api5.diag.error(stringifyException(ex));
  };
}
function stringifyException(ex) {
  if (typeof ex === "string") {
    return ex;
  } else {
    return JSON.stringify(flattenException(ex));
  }
}
function flattenException(ex) {
  const result = {};
  let current = ex;
  while (current !== null) {
    Object.getOwnPropertyNames(current).forEach((propertyName) => {
      if (result[propertyName])
        return;
      const value = current[propertyName];
      if (value) {
        result[propertyName] = String(value);
      }
    });
    current = Object.getPrototypeOf(current);
  }
  return result;
}
var import_api5;
var init_logging_error_handler = __esm({
  "node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js"() {
    "use strict";
    import_api5 = require("@opentelemetry/api");
  }
});

// node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js
function setGlobalErrorHandler(handler) {
  delegateHandler = handler;
}
function globalErrorHandler(ex) {
  try {
    delegateHandler(ex);
  } catch {
  }
}
var delegateHandler;
var init_global_error_handler = __esm({
  "node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js"() {
    "use strict";
    init_logging_error_handler();
    delegateHandler = loggingErrorHandler();
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/environment.js
function getNumberFromEnv(key) {
  const raw = process.env[key];
  if (raw == null || raw.trim() === "") {
    return void 0;
  }
  const value = Number(raw);
  if (isNaN(value)) {
    import_api6.diag.warn(`Unknown value ${(0, import_util.inspect)(raw)} for ${key}, expected a number, using defaults`);
    return void 0;
  }
  return value;
}
function getStringFromEnv(key) {
  const raw = process.env[key];
  if (raw == null || raw.trim() === "") {
    return void 0;
  }
  return raw;
}
function getBooleanFromEnv(key) {
  const raw = process.env[key]?.trim().toLowerCase();
  if (raw == null || raw === "") {
    return false;
  }
  if (raw === "true") {
    return true;
  } else if (raw === "false") {
    return false;
  } else {
    import_api6.diag.warn(`Unknown value ${(0, import_util.inspect)(raw)} for ${key}, expected 'true' or 'false', falling back to 'false' (default)`);
    return false;
  }
}
function getStringListFromEnv(key) {
  return getStringFromEnv(key)?.split(",").map((v) => v.trim()).filter((s) => s !== "");
}
var import_api6, import_util;
var init_environment = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/environment.js"() {
    "use strict";
    import_api6 = require("@opentelemetry/api");
    import_util = require("util");
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/globalThis.js
var _globalThis;
var init_globalThis = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/globalThis.js"() {
    "use strict";
    _globalThis = typeof globalThis === "object" ? globalThis : global;
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/performance.js
var import_perf_hooks, otperformance;
var init_performance = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/performance.js"() {
    "use strict";
    import_perf_hooks = require("perf_hooks");
    otperformance = import_perf_hooks.performance;
  }
});

// node_modules/@opentelemetry/core/build/esm/version.js
var VERSION;
var init_version = __esm({
  "node_modules/@opentelemetry/core/build/esm/version.js"() {
    "use strict";
    VERSION = "2.1.0";
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/esm/trace/SemanticAttributes.js
var init_SemanticAttributes = __esm({
  "node_modules/@opentelemetry/semantic-conventions/build/esm/trace/SemanticAttributes.js"() {
    "use strict";
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/esm/trace/index.js
var init_trace = __esm({
  "node_modules/@opentelemetry/semantic-conventions/build/esm/trace/index.js"() {
    "use strict";
    init_SemanticAttributes();
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/esm/resource/SemanticResourceAttributes.js
var init_SemanticResourceAttributes = __esm({
  "node_modules/@opentelemetry/semantic-conventions/build/esm/resource/SemanticResourceAttributes.js"() {
    "use strict";
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/esm/resource/index.js
var init_resource = __esm({
  "node_modules/@opentelemetry/semantic-conventions/build/esm/resource/index.js"() {
    "use strict";
    init_SemanticResourceAttributes();
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/esm/stable_attributes.js
var ATTR_SERVICE_NAME, ATTR_TELEMETRY_SDK_LANGUAGE, TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS, ATTR_TELEMETRY_SDK_NAME, ATTR_TELEMETRY_SDK_VERSION;
var init_stable_attributes = __esm({
  "node_modules/@opentelemetry/semantic-conventions/build/esm/stable_attributes.js"() {
    "use strict";
    ATTR_SERVICE_NAME = "service.name";
    ATTR_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
    TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS = "nodejs";
    ATTR_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
    ATTR_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/esm/stable_metrics.js
var init_stable_metrics = __esm({
  "node_modules/@opentelemetry/semantic-conventions/build/esm/stable_metrics.js"() {
    "use strict";
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/esm/stable_events.js
var init_stable_events = __esm({
  "node_modules/@opentelemetry/semantic-conventions/build/esm/stable_events.js"() {
    "use strict";
  }
});

// node_modules/@opentelemetry/semantic-conventions/build/esm/index.js
var init_esm = __esm({
  "node_modules/@opentelemetry/semantic-conventions/build/esm/index.js"() {
    "use strict";
    init_trace();
    init_resource();
    init_stable_attributes();
    init_stable_metrics();
    init_stable_events();
  }
});

// node_modules/@opentelemetry/core/build/esm/semconv.js
var ATTR_PROCESS_RUNTIME_NAME;
var init_semconv = __esm({
  "node_modules/@opentelemetry/core/build/esm/semconv.js"() {
    "use strict";
    ATTR_PROCESS_RUNTIME_NAME = "process.runtime.name";
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/sdk-info.js
var SDK_INFO;
var init_sdk_info = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/sdk-info.js"() {
    "use strict";
    init_version();
    init_esm();
    init_semconv();
    SDK_INFO = {
      [ATTR_TELEMETRY_SDK_NAME]: "opentelemetry",
      [ATTR_PROCESS_RUNTIME_NAME]: "node",
      [ATTR_TELEMETRY_SDK_LANGUAGE]: TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS,
      [ATTR_TELEMETRY_SDK_VERSION]: VERSION
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/timer-util.js
function unrefTimer(timer) {
  timer.unref();
}
var init_timer_util = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/timer-util.js"() {
    "use strict";
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/index.js
var init_node = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/index.js"() {
    "use strict";
    init_environment();
    init_globalThis();
    init_performance();
    init_sdk_info();
    init_timer_util();
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/index.js
var init_platform = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/index.js"() {
    "use strict";
    init_node();
  }
});

// node_modules/@opentelemetry/core/build/esm/common/time.js
function millisToHrTime(epochMillis) {
  const epochSeconds = epochMillis / 1e3;
  const seconds = Math.trunc(epochSeconds);
  const nanos = Math.round(epochMillis % 1e3 * MILLISECONDS_TO_NANOSECONDS);
  return [seconds, nanos];
}
function getTimeOrigin() {
  let timeOrigin = otperformance.timeOrigin;
  if (typeof timeOrigin !== "number") {
    const perf = otperformance;
    timeOrigin = perf.timing && perf.timing.fetchStart;
  }
  return timeOrigin;
}
function hrTime(performanceNow) {
  const timeOrigin = millisToHrTime(getTimeOrigin());
  const now = millisToHrTime(typeof performanceNow === "number" ? performanceNow : otperformance.now());
  return addHrTimes(timeOrigin, now);
}
function timeInputToHrTime(time) {
  if (isTimeInputHrTime(time)) {
    return time;
  } else if (typeof time === "number") {
    if (time < getTimeOrigin()) {
      return hrTime(time);
    } else {
      return millisToHrTime(time);
    }
  } else if (time instanceof Date) {
    return millisToHrTime(time.getTime());
  } else {
    throw TypeError("Invalid input type");
  }
}
function hrTimeDuration(startTime, endTime) {
  let seconds = endTime[0] - startTime[0];
  let nanos = endTime[1] - startTime[1];
  if (nanos < 0) {
    seconds -= 1;
    nanos += SECOND_TO_NANOSECONDS;
  }
  return [seconds, nanos];
}
function hrTimeToTimeStamp(time) {
  const precision = NANOSECOND_DIGITS;
  const tmp = `${"0".repeat(precision)}${time[1]}Z`;
  const nanoString = tmp.substring(tmp.length - precision - 1);
  const date = new Date(time[0] * 1e3).toISOString();
  return date.replace("000Z", nanoString);
}
function hrTimeToNanoseconds(time) {
  return time[0] * SECOND_TO_NANOSECONDS + time[1];
}
function hrTimeToMilliseconds(time) {
  return time[0] * 1e3 + time[1] / 1e6;
}
function hrTimeToMicroseconds(time) {
  return time[0] * 1e6 + time[1] / 1e3;
}
function isTimeInputHrTime(value) {
  return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
}
function isTimeInput(value) {
  return isTimeInputHrTime(value) || typeof value === "number" || value instanceof Date;
}
function addHrTimes(time1, time2) {
  const out = [time1[0] + time2[0], time1[1] + time2[1]];
  if (out[1] >= SECOND_TO_NANOSECONDS) {
    out[1] -= SECOND_TO_NANOSECONDS;
    out[0] += 1;
  }
  return out;
}
var NANOSECOND_DIGITS, NANOSECOND_DIGITS_IN_MILLIS, MILLISECONDS_TO_NANOSECONDS, SECOND_TO_NANOSECONDS;
var init_time = __esm({
  "node_modules/@opentelemetry/core/build/esm/common/time.js"() {
    "use strict";
    init_platform();
    NANOSECOND_DIGITS = 9;
    NANOSECOND_DIGITS_IN_MILLIS = 6;
    MILLISECONDS_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS_IN_MILLIS);
    SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
  }
});

// node_modules/@opentelemetry/core/build/esm/ExportResult.js
var ExportResultCode;
var init_ExportResult = __esm({
  "node_modules/@opentelemetry/core/build/esm/ExportResult.js"() {
    "use strict";
    (function(ExportResultCode2) {
      ExportResultCode2[ExportResultCode2["SUCCESS"] = 0] = "SUCCESS";
      ExportResultCode2[ExportResultCode2["FAILED"] = 1] = "FAILED";
    })(ExportResultCode || (ExportResultCode = {}));
  }
});

// node_modules/@opentelemetry/core/build/esm/propagation/composite.js
var import_api7, CompositePropagator;
var init_composite = __esm({
  "node_modules/@opentelemetry/core/build/esm/propagation/composite.js"() {
    "use strict";
    import_api7 = require("@opentelemetry/api");
    CompositePropagator = class {
      _propagators;
      _fields;
      /**
       * Construct a composite propagator from a list of propagators.
       *
       * @param [config] Configuration object for composite propagator
       */
      constructor(config2 = {}) {
        this._propagators = config2.propagators ?? [];
        this._fields = Array.from(new Set(this._propagators.map((p) => typeof p.fields === "function" ? p.fields() : []).reduce((x, y) => x.concat(y), [])));
      }
      /**
       * Run each of the configured propagators with the given context and carrier.
       * Propagators are run in the order they are configured, so if multiple
       * propagators write the same carrier key, the propagator later in the list
       * will "win".
       *
       * @param context Context to inject
       * @param carrier Carrier into which context will be injected
       */
      inject(context3, carrier, setter) {
        for (const propagator of this._propagators) {
          try {
            propagator.inject(context3, carrier, setter);
          } catch (err) {
            import_api7.diag.warn(`Failed to inject with ${propagator.constructor.name}. Err: ${err.message}`);
          }
        }
      }
      /**
       * Run each of the configured propagators with the given context and carrier.
       * Propagators are run in the order they are configured, so if multiple
       * propagators write the same context key, the propagator later in the list
       * will "win".
       *
       * @param context Context to add values to
       * @param carrier Carrier from which to extract context
       */
      extract(context3, carrier, getter) {
        return this._propagators.reduce((ctx, propagator) => {
          try {
            return propagator.extract(ctx, carrier, getter);
          } catch (err) {
            import_api7.diag.warn(`Failed to extract with ${propagator.constructor.name}. Err: ${err.message}`);
          }
          return ctx;
        }, context3);
      }
      fields() {
        return this._fields.slice();
      }
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/internal/validators.js
function validateKey(key) {
  return VALID_KEY_REGEX.test(key);
}
function validateValue(value) {
  return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
}
var VALID_KEY_CHAR_RANGE, VALID_KEY, VALID_VENDOR_KEY, VALID_KEY_REGEX, VALID_VALUE_BASE_REGEX, INVALID_VALUE_COMMA_EQUAL_REGEX;
var init_validators = __esm({
  "node_modules/@opentelemetry/core/build/esm/internal/validators.js"() {
    "use strict";
    VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
    VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
    VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
    VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
    VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
    INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
  }
});

// node_modules/@opentelemetry/core/build/esm/trace/TraceState.js
var MAX_TRACE_STATE_ITEMS, MAX_TRACE_STATE_LEN, LIST_MEMBERS_SEPARATOR, LIST_MEMBER_KEY_VALUE_SPLITTER, TraceState;
var init_TraceState = __esm({
  "node_modules/@opentelemetry/core/build/esm/trace/TraceState.js"() {
    "use strict";
    init_validators();
    MAX_TRACE_STATE_ITEMS = 32;
    MAX_TRACE_STATE_LEN = 512;
    LIST_MEMBERS_SEPARATOR = ",";
    LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
    TraceState = class _TraceState {
      _internalState = /* @__PURE__ */ new Map();
      constructor(rawTraceState) {
        if (rawTraceState)
          this._parse(rawTraceState);
      }
      set(key, value) {
        const traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      }
      unset(key) {
        const traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      }
      get(key) {
        return this._internalState.get(key);
      }
      serialize() {
        return this._keys().reduce((agg, key) => {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR);
      }
      _parse(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN)
          return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce((agg, part) => {
          const listMember = part.trim();
          const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
          if (i !== -1) {
            const key = listMember.slice(0, i);
            const value = listMember.slice(i + 1, part.length);
            if (validateKey(key) && validateValue(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, /* @__PURE__ */ new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
        }
      }
      _keys() {
        return Array.from(this._internalState.keys()).reverse();
      }
      _clone() {
        const traceState = new _TraceState();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      }
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/trace/W3CTraceContextPropagator.js
function parseTraceParent(traceParent) {
  const match = TRACE_PARENT_REGEX.exec(traceParent);
  if (!match)
    return null;
  if (match[1] === "00" && match[5])
    return null;
  return {
    traceId: match[2],
    spanId: match[3],
    traceFlags: parseInt(match[4], 16)
  };
}
var import_api8, TRACE_PARENT_HEADER, TRACE_STATE_HEADER, VERSION2, VERSION_PART, TRACE_ID_PART, PARENT_ID_PART, FLAGS_PART, TRACE_PARENT_REGEX, W3CTraceContextPropagator;
var init_W3CTraceContextPropagator = __esm({
  "node_modules/@opentelemetry/core/build/esm/trace/W3CTraceContextPropagator.js"() {
    "use strict";
    import_api8 = require("@opentelemetry/api");
    init_suppress_tracing();
    init_TraceState();
    TRACE_PARENT_HEADER = "traceparent";
    TRACE_STATE_HEADER = "tracestate";
    VERSION2 = "00";
    VERSION_PART = "(?!ff)[\\da-f]{2}";
    TRACE_ID_PART = "(?![0]{32})[\\da-f]{32}";
    PARENT_ID_PART = "(?![0]{16})[\\da-f]{16}";
    FLAGS_PART = "[\\da-f]{2}";
    TRACE_PARENT_REGEX = new RegExp(`^\\s?(${VERSION_PART})-(${TRACE_ID_PART})-(${PARENT_ID_PART})-(${FLAGS_PART})(-.*)?\\s?$`);
    W3CTraceContextPropagator = class {
      inject(context3, carrier, setter) {
        const spanContext = import_api8.trace.getSpanContext(context3);
        if (!spanContext || isTracingSuppressed(context3) || !(0, import_api8.isSpanContextValid)(spanContext))
          return;
        const traceParent = `${VERSION2}-${spanContext.traceId}-${spanContext.spanId}-0${Number(spanContext.traceFlags || import_api8.TraceFlags.NONE).toString(16)}`;
        setter.set(carrier, TRACE_PARENT_HEADER, traceParent);
        if (spanContext.traceState) {
          setter.set(carrier, TRACE_STATE_HEADER, spanContext.traceState.serialize());
        }
      }
      extract(context3, carrier, getter) {
        const traceParentHeader = getter.get(carrier, TRACE_PARENT_HEADER);
        if (!traceParentHeader)
          return context3;
        const traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
        if (typeof traceParent !== "string")
          return context3;
        const spanContext = parseTraceParent(traceParent);
        if (!spanContext)
          return context3;
        spanContext.isRemote = true;
        const traceStateHeader = getter.get(carrier, TRACE_STATE_HEADER);
        if (traceStateHeader) {
          const state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
          spanContext.traceState = new TraceState(typeof state === "string" ? state : void 0);
        }
        return import_api8.trace.setSpanContext(context3, spanContext);
      }
      fields() {
        return [TRACE_PARENT_HEADER, TRACE_STATE_HEADER];
      }
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/trace/rpc-metadata.js
function setRPCMetadata(context3, meta) {
  return context3.setValue(RPC_METADATA_KEY, meta);
}
function deleteRPCMetadata(context3) {
  return context3.deleteValue(RPC_METADATA_KEY);
}
function getRPCMetadata(context3) {
  return context3.getValue(RPC_METADATA_KEY);
}
var import_api9, RPC_METADATA_KEY, RPCType;
var init_rpc_metadata = __esm({
  "node_modules/@opentelemetry/core/build/esm/trace/rpc-metadata.js"() {
    "use strict";
    import_api9 = require("@opentelemetry/api");
    RPC_METADATA_KEY = (0, import_api9.createContextKey)("OpenTelemetry SDK Context Key RPC_METADATA");
    (function(RPCType2) {
      RPCType2["HTTP"] = "http";
    })(RPCType || (RPCType = {}));
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/lodash.merge.js
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
    return false;
  }
  const proto = getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function getRawTag(value) {
  const isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  let unmasked = false;
  try {
    value[symToStringTag] = void 0;
    unmasked = true;
  } catch {
  }
  const result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var objectTag, nullTag, undefinedTag, funcProto, funcToString, objectCtorString, getPrototypeOf, objectProto, hasOwnProperty, symToStringTag, nativeObjectToString;
var init_lodash_merge = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/lodash.merge.js"() {
    "use strict";
    objectTag = "[object Object]";
    nullTag = "[object Null]";
    undefinedTag = "[object Undefined]";
    funcProto = Function.prototype;
    funcToString = funcProto.toString;
    objectCtorString = funcToString.call(Object);
    getPrototypeOf = Object.getPrototypeOf;
    objectProto = Object.prototype;
    hasOwnProperty = objectProto.hasOwnProperty;
    symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    nativeObjectToString = objectProto.toString;
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/merge.js
function merge(...args) {
  let result = args.shift();
  const objects = /* @__PURE__ */ new WeakMap();
  while (args.length > 0) {
    result = mergeTwoObjects(result, args.shift(), 0, objects);
  }
  return result;
}
function takeValue(value) {
  if (isArray(value)) {
    return value.slice();
  }
  return value;
}
function mergeTwoObjects(one, two, level = 0, objects) {
  let result;
  if (level > MAX_LEVEL) {
    return void 0;
  }
  level++;
  if (isPrimitive(one) || isPrimitive(two) || isFunction(two)) {
    result = takeValue(two);
  } else if (isArray(one)) {
    result = one.slice();
    if (isArray(two)) {
      for (let i = 0, j = two.length; i < j; i++) {
        result.push(takeValue(two[i]));
      }
    } else if (isObject(two)) {
      const keys = Object.keys(two);
      for (let i = 0, j = keys.length; i < j; i++) {
        const key = keys[i];
        result[key] = takeValue(two[key]);
      }
    }
  } else if (isObject(one)) {
    if (isObject(two)) {
      if (!shouldMerge(one, two)) {
        return two;
      }
      result = Object.assign({}, one);
      const keys = Object.keys(two);
      for (let i = 0, j = keys.length; i < j; i++) {
        const key = keys[i];
        const twoValue = two[key];
        if (isPrimitive(twoValue)) {
          if (typeof twoValue === "undefined") {
            delete result[key];
          } else {
            result[key] = twoValue;
          }
        } else {
          const obj1 = result[key];
          const obj2 = twoValue;
          if (wasObjectReferenced(one, key, objects) || wasObjectReferenced(two, key, objects)) {
            delete result[key];
          } else {
            if (isObject(obj1) && isObject(obj2)) {
              const arr1 = objects.get(obj1) || [];
              const arr2 = objects.get(obj2) || [];
              arr1.push({ obj: one, key });
              arr2.push({ obj: two, key });
              objects.set(obj1, arr1);
              objects.set(obj2, arr2);
            }
            result[key] = mergeTwoObjects(result[key], twoValue, level, objects);
          }
        }
      }
    } else {
      result = two;
    }
  }
  return result;
}
function wasObjectReferenced(obj, key, objects) {
  const arr = objects.get(obj[key]) || [];
  for (let i = 0, j = arr.length; i < j; i++) {
    const info = arr[i];
    if (info.key === key && info.obj === obj) {
      return true;
    }
  }
  return false;
}
function isArray(value) {
  return Array.isArray(value);
}
function isFunction(value) {
  return typeof value === "function";
}
function isObject(value) {
  return !isPrimitive(value) && !isArray(value) && !isFunction(value) && typeof value === "object";
}
function isPrimitive(value) {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined" || value instanceof Date || value instanceof RegExp || value === null;
}
function shouldMerge(one, two) {
  if (!isPlainObject(one) || !isPlainObject(two)) {
    return false;
  }
  return true;
}
var MAX_LEVEL;
var init_merge = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/merge.js"() {
    "use strict";
    init_lodash_merge();
    MAX_LEVEL = 20;
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/timeout.js
function callWithTimeout(promise, timeout) {
  let timeoutHandle;
  const timeoutPromise = new Promise(function timeoutFunction(_resolve, reject) {
    timeoutHandle = setTimeout(function timeoutHandler() {
      reject(new TimeoutError("Operation timed out."));
    }, timeout);
  });
  return Promise.race([promise, timeoutPromise]).then((result) => {
    clearTimeout(timeoutHandle);
    return result;
  }, (reason) => {
    clearTimeout(timeoutHandle);
    throw reason;
  });
}
var TimeoutError;
var init_timeout = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/timeout.js"() {
    "use strict";
    TimeoutError = class _TimeoutError extends Error {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _TimeoutError.prototype);
      }
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/url.js
function urlMatches(url, urlToMatch) {
  if (typeof urlToMatch === "string") {
    return url === urlToMatch;
  } else {
    return !!url.match(urlToMatch);
  }
}
function isUrlIgnored(url, ignoredUrls) {
  if (!ignoredUrls) {
    return false;
  }
  for (const ignoreUrl of ignoredUrls) {
    if (urlMatches(url, ignoreUrl)) {
      return true;
    }
  }
  return false;
}
var init_url = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/url.js"() {
    "use strict";
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/promise.js
var Deferred;
var init_promise = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/promise.js"() {
    "use strict";
    Deferred = class {
      _promise;
      _resolve;
      _reject;
      constructor() {
        this._promise = new Promise((resolve, reject) => {
          this._resolve = resolve;
          this._reject = reject;
        });
      }
      get promise() {
        return this._promise;
      }
      resolve(val) {
        this._resolve(val);
      }
      reject(err) {
        this._reject(err);
      }
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/callback.js
var BindOnceFuture;
var init_callback = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/callback.js"() {
    "use strict";
    init_promise();
    BindOnceFuture = class {
      _callback;
      _that;
      _isCalled = false;
      _deferred = new Deferred();
      constructor(_callback, _that) {
        this._callback = _callback;
        this._that = _that;
      }
      get isCalled() {
        return this._isCalled;
      }
      get promise() {
        return this._deferred.promise;
      }
      call(...args) {
        if (!this._isCalled) {
          this._isCalled = true;
          try {
            Promise.resolve(this._callback.call(this._that, ...args)).then((val) => this._deferred.resolve(val), (err) => this._deferred.reject(err));
          } catch (err) {
            this._deferred.reject(err);
          }
        }
        return this._deferred.promise;
      }
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/configuration.js
function diagLogLevelFromString(value) {
  if (value == null) {
    return void 0;
  }
  const resolvedLogLevel = logLevelMap[value.toUpperCase()];
  if (resolvedLogLevel == null) {
    import_api10.diag.warn(`Unknown log level "${value}", expected one of ${Object.keys(logLevelMap)}, using default`);
    return import_api10.DiagLogLevel.INFO;
  }
  return resolvedLogLevel;
}
var import_api10, logLevelMap;
var init_configuration = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/configuration.js"() {
    "use strict";
    import_api10 = require("@opentelemetry/api");
    logLevelMap = {
      ALL: import_api10.DiagLogLevel.ALL,
      VERBOSE: import_api10.DiagLogLevel.VERBOSE,
      DEBUG: import_api10.DiagLogLevel.DEBUG,
      INFO: import_api10.DiagLogLevel.INFO,
      WARN: import_api10.DiagLogLevel.WARN,
      ERROR: import_api10.DiagLogLevel.ERROR,
      NONE: import_api10.DiagLogLevel.NONE
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/internal/exporter.js
function _export(exporter, arg) {
  return new Promise((resolve) => {
    import_api11.context.with(suppressTracing(import_api11.context.active()), () => {
      exporter.export(arg, (result) => {
        resolve(result);
      });
    });
  });
}
var import_api11;
var init_exporter = __esm({
  "node_modules/@opentelemetry/core/build/esm/internal/exporter.js"() {
    "use strict";
    import_api11 = require("@opentelemetry/api");
    init_suppress_tracing();
  }
});

// node_modules/@opentelemetry/core/build/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  AnchoredClock: () => AnchoredClock,
  BindOnceFuture: () => BindOnceFuture,
  CompositePropagator: () => CompositePropagator,
  ExportResultCode: () => ExportResultCode,
  RPCType: () => RPCType,
  SDK_INFO: () => SDK_INFO,
  TRACE_PARENT_HEADER: () => TRACE_PARENT_HEADER,
  TRACE_STATE_HEADER: () => TRACE_STATE_HEADER,
  TimeoutError: () => TimeoutError,
  TraceState: () => TraceState,
  W3CBaggagePropagator: () => W3CBaggagePropagator,
  W3CTraceContextPropagator: () => W3CTraceContextPropagator,
  _globalThis: () => _globalThis,
  addHrTimes: () => addHrTimes,
  callWithTimeout: () => callWithTimeout,
  deleteRPCMetadata: () => deleteRPCMetadata,
  diagLogLevelFromString: () => diagLogLevelFromString,
  getBooleanFromEnv: () => getBooleanFromEnv,
  getNumberFromEnv: () => getNumberFromEnv,
  getRPCMetadata: () => getRPCMetadata,
  getStringFromEnv: () => getStringFromEnv,
  getStringListFromEnv: () => getStringListFromEnv,
  getTimeOrigin: () => getTimeOrigin,
  globalErrorHandler: () => globalErrorHandler,
  hrTime: () => hrTime,
  hrTimeDuration: () => hrTimeDuration,
  hrTimeToMicroseconds: () => hrTimeToMicroseconds,
  hrTimeToMilliseconds: () => hrTimeToMilliseconds,
  hrTimeToNanoseconds: () => hrTimeToNanoseconds,
  hrTimeToTimeStamp: () => hrTimeToTimeStamp,
  internal: () => internal,
  isAttributeValue: () => isAttributeValue,
  isTimeInput: () => isTimeInput,
  isTimeInputHrTime: () => isTimeInputHrTime,
  isTracingSuppressed: () => isTracingSuppressed,
  isUrlIgnored: () => isUrlIgnored,
  loggingErrorHandler: () => loggingErrorHandler,
  merge: () => merge,
  millisToHrTime: () => millisToHrTime,
  otperformance: () => otperformance,
  parseKeyPairsIntoRecord: () => parseKeyPairsIntoRecord,
  parseTraceParent: () => parseTraceParent,
  sanitizeAttributes: () => sanitizeAttributes,
  setGlobalErrorHandler: () => setGlobalErrorHandler,
  setRPCMetadata: () => setRPCMetadata,
  suppressTracing: () => suppressTracing,
  timeInputToHrTime: () => timeInputToHrTime,
  unrefTimer: () => unrefTimer,
  unsuppressTracing: () => unsuppressTracing,
  urlMatches: () => urlMatches
});
var internal;
var init_esm2 = __esm({
  "node_modules/@opentelemetry/core/build/esm/index.js"() {
    "use strict";
    init_W3CBaggagePropagator();
    init_anchored_clock();
    init_attributes();
    init_global_error_handler();
    init_logging_error_handler();
    init_time();
    init_ExportResult();
    init_utils();
    init_platform();
    init_composite();
    init_W3CTraceContextPropagator();
    init_rpc_metadata();
    init_suppress_tracing();
    init_TraceState();
    init_merge();
    init_timeout();
    init_url();
    init_callback();
    init_configuration();
    init_exporter();
    internal = {
      _export
    };
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/logging-response-handler.js
function isPartialSuccessResponse(response) {
  return Object.prototype.hasOwnProperty.call(response, "partialSuccess");
}
function createLoggingPartialSuccessResponseHandler() {
  return {
    handleResponse(response) {
      if (response == null || !isPartialSuccessResponse(response) || response.partialSuccess == null || Object.keys(response.partialSuccess).length === 0) {
        return;
      }
      import_api12.diag.warn("Received Partial Success response:", JSON.stringify(response.partialSuccess));
    }
  };
}
var import_api12;
var init_logging_response_handler = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/logging-response-handler.js"() {
    "use strict";
    import_api12 = require("@opentelemetry/api");
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/otlp-export-delegate.js
function createOtlpExportDelegate(components, settings) {
  return new OTLPExportDelegate(components.transport, components.serializer, createLoggingPartialSuccessResponseHandler(), components.promiseHandler, settings.timeout);
}
var import_api13, OTLPExportDelegate;
var init_otlp_export_delegate = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/otlp-export-delegate.js"() {
    "use strict";
    init_esm2();
    init_types();
    init_logging_response_handler();
    import_api13 = require("@opentelemetry/api");
    OTLPExportDelegate = class {
      _transport;
      _serializer;
      _responseHandler;
      _promiseQueue;
      _timeout;
      _diagLogger;
      constructor(_transport, _serializer, _responseHandler, _promiseQueue, _timeout) {
        this._transport = _transport;
        this._serializer = _serializer;
        this._responseHandler = _responseHandler;
        this._promiseQueue = _promiseQueue;
        this._timeout = _timeout;
        this._diagLogger = import_api13.diag.createComponentLogger({
          namespace: "OTLPExportDelegate"
        });
      }
      export(internalRepresentation, resultCallback) {
        this._diagLogger.debug("items to be sent", internalRepresentation);
        if (this._promiseQueue.hasReachedLimit()) {
          resultCallback({
            code: ExportResultCode.FAILED,
            error: new Error("Concurrent export limit reached")
          });
          return;
        }
        const serializedRequest = this._serializer.serializeRequest(internalRepresentation);
        if (serializedRequest == null) {
          resultCallback({
            code: ExportResultCode.FAILED,
            error: new Error("Nothing to send")
          });
          return;
        }
        this._promiseQueue.pushPromise(this._transport.send(serializedRequest, this._timeout).then((response) => {
          if (response.status === "success") {
            if (response.data != null) {
              try {
                this._responseHandler.handleResponse(this._serializer.deserializeResponse(response.data));
              } catch (e) {
                this._diagLogger.warn("Export succeeded but could not deserialize response - is the response specification compliant?", e, response.data);
              }
            }
            resultCallback({
              code: ExportResultCode.SUCCESS
            });
            return;
          } else if (response.status === "failure" && response.error) {
            resultCallback({
              code: ExportResultCode.FAILED,
              error: response.error
            });
            return;
          } else if (response.status === "retryable") {
            resultCallback({
              code: ExportResultCode.FAILED,
              error: new OTLPExporterError("Export failed with retryable status")
            });
          } else {
            resultCallback({
              code: ExportResultCode.FAILED,
              error: new OTLPExporterError("Export failed with unknown error")
            });
          }
        }, (reason) => resultCallback({
          code: ExportResultCode.FAILED,
          error: reason
        })));
      }
      forceFlush() {
        return this._promiseQueue.awaitAll();
      }
      async shutdown() {
        this._diagLogger.debug("shutdown started");
        await this.forceFlush();
        this._transport.shutdown();
      }
    };
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/otlp-network-export-delegate.js
function createOtlpNetworkExportDelegate(options2, serializer, transport) {
  return createOtlpExportDelegate({
    transport,
    serializer,
    promiseHandler: createBoundedQueueExportPromiseHandler(options2)
  }, { timeout: options2.timeoutMillis });
}
var init_otlp_network_export_delegate = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/otlp-network-export-delegate.js"() {
    "use strict";
    init_bounded_queue_export_promise_handler();
    init_otlp_export_delegate();
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/index.js
var esm_exports2 = {};
__export(esm_exports2, {
  CompressionAlgorithm: () => CompressionAlgorithm,
  OTLPExporterBase: () => OTLPExporterBase,
  OTLPExporterError: () => OTLPExporterError,
  createOtlpNetworkExportDelegate: () => createOtlpNetworkExportDelegate,
  getSharedConfigurationDefaults: () => getSharedConfigurationDefaults,
  mergeOtlpSharedConfigurationWithDefaults: () => mergeOtlpSharedConfigurationWithDefaults
});
var init_esm3 = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/index.js"() {
    "use strict";
    init_OTLPExporterBase();
    init_types();
    init_shared_configuration();
    init_legacy_node_configuration();
    init_otlp_network_export_delegate();
  }
});

// node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/create-service-client-constructor.js
var require_create_service_client_constructor = __commonJS({
  "node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/create-service-client-constructor.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createServiceClientConstructor = void 0;
    var grpc2 = require("@grpc/grpc-js");
    function createServiceClientConstructor(path, name) {
      const serviceDefinition = {
        export: {
          path,
          requestStream: false,
          responseStream: false,
          requestSerialize: (arg) => {
            return arg;
          },
          requestDeserialize: (arg) => {
            return arg;
          },
          responseSerialize: (arg) => {
            return arg;
          },
          responseDeserialize: (arg) => {
            return arg;
          }
        }
      };
      return grpc2.makeGenericClientConstructor(serviceDefinition, name);
    }
    exports2.createServiceClientConstructor = createServiceClientConstructor;
  }
});

// node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/grpc-exporter-transport.js
var require_grpc_exporter_transport = __commonJS({
  "node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/grpc-exporter-transport.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createOtlpGrpcExporterTransport = exports2.GrpcExporterTransport = exports2.createEmptyMetadata = exports2.createSslCredentials = exports2.createInsecureCredentials = void 0;
    var GRPC_COMPRESSION_NONE = 0;
    var GRPC_COMPRESSION_GZIP = 2;
    function toGrpcCompression(compression) {
      return compression === "gzip" ? GRPC_COMPRESSION_GZIP : GRPC_COMPRESSION_NONE;
    }
    function createInsecureCredentials() {
      const {
        credentials: credentials8
        // eslint-disable-next-line @typescript-eslint/no-require-imports
      } = require("@grpc/grpc-js");
      return credentials8.createInsecure();
    }
    exports2.createInsecureCredentials = createInsecureCredentials;
    function createSslCredentials(rootCert, privateKey, certChain) {
      const {
        credentials: credentials8
        // eslint-disable-next-line @typescript-eslint/no-require-imports
      } = require("@grpc/grpc-js");
      return credentials8.createSsl(rootCert, privateKey, certChain);
    }
    exports2.createSslCredentials = createSslCredentials;
    function createEmptyMetadata() {
      const {
        Metadata: Metadata2
        // eslint-disable-next-line @typescript-eslint/no-require-imports
      } = require("@grpc/grpc-js");
      return new Metadata2();
    }
    exports2.createEmptyMetadata = createEmptyMetadata;
    var GrpcExporterTransport = class {
      _parameters;
      _client;
      _metadata;
      constructor(_parameters) {
        this._parameters = _parameters;
      }
      shutdown() {
        this._client?.close();
      }
      send(data, timeoutMillis) {
        const buffer = Buffer.from(data);
        if (this._client == null) {
          const {
            createServiceClientConstructor
            // eslint-disable-next-line @typescript-eslint/no-require-imports
          } = require_create_service_client_constructor();
          try {
            this._metadata = this._parameters.metadata();
          } catch (error) {
            return Promise.resolve({
              status: "failure",
              error
            });
          }
          const clientConstructor = createServiceClientConstructor(this._parameters.grpcPath, this._parameters.grpcName);
          try {
            this._client = new clientConstructor(this._parameters.address, this._parameters.credentials(), {
              "grpc.default_compression_algorithm": toGrpcCompression(this._parameters.compression)
            });
          } catch (error) {
            return Promise.resolve({
              status: "failure",
              error
            });
          }
        }
        return new Promise((resolve) => {
          const deadline = Date.now() + timeoutMillis;
          if (this._metadata == null) {
            return resolve({
              error: new Error("metadata was null"),
              status: "failure"
            });
          }
          this._client.export(buffer, this._metadata, { deadline }, (err, response) => {
            if (err) {
              resolve({
                status: "failure",
                error: err
              });
            } else {
              resolve({
                data: response,
                status: "success"
              });
            }
          });
        });
      }
    };
    exports2.GrpcExporterTransport = GrpcExporterTransport;
    function createOtlpGrpcExporterTransport(options2) {
      return new GrpcExporterTransport(options2);
    }
    exports2.createOtlpGrpcExporterTransport = createOtlpGrpcExporterTransport;
  }
});

// node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/version.js
var require_version = __commonJS({
  "node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.VERSION = void 0;
    exports2.VERSION = "0.206.0";
  }
});

// node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/configuration/otlp-grpc-configuration.js
var require_otlp_grpc_configuration = __commonJS({
  "node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/configuration/otlp-grpc-configuration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getOtlpGrpcDefaultConfiguration = exports2.mergeOtlpGrpcConfigurationWithDefaults = exports2.validateAndNormalizeUrl = void 0;
    var otlp_exporter_base_1 = (init_esm3(), __toCommonJS(esm_exports2));
    var grpc_exporter_transport_1 = require_grpc_exporter_transport();
    var version_1 = require_version();
    var url_1 = require("url");
    var api_1 = require("@opentelemetry/api");
    function validateAndNormalizeUrl(url) {
      url = url.trim();
      const hasProtocol = url.match(/^([\w]{1,8}):\/\//);
      if (!hasProtocol) {
        url = `https://${url}`;
      }
      const target = new url_1.URL(url);
      if (target.protocol === "unix:") {
        return url;
      }
      if (target.pathname && target.pathname !== "/") {
        api_1.diag.warn("URL path should not be set when using grpc, the path part of the URL will be ignored.");
      }
      if (target.protocol !== "" && !target.protocol?.match(/^(http)s?:$/)) {
        api_1.diag.warn("URL protocol should be http(s)://. Using http://.");
      }
      return target.host;
    }
    exports2.validateAndNormalizeUrl = validateAndNormalizeUrl;
    function overrideMetadataEntriesIfNotPresent(metadata, additionalMetadata) {
      for (const [key, value] of Object.entries(additionalMetadata.getMap())) {
        if (metadata.get(key).length < 1) {
          metadata.set(key, value);
        }
      }
    }
    function mergeOtlpGrpcConfigurationWithDefaults(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration) {
      const rawUrl = userProvidedConfiguration.url ?? fallbackConfiguration.url ?? defaultConfiguration.url;
      return {
        ...(0, otlp_exporter_base_1.mergeOtlpSharedConfigurationWithDefaults)(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration),
        metadata: () => {
          const metadata = defaultConfiguration.metadata();
          overrideMetadataEntriesIfNotPresent(
            metadata,
            // clone to ensure we don't modify what the user gave us in case they hold on to the returned reference
            userProvidedConfiguration.metadata?.().clone() ?? (0, grpc_exporter_transport_1.createEmptyMetadata)()
          );
          overrideMetadataEntriesIfNotPresent(metadata, fallbackConfiguration.metadata?.() ?? (0, grpc_exporter_transport_1.createEmptyMetadata)());
          return metadata;
        },
        url: validateAndNormalizeUrl(rawUrl),
        credentials: userProvidedConfiguration.credentials ?? fallbackConfiguration.credentials?.(rawUrl) ?? defaultConfiguration.credentials(rawUrl)
      };
    }
    exports2.mergeOtlpGrpcConfigurationWithDefaults = mergeOtlpGrpcConfigurationWithDefaults;
    function getOtlpGrpcDefaultConfiguration() {
      return {
        ...(0, otlp_exporter_base_1.getSharedConfigurationDefaults)(),
        metadata: () => {
          const metadata = (0, grpc_exporter_transport_1.createEmptyMetadata)();
          metadata.set("User-Agent", `OTel-OTLP-Exporter-JavaScript/${version_1.VERSION}`);
          return metadata;
        },
        url: "http://localhost:4317",
        credentials: (url) => {
          if (url.startsWith("http://")) {
            return () => (0, grpc_exporter_transport_1.createInsecureCredentials)();
          } else {
            return () => (0, grpc_exporter_transport_1.createSslCredentials)();
          }
        }
      };
    }
    exports2.getOtlpGrpcDefaultConfiguration = getOtlpGrpcDefaultConfiguration;
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/util.js
function validateAndNormalizeHeaders(partialHeaders) {
  return () => {
    const headers = {};
    Object.entries(partialHeaders?.() ?? {}).forEach(([key, value]) => {
      if (typeof value !== "undefined") {
        headers[key] = String(value);
      } else {
        import_api14.diag.warn(`Header "${key}" has invalid value (${value}) and will be ignored`);
      }
    });
    return headers;
  };
}
var import_api14;
var init_util = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/util.js"() {
    "use strict";
    import_api14 = require("@opentelemetry/api");
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/otlp-http-configuration.js
function mergeHeaders(userProvidedHeaders, fallbackHeaders, defaultHeaders) {
  const requiredHeaders = {
    ...defaultHeaders()
  };
  const headers = {};
  return () => {
    if (fallbackHeaders != null) {
      Object.assign(headers, fallbackHeaders());
    }
    if (userProvidedHeaders != null) {
      Object.assign(headers, userProvidedHeaders());
    }
    return Object.assign(headers, requiredHeaders);
  };
}
function validateUserProvidedUrl(url) {
  if (url == null) {
    return void 0;
  }
  try {
    const base = globalThis.location?.href;
    return new URL(url, base).href;
  } catch {
    throw new Error(`Configuration: Could not parse user-provided export URL: '${url}'`);
  }
}
function mergeOtlpHttpConfigurationWithDefaults(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration) {
  return {
    ...mergeOtlpSharedConfigurationWithDefaults(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration),
    headers: mergeHeaders(validateAndNormalizeHeaders(userProvidedConfiguration.headers), fallbackConfiguration.headers, defaultConfiguration.headers),
    url: validateUserProvidedUrl(userProvidedConfiguration.url) ?? fallbackConfiguration.url ?? defaultConfiguration.url
  };
}
function getHttpConfigurationDefaults(requiredHeaders, signalResourcePath) {
  return {
    ...getSharedConfigurationDefaults(),
    headers: () => requiredHeaders,
    url: "http://localhost:4318/" + signalResourcePath
  };
}
var init_otlp_http_configuration = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/otlp-http-configuration.js"() {
    "use strict";
    init_shared_configuration();
    init_util();
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/otlp-node-http-configuration.js
function httpAgentFactoryFromOptions(options2) {
  return async (protocol) => {
    const module2 = protocol === "http:" ? import("http") : import("https");
    const { Agent } = await module2;
    return new Agent(options2);
  };
}
function mergeOtlpNodeHttpConfigurationWithDefaults(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration) {
  return {
    ...mergeOtlpHttpConfigurationWithDefaults(userProvidedConfiguration, fallbackConfiguration, defaultConfiguration),
    agentFactory: userProvidedConfiguration.agentFactory ?? fallbackConfiguration.agentFactory ?? defaultConfiguration.agentFactory
  };
}
function getNodeHttpConfigurationDefaults(requiredHeaders, signalResourcePath) {
  return {
    ...getHttpConfigurationDefaults(requiredHeaders, signalResourcePath),
    agentFactory: httpAgentFactoryFromOptions({ keepAlive: true })
  };
}
var init_otlp_node_http_configuration = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/otlp-node-http-configuration.js"() {
    "use strict";
    init_otlp_http_configuration();
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/is-export-retryable.js
function isExportRetryable(statusCode) {
  const retryCodes = [429, 502, 503, 504];
  return retryCodes.includes(statusCode);
}
function parseRetryAfterToMills(retryAfter) {
  if (retryAfter == null) {
    return void 0;
  }
  const seconds = Number.parseInt(retryAfter, 10);
  if (Number.isInteger(seconds)) {
    return seconds > 0 ? seconds * 1e3 : -1;
  }
  const delay = new Date(retryAfter).getTime() - Date.now();
  if (delay >= 0) {
    return delay;
  }
  return 0;
}
var init_is_export_retryable = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/is-export-retryable.js"() {
    "use strict";
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/transport/http-transport-utils.js
function sendWithHttp(request, params, agent, data, onDone, timeoutMillis) {
  const parsedUrl = new URL(params.url);
  const options2 = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.pathname,
    method: "POST",
    headers: {
      ...params.headers()
    },
    agent
  };
  const req = request(options2, (res) => {
    const responseData = [];
    res.on("data", (chunk) => responseData.push(chunk));
    res.on("end", () => {
      if (res.statusCode && res.statusCode < 299) {
        onDone({
          status: "success",
          data: Buffer.concat(responseData)
        });
      } else if (res.statusCode && isExportRetryable(res.statusCode)) {
        onDone({
          status: "retryable",
          retryInMillis: parseRetryAfterToMills(res.headers["retry-after"])
        });
      } else {
        const error = new OTLPExporterError(res.statusMessage, res.statusCode, Buffer.concat(responseData).toString());
        onDone({
          status: "failure",
          error
        });
      }
    });
  });
  req.setTimeout(timeoutMillis, () => {
    req.destroy();
    onDone({
      status: "failure",
      error: new Error("Request Timeout")
    });
  });
  req.on("error", (error) => {
    onDone({
      status: "failure",
      error
    });
  });
  compressAndSend(req, params.compression, data, (error) => {
    onDone({
      status: "failure",
      error
    });
  });
}
function compressAndSend(req, compression, data, onError) {
  let dataStream = readableFromUint8Array(data);
  if (compression === "gzip") {
    req.setHeader("Content-Encoding", "gzip");
    dataStream = dataStream.on("error", onError).pipe(zlib.createGzip()).on("error", onError);
  }
  dataStream.pipe(req).on("error", onError);
}
function readableFromUint8Array(buff) {
  const readable = new import_stream.Readable();
  readable.push(buff);
  readable.push(null);
  return readable;
}
var zlib, import_stream;
var init_http_transport_utils = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/transport/http-transport-utils.js"() {
    "use strict";
    zlib = __toESM(require("zlib"));
    import_stream = require("stream");
    init_is_export_retryable();
    init_types();
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/transport/http-exporter-transport.js
async function requestFunctionFactory(protocol) {
  const module2 = protocol === "http:" ? import("http") : import("https");
  const { request } = await module2;
  return request;
}
function createHttpExporterTransport(parameters) {
  return new HttpExporterTransport(parameters);
}
var HttpExporterTransport;
var init_http_exporter_transport = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/transport/http-exporter-transport.js"() {
    "use strict";
    init_http_transport_utils();
    HttpExporterTransport = class {
      _parameters;
      _utils = null;
      constructor(_parameters) {
        this._parameters = _parameters;
      }
      async send(data, timeoutMillis) {
        const { agent, request } = await this._loadUtils();
        return new Promise((resolve) => {
          sendWithHttp(request, this._parameters, agent, data, (result) => {
            resolve(result);
          }, timeoutMillis);
        });
      }
      shutdown() {
      }
      async _loadUtils() {
        let utils = this._utils;
        if (utils === null) {
          const protocol = new URL(this._parameters.url).protocol;
          const [agent, request] = await Promise.all([
            this._parameters.agentFactory(protocol),
            requestFunctionFactory(protocol)
          ]);
          utils = this._utils = { agent, request };
        }
        return utils;
      }
    };
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/retrying-transport.js
function getJitter() {
  return Math.random() * (2 * JITTER) - JITTER;
}
function createRetryingTransport(options2) {
  return new RetryingTransport(options2.transport);
}
var MAX_ATTEMPTS, INITIAL_BACKOFF, MAX_BACKOFF, BACKOFF_MULTIPLIER, JITTER, RetryingTransport;
var init_retrying_transport = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/retrying-transport.js"() {
    "use strict";
    MAX_ATTEMPTS = 5;
    INITIAL_BACKOFF = 1e3;
    MAX_BACKOFF = 5e3;
    BACKOFF_MULTIPLIER = 1.5;
    JITTER = 0.2;
    RetryingTransport = class {
      _transport;
      constructor(_transport) {
        this._transport = _transport;
      }
      retry(data, timeoutMillis, inMillis) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this._transport.send(data, timeoutMillis).then(resolve, reject);
          }, inMillis);
        });
      }
      async send(data, timeoutMillis) {
        const deadline = Date.now() + timeoutMillis;
        let result = await this._transport.send(data, timeoutMillis);
        let attempts = MAX_ATTEMPTS;
        let nextBackoff = INITIAL_BACKOFF;
        while (result.status === "retryable" && attempts > 0) {
          attempts--;
          const backoff = Math.max(Math.min(nextBackoff, MAX_BACKOFF) + getJitter(), 0);
          nextBackoff = nextBackoff * BACKOFF_MULTIPLIER;
          const retryInMillis = result.retryInMillis ?? backoff;
          const remainingTimeoutMillis = deadline - Date.now();
          if (retryInMillis > remainingTimeoutMillis) {
            return result;
          }
          result = await this.retry(data, remainingTimeoutMillis, retryInMillis);
        }
        return result;
      }
      shutdown() {
        return this._transport.shutdown();
      }
    };
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/otlp-http-export-delegate.js
function createOtlpHttpExportDelegate(options2, serializer) {
  return createOtlpExportDelegate({
    transport: createRetryingTransport({
      transport: createHttpExporterTransport(options2)
    }),
    serializer,
    promiseHandler: createBoundedQueueExportPromiseHandler(options2)
  }, { timeout: options2.timeoutMillis });
}
var init_otlp_http_export_delegate = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/otlp-http-export-delegate.js"() {
    "use strict";
    init_otlp_export_delegate();
    init_http_exporter_transport();
    init_bounded_queue_export_promise_handler();
    init_retrying_transport();
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/shared-env-configuration.js
function parseAndValidateTimeoutFromEnv(timeoutEnvVar) {
  const envTimeout = getNumberFromEnv(timeoutEnvVar);
  if (envTimeout != null) {
    if (Number.isFinite(envTimeout) && envTimeout > 0) {
      return envTimeout;
    }
    import_api15.diag.warn(`Configuration: ${timeoutEnvVar} is invalid, expected number greater than 0 (actual: ${envTimeout})`);
  }
  return void 0;
}
function getTimeoutFromEnv(signalIdentifier) {
  const specificTimeout = parseAndValidateTimeoutFromEnv(`OTEL_EXPORTER_OTLP_${signalIdentifier}_TIMEOUT`);
  const nonSpecificTimeout = parseAndValidateTimeoutFromEnv("OTEL_EXPORTER_OTLP_TIMEOUT");
  return specificTimeout ?? nonSpecificTimeout;
}
function parseAndValidateCompressionFromEnv(compressionEnvVar) {
  const compression = getStringFromEnv(compressionEnvVar)?.trim();
  if (compression == null || compression === "none" || compression === "gzip") {
    return compression;
  }
  import_api15.diag.warn(`Configuration: ${compressionEnvVar} is invalid, expected 'none' or 'gzip' (actual: '${compression}')`);
  return void 0;
}
function getCompressionFromEnv(signalIdentifier) {
  const specificCompression = parseAndValidateCompressionFromEnv(`OTEL_EXPORTER_OTLP_${signalIdentifier}_COMPRESSION`);
  const nonSpecificCompression = parseAndValidateCompressionFromEnv("OTEL_EXPORTER_OTLP_COMPRESSION");
  return specificCompression ?? nonSpecificCompression;
}
function getSharedConfigurationFromEnvironment(signalIdentifier) {
  return {
    timeoutMillis: getTimeoutFromEnv(signalIdentifier),
    compression: getCompressionFromEnv(signalIdentifier)
  };
}
var import_api15;
var init_shared_env_configuration = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/shared-env-configuration.js"() {
    "use strict";
    init_esm2();
    import_api15 = require("@opentelemetry/api");
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/otlp-node-http-env-configuration.js
function getStaticHeadersFromEnv(signalIdentifier) {
  const signalSpecificRawHeaders = getStringFromEnv(`OTEL_EXPORTER_OTLP_${signalIdentifier}_HEADERS`);
  const nonSignalSpecificRawHeaders = getStringFromEnv("OTEL_EXPORTER_OTLP_HEADERS");
  const signalSpecificHeaders = parseKeyPairsIntoRecord(signalSpecificRawHeaders);
  const nonSignalSpecificHeaders = parseKeyPairsIntoRecord(nonSignalSpecificRawHeaders);
  if (Object.keys(signalSpecificHeaders).length === 0 && Object.keys(nonSignalSpecificHeaders).length === 0) {
    return void 0;
  }
  return Object.assign({}, parseKeyPairsIntoRecord(nonSignalSpecificRawHeaders), parseKeyPairsIntoRecord(signalSpecificRawHeaders));
}
function appendRootPathToUrlIfNeeded(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.toString();
  } catch {
    import_api16.diag.warn(`Configuration: Could not parse environment-provided export URL: '${url}', falling back to undefined`);
    return void 0;
  }
}
function appendResourcePathToUrl(url, path) {
  try {
    new URL(url);
  } catch {
    import_api16.diag.warn(`Configuration: Could not parse environment-provided export URL: '${url}', falling back to undefined`);
    return void 0;
  }
  if (!url.endsWith("/")) {
    url = url + "/";
  }
  url += path;
  try {
    new URL(url);
  } catch {
    import_api16.diag.warn(`Configuration: Provided URL appended with '${path}' is not a valid URL, using 'undefined' instead of '${url}'`);
    return void 0;
  }
  return url;
}
function getNonSpecificUrlFromEnv(signalResourcePath) {
  const envUrl = getStringFromEnv("OTEL_EXPORTER_OTLP_ENDPOINT");
  if (envUrl === void 0) {
    return void 0;
  }
  return appendResourcePathToUrl(envUrl, signalResourcePath);
}
function getSpecificUrlFromEnv(signalIdentifier) {
  const envUrl = getStringFromEnv(`OTEL_EXPORTER_OTLP_${signalIdentifier}_ENDPOINT`);
  if (envUrl === void 0) {
    return void 0;
  }
  return appendRootPathToUrlIfNeeded(envUrl);
}
function getNodeHttpConfigurationFromEnvironment(signalIdentifier, signalResourcePath) {
  return {
    ...getSharedConfigurationFromEnvironment(signalIdentifier),
    url: getSpecificUrlFromEnv(signalIdentifier) ?? getNonSpecificUrlFromEnv(signalResourcePath),
    headers: wrapStaticHeadersInFunction(getStaticHeadersFromEnv(signalIdentifier))
  };
}
var import_api16;
var init_otlp_node_http_env_configuration = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/otlp-node-http-env-configuration.js"() {
    "use strict";
    init_esm2();
    import_api16 = require("@opentelemetry/api");
    init_shared_env_configuration();
    init_shared_configuration();
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/convert-legacy-node-http-options.js
function convertLegacyAgentOptions(config2) {
  if (typeof config2.httpAgentOptions === "function") {
    return config2.httpAgentOptions;
  }
  let legacy = config2.httpAgentOptions;
  if (config2.keepAlive != null) {
    legacy = { keepAlive: config2.keepAlive, ...legacy };
  }
  if (legacy != null) {
    return httpAgentFactoryFromOptions(legacy);
  } else {
    return void 0;
  }
}
function convertLegacyHttpOptions(config2, signalIdentifier, signalResourcePath, requiredHeaders) {
  if (config2.metadata) {
    import_api17.diag.warn("Metadata cannot be set when using http");
  }
  return mergeOtlpNodeHttpConfigurationWithDefaults({
    url: config2.url,
    headers: wrapStaticHeadersInFunction(config2.headers),
    concurrencyLimit: config2.concurrencyLimit,
    timeoutMillis: config2.timeoutMillis,
    compression: config2.compression,
    agentFactory: convertLegacyAgentOptions(config2)
  }, getNodeHttpConfigurationFromEnvironment(signalIdentifier, signalResourcePath), getNodeHttpConfigurationDefaults(requiredHeaders, signalResourcePath));
}
var import_api17;
var init_convert_legacy_node_http_options = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/configuration/convert-legacy-node-http-options.js"() {
    "use strict";
    import_api17 = require("@opentelemetry/api");
    init_shared_configuration();
    init_otlp_node_http_configuration();
    init_index_node_http();
    init_otlp_node_http_env_configuration();
  }
});

// node_modules/@opentelemetry/otlp-exporter-base/build/esm/index-node-http.js
var index_node_http_exports = {};
__export(index_node_http_exports, {
  convertLegacyHttpOptions: () => convertLegacyHttpOptions,
  createOtlpHttpExportDelegate: () => createOtlpHttpExportDelegate,
  getSharedConfigurationFromEnvironment: () => getSharedConfigurationFromEnvironment,
  httpAgentFactoryFromOptions: () => httpAgentFactoryFromOptions
});
var init_index_node_http = __esm({
  "node_modules/@opentelemetry/otlp-exporter-base/build/esm/index-node-http.js"() {
    "use strict";
    init_otlp_node_http_configuration();
    init_otlp_http_export_delegate();
    init_shared_env_configuration();
    init_convert_legacy_node_http_options();
  }
});

// node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/configuration/otlp-grpc-env-configuration.js
var require_otlp_grpc_env_configuration = __commonJS({
  "node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/configuration/otlp-grpc-env-configuration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getOtlpGrpcConfigurationFromEnv = void 0;
    var core_1 = (init_esm2(), __toCommonJS(esm_exports));
    var grpc_exporter_transport_1 = require_grpc_exporter_transport();
    var node_http_1 = (init_index_node_http(), __toCommonJS(index_node_http_exports));
    var fs = require("fs");
    var path = require("path");
    var api_1 = require("@opentelemetry/api");
    function fallbackIfNullishOrBlank(signalSpecific, nonSignalSpecific) {
      if (signalSpecific != null && signalSpecific !== "") {
        return signalSpecific;
      }
      if (nonSignalSpecific != null && nonSignalSpecific !== "") {
        return nonSignalSpecific;
      }
      return void 0;
    }
    function getMetadataFromEnv(signalIdentifier) {
      const signalSpecificRawHeaders = process.env[`OTEL_EXPORTER_OTLP_${signalIdentifier}_HEADERS`]?.trim();
      const nonSignalSpecificRawHeaders = process.env["OTEL_EXPORTER_OTLP_HEADERS"]?.trim();
      const signalSpecificHeaders = (0, core_1.parseKeyPairsIntoRecord)(signalSpecificRawHeaders);
      const nonSignalSpecificHeaders = (0, core_1.parseKeyPairsIntoRecord)(nonSignalSpecificRawHeaders);
      if (Object.keys(signalSpecificHeaders).length === 0 && Object.keys(nonSignalSpecificHeaders).length === 0) {
        return void 0;
      }
      const mergeHeaders2 = Object.assign({}, nonSignalSpecificHeaders, signalSpecificHeaders);
      const metadata = (0, grpc_exporter_transport_1.createEmptyMetadata)();
      for (const [key, value] of Object.entries(mergeHeaders2)) {
        metadata.set(key, value);
      }
      return metadata;
    }
    function getMetadataProviderFromEnv(signalIdentifier) {
      const metadata = getMetadataFromEnv(signalIdentifier);
      if (metadata == null) {
        return void 0;
      }
      return () => metadata;
    }
    function getUrlFromEnv(signalIdentifier) {
      const specificEndpoint = process.env[`OTEL_EXPORTER_OTLP_${signalIdentifier}_ENDPOINT`]?.trim();
      const nonSpecificEndpoint = process.env[`OTEL_EXPORTER_OTLP_ENDPOINT`]?.trim();
      return fallbackIfNullishOrBlank(specificEndpoint, nonSpecificEndpoint);
    }
    function getInsecureSettingFromEnv(signalIdentifier) {
      const signalSpecificInsecureValue = process.env[`OTEL_EXPORTER_OTLP_${signalIdentifier}_INSECURE`]?.toLowerCase().trim();
      const nonSignalSpecificInsecureValue = process.env[`OTEL_EXPORTER_OTLP_INSECURE`]?.toLowerCase().trim();
      return fallbackIfNullishOrBlank(signalSpecificInsecureValue, nonSignalSpecificInsecureValue) === "true";
    }
    function readFileFromEnv(signalSpecificEnvVar, nonSignalSpecificEnvVar, warningMessage) {
      const signalSpecificPath = process.env[signalSpecificEnvVar]?.trim();
      const nonSignalSpecificPath = process.env[nonSignalSpecificEnvVar]?.trim();
      const filePath = fallbackIfNullishOrBlank(signalSpecificPath, nonSignalSpecificPath);
      if (filePath != null) {
        try {
          return fs.readFileSync(path.resolve(process.cwd(), filePath));
        } catch {
          api_1.diag.warn(warningMessage);
          return void 0;
        }
      } else {
        return void 0;
      }
    }
    function getClientCertificateFromEnv(signalIdentifier) {
      return readFileFromEnv(`OTEL_EXPORTER_OTLP_${signalIdentifier}_CLIENT_CERTIFICATE`, "OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE", "Failed to read client certificate chain file");
    }
    function getClientKeyFromEnv(signalIdentifier) {
      return readFileFromEnv(`OTEL_EXPORTER_OTLP_${signalIdentifier}_CLIENT_KEY`, "OTEL_EXPORTER_OTLP_CLIENT_KEY", "Failed to read client certificate private key file");
    }
    function getRootCertificateFromEnv(signalIdentifier) {
      return readFileFromEnv(`OTEL_EXPORTER_OTLP_${signalIdentifier}_CERTIFICATE`, "OTEL_EXPORTER_OTLP_CERTIFICATE", "Failed to read root certificate file");
    }
    function getCredentialsFromEnvIgnoreInsecure(signalIdentifier) {
      const clientKey = getClientKeyFromEnv(signalIdentifier);
      const clientCertificate = getClientCertificateFromEnv(signalIdentifier);
      const rootCertificate = getRootCertificateFromEnv(signalIdentifier);
      const clientChainIntact = clientKey != null && clientCertificate != null;
      if (rootCertificate != null && !clientChainIntact) {
        api_1.diag.warn("Client key and certificate must both be provided, but one was missing - attempting to create credentials from just the root certificate");
        return (0, grpc_exporter_transport_1.createSslCredentials)(getRootCertificateFromEnv(signalIdentifier));
      }
      return (0, grpc_exporter_transport_1.createSslCredentials)(rootCertificate, clientKey, clientCertificate);
    }
    function getCredentialsFromEnv(signalIdentifier) {
      if (getInsecureSettingFromEnv(signalIdentifier)) {
        return (0, grpc_exporter_transport_1.createInsecureCredentials)();
      }
      return getCredentialsFromEnvIgnoreInsecure(signalIdentifier);
    }
    function getOtlpGrpcConfigurationFromEnv(signalIdentifier) {
      return {
        ...(0, node_http_1.getSharedConfigurationFromEnvironment)(signalIdentifier),
        metadata: getMetadataProviderFromEnv(signalIdentifier),
        url: getUrlFromEnv(signalIdentifier),
        credentials: (finalResolvedUrl) => {
          if (finalResolvedUrl.startsWith("http://")) {
            return () => {
              return (0, grpc_exporter_transport_1.createInsecureCredentials)();
            };
          } else if (finalResolvedUrl.startsWith("https://")) {
            return () => {
              return getCredentialsFromEnvIgnoreInsecure(signalIdentifier);
            };
          }
          return () => {
            return getCredentialsFromEnv(signalIdentifier);
          };
        }
      };
    }
    exports2.getOtlpGrpcConfigurationFromEnv = getOtlpGrpcConfigurationFromEnv;
  }
});

// node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/configuration/convert-legacy-otlp-grpc-options.js
var require_convert_legacy_otlp_grpc_options = __commonJS({
  "node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/configuration/convert-legacy-otlp-grpc-options.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.convertLegacyOtlpGrpcOptions = void 0;
    var api_1 = require("@opentelemetry/api");
    var otlp_grpc_configuration_1 = require_otlp_grpc_configuration();
    var grpc_exporter_transport_1 = require_grpc_exporter_transport();
    var otlp_grpc_env_configuration_1 = require_otlp_grpc_env_configuration();
    function convertLegacyOtlpGrpcOptions(config2, signalIdentifier) {
      if (config2.headers) {
        api_1.diag.warn("Headers cannot be set when using grpc");
      }
      const userProvidedCredentials = config2.credentials;
      return (0, otlp_grpc_configuration_1.mergeOtlpGrpcConfigurationWithDefaults)({
        url: config2.url,
        metadata: () => {
          return config2.metadata ?? (0, grpc_exporter_transport_1.createEmptyMetadata)();
        },
        compression: config2.compression,
        timeoutMillis: config2.timeoutMillis,
        concurrencyLimit: config2.concurrencyLimit,
        credentials: userProvidedCredentials != null ? () => userProvidedCredentials : void 0
      }, (0, otlp_grpc_env_configuration_1.getOtlpGrpcConfigurationFromEnv)(signalIdentifier), (0, otlp_grpc_configuration_1.getOtlpGrpcDefaultConfiguration)());
    }
    exports2.convertLegacyOtlpGrpcOptions = convertLegacyOtlpGrpcOptions;
  }
});

// node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/otlp-grpc-export-delegate.js
var require_otlp_grpc_export_delegate = __commonJS({
  "node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/otlp-grpc-export-delegate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createOtlpGrpcExportDelegate = void 0;
    var otlp_exporter_base_1 = (init_esm3(), __toCommonJS(esm_exports2));
    var grpc_exporter_transport_1 = require_grpc_exporter_transport();
    function createOtlpGrpcExportDelegate(options2, serializer, grpcName, grpcPath) {
      return (0, otlp_exporter_base_1.createOtlpNetworkExportDelegate)(options2, serializer, (0, grpc_exporter_transport_1.createOtlpGrpcExporterTransport)({
        address: options2.url,
        compression: options2.compression,
        credentials: options2.credentials,
        metadata: options2.metadata,
        grpcName,
        grpcPath
      }));
    }
    exports2.createOtlpGrpcExportDelegate = createOtlpGrpcExportDelegate;
  }
});

// node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/index.js
var require_src = __commonJS({
  "node_modules/@opentelemetry/otlp-grpc-exporter-base/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createOtlpGrpcExportDelegate = exports2.convertLegacyOtlpGrpcOptions = void 0;
    var convert_legacy_otlp_grpc_options_1 = require_convert_legacy_otlp_grpc_options();
    Object.defineProperty(exports2, "convertLegacyOtlpGrpcOptions", { enumerable: true, get: function() {
      return convert_legacy_otlp_grpc_options_1.convertLegacyOtlpGrpcOptions;
    } });
    var otlp_grpc_export_delegate_1 = require_otlp_grpc_export_delegate();
    Object.defineProperty(exports2, "createOtlpGrpcExportDelegate", { enumerable: true, get: function() {
      return otlp_grpc_export_delegate_1.createOtlpGrpcExportDelegate;
    } });
  }
});

// node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
      while (index < arguments.length)
        params[offset++] = arguments[index++];
      return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err) {
          if (pending) {
            pending = false;
            if (err)
              reject(err);
            else {
              var params2 = new Array(arguments.length - 1), offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve.apply(null, params2);
            }
          }
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  }
});

// node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base64 = exports2;
    base64.length = function length(string) {
      var p = string.length;
      if (!p)
        return 0;
      var n = 0;
      while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
      return Math.ceil(string.length * 3) / 4 - n;
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base64.encode = function encode(buffer, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
        var b = buffer[start++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | b >> 4];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | b >> 6];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1)
          chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    };
    var invalidEncoding = "invalid encoding";
    base64.decode = function decode(string, buffer, offset) {
      var start = offset;
      var j = 0, t;
      for (var i2 = 0; i2 < string.length; ) {
        var c = string.charCodeAt(i2++);
        if (c === 61 && j > 1)
          break;
        if ((c = s64[c]) === void 0)
          throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer[offset++] = (t & 3) << 6 | c;
            j = 0;
            break;
        }
      }
      if (j === 1)
        throw Error(invalidEncoding);
      return offset - start;
    };
    base64.test = function test(string) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
    };
  }
});

// node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    module2.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = {};
    }
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
      if (evt === void 0)
        this._listeners = {};
      else {
        if (fn === void 0)
          this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn)
              listeners.splice(i, 1);
            else
              ++i;
        }
      }
      return this;
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [], i = 1;
        for (; i < arguments.length; )
          args.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    };
  }
});

// node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    module2.exports = factory(factory);
    function factory(exports3) {
      if (typeof Float32Array !== "undefined") (function() {
        var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
        function writeFloat_f32_cpy(val, buf, pos) {
          f32[0] = val;
          buf[pos] = f8b[0];
          buf[pos + 1] = f8b[1];
          buf[pos + 2] = f8b[2];
          buf[pos + 3] = f8b[3];
        }
        function writeFloat_f32_rev(val, buf, pos) {
          f32[0] = val;
          buf[pos] = f8b[3];
          buf[pos + 1] = f8b[2];
          buf[pos + 2] = f8b[1];
          buf[pos + 3] = f8b[0];
        }
        exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
        function readFloat_f32_cpy(buf, pos) {
          f8b[0] = buf[pos];
          f8b[1] = buf[pos + 1];
          f8b[2] = buf[pos + 2];
          f8b[3] = buf[pos + 3];
          return f32[0];
        }
        function readFloat_f32_rev(buf, pos) {
          f8b[3] = buf[pos];
          f8b[2] = buf[pos + 1];
          f8b[1] = buf[pos + 2];
          f8b[0] = buf[pos + 3];
          return f32[0];
        }
        exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
      })();
      else (function() {
        function writeFloat_ieee754(writeUint, val, buf, pos) {
          var sign = val < 0 ? 1 : 0;
          if (sign)
            val = -val;
          if (val === 0)
            writeUint(1 / val > 0 ? (
              /* positive */
              0
            ) : (
              /* negative 0 */
              2147483648
            ), buf, pos);
          else if (isNaN(val))
            writeUint(2143289344, buf, pos);
          else if (val > 34028234663852886e22)
            writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
          else if (val < 11754943508222875e-54)
            writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
          else {
            var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
            writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
          }
        }
        exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
        function readFloat_ieee754(readUint, buf, pos) {
          var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
          return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }
        exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
      })();
      if (typeof Float64Array !== "undefined") (function() {
        var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
        function writeDouble_f64_cpy(val, buf, pos) {
          f64[0] = val;
          buf[pos] = f8b[0];
          buf[pos + 1] = f8b[1];
          buf[pos + 2] = f8b[2];
          buf[pos + 3] = f8b[3];
          buf[pos + 4] = f8b[4];
          buf[pos + 5] = f8b[5];
          buf[pos + 6] = f8b[6];
          buf[pos + 7] = f8b[7];
        }
        function writeDouble_f64_rev(val, buf, pos) {
          f64[0] = val;
          buf[pos] = f8b[7];
          buf[pos + 1] = f8b[6];
          buf[pos + 2] = f8b[5];
          buf[pos + 3] = f8b[4];
          buf[pos + 4] = f8b[3];
          buf[pos + 5] = f8b[2];
          buf[pos + 6] = f8b[1];
          buf[pos + 7] = f8b[0];
        }
        exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
        function readDouble_f64_cpy(buf, pos) {
          f8b[0] = buf[pos];
          f8b[1] = buf[pos + 1];
          f8b[2] = buf[pos + 2];
          f8b[3] = buf[pos + 3];
          f8b[4] = buf[pos + 4];
          f8b[5] = buf[pos + 5];
          f8b[6] = buf[pos + 6];
          f8b[7] = buf[pos + 7];
          return f64[0];
        }
        function readDouble_f64_rev(buf, pos) {
          f8b[7] = buf[pos];
          f8b[6] = buf[pos + 1];
          f8b[5] = buf[pos + 2];
          f8b[4] = buf[pos + 3];
          f8b[3] = buf[pos + 4];
          f8b[2] = buf[pos + 5];
          f8b[1] = buf[pos + 6];
          f8b[0] = buf[pos + 7];
          return f64[0];
        }
        exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
      })();
      else (function() {
        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
          var sign = val < 0 ? 1 : 0;
          if (sign)
            val = -val;
          if (val === 0) {
            writeUint(0, buf, pos + off0);
            writeUint(1 / val > 0 ? (
              /* positive */
              0
            ) : (
              /* negative 0 */
              2147483648
            ), buf, pos + off1);
          } else if (isNaN(val)) {
            writeUint(0, buf, pos + off0);
            writeUint(2146959360, buf, pos + off1);
          } else if (val > 17976931348623157e292) {
            writeUint(0, buf, pos + off0);
            writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
          } else {
            var mantissa;
            if (val < 22250738585072014e-324) {
              mantissa = val / 5e-324;
              writeUint(mantissa >>> 0, buf, pos + off0);
              writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
            } else {
              var exponent = Math.floor(Math.log(val) / Math.LN2);
              if (exponent === 1024)
                exponent = 1023;
              mantissa = val * Math.pow(2, -exponent);
              writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
              writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
            }
          }
        }
        exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
          var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
          var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
          return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }
        exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
      })();
      return exports3;
    }
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
  }
});

// node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
  }
});

// node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf8 = exports2;
    utf8.length = function utf8_length(string) {
      var len = 0, c = 0;
      for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
          len += 1;
        else if (c < 2048)
          len += 2;
        else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else
          len += 3;
      }
      return len;
    };
    utf8.read = function utf8_read(buffer, start, end) {
      var len = end - start;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start < end) {
        t = buffer[start++];
        if (t < 128)
          chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
          t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i = 0;
        }
      }
      if (parts) {
        if (i)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    utf8.write = function utf8_write(string, buffer, offset) {
      var start = offset, c1, c2;
      for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
          buffer[offset++] = c1;
        } else if (c1 < 2048) {
          buffer[offset++] = c1 >> 6 | 192;
          buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer[offset++] = c1 >> 18 | 240;
          buffer[offset++] = c1 >> 12 & 63 | 128;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        } else {
          buffer[offset++] = c1 >> 12 | 224;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start;
    };
  }
});

// node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    module2.exports = pool;
    function pool(alloc, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc(size2);
        if (offset + size2 > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      };
    }
  }
});

// node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = function fromNumber(value) {
      if (value === 0)
        return zero;
      var sign = value < 0;
      if (sign)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long)
          value = util.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits(
        (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
        (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
      );
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(
        this.lo & 255,
        this.lo >>> 8 & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24,
        this.hi & 255,
        this.hi >>> 8 & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
      );
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
  }
});

// node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util = exports2;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.inquire = require_inquire();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
    util.emptyArray = Object.freeze ? Object.freeze([]) : (
      /* istanbul ignore next */
      []
    );
    util.emptyObject = Object.freeze ? Object.freeze({}) : (
      /* istanbul ignore next */
      {}
    );
    util.isInteger = Number.isInteger || /* istanbul ignore next */
    function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util.isObject = function isObject2(value) {
      return value && typeof value === "object";
    };
    util.isset = /**
     * Checks if a property on a message is considered to be present.
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    util.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util.Buffer = function() {
      try {
        var Buffer2 = util.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : (
          /* istanbul ignore next */
          null
        );
      } catch (e) {
        return null;
      }
    }();
    util._Buffer_from = null;
    util._Buffer_allocUnsafe = null;
    util.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long = /* istanbul ignore next */
    util.global.dcodeIO && /* istanbul ignore next */
    util.global.dcodeIO.Long || /* istanbul ignore next */
    util.global.Long || util.inquire("long");
    util.key2Re = /^true|false|0|1$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    };
    util.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge2(dst, src, ifNotSet) {
      for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src[keys[i]];
      return dst;
    }
    util.merge = merge2;
    util.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name) {
      function CustomError2(message, properties) {
        if (!(this instanceof CustomError2))
          return new CustomError2(message, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError2);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge2(this, properties);
      }
      CustomError2.prototype = Object.create(Error.prototype, {
        constructor: {
          value: CustomError2,
          writable: true,
          enumerable: false,
          configurable: true
        },
        name: {
          get: function get() {
            return name;
          },
          set: void 0,
          enumerable: false,
          // configurable: false would accurately preserve the behavior of
          // the original, but I'm guessing that was not intentional.
          // For an actual error subclass, this property would
          // be configurable.
          configurable: true
        },
        toString: {
          value: function value() {
            return this.name + ": " + this.message;
          },
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      return CustomError2;
    }
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util._configure = function() {
      var Buffer2 = util.Buffer;
      if (!Buffer2) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
      }
      util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
      function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
      function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  }
});

// node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer;
    var util = require_minimal();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base64 = util.base64;
    var utf8 = util.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    function noop() {
    }
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer();
      };
    };
    Writer.create = create();
    Writer.alloc = function alloc(size) {
      return new util.Array(size);
    };
    if (util.Array !== Array)
      Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    Writer.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
        value
      )).len;
      return this;
    };
    Writer.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer.prototype.sint32 = function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
    function writeVarint64(val, buf, pos) {
      while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
      }
      buf[pos++] = val.lo;
    }
    Writer.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    };
    Writer.prototype.double = function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer.prototype.reset = function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
      }
      return this;
    };
    Writer.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create();
      BufferWriter._configure();
    };
  }
});

// node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer = require_writer();
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
    var util = require_minimal();
    function BufferWriter() {
      Writer.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else for (var i = 0; i < val.length; )
          buf[pos++] = val[i++];
      };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util.isString(value))
        value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});

// node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader;
    var util = require_minimal();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf8 = util.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    function Reader(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    } : function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    };
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer2) {
          return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        })(buffer);
      } : create_array;
    };
    Reader.create = create();
    Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */
    util.Array.prototype.slice;
    Reader.prototype.uint32 = /* @__PURE__ */ function read_uint32_setup() {
      var value = 4294967295;
      return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        if ((this.pos += 5) > this.len) {
          this.pos = this.len;
          throw indexOutOfRange(this, 10);
        }
        return value;
      };
    }();
    Reader.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    };
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    Reader.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader.prototype.bytes = function read_bytes() {
      var length = this.uint32(), start = this.pos, end = this.pos + length;
      if (end > this.len)
        throw indexOutOfRange(this, length);
      this.pos += length;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      if (start === end) {
        var nativeBuffer = util.Buffer;
        return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
      }
      return this._slice.call(this.buf, start, end);
    };
    Reader.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader.prototype.skip = function skip(length) {
      if (typeof length === "number") {
        if (this.pos + length > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
      } else {
        do {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    };
    Reader.prototype.skipType = function(wireType) {
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while ((wireType = this.uint32() & 7) !== 4) {
            this.skipType(wireType);
          }
          break;
        case 5:
          this.skip(4);
          break;
        /* istanbul ignore next */
        default:
          throw Error("invalid wire type " + wireType + " at offset " + this.pos);
      }
      return this;
    };
    Reader._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create();
      BufferReader._configure();
      var fn = util.Long ? "toLong" : (
        /* istanbul ignore next */
        "toNumber"
      );
      util.merge(Reader.prototype, {
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }
      });
    };
  }
});

// node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader = require_reader();
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
    var util = require_minimal();
    function BufferReader(buffer) {
      Reader.call(this, buffer);
    }
    BufferReader._configure = function() {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});

// node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var util = require_minimal();
    (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(
          method,
          requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
          function rpcCallback(err, response) {
            if (err) {
              self2.emit("error", err, method);
              return callback(err);
            }
            if (response === null) {
              self2.end(
                /* endedByRPC */
                true
              );
              return void 0;
            }
            if (!(response instanceof responseCtor)) {
              try {
                response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
              } catch (err2) {
                self2.emit("error", err2, method);
                return callback(err2);
              }
            }
            self2.emit("data", response, method);
            return callback(null, response);
          }
        );
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
  }
});

// node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf = exports2;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure;
    function configure() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    configure();
  }
});

// node_modules/protobufjs/minimal.js
var require_minimal2 = __commonJS({
  "node_modules/protobufjs/minimal.js"(exports2, module2) {
    "use strict";
    module2.exports = require_index_minimal();
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/generated/root.js
var require_root = __commonJS({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/generated/root.js"(exports2, module2) {
    "use strict";
    var $protobuf = require_minimal2();
    var $Reader = $protobuf.Reader;
    var $Writer = $protobuf.Writer;
    var $util = $protobuf.util;
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    $root.opentelemetry = function() {
      var opentelemetry4 = {};
      opentelemetry4.proto = function() {
        var proto = {};
        proto.common = function() {
          var common = {};
          common.v1 = function() {
            var v1 = {};
            v1.AnyValue = function() {
              function AnyValue(properties) {
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              AnyValue.prototype.stringValue = null;
              AnyValue.prototype.boolValue = null;
              AnyValue.prototype.intValue = null;
              AnyValue.prototype.doubleValue = null;
              AnyValue.prototype.arrayValue = null;
              AnyValue.prototype.kvlistValue = null;
              AnyValue.prototype.bytesValue = null;
              var $oneOfFields;
              Object.defineProperty(AnyValue.prototype, "value", {
                get: $util.oneOfGetter($oneOfFields = ["stringValue", "boolValue", "intValue", "doubleValue", "arrayValue", "kvlistValue", "bytesValue"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              AnyValue.create = function create(properties) {
                return new AnyValue(properties);
              };
              AnyValue.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue"))
                  writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).string(message.stringValue);
                if (message.boolValue != null && Object.hasOwnProperty.call(message, "boolValue"))
                  writer.uint32(
                    /* id 2, wireType 0 =*/
                    16
                  ).bool(message.boolValue);
                if (message.intValue != null && Object.hasOwnProperty.call(message, "intValue"))
                  writer.uint32(
                    /* id 3, wireType 0 =*/
                    24
                  ).int64(message.intValue);
                if (message.doubleValue != null && Object.hasOwnProperty.call(message, "doubleValue"))
                  writer.uint32(
                    /* id 4, wireType 1 =*/
                    33
                  ).double(message.doubleValue);
                if (message.arrayValue != null && Object.hasOwnProperty.call(message, "arrayValue"))
                  $root.opentelemetry.proto.common.v1.ArrayValue.encode(message.arrayValue, writer.uint32(
                    /* id 5, wireType 2 =*/
                    42
                  ).fork()).ldelim();
                if (message.kvlistValue != null && Object.hasOwnProperty.call(message, "kvlistValue"))
                  $root.opentelemetry.proto.common.v1.KeyValueList.encode(message.kvlistValue, writer.uint32(
                    /* id 6, wireType 2 =*/
                    50
                  ).fork()).ldelim();
                if (message.bytesValue != null && Object.hasOwnProperty.call(message, "bytesValue"))
                  writer.uint32(
                    /* id 7, wireType 2 =*/
                    58
                  ).bytes(message.bytesValue);
                return writer;
              };
              AnyValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              AnyValue.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.AnyValue();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      message.stringValue = reader.string();
                      break;
                    }
                    case 2: {
                      message.boolValue = reader.bool();
                      break;
                    }
                    case 3: {
                      message.intValue = reader.int64();
                      break;
                    }
                    case 4: {
                      message.doubleValue = reader.double();
                      break;
                    }
                    case 5: {
                      message.arrayValue = $root.opentelemetry.proto.common.v1.ArrayValue.decode(reader, reader.uint32());
                      break;
                    }
                    case 6: {
                      message.kvlistValue = $root.opentelemetry.proto.common.v1.KeyValueList.decode(reader, reader.uint32());
                      break;
                    }
                    case 7: {
                      message.bytesValue = reader.bytes();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              AnyValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              AnyValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                var properties = {};
                if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                  properties.value = 1;
                  if (!$util.isString(message.stringValue))
                    return "stringValue: string expected";
                }
                if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  if (typeof message.boolValue !== "boolean")
                    return "boolValue: boolean expected";
                }
                if (message.intValue != null && message.hasOwnProperty("intValue")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  if (!$util.isInteger(message.intValue) && !(message.intValue && $util.isInteger(message.intValue.low) && $util.isInteger(message.intValue.high)))
                    return "intValue: integer|Long expected";
                }
                if (message.doubleValue != null && message.hasOwnProperty("doubleValue")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  if (typeof message.doubleValue !== "number")
                    return "doubleValue: number expected";
                }
                if (message.arrayValue != null && message.hasOwnProperty("arrayValue")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  {
                    var error = $root.opentelemetry.proto.common.v1.ArrayValue.verify(message.arrayValue);
                    if (error)
                      return "arrayValue." + error;
                  }
                }
                if (message.kvlistValue != null && message.hasOwnProperty("kvlistValue")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  {
                    var error = $root.opentelemetry.proto.common.v1.KeyValueList.verify(message.kvlistValue);
                    if (error)
                      return "kvlistValue." + error;
                  }
                }
                if (message.bytesValue != null && message.hasOwnProperty("bytesValue")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  if (!(message.bytesValue && typeof message.bytesValue.length === "number" || $util.isString(message.bytesValue)))
                    return "bytesValue: buffer expected";
                }
                return null;
              };
              AnyValue.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.common.v1.AnyValue)
                  return object;
                var message = new $root.opentelemetry.proto.common.v1.AnyValue();
                if (object.stringValue != null)
                  message.stringValue = String(object.stringValue);
                if (object.boolValue != null)
                  message.boolValue = Boolean(object.boolValue);
                if (object.intValue != null) {
                  if ($util.Long)
                    (message.intValue = $util.Long.fromValue(object.intValue)).unsigned = false;
                  else if (typeof object.intValue === "string")
                    message.intValue = parseInt(object.intValue, 10);
                  else if (typeof object.intValue === "number")
                    message.intValue = object.intValue;
                  else if (typeof object.intValue === "object")
                    message.intValue = new $util.LongBits(object.intValue.low >>> 0, object.intValue.high >>> 0).toNumber();
                }
                if (object.doubleValue != null)
                  message.doubleValue = Number(object.doubleValue);
                if (object.arrayValue != null) {
                  if (typeof object.arrayValue !== "object")
                    throw TypeError(".opentelemetry.proto.common.v1.AnyValue.arrayValue: object expected");
                  message.arrayValue = $root.opentelemetry.proto.common.v1.ArrayValue.fromObject(object.arrayValue);
                }
                if (object.kvlistValue != null) {
                  if (typeof object.kvlistValue !== "object")
                    throw TypeError(".opentelemetry.proto.common.v1.AnyValue.kvlistValue: object expected");
                  message.kvlistValue = $root.opentelemetry.proto.common.v1.KeyValueList.fromObject(object.kvlistValue);
                }
                if (object.bytesValue != null) {
                  if (typeof object.bytesValue === "string")
                    $util.base64.decode(object.bytesValue, message.bytesValue = $util.newBuffer($util.base64.length(object.bytesValue)), 0);
                  else if (object.bytesValue.length >= 0)
                    message.bytesValue = object.bytesValue;
                }
                return message;
              };
              AnyValue.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                  object.stringValue = message.stringValue;
                  if (options2.oneofs)
                    object.value = "stringValue";
                }
                if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                  object.boolValue = message.boolValue;
                  if (options2.oneofs)
                    object.value = "boolValue";
                }
                if (message.intValue != null && message.hasOwnProperty("intValue")) {
                  if (typeof message.intValue === "number")
                    object.intValue = options2.longs === String ? String(message.intValue) : message.intValue;
                  else
                    object.intValue = options2.longs === String ? $util.Long.prototype.toString.call(message.intValue) : options2.longs === Number ? new $util.LongBits(message.intValue.low >>> 0, message.intValue.high >>> 0).toNumber() : message.intValue;
                  if (options2.oneofs)
                    object.value = "intValue";
                }
                if (message.doubleValue != null && message.hasOwnProperty("doubleValue")) {
                  object.doubleValue = options2.json && !isFinite(message.doubleValue) ? String(message.doubleValue) : message.doubleValue;
                  if (options2.oneofs)
                    object.value = "doubleValue";
                }
                if (message.arrayValue != null && message.hasOwnProperty("arrayValue")) {
                  object.arrayValue = $root.opentelemetry.proto.common.v1.ArrayValue.toObject(message.arrayValue, options2);
                  if (options2.oneofs)
                    object.value = "arrayValue";
                }
                if (message.kvlistValue != null && message.hasOwnProperty("kvlistValue")) {
                  object.kvlistValue = $root.opentelemetry.proto.common.v1.KeyValueList.toObject(message.kvlistValue, options2);
                  if (options2.oneofs)
                    object.value = "kvlistValue";
                }
                if (message.bytesValue != null && message.hasOwnProperty("bytesValue")) {
                  object.bytesValue = options2.bytes === String ? $util.base64.encode(message.bytesValue, 0, message.bytesValue.length) : options2.bytes === Array ? Array.prototype.slice.call(message.bytesValue) : message.bytesValue;
                  if (options2.oneofs)
                    object.value = "bytesValue";
                }
                return object;
              };
              AnyValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              AnyValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.AnyValue";
              };
              return AnyValue;
            }();
            v1.ArrayValue = function() {
              function ArrayValue(properties) {
                this.values = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              ArrayValue.prototype.values = $util.emptyArray;
              ArrayValue.create = function create(properties) {
                return new ArrayValue(properties);
              };
              ArrayValue.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.values != null && message.values.length)
                  for (var i = 0; i < message.values.length; ++i)
                    $root.opentelemetry.proto.common.v1.AnyValue.encode(message.values[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              ArrayValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ArrayValue.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.ArrayValue();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.values && message.values.length))
                        message.values = [];
                      message.values.push($root.opentelemetry.proto.common.v1.AnyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              ArrayValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ArrayValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.values != null && message.hasOwnProperty("values")) {
                  if (!Array.isArray(message.values))
                    return "values: array expected";
                  for (var i = 0; i < message.values.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.AnyValue.verify(message.values[i]);
                    if (error)
                      return "values." + error;
                  }
                }
                return null;
              };
              ArrayValue.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.common.v1.ArrayValue)
                  return object;
                var message = new $root.opentelemetry.proto.common.v1.ArrayValue();
                if (object.values) {
                  if (!Array.isArray(object.values))
                    throw TypeError(".opentelemetry.proto.common.v1.ArrayValue.values: array expected");
                  message.values = [];
                  for (var i = 0; i < object.values.length; ++i) {
                    if (typeof object.values[i] !== "object")
                      throw TypeError(".opentelemetry.proto.common.v1.ArrayValue.values: object expected");
                    message.values[i] = $root.opentelemetry.proto.common.v1.AnyValue.fromObject(object.values[i]);
                  }
                }
                return message;
              };
              ArrayValue.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.values = [];
                if (message.values && message.values.length) {
                  object.values = [];
                  for (var j = 0; j < message.values.length; ++j)
                    object.values[j] = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.values[j], options2);
                }
                return object;
              };
              ArrayValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ArrayValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.ArrayValue";
              };
              return ArrayValue;
            }();
            v1.KeyValueList = function() {
              function KeyValueList(properties) {
                this.values = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              KeyValueList.prototype.values = $util.emptyArray;
              KeyValueList.create = function create(properties) {
                return new KeyValueList(properties);
              };
              KeyValueList.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.values != null && message.values.length)
                  for (var i = 0; i < message.values.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.values[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              KeyValueList.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              KeyValueList.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.KeyValueList();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.values && message.values.length))
                        message.values = [];
                      message.values.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              KeyValueList.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              KeyValueList.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.values != null && message.hasOwnProperty("values")) {
                  if (!Array.isArray(message.values))
                    return "values: array expected";
                  for (var i = 0; i < message.values.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.values[i]);
                    if (error)
                      return "values." + error;
                  }
                }
                return null;
              };
              KeyValueList.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.common.v1.KeyValueList)
                  return object;
                var message = new $root.opentelemetry.proto.common.v1.KeyValueList();
                if (object.values) {
                  if (!Array.isArray(object.values))
                    throw TypeError(".opentelemetry.proto.common.v1.KeyValueList.values: array expected");
                  message.values = [];
                  for (var i = 0; i < object.values.length; ++i) {
                    if (typeof object.values[i] !== "object")
                      throw TypeError(".opentelemetry.proto.common.v1.KeyValueList.values: object expected");
                    message.values[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.values[i]);
                  }
                }
                return message;
              };
              KeyValueList.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.values = [];
                if (message.values && message.values.length) {
                  object.values = [];
                  for (var j = 0; j < message.values.length; ++j)
                    object.values[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.values[j], options2);
                }
                return object;
              };
              KeyValueList.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              KeyValueList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.KeyValueList";
              };
              return KeyValueList;
            }();
            v1.KeyValue = function() {
              function KeyValue(properties) {
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              KeyValue.prototype.key = null;
              KeyValue.prototype.value = null;
              KeyValue.create = function create(properties) {
                return new KeyValue(properties);
              };
              KeyValue.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                  writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).string(message.key);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                  $root.opentelemetry.proto.common.v1.AnyValue.encode(message.value, writer.uint32(
                    /* id 2, wireType 2 =*/
                    18
                  ).fork()).ldelim();
                return writer;
              };
              KeyValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              KeyValue.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.KeyValue();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      message.key = reader.string();
                      break;
                    }
                    case 2: {
                      message.value = $root.opentelemetry.proto.common.v1.AnyValue.decode(reader, reader.uint32());
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              KeyValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              KeyValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.key != null && message.hasOwnProperty("key")) {
                  if (!$util.isString(message.key))
                    return "key: string expected";
                }
                if (message.value != null && message.hasOwnProperty("value")) {
                  var error = $root.opentelemetry.proto.common.v1.AnyValue.verify(message.value);
                  if (error)
                    return "value." + error;
                }
                return null;
              };
              KeyValue.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.common.v1.KeyValue)
                  return object;
                var message = new $root.opentelemetry.proto.common.v1.KeyValue();
                if (object.key != null)
                  message.key = String(object.key);
                if (object.value != null) {
                  if (typeof object.value !== "object")
                    throw TypeError(".opentelemetry.proto.common.v1.KeyValue.value: object expected");
                  message.value = $root.opentelemetry.proto.common.v1.AnyValue.fromObject(object.value);
                }
                return message;
              };
              KeyValue.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.defaults) {
                  object.key = "";
                  object.value = null;
                }
                if (message.key != null && message.hasOwnProperty("key"))
                  object.key = message.key;
                if (message.value != null && message.hasOwnProperty("value"))
                  object.value = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.value, options2);
                return object;
              };
              KeyValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              KeyValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.KeyValue";
              };
              return KeyValue;
            }();
            v1.InstrumentationScope = function() {
              function InstrumentationScope(properties) {
                this.attributes = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              InstrumentationScope.prototype.name = null;
              InstrumentationScope.prototype.version = null;
              InstrumentationScope.prototype.attributes = $util.emptyArray;
              InstrumentationScope.prototype.droppedAttributesCount = null;
              InstrumentationScope.create = function create(properties) {
                return new InstrumentationScope(properties);
              };
              InstrumentationScope.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                  writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).string(message.name);
                if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                  writer.uint32(
                    /* id 2, wireType 2 =*/
                    18
                  ).string(message.version);
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).fork()).ldelim();
                if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                  writer.uint32(
                    /* id 4, wireType 0 =*/
                    32
                  ).uint32(message.droppedAttributesCount);
                return writer;
              };
              InstrumentationScope.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              InstrumentationScope.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.InstrumentationScope();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      message.name = reader.string();
                      break;
                    }
                    case 2: {
                      message.version = reader.string();
                      break;
                    }
                    case 3: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 4: {
                      message.droppedAttributesCount = reader.uint32();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              InstrumentationScope.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              InstrumentationScope.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.name != null && message.hasOwnProperty("name")) {
                  if (!$util.isString(message.name))
                    return "name: string expected";
                }
                if (message.version != null && message.hasOwnProperty("version")) {
                  if (!$util.isString(message.version))
                    return "version: string expected";
                }
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                  if (!$util.isInteger(message.droppedAttributesCount))
                    return "droppedAttributesCount: integer expected";
                }
                return null;
              };
              InstrumentationScope.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.common.v1.InstrumentationScope)
                  return object;
                var message = new $root.opentelemetry.proto.common.v1.InstrumentationScope();
                if (object.name != null)
                  message.name = String(object.name);
                if (object.version != null)
                  message.version = String(object.version);
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.common.v1.InstrumentationScope.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.common.v1.InstrumentationScope.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.droppedAttributesCount != null)
                  message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                return message;
              };
              InstrumentationScope.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.attributes = [];
                if (options2.defaults) {
                  object.name = "";
                  object.version = "";
                  object.droppedAttributesCount = 0;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                  object.name = message.name;
                if (message.version != null && message.hasOwnProperty("version"))
                  object.version = message.version;
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                  object.droppedAttributesCount = message.droppedAttributesCount;
                return object;
              };
              InstrumentationScope.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              InstrumentationScope.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.InstrumentationScope";
              };
              return InstrumentationScope;
            }();
            v1.EntityRef = function() {
              function EntityRef(properties) {
                this.idKeys = [];
                this.descriptionKeys = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              EntityRef.prototype.schemaUrl = null;
              EntityRef.prototype.type = null;
              EntityRef.prototype.idKeys = $util.emptyArray;
              EntityRef.prototype.descriptionKeys = $util.emptyArray;
              EntityRef.create = function create(properties) {
                return new EntityRef(properties);
              };
              EntityRef.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                  writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).string(message.schemaUrl);
                if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                  writer.uint32(
                    /* id 2, wireType 2 =*/
                    18
                  ).string(message.type);
                if (message.idKeys != null && message.idKeys.length)
                  for (var i = 0; i < message.idKeys.length; ++i)
                    writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).string(message.idKeys[i]);
                if (message.descriptionKeys != null && message.descriptionKeys.length)
                  for (var i = 0; i < message.descriptionKeys.length; ++i)
                    writer.uint32(
                      /* id 4, wireType 2 =*/
                      34
                    ).string(message.descriptionKeys[i]);
                return writer;
              };
              EntityRef.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              EntityRef.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.EntityRef();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      message.schemaUrl = reader.string();
                      break;
                    }
                    case 2: {
                      message.type = reader.string();
                      break;
                    }
                    case 3: {
                      if (!(message.idKeys && message.idKeys.length))
                        message.idKeys = [];
                      message.idKeys.push(reader.string());
                      break;
                    }
                    case 4: {
                      if (!(message.descriptionKeys && message.descriptionKeys.length))
                        message.descriptionKeys = [];
                      message.descriptionKeys.push(reader.string());
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              EntityRef.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              EntityRef.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                  if (!$util.isString(message.schemaUrl))
                    return "schemaUrl: string expected";
                }
                if (message.type != null && message.hasOwnProperty("type")) {
                  if (!$util.isString(message.type))
                    return "type: string expected";
                }
                if (message.idKeys != null && message.hasOwnProperty("idKeys")) {
                  if (!Array.isArray(message.idKeys))
                    return "idKeys: array expected";
                  for (var i = 0; i < message.idKeys.length; ++i)
                    if (!$util.isString(message.idKeys[i]))
                      return "idKeys: string[] expected";
                }
                if (message.descriptionKeys != null && message.hasOwnProperty("descriptionKeys")) {
                  if (!Array.isArray(message.descriptionKeys))
                    return "descriptionKeys: array expected";
                  for (var i = 0; i < message.descriptionKeys.length; ++i)
                    if (!$util.isString(message.descriptionKeys[i]))
                      return "descriptionKeys: string[] expected";
                }
                return null;
              };
              EntityRef.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.common.v1.EntityRef)
                  return object;
                var message = new $root.opentelemetry.proto.common.v1.EntityRef();
                if (object.schemaUrl != null)
                  message.schemaUrl = String(object.schemaUrl);
                if (object.type != null)
                  message.type = String(object.type);
                if (object.idKeys) {
                  if (!Array.isArray(object.idKeys))
                    throw TypeError(".opentelemetry.proto.common.v1.EntityRef.idKeys: array expected");
                  message.idKeys = [];
                  for (var i = 0; i < object.idKeys.length; ++i)
                    message.idKeys[i] = String(object.idKeys[i]);
                }
                if (object.descriptionKeys) {
                  if (!Array.isArray(object.descriptionKeys))
                    throw TypeError(".opentelemetry.proto.common.v1.EntityRef.descriptionKeys: array expected");
                  message.descriptionKeys = [];
                  for (var i = 0; i < object.descriptionKeys.length; ++i)
                    message.descriptionKeys[i] = String(object.descriptionKeys[i]);
                }
                return message;
              };
              EntityRef.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults) {
                  object.idKeys = [];
                  object.descriptionKeys = [];
                }
                if (options2.defaults) {
                  object.schemaUrl = "";
                  object.type = "";
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                if (message.type != null && message.hasOwnProperty("type"))
                  object.type = message.type;
                if (message.idKeys && message.idKeys.length) {
                  object.idKeys = [];
                  for (var j = 0; j < message.idKeys.length; ++j)
                    object.idKeys[j] = message.idKeys[j];
                }
                if (message.descriptionKeys && message.descriptionKeys.length) {
                  object.descriptionKeys = [];
                  for (var j = 0; j < message.descriptionKeys.length; ++j)
                    object.descriptionKeys[j] = message.descriptionKeys[j];
                }
                return object;
              };
              EntityRef.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              EntityRef.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.common.v1.EntityRef";
              };
              return EntityRef;
            }();
            return v1;
          }();
          return common;
        }();
        proto.resource = function() {
          var resource = {};
          resource.v1 = function() {
            var v1 = {};
            v1.Resource = function() {
              function Resource(properties) {
                this.attributes = [];
                this.entityRefs = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              Resource.prototype.attributes = $util.emptyArray;
              Resource.prototype.droppedAttributesCount = null;
              Resource.prototype.entityRefs = $util.emptyArray;
              Resource.create = function create(properties) {
                return new Resource(properties);
              };
              Resource.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                  writer.uint32(
                    /* id 2, wireType 0 =*/
                    16
                  ).uint32(message.droppedAttributesCount);
                if (message.entityRefs != null && message.entityRefs.length)
                  for (var i = 0; i < message.entityRefs.length; ++i)
                    $root.opentelemetry.proto.common.v1.EntityRef.encode(message.entityRefs[i], writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).fork()).ldelim();
                return writer;
              };
              Resource.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Resource.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.resource.v1.Resource();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.droppedAttributesCount = reader.uint32();
                      break;
                    }
                    case 3: {
                      if (!(message.entityRefs && message.entityRefs.length))
                        message.entityRefs = [];
                      message.entityRefs.push($root.opentelemetry.proto.common.v1.EntityRef.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              Resource.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Resource.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                  if (!$util.isInteger(message.droppedAttributesCount))
                    return "droppedAttributesCount: integer expected";
                }
                if (message.entityRefs != null && message.hasOwnProperty("entityRefs")) {
                  if (!Array.isArray(message.entityRefs))
                    return "entityRefs: array expected";
                  for (var i = 0; i < message.entityRefs.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.EntityRef.verify(message.entityRefs[i]);
                    if (error)
                      return "entityRefs." + error;
                  }
                }
                return null;
              };
              Resource.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.resource.v1.Resource)
                  return object;
                var message = new $root.opentelemetry.proto.resource.v1.Resource();
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.resource.v1.Resource.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.resource.v1.Resource.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.droppedAttributesCount != null)
                  message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                if (object.entityRefs) {
                  if (!Array.isArray(object.entityRefs))
                    throw TypeError(".opentelemetry.proto.resource.v1.Resource.entityRefs: array expected");
                  message.entityRefs = [];
                  for (var i = 0; i < object.entityRefs.length; ++i) {
                    if (typeof object.entityRefs[i] !== "object")
                      throw TypeError(".opentelemetry.proto.resource.v1.Resource.entityRefs: object expected");
                    message.entityRefs[i] = $root.opentelemetry.proto.common.v1.EntityRef.fromObject(object.entityRefs[i]);
                  }
                }
                return message;
              };
              Resource.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults) {
                  object.attributes = [];
                  object.entityRefs = [];
                }
                if (options2.defaults)
                  object.droppedAttributesCount = 0;
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                  object.droppedAttributesCount = message.droppedAttributesCount;
                if (message.entityRefs && message.entityRefs.length) {
                  object.entityRefs = [];
                  for (var j = 0; j < message.entityRefs.length; ++j)
                    object.entityRefs[j] = $root.opentelemetry.proto.common.v1.EntityRef.toObject(message.entityRefs[j], options2);
                }
                return object;
              };
              Resource.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Resource.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.resource.v1.Resource";
              };
              return Resource;
            }();
            return v1;
          }();
          return resource;
        }();
        proto.trace = function() {
          var trace3 = {};
          trace3.v1 = function() {
            var v1 = {};
            v1.TracesData = function() {
              function TracesData(properties) {
                this.resourceSpans = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              TracesData.prototype.resourceSpans = $util.emptyArray;
              TracesData.create = function create(properties) {
                return new TracesData(properties);
              };
              TracesData.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resourceSpans != null && message.resourceSpans.length)
                  for (var i = 0; i < message.resourceSpans.length; ++i)
                    $root.opentelemetry.proto.trace.v1.ResourceSpans.encode(message.resourceSpans[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              TracesData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              TracesData.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.TracesData();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.resourceSpans && message.resourceSpans.length))
                        message.resourceSpans = [];
                      message.resourceSpans.push($root.opentelemetry.proto.trace.v1.ResourceSpans.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              TracesData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              TracesData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.resourceSpans != null && message.hasOwnProperty("resourceSpans")) {
                  if (!Array.isArray(message.resourceSpans))
                    return "resourceSpans: array expected";
                  for (var i = 0; i < message.resourceSpans.length; ++i) {
                    var error = $root.opentelemetry.proto.trace.v1.ResourceSpans.verify(message.resourceSpans[i]);
                    if (error)
                      return "resourceSpans." + error;
                  }
                }
                return null;
              };
              TracesData.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.trace.v1.TracesData)
                  return object;
                var message = new $root.opentelemetry.proto.trace.v1.TracesData();
                if (object.resourceSpans) {
                  if (!Array.isArray(object.resourceSpans))
                    throw TypeError(".opentelemetry.proto.trace.v1.TracesData.resourceSpans: array expected");
                  message.resourceSpans = [];
                  for (var i = 0; i < object.resourceSpans.length; ++i) {
                    if (typeof object.resourceSpans[i] !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.TracesData.resourceSpans: object expected");
                    message.resourceSpans[i] = $root.opentelemetry.proto.trace.v1.ResourceSpans.fromObject(object.resourceSpans[i]);
                  }
                }
                return message;
              };
              TracesData.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.resourceSpans = [];
                if (message.resourceSpans && message.resourceSpans.length) {
                  object.resourceSpans = [];
                  for (var j = 0; j < message.resourceSpans.length; ++j)
                    object.resourceSpans[j] = $root.opentelemetry.proto.trace.v1.ResourceSpans.toObject(message.resourceSpans[j], options2);
                }
                return object;
              };
              TracesData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              TracesData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.TracesData";
              };
              return TracesData;
            }();
            v1.ResourceSpans = function() {
              function ResourceSpans(properties) {
                this.scopeSpans = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              ResourceSpans.prototype.resource = null;
              ResourceSpans.prototype.scopeSpans = $util.emptyArray;
              ResourceSpans.prototype.schemaUrl = null;
              ResourceSpans.create = function create(properties) {
                return new ResourceSpans(properties);
              };
              ResourceSpans.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                  $root.opentelemetry.proto.resource.v1.Resource.encode(message.resource, writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).fork()).ldelim();
                if (message.scopeSpans != null && message.scopeSpans.length)
                  for (var i = 0; i < message.scopeSpans.length; ++i)
                    $root.opentelemetry.proto.trace.v1.ScopeSpans.encode(message.scopeSpans[i], writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork()).ldelim();
                if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.schemaUrl);
                return writer;
              };
              ResourceSpans.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ResourceSpans.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.ResourceSpans();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      message.resource = $root.opentelemetry.proto.resource.v1.Resource.decode(reader, reader.uint32());
                      break;
                    }
                    case 2: {
                      if (!(message.scopeSpans && message.scopeSpans.length))
                        message.scopeSpans = [];
                      message.scopeSpans.push($root.opentelemetry.proto.trace.v1.ScopeSpans.decode(reader, reader.uint32()));
                      break;
                    }
                    case 3: {
                      message.schemaUrl = reader.string();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              ResourceSpans.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ResourceSpans.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.resource != null && message.hasOwnProperty("resource")) {
                  var error = $root.opentelemetry.proto.resource.v1.Resource.verify(message.resource);
                  if (error)
                    return "resource." + error;
                }
                if (message.scopeSpans != null && message.hasOwnProperty("scopeSpans")) {
                  if (!Array.isArray(message.scopeSpans))
                    return "scopeSpans: array expected";
                  for (var i = 0; i < message.scopeSpans.length; ++i) {
                    var error = $root.opentelemetry.proto.trace.v1.ScopeSpans.verify(message.scopeSpans[i]);
                    if (error)
                      return "scopeSpans." + error;
                  }
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                  if (!$util.isString(message.schemaUrl))
                    return "schemaUrl: string expected";
                }
                return null;
              };
              ResourceSpans.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.trace.v1.ResourceSpans)
                  return object;
                var message = new $root.opentelemetry.proto.trace.v1.ResourceSpans();
                if (object.resource != null) {
                  if (typeof object.resource !== "object")
                    throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.resource: object expected");
                  message.resource = $root.opentelemetry.proto.resource.v1.Resource.fromObject(object.resource);
                }
                if (object.scopeSpans) {
                  if (!Array.isArray(object.scopeSpans))
                    throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.scopeSpans: array expected");
                  message.scopeSpans = [];
                  for (var i = 0; i < object.scopeSpans.length; ++i) {
                    if (typeof object.scopeSpans[i] !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.scopeSpans: object expected");
                    message.scopeSpans[i] = $root.opentelemetry.proto.trace.v1.ScopeSpans.fromObject(object.scopeSpans[i]);
                  }
                }
                if (object.schemaUrl != null)
                  message.schemaUrl = String(object.schemaUrl);
                return message;
              };
              ResourceSpans.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.scopeSpans = [];
                if (options2.defaults) {
                  object.resource = null;
                  object.schemaUrl = "";
                }
                if (message.resource != null && message.hasOwnProperty("resource"))
                  object.resource = $root.opentelemetry.proto.resource.v1.Resource.toObject(message.resource, options2);
                if (message.scopeSpans && message.scopeSpans.length) {
                  object.scopeSpans = [];
                  for (var j = 0; j < message.scopeSpans.length; ++j)
                    object.scopeSpans[j] = $root.opentelemetry.proto.trace.v1.ScopeSpans.toObject(message.scopeSpans[j], options2);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              };
              ResourceSpans.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ResourceSpans.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.ResourceSpans";
              };
              return ResourceSpans;
            }();
            v1.ScopeSpans = function() {
              function ScopeSpans(properties) {
                this.spans = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              ScopeSpans.prototype.scope = null;
              ScopeSpans.prototype.spans = $util.emptyArray;
              ScopeSpans.prototype.schemaUrl = null;
              ScopeSpans.create = function create(properties) {
                return new ScopeSpans(properties);
              };
              ScopeSpans.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.scope != null && Object.hasOwnProperty.call(message, "scope"))
                  $root.opentelemetry.proto.common.v1.InstrumentationScope.encode(message.scope, writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).fork()).ldelim();
                if (message.spans != null && message.spans.length)
                  for (var i = 0; i < message.spans.length; ++i)
                    $root.opentelemetry.proto.trace.v1.Span.encode(message.spans[i], writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork()).ldelim();
                if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.schemaUrl);
                return writer;
              };
              ScopeSpans.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ScopeSpans.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.ScopeSpans();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.decode(reader, reader.uint32());
                      break;
                    }
                    case 2: {
                      if (!(message.spans && message.spans.length))
                        message.spans = [];
                      message.spans.push($root.opentelemetry.proto.trace.v1.Span.decode(reader, reader.uint32()));
                      break;
                    }
                    case 3: {
                      message.schemaUrl = reader.string();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              ScopeSpans.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ScopeSpans.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.scope != null && message.hasOwnProperty("scope")) {
                  var error = $root.opentelemetry.proto.common.v1.InstrumentationScope.verify(message.scope);
                  if (error)
                    return "scope." + error;
                }
                if (message.spans != null && message.hasOwnProperty("spans")) {
                  if (!Array.isArray(message.spans))
                    return "spans: array expected";
                  for (var i = 0; i < message.spans.length; ++i) {
                    var error = $root.opentelemetry.proto.trace.v1.Span.verify(message.spans[i]);
                    if (error)
                      return "spans." + error;
                  }
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                  if (!$util.isString(message.schemaUrl))
                    return "schemaUrl: string expected";
                }
                return null;
              };
              ScopeSpans.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.trace.v1.ScopeSpans)
                  return object;
                var message = new $root.opentelemetry.proto.trace.v1.ScopeSpans();
                if (object.scope != null) {
                  if (typeof object.scope !== "object")
                    throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.scope: object expected");
                  message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(object.scope);
                }
                if (object.spans) {
                  if (!Array.isArray(object.spans))
                    throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.spans: array expected");
                  message.spans = [];
                  for (var i = 0; i < object.spans.length; ++i) {
                    if (typeof object.spans[i] !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.spans: object expected");
                    message.spans[i] = $root.opentelemetry.proto.trace.v1.Span.fromObject(object.spans[i]);
                  }
                }
                if (object.schemaUrl != null)
                  message.schemaUrl = String(object.schemaUrl);
                return message;
              };
              ScopeSpans.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.spans = [];
                if (options2.defaults) {
                  object.scope = null;
                  object.schemaUrl = "";
                }
                if (message.scope != null && message.hasOwnProperty("scope"))
                  object.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.toObject(message.scope, options2);
                if (message.spans && message.spans.length) {
                  object.spans = [];
                  for (var j = 0; j < message.spans.length; ++j)
                    object.spans[j] = $root.opentelemetry.proto.trace.v1.Span.toObject(message.spans[j], options2);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              };
              ScopeSpans.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ScopeSpans.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.ScopeSpans";
              };
              return ScopeSpans;
            }();
            v1.Span = function() {
              function Span(properties) {
                this.attributes = [];
                this.events = [];
                this.links = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              Span.prototype.traceId = null;
              Span.prototype.spanId = null;
              Span.prototype.traceState = null;
              Span.prototype.parentSpanId = null;
              Span.prototype.flags = null;
              Span.prototype.name = null;
              Span.prototype.kind = null;
              Span.prototype.startTimeUnixNano = null;
              Span.prototype.endTimeUnixNano = null;
              Span.prototype.attributes = $util.emptyArray;
              Span.prototype.droppedAttributesCount = null;
              Span.prototype.events = $util.emptyArray;
              Span.prototype.droppedEventsCount = null;
              Span.prototype.links = $util.emptyArray;
              Span.prototype.droppedLinksCount = null;
              Span.prototype.status = null;
              Span.create = function create(properties) {
                return new Span(properties);
              };
              Span.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                  writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).bytes(message.traceId);
                if (message.spanId != null && Object.hasOwnProperty.call(message, "spanId"))
                  writer.uint32(
                    /* id 2, wireType 2 =*/
                    18
                  ).bytes(message.spanId);
                if (message.traceState != null && Object.hasOwnProperty.call(message, "traceState"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.traceState);
                if (message.parentSpanId != null && Object.hasOwnProperty.call(message, "parentSpanId"))
                  writer.uint32(
                    /* id 4, wireType 2 =*/
                    34
                  ).bytes(message.parentSpanId);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                  writer.uint32(
                    /* id 5, wireType 2 =*/
                    42
                  ).string(message.name);
                if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                  writer.uint32(
                    /* id 6, wireType 0 =*/
                    48
                  ).int32(message.kind);
                if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                  writer.uint32(
                    /* id 7, wireType 1 =*/
                    57
                  ).fixed64(message.startTimeUnixNano);
                if (message.endTimeUnixNano != null && Object.hasOwnProperty.call(message, "endTimeUnixNano"))
                  writer.uint32(
                    /* id 8, wireType 1 =*/
                    65
                  ).fixed64(message.endTimeUnixNano);
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 9, wireType 2 =*/
                      74
                    ).fork()).ldelim();
                if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                  writer.uint32(
                    /* id 10, wireType 0 =*/
                    80
                  ).uint32(message.droppedAttributesCount);
                if (message.events != null && message.events.length)
                  for (var i = 0; i < message.events.length; ++i)
                    $root.opentelemetry.proto.trace.v1.Span.Event.encode(message.events[i], writer.uint32(
                      /* id 11, wireType 2 =*/
                      90
                    ).fork()).ldelim();
                if (message.droppedEventsCount != null && Object.hasOwnProperty.call(message, "droppedEventsCount"))
                  writer.uint32(
                    /* id 12, wireType 0 =*/
                    96
                  ).uint32(message.droppedEventsCount);
                if (message.links != null && message.links.length)
                  for (var i = 0; i < message.links.length; ++i)
                    $root.opentelemetry.proto.trace.v1.Span.Link.encode(message.links[i], writer.uint32(
                      /* id 13, wireType 2 =*/
                      106
                    ).fork()).ldelim();
                if (message.droppedLinksCount != null && Object.hasOwnProperty.call(message, "droppedLinksCount"))
                  writer.uint32(
                    /* id 14, wireType 0 =*/
                    112
                  ).uint32(message.droppedLinksCount);
                if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                  $root.opentelemetry.proto.trace.v1.Status.encode(message.status, writer.uint32(
                    /* id 15, wireType 2 =*/
                    122
                  ).fork()).ldelim();
                if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                  writer.uint32(
                    /* id 16, wireType 5 =*/
                    133
                  ).fixed32(message.flags);
                return writer;
              };
              Span.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Span.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.Span();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      message.traceId = reader.bytes();
                      break;
                    }
                    case 2: {
                      message.spanId = reader.bytes();
                      break;
                    }
                    case 3: {
                      message.traceState = reader.string();
                      break;
                    }
                    case 4: {
                      message.parentSpanId = reader.bytes();
                      break;
                    }
                    case 16: {
                      message.flags = reader.fixed32();
                      break;
                    }
                    case 5: {
                      message.name = reader.string();
                      break;
                    }
                    case 6: {
                      message.kind = reader.int32();
                      break;
                    }
                    case 7: {
                      message.startTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 8: {
                      message.endTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 9: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 10: {
                      message.droppedAttributesCount = reader.uint32();
                      break;
                    }
                    case 11: {
                      if (!(message.events && message.events.length))
                        message.events = [];
                      message.events.push($root.opentelemetry.proto.trace.v1.Span.Event.decode(reader, reader.uint32()));
                      break;
                    }
                    case 12: {
                      message.droppedEventsCount = reader.uint32();
                      break;
                    }
                    case 13: {
                      if (!(message.links && message.links.length))
                        message.links = [];
                      message.links.push($root.opentelemetry.proto.trace.v1.Span.Link.decode(reader, reader.uint32()));
                      break;
                    }
                    case 14: {
                      message.droppedLinksCount = reader.uint32();
                      break;
                    }
                    case 15: {
                      message.status = $root.opentelemetry.proto.trace.v1.Status.decode(reader, reader.uint32());
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              Span.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Span.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.traceId != null && message.hasOwnProperty("traceId")) {
                  if (!(message.traceId && typeof message.traceId.length === "number" || $util.isString(message.traceId)))
                    return "traceId: buffer expected";
                }
                if (message.spanId != null && message.hasOwnProperty("spanId")) {
                  if (!(message.spanId && typeof message.spanId.length === "number" || $util.isString(message.spanId)))
                    return "spanId: buffer expected";
                }
                if (message.traceState != null && message.hasOwnProperty("traceState")) {
                  if (!$util.isString(message.traceState))
                    return "traceState: string expected";
                }
                if (message.parentSpanId != null && message.hasOwnProperty("parentSpanId")) {
                  if (!(message.parentSpanId && typeof message.parentSpanId.length === "number" || $util.isString(message.parentSpanId)))
                    return "parentSpanId: buffer expected";
                }
                if (message.flags != null && message.hasOwnProperty("flags")) {
                  if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
                }
                if (message.name != null && message.hasOwnProperty("name")) {
                  if (!$util.isString(message.name))
                    return "name: string expected";
                }
                if (message.kind != null && message.hasOwnProperty("kind"))
                  switch (message.kind) {
                    default:
                      return "kind: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                      break;
                  }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                  if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                    return "startTimeUnixNano: integer|Long expected";
                }
                if (message.endTimeUnixNano != null && message.hasOwnProperty("endTimeUnixNano")) {
                  if (!$util.isInteger(message.endTimeUnixNano) && !(message.endTimeUnixNano && $util.isInteger(message.endTimeUnixNano.low) && $util.isInteger(message.endTimeUnixNano.high)))
                    return "endTimeUnixNano: integer|Long expected";
                }
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                  if (!$util.isInteger(message.droppedAttributesCount))
                    return "droppedAttributesCount: integer expected";
                }
                if (message.events != null && message.hasOwnProperty("events")) {
                  if (!Array.isArray(message.events))
                    return "events: array expected";
                  for (var i = 0; i < message.events.length; ++i) {
                    var error = $root.opentelemetry.proto.trace.v1.Span.Event.verify(message.events[i]);
                    if (error)
                      return "events." + error;
                  }
                }
                if (message.droppedEventsCount != null && message.hasOwnProperty("droppedEventsCount")) {
                  if (!$util.isInteger(message.droppedEventsCount))
                    return "droppedEventsCount: integer expected";
                }
                if (message.links != null && message.hasOwnProperty("links")) {
                  if (!Array.isArray(message.links))
                    return "links: array expected";
                  for (var i = 0; i < message.links.length; ++i) {
                    var error = $root.opentelemetry.proto.trace.v1.Span.Link.verify(message.links[i]);
                    if (error)
                      return "links." + error;
                  }
                }
                if (message.droppedLinksCount != null && message.hasOwnProperty("droppedLinksCount")) {
                  if (!$util.isInteger(message.droppedLinksCount))
                    return "droppedLinksCount: integer expected";
                }
                if (message.status != null && message.hasOwnProperty("status")) {
                  var error = $root.opentelemetry.proto.trace.v1.Status.verify(message.status);
                  if (error)
                    return "status." + error;
                }
                return null;
              };
              Span.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.trace.v1.Span)
                  return object;
                var message = new $root.opentelemetry.proto.trace.v1.Span();
                if (object.traceId != null) {
                  if (typeof object.traceId === "string")
                    $util.base64.decode(object.traceId, message.traceId = $util.newBuffer($util.base64.length(object.traceId)), 0);
                  else if (object.traceId.length >= 0)
                    message.traceId = object.traceId;
                }
                if (object.spanId != null) {
                  if (typeof object.spanId === "string")
                    $util.base64.decode(object.spanId, message.spanId = $util.newBuffer($util.base64.length(object.spanId)), 0);
                  else if (object.spanId.length >= 0)
                    message.spanId = object.spanId;
                }
                if (object.traceState != null)
                  message.traceState = String(object.traceState);
                if (object.parentSpanId != null) {
                  if (typeof object.parentSpanId === "string")
                    $util.base64.decode(object.parentSpanId, message.parentSpanId = $util.newBuffer($util.base64.length(object.parentSpanId)), 0);
                  else if (object.parentSpanId.length >= 0)
                    message.parentSpanId = object.parentSpanId;
                }
                if (object.flags != null)
                  message.flags = object.flags >>> 0;
                if (object.name != null)
                  message.name = String(object.name);
                switch (object.kind) {
                  default:
                    if (typeof object.kind === "number") {
                      message.kind = object.kind;
                      break;
                    }
                    break;
                  case "SPAN_KIND_UNSPECIFIED":
                  case 0:
                    message.kind = 0;
                    break;
                  case "SPAN_KIND_INTERNAL":
                  case 1:
                    message.kind = 1;
                    break;
                  case "SPAN_KIND_SERVER":
                  case 2:
                    message.kind = 2;
                    break;
                  case "SPAN_KIND_CLIENT":
                  case 3:
                    message.kind = 3;
                    break;
                  case "SPAN_KIND_PRODUCER":
                  case 4:
                    message.kind = 4;
                    break;
                  case "SPAN_KIND_CONSUMER":
                  case 5:
                    message.kind = 5;
                    break;
                }
                if (object.startTimeUnixNano != null) {
                  if ($util.Long)
                    (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                  else if (typeof object.startTimeUnixNano === "string")
                    message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                  else if (typeof object.startTimeUnixNano === "number")
                    message.startTimeUnixNano = object.startTimeUnixNano;
                  else if (typeof object.startTimeUnixNano === "object")
                    message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                }
                if (object.endTimeUnixNano != null) {
                  if ($util.Long)
                    (message.endTimeUnixNano = $util.Long.fromValue(object.endTimeUnixNano)).unsigned = false;
                  else if (typeof object.endTimeUnixNano === "string")
                    message.endTimeUnixNano = parseInt(object.endTimeUnixNano, 10);
                  else if (typeof object.endTimeUnixNano === "number")
                    message.endTimeUnixNano = object.endTimeUnixNano;
                  else if (typeof object.endTimeUnixNano === "object")
                    message.endTimeUnixNano = new $util.LongBits(object.endTimeUnixNano.low >>> 0, object.endTimeUnixNano.high >>> 0).toNumber();
                }
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.trace.v1.Span.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.droppedAttributesCount != null)
                  message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                if (object.events) {
                  if (!Array.isArray(object.events))
                    throw TypeError(".opentelemetry.proto.trace.v1.Span.events: array expected");
                  message.events = [];
                  for (var i = 0; i < object.events.length; ++i) {
                    if (typeof object.events[i] !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.events: object expected");
                    message.events[i] = $root.opentelemetry.proto.trace.v1.Span.Event.fromObject(object.events[i]);
                  }
                }
                if (object.droppedEventsCount != null)
                  message.droppedEventsCount = object.droppedEventsCount >>> 0;
                if (object.links) {
                  if (!Array.isArray(object.links))
                    throw TypeError(".opentelemetry.proto.trace.v1.Span.links: array expected");
                  message.links = [];
                  for (var i = 0; i < object.links.length; ++i) {
                    if (typeof object.links[i] !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.links: object expected");
                    message.links[i] = $root.opentelemetry.proto.trace.v1.Span.Link.fromObject(object.links[i]);
                  }
                }
                if (object.droppedLinksCount != null)
                  message.droppedLinksCount = object.droppedLinksCount >>> 0;
                if (object.status != null) {
                  if (typeof object.status !== "object")
                    throw TypeError(".opentelemetry.proto.trace.v1.Span.status: object expected");
                  message.status = $root.opentelemetry.proto.trace.v1.Status.fromObject(object.status);
                }
                return message;
              };
              Span.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults) {
                  object.attributes = [];
                  object.events = [];
                  object.links = [];
                }
                if (options2.defaults) {
                  if (options2.bytes === String)
                    object.traceId = "";
                  else {
                    object.traceId = [];
                    if (options2.bytes !== Array)
                      object.traceId = $util.newBuffer(object.traceId);
                  }
                  if (options2.bytes === String)
                    object.spanId = "";
                  else {
                    object.spanId = [];
                    if (options2.bytes !== Array)
                      object.spanId = $util.newBuffer(object.spanId);
                  }
                  object.traceState = "";
                  if (options2.bytes === String)
                    object.parentSpanId = "";
                  else {
                    object.parentSpanId = [];
                    if (options2.bytes !== Array)
                      object.parentSpanId = $util.newBuffer(object.parentSpanId);
                  }
                  object.name = "";
                  object.kind = options2.enums === String ? "SPAN_KIND_UNSPECIFIED" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.endTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.endTimeUnixNano = options2.longs === String ? "0" : 0;
                  object.droppedAttributesCount = 0;
                  object.droppedEventsCount = 0;
                  object.droppedLinksCount = 0;
                  object.status = null;
                  object.flags = 0;
                }
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                  object.traceId = options2.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                if (message.spanId != null && message.hasOwnProperty("spanId"))
                  object.spanId = options2.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                if (message.traceState != null && message.hasOwnProperty("traceState"))
                  object.traceState = message.traceState;
                if (message.parentSpanId != null && message.hasOwnProperty("parentSpanId"))
                  object.parentSpanId = options2.bytes === String ? $util.base64.encode(message.parentSpanId, 0, message.parentSpanId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.parentSpanId) : message.parentSpanId;
                if (message.name != null && message.hasOwnProperty("name"))
                  object.name = message.name;
                if (message.kind != null && message.hasOwnProperty("kind"))
                  object.kind = options2.enums === String ? $root.opentelemetry.proto.trace.v1.Span.SpanKind[message.kind] === void 0 ? message.kind : $root.opentelemetry.proto.trace.v1.Span.SpanKind[message.kind] : message.kind;
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options2.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.endTimeUnixNano != null && message.hasOwnProperty("endTimeUnixNano"))
                  if (typeof message.endTimeUnixNano === "number")
                    object.endTimeUnixNano = options2.longs === String ? String(message.endTimeUnixNano) : message.endTimeUnixNano;
                  else
                    object.endTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.endTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.endTimeUnixNano.low >>> 0, message.endTimeUnixNano.high >>> 0).toNumber() : message.endTimeUnixNano;
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                  object.droppedAttributesCount = message.droppedAttributesCount;
                if (message.events && message.events.length) {
                  object.events = [];
                  for (var j = 0; j < message.events.length; ++j)
                    object.events[j] = $root.opentelemetry.proto.trace.v1.Span.Event.toObject(message.events[j], options2);
                }
                if (message.droppedEventsCount != null && message.hasOwnProperty("droppedEventsCount"))
                  object.droppedEventsCount = message.droppedEventsCount;
                if (message.links && message.links.length) {
                  object.links = [];
                  for (var j = 0; j < message.links.length; ++j)
                    object.links[j] = $root.opentelemetry.proto.trace.v1.Span.Link.toObject(message.links[j], options2);
                }
                if (message.droppedLinksCount != null && message.hasOwnProperty("droppedLinksCount"))
                  object.droppedLinksCount = message.droppedLinksCount;
                if (message.status != null && message.hasOwnProperty("status"))
                  object.status = $root.opentelemetry.proto.trace.v1.Status.toObject(message.status, options2);
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                return object;
              };
              Span.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Span.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Span";
              };
              Span.SpanKind = function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "SPAN_KIND_UNSPECIFIED"] = 0;
                values[valuesById[1] = "SPAN_KIND_INTERNAL"] = 1;
                values[valuesById[2] = "SPAN_KIND_SERVER"] = 2;
                values[valuesById[3] = "SPAN_KIND_CLIENT"] = 3;
                values[valuesById[4] = "SPAN_KIND_PRODUCER"] = 4;
                values[valuesById[5] = "SPAN_KIND_CONSUMER"] = 5;
                return values;
              }();
              Span.Event = function() {
                function Event(properties) {
                  this.attributes = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                Event.prototype.timeUnixNano = null;
                Event.prototype.name = null;
                Event.prototype.attributes = $util.emptyArray;
                Event.prototype.droppedAttributesCount = null;
                Event.create = function create(properties) {
                  return new Event(properties);
                };
                Event.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                    writer.uint32(
                      /* id 1, wireType 1 =*/
                      9
                    ).fixed64(message.timeUnixNano);
                  if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).string(message.name);
                  if (message.attributes != null && message.attributes.length)
                    for (var i = 0; i < message.attributes.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                        /* id 3, wireType 2 =*/
                        26
                      ).fork()).ldelim();
                  if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                    writer.uint32(
                      /* id 4, wireType 0 =*/
                      32
                    ).uint32(message.droppedAttributesCount);
                  return writer;
                };
                Event.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Event.decode = function decode(reader, length, error) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.Span.Event();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                      break;
                    switch (tag >>> 3) {
                      case 1: {
                        message.timeUnixNano = reader.fixed64();
                        break;
                      }
                      case 2: {
                        message.name = reader.string();
                        break;
                      }
                      case 3: {
                        if (!(message.attributes && message.attributes.length))
                          message.attributes = [];
                        message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      case 4: {
                        message.droppedAttributesCount = reader.uint32();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                Event.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Event.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                    if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                      return "timeUnixNano: integer|Long expected";
                  }
                  if (message.name != null && message.hasOwnProperty("name")) {
                    if (!$util.isString(message.name))
                      return "name: string expected";
                  }
                  if (message.attributes != null && message.hasOwnProperty("attributes")) {
                    if (!Array.isArray(message.attributes))
                      return "attributes: array expected";
                    for (var i = 0; i < message.attributes.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                      if (error)
                        return "attributes." + error;
                    }
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                    if (!$util.isInteger(message.droppedAttributesCount))
                      return "droppedAttributesCount: integer expected";
                  }
                  return null;
                };
                Event.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.trace.v1.Span.Event)
                    return object;
                  var message = new $root.opentelemetry.proto.trace.v1.Span.Event();
                  if (object.timeUnixNano != null) {
                    if ($util.Long)
                      (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                    else if (typeof object.timeUnixNano === "string")
                      message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                    else if (typeof object.timeUnixNano === "number")
                      message.timeUnixNano = object.timeUnixNano;
                    else if (typeof object.timeUnixNano === "object")
                      message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.name != null)
                    message.name = String(object.name);
                  if (object.attributes) {
                    if (!Array.isArray(object.attributes))
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.Event.attributes: array expected");
                    message.attributes = [];
                    for (var i = 0; i < object.attributes.length; ++i) {
                      if (typeof object.attributes[i] !== "object")
                        throw TypeError(".opentelemetry.proto.trace.v1.Span.Event.attributes: object expected");
                      message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                    }
                  }
                  if (object.droppedAttributesCount != null)
                    message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                  return message;
                };
                Event.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.arrays || options2.defaults)
                    object.attributes = [];
                  if (options2.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                    } else
                      object.timeUnixNano = options2.longs === String ? "0" : 0;
                    object.name = "";
                    object.droppedAttributesCount = 0;
                  }
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                    if (typeof message.timeUnixNano === "number")
                      object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                    else
                      object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                  if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                    object.droppedAttributesCount = message.droppedAttributesCount;
                  return object;
                };
                Event.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Event.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Span.Event";
                };
                return Event;
              }();
              Span.Link = function() {
                function Link(properties) {
                  this.attributes = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                Link.prototype.traceId = null;
                Link.prototype.spanId = null;
                Link.prototype.traceState = null;
                Link.prototype.attributes = $util.emptyArray;
                Link.prototype.droppedAttributesCount = null;
                Link.prototype.flags = null;
                Link.create = function create(properties) {
                  return new Link(properties);
                };
                Link.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                    writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).bytes(message.traceId);
                  if (message.spanId != null && Object.hasOwnProperty.call(message, "spanId"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).bytes(message.spanId);
                  if (message.traceState != null && Object.hasOwnProperty.call(message, "traceState"))
                    writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).string(message.traceState);
                  if (message.attributes != null && message.attributes.length)
                    for (var i = 0; i < message.attributes.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                        /* id 4, wireType 2 =*/
                        34
                      ).fork()).ldelim();
                  if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                    writer.uint32(
                      /* id 5, wireType 0 =*/
                      40
                    ).uint32(message.droppedAttributesCount);
                  if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                    writer.uint32(
                      /* id 6, wireType 5 =*/
                      53
                    ).fixed32(message.flags);
                  return writer;
                };
                Link.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Link.decode = function decode(reader, length, error) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.Span.Link();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                      break;
                    switch (tag >>> 3) {
                      case 1: {
                        message.traceId = reader.bytes();
                        break;
                      }
                      case 2: {
                        message.spanId = reader.bytes();
                        break;
                      }
                      case 3: {
                        message.traceState = reader.string();
                        break;
                      }
                      case 4: {
                        if (!(message.attributes && message.attributes.length))
                          message.attributes = [];
                        message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      case 5: {
                        message.droppedAttributesCount = reader.uint32();
                        break;
                      }
                      case 6: {
                        message.flags = reader.fixed32();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                Link.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Link.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.traceId != null && message.hasOwnProperty("traceId")) {
                    if (!(message.traceId && typeof message.traceId.length === "number" || $util.isString(message.traceId)))
                      return "traceId: buffer expected";
                  }
                  if (message.spanId != null && message.hasOwnProperty("spanId")) {
                    if (!(message.spanId && typeof message.spanId.length === "number" || $util.isString(message.spanId)))
                      return "spanId: buffer expected";
                  }
                  if (message.traceState != null && message.hasOwnProperty("traceState")) {
                    if (!$util.isString(message.traceState))
                      return "traceState: string expected";
                  }
                  if (message.attributes != null && message.hasOwnProperty("attributes")) {
                    if (!Array.isArray(message.attributes))
                      return "attributes: array expected";
                    for (var i = 0; i < message.attributes.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                      if (error)
                        return "attributes." + error;
                    }
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                    if (!$util.isInteger(message.droppedAttributesCount))
                      return "droppedAttributesCount: integer expected";
                  }
                  if (message.flags != null && message.hasOwnProperty("flags")) {
                    if (!$util.isInteger(message.flags))
                      return "flags: integer expected";
                  }
                  return null;
                };
                Link.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.trace.v1.Span.Link)
                    return object;
                  var message = new $root.opentelemetry.proto.trace.v1.Span.Link();
                  if (object.traceId != null) {
                    if (typeof object.traceId === "string")
                      $util.base64.decode(object.traceId, message.traceId = $util.newBuffer($util.base64.length(object.traceId)), 0);
                    else if (object.traceId.length >= 0)
                      message.traceId = object.traceId;
                  }
                  if (object.spanId != null) {
                    if (typeof object.spanId === "string")
                      $util.base64.decode(object.spanId, message.spanId = $util.newBuffer($util.base64.length(object.spanId)), 0);
                    else if (object.spanId.length >= 0)
                      message.spanId = object.spanId;
                  }
                  if (object.traceState != null)
                    message.traceState = String(object.traceState);
                  if (object.attributes) {
                    if (!Array.isArray(object.attributes))
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.Link.attributes: array expected");
                    message.attributes = [];
                    for (var i = 0; i < object.attributes.length; ++i) {
                      if (typeof object.attributes[i] !== "object")
                        throw TypeError(".opentelemetry.proto.trace.v1.Span.Link.attributes: object expected");
                      message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                    }
                  }
                  if (object.droppedAttributesCount != null)
                    message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                  if (object.flags != null)
                    message.flags = object.flags >>> 0;
                  return message;
                };
                Link.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.arrays || options2.defaults)
                    object.attributes = [];
                  if (options2.defaults) {
                    if (options2.bytes === String)
                      object.traceId = "";
                    else {
                      object.traceId = [];
                      if (options2.bytes !== Array)
                        object.traceId = $util.newBuffer(object.traceId);
                    }
                    if (options2.bytes === String)
                      object.spanId = "";
                    else {
                      object.spanId = [];
                      if (options2.bytes !== Array)
                        object.spanId = $util.newBuffer(object.spanId);
                    }
                    object.traceState = "";
                    object.droppedAttributesCount = 0;
                    object.flags = 0;
                  }
                  if (message.traceId != null && message.hasOwnProperty("traceId"))
                    object.traceId = options2.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                  if (message.spanId != null && message.hasOwnProperty("spanId"))
                    object.spanId = options2.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                  if (message.traceState != null && message.hasOwnProperty("traceState"))
                    object.traceState = message.traceState;
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                    object.droppedAttributesCount = message.droppedAttributesCount;
                  if (message.flags != null && message.hasOwnProperty("flags"))
                    object.flags = message.flags;
                  return object;
                };
                Link.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Link.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Span.Link";
                };
                return Link;
              }();
              return Span;
            }();
            v1.Status = function() {
              function Status(properties) {
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              Status.prototype.message = null;
              Status.prototype.code = null;
              Status.create = function create(properties) {
                return new Status(properties);
              };
              Status.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                  writer.uint32(
                    /* id 2, wireType 2 =*/
                    18
                  ).string(message.message);
                if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                  writer.uint32(
                    /* id 3, wireType 0 =*/
                    24
                  ).int32(message.code);
                return writer;
              };
              Status.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Status.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.Status();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 2: {
                      message.message = reader.string();
                      break;
                    }
                    case 3: {
                      message.code = reader.int32();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              Status.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Status.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.message != null && message.hasOwnProperty("message")) {
                  if (!$util.isString(message.message))
                    return "message: string expected";
                }
                if (message.code != null && message.hasOwnProperty("code"))
                  switch (message.code) {
                    default:
                      return "code: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                      break;
                  }
                return null;
              };
              Status.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.trace.v1.Status)
                  return object;
                var message = new $root.opentelemetry.proto.trace.v1.Status();
                if (object.message != null)
                  message.message = String(object.message);
                switch (object.code) {
                  default:
                    if (typeof object.code === "number") {
                      message.code = object.code;
                      break;
                    }
                    break;
                  case "STATUS_CODE_UNSET":
                  case 0:
                    message.code = 0;
                    break;
                  case "STATUS_CODE_OK":
                  case 1:
                    message.code = 1;
                    break;
                  case "STATUS_CODE_ERROR":
                  case 2:
                    message.code = 2;
                    break;
                }
                return message;
              };
              Status.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.defaults) {
                  object.message = "";
                  object.code = options2.enums === String ? "STATUS_CODE_UNSET" : 0;
                }
                if (message.message != null && message.hasOwnProperty("message"))
                  object.message = message.message;
                if (message.code != null && message.hasOwnProperty("code"))
                  object.code = options2.enums === String ? $root.opentelemetry.proto.trace.v1.Status.StatusCode[message.code] === void 0 ? message.code : $root.opentelemetry.proto.trace.v1.Status.StatusCode[message.code] : message.code;
                return object;
              };
              Status.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Status.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Status";
              };
              Status.StatusCode = function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "STATUS_CODE_UNSET"] = 0;
                values[valuesById[1] = "STATUS_CODE_OK"] = 1;
                values[valuesById[2] = "STATUS_CODE_ERROR"] = 2;
                return values;
              }();
              return Status;
            }();
            v1.SpanFlags = function() {
              var valuesById = {}, values = Object.create(valuesById);
              values[valuesById[0] = "SPAN_FLAGS_DO_NOT_USE"] = 0;
              values[valuesById[255] = "SPAN_FLAGS_TRACE_FLAGS_MASK"] = 255;
              values[valuesById[256] = "SPAN_FLAGS_CONTEXT_HAS_IS_REMOTE_MASK"] = 256;
              values[valuesById[512] = "SPAN_FLAGS_CONTEXT_IS_REMOTE_MASK"] = 512;
              return values;
            }();
            return v1;
          }();
          return trace3;
        }();
        proto.collector = function() {
          var collector = {};
          collector.trace = function() {
            var trace3 = {};
            trace3.v1 = function() {
              var v1 = {};
              v1.TraceService = function() {
                function TraceService(rpcImpl, requestDelimited, responseDelimited) {
                  $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }
                (TraceService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = TraceService;
                TraceService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                  return new this(rpcImpl, requestDelimited, responseDelimited);
                };
                Object.defineProperty(TraceService.prototype["export"] = function export_(request, callback) {
                  return this.rpcCall(export_, $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest, $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse, request, callback);
                }, "name", { value: "Export" });
                return TraceService;
              }();
              v1.ExportTraceServiceRequest = function() {
                function ExportTraceServiceRequest(properties) {
                  this.resourceSpans = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ExportTraceServiceRequest.prototype.resourceSpans = $util.emptyArray;
                ExportTraceServiceRequest.create = function create(properties) {
                  return new ExportTraceServiceRequest(properties);
                };
                ExportTraceServiceRequest.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resourceSpans != null && message.resourceSpans.length)
                    for (var i = 0; i < message.resourceSpans.length; ++i)
                      $root.opentelemetry.proto.trace.v1.ResourceSpans.encode(message.resourceSpans[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                };
                ExportTraceServiceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportTraceServiceRequest.decode = function decode(reader, length, error) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                      break;
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.resourceSpans && message.resourceSpans.length))
                          message.resourceSpans = [];
                        message.resourceSpans.push($root.opentelemetry.proto.trace.v1.ResourceSpans.decode(reader, reader.uint32()));
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ExportTraceServiceRequest.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportTraceServiceRequest.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.resourceSpans != null && message.hasOwnProperty("resourceSpans")) {
                    if (!Array.isArray(message.resourceSpans))
                      return "resourceSpans: array expected";
                    for (var i = 0; i < message.resourceSpans.length; ++i) {
                      var error = $root.opentelemetry.proto.trace.v1.ResourceSpans.verify(message.resourceSpans[i]);
                      if (error)
                        return "resourceSpans." + error;
                    }
                  }
                  return null;
                };
                ExportTraceServiceRequest.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest();
                  if (object.resourceSpans) {
                    if (!Array.isArray(object.resourceSpans))
                      throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest.resourceSpans: array expected");
                    message.resourceSpans = [];
                    for (var i = 0; i < object.resourceSpans.length; ++i) {
                      if (typeof object.resourceSpans[i] !== "object")
                        throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest.resourceSpans: object expected");
                      message.resourceSpans[i] = $root.opentelemetry.proto.trace.v1.ResourceSpans.fromObject(object.resourceSpans[i]);
                    }
                  }
                  return message;
                };
                ExportTraceServiceRequest.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.arrays || options2.defaults)
                    object.resourceSpans = [];
                  if (message.resourceSpans && message.resourceSpans.length) {
                    object.resourceSpans = [];
                    for (var j = 0; j < message.resourceSpans.length; ++j)
                      object.resourceSpans[j] = $root.opentelemetry.proto.trace.v1.ResourceSpans.toObject(message.resourceSpans[j], options2);
                  }
                  return object;
                };
                ExportTraceServiceRequest.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportTraceServiceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest";
                };
                return ExportTraceServiceRequest;
              }();
              v1.ExportTraceServiceResponse = function() {
                function ExportTraceServiceResponse(properties) {
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ExportTraceServiceResponse.prototype.partialSuccess = null;
                ExportTraceServiceResponse.create = function create(properties) {
                  return new ExportTraceServiceResponse(properties);
                };
                ExportTraceServiceResponse.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.partialSuccess != null && Object.hasOwnProperty.call(message, "partialSuccess"))
                    $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.encode(message.partialSuccess, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  return writer;
                };
                ExportTraceServiceResponse.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportTraceServiceResponse.decode = function decode(reader, length, error) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                      break;
                    switch (tag >>> 3) {
                      case 1: {
                        message.partialSuccess = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.decode(reader, reader.uint32());
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ExportTraceServiceResponse.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportTraceServiceResponse.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess")) {
                    var error = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.verify(message.partialSuccess);
                    if (error)
                      return "partialSuccess." + error;
                  }
                  return null;
                };
                ExportTraceServiceResponse.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse();
                  if (object.partialSuccess != null) {
                    if (typeof object.partialSuccess !== "object")
                      throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse.partialSuccess: object expected");
                    message.partialSuccess = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.fromObject(object.partialSuccess);
                  }
                  return message;
                };
                ExportTraceServiceResponse.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults)
                    object.partialSuccess = null;
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess"))
                    object.partialSuccess = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.toObject(message.partialSuccess, options2);
                  return object;
                };
                ExportTraceServiceResponse.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportTraceServiceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse";
                };
                return ExportTraceServiceResponse;
              }();
              v1.ExportTracePartialSuccess = function() {
                function ExportTracePartialSuccess(properties) {
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ExportTracePartialSuccess.prototype.rejectedSpans = null;
                ExportTracePartialSuccess.prototype.errorMessage = null;
                ExportTracePartialSuccess.create = function create(properties) {
                  return new ExportTracePartialSuccess(properties);
                };
                ExportTracePartialSuccess.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.rejectedSpans != null && Object.hasOwnProperty.call(message, "rejectedSpans"))
                    writer.uint32(
                      /* id 1, wireType 0 =*/
                      8
                    ).int64(message.rejectedSpans);
                  if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).string(message.errorMessage);
                  return writer;
                };
                ExportTracePartialSuccess.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportTracePartialSuccess.decode = function decode(reader, length, error) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                      break;
                    switch (tag >>> 3) {
                      case 1: {
                        message.rejectedSpans = reader.int64();
                        break;
                      }
                      case 2: {
                        message.errorMessage = reader.string();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ExportTracePartialSuccess.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportTracePartialSuccess.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.rejectedSpans != null && message.hasOwnProperty("rejectedSpans")) {
                    if (!$util.isInteger(message.rejectedSpans) && !(message.rejectedSpans && $util.isInteger(message.rejectedSpans.low) && $util.isInteger(message.rejectedSpans.high)))
                      return "rejectedSpans: integer|Long expected";
                  }
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage")) {
                    if (!$util.isString(message.errorMessage))
                      return "errorMessage: string expected";
                  }
                  return null;
                };
                ExportTracePartialSuccess.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess();
                  if (object.rejectedSpans != null) {
                    if ($util.Long)
                      (message.rejectedSpans = $util.Long.fromValue(object.rejectedSpans)).unsigned = false;
                    else if (typeof object.rejectedSpans === "string")
                      message.rejectedSpans = parseInt(object.rejectedSpans, 10);
                    else if (typeof object.rejectedSpans === "number")
                      message.rejectedSpans = object.rejectedSpans;
                    else if (typeof object.rejectedSpans === "object")
                      message.rejectedSpans = new $util.LongBits(object.rejectedSpans.low >>> 0, object.rejectedSpans.high >>> 0).toNumber();
                  }
                  if (object.errorMessage != null)
                    message.errorMessage = String(object.errorMessage);
                  return message;
                };
                ExportTracePartialSuccess.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.rejectedSpans = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                    } else
                      object.rejectedSpans = options2.longs === String ? "0" : 0;
                    object.errorMessage = "";
                  }
                  if (message.rejectedSpans != null && message.hasOwnProperty("rejectedSpans"))
                    if (typeof message.rejectedSpans === "number")
                      object.rejectedSpans = options2.longs === String ? String(message.rejectedSpans) : message.rejectedSpans;
                    else
                      object.rejectedSpans = options2.longs === String ? $util.Long.prototype.toString.call(message.rejectedSpans) : options2.longs === Number ? new $util.LongBits(message.rejectedSpans.low >>> 0, message.rejectedSpans.high >>> 0).toNumber() : message.rejectedSpans;
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                  return object;
                };
                ExportTracePartialSuccess.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportTracePartialSuccess.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess";
                };
                return ExportTracePartialSuccess;
              }();
              return v1;
            }();
            return trace3;
          }();
          collector.metrics = function() {
            var metrics = {};
            metrics.v1 = function() {
              var v1 = {};
              v1.MetricsService = function() {
                function MetricsService(rpcImpl, requestDelimited, responseDelimited) {
                  $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }
                (MetricsService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = MetricsService;
                MetricsService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                  return new this(rpcImpl, requestDelimited, responseDelimited);
                };
                Object.defineProperty(MetricsService.prototype["export"] = function export_(request, callback) {
                  return this.rpcCall(export_, $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest, $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse, request, callback);
                }, "name", { value: "Export" });
                return MetricsService;
              }();
              v1.ExportMetricsServiceRequest = function() {
                function ExportMetricsServiceRequest(properties) {
                  this.resourceMetrics = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ExportMetricsServiceRequest.prototype.resourceMetrics = $util.emptyArray;
                ExportMetricsServiceRequest.create = function create(properties) {
                  return new ExportMetricsServiceRequest(properties);
                };
                ExportMetricsServiceRequest.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resourceMetrics != null && message.resourceMetrics.length)
                    for (var i = 0; i < message.resourceMetrics.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.ResourceMetrics.encode(message.resourceMetrics[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                };
                ExportMetricsServiceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportMetricsServiceRequest.decode = function decode(reader, length, error) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                      break;
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.resourceMetrics && message.resourceMetrics.length))
                          message.resourceMetrics = [];
                        message.resourceMetrics.push($root.opentelemetry.proto.metrics.v1.ResourceMetrics.decode(reader, reader.uint32()));
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ExportMetricsServiceRequest.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportMetricsServiceRequest.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.resourceMetrics != null && message.hasOwnProperty("resourceMetrics")) {
                    if (!Array.isArray(message.resourceMetrics))
                      return "resourceMetrics: array expected";
                    for (var i = 0; i < message.resourceMetrics.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.verify(message.resourceMetrics[i]);
                      if (error)
                        return "resourceMetrics." + error;
                    }
                  }
                  return null;
                };
                ExportMetricsServiceRequest.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest();
                  if (object.resourceMetrics) {
                    if (!Array.isArray(object.resourceMetrics))
                      throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest.resourceMetrics: array expected");
                    message.resourceMetrics = [];
                    for (var i = 0; i < object.resourceMetrics.length; ++i) {
                      if (typeof object.resourceMetrics[i] !== "object")
                        throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest.resourceMetrics: object expected");
                      message.resourceMetrics[i] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.fromObject(object.resourceMetrics[i]);
                    }
                  }
                  return message;
                };
                ExportMetricsServiceRequest.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.arrays || options2.defaults)
                    object.resourceMetrics = [];
                  if (message.resourceMetrics && message.resourceMetrics.length) {
                    object.resourceMetrics = [];
                    for (var j = 0; j < message.resourceMetrics.length; ++j)
                      object.resourceMetrics[j] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.toObject(message.resourceMetrics[j], options2);
                  }
                  return object;
                };
                ExportMetricsServiceRequest.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportMetricsServiceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest";
                };
                return ExportMetricsServiceRequest;
              }();
              v1.ExportMetricsServiceResponse = function() {
                function ExportMetricsServiceResponse(properties) {
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ExportMetricsServiceResponse.prototype.partialSuccess = null;
                ExportMetricsServiceResponse.create = function create(properties) {
                  return new ExportMetricsServiceResponse(properties);
                };
                ExportMetricsServiceResponse.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.partialSuccess != null && Object.hasOwnProperty.call(message, "partialSuccess"))
                    $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.encode(message.partialSuccess, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  return writer;
                };
                ExportMetricsServiceResponse.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportMetricsServiceResponse.decode = function decode(reader, length, error) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                      break;
                    switch (tag >>> 3) {
                      case 1: {
                        message.partialSuccess = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.decode(reader, reader.uint32());
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ExportMetricsServiceResponse.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportMetricsServiceResponse.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess")) {
                    var error = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.verify(message.partialSuccess);
                    if (error)
                      return "partialSuccess." + error;
                  }
                  return null;
                };
                ExportMetricsServiceResponse.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse();
                  if (object.partialSuccess != null) {
                    if (typeof object.partialSuccess !== "object")
                      throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse.partialSuccess: object expected");
                    message.partialSuccess = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.fromObject(object.partialSuccess);
                  }
                  return message;
                };
                ExportMetricsServiceResponse.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults)
                    object.partialSuccess = null;
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess"))
                    object.partialSuccess = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.toObject(message.partialSuccess, options2);
                  return object;
                };
                ExportMetricsServiceResponse.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportMetricsServiceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse";
                };
                return ExportMetricsServiceResponse;
              }();
              v1.ExportMetricsPartialSuccess = function() {
                function ExportMetricsPartialSuccess(properties) {
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ExportMetricsPartialSuccess.prototype.rejectedDataPoints = null;
                ExportMetricsPartialSuccess.prototype.errorMessage = null;
                ExportMetricsPartialSuccess.create = function create(properties) {
                  return new ExportMetricsPartialSuccess(properties);
                };
                ExportMetricsPartialSuccess.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.rejectedDataPoints != null && Object.hasOwnProperty.call(message, "rejectedDataPoints"))
                    writer.uint32(
                      /* id 1, wireType 0 =*/
                      8
                    ).int64(message.rejectedDataPoints);
                  if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).string(message.errorMessage);
                  return writer;
                };
                ExportMetricsPartialSuccess.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportMetricsPartialSuccess.decode = function decode(reader, length, error) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                      break;
                    switch (tag >>> 3) {
                      case 1: {
                        message.rejectedDataPoints = reader.int64();
                        break;
                      }
                      case 2: {
                        message.errorMessage = reader.string();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ExportMetricsPartialSuccess.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportMetricsPartialSuccess.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.rejectedDataPoints != null && message.hasOwnProperty("rejectedDataPoints")) {
                    if (!$util.isInteger(message.rejectedDataPoints) && !(message.rejectedDataPoints && $util.isInteger(message.rejectedDataPoints.low) && $util.isInteger(message.rejectedDataPoints.high)))
                      return "rejectedDataPoints: integer|Long expected";
                  }
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage")) {
                    if (!$util.isString(message.errorMessage))
                      return "errorMessage: string expected";
                  }
                  return null;
                };
                ExportMetricsPartialSuccess.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess();
                  if (object.rejectedDataPoints != null) {
                    if ($util.Long)
                      (message.rejectedDataPoints = $util.Long.fromValue(object.rejectedDataPoints)).unsigned = false;
                    else if (typeof object.rejectedDataPoints === "string")
                      message.rejectedDataPoints = parseInt(object.rejectedDataPoints, 10);
                    else if (typeof object.rejectedDataPoints === "number")
                      message.rejectedDataPoints = object.rejectedDataPoints;
                    else if (typeof object.rejectedDataPoints === "object")
                      message.rejectedDataPoints = new $util.LongBits(object.rejectedDataPoints.low >>> 0, object.rejectedDataPoints.high >>> 0).toNumber();
                  }
                  if (object.errorMessage != null)
                    message.errorMessage = String(object.errorMessage);
                  return message;
                };
                ExportMetricsPartialSuccess.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.rejectedDataPoints = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                    } else
                      object.rejectedDataPoints = options2.longs === String ? "0" : 0;
                    object.errorMessage = "";
                  }
                  if (message.rejectedDataPoints != null && message.hasOwnProperty("rejectedDataPoints"))
                    if (typeof message.rejectedDataPoints === "number")
                      object.rejectedDataPoints = options2.longs === String ? String(message.rejectedDataPoints) : message.rejectedDataPoints;
                    else
                      object.rejectedDataPoints = options2.longs === String ? $util.Long.prototype.toString.call(message.rejectedDataPoints) : options2.longs === Number ? new $util.LongBits(message.rejectedDataPoints.low >>> 0, message.rejectedDataPoints.high >>> 0).toNumber() : message.rejectedDataPoints;
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                  return object;
                };
                ExportMetricsPartialSuccess.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportMetricsPartialSuccess.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess";
                };
                return ExportMetricsPartialSuccess;
              }();
              return v1;
            }();
            return metrics;
          }();
          collector.logs = function() {
            var logs = {};
            logs.v1 = function() {
              var v1 = {};
              v1.LogsService = function() {
                function LogsService(rpcImpl, requestDelimited, responseDelimited) {
                  $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }
                (LogsService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = LogsService;
                LogsService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                  return new this(rpcImpl, requestDelimited, responseDelimited);
                };
                Object.defineProperty(LogsService.prototype["export"] = function export_(request, callback) {
                  return this.rpcCall(export_, $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest, $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse, request, callback);
                }, "name", { value: "Export" });
                return LogsService;
              }();
              v1.ExportLogsServiceRequest = function() {
                function ExportLogsServiceRequest(properties) {
                  this.resourceLogs = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ExportLogsServiceRequest.prototype.resourceLogs = $util.emptyArray;
                ExportLogsServiceRequest.create = function create(properties) {
                  return new ExportLogsServiceRequest(properties);
                };
                ExportLogsServiceRequest.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resourceLogs != null && message.resourceLogs.length)
                    for (var i = 0; i < message.resourceLogs.length; ++i)
                      $root.opentelemetry.proto.logs.v1.ResourceLogs.encode(message.resourceLogs[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                };
                ExportLogsServiceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportLogsServiceRequest.decode = function decode(reader, length, error) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                      break;
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.resourceLogs && message.resourceLogs.length))
                          message.resourceLogs = [];
                        message.resourceLogs.push($root.opentelemetry.proto.logs.v1.ResourceLogs.decode(reader, reader.uint32()));
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ExportLogsServiceRequest.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportLogsServiceRequest.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.resourceLogs != null && message.hasOwnProperty("resourceLogs")) {
                    if (!Array.isArray(message.resourceLogs))
                      return "resourceLogs: array expected";
                    for (var i = 0; i < message.resourceLogs.length; ++i) {
                      var error = $root.opentelemetry.proto.logs.v1.ResourceLogs.verify(message.resourceLogs[i]);
                      if (error)
                        return "resourceLogs." + error;
                    }
                  }
                  return null;
                };
                ExportLogsServiceRequest.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest();
                  if (object.resourceLogs) {
                    if (!Array.isArray(object.resourceLogs))
                      throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest.resourceLogs: array expected");
                    message.resourceLogs = [];
                    for (var i = 0; i < object.resourceLogs.length; ++i) {
                      if (typeof object.resourceLogs[i] !== "object")
                        throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest.resourceLogs: object expected");
                      message.resourceLogs[i] = $root.opentelemetry.proto.logs.v1.ResourceLogs.fromObject(object.resourceLogs[i]);
                    }
                  }
                  return message;
                };
                ExportLogsServiceRequest.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.arrays || options2.defaults)
                    object.resourceLogs = [];
                  if (message.resourceLogs && message.resourceLogs.length) {
                    object.resourceLogs = [];
                    for (var j = 0; j < message.resourceLogs.length; ++j)
                      object.resourceLogs[j] = $root.opentelemetry.proto.logs.v1.ResourceLogs.toObject(message.resourceLogs[j], options2);
                  }
                  return object;
                };
                ExportLogsServiceRequest.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportLogsServiceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest";
                };
                return ExportLogsServiceRequest;
              }();
              v1.ExportLogsServiceResponse = function() {
                function ExportLogsServiceResponse(properties) {
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ExportLogsServiceResponse.prototype.partialSuccess = null;
                ExportLogsServiceResponse.create = function create(properties) {
                  return new ExportLogsServiceResponse(properties);
                };
                ExportLogsServiceResponse.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.partialSuccess != null && Object.hasOwnProperty.call(message, "partialSuccess"))
                    $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.encode(message.partialSuccess, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  return writer;
                };
                ExportLogsServiceResponse.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportLogsServiceResponse.decode = function decode(reader, length, error) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                      break;
                    switch (tag >>> 3) {
                      case 1: {
                        message.partialSuccess = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.decode(reader, reader.uint32());
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ExportLogsServiceResponse.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportLogsServiceResponse.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess")) {
                    var error = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.verify(message.partialSuccess);
                    if (error)
                      return "partialSuccess." + error;
                  }
                  return null;
                };
                ExportLogsServiceResponse.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse();
                  if (object.partialSuccess != null) {
                    if (typeof object.partialSuccess !== "object")
                      throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse.partialSuccess: object expected");
                    message.partialSuccess = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.fromObject(object.partialSuccess);
                  }
                  return message;
                };
                ExportLogsServiceResponse.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults)
                    object.partialSuccess = null;
                  if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess"))
                    object.partialSuccess = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.toObject(message.partialSuccess, options2);
                  return object;
                };
                ExportLogsServiceResponse.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportLogsServiceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse";
                };
                return ExportLogsServiceResponse;
              }();
              v1.ExportLogsPartialSuccess = function() {
                function ExportLogsPartialSuccess(properties) {
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ExportLogsPartialSuccess.prototype.rejectedLogRecords = null;
                ExportLogsPartialSuccess.prototype.errorMessage = null;
                ExportLogsPartialSuccess.create = function create(properties) {
                  return new ExportLogsPartialSuccess(properties);
                };
                ExportLogsPartialSuccess.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.rejectedLogRecords != null && Object.hasOwnProperty.call(message, "rejectedLogRecords"))
                    writer.uint32(
                      /* id 1, wireType 0 =*/
                      8
                    ).int64(message.rejectedLogRecords);
                  if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).string(message.errorMessage);
                  return writer;
                };
                ExportLogsPartialSuccess.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExportLogsPartialSuccess.decode = function decode(reader, length, error) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                      break;
                    switch (tag >>> 3) {
                      case 1: {
                        message.rejectedLogRecords = reader.int64();
                        break;
                      }
                      case 2: {
                        message.errorMessage = reader.string();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ExportLogsPartialSuccess.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExportLogsPartialSuccess.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.rejectedLogRecords != null && message.hasOwnProperty("rejectedLogRecords")) {
                    if (!$util.isInteger(message.rejectedLogRecords) && !(message.rejectedLogRecords && $util.isInteger(message.rejectedLogRecords.low) && $util.isInteger(message.rejectedLogRecords.high)))
                      return "rejectedLogRecords: integer|Long expected";
                  }
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage")) {
                    if (!$util.isString(message.errorMessage))
                      return "errorMessage: string expected";
                  }
                  return null;
                };
                ExportLogsPartialSuccess.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess)
                    return object;
                  var message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess();
                  if (object.rejectedLogRecords != null) {
                    if ($util.Long)
                      (message.rejectedLogRecords = $util.Long.fromValue(object.rejectedLogRecords)).unsigned = false;
                    else if (typeof object.rejectedLogRecords === "string")
                      message.rejectedLogRecords = parseInt(object.rejectedLogRecords, 10);
                    else if (typeof object.rejectedLogRecords === "number")
                      message.rejectedLogRecords = object.rejectedLogRecords;
                    else if (typeof object.rejectedLogRecords === "object")
                      message.rejectedLogRecords = new $util.LongBits(object.rejectedLogRecords.low >>> 0, object.rejectedLogRecords.high >>> 0).toNumber();
                  }
                  if (object.errorMessage != null)
                    message.errorMessage = String(object.errorMessage);
                  return message;
                };
                ExportLogsPartialSuccess.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.rejectedLogRecords = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                    } else
                      object.rejectedLogRecords = options2.longs === String ? "0" : 0;
                    object.errorMessage = "";
                  }
                  if (message.rejectedLogRecords != null && message.hasOwnProperty("rejectedLogRecords"))
                    if (typeof message.rejectedLogRecords === "number")
                      object.rejectedLogRecords = options2.longs === String ? String(message.rejectedLogRecords) : message.rejectedLogRecords;
                    else
                      object.rejectedLogRecords = options2.longs === String ? $util.Long.prototype.toString.call(message.rejectedLogRecords) : options2.longs === Number ? new $util.LongBits(message.rejectedLogRecords.low >>> 0, message.rejectedLogRecords.high >>> 0).toNumber() : message.rejectedLogRecords;
                  if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                    object.errorMessage = message.errorMessage;
                  return object;
                };
                ExportLogsPartialSuccess.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExportLogsPartialSuccess.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess";
                };
                return ExportLogsPartialSuccess;
              }();
              return v1;
            }();
            return logs;
          }();
          return collector;
        }();
        proto.metrics = function() {
          var metrics = {};
          metrics.v1 = function() {
            var v1 = {};
            v1.MetricsData = function() {
              function MetricsData(properties) {
                this.resourceMetrics = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              MetricsData.prototype.resourceMetrics = $util.emptyArray;
              MetricsData.create = function create(properties) {
                return new MetricsData(properties);
              };
              MetricsData.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resourceMetrics != null && message.resourceMetrics.length)
                  for (var i = 0; i < message.resourceMetrics.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.ResourceMetrics.encode(message.resourceMetrics[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              MetricsData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              MetricsData.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.MetricsData();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.resourceMetrics && message.resourceMetrics.length))
                        message.resourceMetrics = [];
                      message.resourceMetrics.push($root.opentelemetry.proto.metrics.v1.ResourceMetrics.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              MetricsData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              MetricsData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.resourceMetrics != null && message.hasOwnProperty("resourceMetrics")) {
                  if (!Array.isArray(message.resourceMetrics))
                    return "resourceMetrics: array expected";
                  for (var i = 0; i < message.resourceMetrics.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.verify(message.resourceMetrics[i]);
                    if (error)
                      return "resourceMetrics." + error;
                  }
                }
                return null;
              };
              MetricsData.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.MetricsData)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.MetricsData();
                if (object.resourceMetrics) {
                  if (!Array.isArray(object.resourceMetrics))
                    throw TypeError(".opentelemetry.proto.metrics.v1.MetricsData.resourceMetrics: array expected");
                  message.resourceMetrics = [];
                  for (var i = 0; i < object.resourceMetrics.length; ++i) {
                    if (typeof object.resourceMetrics[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.MetricsData.resourceMetrics: object expected");
                    message.resourceMetrics[i] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.fromObject(object.resourceMetrics[i]);
                  }
                }
                return message;
              };
              MetricsData.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.resourceMetrics = [];
                if (message.resourceMetrics && message.resourceMetrics.length) {
                  object.resourceMetrics = [];
                  for (var j = 0; j < message.resourceMetrics.length; ++j)
                    object.resourceMetrics[j] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.toObject(message.resourceMetrics[j], options2);
                }
                return object;
              };
              MetricsData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              MetricsData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.MetricsData";
              };
              return MetricsData;
            }();
            v1.ResourceMetrics = function() {
              function ResourceMetrics(properties) {
                this.scopeMetrics = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              ResourceMetrics.prototype.resource = null;
              ResourceMetrics.prototype.scopeMetrics = $util.emptyArray;
              ResourceMetrics.prototype.schemaUrl = null;
              ResourceMetrics.create = function create(properties) {
                return new ResourceMetrics(properties);
              };
              ResourceMetrics.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                  $root.opentelemetry.proto.resource.v1.Resource.encode(message.resource, writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).fork()).ldelim();
                if (message.scopeMetrics != null && message.scopeMetrics.length)
                  for (var i = 0; i < message.scopeMetrics.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.ScopeMetrics.encode(message.scopeMetrics[i], writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork()).ldelim();
                if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.schemaUrl);
                return writer;
              };
              ResourceMetrics.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ResourceMetrics.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ResourceMetrics();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      message.resource = $root.opentelemetry.proto.resource.v1.Resource.decode(reader, reader.uint32());
                      break;
                    }
                    case 2: {
                      if (!(message.scopeMetrics && message.scopeMetrics.length))
                        message.scopeMetrics = [];
                      message.scopeMetrics.push($root.opentelemetry.proto.metrics.v1.ScopeMetrics.decode(reader, reader.uint32()));
                      break;
                    }
                    case 3: {
                      message.schemaUrl = reader.string();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              ResourceMetrics.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ResourceMetrics.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.resource != null && message.hasOwnProperty("resource")) {
                  var error = $root.opentelemetry.proto.resource.v1.Resource.verify(message.resource);
                  if (error)
                    return "resource." + error;
                }
                if (message.scopeMetrics != null && message.hasOwnProperty("scopeMetrics")) {
                  if (!Array.isArray(message.scopeMetrics))
                    return "scopeMetrics: array expected";
                  for (var i = 0; i < message.scopeMetrics.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.ScopeMetrics.verify(message.scopeMetrics[i]);
                    if (error)
                      return "scopeMetrics." + error;
                  }
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                  if (!$util.isString(message.schemaUrl))
                    return "schemaUrl: string expected";
                }
                return null;
              };
              ResourceMetrics.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.ResourceMetrics)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.ResourceMetrics();
                if (object.resource != null) {
                  if (typeof object.resource !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.resource: object expected");
                  message.resource = $root.opentelemetry.proto.resource.v1.Resource.fromObject(object.resource);
                }
                if (object.scopeMetrics) {
                  if (!Array.isArray(object.scopeMetrics))
                    throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.scopeMetrics: array expected");
                  message.scopeMetrics = [];
                  for (var i = 0; i < object.scopeMetrics.length; ++i) {
                    if (typeof object.scopeMetrics[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.scopeMetrics: object expected");
                    message.scopeMetrics[i] = $root.opentelemetry.proto.metrics.v1.ScopeMetrics.fromObject(object.scopeMetrics[i]);
                  }
                }
                if (object.schemaUrl != null)
                  message.schemaUrl = String(object.schemaUrl);
                return message;
              };
              ResourceMetrics.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.scopeMetrics = [];
                if (options2.defaults) {
                  object.resource = null;
                  object.schemaUrl = "";
                }
                if (message.resource != null && message.hasOwnProperty("resource"))
                  object.resource = $root.opentelemetry.proto.resource.v1.Resource.toObject(message.resource, options2);
                if (message.scopeMetrics && message.scopeMetrics.length) {
                  object.scopeMetrics = [];
                  for (var j = 0; j < message.scopeMetrics.length; ++j)
                    object.scopeMetrics[j] = $root.opentelemetry.proto.metrics.v1.ScopeMetrics.toObject(message.scopeMetrics[j], options2);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              };
              ResourceMetrics.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ResourceMetrics.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ResourceMetrics";
              };
              return ResourceMetrics;
            }();
            v1.ScopeMetrics = function() {
              function ScopeMetrics(properties) {
                this.metrics = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              ScopeMetrics.prototype.scope = null;
              ScopeMetrics.prototype.metrics = $util.emptyArray;
              ScopeMetrics.prototype.schemaUrl = null;
              ScopeMetrics.create = function create(properties) {
                return new ScopeMetrics(properties);
              };
              ScopeMetrics.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.scope != null && Object.hasOwnProperty.call(message, "scope"))
                  $root.opentelemetry.proto.common.v1.InstrumentationScope.encode(message.scope, writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).fork()).ldelim();
                if (message.metrics != null && message.metrics.length)
                  for (var i = 0; i < message.metrics.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.Metric.encode(message.metrics[i], writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork()).ldelim();
                if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.schemaUrl);
                return writer;
              };
              ScopeMetrics.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ScopeMetrics.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ScopeMetrics();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.decode(reader, reader.uint32());
                      break;
                    }
                    case 2: {
                      if (!(message.metrics && message.metrics.length))
                        message.metrics = [];
                      message.metrics.push($root.opentelemetry.proto.metrics.v1.Metric.decode(reader, reader.uint32()));
                      break;
                    }
                    case 3: {
                      message.schemaUrl = reader.string();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              ScopeMetrics.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ScopeMetrics.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.scope != null && message.hasOwnProperty("scope")) {
                  var error = $root.opentelemetry.proto.common.v1.InstrumentationScope.verify(message.scope);
                  if (error)
                    return "scope." + error;
                }
                if (message.metrics != null && message.hasOwnProperty("metrics")) {
                  if (!Array.isArray(message.metrics))
                    return "metrics: array expected";
                  for (var i = 0; i < message.metrics.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.Metric.verify(message.metrics[i]);
                    if (error)
                      return "metrics." + error;
                  }
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                  if (!$util.isString(message.schemaUrl))
                    return "schemaUrl: string expected";
                }
                return null;
              };
              ScopeMetrics.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.ScopeMetrics)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.ScopeMetrics();
                if (object.scope != null) {
                  if (typeof object.scope !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.scope: object expected");
                  message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(object.scope);
                }
                if (object.metrics) {
                  if (!Array.isArray(object.metrics))
                    throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.metrics: array expected");
                  message.metrics = [];
                  for (var i = 0; i < object.metrics.length; ++i) {
                    if (typeof object.metrics[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.metrics: object expected");
                    message.metrics[i] = $root.opentelemetry.proto.metrics.v1.Metric.fromObject(object.metrics[i]);
                  }
                }
                if (object.schemaUrl != null)
                  message.schemaUrl = String(object.schemaUrl);
                return message;
              };
              ScopeMetrics.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.metrics = [];
                if (options2.defaults) {
                  object.scope = null;
                  object.schemaUrl = "";
                }
                if (message.scope != null && message.hasOwnProperty("scope"))
                  object.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.toObject(message.scope, options2);
                if (message.metrics && message.metrics.length) {
                  object.metrics = [];
                  for (var j = 0; j < message.metrics.length; ++j)
                    object.metrics[j] = $root.opentelemetry.proto.metrics.v1.Metric.toObject(message.metrics[j], options2);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              };
              ScopeMetrics.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ScopeMetrics.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ScopeMetrics";
              };
              return ScopeMetrics;
            }();
            v1.Metric = function() {
              function Metric(properties) {
                this.metadata = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              Metric.prototype.name = null;
              Metric.prototype.description = null;
              Metric.prototype.unit = null;
              Metric.prototype.gauge = null;
              Metric.prototype.sum = null;
              Metric.prototype.histogram = null;
              Metric.prototype.exponentialHistogram = null;
              Metric.prototype.summary = null;
              Metric.prototype.metadata = $util.emptyArray;
              var $oneOfFields;
              Object.defineProperty(Metric.prototype, "data", {
                get: $util.oneOfGetter($oneOfFields = ["gauge", "sum", "histogram", "exponentialHistogram", "summary"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              Metric.create = function create(properties) {
                return new Metric(properties);
              };
              Metric.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                  writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).string(message.name);
                if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                  writer.uint32(
                    /* id 2, wireType 2 =*/
                    18
                  ).string(message.description);
                if (message.unit != null && Object.hasOwnProperty.call(message, "unit"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.unit);
                if (message.gauge != null && Object.hasOwnProperty.call(message, "gauge"))
                  $root.opentelemetry.proto.metrics.v1.Gauge.encode(message.gauge, writer.uint32(
                    /* id 5, wireType 2 =*/
                    42
                  ).fork()).ldelim();
                if (message.sum != null && Object.hasOwnProperty.call(message, "sum"))
                  $root.opentelemetry.proto.metrics.v1.Sum.encode(message.sum, writer.uint32(
                    /* id 7, wireType 2 =*/
                    58
                  ).fork()).ldelim();
                if (message.histogram != null && Object.hasOwnProperty.call(message, "histogram"))
                  $root.opentelemetry.proto.metrics.v1.Histogram.encode(message.histogram, writer.uint32(
                    /* id 9, wireType 2 =*/
                    74
                  ).fork()).ldelim();
                if (message.exponentialHistogram != null && Object.hasOwnProperty.call(message, "exponentialHistogram"))
                  $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.encode(message.exponentialHistogram, writer.uint32(
                    /* id 10, wireType 2 =*/
                    82
                  ).fork()).ldelim();
                if (message.summary != null && Object.hasOwnProperty.call(message, "summary"))
                  $root.opentelemetry.proto.metrics.v1.Summary.encode(message.summary, writer.uint32(
                    /* id 11, wireType 2 =*/
                    90
                  ).fork()).ldelim();
                if (message.metadata != null && message.metadata.length)
                  for (var i = 0; i < message.metadata.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.metadata[i], writer.uint32(
                      /* id 12, wireType 2 =*/
                      98
                    ).fork()).ldelim();
                return writer;
              };
              Metric.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Metric.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Metric();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      message.name = reader.string();
                      break;
                    }
                    case 2: {
                      message.description = reader.string();
                      break;
                    }
                    case 3: {
                      message.unit = reader.string();
                      break;
                    }
                    case 5: {
                      message.gauge = $root.opentelemetry.proto.metrics.v1.Gauge.decode(reader, reader.uint32());
                      break;
                    }
                    case 7: {
                      message.sum = $root.opentelemetry.proto.metrics.v1.Sum.decode(reader, reader.uint32());
                      break;
                    }
                    case 9: {
                      message.histogram = $root.opentelemetry.proto.metrics.v1.Histogram.decode(reader, reader.uint32());
                      break;
                    }
                    case 10: {
                      message.exponentialHistogram = $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.decode(reader, reader.uint32());
                      break;
                    }
                    case 11: {
                      message.summary = $root.opentelemetry.proto.metrics.v1.Summary.decode(reader, reader.uint32());
                      break;
                    }
                    case 12: {
                      if (!(message.metadata && message.metadata.length))
                        message.metadata = [];
                      message.metadata.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              Metric.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Metric.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                var properties = {};
                if (message.name != null && message.hasOwnProperty("name")) {
                  if (!$util.isString(message.name))
                    return "name: string expected";
                }
                if (message.description != null && message.hasOwnProperty("description")) {
                  if (!$util.isString(message.description))
                    return "description: string expected";
                }
                if (message.unit != null && message.hasOwnProperty("unit")) {
                  if (!$util.isString(message.unit))
                    return "unit: string expected";
                }
                if (message.gauge != null && message.hasOwnProperty("gauge")) {
                  properties.data = 1;
                  {
                    var error = $root.opentelemetry.proto.metrics.v1.Gauge.verify(message.gauge);
                    if (error)
                      return "gauge." + error;
                  }
                }
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  if (properties.data === 1)
                    return "data: multiple values";
                  properties.data = 1;
                  {
                    var error = $root.opentelemetry.proto.metrics.v1.Sum.verify(message.sum);
                    if (error)
                      return "sum." + error;
                  }
                }
                if (message.histogram != null && message.hasOwnProperty("histogram")) {
                  if (properties.data === 1)
                    return "data: multiple values";
                  properties.data = 1;
                  {
                    var error = $root.opentelemetry.proto.metrics.v1.Histogram.verify(message.histogram);
                    if (error)
                      return "histogram." + error;
                  }
                }
                if (message.exponentialHistogram != null && message.hasOwnProperty("exponentialHistogram")) {
                  if (properties.data === 1)
                    return "data: multiple values";
                  properties.data = 1;
                  {
                    var error = $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.verify(message.exponentialHistogram);
                    if (error)
                      return "exponentialHistogram." + error;
                  }
                }
                if (message.summary != null && message.hasOwnProperty("summary")) {
                  if (properties.data === 1)
                    return "data: multiple values";
                  properties.data = 1;
                  {
                    var error = $root.opentelemetry.proto.metrics.v1.Summary.verify(message.summary);
                    if (error)
                      return "summary." + error;
                  }
                }
                if (message.metadata != null && message.hasOwnProperty("metadata")) {
                  if (!Array.isArray(message.metadata))
                    return "metadata: array expected";
                  for (var i = 0; i < message.metadata.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.metadata[i]);
                    if (error)
                      return "metadata." + error;
                  }
                }
                return null;
              };
              Metric.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.Metric)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.Metric();
                if (object.name != null)
                  message.name = String(object.name);
                if (object.description != null)
                  message.description = String(object.description);
                if (object.unit != null)
                  message.unit = String(object.unit);
                if (object.gauge != null) {
                  if (typeof object.gauge !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.Metric.gauge: object expected");
                  message.gauge = $root.opentelemetry.proto.metrics.v1.Gauge.fromObject(object.gauge);
                }
                if (object.sum != null) {
                  if (typeof object.sum !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.Metric.sum: object expected");
                  message.sum = $root.opentelemetry.proto.metrics.v1.Sum.fromObject(object.sum);
                }
                if (object.histogram != null) {
                  if (typeof object.histogram !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.Metric.histogram: object expected");
                  message.histogram = $root.opentelemetry.proto.metrics.v1.Histogram.fromObject(object.histogram);
                }
                if (object.exponentialHistogram != null) {
                  if (typeof object.exponentialHistogram !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.Metric.exponentialHistogram: object expected");
                  message.exponentialHistogram = $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.fromObject(object.exponentialHistogram);
                }
                if (object.summary != null) {
                  if (typeof object.summary !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.Metric.summary: object expected");
                  message.summary = $root.opentelemetry.proto.metrics.v1.Summary.fromObject(object.summary);
                }
                if (object.metadata) {
                  if (!Array.isArray(object.metadata))
                    throw TypeError(".opentelemetry.proto.metrics.v1.Metric.metadata: array expected");
                  message.metadata = [];
                  for (var i = 0; i < object.metadata.length; ++i) {
                    if (typeof object.metadata[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Metric.metadata: object expected");
                    message.metadata[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.metadata[i]);
                  }
                }
                return message;
              };
              Metric.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.metadata = [];
                if (options2.defaults) {
                  object.name = "";
                  object.description = "";
                  object.unit = "";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                  object.name = message.name;
                if (message.description != null && message.hasOwnProperty("description"))
                  object.description = message.description;
                if (message.unit != null && message.hasOwnProperty("unit"))
                  object.unit = message.unit;
                if (message.gauge != null && message.hasOwnProperty("gauge")) {
                  object.gauge = $root.opentelemetry.proto.metrics.v1.Gauge.toObject(message.gauge, options2);
                  if (options2.oneofs)
                    object.data = "gauge";
                }
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  object.sum = $root.opentelemetry.proto.metrics.v1.Sum.toObject(message.sum, options2);
                  if (options2.oneofs)
                    object.data = "sum";
                }
                if (message.histogram != null && message.hasOwnProperty("histogram")) {
                  object.histogram = $root.opentelemetry.proto.metrics.v1.Histogram.toObject(message.histogram, options2);
                  if (options2.oneofs)
                    object.data = "histogram";
                }
                if (message.exponentialHistogram != null && message.hasOwnProperty("exponentialHistogram")) {
                  object.exponentialHistogram = $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.toObject(message.exponentialHistogram, options2);
                  if (options2.oneofs)
                    object.data = "exponentialHistogram";
                }
                if (message.summary != null && message.hasOwnProperty("summary")) {
                  object.summary = $root.opentelemetry.proto.metrics.v1.Summary.toObject(message.summary, options2);
                  if (options2.oneofs)
                    object.data = "summary";
                }
                if (message.metadata && message.metadata.length) {
                  object.metadata = [];
                  for (var j = 0; j < message.metadata.length; ++j)
                    object.metadata[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.metadata[j], options2);
                }
                return object;
              };
              Metric.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Metric.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Metric";
              };
              return Metric;
            }();
            v1.Gauge = function() {
              function Gauge(properties) {
                this.dataPoints = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              Gauge.prototype.dataPoints = $util.emptyArray;
              Gauge.create = function create(properties) {
                return new Gauge(properties);
              };
              Gauge.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.dataPoints != null && message.dataPoints.length)
                  for (var i = 0; i < message.dataPoints.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.NumberDataPoint.encode(message.dataPoints[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              Gauge.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Gauge.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Gauge();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.dataPoints && message.dataPoints.length))
                        message.dataPoints = [];
                      message.dataPoints.push($root.opentelemetry.proto.metrics.v1.NumberDataPoint.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              Gauge.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Gauge.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                  if (!Array.isArray(message.dataPoints))
                    return "dataPoints: array expected";
                  for (var i = 0; i < message.dataPoints.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.verify(message.dataPoints[i]);
                    if (error)
                      return "dataPoints." + error;
                  }
                }
                return null;
              };
              Gauge.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.Gauge)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.Gauge();
                if (object.dataPoints) {
                  if (!Array.isArray(object.dataPoints))
                    throw TypeError(".opentelemetry.proto.metrics.v1.Gauge.dataPoints: array expected");
                  message.dataPoints = [];
                  for (var i = 0; i < object.dataPoints.length; ++i) {
                    if (typeof object.dataPoints[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Gauge.dataPoints: object expected");
                    message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.fromObject(object.dataPoints[i]);
                  }
                }
                return message;
              };
              Gauge.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.dataPoints = [];
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.toObject(message.dataPoints[j], options2);
                }
                return object;
              };
              Gauge.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Gauge.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Gauge";
              };
              return Gauge;
            }();
            v1.Sum = function() {
              function Sum(properties) {
                this.dataPoints = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              Sum.prototype.dataPoints = $util.emptyArray;
              Sum.prototype.aggregationTemporality = null;
              Sum.prototype.isMonotonic = null;
              Sum.create = function create(properties) {
                return new Sum(properties);
              };
              Sum.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.dataPoints != null && message.dataPoints.length)
                  for (var i = 0; i < message.dataPoints.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.NumberDataPoint.encode(message.dataPoints[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                if (message.aggregationTemporality != null && Object.hasOwnProperty.call(message, "aggregationTemporality"))
                  writer.uint32(
                    /* id 2, wireType 0 =*/
                    16
                  ).int32(message.aggregationTemporality);
                if (message.isMonotonic != null && Object.hasOwnProperty.call(message, "isMonotonic"))
                  writer.uint32(
                    /* id 3, wireType 0 =*/
                    24
                  ).bool(message.isMonotonic);
                return writer;
              };
              Sum.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Sum.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Sum();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.dataPoints && message.dataPoints.length))
                        message.dataPoints = [];
                      message.dataPoints.push($root.opentelemetry.proto.metrics.v1.NumberDataPoint.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.aggregationTemporality = reader.int32();
                      break;
                    }
                    case 3: {
                      message.isMonotonic = reader.bool();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              Sum.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Sum.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                  if (!Array.isArray(message.dataPoints))
                    return "dataPoints: array expected";
                  for (var i = 0; i < message.dataPoints.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.verify(message.dataPoints[i]);
                    if (error)
                      return "dataPoints." + error;
                  }
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  switch (message.aggregationTemporality) {
                    default:
                      return "aggregationTemporality: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                      break;
                  }
                if (message.isMonotonic != null && message.hasOwnProperty("isMonotonic")) {
                  if (typeof message.isMonotonic !== "boolean")
                    return "isMonotonic: boolean expected";
                }
                return null;
              };
              Sum.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.Sum)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.Sum();
                if (object.dataPoints) {
                  if (!Array.isArray(object.dataPoints))
                    throw TypeError(".opentelemetry.proto.metrics.v1.Sum.dataPoints: array expected");
                  message.dataPoints = [];
                  for (var i = 0; i < object.dataPoints.length; ++i) {
                    if (typeof object.dataPoints[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Sum.dataPoints: object expected");
                    message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.fromObject(object.dataPoints[i]);
                  }
                }
                switch (object.aggregationTemporality) {
                  default:
                    if (typeof object.aggregationTemporality === "number") {
                      message.aggregationTemporality = object.aggregationTemporality;
                      break;
                    }
                    break;
                  case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                  case 0:
                    message.aggregationTemporality = 0;
                    break;
                  case "AGGREGATION_TEMPORALITY_DELTA":
                  case 1:
                    message.aggregationTemporality = 1;
                    break;
                  case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                  case 2:
                    message.aggregationTemporality = 2;
                    break;
                }
                if (object.isMonotonic != null)
                  message.isMonotonic = Boolean(object.isMonotonic);
                return message;
              };
              Sum.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.dataPoints = [];
                if (options2.defaults) {
                  object.aggregationTemporality = options2.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                  object.isMonotonic = false;
                }
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.toObject(message.dataPoints[j], options2);
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  object.aggregationTemporality = options2.enums === String ? $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] === void 0 ? message.aggregationTemporality : $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] : message.aggregationTemporality;
                if (message.isMonotonic != null && message.hasOwnProperty("isMonotonic"))
                  object.isMonotonic = message.isMonotonic;
                return object;
              };
              Sum.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Sum.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Sum";
              };
              return Sum;
            }();
            v1.Histogram = function() {
              function Histogram(properties) {
                this.dataPoints = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              Histogram.prototype.dataPoints = $util.emptyArray;
              Histogram.prototype.aggregationTemporality = null;
              Histogram.create = function create(properties) {
                return new Histogram(properties);
              };
              Histogram.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.dataPoints != null && message.dataPoints.length)
                  for (var i = 0; i < message.dataPoints.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.HistogramDataPoint.encode(message.dataPoints[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                if (message.aggregationTemporality != null && Object.hasOwnProperty.call(message, "aggregationTemporality"))
                  writer.uint32(
                    /* id 2, wireType 0 =*/
                    16
                  ).int32(message.aggregationTemporality);
                return writer;
              };
              Histogram.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Histogram.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Histogram();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.dataPoints && message.dataPoints.length))
                        message.dataPoints = [];
                      message.dataPoints.push($root.opentelemetry.proto.metrics.v1.HistogramDataPoint.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.aggregationTemporality = reader.int32();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              Histogram.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Histogram.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                  if (!Array.isArray(message.dataPoints))
                    return "dataPoints: array expected";
                  for (var i = 0; i < message.dataPoints.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.HistogramDataPoint.verify(message.dataPoints[i]);
                    if (error)
                      return "dataPoints." + error;
                  }
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  switch (message.aggregationTemporality) {
                    default:
                      return "aggregationTemporality: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                      break;
                  }
                return null;
              };
              Histogram.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.Histogram)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.Histogram();
                if (object.dataPoints) {
                  if (!Array.isArray(object.dataPoints))
                    throw TypeError(".opentelemetry.proto.metrics.v1.Histogram.dataPoints: array expected");
                  message.dataPoints = [];
                  for (var i = 0; i < object.dataPoints.length; ++i) {
                    if (typeof object.dataPoints[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Histogram.dataPoints: object expected");
                    message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.HistogramDataPoint.fromObject(object.dataPoints[i]);
                  }
                }
                switch (object.aggregationTemporality) {
                  default:
                    if (typeof object.aggregationTemporality === "number") {
                      message.aggregationTemporality = object.aggregationTemporality;
                      break;
                    }
                    break;
                  case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                  case 0:
                    message.aggregationTemporality = 0;
                    break;
                  case "AGGREGATION_TEMPORALITY_DELTA":
                  case 1:
                    message.aggregationTemporality = 1;
                    break;
                  case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                  case 2:
                    message.aggregationTemporality = 2;
                    break;
                }
                return message;
              };
              Histogram.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.dataPoints = [];
                if (options2.defaults)
                  object.aggregationTemporality = options2.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.HistogramDataPoint.toObject(message.dataPoints[j], options2);
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  object.aggregationTemporality = options2.enums === String ? $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] === void 0 ? message.aggregationTemporality : $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] : message.aggregationTemporality;
                return object;
              };
              Histogram.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Histogram.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Histogram";
              };
              return Histogram;
            }();
            v1.ExponentialHistogram = function() {
              function ExponentialHistogram(properties) {
                this.dataPoints = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              ExponentialHistogram.prototype.dataPoints = $util.emptyArray;
              ExponentialHistogram.prototype.aggregationTemporality = null;
              ExponentialHistogram.create = function create(properties) {
                return new ExponentialHistogram(properties);
              };
              ExponentialHistogram.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.dataPoints != null && message.dataPoints.length)
                  for (var i = 0; i < message.dataPoints.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.encode(message.dataPoints[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                if (message.aggregationTemporality != null && Object.hasOwnProperty.call(message, "aggregationTemporality"))
                  writer.uint32(
                    /* id 2, wireType 0 =*/
                    16
                  ).int32(message.aggregationTemporality);
                return writer;
              };
              ExponentialHistogram.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ExponentialHistogram.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogram();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.dataPoints && message.dataPoints.length))
                        message.dataPoints = [];
                      message.dataPoints.push($root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.aggregationTemporality = reader.int32();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              ExponentialHistogram.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ExponentialHistogram.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                  if (!Array.isArray(message.dataPoints))
                    return "dataPoints: array expected";
                  for (var i = 0; i < message.dataPoints.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.verify(message.dataPoints[i]);
                    if (error)
                      return "dataPoints." + error;
                  }
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  switch (message.aggregationTemporality) {
                    default:
                      return "aggregationTemporality: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                      break;
                  }
                return null;
              };
              ExponentialHistogram.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.ExponentialHistogram)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogram();
                if (object.dataPoints) {
                  if (!Array.isArray(object.dataPoints))
                    throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogram.dataPoints: array expected");
                  message.dataPoints = [];
                  for (var i = 0; i < object.dataPoints.length; ++i) {
                    if (typeof object.dataPoints[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogram.dataPoints: object expected");
                    message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.fromObject(object.dataPoints[i]);
                  }
                }
                switch (object.aggregationTemporality) {
                  default:
                    if (typeof object.aggregationTemporality === "number") {
                      message.aggregationTemporality = object.aggregationTemporality;
                      break;
                    }
                    break;
                  case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                  case 0:
                    message.aggregationTemporality = 0;
                    break;
                  case "AGGREGATION_TEMPORALITY_DELTA":
                  case 1:
                    message.aggregationTemporality = 1;
                    break;
                  case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                  case 2:
                    message.aggregationTemporality = 2;
                    break;
                }
                return message;
              };
              ExponentialHistogram.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.dataPoints = [];
                if (options2.defaults)
                  object.aggregationTemporality = options2.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.toObject(message.dataPoints[j], options2);
                }
                if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                  object.aggregationTemporality = options2.enums === String ? $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] === void 0 ? message.aggregationTemporality : $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] : message.aggregationTemporality;
                return object;
              };
              ExponentialHistogram.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ExponentialHistogram.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ExponentialHistogram";
              };
              return ExponentialHistogram;
            }();
            v1.Summary = function() {
              function Summary(properties) {
                this.dataPoints = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              Summary.prototype.dataPoints = $util.emptyArray;
              Summary.create = function create(properties) {
                return new Summary(properties);
              };
              Summary.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.dataPoints != null && message.dataPoints.length)
                  for (var i = 0; i < message.dataPoints.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.encode(message.dataPoints[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              Summary.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Summary.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Summary();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.dataPoints && message.dataPoints.length))
                        message.dataPoints = [];
                      message.dataPoints.push($root.opentelemetry.proto.metrics.v1.SummaryDataPoint.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              Summary.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Summary.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                  if (!Array.isArray(message.dataPoints))
                    return "dataPoints: array expected";
                  for (var i = 0; i < message.dataPoints.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.verify(message.dataPoints[i]);
                    if (error)
                      return "dataPoints." + error;
                  }
                }
                return null;
              };
              Summary.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.Summary)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.Summary();
                if (object.dataPoints) {
                  if (!Array.isArray(object.dataPoints))
                    throw TypeError(".opentelemetry.proto.metrics.v1.Summary.dataPoints: array expected");
                  message.dataPoints = [];
                  for (var i = 0; i < object.dataPoints.length; ++i) {
                    if (typeof object.dataPoints[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Summary.dataPoints: object expected");
                    message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.fromObject(object.dataPoints[i]);
                  }
                }
                return message;
              };
              Summary.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.dataPoints = [];
                if (message.dataPoints && message.dataPoints.length) {
                  object.dataPoints = [];
                  for (var j = 0; j < message.dataPoints.length; ++j)
                    object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.toObject(message.dataPoints[j], options2);
                }
                return object;
              };
              Summary.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Summary.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Summary";
              };
              return Summary;
            }();
            v1.AggregationTemporality = function() {
              var valuesById = {}, values = Object.create(valuesById);
              values[valuesById[0] = "AGGREGATION_TEMPORALITY_UNSPECIFIED"] = 0;
              values[valuesById[1] = "AGGREGATION_TEMPORALITY_DELTA"] = 1;
              values[valuesById[2] = "AGGREGATION_TEMPORALITY_CUMULATIVE"] = 2;
              return values;
            }();
            v1.DataPointFlags = function() {
              var valuesById = {}, values = Object.create(valuesById);
              values[valuesById[0] = "DATA_POINT_FLAGS_DO_NOT_USE"] = 0;
              values[valuesById[1] = "DATA_POINT_FLAGS_NO_RECORDED_VALUE_MASK"] = 1;
              return values;
            }();
            v1.NumberDataPoint = function() {
              function NumberDataPoint(properties) {
                this.attributes = [];
                this.exemplars = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              NumberDataPoint.prototype.attributes = $util.emptyArray;
              NumberDataPoint.prototype.startTimeUnixNano = null;
              NumberDataPoint.prototype.timeUnixNano = null;
              NumberDataPoint.prototype.asDouble = null;
              NumberDataPoint.prototype.asInt = null;
              NumberDataPoint.prototype.exemplars = $util.emptyArray;
              NumberDataPoint.prototype.flags = null;
              var $oneOfFields;
              Object.defineProperty(NumberDataPoint.prototype, "value", {
                get: $util.oneOfGetter($oneOfFields = ["asDouble", "asInt"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              NumberDataPoint.create = function create(properties) {
                return new NumberDataPoint(properties);
              };
              NumberDataPoint.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                  writer.uint32(
                    /* id 2, wireType 1 =*/
                    17
                  ).fixed64(message.startTimeUnixNano);
                if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                  writer.uint32(
                    /* id 3, wireType 1 =*/
                    25
                  ).fixed64(message.timeUnixNano);
                if (message.asDouble != null && Object.hasOwnProperty.call(message, "asDouble"))
                  writer.uint32(
                    /* id 4, wireType 1 =*/
                    33
                  ).double(message.asDouble);
                if (message.exemplars != null && message.exemplars.length)
                  for (var i = 0; i < message.exemplars.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.Exemplar.encode(message.exemplars[i], writer.uint32(
                      /* id 5, wireType 2 =*/
                      42
                    ).fork()).ldelim();
                if (message.asInt != null && Object.hasOwnProperty.call(message, "asInt"))
                  writer.uint32(
                    /* id 6, wireType 1 =*/
                    49
                  ).sfixed64(message.asInt);
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 7, wireType 2 =*/
                      58
                    ).fork()).ldelim();
                if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                  writer.uint32(
                    /* id 8, wireType 0 =*/
                    64
                  ).uint32(message.flags);
                return writer;
              };
              NumberDataPoint.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              NumberDataPoint.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.NumberDataPoint();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 7: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.startTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 3: {
                      message.timeUnixNano = reader.fixed64();
                      break;
                    }
                    case 4: {
                      message.asDouble = reader.double();
                      break;
                    }
                    case 6: {
                      message.asInt = reader.sfixed64();
                      break;
                    }
                    case 5: {
                      if (!(message.exemplars && message.exemplars.length))
                        message.exemplars = [];
                      message.exemplars.push($root.opentelemetry.proto.metrics.v1.Exemplar.decode(reader, reader.uint32()));
                      break;
                    }
                    case 8: {
                      message.flags = reader.uint32();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              NumberDataPoint.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              NumberDataPoint.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                var properties = {};
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                  if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                    return "startTimeUnixNano: integer|Long expected";
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                  if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                    return "timeUnixNano: integer|Long expected";
                }
                if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                  properties.value = 1;
                  if (typeof message.asDouble !== "number")
                    return "asDouble: number expected";
                }
                if (message.asInt != null && message.hasOwnProperty("asInt")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  if (!$util.isInteger(message.asInt) && !(message.asInt && $util.isInteger(message.asInt.low) && $util.isInteger(message.asInt.high)))
                    return "asInt: integer|Long expected";
                }
                if (message.exemplars != null && message.hasOwnProperty("exemplars")) {
                  if (!Array.isArray(message.exemplars))
                    return "exemplars: array expected";
                  for (var i = 0; i < message.exemplars.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.Exemplar.verify(message.exemplars[i]);
                    if (error)
                      return "exemplars." + error;
                  }
                }
                if (message.flags != null && message.hasOwnProperty("flags")) {
                  if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
                }
                return null;
              };
              NumberDataPoint.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.NumberDataPoint)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.NumberDataPoint();
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.startTimeUnixNano != null) {
                  if ($util.Long)
                    (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                  else if (typeof object.startTimeUnixNano === "string")
                    message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                  else if (typeof object.startTimeUnixNano === "number")
                    message.startTimeUnixNano = object.startTimeUnixNano;
                  else if (typeof object.startTimeUnixNano === "object")
                    message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                }
                if (object.timeUnixNano != null) {
                  if ($util.Long)
                    (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                  else if (typeof object.timeUnixNano === "string")
                    message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                  else if (typeof object.timeUnixNano === "number")
                    message.timeUnixNano = object.timeUnixNano;
                  else if (typeof object.timeUnixNano === "object")
                    message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                }
                if (object.asDouble != null)
                  message.asDouble = Number(object.asDouble);
                if (object.asInt != null) {
                  if ($util.Long)
                    (message.asInt = $util.Long.fromValue(object.asInt)).unsigned = false;
                  else if (typeof object.asInt === "string")
                    message.asInt = parseInt(object.asInt, 10);
                  else if (typeof object.asInt === "number")
                    message.asInt = object.asInt;
                  else if (typeof object.asInt === "object")
                    message.asInt = new $util.LongBits(object.asInt.low >>> 0, object.asInt.high >>> 0).toNumber();
                }
                if (object.exemplars) {
                  if (!Array.isArray(object.exemplars))
                    throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.exemplars: array expected");
                  message.exemplars = [];
                  for (var i = 0; i < object.exemplars.length; ++i) {
                    if (typeof object.exemplars[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.exemplars: object expected");
                    message.exemplars[i] = $root.opentelemetry.proto.metrics.v1.Exemplar.fromObject(object.exemplars[i]);
                  }
                }
                if (object.flags != null)
                  message.flags = object.flags >>> 0;
                return message;
              };
              NumberDataPoint.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults) {
                  object.exemplars = [];
                  object.attributes = [];
                }
                if (options2.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options2.longs === String ? "0" : 0;
                  object.flags = 0;
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options2.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                  object.asDouble = options2.json && !isFinite(message.asDouble) ? String(message.asDouble) : message.asDouble;
                  if (options2.oneofs)
                    object.value = "asDouble";
                }
                if (message.exemplars && message.exemplars.length) {
                  object.exemplars = [];
                  for (var j = 0; j < message.exemplars.length; ++j)
                    object.exemplars[j] = $root.opentelemetry.proto.metrics.v1.Exemplar.toObject(message.exemplars[j], options2);
                }
                if (message.asInt != null && message.hasOwnProperty("asInt")) {
                  if (typeof message.asInt === "number")
                    object.asInt = options2.longs === String ? String(message.asInt) : message.asInt;
                  else
                    object.asInt = options2.longs === String ? $util.Long.prototype.toString.call(message.asInt) : options2.longs === Number ? new $util.LongBits(message.asInt.low >>> 0, message.asInt.high >>> 0).toNumber() : message.asInt;
                  if (options2.oneofs)
                    object.value = "asInt";
                }
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                return object;
              };
              NumberDataPoint.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              NumberDataPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.NumberDataPoint";
              };
              return NumberDataPoint;
            }();
            v1.HistogramDataPoint = function() {
              function HistogramDataPoint(properties) {
                this.attributes = [];
                this.bucketCounts = [];
                this.explicitBounds = [];
                this.exemplars = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              HistogramDataPoint.prototype.attributes = $util.emptyArray;
              HistogramDataPoint.prototype.startTimeUnixNano = null;
              HistogramDataPoint.prototype.timeUnixNano = null;
              HistogramDataPoint.prototype.count = null;
              HistogramDataPoint.prototype.sum = null;
              HistogramDataPoint.prototype.bucketCounts = $util.emptyArray;
              HistogramDataPoint.prototype.explicitBounds = $util.emptyArray;
              HistogramDataPoint.prototype.exemplars = $util.emptyArray;
              HistogramDataPoint.prototype.flags = null;
              HistogramDataPoint.prototype.min = null;
              HistogramDataPoint.prototype.max = null;
              var $oneOfFields;
              Object.defineProperty(HistogramDataPoint.prototype, "_sum", {
                get: $util.oneOfGetter($oneOfFields = ["sum"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              Object.defineProperty(HistogramDataPoint.prototype, "_min", {
                get: $util.oneOfGetter($oneOfFields = ["min"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              Object.defineProperty(HistogramDataPoint.prototype, "_max", {
                get: $util.oneOfGetter($oneOfFields = ["max"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              HistogramDataPoint.create = function create(properties) {
                return new HistogramDataPoint(properties);
              };
              HistogramDataPoint.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                  writer.uint32(
                    /* id 2, wireType 1 =*/
                    17
                  ).fixed64(message.startTimeUnixNano);
                if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                  writer.uint32(
                    /* id 3, wireType 1 =*/
                    25
                  ).fixed64(message.timeUnixNano);
                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                  writer.uint32(
                    /* id 4, wireType 1 =*/
                    33
                  ).fixed64(message.count);
                if (message.sum != null && Object.hasOwnProperty.call(message, "sum"))
                  writer.uint32(
                    /* id 5, wireType 1 =*/
                    41
                  ).double(message.sum);
                if (message.bucketCounts != null && message.bucketCounts.length) {
                  writer.uint32(
                    /* id 6, wireType 2 =*/
                    50
                  ).fork();
                  for (var i = 0; i < message.bucketCounts.length; ++i)
                    writer.fixed64(message.bucketCounts[i]);
                  writer.ldelim();
                }
                if (message.explicitBounds != null && message.explicitBounds.length) {
                  writer.uint32(
                    /* id 7, wireType 2 =*/
                    58
                  ).fork();
                  for (var i = 0; i < message.explicitBounds.length; ++i)
                    writer.double(message.explicitBounds[i]);
                  writer.ldelim();
                }
                if (message.exemplars != null && message.exemplars.length)
                  for (var i = 0; i < message.exemplars.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.Exemplar.encode(message.exemplars[i], writer.uint32(
                      /* id 8, wireType 2 =*/
                      66
                    ).fork()).ldelim();
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 9, wireType 2 =*/
                      74
                    ).fork()).ldelim();
                if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                  writer.uint32(
                    /* id 10, wireType 0 =*/
                    80
                  ).uint32(message.flags);
                if (message.min != null && Object.hasOwnProperty.call(message, "min"))
                  writer.uint32(
                    /* id 11, wireType 1 =*/
                    89
                  ).double(message.min);
                if (message.max != null && Object.hasOwnProperty.call(message, "max"))
                  writer.uint32(
                    /* id 12, wireType 1 =*/
                    97
                  ).double(message.max);
                return writer;
              };
              HistogramDataPoint.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              HistogramDataPoint.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.HistogramDataPoint();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 9: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.startTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 3: {
                      message.timeUnixNano = reader.fixed64();
                      break;
                    }
                    case 4: {
                      message.count = reader.fixed64();
                      break;
                    }
                    case 5: {
                      message.sum = reader.double();
                      break;
                    }
                    case 6: {
                      if (!(message.bucketCounts && message.bucketCounts.length))
                        message.bucketCounts = [];
                      if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                          message.bucketCounts.push(reader.fixed64());
                      } else
                        message.bucketCounts.push(reader.fixed64());
                      break;
                    }
                    case 7: {
                      if (!(message.explicitBounds && message.explicitBounds.length))
                        message.explicitBounds = [];
                      if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                          message.explicitBounds.push(reader.double());
                      } else
                        message.explicitBounds.push(reader.double());
                      break;
                    }
                    case 8: {
                      if (!(message.exemplars && message.exemplars.length))
                        message.exemplars = [];
                      message.exemplars.push($root.opentelemetry.proto.metrics.v1.Exemplar.decode(reader, reader.uint32()));
                      break;
                    }
                    case 10: {
                      message.flags = reader.uint32();
                      break;
                    }
                    case 11: {
                      message.min = reader.double();
                      break;
                    }
                    case 12: {
                      message.max = reader.double();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              HistogramDataPoint.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              HistogramDataPoint.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                var properties = {};
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                  if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                    return "startTimeUnixNano: integer|Long expected";
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                  if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                    return "timeUnixNano: integer|Long expected";
                }
                if (message.count != null && message.hasOwnProperty("count")) {
                  if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                    return "count: integer|Long expected";
                }
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  properties._sum = 1;
                  if (typeof message.sum !== "number")
                    return "sum: number expected";
                }
                if (message.bucketCounts != null && message.hasOwnProperty("bucketCounts")) {
                  if (!Array.isArray(message.bucketCounts))
                    return "bucketCounts: array expected";
                  for (var i = 0; i < message.bucketCounts.length; ++i)
                    if (!$util.isInteger(message.bucketCounts[i]) && !(message.bucketCounts[i] && $util.isInteger(message.bucketCounts[i].low) && $util.isInteger(message.bucketCounts[i].high)))
                      return "bucketCounts: integer|Long[] expected";
                }
                if (message.explicitBounds != null && message.hasOwnProperty("explicitBounds")) {
                  if (!Array.isArray(message.explicitBounds))
                    return "explicitBounds: array expected";
                  for (var i = 0; i < message.explicitBounds.length; ++i)
                    if (typeof message.explicitBounds[i] !== "number")
                      return "explicitBounds: number[] expected";
                }
                if (message.exemplars != null && message.hasOwnProperty("exemplars")) {
                  if (!Array.isArray(message.exemplars))
                    return "exemplars: array expected";
                  for (var i = 0; i < message.exemplars.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.Exemplar.verify(message.exemplars[i]);
                    if (error)
                      return "exemplars." + error;
                  }
                }
                if (message.flags != null && message.hasOwnProperty("flags")) {
                  if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
                }
                if (message.min != null && message.hasOwnProperty("min")) {
                  properties._min = 1;
                  if (typeof message.min !== "number")
                    return "min: number expected";
                }
                if (message.max != null && message.hasOwnProperty("max")) {
                  properties._max = 1;
                  if (typeof message.max !== "number")
                    return "max: number expected";
                }
                return null;
              };
              HistogramDataPoint.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.HistogramDataPoint)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.HistogramDataPoint();
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.startTimeUnixNano != null) {
                  if ($util.Long)
                    (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                  else if (typeof object.startTimeUnixNano === "string")
                    message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                  else if (typeof object.startTimeUnixNano === "number")
                    message.startTimeUnixNano = object.startTimeUnixNano;
                  else if (typeof object.startTimeUnixNano === "object")
                    message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                }
                if (object.timeUnixNano != null) {
                  if ($util.Long)
                    (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                  else if (typeof object.timeUnixNano === "string")
                    message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                  else if (typeof object.timeUnixNano === "number")
                    message.timeUnixNano = object.timeUnixNano;
                  else if (typeof object.timeUnixNano === "object")
                    message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                }
                if (object.count != null) {
                  if ($util.Long)
                    (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                  else if (typeof object.count === "string")
                    message.count = parseInt(object.count, 10);
                  else if (typeof object.count === "number")
                    message.count = object.count;
                  else if (typeof object.count === "object")
                    message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
                }
                if (object.sum != null)
                  message.sum = Number(object.sum);
                if (object.bucketCounts) {
                  if (!Array.isArray(object.bucketCounts))
                    throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.bucketCounts: array expected");
                  message.bucketCounts = [];
                  for (var i = 0; i < object.bucketCounts.length; ++i)
                    if ($util.Long)
                      (message.bucketCounts[i] = $util.Long.fromValue(object.bucketCounts[i])).unsigned = false;
                    else if (typeof object.bucketCounts[i] === "string")
                      message.bucketCounts[i] = parseInt(object.bucketCounts[i], 10);
                    else if (typeof object.bucketCounts[i] === "number")
                      message.bucketCounts[i] = object.bucketCounts[i];
                    else if (typeof object.bucketCounts[i] === "object")
                      message.bucketCounts[i] = new $util.LongBits(object.bucketCounts[i].low >>> 0, object.bucketCounts[i].high >>> 0).toNumber();
                }
                if (object.explicitBounds) {
                  if (!Array.isArray(object.explicitBounds))
                    throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.explicitBounds: array expected");
                  message.explicitBounds = [];
                  for (var i = 0; i < object.explicitBounds.length; ++i)
                    message.explicitBounds[i] = Number(object.explicitBounds[i]);
                }
                if (object.exemplars) {
                  if (!Array.isArray(object.exemplars))
                    throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.exemplars: array expected");
                  message.exemplars = [];
                  for (var i = 0; i < object.exemplars.length; ++i) {
                    if (typeof object.exemplars[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.exemplars: object expected");
                    message.exemplars[i] = $root.opentelemetry.proto.metrics.v1.Exemplar.fromObject(object.exemplars[i]);
                  }
                }
                if (object.flags != null)
                  message.flags = object.flags >>> 0;
                if (object.min != null)
                  message.min = Number(object.min);
                if (object.max != null)
                  message.max = Number(object.max);
                return message;
              };
              HistogramDataPoint.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults) {
                  object.bucketCounts = [];
                  object.explicitBounds = [];
                  object.exemplars = [];
                  object.attributes = [];
                }
                if (options2.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.count = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.count = options2.longs === String ? "0" : 0;
                  object.flags = 0;
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options2.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.count != null && message.hasOwnProperty("count"))
                  if (typeof message.count === "number")
                    object.count = options2.longs === String ? String(message.count) : message.count;
                  else
                    object.count = options2.longs === String ? $util.Long.prototype.toString.call(message.count) : options2.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  object.sum = options2.json && !isFinite(message.sum) ? String(message.sum) : message.sum;
                  if (options2.oneofs)
                    object._sum = "sum";
                }
                if (message.bucketCounts && message.bucketCounts.length) {
                  object.bucketCounts = [];
                  for (var j = 0; j < message.bucketCounts.length; ++j)
                    if (typeof message.bucketCounts[j] === "number")
                      object.bucketCounts[j] = options2.longs === String ? String(message.bucketCounts[j]) : message.bucketCounts[j];
                    else
                      object.bucketCounts[j] = options2.longs === String ? $util.Long.prototype.toString.call(message.bucketCounts[j]) : options2.longs === Number ? new $util.LongBits(message.bucketCounts[j].low >>> 0, message.bucketCounts[j].high >>> 0).toNumber() : message.bucketCounts[j];
                }
                if (message.explicitBounds && message.explicitBounds.length) {
                  object.explicitBounds = [];
                  for (var j = 0; j < message.explicitBounds.length; ++j)
                    object.explicitBounds[j] = options2.json && !isFinite(message.explicitBounds[j]) ? String(message.explicitBounds[j]) : message.explicitBounds[j];
                }
                if (message.exemplars && message.exemplars.length) {
                  object.exemplars = [];
                  for (var j = 0; j < message.exemplars.length; ++j)
                    object.exemplars[j] = $root.opentelemetry.proto.metrics.v1.Exemplar.toObject(message.exemplars[j], options2);
                }
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                if (message.min != null && message.hasOwnProperty("min")) {
                  object.min = options2.json && !isFinite(message.min) ? String(message.min) : message.min;
                  if (options2.oneofs)
                    object._min = "min";
                }
                if (message.max != null && message.hasOwnProperty("max")) {
                  object.max = options2.json && !isFinite(message.max) ? String(message.max) : message.max;
                  if (options2.oneofs)
                    object._max = "max";
                }
                return object;
              };
              HistogramDataPoint.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              HistogramDataPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.HistogramDataPoint";
              };
              return HistogramDataPoint;
            }();
            v1.ExponentialHistogramDataPoint = function() {
              function ExponentialHistogramDataPoint(properties) {
                this.attributes = [];
                this.exemplars = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              ExponentialHistogramDataPoint.prototype.attributes = $util.emptyArray;
              ExponentialHistogramDataPoint.prototype.startTimeUnixNano = null;
              ExponentialHistogramDataPoint.prototype.timeUnixNano = null;
              ExponentialHistogramDataPoint.prototype.count = null;
              ExponentialHistogramDataPoint.prototype.sum = null;
              ExponentialHistogramDataPoint.prototype.scale = null;
              ExponentialHistogramDataPoint.prototype.zeroCount = null;
              ExponentialHistogramDataPoint.prototype.positive = null;
              ExponentialHistogramDataPoint.prototype.negative = null;
              ExponentialHistogramDataPoint.prototype.flags = null;
              ExponentialHistogramDataPoint.prototype.exemplars = $util.emptyArray;
              ExponentialHistogramDataPoint.prototype.min = null;
              ExponentialHistogramDataPoint.prototype.max = null;
              ExponentialHistogramDataPoint.prototype.zeroThreshold = null;
              var $oneOfFields;
              Object.defineProperty(ExponentialHistogramDataPoint.prototype, "_sum", {
                get: $util.oneOfGetter($oneOfFields = ["sum"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              Object.defineProperty(ExponentialHistogramDataPoint.prototype, "_min", {
                get: $util.oneOfGetter($oneOfFields = ["min"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              Object.defineProperty(ExponentialHistogramDataPoint.prototype, "_max", {
                get: $util.oneOfGetter($oneOfFields = ["max"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              ExponentialHistogramDataPoint.create = function create(properties) {
                return new ExponentialHistogramDataPoint(properties);
              };
              ExponentialHistogramDataPoint.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                  writer.uint32(
                    /* id 2, wireType 1 =*/
                    17
                  ).fixed64(message.startTimeUnixNano);
                if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                  writer.uint32(
                    /* id 3, wireType 1 =*/
                    25
                  ).fixed64(message.timeUnixNano);
                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                  writer.uint32(
                    /* id 4, wireType 1 =*/
                    33
                  ).fixed64(message.count);
                if (message.sum != null && Object.hasOwnProperty.call(message, "sum"))
                  writer.uint32(
                    /* id 5, wireType 1 =*/
                    41
                  ).double(message.sum);
                if (message.scale != null && Object.hasOwnProperty.call(message, "scale"))
                  writer.uint32(
                    /* id 6, wireType 0 =*/
                    48
                  ).sint32(message.scale);
                if (message.zeroCount != null && Object.hasOwnProperty.call(message, "zeroCount"))
                  writer.uint32(
                    /* id 7, wireType 1 =*/
                    57
                  ).fixed64(message.zeroCount);
                if (message.positive != null && Object.hasOwnProperty.call(message, "positive"))
                  $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.encode(message.positive, writer.uint32(
                    /* id 8, wireType 2 =*/
                    66
                  ).fork()).ldelim();
                if (message.negative != null && Object.hasOwnProperty.call(message, "negative"))
                  $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.encode(message.negative, writer.uint32(
                    /* id 9, wireType 2 =*/
                    74
                  ).fork()).ldelim();
                if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                  writer.uint32(
                    /* id 10, wireType 0 =*/
                    80
                  ).uint32(message.flags);
                if (message.exemplars != null && message.exemplars.length)
                  for (var i = 0; i < message.exemplars.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.Exemplar.encode(message.exemplars[i], writer.uint32(
                      /* id 11, wireType 2 =*/
                      90
                    ).fork()).ldelim();
                if (message.min != null && Object.hasOwnProperty.call(message, "min"))
                  writer.uint32(
                    /* id 12, wireType 1 =*/
                    97
                  ).double(message.min);
                if (message.max != null && Object.hasOwnProperty.call(message, "max"))
                  writer.uint32(
                    /* id 13, wireType 1 =*/
                    105
                  ).double(message.max);
                if (message.zeroThreshold != null && Object.hasOwnProperty.call(message, "zeroThreshold"))
                  writer.uint32(
                    /* id 14, wireType 1 =*/
                    113
                  ).double(message.zeroThreshold);
                return writer;
              };
              ExponentialHistogramDataPoint.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ExponentialHistogramDataPoint.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.startTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 3: {
                      message.timeUnixNano = reader.fixed64();
                      break;
                    }
                    case 4: {
                      message.count = reader.fixed64();
                      break;
                    }
                    case 5: {
                      message.sum = reader.double();
                      break;
                    }
                    case 6: {
                      message.scale = reader.sint32();
                      break;
                    }
                    case 7: {
                      message.zeroCount = reader.fixed64();
                      break;
                    }
                    case 8: {
                      message.positive = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.decode(reader, reader.uint32());
                      break;
                    }
                    case 9: {
                      message.negative = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.decode(reader, reader.uint32());
                      break;
                    }
                    case 10: {
                      message.flags = reader.uint32();
                      break;
                    }
                    case 11: {
                      if (!(message.exemplars && message.exemplars.length))
                        message.exemplars = [];
                      message.exemplars.push($root.opentelemetry.proto.metrics.v1.Exemplar.decode(reader, reader.uint32()));
                      break;
                    }
                    case 12: {
                      message.min = reader.double();
                      break;
                    }
                    case 13: {
                      message.max = reader.double();
                      break;
                    }
                    case 14: {
                      message.zeroThreshold = reader.double();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              ExponentialHistogramDataPoint.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ExponentialHistogramDataPoint.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                var properties = {};
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                  if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                    return "startTimeUnixNano: integer|Long expected";
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                  if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                    return "timeUnixNano: integer|Long expected";
                }
                if (message.count != null && message.hasOwnProperty("count")) {
                  if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                    return "count: integer|Long expected";
                }
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  properties._sum = 1;
                  if (typeof message.sum !== "number")
                    return "sum: number expected";
                }
                if (message.scale != null && message.hasOwnProperty("scale")) {
                  if (!$util.isInteger(message.scale))
                    return "scale: integer expected";
                }
                if (message.zeroCount != null && message.hasOwnProperty("zeroCount")) {
                  if (!$util.isInteger(message.zeroCount) && !(message.zeroCount && $util.isInteger(message.zeroCount.low) && $util.isInteger(message.zeroCount.high)))
                    return "zeroCount: integer|Long expected";
                }
                if (message.positive != null && message.hasOwnProperty("positive")) {
                  var error = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.verify(message.positive);
                  if (error)
                    return "positive." + error;
                }
                if (message.negative != null && message.hasOwnProperty("negative")) {
                  var error = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.verify(message.negative);
                  if (error)
                    return "negative." + error;
                }
                if (message.flags != null && message.hasOwnProperty("flags")) {
                  if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
                }
                if (message.exemplars != null && message.hasOwnProperty("exemplars")) {
                  if (!Array.isArray(message.exemplars))
                    return "exemplars: array expected";
                  for (var i = 0; i < message.exemplars.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.Exemplar.verify(message.exemplars[i]);
                    if (error)
                      return "exemplars." + error;
                  }
                }
                if (message.min != null && message.hasOwnProperty("min")) {
                  properties._min = 1;
                  if (typeof message.min !== "number")
                    return "min: number expected";
                }
                if (message.max != null && message.hasOwnProperty("max")) {
                  properties._max = 1;
                  if (typeof message.max !== "number")
                    return "max: number expected";
                }
                if (message.zeroThreshold != null && message.hasOwnProperty("zeroThreshold")) {
                  if (typeof message.zeroThreshold !== "number")
                    return "zeroThreshold: number expected";
                }
                return null;
              };
              ExponentialHistogramDataPoint.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint();
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.startTimeUnixNano != null) {
                  if ($util.Long)
                    (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                  else if (typeof object.startTimeUnixNano === "string")
                    message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                  else if (typeof object.startTimeUnixNano === "number")
                    message.startTimeUnixNano = object.startTimeUnixNano;
                  else if (typeof object.startTimeUnixNano === "object")
                    message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                }
                if (object.timeUnixNano != null) {
                  if ($util.Long)
                    (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                  else if (typeof object.timeUnixNano === "string")
                    message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                  else if (typeof object.timeUnixNano === "number")
                    message.timeUnixNano = object.timeUnixNano;
                  else if (typeof object.timeUnixNano === "object")
                    message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                }
                if (object.count != null) {
                  if ($util.Long)
                    (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                  else if (typeof object.count === "string")
                    message.count = parseInt(object.count, 10);
                  else if (typeof object.count === "number")
                    message.count = object.count;
                  else if (typeof object.count === "object")
                    message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
                }
                if (object.sum != null)
                  message.sum = Number(object.sum);
                if (object.scale != null)
                  message.scale = object.scale | 0;
                if (object.zeroCount != null) {
                  if ($util.Long)
                    (message.zeroCount = $util.Long.fromValue(object.zeroCount)).unsigned = false;
                  else if (typeof object.zeroCount === "string")
                    message.zeroCount = parseInt(object.zeroCount, 10);
                  else if (typeof object.zeroCount === "number")
                    message.zeroCount = object.zeroCount;
                  else if (typeof object.zeroCount === "object")
                    message.zeroCount = new $util.LongBits(object.zeroCount.low >>> 0, object.zeroCount.high >>> 0).toNumber();
                }
                if (object.positive != null) {
                  if (typeof object.positive !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.positive: object expected");
                  message.positive = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.fromObject(object.positive);
                }
                if (object.negative != null) {
                  if (typeof object.negative !== "object")
                    throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.negative: object expected");
                  message.negative = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.fromObject(object.negative);
                }
                if (object.flags != null)
                  message.flags = object.flags >>> 0;
                if (object.exemplars) {
                  if (!Array.isArray(object.exemplars))
                    throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.exemplars: array expected");
                  message.exemplars = [];
                  for (var i = 0; i < object.exemplars.length; ++i) {
                    if (typeof object.exemplars[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.exemplars: object expected");
                    message.exemplars[i] = $root.opentelemetry.proto.metrics.v1.Exemplar.fromObject(object.exemplars[i]);
                  }
                }
                if (object.min != null)
                  message.min = Number(object.min);
                if (object.max != null)
                  message.max = Number(object.max);
                if (object.zeroThreshold != null)
                  message.zeroThreshold = Number(object.zeroThreshold);
                return message;
              };
              ExponentialHistogramDataPoint.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults) {
                  object.attributes = [];
                  object.exemplars = [];
                }
                if (options2.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.count = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.count = options2.longs === String ? "0" : 0;
                  object.scale = 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.zeroCount = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.zeroCount = options2.longs === String ? "0" : 0;
                  object.positive = null;
                  object.negative = null;
                  object.flags = 0;
                  object.zeroThreshold = 0;
                }
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options2.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.count != null && message.hasOwnProperty("count"))
                  if (typeof message.count === "number")
                    object.count = options2.longs === String ? String(message.count) : message.count;
                  else
                    object.count = options2.longs === String ? $util.Long.prototype.toString.call(message.count) : options2.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  object.sum = options2.json && !isFinite(message.sum) ? String(message.sum) : message.sum;
                  if (options2.oneofs)
                    object._sum = "sum";
                }
                if (message.scale != null && message.hasOwnProperty("scale"))
                  object.scale = message.scale;
                if (message.zeroCount != null && message.hasOwnProperty("zeroCount"))
                  if (typeof message.zeroCount === "number")
                    object.zeroCount = options2.longs === String ? String(message.zeroCount) : message.zeroCount;
                  else
                    object.zeroCount = options2.longs === String ? $util.Long.prototype.toString.call(message.zeroCount) : options2.longs === Number ? new $util.LongBits(message.zeroCount.low >>> 0, message.zeroCount.high >>> 0).toNumber() : message.zeroCount;
                if (message.positive != null && message.hasOwnProperty("positive"))
                  object.positive = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.toObject(message.positive, options2);
                if (message.negative != null && message.hasOwnProperty("negative"))
                  object.negative = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.toObject(message.negative, options2);
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                if (message.exemplars && message.exemplars.length) {
                  object.exemplars = [];
                  for (var j = 0; j < message.exemplars.length; ++j)
                    object.exemplars[j] = $root.opentelemetry.proto.metrics.v1.Exemplar.toObject(message.exemplars[j], options2);
                }
                if (message.min != null && message.hasOwnProperty("min")) {
                  object.min = options2.json && !isFinite(message.min) ? String(message.min) : message.min;
                  if (options2.oneofs)
                    object._min = "min";
                }
                if (message.max != null && message.hasOwnProperty("max")) {
                  object.max = options2.json && !isFinite(message.max) ? String(message.max) : message.max;
                  if (options2.oneofs)
                    object._max = "max";
                }
                if (message.zeroThreshold != null && message.hasOwnProperty("zeroThreshold"))
                  object.zeroThreshold = options2.json && !isFinite(message.zeroThreshold) ? String(message.zeroThreshold) : message.zeroThreshold;
                return object;
              };
              ExponentialHistogramDataPoint.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ExponentialHistogramDataPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint";
              };
              ExponentialHistogramDataPoint.Buckets = function() {
                function Buckets(properties) {
                  this.bucketCounts = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                Buckets.prototype.offset = null;
                Buckets.prototype.bucketCounts = $util.emptyArray;
                Buckets.create = function create(properties) {
                  return new Buckets(properties);
                };
                Buckets.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.offset != null && Object.hasOwnProperty.call(message, "offset"))
                    writer.uint32(
                      /* id 1, wireType 0 =*/
                      8
                    ).sint32(message.offset);
                  if (message.bucketCounts != null && message.bucketCounts.length) {
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork();
                    for (var i = 0; i < message.bucketCounts.length; ++i)
                      writer.uint64(message.bucketCounts[i]);
                    writer.ldelim();
                  }
                  return writer;
                };
                Buckets.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Buckets.decode = function decode(reader, length, error) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                      break;
                    switch (tag >>> 3) {
                      case 1: {
                        message.offset = reader.sint32();
                        break;
                      }
                      case 2: {
                        if (!(message.bucketCounts && message.bucketCounts.length))
                          message.bucketCounts = [];
                        if ((tag & 7) === 2) {
                          var end2 = reader.uint32() + reader.pos;
                          while (reader.pos < end2)
                            message.bucketCounts.push(reader.uint64());
                        } else
                          message.bucketCounts.push(reader.uint64());
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                Buckets.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Buckets.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.offset != null && message.hasOwnProperty("offset")) {
                    if (!$util.isInteger(message.offset))
                      return "offset: integer expected";
                  }
                  if (message.bucketCounts != null && message.hasOwnProperty("bucketCounts")) {
                    if (!Array.isArray(message.bucketCounts))
                      return "bucketCounts: array expected";
                    for (var i = 0; i < message.bucketCounts.length; ++i)
                      if (!$util.isInteger(message.bucketCounts[i]) && !(message.bucketCounts[i] && $util.isInteger(message.bucketCounts[i].low) && $util.isInteger(message.bucketCounts[i].high)))
                        return "bucketCounts: integer|Long[] expected";
                  }
                  return null;
                };
                Buckets.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets();
                  if (object.offset != null)
                    message.offset = object.offset | 0;
                  if (object.bucketCounts) {
                    if (!Array.isArray(object.bucketCounts))
                      throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.bucketCounts: array expected");
                    message.bucketCounts = [];
                    for (var i = 0; i < object.bucketCounts.length; ++i)
                      if ($util.Long)
                        (message.bucketCounts[i] = $util.Long.fromValue(object.bucketCounts[i])).unsigned = true;
                      else if (typeof object.bucketCounts[i] === "string")
                        message.bucketCounts[i] = parseInt(object.bucketCounts[i], 10);
                      else if (typeof object.bucketCounts[i] === "number")
                        message.bucketCounts[i] = object.bucketCounts[i];
                      else if (typeof object.bucketCounts[i] === "object")
                        message.bucketCounts[i] = new $util.LongBits(object.bucketCounts[i].low >>> 0, object.bucketCounts[i].high >>> 0).toNumber(true);
                  }
                  return message;
                };
                Buckets.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.arrays || options2.defaults)
                    object.bucketCounts = [];
                  if (options2.defaults)
                    object.offset = 0;
                  if (message.offset != null && message.hasOwnProperty("offset"))
                    object.offset = message.offset;
                  if (message.bucketCounts && message.bucketCounts.length) {
                    object.bucketCounts = [];
                    for (var j = 0; j < message.bucketCounts.length; ++j)
                      if (typeof message.bucketCounts[j] === "number")
                        object.bucketCounts[j] = options2.longs === String ? String(message.bucketCounts[j]) : message.bucketCounts[j];
                      else
                        object.bucketCounts[j] = options2.longs === String ? $util.Long.prototype.toString.call(message.bucketCounts[j]) : options2.longs === Number ? new $util.LongBits(message.bucketCounts[j].low >>> 0, message.bucketCounts[j].high >>> 0).toNumber(true) : message.bucketCounts[j];
                  }
                  return object;
                };
                Buckets.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Buckets.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets";
                };
                return Buckets;
              }();
              return ExponentialHistogramDataPoint;
            }();
            v1.SummaryDataPoint = function() {
              function SummaryDataPoint(properties) {
                this.attributes = [];
                this.quantileValues = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              SummaryDataPoint.prototype.attributes = $util.emptyArray;
              SummaryDataPoint.prototype.startTimeUnixNano = null;
              SummaryDataPoint.prototype.timeUnixNano = null;
              SummaryDataPoint.prototype.count = null;
              SummaryDataPoint.prototype.sum = null;
              SummaryDataPoint.prototype.quantileValues = $util.emptyArray;
              SummaryDataPoint.prototype.flags = null;
              SummaryDataPoint.create = function create(properties) {
                return new SummaryDataPoint(properties);
              };
              SummaryDataPoint.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                  writer.uint32(
                    /* id 2, wireType 1 =*/
                    17
                  ).fixed64(message.startTimeUnixNano);
                if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                  writer.uint32(
                    /* id 3, wireType 1 =*/
                    25
                  ).fixed64(message.timeUnixNano);
                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                  writer.uint32(
                    /* id 4, wireType 1 =*/
                    33
                  ).fixed64(message.count);
                if (message.sum != null && Object.hasOwnProperty.call(message, "sum"))
                  writer.uint32(
                    /* id 5, wireType 1 =*/
                    41
                  ).double(message.sum);
                if (message.quantileValues != null && message.quantileValues.length)
                  for (var i = 0; i < message.quantileValues.length; ++i)
                    $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.encode(message.quantileValues[i], writer.uint32(
                      /* id 6, wireType 2 =*/
                      50
                    ).fork()).ldelim();
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 7, wireType 2 =*/
                      58
                    ).fork()).ldelim();
                if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                  writer.uint32(
                    /* id 8, wireType 0 =*/
                    64
                  ).uint32(message.flags);
                return writer;
              };
              SummaryDataPoint.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              SummaryDataPoint.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.SummaryDataPoint();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 7: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.startTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 3: {
                      message.timeUnixNano = reader.fixed64();
                      break;
                    }
                    case 4: {
                      message.count = reader.fixed64();
                      break;
                    }
                    case 5: {
                      message.sum = reader.double();
                      break;
                    }
                    case 6: {
                      if (!(message.quantileValues && message.quantileValues.length))
                        message.quantileValues = [];
                      message.quantileValues.push($root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.decode(reader, reader.uint32()));
                      break;
                    }
                    case 8: {
                      message.flags = reader.uint32();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              SummaryDataPoint.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              SummaryDataPoint.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                  if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                    return "startTimeUnixNano: integer|Long expected";
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                  if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                    return "timeUnixNano: integer|Long expected";
                }
                if (message.count != null && message.hasOwnProperty("count")) {
                  if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                    return "count: integer|Long expected";
                }
                if (message.sum != null && message.hasOwnProperty("sum")) {
                  if (typeof message.sum !== "number")
                    return "sum: number expected";
                }
                if (message.quantileValues != null && message.hasOwnProperty("quantileValues")) {
                  if (!Array.isArray(message.quantileValues))
                    return "quantileValues: array expected";
                  for (var i = 0; i < message.quantileValues.length; ++i) {
                    var error = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.verify(message.quantileValues[i]);
                    if (error)
                      return "quantileValues." + error;
                  }
                }
                if (message.flags != null && message.hasOwnProperty("flags")) {
                  if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
                }
                return null;
              };
              SummaryDataPoint.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.SummaryDataPoint)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.SummaryDataPoint();
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.startTimeUnixNano != null) {
                  if ($util.Long)
                    (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                  else if (typeof object.startTimeUnixNano === "string")
                    message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                  else if (typeof object.startTimeUnixNano === "number")
                    message.startTimeUnixNano = object.startTimeUnixNano;
                  else if (typeof object.startTimeUnixNano === "object")
                    message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                }
                if (object.timeUnixNano != null) {
                  if ($util.Long)
                    (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                  else if (typeof object.timeUnixNano === "string")
                    message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                  else if (typeof object.timeUnixNano === "number")
                    message.timeUnixNano = object.timeUnixNano;
                  else if (typeof object.timeUnixNano === "object")
                    message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                }
                if (object.count != null) {
                  if ($util.Long)
                    (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                  else if (typeof object.count === "string")
                    message.count = parseInt(object.count, 10);
                  else if (typeof object.count === "number")
                    message.count = object.count;
                  else if (typeof object.count === "object")
                    message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
                }
                if (object.sum != null)
                  message.sum = Number(object.sum);
                if (object.quantileValues) {
                  if (!Array.isArray(object.quantileValues))
                    throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.quantileValues: array expected");
                  message.quantileValues = [];
                  for (var i = 0; i < object.quantileValues.length; ++i) {
                    if (typeof object.quantileValues[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.quantileValues: object expected");
                    message.quantileValues[i] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.fromObject(object.quantileValues[i]);
                  }
                }
                if (object.flags != null)
                  message.flags = object.flags >>> 0;
                return message;
              };
              SummaryDataPoint.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults) {
                  object.quantileValues = [];
                  object.attributes = [];
                }
                if (options2.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.startTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.startTimeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options2.longs === String ? "0" : 0;
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.count = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.count = options2.longs === String ? "0" : 0;
                  object.sum = 0;
                  object.flags = 0;
                }
                if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                  if (typeof message.startTimeUnixNano === "number")
                    object.startTimeUnixNano = options2.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                  else
                    object.startTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.count != null && message.hasOwnProperty("count"))
                  if (typeof message.count === "number")
                    object.count = options2.longs === String ? String(message.count) : message.count;
                  else
                    object.count = options2.longs === String ? $util.Long.prototype.toString.call(message.count) : options2.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                if (message.sum != null && message.hasOwnProperty("sum"))
                  object.sum = options2.json && !isFinite(message.sum) ? String(message.sum) : message.sum;
                if (message.quantileValues && message.quantileValues.length) {
                  object.quantileValues = [];
                  for (var j = 0; j < message.quantileValues.length; ++j)
                    object.quantileValues[j] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.toObject(message.quantileValues[j], options2);
                }
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                return object;
              };
              SummaryDataPoint.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              SummaryDataPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.SummaryDataPoint";
              };
              SummaryDataPoint.ValueAtQuantile = function() {
                function ValueAtQuantile(properties) {
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ValueAtQuantile.prototype.quantile = null;
                ValueAtQuantile.prototype.value = null;
                ValueAtQuantile.create = function create(properties) {
                  return new ValueAtQuantile(properties);
                };
                ValueAtQuantile.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.quantile != null && Object.hasOwnProperty.call(message, "quantile"))
                    writer.uint32(
                      /* id 1, wireType 1 =*/
                      9
                    ).double(message.quantile);
                  if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(
                      /* id 2, wireType 1 =*/
                      17
                    ).double(message.value);
                  return writer;
                };
                ValueAtQuantile.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ValueAtQuantile.decode = function decode(reader, length, error) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    if (tag === error)
                      break;
                    switch (tag >>> 3) {
                      case 1: {
                        message.quantile = reader.double();
                        break;
                      }
                      case 2: {
                        message.value = reader.double();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ValueAtQuantile.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ValueAtQuantile.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.quantile != null && message.hasOwnProperty("quantile")) {
                    if (typeof message.quantile !== "number")
                      return "quantile: number expected";
                  }
                  if (message.value != null && message.hasOwnProperty("value")) {
                    if (typeof message.value !== "number")
                      return "value: number expected";
                  }
                  return null;
                };
                ValueAtQuantile.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile();
                  if (object.quantile != null)
                    message.quantile = Number(object.quantile);
                  if (object.value != null)
                    message.value = Number(object.value);
                  return message;
                };
                ValueAtQuantile.toObject = function toObject(message, options2) {
                  if (!options2)
                    options2 = {};
                  var object = {};
                  if (options2.defaults) {
                    object.quantile = 0;
                    object.value = 0;
                  }
                  if (message.quantile != null && message.hasOwnProperty("quantile"))
                    object.quantile = options2.json && !isFinite(message.quantile) ? String(message.quantile) : message.quantile;
                  if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options2.json && !isFinite(message.value) ? String(message.value) : message.value;
                  return object;
                };
                ValueAtQuantile.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ValueAtQuantile.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile";
                };
                return ValueAtQuantile;
              }();
              return SummaryDataPoint;
            }();
            v1.Exemplar = function() {
              function Exemplar(properties) {
                this.filteredAttributes = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              Exemplar.prototype.filteredAttributes = $util.emptyArray;
              Exemplar.prototype.timeUnixNano = null;
              Exemplar.prototype.asDouble = null;
              Exemplar.prototype.asInt = null;
              Exemplar.prototype.spanId = null;
              Exemplar.prototype.traceId = null;
              var $oneOfFields;
              Object.defineProperty(Exemplar.prototype, "value", {
                get: $util.oneOfGetter($oneOfFields = ["asDouble", "asInt"]),
                set: $util.oneOfSetter($oneOfFields)
              });
              Exemplar.create = function create(properties) {
                return new Exemplar(properties);
              };
              Exemplar.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                  writer.uint32(
                    /* id 2, wireType 1 =*/
                    17
                  ).fixed64(message.timeUnixNano);
                if (message.asDouble != null && Object.hasOwnProperty.call(message, "asDouble"))
                  writer.uint32(
                    /* id 3, wireType 1 =*/
                    25
                  ).double(message.asDouble);
                if (message.spanId != null && Object.hasOwnProperty.call(message, "spanId"))
                  writer.uint32(
                    /* id 4, wireType 2 =*/
                    34
                  ).bytes(message.spanId);
                if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                  writer.uint32(
                    /* id 5, wireType 2 =*/
                    42
                  ).bytes(message.traceId);
                if (message.asInt != null && Object.hasOwnProperty.call(message, "asInt"))
                  writer.uint32(
                    /* id 6, wireType 1 =*/
                    49
                  ).sfixed64(message.asInt);
                if (message.filteredAttributes != null && message.filteredAttributes.length)
                  for (var i = 0; i < message.filteredAttributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.filteredAttributes[i], writer.uint32(
                      /* id 7, wireType 2 =*/
                      58
                    ).fork()).ldelim();
                return writer;
              };
              Exemplar.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              Exemplar.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Exemplar();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 7: {
                      if (!(message.filteredAttributes && message.filteredAttributes.length))
                        message.filteredAttributes = [];
                      message.filteredAttributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 2: {
                      message.timeUnixNano = reader.fixed64();
                      break;
                    }
                    case 3: {
                      message.asDouble = reader.double();
                      break;
                    }
                    case 6: {
                      message.asInt = reader.sfixed64();
                      break;
                    }
                    case 4: {
                      message.spanId = reader.bytes();
                      break;
                    }
                    case 5: {
                      message.traceId = reader.bytes();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              Exemplar.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              Exemplar.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                var properties = {};
                if (message.filteredAttributes != null && message.hasOwnProperty("filteredAttributes")) {
                  if (!Array.isArray(message.filteredAttributes))
                    return "filteredAttributes: array expected";
                  for (var i = 0; i < message.filteredAttributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.filteredAttributes[i]);
                    if (error)
                      return "filteredAttributes." + error;
                  }
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                  if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                    return "timeUnixNano: integer|Long expected";
                }
                if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                  properties.value = 1;
                  if (typeof message.asDouble !== "number")
                    return "asDouble: number expected";
                }
                if (message.asInt != null && message.hasOwnProperty("asInt")) {
                  if (properties.value === 1)
                    return "value: multiple values";
                  properties.value = 1;
                  if (!$util.isInteger(message.asInt) && !(message.asInt && $util.isInteger(message.asInt.low) && $util.isInteger(message.asInt.high)))
                    return "asInt: integer|Long expected";
                }
                if (message.spanId != null && message.hasOwnProperty("spanId")) {
                  if (!(message.spanId && typeof message.spanId.length === "number" || $util.isString(message.spanId)))
                    return "spanId: buffer expected";
                }
                if (message.traceId != null && message.hasOwnProperty("traceId")) {
                  if (!(message.traceId && typeof message.traceId.length === "number" || $util.isString(message.traceId)))
                    return "traceId: buffer expected";
                }
                return null;
              };
              Exemplar.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.metrics.v1.Exemplar)
                  return object;
                var message = new $root.opentelemetry.proto.metrics.v1.Exemplar();
                if (object.filteredAttributes) {
                  if (!Array.isArray(object.filteredAttributes))
                    throw TypeError(".opentelemetry.proto.metrics.v1.Exemplar.filteredAttributes: array expected");
                  message.filteredAttributes = [];
                  for (var i = 0; i < object.filteredAttributes.length; ++i) {
                    if (typeof object.filteredAttributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Exemplar.filteredAttributes: object expected");
                    message.filteredAttributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.filteredAttributes[i]);
                  }
                }
                if (object.timeUnixNano != null) {
                  if ($util.Long)
                    (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                  else if (typeof object.timeUnixNano === "string")
                    message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                  else if (typeof object.timeUnixNano === "number")
                    message.timeUnixNano = object.timeUnixNano;
                  else if (typeof object.timeUnixNano === "object")
                    message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                }
                if (object.asDouble != null)
                  message.asDouble = Number(object.asDouble);
                if (object.asInt != null) {
                  if ($util.Long)
                    (message.asInt = $util.Long.fromValue(object.asInt)).unsigned = false;
                  else if (typeof object.asInt === "string")
                    message.asInt = parseInt(object.asInt, 10);
                  else if (typeof object.asInt === "number")
                    message.asInt = object.asInt;
                  else if (typeof object.asInt === "object")
                    message.asInt = new $util.LongBits(object.asInt.low >>> 0, object.asInt.high >>> 0).toNumber();
                }
                if (object.spanId != null) {
                  if (typeof object.spanId === "string")
                    $util.base64.decode(object.spanId, message.spanId = $util.newBuffer($util.base64.length(object.spanId)), 0);
                  else if (object.spanId.length >= 0)
                    message.spanId = object.spanId;
                }
                if (object.traceId != null) {
                  if (typeof object.traceId === "string")
                    $util.base64.decode(object.traceId, message.traceId = $util.newBuffer($util.base64.length(object.traceId)), 0);
                  else if (object.traceId.length >= 0)
                    message.traceId = object.traceId;
                }
                return message;
              };
              Exemplar.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.filteredAttributes = [];
                if (options2.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options2.longs === String ? "0" : 0;
                  if (options2.bytes === String)
                    object.spanId = "";
                  else {
                    object.spanId = [];
                    if (options2.bytes !== Array)
                      object.spanId = $util.newBuffer(object.spanId);
                  }
                  if (options2.bytes === String)
                    object.traceId = "";
                  else {
                    object.traceId = [];
                    if (options2.bytes !== Array)
                      object.traceId = $util.newBuffer(object.traceId);
                  }
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                  object.asDouble = options2.json && !isFinite(message.asDouble) ? String(message.asDouble) : message.asDouble;
                  if (options2.oneofs)
                    object.value = "asDouble";
                }
                if (message.spanId != null && message.hasOwnProperty("spanId"))
                  object.spanId = options2.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                  object.traceId = options2.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                if (message.asInt != null && message.hasOwnProperty("asInt")) {
                  if (typeof message.asInt === "number")
                    object.asInt = options2.longs === String ? String(message.asInt) : message.asInt;
                  else
                    object.asInt = options2.longs === String ? $util.Long.prototype.toString.call(message.asInt) : options2.longs === Number ? new $util.LongBits(message.asInt.low >>> 0, message.asInt.high >>> 0).toNumber() : message.asInt;
                  if (options2.oneofs)
                    object.value = "asInt";
                }
                if (message.filteredAttributes && message.filteredAttributes.length) {
                  object.filteredAttributes = [];
                  for (var j = 0; j < message.filteredAttributes.length; ++j)
                    object.filteredAttributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.filteredAttributes[j], options2);
                }
                return object;
              };
              Exemplar.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              Exemplar.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Exemplar";
              };
              return Exemplar;
            }();
            return v1;
          }();
          return metrics;
        }();
        proto.logs = function() {
          var logs = {};
          logs.v1 = function() {
            var v1 = {};
            v1.LogsData = function() {
              function LogsData(properties) {
                this.resourceLogs = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              LogsData.prototype.resourceLogs = $util.emptyArray;
              LogsData.create = function create(properties) {
                return new LogsData(properties);
              };
              LogsData.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resourceLogs != null && message.resourceLogs.length)
                  for (var i = 0; i < message.resourceLogs.length; ++i)
                    $root.opentelemetry.proto.logs.v1.ResourceLogs.encode(message.resourceLogs[i], writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                return writer;
              };
              LogsData.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              LogsData.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.logs.v1.LogsData();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      if (!(message.resourceLogs && message.resourceLogs.length))
                        message.resourceLogs = [];
                      message.resourceLogs.push($root.opentelemetry.proto.logs.v1.ResourceLogs.decode(reader, reader.uint32()));
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              LogsData.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              LogsData.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.resourceLogs != null && message.hasOwnProperty("resourceLogs")) {
                  if (!Array.isArray(message.resourceLogs))
                    return "resourceLogs: array expected";
                  for (var i = 0; i < message.resourceLogs.length; ++i) {
                    var error = $root.opentelemetry.proto.logs.v1.ResourceLogs.verify(message.resourceLogs[i]);
                    if (error)
                      return "resourceLogs." + error;
                  }
                }
                return null;
              };
              LogsData.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.logs.v1.LogsData)
                  return object;
                var message = new $root.opentelemetry.proto.logs.v1.LogsData();
                if (object.resourceLogs) {
                  if (!Array.isArray(object.resourceLogs))
                    throw TypeError(".opentelemetry.proto.logs.v1.LogsData.resourceLogs: array expected");
                  message.resourceLogs = [];
                  for (var i = 0; i < object.resourceLogs.length; ++i) {
                    if (typeof object.resourceLogs[i] !== "object")
                      throw TypeError(".opentelemetry.proto.logs.v1.LogsData.resourceLogs: object expected");
                    message.resourceLogs[i] = $root.opentelemetry.proto.logs.v1.ResourceLogs.fromObject(object.resourceLogs[i]);
                  }
                }
                return message;
              };
              LogsData.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.resourceLogs = [];
                if (message.resourceLogs && message.resourceLogs.length) {
                  object.resourceLogs = [];
                  for (var j = 0; j < message.resourceLogs.length; ++j)
                    object.resourceLogs[j] = $root.opentelemetry.proto.logs.v1.ResourceLogs.toObject(message.resourceLogs[j], options2);
                }
                return object;
              };
              LogsData.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              LogsData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.logs.v1.LogsData";
              };
              return LogsData;
            }();
            v1.ResourceLogs = function() {
              function ResourceLogs(properties) {
                this.scopeLogs = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              ResourceLogs.prototype.resource = null;
              ResourceLogs.prototype.scopeLogs = $util.emptyArray;
              ResourceLogs.prototype.schemaUrl = null;
              ResourceLogs.create = function create(properties) {
                return new ResourceLogs(properties);
              };
              ResourceLogs.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                  $root.opentelemetry.proto.resource.v1.Resource.encode(message.resource, writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).fork()).ldelim();
                if (message.scopeLogs != null && message.scopeLogs.length)
                  for (var i = 0; i < message.scopeLogs.length; ++i)
                    $root.opentelemetry.proto.logs.v1.ScopeLogs.encode(message.scopeLogs[i], writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork()).ldelim();
                if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.schemaUrl);
                return writer;
              };
              ResourceLogs.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ResourceLogs.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.logs.v1.ResourceLogs();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      message.resource = $root.opentelemetry.proto.resource.v1.Resource.decode(reader, reader.uint32());
                      break;
                    }
                    case 2: {
                      if (!(message.scopeLogs && message.scopeLogs.length))
                        message.scopeLogs = [];
                      message.scopeLogs.push($root.opentelemetry.proto.logs.v1.ScopeLogs.decode(reader, reader.uint32()));
                      break;
                    }
                    case 3: {
                      message.schemaUrl = reader.string();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              ResourceLogs.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ResourceLogs.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.resource != null && message.hasOwnProperty("resource")) {
                  var error = $root.opentelemetry.proto.resource.v1.Resource.verify(message.resource);
                  if (error)
                    return "resource." + error;
                }
                if (message.scopeLogs != null && message.hasOwnProperty("scopeLogs")) {
                  if (!Array.isArray(message.scopeLogs))
                    return "scopeLogs: array expected";
                  for (var i = 0; i < message.scopeLogs.length; ++i) {
                    var error = $root.opentelemetry.proto.logs.v1.ScopeLogs.verify(message.scopeLogs[i]);
                    if (error)
                      return "scopeLogs." + error;
                  }
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                  if (!$util.isString(message.schemaUrl))
                    return "schemaUrl: string expected";
                }
                return null;
              };
              ResourceLogs.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.logs.v1.ResourceLogs)
                  return object;
                var message = new $root.opentelemetry.proto.logs.v1.ResourceLogs();
                if (object.resource != null) {
                  if (typeof object.resource !== "object")
                    throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.resource: object expected");
                  message.resource = $root.opentelemetry.proto.resource.v1.Resource.fromObject(object.resource);
                }
                if (object.scopeLogs) {
                  if (!Array.isArray(object.scopeLogs))
                    throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.scopeLogs: array expected");
                  message.scopeLogs = [];
                  for (var i = 0; i < object.scopeLogs.length; ++i) {
                    if (typeof object.scopeLogs[i] !== "object")
                      throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.scopeLogs: object expected");
                    message.scopeLogs[i] = $root.opentelemetry.proto.logs.v1.ScopeLogs.fromObject(object.scopeLogs[i]);
                  }
                }
                if (object.schemaUrl != null)
                  message.schemaUrl = String(object.schemaUrl);
                return message;
              };
              ResourceLogs.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.scopeLogs = [];
                if (options2.defaults) {
                  object.resource = null;
                  object.schemaUrl = "";
                }
                if (message.resource != null && message.hasOwnProperty("resource"))
                  object.resource = $root.opentelemetry.proto.resource.v1.Resource.toObject(message.resource, options2);
                if (message.scopeLogs && message.scopeLogs.length) {
                  object.scopeLogs = [];
                  for (var j = 0; j < message.scopeLogs.length; ++j)
                    object.scopeLogs[j] = $root.opentelemetry.proto.logs.v1.ScopeLogs.toObject(message.scopeLogs[j], options2);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              };
              ResourceLogs.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ResourceLogs.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.logs.v1.ResourceLogs";
              };
              return ResourceLogs;
            }();
            v1.ScopeLogs = function() {
              function ScopeLogs(properties) {
                this.logRecords = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              ScopeLogs.prototype.scope = null;
              ScopeLogs.prototype.logRecords = $util.emptyArray;
              ScopeLogs.prototype.schemaUrl = null;
              ScopeLogs.create = function create(properties) {
                return new ScopeLogs(properties);
              };
              ScopeLogs.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.scope != null && Object.hasOwnProperty.call(message, "scope"))
                  $root.opentelemetry.proto.common.v1.InstrumentationScope.encode(message.scope, writer.uint32(
                    /* id 1, wireType 2 =*/
                    10
                  ).fork()).ldelim();
                if (message.logRecords != null && message.logRecords.length)
                  for (var i = 0; i < message.logRecords.length; ++i)
                    $root.opentelemetry.proto.logs.v1.LogRecord.encode(message.logRecords[i], writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork()).ldelim();
                if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.schemaUrl);
                return writer;
              };
              ScopeLogs.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              ScopeLogs.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.logs.v1.ScopeLogs();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.decode(reader, reader.uint32());
                      break;
                    }
                    case 2: {
                      if (!(message.logRecords && message.logRecords.length))
                        message.logRecords = [];
                      message.logRecords.push($root.opentelemetry.proto.logs.v1.LogRecord.decode(reader, reader.uint32()));
                      break;
                    }
                    case 3: {
                      message.schemaUrl = reader.string();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              ScopeLogs.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              ScopeLogs.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.scope != null && message.hasOwnProperty("scope")) {
                  var error = $root.opentelemetry.proto.common.v1.InstrumentationScope.verify(message.scope);
                  if (error)
                    return "scope." + error;
                }
                if (message.logRecords != null && message.hasOwnProperty("logRecords")) {
                  if (!Array.isArray(message.logRecords))
                    return "logRecords: array expected";
                  for (var i = 0; i < message.logRecords.length; ++i) {
                    var error = $root.opentelemetry.proto.logs.v1.LogRecord.verify(message.logRecords[i]);
                    if (error)
                      return "logRecords." + error;
                  }
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                  if (!$util.isString(message.schemaUrl))
                    return "schemaUrl: string expected";
                }
                return null;
              };
              ScopeLogs.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.logs.v1.ScopeLogs)
                  return object;
                var message = new $root.opentelemetry.proto.logs.v1.ScopeLogs();
                if (object.scope != null) {
                  if (typeof object.scope !== "object")
                    throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.scope: object expected");
                  message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(object.scope);
                }
                if (object.logRecords) {
                  if (!Array.isArray(object.logRecords))
                    throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.logRecords: array expected");
                  message.logRecords = [];
                  for (var i = 0; i < object.logRecords.length; ++i) {
                    if (typeof object.logRecords[i] !== "object")
                      throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.logRecords: object expected");
                    message.logRecords[i] = $root.opentelemetry.proto.logs.v1.LogRecord.fromObject(object.logRecords[i]);
                  }
                }
                if (object.schemaUrl != null)
                  message.schemaUrl = String(object.schemaUrl);
                return message;
              };
              ScopeLogs.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.logRecords = [];
                if (options2.defaults) {
                  object.scope = null;
                  object.schemaUrl = "";
                }
                if (message.scope != null && message.hasOwnProperty("scope"))
                  object.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.toObject(message.scope, options2);
                if (message.logRecords && message.logRecords.length) {
                  object.logRecords = [];
                  for (var j = 0; j < message.logRecords.length; ++j)
                    object.logRecords[j] = $root.opentelemetry.proto.logs.v1.LogRecord.toObject(message.logRecords[j], options2);
                }
                if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                  object.schemaUrl = message.schemaUrl;
                return object;
              };
              ScopeLogs.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              ScopeLogs.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.logs.v1.ScopeLogs";
              };
              return ScopeLogs;
            }();
            v1.SeverityNumber = function() {
              var valuesById = {}, values = Object.create(valuesById);
              values[valuesById[0] = "SEVERITY_NUMBER_UNSPECIFIED"] = 0;
              values[valuesById[1] = "SEVERITY_NUMBER_TRACE"] = 1;
              values[valuesById[2] = "SEVERITY_NUMBER_TRACE2"] = 2;
              values[valuesById[3] = "SEVERITY_NUMBER_TRACE3"] = 3;
              values[valuesById[4] = "SEVERITY_NUMBER_TRACE4"] = 4;
              values[valuesById[5] = "SEVERITY_NUMBER_DEBUG"] = 5;
              values[valuesById[6] = "SEVERITY_NUMBER_DEBUG2"] = 6;
              values[valuesById[7] = "SEVERITY_NUMBER_DEBUG3"] = 7;
              values[valuesById[8] = "SEVERITY_NUMBER_DEBUG4"] = 8;
              values[valuesById[9] = "SEVERITY_NUMBER_INFO"] = 9;
              values[valuesById[10] = "SEVERITY_NUMBER_INFO2"] = 10;
              values[valuesById[11] = "SEVERITY_NUMBER_INFO3"] = 11;
              values[valuesById[12] = "SEVERITY_NUMBER_INFO4"] = 12;
              values[valuesById[13] = "SEVERITY_NUMBER_WARN"] = 13;
              values[valuesById[14] = "SEVERITY_NUMBER_WARN2"] = 14;
              values[valuesById[15] = "SEVERITY_NUMBER_WARN3"] = 15;
              values[valuesById[16] = "SEVERITY_NUMBER_WARN4"] = 16;
              values[valuesById[17] = "SEVERITY_NUMBER_ERROR"] = 17;
              values[valuesById[18] = "SEVERITY_NUMBER_ERROR2"] = 18;
              values[valuesById[19] = "SEVERITY_NUMBER_ERROR3"] = 19;
              values[valuesById[20] = "SEVERITY_NUMBER_ERROR4"] = 20;
              values[valuesById[21] = "SEVERITY_NUMBER_FATAL"] = 21;
              values[valuesById[22] = "SEVERITY_NUMBER_FATAL2"] = 22;
              values[valuesById[23] = "SEVERITY_NUMBER_FATAL3"] = 23;
              values[valuesById[24] = "SEVERITY_NUMBER_FATAL4"] = 24;
              return values;
            }();
            v1.LogRecordFlags = function() {
              var valuesById = {}, values = Object.create(valuesById);
              values[valuesById[0] = "LOG_RECORD_FLAGS_DO_NOT_USE"] = 0;
              values[valuesById[255] = "LOG_RECORD_FLAGS_TRACE_FLAGS_MASK"] = 255;
              return values;
            }();
            v1.LogRecord = function() {
              function LogRecord(properties) {
                this.attributes = [];
                if (properties) {
                  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]];
                }
              }
              LogRecord.prototype.timeUnixNano = null;
              LogRecord.prototype.observedTimeUnixNano = null;
              LogRecord.prototype.severityNumber = null;
              LogRecord.prototype.severityText = null;
              LogRecord.prototype.body = null;
              LogRecord.prototype.attributes = $util.emptyArray;
              LogRecord.prototype.droppedAttributesCount = null;
              LogRecord.prototype.flags = null;
              LogRecord.prototype.traceId = null;
              LogRecord.prototype.spanId = null;
              LogRecord.prototype.eventName = null;
              LogRecord.create = function create(properties) {
                return new LogRecord(properties);
              };
              LogRecord.encode = function encode(message, writer) {
                if (!writer)
                  writer = $Writer.create();
                if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                  writer.uint32(
                    /* id 1, wireType 1 =*/
                    9
                  ).fixed64(message.timeUnixNano);
                if (message.severityNumber != null && Object.hasOwnProperty.call(message, "severityNumber"))
                  writer.uint32(
                    /* id 2, wireType 0 =*/
                    16
                  ).int32(message.severityNumber);
                if (message.severityText != null && Object.hasOwnProperty.call(message, "severityText"))
                  writer.uint32(
                    /* id 3, wireType 2 =*/
                    26
                  ).string(message.severityText);
                if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                  $root.opentelemetry.proto.common.v1.AnyValue.encode(message.body, writer.uint32(
                    /* id 5, wireType 2 =*/
                    42
                  ).fork()).ldelim();
                if (message.attributes != null && message.attributes.length)
                  for (var i = 0; i < message.attributes.length; ++i)
                    $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                      /* id 6, wireType 2 =*/
                      50
                    ).fork()).ldelim();
                if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                  writer.uint32(
                    /* id 7, wireType 0 =*/
                    56
                  ).uint32(message.droppedAttributesCount);
                if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                  writer.uint32(
                    /* id 8, wireType 5 =*/
                    69
                  ).fixed32(message.flags);
                if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                  writer.uint32(
                    /* id 9, wireType 2 =*/
                    74
                  ).bytes(message.traceId);
                if (message.spanId != null && Object.hasOwnProperty.call(message, "spanId"))
                  writer.uint32(
                    /* id 10, wireType 2 =*/
                    82
                  ).bytes(message.spanId);
                if (message.observedTimeUnixNano != null && Object.hasOwnProperty.call(message, "observedTimeUnixNano"))
                  writer.uint32(
                    /* id 11, wireType 1 =*/
                    89
                  ).fixed64(message.observedTimeUnixNano);
                if (message.eventName != null && Object.hasOwnProperty.call(message, "eventName"))
                  writer.uint32(
                    /* id 12, wireType 2 =*/
                    98
                  ).string(message.eventName);
                return writer;
              };
              LogRecord.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
              };
              LogRecord.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader);
                var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.logs.v1.LogRecord();
                while (reader.pos < end) {
                  var tag = reader.uint32();
                  if (tag === error)
                    break;
                  switch (tag >>> 3) {
                    case 1: {
                      message.timeUnixNano = reader.fixed64();
                      break;
                    }
                    case 11: {
                      message.observedTimeUnixNano = reader.fixed64();
                      break;
                    }
                    case 2: {
                      message.severityNumber = reader.int32();
                      break;
                    }
                    case 3: {
                      message.severityText = reader.string();
                      break;
                    }
                    case 5: {
                      message.body = $root.opentelemetry.proto.common.v1.AnyValue.decode(reader, reader.uint32());
                      break;
                    }
                    case 6: {
                      if (!(message.attributes && message.attributes.length))
                        message.attributes = [];
                      message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                      break;
                    }
                    case 7: {
                      message.droppedAttributesCount = reader.uint32();
                      break;
                    }
                    case 8: {
                      message.flags = reader.fixed32();
                      break;
                    }
                    case 9: {
                      message.traceId = reader.bytes();
                      break;
                    }
                    case 10: {
                      message.spanId = reader.bytes();
                      break;
                    }
                    case 12: {
                      message.eventName = reader.string();
                      break;
                    }
                    default:
                      reader.skipType(tag & 7);
                      break;
                  }
                }
                return message;
              };
              LogRecord.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                  reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
              };
              LogRecord.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                  return "object expected";
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                  if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                    return "timeUnixNano: integer|Long expected";
                }
                if (message.observedTimeUnixNano != null && message.hasOwnProperty("observedTimeUnixNano")) {
                  if (!$util.isInteger(message.observedTimeUnixNano) && !(message.observedTimeUnixNano && $util.isInteger(message.observedTimeUnixNano.low) && $util.isInteger(message.observedTimeUnixNano.high)))
                    return "observedTimeUnixNano: integer|Long expected";
                }
                if (message.severityNumber != null && message.hasOwnProperty("severityNumber"))
                  switch (message.severityNumber) {
                    default:
                      return "severityNumber: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                      break;
                  }
                if (message.severityText != null && message.hasOwnProperty("severityText")) {
                  if (!$util.isString(message.severityText))
                    return "severityText: string expected";
                }
                if (message.body != null && message.hasOwnProperty("body")) {
                  var error = $root.opentelemetry.proto.common.v1.AnyValue.verify(message.body);
                  if (error)
                    return "body." + error;
                }
                if (message.attributes != null && message.hasOwnProperty("attributes")) {
                  if (!Array.isArray(message.attributes))
                    return "attributes: array expected";
                  for (var i = 0; i < message.attributes.length; ++i) {
                    var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                    if (error)
                      return "attributes." + error;
                  }
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                  if (!$util.isInteger(message.droppedAttributesCount))
                    return "droppedAttributesCount: integer expected";
                }
                if (message.flags != null && message.hasOwnProperty("flags")) {
                  if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
                }
                if (message.traceId != null && message.hasOwnProperty("traceId")) {
                  if (!(message.traceId && typeof message.traceId.length === "number" || $util.isString(message.traceId)))
                    return "traceId: buffer expected";
                }
                if (message.spanId != null && message.hasOwnProperty("spanId")) {
                  if (!(message.spanId && typeof message.spanId.length === "number" || $util.isString(message.spanId)))
                    return "spanId: buffer expected";
                }
                if (message.eventName != null && message.hasOwnProperty("eventName")) {
                  if (!$util.isString(message.eventName))
                    return "eventName: string expected";
                }
                return null;
              };
              LogRecord.fromObject = function fromObject(object) {
                if (object instanceof $root.opentelemetry.proto.logs.v1.LogRecord)
                  return object;
                var message = new $root.opentelemetry.proto.logs.v1.LogRecord();
                if (object.timeUnixNano != null) {
                  if ($util.Long)
                    (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                  else if (typeof object.timeUnixNano === "string")
                    message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                  else if (typeof object.timeUnixNano === "number")
                    message.timeUnixNano = object.timeUnixNano;
                  else if (typeof object.timeUnixNano === "object")
                    message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                }
                if (object.observedTimeUnixNano != null) {
                  if ($util.Long)
                    (message.observedTimeUnixNano = $util.Long.fromValue(object.observedTimeUnixNano)).unsigned = false;
                  else if (typeof object.observedTimeUnixNano === "string")
                    message.observedTimeUnixNano = parseInt(object.observedTimeUnixNano, 10);
                  else if (typeof object.observedTimeUnixNano === "number")
                    message.observedTimeUnixNano = object.observedTimeUnixNano;
                  else if (typeof object.observedTimeUnixNano === "object")
                    message.observedTimeUnixNano = new $util.LongBits(object.observedTimeUnixNano.low >>> 0, object.observedTimeUnixNano.high >>> 0).toNumber();
                }
                switch (object.severityNumber) {
                  default:
                    if (typeof object.severityNumber === "number") {
                      message.severityNumber = object.severityNumber;
                      break;
                    }
                    break;
                  case "SEVERITY_NUMBER_UNSPECIFIED":
                  case 0:
                    message.severityNumber = 0;
                    break;
                  case "SEVERITY_NUMBER_TRACE":
                  case 1:
                    message.severityNumber = 1;
                    break;
                  case "SEVERITY_NUMBER_TRACE2":
                  case 2:
                    message.severityNumber = 2;
                    break;
                  case "SEVERITY_NUMBER_TRACE3":
                  case 3:
                    message.severityNumber = 3;
                    break;
                  case "SEVERITY_NUMBER_TRACE4":
                  case 4:
                    message.severityNumber = 4;
                    break;
                  case "SEVERITY_NUMBER_DEBUG":
                  case 5:
                    message.severityNumber = 5;
                    break;
                  case "SEVERITY_NUMBER_DEBUG2":
                  case 6:
                    message.severityNumber = 6;
                    break;
                  case "SEVERITY_NUMBER_DEBUG3":
                  case 7:
                    message.severityNumber = 7;
                    break;
                  case "SEVERITY_NUMBER_DEBUG4":
                  case 8:
                    message.severityNumber = 8;
                    break;
                  case "SEVERITY_NUMBER_INFO":
                  case 9:
                    message.severityNumber = 9;
                    break;
                  case "SEVERITY_NUMBER_INFO2":
                  case 10:
                    message.severityNumber = 10;
                    break;
                  case "SEVERITY_NUMBER_INFO3":
                  case 11:
                    message.severityNumber = 11;
                    break;
                  case "SEVERITY_NUMBER_INFO4":
                  case 12:
                    message.severityNumber = 12;
                    break;
                  case "SEVERITY_NUMBER_WARN":
                  case 13:
                    message.severityNumber = 13;
                    break;
                  case "SEVERITY_NUMBER_WARN2":
                  case 14:
                    message.severityNumber = 14;
                    break;
                  case "SEVERITY_NUMBER_WARN3":
                  case 15:
                    message.severityNumber = 15;
                    break;
                  case "SEVERITY_NUMBER_WARN4":
                  case 16:
                    message.severityNumber = 16;
                    break;
                  case "SEVERITY_NUMBER_ERROR":
                  case 17:
                    message.severityNumber = 17;
                    break;
                  case "SEVERITY_NUMBER_ERROR2":
                  case 18:
                    message.severityNumber = 18;
                    break;
                  case "SEVERITY_NUMBER_ERROR3":
                  case 19:
                    message.severityNumber = 19;
                    break;
                  case "SEVERITY_NUMBER_ERROR4":
                  case 20:
                    message.severityNumber = 20;
                    break;
                  case "SEVERITY_NUMBER_FATAL":
                  case 21:
                    message.severityNumber = 21;
                    break;
                  case "SEVERITY_NUMBER_FATAL2":
                  case 22:
                    message.severityNumber = 22;
                    break;
                  case "SEVERITY_NUMBER_FATAL3":
                  case 23:
                    message.severityNumber = 23;
                    break;
                  case "SEVERITY_NUMBER_FATAL4":
                  case 24:
                    message.severityNumber = 24;
                    break;
                }
                if (object.severityText != null)
                  message.severityText = String(object.severityText);
                if (object.body != null) {
                  if (typeof object.body !== "object")
                    throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.body: object expected");
                  message.body = $root.opentelemetry.proto.common.v1.AnyValue.fromObject(object.body);
                }
                if (object.attributes) {
                  if (!Array.isArray(object.attributes))
                    throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.attributes: array expected");
                  message.attributes = [];
                  for (var i = 0; i < object.attributes.length; ++i) {
                    if (typeof object.attributes[i] !== "object")
                      throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.attributes: object expected");
                    message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                  }
                }
                if (object.droppedAttributesCount != null)
                  message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                if (object.flags != null)
                  message.flags = object.flags >>> 0;
                if (object.traceId != null) {
                  if (typeof object.traceId === "string")
                    $util.base64.decode(object.traceId, message.traceId = $util.newBuffer($util.base64.length(object.traceId)), 0);
                  else if (object.traceId.length >= 0)
                    message.traceId = object.traceId;
                }
                if (object.spanId != null) {
                  if (typeof object.spanId === "string")
                    $util.base64.decode(object.spanId, message.spanId = $util.newBuffer($util.base64.length(object.spanId)), 0);
                  else if (object.spanId.length >= 0)
                    message.spanId = object.spanId;
                }
                if (object.eventName != null)
                  message.eventName = String(object.eventName);
                return message;
              };
              LogRecord.toObject = function toObject(message, options2) {
                if (!options2)
                  options2 = {};
                var object = {};
                if (options2.arrays || options2.defaults)
                  object.attributes = [];
                if (options2.defaults) {
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.timeUnixNano = options2.longs === String ? "0" : 0;
                  object.severityNumber = options2.enums === String ? "SEVERITY_NUMBER_UNSPECIFIED" : 0;
                  object.severityText = "";
                  object.body = null;
                  object.droppedAttributesCount = 0;
                  object.flags = 0;
                  if (options2.bytes === String)
                    object.traceId = "";
                  else {
                    object.traceId = [];
                    if (options2.bytes !== Array)
                      object.traceId = $util.newBuffer(object.traceId);
                  }
                  if (options2.bytes === String)
                    object.spanId = "";
                  else {
                    object.spanId = [];
                    if (options2.bytes !== Array)
                      object.spanId = $util.newBuffer(object.spanId);
                  }
                  if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.observedTimeUnixNano = options2.longs === String ? long.toString() : options2.longs === Number ? long.toNumber() : long;
                  } else
                    object.observedTimeUnixNano = options2.longs === String ? "0" : 0;
                  object.eventName = "";
                }
                if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                  if (typeof message.timeUnixNano === "number")
                    object.timeUnixNano = options2.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                  else
                    object.timeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options2.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                if (message.severityNumber != null && message.hasOwnProperty("severityNumber"))
                  object.severityNumber = options2.enums === String ? $root.opentelemetry.proto.logs.v1.SeverityNumber[message.severityNumber] === void 0 ? message.severityNumber : $root.opentelemetry.proto.logs.v1.SeverityNumber[message.severityNumber] : message.severityNumber;
                if (message.severityText != null && message.hasOwnProperty("severityText"))
                  object.severityText = message.severityText;
                if (message.body != null && message.hasOwnProperty("body"))
                  object.body = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.body, options2);
                if (message.attributes && message.attributes.length) {
                  object.attributes = [];
                  for (var j = 0; j < message.attributes.length; ++j)
                    object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options2);
                }
                if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                  object.droppedAttributesCount = message.droppedAttributesCount;
                if (message.flags != null && message.hasOwnProperty("flags"))
                  object.flags = message.flags;
                if (message.traceId != null && message.hasOwnProperty("traceId"))
                  object.traceId = options2.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                if (message.spanId != null && message.hasOwnProperty("spanId"))
                  object.spanId = options2.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options2.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                if (message.observedTimeUnixNano != null && message.hasOwnProperty("observedTimeUnixNano"))
                  if (typeof message.observedTimeUnixNano === "number")
                    object.observedTimeUnixNano = options2.longs === String ? String(message.observedTimeUnixNano) : message.observedTimeUnixNano;
                  else
                    object.observedTimeUnixNano = options2.longs === String ? $util.Long.prototype.toString.call(message.observedTimeUnixNano) : options2.longs === Number ? new $util.LongBits(message.observedTimeUnixNano.low >>> 0, message.observedTimeUnixNano.high >>> 0).toNumber() : message.observedTimeUnixNano;
                if (message.eventName != null && message.hasOwnProperty("eventName"))
                  object.eventName = message.eventName;
                return object;
              };
              LogRecord.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
              };
              LogRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === void 0) {
                  typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/opentelemetry.proto.logs.v1.LogRecord";
              };
              return LogRecord;
            }();
            return v1;
          }();
          return logs;
        }();
        return proto;
      }();
      return opentelemetry4;
    }();
    module2.exports = $root;
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/common/hex-to-binary.js
function intValue(charCode) {
  if (charCode >= 48 && charCode <= 57) {
    return charCode - 48;
  }
  if (charCode >= 97 && charCode <= 102) {
    return charCode - 87;
  }
  return charCode - 55;
}
function hexToBinary(hexStr) {
  const buf = new Uint8Array(hexStr.length / 2);
  let offset = 0;
  for (let i = 0; i < hexStr.length; i += 2) {
    const hi = intValue(hexStr.charCodeAt(i));
    const lo = intValue(hexStr.charCodeAt(i + 1));
    buf[offset++] = hi << 4 | lo;
  }
  return buf;
}
var init_hex_to_binary = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/common/hex-to-binary.js"() {
    "use strict";
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/common/utils.js
function hrTimeToNanos(hrTime2) {
  const NANOSECONDS = BigInt(1e9);
  return BigInt(Math.trunc(hrTime2[0])) * NANOSECONDS + BigInt(Math.trunc(hrTime2[1]));
}
function toLongBits(value) {
  const low = Number(BigInt.asUintN(32, value));
  const high = Number(BigInt.asUintN(32, value >> BigInt(32)));
  return { low, high };
}
function encodeAsLongBits(hrTime2) {
  const nanos = hrTimeToNanos(hrTime2);
  return toLongBits(nanos);
}
function encodeAsString(hrTime2) {
  const nanos = hrTimeToNanos(hrTime2);
  return nanos.toString();
}
function identity(value) {
  return value;
}
function optionalHexToBinary(str) {
  if (str === void 0)
    return void 0;
  return hexToBinary(str);
}
function getOtlpEncoder(options2) {
  if (options2 === void 0) {
    return DEFAULT_ENCODER;
  }
  const useLongBits = options2.useLongBits ?? true;
  const useHex = options2.useHex ?? false;
  return {
    encodeHrTime: useLongBits ? encodeAsLongBits : encodeTimestamp,
    encodeSpanContext: useHex ? identity : hexToBinary,
    encodeOptionalSpanContext: useHex ? identity : optionalHexToBinary
  };
}
var encodeTimestamp, DEFAULT_ENCODER;
var init_utils2 = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/common/utils.js"() {
    "use strict";
    init_esm2();
    init_hex_to_binary();
    encodeTimestamp = typeof BigInt !== "undefined" ? encodeAsString : hrTimeToNanoseconds;
    DEFAULT_ENCODER = {
      encodeHrTime: encodeAsLongBits,
      encodeSpanContext: hexToBinary,
      encodeOptionalSpanContext: optionalHexToBinary
    };
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/common/internal.js
function createResource(resource) {
  const result = {
    attributes: toAttributes(resource.attributes),
    droppedAttributesCount: 0
  };
  const schemaUrl = resource.schemaUrl;
  if (schemaUrl && schemaUrl !== "")
    result.schemaUrl = schemaUrl;
  return result;
}
function createInstrumentationScope(scope) {
  return {
    name: scope.name,
    version: scope.version
  };
}
function toAttributes(attributes) {
  return Object.keys(attributes).map((key) => toKeyValue(key, attributes[key]));
}
function toKeyValue(key, value) {
  return {
    key,
    value: toAnyValue(value)
  };
}
function toAnyValue(value) {
  const t = typeof value;
  if (t === "string")
    return { stringValue: value };
  if (t === "number") {
    if (!Number.isInteger(value))
      return { doubleValue: value };
    return { intValue: value };
  }
  if (t === "boolean")
    return { boolValue: value };
  if (value instanceof Uint8Array)
    return { bytesValue: value };
  if (Array.isArray(value))
    return { arrayValue: { values: value.map(toAnyValue) } };
  if (t === "object" && value != null)
    return {
      kvlistValue: {
        values: Object.entries(value).map(([k, v]) => toKeyValue(k, v))
      }
    };
  return {};
}
var init_internal = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/common/internal.js"() {
    "use strict";
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/logs/internal.js
function createExportLogsServiceRequest(logRecords, options2) {
  const encoder = getOtlpEncoder(options2);
  return {
    resourceLogs: logRecordsToResourceLogs(logRecords, encoder)
  };
}
function createResourceMap(logRecords) {
  const resourceMap = /* @__PURE__ */ new Map();
  for (const record of logRecords) {
    const { resource, instrumentationScope: { name, version = "", schemaUrl = "" } } = record;
    let ismMap = resourceMap.get(resource);
    if (!ismMap) {
      ismMap = /* @__PURE__ */ new Map();
      resourceMap.set(resource, ismMap);
    }
    const ismKey = `${name}@${version}:${schemaUrl}`;
    let records = ismMap.get(ismKey);
    if (!records) {
      records = [];
      ismMap.set(ismKey, records);
    }
    records.push(record);
  }
  return resourceMap;
}
function logRecordsToResourceLogs(logRecords, encoder) {
  const resourceMap = createResourceMap(logRecords);
  return Array.from(resourceMap, ([resource, ismMap]) => {
    const processedResource = createResource(resource);
    return {
      resource: processedResource,
      scopeLogs: Array.from(ismMap, ([, scopeLogs]) => {
        return {
          scope: createInstrumentationScope(scopeLogs[0].instrumentationScope),
          logRecords: scopeLogs.map((log) => toLogRecord(log, encoder)),
          schemaUrl: scopeLogs[0].instrumentationScope.schemaUrl
        };
      }),
      schemaUrl: processedResource.schemaUrl
    };
  });
}
function toLogRecord(log, encoder) {
  return {
    timeUnixNano: encoder.encodeHrTime(log.hrTime),
    observedTimeUnixNano: encoder.encodeHrTime(log.hrTimeObserved),
    severityNumber: toSeverityNumber(log.severityNumber),
    severityText: log.severityText,
    body: toAnyValue(log.body),
    eventName: log.eventName,
    attributes: toLogAttributes(log.attributes),
    droppedAttributesCount: log.droppedAttributesCount,
    flags: log.spanContext?.traceFlags,
    traceId: encoder.encodeOptionalSpanContext(log.spanContext?.traceId),
    spanId: encoder.encodeOptionalSpanContext(log.spanContext?.spanId)
  };
}
function toSeverityNumber(severityNumber) {
  return severityNumber;
}
function toLogAttributes(attributes) {
  return Object.keys(attributes).map((key) => toKeyValue(key, attributes[key]));
}
var init_internal2 = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/logs/internal.js"() {
    "use strict";
    init_utils2();
    init_internal();
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/logs/protobuf/logs.js
var root, logsResponseType, logsRequestType, ProtobufLogsSerializer;
var init_logs = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/logs/protobuf/logs.js"() {
    "use strict";
    root = __toESM(require_root());
    init_internal2();
    logsResponseType = root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse;
    logsRequestType = root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest;
    ProtobufLogsSerializer = {
      serializeRequest: (arg) => {
        const request = createExportLogsServiceRequest(arg);
        return logsRequestType.encode(request).finish();
      },
      deserializeResponse: (arg) => {
        return logsResponseType.decode(arg);
      }
    };
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/logs/protobuf/index.js
var init_protobuf = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/logs/protobuf/index.js"() {
    "use strict";
    init_logs();
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/metrics/internal-types.js
var EAggregationTemporality;
var init_internal_types = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/metrics/internal-types.js"() {
    "use strict";
    (function(EAggregationTemporality2) {
      EAggregationTemporality2[EAggregationTemporality2["AGGREGATION_TEMPORALITY_UNSPECIFIED"] = 0] = "AGGREGATION_TEMPORALITY_UNSPECIFIED";
      EAggregationTemporality2[EAggregationTemporality2["AGGREGATION_TEMPORALITY_DELTA"] = 1] = "AGGREGATION_TEMPORALITY_DELTA";
      EAggregationTemporality2[EAggregationTemporality2["AGGREGATION_TEMPORALITY_CUMULATIVE"] = 2] = "AGGREGATION_TEMPORALITY_CUMULATIVE";
    })(EAggregationTemporality || (EAggregationTemporality = {}));
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/metrics/internal.js
function toResourceMetrics(resourceMetrics, options2) {
  const encoder = getOtlpEncoder(options2);
  const processedResource = createResource(resourceMetrics.resource);
  return {
    resource: processedResource,
    schemaUrl: processedResource.schemaUrl,
    scopeMetrics: toScopeMetrics(resourceMetrics.scopeMetrics, encoder)
  };
}
function toScopeMetrics(scopeMetrics, encoder) {
  return Array.from(scopeMetrics.map((metrics) => ({
    scope: createInstrumentationScope(metrics.scope),
    metrics: metrics.metrics.map((metricData) => toMetric(metricData, encoder)),
    schemaUrl: metrics.scope.schemaUrl
  })));
}
function toMetric(metricData, encoder) {
  const out = {
    name: metricData.descriptor.name,
    description: metricData.descriptor.description,
    unit: metricData.descriptor.unit
  };
  const aggregationTemporality = toAggregationTemporality(metricData.aggregationTemporality);
  switch (metricData.dataPointType) {
    case import_sdk_metrics.DataPointType.SUM:
      out.sum = {
        aggregationTemporality,
        isMonotonic: metricData.isMonotonic,
        dataPoints: toSingularDataPoints(metricData, encoder)
      };
      break;
    case import_sdk_metrics.DataPointType.GAUGE:
      out.gauge = {
        dataPoints: toSingularDataPoints(metricData, encoder)
      };
      break;
    case import_sdk_metrics.DataPointType.HISTOGRAM:
      out.histogram = {
        aggregationTemporality,
        dataPoints: toHistogramDataPoints(metricData, encoder)
      };
      break;
    case import_sdk_metrics.DataPointType.EXPONENTIAL_HISTOGRAM:
      out.exponentialHistogram = {
        aggregationTemporality,
        dataPoints: toExponentialHistogramDataPoints(metricData, encoder)
      };
      break;
  }
  return out;
}
function toSingularDataPoint(dataPoint, valueType, encoder) {
  const out = {
    attributes: toAttributes(dataPoint.attributes),
    startTimeUnixNano: encoder.encodeHrTime(dataPoint.startTime),
    timeUnixNano: encoder.encodeHrTime(dataPoint.endTime)
  };
  switch (valueType) {
    case import_api18.ValueType.INT:
      out.asInt = dataPoint.value;
      break;
    case import_api18.ValueType.DOUBLE:
      out.asDouble = dataPoint.value;
      break;
  }
  return out;
}
function toSingularDataPoints(metricData, encoder) {
  return metricData.dataPoints.map((dataPoint) => {
    return toSingularDataPoint(dataPoint, metricData.descriptor.valueType, encoder);
  });
}
function toHistogramDataPoints(metricData, encoder) {
  return metricData.dataPoints.map((dataPoint) => {
    const histogram = dataPoint.value;
    return {
      attributes: toAttributes(dataPoint.attributes),
      bucketCounts: histogram.buckets.counts,
      explicitBounds: histogram.buckets.boundaries,
      count: histogram.count,
      sum: histogram.sum,
      min: histogram.min,
      max: histogram.max,
      startTimeUnixNano: encoder.encodeHrTime(dataPoint.startTime),
      timeUnixNano: encoder.encodeHrTime(dataPoint.endTime)
    };
  });
}
function toExponentialHistogramDataPoints(metricData, encoder) {
  return metricData.dataPoints.map((dataPoint) => {
    const histogram = dataPoint.value;
    return {
      attributes: toAttributes(dataPoint.attributes),
      count: histogram.count,
      min: histogram.min,
      max: histogram.max,
      sum: histogram.sum,
      positive: {
        offset: histogram.positive.offset,
        bucketCounts: histogram.positive.bucketCounts
      },
      negative: {
        offset: histogram.negative.offset,
        bucketCounts: histogram.negative.bucketCounts
      },
      scale: histogram.scale,
      zeroCount: histogram.zeroCount,
      startTimeUnixNano: encoder.encodeHrTime(dataPoint.startTime),
      timeUnixNano: encoder.encodeHrTime(dataPoint.endTime)
    };
  });
}
function toAggregationTemporality(temporality) {
  switch (temporality) {
    case import_sdk_metrics.AggregationTemporality.DELTA:
      return EAggregationTemporality.AGGREGATION_TEMPORALITY_DELTA;
    case import_sdk_metrics.AggregationTemporality.CUMULATIVE:
      return EAggregationTemporality.AGGREGATION_TEMPORALITY_CUMULATIVE;
  }
}
function createExportMetricsServiceRequest(resourceMetrics, options2) {
  return {
    resourceMetrics: resourceMetrics.map((metrics) => toResourceMetrics(metrics, options2))
  };
}
var import_api18, import_sdk_metrics;
var init_internal3 = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/metrics/internal.js"() {
    "use strict";
    import_api18 = require("@opentelemetry/api");
    import_sdk_metrics = require("@opentelemetry/sdk-metrics");
    init_internal_types();
    init_utils2();
    init_internal();
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/metrics/protobuf/metrics.js
var root2, metricsResponseType, metricsRequestType, ProtobufMetricsSerializer;
var init_metrics = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/metrics/protobuf/metrics.js"() {
    "use strict";
    root2 = __toESM(require_root());
    init_internal3();
    metricsResponseType = root2.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse;
    metricsRequestType = root2.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest;
    ProtobufMetricsSerializer = {
      serializeRequest: (arg) => {
        const request = createExportMetricsServiceRequest([arg]);
        return metricsRequestType.encode(request).finish();
      },
      deserializeResponse: (arg) => {
        return metricsResponseType.decode(arg);
      }
    };
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/metrics/protobuf/index.js
var init_protobuf2 = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/metrics/protobuf/index.js"() {
    "use strict";
    init_metrics();
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/trace/internal.js
function buildSpanFlagsFrom(traceFlags, isRemote) {
  let flags = traceFlags & 255 | SPAN_FLAGS_CONTEXT_HAS_IS_REMOTE_MASK;
  if (isRemote) {
    flags |= SPAN_FLAGS_CONTEXT_IS_REMOTE_MASK;
  }
  return flags;
}
function sdkSpanToOtlpSpan(span, encoder) {
  const ctx = span.spanContext();
  const status = span.status;
  const parentSpanId = span.parentSpanContext?.spanId ? encoder.encodeSpanContext(span.parentSpanContext?.spanId) : void 0;
  return {
    traceId: encoder.encodeSpanContext(ctx.traceId),
    spanId: encoder.encodeSpanContext(ctx.spanId),
    parentSpanId,
    traceState: ctx.traceState?.serialize(),
    name: span.name,
    // Span kind is offset by 1 because the API does not define a value for unset
    kind: span.kind == null ? 0 : span.kind + 1,
    startTimeUnixNano: encoder.encodeHrTime(span.startTime),
    endTimeUnixNano: encoder.encodeHrTime(span.endTime),
    attributes: toAttributes(span.attributes),
    droppedAttributesCount: span.droppedAttributesCount,
    events: span.events.map((event) => toOtlpSpanEvent(event, encoder)),
    droppedEventsCount: span.droppedEventsCount,
    status: {
      // API and proto enums share the same values
      code: status.code,
      message: status.message
    },
    links: span.links.map((link) => toOtlpLink(link, encoder)),
    droppedLinksCount: span.droppedLinksCount,
    flags: buildSpanFlagsFrom(ctx.traceFlags, span.parentSpanContext?.isRemote)
  };
}
function toOtlpLink(link, encoder) {
  return {
    attributes: link.attributes ? toAttributes(link.attributes) : [],
    spanId: encoder.encodeSpanContext(link.context.spanId),
    traceId: encoder.encodeSpanContext(link.context.traceId),
    traceState: link.context.traceState?.serialize(),
    droppedAttributesCount: link.droppedAttributesCount || 0,
    flags: buildSpanFlagsFrom(link.context.traceFlags, link.context.isRemote)
  };
}
function toOtlpSpanEvent(timedEvent, encoder) {
  return {
    attributes: timedEvent.attributes ? toAttributes(timedEvent.attributes) : [],
    name: timedEvent.name,
    timeUnixNano: encoder.encodeHrTime(timedEvent.time),
    droppedAttributesCount: timedEvent.droppedAttributesCount || 0
  };
}
function createExportTraceServiceRequest(spans, options2) {
  const encoder = getOtlpEncoder(options2);
  return {
    resourceSpans: spanRecordsToResourceSpans(spans, encoder)
  };
}
function createResourceMap2(readableSpans) {
  const resourceMap = /* @__PURE__ */ new Map();
  for (const record of readableSpans) {
    let ilsMap = resourceMap.get(record.resource);
    if (!ilsMap) {
      ilsMap = /* @__PURE__ */ new Map();
      resourceMap.set(record.resource, ilsMap);
    }
    const instrumentationScopeKey = `${record.instrumentationScope.name}@${record.instrumentationScope.version || ""}:${record.instrumentationScope.schemaUrl || ""}`;
    let records = ilsMap.get(instrumentationScopeKey);
    if (!records) {
      records = [];
      ilsMap.set(instrumentationScopeKey, records);
    }
    records.push(record);
  }
  return resourceMap;
}
function spanRecordsToResourceSpans(readableSpans, encoder) {
  const resourceMap = createResourceMap2(readableSpans);
  const out = [];
  const entryIterator = resourceMap.entries();
  let entry = entryIterator.next();
  while (!entry.done) {
    const [resource, ilmMap] = entry.value;
    const scopeResourceSpans = [];
    const ilmIterator = ilmMap.values();
    let ilmEntry = ilmIterator.next();
    while (!ilmEntry.done) {
      const scopeSpans = ilmEntry.value;
      if (scopeSpans.length > 0) {
        const spans = scopeSpans.map((readableSpan) => sdkSpanToOtlpSpan(readableSpan, encoder));
        scopeResourceSpans.push({
          scope: createInstrumentationScope(scopeSpans[0].instrumentationScope),
          spans,
          schemaUrl: scopeSpans[0].instrumentationScope.schemaUrl
        });
      }
      ilmEntry = ilmIterator.next();
    }
    const processedResource = createResource(resource);
    const transformedSpans = {
      resource: processedResource,
      scopeSpans: scopeResourceSpans,
      schemaUrl: processedResource.schemaUrl
    };
    out.push(transformedSpans);
    entry = entryIterator.next();
  }
  return out;
}
var SPAN_FLAGS_CONTEXT_HAS_IS_REMOTE_MASK, SPAN_FLAGS_CONTEXT_IS_REMOTE_MASK;
var init_internal4 = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/trace/internal.js"() {
    "use strict";
    init_internal();
    init_utils2();
    SPAN_FLAGS_CONTEXT_HAS_IS_REMOTE_MASK = 256;
    SPAN_FLAGS_CONTEXT_IS_REMOTE_MASK = 512;
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/trace/protobuf/trace.js
var root3, traceResponseType, traceRequestType, ProtobufTraceSerializer;
var init_trace2 = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/trace/protobuf/trace.js"() {
    "use strict";
    root3 = __toESM(require_root());
    init_internal4();
    traceResponseType = root3.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse;
    traceRequestType = root3.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest;
    ProtobufTraceSerializer = {
      serializeRequest: (arg) => {
        const request = createExportTraceServiceRequest(arg);
        return traceRequestType.encode(request).finish();
      },
      deserializeResponse: (arg) => {
        return traceResponseType.decode(arg);
      }
    };
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/trace/protobuf/index.js
var init_protobuf3 = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/trace/protobuf/index.js"() {
    "use strict";
    init_trace2();
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/logs/json/logs.js
var JsonLogsSerializer;
var init_logs2 = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/logs/json/logs.js"() {
    "use strict";
    init_internal2();
    JsonLogsSerializer = {
      serializeRequest: (arg) => {
        const request = createExportLogsServiceRequest(arg, {
          useHex: true,
          useLongBits: false
        });
        const encoder = new TextEncoder();
        return encoder.encode(JSON.stringify(request));
      },
      deserializeResponse: (arg) => {
        if (arg.length === 0) {
          return {};
        }
        const decoder = new TextDecoder();
        return JSON.parse(decoder.decode(arg));
      }
    };
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/logs/json/index.js
var init_json = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/logs/json/index.js"() {
    "use strict";
    init_logs2();
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/metrics/json/metrics.js
var JsonMetricsSerializer;
var init_metrics2 = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/metrics/json/metrics.js"() {
    "use strict";
    init_internal3();
    JsonMetricsSerializer = {
      serializeRequest: (arg) => {
        const request = createExportMetricsServiceRequest([arg], {
          useLongBits: false
        });
        const encoder = new TextEncoder();
        return encoder.encode(JSON.stringify(request));
      },
      deserializeResponse: (arg) => {
        if (arg.length === 0) {
          return {};
        }
        const decoder = new TextDecoder();
        return JSON.parse(decoder.decode(arg));
      }
    };
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/metrics/json/index.js
var init_json2 = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/metrics/json/index.js"() {
    "use strict";
    init_metrics2();
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/trace/json/trace.js
var JsonTraceSerializer;
var init_trace3 = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/trace/json/trace.js"() {
    "use strict";
    init_internal4();
    JsonTraceSerializer = {
      serializeRequest: (arg) => {
        const request = createExportTraceServiceRequest(arg, {
          useHex: true,
          useLongBits: false
        });
        const encoder = new TextEncoder();
        return encoder.encode(JSON.stringify(request));
      },
      deserializeResponse: (arg) => {
        if (arg.length === 0) {
          return {};
        }
        const decoder = new TextDecoder();
        return JSON.parse(decoder.decode(arg));
      }
    };
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/trace/json/index.js
var init_json3 = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/trace/json/index.js"() {
    "use strict";
    init_trace3();
  }
});

// node_modules/@opentelemetry/otlp-transformer/build/esm/index.js
var esm_exports3 = {};
__export(esm_exports3, {
  JsonLogsSerializer: () => JsonLogsSerializer,
  JsonMetricsSerializer: () => JsonMetricsSerializer,
  JsonTraceSerializer: () => JsonTraceSerializer,
  ProtobufLogsSerializer: () => ProtobufLogsSerializer,
  ProtobufMetricsSerializer: () => ProtobufMetricsSerializer,
  ProtobufTraceSerializer: () => ProtobufTraceSerializer
});
var init_esm4 = __esm({
  "node_modules/@opentelemetry/otlp-transformer/build/esm/index.js"() {
    "use strict";
    init_protobuf();
    init_protobuf2();
    init_protobuf3();
    init_json();
    init_json2();
    init_json3();
  }
});

// node_modules/@opentelemetry/exporter-trace-otlp-grpc/build/src/OTLPTraceExporter.js
var require_OTLPTraceExporter = __commonJS({
  "node_modules/@opentelemetry/exporter-trace-otlp-grpc/build/src/OTLPTraceExporter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OTLPTraceExporter = void 0;
    var otlp_grpc_exporter_base_1 = require_src();
    var otlp_transformer_1 = (init_esm4(), __toCommonJS(esm_exports3));
    var otlp_exporter_base_1 = (init_esm3(), __toCommonJS(esm_exports2));
    var OTLPTraceExporter2 = class extends otlp_exporter_base_1.OTLPExporterBase {
      constructor(config2 = {}) {
        super((0, otlp_grpc_exporter_base_1.createOtlpGrpcExportDelegate)((0, otlp_grpc_exporter_base_1.convertLegacyOtlpGrpcOptions)(config2, "TRACES"), otlp_transformer_1.ProtobufTraceSerializer, "TraceExportService", "/opentelemetry.proto.collector.trace.v1.TraceService/Export"));
      }
    };
    exports2.OTLPTraceExporter = OTLPTraceExporter2;
  }
});

// node_modules/@opentelemetry/exporter-trace-otlp-grpc/build/src/index.js
var require_src2 = __commonJS({
  "node_modules/@opentelemetry/exporter-trace-otlp-grpc/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OTLPTraceExporter = void 0;
    var OTLPTraceExporter_1 = require_OTLPTraceExporter();
    Object.defineProperty(exports2, "OTLPTraceExporter", { enumerable: true, get: function() {
      return OTLPTraceExporter_1.OTLPTraceExporter;
    } });
  }
});

// node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/OTLPMetricExporterOptions.js
var AggregationTemporalityPreference;
var init_OTLPMetricExporterOptions = __esm({
  "node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/OTLPMetricExporterOptions.js"() {
    "use strict";
    (function(AggregationTemporalityPreference2) {
      AggregationTemporalityPreference2[AggregationTemporalityPreference2["DELTA"] = 0] = "DELTA";
      AggregationTemporalityPreference2[AggregationTemporalityPreference2["CUMULATIVE"] = 1] = "CUMULATIVE";
      AggregationTemporalityPreference2[AggregationTemporalityPreference2["LOWMEMORY"] = 2] = "LOWMEMORY";
    })(AggregationTemporalityPreference || (AggregationTemporalityPreference = {}));
  }
});

// node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/OTLPMetricExporterBase.js
function chooseTemporalitySelectorFromEnvironment() {
  const configuredTemporality = (getStringFromEnv("OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE") ?? "cumulative").toLowerCase();
  if (configuredTemporality === "cumulative") {
    return CumulativeTemporalitySelector;
  }
  if (configuredTemporality === "delta") {
    return DeltaTemporalitySelector;
  }
  if (configuredTemporality === "lowmemory") {
    return LowMemoryTemporalitySelector;
  }
  import_api19.diag.warn(`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE is set to '${configuredTemporality}', but only 'cumulative' and 'delta' are allowed. Using default ('cumulative') instead.`);
  return CumulativeTemporalitySelector;
}
function chooseTemporalitySelector(temporalityPreference) {
  if (temporalityPreference != null) {
    if (temporalityPreference === AggregationTemporalityPreference.DELTA) {
      return DeltaTemporalitySelector;
    } else if (temporalityPreference === AggregationTemporalityPreference.LOWMEMORY) {
      return LowMemoryTemporalitySelector;
    }
    return CumulativeTemporalitySelector;
  }
  return chooseTemporalitySelectorFromEnvironment();
}
function chooseAggregationSelector(config2) {
  return config2?.aggregationPreference ?? (() => DEFAULT_AGGREGATION);
}
var import_sdk_metrics2, import_api19, CumulativeTemporalitySelector, DeltaTemporalitySelector, LowMemoryTemporalitySelector, DEFAULT_AGGREGATION, OTLPMetricExporterBase;
var init_OTLPMetricExporterBase = __esm({
  "node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/OTLPMetricExporterBase.js"() {
    "use strict";
    init_esm2();
    import_sdk_metrics2 = require("@opentelemetry/sdk-metrics");
    init_OTLPMetricExporterOptions();
    init_esm3();
    import_api19 = require("@opentelemetry/api");
    CumulativeTemporalitySelector = () => import_sdk_metrics2.AggregationTemporality.CUMULATIVE;
    DeltaTemporalitySelector = (instrumentType) => {
      switch (instrumentType) {
        case import_sdk_metrics2.InstrumentType.COUNTER:
        case import_sdk_metrics2.InstrumentType.OBSERVABLE_COUNTER:
        case import_sdk_metrics2.InstrumentType.GAUGE:
        case import_sdk_metrics2.InstrumentType.HISTOGRAM:
        case import_sdk_metrics2.InstrumentType.OBSERVABLE_GAUGE:
          return import_sdk_metrics2.AggregationTemporality.DELTA;
        case import_sdk_metrics2.InstrumentType.UP_DOWN_COUNTER:
        case import_sdk_metrics2.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER:
          return import_sdk_metrics2.AggregationTemporality.CUMULATIVE;
      }
    };
    LowMemoryTemporalitySelector = (instrumentType) => {
      switch (instrumentType) {
        case import_sdk_metrics2.InstrumentType.COUNTER:
        case import_sdk_metrics2.InstrumentType.HISTOGRAM:
          return import_sdk_metrics2.AggregationTemporality.DELTA;
        case import_sdk_metrics2.InstrumentType.GAUGE:
        case import_sdk_metrics2.InstrumentType.UP_DOWN_COUNTER:
        case import_sdk_metrics2.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER:
        case import_sdk_metrics2.InstrumentType.OBSERVABLE_COUNTER:
        case import_sdk_metrics2.InstrumentType.OBSERVABLE_GAUGE:
          return import_sdk_metrics2.AggregationTemporality.CUMULATIVE;
      }
    };
    DEFAULT_AGGREGATION = Object.freeze({
      type: import_sdk_metrics2.AggregationType.DEFAULT
    });
    OTLPMetricExporterBase = class extends OTLPExporterBase {
      _aggregationTemporalitySelector;
      _aggregationSelector;
      constructor(delegate, config2) {
        super(delegate);
        this._aggregationSelector = chooseAggregationSelector(config2);
        this._aggregationTemporalitySelector = chooseTemporalitySelector(config2?.temporalityPreference);
      }
      selectAggregation(instrumentType) {
        return this._aggregationSelector(instrumentType);
      }
      selectAggregationTemporality(instrumentType) {
        return this._aggregationTemporalitySelector(instrumentType);
      }
    };
  }
});

// node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/version.js
var VERSION3;
var init_version2 = __esm({
  "node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/version.js"() {
    "use strict";
    VERSION3 = "0.206.0";
  }
});

// node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/platform/node/OTLPMetricExporter.js
var USER_AGENT, OTLPMetricExporter;
var init_OTLPMetricExporter = __esm({
  "node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/platform/node/OTLPMetricExporter.js"() {
    "use strict";
    init_OTLPMetricExporterBase();
    init_esm4();
    init_version2();
    init_index_node_http();
    USER_AGENT = {
      "User-Agent": `OTel-OTLP-Exporter-JavaScript/${VERSION3}`
    };
    OTLPMetricExporter = class extends OTLPMetricExporterBase {
      constructor(config2) {
        super(createOtlpHttpExportDelegate(convertLegacyHttpOptions(config2 ?? {}, "METRICS", "v1/metrics", {
          ...USER_AGENT,
          "Content-Type": "application/json"
        }), JsonMetricsSerializer), config2);
      }
    };
  }
});

// node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/platform/node/index.js
var init_node2 = __esm({
  "node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/platform/node/index.js"() {
    "use strict";
    init_OTLPMetricExporter();
  }
});

// node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/platform/index.js
var init_platform2 = __esm({
  "node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/platform/index.js"() {
    "use strict";
    init_node2();
  }
});

// node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/index.js
var esm_exports4 = {};
__export(esm_exports4, {
  AggregationTemporalityPreference: () => AggregationTemporalityPreference,
  CumulativeTemporalitySelector: () => CumulativeTemporalitySelector,
  DeltaTemporalitySelector: () => DeltaTemporalitySelector,
  LowMemoryTemporalitySelector: () => LowMemoryTemporalitySelector,
  OTLPMetricExporter: () => OTLPMetricExporter,
  OTLPMetricExporterBase: () => OTLPMetricExporterBase
});
var init_esm5 = __esm({
  "node_modules/@opentelemetry/exporter-metrics-otlp-http/build/esm/index.js"() {
    "use strict";
    init_platform2();
    init_OTLPMetricExporterOptions();
    init_OTLPMetricExporterBase();
  }
});

// node_modules/@opentelemetry/exporter-metrics-otlp-grpc/build/src/OTLPMetricExporter.js
var require_OTLPMetricExporter = __commonJS({
  "node_modules/@opentelemetry/exporter-metrics-otlp-grpc/build/src/OTLPMetricExporter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OTLPMetricExporter = void 0;
    var exporter_metrics_otlp_http_1 = (init_esm5(), __toCommonJS(esm_exports4));
    var otlp_grpc_exporter_base_1 = require_src();
    var otlp_transformer_1 = (init_esm4(), __toCommonJS(esm_exports3));
    var OTLPMetricExporter3 = class extends exporter_metrics_otlp_http_1.OTLPMetricExporterBase {
      constructor(config2) {
        super((0, otlp_grpc_exporter_base_1.createOtlpGrpcExportDelegate)((0, otlp_grpc_exporter_base_1.convertLegacyOtlpGrpcOptions)(config2 ?? {}, "METRICS"), otlp_transformer_1.ProtobufMetricsSerializer, "MetricsExportService", "/opentelemetry.proto.collector.metrics.v1.MetricsService/Export"), config2);
      }
    };
    exports2.OTLPMetricExporter = OTLPMetricExporter3;
  }
});

// node_modules/@opentelemetry/exporter-metrics-otlp-grpc/build/src/index.js
var require_src3 = __commonJS({
  "node_modules/@opentelemetry/exporter-metrics-otlp-grpc/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OTLPMetricExporter = void 0;
    var OTLPMetricExporter_1 = require_OTLPMetricExporter();
    Object.defineProperty(exports2, "OTLPMetricExporter", { enumerable: true, get: function() {
      return OTLPMetricExporter_1.OTLPMetricExporter;
    } });
  }
});

// src/config/tracing.ts
var import_sdk_node = require("@opentelemetry/sdk-node");
var import_exporter_trace_otlp_grpc = __toESM(require_src2());
var import_exporter_metrics_otlp_grpc = __toESM(require_src3());
var import_auto_instrumentations_node = require("@opentelemetry/auto-instrumentations-node");
var import_sdk_metrics3 = require("@opentelemetry/sdk-metrics");

// node_modules/@opentelemetry/resources/build/esm/ResourceImpl.js
var import_api20 = require("@opentelemetry/api");

// node_modules/@opentelemetry/resources/build/esm/utils.js
var isPromiseLike = (val) => {
  return val !== null && typeof val === "object" && typeof val.then === "function";
};

// node_modules/@opentelemetry/resources/build/esm/ResourceImpl.js
var ResourceImpl = class _ResourceImpl {
  _rawAttributes;
  _asyncAttributesPending = false;
  _schemaUrl;
  _memoizedAttributes;
  static FromAttributeList(attributes, options2) {
    const res = new _ResourceImpl({}, options2);
    res._rawAttributes = guardedRawAttributes(attributes);
    res._asyncAttributesPending = attributes.filter(([_, val]) => isPromiseLike(val)).length > 0;
    return res;
  }
  constructor(resource, options2) {
    const attributes = resource.attributes ?? {};
    this._rawAttributes = Object.entries(attributes).map(([k, v]) => {
      if (isPromiseLike(v)) {
        this._asyncAttributesPending = true;
      }
      return [k, v];
    });
    this._rawAttributes = guardedRawAttributes(this._rawAttributes);
    this._schemaUrl = validateSchemaUrl(options2?.schemaUrl);
  }
  get asyncAttributesPending() {
    return this._asyncAttributesPending;
  }
  async waitForAsyncAttributes() {
    if (!this.asyncAttributesPending) {
      return;
    }
    for (let i = 0; i < this._rawAttributes.length; i++) {
      const [k, v] = this._rawAttributes[i];
      this._rawAttributes[i] = [k, isPromiseLike(v) ? await v : v];
    }
    this._asyncAttributesPending = false;
  }
  get attributes() {
    if (this.asyncAttributesPending) {
      import_api20.diag.error("Accessing resource attributes before async attributes settled");
    }
    if (this._memoizedAttributes) {
      return this._memoizedAttributes;
    }
    const attrs = {};
    for (const [k, v] of this._rawAttributes) {
      if (isPromiseLike(v)) {
        import_api20.diag.debug(`Unsettled resource attribute ${k} skipped`);
        continue;
      }
      if (v != null) {
        attrs[k] ??= v;
      }
    }
    if (!this._asyncAttributesPending) {
      this._memoizedAttributes = attrs;
    }
    return attrs;
  }
  getRawAttributes() {
    return this._rawAttributes;
  }
  get schemaUrl() {
    return this._schemaUrl;
  }
  merge(resource) {
    if (resource == null)
      return this;
    const mergedSchemaUrl = mergeSchemaUrl(this, resource);
    const mergedOptions = mergedSchemaUrl ? { schemaUrl: mergedSchemaUrl } : void 0;
    return _ResourceImpl.FromAttributeList([...resource.getRawAttributes(), ...this.getRawAttributes()], mergedOptions);
  }
};
function resourceFromAttributes(attributes, options2) {
  return ResourceImpl.FromAttributeList(Object.entries(attributes), options2);
}
function guardedRawAttributes(attributes) {
  return attributes.map(([k, v]) => {
    if (isPromiseLike(v)) {
      return [
        k,
        v.catch((err) => {
          import_api20.diag.debug("promise rejection for resource attribute: %s - %s", k, err);
          return void 0;
        })
      ];
    }
    return [k, v];
  });
}
function validateSchemaUrl(schemaUrl) {
  if (typeof schemaUrl === "string" || schemaUrl === void 0) {
    return schemaUrl;
  }
  import_api20.diag.warn("Schema URL must be string or undefined, got %s. Schema URL will be ignored.", schemaUrl);
  return void 0;
}
function mergeSchemaUrl(old, updating) {
  const oldSchemaUrl = old?.schemaUrl;
  const updatingSchemaUrl = updating?.schemaUrl;
  const isOldEmpty = oldSchemaUrl === void 0 || oldSchemaUrl === "";
  const isUpdatingEmpty = updatingSchemaUrl === void 0 || updatingSchemaUrl === "";
  if (isOldEmpty) {
    return updatingSchemaUrl;
  }
  if (isUpdatingEmpty) {
    return oldSchemaUrl;
  }
  if (oldSchemaUrl === updatingSchemaUrl) {
    return oldSchemaUrl;
  }
  import_api20.diag.warn('Schema URL merge conflict: old resource has "%s", updating resource has "%s". Resulting resource will have undefined Schema URL.', oldSchemaUrl, updatingSchemaUrl);
  return void 0;
}

// src/config/tracing.ts
init_esm();
var import_api22 = require("@opentelemetry/api");
var grpc = __toESM(require("@grpc/grpc-js"));

// src/config/index.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var config = {
  SERVICE_NAME: "GATEWAY_SERVICE",
  DEFAULT_GRPC_TIMEOUT: Number(process.env.DEFAULT_GRPC_TIMEOUT),
  GATEWAY_SERVICE_PORT: Number(process.env.GATEWAY_SERVICE_PORT),
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  LOG_LEVEL: process.env.LOG_LEVEL,
  REDIS_URL: process.env.REDIS_URL,
  GRPC_AUTH_USER_SERVICE_URL: process.env.GRPC_AUTH_USER_SERVICE_URL,
  GATEWAY_SERVICE_METRICS_PORT: Number(process.env.GATEWAY_SERVICE_METRICS_PORT),
  METRICS_URL: process.env.METRICS_URL,
  JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  GRPC_PROBLEM_SERVICE_URL: process.env.GRPC_PROBLEM_SERVICE_URL,
  GRPC_CODE_MANAGE_SERVICE_URL: process.env.GRPC_CODE_MANAGE_SERVICE_URL,
  GRPC_COLLAB_SERVICE_URL: process.env.GRPC_COLLAB_SERVICE_URL,
  CLIENT_URL_1: process.env.CLIENT_URL_1,
  CLIENT_URL_2: process.env.CLIENT_URL_2
};

// src/util/pinoLogger.ts
var import_pino = __toESM(require("pino"));
var import_pino_http = __toESM(require("pino-http"));
var import_api21 = require("@opentelemetry/api");
var logger = (0, import_pino.default)({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  base: {
    service: config.SERVICE_NAME
  },
  transport: process.env.NODE_ENV !== "production" ? { target: "pino-pretty", options: { colorize: true, translateTime: "SYS:standard" } } : void 0
});
function getTraceContext() {
  const span = import_api21.trace.getSpan(import_api21.context.active());
  if (!span) return {};
  const spanContext = span.spanContext();
  return {
    traceId: spanContext.traceId,
    spanId: spanContext.spanId
  };
}
var httpLogger = (0, import_pino_http.default)({
  logger,
  customLogLevel(_, res, err) {
    const status = res.statusCode ?? 500;
    const isRealError = err instanceof Error;
    if (isRealError || status >= 500) return "error";
    if (status >= 400) return "warn";
    return "info";
  },
  customProps: () => getTraceContext(),
  serializers: {
    req(req) {
      return { method: req.method, url: req.url };
    },
    res(res) {
      return { statusCode: res.statusCode };
    }
  }
});
var baseLogger = {
  // Use a generic function for non-error levels
  log: (level, msg, meta) => {
    logger[level]({ ...getTraceContext(), ...meta }, msg);
  },
  info: (msg, meta) => baseLogger.log("info", msg, meta),
  warn: (msg, meta) => baseLogger.log("warn", msg, meta),
  debug: (msg, meta) => baseLogger.log("debug", msg, meta),
  error: (msg, meta) => {
    const traceContext = getTraceContext();
    if (meta instanceof Error) {
      logger.error({
        err: meta,
        ...traceContext
      }, msg);
      return;
    }
    logger.error({ ...traceContext, ...meta }, msg);
  }
};
var pinoLogger_default = baseLogger;

// src/config/tracing.ts
var import_dotenv2 = __toESM(require("dotenv"));
import_dotenv2.default.config();
import_api22.diag.setLogger(new import_api22.DiagConsoleLogger(), import_api22.DiagLogLevel.INFO);
var serviceName = process.env.OTEL_SERVICE_NAME || config.SERVICE_NAME;
var otelCollectorEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
var sdk;
if (!otelCollectorEndpoint) {
  pinoLogger_default.info("OTEL_EXPORTER_OTLP_ENDPOINT not set, skipping OpenTelemetry initialization.");
} else {
  pinoLogger_default.info(`Initializing OpenTelemetry for service: ${serviceName}`);
  pinoLogger_default.info(`OTLP Collector endpoint: ${otelCollectorEndpoint}`);
  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: serviceName
  });
  const grpcCredentials = grpc.credentials.createInsecure();
  const traceExporter = new import_exporter_trace_otlp_grpc.OTLPTraceExporter({
    url: otelCollectorEndpoint,
    credentials: grpcCredentials,
    timeoutMillis: 5e3
  });
  const metricExporter = new import_exporter_metrics_otlp_grpc.OTLPMetricExporter({
    url: otelCollectorEndpoint,
    credentials: grpcCredentials,
    timeoutMillis: 5e3
  });
  sdk = new import_sdk_node.NodeSDK({
    resource,
    traceExporter,
    metricReader: new import_sdk_metrics3.PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 1e4
    }),
    instrumentations: (0, import_auto_instrumentations_node.getNodeAutoInstrumentations)({
      "@opentelemetry/instrumentation-fs": { enabled: false },
      "@opentelemetry/instrumentation-grpc": { enabled: true },
      "@opentelemetry/instrumentation-ioredis": { enabled: true },
      "@opentelemetry/instrumentation-redis": { enabled: true },
      "@opentelemetry/instrumentation-pino": { enabled: true },
      "@opentelemetry/instrumentation-express": { enabled: true }
    })
  });
  const shutdown = async () => {
    pinoLogger_default.info("Shutting down OpenTelemetry SDK...");
    try {
      await sdk?.shutdown();
      pinoLogger_default.info("OpenTelemetry SDK terminated successfully");
    } catch (error) {
      pinoLogger_default.error("Error terminating OpenTelemetry SDK:", error);
    }
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
  try {
    sdk.start();
    pinoLogger_default.info("OpenTelemetry SDK started successfully");
  } catch (error) {
    pinoLogger_default.error("Error starting OpenTelemetry SDK:", error);
  }
}

// src/index.ts
var import_express19 = __toESM(require("express"));
var import_dotenv4 = __toESM(require("dotenv"));
var import_helmet = __toESM(require("helmet"));
var import_cors = __toESM(require("cors"));
var import_cookie_parser = __toESM(require("cookie-parser"));
var import_swagger_ui_express = __toESM(require("swagger-ui-express"));

// src/config/swagger.ts
var import_swagger_jsdoc = __toESM(require("swagger-jsdoc"));
var swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Codex Gateway API",
    version: "1.0.0",
    description: `
The Gateway Service is the single public entry point to the Codex platform.
All client HTTP traffic flows through this service. It performs authentication, 
request validation, rate limiting, logging and orchestrates outbound gRPC calls 
to downstream microservices.

## Authentication
Most endpoints require JWT authentication. Include the access token in the Authorization header:
\`Authorization: Bearer <token>\`

## Rate Limiting
API requests are rate-limited to prevent abuse. Excessive requests will receive 429 responses.
    `,
    contact: {
      name: "Codex API Support"
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT"
    }
  },
  servers: [
    {
      url: "/api/v1",
      description: "API v1"
    }
  ],
  tags: [
    { name: "User Auth", description: "User authentication endpoints" },
    { name: "Admin Auth", description: "Admin authentication endpoints" },
    { name: "User Profile", description: "User profile management" },
    { name: "Admin Profile", description: "Admin profile management" },
    { name: "Problems (Public)", description: "Public problem endpoints" },
    { name: "Problems (User)", description: "Authenticated user problem endpoints" },
    { name: "Problems (Admin)", description: "Admin problem management endpoints" },
    { name: "Codepad", description: "Code execution sandbox endpoints" },
    { name: "Collaboration", description: "Real-time collaboration session endpoints" },
    { name: "Leaderboard", description: "Leaderboard endpoints" },
    { name: "Dashboard", description: "Dashboard analytics endpoints" },
    { name: "Metrics", description: "System metrics endpoints (Admin only)" },
    { name: "User Management", description: "User management endpoints (Admin only)" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT access token"
      }
    },
    schemas: {
      // Common schemas
      Error: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string", example: "Error message" },
          errors: {
            type: "array",
            items: { type: "object" },
            description: "Validation error details"
          }
        }
      },
      SuccessResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { type: "object" }
        }
      },
      // Auth schemas
      SignupRequest: {
        type: "object",
        required: ["username", "firstName", "email", "password", "country"],
        properties: {
          username: { type: "string", minLength: 3, maxLength: 20, example: "john_doe" },
          firstName: { type: "string", minLength: 2, maxLength: 50, example: "John" },
          lastName: { type: "string", minLength: 2, maxLength: 50, example: "Doe" },
          email: { type: "string", format: "email", example: "john@example.com" },
          password: { type: "string", minLength: 8, example: "SecurePass1!" },
          country: { type: "string", example: "USA" }
        }
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "john@example.com" },
          password: { type: "string", example: "SecurePass1!" }
        }
      },
      OtpRequest: {
        type: "object",
        required: ["email", "otp"],
        properties: {
          email: { type: "string", format: "email", example: "john@example.com" },
          otp: { type: "string", minLength: 6, maxLength: 6, example: "123456" }
        }
      },
      GoogleLoginRequest: {
        type: "object",
        required: ["oAuthId"],
        properties: {
          oAuthId: { type: "string", description: "Google OAuth ID token" }
        }
      },
      ResetPasswordRequest: {
        type: "object",
        required: ["email", "newPassword", "otp"],
        properties: {
          email: { type: "string", format: "email" },
          newPassword: { type: "string", minLength: 8 },
          otp: { type: "string", minLength: 6, maxLength: 6 }
        }
      },
      // Profile schemas
      UpdateProfileRequest: {
        type: "object",
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          avatar: { type: "string", format: "binary" }
        }
      },
      ChangePasswordRequest: {
        type: "object",
        required: ["currentPassword", "newPassword"],
        properties: {
          currentPassword: { type: "string" },
          newPassword: { type: "string", minLength: 8 }
        }
      },
      // Problem schemas
      Problem: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
          tags: { type: "array", items: { type: "string" } }
        }
      },
      CreateProblemRequest: {
        type: "object",
        required: ["title", "description", "difficulty"],
        properties: {
          questionId: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
          tags: { type: "array", items: { type: "string" } },
          constraints: { type: "string" },
          hints: { type: "array", items: { type: "string" } }
        }
      },
      // Code execution schemas
      RunCodeRequest: {
        type: "object",
        required: ["code", "language"],
        properties: {
          code: { type: "string" },
          language: { type: "string", enum: ["javascript", "python", "java", "cpp", "c"] },
          stdin: { type: "string" }
        }
      },
      SubmitCodeRequest: {
        type: "object",
        required: ["code", "language"],
        properties: {
          code: { type: "string" },
          language: { type: "string", enum: ["javascript", "python", "java", "cpp", "c"] }
        }
      },
      // Pagination
      PaginationQuery: {
        type: "object",
        properties: {
          page: { type: "integer", minimum: 1, default: 1 },
          limit: { type: "integer", minimum: 1, maximum: 100, default: 10 },
          cursor: { type: "string", description: "Cursor for cursor-based pagination" }
        }
      },
      // ==================== AUTH RESPONSE SCHEMAS ====================
      UserInfo: {
        type: "object",
        properties: {
          userId: { type: "string", description: "Unique user identifier" },
          username: { type: "string", description: "User display name" },
          email: { type: "string", format: "email" },
          firstName: { type: "string" },
          lastName: { type: "string", nullable: true },
          avatar: { type: "string", nullable: true, description: "Cloudinary public ID" },
          country: { type: "string", nullable: true }
        }
      },
      LoginResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/UserInfo" }
        }
      },
      SignupResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string", example: "OTP sent to your email" }
        }
      },
      VerifyOtpResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/UserInfo" }
        }
      },
      TokenRefreshResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/UserInfo" }
        }
      },
      // ==================== PROFILE RESPONSE SCHEMAS ====================
      UserProfileData: {
        type: "object",
        properties: {
          userId: { type: "string" },
          username: { type: "string" },
          email: { type: "string", format: "email" },
          firstName: { type: "string" },
          lastName: { type: "string", nullable: true },
          avatar: { type: "string", nullable: true },
          country: { type: "string", nullable: true },
          preferredLanguage: { type: "string", nullable: true, enum: ["javascript", "python", "go"] },
          isVerified: { type: "boolean" },
          isBlocked: { type: "boolean" },
          authProvider: { type: "string", enum: ["LOCAL", "GOOGLE"] },
          easySolved: { type: "integer", nullable: true },
          mediumSolved: { type: "integer", nullable: true },
          hardSolved: { type: "integer", nullable: true },
          totalSubmission: { type: "integer", nullable: true },
          streak: { type: "integer", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      UserProfileResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/UserProfileData" }
        }
      },
      UpdateProfileData: {
        type: "object",
        nullable: true,
        properties: {
          username: { type: "string" },
          firstName: { type: "string" },
          lastName: { type: "string", nullable: true },
          country: { type: "string", nullable: true },
          avatar: { type: "string", nullable: true },
          preferredLanguage: { type: "string", nullable: true },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      UpdateProfileResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/UpdateProfileData" }
        }
      },
      // ==================== PROBLEM NESTED SCHEMAS ====================
      Example: {
        type: "object",
        properties: {
          Id: { type: "string" },
          input: { type: "string" },
          output: { type: "string" },
          explanation: { type: "string", nullable: true }
        }
      },
      SolutionRoadmap: {
        type: "object",
        properties: {
          Id: { type: "string" },
          level: { type: "integer", description: "Sequential hint level (1,2,3...)" },
          description: { type: "string", description: "Hint for this level of the solution" }
        }
      },
      StarterCode: {
        type: "object",
        properties: {
          Id: { type: "string" },
          language: { type: "integer", enum: [1, 2, 3], description: "1=JavaScript, 2=Python, 3=Go" },
          code: { type: "string", description: "Initial code template for the user" }
        }
      },
      TemplateCode: {
        type: "object",
        properties: {
          Id: { type: "string" },
          language: { type: "integer", enum: [1, 2, 3], description: "1=JavaScript, 2=Python, 3=Go" },
          submitWrapperCode: { type: "string", description: "Server-side wrapper code for submissions" },
          runWrapperCode: { type: "string", description: "Server-side wrapper code for run tests" }
        }
      },
      TestCase: {
        type: "object",
        properties: {
          Id: { type: "string" },
          input: { type: "string" },
          output: { type: "string", description: "Expected output" }
        }
      },
      TestCaseCollection: {
        type: "object",
        properties: {
          run: {
            type: "array",
            items: { $ref: "#/components/schemas/TestCase" },
            description: "Test cases shown to user during code run"
          },
          submit: {
            type: "array",
            items: { $ref: "#/components/schemas/TestCase" },
            description: "Hidden test cases for submission evaluation"
          }
        }
      },
      // ==================== PROBLEM RESPONSE SCHEMAS ====================
      ProblemListItem: {
        type: "object",
        properties: {
          Id: { type: "string" },
          questionId: { type: "string", description: 'Human-readable problem ID (e.g., "two-sum")' },
          title: { type: "string" },
          difficulty: { type: "integer", enum: [1, 2, 3], description: "1=Easy, 2=Medium, 3=Hard" },
          tags: { type: "array", items: { type: "string" } },
          active: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      ListProblemsData: {
        type: "object",
        properties: {
          problems: {
            type: "array",
            items: { $ref: "#/components/schemas/ProblemListItem" }
          },
          currentPage: { type: "integer" },
          totalItems: { type: "integer" },
          totalPage: { type: "integer" }
        }
      },
      ListProblemsResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/ListProblemsData" }
        }
      },
      ProblemPublicDetail: {
        type: "object",
        properties: {
          Id: { type: "string" },
          questionId: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          difficulty: { type: "integer", enum: [1, 2, 3] },
          tags: { type: "array", items: { type: "string" } },
          constraints: { type: "array", items: { type: "string" } },
          examples: {
            type: "array",
            items: { $ref: "#/components/schemas/Example" }
          },
          starterCodes: {
            type: "array",
            items: { $ref: "#/components/schemas/StarterCode" }
          },
          run: {
            type: "array",
            items: { $ref: "#/components/schemas/TestCase" },
            description: "Sample test cases for running code"
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      GetProblemPublicResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/ProblemPublicDetail" }
        }
      },
      ProblemAdminDetail: {
        type: "object",
        properties: {
          Id: { type: "string" },
          questionId: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          difficulty: { type: "integer", enum: [1, 2, 3] },
          tags: { type: "array", items: { type: "string" } },
          active: { type: "boolean" },
          constraints: { type: "array", items: { type: "string" } },
          examples: {
            type: "array",
            items: { $ref: "#/components/schemas/Example" }
          },
          starterCodes: {
            type: "array",
            items: { $ref: "#/components/schemas/StarterCode" }
          },
          solutionRoadmap: {
            type: "array",
            items: { $ref: "#/components/schemas/SolutionRoadmap" }
          },
          testcaseCollection: { $ref: "#/components/schemas/TestCaseCollection" },
          templateCodes: {
            type: "array",
            items: { $ref: "#/components/schemas/TemplateCode" }
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      GetProblemAdminResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/ProblemAdminDetail" }
        }
      },
      CreateProblemResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/ProblemAdminDetail" }
        }
      },
      // ==================== CODE EXECUTION NESTED SCHEMAS ====================
      TestResult: {
        type: "object",
        properties: {
          Id: { type: "string" },
          index: { type: "string" },
          input: { type: "string" },
          output: { type: "string", description: "Actual output from code execution" },
          expectedOutput: { type: "string" },
          passed: { type: "boolean" },
          executionTimeMs: { type: "number" },
          memoryMB: { type: "number" }
        }
      },
      ExecutionStats: {
        type: "object",
        properties: {
          totalTestCase: { type: "integer" },
          passedTestCase: { type: "integer" },
          failedTestCase: { type: "integer" },
          stdout: { type: "string", nullable: true },
          executionTimeMs: { type: "number", nullable: true },
          memoryMB: { type: "number", nullable: true }
        }
      },
      FailedTestCase: {
        type: "object",
        nullable: true,
        properties: {
          index: { type: "integer" },
          input: { type: "string" },
          output: { type: "string", description: "Actual output (or error message)" },
          expectedOutput: { type: "string" }
        }
      },
      ExecutionResult: {
        type: "object",
        properties: {
          stats: { $ref: "#/components/schemas/ExecutionStats" },
          failedTestCase: { $ref: "#/components/schemas/FailedTestCase" },
          testResults: {
            type: "array",
            items: { $ref: "#/components/schemas/TestResult" },
            description: "Individual test case results (for run code)"
          }
        }
      },
      // ==================== CODE EXECUTION RESPONSE SCHEMAS ====================
      RunCodeData: {
        type: "object",
        properties: {
          tempId: { type: "string", description: "Temporary ID to poll for results via WebSocket or REST" }
        }
      },
      RunCodeResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/RunCodeData" }
        }
      },
      SubmitCodeData: {
        type: "object",
        properties: {
          submissionId: { type: "string", description: "Submission ID to poll for results" }
        }
      },
      SubmitCodeResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/SubmitCodeData" }
        }
      },
      RunCodeResultData: {
        type: "object",
        nullable: true,
        properties: {
          tempId: { type: "string" },
          executionResult: { $ref: "#/components/schemas/ExecutionResult" }
        }
      },
      RunCodeResultResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/RunCodeResultData" }
        }
      },
      CustomCodeResultData: {
        type: "object",
        nullable: true,
        properties: {
          tempId: { type: "string" },
          stdOut: { type: "string", description: "Console output from code execution" }
        }
      },
      CustomCodeResultResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/CustomCodeResultData" }
        }
      },
      // ==================== SUBMISSION RESPONSE SCHEMAS ====================
      SubmissionListItem: {
        type: "object",
        properties: {
          Id: { type: "string" },
          status: { type: "string", enum: ["pending", "accepted", "wrong_answer", "time_limit_exceeded", "memory_limit_exceeded", "runtime_error", "compilation_error"] },
          language: { type: "integer", enum: [1, 2, 3], description: "1=JavaScript, 2=Python, 3=Go" },
          executionResult: { $ref: "#/components/schemas/ExecutionResult" },
          userCode: { type: "string" },
          hintsUsed: { type: "integer" },
          isAiAssisted: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" }
        }
      },
      ListProblemSubmissionsData: {
        type: "object",
        properties: {
          submissions: {
            type: "array",
            items: { $ref: "#/components/schemas/SubmissionListItem" }
          },
          nextCursor: { type: "string", nullable: true, description: "Cursor for next page (createdAt timestamp)" },
          hasMore: { type: "boolean" }
        }
      },
      ListProblemSubmissionsResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/ListProblemSubmissionsData" }
        }
      },
      SubmissionResultData: {
        type: "object",
        nullable: true,
        properties: {
          submissionId: { type: "string" },
          userId: { type: "string" },
          executionResult: { $ref: "#/components/schemas/ExecutionResult" }
        }
      },
      SubmissionResultResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/SubmissionResultData" }
        }
      },
      // ==================== LEADERBOARD RESPONSE SCHEMAS ====================
      LeaderboardUser: {
        type: "object",
        properties: {
          id: { type: "string", description: "User ID" },
          entity: { type: "string", nullable: true, description: 'Country code (e.g., "IN", "US")' },
          score: { type: "number" },
          problemsSolved: { type: "integer", nullable: true },
          username: { type: "string", nullable: true },
          rank: { type: "integer", nullable: true, description: "1-based rank" }
        }
      },
      LeaderboardData: {
        type: "object",
        properties: {
          users: {
            type: "array",
            items: { $ref: "#/components/schemas/LeaderboardUser" }
          }
        }
      },
      GlobalLeaderboardResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/LeaderboardData" }
        }
      },
      CountryLeaderboardResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/LeaderboardData" }
        }
      },
      // ==================== DASHBOARD NESTED SCHEMAS ====================
      HeatmapActivity: {
        type: "object",
        properties: {
          date: { type: "string", format: "date", description: "YYYY-MM-DD format" },
          count: { type: "integer", description: "Number of submissions on this day" }
        }
      },
      LeaderboardDetails: {
        type: "object",
        properties: {
          userId: { type: "string" },
          username: { type: "string", nullable: true },
          score: { type: "number" },
          entity: { type: "string", description: "Country code" },
          globalRank: { type: "integer", description: "0-based global rank (-1 if unranked)" },
          entityRank: { type: "integer", description: "0-based country rank (-1 if unranked)" }
        }
      },
      SolvedByDifficulty: {
        type: "object",
        properties: {
          difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
          count: { type: "integer" }
        }
      },
      RecentActivity: {
        type: "object",
        properties: {
          title: { type: "string", description: "Problem title" },
          difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
          status: { type: "string", enum: ["accepted", "wrong_answer", "time_limit_exceeded", "memory_limit_exceeded", "runtime_error", "compilation_error"] },
          language: { type: "string" },
          timeAgo: { type: "string", description: 'Human-readable time (e.g., "2 hours ago")' }
        }
      },
      // ==================== DASHBOARD RESPONSE SCHEMAS ====================
      UserDashboardData: {
        type: "object",
        properties: {
          heatmap: {
            type: "array",
            items: { $ref: "#/components/schemas/HeatmapActivity" }
          },
          currentStreak: { type: "integer", description: "Current consecutive day streak" },
          leaderboardDetails: { $ref: "#/components/schemas/LeaderboardDetails" },
          problemsSolved: { type: "integer" },
          recentActivities: {
            type: "array",
            items: { $ref: "#/components/schemas/RecentActivity" }
          },
          solvedByDifficulty: {
            type: "array",
            items: { $ref: "#/components/schemas/SolvedByDifficulty" }
          }
        }
      },
      UserDashboardResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/UserDashboardData" }
        }
      },
      LanguageStats: {
        type: "object",
        properties: {
          language: { type: "string" },
          count: { type: "integer" }
        }
      },
      DifficultyStats: {
        type: "object",
        properties: {
          difficulty: { type: "string" },
          count: { type: "integer" }
        }
      },
      AdminSubmissionStats: {
        type: "object",
        properties: {
          totalSubmissions: { type: "integer" },
          todaysSubmissions: { type: "integer" },
          languageWise: {
            type: "array",
            items: { $ref: "#/components/schemas/LanguageStats" }
          }
        }
      },
      AdminProblemStats: {
        type: "object",
        properties: {
          totalProblems: { type: "integer" },
          todaysProblems: { type: "integer" },
          difficultyWise: {
            type: "array",
            items: { $ref: "#/components/schemas/DifficultyStats" }
          }
        }
      },
      AdminUserStats: {
        type: "object",
        properties: {
          totalUsers: { type: "integer" },
          todaysUsers: { type: "integer" }
        }
      },
      SessionStatusCounts: {
        type: "object",
        properties: {
          active: { type: "integer" },
          ended: { type: "integer" },
          offline: { type: "integer" }
        }
      },
      AdminCollabStats: {
        type: "object",
        properties: {
          total: { $ref: "#/components/schemas/SessionStatusCounts" },
          today: { $ref: "#/components/schemas/SessionStatusCounts" }
        }
      },
      AdminProblemSubmissionStats: {
        type: "object",
        properties: {
          submissionStats: { $ref: "#/components/schemas/AdminSubmissionStats" },
          problemStats: { $ref: "#/components/schemas/AdminProblemStats" }
        }
      },
      AdminDashboardData: {
        type: "object",
        properties: {
          problemSubmissionStats: { $ref: "#/components/schemas/AdminProblemSubmissionStats" },
          userStats: { $ref: "#/components/schemas/AdminUserStats" },
          collabStats: { $ref: "#/components/schemas/AdminCollabStats" }
        }
      },
      AdminDashboardResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/AdminDashboardData" }
        }
      },
      // ==================== COLLABORATION RESPONSE SCHEMAS ====================
      CreateSessionData: {
        type: "object",
        properties: {
          inviteToken: { type: "string", description: "Token to share for joining the session" }
        }
      },
      CreateSessionResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/CreateSessionData" }
        }
      },
      // ==================== USER MANAGEMENT RESPONSE SCHEMAS ====================
      UserListItem: {
        type: "object",
        properties: {
          userId: { type: "string" },
          username: { type: "string" },
          email: { type: "string", format: "email" },
          firstName: { type: "string" },
          lastName: { type: "string", nullable: true },
          avatar: { type: "string", nullable: true },
          country: { type: "string", nullable: true },
          isBlocked: { type: "boolean" },
          isVerified: { type: "boolean" },
          isArchived: { type: "boolean" },
          authProvider: { type: "string", enum: ["LOCAL", "GOOGLE"] },
          preferredLanguage: { type: "string", nullable: true },
          easySolved: { type: "integer", nullable: true },
          mediumSolved: { type: "integer", nullable: true },
          hardSolved: { type: "integer", nullable: true },
          totalSubmission: { type: "integer", nullable: true },
          streak: { type: "integer", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        }
      },
      ListUsersData: {
        type: "object",
        properties: {
          users: {
            type: "array",
            items: { $ref: "#/components/schemas/UserListItem" }
          },
          currentPage: { type: "integer" },
          totalItems: { type: "integer" },
          totalPage: { type: "integer" }
        }
      },
      ListUsersResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/ListUsersData" }
        }
      },
      // ==================== HINT RESPONSE SCHEMAS ====================
      HintItem: {
        type: "object",
        properties: {
          hint: { type: "string", description: "AI-generated hint text" },
          createdAt: { type: "string", format: "date-time" }
        }
      },
      PreviousHintsData: {
        type: "object",
        properties: {
          hints: {
            type: "array",
            items: { $ref: "#/components/schemas/HintItem" }
          }
        }
      },
      PreviousHintsResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/PreviousHintsData" }
        }
      },
      RequestHintData: {
        type: "object",
        properties: {
          hint: { type: "string", description: "New AI-generated hint" }
        }
      },
      RequestHintResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/RequestHintData" }
        }
      },
      FullSolutionData: {
        type: "object",
        properties: {
          solution: { type: "string", description: "Complete AI-generated solution code" }
        }
      },
      FullSolutionResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          message: { type: "string" },
          data: { $ref: "#/components/schemas/FullSolutionData" }
        }
      },
      // ==================== METRICS RESPONSE SCHEMAS ====================
      GrpcMethodMetric: {
        type: "object",
        properties: {
          method: { type: "string", description: "gRPC method name" },
          p50: { type: "string", description: "50th percentile latency (ms)" },
          p90: { type: "string", description: "90th percentile latency (ms)" },
          p99: { type: "string", description: "99th percentile latency (ms)" },
          requestCount: { type: "string", description: "Total requests in time window" },
          errorRate: { type: "string", description: "Error percentage" }
        }
      },
      GrpcMetricsResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "array",
            items: { $ref: "#/components/schemas/GrpcMethodMetric" }
          }
        }
      },
      HttpMetricsResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          data: {
            type: "array",
            items: { type: "object", description: "Prometheus metric object" }
          }
        }
      }
    },
    responses: {
      Unauthorized: {
        description: "Authentication required or token invalid",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" }
          }
        }
      },
      Forbidden: {
        description: "Access denied",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" }
          }
        }
      },
      NotFound: {
        description: "Resource not found",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" }
          }
        }
      },
      ValidationError: {
        description: "Validation failed",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" }
          }
        }
      },
      TooManyRequests: {
        description: "Rate limit exceeded",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Error" }
          }
        }
      }
    }
  },
  paths: {
    // ==================== USER AUTH ====================
    "/user/auth/signup": {
      post: {
        tags: ["User Auth"],
        summary: "Register a new user",
        description: "Register a new user account and send OTP for verification",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SignupRequest" }
            }
          }
        },
        responses: {
          "201": { description: "User registered, OTP sent", content: { "application/json": { schema: { $ref: "#/components/schemas/SignupResponse" } } } },
          "400": { $ref: "#/components/responses/ValidationError" },
          "409": { description: "Email or username already exists" },
          "429": { $ref: "#/components/responses/TooManyRequests" }
        }
      }
    },
    "/user/auth/otp/resend-otp": {
      post: {
        tags: ["User Auth"],
        summary: "Resend signup OTP",
        description: "Resend OTP for signup verification",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: { email: { type: "string", format: "email" } }
              }
            }
          }
        },
        responses: {
          "200": { description: "OTP resent successfully", content: { "application/json": { schema: { $ref: "#/components/schemas/SuccessResponse" } } } },
          "400": { $ref: "#/components/responses/ValidationError" },
          "429": { $ref: "#/components/responses/TooManyRequests" }
        }
      }
    },
    "/user/auth/otp/verify-otp": {
      post: {
        tags: ["User Auth"],
        summary: "Verify signup OTP",
        description: "Verify OTP to complete signup",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OtpRequest" }
            }
          }
        },
        responses: {
          "200": { description: "OTP verified, account activated", content: { "application/json": { schema: { $ref: "#/components/schemas/VerifyOtpResponse" } } } },
          "400": { $ref: "#/components/responses/ValidationError" },
          "429": { $ref: "#/components/responses/TooManyRequests" }
        }
      }
    },
    "/user/auth/login": {
      post: {
        tags: ["User Auth"],
        summary: "User login",
        description: "Authenticate user and issue access/refresh tokens",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" }
            }
          }
        },
        responses: {
          "200": {
            description: "Login successful",
            headers: {
              "Set-Cookie": { description: "Refresh token cookie", schema: { type: "string" } }
            },
            content: { "application/json": { schema: { $ref: "#/components/schemas/LoginResponse" } } }
          },
          "400": { $ref: "#/components/responses/ValidationError" },
          "401": { description: "Invalid credentials" },
          "429": { $ref: "#/components/responses/TooManyRequests" }
        }
      }
    },
    "/user/auth/login/google-login": {
      post: {
        tags: ["User Auth"],
        summary: "Google OAuth login",
        description: "Authenticate or register user via Google OAuth",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/GoogleLoginRequest" }
            }
          }
        },
        responses: {
          "200": { description: "Login successful", content: { "application/json": { schema: { $ref: "#/components/schemas/LoginResponse" } } } },
          "400": { $ref: "#/components/responses/ValidationError" },
          "429": { $ref: "#/components/responses/TooManyRequests" }
        }
      }
    },
    "/user/auth/password/forgot/request": {
      post: {
        tags: ["User Auth"],
        summary: "Request password reset",
        description: "Send OTP to email for password reset",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: { email: { type: "string", format: "email" } }
              }
            }
          }
        },
        responses: {
          "200": { description: "OTP sent to email" },
          "400": { $ref: "#/components/responses/ValidationError" },
          "429": { $ref: "#/components/responses/TooManyRequests" }
        }
      }
    },
    "/user/auth/password/forgot/request/resend-otp": {
      post: {
        tags: ["User Auth"],
        summary: "Resend forgot password OTP",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: { email: { type: "string", format: "email" } }
              }
            }
          }
        },
        responses: {
          "200": { description: "OTP resent successfully" },
          "429": { $ref: "#/components/responses/TooManyRequests" }
        }
      }
    },
    "/user/auth/password/forgot/change": {
      post: {
        tags: ["User Auth"],
        summary: "Reset password",
        description: "Verify OTP and change password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ResetPasswordRequest" }
            }
          }
        },
        responses: {
          "200": { description: "Password reset successful" },
          "400": { $ref: "#/components/responses/ValidationError" },
          "429": { $ref: "#/components/responses/TooManyRequests" }
        }
      }
    },
    "/user/auth/refresh-token": {
      post: {
        tags: ["User Auth"],
        summary: "Refresh access token",
        description: "Issue new access token using refresh token",
        responses: {
          "200": { description: "New access token issued", content: { "application/json": { schema: { $ref: "#/components/schemas/TokenRefreshResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/user/auth/logout": {
      delete: {
        tags: ["User Auth"],
        summary: "User logout",
        description: "Invalidate tokens and logout user",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "Logout successful" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    // ==================== ADMIN AUTH ====================
    "/admin/auth/login": {
      post: {
        tags: ["Admin Auth"],
        summary: "Admin login",
        description: "Authenticate admin and issue tokens",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" }
            }
          }
        },
        responses: {
          "200": { description: "Login successful", content: { "application/json": { schema: { $ref: "#/components/schemas/LoginResponse" } } } },
          "401": { description: "Invalid credentials" }
        }
      }
    },
    "/admin/auth/refresh-token": {
      post: {
        tags: ["Admin Auth"],
        summary: "Refresh admin access token",
        responses: {
          "200": { description: "New access token issued", content: { "application/json": { schema: { $ref: "#/components/schemas/TokenRefreshResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/auth/logout": {
      delete: {
        tags: ["Admin Auth"],
        summary: "Admin logout",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "Logout successful" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    // ==================== USER PROFILE ====================
    "/user/profile": {
      get: {
        tags: ["User Profile"],
        summary: "Get user profile",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "Profile data", content: { "application/json": { schema: { $ref: "#/components/schemas/UserProfileResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/user/profile/update": {
      patch: {
        tags: ["User Profile"],
        summary: "Update user profile",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: { $ref: "#/components/schemas/UpdateProfileRequest" }
            }
          }
        },
        responses: {
          "200": { description: "Profile updated", content: { "application/json": { schema: { $ref: "#/components/schemas/UpdateProfileResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/user/profile/password/change": {
      post: {
        tags: ["User Profile"],
        summary: "Change password",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ChangePasswordRequest" }
            }
          }
        },
        responses: {
          "200": { description: "Password changed" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/user/profile/email/change": {
      post: {
        tags: ["User Profile"],
        summary: "Request email change",
        description: "Send OTP to new email for verification",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["newEmail"],
                properties: { newEmail: { type: "string", format: "email" } }
              }
            }
          }
        },
        responses: {
          "200": { description: "OTP sent to new email" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/user/profile/email/change/resend-otp": {
      post: {
        tags: ["User Profile"],
        summary: "Resend email change OTP",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "OTP resent" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/user/profile/email/change/verify": {
      post: {
        tags: ["User Profile"],
        summary: "Verify email change",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OtpRequest" }
            }
          }
        },
        responses: {
          "200": { description: "Email updated" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/user/profile/delete": {
      patch: {
        tags: ["User Profile"],
        summary: "Delete account",
        description: "Archive user account",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "Account archived" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    // ==================== ADMIN PROFILE ====================
    "/admin/profile": {
      get: {
        tags: ["Admin Profile"],
        summary: "Get admin profile",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "Profile data" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/profile/update": {
      patch: {
        tags: ["Admin Profile"],
        summary: "Update admin profile",
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: { $ref: "#/components/schemas/UpdateProfileRequest" }
            }
          }
        },
        responses: {
          "200": { description: "Profile updated" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    // ==================== PUBLIC PROBLEMS ====================
    "/public/problems": {
      get: {
        tags: ["Problems (Public)"],
        summary: "List problems",
        description: "Get paginated list of problems with filters",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer", default: 1 } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
          { name: "difficulty", in: "query", schema: { type: "string", enum: ["easy", "medium", "hard"] } },
          { name: "search", in: "query", schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "List of problems", content: { "application/json": { schema: { $ref: "#/components/schemas/ListProblemsResponse" } } } }
        }
      }
    },
    "/public/problems/{problemId}": {
      get: {
        tags: ["Problems (Public)"],
        summary: "Get problem details",
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Problem details", content: { "application/json": { schema: { $ref: "#/components/schemas/GetProblemPublicResponse" } } } },
          "404": { $ref: "#/components/responses/NotFound" }
        }
      }
    },
    "/public/problems/{problemId}/code/run": {
      post: {
        tags: ["Problems (Public)"],
        summary: "Run code",
        description: "Execute code against sample test cases",
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RunCodeRequest" }
            }
          }
        },
        responses: {
          "202": { description: "Code execution queued", content: { "application/json": { schema: { $ref: "#/components/schemas/RunCodeResponse" } } } },
          "400": { $ref: "#/components/responses/ValidationError" }
        }
      }
    },
    "/public/problems/{problemId}/{tempId}/code/run/result": {
      get: {
        tags: ["Problems (Public)"],
        summary: "Get run result",
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } },
          { name: "tempId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Execution result", content: { "application/json": { schema: { $ref: "#/components/schemas/RunCodeResultResponse" } } } },
          "404": { $ref: "#/components/responses/NotFound" }
        }
      }
    },
    // ==================== USER PROBLEMS ====================
    "/user/problems/{problemId}/hints": {
      get: {
        tags: ["Problems (User)"],
        summary: "Get previous hints",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "List of hints", content: { "application/json": { schema: { $ref: "#/components/schemas/PreviousHintsResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/user/problems/{problemId}/hints/request": {
      post: {
        tags: ["Problems (User)"],
        summary: "Request AI hint",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "AI generated hint", content: { "application/json": { schema: { $ref: "#/components/schemas/RequestHintResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/user/problems/{problemId}/solution": {
      post: {
        tags: ["Problems (User)"],
        summary: "Request full solution",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Full solution", content: { "application/json": { schema: { $ref: "#/components/schemas/FullSolutionResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/user/problems/{problemId}/code/submit": {
      post: {
        tags: ["Problems (User)"],
        summary: "Submit solution",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SubmitCodeRequest" }
            }
          }
        },
        responses: {
          "202": { description: "Submission queued", content: { "application/json": { schema: { $ref: "#/components/schemas/SubmitCodeResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/user/problems/{problemId}/{submissionId}/code/submit/result": {
      get: {
        tags: ["Problems (User)"],
        summary: "Get submission result",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } },
          { name: "submissionId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Submission result", content: { "application/json": { schema: { $ref: "#/components/schemas/SubmissionResultResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/user/problems/{problemId}/submissions": {
      get: {
        tags: ["Problems (User)"],
        summary: "List problem submissions",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } },
          { name: "cursor", in: "query", schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "integer" } }
        ],
        responses: {
          "200": { description: "List of submissions", content: { "application/json": { schema: { $ref: "#/components/schemas/ListProblemSubmissionsResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    // ==================== ADMIN PROBLEMS ====================
    "/admin/problems": {
      get: {
        tags: ["Problems (Admin)"],
        summary: "List all problems",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer" } },
          { name: "limit", in: "query", schema: { type: "integer" } }
        ],
        responses: {
          "200": { description: "List of problems", content: { "application/json": { schema: { $ref: "#/components/schemas/ListProblemsResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/problems/checkQuestionId": {
      get: {
        tags: ["Problems (Admin)"],
        summary: "Check question ID availability",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "questionId", in: "query", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Availability status" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/problems/checkTitle": {
      get: {
        tags: ["Problems (Admin)"],
        summary: "Check title availability",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "title", in: "query", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Availability status" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/problems/create": {
      post: {
        tags: ["Problems (Admin)"],
        summary: "Create problem",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateProblemRequest" }
            }
          }
        },
        responses: {
          "201": { description: "Problem created", content: { "application/json": { schema: { $ref: "#/components/schemas/CreateProblemResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/problems/{problemId}": {
      get: {
        tags: ["Problems (Admin)"],
        summary: "Get problem details",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Problem details", content: { "application/json": { schema: { $ref: "#/components/schemas/GetProblemAdminResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/problems/{problemId}/update": {
      patch: {
        tags: ["Problems (Admin)"],
        summary: "Update problem",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Problem updated" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/problems/{problemId}/testCases/add": {
      post: {
        tags: ["Problems (Admin)"],
        summary: "Add test case",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "201": { description: "Test case added" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/problems/{problemId}/testCases/bulkUpload": {
      post: {
        tags: ["Problems (Admin)"],
        summary: "Bulk upload test cases",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "201": { description: "Test cases uploaded" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/problems/{problemId}/testCases/{testCaseId}/remove": {
      delete: {
        tags: ["Problems (Admin)"],
        summary: "Remove test case",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } },
          { name: "testCaseId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Test case removed" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/problems/{problemId}/templateCodes/{templateCodeId}/update": {
      patch: {
        tags: ["Problems (Admin)"],
        summary: "Update template code",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "problemId", in: "path", required: true, schema: { type: "string" } },
          { name: "templateCodeId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Template code updated" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    // ==================== CODEPAD ====================
    "/public/codepad/code/run": {
      post: {
        tags: ["Codepad"],
        summary: "Run custom code",
        description: "Execute custom code in sandbox",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RunCodeRequest" }
            }
          }
        },
        responses: {
          "202": { description: "Code execution queued", content: { "application/json": { schema: { $ref: "#/components/schemas/RunCodeResponse" } } } },
          "400": { $ref: "#/components/responses/ValidationError" }
        }
      }
    },
    "/public/codepad/code/{tempId}/run/result": {
      get: {
        tags: ["Codepad"],
        summary: "Get codepad result",
        parameters: [
          { name: "tempId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "Execution result", content: { "application/json": { schema: { $ref: "#/components/schemas/CustomCodeResultResponse" } } } },
          "404": { $ref: "#/components/responses/NotFound" }
        }
      }
    },
    // ==================== COLLABORATION ====================
    "/user/collab/session/create": {
      post: {
        tags: ["Collaboration"],
        summary: "Create collaboration session",
        description: "Create a new real-time collaboration session",
        security: [{ bearerAuth: [] }],
        responses: {
          "201": { description: "Session created with invite token", content: { "application/json": { schema: { $ref: "#/components/schemas/CreateSessionResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    // ==================== LEADERBOARD ====================
    "/user/leaderboard/global": {
      get: {
        tags: ["Leaderboard"],
        summary: "Global leaderboard",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "limit", in: "query", schema: { type: "integer", default: 10 } }
        ],
        responses: {
          "200": { description: "Top global users", content: { "application/json": { schema: { $ref: "#/components/schemas/GlobalLeaderboardResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/user/leaderboard/country": {
      get: {
        tags: ["Leaderboard"],
        summary: "Country leaderboard",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "country", in: "query", required: true, schema: { type: "string" } },
          { name: "limit", in: "query", schema: { type: "integer", default: 10 } }
        ],
        responses: {
          "200": { description: "Top users in country", content: { "application/json": { schema: { $ref: "#/components/schemas/CountryLeaderboardResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    // ==================== DASHBOARD ====================
    "/user/dashboard": {
      get: {
        tags: ["Dashboard"],
        summary: "User dashboard",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "User analytics data", content: { "application/json": { schema: { $ref: "#/components/schemas/UserDashboardResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/dashboard": {
      get: {
        tags: ["Dashboard"],
        summary: "Admin dashboard",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "Admin analytics data", content: { "application/json": { schema: { $ref: "#/components/schemas/AdminDashboardResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    // ==================== METRICS (Admin) ====================
    "/admin/metrics/grpcMetrics": {
      get: {
        tags: ["Metrics"],
        summary: "Get gRPC metrics",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "gRPC request/response metrics", content: { "application/json": { schema: { $ref: "#/components/schemas/GrpcMetricsResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/metrics/httpMetrics": {
      get: {
        tags: ["Metrics"],
        summary: "Get HTTP metrics",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "HTTP request/response metrics", content: { "application/json": { schema: { $ref: "#/components/schemas/HttpMetricsResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    // ==================== USER MANAGEMENT (Admin) ====================
    "/admin/users": {
      get: {
        tags: ["User Management"],
        summary: "List users",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "page", in: "query", schema: { type: "integer" } },
          { name: "limit", in: "query", schema: { type: "integer" } },
          { name: "search", in: "query", schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "List of users", content: { "application/json": { schema: { $ref: "#/components/schemas/ListUsersResponse" } } } },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    },
    "/admin/users/{userId}/toggle-block": {
      patch: {
        tags: ["User Management"],
        summary: "Toggle user block status",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "userId", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": { description: "User block status toggled" },
          "401": { $ref: "#/components/responses/Unauthorized" }
        }
      }
    }
  }
};
var options = {
  swaggerDefinition,
  apis: []
  // We're defining paths inline in swaggerDefinition
};
var swaggerSpec = (0, import_swagger_jsdoc.default)(options);

// src/presentation/routes/user.ts
var import_express7 = __toESM(require("express"));

// src/presentation/routes/auth/user.ts
var import_express = __toESM(require("express"));

// src/transport/grpc/auth-user-service/UserServices.ts
var import_codex_shared_utils = require("@akashcapro/codex-shared-utils");

// src/transport/grpc/GrpcBaseService.ts
var import_grpc_js = require("@grpc/grpc-js");
var GrpcBaseService = class {
  grpcCall(method, request, metadata = new import_grpc_js.Metadata()) {
    return new Promise((resolve, reject) => {
      const deadline = new Date(Date.now() + config.DEFAULT_GRPC_TIMEOUT);
      const callOptions = { deadline };
      method(
        request,
        metadata,
        callOptions,
        (error, response) => {
          if (error) {
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }
};

// src/transport/grpc/auth-user-service/UserServices.ts
var import_grpc_js2 = require("@grpc/grpc-js");
var GrpcUserService = class extends GrpcBaseService {
  #_client;
  constructor() {
    super();
    this.#_client = new import_codex_shared_utils.AuthUserServiceClient(
      config.GRPC_AUTH_USER_SERVICE_URL,
      import_grpc_js2.credentials.createInsecure()
    );
  }
  signup = async (request) => {
    return this.grpcCall(this.#_client.signup.bind(this.#_client), request);
  };
  resendOtp = async (request) => {
    return this.grpcCall(this.#_client.resendOtp.bind(this.#_client), request);
  };
  verifyOtp = async (request) => {
    return this.grpcCall(this.#_client.verifyOtp.bind(this.#_client), request);
  };
  login = async (request) => {
    return this.grpcCall(this.#_client.login.bind(this.#_client), request);
  };
  oAuthLogin = async (request) => {
    return this.grpcCall(this.#_client.oAuthLogin.bind(this.#_client), request);
  };
  forgotPassword = async (request) => {
    return this.grpcCall(this.#_client.forgotPassword.bind(this.#_client), request);
  };
  resetPassword = async (request) => {
    return this.grpcCall(this.#_client.resetPassword.bind(this.#_client), request);
  };
  refreshToken = async (request) => {
    return this.grpcCall(this.#_client.refreshToken.bind(this.#_client), request);
  };
  profile = async (request) => {
    return this.grpcCall(this.#_client.profile.bind(this.#_client), request);
  };
  updateProfile = async (request) => {
    return this.grpcCall(this.#_client.updateProfile.bind(this.#_client), request);
  };
  changeEmail = async (request) => {
    return this.grpcCall(this.#_client.changeEmail.bind(this.#_client), request);
  };
  verifyNewEmail = async (request) => {
    return this.grpcCall(this.#_client.verifyNewEmail.bind(this.#_client), request);
  };
  changePassword = async (request) => {
    return this.grpcCall(this.#_client.changePassword.bind(this.#_client), request);
  };
  deleteAccount = async (request) => {
    return this.grpcCall(this.#_client.deleteAccount.bind(this.#_client), request);
  };
};
var UserServices_default = new GrpcUserService();

// src/presentation/controllers/auth/user.ts
var import_response_handler = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));

// src/util/set-cookie.ts
var import_ms = __toESM(require("ms"));
var import_dotenv3 = __toESM(require("dotenv"));
import_dotenv3.default.config();
var getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const secure = isProduction;
  const sameSite = secure ? "none" : "lax";
  const domain = isProduction ? process.env.domain ?? void 0 : void 0;
  return {
    httpOnly: true,
    secure,
    sameSite,
    domain,
    path: "/"
  };
};
var setCookie = (res, key, value, maxAge) => {
  res.cookie(key, value, {
    ...getCookieOptions(),
    maxAge: (0, import_ms.default)(maxAge)
  });
};

// src/config/redis/index.ts
var import_ioredis = __toESM(require("ioredis"));
var RedisClient = class _RedisClient {
  static instance;
  static isConnected = false;
  constructor() {
  }
  static getInstance() {
    if (!_RedisClient.instance) {
      _RedisClient.instance = new import_ioredis.default(config.REDIS_URL, {
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2e3);
          return delay;
        },
        maxRetriesPerRequest: 10
      });
      _RedisClient.setupEventListeners();
    }
    return _RedisClient.instance;
  }
  static setupEventListeners() {
    _RedisClient.instance.on("ready", () => {
      _RedisClient.isConnected = true;
      pinoLogger_default.info("Redis is ready");
    });
    _RedisClient.instance.on("error", (error) => {
      _RedisClient.isConnected = false;
      pinoLogger_default.error("Redis connection error:", error);
    });
    _RedisClient.instance.on("close", () => {
      _RedisClient.isConnected = false;
      pinoLogger_default.warn("Redis connection closed");
    });
    _RedisClient.instance.on("reconnecting", () => {
      pinoLogger_default.info("Reconnecting to Redis...");
    });
  }
  static isReady() {
    return _RedisClient.isConnected;
  }
};
var redis_default = RedisClient.getInstance();

// src/util/googleVerifier.ts
var import_google_auth_library = require("google-auth-library");
var client = new import_google_auth_library.OAuth2Client(config.GOOGLE_CLIENT_ID);
var verifyGoogleToken = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: config.GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();
  if (!payload) throw new Error("Invalid Google token");
  return {
    email: payload.email,
    name: payload.name,
    imageUrl: payload.picture,
    sub: payload.sub
  };
};

// src/util/cloudinary/index.ts
var import_cloudinary = require("cloudinary");
import_cloudinary.v2.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET
});
var cloudinary_default = import_cloudinary.v2;

// src/util/cloudinary/uploadImageToCloudinary.ts
var uploadImageFileToCloudinary = async (buffer, filename, folder = "profile_pictures") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary_default.uploader.upload_stream(
      {
        folder: `${folder}/${filename}`,
        public_id: "avatar",
        resource_type: "image",
        overwrite: true
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};
var uploadImageUrlToCloudinary = async (imageUrl, filename, folder = "profile_pictures") => {
  return new Promise((resolve, reject) => {
    cloudinary_default.uploader.upload(imageUrl, {
      folder: `${folder}/${filename}`,
      public_id: "avatar",
      resource_type: "image",
      overwrite: true
    }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

// src/config/redis/keyPrefix.ts
var REDIS_KEY_PREFIX = {
  USER_PROFILE: "user:profile:",
  BLACKLIST_ACCESS_TOKEN: "blacklistAccessToken:",
  BLACKLIST_REFRESH_TOKEN: "blacklistRefreshToken:",
  USER_BLOCKED: "user:blocked",
  SUBMISSION_NORMAL_CACHE: "submission:normal",
  RUN_CODE_NORMAL_CACHE: "run:normal",
  CUSTOM_CODE_NORMAL_CACHE: "custom:normal"
};

// src/const/auth-user/OtpType.const.ts
var OTP_TYPE = {
  SIGNUP: "SIGNUP",
  FORGOT_PASS: "FORGOT_PASS",
  CHANGE_EMAIL: "CHANGE_EMAIL"
};

// src/const/auth-user/UserSuccessTypes.const.ts
var USER_SUCCESS_TYPES = {
  PROFILE_DATA_LOADED: "Profile data loaded successfully",
  CHANGE_PASS: "New password updated.",
  CHANGE_EMAIL: "New email updated",
  OTP_ISSUED: "Otp send to new Email",
  NEW_OTP_ISSUED: "New otp issued",
  ACCOUNT_DELETED: "Your account has been deleted."
};

// src/const/labels.const.ts
var APP_LABELS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  ROLE: "role",
  USER: "user",
  USER_CAP: "USER",
  ADMIN: "admin",
  ADMIN_CAP: "ADMIN",
  LOGOUT_PATH: "/logout",
  QUERY: "query",
  PARAM: "params",
  BODY: "body"
};

// src/presentation/controllers/auth/user.ts
var authController = {
  signup: async (req, res, next) => {
    try {
      req.log.info("Signup request received");
      const grpcResponse = await UserServices_default.signup(req.validated?.body);
      req.log.info({ email: req.validated?.body.email }, "Signup gRPC response recieved");
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK);
    } catch (error) {
      req.log.error({ error, email: req.validated?.body.email }, "Signup failed");
      next(error);
    }
  },
  resendSignupOtp: async (req, res, next) => {
    try {
      const { email } = req.validated?.body;
      req.log.info({ email }, "Resend signup OTP request received");
      const grpcResponse = await UserServices_default.resendOtp({
        email,
        otpType: OTP_TYPE.SIGNUP
      });
      req.log.info({ email }, "Resend signup OTP gRPC response recieved");
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK);
    } catch (error) {
      req.log.error({ error, email: req.validated?.body.email }, "Resend signup OTP failed");
      next(error);
    }
  },
  verifyOtp: async (req, res, next) => {
    try {
      const { email } = req.validated?.body;
      req.log.info({ email }, "Verify OTP request received");
      const grpcResponse = await UserServices_default.verifyOtp(req.validated?.body);
      req.log.info({ userId: grpcResponse.userInfo?.userId, email }, "Verify OTP gRPC response recieved and cookies set");
      setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY);
      setCookie(res, APP_LABELS.REFRESH_TOKEN, grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY);
      setCookie(res, APP_LABELS.ROLE, APP_LABELS.USER, config.JWT_REFRESH_TOKEN_EXPIRY);
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK, grpcResponse.userInfo);
    } catch (error) {
      req.log.error({ error, email: req.validated?.body.email }, "Verify OTP failed");
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email } = req.body;
      req.log.info({ email }, "Login request received");
      const grpcResponse = await UserServices_default.login({
        email: req.body.email,
        password: req.body.password,
        role: APP_LABELS.USER_CAP
      });
      const userId = grpcResponse.userInfo?.userId;
      if (grpcResponse.accessToken && grpcResponse.refreshToken) {
        req.log.info({ userId, email }, "Login successful. Cookies set.");
        setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY);
        setCookie(res, APP_LABELS.REFRESH_TOKEN, grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY);
        setCookie(res, APP_LABELS.ROLE, APP_LABELS.USER, config.JWT_REFRESH_TOKEN_EXPIRY);
        console.log(grpcResponse);
        return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK, grpcResponse.userInfo);
      } else {
        req.log.warn({ email }, "Login gRPC response recieved, user not verified/accepted status");
        return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.ACCEPTED, "Not-verified");
      }
    } catch (error) {
      req.log.error({ error, email: req.body.email }, "Login failed");
      next(error);
    }
  },
  oAuthLogin: async (req, res, next) => {
    try {
      req.log.info("OAuth login request received. Verifying Google token...");
      let avatarPublicId = null;
      const { email, name, imageUrl, sub } = await verifyGoogleToken(req.validated?.body.oAuthId);
      req.log.info({ email, sub }, "Google token verified. Checking avatar...");
      if (imageUrl) {
        req.log.info({ email }, "Uploading OAuth image to Cloudinary...");
        const result = await uploadImageUrlToCloudinary(imageUrl, name.replace(/\s+/g, "_").toLowerCase());
        avatarPublicId = result.public_id;
        req.log.info({ email, avatarPublicId }, "Cloudinary upload complete.");
      }
      req.log.info({ email, sub }, "Calling OAuth login gRPC service...");
      const grpcResponse = await UserServices_default.oAuthLogin({
        email,
        firstName: name,
        oAuthId: sub,
        avatar: avatarPublicId || ""
      });
      req.log.info({ userId: grpcResponse.userInfo?.userId, email }, "OAuth login gRPC response recieved. Cookies set.");
      setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY);
      setCookie(res, APP_LABELS.REFRESH_TOKEN, grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY);
      setCookie(res, APP_LABELS.ROLE, APP_LABELS.USER, config.JWT_REFRESH_TOKEN_EXPIRY);
      console.log(grpcResponse);
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK, grpcResponse.userInfo);
    } catch (error) {
      req.log.error({ error }, "OAuth login failed");
      next(error);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.validated?.body;
      req.log.info({ email }, "Forgot password request received");
      const grpcResponse = await UserServices_default.forgotPassword(req.validated?.body);
      req.log.info({ email }, "Forgot password gRPC response recieved. OTP issued.");
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK);
    } catch (error) {
      req.log.error({ error, email: req.validated?.body.email }, "Forgot password failed");
      next(error);
    }
  },
  resendForgotOtp: async (req, res, next) => {
    try {
      const { email } = req.validated?.body;
      req.log.info({ email }, "Resend forgot OTP request received");
      const dto = {
        email,
        otpType: OTP_TYPE.FORGOT_PASS
      };
      await UserServices_default.resendOtp(dto);
      req.log.info({ email }, "Resend forgot OTP response recieved");
      return import_response_handler.default.success(
        res,
        USER_SUCCESS_TYPES.NEW_OTP_ISSUED,
        import_status_code.default.OK
      );
    } catch (error) {
      req.log.error({ error, email: req.validated?.body.email }, "Resend forgot OTP failed");
      next(error);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { email } = req.validated?.body;
      req.log.info({ email }, "Reset password request received");
      const { newPassword, otp } = req.validated?.body;
      const dto = {
        email,
        newPassword,
        otp
      };
      const grpcResponse = await UserServices_default.resetPassword(dto);
      req.log.info({ email }, "Reset password gRPC response. Password changed.");
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK);
    } catch (error) {
      req.log.error({ error, email: req.validated?.body.email }, "Reset password failed");
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { userId, email, role, username } = req;
      req.log.info({ userId, email }, "Refresh token request received");
      if (!userId || !email || !role || !username) {
        req.log.warn("Refresh token missing required context (userId/email/role)");
        return import_response_handler.default.error(res, "Invalid Token", import_status_code.default.UNAUTHORIZED);
      }
      const grpcResponse = await UserServices_default.refreshToken({ userId, email, role, username });
      req.log.info({ userId, email }, "Refresh token gRPC response recieved. Access token re-issued.");
      setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY);
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK, grpcResponse.userInfo);
    } catch (error) {
      req.log.error({ error, userId: req.userId }, "Refresh token failed");
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Logout request received");
      const now = Math.floor(Date.now() / 1e3);
      const accessTokenTtl = req.accessTokenExp - now;
      const refreshTokenTtl = req.refreshTokenExp - now;
      req.log.info({ userId, accessTokenId: req.accessTokenId }, "Blacklisting access token...");
      await redis_default.set(`${REDIS_KEY_PREFIX.BLACKLIST_ACCESS_TOKEN}${req.accessTokenId}`, "1", "EX", accessTokenTtl);
      req.log.info({ userId, refreshTokenId: req.refreshTokenId }, "Blacklisting refresh token...");
      await redis_default.set(`${REDIS_KEY_PREFIX.BLACKLIST_REFRESH_TOKEN}${req.refreshTokenId}`, "1", "EX", refreshTokenTtl);
      req.log.info({ userId }, "Tokens blacklisted. Clearing cookies.");
      const cookieOptions = getCookieOptions();
      res.clearCookie(APP_LABELS.ACCESS_TOKEN, cookieOptions);
      res.clearCookie(APP_LABELS.REFRESH_TOKEN, cookieOptions);
      res.clearCookie(APP_LABELS.ROLE, cookieOptions);
      req.log.info({ userId }, "Logout success");
      return import_response_handler.default.success(res, "Logout Successfully", import_status_code.default.OK);
    } catch (error) {
      req.log.error({ error, userId: req.userId }, "Logout failed");
      next(error);
    }
  }
};

// src/presentation/middlewares/jwt.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_response_handler2 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code2 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));

// src/const/ErrorTypes.const.ts
var APP_ERRORS = {
  TOKEN_NOT_FOUND: "Token not found",
  INVALID_TOKEN_PAYLOAD: "Invalid token payload",
  ENTRY_RESTRICTED: "Entry restricted",
  TOKEN_BLACKLISTED: "Token blacklisted",
  ACCOUNT_BLOCKED: "Account is blocked",
  TOKEN_VERIFICATION_FAILED: "Token verification failed",
  VALIDATION_ERROR: "Validation error",
  INVALID_FILE_FIELD: "Invalid file field",
  INVALID_FILE_TYPE: "Invalid file type",
  LARGE_FILE: "File too large"
};

// src/presentation/middlewares/jwt.ts
var verifyJwt = (token, secret) => {
  return import_jsonwebtoken.default.verify(token, secret);
};
var verifyAccessToken = (acceptedRole) => async (req, res, next) => {
  const token = req.cookies[APP_LABELS.ACCESS_TOKEN];
  if (!token)
    return import_response_handler2.default.error(
      res,
      APP_ERRORS.TOKEN_NOT_FOUND,
      import_status_code2.default.UNAUTHORIZED
    );
  try {
    const decoded = verifyJwt(
      token,
      config.JWT_ACCESS_TOKEN_SECRET
    );
    if (!decoded || !decoded.userId || !decoded.email || !decoded.role || !decoded.tokenId) {
      return import_response_handler2.default.error(
        res,
        APP_ERRORS.INVALID_TOKEN_PAYLOAD,
        import_status_code2.default.UNAUTHORIZED
      );
    }
    if (decoded.role !== acceptedRole.toUpperCase())
      return import_response_handler2.default.error(
        res,
        APP_ERRORS.ENTRY_RESTRICTED,
        import_status_code2.default.UNAUTHORIZED
      );
    const blacklisted = await redis_default.get(`${REDIS_KEY_PREFIX.BLACKLIST_ACCESS_TOKEN}${decoded.tokenId}`);
    if (blacklisted) {
      return import_response_handler2.default.error(
        res,
        APP_ERRORS.TOKEN_BLACKLISTED,
        import_status_code2.default.UNAUTHORIZED
      );
    }
    if (req.path !== APP_LABELS.LOGOUT_PATH) {
      const blocked = await redis_default.get(`${REDIS_KEY_PREFIX.USER_BLOCKED}:${decoded.userId}`);
      if (blocked) {
        return import_response_handler2.default.error(
          res,
          APP_ERRORS.ACCOUNT_BLOCKED,
          import_status_code2.default.FORBIDDEN
        );
      }
    }
    req.userId = decoded.userId;
    req.email = decoded.email;
    req.username = decoded.username;
    req.role = decoded.role;
    req.accessTokenId = decoded.tokenId;
    req.accessTokenExp = decoded.exp;
    next();
  } catch (error) {
    pinoLogger_default.error(APP_ERRORS.TOKEN_VERIFICATION_FAILED, error);
    return import_response_handler2.default.error(
      res,
      APP_ERRORS.INVALID_TOKEN_PAYLOAD,
      import_status_code2.default.UNAUTHORIZED
    );
  }
};
var verifyRefreshToken = (acceptedRole) => async (req, res, next) => {
  const token = req.cookies[APP_LABELS.REFRESH_TOKEN];
  if (!token)
    return import_response_handler2.default.error(
      res,
      APP_ERRORS.TOKEN_NOT_FOUND,
      import_status_code2.default.UNAUTHORIZED
    );
  try {
    const decoded = verifyJwt(token, config.JWT_REFRESH_TOKEN_SECRET);
    if (!decoded || !decoded.userId || !decoded.email || !decoded.role || !decoded.tokenId) {
      return import_response_handler2.default.error(
        res,
        APP_ERRORS.INVALID_TOKEN_PAYLOAD,
        import_status_code2.default.UNAUTHORIZED
      );
    }
    if (decoded.role !== acceptedRole.toUpperCase())
      return import_response_handler2.default.error(
        res,
        APP_ERRORS.ENTRY_RESTRICTED,
        import_status_code2.default.UNAUTHORIZED
      );
    const blacklisted = await redis_default.get(`${REDIS_KEY_PREFIX.BLACKLIST_ACCESS_TOKEN}${decoded.tokenId}`);
    if (blacklisted) {
      return import_response_handler2.default.error(
        res,
        APP_ERRORS.TOKEN_BLACKLISTED,
        import_status_code2.default.UNAUTHORIZED
      );
    }
    req.userId = decoded.userId;
    req.email = decoded.email;
    req.username = decoded.username;
    req.role = decoded.role;
    req.refreshTokenId = decoded.tokenId;
    req.refreshTokenExp = decoded.exp;
    next();
  } catch (error) {
    pinoLogger_default.error(APP_ERRORS.TOKEN_VERIFICATION_FAILED, error);
    return import_response_handler2.default.error(
      res,
      APP_ERRORS.INVALID_TOKEN_PAYLOAD,
      import_status_code2.default.UNAUTHORIZED
    );
  }
};

// src/presentation/middlewares/validateRequest.ts
var import_response_handler3 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code3 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var validateRequest = (schema, part = "body") => (req, res, next) => {
  const result = schema.safeParse(req[part]);
  if (!result.success) {
    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message
    }));
    return import_response_handler3.default.error(
      res,
      APP_ERRORS.VALIDATION_ERROR,
      import_status_code3.default.BAD_REQUEST,
      formattedErrors
    );
  }
  req.validated = {
    body: part === "body" ? result.data : req.validated?.body,
    params: part === "params" ? result.data : req.validated?.params,
    query: part === "query" ? result.data : req.validated?.query
  };
  next();
};
var validateFile = (options2) => (req, res, next) => {
  const { fieldName, maxSizeMB = 5, allowedMimeTypes = ["image/"] } = options2;
  if (!req.file) {
    return next();
  }
  if (req.file.fieldname !== fieldName) {
    return import_response_handler3.default.error(
      res,
      `${APP_ERRORS.INVALID_FILE_FIELD} Expected "${fieldName}"`,
      import_status_code3.default.BAD_REQUEST
    );
  }
  if (!allowedMimeTypes.some((type) => req?.file?.mimetype.startsWith(type))) {
    return import_response_handler3.default.error(res, APP_ERRORS.INVALID_FILE_TYPE, import_status_code3.default.BAD_REQUEST);
  }
  if (req.file.size > maxSizeMB * 1024 * 1024) {
    return import_response_handler3.default.error(res, `${APP_ERRORS.LARGE_FILE}, max size is ${maxSizeMB}MB`, import_status_code3.default.BAD_REQUEST);
  }
  next();
};

// src/validation/auth/user.schema.ts
var import_zod2 = require("zod");

// src/validation/helper.schema.ts
var import_countryCode = require("@akashcapro/codex-shared-utils/dist/enums/countryCode.enum");
var import_zod = require("zod");
var StrictString = (fieldName = "Field") => import_zod.z.string(`${fieldName} is required.`).trim().min(1, `${fieldName} cannot be empty.`).regex(
  /^(?!.*['-]{2,})(?!.* {2,})(?!.*[.,]{2,})[a-zA-Z0-9 .,'-]+$/,
  `${fieldName} contains invalid characters or has consecutive spaces, punctuation, apostrophes, or hyphens.`
);
var CountrySchema = import_zod.z.string().trim().transform((val) => {
  const upper = val.toUpperCase();
  if ((0, import_countryCode.isValidCountry)(upper)) {
    return upper;
  }
  const code = import_countryCode.CountryNameToCode[val.toLowerCase()];
  if (code) {
    return code;
  }
  return val;
}).refine(
  (val) => (0, import_countryCode.isValidCountry)(val),
  "Invalid country code"
);

// src/validation/auth/user.schema.ts
var signupSchema = import_zod2.z.object({
  username: import_zod2.z.string().min(3, "Username must be at least 3 characters").max(20, "Username must not exceed 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  firstName: import_zod2.z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be at most 50 characters").regex(/^[a-zA-Z]+$/, "First name must contain only letters"),
  lastName: import_zod2.z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be at most 50 characters").regex(/^[a-zA-Z]+$/, "Last name must contain only letters").optional(),
  email: import_zod2.z.email("Invalid email address").min(5).max(255),
  password: import_zod2.z.string().min(8, "Password must be at least 8 characters").max(100).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
  country: CountrySchema
});
var resendOtpSchema = import_zod2.z.object({
  email: import_zod2.z.email("Invalid email address").min(5).max(255)
});
var verifyOtpSchema = import_zod2.z.object({
  email: import_zod2.z.email("Invalid email address").min(5).max(255),
  otp: import_zod2.z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits").regex(/^\d+$/, "OTP must contain only numbers")
});
var userLoginSchema = import_zod2.z.object({
  email: import_zod2.z.email("Invalid email address").min(5).max(255),
  password: import_zod2.z.string().min(8, "Password must be at least 8 characters").max(100).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[@$!%*?&#]/, "Password must contain at least one special character")
});
var userGoogleLoginSchema = import_zod2.z.object({
  oAuthId: import_zod2.z.string()
});
var forgotPasswordSchema = import_zod2.z.object({
  email: import_zod2.z.email("Invalid email address").min(5).max(255)
});
var resetPasswordSchema = import_zod2.z.object({
  email: import_zod2.z.email("Invalid email address").min(5).max(255),
  newPassword: import_zod2.z.string().min(8, "Password must be at least 8 characters").max(100).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
  otp: import_zod2.z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits").regex(/^\d+$/, "OTP must contain only numbers")
});

// src/presentation/middlewares/rate-limiter.ts
var import_express_rate_limit = __toESM(require("express-rate-limit"));
var limiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 100
  // Limit each IP to 100 requests per window
});

// src/validation/profile/user.ts
var import_zod3 = __toESM(require("zod"));
var updateProfileSchema = import_zod3.default.object({
  username: import_zod3.default.string().min(3, "Username must be at least 3 characters").max(20, "Username must not exceed 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores").optional(),
  firstName: import_zod3.default.string().min(2, "First name must be at least 2 characters").max(50, "First name must be at most 50 characters").regex(/^[a-zA-Z]+$/, "First name must contain only letters").optional(),
  lastName: import_zod3.default.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be at most 50 characters").regex(/^[a-zA-Z]+$/, "Last name must contain only letters").optional(),
  country: CountrySchema.optional(),
  preferredLanguage: import_zod3.default.string().min(2, "Preferred language field must be at least 2 characters").max(15).optional()
});
var changePasswordSchema = import_zod3.default.object({
  currPass: import_zod3.default.string().min(8, "Password must be at least 8 characters").max(100).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
  newPass: import_zod3.default.string().min(8, "Password must be at least 8 characters").max(100).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[@$!%*?&#]/, "Password must contain at least one special character")
});
var changeEmailSchema = import_zod3.default.object({
  newEmail: import_zod3.default.email("Invalid email address").min(5).max(255),
  password: import_zod3.default.string().min(8, "Password must be at least 8 characters").max(100).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[@$!%*?&#]/, "Password must contain at least one special character")
});
var emailSchema = import_zod3.default.object({
  email: import_zod3.default.email("Invalid email address").min(5).max(255)
});
var deleteAccountSchema = import_zod3.default.object({
  password: import_zod3.default.string().min(8, "Password must be at least 8 characters").max(100).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[@$!%*?&#]/, "Password must contain at least one special character")
});

// src/presentation/routes/auth/user.ts
var userAuthRouter = import_express.default.Router();
userAuthRouter.use(limiter);
userAuthRouter.post(
  "/signup",
  validateRequest(signupSchema),
  authController.signup
);
userAuthRouter.post(
  "/otp/resend-otp",
  validateRequest(resendOtpSchema),
  authController.resendSignupOtp
);
userAuthRouter.post(
  "/otp/verify-otp",
  validateRequest(verifyOtpSchema),
  authController.verifyOtp
);
userAuthRouter.post(
  "/login",
  validateRequest(userLoginSchema),
  authController.login
);
userAuthRouter.post(
  "/login/google-login",
  validateRequest(userGoogleLoginSchema),
  authController.oAuthLogin
);
userAuthRouter.post(
  "/password/forgot/request",
  validateRequest(forgotPasswordSchema),
  authController.forgotPassword
);
userAuthRouter.post(
  "/password/forgot/request/resend-otp",
  validateRequest(emailSchema),
  authController.resendForgotOtp
);
userAuthRouter.post(
  "/password/forgot/change",
  validateRequest(resetPasswordSchema),
  authController.resetPassword
);
userAuthRouter.post(
  "/refresh-token",
  verifyRefreshToken(APP_LABELS.USER),
  authController.refreshToken
);
userAuthRouter.delete(
  "/logout",
  verifyAccessToken(APP_LABELS.USER),
  verifyRefreshToken(APP_LABELS.USER),
  authController.logout
);

// src/presentation/routes/profile/user.ts
var import_express2 = __toESM(require("express"));

// src/presentation/controllers/profile/user.ts
var import_response_handler4 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code4 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var profileController = {
  profile: async (req, res, next) => {
    try {
      const { userId, email } = req;
      req.log.info({ userId }, "Load profile request recieved");
      const cached = await redis_default.get(`${REDIS_KEY_PREFIX.USER_PROFILE}${userId}`);
      if (cached) {
        req.log.info({ userId }, "Load profile data **from cache** (HIT)");
        return import_response_handler4.default.success(
          res,
          USER_SUCCESS_TYPES.PROFILE_DATA_LOADED,
          import_status_code4.default.OK,
          JSON.parse(cached)
        );
      }
      req.log.info({ userId }, "Load profile data from gRPC service (MISS)");
      const grpcResponse = await UserServices_default.profile({
        userId,
        email
      });
      req.log.info({ userId }, "Load profile response recieved");
      return import_response_handler4.default.success(
        res,
        USER_SUCCESS_TYPES.PROFILE_DATA_LOADED,
        import_status_code4.default.OK,
        grpcResponse
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Load profile failed");
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Update profile request recieved");
      const { username, firstName, lastName, country, preferredLanguage } = req.validated?.body;
      const avatarFile = req.file;
      let avatarUrl = null;
      if (avatarFile) {
        req.log.info({ userId }, "Uploading new avatar to Cloudinary");
        const result2 = await uploadImageFileToCloudinary(
          avatarFile.buffer,
          req.email
        );
        avatarUrl = result2.public_id;
        req.log.info({ userId, avatarUrl }, "Avatar uploaded successfully");
      }
      const dto = {
        userId: req.userId,
        ...username ? { username } : {},
        ...firstName ? { firstName } : {},
        ...lastName ? { lastName } : {},
        ...country ? { country } : {},
        ...preferredLanguage ? { preferredLanguage } : {},
        ...avatarUrl ? { avatar: avatarUrl } : {}
      };
      const result = await UserServices_default.updateProfile(dto);
      req.log.info({ userId }, "Update profile response recieved");
      return import_response_handler4.default.success(
        res,
        result.message,
        import_status_code4.default.OK,
        result.updatedData ?? null
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Update profile failed");
      next(error);
    }
  },
  changePass: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Change password request recieved");
      const { currPass, newPass } = req.validated?.body;
      const dto = {
        userId: req.userId,
        currPass,
        newPass
      };
      await UserServices_default.changePassword(dto);
      req.log.info({ userId }, "Change password response recieved");
      return import_response_handler4.default.success(
        res,
        USER_SUCCESS_TYPES.CHANGE_PASS,
        import_status_code4.default.OK
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Change password failed");
      next(error);
    }
  },
  changeEmail: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Change email request recieved");
      const { newEmail, password } = req.validated?.body;
      const dto = {
        userId: req.userId,
        newEmail,
        password
      };
      await UserServices_default.changeEmail(dto);
      req.log.info({ userId }, "Change email OTP issued response recieved");
      return import_response_handler4.default.success(
        res,
        USER_SUCCESS_TYPES.OTP_ISSUED,
        import_status_code4.default.OK
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Change email failed");
      next(error);
    }
  },
  resendOtp: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Resend OTP request recieved");
      const { email } = req.validated?.body;
      const dto = {
        email,
        otpType: OTP_TYPE.CHANGE_EMAIL
      };
      await UserServices_default.resendOtp(dto);
      req.log.info({ userId }, "Resend OTP response recieved");
      return import_response_handler4.default.success(
        res,
        USER_SUCCESS_TYPES.NEW_OTP_ISSUED,
        import_status_code4.default.OK
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Resend OTP failed");
      next(error);
    }
  },
  verifyOtp: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Verify OTP request recieved");
      const { email, otp } = req.validated?.body;
      const dto = {
        userId: req.userId,
        email,
        otp
      };
      await UserServices_default.verifyNewEmail(dto);
      req.log.info({ userId }, "Verify OTP (change email) success response recieved");
      return import_response_handler4.default.success(
        res,
        USER_SUCCESS_TYPES.CHANGE_EMAIL,
        import_status_code4.default.OK
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Verify OTP failed");
      next(error);
    }
  },
  deleteAccount: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Delete account request recieved");
      const { password } = req.validated?.body;
      const dto = {
        userId: req.userId,
        password
      };
      await UserServices_default.deleteAccount(dto);
      req.log.info({ userId }, "Delete account success response recieved");
      return import_response_handler4.default.success(
        res,
        USER_SUCCESS_TYPES.ACCOUNT_DELETED,
        import_status_code4.default.OK
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Delete account failed");
      next(error);
    }
  }
};

// src/util/multer.ts
var import_multer = __toESM(require("multer"));
var storage = import_multer.default.memoryStorage();
var upload = (0, import_multer.default)({ storage });

// src/presentation/routes/profile/user.ts
var userProfileRouter = import_express2.default.Router();
userProfileRouter.get(
  "/",
  profileController.profile
);
userProfileRouter.patch(
  "/update",
  upload.single("avatar"),
  validateFile({ fieldName: "avatar" }),
  validateRequest(updateProfileSchema),
  profileController.update
);
userProfileRouter.post(
  "/password/change",
  validateRequest(changePasswordSchema),
  profileController.changePass
);
userProfileRouter.post(
  "/email/change",
  validateRequest(changeEmailSchema),
  profileController.changeEmail
);
userProfileRouter.post(
  "/email/change/resend-otp",
  validateRequest(emailSchema),
  profileController.resendOtp
);
userProfileRouter.post(
  "/email/change/verify",
  validateRequest(verifyOtpSchema),
  profileController.verifyOtp
);
userProfileRouter.patch(
  "/delete",
  validateRequest(deleteAccountSchema),
  profileController.deleteAccount
);

// src/presentation/routes/problems/user.ts
var import_express3 = __toESM(require("express"));

// src/transport/grpc/code-manage-service/CodeManageService.ts
var import_code_manage = require("@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/code_manage");
var import_grpc_js3 = require("@grpc/grpc-js");
var GrpcCodeManageService = class extends GrpcBaseService {
  #_client;
  constructor() {
    super();
    this.#_client = new import_code_manage.CodeManageServiceClient(
      config.GRPC_CODE_MANAGE_SERVICE_URL,
      import_grpc_js3.credentials.createInsecure()
    );
  }
  submitCodeExec = async (request) => {
    return this.grpcCall(
      this.#_client.submitCodeExec.bind(this.#_client),
      request
    );
  };
  runCodeExec = async (request) => {
    return this.grpcCall(
      this.#_client.runCodeExec.bind(this.#_client),
      request
    );
  };
  customCodeExec = async (request) => {
    return this.grpcCall(
      this.#_client.customCodeExec.bind(this.#_client),
      request
    );
  };
};
var CodeManageService_default = new GrpcCodeManageService();

// src/transport/grpc/problem-service/SubmissionServices.ts
var import_problem = require("@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem");
var import_grpc_js4 = require("@grpc/grpc-js");
var import_empty = require("@akashcapro/codex-shared-utils/dist/proto/compiled/google/protobuf/empty");
var GrpcSubmissionService = class extends GrpcBaseService {
  #_client;
  constructor() {
    super();
    this.#_client = new import_problem.SubmissionServiceClient(
      config.GRPC_PROBLEM_SERVICE_URL,
      import_grpc_js4.credentials.createInsecure()
    );
  }
  listProblemSpecificSubmission = async (request) => {
    return this.grpcCall(
      this.#_client.listProblemSpecificSubmission.bind(this.#_client),
      request
    );
  };
  listTopKGlobalLeaderboard = async (request) => {
    return this.grpcCall(
      this.#_client.listTopKGlobalLeaderboard.bind(this.#_client),
      request
    );
  };
  listTopKCountryLeaderboard = async (request) => {
    return this.grpcCall(
      this.#_client.listTopKCountryLeaderboard.bind(this.#_client),
      request
    );
  };
  getDashboardStats = async (request) => {
    return this.grpcCall(
      this.#_client.getDashboardStats.bind(this.#_client),
      request
    );
  };
  getProblemSubmissionStats = async () => {
    return this.grpcCall(
      this.#_client.getProblemSubmissionStats.bind(this.#_client),
      import_empty.Empty
    );
  };
  getPreviousHints = async (request) => {
    return this.grpcCall(
      this.#_client.getPreviousHints.bind(this.#_client),
      request
    );
  };
  requestHint = async (request) => {
    return this.grpcCall(
      this.#_client.requestHint.bind(this.#_client),
      request
    );
  };
  requestFullSolution = async (request) => {
    return this.grpcCall(
      this.#_client.requestFullSolution.bind(this.#_client),
      request
    );
  };
};
var SubmissionServices_default = new GrpcSubmissionService();

// src/presentation/controllers/problem/user.ts
var import_response_handler5 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));

// src/const/codeManage/SuccessTypes.const.ts
var CODE_MANAGE_SUCCESS_TYPE = {
  SUBMISSION_CREATED: "Submission successfully created",
  SUBMISSION_RESULT_FETCHED: "Submission result retrieved",
  CODE_EXECUTION_STARTED: "Code execution started",
  CODE_EXECUTION_COMPLETED: "Code executed successfully",
  RESULT_STATUS: "Pending or already fetched"
};

// src/presentation/controllers/problem/user.ts
var import_status_code5 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));

// src/const/problem/SuccessTypes.const.ts
var PROBLEM_SUCCESS_TYPE = {
  PROBLEM_CREATED: "New problem created",
  PROBLEM_DETAILS_LOADED: "Problem details loaded",
  PROBLEM_BASIC_DETAILS_UPDATED: "Problem basic details updated",
  PROBLEMS_LOADED: "Problems loaded.",
  TEST_CASE_ADDED: "Testcase added",
  MULTIPLE_TEST_CASES_ADDED: "Multiple testcases added",
  REMOVED_TEST_CASE: "Testcase Removed",
  SOLUTION_CODE_ADDED: "Solution code added successfully",
  SOLUTION_CODE_UPDATED: "Solution code updated",
  SOLUTION_CODE_REMOVED: "Solution code removed",
  QUESTION_ID_AVAILABLE: "QuestionId is available",
  TITLE_AVAILABLE: "Title is available",
  TEMPLATE_CODE_UPDATED: "Template code updated"
};
var SUBMISSION_SUCCESS_TYPE = {
  LIST_SUBMISSIONS: "Submission loaded successfully",
  GLOBAL_LEADERBOARD: "Global leaderboard loaded successfully",
  COUNTRY_LEADERBOARD: "Country leaderboard loaded successfully",
  DASHBOARD_STATS: "Dashboard stats loaded successfully",
  PREVIOUS_HINTS_FETCHED: "Previous hints fetched successfully",
  NEW_HINT_RECIEVIED: "New hint recieved successfully",
  FULL_SOLUTION_RECIEVED: "Full solution recieved successfully"
};

// src/presentation/controllers/problem/user.ts
var userProblemController = {
  submitProblem: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Submit problem request recieved");
      const { problemId } = req.validated?.params;
      const { language, userCode, country } = req.validated?.body;
      const dto = {
        problemId,
        userId: req.userId,
        username: req.username,
        language,
        userCode,
        ...country ? { country } : {}
      };
      const result = await CodeManageService_default.submitCodeExec(dto);
      req.log.info({ userId, submissionId: result.submissionId }, "Submit problem response recieved");
      return import_response_handler5.default.success(
        res,
        CODE_MANAGE_SUCCESS_TYPE.SUBMISSION_CREATED,
        import_status_code5.default.OK,
        result
      );
    } catch (error) {
      req.log.error({ userId: req.userId }, "Submit problem failed");
      next(error);
    }
  },
  submissionResult: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Submission result request recieved");
      const { submissionId } = req.validated?.params;
      const cacheKey = `${REDIS_KEY_PREFIX.SUBMISSION_NORMAL_CACHE}:${submissionId}`;
      const cached = await redis_default.get(cacheKey);
      if (!cached) {
        req.log.warn({ userId, submissionId }, "Submission result not found in cache. Returning status only.");
        return import_response_handler5.default.success(
          res,
          CODE_MANAGE_SUCCESS_TYPE.RESULT_STATUS,
          import_status_code5.default.OK
        );
      }
      req.log.info({ userId, submissionId }, "Submission result fetched from cache");
      return import_response_handler5.default.success(
        res,
        CODE_MANAGE_SUCCESS_TYPE.SUBMISSION_RESULT_FETCHED,
        import_status_code5.default.OK,
        JSON.parse(cached)
      );
    } catch (error) {
      req.log.error({ userId: req.userId }, "Submission result failed");
      next(error);
    }
  },
  listProblemSpecifiSubmissions: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "List problem specific submissions request recieved");
      const { problemId } = req.validated?.params;
      const { limit, nextCursor } = req.validated?.query;
      const dto = {
        problemId,
        limit,
        userId: req.userId,
        nextCursor: nextCursor ?? void 0
      };
      const result = await SubmissionServices_default.listProblemSpecificSubmission(dto);
      req.log.info({ userId, problemId, count: result.submissions?.length }, "List problem specific submissions response recieved");
      return import_response_handler5.default.success(
        res,
        SUBMISSION_SUCCESS_TYPE.LIST_SUBMISSIONS,
        import_status_code5.default.OK,
        result
      );
    } catch (error) {
      req.log.error({ userId: req.userId }, "List problem specific submissions failed");
      next(error);
    }
  },
  getPreviousHints: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Get previous hints request recieved");
      const { problemId } = req.validated?.params;
      const result = await SubmissionServices_default.getPreviousHints({
        userId,
        problemId
      });
      req.log.info({ userId, problemId }, "Get previous hints response recieved");
      return import_response_handler5.default.success(
        res,
        SUBMISSION_SUCCESS_TYPE.PREVIOUS_HINTS_FETCHED,
        import_status_code5.default.OK,
        result
      );
    } catch (error) {
      req.log.error({ userId: req.userId }, "Get previous hints failed");
      next(error);
    }
  },
  requestHint: async (req, res, next) => {
    try {
      const { userId } = req;
      const { problemId } = req.validated?.params;
      const { userCode, language } = req.body;
      req.log.info({ userId }, "Request hint request recieved");
      const result = await SubmissionServices_default.requestHint({
        userId: req.userId,
        problemId,
        userCode,
        language
      });
      req.log.info({ userId, problemId }, "Request hint response recieved");
      return import_response_handler5.default.success(
        res,
        SUBMISSION_SUCCESS_TYPE.NEW_HINT_RECIEVIED,
        import_status_code5.default.OK,
        result
      );
    } catch (error) {
      req.log.error({ userId: req.userId }, "Request hint failed");
      next(error);
    }
  },
  requestFullSolution: async (req, res, next) => {
    try {
      const { userId } = req;
      const { problemId } = req.validated?.params;
      const { language } = req.body;
      req.log.info({ userId }, "Request full solution request recieved");
      const result = await SubmissionServices_default.requestFullSolution({
        userId: req.userId,
        problemId,
        language
      });
      req.log.info({ userId, problemId }, "Request full solution response recieved");
      return import_response_handler5.default.success(
        res,
        SUBMISSION_SUCCESS_TYPE.FULL_SOLUTION_RECIEVED,
        import_status_code5.default.OK,
        result
      );
    } catch (error) {
      next(error);
    }
  }
};

// src/validation/code-exec/submit.schema.ts
var import_zod5 = require("zod");

// src/validation/problem/helpers.schema.ts
var import_zod4 = require("zod");
var Difficulty = /* @__PURE__ */ ((Difficulty2) => {
  Difficulty2["EASY"] = "easy";
  Difficulty2["MEDIUM"] = "medium";
  Difficulty2["HARD"] = "hard";
  return Difficulty2;
})(Difficulty || {});
var TestCaseCollectionType = /* @__PURE__ */ ((TestCaseCollectionType2) => {
  TestCaseCollectionType2["RUN"] = "run";
  TestCaseCollectionType2["SUBMIT"] = "submit";
  return TestCaseCollectionType2;
})(TestCaseCollectionType || {});
var Language = /* @__PURE__ */ ((Language2) => {
  Language2["JAVASCRIPT"] = "javascript";
  Language2["PYTHON"] = "python";
  Language2["GO"] = "go";
  return Language2;
})(Language || {});
var testCaseCollectionTypeMap = {
  ["run" /* RUN */]: 1,
  ["submit" /* SUBMIT */]: 2
};
var difficultyCodeMap = {
  ["easy" /* EASY */]: 1,
  ["medium" /* MEDIUM */]: 2,
  ["hard" /* HARD */]: 3
};
var languageMap = {
  ["javascript" /* JAVASCRIPT */]: 1,
  ["python" /* PYTHON */]: 2,
  ["go" /* GO */]: 3
};
function escapeRegex(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var NonEmpty = import_zod4.z.string().trim().min(1, "Value cannot be empty");
var DifficultySchemaEnum = import_zod4.z.string("Difficulty is required").transform((val) => val.toLowerCase().trim()).refine(
  (val) => Object.values(Difficulty).includes(val),
  "Invalid difficulty value"
).transform((val) => difficultyCodeMap[val]);
var LanguageSchemaEnum = import_zod4.z.string("Language is required").transform((val) => val.toLowerCase().trim()).refine(
  (val) => Object.values(Language).includes(val),
  "Invalid language value"
).transform((val) => languageMap[val]);
var TestCaseCollectionTypeEnum = import_zod4.z.string("Testcase collection type is required").transform((val) => val.toLowerCase().trim()).refine(
  (val) => Object.values(TestCaseCollectionType).includes(val),
  "Invalid test case collection type"
).transform((val) => testCaseCollectionTypeMap[val]);
var TestCaseSchema = import_zod4.z.object({
  input: NonEmpty.min(1, "Test case input is required"),
  output: NonEmpty.min(1, "Test case output is required")
});
var ExampleSchema = import_zod4.z.object({
  input: NonEmpty.min(1, "Input is required"),
  output: NonEmpty.min(1, "Output is required"),
  explanation: import_zod4.z.string().optional()
});
var StarterCodeSchema = import_zod4.z.object({
  language: LanguageSchemaEnum,
  code: NonEmpty
});
var SolutionRoadmapSchema = import_zod4.z.object({
  level: import_zod4.z.number().min(1, "Level must be at least 1"),
  description: import_zod4.z.string().trim().min(5, "Description must be at least 5 characters")
});
var codeSchema = import_zod4.z.string("Code field is required").min(1, "Code field cannot be empty").max(1e4, "Code exceeds maximum allowed length (10,000 characters)");

// src/validation/code-exec/submit.schema.ts
var submitCodeExecSchema = import_zod5.z.object({
  country: CountrySchema.optional(),
  userCode: codeSchema,
  language: LanguageSchemaEnum
});
var submitCodeResultQuerySchema = import_zod5.z.object({
  submissionId: import_zod5.z.string().min(1, "submissionId is required")
});

// src/validation/problem/problem.schema.ts
var import_zod6 = require("zod");
var checkQuestionIdQuerySchema = import_zod6.z.object({
  questionId: import_zod6.z.string("Question ID is required")
});
var checkTitleQuerySchema = import_zod6.z.object({
  title: import_zod6.z.string("Title is required")
});
var createProblemSchema = import_zod6.z.object({
  questionId: import_zod6.z.string("Question ID is required"),
  title: StrictString("Title").min(3, "Title must be atleast 5 characters long").max(100, "Title must not exceed 100 characters"),
  description: import_zod6.z.string().trim().min(20, "Description must be at least 20 characters long").max(2e3, "Description must not exceed 2000 characters"),
  difficulty: DifficultySchemaEnum,
  tags: import_zod6.z.array(
    StrictString("Tag").min(2, "Tag must be at least 2 characters").max(30, "Tag must not exceed 30 characters")
  ).min(1, 'At least one tag is required" ').max(5, "You can specify up to 5 tags")
});
var getProblemlistQuerySchema = import_zod6.z.object({
  title: StrictString("Title").trim().min(3, "Title must be atleast 5 characters long").max(100, "Title must not exceed 100 characters").optional(),
  questionId: StrictString("QuestionId").optional(),
  page: import_zod6.z.coerce.number("Page must be a number").int().min(1, "Page must be at least 1").default(1),
  limit: import_zod6.z.coerce.number("Limit must be a number").int().min(1, "Limit must be at least 1").max(100, "Limit must not exceed 100").default(5),
  difficulty: DifficultySchemaEnum.optional(),
  tags: import_zod6.z.array(import_zod6.z.string().trim()).optional().default([]),
  active: import_zod6.z.preprocess(
    (val) => {
      if (typeof val === "string") {
        if (val.toLowerCase() === "false") return false;
        if (val.toLowerCase() === "true") return true;
      }
      return val;
    },
    import_zod6.z.boolean("Active must be boolean").optional()
  ),
  search: import_zod6.z.string().trim().optional().transform((val) => val ? escapeRegex(val) : void 0),
  sort: import_zod6.z.string().trim().optional()
});
var UpdateBasicProblemDetailsSchema = import_zod6.z.object({
  questionId: StrictString("QuestionId").optional(),
  title: StrictString("Title").optional(),
  description: import_zod6.z.string("Description").min(20, "Description must be at least 20 characters").max(2e3, "Description must not exceed 2000 characters").optional(),
  difficulty: DifficultySchemaEnum.optional(),
  active: import_zod6.z.boolean().optional(),
  tags: import_zod6.z.array(StrictString("Tags").min(1).max(20)).nonempty("At least one tag is required").optional(),
  constraints: import_zod6.z.array(NonEmpty).optional(),
  examples: import_zod6.z.array(ExampleSchema).optional(),
  starterCodes: import_zod6.z.array(StarterCodeSchema).optional(),
  solutionRoadmap: import_zod6.z.array(SolutionRoadmapSchema).min(5, "You must provide exactly 5 solution steps.").max(5, "You must provide exactly 5 solution steps.").optional()
});
var AddTestCaseSchema = import_zod6.z.object({
  testCaseCollectionType: TestCaseCollectionTypeEnum,
  testCase: TestCaseSchema
});
var BulkUploadTestCasesSchema = import_zod6.z.object({
  testCaseCollectionType: TestCaseCollectionTypeEnum,
  testCase: import_zod6.z.array(TestCaseSchema).nonempty("At least one test case is required")
});
var RemoveTestCaseParamSchema = import_zod6.z.object({
  problemId: NonEmpty.min(1, "ProblemId is required"),
  testCaseId: NonEmpty.min(1, "Test caseId is required")
});
var RemoveTestCaseQuerySchema = import_zod6.z.object({
  testCaseCollectionType: TestCaseCollectionTypeEnum
});
var AddSolutionCodeSchema = import_zod6.z.object({
  language: LanguageSchemaEnum,
  code: codeSchema,
  executionTime: import_zod6.z.coerce.number("Execution time required"),
  memoryTaken: import_zod6.z.coerce.number("MemoryTaken required")
});
var UpdateSolutionCodeSchema = import_zod6.z.object({
  language: LanguageSchemaEnum.optional(),
  code: codeSchema.optional(),
  executionTime: import_zod6.z.coerce.number("Execution time required").optional(),
  memoryTaken: import_zod6.z.coerce.number("MemoryTaken required").optional()
});
var RemoveSolutionCodeSchema = import_zod6.z.object({
  solutionCodeId: NonEmpty.min(1, "Solution code id is required")
});
var ProblemIdParamsSchema = import_zod6.z.object({
  problemId: import_zod6.z.string("Problem Id is required")
});
var SubmitResultParamsSchema = import_zod6.z.object({
  problemId: import_zod6.z.string("Problem id is required"),
  submissionId: import_zod6.z.string("Submission id is required")
});
var SolutionCodeParamsSchema = import_zod6.z.object({
  problemId: import_zod6.z.string("Problem Id is required"),
  solutionCodeId: import_zod6.z.string("Solution Id is required")
});
var TemplateCodeParamsSchema = import_zod6.z.object({
  problemId: import_zod6.z.string("Problem Id is required"),
  templateCodeId: import_zod6.z.string("TemplateCode Id is required")
});
var UpdateTemplateCodeSchema = import_zod6.z.object({
  language: LanguageSchemaEnum.optional(),
  submitWrapperCode: import_zod6.z.string().optional(),
  runWrapperCode: import_zod6.z.string().optional()
});
var ListProblemSpecificsubmissionsSchemaQuery = import_zod6.z.object({
  limit: import_zod6.z.coerce.number("Limit must be a number").int().min(1, "Limit must be at least 1").max(100, "Limit must not exceed 100").default(5),
  nextCursor: import_zod6.z.string().optional()
});
var RequestHintSchema = import_zod6.z.object({
  userCode: codeSchema,
  language: import_zod6.z.enum(["javascript", "python", "go"], "language is required")
});
var RequestFullSolutionSchema = import_zod6.z.object({
  language: import_zod6.z.enum(["javascript", "python", "go"], "language is required")
});

// src/presentation/routes/problems/user.ts
var userProblemRouter = import_express3.default.Router();
userProblemRouter.get(
  "/:problemId/hints",
  validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
  userProblemController.getPreviousHints
);
userProblemRouter.post(
  "/:problemId/hints/request",
  validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
  validateRequest(RequestHintSchema),
  userProblemController.requestHint
);
userProblemRouter.post(
  "/:problemId/solution",
  validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
  validateRequest(RequestFullSolutionSchema),
  userProblemController.requestFullSolution
);
userProblemRouter.post(
  "/:problemId/code/submit",
  validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
  validateRequest(submitCodeExecSchema),
  userProblemController.submitProblem
);
userProblemRouter.get(
  "/:problemId/:submissionId/code/submit/result",
  validateRequest(SubmitResultParamsSchema, APP_LABELS.PARAM),
  userProblemController.submissionResult
);
userProblemRouter.get(
  "/:problemId/submissions",
  validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
  validateRequest(ListProblemSpecificsubmissionsSchemaQuery, APP_LABELS.QUERY),
  userProblemController.listProblemSpecifiSubmissions
);

// src/transport/grpc/collab-service/collab-service.ts
var import_collab = require("@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/collab");
var import_grpc_js5 = require("@grpc/grpc-js");
var import_empty2 = require("@akashcapro/codex-shared-utils/dist/proto/compiled/google/protobuf/empty");
var GrpcCollabService = class extends GrpcBaseService {
  #_client;
  constructor() {
    super();
    this.#_client = new import_collab.SessionManagerClient(
      config.GRPC_COLLAB_SERVICE_URL,
      import_grpc_js5.credentials.createInsecure()
    );
  }
  createSession = async (request) => {
    return this.grpcCall(
      this.#_client.createSession.bind(this.#_client),
      request
    );
  };
  getSessionStats = async () => {
    return this.grpcCall(
      this.#_client.getSessionStats.bind(this.#_client),
      import_empty2.Empty
    );
  };
};
var collab_service_default = new GrpcCollabService();

// src/presentation/controllers/collab/user.ts
var import_response_handler6 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));

// src/const/collabService/SuccessTypes.const.ts
var COLLAB_SUCCESS_TYPE = {
  SESSION_CREATED: "Session created successfully"
};

// src/presentation/controllers/collab/user.ts
var import_status_code6 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var collabController = {
  createSession: async (req, res, next) => {
    try {
      const ownerId = req.userId;
      req.log.info({ ownerId }, "Collab create session request received");
      const dto = {
        ownerId
      };
      const result = await collab_service_default.createSession(dto);
      req.log.info({ ownerId }, "Collab create session gRPC response received");
      return import_response_handler6.default.success(
        res,
        COLLAB_SUCCESS_TYPE.SESSION_CREATED,
        import_status_code6.default.CREATED,
        result
      );
    } catch (error) {
      next(error);
    }
  }
};

// src/presentation/routes/collab/user.ts
var import_express4 = __toESM(require("express"));
var userCollabRouter = import_express4.default.Router();
userCollabRouter.post(
  "/session/create",
  collabController.createSession
);

// src/validation/leaderboard/leaderboard.schema.ts
var import_zod7 = require("zod");
var globalLeaderboardSchema = import_zod7.z.object({
  k: import_zod7.z.coerce.number("K must be a number").int().min(2, "K must be at least 2").default(10)
});
var countryLeaderboardSchema = import_zod7.z.object({
  country: CountrySchema,
  k: import_zod7.z.coerce.number("K must be a number").int().min(2, "K must be at least 2").default(10)
});

// src/presentation/routes/leaderboard/user.ts
var import_express5 = __toESM(require("express"));

// src/presentation/controllers/leaderboard/user.ts
var import_response_handler7 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code7 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var LeaderboardController = {
  getTopKGlobal: async (req, res, next) => {
    try {
      const { k } = req.validated?.query;
      req.log.info({ k }, "Get top k global leaderboard request recieved");
      const result = await SubmissionServices_default.listTopKGlobalLeaderboard({ k });
      req.log.info({ k }, "Get top k global leaderboard response recieved");
      return import_response_handler7.default.success(
        res,
        SUBMISSION_SUCCESS_TYPE.GLOBAL_LEADERBOARD,
        import_status_code7.default.OK,
        result
      );
    } catch (error) {
      next(error);
    }
  },
  getTopKCountry: async (req, res, next) => {
    try {
      const { k, country } = req.validated?.query;
      req.log.info({ k, country }, "Get top k country leaderboard request recieved");
      const result = await SubmissionServices_default.listTopKCountryLeaderboard({ k, country });
      req.log.info({ k, country }, "Get top k country leaderboard response recieved");
      return import_response_handler7.default.success(
        res,
        SUBMISSION_SUCCESS_TYPE.COUNTRY_LEADERBOARD,
        import_status_code7.default.OK,
        result
      );
    } catch (error) {
      next(error);
    }
  }
};

// src/presentation/routes/leaderboard/user.ts
var userLeaderboardRouter = import_express5.default.Router();
userLeaderboardRouter.get(
  "/global",
  validateRequest(globalLeaderboardSchema, APP_LABELS.QUERY),
  LeaderboardController.getTopKGlobal
);
userLeaderboardRouter.get(
  "/country",
  validateRequest(countryLeaderboardSchema, APP_LABELS.QUERY),
  LeaderboardController.getTopKCountry
);

// src/validation/dashboard/dashboard.schema.ts
var import_zod8 = require("zod");
var userDashboardSchema = import_zod8.z.object({
  userTimezone: import_zod8.z.string("Timezone is required")
});

// src/presentation/routes/dashboard/user.ts
var import_express6 = __toESM(require("express"));

// src/presentation/controllers/dashboard/user.ts
var import_response_handler8 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code8 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var userDashboardController = {
  getDashboard: async (req, res, next) => {
    try {
      const { userTimezone } = req.validated?.query;
      const result = await SubmissionServices_default.getDashboardStats({
        userId: req.userId,
        userTimezone
      });
      return import_response_handler8.default.success(
        res,
        SUBMISSION_SUCCESS_TYPE.DASHBOARD_STATS,
        import_status_code8.default.OK,
        result
      );
    } catch (error) {
      next(error);
    }
  }
};

// src/presentation/routes/dashboard/user.ts
var userDashboardRouter = import_express6.default.Router();
userDashboardRouter.get(
  "/",
  validateRequest(userDashboardSchema, APP_LABELS.QUERY),
  userDashboardController.getDashboard
);

// src/presentation/routes/user.ts
var userRouter = import_express7.default.Router();
userRouter.use(
  "/auth",
  userAuthRouter
);
userRouter.use(
  "/profile",
  verifyAccessToken(APP_LABELS.USER),
  userProfileRouter
);
userRouter.use(
  "/problems",
  verifyAccessToken(APP_LABELS.USER),
  userProblemRouter
);
userRouter.use(
  "/collab",
  verifyAccessToken(APP_LABELS.USER),
  userCollabRouter
);
userRouter.use(
  "/leaderboard",
  verifyAccessToken(APP_LABELS.USER),
  userLeaderboardRouter
);
userRouter.use(
  "/dashboard",
  verifyAccessToken(APP_LABELS.USER),
  userDashboardRouter
);

// src/presentation/routes/admin.ts
var import_express15 = __toESM(require("express"));

// src/presentation/routes/auth/admin.ts
var import_express8 = __toESM(require("express"));

// src/presentation/controllers/auth/admin.ts
var import_response_handler9 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code9 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));

// src/transport/grpc/auth-user-service/AdminServices.ts
var import_codex_shared_utils2 = require("@akashcapro/codex-shared-utils");
var import_grpc_js6 = require("@grpc/grpc-js");
var import_empty3 = require("@akashcapro/codex-shared-utils/dist/proto/compiled/google/protobuf/empty");
var GrpcAdminService = class extends GrpcBaseService {
  #_client;
  constructor() {
    super();
    this.#_client = new import_codex_shared_utils2.AuthAdminServiceClient(
      config.GRPC_AUTH_USER_SERVICE_URL,
      import_grpc_js6.credentials.createInsecure()
    );
  }
  login = async (request) => {
    return this.grpcCall(this.#_client.login.bind(this.#_client), request);
  };
  refreshToken = async (request) => {
    return this.grpcCall(this.#_client.refreshToken.bind(this.#_client), request);
  };
  profile = async (request) => {
    return this.grpcCall(this.#_client.profile.bind(this.#_client), request);
  };
  listUsers = async (request) => {
    return this.grpcCall(this.#_client.listUsers.bind(this.#_client), request);
  };
  BlockUser = async (request) => {
    return this.grpcCall(this.#_client.blockUser.bind(this.#_client), request);
  };
  userStats = async () => {
    return this.grpcCall(this.#_client.userStats.bind(this.#_client), import_empty3.Empty);
  };
};
var AdminServices_default = new GrpcAdminService();

// src/presentation/controllers/auth/admin.ts
var authController2 = {
  login: async (req, res, next) => {
    try {
      req.log.info("Admin login request recieved");
      const grpcResponse = await AdminServices_default.login({
        email: req.validated?.body.email,
        password: req.validated?.body.password,
        role: APP_LABELS.ADMIN_CAP
      });
      req.log.info("Admin login response recieved");
      setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY);
      setCookie(res, APP_LABELS.REFRESH_TOKEN, grpcResponse.refreshToken, config.JWT_REFRESH_TOKEN_EXPIRY);
      setCookie(res, APP_LABELS.ROLE, APP_LABELS.USER, config.JWT_REFRESH_TOKEN_EXPIRY);
      return import_response_handler9.default.success(res, grpcResponse.message, import_status_code9.default.OK, grpcResponse.userInfo);
    } catch (error) {
      req.log.error(error, "Admin login failed");
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      req.log.info("Admin refreshToken request recieved");
      const { userId, email, role, username } = req;
      if (!userId || !email || !role || !username) {
        return import_response_handler9.default.error(res, "Invalid Token", import_status_code9.default.UNAUTHORIZED);
      }
      const grpcResponse = await AdminServices_default.refreshToken({ userId, email, role, username });
      setCookie(res, APP_LABELS.ACCESS_TOKEN, grpcResponse.accessToken, config.JWT_ACCESS_TOKEN_EXPIRY);
      req.log.info("Admin refreshToken response recieved");
      return import_response_handler9.default.success(res, grpcResponse.message, import_status_code9.default.OK, {
        accessToken: grpcResponse.accessToken
      });
    } catch (error) {
      req.log.error(error, "Admin refreshToken request failed");
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      req.log.info("Admin logout request recieved");
      const cookieOptions = getCookieOptions();
      res.clearCookie(APP_LABELS.ACCESS_TOKEN, cookieOptions);
      res.clearCookie(APP_LABELS.REFRESH_TOKEN, cookieOptions);
      res.clearCookie(APP_LABELS.ROLE, cookieOptions);
      return import_response_handler9.default.success(res, "Logout Successfully", import_status_code9.default.OK);
    } catch (error) {
      req.log.error("Admin logout request failed");
      next(error);
    }
  }
};

// src/validation/auth/admin.schema.ts
var import_zod9 = require("zod");
var adminLoginSchema = import_zod9.z.object({
  email: import_zod9.z.email("Invalid email address").min(5).max(255),
  password: import_zod9.z.string().min(8, "Password must be at least 8 characters").max(100).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[@$!%*?&#]/, "Password must contain at least one special character")
});

// src/presentation/routes/auth/admin.ts
var adminAuthRouter = import_express8.default.Router();
adminAuthRouter.post(
  "/login",
  validateRequest(adminLoginSchema),
  authController2.login
);
adminAuthRouter.post(
  "/refresh-token",
  verifyRefreshToken(APP_LABELS.ADMIN),
  authController2.refreshToken
);
adminAuthRouter.delete(
  "/logout",
  verifyAccessToken(APP_LABELS.ADMIN),
  authController2.logout
);

// src/presentation/routes/profile/admin.ts
var import_express9 = __toESM(require("express"));

// src/presentation/controllers/profile/admin.ts
var import_response_handler10 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code10 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var profileController2 = {
  profile: async (req, res, next) => {
    try {
      const { userId, email } = req;
      req.log.info({ userId }, "Load profile request recieved");
      const cached = await redis_default.get(`${REDIS_KEY_PREFIX.USER_PROFILE}${userId}`);
      if (cached) {
        req.log.info({ userId }, "Load profile data **from cache** (HIT)");
        return import_response_handler10.default.success(
          res,
          USER_SUCCESS_TYPES.PROFILE_DATA_LOADED,
          import_status_code10.default.OK,
          JSON.parse(cached)
        );
      }
      req.log.info({ userId }, "Load profile data from gRPC service (MISS)");
      const grpcResponse = await AdminServices_default.profile({
        userId,
        email
      });
      req.log.info({ userId }, "Load profile response recieved");
      return import_response_handler10.default.success(
        res,
        USER_SUCCESS_TYPES.PROFILE_DATA_LOADED,
        import_status_code10.default.OK,
        grpcResponse
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Load profile failed");
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Update profile request recieved");
      const { username, firstName, lastName, country, preferredLanguage } = req.validated?.body;
      const avatarFile = req.file;
      let avatarUrl = null;
      if (avatarFile) {
        req.log.info({ userId }, "Uploading new avatar to Cloudinary");
        const result2 = await uploadImageFileToCloudinary(
          avatarFile.buffer,
          req.email
        );
        avatarUrl = result2.public_id;
        req.log.info({ userId, avatarUrl }, "Avatar uploaded successfully");
      }
      const dto = {
        userId: req.userId,
        ...username ? { username } : {},
        ...firstName ? { firstName } : {},
        ...lastName ? { lastName } : {},
        ...country ? { country } : {},
        ...preferredLanguage ? { preferredLanguage } : {},
        ...avatarUrl ? { avatar: avatarUrl } : {}
      };
      const result = await UserServices_default.updateProfile(dto);
      req.log.info({ userId }, "Update profile response recieved");
      return import_response_handler10.default.success(
        res,
        result.message,
        import_status_code10.default.OK,
        result.updatedData ?? null
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Update profile failed");
      next(error);
    }
  },
  changePass: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Change password request recieved");
      const { currPass, newPass } = req.validated?.body;
      const dto = {
        userId: req.userId,
        currPass,
        newPass
      };
      await UserServices_default.changePassword(dto);
      req.log.info({ userId }, "Change password response recieved");
      return import_response_handler10.default.success(
        res,
        USER_SUCCESS_TYPES.CHANGE_PASS,
        import_status_code10.default.OK
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Change password failed");
      next(error);
    }
  },
  changeEmail: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Change email request recieved");
      const { newEmail, password } = req.validated?.body;
      const dto = {
        userId: req.userId,
        newEmail,
        password
      };
      await UserServices_default.changeEmail(dto);
      req.log.info({ userId }, "Change email OTP issued response recieved");
      return import_response_handler10.default.success(
        res,
        USER_SUCCESS_TYPES.OTP_ISSUED,
        import_status_code10.default.OK
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Change email failed");
      next(error);
    }
  },
  resendOtp: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Resend OTP request recieved");
      const { email } = req.validated?.body;
      const dto = {
        email,
        otpType: OTP_TYPE.CHANGE_EMAIL
      };
      await UserServices_default.resendOtp(dto);
      req.log.info({ userId }, "Resend OTP response recieved");
      return import_response_handler10.default.success(
        res,
        USER_SUCCESS_TYPES.NEW_OTP_ISSUED,
        import_status_code10.default.OK
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Resend OTP failed");
      next(error);
    }
  },
  verifyOtp: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Verify OTP request recieved");
      const { email, otp } = req.validated?.body;
      const dto = {
        userId: req.userId,
        email,
        otp
      };
      await UserServices_default.verifyNewEmail(dto);
      req.log.info({ userId }, "Verify OTP (change email) success response recieved");
      return import_response_handler10.default.success(
        res,
        USER_SUCCESS_TYPES.CHANGE_EMAIL,
        import_status_code10.default.OK
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Verify OTP failed");
      next(error);
    }
  },
  deleteAccount: async (req, res, next) => {
    try {
      const { userId } = req;
      req.log.info({ userId }, "Delete account request recieved");
      const { password } = req.validated?.body;
      const dto = {
        userId: req.userId,
        password
      };
      await UserServices_default.deleteAccount(dto);
      req.log.info({ userId }, "Delete account success response recieved");
      return import_response_handler10.default.success(
        res,
        USER_SUCCESS_TYPES.ACCOUNT_DELETED,
        import_status_code10.default.OK
      );
    } catch (error) {
      req.log.error({ userId: req.userId, error }, "Delete account failed");
      next(error);
    }
  }
};

// src/presentation/routes/profile/admin.ts
var adminProfileRouter = import_express9.default.Router();
adminProfileRouter.get(
  "/",
  profileController2.profile
);
adminProfileRouter.patch(
  "/update",
  upload.single("avatar"),
  validateFile({ fieldName: "avatar" }),
  validateRequest(updateProfileSchema),
  profileController2.update
);
adminProfileRouter.post(
  "/password/change",
  validateRequest(changePasswordSchema),
  profileController2.changePass
);
adminProfileRouter.post(
  "/email/change",
  validateRequest(changeEmailSchema),
  profileController2.changeEmail
);
adminProfileRouter.post(
  "/email/change/resend-otp",
  validateRequest(emailSchema),
  profileController2.resendOtp
);
adminProfileRouter.post(
  "/email/change/verify",
  validateRequest(verifyOtpSchema),
  profileController2.verifyOtp
);
adminProfileRouter.patch(
  "/delete",
  validateRequest(deleteAccountSchema),
  profileController2.deleteAccount
);

// src/presentation/routes/dashboard/admin.ts
var import_express10 = __toESM(require("express"));

// src/presentation/controllers/dashboard/admin.ts
var import_response_handler11 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code11 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var adminDashboardController = {
  getDashboard: async (req, res, next) => {
    try {
      const [problemSubmissionStats, userStats, collabStats] = await Promise.all([
        SubmissionServices_default.getProblemSubmissionStats(),
        AdminServices_default.userStats(),
        collab_service_default.getSessionStats()
      ]);
      const dashboardStats = {
        problemSubmissionStats,
        userStats,
        collabStats
      };
      return import_response_handler11.default.success(
        res,
        "DASHBOARD_STATS",
        import_status_code11.default.OK,
        dashboardStats
      );
    } catch (error) {
      next(error);
    }
  }
};

// src/presentation/routes/dashboard/admin.ts
var adminDashboardRouter = import_express10.default.Router();
adminDashboardRouter.get(
  "/",
  adminDashboardController.getDashboard
);

// src/transport/grpc/problem-service/ProblemServices.ts
var import_problem3 = require("@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem");
var import_grpc_js7 = require("@grpc/grpc-js");
var GrpcProblemService = class extends GrpcBaseService {
  #_client;
  constructor() {
    super();
    this.#_client = new import_problem3.ProblemServiceClient(
      config.GRPC_PROBLEM_SERVICE_URL,
      import_grpc_js7.credentials.createInsecure()
    );
  }
  createProblem = async (request) => {
    return this.grpcCall(
      this.#_client.createProblem.bind(this.#_client),
      request
    );
  };
  getProblem = async (request) => {
    return this.grpcCall(
      this.#_client.getProblem.bind(this.#_client),
      request
    );
  };
  listProblems = (request) => {
    return this.grpcCall(
      this.#_client.listProblems.bind(this.#_client),
      request
    );
  };
  updateBasicProblemDetails = async (request) => {
    return this.grpcCall(
      this.#_client.updateBasicProblemDetails.bind(this.#_client),
      request
    );
  };
  addTestCase = async (request) => {
    return this.grpcCall(
      this.#_client.addTestCase.bind(this.#_client),
      request
    );
  };
  bulkUploadTestCases = async (request) => {
    return this.grpcCall(
      this.#_client.bulkUploadTestCases.bind(this.#_client),
      request
    );
  };
  removeTestCase = async (request) => {
    return this.grpcCall(
      this.#_client.removeTestCase.bind(this.#_client),
      request
    );
  };
  getProblemForPublic = async (request) => {
    return this.grpcCall(
      this.#_client.getProblemForPublic.bind(this.#_client),
      request
    );
  };
  checkQuestionIdAvailability = async (request) => {
    return this.grpcCall(
      this.#_client.checkQuestionIdAvailability.bind(this.#_client),
      request
    );
  };
  checkTitleAvailablity = async (request) => {
    return this.grpcCall(
      this.#_client.checkProblemTitle.bind(this.#_client),
      request
    );
  };
  updateTemplateCode = async (request) => {
    return this.grpcCall(
      this.#_client.updateTemplateCode.bind(this.#_client),
      request
    );
  };
};
var ProblemServices_default = new GrpcProblemService();

// src/presentation/controllers/problem/admin.ts
var import_response_handler12 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code12 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var adminProblemController = {
  checkQuestionId: async (req, res, next) => {
    try {
      const { questionId } = req.validated?.query;
      req.log.info({ questionId }, "Check question id request recieved");
      await ProblemServices_default.checkQuestionIdAvailability({ questionId });
      req.log.info({ questionId }, "Check question id response recieved: Available");
      return import_response_handler12.default.success(
        res,
        PROBLEM_SUCCESS_TYPE.QUESTION_ID_AVAILABLE,
        import_status_code12.default.OK
      );
    } catch (error) {
      req.log.error({ error, questionId: req.validated?.query.questionId }, "Check question id request failed");
      next(error);
    }
  },
  checkTitle: async (req, res, next) => {
    try {
      const { title } = req.validated?.query;
      req.log.info({ title }, "Check title request recieved");
      await ProblemServices_default.checkTitleAvailablity({ title });
      req.log.info({ title }, "Check title response recieved: Available");
      return import_response_handler12.default.success(
        res,
        PROBLEM_SUCCESS_TYPE.TITLE_AVAILABLE,
        import_status_code12.default.OK
      );
    } catch (error) {
      req.log.error({ error, title: req.validated?.query.title }, "Check title request failed");
      next(error);
    }
  },
  createProblem: async (req, res, next) => {
    try {
      const { questionId, title, description, difficulty, tags } = req.validated?.body;
      req.log.info({ questionId, title }, "CreateProblem request recieved");
      const result = await ProblemServices_default.createProblem({
        questionId,
        title,
        tags,
        description,
        difficulty
      });
      req.log.info({ problemId: result.Id, questionId, title }, "CreateProblem gRPC response recieved");
      return import_response_handler12.default.success(
        res,
        PROBLEM_SUCCESS_TYPE.PROBLEM_CREATED,
        import_status_code12.default.OK,
        result
      );
    } catch (error) {
      req.log.error({ error, questionId: req.validated?.body.questionId, title: req.validated?.body.title }, "CreateProblem failed");
      next(error);
    }
  },
  getProblem: async (req, res, next) => {
    try {
      const problemId = req.validated?.params.problemId;
      req.log.info({ problemId }, "Get problem request recieved");
      const result = await ProblemServices_default.getProblem({ Id: problemId });
      req.log.info({ problemId, questionId: result.questionId }, "Get problem gRPC response recieved");
      return import_response_handler12.default.success(
        res,
        PROBLEM_SUCCESS_TYPE.PROBLEM_DETAILS_LOADED,
        import_status_code12.default.OK,
        result
      );
    } catch (error) {
      req.log.error({ error, problemId: req.validated?.params.problemId }, "Get problem failed");
      next(error);
    }
  },
  listProblem: async (req, res, next) => {
    try {
      const { page, limit, difficulty, tags, search } = req.validated?.query;
      req.log.info({ page, limit, difficulty, tags, search }, "List problem request recieved");
      const dto = {
        page,
        limit,
        difficulty,
        tags,
        active: req.validated?.query.active,
        search,
        questionId: req.validated?.query.questionId,
        sort: req.validated?.query.sort
      };
      const result = await ProblemServices_default.listProblems(dto);
      req.log.info({ count: result.problems?.length, page, limit }, "List problem gRPC response recieved");
      return import_response_handler12.default.success(
        res,
        PROBLEM_SUCCESS_TYPE.PROBLEMS_LOADED,
        import_status_code12.default.OK,
        result
      );
    } catch (error) {
      req.log.error({ error, query: req.validated?.query }, "List problem failed");
      next(error);
    }
  },
  updateBasicProblemDetails: async (req, res, next) => {
    try {
      const { problemId } = req.validated?.params;
      const { questionId, title, active } = req.validated?.body;
      req.log.info({ problemId, questionId, title, active }, "Update basic problem details request recieved");
      const { description, difficulty, tags, constraints, examples, starterCodes, solutionRoadmap } = req.validated?.body;
      const dto = {
        Id: problemId,
        ...questionId ? { questionId } : {},
        ...title ? { title } : {},
        ...description ? { description } : {},
        ...difficulty ? { difficulty } : {},
        ...active !== void 0 ? { active } : {},
        tags: tags ?? [],
        constraints: constraints ?? [],
        examples: examples ?? [],
        starterCodes: starterCodes ?? [],
        solutionRoadmap: solutionRoadmap ?? []
      };
      await ProblemServices_default.updateBasicProblemDetails(dto);
      req.log.info({ problemId, questionId }, "Update basic problem details gRPC response recieved");
      return import_response_handler12.default.success(
        res,
        PROBLEM_SUCCESS_TYPE.PROBLEM_BASIC_DETAILS_UPDATED,
        import_status_code12.default.OK
      );
    } catch (error) {
      req.log.error({ error, problemId: req.validated?.params.problemId }, "Update basic problem details failed");
      next(error);
    }
  },
  addTestCase: async (req, res, next) => {
    try {
      const { problemId } = req.validated?.params;
      const { testCaseCollectionType } = req.validated?.body;
      req.log.info({ problemId, testCaseCollectionType }, "Add test case request recieved");
      const { testCase } = req.validated?.body;
      const dto = {
        Id: problemId,
        testCaseCollectionType,
        testCase
      };
      await ProblemServices_default.addTestCase(dto);
      req.log.info({ problemId, testCaseCollectionType }, "Add test case gRPC response recieved");
      return import_response_handler12.default.success(
        res,
        PROBLEM_SUCCESS_TYPE.TEST_CASE_ADDED,
        import_status_code12.default.OK
      );
    } catch (error) {
      req.log.error({ error, problemId: req.validated?.params.problemId }, "Add test case failed");
      next(error);
    }
  },
  bulkUploadTestCase: async (req, res, next) => {
    try {
      const { problemId } = req.validated?.params;
      const { testCaseCollectionType, testCase } = req.validated?.body;
      req.log.info({ problemId, testCaseCollectionType, count: testCase?.length }, "Bulk upload test case request recieved");
      const dto = {
        Id: problemId,
        testCase,
        testCaseCollectionType
      };
      await ProblemServices_default.bulkUploadTestCases(dto);
      req.log.info({ problemId, testCaseCollectionType }, "Bulk upload test case gRPC response recieved");
      return import_response_handler12.default.success(
        res,
        PROBLEM_SUCCESS_TYPE.MULTIPLE_TEST_CASES_ADDED,
        import_status_code12.default.OK
      );
    } catch (error) {
      req.log.error({ error, problemId: req.validated?.params.problemId }, "Bulk upload test case failed");
      next(error);
    }
  },
  removeTestCase: async (req, res, next) => {
    try {
      const { problemId, testCaseId } = req.validated?.params;
      const { testCaseCollectionType } = req.validated?.query;
      req.log.info({ problemId, testCaseId, testCaseCollectionType }, "Remove test case request recieved");
      const dto = {
        Id: problemId,
        testCaseId,
        testCaseCollectionType
      };
      await ProblemServices_default.removeTestCase(dto);
      req.log.info({ problemId, testCaseId }, "Remove test case gRPC response recieved");
      return import_response_handler12.default.success(
        res,
        PROBLEM_SUCCESS_TYPE.REMOVED_TEST_CASE,
        import_status_code12.default.OK
      );
    } catch (error) {
      req.log.error({ error, problemId: req.validated?.params.problemId, testCaseId: req.validated?.params.testCaseId }, "Remove test case failed");
      next(error);
    }
  },
  updateTemplateCode: async (req, res, next) => {
    try {
      const { problemId, templateCodeId } = req.validated?.params;
      const { language } = req.validated?.body;
      req.log.info({ problemId, templateCodeId, language }, "Update template code request recieved");
      const { submitWrapperCode, runWrapperCode } = req.validated?.body;
      const dto = {
        Id: problemId,
        templateCodeId,
        updatedTemplateCode: {
          language: language ?? void 0,
          submitWrapperCode: submitWrapperCode ?? void 0,
          runWrapperCode: runWrapperCode ?? void 0
        }
      };
      await ProblemServices_default.updateTemplateCode(dto);
      req.log.info({ problemId, templateCodeId, language }, "Update template code gRPC response recieved");
      return import_response_handler12.default.success(
        res,
        PROBLEM_SUCCESS_TYPE.TEMPLATE_CODE_UPDATED,
        import_status_code12.default.OK
      );
    } catch (error) {
      req.log.error({ error, problemId: req.validated?.params.problemId, templateCodeId: req.validated?.params.templateCodeId }, "Update template code failed");
      next(error);
    }
  }
};

// src/presentation/routes/problems/admin.ts
var import_express11 = __toESM(require("express"));
var adminProblemRouter = import_express11.default.Router();
adminProblemRouter.get(
  "/",
  validateRequest(getProblemlistQuerySchema, APP_LABELS.QUERY),
  adminProblemController.listProblem
);
adminProblemRouter.get(
  "/checkQuestionId",
  validateRequest(checkQuestionIdQuerySchema, APP_LABELS.QUERY),
  adminProblemController.checkQuestionId
);
adminProblemRouter.get(
  "/checkTitle",
  validateRequest(checkTitleQuerySchema, APP_LABELS.QUERY),
  adminProblemController.checkTitle
);
adminProblemRouter.post(
  "/create",
  validateRequest(createProblemSchema),
  adminProblemController.createProblem
);
adminProblemRouter.get(
  "/:problemId",
  validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
  adminProblemController.getProblem
);
adminProblemRouter.patch(
  "/:problemId/update",
  validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
  validateRequest(UpdateBasicProblemDetailsSchema),
  adminProblemController.updateBasicProblemDetails
);
adminProblemRouter.post(
  "/:problemId/testCases/add",
  validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
  validateRequest(AddTestCaseSchema),
  adminProblemController.addTestCase
);
adminProblemRouter.post(
  "/:problemId/testCases/bulkUpload",
  validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
  validateRequest(BulkUploadTestCasesSchema),
  adminProblemController.bulkUploadTestCase
);
adminProblemRouter.delete(
  "/:problemId/testCases/:testCaseId/remove",
  validateRequest(RemoveTestCaseParamSchema, APP_LABELS.PARAM),
  validateRequest(RemoveTestCaseQuerySchema, APP_LABELS.QUERY),
  adminProblemController.removeTestCase
);
adminProblemRouter.patch(
  "/:problemId/templateCodes/:templateCodeId/update",
  validateRequest(TemplateCodeParamsSchema, APP_LABELS.PARAM),
  validateRequest(UpdateTemplateCodeSchema),
  adminProblemController.updateTemplateCode
);

// src/presentation/controllers/metrics/admin.ts
var import_prom_client = __toESM(require("prom-client"));

// src/helper/promService.ts
var import_axios = __toESM(require("axios"));
var queryPrometheus = async (query) => {
  const resp = await import_axios.default.get(config.METRICS_URL, {
    params: { query }
  });
  return resp.data.data.result;
};

// src/presentation/controllers/metrics/admin.ts
var safeParseMetricValue = (value) => {
  if (value === "NaN" || value === void 0 || value === null) {
    return 0;
  }
  return Number(value);
};
var getGrpcMetrics = async (req, res) => {
  try {
    const { job } = req.query;
    const jobFilter = job ? `{job="${job}"}` : "";
    const latencyMetricName = `grpc_request_duration_ms_bucket${jobFilter}`;
    const requestMetricName = `grpc_requests_total${jobFilter}`;
    const p50 = await queryPrometheus(`
      histogram_quantile(0.5, sum(rate(${latencyMetricName}[5m])) by (le, method))
    `);
    const p90 = await queryPrometheus(`
      histogram_quantile(0.9, sum(rate(${latencyMetricName}[5m])) by (le, method))
    `);
    const p99 = await queryPrometheus(`
      histogram_quantile(0.99, sum(rate(${latencyMetricName}[5m])) by (le, method))
    `);
    const requests = await queryPrometheus(`
      sum(increase(${requestMetricName}[5m])) by (method)
    `);
    const errors = await queryPrometheus(`
      sum(increase(${requestMetricName}{status!="OK"}[5m])) by (method)
    `);
    const methods = /* @__PURE__ */ new Set([
      ...p50.map((m) => m.metric.method),
      ...p90.map((m) => m.metric.method),
      ...p99.map((m) => m.metric.method),
      ...requests.map((m) => m.metric.method),
      ...errors.map((m) => m.metric.method)
    ]);
    const data = Array.from(methods).map((method) => {
      const totalRequests = safeParseMetricValue(requests.find((x) => x.metric.method === method)?.value[1]);
      const errorCount = safeParseMetricValue(errors.find((x) => x.metric.method === method)?.value[1]);
      return {
        method,
        p50: safeParseMetricValue(p50.find((x) => x.metric.method === method)?.value[1]).toFixed(2),
        p90: safeParseMetricValue(p90.find((x) => x.metric.method === method)?.value[1]).toFixed(2),
        p99: safeParseMetricValue(p99.find((x) => x.metric.method === method)?.value[1]).toFixed(2),
        requestCount: totalRequests.toFixed(0),
        errorRate: totalRequests > 0 ? (errorCount / totalRequests * 100).toFixed(2) : "0.00"
      };
    });
    res.json({ success: true, data });
  } catch (err) {
    console.error("Error fetching gRPC metrics:", err);
    res.status(500).json({ success: false, error: "Failed to fetch metrics" });
  }
};
var gethttpMetrics = async (req, res) => {
  try {
    const metrics = import_prom_client.default.register.getMetricsAsJSON();
    res.status(200).json({
      success: true,
      data: metrics
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching metrics"
    });
  }
};

// src/presentation/routes/metrics/admin.ts
var import_express12 = __toESM(require("express"));
var adminMetricRouter = import_express12.default.Router();
adminMetricRouter.get(
  "/grpcMetrics",
  getGrpcMetrics
);
adminMetricRouter.get(
  "/httpMetrics",
  gethttpMetrics
);

// src/validation/user-management/userManagement.schema.ts
var import_zod10 = require("zod");
var ListUsersQuerySchema = import_zod10.z.object({
  page: import_zod10.z.coerce.number("Page must be a number").int().min(1, "Page must be at least 1").default(1),
  limit: import_zod10.z.coerce.number("Limit must be a number").int().min(1, "Limit must be at least 1").max(100, "Limit must not exceed 100").default(5),
  search: import_zod10.z.string().trim().optional().transform((val) => val ? escapeRegex(val) : void 0),
  sort: import_zod10.z.string().trim().optional(),
  isArchived: import_zod10.z.preprocess(
    (val) => {
      if (typeof val === "string") {
        if (val.toLowerCase() === "false") return false;
        if (val.toLowerCase() === "true") return true;
      }
      return val;
    },
    import_zod10.z.boolean("isArchived must be boolean").optional()
  ),
  isVerified: import_zod10.z.preprocess(
    (val) => {
      if (typeof val === "string") {
        if (val.toLowerCase() === "false") return false;
        if (val.toLowerCase() === "true") return true;
      }
      return val;
    },
    import_zod10.z.boolean("isVerified must be boolean").optional()
  ),
  isBlocked: import_zod10.z.preprocess(
    (val) => {
      if (typeof val === "string") {
        if (val.toLowerCase() === "false") return false;
        if (val.toLowerCase() === "true") return true;
      }
      return val;
    },
    import_zod10.z.boolean("isVerified must be boolean").optional()
  ),
  authProvider: import_zod10.z.enum(["GOOGLE", "LOCAL"]).optional()
});
var UserIdParamSchema = import_zod10.z.object({
  userId: import_zod10.z.string()
});
var ToggleBlockUserSchema = import_zod10.z.object({
  block: import_zod10.z.boolean()
});

// src/presentation/controllers/user-management/admin.ts
var import_response_handler13 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));

// src/const/auth-user/UserModerationSuccessTypes.const.ts
var USER_MODERATION_SUCCESS_TYPES = {
  LIST_USER_SUCCESS: "List users success",
  BLOCK_OR_UNBLOCK_SUCCESS: "User successfully blocked/unblocked"
};

// src/presentation/controllers/user-management/admin.ts
var import_status_code13 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var adminUserController = {
  listUsers: async (req, res, next) => {
    try {
      const { page, limit, search, sort, isArchived, isVerified, isBlocked, authProvider } = req.validated?.query;
      req.log.info({ page, limit, search, isBlocked, sort }, "List users request received");
      const dto = {
        page,
        limit,
        search,
        sort,
        isArchived,
        isVerified,
        isBlocked,
        authProvider
      };
      const result = await AdminServices_default.listUsers(dto);
      req.log.info({ count: result.users?.length, page }, "List users gRPC response received");
      return import_response_handler13.default.success(
        res,
        USER_MODERATION_SUCCESS_TYPES.LIST_USER_SUCCESS,
        import_status_code13.default.OK,
        result
      );
    } catch (error) {
      req.log.error({ error, query: req.validated?.query }, "List users failed");
      next(error);
    }
  },
  toggleBlock: async (req, res, next) => {
    try {
      const { userId } = req.validated?.params;
      const { block } = req.validated?.body;
      const action = block ? "block" : "unblock";
      req.log.info({ userId, action }, `Toggle user block request received (Action: ${action})`);
      const dto = {
        userId,
        block
      };
      await AdminServices_default.BlockUser(dto);
      req.log.info({ userId, action }, `Toggle user block gRPC response received (Action: ${action} successful)`);
      return import_response_handler13.default.success(
        res,
        USER_MODERATION_SUCCESS_TYPES.BLOCK_OR_UNBLOCK_SUCCESS,
        import_status_code13.default.OK
      );
    } catch (error) {
      req.log.error({ error, userId: req.validated?.params.userId }, "Toggle block failed");
      next(error);
    }
  }
};

// src/presentation/routes/user-management/admin.ts
var import_express13 = __toESM(require("express"));
var adminUserRouter = import_express13.default.Router();
adminUserRouter.get(
  "/",
  validateRequest(ListUsersQuerySchema, APP_LABELS.QUERY),
  adminUserController.listUsers
);
adminUserRouter.patch(
  "/:userId/toggle-block",
  validateRequest(UserIdParamSchema, APP_LABELS.PARAM),
  validateRequest(ToggleBlockUserSchema),
  adminUserController.toggleBlock
);

// src/presentation/routes/leaderboard/admin.ts
var import_express14 = __toESM(require("express"));
var adminLeaderboardRouter = import_express14.default.Router();
adminLeaderboardRouter.get(
  "/global",
  validateRequest(globalLeaderboardSchema, APP_LABELS.QUERY),
  LeaderboardController.getTopKGlobal
);
adminLeaderboardRouter.get(
  "/country",
  validateRequest(countryLeaderboardSchema, APP_LABELS.QUERY),
  LeaderboardController.getTopKCountry
);

// src/presentation/routes/admin.ts
var adminRouter = import_express15.default.Router();
adminRouter.use(
  "/metrics",
  verifyAccessToken(APP_LABELS.ADMIN),
  adminMetricRouter
);
adminRouter.use(
  "/auth",
  adminAuthRouter
);
adminRouter.use(
  "/profile",
  verifyAccessToken(APP_LABELS.ADMIN),
  adminProfileRouter
);
adminRouter.use(
  "/problems",
  verifyAccessToken(APP_LABELS.ADMIN),
  adminProblemRouter
);
adminRouter.use(
  "/dashboard",
  verifyAccessToken(APP_LABELS.ADMIN),
  adminDashboardRouter
);
adminRouter.use(
  "/leaderboard",
  verifyAccessToken(APP_LABELS.ADMIN),
  adminLeaderboardRouter
);
adminRouter.use(
  "/users",
  verifyAccessToken(APP_LABELS.ADMIN),
  adminUserRouter
);

// src/util/errorHandlers.ts
var import_status_code14 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));

// src/util/customError.ts
var CustomError = class extends Error {
  statusCode;
  details;
  constructor(message, statusCode = 500, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/util/errorHandlers.ts
var import_logger = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/logger"));

// src/util/grpcErrorCheck.ts
var isGrpcError = (error) => {
  return typeof error === "object" && error !== null && "code" in error && typeof error.code === "number" && "message" in error && typeof error.message === "string";
};

// src/util/errorHandlers.ts
var import_codex_shared_utils3 = require("@akashcapro/codex-shared-utils");
var import_response_handler14 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_pretty_error = __toESM(require("pretty-error"));
var notFound = (req, res) => {
  import_logger.default.error(`Resource not found : ${req.method} ${req.url} `);
  return import_response_handler14.default.error(res, "Resource not found", import_status_code14.default.NOT_FOUND);
};
var globalErrorHandler2 = (err, req, res, next) => {
  const time = (/* @__PURE__ */ new Date()).toISOString();
  const { method, originalUrl, ip } = req;
  const pe = new import_pretty_error.default();
  pe.skipNodeFiles();
  pe.skipPackage("express");
  import_logger.default.error({
    time,
    method,
    url: originalUrl,
    ip,
    message: err instanceof Error ? err.message : String(err),
    stack: err instanceof Error ? pe.render(new Error(err.stack)) : void 0
  });
  if (isGrpcError(err)) {
    const statusCode = (0, import_codex_shared_utils3.mapGrpcCodeToHttp)(err.code) || import_status_code14.default.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message?.split(":")[1]?.trim() || "Internal Server Error";
    return import_response_handler14.default.error(res, errorMessage, statusCode);
  }
  if (err instanceof CustomError) {
    return import_response_handler14.default.error(
      res,
      err.message,
      err.statusCode,
      err.details
    );
  }
  return import_response_handler14.default.error(res, "InternalServerError", import_status_code14.default.INTERNAL_SERVER_ERROR);
};

// src/config/metrics/metrics.ts
var import_prom_client2 = __toESM(require("prom-client"));
import_prom_client2.default.collectDefaultMetrics();
var httpRequestCounter = new import_prom_client2.default.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"]
});
var httpRequestDuration = new import_prom_client2.default.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "status"],
  buckets: [10, 50, 100, 300, 500, 1e3, 2e3]
});
var register = import_prom_client2.default.register;

// src/config/metrics/metricsMiddleware.ts
var httpMetricsMiddleware = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      // safer
      status: res.statusCode.toString()
    });
    httpRequestDuration.observe(
      {
        method: req.method,
        route: req.route?.path || req.path,
        status: res.statusCode.toString()
      },
      duration
    );
  });
  next();
};

// src/presentation/routes/public.ts
var import_express18 = __toESM(require("express"));

// src/presentation/controllers/problem/public.ts
var import_response_handler15 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code15 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var publicProblemController = {
  getProblem: async (req, res, next) => {
    try {
      const { problemId } = req.validated?.params;
      req.log.info({ problemId }, "Get public problem request received");
      const dto = {
        Id: problemId
      };
      const result = await ProblemServices_default.getProblemForPublic(dto);
      req.log.info({ problemId }, "Get public problem gRPC response received");
      return import_response_handler15.default.success(
        res,
        PROBLEM_SUCCESS_TYPE.PROBLEM_DETAILS_LOADED,
        import_status_code15.default.OK,
        result
      );
    } catch (error) {
      req.log.error({ error, problemId: req.validated?.params.problemId }, "Get public problem failed");
      next(error);
    }
  },
  listProblem: async (req, res, next) => {
    try {
      const { page, limit, difficulty, tags, search } = req.validated?.query;
      req.log.info({ page, limit, difficulty, tags, search }, "List public problems request received");
      const dto = {
        page,
        limit,
        difficulty,
        tags,
        active: true,
        search,
        questionId: req.validated?.query.questionId,
        sort: req.validated?.query.sort
      };
      const result = await ProblemServices_default.listProblems(dto);
      req.log.info({ count: result.problems?.length, page, limit }, "List public problems gRPC response received");
      return import_response_handler15.default.success(
        res,
        PROBLEM_SUCCESS_TYPE.PROBLEMS_LOADED,
        import_status_code15.default.OK,
        result
      );
    } catch (error) {
      req.log.error({ error, query: req.validated?.query }, "List public problems failed");
      next(error);
    }
  },
  runCode: async (req, res, next) => {
    try {
      const { problemId } = req.validated?.params;
      const { language, testCases } = req.validated?.body;
      req.log.info({ problemId, language, testCaseCount: testCases?.length }, "Run code execution request received");
      const { userCode } = req.validated?.body;
      const dto = {
        problemId,
        userCode,
        language,
        testCases
      };
      const result = await CodeManageService_default.runCodeExec(dto);
      req.log.info({ problemId, tempId: result.tempId }, "Run code execution gRPC response received");
      return import_response_handler15.default.success(
        res,
        CODE_MANAGE_SUCCESS_TYPE.CODE_EXECUTION_STARTED,
        import_status_code15.default.OK,
        result
      );
    } catch (error) {
      req.log.error({ error, problemId: req.validated?.params.problemId }, "Run code execution failed");
      next(error);
    }
  },
  runResult: async (req, res, next) => {
    try {
      const { tempId } = req.validated?.params;
      req.log.info({ tempId }, "Run result status request received");
      const cacheKey = `${REDIS_KEY_PREFIX.RUN_CODE_NORMAL_CACHE}:${tempId}`;
      const cached = await redis_default.get(cacheKey);
      if (!cached) {
        req.log.warn({ tempId }, "Run result not found in cache (MISS). Execution still running.");
        return import_response_handler15.default.success(
          res,
          CODE_MANAGE_SUCCESS_TYPE.RESULT_STATUS,
          import_status_code15.default.OK
        );
      }
      req.log.info({ tempId }, "Run result fetched from cache (HIT).");
      return import_response_handler15.default.success(
        res,
        CODE_MANAGE_SUCCESS_TYPE.CODE_EXECUTION_COMPLETED,
        import_status_code15.default.OK,
        JSON.parse(cached)
      );
    } catch (error) {
      req.log.error({ error, tempId: req.validated?.params.tempId }, "Run result failed");
      next(error);
    }
  }
};

// src/validation/code-exec/run.schema.ts
var import_zod11 = require("zod");
var safeTestCaseString = import_zod11.z.string().refine((val) => {
  try {
    const parsed = JSON.parse(val);
    if (Array.isArray(parsed)) {
      return parsed.every(
        (el) => typeof el === "number" || typeof el === "string"
      );
    }
    return typeof parsed === "number" || typeof parsed === "string";
  } catch {
    return /^-?\d+(\.\d+)?$/.test(val) || /^.$/.test(val);
  }
}, {
  message: "Input must be a number, character, or JSON array of numbers/strings"
});
var runCodeExecParamSchema = import_zod11.z.object({
  problemId: import_zod11.z.string("Problem Id is required")
});
var runCodeResultParamSchema = import_zod11.z.object({
  tempId: import_zod11.z.string("TempId is required")
});
var runCodeExecSchema = import_zod11.z.object({
  userCode: codeSchema,
  language: LanguageSchemaEnum,
  testCases: import_zod11.z.array(
    import_zod11.z.object({
      Id: import_zod11.z.string(),
      input: import_zod11.z.string(),
      output: import_zod11.z.string()
    })
  )
});

// src/presentation/routes/problems/public.ts
var import_express16 = __toESM(require("express"));
var publicProblemRouter = import_express16.default.Router();
publicProblemRouter.get(
  "/",
  validateRequest(getProblemlistQuerySchema, APP_LABELS.QUERY),
  publicProblemController.listProblem
);
publicProblemRouter.get(
  "/:problemId",
  validateRequest(ProblemIdParamsSchema, APP_LABELS.PARAM),
  publicProblemController.getProblem
);
publicProblemRouter.post(
  "/:problemId/code/run",
  validateRequest(runCodeExecParamSchema, APP_LABELS.PARAM),
  validateRequest(runCodeExecSchema),
  publicProblemController.runCode
);
publicProblemRouter.get(
  "/:problemId/:tempId/code/run/result",
  validateRequest(runCodeResultParamSchema, APP_LABELS.PARAM),
  publicProblemController.runResult
);

// src/presentation/routes/codepad/user.ts
var import_express17 = __toESM(require("express"));

// src/validation/code-exec/codepad.schema.ts
var import_zod12 = require("zod");
var CustomCodeRunSchema = import_zod12.z.object({
  userCode: codeSchema,
  language: LanguageSchemaEnum
});
var TempIdParamSchema = import_zod12.z.object({
  tempId: import_zod12.z.string().min(1, "tempId is required")
});

// src/presentation/controllers/codepad/user.ts
var import_response_handler16 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code16 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var codepadController = {
  run: async (req, res, next) => {
    try {
      const { userCode, language } = req.validated?.body;
      req.log.info({ language, codeLength: userCode?.length }, "Codepad run code request received");
      const dto = {
        userCode,
        language
      };
      const result = await CodeManageService_default.customCodeExec(dto);
      req.log.info({ language, tempId: result.tempId }, "Codepad run code gRPC response received");
      return import_response_handler16.default.success(
        res,
        CODE_MANAGE_SUCCESS_TYPE.CODE_EXECUTION_STARTED,
        import_status_code16.default.OK,
        result
      );
    } catch (error) {
      req.log.error({ error, language: req.validated?.body.language }, "Codepad run code failed");
      next(error);
    }
  },
  result: async (req, res, next) => {
    try {
      const { tempId } = req.validated?.params;
      req.log.info({ tempId }, "Codepad result status request received");
      const cacheKey = `${REDIS_KEY_PREFIX.CUSTOM_CODE_NORMAL_CACHE}:${tempId}`;
      const cached = await redis_default.get(cacheKey);
      if (!cached) {
        req.log.warn({ tempId }, "Codepad result not found in cache (MISS). Execution pending.");
        return import_response_handler16.default.success(
          res,
          CODE_MANAGE_SUCCESS_TYPE.RESULT_STATUS,
          import_status_code16.default.OK
        );
      }
      req.log.info({ tempId }, "Codepad result fetched from cache (HIT).");
      return import_response_handler16.default.success(
        res,
        CODE_MANAGE_SUCCESS_TYPE.CODE_EXECUTION_COMPLETED,
        import_status_code16.default.OK,
        JSON.parse(cached)
      );
    } catch (error) {
      req.log.error({ error, tempId: req.validated?.params.tempId }, "Codepad result fetch failed");
      next(error);
    }
  }
};

// src/presentation/routes/codepad/user.ts
var codepadRouter = import_express17.default.Router();
codepadRouter.post(
  "/code/run",
  validateRequest(CustomCodeRunSchema),
  codepadController.run
);
codepadRouter.get(
  "/code/:tempId/run/result",
  validateRequest(TempIdParamSchema, "params"),
  codepadController.result
);

// src/presentation/routes/public.ts
var publicRouter = import_express18.default.Router();
publicRouter.use(
  "/problems",
  publicProblemRouter
);
publicRouter.use(
  "/codepad",
  codepadRouter
);

// src/index.ts
import_dotenv4.default.config();
var app = (0, import_express19.default)();
app.set("trust proxy", 1);
app.use(httpLogger);
app.use(import_express19.default.json());
app.use(import_express19.default.urlencoded({ extended: true }));
app.use((0, import_cookie_parser.default)());
app.use((0, import_helmet.default)({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(httpMetricsMiddleware);
app.use((0, import_cors.default)({
  origin: [config.CLIENT_URL_1, config.CLIENT_URL_2],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"]
}));
app.get("/health", (req, res) => {
  req.log.info("Health check hit");
  return res.status(200).json({ status: "OK" });
});
app.use("/api-docs", import_swagger_ui_express.default.serve, import_swagger_ui_express.default.setup(swaggerSpec, {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Codex Gateway API Documentation"
}));
app.get("/api-docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", "attachment; filename=swagger.json");
  return res.json(swaggerSpec);
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/public", publicRouter);
app.use(notFound);
app.use(globalErrorHandler2);
var startServer = () => {
  try {
    app.listen(config.GATEWAY_SERVICE_PORT, () => {
      pinoLogger_default.info(`HTTPS ${config.SERVICE_NAME} running on port ${config.GATEWAY_SERVICE_PORT}`);
    });
  } catch (error) {
    pinoLogger_default.error("Failed to start server : ", error);
    process.exit(1);
  }
};
startServer();
