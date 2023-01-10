import { useState, useEffect } from "react";
interface Size {
  height: number | undefined;
}

const useWindowResize = (): Size => {
  const [windowSize, setWindowSize] = useState<Size>({
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        height: window.innerHeight,
      });
      const doc = document.documentElement;
      doc.style.setProperty("--main-app-height", `${window.innerHeight}px`);
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    window.dispatchEvent(new Event("resize"));

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowResize;
