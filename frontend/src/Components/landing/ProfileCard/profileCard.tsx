import { Link } from "react-router-dom";
import { Hero } from "../../../types/Card/Hero";

export const ProfileCard: React.FC<Hero> = ({ name, imageUrl }) => (
    <div className="flex items-center space-x-3">
      <img src={imageUrl} alt={name} className="w-12 h-12 rounded-full" />
      <div>
        <h3 className="font-medium text-sm">{name}</h3>
        <Link to="/illustration" className="text-xs text-gray-500 hover:underline">
          Иллюстрации
        </Link>
      </div>
    </div>
  )