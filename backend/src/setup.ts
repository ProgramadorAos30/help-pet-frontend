import { LogLevel } from "./utils";

export const setupEnvironmentVariables = (
  variables?: Record<string, string>
) => {
  process.env.LOG_LEVEL = String(LogLevel.INFO);
  process.env.SECRET_KEY = "MOCK_SECRET_KEY";
  process.env.TOKEN_EXPIRATION_TIME = "1h";

  for (const [key, value] of Object.entries(variables ?? {})) {
    process.env[key] = value;
  }
};
