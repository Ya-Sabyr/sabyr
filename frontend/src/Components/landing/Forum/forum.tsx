import { MessageSquare, Eye } from 'lucide-react'
import { forumCategories } from '../../../types/Forum/forumCategories'
import { topicItems } from '../../../types/Forum/topicItems'

export default function ForumComponent() {
    return (
      <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-100 font-sans">
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-bold mb-4 bg-blue-100 p-2">ФОРУМ</h2>
          <ul className="space-y-2">
            {forumCategories.map((category, index) => (
              <li key={index} className="flex justify-between items-center">
                <a href="#" className="text-blue-600 hover:underline">{category.title}</a>
                <span className="text-gray-500 flex items-center">
                  <MessageSquare size={16} className="mr-1" />
                  {category.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-bold mb-4 bg-gray-200 p-2">ТЕМЫ ДНЯ</h2>
          <ul className="space-y-4">
            {topicItems.map((item, index) => (
              <li key={index} className="border-b border-gray-200 pb-2">
                <div className="flex justify-between items-center mb-1">
                  <a href="#" className="text-blue-600 hover:underline">{item.title}</a>
                  <span className="text-gray-500 flex items-center">
                    <Eye size={16} className="mr-1" />
                    {item.views}
                  </span>
                </div>
                <span className={`text-xs text-white px-2 py-1 rounded ${item.tagColor}`}>
                  {item.tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }