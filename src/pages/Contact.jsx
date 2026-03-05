import React, { useState, useEffect } from 'react'
import Application from './Application'

const Contact = () => {
    const [typedText, setTypedText] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [materialsVisible, setMaterialsVisible] = useState(false);
    const fullText = "Have questions or planning your next trip? Our travel experts are here to help. Contact us for ticket bookings, holiday packages, visa assistance, and complete travel support. We're committed to providing quick responses and reliable service to make your journey smooth and stress-free.";

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        const targetElement = document.getElementById('contact-description');
        if (targetElement) {
            observer.observe(targetElement);
        }

        return () => {
            if (targetElement) {
                observer.unobserve(targetElement);
            }
        };
    }, []);

    useEffect(() => {
        const materialsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setMaterialsVisible(true);
                        materialsObserver.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        const materialsElement = document.getElementById('contact-materials');
        if (materialsElement) {
            materialsObserver.observe(materialsElement);
        }

        return () => {
            if (materialsElement) {
                materialsObserver.unobserve(materialsElement);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 30);

        return () => clearInterval(typingInterval);
    }, [isVisible]);

    return (
        <div>
            {/* Hero Image Box */}
            <section className="pt-24 pb-12 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28">
                <div className="w-full">
                    <div className="bg-cover bg-center bg-no-repeat rounded-3xl overflow-hidden shadow-2xl relative h-[180px] sm:h-[350px] md:h-[500px] lg:h-[700px] min-h-[180px] sm:min-h-[350px] md:min-h-[500px] lg:min-h-[700px] max-h-[700px] sm:max-h-[350px] md:max-h-[500px] lg:max-h-[700px]" style={{backgroundImage: 'url(/contactus.jpg)'}}>
                        <div className="absolute inset-0 bg-black/0 flex items-center justify-center px-4">
                            <div className="absolute bg-black bg-opacity-20 backdrop-blur-md rounded-3xl p-4 sm:p-6 md:p-8 text-white max-w-7xl w-[90%] sm:w-[80%] md:w-[60%] text-center transition-all duration-1000 ease-out opacity-100 translate-y-0">
                                <h1 className="font-pethra mx-auto" style={{fontSize: 'clamp(3rem, 10vw, 150px)'}}>Contact Us</h1>
                                <div className="w-[200px] sm:w-[300px] md:w-[380px] h-[2px] bg-white mx-auto mt-0"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <Application />

            {/* Contact Information */}
             <section className="py-5 sm:py-5 md:py-5 space-y-8 sm:space-y-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div>
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl text-black mb-2 text-center" style={{fontFamily: "'Abhaya Libre', serif"}}>Contact Information</h3>
                                    <div className="w-24 sm:w-32 md:w-44 h-1 bg-blue-600 mb-6 sm:mb-8 mx-auto"></div>
                            </div>

                                {/* Contact Description */}
                                <div className="w-full mx-auto mb-12 sm:mb-16 md:mb-24 px-4">
                                    <p id="contact-description" className="text-lg sm:text-xl md:text-2xl text-gray-600 text-center leading-relaxed max-w-4xl mx-auto" style={{fontFamily: "'Afacad', sans-serif"}}>
                                        {typedText}
                                        <span className="inline-block w-1 h-6 bg-gray-600 ml-1 animate-pulse"></span>
                                    </p>
                                </div>

                                {/* Office Address Box - Full Width */}
                                <div id="contact-materials" className="mb-6 px-4">
                                    <div className={`bg-blue-50 border border-blue-200 rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 ease-out cursor-pointer ${
                                        materialsVisible 
                                            ? 'opacity-100 transform scale-100' 
                                            : 'opacity-0 transform scale-50'
                                    }`}>
                                        <div className="text-center space-y-4">
                                            <div className="bg-blue-100 text-blue-600 rounded-full p-3 sm:p-4 inline-flex hover:bg-blue-200 hover:rotate-12 transition-all duration-300">
                                                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-4 text-xl sm:text-2xl hover:text-blue-700 transition-colors duration-300" style={{fontFamily: "'Afacad', sans-serif"}}>Office Addresses</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-600 text-sm sm:text-base" style={{fontFamily: "'Afacad', sans-serif"}}>
                                                    <div className="hover:bg-white hover:rounded-lg hover:p-4 hover:shadow-md transition-all duration-300 -m-4 p-4">
                                                        <h5 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-300">Main Office</h5>
                                                        <p className="hover:text-gray-800 transition-colors duration-300">
                                                            DD VYAPAR BHAVAN<br />
                                                            KP VALLON ROAD<br />
                                                            KADAVANTHARA, KOCHI - 682020<br />
                                                            KERALA, INDIA
                                                        </p>
                                                    </div>
                                                    <div className="hover:bg-white hover:rounded-lg hover:p-4 hover:shadow-md transition-all duration-300 -m-4 p-4">
                                                        <h5 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-300">Branch Office 1</h5>
                                                        <p className="hover:text-gray-800 transition-colors duration-300">
                                                            ALHAM BUILDING<br />
                                                            MANGARAM, MUTTAR<br />
                                                            PANDALAM, PATHANAMTHITTA -689501<br />
                                                            KERALA, INDIA
                                                        </p>
                                                    </div>
                                                    <div className="hover:bg-white hover:rounded-lg hover:p-4 hover:shadow-md transition-all duration-300 -m-4 p-4">
                                                        <h5 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-300">Branch Office 2</h5>
                                                        <p className="hover:text-gray-800 transition-colors duration-300">
                                                            106, LISTER COURT A <br />
                                                            NIGHTINGALE AVENUE <br />
                                                            HARROW, MIDDLESEX<br />
                                                            UNITED KINGDOM , PO- HA1 3GJ
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Other Contact Information */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
                                    <div className={`bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 ease-out cursor-pointer ${
                                        materialsVisible 
                                            ? 'opacity-100 transform scale-100' 
                                            : 'opacity-0 transform scale-50'
                                    }`}>
                                        <div className="flex flex-col items-center text-center space-y-3">
                                            <div className="bg-green-100 text-green-600 rounded-full p-2 sm:p-3 flex-shrink-0 hover:bg-green-200 hover:rotate-12 transition-all duration-300">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg hover:text-green-700 transition-colors duration-300" style={{fontFamily: "'Afacad', sans-serif"}}>Phone Numbers</h4>
                                                <p className="text-gray-600 text-sm sm:text-base hover:text-gray-800 transition-colors duration-300" style={{fontFamily: "'Afacad', sans-serif"}}>
                                                    +91 812 902 3279 (WHATSAPP)<br />
                                                    +91 977 878 3291<br />
                                                    +91 859 078 3291<br />
                                                    +91 484 351 2226
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 ease-out cursor-pointer ${
                                        materialsVisible 
                                            ? 'opacity-100 transform scale-100' 
                                            : 'opacity-0 transform scale-50'
                                    }`}>
                                        <div className="flex flex-col items-center text-center space-y-3">
                                            <div className="bg-purple-100 text-purple-600 rounded-full p-2 sm:p-3 flex-shrink-0 hover:bg-purple-200 hover:rotate-12 transition-all duration-300">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg hover:text-purple-700 transition-colors duration-300" style={{fontFamily: "'Afacad', sans-serif"}}>Email Address</h4>
                                                <p className="text-gray-600 text-sm sm:text-base hover:text-gray-800 transition-colors duration-300" style={{fontFamily: "'Afacad', sans-serif"}}>
                                                    support.cok@takeoffholidayz.in<br />
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 ease-out cursor-pointer ${
                                        materialsVisible 
                                            ? 'opacity-100 transform scale-100' 
                                            : 'opacity-0 transform scale-50'
                                    }`}>
                                        <div className="flex flex-col items-center text-center space-y-3">
                                            <div className="bg-orange-100 text-orange-600 rounded-full p-2 sm:p-3 flex-shrink-0 hover:bg-orange-200 hover:rotate-12 transition-all duration-300">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg hover:text-orange-700 transition-colors duration-300" style={{fontFamily: "'Afacad', sans-serif"}}>Business Hours</h4>
                                                <p className="text-gray-600 text-sm sm:text-base hover:text-gray-800 transition-colors duration-300" style={{fontFamily: "'Afacad', sans-serif"}}>
                                                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                                                    Saturday: 9:00 AM - 6:00 PM<br />
                                                    Sunday: Closed ( Can contact through WhatsApp or Call)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mt-8 px-4 mb-12 sm:mb-16">
                                    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg">
                                        <div className="h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8414758398!2d76.267304514795!3d9.967375892915447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d5d0f88c5c5%3A0x0!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1234567890&output=embed&z=18&layer=t&maptype=satellite"
                                                width="100%"
                                                height="100%"
                                                style={{border: 0}}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="rounded-lg"
                                                title="TakeOff Holidays Location - Kochi, Kerala (Satellite View)"
                                            ></iframe>
                                        </div>
                                        <div className="mt-4 text-center">
                                            <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2" style={{fontFamily: "'Afacad', sans-serif"}}>
                                                Visit Our Office
                                            </h4>
                                            <p className="text-gray-600 text-sm sm:text-base" style={{fontFamily: "'Afacad', sans-serif"}}>
                                                DD VYAPAR BHAVAN, KP VALLON ROAD, KADAVANTHRA, KOCHI - 682 020
                                            </p>
                                            <a 
                                                href="https://maps.app.goo.gl/e8Xq23jT8yuk9gtg9" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-block mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base underline"
                                                style={{fontFamily: "'Afacad', sans-serif"}}
                                            >
                                                View on Google Maps →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </section>

        </div>
    )
}

export default Contact
