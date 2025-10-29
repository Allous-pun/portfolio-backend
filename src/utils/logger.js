// src/utils/logger.js
import fs from "fs";
import path from "path";
import chalk from "chalk";

const logFolder = path.join(process.cwd(), "logs");

// Create folder if missing
if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder);
}

const logFile = path.join(logFolder, "error.log");

// Write errors to file
export const logErrorToFile = (message) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.log(chalk.red("Failed to write log:", err));
  });
};

// Console logger for dev environment
export const logger = {
  info: (msg) => console.log(chalk.blue(`[INFO] ${msg}`)),
  success: (msg) => console.log(chalk.green(`[SUCCESS] ${msg}`)),
  warn: (msg) => console.log(chalk.yellow(`[WARNING] ${msg}`)),
  error: (msg) => {
    console.log(chalk.red(`[ERROR] ${msg}`));
    logErrorToFile(msg);
  },
};
