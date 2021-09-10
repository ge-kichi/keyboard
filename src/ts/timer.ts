let intervalID: number = 0;
export const startTimer = (func: () => void) =>
  (intervalID = window.setInterval(func, 1000));
export const stopTimer = () => window.clearInterval(intervalID);
