import React, { useState, useEffect } from 'react';

const CustomerReview = () => {
    const [reviewsVisible, setReviewsVisible] = useState(false);
    const [reviewIndex, setReviewIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setReviewIndex((prevIndex) => {
                if (isMobile) {
                    return (prevIndex + 1) % 8;
                } else if (isTablet) {
                    return (prevIndex + 1) % 4;
                } else {
                    return (prevIndex + 1) % 6;
                }
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [isMobile, isTablet]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setReviewsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        const targetElement = document.getElementById('reviews-section');
        if (targetElement) {
            observer.observe(targetElement);
        }

        return () => {
            if (targetElement) {
                observer.unobserve(targetElement);
            }
        };
    }, []);

    const reviews = [
        {
            initial: 'B',
            name: 'Balasaheb Bhaga',
            rating: 5,
            comment: "Completely trustworthy. Dealing with him just over whats app. Have been getting mine and all family visas for UAE for past 3 years from him. No even single hiccups."
        },
        {
            initial: 'S',
            name: 'Sara Boban',
            rating: 5,
            comment: "the service was smooth and stress free. I’m very satisfied and would definitely recommend Takeoff Holidays to anyone looking for reliable travel assistance."
        },
        {
            initial: 'L',
            name: 'lipin lg',
            rating: 5,
            comment: "I had an amazing experience with Mr.Shibin at Takeoff Holidays.They crafted a perfect itinerary, handled all bookings seamlessly, and stayed in constant communication. Even a minor issue during the trip was resolved quickly and professionally. Their attention to detail and care made my vacation stress-free and unforgettable. Highly recommend for anyone seeking top-notch travel service!"
        },
        {
            initial: 'S',
            name: 'Susanth alappatt john',
            rating: 5,
            comment: "I used to book tickets through this agency and I’m so pleased with entire experience. From start to finish Mr. Shibin went above and beyond to ensure that every aspects of my trip was seamless and stress free. I highly recommend Take off holidays for anyone to book a trip."
        },
        {
            initial: 'P',
            name: 'preethu pradeep',
            rating: 5,
            comment: "Good service. One of the best travel agency i can suggest, will get the response immediately .i am completely impressed with their professionalism and customer service, especially Shibin bro is extremely helpful. Highly recommend this agency to all."
        },
        {
            initial: 'R',
            name: 'Gg Bb',
            rating: 5,
            comment: "Booked thailand package for 4 days. It was a great experience. No hidden charges. All rates were mentioned clearly. Shibin was available at anytime to clarify any questions.\nIn Thailand all travel was taken care as part of package. Hotel which was given was very nice.\n\nOverall a good reliable agency .thank you."
        },
        {
            initial: 'E',
            name: 'the Don',
            rating: 5,
            comment: "My priority travel agency....Very knowledgeable team....Quick response, suitable recommendations and budgetary offers..  One stop for all my travel needs....Highly recommendable.....Well Done Take Off .... Keep it up."
        },
        {
            initial: 'D',
            name: 'manu ghosh',
            rating: 5,
            comment: "Takeoff made my travel planning effortless and enjoyable. Highly knowledgeable and attentive, they tailored everything to my preferences perfectly. Highly recommend for a stress-free and memorable trip.\n\nThank you!"
        }
    ];

    const getTransformValue = () => {
        if (isMobile) {
            return `translateX(-${reviewIndex * 100}%)`;
        } else if (isTablet) {
            return `translateX(-${reviewIndex * 50}%)`;
        } else {
            return `translateX(-${reviewIndex * 33.333}%)`;
        }
    };

    const getReviewWidth = () => {
        if (isMobile) {
            return 'w-full';
        } else if (isTablet) {
            return 'w-1/2';
        } else {
            return 'w-1/3';
        }
    };

    return (
        <section id="reviews-section" className="w-full lg:px-32 xl:px-40 2xl:px-56 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 bg-gray-50">
            <div className={`text-center mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 ease-out delay-600 ${reviewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`} style={{transitionDelay: reviewsVisible ? '0.2s' : '0s'}}>
                <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black font-pethra">What Our Customers Say</h2>
                <div className="w-16 sm:w-20 md:w-24 h-1 bg-blue-600 mt-2 mx-auto"></div>
            </div>
            <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: getTransformValue() }}>
                    {reviews.map((review, index) => (
                        <div key={index} className={`flex-shrink-0 ${getReviewWidth()} px-2 sm:px-3`}>
                            <div className={`bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6 transition-all duration-1000 ease-out h-full ${reviewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`} style={{transitionDelay: reviewsVisible ? `${0.3 + index * 0.1}s` : '0s'}}>
                                <div className="flex items-center mb-3 sm:mb-4">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center mr-2 font-bold text-sm sm:text-base">
                                        {review.initial}
                                    </div>
                                    <div className="flex text-yellow-400 text-xs sm:text-sm">
                                        {'★'.repeat(review.rating)}
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">"{review.comment}"</p>
                                <p className="text-gray-900 font-semibold text-sm sm:text-base">- {review.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Navigation dots for mobile */}
            {isMobile && (
                <div className="flex justify-center mt-6 space-x-2">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${reviewIndex === index ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
                            onClick={() => setReviewIndex(index)}
                        />
                    ))}
                </div>
            )}

            {/* Navigation dots for tablet */}
            {isTablet && (
                <div className="flex justify-center mt-6 space-x-2">
                    {[0, 1, 2, 3].map((index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${reviewIndex === index ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
                            onClick={() => setReviewIndex(index)}
                        />
                    ))}
                </div>
            )}

            {/* Navigation dots for desktop */}
            {!isMobile && !isTablet && (
                <div className="flex justify-center mt-6 space-x-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${reviewIndex === index ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
                            onClick={() => setReviewIndex(index)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default CustomerReview;
