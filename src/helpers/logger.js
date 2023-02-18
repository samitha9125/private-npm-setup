import Colors from "../constants/colors.js";

const logger = {
  warn: (message) => {
    console.warn(Colors.Yellow, `[WARN] ${message}`);
  },
  info: (message) => {
    console.log(Colors.White, `[INFO] ${message}`);
  },
  error: (message) => {
    console.error(Colors.Red, `[ERROR] ${message}`);
  },
  success: (message) => {
    console.log(Colors.Green, `${message}`);
  },
};

export default logger;
