import React, { useState, useEffect, useRef } from 'react'
import lottie from 'lottie-web'

const Home = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [introLoading, setIntroLoading] = useState(true);
    const [animationData, setAnimationData] = useState(null);
    const [boxesVisible, setBoxesVisible] = useState(false);
    const [mobileBoxesVisible, setMobileBoxesVisible] = useState(false);
    const [tourPackagesVisible, setTourPackagesVisible] = useState(false);
    const [serviceBoxVisible, setServiceBoxVisible] = useState(false);
    const [customizationVisible, setCustomizationVisible] = useState(false);
    const [adventureVisible, setAdventureVisible] = useState(false);
    const introContainerRef = useRef(null);

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

            // Hide intro loading after animation completes (approximately 3 seconds)
            const timer = setTimeout(() => {
                setIntroLoading(false);
            }, 3000);

            return () => {
                animation.destroy();
                clearTimeout(timer);
            };
        }
    }, [animationData]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!introLoading) {
            const timer = setTimeout(() => {
                setMobileBoxesVisible(true);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [introLoading]);

    // Intersection Observer for glassmorphism boxes
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setBoxesVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px' // Start when element is 100px into view
            }
        );

        const targetElement = document.getElementById('glassmorphism-boxes');
        if (targetElement) {
            observer.observe(targetElement);
        }

        return () => {
            if (targetElement) {
                observer.unobserve(targetElement);
            }
        };
    }, []);

    // Intersection Observer for Tour Packages section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTourPackagesVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px' // Start when element is 100px into view
            }
        );

        const targetElement = document.getElementById('tour-packages-section');
        if (targetElement) {
            observer.observe(targetElement);
        }

        return () => {
            if (targetElement) {
                observer.unobserve(targetElement);
            }
        };
    }, []);

    // Intersection Observer for Service Box section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setServiceBoxVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        const targetElement = document.getElementById('service-box-section');
        if (targetElement) {
            observer.observe(targetElement);
        }

        return () => {
            if (targetElement) {
                observer.unobserve(targetElement);
            }
        };
    }, []);

    // Intersection Observer for Customization section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCustomizationVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        const targetElement = document.getElementById('customization-section');
        if (targetElement) {
            observer.observe(targetElement);
        }

        return () => {
            if (targetElement) {
                observer.unobserve(targetElement);
            }
        };
    }, []);

    // Intersection Observer for Adventure section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setAdventureVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        const targetElement = document.getElementById('adventure-section');
        if (targetElement) {
            observer.observe(targetElement);
        }

        return () => {
            if (targetElement) {
                observer.unobserve(targetElement);
            }
        };
    }, []);

    return (
        <div>
            {/* Intro Loading Overlay */}
            {introLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                    <div className="flex flex-col items-center">
                        <div 
                            ref={introContainerRef} 
                            className="w-48 h-48"
                        />
                        <p className="mt-4 text-xl font-semibold text-gray-700">Welcome to TakeOff HolidayZ</p>
                    </div>
                </div>
            )}
            
            {/* Main Content */}
            <div style={{ display: introLoading ? 'none' : 'block' }}>
            {/* first section */}
            <section className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden" style={{backgroundImage: 'url(/Home.jpg)'}}>
                {/* Top 4 small glassmorphism boxes */}
                <div id="glassmorphism-boxes" className="hidden md:block absolute left-0 right-0 px-8">
                    <div className="absolute top-[300px] md:top-[350px] xl:top-[400px] left-0 right-0 flex justify-center gap-32 md:gap-40 lg:gap-48 xl:gap-[48rem]">
                        {/* Box 1 - 10,000+ Happy Travelers Served (from left) */}
                        <div className={`bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-6 text-white text-center w-48 md:w-56 lg:w-64 xl:w-80 mr-24 md:mr-32 lg:mr-40 xl:mr-64 transition-all duration-1000 ease-out ${
                            boxesVisible 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 -translate-x-full'
                        }`}>
                            <p className="text-3xl md:text-4xl xl:text-5xl font-bold" style={{fontFamily: "'Abhaya Libre', serif", fontWeight: 800}}>10,000+</p>
                            <p className="text-sm md:text-base xl:text-lg" style={{fontFamily: "'Abhaya Libre', serif", }}>Happy Travelers Served</p>
                        </div>
                        {/* Box 2 - 15+ Global Destinations Covered (from right) */}
                        <div className={`bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-6 text-white text-center w-48 md:w-56 lg:w-64 xl:w-80 transition-all duration-1000 ease-out delay-300 ${
                            boxesVisible 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 translate-x-full'
                        }`}>
                            <p className="text-3xl md:text-4xl xl:text-5xl font-bold" style={{fontFamily: "'Abhaya Libre', serif", fontWeight: 800}}>15+</p>
                            <p className="text-sm md:text-base xl:text-lg" style={{fontFamily: "'Abhaya Libre', serif", }}>Global Destinations Covered</p>
                        </div>
                    </div>
                    <div className="absolute top-[150px] md:top-[200px] xl:top-[250px] left-0 right-0 flex justify-center gap-24 md:gap-32 lg:gap-40 xl:gap-48">
                        {/* Box 3 - 500+ Holiday Packages Delivered (from left) */}
                        <div className={`bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-6 text-white text-center w-48 md:w-56 lg:w-64 xl:w-80 transition-all duration-1000 ease-out delay-150 ${
                            boxesVisible 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 -translate-x-full'
                        }`}>
                            <p className="text-3xl md:text-4xl xl:text-5xl font-bold" style={{fontFamily: "'Abhaya Libre', serif", fontWeight: 800}}>500+</p>
                            <p className="text-sm md:text-base xl:text-lg" style={{fontFamily: "'Abhaya Libre', serif", }}>Holiday Packages Delivered</p>
                        </div>
                        {/* Box 4 - 19+ Years of Travel Excellence (from right) */}
                        <div className={`bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-6 text-white text-center w-48 md:w-56 lg:w-64 xl:w-80 transition-all duration-1000 ease-out delay-450 ${
                            boxesVisible 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 translate-x-full'
                        }`}>
                            <p className="text-4xl xl:text-5xl font-bold" style={{fontFamily: "'Abhaya Libre', serif", fontWeight: 800}}>19+</p>
                            <p className="text-base xl:text-lg" style={{fontFamily: "'Abhaya Libre', serif", }}> Years of Travel Excellence</p>
                        </div>
                    </div>
                </div>

                {/* Mobile-only horizontal carousel */}
                <div className="md:hidden absolute left-0 right-0 px-2 sm:px-4">
                    <div className="absolute top-[80px] sm:top-[100px] left-0 right-0 overflow-hidden">
                        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${(currentIndex % 4) * 100}%)` }}>
                            {/* Box 1 */}
                            <div className="flex-shrink-0 w-full flex justify-center px-2">
                                <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-4 sm:p-5 text-white text-center w-48 sm:w-56 max-w-[90vw]">
                                    <p className="text-xl sm:text-2xl font-bold" style={{fontFamily: "'Abhaya Libre', serif", fontWeight: 800}}>10,000+</p>
                                    <p className="text-sm sm:text-sm" style={{fontFamily: "'Abhaya Libre', serif", }}>Happy Travelers Served</p>
                                </div>
                            </div>
                            {/* Box 2 */}
                            <div className="flex-shrink-0 w-full flex justify-center px-2">
                                <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-4 sm:p-5 text-white text-center w-48 sm:w-56 max-w-[90vw]">
                                    <p className="text-xl sm:text-2xl font-bold" style={{fontFamily: "'Abhaya Libre', serif", fontWeight: 800}}>15+</p>
                                    <p className="text-sm sm:text-sm" style={{fontFamily: "'Abhaya Libre', serif", }}>Global Destinations Covered</p>
                                </div>
                            </div>
                            {/* Box 3 */}
                            <div className="flex-shrink-0 w-full flex justify-center px-2">
                                <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-4 sm:p-5 text-white text-center w-48 sm:w-56 max-w-[90vw]">
                                    <p className="text-xl sm:text-2xl font-bold" style={{fontFamily: "'Abhaya Libre', serif", fontWeight: 800}}>500+</p>
                                    <p className="text-sm sm:text-sm" style={{fontFamily: "'Abhaya Libre', serif", }}>Holiday Packages Delivered</p>
                                </div>
                            </div>
                            {/* Box 4 */}
                            <div className="flex-shrink-0 w-full flex justify-center px-2">
                                <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-4 sm:p-5 text-white text-center w-48 sm:w-56 max-w-[90vw]">
                                    <p className="text-xl sm:text-2xl font-bold" style={{fontFamily: "'Abhaya Libre', serif", fontWeight: 800}}>19+</p>
                                    <p className="text-sm sm:text-sm" style={{fontFamily: "'Abhaya Libre', serif", }}> Years of Travel Excellence</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile bottom, top box */}
                    <div className={`absolute top-[200px] sm:top-[330px] md:top-[370px] left-0 right-0 flex justify-center px-2 sm:px-4 transition-all duration-1000 ease-out delay-600 ${
                        mobileBoxesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                    }`} style={{transitionDelay: mobileBoxesVisible ? '0.2s' : '0s'}}>
                        <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-4 sm:p-5 text-white w-56 sm:w-64 max-w-[85vw]">
                            <p className="font-bold font-pethra text-xl sm:text-2xl text-center">Your Perfect Journey Starts Here</p>
                        </div>
                    </div>

                    {/* Mobile bottom, bottom box */}
                    <div className={`absolute top-[580px] sm:top-[480px] md:top-[520px] left-0 right-0 flex flex-col items-center gap-4 sm:gap-5 md:gap-8 mb-8 sm:mb-12 px-2 sm:px-4 transition-all duration-1000 ease-out delay-600 ${
                        mobileBoxesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                    }`} style={{transitionDelay: mobileBoxesVisible ? '0.4s' : '0s'}}>
                        <div className="bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-4 sm:p-5 text-white w-56 sm:w-64 max-w-[85vw]">
                            <p className="mb-4 sm:mb-5 text-sm sm:text-base text-center" style={{fontFamily: "'Afacad', sans-serif"}}>Discover hassle-free travel with expert planning, exclusive packages, and unforgettable destinations.</p>
                            <div className="flex flex-col gap-3">
                                <button 
                                    className="bg-white bg-opacity-30 hover:bg-opacity-40 px-4 sm:px-5 py-3 rounded-md transition-all text-sm sm:text-base w-full" 
                                    style={{fontFamily: "'Afacad', sans-serif"}}
                                    onClick={() => window.location.href = '/packages'}
                                >Explore Packages</button>
                                <button 
                                    className="bg-white bg-opacity-30 hover:bg-opacity-40 px-4 sm:px-5 py-3 rounded-md transition-all text-sm sm:text-base w-full" 
                                    style={{fontFamily: "'Afacad', sans-serif"}}
                                    onClick={() => window.location.href = '/contact'}
                                >Plan Your Trip</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom left glassmorphism box */}
                <div className={`hidden md:block absolute bottom-8 left-20 md:left-8 lg:left-40 xl:left-48 bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-4 md:p-4 lg:p-5 xl:p-6 text-white max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg transition-all duration-1000 ease-out delay-600 ${
                    boxesVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-full'
                }`}>
                    <p className="font-bold font-pethra text-4xl md:text-4xl lg:text-5xl xl:text-6xl">Your Perfect Journey Starts Here</p>
                </div>

                {/* Bottom right glassmorphism box */}
                <div className={`hidden md:block absolute bottom-8 right-20 md:right-8 lg:right-38 xl:right-44 bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-6 md:p-6 lg:p-7 xl:p-8 text-white max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg transition-all duration-1000 ease-out delay-750 ${
                    boxesVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-full'
                }`}>
                    <p className="mb-4 md:mb-4 lg:mb-5 xl:mb-6 text-base md:text-base lg:text-lg xl:text-xl" style={{fontFamily: "'Afacad', sans-serif"}}>Discover hassle-free travel with expert planning, exclusive packages, and unforgettable destinations.</p>
                    <div className="flex gap-3 md:gap-3 lg:gap-4 xl:gap-5">
                        <button 
                            className="bg-white bg-opacity-30 hover:bg-opacity-40 px-4 md:px-4 lg:px-5 xl:px-6 py-3 rounded-md transition-all text-sm md:text-sm lg:text-base xl:text-lg" 
                            style={{fontFamily: "'Afacad', sans-serif"}}
                            onClick={() => window.location.href = '/packages'}
                        >Explore Packages</button>
                        <button 
                            className="bg-white bg-opacity-30 hover:bg-opacity-40 px-4 md:px-4 lg:px-5 xl:px-6 py-3 rounded-md transition-all text-sm md:text-sm lg:text-base xl:text-lg" 
                            style={{fontFamily: "'Afacad', sans-serif"}}
                            onClick={() => window.location.href = '/contact'}
                        >Plan Your Trip</button>
                    </div>
                </div>

                            </section>

            {/* Tour Packages Section */}
            <section id="tour-packages-section" className="w-full lg:px-32 xl:px-40 2xl:px-56 min-h-screen bg-white py-16 px-4 sm:px-6 md:px-16 overflow-x-hidden">
                {/* Header */}
                <div className={`flex justify-between items-start mb-12 flex-col sm:flex-row transition-all duration-1000 ease-out delay-600 ${
                    tourPackagesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`} style={{transitionDelay: tourPackagesVisible ? '0.2s' : '0s'}}>
                    <div className={`mb-6 sm:mb-0 transition-all duration-1000 ease-out delay-600 ${
                        tourPackagesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                    }`} style={{transitionDelay: tourPackagesVisible ? '0.3s' : '0s'}}>
                        <p className="text-base text-gray-500 mb-10 sm:mb-6 md:mb-8" style={{fontFamily: "'Afacad', sans-serif"}}>Tour Packages</p>
                        <h2 className="lg:text-5xl xl:text-6xl font-bold text-black font-pethra text-3xl sm:text-4xl md:text-5xl">Explore Our Best<br/>Travel Packages</h2>
                        <div className="w-24 h-1 bg-blue-600 mt-2 mx-auto"></div>
                    </div>
                    <p className={`text-gray-600 text-lg max-w-xs text-left sm:text-right text-sm sm:text-base md:text-lg transition-all duration-1000 ease-out delay-600 ${
                        tourPackagesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                    }`} style={{fontFamily: "'Afacad', sans-serif", transitionDelay: tourPackagesVisible ? '0.4s' : '0s'}}>Handpicked holiday experiences<br/>designed for comfort, adventure,<br/>and unforgettable memories.</p>
                </div>

                {/* Cards Container - Desktop/Tablet */}
                <div className="hidden md:block flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-6 xl:gap-8">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-6 xl:gap-8">
                        {/* Kerala Card */}
                        <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${hoveredCard === 0 || hoveredCard === null ? 'md:w-[20rem] lg:w-[22rem] xl:w-[24rem] 2xl:w-[26rem]' : 'w-48 md:w-56 lg:w-64 xl:w-72'}`} onMouseEnter={() => setHoveredCard(0)}>
                            <div className="relative">
                                <img src="/kerala.jpg" alt="Kerala" className={`object-cover rounded-2xl m-4 w-[calc(100%-2rem)] ${hoveredCard === 0 || hoveredCard === null ? 'h-72 md:h-80 lg:h-96' : 'h-[24rem] md:h-[28rem] lg:h-[32rem]'}`}/>
                                <div className="absolute top-8 left-8 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                                    South Asia
                                </div>
                            </div>
                            <div className="p-8 pt-2">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-2xl font-semibold text-gray-900" style={{fontFamily: "'Abhaya Libre', serif"}}>Kerala</h3>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                        <span className="text-gray-900 font-semibold text-lg">4.5</span>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: "'Abhaya Libre', serif"}}>₹24,999</p>
                                <ul className={`space-y-2 text-base text-gray-600 mb-6 ${hoveredCard === 0 || hoveredCard === null ? '' : 'hidden'}`} style={{fontFamily: "'Afacad', sans-serif"}}>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Backwater cruises</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Ayurvedic treatments</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Spice plantation visits</li>
                                </ul>
                                <button 
                                    className={`bg-blue-600 text-white px-8 py-3 rounded-full text-base hover:bg-blue-700 hover:scale-105 transition-all shadow-lg hover:shadow-xl ${hoveredCard === 0 || hoveredCard === null ? '' : 'hidden'}`} 
                                    style={{fontFamily: "'Afacad', sans-serif"}}
                                    onClick={() => window.location.href = '/application'}
                                >Booking</button>
                            </div>
                        </div>

                        {/* Maldives Card */}
                        <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${hoveredCard === 1 ? 'md:w-[20rem] lg:w-[22rem] xl:w-[24rem] 2xl:w-[26rem]' : 'w-48 md:w-56 lg:w-64 xl:w-72'}`} onMouseEnter={() => setHoveredCard(1)}>
                            <div className="relative">
                                <img src="/maldives.jpg" alt="Maldives" className={`object-cover rounded-2xl m-4 w-[calc(100%-2rem)] ${hoveredCard === 1 ? 'h-72 md:h-80 lg:h-96' : 'h-[24rem] md:h-[28rem] lg:h-[32rem]'}`}/>
                                <div className="absolute top-8 left-8 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                                    Indian Ocean
                                </div>
                            </div>
                            <div className="p-8 pt-2">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-2xl font-semibold text-gray-900" style={{fontFamily: "'Abhaya Libre', serif"}}>Maldives</h3>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                        <span className="text-gray-900 font-semibold text-lg">4.5</span>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: "'Abhaya Libre', serif"}}>₹18,999</p>
                                <ul className={`space-y-2 text-base text-gray-600 mb-6 ${hoveredCard === 1 ? '' : 'hidden'}`} style={{fontFamily: "'Afacad', sans-serif"}}>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Overwater villas</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Water sports</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Private beaches</li>
                                </ul>
                                <button 
                                    className={`bg-blue-600 text-white px-8 py-3 rounded-full text-base hover:bg-blue-700 hover:scale-105 transition-all shadow-lg hover:shadow-xl ${hoveredCard === 1 ? '' : 'hidden'}`} 
                                    style={{fontFamily: "'Afacad', sans-serif"}}
                                    onClick={() => window.location.href = '/application'}
                                >Booking</button>
                            </div>
                        </div>

                        {/* Europe Card */}
                        <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${hoveredCard === 2 ? 'md:w-[20rem] lg:w-[22rem] xl:w-[24rem] 2xl:w-[26rem]' : 'w-48 md:w-56 lg:w-64 xl:w-72'}`} onMouseEnter={() => setHoveredCard(2)}>
                            <div className="relative">
                                <img src="/europe.jpg" alt="Europe" className={`object-cover rounded-2xl m-4 w-[calc(100%-2rem)] ${hoveredCard === 2 ? 'h-72 md:h-80 lg:h-96' : 'h-[24rem] md:h-[28rem] lg:h-[32rem]'}`}/>
                                <div className="absolute top-8 left-8 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                                    Europe
                                </div>
                            </div>
                            <div className="p-8 pt-2">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-2xl font-semibold text-gray-900" style={{fontFamily: "'Abhaya Libre', serif"}}>Europe</h3>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                        <span className="text-gray-900 font-semibold text-lg">4.5</span>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: "'Abhaya Libre', serif"}}>₹47,999</p>
                                <ul className={`space-y-2 text-base text-gray-600 mb-6 ${hoveredCard === 2 ? '' : 'hidden'}`} style={{fontFamily: "'Afacad', sans-serif"}}>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Historical monuments</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Wine tasting tours</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Scenic train rides</li>
                                </ul>
                                <button 
                                    className={`bg-blue-600 text-white px-8 py-3 rounded-full text-base hover:bg-blue-700 hover:scale-105 transition-all shadow-lg hover:shadow-xl ${hoveredCard === 2 ? '' : 'hidden'}`} 
                                    style={{fontFamily: "'Afacad', sans-serif"}}
                                    onClick={() => window.location.href = '/application'}
                                >Booking</button>
                            </div>
                        </div>

                        {/* Thailand Card */}
                        <div className={`hidden md:hidden lg:hidden xl:block bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${hoveredCard === 3 ? 'md:w-[20rem] lg:w-[22rem] xl:w-[24rem] 2xl:w-[26rem]' : 'w-48 md:w-56 lg:w-64 xl:w-72'}`} onMouseEnter={() => setHoveredCard(3)}>
                            <div className="relative">
                                <img src="/thailand.jpg" alt="Thailand" className={`object-cover rounded-2xl m-4 w-[calc(100%-2rem)] ${hoveredCard === 3 ? 'h-72 md:h-80 lg:h-96' : 'h-[24rem] md:h-[28rem] lg:h-[32rem]'}`}/>
                                <div className="absolute top-8 left-8 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                                    Southeast Asia
                                </div>
                            </div>
                            <div className="p-8 pt-2">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-2xl font-semibold text-gray-900" style={{fontFamily: "'Abhaya Libre', serif"}}>Thailand</h3>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                        <span className="text-gray-600 font-semibold text-lg">4.5</span>
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: "'Abhaya Libre', serif"}}>₹35,999</p>
                                <ul className={`space-y-2 text-base text-gray-600 mb-6 ${hoveredCard === 3 ? '' : 'hidden'}`} style={{fontFamily: "'Afacad', sans-serif"}}>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Island hopping</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Temple visits</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Street food experiences</li>
                                </ul>
                                <button 
                                    className={`bg-blue-600 text-white px-8 py-3 rounded-full text-base hover:bg-blue-700 hover:scale-105 transition-all shadow-lg hover:shadow-xl ${hoveredCard === 3 ? '' : 'hidden'}`} 
                                    style={{fontFamily: "'Afacad', sans-serif"}}
                                    onClick={() => window.location.href = '/application'}
                                >Booking</button>
                            </div>
                        </div>

                        {/* Next Navigation Box */}
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-24 md:w-32 lg:w-36 h-72 md:h-80 lg:h-96 flex items-center justify-center self-center">
                            <button 
                                className="text-gray-600 hover:text-blue-600 text-2xl md:text-3xl lg:text-4xl transition-all"
                                onClick={() => window.location.href = '/packages'}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cards Container - Mobile */}
                <div className="md:hidden overflow-hidden w-full overflow-x-auto">
                    <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {/* Kerala Card */}
                        <div className="flex-shrink-0 w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="relative">
                                <img src="/kerala.jpg" alt="Kerala" className="object-cover rounded-2xl m-4 w-[calc(100%-2rem)] h-48"/>
                                <div className="absolute top-8 left-8 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                                    South Asia
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xl font-semibold text-gray-900" style={{fontFamily: "'Abhaya Libre', serif"}}>Kerala</h3>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                        <span className="text-gray-900 font-semibold text-lg">4.5</span>
                                    </div>
                                </div>
                                <p className="text-xl font-bold text-gray-900 mb-4" style={{fontFamily: "'Abhaya Libre', serif"}}>₹24,999</p>
                                <ul className="space-y-2 text-sm text-gray-600 mb-6" style={{fontFamily: "'Afacad', sans-serif"}}>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Backwater cruises</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Ayurvedic treatments</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Spice plantation visits</li>
                                </ul>
                                <button 
                                    className="bg-blue-600 text-white px-6 py-3 rounded-full text-base hover:bg-blue-700 hover:scale-105 transition-all shadow-lg hover:shadow-xl w-full" 
                                    style={{fontFamily: "'Afacad', sans-serif"}}
                                    onClick={() => window.location.href = '/application'}
                                >Booking</button>
                            </div>
                        </div>

                        {/* Maldives Card */}
                        <div className="flex-shrink-0 w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="relative">
                                <img src="/maldives.jpg" alt="Maldives" className="object-cover rounded-2xl m-4 w-[calc(100%-2rem)] h-48"/>
                                <div className="absolute top-8 left-8 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                                    Indian Ocean
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xl font-semibold text-gray-900" style={{fontFamily: "'Abhaya Libre', serif"}}>Maldives</h3>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                        <span className="text-gray-900 font-semibold text-lg">4.5</span>
                                    </div>
                                </div>
                                <p className="text-xl font-bold text-gray-900 mb-4" style={{fontFamily: "'Abhaya Libre', serif"}}>₹18,999</p>
                                <ul className="space-y-2 text-sm text-gray-600 mb-6" style={{fontFamily: "'Afacad', sans-serif"}}>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Overwater villas</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Water sports</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Private beaches</li>
                                </ul>
                                <button 
                                    className="bg-blue-600 text-white px-6 py-3 rounded-full text-base hover:bg-blue-700 hover:scale-105 transition-all shadow-lg hover:shadow-xl w-full" 
                                    style={{fontFamily: "'Afacad', sans-serif"}}
                                    onClick={() => window.location.href = '/application'}
                                >Booking</button>
                            </div>
                        </div>

                        {/* Europe Card */}
                        <div className="flex-shrink-0 w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="relative">
                                <img src="/europe.jpg" alt="Europe" className="object-cover rounded-2xl m-4 w-[calc(100%-2rem)] h-48"/>
                                <div className="absolute top-8 left-8 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                                    Europe
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xl font-semibold text-gray-900" style={{fontFamily: "'Abhaya Libre', serif"}}>Europe</h3>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 1l2.5 6.5H19l-5.5 4 2 6.5L10 14l-5.5 4 2-6.5L1 7.5h6.5z"/></svg>
                                        <span className="text-gray-900 font-semibold text-lg">4.5</span>
                                    </div>
                                </div>
                                <p className="text-xl font-bold text-gray-900 mb-4" style={{fontFamily: "'Abhaya Libre', serif"}}>₹47,999</p>
                                <ul className="space-y-2 text-sm text-gray-600 mb-6" style={{fontFamily: "'Afacad', sans-serif"}}>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Historical monuments</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Wine tasting tours</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Scenic train rides</li>
                                </ul>
                                <button 
                                    className="bg-blue-600 text-white px-6 py-3 rounded-full text-base hover:bg-blue-700 hover:scale-105 transition-all shadow-lg hover:shadow-xl w-full" 
                                    style={{fontFamily: "'Afacad', sans-serif"}}
                                    onClick={() => window.location.href = '/application'}
                                >Booking</button>
                            </div>
                        </div>

                        {/* Thailand Card */}
                        <div className="flex-shrink-0 w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="relative">
                                <img src="/thailand.jpg" alt="Thailand" className="object-cover rounded-2xl m-4 w-[calc(100%-2rem)] h-48"/>
                                <div className="absolute top-8 left-8 bg-gray-800 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                                    Southeast Asia
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-xl font-semibold text-gray-900" style={{fontFamily: "'Abhaya Libre', serif"}}>Thailand</h3>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 1l2.5 6.5H19l-5.5 4 2 6.5L10 14l-5.5 4 2-6.5L1 7.5h6.5z"/></svg>
                                        <span className="text-gray-600 font-semibold text-lg">4.5</span>
                                    </div>
                                </div>
                                <p className="text-xl font-bold text-gray-900 mb-4" style={{fontFamily: "'Abhaya Libre', serif"}}>₹35,999</p>
                                <ul className="space-y-2 text-sm text-gray-600 mb-6" style={{fontFamily: "'Afacad', sans-serif"}}>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Island hopping</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Temple visits</li>
                                    <li className="flex items-center gap-2"><span className="text-green-600">✓</span> Street food experiences</li>
                                </ul>
                                <button 
                                    className="bg-blue-600 text-white px-6 py-3 rounded-full text-base hover:bg-blue-700 hover:scale-105 transition-all shadow-lg hover:shadow-xl w-full" 
                                    style={{fontFamily: "'Afacad', sans-serif"}}
                                    onClick={() => window.location.href = '/application'}
                                >Booking</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Explore More Packages Button */}
                <div className="md:hidden mt-12 flex justify-center">
                    <button 
                        className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-2xl" 
                        style={{fontFamily: "'Afacad', sans-serif", boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'}}
                        onClick={() => window.location.href = '/packages'}
                    >Click to Explore More Packages</button>
                </div>

            </section>

            {/* Separator */}
            <div className="w-full max-w-4xl h-0.5 bg-black mx-auto"></div>

            {/* Service Cards Section */}
            <section className="py-20 bg-gray-50 py-12 sm:py-16 md:py-20 overflow-x-hidden">
                <div className="container mx-auto px-4 max-w-full lg:px-12 xl:px-44">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-10 md:gap-12">
                        {/* Left Section - Travel Made Effortless Box */}
                        <div className="lg:w-1/2 w-full">
                            <div id="service-box-section" className={`bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 mb-8 lg:mb-8 transition-all duration-1000 ease-out ${
                                serviceBoxVisible 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-16'
                            }`}>
                                <h2 className="font-bold text-gray-800 font-pethra text-center lg:text-left text-4xl sm:text-4xl md:text-4xl">Travel Made Effortless</h2>
                                <p className="text-lg text-gray-600 text-center lg:text-left text-base sm:text-lg" style={{fontFamily: "'Afacad', sans-serif"}}>
                                    From ticket bookings to luxury transfers, we handle every detail so you can focus on enjoying your journey.
                                </p>
                            </div>
                            
                            {/* Images and All Services Button */}
                            <div className={`grid grid-cols-2 md:grid-cols-2 gap-6 sm:gap-8 transition-all duration-1000 ease-out delay-300 ${
                                serviceBoxVisible 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-16'
                            }`}>
                                <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative">
                                    <img src="/service1.jpg" alt="Scenic Road" className="w-full h-64 sm:h-80 md:h-[32rem] object-cover" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <p className="text-white text-lg sm:text-xl md:text-2xl font-light tracking-wide drop-shadow-lg" style={{fontFamily: "'Playfair Display', serif", textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                                                Rent the best
                                            </p>
                                            <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wider drop-shadow-lg mt-1" style={{fontFamily: "'Playfair Display', serif", textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                                                car for your ride
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative">
                                    <img src="/service2.jpg" alt="Airplane Wing" className="w-full h-64 sm:h-80 md:h-[32rem] object-cover" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <p className="text-white text-lg sm:text-xl md:text-2xl font-light tracking-wide drop-shadow-lg" style={{fontFamily: "'Playfair Display', serif", textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                                                Flight bookings
                                            </p>
                                            <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-wider drop-shadow-lg mt-1" style={{fontFamily: "'Playfair Display', serif", textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                                                made easy
                                            </p>
                                            <p className="text-white text-base sm:text-lg md:text-xl font-medium tracking-wide drop-shadow-lg mt-2" style={{fontFamily: "'Playfair Display', serif", textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                                                with takeoff holidayz
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Service Cards */}
                        <div className={`lg:w-1/2 w-full transition-all duration-1000 ease-out delay-600 ${
                            serviceBoxVisible 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 translate-x-16'
                        }`}>
                            <h3 className="text-3xl font-bold text-black mb-8 font-pethra sm:text-4xl md:text-5xl">Service Cards</h3>
                            <div className="w-44 h-1 bg-blue-600 mt-2 mb-8 w-24 sm:w-32 md:w-44"></div>
                            
                            <div className="space-y-2 sm:space-y-6">
                                {/* Service Card 1 */}
                                <div className="bg-white rounded-2xl shadow-md p-2 sm:p-6 flex items-center space-x-2 sm:space-x-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 sm:p-3 group-hover:bg-blue-200 transition-colors duration-300">
                                        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/></svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm sm:text-xl font-semibold text-gray-800 mb-0.5 sm:mb-2 group-hover:text-blue-600 transition-colors duration-300">Flight Booking</h4>
                                        <p className="text-gray-600 text-xs sm:text-base">Affordable flights with flexible options.</p>
                                    </div>
                                </div>

                                {/* Service Card 2 */}
                                <div className="bg-white rounded-2xl shadow-md p-2 sm:p-6 flex items-center space-x-2 sm:space-x-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                                    <div className="bg-green-100 text-green-600 rounded-full p-1 sm:p-3 group-hover:bg-green-200 transition-colors duration-300">
                                        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm sm:text-xl font-semibold text-gray-800 mb-0.5 sm:mb-2 group-hover:text-green-600 transition-colors duration-300">Rail & Bus Tickets</h4>
                                        <p className="text-gray-600 text-xs sm:text-base">Smooth domestic travel arrangements.</p>
                                    </div>
                                </div>

                                {/* Service Card 3 */}
                                <div className="bg-white rounded-2xl shadow-md p-2 sm:p-6 flex items-center space-x-2 sm:space-x-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                                    <div className="bg-purple-100 text-purple-600 rounded-full p-1 sm:p-3 group-hover:bg-purple-200 transition-colors duration-300">
                                        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m0 0v8m0-8l-8 8m8-8l8 8"/></svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm sm:text-xl font-semibold text-gray-800 mb-0.5 sm:mb-2 group-hover:text-purple-600 transition-colors duration-300">Premium Transfers</h4>
                                        <p className="text-gray-600 text-xs sm:text-base">Comfortable taxi and private transport.</p>
                                    </div>
                                </div>

                                {/* Service Card 4 */}
                                <div className="bg-white rounded-2xl shadow-md p-2 sm:p-6 flex items-center space-x-2 sm:space-x-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                                    <div className="bg-orange-100 text-orange-600 rounded-full p-1 sm:p-3 group-hover:bg-orange-200 transition-colors duration-300">
                                        <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm sm:text-xl font-semibold text-gray-800 mb-0.5 sm:mb-2 group-hover:text-orange-600 transition-colors duration-300">Hotel Reservations</h4>
                                        <p className="text-gray-600 text-xs sm:text-base">Best accommodations for your stay.</p>
                                    </div>
                                </div>

                        </div>

                        <button 
                            className="bg-blue-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 w-full lg:w-auto mt-8 sm:mt-12 shadow-lg hover:shadow-xl" 
                            style={{fontFamily: "'Afacad', sans-serif"}}
                            onClick={() => window.location.href = '/services'}
                        >
                                All Services....
                        </button>

                    </div>
                        
                        
                    </div>
                </div>
            </section>

            {/* Separator */}
            <div className="w-full max-w-4xl h-0.5 bg-black mx-auto"></div>

            {/* Customization Section */}
            <section id="customization-section" className="py-20 bg-white py-12 sm:py-16 md:py-20 overflow-x-hidden">
                <div className="container mx-auto px-4 max-w-full lg:px-12 xl:px-44">
                    <div className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-12 transition-all duration-1000 ease-out ${
                        customizationVisible 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-32'
                    }`}>
                        {/* Left Section - Content */}
                        <div className="lg:w-1/2 w-full">
                            <p className="text-lg text-gray-500 mb-4 sm:mb-6" style={{fontFamily: "'Afacad', sans-serif"}}>Highlight</p>
                            <h2 className="font-normal text-black mb-3 font-pethra text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">Every Journey, Perfectly Planned</h2>
                            <div className="w-64 h-1 bg-blue-600 mt-2 mb-8 sm:mb-10 md:mb-12 w-40 sm:w-40 md:w-48 lg:w-56 xl:w-64"></div>
                            <p className="text-gray-600 mb-8 sm:mb-8 text-base sm:text-lg md:text-xl" style={{fontFamily: "'Afacad', sans-serif"}}>
                                Whether it's a relaxing vacation or an adventurous getaway, we craft travel experiences tailored to you.
                            </p>
                            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 text-sm sm:text-base">Personalized travel planning</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 text-sm sm:text-base">Flexible booking options</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 text-sm sm:text-base">Expert travel consultation</p>
                                </div>
                            </div>
                            <button 
                                className="bg-blue-600 text-white px-8 py-4 text-lg sm:px-8 sm:py-3 sm:text-lg hover:bg-blue-700 transition-all duration-300 rounded-full shadow-lg" 
                                style={{fontFamily: "'Afacad', sans-serif"}}
                                onClick={() => window.location.href = '/application'}
                            >
                                Customize My Trip
                            </button>
                        </div>

                        {/* Right Section - Image */}
                        <div className="lg:w-1/2 w-full">
                            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                                <img src="/customize.jpg" alt="Customization" className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Separator */}
            <div className="w-full max-w-4xl h-0.5 bg-black mx-auto"></div>

            {/* Adventure Section */}
            <section id="adventure-section" className="py-20 bg-white py-12 sm:py-16 md:py-20 overflow-x-hidden">
                <div className="container mx-auto px-4 max-w-full lg:px-8 xl:px-12">
                    <div className="flex justify-center">
                        {/* Right Section - Content */}
                        <div className={`lg:w-3/4 text-center w-full max-w-4xl transition-all duration-1000 ease-out ${
                            adventureVisible 
                                ? 'opacity-100 translate-y-0' 
                                : 'opacity-0 translate-y-16'
                        }`}>
                            <h2 className="text-6xl font-bold text-black mb-3 font-pethra text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Ready for Your Next Adventure?</h2>
                            <div className="w-44 h-1 bg-blue-600 mt-2 mb-6 sm:mb-8 md:mb-10 w-24 sm:w-32 md:w-40 lg:w-44"></div>
                            <p className="text-gray-600 mb-8 sm:mb-10 md:mb-12 text-base sm:text-lg md:text-xl" style={{fontFamily: "'Afacad', sans-serif"}}>
                                Let our travel experts design your perfect holiday today.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                                {/* Left Contact Box */}
                                <div className={`bg-gray-50 rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group delay-300 ${
                                    adventureVisible 
                                        ? 'opacity-100 translate-x-0' 
                                        : 'opacity-0 -translate-x-16'
                                }`}>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 font-pethra text-lg sm:text-xl md:text-2xl group-hover:text-blue-600 transition-colors duration-300">Contact Us</h3>
                                    <p className="text-gray-600 mb-4 text-sm sm:text-base" style={{fontFamily: "'Afacad', sans-serif"}}>
                                        Get expert advice for your next journey
                                    </p>
                                    <button 
                                        className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base group-hover:scale-110 transform" 
                                        style={{fontFamily: "'Afacad', sans-serif"}}
                                        onClick={() => window.location.href = '/contact'}
                                    >
                                       Click to Contact Us
                                    </button>
                                </div>
                                {/* Right Contact Box */}
                                <div className={`bg-gray-50 rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group delay-500 ${
                                    adventureVisible 
                                        ? 'opacity-100 translate-x-0' 
                                        : 'opacity-0 translate-x-16'
                                }`}>
                                    <h3 className="text-3xl font-semibold text-gray-800 mb-4 font-pethra text-lg sm:text-xl md:text-2xl lg:text-3xl group-hover:text-green-600 transition-colors duration-300">Customise Trips and Clear the Doubts</h3>
                                    <p className="text-gray-600 mb-4 text-sm sm:text-base" style={{fontFamily: "'Afacad', sans-serif"}}>
                                        Start planning your dream vacation
                                    </p>
                                    <button 
                                        className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-green-700 transition-all duration-300 text-sm sm:text-base group-hover:scale-110 transform" 
                                        style={{fontFamily: "'Afacad', sans-serif"}}
                                        onClick={() => window.location.href = '/contact'}
                                    >
                                        Get Free Consultation
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </div>
    )
}
export default Home