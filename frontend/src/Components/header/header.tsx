import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, MessageCircle, ChevronDown, User, LogOut } from 'lucide-react';
import logo from '../../../public/logo.svg'

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const getDropdownTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Главная';
      case '/books':
        return 'Католог книг';
      case '/illustration':
        return 'Иллюстрации';
      case '/club':
        return 'Клубы';
      case '/ratings':
        return 'Рейтингы';
      case '/forum':
        return 'Форум';
      case '/trade':
        return 'Обмен книг';
      case '/upload':
        return 'Загрузить книгу';
      case '/calendar':
        return 'Календарь';
      default:
        return 'Главная';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/"><img src={logo} alt="" width={25} height={25}/></Link>
          <Link to="/"><h1 className="text-2xl font-bold mr-4">KITAP</h1></Link>
          <div className="relative">
            <button 
              className="flex items-center hover:text-gray-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {getDropdownTitle()} <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link to="/books" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Католог книг</Link>
                <Link to="/illustration" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Иллюстрации</Link>
                <Link to="/club" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Клубы</Link>
                <Link to="/ratings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Рейтинги</Link>
                <Link to="/forum" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Форумы</Link>
                <Link to="/calendar" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Календарь</Link>
                <Link to="/trade" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Обмен книг</Link>
                <Link to="/upload" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Загрузить книгу</Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="#" className="hover:text-gray-300">
            <Bell className="w-6 h-6" />
          </Link>
          <Link to="#" className="hover:text-gray-300">
            <MessageCircle className="w-6 h-6" />
          </Link>
          {currentUser ? (
            <div className="relative">
              <button 
                className="flex items-center hover:text-gray-300"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User className="w-6 h-6 mr-1" />
                <span>{currentUser.name}</span>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Профиль</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-up" className="flex items-center hover:text-gray-300">
              <User className="w-6 h-6 mr-1" />
              <span>Sign Up</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}