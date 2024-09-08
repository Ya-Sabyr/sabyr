import React from 'react';
import { Users, MessageSquare } from 'lucide-react';
import { Header } from '../header/header';

interface ClubProps {
  id: number;
  name: string;
  icon: string;
  members: number;
  comments: number;
}

const featuredClubs: ClubProps[] = [
  { id: 1, name: 'Клуб любителей классики', icon: '📚', members: 3175, comments: 1700 },
  { id: 2, name: 'FAQ - Часто задаваемые вопросы', icon: '💬', members: 4173, comments: 1700 },
  { id: 3, name: 'Книжный клуб самиздания', icon: '✍️', members: 1700, comments: 1700 },
  { id: 4, name: 'Мир фантастики и фэнтези', icon: '🧙‍♂️', members: 1382, comments: 382 },
  { id: 5, name: 'Клуб современных авторов', icon: '🖋️', members: 2011, comments: 25186 },
  { id: 6, name: 'Читательский марафон', icon: '🏃', members: 10385, comments: 1239 },
];

const allClubs: ClubProps[] = [
  { id: 7, name: 'Клуб исторических романов', icon: '🏛️', members: 1700, comments: 1700 },
  { id: 8, name: 'Клуб приключенческой литературы', icon: '🗺️', members: 1700, comments: 1700 },
  { id: 9, name: 'Клуб фэнтези и мифов', icon: '🐉', members: 1700, comments: 1700 },
  { id: 10, name: 'Клуб детективных историй', icon: '🕵️', members: 1700, comments: 99715 },
  { id: 11, name: 'Клуб поэзии и лирики', icon: '🎭', members: 1700, comments: 28 },
  { id: 12, name: 'Клуб современной прозы', icon: '📖', members: 1535, comments: 899 },
  { id: 13, name: 'Клуб научной фантастики', icon: '🚀', members: 1700, comments: 1700 },
  { id: 14, name: 'Клуб романтической литературы', icon: '💖', members: 1382, comments: 1700 },
  { id: 15, name: 'Клуб авторов-новичков', icon: '🌟', members: 1700, comments: 1700 },
];

const ClubItem: React.FC<ClubProps> = ({ name, icon, members, comments }) => (
  <div className="flex items-center space-x-2 py-2">
    <div className="w-8 h-8 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center text-xl">
      {icon}
    </div>
    <div className="flex-grow">
      <h3 className="text-sm font-medium text-blue-600">{name}</h3>
      <div className="flex items-center space-x-4 text-xs text-gray-500">
        <span className="flex items-center">
          <Users size={12} className="mr-1" />
          {members.toLocaleString()} участников
        </span>
        <span className="flex items-center">
          <MessageSquare size={12} className="mr-1" />
          {comments.toLocaleString()} комментариев
        </span>
      </div>
    </div>
  </div>
);

export default function BooksClub() {
  return (
    <>
    <Header/>
        <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Клубы</h1>
          <p className="text-sm text-gray-600">Список всех клубов сайта в порядке активности участников</p>
        </div>
        
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">ИЗБРАННЫЕ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredClubs.map(club => (
              <ClubItem key={club.id} {...club} />
            ))}
          </div>
        </div>
        
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">ВСЕ КЛУБЫ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allClubs.map(club => (
              <ClubItem key={club.id} {...club} />
            ))}
          </div>
        </div>
        
        <div className="p-4 text-center">
          <button className="text-blue-600 hover:underline">Вперёд</button>
        </div>
      </div>
    </div>
    </>

  );
}