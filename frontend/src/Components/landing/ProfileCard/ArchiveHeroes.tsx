import { heroes } from "../../../types/Card/heroes";
import { ProfileCard } from "./profileCard";

export default function ArchiveHeroes() {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-pink-500">ЛУЧШИЕ АРХИВ ГЕРОИ</h2>
          <svg
            className="w-6 h-6 text-pink-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {heroes.map((hero) => (
            <ProfileCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    )
  }