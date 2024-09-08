import React from 'react';
import { Header } from '../header/header';

interface ProfileProps {
  username: string;
  joinDate: string;
}

const ProfilePage: React.FC<ProfileProps> = ({ username, joinDate }) => {
  return (
    <>
    <Header/>
      <div className="bg-white min-h-screen font-sans">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Left column */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <div className="bg-white mb-6">
              <div className="w-32 h-32 mx-auto mb-4 border-2 border-gray-300 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gray-200"></div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-1">{username}</h2>
              <p className="text-sm text-gray-500 text-center mb-4">Нет личных данных · на сайте с {joinDate}</p>
              <div className="space-y-2">
                <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                  Обмен книгами
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
            </div>
          </div>

          {/* Right column */}
          <div className="w-full md:w-2/3">
            <div className="bg-gray-100 p-4 mb-6 rounded">
              <h3 className="text-lg font-semibold mb-2">БИБЛИОТЕКА</h3>
              <p className="text-sm text-gray-500">Нет данных</p>
            </div>
            <div className="bg-gray-100 p-4 mb-6 rounded">
              <h3 className="text-lg font-semibold mb-2">КЛУБЫ</h3>
              <p className="text-sm text-gray-500">Не состоит ни в одном из клубов</p>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">ИЛЛЮСТРАЦИИ</h3>
              <p className="text-sm text-gray-500">Список обложек пуст</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  
  );
};

export default ProfilePage;