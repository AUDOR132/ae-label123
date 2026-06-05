import React, { useEffect, useRef, useState } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulsePhase: number;
  pulseSpeed: number;
  alpha: number;
  colorType: 'cream' | 'gold' | 'silver';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  decay: number;
}

export default function InteractiveBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bubblesRef = useRef<Bubble[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const nextIdRef = useRef<number>(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize bubbles
    const initBubbles = (width: number, height: number) => {
      const count = Math.min(12, Math.floor((width * height) / 80000) + 4);
      const list: Bubble[] = [];
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 40 + 35; // 35px to 75px
        list.push({
          id: nextIdRef.current++,
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius,
          baseRadius: radius,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.015,
          alpha: 0.05 + Math.random() * 0.08,
          colorType: Math.random() > 0.75 ? 'gold' : Math.random() > 0.5 ? 'silver' : 'cream'
        });
      }
      bubblesRef.current = list;
    };

    // Watch resize properly using ResizeObserver to prevent canvas stretching
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      
      const { width, height } = entry.contentRect;
      
      // Set high DPI scale
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Initialize bubbles first time or adjust existing ones
      if (bubblesRef.current.length === 0) {
        initBubbles(width, height);
      } else {
        // Adjust elements coordinates if container resizes
        bubblesRef.current.forEach(b => {
          if (b.x > width) b.x = Math.random() * width;
          if (b.y > height) b.y = Math.random() * height;
        });
      }
    });

    resizeObserver.observe(container);

    // Physics update & Rendering Loop
    let animId: number;

    const loop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min(50, timestamp - lastTimeRef.current);
      lastTimeRef.current = timestamp;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // 1. Particle Updates
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        
        if (p.alpha <= 0) return false;

        // Draw particle with absolute visual luxury (glowing micro sparkles)
        ctx.save();
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, p.color.replace('ALPHA', p.alpha.toString()));
        grad.addColorStop(1, p.color.replace('ALPHA', '0'));
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });

      // 2. Bubbles Updates
      bubblesRef.current.forEach(b => {
        // Linear movement
        b.x += b.vx;
        b.y += b.vy;

        // Bounce gently on boundaries with soft inset padding
        const margin = b.radius + 10;
        if (b.x < -margin) b.x = width + margin;
        if (b.x > width + margin) b.x = -margin;
        if (b.y < -margin) b.y = height + margin;
        if (b.y > height + margin) b.y = -margin;

        // Gentle breathing pulsing effect
        b.pulsePhase += b.pulseSpeed;
        b.radius = b.baseRadius + Math.sin(b.pulsePhase) * 6;

        // Drawing luxurious glowing spheres
        ctx.save();
        ctx.beginPath();
        
        // Setup glow gradient
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        
        let colorTheme = '248, 248, 248'; // cream
        if (b.colorType === 'gold') colorTheme = '212, 175, 55'; // luxury soft gold
        if (b.colorType === 'silver') colorTheme = '180, 185, 195'; // ethereal zinc silver

        grad.addColorStop(0, `rgba(${colorTheme}, ${b.alpha * 1.5})`);
        grad.addColorStop(0.3, `rgba(${colorTheme}, ${b.alpha})`);
        grad.addColorStop(0.7, `rgba(${colorTheme}, ${b.alpha * 0.25})`);
        grad.addColorStop(1, `rgba(${colorTheme}, 0)`);

        ctx.fillStyle = grad;
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();

        // Add soft, extremely subtle fine art stroke outline to highlight the bubble rim
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${colorTheme}, ${b.alpha * 0.6})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    // Click/Pointer trigger interaction
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clickX = 0;
      let clickY = 0;

      if ('touches' in e) {
        if (e.touches.length === 0) return;
        clickX = e.touches[0].clientX - rect.left;
        clickY = e.touches[0].clientY - rect.top;
      } else {
        clickX = e.clientX - rect.left;
        clickY = e.clientY - rect.top;
      }

      // Check hits
      let hitIndex = -1;
      for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
        const b = bubblesRef.current[i];
        const dist = Math.hypot(clickX - b.x, clickY - b.y);
        
        // Give a generous hit area for touch comfort (extra 15px area)
        if (dist <= b.radius + 15) {
          hitIndex = i;
          break;
        }
      }

      if (hitIndex !== -1) {
        const popped = bubblesRef.current[hitIndex];
        
        // Remove from list
        bubblesRef.current.splice(hitIndex, 1);

        // Generate glowing sparkling particles!
        const particleCount = 18 + Math.floor(Math.random() * 10);
        let colorTheme = '248, 248, 248';
        if (popped.colorType === 'gold') colorTheme = '212, 175, 55';
        if (popped.colorType === 'silver') colorTheme = '180, 185, 195';

        for (let k = 0; k < particleCount; k++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.8 + Math.random() * 2.5;
          particlesRef.current.push({
            x: popped.x,
            y: popped.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: Math.random() * 4 + 1.5,
            alpha: 0.85 + Math.random() * 0.15,
            color: `rgba(${colorTheme}, ALPHA)`,
            decay: 0.015 + Math.random() * 0.02
          });
        }

        // Spawn a replacement bubble in background/bottom or top safely after 1.5s
        setTimeout(() => {
          const widthVal = canvas.width / (window.devicePixelRatio || 1);
          const heightVal = canvas.height / (window.devicePixelRatio || 1);
          const radius = Math.random() * 40 + 35;
          
          // Span on the bottom or side boundaries
          const spawnFromBottom = Math.random() > 0.5;
          bubblesRef.current.push({
            id: nextIdRef.current++,
            x: spawnFromBottom ? Math.random() * widthVal : (Math.random() > 0.5 ? -radius : widthVal + radius),
            y: spawnFromBottom ? heightVal + radius : Math.random() * heightVal,
            vx: (Math.random() - 0.5) * 0.4,
            vy: spawnFromBottom ? -(Math.random() * 0.2 + 0.15) : (Math.random() - 0.5) * 0.4,
            radius,
            baseRadius: radius,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.01 + Math.random() * 0.015,
            alpha: 0.05 + Math.random() * 0.08,
            colorType: Math.random() > 0.75 ? 'gold' : Math.random() > 0.5 ? 'silver' : 'cream'
          });
        }, 1500);
      }
    };

    container.addEventListener('mousedown', handlePointerDown);
    container.addEventListener('touchstart', handlePointerDown, { passive: true });

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', handlePointerDown);
      container.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden z-10 cursor-crosshair"
      id="bubbles-interactive-layer"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
