import { useState } from "react"
import { CalendarIcon, MessageCircleIcon, X } from 'lucide-react'

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
interface ModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (newsItem: Omit<NewsItem, 'id' | 'date' | 'commentCount'>) => void
  }
  
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit({ title, category, image })
      onClose()
    }
  
    if (!isOpen) return null
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Написать новость</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Заголовок
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Категория
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                URL изображения
              </label>
              <input
                type="url"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
            >
              Опубликовать
            </button>
          </form>
        </div>
      </div>
    )
  }