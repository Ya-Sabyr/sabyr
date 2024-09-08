import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../header/header';
import { Edit, Book, Users, Image } from 'lucide-react';

interface User {
  name: string;
  surname: string;
  email: string;
  joinDate: string;
}

interface ProfilePageProps {
  name: string;
  surname: string;
  email: string;
  joinDate: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ name, surname, email, joinDate }) => {
  const [user, setUser] = useState<User | null>({ name, surname, email, joinDate });
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen font-sans">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Left column */}
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <div className="bg-white mb-6">
                <div className="w-32 h-32 mx-auto mb-4 border-2 border-gray-300 rounded-full overflow-hidden">
                  <img 
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name} ${user.surname}`} 
                    alt={`${user.name} ${user.surname}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-center mb-1">{`${user.name} ${user.surname}`}</h2>
                <p className="text-sm text-gray-500 text-center mb-4">на сайте с {user.joinDate || 'Неизвестно'}</p>
                <div className="space-y-2">
                  <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center">
                    <Edit className="w-4 h-4 mr-2" />
                    Редактировать профиль
                  </button>
                  <div className="flex justify-between text-sm">
                    <span>Опыт:</span>
                    <span>0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Уровень:</span>
                    <span>0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ранг:</span>
                    <span>Почетный гость библиотеки</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 border border-gray-200 rounded">
                <h3 className="text-lg font-semibold mb-2">КНИГИ НА ОБМЕН</h3>
                <p className="text-sm text-gray-500">Нет статистики</p>
                <button className="mt-4 w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200">
                  Обмен книгами
                </button>
              </div>
            </div>

            {/* Right column */}
            <div className="w-full md:w-2/3">
              <div className="bg-gray-100 p-4 mb-6 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">БИБЛИОТЕКА</h3>
                  <Book className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-sm text-gray-500">Нет данных</p>
                <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                  Добавить книгу
                </button>
              </div>
              <div className="bg-gray-100 p-4 mb-6 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">КЛУБЫ</h3>
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-sm text-gray-500">Не состоит ни в одном из клубов</p>
                <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                  Присоединиться к клубу
                </button>
              </div>
              <div className="bg-gray-100 p-4 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">ИЛЛЮСТРАЦИИ</h3>
                  <Image className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-sm text-gray-500">Список обложек пуст</p>
                <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                  Добавить иллюстрацию
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
