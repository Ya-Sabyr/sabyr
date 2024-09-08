import { Link } from 'react-router-dom'
import { ChevronDown, Star } from 'lucide-react'
import { Header } from '../header/header'

interface Topic {
  id: number
  title: string
  author: string
  replies: number
  views: string
  lastActivity: string
  isPinned?: boolean
  isPopular?: boolean
  isNew?: boolean
}

const topics: Topic[] = [
  { id: 1, title: 'Рекомендации книг по жанрам', author: 'Джулйра', replies: 57, views: '23,8 тыс.', lastActivity: 'июль 7', isPinned: true },
  { id: 2, title: 'Разбор классической литературы', author: 'Рейннон', replies: 130, views: '46,4 тыс.', lastActivity: 'февр. 19', isPinned: true },
  { id: 3, title: 'Литература и кино', author: 'Амани', replies: 222, views: '83,1 тыс.', lastActivity: '16 ч', isPinned: true },
  { id: 4, title: 'Современные авторы и их влияние', author: 'Амани', replies: 465, views: '25,0 тыс.', lastActivity: 'июль 2023', isNew: true },
  { id: 5, title: 'Книги и саморазвитие', author: 'Совид', replies: 861, views: '62,0 тыс.', lastActivity: 'авг. 2022', isPopular: true },
  { id: 6, title: 'Лучшие книги для подростков', author: 'Гигметео', replies: 169, views: '16,4 тыс.', lastActivity: 'февр. 15' },
  { id: 7, title: 'Влияние культуры на литературу', author: 'Суфражистка', replies: 340, views: '28,4 тыс.', lastActivity: 'апр. 2023' },
  { id: 8, title: 'Тематические чтения и клубы', author: 'Вархаунд', replies: 237, views: '22,9 тыс.', lastActivity: '11 дн' },
  { id: 9, title: 'Литературные премии и их значение', author: 'Тысячелетний', replies: 2800, views: '73,6 тыс.', lastActivity: 'авг. 2022' },
]

export default function ForumTopics() {
  return (
    <>
    <Header/>
    <div className="bg text-gray-200 p-6 rounded-lg">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Link to="#" className="text-blue-400 hover:underline">Все Категории</Link>
          <span>&gt;</span>
          <Link to="#" className="text-blue-400 hover:underline">все теги</Link>
        </div>
        <div className="flex space-x-4 border-b border-gray-700 pb-2">
          <span className="text-gray-500 uppercase text-sm">КАТЕГОРИИ</span>
          <span className="text-yellow-400 border-b-2 border-yellow-400 pb-2 uppercase text-sm">ПОПУЛЯРНЫЕ</span>
          <span className="text-gray-500 uppercase text-sm">ПОСЛЕДНИЕ</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded">
          <span>За все время</span>
          <ChevronDown size={16} />
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-gray-500 text-left">
            <th className="pb-2 font-normal">Тема</th>
            <th className="pb-2 font-normal">Автор</th>
            <th className="pb-2 font-normal">Ответы</th>
            <th className="pb-2 font-normal">Просмотры</th>
            <th className="pb-2 font-normal">Сообщения</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => (
            <tr key={topic.id} className="border-t border-gray-700">
              <td className="py-3">
                <div className="flex items-center space-x-2">
                  {topic.isPinned && <Star size={16} className="text-yellow-400" />}
                  {topic.isNew && <span className="bg-green-500 w-2 h-2 rounded-full"></span>}
                  {topic.isPopular && <span className="bg-orange-500 w-2 h-2 rounded-full"></span>}
                  <Link to="#" className="text-black">{topic.title}</Link>
                </div>
              </td>
              <td className="py-3 text-gray-400">{topic.author}</td>
              <td className="py-3">
                <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs">{topic.replies}</span>
              </td>
              <td className="py-3 text-gray-400">{topic.views}</td>
              <td className="py-3 text-gray-400">{topic.lastActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>

  )
}