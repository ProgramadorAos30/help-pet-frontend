export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export class Logger {
  constructor(private logLevel: number) {
    this.logLevel = logLevel;
  }

  logDebug(message: string): void {
    if (this.logLevel <= LogLevel.DEBUG) {
      console.debug(message);
    }
  }

  logInfo(message: string): void {
    if (this.logLevel <= LogLevel.INFO) {
      console.info(message);
    }
  }

  logWarning(message: string): void {
    if (this.logLevel <= LogLevel.WARN) {
      console.warn(message);
    }
  }

  logError(error: Error): void {
    if (this.logLevel <= LogLevel.ERROR) {
      console.error(error);
    }
  }
}

export const getLoggerInstance = (): Logger => {
  const logLevel = Number(process.env.LOG_LEVEL) ?? LogLevel.INFO;
  return new Logger(logLevel);
};
