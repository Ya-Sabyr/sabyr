import { ArtworkProps } from "../../types/illistration/ArtworkProps";
import { Award } from 'lucide-react';

export const ArtworkCard: React.FC<ArtworkProps> = ({ title, imageUrl, likes, comments, awarded }) => (
    <div className="relative group">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
        <div className="flex items-center justify-between">
          <span className="text-white text-sm truncate">{title}</span>
          <div className="flex items-center space-x-2">
            {awarded && <Award size={16} className="text-yellow-400" />}
            <span className="text-gray-300 text-xs">{likes}</span>
            <span className="text-gray-300 text-xs">{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );