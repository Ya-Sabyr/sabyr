'use client'
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Book } from './bookTypes';
import { Comments } from './commentTypes';
import { initialComments } from './initialComments';
import { Bookmark } from 'lucide-react'; // Import the Bookmark icon
import left from '../../../public/left.svg';

interface BookDetailProps {
  books: Book[];
}

export default function BookDetail({ books }: BookDetailProps) {
  const { id } = useParams<{ id: string }>();
  const book = books.find((b) => b.id === parseInt(id || '', 10));
  const [comments, setComments] = useState<Comments[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  if (!book) {
    return <p className="text-center text-2xl font-bold mt-10">Book not found</p>;
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comments = {
        id: comments.length + 1,
        username: 'Current User',
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
        text: newComment.trim(),
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/books" className="flex items-center mb-6">
        <img src={left} alt="Back" className="w-6 h-6 mr-2" /> {/* Fixed width and height */}
        <span className="text-blue-600 text-base md:text-lg">Back to Books</span>
      </Link>
      <div className="flex flex-col md:flex-row bg-gray-100 p-6 rounded-lg shadow-lg">
        {/* Left Side - Book Details */}
        <div className="md:w-1/2 pr-8 bg-white p-6 rounded-lg shadow-lg relative">
          <div className="flex flex-col md:flex-row mb-4">
            <img
              src={book.img}
              alt={book.title}
              className="w-full md:w-32 h-auto rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg md:text-xl mb-4 text-blue-600">{book.author}</p>
              <div className="mb-4">
                <span className="font-semibold mr-2">Rating:</span>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg md:text-2xl ${
                      i < book.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="mb-2"><span className="font-semibold">Genre:</span> {book.genre}</p>
              <p className="mb-2"><span className="font-semibold">Year:</span> {book.year}</p>
            </div>
          </div>
          <p className="mb-4 text-gray-700 text-sm md:text-base">{book.description}</p>
          <div className="flex items-center justify-center mt-4">
            <Bookmark className="text-blue-500 text-lg md:text-xl" />
          </div>
        </div>

        {/* Right Side - Comments Section */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Comments</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="w-full p-2 border rounded-lg mb-2 text-sm md:text-base"
                rows={3}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm md:text-base disabled:opacity-50"
                disabled={!newComment.trim()}
              >
                Publish
              </button>
            </form>
          </div>
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-lg shadow mb-4">
              <div className="flex items-center mb-2">
                <img
                  src={comment.avatar}
                  alt={comment.username}
                  className="w-8 h-8 rounded-full mr-3"
                />
                <span className="font-semibold text-sm md:text-base">{comment.username}</span>
              </div>
              <p className="text-gray-700 text-sm md:text-base">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
