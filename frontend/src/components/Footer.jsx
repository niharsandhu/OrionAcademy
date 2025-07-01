import { Twitter, MessageCircle, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black backdrop-blur-md text-white pt-12 pb-4">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className='flex flex-col items-center'>
            <h3 className="text-xl font-bold mb-4">Orion Academy</h3>
            <p className="text-gray-400">
              Your gateway to exploring the wonders of the cosmos.
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/planets" className="hover:text-blue-400 transition">Planets</a></li>
              <li><a href="/galaxies" className="hover:text-blue-400 transition">Galaxies</a></li>
              <li><a href="/missions" className="hover:text-blue-400 transition">Missions</a></li>
              <li><a href="/news" className="hover:text-blue-400 transition">Space News</a></li>
            </ul>
          </div>
          <div className='flex flex-col items-center'>
            <h4 className="text-lg font-semibold mb-4">Learn More</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-blue-400 transition">About Us</a></li>
              <li><a href="/blog" className="hover:text-blue-400 transition">Blog</a></li>
              <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
              <li><a href="/faq" className="hover:text-blue-400 transition">FAQ</a></li>
            </ul>
          </div>
          <div className='flex flex-col items-center'>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <MessageCircle className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Orion Academy . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;