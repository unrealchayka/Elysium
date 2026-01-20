'use client';

import { useEffect, useRef } from 'react';

export default function MatrixBackgroundNoTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    
    // Массив символов
    const symbols: {
      x: number;
      y: number;
      char: string;
      speed: number;
      opacity: number;
      size: number;
    }[] = [];
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // Инициализация
    const init = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      
      // Очищаем массив
      symbols.length = 0;
      
      // Создаем 25 символов
      for (let i = 0; i < 25; i++) {
        symbols.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          char: letters[Math.floor(Math.random() * letters.length)],
          speed: 0.2 + Math.random() * 0.3, // Очень медленно
          opacity: 0.2 + Math.random() * 0.3, // Хорошо видно
          size: 20 + Math.random() * 30 // Разный размер
        });
      }
      
      // Заливаем черный фон один раз при инициализации
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Анимация
    const animate = () => {
      // ОЧЕНЬ ВАЖНО: НЕ РИСУЕМ ФОН КАЖДЫЙ КАДР!
      // Вместо этого стираем только старые позиции символов
      
      // Стираем старые символы черными прямоугольниками
      for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        ctx.fillStyle = '#000000';
        ctx.fillRect(
          symbol.x - 2, // Немного больше чем символ
          symbol.y - symbol.size + 2, // Учитываем высоту символа
          symbol.size * 0.8 + 4, // Ширина с запасом
          symbol.size + 4 // Высота с запасом
        );
      }
      
      // Обновляем и рисуем новые символы
      for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        
        // МЕДЛЕННОЕ движение
        symbol.x += symbol.speed;
        
        // Если ушел за правый край
        if (symbol.x > canvas.width + 50) {
          symbol.x = -50;
          symbol.y = Math.random() * canvas.height;
          symbol.char = letters[Math.floor(Math.random() * letters.length)];
          symbol.opacity = 0.2 + Math.random() * 0.3;
          symbol.size = 20 + Math.random() * 15;
        }
        
        // Рисуем новый символ
        ctx.font = `bold ${symbol.size}px 'Courier New', monospace`;
        ctx.fillStyle = `rgba(255, 255, 255, ${symbol.opacity})`;
        ctx.fillText(symbol.char, symbol.x, symbol.y);
      }
      
      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none bg-black"
    />
  );
}