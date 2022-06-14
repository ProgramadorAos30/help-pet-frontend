import { LogLevel } from "./utils";

export const setupEnvironmentVariables = (
  variables?: Record<string, string>
) => {
  process.env.LOG_LEVEL = String(LogLevel.INFO);
  for (const [key, value] of Object.entries(variables ?? {})) {
    process.env[key] = value;
  }
};
