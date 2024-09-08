import React from 'react';
import { Header } from '../header/header';

interface User {
  rank: number;
  photo: string;
  name: string;
  sales: number;
}

const users: User[] = [
    { rank: 4, photo: 'https://randomuser.me/api/portraits/men/31.jpg', name: 'Rafael Pereira', sales: 20 },
    { rank: 5, photo: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Larissa Santos', sales: 19 },
    { rank: 6, photo: 'https://randomuser.me/api/portraits/women/47.jpg', name: 'Gabrielly Tavares', sales: 16 },
    { rank: 7, photo: 'https://randomuser.me/api/portraits/men/46.jpg', name: 'Renan Matos', sales: 12 },
    { rank: 8, photo: 'https://randomuser.me/api/portraits/men/28.jpg', name: 'Hugo Souza', sales: 8 },
    { rank: 9, photo: 'https://randomuser.me/api/portraits/women/62.jpg', name: 'Jessica Silva', sales: 5 },
    { rank: 10, photo: 'https://randomuser.me/api/portraits/men/50.jpg', name: 'Fernando Lima', sales: 3 },
  ];
  

const RatingsTable: React.FC<{ title: string; data: User[] }> = ({ title, data }) => (
  <div className="mb-8">
    <h2 className="text-lg font-semibold bg-gray-100 p-3">{title}</h2>
    <table className="w-full">
      <thead>
        <tr className="text-left text-sm">
          <th className="p-3 font-semibold">Rank</th>
          <th className="p-3 font-semibold">Foto</th>
          <th className="p-3 font-semibold">Colaborador</th>
          <th className="p-3 font-semibold">Vendas</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.rank} className="border-t border-gray-200">
            <td className="p-3">{user.rank}</td>
            <td className="p-3">
              <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full" />
            </td>
            <td className="p-3">{user.name}</td>
            <td className="p-3 text-blue-600 font-semibold">{user.sales}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RatingsPage: React.FC = () => {
  return (
    <>
    <Header/>
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Рейтинги</h1>
        <RatingsTable title="КЛУБЫ" data={users} />
        <RatingsTable title="ПОЛЬЗОВАТЕЛИ" data={users} />
      </div>
    </div>
    </>
    
  );
};

export default RatingsPage;