import React, { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

const LoadingPage = () => {
    const introContainerRef = useRef(null);
    const [animationData, setAnimationData] = useState(null);
    const [introLoading, setIntroLoading] = useState(true);
    const [textVisible, setTextVisible] = useState(false);

    useEffect(() => {
        // Load flight-ticket animation for intro
        fetch('/flight-ticket.json')
            .then(response => response.text())
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    setAnimationData(data);
                } catch (error) {
                    console.error('Error parsing flight-ticket JSON:', error);
                }
            })
            .catch(error => console.error('Error loading flight-ticket animation:', error));
    }, []);

    useEffect(() => {
        if (animationData && introContainerRef.current) {
            const animation = lottie.loadAnimation({
                container: introContainerRef.current,
                renderer: 'svg',
                loop: false,
                autoplay: true,
                animationData: animationData
            });

            // Show text after a short delay
            const textTimer = setTimeout(() => {
                setTextVisible(true);
            }, 500);

            // Hide intro loading after animation completes (approximately 3 seconds)
            const timer = setTimeout(() => {
                setIntroLoading(false);
                // Redirect to home page after intro completes
                window.location.href = '/home';
            }, 3000);

            return () => {
                animation.destroy();
                clearTimeout(timer);
                clearTimeout(textTimer);
            };
        }
    }, [animationData]);

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    {/* Logo/Animation Container */}
                    <div className="mb-8">
                        <div 
                            ref={introContainerRef} 
                            className="w-64 h-64 mx-auto transform transition-all duration-1000 ease-out"
                        />
                    </div>

                    {/* Welcome Text */}
                    <div className={`space-y-4 transition-all duration-1000 ease-out ${
                        textVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-8'
                    }`}>
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            Welcome to
                        </h1>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                            TakeOff HolidayZ
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto">
                            Your perfect journey starts here
                        </p>
                    </div>

                    {/* Loading dots indicator */}
                    <div className={`mt-8 flex justify-center space-x-2 transition-all duration-1000 delay-1000 ${
                        textVisible 
                            ? 'opacity-100 scale-100' 
                            : 'opacity-0 scale-50'
                    }`}>
                        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-cyan-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-3 h-3 bg-teal-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 shadow-lg">
                    <img src="/logo.png" alt="TakeOff HolidayZ Logo" className="h-12 w-auto" />
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;
