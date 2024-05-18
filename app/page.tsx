"use client"
import { useEffect, useState } from "react";
import Navbar from "./navbar/page";
import Image from "next/image";
import Home from "../public/Homepage.png"; // Import Image component from Next.js

const HomePage = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <Image
          src={Home}
          alt="Main Image"
          width={windowSize.width}
          height={windowSize.height}
        />
      </div>

      {/* Other content */}
    </div>
  );
};

export default HomePage;
