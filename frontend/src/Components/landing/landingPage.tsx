import { Header } from '../header/header';
import './landing.scss';
import { LandingBooks } from './landingBook';
import '../../App.css'
import BookCategories from './Category/bookCategories';
import News from './news/news';
import ForumComponent from './Forum/forum';
import ArchiveHeroes from './ProfileCard/ArchiveHeroes';
import TopBooks from './Top/topComponent';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <div className="container_basic">
        <LandingBooks/>
        <BookCategories/>
        <News/>
        <ForumComponent/>
        <ArchiveHeroes/>
        <TopBooks/>
      </div>
    </div>
  );
};

export default LandingPage;
