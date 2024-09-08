import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import { Book } from '../book/bookTypes'
import { initialBooks } from '../book/initialBooks'
import { Header } from '../header/header'

export default function BookManager() {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [newBook, setNewBook] = useState({ title: '', author: '', year: '', genre: '' })
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewBook(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Prevent adding duplicates
    if (books.some(book => book.title === newBook.title)) {
      alert('This book already exists in the library!')
      return
    }

    console.log('New book:', newBook)
    console.log('File:', file)
    setBooks(prev => [
      ...prev,
      {
        id: prev.length + 1,
        title: newBook.title,
        author: newBook.author,
        genre: newBook.genre,
        year: parseInt(newBook.year, 10), // Add year to new book
        img: preview || '/placeholder.svg?height=200&width=150',
        rating: 0, // Default rating, you could add a field for this in the form
        description: '', // Default empty description
      }
    ])
    setNewBook({ title: '', author: '', year: '', genre: '' })
    setFile(null)
    setPreview(null)
  }

  return (
    <>
    <Header/>
        <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Загрузить книгу:</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="cover-upload"
                accept="image/*"
              />
              <label htmlFor="cover-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-600">
                  Нажмите, чтобы загрузить или перетащите файл
                </p>
                <p className="text-xs text-gray-500">(Макс. размер файла: 25 МБ)</p>
              </label>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 w-full h-48 object-cover rounded-lg shadow-md"
                />
              )}
            </div>
            <input
              type="text"
              name="title"
              value={newBook.title}
              onChange={handleInputChange}
              placeholder="Название книги"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="author"
              value={newBook.author}
              onChange={handleInputChange}
              placeholder="Автор(ы)"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="year"
              value={newBook.year}
              onChange={handleInputChange}
              placeholder="Год издания"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <select
              name="genre"
              value={newBook.genre}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Жанр</option>
              <option value="fiction">Художественная литература</option>
              <option value="non-fiction">Научная фантастика</option>
              <option value="biography">Биография</option>
              <option value="history">История</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Отправить
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Мои книги:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {books.map((book) => (
              <div key={book.id} className="text-center">
                <img
                  src={book.img}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <p className="mt-2 text-sm font-medium">{book.title}</p>
                <p className="text-xs text-gray-600">{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
        </div>
    </>

  )
}
