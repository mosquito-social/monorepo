import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import destr from 'file:///Users/matze/code/monorepo/node_modules/.bun/destr@2.0.5/node_modules/destr/dist/index.mjs';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestURL, setResponseStatus, getResponseHeader, setResponseHeaders, send, getRequestHeader, removeResponseHeader, createError, appendResponseHeader, setResponseHeader, H3Event, getRequestIP, parseCookies, getResponseStatus, getResponseStatusText, getCookie, setCookie, getResponseHeaders, getRequestWebStream, setHeader, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler } from 'file:///Users/matze/code/monorepo/node_modules/.bun/h3@1.15.5/node_modules/h3/dist/index.mjs';
import { createHooks } from 'file:///Users/matze/code/monorepo/node_modules/.bun/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///Users/matze/code/monorepo/node_modules/.bun/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/matze/code/monorepo/node_modules/.bun/node-mock-http@1.0.4/node_modules/node-mock-http/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, decodePath, withLeadingSlash, withoutTrailingSlash } from 'file:///Users/matze/code/monorepo/node_modules/.bun/ufo@1.6.3/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/matze/code/monorepo/node_modules/.bun/unstorage@1.17.4+e4d8d7d423b47509/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/matze/code/monorepo/node_modules/.bun/unstorage@1.17.4+e4d8d7d423b47509/node_modules/unstorage/drivers/fs.mjs';
import unstorage_47drivers_47fs_45lite from 'file:///Users/matze/code/monorepo/node_modules/.bun/unstorage@1.17.4+e4d8d7d423b47509/node_modules/unstorage/drivers/fs-lite.mjs';
import { digest } from 'file:///Users/matze/code/monorepo/node_modules/.bun/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/matze/code/monorepo/node_modules/.bun/klona@2.0.6/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/matze/code/monorepo/node_modules/.bun/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/matze/code/monorepo/node_modules/.bun/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file:///Users/matze/code/monorepo/node_modules/.bun/unctx@2.5.0/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/matze/code/monorepo/node_modules/.bun/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import _pLDsBOIkgi7laAjUtxK1BicTzYK5kzmBr3ggf2FsZM from 'file:///Users/matze/code/monorepo/node_modules/.bun/vinxi@0.5.11+a9bbe0142a5baa6f/node_modules/vinxi/lib/app-fetch.js';
import _4tx3zFdTLJhBup57VGrKJogO5kIalcNJ0fFhyyveB0 from 'file:///Users/matze/code/monorepo/node_modules/.bun/vinxi@0.5.11+a9bbe0142a5baa6f/node_modules/vinxi/lib/app-manifest.js';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'file:///Users/matze/code/monorepo/node_modules/.bun/pathe@2.0.3/node_modules/pathe/dist/index.mjs';
import { sharedConfig, lazy, createComponent, createContext, catchError, ErrorBoundary, Suspense, onCleanup, createSignal, children, createMemo, getOwner, createRenderEffect, on as on$2, useContext, runWithOwner, untrack, Show, createRoot, startTransition, resetErrorBoundaries, batch } from 'file:///Users/matze/code/monorepo/node_modules/.bun/solid-js@1.9.11/node_modules/solid-js/dist/server.js';
import { renderToString, isServer, getRequestEvent, ssrElement, escape, mergeProps, ssr, renderToStream, createComponent as createComponent$1, ssrHydrationKey, NoHydration, useAssets, Hydration, ssrAttribute, HydrationScript, delegateEvents } from 'file:///Users/matze/code/monorepo/node_modules/.bun/solid-js@1.9.11/node_modules/solid-js/web/dist/server.js';
import { provideRequestEvent } from 'file:///Users/matze/code/monorepo/node_modules/.bun/solid-js@1.9.11/node_modules/solid-js/web/storage/dist/storage.js';

const serverAssets = [{"baseName":"server","dir":"/Users/matze/code/monorepo/apps/under-construction/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/matze/code/monorepo/apps/under-construction"}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/matze/code/monorepo/apps/under-construction"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/matze/code/monorepo/apps/under-construction/.vinxi"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/matze/code/monorepo/apps/under-construction/.vinxi/cache"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {};



const appConfig$1 = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/"
  },
  "nitro": {
    "routeRules": {
      "/_build/assets/**": {
        "headers": {
          "cache-control": "public, immutable, max-age=31536000"
        }
      }
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig;
  }
}
_deepFreeze(klona(appConfig$1));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const nitroAsyncContext = getContext("nitro-app", {
  asyncContext: true,
  AsyncLocalStorage: AsyncLocalStorage 
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$0 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const appConfig = {"name":"vinxi","routers":[{"name":"public","type":"static","base":"/","dir":"./public","root":"/Users/matze/code/monorepo/apps/under-construction","order":0,"outDir":"/Users/matze/code/monorepo/apps/under-construction/.vinxi/build/public"},{"name":"ssr","type":"http","link":{"client":"client"},"handler":"src/entry-server.tsx","extensions":["js","jsx","ts","tsx"],"target":"server","root":"/Users/matze/code/monorepo/apps/under-construction","base":"/","outDir":"/Users/matze/code/monorepo/apps/under-construction/.vinxi/build/ssr","order":1},{"name":"client","type":"client","base":"/_build","handler":"src/entry-client.tsx","extensions":["js","jsx","ts","tsx"],"target":"browser","root":"/Users/matze/code/monorepo/apps/under-construction","outDir":"/Users/matze/code/monorepo/apps/under-construction/.vinxi/build/client","order":2},{"name":"server-fns","type":"http","base":"/_server","handler":"../../node_modules/.bun/@solidjs+start@1.3.0+126f94b7651f0984/node_modules/@solidjs/start/dist/runtime/server-handler.js","target":"server","root":"/Users/matze/code/monorepo/apps/under-construction","outDir":"/Users/matze/code/monorepo/apps/under-construction/.vinxi/build/server-fns","order":3}],"server":{"compressPublicAssets":{"brotli":true},"routeRules":{"/_build/assets/**":{"headers":{"cache-control":"public, immutable, max-age=31536000"}}},"experimental":{"asyncContext":true},"prerender":{}},"root":"/Users/matze/code/monorepo/apps/under-construction"};
					const buildManifest = {"ssr":{"src/routes/index.tsx?pick=default&pick=$css":{"file":"index.js","name":"index","src":"src/routes/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"virtual:$vinxi/handler/ssr":{"file":"ssr.js","name":"ssr","src":"virtual:$vinxi/handler/ssr","isEntry":true,"dynamicImports":["src/routes/index.tsx?pick=default&pick=$css","src/routes/index.tsx?pick=default&pick=$css"],"css":["assets/ssr-Cwy0SvQl.css"]}},"client":{"_web-Bc4fJJbI.js":{"file":"assets/web-Bc4fJJbI.js","name":"web"},"src/routes/index.tsx?pick=default&pick=$css":{"file":"assets/index-r8LsOX5A.js","name":"index","src":"src/routes/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_web-Bc4fJJbI.js"]},"virtual:$vinxi/handler/client":{"file":"assets/client-CghtZDeJ.js","name":"client","src":"virtual:$vinxi/handler/client","isEntry":true,"imports":["_web-Bc4fJJbI.js"],"dynamicImports":["src/routes/index.tsx?pick=default&pick=$css"],"css":["assets/client-CsG7Vhyh.css"]}},"server-fns":{"_server-fns-DhzG2dyz.js":{"file":"assets/server-fns-DhzG2dyz.js","name":"server-fns","dynamicImports":["src/routes/index.tsx?pick=default&pick=$css","src/routes/index.tsx?pick=default&pick=$css","src/app.tsx"]},"src/app.tsx":{"file":"assets/app-DsohqlJW.js","name":"app","src":"src/app.tsx","isDynamicEntry":true,"imports":["_server-fns-DhzG2dyz.js"],"css":["assets/app-B422KKF3.css"]},"src/routes/index.tsx?pick=default&pick=$css":{"file":"index.js","name":"index","src":"src/routes/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true},"virtual:$vinxi/handler/server-fns":{"file":"server-fns.js","name":"server-fns","src":"virtual:$vinxi/handler/server-fns","isEntry":true,"imports":["_server-fns-DhzG2dyz.js"]}}};

					const routeManifest = {"ssr":{},"client":{},"server-fns":{}};

        function createProdApp(appConfig) {
          return {
            config: { ...appConfig, buildManifest, routeManifest },
            getRouter(name) {
              return appConfig.routers.find(router => router.name === name)
            }
          }
        }

        function plugin(app) {
          const prodApp = createProdApp(appConfig);
          globalThis.app = prodApp;
        }

const chunks = {};
			 



			 function app() {
				 globalThis.$$chunks = chunks;
			 }

const plugins = [
  plugin,
_pLDsBOIkgi7laAjUtxK1BicTzYK5kzmBr3ggf2FsZM,
_4tx3zFdTLJhBup57VGrKJogO5kIalcNJ0fFhyyveB0,
app
];

const assets = {
  "/assets/ssr-Cwy0SvQl.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"b58-SPHARNVLfcy5Rg317HuupImYE1o\"",
    "mtime": "2026-03-06T17:47:20.874Z",
    "size": 2904,
    "path": "../../.output/public/assets/ssr-Cwy0SvQl.css.br"
  },
  "/assets/ssr-Cwy0SvQl.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"3051-x6iNX4jImPr+emqbglEwq0A1b34\"",
    "mtime": "2026-03-06T17:47:20.837Z",
    "size": 12369,
    "path": "../../.output/public/assets/ssr-Cwy0SvQl.css"
  },
  "/assets/ssr-Cwy0SvQl.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"d07-sWP1oBb6tKEPDociq6Sg6XEemdE\"",
    "mtime": "2026-03-06T17:47:20.874Z",
    "size": 3335,
    "path": "../../.output/public/assets/ssr-Cwy0SvQl.css.gz"
  },
  "/_server/assets/app-B422KKF3.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"3082-vUrwh0qkPGh8fHbePVnuYnSGnHU\"",
    "mtime": "2026-03-06T17:47:20.841Z",
    "size": 12418,
    "path": "../../.output/public/_server/assets/app-B422KKF3.css"
  },
  "/_server/assets/app-B422KKF3.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"b63-9sy404YXH2SRmuHWoN6h66anyuk\"",
    "mtime": "2026-03-06T17:47:20.875Z",
    "size": 2915,
    "path": "../../.output/public/_server/assets/app-B422KKF3.css.br"
  },
  "/_server/assets/app-B422KKF3.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"d14-J+vg9PlZyAWHh7J84DPVHzLaEbA\"",
    "mtime": "2026-03-06T17:47:20.874Z",
    "size": 3348,
    "path": "../../.output/public/_server/assets/app-B422KKF3.css.gz"
  },
  "/_build/.vite/manifest.json": {
    "type": "application/json",
    "etag": "\"2cb-NAToPMsWskDNw4Eod2JgjqWfKqo\"",
    "mtime": "2026-03-06T17:47:20.839Z",
    "size": 715,
    "path": "../../.output/public/_build/.vite/manifest.json"
  },
  "/_build/assets/client-CghtZDeJ.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"5299-fkSP9LGAPWfaTHNtOFfQo2hBiIg\"",
    "mtime": "2026-03-06T17:47:20.839Z",
    "size": 21145,
    "path": "../../.output/public/_build/assets/client-CghtZDeJ.js"
  },
  "/_build/assets/client-CghtZDeJ.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"222f-WtE4PXtU+9GS4+lrzyRd83P/ka4\"",
    "mtime": "2026-03-06T17:47:20.874Z",
    "size": 8751,
    "path": "../../.output/public/_build/assets/client-CghtZDeJ.js.gz"
  },
  "/_build/assets/client-CghtZDeJ.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"1ee8-4ouHJ7SGRWIW7Sa2cn6Aqlsrp7M\"",
    "mtime": "2026-03-06T17:47:20.874Z",
    "size": 7912,
    "path": "../../.output/public/_build/assets/client-CghtZDeJ.js.br"
  },
  "/_build/assets/client-CsG7Vhyh.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"306d-5OoY9DeaKGu9YSp7WTLdaxmybQE\"",
    "mtime": "2026-03-06T17:47:20.839Z",
    "size": 12397,
    "path": "../../.output/public/_build/assets/client-CsG7Vhyh.css"
  },
  "/_build/assets/client-CsG7Vhyh.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"d0e-oN0wFEw2NmP2mIQTfLJxsYtTTtc\"",
    "mtime": "2026-03-06T17:47:20.874Z",
    "size": 3342,
    "path": "../../.output/public/_build/assets/client-CsG7Vhyh.css.gz"
  },
  "/_build/assets/client-CsG7Vhyh.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"b5c-BIFh4ixTYsr+3RdRtCBRy8SiPOE\"",
    "mtime": "2026-03-06T17:47:20.874Z",
    "size": 2908,
    "path": "../../.output/public/_build/assets/client-CsG7Vhyh.css.br"
  },
  "/_build/assets/index-r8LsOX5A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d2-lYlO5OSSBAQVbL9Dw+F2mQn6XJk\"",
    "mtime": "2026-03-06T17:47:20.839Z",
    "size": 466,
    "path": "../../.output/public/_build/assets/index-r8LsOX5A.js"
  },
  "/_build/assets/web-Bc4fJJbI.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"5d86-tq4b+vYVnMlgdHe9ErUQ+3w0pM4\"",
    "mtime": "2026-03-06T17:47:20.839Z",
    "size": 23942,
    "path": "../../.output/public/_build/assets/web-Bc4fJJbI.js"
  },
  "/_build/assets/web-Bc4fJJbI.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2094-fggEDqVni9hyq8r5JHY3zpTRy8c\"",
    "mtime": "2026-03-06T17:47:20.875Z",
    "size": 8340,
    "path": "../../.output/public/_build/assets/web-Bc4fJJbI.js.br"
  },
  "/_build/assets/web-Bc4fJJbI.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"23a8-YF5t7kjUV3VPh2JoOZBzJhncjV4\"",
    "mtime": "2026-03-06T17:47:20.875Z",
    "size": 9128,
    "path": "../../.output/public/_build/assets/web-Bc4fJJbI.js.gz"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _sHudyE = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
