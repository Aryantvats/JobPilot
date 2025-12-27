"use client";
import Hero from "@/components/landing/Hero";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { mousePosition, setMousePosition } = useAppContext();
  useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
          setMousePosition({
            x: e.clientX,
            y: e.clientY,
          });
        };
    
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);
  return (
    <>
      <Hero mousePosition={mousePosition}/>
    </>
  );
}
