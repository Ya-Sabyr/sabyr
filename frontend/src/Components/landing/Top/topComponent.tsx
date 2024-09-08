import { useState } from "react";
import { books } from "../../../types/Top/Books";
import { BookCard } from "./BookCard";
import '../../../App.css'

export default function TopBooks() {
    const [currentPage, setCurrentPage] = useState(1)
    const booksPerPage = 9
    const totalPages = Math.ceil(books.length / booksPerPage)
  
    const handleNextPage = () => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }
  
    const currentBooks = books.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage)
  
    return (
        <div className="container_basic">
      <div className="max-w-6xl px-4 pt-12">
        <div className="bg-blue-100 p-2 mb-4">
          <h2 className="text-2xl font-bold text-left text-gray-800">ТОП КОММЬЮНИТИ КНИГ</h2>
        </div>
        <div className="grid grid-cols-3 gap-6 mb-4">
          {currentBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
        <div className="flex justify-end bg-gray-200">
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="text-blue-600 hover:text-blue-800 disabled:text-blue-400"
          >
            Вперёд →
          </button>
        </div>
      </div>
        </div>

    )
  }