import React from 'react';

const RippleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      
      {/* Container for the ripples - positioned bottom-left */}
      <div className="absolute bottom-0 left-0">
        
        {/* Circle 1 (Largest - Faintest) */}
        <div className="absolute rounded-full bg-accent mix-blend-multiply blur-[1px]
                        w-[1000px] h-[1000px] -left-[500px] -bottom-[500px] 
                        opacity-10 animate-ripple"></div>

        {/* Circle 2 */}
        <div className="absolute rounded-full bg-accent mix-blend-multiply blur-[1px]
                        w-[800px] h-[800px] -left-[400px] -bottom-[400px] 
                        opacity-20 animate-ripple"></div>

        {/* Circle 3 */}
        <div className="absolute rounded-full bg-accent mix-blend-multiply blur-[1px]
                        w-[600px] h-[600px] -left-[300px] -bottom-[300px] 
                        opacity-30 animate-ripple"></div>

        {/* Circle 4 */}
        <div className="absolute rounded-full bg-accent mix-blend-multiply blur-[1px]
                        w-[400px] h-[400px] -left-[200px] -bottom-[200px] 
                        opacity-40 animate-ripple"></div>

        {/* Circle 5 (Smallest - Darkest) */}
        <div className="absolute rounded-full bg-accent mix-blend-multiply blur-[1px]
                        w-[200px] h-[200px] -left-[100px] -bottom-[100px] 
                        opacity-50 animate-ripple"></div>
      </div>
    </div>
  );
};

export default RippleBackground;