import React, { useState, useEffect } from 'react'

const Application = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        services: '',
        message: '',
        remarks: ''
    });

    const [typedText, setTypedText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const fullText = "Fill out our quick application form and let our team handle the planning for a smooth and hassle-free travel experience.";

    useEffect(() => {
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
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            // Create email content
            const emailContent = {
                to: 'osspdm@gmail.com',
                subject: `New Travel Application from ${formData.name}`,
                body: `
                    <h2>New Travel Application Received</h2>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <p><strong>Phone:</strong> ${formData.phone}</p>
                    <p><strong>Services we provide:</strong> ${formData.services}</p>
                    <p><strong>Messages:</strong> ${formData.message}</p>
                    <p><strong>Remarks:</strong> ${formData.remarks}</p>
                    <hr>
                    <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
                `
            };

            // Send email using mailto link (fallback option)
            const mailtoLink = `mailto:${emailContent.to}?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.body.replace(/<[^>]*>/g, ''))}`;
            window.location.href = mailtoLink;

            setSubmitStatus('success');
            
            // Reset form after successful submission
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    services: '',
                    message: '',
                    remarks: ''
                });
                setSubmitStatus('');
            }, 3000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="application" className="py-16 sm:py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl text-black mb-2" style={{fontFamily: "'Abhaya Libre', serif"}}>Start Your Travel Application</h2>
                        <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto mb-3"></div>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4" style={{fontFamily: "'Afacad', sans-serif"}}>
                           {typedText}
                           <span className="inline-block w-1 h-5 bg-gray-600 ml-1 animate-pulse"></span>
                        </p>
                    </div>

                    <div className="gap-8 lg:gap-12">
                        {/* Contact Form */}
                        <div className="bg-[#EFF9FF] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl">
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 text-base sm:text-lg font-medium mb-2" style={{fontFamily: "'Afacad', sans-serif"}}>
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-gray-700 text-base sm:text-lg font-medium mb-2" style={{fontFamily: "'Afacad', sans-serif"}}>
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-gray-700 text-base sm:text-lg font-medium mb-2" style={{fontFamily: "'Afacad', sans-serif"}}>
                                        Phone number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="services" className="block text-gray-700 text-base sm:text-lg font-medium mb-2" style={{fontFamily: "'Afacad', sans-serif"}}>
                                        Services we provide *
                                    </label>
                                    <select
                                        id="services"
                                        name="services"
                                        value={formData.services}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select a service</option>
                                        <option value="Flight Booking">Flight Booking</option>
                                        <option value="Tour Packages">Tour Packages</option>
                                        <option value="Visa Assistance">Visa Assistance</option>
                                        <option value="Travel Insurance">Travel Insurance</option>
                                        <option value="Car Rental">Car Rental</option>
                                        <option value="Ticket Bookings">Ticket Bookings</option>
                                        <option value="Holidays">Holidays</option>
                                        <option value="Hotels & Resorts">Hotels & Resorts</option>
                                        <option value="Cruise">Cruise Booking</option>
                                        <option value="Events">Events</option>
                                        <option value="Stamping & Attestation">Stamping & Attestation</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-gray-700 text-base sm:text-lg font-medium mb-2" style={{fontFamily: "'Afacad', sans-serif"}}>
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        placeholder="Tell us more about your travel plans..."
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="remarks" className="block text-gray-700 text-base sm:text-lg font-medium mb-2" style={{fontFamily: "'Afacad', sans-serif"}}>
                                        Remarks
                                    </label>
                                    <textarea
                                        id="remarks"
                                        name="remarks"
                                        value={formData.remarks}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        placeholder="Any special requirements or preferences..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 text-white py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{fontFamily: "'Afacad', sans-serif"}}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Submit your Travel Request
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17"/>
                                            </svg>
                                        </>
                                    )}
                                </button>

                                {/* Status Messages */}
                                {submitStatus === 'success' && (
                                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-green-700 text-center" style={{fontFamily: "'Afacad', sans-serif"}}>
                                            ✓ Application submitted successfully! Opening your email client...
                                        </p>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-700 text-center" style={{fontFamily: "'Afacad', sans-serif"}}>
                                            ✗ Error submitting application. Please try again.
                                        </p>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Separator */}
                        <div className="w-full max-w-3xl h-0.5 bg-black mx-auto mt-14 mb-2"></div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Application
