import Header from './Header';
import { useEffect, useRef } from 'react';

const Layout = ({ children }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let balls = [];

        // Configuration
        const ballCount = 15;
        const colors = ['#34D399', '#10B981', '#6EE7B7', '#059669']; // Various shades of green
        const baseSpeed = 0.5;

        // Resize handler
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initBalls();
        };

        // Ball class (functional)
        const createBall = () => {
            const radius = Math.random() * 20 + 10;
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * baseSpeed,
                vy: (Math.random() - 0.5) * baseSpeed,
                radius: radius,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: Math.random() * 0.3 + 0.1
            };
        };

        const initBalls = () => {
            balls = [];
            for (let i = 0; i < ballCount; i++) {
                balls.push(createBall());
            }
        };

        const updateData = () => {
            balls.forEach(ball => {
                ball.x += ball.vx;
                ball.y += ball.vy;

                // Bounce off walls
                if (ball.x < 0 || ball.x > canvas.width) ball.vx *= -1;
                if (ball.y < 0 || ball.y > canvas.height) ball.vy *= -1;
            });
        };

        const draw = () => {
            // Check for dark mode to adjust colors potentially, or just keep them green/teal as per screenshot
            const isDark = document.documentElement.classList.contains('dark');

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            balls.forEach(ball => {
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                ctx.fillStyle = ball.color;
                ctx.globalAlpha = isDark ? ball.alpha * 0.5 : ball.alpha; // Dimmer in dark mode
                ctx.fill();
            });

            // Reset alpha
            ctx.globalAlpha = 1;
        };

        const loop = () => {
            updateData();
            draw();
            animationFrameId = requestAnimationFrame(loop);
        };

        window.addEventListener('resize', resize);
        resize(); // Initial setup
        loop();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#000000] transition-colors duration-500 relative overflow-hidden font-poppins">
            {/* Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            ></canvas>

            <div className="relative z-10 container mx-auto p-4 md:p-8 min-h-screen">
                <Header />
                {children}
            </div>
        </div>
    );
};

export default Layout;
