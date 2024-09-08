import React from 'react';
import { Search } from 'lucide-react';
import { ArtworkCard } from './artCard';
import { ArtworkProps } from '../../types/illistration/ArtworkProps';
import { Header } from '../header/header';

interface ArtPageProps {
  artworks: ArtworkProps[];
}

const ArtPage: React.FC<ArtPageProps> = ({ artworks }) => {
  return (
    <>
    <Header/>
        <div className="bg-gray-900 min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-4">
          <select className="bg-gray-800 text-white text-sm rounded-l-md px-3 py-2 focus:outline-none">
            <option>САМЫЕ ПОПУЛЯРНЫЕ</option>
          </select>
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Поисковать"
              className="w-full bg-gray-800 text-white text-sm rounded-r-md pl-3 pr-10 py-2 focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-3 gap-4">
          {artworks.map((artwork, index) => (
            <div key={artwork.id} className={`${index === 0 || index === 5 ? 'col-span-2 row-span-2' : ''}`}>
              <ArtworkCard {...artwork} />
            </div>
          ))}
        </div>
      </div>
    </div>
    </>

  );
};

export default ArtPage;
