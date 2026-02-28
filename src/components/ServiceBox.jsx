import React, { useState, useEffect, useRef } from 'react';

const ServiceBox = ({ icon, title, description }) => {
    const [isCentered, setIsCentered] = useState(false);
    const boxRef = useRef(null);
    
    useEffect(() => {
        const handleScroll = () => {
            if (boxRef.current) {
                const rect = boxRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const boxCenter = rect.top + rect.height / 2;
                const viewportCenter = viewportHeight / 2;
                
                // Adjust threshold based on screen size
                const isMobile = window.innerWidth < 768;
                const threshold = isMobile ? 150 : 200;
                
                // Check if box center is within threshold of viewport center
                const isNearCenter = Math.abs(boxCenter - viewportCenter) < threshold;
                setIsCentered(isNearCenter);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll(); // Check initial position
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);
    
    return (
        <div 
            ref={boxRef}
            className={`bg-gradient-to-b rounded-3xl shadow-lg p-6 flex flex-col w-full max-w-[22rem] h-48 transform transition-all duration-700 ease-out cursor-pointer relative overflow-hidden ${
                isCentered 
                    ? 'from-[#6BB6E8] to-[#E8F4FF] scale-102 md:scale-105 shadow-3xl z-20 -translate-y-2 ring-4 ring-blue-300 ring-opacity-50' 
                    : 'from-[#8BD2FB] to-[#F3FAFF] scale-100 shadow-lg translate-y-0'
            }`}
        >
            <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex justify-center mr-4 flex-shrink-0 pt-2">
                    {title === "Kerala Special Packages" ? (
                      <img src="./kerala-tourism.svg" className="w-8 h-8 object-cover" alt="Kerala" />
                    ) : title === "Corporate Travel & Events" ? (
                      <div className="w-8 h-8" dangerouslySetInnerHTML={{__html: icon}} />
                    ) : title === "Destination Wedding" ? (
                      <div className="w-8 h-8" dangerouslySetInnerHTML={{__html: icon}} />
                    ) : title === "Celebrity Eventz" ? (
                      <div className="w-8 h-8" dangerouslySetInnerHTML={{__html: icon}} />
                    ) : title === "Cruise (Domestic & International)" ? (
                      <div className="w-8 h-8" dangerouslySetInnerHTML={{__html: icon}} />
                    ) : title === "School/College Tour" ? (
                      <div className="w-8 h-8" dangerouslySetInnerHTML={{__html: icon}} />
                    ) : title === "Forex" ? (
                      <div className="w-8 h-8" dangerouslySetInnerHTML={{__html: icon}} />
                    ) : title === "International Sim" ? (
                      <div className="w-8 h-8" dangerouslySetInnerHTML={{__html: icon}} />
                    ) : title === "Airport Assistance" ? (
                      <div className="w-8 h-8" dangerouslySetInnerHTML={{__html: icon}} />
                    ) : title === "Helicopter Services" ? (
                      <div className="w-12 h-12" dangerouslySetInnerHTML={{__html: icon}} />
                    ) : (
                      <svg className="w-8 h-8" fill="url(#gradient)" viewBox={title === "Schengen Visa Services" ? "0 0 640 576" : title === "Visa Stamping Support" ? "0 0 129 129" : title === "Document Attestation" ? "0 0 32 32" : title === "Travel Insurance" ? "0 0 64 64" : title === "Health Insurance" ? "0 0 1024 1024" : "0 0 24 24"}>
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#7ECFFE"/>
                            <stop offset="100%" stopColor="#000000"/>
                          </linearGradient>
                        </defs>
                        <path d={icon}/>
                      </svg>
                    )}
                </div>
                <h3 className="text-xl font-bold text-black underline flex-1" style={{fontFamily: "'Afacad', sans-serif"}}>{title}</h3>
            </div>
            <p className="text-black text-sm text-left" style={{fontFamily: "'Afacad', sans-serif"}}>{description}</p>
        </div>
    );
};

export default ServiceBox;