// http://www.javascriptkit.com/javatutors/matchmediamultiple.shtml
import { FC, ReactNode, useEffect, useState } from "react";

type BaseMediaQueryProps = {
  mqComponents: {
    [query: string]: ReactNode;
  };
};

const mediaQueryLists: MediaQueryList[] = [];

const loopMediaQueryLists = (
  callback: (mediaQueryList: MediaQueryList) => void
) => {
  for (let i = 0; i < mediaQueryLists.length; i++) callback(mediaQueryLists[i]);
};

const BaseMediaQuery: FC<BaseMediaQueryProps> = ({ mqComponents }) => {
  const [component, setComponent] = useState<ReactNode>(null);
  useEffect(() => {
    const handleChange = (e?: any) => {
      loopMediaQueryLists((mediaQueryList) => {
        if (mediaQueryList.matches)
          setComponent(mqComponents[mediaQueryList.media]);
      });
    };
    for (const key in mqComponents) {
      const mediaQuery = window.matchMedia(key);
      mediaQueryLists.push(mediaQuery);
    }
    handleChange();
    loopMediaQueryLists((mediaQueryList) =>
      mediaQueryList.addEventListener("change", handleChange)
    );
    return () =>
      loopMediaQueryLists((mediaQueryList) =>
        mediaQueryList.removeEventListener("change", handleChange)
      );
  }, [mqComponents]);
  return <>{component}</>;
};

export default BaseMediaQuery;
