import { FC, ReactNode, useEffect, useState } from "react";

type BaseMediaQueryProps = {
  mqComponents: {
    [query: string]: ReactNode;
  };
};

const mediaQuerySet: Array<[MediaQueryList, (e: any) => void]> = [];

const BaseMediaQuery: FC<BaseMediaQueryProps> = ({ mqComponents }) => {
  const [component, setComponent] = useState<ReactNode>(null);
  const handleChange = (component: ReactNode) => (e: any) => {
    if (e.matches) setComponent(component);
  };
  useEffect(() => {
    for (const key in mqComponents) {
      const handle = handleChange(mqComponents[key]);
      const mediaQuery = window.matchMedia(key);
      mediaQuery.addEventListener("change", handle);
      handle(mediaQuery);
      mediaQuerySet.push([mediaQuery, handle]);
    }
    return () => {
      for (let i = 0; i < mediaQuerySet.length; i++) {
        const _mediaQuerySet = mediaQuerySet[i];
        _mediaQuerySet[0].removeEventListener("change", _mediaQuerySet[1]);
      }
    };
  }, [mqComponents]);
  return <>{component}</>;
};

export default BaseMediaQuery;
