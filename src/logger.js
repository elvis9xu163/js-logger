'use strict';

const LEVEL_LOG = 0;
const LEVEL_ERROR = 1;
const LEVEL_WARN = 2;
const LEVEL_INFO = 3;
const LEVEL_DEBUG = 4;
const LEVEL_TRACE = 5;

let logLevel = LEVEL_INFO;
let logStack = false;

function _getTime() {
  const now = new Date();
  return now.getFullYear() + "-" + _format(now.getMonth() + 1) + "-" + _format(now.getDate())
    + " " + _format(now.getHours() + 1) + ":" + _format(now.getMinutes()) + ":" + _format(now.getSeconds())
    + "." + _formatMilli(now.getMilliseconds());
}

function _format(num) {
  return num < 10 ? '0' + num : '' + num;
}

function _formatMilli(num) {
  return num < 10 ? '00' + num : (num < 100 ? '0' + num : num);
}

function _getStack() {
  const stack = new Error().stack;
  let line = stack.split('\n')[4];

  if (line.indexOf('(') > -1) {
    let point = line.substring(line.indexOf('(' + 1));
    const idx = point.lastIndexOf('/');
    if (idx > -1) {
      point = point.substring(idx + 1);
    }
    point = point.substring(0, point.length - 1);

    let caller = line.substring(line.indexOf('at') + 3, line.indexOf('(') - 1);

    return "at " + caller + "(" + point + ")";
  } else {
    return "at (" + line.substring(line.lastIndexOf('/') + 1) + ")";
  }
}

function _print(level, name, ...args) {
  if (level > logLevel) return;

  const head = [_getTime(), ':', ...args];

  if (logStack) {
    head.splice(1, 0, _getStack());
  }

  if (name) {
    head.splice(1, 0, name);
  }

  switch (level) {
    case LEVEL_LOG:
      head.splice(1, 0, 'LOG  ');
      console.log(...head);
      break;
    case LEVEL_ERROR:
      head.splice(1, 0, 'ERROR');
      console.error(...head);
      break;
    case LEVEL_WARN:
      head.splice(1, 0, 'WARN ');
      console.warn(...head);
      break;
    case LEVEL_INFO:
      head.splice(1, 0, 'INFO ');
      console.info(...head);
      break;
    case LEVEL_DEBUG:
      head.splice(1, 0, 'DEBUG');
      console.log(...head);
      break;
    case LEVEL_TRACE:
      head.splice(1, 0, 'TRACE');
      console.log(...head);
      break;
  }
}

function log(...args) {
  _print(LEVEL_LOG, '', ...args);
}

function error(...args) {
  _print(LEVEL_ERROR, '', ...args);
}

function warn(...args) {
  _print(LEVEL_WARN, '', ...args);
}

function info(...args) {
  _print(LEVEL_INFO, '', ...args);
}

function debug(...args) {
  _print(LEVEL_DEBUG, '', ...args);
}

function trace(...args) {
  _print(LEVEL_TRACE, '', ...args);
}

function getLogger(name) {
  return {
    getName() {
      return name;
    },
    log(...args) {
      _print(LEVEL_LOG, name, ...args);
    },
    error(...args) {
      _print(LEVEL_ERROR, name, ...args);
    },
    warn(...args) {
      _print(LEVEL_WARN, name, ...args);
    },
    info(...args) {
      _print(LEVEL_INFO, name, ...args);
    },
    debug(...args) {
      _print(LEVEL_DEBUG, name, ...args);
    },
    trace(...args) {
      _print(LEVEL_TRACE, name, ...args);
    }
  }
}

export default {
  LEVEL_LOG,
  LEVEL_ERROR,
  LEVEL_WARN,
  LEVEL_INFO,
  LEVEL_DEBUG,
  LEVEL_TRACE,

  get logLevel() {
    return logLevel;
  },
  set logLevel(level) {
    logLevel = level;
  },
  get logStack() {
    return logStack;
  },
  set logStack(stack) {
    logStack = stack;
  },

  log,
  error,
  warn,
  info,
  debug,
  trace,

  getLogger
};

export {
  LEVEL_LOG,
  LEVEL_ERROR,
  LEVEL_WARN,
  LEVEL_INFO,
  LEVEL_DEBUG,
  LEVEL_TRACE,

  logLevel,
  logStack,

  log,
  error,
  warn,
  info,
  debug,
  trace,

  getLogger
};
