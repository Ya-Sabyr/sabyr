import React from 'react'

interface CategoryProps {
  title: string
  tags: string[]
  color: string
}

export const Category: React.FC<CategoryProps> = ({ title, tags, color }) => (
  <div className="mb-4 w-full">
    <button className={`mb-2 ${color} w-full flex justify-between items-center px-4 py-2 rounded border border-gray-300 hover:bg-opacity-80 transition-colors`}>
      {title}
      <span>▸</span>
    </button>
    <div className="flex flex-wrap gap-2 justify-center">
      {tags.map((tag, index) => (
        <span key={index} className={`text-xs px-2 py-1 rounded ${color}`}>
          {tag}
        </span>
      ))}
    </div>
  </div>
)