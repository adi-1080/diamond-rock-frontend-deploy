import React from 'react';
import { Facebook, Instagram, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-20 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Social Links */}
          <div className="flex flex-col space-y-4">
            <p className="text-gray-600 max-w-xs">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><Twitter className="h-6 w-6" /></a>
              <a href="https://github.com/Quickyearning" className="text-gray-400 hover:text-gray-500"><Github className="h-6 w-6" /></a>
              <a href="https://www.linkedin.com/company/quickyearning-private-limited/" className="text-gray-400 hover:text-gray-500"><Linkedin className="h-6 w-6" /></a>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 col-span-3">
            {/* Company Links */}
            <div className=' flex gap-32 pl-[80%]'>
            <div className=''>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-3">
                <li><Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
                <li><Link to="/marketHome" className="text-gray-600 hover:text-gray-900">Markets</Link></li>
                <li><Link to="/chartHome" className="text-gray-600 hover:text-gray-900">Supercharts</Link></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                <li><Link to="/indices" className="text-gray-600 hover:text-gray-900">Analysis</Link></li>
              </ul>
            </div>

            {/* Supercharts */}
            <div className=''>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Supercharts</h3>
              <ul className="mt-4 space-y-3">
                <li><Link to="/innerChart/RELIANCE.NS" className="text-gray-600 hover:text-gray-900">Charts</Link></li>
              </ul>
            </div>

            {/* More Company Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">More</h3>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Jobs</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Press</a></li>
              </ul>
            </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 py-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
          <p>© 2025 Quickyearning, Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900">Terms of service</a>
            <a href="#" className="hover:text-gray-900">Privacy policy</a>
            <a href="#" className="hover:text-gray-900">License</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
