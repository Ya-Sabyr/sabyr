'use client';

import { useState, useEffect } from 'react';
import { Star, Filter, RefreshCw, Bookmark } from 'lucide-react';
import './catolog.scss'
import '../../App.css'
import { useNavigate } from 'react-router-dom';
import { initialBooks } from '../book/initialBooks'; 
import {Book} from '../book/bookTypes'
import { Header } from '../header/header';

export default function BookCatalog() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [titleSearchTerm, setTitleSearchTerm] = useState('');
  const [authorSearchTerm, setAuthorSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [yearFilter, setYearFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [tempFilters, setTempFilters] = useState({
    titleSearchTerm: '',
    authorSearchTerm: '',
    selectedGenres: [] as string[],
    yearFilter: '',
    sortOrder: 'newest' as 'newest' | 'oldest',
  });

  const applyFilters = () => {
    setTitleSearchTerm(tempFilters.titleSearchTerm);
    setAuthorSearchTerm(tempFilters.authorSearchTerm);
    setSelectedGenres(tempFilters.selectedGenres);
    setYearFilter(tempFilters.yearFilter);
    setSortOrder(tempFilters.sortOrder);
  };

  const resetFilters = () => {
    setTitleSearchTerm('');
    setAuthorSearchTerm('');
    setSelectedGenres([]);
    setYearFilter('');
    setSortOrder('newest');
    setTempFilters({
      titleSearchTerm: '',
      authorSearchTerm: '',
      selectedGenres: [],
      yearFilter: '',
      sortOrder: 'newest',
    });
  };

  const sortBooks = (booksToSort: Book[]) => {
    return [...booksToSort].sort((a, b) =>
      sortOrder === 'newest' ? b.year - a.year : a.year - b.year
    );
  };

  const toggleBookmark = (id: number) => {
    setBooks(books.map(book =>
      book.id === id ? { ...book, bookmarked: !book.bookmarked } : book
    ));
  };

  useEffect(() => {
    let result = books;

    if (titleSearchTerm) {
      result = result.filter((book) =>
        book.title.toLowerCase().includes(titleSearchTerm.toLowerCase())
      );
    }

    if (authorSearchTerm) {
      result = result.filter((book) =>
        book.author.toLowerCase().includes(authorSearchTerm.toLowerCase())
      );
    }

    if (selectedGenres.length > 0) {
      result = result.filter((book) => selectedGenres.includes(book.genre));
    }

    if (yearFilter) {
      result = result.filter((book) => book.year === parseInt(yearFilter));
    }

    result = sortBooks(result);

    setFilteredBooks(result);
  }, [books, titleSearchTerm, authorSearchTerm, selectedGenres, yearFilter, sortOrder]);

  useEffect(() => {
    setFilteredBooks(sortBooks(books));
  }, []);

  const genres = Array.from(new Set(books.map((book) => book.genre)));
  const years = Array.from(new Set(books.map((book) => book.year))).sort((a, b) => b - a);

  // Count books by genre
  const genreCounts = genres.reduce((acc: { [key: string]: number }, genre: string) => {
    acc[genre] = books.filter((book) => book.genre === genre).length;
    return acc;
  }, {});
  const navigate = useNavigate();
  return (
    <>
    <Header/>
    <div className="container">
    <div className="flex pt-14">
      <div className="w-64 p-4  ">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 pt-12">Book Title</label>
            <input
              type="text"
              className="search_title mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Search by book title"
              value={tempFilters.titleSearchTerm}
              onChange={(e) => setTempFilters({ ...tempFilters, titleSearchTerm: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Author Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Search by author name"
              value={tempFilters.authorSearchTerm}
              onChange={(e) => setTempFilters({ ...tempFilters, authorSearchTerm: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Genre</label>
            {genres.map((genre) => (
              <div key={genre} className="flex items-center">
                <input
                  type="checkbox"
                  value={genre}
                  checked={tempFilters.selectedGenres.includes(genre)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setTempFilters({
                      ...tempFilters,
                      selectedGenres: checked
                        ? [...tempFilters.selectedGenres, genre]
                        : tempFilters.selectedGenres.filter((g) => g !== genre),
                    });
                  }}
                  className="mr-2"
                />
                <label>{genre} ({genreCounts[genre]})</label>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={tempFilters.yearFilter}
              onChange={(e) => setTempFilters({ ...tempFilters, yearFilter: e.target.value })}
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sort By</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={tempFilters.sortOrder}
              onChange={(e) => {
                const newSortOrder = e.target.value as 'newest' | 'oldest';
                setTempFilters({ ...tempFilters, sortOrder: newSortOrder });
                setSortOrder(newSortOrder);
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
            onClick={applyFilters}
          >
            <Filter className="mr-2" /> Apply Filters
          </button>
          <button
            className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 flex items-center justify-center"
            onClick={resetFilters}
          >
            <RefreshCw className="mr-2" /> Reset
          </button>
        </div>
      </div>
      <div className="flex-1 p-4">
        <p className="text-lg mb-4">{filteredBooks.length} <span className='found_book'>Книг найдено</span></p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div 
            key={book.id} 
            className="border rounded-lg overflow-hidden shadow-lg cursor-pointer"
            onClick={() => navigate(`/books/${book.id}`)}>
              <img src={book.img} alt={book.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-600 mb-2">{book.author}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {book.genre} - {book.year}
                </p>
                <p className="text-sm mb-4">{book.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={index < book.rating ? 'text-yellow-500' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <button
                    className={`p-2 rounded-full ${
                      book.bookmarked ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                    onClick={() => toggleBookmark(book.id)}
                  >
                    <Bookmark />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </>
    
  );
}
