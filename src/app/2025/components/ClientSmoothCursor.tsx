'use client';
import { useEffect, useState } from 'react';
import { SmoothCursor } from './ui/smooth-cursor';

export default function ClientSmoothCursor() {
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setShowCursor(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  if (!showCursor) return null;
  return <SmoothCursor />;
}
