import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-green-800 text-white py-8 mt-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold">About Us</h3>
                        <p className="mt-2 text-sm">
                            We are dedicated to providing the best gardening resources and community support. Join us in cultivating a greener future!
                        </p>
                    </div>
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="mt-2 space-y-1 text-sm">
                            <li><a href="/" className="hover:underline">Home</a></li>
                            <li><a href="/plantcatalog" className="hover:underline">Plant Catalog</a></li>
                            <li><a href="/community" className="hover:underline">Community</a></li>
                            <li><a href="/resources" className="hover:underline">Resources</a></li>
                            <li><a href="/contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Follow Us</h3>
                        <div className="mt-2 flex space-x-4">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f hover:text-green-400 transition" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter hover:text-green-400 transition" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram hover:text-green-400 transition" />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin-in hover:text-green-400 transition" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-green-600 mt-6 pt-4 text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Green Guide. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
