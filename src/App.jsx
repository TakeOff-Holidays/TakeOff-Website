import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopOnRouteChange from './components/ScrollToTopOnRouteChange'
import Loading from './components/Loading'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Packages from './pages/Packages'
import Application from './pages/Application'
import LoadingPage from './pages/LoadingPage'

const AppContent = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Show loading for 1 second

        return () => clearTimeout(timer);
    }, [location.pathname]);

    // Check if on loading page
    const isLoadingPage = location.pathname === '/';

    // If on loading page, show only LoadingPage without Navbar or Footer
    if (isLoadingPage) {
        return <LoadingPage />;
    }

    return (
        <>
            {loading && <Loading />}
            <Navbar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/application" element={<Application />} />
            </Routes>
            <Footer />
        </>
    );
}

const App = () => {
    return (
        <Router>
            <ScrollToTopOnRouteChange />
            <AppContent />
        </Router>
    )
}
export default App
