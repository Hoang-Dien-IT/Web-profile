import React from 'react';

const ParticlesBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Floating orbs */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r opacity-20 animate-float"
            style={{
              width: Math.random() * 100 + 20 + 'px',
              height: Math.random() * 100 + 20 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: `linear-gradient(45deg, 
                ${['#667eea', '#764ba2', '#f093fb', '#f5576c'][Math.floor(Math.random() * 4)]}, 
                ${['#667eea', '#764ba2', '#f093fb', '#f5576c'][Math.floor(Math.random() * 4)]}
              )`,
              animationDelay: Math.random() * 5 + 's',
              animationDuration: (Math.random() * 10 + 10) + 's',
            }}
          />
        ))}
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-pink-500/5 via-transparent to-blue-500/5" />
      </div>
    </div>
  );
};

export default ParticlesBackground;