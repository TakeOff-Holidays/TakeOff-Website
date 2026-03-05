import React, { useState, useEffect, useRef } from 'react'

const About = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [whatWeDoVisible, setWhatWeDoVisible] = useState(false);
    const [accessibilityVisible, setAccessibilityVisible] = useState(false);
    const [commitmentVisible, setCommitmentVisible] = useState(false);
    const [imageVisible, setImageVisible] = useState(false);
    const [journeyTextVisible, setJourneyTextVisible] = useState(false);
    const [founderNoteVisible, setFounderNoteVisible] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    
    const whatWeDoRef = useRef(null);
    const accessibilityRef = useRef(null);
    const commitmentRef = useRef(null);
    const imageRef = useRef(null);
    const journeyRef = useRef(null);
    const founderNoteRef = useRef(null);
    
    const journeyText = "We turn every journey into a smooth, joyful experience — where comfort meets adventure and every trip becomes a story filled with beautiful memories.";
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1300); // Start after 1 second loading + 300ms buffer
        
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target === whatWeDoRef.current) {
                            setWhatWeDoVisible(true);
                        } else if (entry.target === accessibilityRef.current) {
                            setAccessibilityVisible(true);
                        } else if (entry.target === commitmentRef.current) {
                            setCommitmentVisible(true);
                        } else if (entry.target === imageRef.current) {
                            setImageVisible(true);
                        } else if (entry.target === journeyRef.current) {
                            setJourneyTextVisible(true);
                        } else if (entry.target === founderNoteRef.current) {
                            setFounderNoteVisible(true);
                        }
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of element is visible
                rootMargin: '0px 0px -50px 0px' // Start slightly before element comes into view
            }
        );
        
        if (whatWeDoRef.current) {
            observer.observe(whatWeDoRef.current);
        }
        if (accessibilityRef.current) {
            observer.observe(accessibilityRef.current);
        }
        if (commitmentRef.current) {
            observer.observe(commitmentRef.current);
        }
        if (imageRef.current) {
            observer.observe(imageRef.current);
        }
        if (journeyRef.current) {
            observer.observe(journeyRef.current);
        }
        if (founderNoteRef.current) {
            observer.observe(founderNoteRef.current);
        }
        
        return () => {
            clearTimeout(timer);
            if (whatWeDoRef.current) observer.unobserve(whatWeDoRef.current);
            if (accessibilityRef.current) observer.unobserve(accessibilityRef.current);
            if (commitmentRef.current) observer.unobserve(commitmentRef.current);
            if (imageRef.current) observer.unobserve(imageRef.current);
            if (journeyRef.current) observer.unobserve(journeyRef.current);
            if (founderNoteRef.current) observer.unobserve(founderNoteRef.current);
        };
    }, []);
    
    // Typing animation effect
    useEffect(() => {
        if (journeyTextVisible && displayedText.length < journeyText.length) {
            const timer = setTimeout(() => {
                setDisplayedText(journeyText.slice(0, displayedText.length + 1));
            }, 30); // Type speed: 30ms per character
            
            return () => clearTimeout(timer);
        }
    }, [journeyTextVisible, displayedText]);
    
    return (
        <div>
            {/* Hero Section */}
            <section className="relative w-full h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage:'url(/about.webp)'}}>
                <div className="absolute inset-0 bg-black/0 flex items-center justify-center px-4">
                    <div className={`absolute bg-black bg-opacity-20 backdrop-blur-md rounded-3xl p-4 sm:p-6 md:p-8 text-white max-w-7xl w-[90%] sm:w-[80%] md:w-[60%] text-center transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                        <h1 className="font-pethra mx-auto" style={{fontSize: 'clamp(3rem, 10vw, 150px)'}}>About Us</h1>
                        <div className="w-[200px] sm:w-[300px] md:w-[380px] h-[2px] bg-white mx-auto mt-0"></div>
                    </div>
                    <div className="w-40 h-[1px] bg-white mx-auto mt-4"></div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* First Row - What We Do */}
                        <div ref={whatWeDoRef} className={`transition-all duration-1000 ease-out ${
                            whatWeDoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-3 sm:mb-4" style={{fontFamily: "'Abhaya Libre', serif"}}>What We Do?</h2>
                            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-3 sm:mb-4 leading-relaxed" style={{fontFamily: "'Afacad', sans-serif"}}>
                                We deliver complete travel and tourism services including flight, bus, and railway ticket booking, 
                                hotel and resort reservations, holiday tour packages, and visa assistance. Our goal is to provide 
                                reliable, affordable, and well-planned travel solutions for individuals, families, and corporate clients. </p>
                            
                            {/* Three Points */}
                            <div className="space-y-4 mt-6">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                                    <p className="text-gray-700 text-lg sm:text-xl md:text-2xl font-semibold" style={{fontFamily: "'Afacad', sans-serif"}}>
                                        Comprehensive travel services from booking to documentation
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                                    <p className="text-gray-700 text-lg sm:text-xl md:text-2xl font-semibold" style={{fontFamily: "'Afacad', sans-serif"}}>
                                        Affordable solutions for individuals, families, and corporate clients
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                                    <p className="text-gray-700 text-lg sm:text-xl md:text-2xl font-semibold" style={{fontFamily: "'Afacad', sans-serif"}}>
                                        Reliable and well-planned travel experiences
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* First Row - Image */}
                        <div ref={imageRef} className={`flex items-center justify-center transition-all duration-1000 ease-out ${
                            imageVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                            <div className="bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                                <img src="Welcome-to-Travel-Moments-Homepage.webp" alt="Airplane Wing" className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover" loading="lazy"/>
                            </div>
                        </div>

                        {/* Second Row - Accessibility */}
                        <div ref={accessibilityRef} className={`transition-all duration-1000 ease-out ${
                            accessibilityVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-3 sm:mb-4" style={{fontFamily: "'Abhaya Libre', serif"}}>Accessibility</h2>                     
                           <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-3 sm:mb-4 leading-relaxed" style={{fontFamily: "'Afacad', sans-serif"}}>
                                Our travel services are designed to be simple, fast, and easily accessible. With responsive customer support and streamlined booking processes, we ensure travelers can plan trips conveniently anytime, anywhere.
                            </p>
                        </div>

                        {/* Second Row - Our Promise */}
                        <div ref={commitmentRef} className={`transition-all duration-1000 ease-out ${
                            commitmentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-3 sm:mb-4" style={{fontFamily: "'Abhaya Libre', serif"}}>Our Promise</h2>
                            <p className="text-gray-600 mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl font-semibold" style={{fontFamily: "'Afacad', sans-serif"}}>
                                Transparency. Comfort. Reliability.
                            </p>
                            <p className="text-gray-600 mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl" style={{fontFamily: "'Afacad', sans-serif"}}>
                                We don't just plan trips — we craft timeless travel experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Separator */}
            <div className="w-full max-w-4xl h-0.5 bg-black mx-auto"></div>

            
            {/* Separator */}
            <div className="w-full max-w-4xl h-0.5 bg-black mx-auto"></div>

            {/* Why Choose Us Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4" style={{fontFamily: "'Abhaya Libre', serif"}}>Why Choose Us</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        <div className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Travel Planning</h3>
                                    <p className="text-gray-600">We design tailor-made travel experiences based on your preferences, budget, and expectations — ensuring every journey is unique and memorable.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Trusted Expertise & Professional Service</h3>
                                    <p className="text-gray-600">With industry experience and strong global partnerships, we deliver seamless planning, transparent pricing, and reliable service from start to finish.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-2a1 1 0 100 2h.01a1 1 0 100-2H16z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">End-to-End Travel Management</h3>
                                    <p className="text-gray-600">From flights and accommodation to transfers and sightseeing, we handle every detail so you can travel stress-free.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Customer Support</h3>
                                    <p className="text-gray-600">Our dedicated team is always available to assist you before, during, and after your trip, ensuring complete peace of mind.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Separator */}
            <div className="w-full max-w-4xl h-0.5 bg-black mx-auto"></div>

            {/* Founder Note Section */}
            <section ref={founderNoteRef} className={`py-12 sm:py-16 md:py-20 bg-white transition-all duration-1000 ease-out ${
                founderNoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4" style={{fontFamily: "'Abhaya Libre', serif"}}>Founder's Note</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Side - Image */}
                        <div className="order-2 lg:order-1">
                            <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-xl">
                                <img src="/founder.jpg" alt="Founder of TakeOff Holidays" className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover" loading="lazy"/>
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="order-1 lg:order-2 space-y-6">
                            {/* Company Description */}
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4" style={{fontFamily: "'Abhaya Libre', serif"}}>Our Journey</h3>
                                <p className="text-gray-600 text-lg leading-relaxed" style={{fontFamily: "'Afacad', sans-serif"}}>
                                    TakeOff Holidays has been a trusted name in the travel industry for over a decade, providing comprehensive travel solutions that cater to diverse needs. From flight bookings to complete holiday packages, we've helped thousands of travelers create unforgettable memories across domestic and international destinations.
                                </p>
                            </div>

                            {/* Founder's Words */}
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4" style={{fontFamily: "'Abhaya Libre', serif"}}>A Message from Our Founder</h3>
                                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                                    <p className="text-gray-700 text-lg leading-relaxed italic" style={{fontFamily: "'Afacad', sans-serif"}}>
                                        "Travel is not just about reaching destinations; it's about the experiences that transform us. When I started TakeOff Holidays, my vision was simple: to make travel accessible, enjoyable, and memorable for everyone. Every journey we plan is a story waiting to unfold, and we're here to ensure each story is perfect."
                                    </p>
                                    <div className="mt-6">
                                        <p className="text-xl font-semibold text-gray-800">Founder & CEO</p>
                                        <p className="text-gray-600">TakeOff Holidays</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Separator */}
            <div className="w-full max-w-4xl h-0.5 bg-black mx-auto"></div>

            {/* Final Journey Section */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-2xl sm:max-w-3xl mx-auto">
                        We turn every journey into a smooth, joyful experience — where comfort meets adventure and every trip becomes a story filled with beautiful memories.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <a href="/packages" className="group bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold flex items-center space-x-2 hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-xl w-full sm:w-64 justify-center">
                            <span className="transition-transform duration-300 group-hover:translate-x-1">PACKAGES</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="/contact" className="group bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold flex items-center space-x-2 hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-xl w-full sm:w-64 justify-center">
                            <span className="transition-transform duration-300 group-hover:translate-x-1">CONTACT US</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:-rotate-45" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            
        </div>
    )
}

export default About