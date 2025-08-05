// File: src/components/ui/particles.tsx
'use client';

import React, { useRef, useEffect } from 'react';

export function Particles({
  className,
  quantity = 70,
  color = '#ffffff',
}: {
  className?: string;
  quantity?: number;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];

    const properties = {
      particleColor: color,
      particleRadius: 1.5,
      particleCount: quantity,
      particleMaxVelocity: 0.5,
    };

    const resizeReset = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeReset);

    const moveParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;

        if (particles[i].x > w) particles[i].x = 0;
        if (particles[i].y > h) particles[i].y = 0;
        if (particles[i].x < 0) particles[i].x = w;
        if (particles[i].y < 0) particles[i].y = h;
      }
    };

    const reDrawParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = properties.particleColor;
        ctx.arc(
          particles[i].x,
          particles[i].y,
          properties.particleRadius,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      moveParticles();
      reDrawParticles();
      requestAnimationFrame(loop);
    };

    const init = () => {
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx:
            Math.random() * (properties.particleMaxVelocity * 2) -
            properties.particleMaxVelocity,
          vy:
            Math.random() * (properties.particleMaxVelocity * 2) -
            properties.particleMaxVelocity,
        });
      }
      loop();
    };

    init();

    return () => {
      window.removeEventListener('resize', resizeReset);
    };
  }, [quantity, color]);

  return <canvas ref={canvasRef} className={className}></canvas>;
}