import { useState } from "react"
import { CalendarIcon, MessageCircleIcon, X } from 'lucide-react'
import {Modal} from './modal'

interface NewsItem {
  id: number
  image: string
  date: string
  category: string
  title: string
  commentCount: number
}
const newsItems: NewsItem[] = [
  {
    id: 1,
    image: '/placeholder.svg?height=200&width=300',
    date: '5 сентября, 2024',
    category: 'Издательства',
    title: 'Like Book купил права на литературную версию дорамы «Хваткий Сон Джэ и беги»',
    commentCount: 16,
  },
  {
    id: 2,
    image: '/placeholder.svg?height=200&width=300',
    date: '27 августа, 2024',
    category: 'Новинки',
    title: '«Сыны Тьмы»: индийская мифология, какой вы ее даже не представляли',
    commentCount: 86,
  },
]
export default function News() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [news, setNews] = useState<NewsItem[]>(newsItems)

  const handleAddNews = (newsItem: Omit<NewsItem, 'id' | 'date' | 'commentCount'>) => {
    const newItem: NewsItem = {
      ...newsItem,
      id: news.length + 1,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      commentCount: 0,
    }
    setNews([newItem, ...news])
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center bg-orange-100 p-3 rounded-t-lg">
        <h2 className="text-lg font-semibold text-orange-500">НОВОСТИ</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
        >
          + Написать новость
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>{item.date}</span>
                <span className="mx-2">|</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{item.category}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <MessageCircleIcon className="w-4 h-4 mr-1" />
                <span>{item.commentCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddNews} />
    </div>
  )
}