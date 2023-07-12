import { useEffect, useState } from "react";

export const useWindowWidth = (): {
  windowWidth: number;
  isMobile: boolean;
} => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMobile(windowWidth < 768);
  }, [windowWidth]);
  return { windowWidth, isMobile };
};
