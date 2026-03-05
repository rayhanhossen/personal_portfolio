import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    opacity: number;
}

const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let particles: Particle[] = [];
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const spawnParticle = (): Particle => {
            // Spawn at random edges or near mouse
            const edge = Math.floor(Math.random() * 4);
            let x: number, y: number;
            if (edge === 0) { x = Math.random() * canvas.width; y = 0; }
            else if (edge === 1) { x = canvas.width; y = Math.random() * canvas.height; }
            else if (edge === 2) { x = Math.random() * canvas.width; y = canvas.height; }
            else { x = 0; y = Math.random() * canvas.height; }

            const angle = Math.atan2(mouseY - y, mouseX - x) + (Math.random() - 0.5) * 1.5;
            const speed = 0.3 + Math.random() * 0.7;
            const maxLife = 180 + Math.random() * 200;

            return { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0, maxLife, size: 0.5 + Math.random() * 1.5, opacity: 0 };
        };

        // Initialize particles
        for (let i = 0; i < 120; i++) {
            const p = spawnParticle();
            p.life = Math.random() * p.maxLife;
            particles.push(p);
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // --- 1. AURORA / ORB BLOBS ---
            const orbs = [
                { x: canvas.width * 0.15, y: canvas.height * 0.25, r: 420, color: 'rgba(34, 211, 238, 0.045)' },
                { x: canvas.width * 0.82, y: canvas.height * 0.7, r: 380, color: 'rgba(99, 102, 241, 0.04)' },
                { x: canvas.width * 0.5, y: canvas.height * 0.05, r: 260, color: 'rgba(34, 211, 238, 0.03)' },
            ];

            const time = Date.now() / 5000;
            orbs.forEach((orb, i) => {
                const floatX = orb.x + Math.sin(time + i * 1.3) * 60;
                const floatY = orb.y + Math.cos(time + i * 0.9) * 40;
                const grad = ctx.createRadialGradient(floatX, floatY, 0, floatX, floatY, orb.r);
                grad.addColorStop(0, orb.color);
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(floatX, floatY, orb.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // --- 2. DOT GRID ---
            const gridSpacing = 38;
            const dotBaseOpacity = 0.06;
            for (let gx = 0; gx < canvas.width; gx += gridSpacing) {
                for (let gy = 0; gy < canvas.height; gy += gridSpacing) {
                    const dist = Math.hypot(gx - mouseX, gy - mouseY);
                    const influence = Math.max(0, 1 - dist / 280);
                    const opacity = dotBaseOpacity + influence * 0.18;
                    const radius = 0.8 + influence * 1.4;
                    ctx.globalAlpha = opacity;
                    ctx.fillStyle = '#22d3ee';
                    ctx.beginPath();
                    ctx.arc(gx, gy, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;

            // --- 3. FLOW LINES (Connection threads) ---
            ctx.lineWidth = 0.4;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist2 = dx * dx + dy * dy;
                    if (dist2 < 12000) {
                        const alpha = (1 - dist2 / 12000) * 0.12 * particles[i].opacity * particles[j].opacity;
                        ctx.globalAlpha = alpha;
                        ctx.strokeStyle = '#22d3ee';
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;

            // --- 4. PARTICLES ---
            particles.forEach(p => {
                // Fade in / out
                const lifeFrac = p.life / p.maxLife;
                p.opacity = lifeFrac < 0.15 ? lifeFrac / 0.15 : lifeFrac > 0.75 ? (1 - lifeFrac) / 0.25 : 1;

                ctx.globalAlpha = p.opacity * 0.75;
                ctx.fillStyle = '#22d3ee';
                ctx.shadowBlur = 6;
                ctx.shadowColor = '#22d3ee';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Update
                p.x += p.vx;
                p.y += p.vy;
                p.life++;
                if (p.life > p.maxLife) {
                    Object.assign(p, spawnParticle());
                }
            });

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

            animationId = requestAnimationFrame(draw);
        };

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouseMove);
        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] w-full h-full bg-bg">

            {/* Canvas layer */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {/* Top fade */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-transparent to-bg/95 pointer-events-none" />

            {/* Side fades */}
            <div className="absolute inset-0 bg-gradient-to-r from-bg/50 via-transparent to-bg/50 pointer-events-none" />

            {/* Subtle noise texture overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px 128px',
                }}
            />
        </div>
    );
};

export default AnimatedBackground;
