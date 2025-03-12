"use client";

import { useState, useEffect, useRef } from "react";
import figlet from "figlet";

interface TextFigletProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
  animate?: boolean;
  animationSpeed?: number;
  minHeight?: string;
}

const fonts = {
  ogre: {
    name: "Ogre",
    path: "/public/Ogre.flf",
  },
  doom: {
    name: "Doom",
    path: "/public/Doom.flf",
  },
} as const;

export default function TextFiglet({
  text = "",
  className = "",
  children,
  animate = true,
  animationSpeed = 1,
  minHeight = "150px", // Default minimum height to reserve space
}: TextFigletProps) {
  const [figletText, setFigletText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const rotationRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Generate the figlet text
  useEffect(() => {
    async function generateFiglet() {
      try {
        // In the browser, we need to fetch the font file
        const fontResponse = await fetch("/Ogre.flf");
        const fontData = await fontResponse.text();

        // Parse the font
        figlet.parseFont(fonts.ogre.name, fontData);

        // Generate the figlet text
        const result = figlet.textSync(text, {
          font: fonts.ogre.name,
          whitespaceBreak: true,
        });

        setFigletText(result);
        setIsLoading(false);

        // Trigger fade-in animation after text is loaded
        // Use a small delay to ensure DOM has updated
        setTimeout(() => {
          setIsFadingIn(true);
        }, 300); // Slightly longer delay for more noticeable effect
      } catch (err) {
        console.error("Error generating figlet:", err);
        setError("Failed to generate ASCII art");
        setIsLoading(false);
      }
    }

    setIsFadingIn(false);
    setIsLoading(true);
    generateFiglet();
  }, [text]);

  // Smooth continuous rotation animation
  useEffect(() => {
    if (!animate || isLoading) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    let lastTime = 0;
    const animateRotation = (time: number) => {
      if (lastTime === 0) {
        lastTime = time;
      }
      const deltaTime = time - lastTime;
      lastTime = time;

      // Update rotation based on time delta for smooth animation
      rotationRef.current += animationSpeed * (deltaTime * 0.05);

      // Apply the rotation to the element
      if (preRef.current && containerRef.current) {
        containerRef.current.style.transform = `perspective(1000px) rotateY(${rotationRef.current}deg)`;
      }

      animationFrameRef.current = requestAnimationFrame(animateRotation);
    };

    animationFrameRef.current = requestAnimationFrame(animateRotation);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, animationSpeed, isLoading]);

  // Style for the container with white glow effect
  const containerStyle = {
    color: "#000000",
    textShadow: "0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #ffffff",
    minHeight: minHeight,
  };

  // Add a glow animation effect after fade-in
  useEffect(() => {
    if (isFadingIn && preRef.current) {
      // Add a class to trigger the animation after fade-in
      setTimeout(() => {
        if (preRef.current) {
          preRef.current.classList.add("glow-animation");
        }
      }, 1000); // Start glow animation after fade-in completes
    }
  }, [isFadingIn]);

  // Create a placeholder with the same dimensions while loading
  if (isLoading) {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div
          className="flex items-center justify-center"
          style={{ minHeight: minHeight }}
        >
          <div className="text-white opacity-50">Loading...</div>
        </div>
        {children && <div className="mt-4">{children}</div>}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <div
          className="flex items-center justify-center"
          style={{ minHeight: minHeight }}
        >
          <div className="text-red-500">{error}</div>
        </div>
        {children && <div className="mt-4">{children}</div>}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        ref={containerRef}
        className="transform-gpu"
        style={{ minHeight: minHeight }}
      >
        <div
          className={`transition-all duration-1000 ease-in-out ${
            isFadingIn
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
          style={containerStyle}
        >
          <pre ref={preRef} className="font-mono whitespace-pre text-center">
            {figletText}
          </pre>
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
