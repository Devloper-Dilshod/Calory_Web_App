import Header from './Header';
import { useEffect, useRef } from 'react';

const Layout = ({ children }) => {
    const canvasRef = useRef(null);

    // Orqa fon animatsiyasini ishga tushirish (Premium Gradient Mesh)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        // Ekranni o'lchamini moslashtirish
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Chizish funksiyasi
        const draw = () => {
            const isDark = document.documentElement.classList.contains('dark');
            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);

            // Rang palitrasi (Premium Gradient)
            // Yashil, Moviy va Binafsha ranglarning yumshoq aralashmasi
            const colors = isDark
                ? [[16, 185, 129], [59, 130, 246], [139, 92, 246]] // Dark mode: Green, Blue, Violet (chuqurroq)
                : [[52, 211, 153], [96, 165, 250], [167, 139, 250]]; // Light mode: Soft Green, Blue, Purple

            // Harakatlanuvchi gradientlar yaratish
            for (let i = 0; i < 3; i++) {
                const x = width * 0.5 + Math.sin(time * 0.3 + i * 2) * width * 0.3;
                const y = height * 0.5 + Math.cos(time * 0.4 + i * 1.5) * height * 0.3;
                const radius = Math.min(width, height) * 0.6;

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                const [r, g, b] = colors[i];

                // Opacity: Dark mode da kamroq, Light mode da ko'proq
                const alpha = isDark ? 0.15 : 0.25;

                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                ctx.fillStyle = gradient;
                ctx.globalCompositeOperation = isDark ? 'screen' : 'multiply'; // Aralashtirish rejimi
                ctx.fillRect(0, 0, width, height);
            }

            ctx.globalCompositeOperation = 'source-over'; // Normal holatga qaytarish
            time += 0.005; // Sekin harakat
        };

        // Animatsiya sikli
        const loop = () => {
            draw();
            animationFrameId = requestAnimationFrame(loop);
        };

        window.addEventListener('resize', resize);
        resize();
        loop();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#050505] transition-colors duration-500 relative overflow-hidden font-poppins">
            {/* Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
            ></canvas>

            <div className="relative z-10 container mx-auto p-4 md:p-8 min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
