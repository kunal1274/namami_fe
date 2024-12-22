import { FaSearch, FaBell } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white shadow-md px-6 py-3">
      {/* Search Section */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="border rounded-full py-2 px-4 pl-10 w-80 sm:w-64 md:w-80"
          aria-label="Search" // Accessibility improvement
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      {/* Right Section: Notifications and Profile */}
      <div className="flex items-center space-x-4">
        <FaBell className="cursor-pointer" aria-label="Notifications" />
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/32"
            alt="profile"
            className="rounded-full w-8 h-8"
            aria-label="User Profile" // Accessibility improvement
          />
          <span className="text-sm">Moni Roy</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
