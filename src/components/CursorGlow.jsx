import { useEffect, useState } from 'react';

export default function CursorGlow({ isDark }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable glow on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || !isDark) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isDark, isVisible]);

  if (!isVisible || !isDark) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(124, 58, 237, 0.06), transparent 80%)`,
      }}
    />
  );
}
