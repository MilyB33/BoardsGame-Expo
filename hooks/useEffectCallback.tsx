import { useEffect } from "react";

const useEffectCallback = (callback: () => void, deps: any[]) => {
  useEffect(() => {
    callback();
  }, [...deps]);
};

export default useEffectCallback;
