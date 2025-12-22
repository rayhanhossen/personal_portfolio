import React, { useEffect, useRef } from 'react';

const VideoBackground: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            // 0.5 is half speed. Adjust this number to find your perfect "vibe"
            videoRef.current.playbackRate = 0.25;
        }
    }, []);
    
    return (
        <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden bg-bg">
            
            {/* 1. The Video (Crystal Clear) */}
            <video
                poster='/background_thumbnail.png'
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/background.mp4" type="video/mp4" />
            </video>

            {/* 2. The "Blue Tint" (Subtle Uniformity) 
               This adds a very light layer of your site's background color (#020617)
               at 30% opacity. It ensures the video's blue matches your site's blue perfectly.
            */}
            <div className="absolute inset-0 bg-bg/30"></div>

            {/* 3. The "Cinematic Vignette" (Professional Touch)
               This is a gradient. 
               - Top/Bottom: Dark (90% opacity) -> Makes Navbar/Footer readable.
               - Center: Transparent -> Lets the bright circuit lines shine through.
            */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg/90 via-transparent to-bg/90"></div>
            
            {/* 4. Optional: Vertical Vignette for the sides (if text touches edges) */}
            <div className="absolute inset-0 bg-gradient-to-r from-bg/40 via-transparent to-bg/40"></div>

        </div>
    );
};

export default VideoBackground;