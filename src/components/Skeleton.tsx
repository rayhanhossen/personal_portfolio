import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'rect' | 'circle';
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'text' }) => {
    const baseClass = "animate-pulse bg-white/5 border border-white/5";

    const variantClasses = {
        text: "h-4 w-full rounded",
        rect: "h-32 w-full rounded-xl",
        circle: "h-12 w-12 rounded-full"
    };

    return (
        <div className={`${baseClass} ${variantClasses[variant]} ${className}`} />
    );
};

export default Skeleton;
