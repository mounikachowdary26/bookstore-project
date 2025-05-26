const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className='container mx-auto flex flex-col sm:flex-row sm:justify-between items-center gap-12'>
          <img src="/src/assets/footer-logo.png" alt="BookStore Logo" className="mb-5 w-36" />
                     
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Shop</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-2 flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} BookStore.Mounika kondaveeti
        </div>
      </footer>
    );
  };
  
  export default Footer;
  