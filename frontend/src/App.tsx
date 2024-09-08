import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './Components/landing/landingPage';
import { Register } from './Components/RegisterLogin/register';
import BookCatalog from './Components/book/BookCatalog';
import BookDetail from './Components/book/BookDetail';
import { initialBooks } from './Components/book/initialBooks'; 

function App() {
  return (
    <>
    <BrowserRouter>      
        <Routes>
          <Route path="/" element={
            <>
            <LandingPage/>
            </>
            } />
          <Route path="/sign-up" element={<Register/>} />
          <Route path="/books" element={<BookCatalog/>} />
          <Route path="/books/:id" element={<BookDetail books={initialBooks} />} />
          <Route path="/illustration" element={<></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
