// https://zenn.dev/kakaka/articles/41f22d2dcc9720

import { useEffect, useRef } from "react";

const useInterval = (callback: () => void) => {
  const callbackRef = useRef<() => void>(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  useEffect(() => {
    const timerId = setInterval(() => callbackRef.current(), 1000);
    return () => clearInterval(timerId);
  }, []);
};

export default useInterval;
