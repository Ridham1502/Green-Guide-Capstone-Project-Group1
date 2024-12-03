import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer
            className="bg-gradient-to-r from-teal-600 to-teal-800 text-gray-100 py-12 mt-12 relative overflow-hidden"
            aria-labelledby="footer-heading"
        >
            <div className="max-w-6xl mx-auto px-6">
                {/* Footer Heading */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    {/* Branding Section */}
                    <div className="text-center md:text-left mb-8 md:mb-0">
                        <h2
                            id="footer-heading"
                            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-green-400 hover:scale-105 transition-all duration-500"
                        >
                            Green Garden
                        </h2>
                        <p className="text-lg text-white mt-2 max-w-xs mx-auto md:mx-0">
                            Cultivating beauty, sustainability, and a greener tomorrow with every plant we nurture.
                        </p>
                    </div>

                    {/* Social Media Section */}
                    <div className="flex space-x-8 mt-6 md:mt-0" aria-label="Social Media Links">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our Facebook page"
                            className="text-gray-200 hover:text-teal-400 transition duration-300 transform hover:scale-110"
                        >
                            <FaFacebookF size={28} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our Instagram profile"
                            className="text-gray-200 hover:text-teal-400 transition duration-300 transform hover:scale-110"
                        >
                            <FaInstagram size={28} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our Twitter page"
                            className="text-gray-200 hover:text-teal-400 transition duration-300 transform hover:scale-110"
                        >
                            <FaTwitter size={28} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit our LinkedIn profile"
                            className="text-gray-200 hover:text-teal-400 transition duration-300 transform hover:scale-110"
                        >
                            <FaLinkedin size={28} />
                        </a>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="border-t border-gray-700 pt-8 mb-8">
                    <h3 className="text-xl font-semibold text-teal-300 mb-4">Quick Links</h3>
                    <ul
                        className="flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-8 mt-4"
                        aria-label="Footer navigation links"
                    >
                        <li>
                            <a
                                href="/about"
                                className="text-white hover:text-teal-400 transition duration-300 transform hover:scale-110"
                                aria-label="Learn more about us"
                            >
                                About Us
                            </a>
                        </li>
                        <li>
                            <a
                                href="/services"
                                className="text-white hover:text-teal-400 transition duration-300 transform hover:scale-110"
                                aria-label="Explore our services"
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="/contact"
                                className="text-white hover:text-teal-400 transition duration-300 transform hover:scale-110"
                                aria-label="Contact us"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Footer Information */}
                <div className="text-center mt-10">
                    <p className="text-lg text-white mb-2">
                        &copy; {new Date().getFullYear()} Green Garden. All rights reserved.
                    </p>
                    <p className="text-lg text-white">
                        Contact us:{" "}
                        <a
                            href="mailto:info@greengarden.com"
                            className="text-teal-400 underline"
                            aria-label="Email us at info@greengarden.com"
                        >
                            info@greengarden.com
                        </a>{" "}
                        |{" "}
                        <a
                            href="tel:+1234567890"
                            className="text-teal-400 underline"
                            aria-label="Call us at +1 (234) 567-890"
                        >
                            +1 (234) 567-890
                        </a>
                    </p>
                </div>

                {/* Decorative Elements */}
                <div
                    className="absolute top-0 right-0 transform translate-x-10 translate-y-8 opacity-20"
                    aria-hidden="true"
                >
                    <div className="w-32 h-32 bg-teal-500 rounded-full animate-pulse"></div>
                </div>
                <div
                    className="absolute bottom-0 left-0 transform -translate-x-16 translate-y-4 opacity-15"
                    aria-hidden="true"
                >
                    <div className="w-48 h-48 bg-teal-600 rounded-full animate-pulse"></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
