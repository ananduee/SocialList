const logger = require("pino");
const cls = require("cls-hooked");
const uuidv4 = require("uuid/v4");
var onFinished = require("on-finished");
const errors = require("./errors");

var log = null;
// https://itnext.io/request-id-tracing-in-node-js-applications-c517c7dab62d
var ns = null;

export const errorCodes = {
  AlreadyInitialized: "AlreadyInitialized",
  NotInitialized: "NotInitialized"
};

export function requestId() {
  return ns.get("requestId");
}

export function initializeLogger() {
  if (log != null) {
    throw errors.newError(
      errorCodes.AlreadyInitialized,
      "Logger is already initialized."
    );
  }
  log = logger();
  ns = cls.createNamespace(`log:${uuidv4()}`);
}

export function expressMiddleware() {
  if (ns == null) {
    throw errors.newError(
      errorCodes.NotInitialized,
      "Looger needs to be initialized before attaching middleware."
    );
  }
  return (req, res, next) => {
    ns.bindEmitter(req);
    ns.bindEmitter(res);

    ns.run(() => {
      ns.set("requestId", uuidv4());
      info({
        msg: "Recieved request.",
        id: req.ip,
        method: req.method,
        url: req.originalUrl,
        protocol: req.protocol
      });
      onFinished(res, () => {
        info("Finished request.");
      });
      next();
    });
  };
}

export function info(msg) {
  if (typeof msg === "string") {
    msg = { msg: msg, requestId: requestId() };
  } else if (!msg.requestId) {
    msg.requestId = requestId();
  }
  log.info(msg);
}
