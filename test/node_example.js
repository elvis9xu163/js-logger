
import logger from "../src/logger";

logger.logLevel = logger.LEVEL_TRACE;
// logger.logLevel = logger.LEVEL_INFO;
logger.logStack = true;

logger.log("HELLO", "LOG");
logger.error("HELLO", 'ERROR');
logger.warn("HELLO", 'WARN');
logger.info("HELLO", 'INFO');
logger.debug("HELLO", 'DEBUG');
logger.trace("HELLO", 'TRACE');
