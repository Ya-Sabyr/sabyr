import { Book } from '../book/bookTypes';
import { initialBooks } from '../book/initialBooks'; 

export const LandingBooks = () => {
  return (
    <main className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Сейчас популярное</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {initialBooks.map((book: Book) => (
          <div key={book.id} className="flex flex-col items-center">
            <img
              src={book.img}
              alt={book.title}
              className="w-32 h-48 object-cover mb-2 rounded shadow-md"
            />
            <h3 className="text-sm font-semibold text-center">{book.title}</h3>
            <p className="text-xs text-gray-600">{book.author}</p>
          </div>
        ))}
      </div>
    </main>
  );
};
