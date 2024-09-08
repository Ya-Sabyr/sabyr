import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './Components/landing/landingPage';
import { Registration } from './Components/RegisterLogin/register'
import BookCatalog from './Components/book/BookCatalog';
import BookDetail from './Components/book/BookDetail';
import { initialBooks } from './Components/book/initialBooks'; 
import { LoginPage } from './Components/RegisterLogin/login';
import { ProfileCard } from './Components/landing/ProfileCard/profileCard';
import ProfilePage from './Components/profile/ProfilePage';
import { artworks } from './types/illistration/artworks';
import { ArtworkProps } from './types/illistration/ArtworkProps';
import ArtPage from './Components/artWork/artPage';
import BooksClub from './Components/Clubs/BooksClubs';
import RatingsPage from './Components/RatingClubs/RatingsPage';
import ForumTopics from './Components/forum/forum';

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
            <Route path="/sign-up" element={<Registration/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/books" element={<BookCatalog/>} />
            <Route path="/books/:id" element={<BookDetail books={initialBooks} />} />
            <Route path="/illustration" element={<ArtPage artworks={artworks}/>} />
            <Route path="/profile" element={<ProfilePage username="YourUsername" joinDate="January 2023" />} />
            <Route path="/club" element={<BooksClub/>} />
            <Route path="/ratings" element={<RatingsPage/>} />
            <Route path="/forum" element={<ForumTopics/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
