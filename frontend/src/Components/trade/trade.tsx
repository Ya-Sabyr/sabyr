import React from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { Header } from '../header/header'

interface Item {
  id: number
  title: string
  price: number
  condition: string
  location: string
  date: string
  image: string
  isTop?: boolean
  negotiable?: boolean
}

const items: Item[] = [
  {
    id: 1,
    title: 'Блок питания для ноутбука. Зарядное устройство для ноутбука.',
    price: 6000,
    condition: 'Новый',
    location: 'Алматы, Турксибский район',
    date: '07 сентября 2024 г.',
    image: '/placeholder.svg?height=100&width=100',
    isTop: true,
    negotiable: true
  },
  {
    id: 2,
    title: 'Подготовка к ЕНТ. Учебные пособия для старших классов',
    price: 6000,
    condition: 'Новый',
    location: 'Алматы, Турксибский район',
    date: '05 сентября 2024 г.',
    image: '/placeholder.svg?height=100&width=100',
    isTop: true,
    negotiable: true
  },
  {
    id: 3,
    title: 'Книги классической литературы по 1500тг. 96 шт.',
    price: 1500,
    condition: 'Б/у',
    location: 'Алматы, Медеуский район',
    date: '06 сентября 2024 г.',
    image: '/placeholder.svg?height=100&width=100',
    isTop: true
  },
  {
    id: 4,
    title: 'Английский учебник "English File", Pre-intermediate',
    price: 2000,
    condition: 'Б/у',
    location: 'Алматы, Алмалинский район',
    date: '07 сентября 2024 г.',
    image: '/placeholder.svg?height=100&width=100',
    negotiable: true
  }
]

const ItemCard: React.FC<Item> = ({ title, price, condition, location, date, image, isTop, negotiable }) => (
  <div className="flex border-b border-gray-200 py-4">
    <div className="flex-shrink-0 w-32 h-32 mr-4">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="flex-grow">
      <div className="flex justify-between items-start">
        <div>
          <Link to="#" className="text-lg font-semibold text-blue-600 hover:underline">{title}</Link>
          <p className="text-sm text-gray-500">{condition}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold">{price} тг.</p>
          {negotiable && <p className="text-sm text-gray-500">Договорная</p>}
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2">{location} - {date}</p>
      <div className="flex items-center mt-2">
        {isTop && (
          <span className="bg-teal-400 text-white text-xs font-bold px-2 py-1 rounded mr-2">
            ТОП
          </span>
        )}
      </div>
    </div>
    <button className="ml-4 text-gray-400 hover:text-red-500">
      <Heart size={24} />
    </button>
  </div>
)

export default function BookExchange() {
  return (
    <>
    <Header/>
        <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Обмен книг</h1>
      <div className="bg-white shadow rounded-lg">
        {items.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </div>
    </>

  )
}