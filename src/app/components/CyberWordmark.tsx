import React from "react";

type CyberWordmarkProps = {
  className?: string;
  variant?: "hero" | "nav" | "footer";
};

export default function CyberWordmark({ className = "", variant = "hero" }: CyberWordmarkProps) {
  return (
    <div className={`cyber-wordmark cyber-wordmark--${variant} ${className}`} aria-label="Hack The Ridge">
      <span className="cyber-wordmark__line" data-text="Hack">Hack</span>
      <span className="cyber-wordmark__line cyber-wordmark__line--accent" data-text="The Ridge">The Ridge</span>
    </div>
  );
}
