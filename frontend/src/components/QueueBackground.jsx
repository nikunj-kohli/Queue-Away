import React, { useEffect } from "react";

// Small animated avatar (dot)
const QueueDot = ({ color, style, delay }) => (
  <div
    className="rounded-full shadow-sm"
    style={{
      width: 12,
      height: 12,
      background: color,
      margin: '4px 0',
      opacity: 0.85,
      boxShadow: `0 1px 6px ${color}33`,
      animation: `queue-bounce 2.4s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      ...style,
    }}
  />
);

// One vertical queue (column of dots)
const QueueColumn = ({ dots, colors, colIdx, totalCols }) => (
  <div className="flex flex-col items-center" style={{ gap: 0, margin: '0 8px' }}>
    {Array.from({ length: dots }).map((_, i) => (
      <QueueDot
        key={i}
        color={colors[(colIdx + i) % colors.length]}
        delay={((i + colIdx) % 8) * 0.18}
        style={{ filter: `blur(${colIdx % 4 === 0 ? 0.5 : 0}px)` }}
      />
    ))}
  </div>
);

const QueueBackground = ({ columns = 18, dotsPerColumn = 14 }) => {
  const colors = ["#4F46E5", "#F59E42", "#10B981", "#EF4444", "#FBBF24", "#6366F1", "#EC4899"];

  // Inject CSS animation for subtle bounce
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes queue-bounce {
        0%, 100% { transform: translateY(0); opacity: 0.85; }
        50% { transform: translateY(-10px); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-50 w-screen h-screen flex flex-row justify-evenly items-center pointer-events-none select-none"
      style={{ background: 'rgba(24,26,33,0.98)' }}
    >
      {Array.from({ length: columns }).map((_, colIdx) => (
        <QueueColumn
          key={colIdx}
          dots={dotsPerColumn}
          colors={colors}
          colIdx={colIdx}
          totalCols={columns}
        />
      ))}
    </div>
  );
};

export default QueueBackground;
