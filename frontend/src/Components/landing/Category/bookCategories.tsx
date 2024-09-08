import {Category} from './category'

export default function BookCategories() {
    return (
      <div className="bg-gray-100 p-4 rounded-lg w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <h3 className="text-lg font-semibold mb-2 text-center sm:text-left">Вход через соц. сети</h3>
            <div className="flex space-x-2 justify-center sm:justify-start">
              <button className="bg-[#4C75A3] text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">
                VK
              </button>
              <button className="bg-[#1DA1F2] text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">
                Twitter
              </button>
            </div>
            <button className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Вход по паролю
            </button>
            <div className="mt-2 text-sm text-center sm:text-left">
              <a href="#" className="text-blue-600 hover:underline">Регистрация</a>
              <span className="mx-2">|</span>
              <a href="#" className="text-blue-600 hover:underline">Восстановление пароля</a>
            </div>
          </div>
  
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Category 
              title="КНИГИ" 
              tags={["#Осень 2024", "#Лето 2024", "#2024", "#2023", "#Фикшн", "#Избранное", "#Рекомендации"]} 
              color="bg-pink-200 text-pink-800"
            />
            <Category 
              title="АУДИОКНИГИ" 
              tags={["#Роман", "#Триллер", "#Поэзия", "#Детектив", "#Мистика", "#Избранное", "#Рекомендации"]} 
              color="bg-blue-200 text-blue-800"
            />
            <Category 
              title="КОММЬЮНИТИ КНИГИ" 
              tags={["#Избранное"]} 
              color="bg-green-200 text-green-800"
            />
          </div>
        </div>
      </div>
    )
  }