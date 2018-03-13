
import {getLogger, default as logSettings} from "../src/logger";

logSettings.logLevel = logSettings.LEVEL_TRACE;
// logSettings.logStack = true;

const logger = getLogger("user");

logger.log("HELLO", "LOG");
logger.error("HELLO", 'ERROR');
logger.warn("HELLO", 'WARN');
logger.info("HELLO", 'INFO');
logger.debug("HELLO", 'DEBUG');
logger.trace("HELLO", 'TRACE');