function Vr(e, t) {
  const r = (e || "").split(";").filter((c) => typeof c == "string" && !!c.trim()), n = r.shift() || "", a = Wr(n), i = a.name;
  let o = a.value;
  try {
    o = (t == null ? void 0 : t.decode) === false ? o : ((t == null ? void 0 : t.decode) || decodeURIComponent)(o);
  } catch {
  }
  const u = { name: i, value: o };
  for (const c of r) {
    const l = c.split("="), p = (l.shift() || "").trimStart().toLowerCase(), d = l.join("=");
    switch (p) {
      case "expires": {
        u.expires = new Date(d);
        break;
      }
      case "max-age": {
        u.maxAge = Number.parseInt(d, 10);
        break;
      }
      case "secure": {
        u.secure = true;
        break;
      }
      case "httponly": {
        u.httpOnly = true;
        break;
      }
      case "samesite": {
        u.sameSite = d;
        break;
      }
      default:
        u[p] = d;
    }
  }
  return u;
}
function Wr(e) {
  let t = "", r = "";
  const n = e.split("=");
  return n.length > 1 ? (t = n.shift(), r = n.join("=")) : r = e, { name: t, value: r };
}
function Jr(e = {}) {
  let t, r = false;
  const n = (o) => {
    if (t && t !== o) throw new Error("Context conflict");
  };
  let a;
  if (e.asyncContext) {
    const o = e.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    o ? a = new o() : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
  }
  const i = () => {
    if (a) {
      const o = a.getStore();
      if (o !== void 0) return o;
    }
    return t;
  };
  return { use: () => {
    const o = i();
    if (o === void 0) throw new Error("Context is not available");
    return o;
  }, tryUse: () => i(), set: (o, u) => {
    u || n(o), t = o, r = true;
  }, unset: () => {
    t = void 0, r = false;
  }, call: (o, u) => {
    n(o), t = o;
    try {
      return a ? a.run(o, u) : u();
    } finally {
      r || (t = void 0);
    }
  }, async callAsync(o, u) {
    t = o;
    const c = () => {
      t = o;
    }, l = () => t === o ? c : void 0;
    Me$1.add(l);
    try {
      const p = a ? a.run(o, u) : u();
      return r || (t = void 0), await p;
    } finally {
      Me$1.delete(l);
    }
  } };
}
function Xr(e = {}) {
  const t = {};
  return { get(r, n = {}) {
    return t[r] || (t[r] = Jr({ ...e, ...n })), t[r];
  } };
}
const ae = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof global < "u" ? global : {}, qe$1 = "__unctx__", Gr = ae[qe$1] || (ae[qe$1] = Xr()), Yr = (e, t = {}) => Gr.get(e, t), He$1 = "__unctx_async_handlers__", Me$1 = ae[He$1] || (ae[He$1] = /* @__PURE__ */ new Set());
function Kr(e) {
  let t;
  const r = bt(e), n = { duplex: "half", method: e.method, headers: e.headers };
  return e.node.req.body instanceof ArrayBuffer ? new Request(r, { ...n, body: e.node.req.body }) : new Request(r, { ...n, get body() {
    return t || (t = un$1(e), t);
  } });
}
function Qr(e) {
  var _a2;
  return (_a2 = e.web) != null ? _a2 : e.web = { request: Kr(e), url: bt(e) }, e.web.request;
}
function Zr() {
  return pn();
}
const yt = /* @__PURE__ */ Symbol("$HTTPEvent");
function en$1(e) {
  return typeof e == "object" && (e instanceof H3Event || (e == null ? void 0 : e[yt]) instanceof H3Event || (e == null ? void 0 : e.__is_event__) === true);
}
function S$1(e) {
  return function(...t) {
    var _a2;
    let r = t[0];
    if (en$1(r)) t[0] = r instanceof H3Event || r.__is_event__ ? r : r[yt];
    else {
      if (!((_a2 = globalThis.app.config.server.experimental) == null ? void 0 : _a2.asyncContext)) throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");
      if (r = Zr(), !r) throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");
      t.unshift(r);
    }
    return e(...t);
  };
}
const bt = S$1(getRequestURL), tn$1 = S$1(getRequestIP), ie$1 = S$1(setResponseStatus), Be$1 = S$1(getResponseStatus), rn$1 = S$1(getResponseStatusText), ne$1 = S$1(getResponseHeaders), Ve = S$1(getResponseHeader), nn$1 = S$1(setResponseHeader), mt = S$1(appendResponseHeader), sn$1 = S$1(parseCookies), an$1 = S$1(getCookie), on$1 = S$1(setCookie), D$1 = S$1(setHeader), un$1 = S$1(getRequestWebStream), cn$1 = S$1(removeResponseHeader), ln$1 = S$1(Qr);
function fn$1() {
  var _a2;
  return Yr("nitro-app", { asyncContext: !!((_a2 = globalThis.app.config.server.experimental) == null ? void 0 : _a2.asyncContext), AsyncLocalStorage: AsyncLocalStorage });
}
function pn() {
  return fn$1().use().event;
}
const de = "Invariant Violation", { setPrototypeOf: dn$1 = function(e, t) {
  return e.__proto__ = t, e;
} } = Object;
let ke$1 = class ke extends Error {
  constructor(t = de) {
    super(typeof t == "number" ? `${de}: ${t} (see https://github.com/apollographql/invariant-packages)` : t);
    __publicField$1(this, "framesToPop", 1);
    __publicField$1(this, "name", de);
    dn$1(this, ke.prototype);
  }
};
function hn$1(e, t) {
  if (!e) throw new ke$1(t);
}
const he$1 = "solidFetchEvent";
function gn$1(e) {
  return { request: ln$1(e), response: wn$1(e), clientAddress: tn$1(e), locals: {}, nativeEvent: e };
}
function yn$1(e) {
  return { ...e };
}
function bn$1(e) {
  if (!e.context[he$1]) {
    const t = gn$1(e);
    e.context[he$1] = t;
  }
  return e.context[he$1];
}
function We$1(e, t) {
  for (const [r, n] of t.entries()) mt(e, r, n);
}
let mn$1 = class mn {
  constructor(t) {
    __publicField$1(this, "event");
    this.event = t;
  }
  get(t) {
    const r = Ve(this.event, t);
    return Array.isArray(r) ? r.join(", ") : r || null;
  }
  has(t) {
    return this.get(t) !== null;
  }
  set(t, r) {
    return nn$1(this.event, t, r);
  }
  delete(t) {
    return cn$1(this.event, t);
  }
  append(t, r) {
    mt(this.event, t, r);
  }
  getSetCookie() {
    const t = Ve(this.event, "Set-Cookie");
    return Array.isArray(t) ? t : [t];
  }
  forEach(t) {
    return Object.entries(ne$1(this.event)).forEach(([r, n]) => t(Array.isArray(n) ? n.join(", ") : n, r, this));
  }
  entries() {
    return Object.entries(ne$1(this.event)).map(([t, r]) => [t, Array.isArray(r) ? r.join(", ") : r])[Symbol.iterator]();
  }
  keys() {
    return Object.keys(ne$1(this.event))[Symbol.iterator]();
  }
  values() {
    return Object.values(ne$1(this.event)).map((t) => Array.isArray(t) ? t.join(", ") : t)[Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.entries()[Symbol.iterator]();
  }
};
function wn$1(e) {
  return { get status() {
    return Be$1(e);
  }, set status(t) {
    ie$1(e, t);
  }, get statusText() {
    return rn$1(e);
  }, set statusText(t) {
    ie$1(e, Be$1(e), t);
  }, headers: new mn$1(e) };
}
const H = { NORMAL: 0, WILDCARD: 1, PLACEHOLDER: 2 };
function vn$1(e = {}) {
  const t = { options: e, rootNode: wt(), staticRoutesMap: {} }, r = (n) => e.strictTrailingSlash ? n : n.replace(/\/$/, "") || "/";
  if (e.routes) for (const n in e.routes) Je(t, r(n), e.routes[n]);
  return { ctx: t, lookup: (n) => Sn$1(t, r(n)), insert: (n, a) => Je(t, r(n), a), remove: (n) => En$1(t, r(n)) };
}
function Sn$1(e, t) {
  const r = e.staticRoutesMap[t];
  if (r) return r.data;
  const n = t.split("/"), a = {};
  let i = false, o = null, u = e.rootNode, c = null;
  for (let l = 0; l < n.length; l++) {
    const p = n[l];
    u.wildcardChildNode !== null && (o = u.wildcardChildNode, c = n.slice(l).join("/"));
    const d = u.children.get(p);
    if (d === void 0) {
      if (u && u.placeholderChildren.length > 1) {
        const w = n.length - l;
        u = u.placeholderChildren.find((f) => f.maxDepth === w) || null;
      } else u = u.placeholderChildren[0] || null;
      if (!u) break;
      u.paramName && (a[u.paramName] = p), i = true;
    } else u = d;
  }
  return (u === null || u.data === null) && o !== null && (u = o, a[u.paramName || "_"] = c, i = true), u ? i ? { ...u.data, params: i ? a : void 0 } : u.data : null;
}
function Je(e, t, r) {
  let n = true;
  const a = t.split("/");
  let i = e.rootNode, o = 0;
  const u = [i];
  for (const c of a) {
    let l;
    if (l = i.children.get(c)) i = l;
    else {
      const p = Rn$1(c);
      l = wt({ type: p, parent: i }), i.children.set(c, l), p === H.PLACEHOLDER ? (l.paramName = c === "*" ? `_${o++}` : c.slice(1), i.placeholderChildren.push(l), n = false) : p === H.WILDCARD && (i.wildcardChildNode = l, l.paramName = c.slice(3) || "_", n = false), u.push(l), i = l;
    }
  }
  for (const [c, l] of u.entries()) l.maxDepth = Math.max(u.length - c, l.maxDepth || 0);
  return i.data = r, n === true && (e.staticRoutesMap[t] = i), i;
}
function En$1(e, t) {
  let r = false;
  const n = t.split("/");
  let a = e.rootNode;
  for (const i of n) if (a = a.children.get(i), !a) return r;
  if (a.data) {
    const i = n.at(-1) || "";
    a.data = null, Object.keys(a.children).length === 0 && a.parent && (a.parent.children.delete(i), a.parent.wildcardChildNode = null, a.parent.placeholderChildren = []), r = true;
  }
  return r;
}
function wt(e = {}) {
  return { type: e.type || H.NORMAL, maxDepth: 0, parent: e.parent || null, children: /* @__PURE__ */ new Map(), data: e.data || null, paramName: e.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function Rn$1(e) {
  return e.startsWith("**") ? H.WILDCARD : e[0] === ":" || e === "*" ? H.PLACEHOLDER : H.NORMAL;
}
const vt = [{ page: true, $component: { src: "src/routes/index.tsx?pick=default&pick=$css", build: () => import('../build/index.mjs'), import: () => import('../build/index.mjs') }, path: "/", filePath: "/Users/matze/code/monorepo/apps/under-construction/src/routes/index.tsx" }], An$1 = xn$1(vt.filter((e) => e.page));
function xn$1(e) {
  function t(r, n, a, i) {
    const o = Object.values(r).find((u) => a.startsWith(u.id + "/"));
    return o ? (t(o.children || (o.children = []), n, a.slice(o.id.length)), r) : (r.push({ ...n, id: a, path: a.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/") }), r);
  }
  return e.sort((r, n) => r.path.length - n.path.length).reduce((r, n) => t(r, n, n.path, n.path), []);
}
function kn$1(e) {
  return e.$HEAD || e.$GET || e.$POST || e.$PUT || e.$PATCH || e.$DELETE;
}
vn$1({ routes: vt.reduce((e, t) => {
  if (!kn$1(t)) return e;
  let r = t.path.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/").replace(/\*([^/]*)/g, (n, a) => `**:${a}`).split("/").map((n) => n.startsWith(":") || n.startsWith("*") ? n : encodeURIComponent(n)).join("/");
  if (/:[^/]*\?/g.test(r)) throw new Error(`Optional parameters are not supported in API routes: ${r}`);
  if (e[r]) throw new Error(`Duplicate API routes for "${r}" found at "${e[r].route.path}" and "${t.path}"`);
  return e[r] = { route: t }, e;
}, {}) });
var $n$1 = " ";
const zn$1 = { style: (e) => ssrElement("style", e.attrs, () => e.children, true), link: (e) => ssrElement("link", e.attrs, void 0, true), script: (e) => e.attrs.src ? ssrElement("script", mergeProps(() => e.attrs, { get id() {
  return e.key;
} }), () => ssr($n$1), true) : null, noscript: (e) => ssrElement("noscript", e.attrs, () => escape(e.children), true) };
function Cn$1(e, t) {
  let { tag: r, attrs: { key: n, ...a } = { key: void 0 }, children: i } = e;
  return zn$1[r]({ attrs: { ...a, nonce: t }, key: n, children: i });
}
function On$1(e, t, r, n = "default") {
  return lazy(async () => {
    var _a2;
    {
      const i = (await e.import())[n], u = (await ((_a2 = t.inputs) == null ? void 0 : _a2[e.src].assets())).filter((l) => l.tag === "style" || l.attrs.rel === "stylesheet");
      return { default: (l) => [...u.map((p) => Cn$1(p)), createComponent(i, l)] };
    }
  });
}
function St() {
  function e(r) {
    return { ...r, ...r.$$route ? r.$$route.require().route : void 0, info: { ...r.$$route ? r.$$route.require().route.info : {}, filesystem: true }, component: r.$component && On$1(r.$component, globalThis.MANIFEST.client, globalThis.MANIFEST.ssr), children: r.children ? r.children.map(e) : void 0 };
  }
  return An$1.map(e);
}
let Xe;
const ru = isServer ? () => getRequestEvent().routes : () => Xe || (Xe = St());
function Pn$1(e) {
  const t = an$1(e.nativeEvent, "flash");
  if (t) try {
    let r = JSON.parse(t);
    if (!r || !r.result) return;
    const n = [...r.input.slice(0, -1), new Map(r.input[r.input.length - 1])], a = r.error ? new Error(r.result) : r.result;
    return { input: n, url: r.url, pending: false, result: r.thrown ? void 0 : a, error: r.thrown ? a : void 0 };
  } catch (r) {
    console.error(r);
  } finally {
    on$1(e.nativeEvent, "flash", "", { maxAge: 0 });
  }
}
async function In$1(e) {
  const t = globalThis.MANIFEST.client;
  return globalThis.MANIFEST.ssr, e.response.headers.set("Content-Type", "text/html"), Object.assign(e, { manifest: await t.json(), assets: [...await t.inputs[t.handler].assets()], router: { submission: Pn$1(e) }, routes: St(), complete: false, $islands: /* @__PURE__ */ new Set() });
}
const Nn$1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function Tn$1(e) {
  return e.status && Nn$1.has(e.status) ? e.status : 302;
}
const Ln$1 = {};
var Et = ((e) => (e[e.AggregateError = 1] = "AggregateError", e[e.ArrowFunction = 2] = "ArrowFunction", e[e.ErrorPrototypeStack = 4] = "ErrorPrototypeStack", e[e.ObjectAssign = 8] = "ObjectAssign", e[e.BigIntTypedArray = 16] = "BigIntTypedArray", e[e.RegExp = 32] = "RegExp", e))(Et || {}), k = Symbol.asyncIterator, Rt = Symbol.hasInstance, M = Symbol.isConcatSpreadable, _ = Symbol.iterator, At = Symbol.match, xt = Symbol.matchAll, kt$1 = Symbol.replace, _t = Symbol.search, $t = Symbol.species, zt$1 = Symbol.split, Ct = Symbol.toPrimitive, B = Symbol.toStringTag, Ot$1 = Symbol.unscopables, Fn$1 = { 0: "Symbol.asyncIterator", 1: "Symbol.hasInstance", 2: "Symbol.isConcatSpreadable", 3: "Symbol.iterator", 4: "Symbol.match", 5: "Symbol.matchAll", 6: "Symbol.replace", 7: "Symbol.search", 8: "Symbol.species", 9: "Symbol.split", 10: "Symbol.toPrimitive", 11: "Symbol.toStringTag", 12: "Symbol.unscopables" }, Pt = { [k]: 0, [Rt]: 1, [M]: 2, [_]: 3, [At]: 4, [xt]: 5, [kt$1]: 6, [_t]: 7, [$t]: 8, [zt$1]: 9, [Ct]: 10, [B]: 11, [Ot$1]: 12 }, Un$1 = { 0: k, 1: Rt, 2: M, 3: _, 4: At, 5: xt, 6: kt$1, 7: _t, 8: $t, 9: zt$1, 10: Ct, 11: B, 12: Ot$1 }, jn$1 = { 2: "!0", 3: "!1", 1: "void 0", 0: "null", 4: "-0", 5: "1/0", 6: "-1/0", 7: "0/0" }, s = void 0, Dn$1 = { 2: true, 3: false, 1: s, 0: null, 4: -0, 5: Number.POSITIVE_INFINITY, 6: Number.NEGATIVE_INFINITY, 7: Number.NaN }, It$1 = { 0: "Error", 1: "EvalError", 2: "RangeError", 3: "ReferenceError", 4: "SyntaxError", 5: "TypeError", 6: "URIError" }, qn$1 = { 0: Error, 1: EvalError, 2: RangeError, 3: ReferenceError, 4: SyntaxError, 5: TypeError, 6: URIError };
function g(e, t, r, n, a, i, o, u, c, l, p, d) {
  return { t: e, i: t, s: r, c: n, m: a, p: i, e: o, a: u, f: c, b: l, o: p, l: d };
}
function O(e) {
  return g(2, s, e, s, s, s, s, s, s, s, s, s);
}
var Nt = O(2), Tt = O(3), Hn$1 = O(1), Mn$1 = O(0), Bn$1 = O(4), Vn$1 = O(5), Wn$1 = O(6), Jn$1 = O(7);
function Xn$1(e) {
  switch (e) {
    case '"':
      return '\\"';
    case "\\":
      return "\\\\";
    case `
`:
      return "\\n";
    case "\r":
      return "\\r";
    case "\b":
      return "\\b";
    case "	":
      return "\\t";
    case "\f":
      return "\\f";
    case "<":
      return "\\x3C";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return s;
  }
}
function A(e) {
  let t = "", r = 0, n;
  for (let a = 0, i = e.length; a < i; a++) n = Xn$1(e[a]), n && (t += e.slice(r, a) + n, r = a + 1);
  return r === 0 ? t = e : t += e.slice(r), t;
}
function Gn$1(e) {
  switch (e) {
    case "\\\\":
      return "\\";
    case '\\"':
      return '"';
    case "\\n":
      return `
`;
    case "\\r":
      return "\r";
    case "\\b":
      return "\b";
    case "\\t":
      return "	";
    case "\\f":
      return "\f";
    case "\\x3C":
      return "<";
    case "\\u2028":
      return "\u2028";
    case "\\u2029":
      return "\u2029";
    default:
      return e;
  }
}
function L(e) {
  return e.replace(/(\\\\|\\"|\\n|\\r|\\b|\\t|\\f|\\u2028|\\u2029|\\x3C)/g, Gn$1);
}
var X$1 = "__SEROVAL_REFS__", oe = "$R", se = `self.${oe}`;
function Yn$1(e) {
  return e == null ? `${se}=${se}||[]` : `(${se}=${se}||{})["${A(e)}"]=[]`;
}
var Lt = /* @__PURE__ */ new Map(), q = /* @__PURE__ */ new Map();
function Ft$1(e) {
  return Lt.has(e);
}
function Kn$1(e) {
  return q.has(e);
}
function Qn$1(e) {
  if (Ft$1(e)) return Lt.get(e);
  throw new _s(e);
}
function Zn$1(e) {
  if (Kn$1(e)) return q.get(e);
  throw new $s(e);
}
typeof globalThis < "u" ? Object.defineProperty(globalThis, X$1, { value: q, configurable: true, writable: false, enumerable: false }) : typeof self < "u" ? Object.defineProperty(self, X$1, { value: q, configurable: true, writable: false, enumerable: false }) : typeof global < "u" && Object.defineProperty(global, X$1, { value: q, configurable: true, writable: false, enumerable: false });
function _e$1(e) {
  return e instanceof EvalError ? 1 : e instanceof RangeError ? 2 : e instanceof ReferenceError ? 3 : e instanceof SyntaxError ? 4 : e instanceof TypeError ? 5 : e instanceof URIError ? 6 : 0;
}
function es(e) {
  let t = It$1[_e$1(e)];
  return e.name !== t ? { name: e.name } : e.constructor.name !== t ? { name: e.constructor.name } : {};
}
function Ut$1(e, t) {
  let r = es(e), n = Object.getOwnPropertyNames(e);
  for (let a = 0, i = n.length, o; a < i; a++) o = n[a], o !== "name" && o !== "message" && (o === "stack" ? t & 4 && (r = r || {}, r[o] = e[o]) : (r = r || {}, r[o] = e[o]));
  return r;
}
function jt$1(e) {
  return Object.isFrozen(e) ? 3 : Object.isSealed(e) ? 2 : Object.isExtensible(e) ? 0 : 1;
}
function ts(e) {
  switch (e) {
    case Number.POSITIVE_INFINITY:
      return Vn$1;
    case Number.NEGATIVE_INFINITY:
      return Wn$1;
  }
  return e !== e ? Jn$1 : Object.is(e, -0) ? Bn$1 : g(0, s, e, s, s, s, s, s, s, s, s, s);
}
function Dt$1(e) {
  return g(1, s, A(e), s, s, s, s, s, s, s, s, s);
}
function rs(e) {
  return g(3, s, "" + e, s, s, s, s, s, s, s, s, s);
}
function ns(e) {
  return g(4, e, s, s, s, s, s, s, s, s, s, s);
}
function ss(e, t) {
  let r = t.valueOf();
  return g(5, e, r !== r ? "" : t.toISOString(), s, s, s, s, s, s, s, s, s);
}
function as(e, t) {
  return g(6, e, s, A(t.source), t.flags, s, s, s, s, s, s, s);
}
function is(e, t) {
  return g(17, e, Pt[t], s, s, s, s, s, s, s, s, s);
}
function os(e, t) {
  return g(18, e, A(Qn$1(t)), s, s, s, s, s, s, s, s, s);
}
function qt$1(e, t, r) {
  return g(25, e, r, A(t), s, s, s, s, s, s, s, s);
}
function us(e, t, r) {
  return g(9, e, s, s, s, s, s, r, s, s, jt$1(t), s);
}
function cs(e, t) {
  return g(21, e, s, s, s, s, s, s, t, s, s, s);
}
function ls(e, t, r) {
  return g(15, e, s, t.constructor.name, s, s, s, s, r, t.byteOffset, s, t.length);
}
function fs(e, t, r) {
  return g(16, e, s, t.constructor.name, s, s, s, s, r, t.byteOffset, s, t.byteLength);
}
function ps(e, t, r) {
  return g(20, e, s, s, s, s, s, s, r, t.byteOffset, s, t.byteLength);
}
function ds(e, t, r) {
  return g(13, e, _e$1(t), s, A(t.message), r, s, s, s, s, s, s);
}
function hs(e, t, r) {
  return g(14, e, _e$1(t), s, A(t.message), r, s, s, s, s, s, s);
}
function gs(e, t) {
  return g(7, e, s, s, s, s, s, t, s, s, s, s);
}
function ys(e, t) {
  return g(28, s, s, s, s, s, s, [e, t], s, s, s, s);
}
function bs(e, t) {
  return g(30, s, s, s, s, s, s, [e, t], s, s, s, s);
}
function ms(e, t, r) {
  return g(31, e, s, s, s, s, s, r, t, s, s, s);
}
function ws(e, t) {
  return g(32, e, s, s, s, s, s, s, t, s, s, s);
}
function vs(e, t) {
  return g(33, e, s, s, s, s, s, s, t, s, s, s);
}
function Ss(e, t) {
  return g(34, e, s, s, s, s, s, s, t, s, s, s);
}
function Es(e, t, r, n) {
  return g(35, e, r, s, s, s, s, t, s, s, s, n);
}
var Rs = { parsing: 1, serialization: 2, deserialization: 3 };
function As(e) {
  return `Seroval Error (step: ${Rs[e]})`;
}
var xs = (e, t) => As(e), Ht = class extends Error {
  constructor(e, t) {
    super(xs(e)), this.cause = t;
  }
}, Ge = class extends Ht {
  constructor(e) {
    super("parsing", e);
  }
}, ks = class extends Ht {
  constructor(e) {
    super("deserialization", e);
  }
};
function $(e) {
  return `Seroval Error (specific: ${e})`;
}
var ue = class extends Error {
  constructor(t) {
    super($(1)), this.value = t;
  }
}, F = class extends Error {
  constructor(t) {
    super($(2));
  }
}, Mt$1 = class Mt extends Error {
  constructor(e) {
    super($(3));
  }
}, Z = class extends Error {
  constructor(t) {
    super($(4));
  }
}, _s = class extends Error {
  constructor(e) {
    super($(5)), this.value = e;
  }
}, $s = class extends Error {
  constructor(e) {
    super($(6));
  }
}, zs = class extends Error {
  constructor(e) {
    super($(7));
  }
}, P = class extends Error {
  constructor(t) {
    super($(8));
  }
}, Bt$1 = class Bt extends Error {
  constructor(t) {
    super($(9));
  }
}, Cs = class {
  constructor(t, r) {
    this.value = t, this.replacement = r;
  }
}, ce = () => {
  let e = { p: 0, s: 0, f: 0 };
  return e.p = new Promise((t, r) => {
    e.s = t, e.f = r;
  }), e;
}, Os = (e, t) => {
  e.s(t), e.p.s = 1, e.p.v = t;
}, Ps = (e, t) => {
  e.f(t), e.p.s = 2, e.p.v = t;
}, Is = ce.toString(), Ns = Os.toString(), Ts = Ps.toString(), Vt$1 = () => {
  let e = [], t = [], r = true, n = false, a = 0, i = (c, l, p) => {
    for (p = 0; p < a; p++) t[p] && t[p][l](c);
  }, o = (c, l, p, d) => {
    for (l = 0, p = e.length; l < p; l++) d = e[l], !r && l === p - 1 ? c[n ? "return" : "throw"](d) : c.next(d);
  }, u = (c, l) => (r && (l = a++, t[l] = c), o(c), () => {
    r && (t[l] = t[a], t[a--] = void 0);
  });
  return { __SEROVAL_STREAM__: true, on: (c) => u(c), next: (c) => {
    r && (e.push(c), i(c, "next"));
  }, throw: (c) => {
    r && (e.push(c), i(c, "throw"), r = false, n = false, t.length = 0);
  }, return: (c) => {
    r && (e.push(c), i(c, "return"), r = false, n = true, t.length = 0);
  } };
}, Ls = Vt$1.toString(), Wt$1 = (e) => (t) => () => {
  let r = 0, n = { [e]: () => n, next: () => {
    if (r > t.d) return { done: true, value: void 0 };
    let a = r++, i = t.v[a];
    if (a === t.t) throw i;
    return { done: a === t.d, value: i };
  } };
  return n;
}, Fs = Wt$1.toString(), Jt$1 = (e, t) => (r) => () => {
  let n = 0, a = -1, i = false, o = [], u = [], c = (p = 0, d = u.length) => {
    for (; p < d; p++) u[p].s({ done: true, value: void 0 });
  };
  r.on({ next: (p) => {
    let d = u.shift();
    d && d.s({ done: false, value: p }), o.push(p);
  }, throw: (p) => {
    let d = u.shift();
    d && d.f(p), c(), a = o.length, i = true, o.push(p);
  }, return: (p) => {
    let d = u.shift();
    d && d.s({ done: true, value: p }), c(), a = o.length, o.push(p);
  } });
  let l = { [e]: () => l, next: () => {
    if (a === -1) {
      let w = n++;
      if (w >= o.length) {
        let f = t();
        return u.push(f), f.p;
      }
      return { done: false, value: o[w] };
    }
    if (n > a) return { done: true, value: void 0 };
    let p = n++, d = o[p];
    if (p !== a) return { done: false, value: d };
    if (i) throw d;
    return { done: true, value: d };
  } };
  return l;
}, Us = Jt$1.toString(), Xt$1 = (e) => {
  let t = atob(e), r = t.length, n = new Uint8Array(r);
  for (let a = 0; a < r; a++) n[a] = t.charCodeAt(a);
  return n.buffer;
}, js = Xt$1.toString();
function Ds(e) {
  return "__SEROVAL_SEQUENCE__" in e;
}
function Gt$1(e, t, r) {
  return { __SEROVAL_SEQUENCE__: true, v: e, t, d: r };
}
function qs(e) {
  let t = [], r = -1, n = -1, a = e[_]();
  for (; ; ) try {
    let i = a.next();
    if (t.push(i.value), i.done) {
      n = t.length - 1;
      break;
    }
  } catch (i) {
    r = t.length, t.push(i);
  }
  return Gt$1(t, r, n);
}
var Hs = Wt$1(_);
function Ms(e) {
  return Hs(e);
}
var Bs = {}, Vs = {}, Ws = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} }, Js = { 0: "[]", 1: Is, 2: Ns, 3: Ts, 4: Ls, 5: js };
function le(e) {
  return "__SEROVAL_STREAM__" in e;
}
function ee$1() {
  return Vt$1();
}
function Xs(e) {
  let t = ee$1(), r = e[k]();
  async function n() {
    try {
      let a = await r.next();
      a.done ? t.return(a.value) : (t.next(a.value), await n());
    } catch (a) {
      t.throw(a);
    }
  }
  return n().catch(() => {
  }), t;
}
var Gs = Jt$1(k, ce);
function Ys(e) {
  return Gs(e);
}
function Ks(e, t) {
  return { plugins: t.plugins, mode: e, marked: /* @__PURE__ */ new Set(), features: 63 ^ (t.disabledFeatures || 0), refs: t.refs || /* @__PURE__ */ new Map(), depthLimit: t.depthLimit || 1e3 };
}
function Qs(e, t) {
  e.marked.add(t);
}
function Yt$1(e, t) {
  let r = e.refs.size;
  return e.refs.set(t, r), r;
}
function fe$1(e, t) {
  let r = e.refs.get(t);
  return r != null ? (Qs(e, r), { type: 1, value: ns(r) }) : { type: 0, value: Yt$1(e, t) };
}
function $e(e, t) {
  let r = fe$1(e, t);
  return r.type === 1 ? r : Ft$1(t) ? { type: 2, value: os(r.value, t) } : r;
}
function I(e, t) {
  let r = $e(e, t);
  if (r.type !== 0) return r.value;
  if (t in Pt) return is(r.value, t);
  throw new ue(t);
}
function U(e, t) {
  let r = fe$1(e, Ws[t]);
  return r.type === 1 ? r.value : g(26, r.value, t, s, s, s, s, s, s, s, s, s);
}
function Zs(e) {
  let t = fe$1(e, Bs);
  return t.type === 1 ? t.value : g(27, t.value, s, s, s, s, s, s, I(e, _), s, s, s);
}
function ea(e) {
  let t = fe$1(e, Vs);
  return t.type === 1 ? t.value : g(29, t.value, s, s, s, s, s, [U(e, 1), I(e, k)], s, s, s, s);
}
function ta(e, t, r, n) {
  return g(r ? 11 : 10, e, s, s, s, n, s, s, s, s, jt$1(t), s);
}
function ra(e, t, r, n) {
  return g(8, t, s, s, s, s, { k: r, v: n }, s, U(e, 0), s, s, s);
}
function na(e, t, r) {
  return g(22, t, r, s, s, s, s, s, U(e, 1), s, s, s);
}
function sa(e, t, r) {
  let n = new Uint8Array(r), a = "";
  for (let i = 0, o = n.length; i < o; i++) a += String.fromCharCode(n[i]);
  return g(19, t, A(btoa(a)), s, s, s, s, s, U(e, 5), s, s, s);
}
var aa = ((e) => (e[e.Vanilla = 1] = "Vanilla", e[e.Cross = 2] = "Cross", e))(aa || {});
function Kt$1(e, t) {
  for (let r = 0, n = t.length; r < n; r++) {
    let a = t[r];
    e.has(a) || (e.add(a), a.extends && Kt$1(e, a.extends));
  }
}
function ze(e) {
  if (e) {
    let t = /* @__PURE__ */ new Set();
    return Kt$1(t, e), [...t];
  }
}
function ia(e) {
  switch (e) {
    case "Int8Array":
      return Int8Array;
    case "Int16Array":
      return Int16Array;
    case "Int32Array":
      return Int32Array;
    case "Uint8Array":
      return Uint8Array;
    case "Uint16Array":
      return Uint16Array;
    case "Uint32Array":
      return Uint32Array;
    case "Uint8ClampedArray":
      return Uint8ClampedArray;
    case "Float32Array":
      return Float32Array;
    case "Float64Array":
      return Float64Array;
    case "BigInt64Array":
      return BigInt64Array;
    case "BigUint64Array":
      return BigUint64Array;
    default:
      throw new zs(e);
  }
}
var oa = 1e6, ua = 1e4, ca = 2e4;
function Qt$1(e, t) {
  switch (t) {
    case 3:
      return Object.freeze(e);
    case 1:
      return Object.preventExtensions(e);
    case 2:
      return Object.seal(e);
    default:
      return e;
  }
}
var la = 1e3;
function fa(e, t) {
  var r;
  return { mode: e, plugins: t.plugins, refs: t.refs || /* @__PURE__ */ new Map(), features: (r = t.features) != null ? r : 63 ^ (t.disabledFeatures || 0), depthLimit: t.depthLimit || la };
}
function pa(e) {
  return { mode: 1, base: fa(1, e), child: s, state: { marked: new Set(e.markedRefs) } };
}
var da = class {
  constructor(e, t) {
    this._p = e, this.depth = t;
  }
  deserialize(e) {
    return b(this._p, this.depth, e);
  }
};
function Zt$1(e, t) {
  if (t < 0 || !Number.isFinite(t) || !Number.isInteger(t)) throw new P({ t: 4, i: t });
  if (e.refs.has(t)) throw new Error("Conflicted ref id: " + t);
}
function ha(e, t, r) {
  return Zt$1(e.base, t), e.state.marked.has(t) && e.base.refs.set(t, r), r;
}
function ga(e, t, r) {
  return Zt$1(e.base, t), e.base.refs.set(t, r), r;
}
function m(e, t, r) {
  return e.mode === 1 ? ha(e, t, r) : ga(e, t, r);
}
function Ee$1(e, t, r) {
  if (Object.hasOwn(t, r)) return t[r];
  throw new P(e);
}
function ya(e, t) {
  return m(e, t.i, Zn$1(L(t.s)));
}
function ba(e, t, r) {
  let n = r.a, a = n.length, i = m(e, r.i, new Array(a));
  for (let o = 0, u; o < a; o++) u = n[o], u && (i[o] = b(e, t, u));
  return Qt$1(i, r.o), i;
}
function ma(e) {
  switch (e) {
    case "constructor":
    case "__proto__":
    case "prototype":
    case "__defineGetter__":
    case "__defineSetter__":
    case "__lookupGetter__":
    case "__lookupSetter__":
      return false;
    default:
      return true;
  }
}
function wa(e) {
  switch (e) {
    case k:
    case M:
    case B:
    case _:
      return true;
    default:
      return false;
  }
}
function Ye(e, t, r) {
  ma(t) ? e[t] = r : Object.defineProperty(e, t, { value: r, configurable: true, enumerable: true, writable: true });
}
function va(e, t, r, n, a) {
  if (typeof n == "string") Ye(r, n, b(e, t, a));
  else {
    let i = b(e, t, n);
    switch (typeof i) {
      case "string":
        Ye(r, i, b(e, t, a));
        break;
      case "symbol":
        wa(i) && (r[i] = b(e, t, a));
        break;
      default:
        throw new P(n);
    }
  }
}
function er$1(e, t, r, n) {
  let a = r.k;
  if (a.length > 0) for (let i = 0, o = r.v, u = a.length; i < u; i++) va(e, t, n, a[i], o[i]);
  return n;
}
function Sa(e, t, r) {
  let n = m(e, r.i, r.t === 10 ? {} : /* @__PURE__ */ Object.create(null));
  return er$1(e, t, r.p, n), Qt$1(n, r.o), n;
}
function Ea(e, t) {
  return m(e, t.i, new Date(t.s));
}
function Ra(e, t) {
  if (e.base.features & 32) {
    let r = L(t.c);
    if (r.length > ca) throw new P(t);
    return m(e, t.i, new RegExp(r, t.m));
  }
  throw new F(t);
}
function Aa(e, t, r) {
  let n = m(e, r.i, /* @__PURE__ */ new Set());
  for (let a = 0, i = r.a, o = i.length; a < o; a++) n.add(b(e, t, i[a]));
  return n;
}
function xa(e, t, r) {
  let n = m(e, r.i, /* @__PURE__ */ new Map());
  for (let a = 0, i = r.e.k, o = r.e.v, u = i.length; a < u; a++) n.set(b(e, t, i[a]), b(e, t, o[a]));
  return n;
}
function ka(e, t) {
  if (t.s.length > oa) throw new P(t);
  return m(e, t.i, Xt$1(L(t.s)));
}
function _a(e, t, r) {
  var n;
  let a = ia(r.c), i = b(e, t, r.f), o = (n = r.b) != null ? n : 0;
  if (o < 0 || o > i.byteLength) throw new P(r);
  return m(e, r.i, new a(i, o, r.l));
}
function $a(e, t, r) {
  var n;
  let a = b(e, t, r.f), i = (n = r.b) != null ? n : 0;
  if (i < 0 || i > a.byteLength) throw new P(r);
  return m(e, r.i, new DataView(a, i, r.l));
}
function tr$1(e, t, r, n) {
  if (r.p) {
    let a = er$1(e, t, r.p, {});
    Object.defineProperties(n, Object.getOwnPropertyDescriptors(a));
  }
  return n;
}
function za(e, t, r) {
  let n = m(e, r.i, new AggregateError([], L(r.m)));
  return tr$1(e, t, r, n);
}
function Ca(e, t, r) {
  let n = Ee$1(r, qn$1, r.s), a = m(e, r.i, new n(L(r.m)));
  return tr$1(e, t, r, a);
}
function Oa(e, t, r) {
  let n = ce(), a = m(e, r.i, n.p), i = b(e, t, r.f);
  return r.s ? n.s(i) : n.f(i), a;
}
function Pa(e, t, r) {
  return m(e, r.i, Object(b(e, t, r.f)));
}
function Ia(e, t, r) {
  let n = e.base.plugins;
  if (n) {
    let a = L(r.c);
    for (let i = 0, o = n.length; i < o; i++) {
      let u = n[i];
      if (u.tag === a) return m(e, r.i, u.deserialize(r.s, new da(e, t), { id: r.i }));
    }
  }
  throw new Mt$1(r.c);
}
function Na(e, t) {
  return m(e, t.i, m(e, t.s, ce()).p);
}
function Ta(e, t, r) {
  let n = e.base.refs.get(r.i);
  if (n) return n.s(b(e, t, r.a[1])), s;
  throw new Z("Promise");
}
function La(e, t, r) {
  let n = e.base.refs.get(r.i);
  if (n) return n.f(b(e, t, r.a[1])), s;
  throw new Z("Promise");
}
function Fa(e, t, r) {
  b(e, t, r.a[0]);
  let n = b(e, t, r.a[1]);
  return Ms(n);
}
function Ua(e, t, r) {
  b(e, t, r.a[0]);
  let n = b(e, t, r.a[1]);
  return Ys(n);
}
function ja(e, t, r) {
  let n = m(e, r.i, ee$1()), a = r.a, i = a.length;
  if (i) for (let o = 0; o < i; o++) b(e, t, a[o]);
  return n;
}
function Da(e, t, r) {
  let n = e.base.refs.get(r.i);
  if (n && le(n)) return n.next(b(e, t, r.f)), s;
  throw new Z("Stream");
}
function qa(e, t, r) {
  let n = e.base.refs.get(r.i);
  if (n && le(n)) return n.throw(b(e, t, r.f)), s;
  throw new Z("Stream");
}
function Ha(e, t, r) {
  let n = e.base.refs.get(r.i);
  if (n && le(n)) return n.return(b(e, t, r.f)), s;
  throw new Z("Stream");
}
function Ma(e, t, r) {
  return b(e, t, r.f), s;
}
function Ba(e, t, r) {
  return b(e, t, r.a[1]), s;
}
function Va(e, t, r) {
  let n = m(e, r.i, Gt$1([], r.s, r.l));
  for (let a = 0, i = r.a.length; a < i; a++) n.v[a] = b(e, t, r.a[a]);
  return n;
}
function b(e, t, r) {
  if (t > e.base.depthLimit) throw new Bt$1(e.base.depthLimit);
  switch (t += 1, r.t) {
    case 2:
      return Ee$1(r, Dn$1, r.s);
    case 0:
      return Number(r.s);
    case 1:
      return L(String(r.s));
    case 3:
      if (String(r.s).length > ua) throw new P(r);
      return BigInt(r.s);
    case 4:
      return e.base.refs.get(r.i);
    case 18:
      return ya(e, r);
    case 9:
      return ba(e, t, r);
    case 10:
    case 11:
      return Sa(e, t, r);
    case 5:
      return Ea(e, r);
    case 6:
      return Ra(e, r);
    case 7:
      return Aa(e, t, r);
    case 8:
      return xa(e, t, r);
    case 19:
      return ka(e, r);
    case 16:
    case 15:
      return _a(e, t, r);
    case 20:
      return $a(e, t, r);
    case 14:
      return za(e, t, r);
    case 13:
      return Ca(e, t, r);
    case 12:
      return Oa(e, t, r);
    case 17:
      return Ee$1(r, Un$1, r.s);
    case 21:
      return Pa(e, t, r);
    case 25:
      return Ia(e, t, r);
    case 22:
      return Na(e, r);
    case 23:
      return Ta(e, t, r);
    case 24:
      return La(e, t, r);
    case 28:
      return Fa(e, t, r);
    case 30:
      return Ua(e, t, r);
    case 31:
      return ja(e, t, r);
    case 32:
      return Da(e, t, r);
    case 33:
      return qa(e, t, r);
    case 34:
      return Ha(e, t, r);
    case 27:
      return Ma(e, t, r);
    case 29:
      return Ba(e, t, r);
    case 35:
      return Va(e, t, r);
    default:
      throw new F(r);
  }
}
function Wa(e, t) {
  try {
    return b(e, 0, t);
  } catch (r) {
    throw new ks(r);
  }
}
var Ja = () => T, Xa = Ja.toString(), rr$1 = /=>/.test(Xa);
function nr$1(e, t) {
  return rr$1 ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>" + (t.startsWith("{") ? "(" + t + ")" : t) : "function(" + e.join(",") + "){return " + t + "}";
}
function Ga(e, t) {
  return rr$1 ? (e.length === 1 ? e[0] : "(" + e.join(",") + ")") + "=>{" + t + "}" : "function(" + e.join(",") + "){" + t + "}";
}
var sr$1 = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_", Ke$1 = sr$1.length, ar$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_", Qe = ar$1.length;
function Ya(e) {
  let t = e % Ke$1, r = sr$1[t];
  for (e = (e - t) / Ke$1; e > 0; ) t = e % Qe, r += ar$1[t], e = (e - t) / Qe;
  return r;
}
var Ka = /^[$A-Z_][0-9A-Z_$]*$/i;
function ir$1(e) {
  let t = e[0];
  return (t === "$" || t === "_" || t >= "A" && t <= "Z" || t >= "a" && t <= "z") && Ka.test(e);
}
function G(e) {
  switch (e.t) {
    case 0:
      return e.s + "=" + e.v;
    case 2:
      return e.s + ".set(" + e.k + "," + e.v + ")";
    case 1:
      return e.s + ".add(" + e.v + ")";
    case 3:
      return e.s + ".delete(" + e.k + ")";
  }
}
function Qa(e) {
  let t = [], r = e[0];
  for (let n = 1, a = e.length, i, o = r; n < a; n++) i = e[n], i.t === 0 && i.v === o.v ? r = { t: 0, s: i.s, k: s, v: G(r) } : i.t === 2 && i.s === o.s ? r = { t: 2, s: G(r), k: i.k, v: i.v } : i.t === 1 && i.s === o.s ? r = { t: 1, s: G(r), k: s, v: i.v } : i.t === 3 && i.s === o.s ? r = { t: 3, s: G(r), k: i.k, v: s } : (t.push(r), r = i), o = i;
  return t.push(r), t;
}
function or$1(e) {
  if (e.length) {
    let t = "", r = Qa(e);
    for (let n = 0, a = r.length; n < a; n++) t += G(r[n]) + ",";
    return t;
  }
  return s;
}
var Za = "Object.create(null)", ei = "new Set", ti = "new Map", ri = "Promise.resolve", ni = "Promise.reject", si = { 3: "Object.freeze", 2: "Object.seal", 1: "Object.preventExtensions", 0: s };
function ai(e, t) {
  return { mode: e, plugins: t.plugins, features: t.features, marked: new Set(t.markedRefs), stack: [], flags: [], assignments: [] };
}
function ii(e) {
  return { mode: 2, base: ai(2, e), state: e, child: s };
}
var oi = class {
  constructor(e) {
    this._p = e;
  }
  serialize(e) {
    return h(this._p, e);
  }
};
function ui(e, t) {
  let r = e.valid.get(t);
  r == null && (r = e.valid.size, e.valid.set(t, r));
  let n = e.vars[r];
  return n == null && (n = Ya(r), e.vars[r] = n), n;
}
function ci(e) {
  return oe + "[" + e + "]";
}
function y(e, t) {
  return e.mode === 1 ? ui(e.state, t) : ci(t);
}
function E(e, t) {
  e.marked.add(t);
}
function Re$1(e, t) {
  return e.marked.has(t);
}
function Ce(e, t, r) {
  t !== 0 && (E(e.base, r), e.base.flags.push({ type: t, value: y(e, r) }));
}
function li(e) {
  let t = "";
  for (let r = 0, n = e.flags, a = n.length; r < a; r++) {
    let i = n[r];
    t += si[i.type] + "(" + i.value + "),";
  }
  return t;
}
function fi(e) {
  let t = or$1(e.assignments), r = li(e);
  return t ? r ? t + r : t : r;
}
function Oe$1(e, t, r) {
  e.assignments.push({ t: 0, s: t, k: s, v: r });
}
function pi(e, t, r) {
  e.base.assignments.push({ t: 1, s: y(e, t), k: s, v: r });
}
function J$1(e, t, r, n) {
  e.base.assignments.push({ t: 2, s: y(e, t), k: r, v: n });
}
function Ze(e, t, r) {
  e.base.assignments.push({ t: 3, s: y(e, t), k: r, v: s });
}
function K(e, t, r, n) {
  Oe$1(e.base, y(e, t) + "[" + r + "]", n);
}
function Ae(e, t, r, n) {
  Oe$1(e.base, y(e, t) + "." + r, n);
}
function di(e, t, r, n) {
  Oe$1(e.base, y(e, t) + ".v[" + r + "]", n);
}
function x(e, t) {
  return t.t === 4 && e.stack.includes(t.i);
}
function W$1(e, t, r) {
  return e.mode === 1 && !Re$1(e.base, t) ? r : y(e, t) + "=" + r;
}
function hi(e) {
  return X$1 + '.get("' + e.s + '")';
}
function et(e, t, r, n) {
  return r ? x(e.base, r) ? (E(e.base, t), K(e, t, n, y(e, r.i)), "") : h(e, r) : "";
}
function gi(e, t) {
  let r = t.i, n = t.a, a = n.length;
  if (a > 0) {
    e.base.stack.push(r);
    let i = et(e, r, n[0], 0), o = i === "";
    for (let u = 1, c; u < a; u++) c = et(e, r, n[u], u), i += "," + c, o = c === "";
    return e.base.stack.pop(), Ce(e, t.o, t.i), "[" + i + (o ? ",]" : "]");
  }
  return "[]";
}
function tt(e, t, r, n) {
  if (typeof r == "string") {
    let a = Number(r), i = a >= 0 && a.toString() === r || ir$1(r);
    if (x(e.base, n)) {
      let o = y(e, n.i);
      return E(e.base, t.i), i && a !== a ? Ae(e, t.i, r, o) : K(e, t.i, i ? r : '"' + r + '"', o), "";
    }
    return (i ? r : '"' + r + '"') + ":" + h(e, n);
  }
  return "[" + h(e, r) + "]:" + h(e, n);
}
function ur(e, t, r) {
  let n = r.k, a = n.length;
  if (a > 0) {
    let i = r.v;
    e.base.stack.push(t.i);
    let o = tt(e, t, n[0], i[0]);
    for (let u = 1, c = o; u < a; u++) c = tt(e, t, n[u], i[u]), o += (c && o && ",") + c;
    return e.base.stack.pop(), "{" + o + "}";
  }
  return "{}";
}
function yi(e, t) {
  return Ce(e, t.o, t.i), ur(e, t, t.p);
}
function bi(e, t, r, n) {
  let a = ur(e, t, r);
  return a !== "{}" ? "Object.assign(" + n + "," + a + ")" : n;
}
function mi(e, t, r, n, a) {
  let i = e.base, o = h(e, a), u = Number(n), c = u >= 0 && u.toString() === n || ir$1(n);
  if (x(i, a)) c && u !== u ? Ae(e, t.i, n, o) : K(e, t.i, c ? n : '"' + n + '"', o);
  else {
    let l = i.assignments;
    i.assignments = r, c && u !== u ? Ae(e, t.i, n, o) : K(e, t.i, c ? n : '"' + n + '"', o), i.assignments = l;
  }
}
function wi(e, t, r, n, a) {
  if (typeof n == "string") mi(e, t, r, n, a);
  else {
    let i = e.base, o = i.stack;
    i.stack = [];
    let u = h(e, a);
    i.stack = o;
    let c = i.assignments;
    i.assignments = r, K(e, t.i, h(e, n), u), i.assignments = c;
  }
}
function vi(e, t, r) {
  let n = r.k, a = n.length;
  if (a > 0) {
    let i = [], o = r.v;
    e.base.stack.push(t.i);
    for (let u = 0; u < a; u++) wi(e, t, i, n[u], o[u]);
    return e.base.stack.pop(), or$1(i);
  }
  return s;
}
function Pe(e, t, r) {
  if (t.p) {
    let n = e.base;
    if (n.features & 8) r = bi(e, t, t.p, r);
    else {
      E(n, t.i);
      let a = vi(e, t, t.p);
      if (a) return "(" + W$1(e, t.i, r) + "," + a + y(e, t.i) + ")";
    }
  }
  return r;
}
function Si(e, t) {
  return Ce(e, t.o, t.i), Pe(e, t, Za);
}
function Ei(e) {
  return 'new Date("' + e.s + '")';
}
function Ri(e, t) {
  if (e.base.features & 32) return "/" + t.c + "/" + t.m;
  throw new F(t);
}
function rt(e, t, r) {
  let n = e.base;
  return x(n, r) ? (E(n, t), pi(e, t, y(e, r.i)), "") : h(e, r);
}
function Ai(e, t) {
  let r = ei, n = t.a, a = n.length, i = t.i;
  if (a > 0) {
    e.base.stack.push(i);
    let o = rt(e, i, n[0]);
    for (let u = 1, c = o; u < a; u++) c = rt(e, i, n[u]), o += (c && o && ",") + c;
    e.base.stack.pop(), o && (r += "([" + o + "])");
  }
  return r;
}
function nt(e, t, r, n, a) {
  let i = e.base;
  if (x(i, r)) {
    let o = y(e, r.i);
    if (E(i, t), x(i, n)) {
      let c = y(e, n.i);
      return J$1(e, t, o, c), "";
    }
    if (n.t !== 4 && n.i != null && Re$1(i, n.i)) {
      let c = "(" + h(e, n) + ",[" + a + "," + a + "])";
      return J$1(e, t, o, y(e, n.i)), Ze(e, t, a), c;
    }
    let u = i.stack;
    return i.stack = [], J$1(e, t, o, h(e, n)), i.stack = u, "";
  }
  if (x(i, n)) {
    let o = y(e, n.i);
    if (E(i, t), r.t !== 4 && r.i != null && Re$1(i, r.i)) {
      let c = "(" + h(e, r) + ",[" + a + "," + a + "])";
      return J$1(e, t, y(e, r.i), o), Ze(e, t, a), c;
    }
    let u = i.stack;
    return i.stack = [], J$1(e, t, h(e, r), o), i.stack = u, "";
  }
  return "[" + h(e, r) + "," + h(e, n) + "]";
}
function xi(e, t) {
  let r = ti, n = t.e.k, a = n.length, i = t.i, o = t.f, u = y(e, o.i), c = e.base;
  if (a > 0) {
    let l = t.e.v;
    c.stack.push(i);
    let p = nt(e, i, n[0], l[0], u);
    for (let d = 1, w = p; d < a; d++) w = nt(e, i, n[d], l[d], u), p += (w && p && ",") + w;
    c.stack.pop(), p && (r += "([" + p + "])");
  }
  return o.t === 26 && (E(c, o.i), r = "(" + h(e, o) + "," + r + ")"), r;
}
function ki(e, t) {
  return j$1(e, t.f) + '("' + t.s + '")';
}
function _i(e, t) {
  return "new " + t.c + "(" + h(e, t.f) + "," + t.b + "," + t.l + ")";
}
function $i(e, t) {
  return "new DataView(" + h(e, t.f) + "," + t.b + "," + t.l + ")";
}
function zi(e, t) {
  let r = t.i;
  e.base.stack.push(r);
  let n = Pe(e, t, 'new AggregateError([],"' + t.m + '")');
  return e.base.stack.pop(), n;
}
function Ci(e, t) {
  return Pe(e, t, "new " + It$1[t.s] + '("' + t.m + '")');
}
function Oi(e, t) {
  let r, n = t.f, a = t.i, i = t.s ? ri : ni, o = e.base;
  if (x(o, n)) {
    let u = y(e, n.i);
    r = i + (t.s ? "().then(" + nr$1([], u) + ")" : "().catch(" + Ga([], "throw " + u) + ")");
  } else {
    o.stack.push(a);
    let u = h(e, n);
    o.stack.pop(), r = i + "(" + u + ")";
  }
  return r;
}
function Pi(e, t) {
  return "Object(" + h(e, t.f) + ")";
}
function j$1(e, t) {
  let r = h(e, t);
  return t.t === 4 ? r : "(" + r + ")";
}
function Ii(e, t) {
  if (e.mode === 1) throw new F(t);
  return "(" + W$1(e, t.s, j$1(e, t.f) + "()") + ").p";
}
function Ni(e, t) {
  if (e.mode === 1) throw new F(t);
  return j$1(e, t.a[0]) + "(" + y(e, t.i) + "," + h(e, t.a[1]) + ")";
}
function Ti(e, t) {
  if (e.mode === 1) throw new F(t);
  return j$1(e, t.a[0]) + "(" + y(e, t.i) + "," + h(e, t.a[1]) + ")";
}
function Li(e, t) {
  let r = e.base.plugins;
  if (r) for (let n = 0, a = r.length; n < a; n++) {
    let i = r[n];
    if (i.tag === t.c) return e.child == null && (e.child = new oi(e)), i.serialize(t.s, e.child, { id: t.i });
  }
  throw new Mt$1(t.c);
}
function Fi(e, t) {
  let r = "", n = false;
  return t.f.t !== 4 && (E(e.base, t.f.i), r = "(" + h(e, t.f) + ",", n = true), r += W$1(e, t.i, "(" + Fs + ")(" + y(e, t.f.i) + ")"), n && (r += ")"), r;
}
function Ui(e, t) {
  return j$1(e, t.a[0]) + "(" + h(e, t.a[1]) + ")";
}
function ji(e, t) {
  let r = t.a[0], n = t.a[1], a = e.base, i = "";
  r.t !== 4 && (E(a, r.i), i += "(" + h(e, r)), n.t !== 4 && (E(a, n.i), i += (i ? "," : "(") + h(e, n)), i && (i += ",");
  let o = W$1(e, t.i, "(" + Us + ")(" + y(e, n.i) + "," + y(e, r.i) + ")");
  return i ? i + o + ")" : o;
}
function Di(e, t) {
  return j$1(e, t.a[0]) + "(" + h(e, t.a[1]) + ")";
}
function qi(e, t) {
  let r = W$1(e, t.i, j$1(e, t.f) + "()"), n = t.a.length;
  if (n) {
    let a = h(e, t.a[0]);
    for (let i = 1; i < n; i++) a += "," + h(e, t.a[i]);
    return "(" + r + "," + a + "," + y(e, t.i) + ")";
  }
  return r;
}
function Hi(e, t) {
  return y(e, t.i) + ".next(" + h(e, t.f) + ")";
}
function Mi(e, t) {
  return y(e, t.i) + ".throw(" + h(e, t.f) + ")";
}
function Bi(e, t) {
  return y(e, t.i) + ".return(" + h(e, t.f) + ")";
}
function st(e, t, r, n) {
  let a = e.base;
  return x(a, n) ? (E(a, t), di(e, t, r, y(e, n.i)), "") : h(e, n);
}
function Vi(e, t) {
  let r = t.a, n = r.length, a = t.i;
  if (n > 0) {
    e.base.stack.push(a);
    let i = st(e, a, 0, r[0]);
    for (let o = 1, u = i; o < n; o++) u = st(e, a, o, r[o]), i += (u && i && ",") + u;
    if (e.base.stack.pop(), i) return "{__SEROVAL_SEQUENCE__:!0,v:[" + i + "],t:" + t.s + ",d:" + t.l + "}";
  }
  return "{__SEROVAL_SEQUENCE__:!0,v:[],t:-1,d:0}";
}
function Wi(e, t) {
  switch (t.t) {
    case 17:
      return Fn$1[t.s];
    case 18:
      return hi(t);
    case 9:
      return gi(e, t);
    case 10:
      return yi(e, t);
    case 11:
      return Si(e, t);
    case 5:
      return Ei(t);
    case 6:
      return Ri(e, t);
    case 7:
      return Ai(e, t);
    case 8:
      return xi(e, t);
    case 19:
      return ki(e, t);
    case 16:
    case 15:
      return _i(e, t);
    case 20:
      return $i(e, t);
    case 14:
      return zi(e, t);
    case 13:
      return Ci(e, t);
    case 12:
      return Oi(e, t);
    case 21:
      return Pi(e, t);
    case 22:
      return Ii(e, t);
    case 25:
      return Li(e, t);
    case 26:
      return Js[t.s];
    case 35:
      return Vi(e, t);
    default:
      throw new F(t);
  }
}
function h(e, t) {
  switch (t.t) {
    case 2:
      return jn$1[t.s];
    case 0:
      return "" + t.s;
    case 1:
      return '"' + t.s + '"';
    case 3:
      return t.s + "n";
    case 4:
      return y(e, t.i);
    case 23:
      return Ni(e, t);
    case 24:
      return Ti(e, t);
    case 27:
      return Fi(e, t);
    case 28:
      return Ui(e, t);
    case 29:
      return ji(e, t);
    case 30:
      return Di(e, t);
    case 31:
      return qi(e, t);
    case 32:
      return Hi(e, t);
    case 33:
      return Mi(e, t);
    case 34:
      return Bi(e, t);
    default:
      return W$1(e, t.i, Wi(e, t));
  }
}
function Ji(e, t) {
  let r = h(e, t), n = t.i;
  if (n == null) return r;
  let a = fi(e.base), i = y(e, n), o = e.state.scopeId, u = o == null ? "" : oe, c = a ? "(" + r + "," + a + i + ")" : r;
  if (u === "") return t.t === 10 && !a ? "(" + c + ")" : c;
  let l = o == null ? "()" : "(" + oe + '["' + A(o) + '"])';
  return "(" + nr$1([u], c) + ")" + l;
}
var Xi = class {
  constructor(e, t) {
    this._p = e, this.depth = t;
  }
  parse(e) {
    return v(this._p, this.depth, e);
  }
}, Gi = class {
  constructor(e, t) {
    this._p = e, this.depth = t;
  }
  parse(e) {
    return v(this._p, this.depth, e);
  }
  parseWithError(e) {
    return N$1(this._p, this.depth, e);
  }
  isAlive() {
    return this._p.state.alive;
  }
  pushPendingState() {
    Le(this._p);
  }
  popPendingState() {
    Q$1(this._p);
  }
  onParse(e) {
    V$1(this._p, e);
  }
  onError(e) {
    Ne$1(this._p, e);
  }
};
function Yi(e) {
  return { alive: true, pending: 0, initial: true, buffer: [], onParse: e.onParse, onError: e.onError, onDone: e.onDone };
}
function cr$1(e) {
  return { type: 2, base: Ks(2, e), state: Yi(e) };
}
function Ki(e, t, r) {
  let n = [];
  for (let a = 0, i = r.length; a < i; a++) a in r ? n[a] = v(e, t, r[a]) : n[a] = 0;
  return n;
}
function Qi(e, t, r, n) {
  return us(r, n, Ki(e, t, n));
}
function Ie$1(e, t, r) {
  let n = Object.entries(r), a = [], i = [];
  for (let o = 0, u = n.length; o < u; o++) a.push(A(n[o][0])), i.push(v(e, t, n[o][1]));
  return _ in r && (a.push(I(e.base, _)), i.push(ys(Zs(e.base), v(e, t, qs(r))))), k in r && (a.push(I(e.base, k)), i.push(bs(ea(e.base), v(e, t, e.type === 1 ? ee$1() : Xs(r))))), B in r && (a.push(I(e.base, B)), i.push(Dt$1(r[B]))), M in r && (a.push(I(e.base, M)), i.push(r[M] ? Nt : Tt)), { k: a, v: i };
}
function ge$1(e, t, r, n, a) {
  return ta(r, n, a, Ie$1(e, t, n));
}
function Zi(e, t, r, n) {
  return cs(r, v(e, t, n.valueOf()));
}
function eo(e, t, r, n) {
  return ls(r, n, v(e, t, n.buffer));
}
function to(e, t, r, n) {
  return fs(r, n, v(e, t, n.buffer));
}
function ro(e, t, r, n) {
  return ps(r, n, v(e, t, n.buffer));
}
function at(e, t, r, n) {
  let a = Ut$1(n, e.base.features);
  return ds(r, n, a ? Ie$1(e, t, a) : s);
}
function no(e, t, r, n) {
  let a = Ut$1(n, e.base.features);
  return hs(r, n, a ? Ie$1(e, t, a) : s);
}
function so(e, t, r, n) {
  let a = [], i = [];
  for (let [o, u] of n.entries()) a.push(v(e, t, o)), i.push(v(e, t, u));
  return ra(e.base, r, a, i);
}
function ao(e, t, r, n) {
  let a = [];
  for (let i of n.keys()) a.push(v(e, t, i));
  return gs(r, a);
}
function io(e, t, r, n) {
  let a = ms(r, U(e.base, 4), []);
  return e.type === 1 || (Le(e), n.on({ next: (i) => {
    if (e.state.alive) {
      let o = N$1(e, t, i);
      o && V$1(e, ws(r, o));
    }
  }, throw: (i) => {
    if (e.state.alive) {
      let o = N$1(e, t, i);
      o && V$1(e, vs(r, o));
    }
    Q$1(e);
  }, return: (i) => {
    if (e.state.alive) {
      let o = N$1(e, t, i);
      o && V$1(e, Ss(r, o));
    }
    Q$1(e);
  } })), a;
}
function oo(e, t, r) {
  if (this.state.alive) {
    let n = N$1(this, t, r);
    n && V$1(this, g(23, e, s, s, s, s, s, [U(this.base, 2), n], s, s, s, s)), Q$1(this);
  }
}
function uo(e, t, r) {
  if (this.state.alive) {
    let n = N$1(this, t, r);
    n && V$1(this, g(24, e, s, s, s, s, s, [U(this.base, 3), n], s, s, s, s));
  }
  Q$1(this);
}
function co(e, t, r, n) {
  let a = Yt$1(e.base, {});
  return e.type === 2 && (Le(e), n.then(oo.bind(e, a, t), uo.bind(e, a, t))), na(e.base, r, a);
}
function lo(e, t, r, n, a) {
  for (let i = 0, o = a.length; i < o; i++) {
    let u = a[i];
    if (u.parse.sync && u.test(n)) return qt$1(r, u.tag, u.parse.sync(n, new Xi(e, t), { id: r }));
  }
  return s;
}
function fo(e, t, r, n, a) {
  for (let i = 0, o = a.length; i < o; i++) {
    let u = a[i];
    if (u.parse.stream && u.test(n)) return qt$1(r, u.tag, u.parse.stream(n, new Gi(e, t), { id: r }));
  }
  return s;
}
function lr$1(e, t, r, n) {
  let a = e.base.plugins;
  return a ? e.type === 1 ? lo(e, t, r, n, a) : fo(e, t, r, n, a) : s;
}
function po(e, t, r, n) {
  let a = [];
  for (let i = 0, o = n.v.length; i < o; i++) a[i] = v(e, t, n.v[i]);
  return Es(r, a, n.t, n.d);
}
function ho(e, t, r, n, a) {
  switch (a) {
    case Object:
      return ge$1(e, t, r, n, false);
    case s:
      return ge$1(e, t, r, n, true);
    case Date:
      return ss(r, n);
    case Error:
    case EvalError:
    case RangeError:
    case ReferenceError:
    case SyntaxError:
    case TypeError:
    case URIError:
      return at(e, t, r, n);
    case Number:
    case Boolean:
    case String:
    case BigInt:
      return Zi(e, t, r, n);
    case ArrayBuffer:
      return sa(e.base, r, n);
    case Int8Array:
    case Int16Array:
    case Int32Array:
    case Uint8Array:
    case Uint16Array:
    case Uint32Array:
    case Uint8ClampedArray:
    case Float32Array:
    case Float64Array:
      return eo(e, t, r, n);
    case DataView:
      return ro(e, t, r, n);
    case Map:
      return so(e, t, r, n);
    case Set:
      return ao(e, t, r, n);
  }
  if (a === Promise || n instanceof Promise) return co(e, t, r, n);
  let i = e.base.features;
  if (i & 32 && a === RegExp) return as(r, n);
  if (i & 16) switch (a) {
    case BigInt64Array:
    case BigUint64Array:
      return to(e, t, r, n);
  }
  if (i & 1 && typeof AggregateError < "u" && (a === AggregateError || n instanceof AggregateError)) return no(e, t, r, n);
  if (n instanceof Error) return at(e, t, r, n);
  if (_ in n || k in n) return ge$1(e, t, r, n, !!a);
  throw new ue(n);
}
function go(e, t, r, n) {
  if (Array.isArray(n)) return Qi(e, t, r, n);
  if (le(n)) return io(e, t, r, n);
  if (Ds(n)) return po(e, t, r, n);
  let a = n.constructor;
  return a === Cs ? v(e, t, n.replacement) : lr$1(e, t, r, n) || ho(e, t, r, n, a);
}
function yo(e, t, r) {
  let n = $e(e.base, r);
  if (n.type !== 0) return n.value;
  let a = lr$1(e, t, n.value, r);
  if (a) return a;
  throw new ue(r);
}
function v(e, t, r) {
  if (t >= e.base.depthLimit) throw new Bt$1(e.base.depthLimit);
  switch (typeof r) {
    case "boolean":
      return r ? Nt : Tt;
    case "undefined":
      return Hn$1;
    case "string":
      return Dt$1(r);
    case "number":
      return ts(r);
    case "bigint":
      return rs(r);
    case "object": {
      if (r) {
        let n = $e(e.base, r);
        return n.type === 0 ? go(e, t + 1, n.value, r) : n.value;
      }
      return Mn$1;
    }
    case "symbol":
      return I(e.base, r);
    case "function":
      return yo(e, t, r);
    default:
      throw new ue(r);
  }
}
function V$1(e, t) {
  e.state.initial ? e.state.buffer.push(t) : Te$1(e, t, false);
}
function Ne$1(e, t) {
  if (e.state.onError) e.state.onError(t);
  else throw t instanceof Ge ? t : new Ge(t);
}
function fr(e) {
  e.state.onDone && e.state.onDone();
}
function Te$1(e, t, r) {
  try {
    e.state.onParse(t, r);
  } catch (n) {
    Ne$1(e, n);
  }
}
function Le(e) {
  e.state.pending++;
}
function Q$1(e) {
  --e.state.pending <= 0 && fr(e);
}
function N$1(e, t, r) {
  try {
    return v(e, t, r);
  } catch (n) {
    return Ne$1(e, n), s;
  }
}
function pr(e, t) {
  let r = N$1(e, 0, t);
  r && (Te$1(e, r, true), e.state.initial = false, bo(e, e.state), e.state.pending <= 0 && Fe$1(e));
}
function bo(e, t) {
  for (let r = 0, n = t.buffer.length; r < n; r++) Te$1(e, t.buffer[r], false);
}
function Fe$1(e) {
  e.state.alive && (fr(e), e.state.alive = false);
}
function mo(e, t) {
  let r = ze(t.plugins), n = cr$1({ plugins: r, refs: t.refs, disabledFeatures: t.disabledFeatures, onParse(a, i) {
    let o = ii({ plugins: r, features: n.base.features, scopeId: t.scopeId, markedRefs: n.base.marked }), u;
    try {
      u = Ji(o, a);
    } catch (c) {
      t.onError && t.onError(c);
      return;
    }
    t.onSerialize(u, i);
  }, onError: t.onError, onDone: t.onDone });
  return pr(n, e), Fe$1.bind(null, n);
}
function wo(e, t) {
  let r = ze(t.plugins), n = cr$1({ plugins: r, refs: t.refs, disabledFeatures: t.disabledFeatures, onParse: t.onParse, onError: t.onError, onDone: t.onDone });
  return pr(n, e), Fe$1.bind(null, n);
}
function vo(e, t = {}) {
  var r;
  let n = ze(t.plugins), a = t.disabledFeatures || 0, i = (r = e.f) != null ? r : 63, o = pa({ plugins: n, markedRefs: e.m, features: i & ~a, disabledFeatures: a });
  return Wa(o, e.t);
}
var xe = (e) => {
  let t = new AbortController(), r = t.abort.bind(t);
  return e.then(r, r), t;
};
function So(e) {
  e(this.reason);
}
function Eo(e) {
  this.addEventListener("abort", So.bind(this, e), { once: true });
}
function it(e) {
  return new Promise(Eo.bind(e));
}
var Y$1 = {}, Ro = { tag: "seroval-plugins/web/AbortControllerFactoryPlugin", test(e) {
  return e === Y$1;
}, parse: { sync() {
  return Y$1;
}, async async() {
  return await Promise.resolve(Y$1);
}, stream() {
  return Y$1;
} }, serialize() {
  return xe.toString();
}, deserialize() {
  return xe;
} }, Ao = { tag: "seroval-plugins/web/AbortSignal", extends: [Ro], test(e) {
  return typeof AbortSignal > "u" ? false : e instanceof AbortSignal;
}, parse: { sync(e, t) {
  return e.aborted ? { reason: t.parse(e.reason) } : {};
}, async async(e, t) {
  if (e.aborted) return { reason: await t.parse(e.reason) };
  let r = await it(e);
  return { reason: await t.parse(r) };
}, stream(e, t) {
  if (e.aborted) return { reason: t.parse(e.reason) };
  let r = it(e);
  return { factory: t.parse(Y$1), controller: t.parse(r) };
} }, serialize(e, t) {
  return e.reason ? "AbortSignal.abort(" + t.serialize(e.reason) + ")" : e.controller && e.factory ? "(" + t.serialize(e.factory) + ")(" + t.serialize(e.controller) + ").signal" : "(new AbortController).signal";
}, deserialize(e, t) {
  return e.reason ? AbortSignal.abort(t.deserialize(e.reason)) : e.controller ? xe(t.deserialize(e.controller)).signal : new AbortController().signal;
} }, xo = Ao;
function ye$1(e) {
  return { detail: e.detail, bubbles: e.bubbles, cancelable: e.cancelable, composed: e.composed };
}
var ko = { tag: "seroval-plugins/web/CustomEvent", test(e) {
  return typeof CustomEvent > "u" ? false : e instanceof CustomEvent;
}, parse: { sync(e, t) {
  return { type: t.parse(e.type), options: t.parse(ye$1(e)) };
}, async async(e, t) {
  return { type: await t.parse(e.type), options: await t.parse(ye$1(e)) };
}, stream(e, t) {
  return { type: t.parse(e.type), options: t.parse(ye$1(e)) };
} }, serialize(e, t) {
  return "new CustomEvent(" + t.serialize(e.type) + "," + t.serialize(e.options) + ")";
}, deserialize(e, t) {
  return new CustomEvent(t.deserialize(e.type), t.deserialize(e.options));
} }, _o = ko, $o = { tag: "seroval-plugins/web/DOMException", test(e) {
  return typeof DOMException > "u" ? false : e instanceof DOMException;
}, parse: { sync(e, t) {
  return { name: t.parse(e.name), message: t.parse(e.message) };
}, async async(e, t) {
  return { name: await t.parse(e.name), message: await t.parse(e.message) };
}, stream(e, t) {
  return { name: t.parse(e.name), message: t.parse(e.message) };
} }, serialize(e, t) {
  return "new DOMException(" + t.serialize(e.message) + "," + t.serialize(e.name) + ")";
}, deserialize(e, t) {
  return new DOMException(t.deserialize(e.message), t.deserialize(e.name));
} }, zo = $o;
function be$1(e) {
  return { bubbles: e.bubbles, cancelable: e.cancelable, composed: e.composed };
}
var Co = { tag: "seroval-plugins/web/Event", test(e) {
  return typeof Event > "u" ? false : e instanceof Event;
}, parse: { sync(e, t) {
  return { type: t.parse(e.type), options: t.parse(be$1(e)) };
}, async async(e, t) {
  return { type: await t.parse(e.type), options: await t.parse(be$1(e)) };
}, stream(e, t) {
  return { type: t.parse(e.type), options: t.parse(be$1(e)) };
} }, serialize(e, t) {
  return "new Event(" + t.serialize(e.type) + "," + t.serialize(e.options) + ")";
}, deserialize(e, t) {
  return new Event(t.deserialize(e.type), t.deserialize(e.options));
} }, Oo = Co, Po = { tag: "seroval-plugins/web/File", test(e) {
  return typeof File > "u" ? false : e instanceof File;
}, parse: { async async(e, t) {
  return { name: await t.parse(e.name), options: await t.parse({ type: e.type, lastModified: e.lastModified }), buffer: await t.parse(await e.arrayBuffer()) };
} }, serialize(e, t) {
  return "new File([" + t.serialize(e.buffer) + "]," + t.serialize(e.name) + "," + t.serialize(e.options) + ")";
}, deserialize(e, t) {
  return new File([t.deserialize(e.buffer)], t.deserialize(e.name), t.deserialize(e.options));
} }, Io = Po;
function me$1(e) {
  let t = [];
  return e.forEach((r, n) => {
    t.push([n, r]);
  }), t;
}
var z = {}, dr = (e, t = new FormData(), r = 0, n = e.length, a) => {
  for (; r < n; r++) a = e[r], t.append(a[0], a[1]);
  return t;
}, No = { tag: "seroval-plugins/web/FormDataFactory", test(e) {
  return e === z;
}, parse: { sync() {
  return z;
}, async async() {
  return await Promise.resolve(z);
}, stream() {
  return z;
} }, serialize() {
  return dr.toString();
}, deserialize() {
  return z;
} }, To = { tag: "seroval-plugins/web/FormData", extends: [Io, No], test(e) {
  return typeof FormData > "u" ? false : e instanceof FormData;
}, parse: { sync(e, t) {
  return { factory: t.parse(z), entries: t.parse(me$1(e)) };
}, async async(e, t) {
  return { factory: await t.parse(z), entries: await t.parse(me$1(e)) };
}, stream(e, t) {
  return { factory: t.parse(z), entries: t.parse(me$1(e)) };
} }, serialize(e, t) {
  return "(" + t.serialize(e.factory) + ")(" + t.serialize(e.entries) + ")";
}, deserialize(e, t) {
  return dr(t.deserialize(e.entries));
} }, Lo = To;
function we$1(e) {
  let t = [];
  return e.forEach((r, n) => {
    t.push([n, r]);
  }), t;
}
var Fo = { tag: "seroval-plugins/web/Headers", test(e) {
  return typeof Headers > "u" ? false : e instanceof Headers;
}, parse: { sync(e, t) {
  return { value: t.parse(we$1(e)) };
}, async async(e, t) {
  return { value: await t.parse(we$1(e)) };
}, stream(e, t) {
  return { value: t.parse(we$1(e)) };
} }, serialize(e, t) {
  return "new Headers(" + t.serialize(e.value) + ")";
}, deserialize(e, t) {
  return new Headers(t.deserialize(e.value));
} }, Ue$1 = Fo, C = {}, hr = (e) => new ReadableStream({ start: (t) => {
  e.on({ next: (r) => {
    try {
      t.enqueue(r);
    } catch {
    }
  }, throw: (r) => {
    t.error(r);
  }, return: () => {
    try {
      t.close();
    } catch {
    }
  } });
} }), Uo = { tag: "seroval-plugins/web/ReadableStreamFactory", test(e) {
  return e === C;
}, parse: { sync() {
  return C;
}, async async() {
  return await Promise.resolve(C);
}, stream() {
  return C;
} }, serialize() {
  return hr.toString();
}, deserialize() {
  return C;
} };
function ot(e) {
  let t = ee$1(), r = e.getReader();
  async function n() {
    try {
      let a = await r.read();
      a.done ? t.return(a.value) : (t.next(a.value), await n());
    } catch (a) {
      t.throw(a);
    }
  }
  return n().catch(() => {
  }), t;
}
var jo = { tag: "seroval/plugins/web/ReadableStream", extends: [Uo], test(e) {
  return typeof ReadableStream > "u" ? false : e instanceof ReadableStream;
}, parse: { sync(e, t) {
  return { factory: t.parse(C), stream: t.parse(ee$1()) };
}, async async(e, t) {
  return { factory: await t.parse(C), stream: await t.parse(ot(e)) };
}, stream(e, t) {
  return { factory: t.parse(C), stream: t.parse(ot(e)) };
} }, serialize(e, t) {
  return "(" + t.serialize(e.factory) + ")(" + t.serialize(e.stream) + ")";
}, deserialize(e, t) {
  let r = t.deserialize(e.stream);
  return hr(r);
} }, je$1 = jo;
function ut(e, t) {
  return { body: t, cache: e.cache, credentials: e.credentials, headers: e.headers, integrity: e.integrity, keepalive: e.keepalive, method: e.method, mode: e.mode, redirect: e.redirect, referrer: e.referrer, referrerPolicy: e.referrerPolicy };
}
var Do = { tag: "seroval-plugins/web/Request", extends: [je$1, Ue$1], test(e) {
  return typeof Request > "u" ? false : e instanceof Request;
}, parse: { async async(e, t) {
  return { url: await t.parse(e.url), options: await t.parse(ut(e, e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null)) };
}, stream(e, t) {
  return { url: t.parse(e.url), options: t.parse(ut(e, e.body && !e.bodyUsed ? e.clone().body : null)) };
} }, serialize(e, t) {
  return "new Request(" + t.serialize(e.url) + "," + t.serialize(e.options) + ")";
}, deserialize(e, t) {
  return new Request(t.deserialize(e.url), t.deserialize(e.options));
} }, qo = Do;
function ct(e) {
  return { headers: e.headers, status: e.status, statusText: e.statusText };
}
var Ho = { tag: "seroval-plugins/web/Response", extends: [je$1, Ue$1], test(e) {
  return typeof Response > "u" ? false : e instanceof Response;
}, parse: { async async(e, t) {
  return { body: await t.parse(e.body && !e.bodyUsed ? await e.clone().arrayBuffer() : null), options: await t.parse(ct(e)) };
}, stream(e, t) {
  return { body: t.parse(e.body && !e.bodyUsed ? e.clone().body : null), options: t.parse(ct(e)) };
} }, serialize(e, t) {
  return "new Response(" + t.serialize(e.body) + "," + t.serialize(e.options) + ")";
}, deserialize(e, t) {
  return new Response(t.deserialize(e.body), t.deserialize(e.options));
} }, Mo = Ho, Bo = { tag: "seroval-plugins/web/URL", test(e) {
  return typeof URL > "u" ? false : e instanceof URL;
}, parse: { sync(e, t) {
  return { value: t.parse(e.href) };
}, async async(e, t) {
  return { value: await t.parse(e.href) };
}, stream(e, t) {
  return { value: t.parse(e.href) };
} }, serialize(e, t) {
  return "new URL(" + t.serialize(e.value) + ")";
}, deserialize(e, t) {
  return new URL(t.deserialize(e.value));
} }, Vo = Bo, Wo = { tag: "seroval-plugins/web/URLSearchParams", test(e) {
  return typeof URLSearchParams > "u" ? false : e instanceof URLSearchParams;
}, parse: { sync(e, t) {
  return { value: t.parse(e.toString()) };
}, async async(e, t) {
  return { value: await t.parse(e.toString()) };
}, stream(e, t) {
  return { value: t.parse(e.toString()) };
} }, serialize(e, t) {
  return "new URLSearchParams(" + t.serialize(e.value) + ")";
}, deserialize(e, t) {
  return new URLSearchParams(t.deserialize(e.value));
} }, Jo = Wo;
const De$1 = [xo, _o, zo, Oo, Lo, Ue$1, je$1, qo, Mo, Jo, Vo], gr = Et.RegExp;
function yr(e) {
  const t = new TextEncoder().encode(e), r = t.length, n = r.toString(16), a = "00000000".substring(0, 8 - n.length) + n, i = new TextEncoder().encode(`;0x${a};`), o = new Uint8Array(12 + r);
  return o.set(i), o.set(t, 12), o;
}
function lt(e, t) {
  return new ReadableStream({ start(r) {
    mo(t, { scopeId: e, plugins: De$1, onSerialize(n, a) {
      r.enqueue(yr(a ? `(${Yn$1(e)},${n})` : n));
    }, onDone() {
      r.close();
    }, onError(n) {
      r.error(n);
    } });
  } });
}
function Xo(e) {
  return new ReadableStream({ start(t) {
    wo(e, { disabledFeatures: gr, plugins: De$1, onParse(r) {
      t.enqueue(yr(JSON.stringify(r)));
    }, onDone() {
      t.close();
    }, onError(r) {
      t.error(r);
    } });
  } });
}
async function ft(e) {
  return vo(JSON.parse(e), { plugins: De$1, disabledFeatures: gr });
}
async function Go(e) {
  const t = bn$1(e), r = t.request, n = r.headers.get("X-Server-Id"), a = r.headers.get("X-Server-Instance"), i = r.headers.has("X-Single-Flight"), o = new URL(r.url);
  let u, c;
  if (n) hn$1(typeof n == "string", "Invalid server function"), [u, c] = decodeURIComponent(n).split("#");
  else if (u = o.searchParams.get("id"), c = o.searchParams.get("name"), !u || !c) return new Response(null, { status: 404 });
  const l = Ln$1[u];
  let p;
  if (!l) return new Response(null, { status: 404 });
  p = await l.importer();
  const d = p[l.functionName];
  let w = [];
  if (!a || e.method === "GET") {
    const f = o.searchParams.get("args");
    if (f) {
      const R = await ft(f);
      for (const te of R) w.push(te);
    }
  }
  if (e.method === "POST") {
    const f = r.headers.get("content-type"), R = e.node.req, te = R instanceof ReadableStream, br = R.body instanceof ReadableStream, mr = te && R.locked || br && R.body.locked, wr = te ? R : R.body, pe = mr ? r : new Request(r, { ...r, body: wr });
    r.headers.get("x-serialized") ? w = await ft(await pe.text()) : (f == null ? void 0 : f.startsWith("multipart/form-data")) || (f == null ? void 0 : f.startsWith("application/x-www-form-urlencoded")) ? w.push(await pe.formData()) : (f == null ? void 0 : f.startsWith("application/json")) && (w = await pe.json());
  }
  try {
    let f = await provideRequestEvent(t, async () => (sharedConfig.context = { event: t }, t.locals.serverFunctionMeta = { id: u + "#" + c }, d(...w)));
    if (i && a && (f = await dt(t, f)), f instanceof Response) {
      if (f.headers && f.headers.has("X-Content-Raw")) return f;
      a && (f.headers && We$1(e, f.headers), f.status && (f.status < 300 || f.status >= 400) && ie$1(e, f.status), f.customBody ? f = await f.customBody() : f.body == null && (f = null));
    }
    if (!a) return pt(f, r, w);
    return D$1(e, "x-serialized", "true"), D$1(e, "content-type", "text/javascript"), lt(a, f);
    return Xo(f);
  } catch (f) {
    if (f instanceof Response) i && a && (f = await dt(t, f)), f.headers && We$1(e, f.headers), f.status && (!a || f.status < 300 || f.status >= 400) && ie$1(e, f.status), f.customBody ? f = f.customBody() : f.body == null && (f = null), D$1(e, "X-Error", "true");
    else if (a) {
      const R = f instanceof Error ? f.message : typeof f == "string" ? f : "true";
      D$1(e, "X-Error", R.replace(/[\r\n]+/g, ""));
    } else f = pt(f, r, w, true);
    return a ? (D$1(e, "x-serialized", "true"), D$1(e, "content-type", "text/javascript"), lt(a, f)) : f;
  }
}
function pt(e, t, r, n) {
  const a = new URL(t.url), i = e instanceof Error;
  let o = 302, u;
  return e instanceof Response ? (u = new Headers(e.headers), e.headers.has("Location") && (u.set("Location", new URL(e.headers.get("Location"), a.origin + "").toString()), o = Tn$1(e))) : u = new Headers({ Location: new URL(t.headers.get("referer")).toString() }), e && u.append("Set-Cookie", `flash=${encodeURIComponent(JSON.stringify({ url: a.pathname + a.search, result: i ? e.message : e, thrown: n, error: i, input: [...r.slice(0, -1), [...r[r.length - 1].entries()]] }))}; Secure; HttpOnly;`), new Response(null, { status: o, headers: u });
}
let ve$1;
function Yo(e) {
  var _a2;
  const t = new Headers(e.request.headers), r = sn$1(e.nativeEvent), n = e.response.headers.getSetCookie();
  t.delete("cookie");
  let a = false;
  return ((_a2 = e.nativeEvent.node) == null ? void 0 : _a2.req) && (a = true, e.nativeEvent.node.req.headers.cookie = ""), n.forEach((i) => {
    if (!i) return;
    const { maxAge: o, expires: u, name: c, value: l } = Vr(i);
    if (o != null && o <= 0) {
      delete r[c];
      return;
    }
    if (u != null && u.getTime() <= Date.now()) {
      delete r[c];
      return;
    }
    r[c] = l;
  }), Object.entries(r).forEach(([i, o]) => {
    t.append("cookie", `${i}=${o}`), a && (e.nativeEvent.node.req.headers.cookie += `${i}=${o};`);
  }), t;
}
async function dt(e, t) {
  let r, n = new URL(e.request.headers.get("referer")).toString();
  t instanceof Response && (t.headers.has("X-Revalidate") && (r = t.headers.get("X-Revalidate").split(",")), t.headers.has("Location") && (n = new URL(t.headers.get("Location"), new URL(e.request.url).origin + "").toString()));
  const a = yn$1(e);
  return a.request = new Request(n, { headers: Yo(e) }), await provideRequestEvent(a, async () => {
    await In$1(a), ve$1 || (ve$1 = (await import('../build/app-DsohqlJW.mjs')).default), a.router.dataOnly = r || true, a.router.previousUrl = e.request.headers.get("referer");
    try {
      renderToString(() => {
        sharedConfig.context.event = a, ve$1();
      });
    } catch (u) {
      console.log(u);
    }
    const i = a.router.data;
    if (!i) return t;
    let o = false;
    for (const u in i) i[u] === void 0 ? delete i[u] : o = true;
    return o && (t instanceof Response ? t.customBody && (i._$value = t.customBody()) : (i._$value = t, t = new Response(null, { status: 200 })), t.customBody = () => i, t.headers.set("X-Single-Flight", "true")), t;
  });
}
const cu = eventHandler(Go);

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
function kt(e = {}) {
  let t, n = false;
  const s = (a) => {
    if (t && t !== a) throw new Error("Context conflict");
  };
  let r;
  if (e.asyncContext) {
    const a = e.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    a ? r = new a() : console.warn("[unctx] `AsyncLocalStorage` is not provided.");
  }
  const o = () => {
    if (r) {
      const a = r.getStore();
      if (a !== void 0) return a;
    }
    return t;
  };
  return { use: () => {
    const a = o();
    if (a === void 0) throw new Error("Context is not available");
    return a;
  }, tryUse: () => o(), set: (a, i) => {
    i || s(a), t = a, n = true;
  }, unset: () => {
    t = void 0, n = false;
  }, call: (a, i) => {
    s(a), t = a;
    try {
      return r ? r.run(a, i) : i();
    } finally {
      n || (t = void 0);
    }
  }, async callAsync(a, i) {
    t = a;
    const l = () => {
      t = a;
    }, c = () => t === a ? l : void 0;
    pe.add(c);
    try {
      const u = r ? r.run(a, i) : i();
      return n || (t = void 0), await u;
    } finally {
      pe.delete(c);
    }
  } };
}
function qt(e = {}) {
  const t = {};
  return { get(n, s = {}) {
    return t[n] || (t[n] = kt({ ...e, ...s })), t[n];
  } };
}
const Y = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof global < "u" ? global : {}, he = "__unctx__", Ot = Y[he] || (Y[he] = qt()), It = (e, t = {}) => Ot.get(e, t), fe = "__unctx_async_handlers__", pe = Y[fe] || (Y[fe] = /* @__PURE__ */ new Set());
function Ft(e) {
  let t;
  const n = _e(e), s = { duplex: "half", method: e.method, headers: e.headers };
  return e.node.req.body instanceof ArrayBuffer ? new Request(n, { ...s, body: e.node.req.body }) : new Request(n, { ...s, get body() {
    return t || (t = Vt(e), t);
  } });
}
function Dt(e) {
  var _a;
  return (_a = e.web) != null ? _a : e.web = { request: Ft(e), url: _e(e) }, e.web.request;
}
function Mt() {
  return Zt();
}
const Te = /* @__PURE__ */ Symbol("$HTTPEvent");
function Ut(e) {
  return typeof e == "object" && (e instanceof H3Event || (e == null ? void 0 : e[Te]) instanceof H3Event || (e == null ? void 0 : e.__is_event__) === true);
}
function S(e) {
  return function(...t) {
    var _a;
    let n = t[0];
    if (Ut(n)) t[0] = n instanceof H3Event || n.__is_event__ ? n : n[Te];
    else {
      if (!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext)) throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");
      if (n = Mt(), !n) throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");
      t.unshift(n);
    }
    return e(...t);
  };
}
const _e = S(getRequestURL), Wt = S(getRequestIP), ee = S(setResponseStatus), me = S(getResponseStatus), jt = S(getResponseStatusText), J = S(getResponseHeaders), ge = S(getResponseHeader), Bt = S(setResponseHeader), Kt = S(appendResponseHeader), ye = S(sendRedirect), zt = S(getCookie), Gt = S(setCookie), Jt = S(setHeader), Vt = S(getRequestWebStream), Yt = S(removeResponseHeader), Xt = S(Dt);
function Qt() {
  var _a;
  return It("nitro-app", { asyncContext: !!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext), AsyncLocalStorage: AsyncLocalStorage });
}
function Zt() {
  return Qt().use().event;
}
const D = { NORMAL: 0, WILDCARD: 1, PLACEHOLDER: 2 };
function en(e = {}) {
  const t = { options: e, rootNode: Ne(), staticRoutesMap: {} }, n = (s) => e.strictTrailingSlash ? s : s.replace(/\/$/, "") || "/";
  if (e.routes) for (const s in e.routes) we(t, n(s), e.routes[s]);
  return { ctx: t, lookup: (s) => tn(t, n(s)), insert: (s, r) => we(t, n(s), r), remove: (s) => nn(t, n(s)) };
}
function tn(e, t) {
  const n = e.staticRoutesMap[t];
  if (n) return n.data;
  const s = t.split("/"), r = {};
  let o = false, a = null, i = e.rootNode, l = null;
  for (let c = 0; c < s.length; c++) {
    const u = s[c];
    i.wildcardChildNode !== null && (a = i.wildcardChildNode, l = s.slice(c).join("/"));
    const y = i.children.get(u);
    if (y === void 0) {
      if (i && i.placeholderChildren.length > 1) {
        const m = s.length - c;
        i = i.placeholderChildren.find((h) => h.maxDepth === m) || null;
      } else i = i.placeholderChildren[0] || null;
      if (!i) break;
      i.paramName && (r[i.paramName] = u), o = true;
    } else i = y;
  }
  return (i === null || i.data === null) && a !== null && (i = a, r[i.paramName || "_"] = l, o = true), i ? o ? { ...i.data, params: o ? r : void 0 } : i.data : null;
}
function we(e, t, n) {
  let s = true;
  const r = t.split("/");
  let o = e.rootNode, a = 0;
  const i = [o];
  for (const l of r) {
    let c;
    if (c = o.children.get(l)) o = c;
    else {
      const u = rn(l);
      c = Ne({ type: u, parent: o }), o.children.set(l, c), u === D.PLACEHOLDER ? (c.paramName = l === "*" ? `_${a++}` : l.slice(1), o.placeholderChildren.push(c), s = false) : u === D.WILDCARD && (o.wildcardChildNode = c, c.paramName = l.slice(3) || "_", s = false), i.push(c), o = c;
    }
  }
  for (const [l, c] of i.entries()) c.maxDepth = Math.max(i.length - l, c.maxDepth || 0);
  return o.data = n, s === true && (e.staticRoutesMap[t] = o), o;
}
function nn(e, t) {
  let n = false;
  const s = t.split("/");
  let r = e.rootNode;
  for (const o of s) if (r = r.children.get(o), !r) return n;
  if (r.data) {
    const o = s.at(-1) || "";
    r.data = null, Object.keys(r.children).length === 0 && r.parent && (r.parent.children.delete(o), r.parent.wildcardChildNode = null, r.parent.placeholderChildren = []), n = true;
  }
  return n;
}
function Ne(e = {}) {
  return { type: e.type || D.NORMAL, maxDepth: 0, parent: e.parent || null, children: /* @__PURE__ */ new Map(), data: e.data || null, paramName: e.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function rn(e) {
  return e.startsWith("**") ? D.WILDCARD : e[0] === ":" || e === "*" ? D.PLACEHOLDER : D.NORMAL;
}
const He = [{ page: true, $component: { src: "src/routes/index.tsx?pick=default&pick=$css", build: () => import('../build/index2.mjs'), import: () => import('../build/index2.mjs') }, path: "/", filePath: "/Users/matze/code/monorepo/apps/under-construction/src/routes/index.tsx" }], sn = on(He.filter((e) => e.page));
function on(e) {
  function t(n, s, r, o) {
    const a = Object.values(n).find((i) => r.startsWith(i.id + "/"));
    return a ? (t(a.children || (a.children = []), s, r.slice(a.id.length)), n) : (n.push({ ...s, id: r, path: r.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/") }), n);
  }
  return e.sort((n, s) => n.path.length - s.path.length).reduce((n, s) => t(n, s, s.path, s.path), []);
}
function an(e, t) {
  const n = ln.lookup(e);
  if (n && n.route) {
    const s = n.route, r = t === "HEAD" ? s.$HEAD || s.$GET : s[`$${t}`];
    if (r === void 0) return;
    const o = s.page === true && s.$component !== void 0;
    return { handler: r, params: n.params, isPage: o };
  }
}
function cn(e) {
  return e.$HEAD || e.$GET || e.$POST || e.$PUT || e.$PATCH || e.$DELETE;
}
const ln = en({ routes: He.reduce((e, t) => {
  if (!cn(t)) return e;
  let n = t.path.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/").replace(/\*([^/]*)/g, (s, r) => `**:${r}`).split("/").map((s) => s.startsWith(":") || s.startsWith("*") ? s : encodeURIComponent(s)).join("/");
  if (/:[^/]*\?/g.test(n)) throw new Error(`Optional parameters are not supported in API routes: ${n}`);
  if (e[n]) throw new Error(`Duplicate API routes for "${n}" found at "${e[n].route.path}" and "${t.path}"`);
  return e[n] = { route: t }, e;
}, {}) }), X = "solidFetchEvent";
function un(e) {
  return { request: Xt(e), response: fn(e), clientAddress: Wt(e), locals: {}, nativeEvent: e };
}
function dn(e) {
  if (!e.context[X]) {
    const t = un(e);
    e.context[X] = t;
  }
  return e.context[X];
}
class hn {
  constructor(t) {
    __publicField(this, "event");
    this.event = t;
  }
  get(t) {
    const n = ge(this.event, t);
    return Array.isArray(n) ? n.join(", ") : n || null;
  }
  has(t) {
    return this.get(t) !== null;
  }
  set(t, n) {
    return Bt(this.event, t, n);
  }
  delete(t) {
    return Yt(this.event, t);
  }
  append(t, n) {
    Kt(this.event, t, n);
  }
  getSetCookie() {
    const t = ge(this.event, "Set-Cookie");
    return Array.isArray(t) ? t : [t];
  }
  forEach(t) {
    return Object.entries(J(this.event)).forEach(([n, s]) => t(Array.isArray(s) ? s.join(", ") : s, n, this));
  }
  entries() {
    return Object.entries(J(this.event)).map(([t, n]) => [t, Array.isArray(n) ? n.join(", ") : n])[Symbol.iterator]();
  }
  keys() {
    return Object.keys(J(this.event))[Symbol.iterator]();
  }
  values() {
    return Object.values(J(this.event)).map((t) => Array.isArray(t) ? t.join(", ") : t)[Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.entries()[Symbol.iterator]();
  }
}
function fn(e) {
  return { get status() {
    return me(e);
  }, set status(t) {
    ee(e, t);
  }, get statusText() {
    return jt(e);
  }, set statusText(t) {
    ee(e, me(e), t);
  }, headers: new hn(e) };
}
var mn = " ";
const gn = { style: (e) => ssrElement("style", e.attrs, () => e.children, true), link: (e) => ssrElement("link", e.attrs, void 0, true), script: (e) => e.attrs.src ? ssrElement("script", mergeProps(() => e.attrs, { get id() {
  return e.key;
} }), () => ssr(mn), true) : null, noscript: (e) => ssrElement("noscript", e.attrs, () => escape(e.children), true) };
function te(e, t) {
  let { tag: n, attrs: { key: s, ...r } = { key: void 0 }, children: o } = e;
  return gn[n]({ attrs: { ...r, nonce: t }, key: s, children: o });
}
function yn(e, t, n, s = "default") {
  return lazy(async () => {
    var _a;
    {
      const o = (await e.import())[s], i = (await ((_a = t.inputs) == null ? void 0 : _a[e.src].assets())).filter((c) => c.tag === "style" || c.attrs.rel === "stylesheet");
      return { default: (c) => [...i.map((u) => te(u)), createComponent(o, c)] };
    }
  });
}
function ke() {
  function e(n) {
    return { ...n, ...n.$$route ? n.$$route.require().route : void 0, info: { ...n.$$route ? n.$$route.require().route.info : {}, filesystem: true }, component: n.$component && yn(n.$component, globalThis.MANIFEST.client, globalThis.MANIFEST.ssr), children: n.children ? n.children.map(e) : void 0 };
  }
  return sn.map(e);
}
let ve;
const wn = isServer ? () => getRequestEvent().routes : () => ve || (ve = ke());
function vn(e) {
  const t = zt(e.nativeEvent, "flash");
  if (t) try {
    let n = JSON.parse(t);
    if (!n || !n.result) return;
    const s = [...n.input.slice(0, -1), new Map(n.input[n.input.length - 1])], r = n.error ? new Error(n.result) : n.result;
    return { input: s, url: n.url, pending: false, result: n.thrown ? void 0 : r, error: n.thrown ? r : void 0 };
  } catch (n) {
    console.error(n);
  } finally {
    Gt(e.nativeEvent, "flash", "", { maxAge: 0 });
  }
}
async function Rn(e) {
  const t = globalThis.MANIFEST.client;
  return globalThis.MANIFEST.ssr, e.response.headers.set("Content-Type", "text/html"), Object.assign(e, { manifest: await t.json(), assets: [...await t.inputs[t.handler].assets()], router: { submission: vn(e) }, routes: ke(), complete: false, $islands: /* @__PURE__ */ new Set() });
}
const bn = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function ne(e) {
  return e.status && bn.has(e.status) ? e.status : 302;
}
function Sn(e, t, n = {}, s) {
  return eventHandler({ handler: (r) => {
    const o = dn(r);
    return provideRequestEvent(o, async () => {
      const a = an(new URL(o.request.url).pathname, o.request.method);
      if (a) {
        const h = await a.handler.import(), g = o.request.method === "HEAD" ? h.HEAD || h.GET : h[o.request.method];
        o.params = a.params || {}, sharedConfig.context = { event: o };
        const d = await g(o);
        if (d !== void 0) return d;
        if (o.request.method !== "GET") throw new Error(`API handler for ${o.request.method} "${o.request.url}" did not return a response.`);
        if (!a.isPage) return;
      }
      const i = await t(o), l = typeof n == "function" ? await n(i) : { ...n }, c = l.mode || "stream";
      if (l.nonce && (i.nonce = l.nonce), c === "sync") {
        const h = renderToString(() => (sharedConfig.context.event = i, e(i)), l);
        if (i.complete = true, i.response && i.response.headers.get("Location")) {
          const g = ne(i.response);
          return ye(r, i.response.headers.get("Location"), g);
        }
        return h;
      }
      if (l.onCompleteAll) {
        const h = l.onCompleteAll;
        l.onCompleteAll = (g) => {
          be(i)(g), h(g);
        };
      } else l.onCompleteAll = be(i);
      if (l.onCompleteShell) {
        const h = l.onCompleteShell;
        l.onCompleteShell = (g) => {
          Re(i, r)(), h(g);
        };
      } else l.onCompleteShell = Re(i, r);
      const u = renderToStream(() => (sharedConfig.context.event = i, e(i)), l);
      if (i.response && i.response.headers.get("Location")) {
        const h = ne(i.response);
        return ye(r, i.response.headers.get("Location"), h);
      }
      if (c === "async") return u;
      const { writable: y, readable: m } = new TransformStream();
      return u.pipeTo(y), m;
    });
  } });
}
function Re(e, t) {
  return () => {
    if (e.response && e.response.headers.get("Location")) {
      const n = ne(e.response);
      ee(t, n), Jt(t, "Location", e.response.headers.get("Location"));
    }
  };
}
function be(e) {
  return ({ write: t }) => {
    e.complete = true;
    const n = e.response && e.response.headers.get("Location");
    n && t(`<script>window.location="${n}"<\/script>`);
  };
}
function En(e, t, n) {
  return Sn(e, Rn, t);
}
function qe() {
  let e = /* @__PURE__ */ new Set();
  function t(r) {
    return e.add(r), () => e.delete(r);
  }
  let n = false;
  function s(r, o) {
    if (n) return !(n = false);
    const a = { to: r, options: o, defaultPrevented: false, preventDefault: () => a.defaultPrevented = true };
    for (const i of e) i.listener({ ...a, from: i.location, retry: (l) => {
      l && (n = true), i.navigate(r, { ...o, resolve: false });
    } });
    return !a.defaultPrevented;
  }
  return { subscribe: t, confirm: s };
}
let re;
function ie() {
  (!window.history.state || window.history.state._depth == null) && window.history.replaceState({ ...window.history.state, _depth: window.history.length - 1 }, ""), re = window.history.state._depth;
}
isServer || ie();
function An(e) {
  return { ...e, _depth: window.history.state && window.history.state._depth };
}
function Cn(e, t) {
  let n = false;
  return () => {
    const s = re;
    ie();
    const r = s == null ? null : re - s;
    if (n) {
      n = false;
      return;
    }
    r && t(r) ? (n = true, window.history.go(-r)) : e();
  };
}
const $n = /^(?:[a-z0-9]+:)?\/\//i, xn = /^\/+|(\/)\/+$/g, Oe = "http://sr";
function W(e, t = false) {
  const n = e.replace(xn, "$1");
  return n ? t || /^[?#]/.test(n) ? n : "/" + n : "";
}
function V(e, t, n) {
  if ($n.test(t)) return;
  const s = W(e), r = n && W(n);
  let o = "";
  return !r || t.startsWith("/") ? o = s : r.toLowerCase().indexOf(s.toLowerCase()) !== 0 ? o = s + r : o = r, (o || "/") + W(t, !o);
}
function Pn(e, t) {
  return W(e).replace(/\/*(\*.*)?$/g, "") + W(t);
}
function Ie(e) {
  const t = {};
  return e.searchParams.forEach((n, s) => {
    s in t ? Array.isArray(t[s]) ? t[s].push(n) : t[s] = [t[s], n] : t[s] = n;
  }), t;
}
function Ln(e, t, n) {
  const [s, r] = e.split("/*", 2), o = s.split("/").filter(Boolean), a = o.length;
  return (i) => {
    const l = i.split("/").filter(Boolean), c = l.length - a;
    if (c < 0 || c > 0 && r === void 0 && !t) return null;
    const u = { path: a ? "" : "/", params: {} }, y = (m) => n === void 0 ? void 0 : n[m];
    for (let m = 0; m < a; m++) {
      const h = o[m], g = h[0] === ":", d = g ? l[m] : l[m].toLowerCase(), f = g ? h.slice(1) : h.toLowerCase();
      if (g && Q(d, y(f))) u.params[f] = d;
      else if (g || !Q(d, f)) return null;
      u.path += `/${d}`;
    }
    if (r) {
      const m = c ? l.slice(-c).join("/") : "";
      if (Q(m, y(r))) u.params[r] = m;
      else return null;
    }
    return u;
  };
}
function Q(e, t) {
  const n = (s) => s === e;
  return t === void 0 ? true : typeof t == "string" ? n(t) : typeof t == "function" ? t(e) : Array.isArray(t) ? t.some(n) : t instanceof RegExp ? t.test(e) : false;
}
function Tn(e) {
  const [t, n] = e.pattern.split("/*", 2), s = t.split("/").filter(Boolean);
  return s.reduce((r, o) => r + (o.startsWith(":") ? 2 : 3), s.length - (n === void 0 ? 0 : 1));
}
function Fe(e) {
  const t = /* @__PURE__ */ new Map(), n = getOwner();
  return new Proxy({}, { get(s, r) {
    return t.has(r) || runWithOwner(n, () => t.set(r, createMemo(() => e()[r]))), t.get(r)();
  }, getOwnPropertyDescriptor() {
    return { enumerable: true, configurable: true };
  }, ownKeys() {
    return Reflect.ownKeys(e());
  }, has(s, r) {
    return r in e();
  } });
}
function De(e) {
  let t = /(\/?\:[^\/]+)\?/.exec(e);
  if (!t) return [e];
  let n = e.slice(0, t.index), s = e.slice(t.index + t[0].length);
  const r = [n, n += t[1]];
  for (; t = /^(\/\:[^\/]+)\?/.exec(s); ) r.push(n += t[1]), s = s.slice(t[0].length);
  return De(s).reduce((o, a) => [...o, ...r.map((i) => i + a)], []);
}
const _n = 100, Nn = createContext(), Me = createContext();
function Hn(e, t = "") {
  const { component: n, preload: s, load: r, children: o, info: a } = e, i = !o || Array.isArray(o) && !o.length, l = { key: e, component: n, preload: s || r, info: a };
  return Ue(e.path).reduce((c, u) => {
    for (const y of De(u)) {
      const m = Pn(t, y);
      let h = i ? m : m.split("/*", 1)[0];
      h = h.split("/").map((g) => g.startsWith(":") || g.startsWith("*") ? g : encodeURIComponent(g)).join("/"), c.push({ ...l, originalPath: u, pattern: h, matcher: Ln(h, !i, e.matchFilters) });
    }
    return c;
  }, []);
}
function kn(e, t = 0) {
  return { routes: e, score: Tn(e[e.length - 1]) * 1e4 - t, matcher(n) {
    const s = [];
    for (let r = e.length - 1; r >= 0; r--) {
      const o = e[r], a = o.matcher(n);
      if (!a) return null;
      s.unshift({ ...a, route: o });
    }
    return s;
  } };
}
function Ue(e) {
  return Array.isArray(e) ? e : [e];
}
function We(e, t = "", n = [], s = []) {
  const r = Ue(e);
  for (let o = 0, a = r.length; o < a; o++) {
    const i = r[o];
    if (i && typeof i == "object") {
      i.hasOwnProperty("path") || (i.path = "");
      const l = Hn(i, t);
      for (const c of l) {
        n.push(c);
        const u = Array.isArray(i.children) && i.children.length === 0;
        if (i.children && !u) We(i.children, c.pattern, n, s);
        else {
          const y = kn([...n], s.length);
          s.push(y);
        }
        n.pop();
      }
    }
  }
  return n.length ? s : s.sort((o, a) => a.score - o.score);
}
function j(e, t) {
  for (let n = 0, s = e.length; n < s; n++) {
    const r = e[n].matcher(t);
    if (r) return r;
  }
  return [];
}
function qn(e, t, n) {
  const s = new URL(Oe), r = createMemo((u) => {
    const y = e();
    try {
      return new URL(y, s);
    } catch {
      return console.error(`Invalid path ${y}`), u;
    }
  }, s, { equals: (u, y) => u.href === y.href }), o = createMemo(() => r().pathname), a = createMemo(() => r().search, true), i = createMemo(() => r().hash), l = () => "", c = on$2(a, () => Ie(r()));
  return { get pathname() {
    return o();
  }, get search() {
    return a();
  }, get hash() {
    return i();
  }, get state() {
    return t();
  }, get key() {
    return l();
  }, query: n ? n(c) : Fe(c) };
}
let N;
function On() {
  return N;
}
function In(e, t, n, s = {}) {
  const { signal: [r, o], utils: a = {} } = e, i = a.parsePath || ((p) => p), l = a.renderPath || ((p) => p), c = a.beforeLeave || qe(), u = V("", s.base || "");
  if (u === void 0) throw new Error(`${u} is not a valid base path`);
  u && !r().value && o({ value: u, replace: true, scroll: false });
  const [y, m] = createSignal(false);
  let h;
  const g = (p, w) => {
    w.value === d() && w.state === b() || (h === void 0 && m(true), N = p, h = w, startTransition(() => {
      h === w && (f(h.value), v(h.state), resetErrorBoundaries(), isServer || _[1]((E) => E.filter((k) => k.pending)));
    }).finally(() => {
      h === w && batch(() => {
        N = void 0, p === "navigate" && Ve(h), m(false), h = void 0;
      });
    }));
  }, [d, f] = createSignal(r().value), [b, v] = createSignal(r().state), T = qn(d, b, a.queryWrapper), C = [], _ = createSignal(isServer ? Xe() : []), M = createMemo(() => typeof s.transformUrl == "function" ? j(t(), s.transformUrl(T.pathname)) : j(t(), T.pathname)), ce = () => {
    const p = M(), w = {};
    for (let E = 0; E < p.length; E++) Object.assign(w, p[E].params);
    return w;
  }, ze = a.paramsWrapper ? a.paramsWrapper(ce, t) : Fe(ce), le = { pattern: u, path: () => u, outlet: () => null, resolvePath(p) {
    return V(u, p);
  } };
  return createRenderEffect(on$2(r, (p) => g("native", p), { defer: true })), { base: le, location: T, params: ze, isRouting: y, renderPath: l, parsePath: i, navigatorFactory: Je, matches: M, beforeLeave: c, preloadRoute: Ye, singleFlight: s.singleFlight === void 0 ? true : s.singleFlight, submissions: _ };
  function Ge(p, w, E) {
    untrack(() => {
      if (typeof w == "number") {
        w && (a.go ? a.go(w) : console.warn("Router integration does not support relative routing"));
        return;
      }
      const k = !w || w[0] === "?", { replace: B, resolve: q, scroll: K, state: O } = { replace: false, resolve: !k, scroll: true, ...E }, I = q ? p.resolvePath(w) : V(k && T.pathname || "", w);
      if (I === void 0) throw new Error(`Path '${w}' is not a routable path`);
      if (C.length >= _n) throw new Error("Too many redirects");
      const ue = d();
      if (I !== ue || O !== b()) if (isServer) {
        const de = getRequestEvent();
        de && (de.response = { status: 302, headers: new Headers({ Location: I }) }), o({ value: I, replace: B, scroll: K, state: O });
      } else c.confirm(I, E) && (C.push({ value: ue, replace: B, scroll: K, state: b() }), g("navigate", { value: I, state: O }));
    });
  }
  function Je(p) {
    return p = p || useContext(Me) || le, (w, E) => Ge(p, w, E);
  }
  function Ve(p) {
    const w = C[0];
    w && (o({ ...p, replace: w.replace, scroll: w.scroll }), C.length = 0);
  }
  function Ye(p, w) {
    const E = j(t(), p.pathname), k = N;
    N = "preload";
    for (let B in E) {
      const { route: q, params: K } = E[B];
      q.component && q.component.preload && q.component.preload();
      const { preload: O } = q;
      w && O && runWithOwner(n(), () => O({ params: K, location: { pathname: p.pathname, search: p.search, hash: p.hash, query: Ie(p), state: null, key: "" }, intent: "preload" }));
    }
    N = k;
  }
  function Xe() {
    const p = getRequestEvent();
    return p && p.router && p.router.submission ? [p.router.submission] : [];
  }
}
function Fn(e, t, n, s) {
  const { base: r, location: o, params: a } = e, { pattern: i, component: l, preload: c } = s().route, u = createMemo(() => s().path);
  l && l.preload && l.preload();
  const y = c ? c({ params: a, location: o, intent: N || "initial" }) : void 0;
  return { parent: t, pattern: i, path: u, outlet: () => l ? createComponent(l, { params: a, location: o, data: y, get children() {
    return n();
  } }) : n(), resolvePath(h) {
    return V(r.path(), h, u());
  } };
}
const je = (e) => (t) => {
  const { base: n } = t, s = children(() => t.children), r = createMemo(() => We(s(), t.base || ""));
  let o;
  const a = In(e, r, () => o, { base: n, singleFlight: t.singleFlight, transformUrl: t.transformUrl });
  return e.create && e.create(a), createComponent$1(Nn.Provider, { value: a, get children() {
    return createComponent$1(Dn, { routerState: a, get root() {
      return t.root;
    }, get preload() {
      return t.rootPreload || t.rootLoad;
    }, get children() {
      return [(o = getOwner()) && null, createComponent$1(Mn, { routerState: a, get branches() {
        return r();
      } })];
    } });
  } });
};
function Dn(e) {
  const t = e.routerState.location, n = e.routerState.params, s = createMemo(() => e.preload && untrack(() => {
    e.preload({ params: n, location: t, intent: On() || "initial" });
  }));
  return createComponent$1(Show, { get when() {
    return e.root;
  }, keyed: true, get fallback() {
    return e.children;
  }, children: (r) => createComponent$1(r, { params: n, location: t, get data() {
    return s();
  }, get children() {
    return e.children;
  } }) });
}
function Mn(e) {
  if (isServer) {
    const r = getRequestEvent();
    if (r && r.router && r.router.dataOnly) {
      Un(r, e.routerState, e.branches);
      return;
    }
    r && ((r.router || (r.router = {})).matches || (r.router.matches = e.routerState.matches().map(({ route: o, path: a, params: i }) => ({ path: o.originalPath, pattern: o.pattern, match: a, params: i, info: o.info }))));
  }
  const t = [];
  let n;
  const s = createMemo(on$2(e.routerState.matches, (r, o, a) => {
    let i = o && r.length === o.length;
    const l = [];
    for (let c = 0, u = r.length; c < u; c++) {
      const y = o && o[c], m = r[c];
      a && y && m.route.key === y.route.key ? l[c] = a[c] : (i = false, t[c] && t[c](), createRoot((h) => {
        t[c] = h, l[c] = Fn(e.routerState, l[c - 1] || e.routerState.base, Se(() => s()[c + 1]), () => {
          var _a;
          const g = e.routerState.matches();
          return (_a = g[c]) != null ? _a : g[0];
        });
      }));
    }
    return t.splice(r.length).forEach((c) => c()), a && i ? a : (n = l[0], l);
  }));
  return Se(() => s() && n)();
}
const Se = (e) => () => createComponent$1(Show, { get when() {
  return e();
}, keyed: true, children: (t) => createComponent$1(Me.Provider, { value: t, get children() {
  return t.outlet();
} }) });
function Un(e, t, n) {
  const s = new URL(e.request.url), r = j(n, new URL(e.router.previousUrl || e.request.url).pathname), o = j(n, s.pathname);
  for (let a = 0; a < o.length; a++) {
    (!r[a] || o[a].route !== r[a].route) && (e.router.dataOnly = true);
    const { route: i, params: l } = o[a];
    i.preload && i.preload({ params: l, location: t.location, intent: "preload" });
  }
}
function Wn([e, t], n, s) {
  return [e, s ? (r) => t(s(r)) : t];
}
function jn(e) {
  let t = false;
  const n = (r) => typeof r == "string" ? { value: r } : r, s = Wn(createSignal(n(e.get()), { equals: (r, o) => r.value === o.value && r.state === o.state }), void 0, (r) => (!t && e.set(r), sharedConfig.registry && !sharedConfig.done && (sharedConfig.done = true), r));
  return e.init && onCleanup(e.init((r = e.get()) => {
    t = true, s[1](n(r)), t = false;
  })), je({ signal: s, create: e.create, utils: e.utils });
}
function Bn(e, t, n) {
  return e.addEventListener(t, n), () => e.removeEventListener(t, n);
}
function Kn(e, t) {
  const n = e && document.getElementById(e);
  n ? n.scrollIntoView() : t && window.scrollTo(0, 0);
}
function zn(e) {
  const t = new URL(e);
  return t.pathname + t.search;
}
function Gn(e) {
  let t;
  const n = { value: e.url || (t = getRequestEvent()) && zn(t.request.url) || "" };
  return je({ signal: [() => n, (s) => Object.assign(n, s)] })(e);
}
const Jn = /* @__PURE__ */ new Map();
function Vn(e = true, t = false, n = "/_server", s) {
  return (r) => {
    const o = r.base.path(), a = r.navigatorFactory(r.base);
    let i, l;
    function c(d) {
      return d.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function u(d) {
      if (d.defaultPrevented || d.button !== 0 || d.metaKey || d.altKey || d.ctrlKey || d.shiftKey) return;
      const f = d.composedPath().find((M) => M instanceof Node && M.nodeName.toUpperCase() === "A");
      if (!f || t && !f.hasAttribute("link")) return;
      const b = c(f), v = b ? f.href.baseVal : f.href;
      if ((b ? f.target.baseVal : f.target) || !v && !f.hasAttribute("state")) return;
      const C = (f.getAttribute("rel") || "").split(/\s+/);
      if (f.hasAttribute("download") || C && C.includes("external")) return;
      const _ = b ? new URL(v, document.baseURI) : new URL(v);
      if (!(_.origin !== window.location.origin || o && _.pathname && !_.pathname.toLowerCase().startsWith(o.toLowerCase()))) return [f, _];
    }
    function y(d) {
      const f = u(d);
      if (!f) return;
      const [b, v] = f, T = r.parsePath(v.pathname + v.search + v.hash), C = b.getAttribute("state");
      d.preventDefault(), a(T, { resolve: false, replace: b.hasAttribute("replace"), scroll: !b.hasAttribute("noscroll"), state: C ? JSON.parse(C) : void 0 });
    }
    function m(d) {
      const f = u(d);
      if (!f) return;
      const [b, v] = f;
      s && (v.pathname = s(v.pathname)), r.preloadRoute(v, b.getAttribute("preload") !== "false");
    }
    function h(d) {
      clearTimeout(i);
      const f = u(d);
      if (!f) return l = null;
      const [b, v] = f;
      l !== b && (s && (v.pathname = s(v.pathname)), i = setTimeout(() => {
        r.preloadRoute(v, b.getAttribute("preload") !== "false"), l = b;
      }, 20));
    }
    function g(d) {
      if (d.defaultPrevented) return;
      let f = d.submitter && d.submitter.hasAttribute("formaction") ? d.submitter.getAttribute("formaction") : d.target.getAttribute("action");
      if (!f) return;
      if (!f.startsWith("https://action/")) {
        const v = new URL(f, Oe);
        if (f = r.parsePath(v.pathname + v.search), !f.startsWith(n)) return;
      }
      if (d.target.method.toUpperCase() !== "POST") throw new Error("Only POST forms are supported for Actions");
      const b = Jn.get(f);
      if (b) {
        d.preventDefault();
        const v = new FormData(d.target, d.submitter);
        b.call({ r, f: d.target }, d.target.enctype === "multipart/form-data" ? v : new URLSearchParams(v));
      }
    }
    delegateEvents(["click", "submit"]), document.addEventListener("click", y), e && (document.addEventListener("mousemove", h, { passive: true }), document.addEventListener("focusin", m, { passive: true }), document.addEventListener("touchstart", m, { passive: true })), document.addEventListener("submit", g), onCleanup(() => {
      document.removeEventListener("click", y), e && (document.removeEventListener("mousemove", h), document.removeEventListener("focusin", m), document.removeEventListener("touchstart", m)), document.removeEventListener("submit", g);
    });
  };
}
function Yn(e) {
  if (isServer) return Gn(e);
  const t = () => {
    const s = window.location.pathname.replace(/^\/+/, "/") + window.location.search, r = window.history.state && window.history.state._depth && Object.keys(window.history.state).length === 1 ? void 0 : window.history.state;
    return { value: s + window.location.hash, state: r };
  }, n = qe();
  return jn({ get: t, set({ value: s, replace: r, scroll: o, state: a }) {
    r ? window.history.replaceState(An(a), "", s) : window.history.pushState(a, "", s), Kn(decodeURIComponent(window.location.hash.slice(1)), o), ie();
  }, init: (s) => Bn(window, "popstate", Cn(s, (r) => {
    if (r) return !n.confirm(r);
    {
      const o = t();
      return !n.confirm(o.value, { state: o.state });
    }
  })), create: Vn(e.preload, e.explicitLinks, e.actionBase, e.transformUrl), utils: { go: (s) => window.history.go(s), beforeLeave: n } })(e);
}
var Xn = '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Mosquito Social - Under Construction</title></head>', Qn = ["<html", ' lang="en" class="dark">', '<body class="bg-background text-foreground antialiased min-h-screen">', "</body></html>"];
function Zn() {
  return ssr(Qn, ssrHydrationKey(), createComponent$1(NoHydration, { get children() {
    return ssr(Xn);
  } }), escape(createComponent$1(Yn, { root: (e) => createComponent$1(Suspense, { get children() {
    return e.children;
  } }), get children() {
    return createComponent$1(wn, {});
  } })));
}
const Be = isServer ? (e) => {
  const t = getRequestEvent();
  return t.response.status = e.code, t.response.statusText = e.text, onCleanup(() => !t.nativeEvent.handled && !t.complete && (t.response.status = 200)), null;
} : (e) => null;
var er = ["<span", ' style="font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;">', "</span>"], tr = ["<span", ' style="font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;">500 | Internal Server Error</span>'];
const nr = (e) => {
  const t = isServer ? "500 | Internal Server Error" : "Error | Uncaught Client Exception";
  return createComponent$1(ErrorBoundary, { fallback: (n) => (console.error(n), [ssr(er, ssrHydrationKey(), escape(t)), createComponent$1(Be, { code: 500 })]), get children() {
    return e.children;
  } });
}, rr = (e) => {
  let t = false;
  const n = catchError(() => e.children, (s) => {
    console.error(s), t = !!s;
  });
  return t ? [ssr(tr, ssrHydrationKey()), createComponent$1(Be, { code: 500 })] : n;
};
var Ee = ["<script", ">", "<\/script>"], sr = ["<script", ' type="module"', " async", "><\/script>"], or = ["<script", ' type="module" async', "><\/script>"];
const ar = ssr("<!DOCTYPE html>");
function Ke(e, t, n = []) {
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    if (r.path !== e[0].path) continue;
    let o = [...n, r];
    if (r.children) {
      const a = e.slice(1);
      if (a.length === 0 || (o = Ke(a, r.children, o), !o)) continue;
    }
    return o;
  }
}
function ir(e) {
  const t = getRequestEvent(), n = t.nonce;
  let s = [];
  return Promise.resolve().then(async () => {
    let r = [];
    if (t.router && t.router.matches) {
      const o = [...t.router.matches];
      for (; o.length && (!o[0].info || !o[0].info.filesystem); ) o.shift();
      const a = o.length && Ke(o, t.routes);
      if (a) {
        const i = globalThis.MANIFEST.client.inputs;
        for (let l = 0; l < a.length; l++) {
          const c = a[l], u = i[c.$component.src];
          r.push(u.assets());
        }
      }
    }
    s = await Promise.all(r).then((o) => [...new Map(o.flat().map((a) => [a.attrs.key, a])).values()].filter((a) => a.attrs.rel === "modulepreload" && !t.assets.find((i) => i.attrs.key === a.attrs.key)));
  }), useAssets(() => s.length ? s.map((r) => te(r)) : void 0), createComponent$1(NoHydration, { get children() {
    return [ar, createComponent$1(rr, { get children() {
      return createComponent$1(e.document, { get assets() {
        return [createComponent$1(HydrationScript, {}), t.assets.map((r) => te(r, n))];
      }, get scripts() {
        return n ? [ssr(Ee, ssrHydrationKey() + ssrAttribute("nonce", escape(n, true), false), `window.manifest = ${JSON.stringify(t.manifest)}`), ssr(sr, ssrHydrationKey(), ssrAttribute("nonce", escape(n, true), false), ssrAttribute("src", escape(globalThis.MANIFEST.client.inputs[globalThis.MANIFEST.client.handler].output.path, true), false))] : [ssr(Ee, ssrHydrationKey(), `window.manifest = ${JSON.stringify(t.manifest)}`), ssr(or, ssrHydrationKey(), ssrAttribute("src", escape(globalThis.MANIFEST.client.inputs[globalThis.MANIFEST.client.handler].output.path, true), false))];
      }, get children() {
        return createComponent$1(Hydration, { get children() {
          return createComponent$1(nr, { get children() {
            return createComponent$1(Zn, {});
          } });
        } });
      } });
    } })];
  } });
}
var cr = ['<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">', "</head>"], lr = ["<html", ' lang="en" class="dark">', '<body class="bg-background text-foreground antialiased min-h-screen"><div id="app">', "</div></body></html>"];
const mr = En(() => createComponent$1(ir, { document: ({ assets: e, children: t }) => ssr(lr, ssrHydrationKey(), createComponent$1(NoHydration, { get children() {
  return ssr(cr, escape(e));
} }), escape(t)) }));

const handlers = [
  { route: '', handler: _sHudyE, lazy: false, middleware: true, method: undefined },
  { route: '/_server', handler: cu, lazy: false, middleware: true, method: undefined },
  { route: '/', handler: mr, lazy: false, middleware: true, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  {
    const _handler = h3App.handler;
    h3App.handler = (event) => {
      const ctx = { event };
      return nitroAsyncContext.callAsync(ctx, () => _handler(event));
    };
  }
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const nitroApp = useNitroApp();
const localFetch = nitroApp.localFetch;
const closePrerenderer = () => nitroApp.hooks.callHook("close");
trapUnhandledNodeErrors();

export { closePrerenderer as c, localFetch as l, ru as r };
//# sourceMappingURL=nitro.mjs.map
