"use client";

import { cn } from "@/lib/utils";
import React, { ElementType, ReactNode, useEffect, useState } from "react";

export interface VideoTextProps {
  


  src: string;
  


  className?: string;
  


  autoPlay?: boolean;
  


  muted?: boolean;
  


  loop?: boolean;
  


  preload?: "auto" | "metadata" | "none";
  


  children: ReactNode;
  



  fontSize?: string | number;
  



  fontWeight?: string | number;
  



  textAnchor?: string;
  



  dominantBaseline?: string;
  



  fontFamily?: string;
  



  as?: ElementType;
  




  maskScale?: number;
}

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
  as: Component = "div",
  maskScale = 1.12,
}: VideoTextProps) {
  const [svgMask, setSvgMask] = useState("");
  const content = React.Children.toArray(children).join("");

  useEffect(() => {
    const updateSvgMask = () => {
      const responsiveFontSize =
        typeof fontSize === "number" ? `${fontSize}vw` : fontSize;
      
      
      const lines = content.split('\n');
      let textElement;
      
      if (lines.length > 1) {
        
        const lineHeight = 1.2;
        const tspans = lines.map((line, index) => {
          const dy = index === 0 ? '0' : `${lineHeight}em`;
          return `<tspan x='50%' dy='${dy}'>${line}</tspan>`;
        }).join('');
        textElement = `<text x='50%' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family="${fontFamily}">${tspans}</text>`;
      } else {
        
        textElement = `<text x='50%' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family="${fontFamily}">${content}</text>`;
      }
      
      const newSvgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>${textElement}</svg>`;
      setSvgMask(newSvgMask);
    };

    updateSvgMask();
    window.addEventListener("resize", updateSvgMask);
    return () => window.removeEventListener("resize", updateSvgMask);
  }, [content, fontSize, fontWeight, textAnchor, dominantBaseline, fontFamily]);

  const dataUrlMask = `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;

  return (
    <Component className={cn(`relative size-full overflow-visible`, className)}>
      <div
        className="absolute flex items-center justify-center overflow-visible"
        style={{
          
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: `${maskScale * 100}%`,
          height: `${maskScale * 100}%`,
          maskImage: dataUrlMask,
          WebkitMaskImage: dataUrlMask,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>

      <span className="sr-only">{content}</span>
    </Component>
  );
}
