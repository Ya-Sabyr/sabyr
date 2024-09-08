import React, { useState } from 'react';
import { ChevronDown, Search, User, Briefcase, Coffee, Utensils, Zap, Music, PartyPopper } from 'lucide-react';
import { Header } from '../header/header';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);
const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

const EventCalendar: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState('01-07 Января 2025');

  return (
    <>
    <Header/>
      <div className="bg-white min-h-screen font-sans p-4">
      <h1 className="text-2xl font-bold mb-4">Календарь предстоящих мероприятий</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Monthly calendar */}
        <div className="lg:w-1/4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Январь</h2>
            <div className="grid grid-cols-7 gap-1">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center text-sm font-medium">{day}</div>
              ))}
              {monthDays.map(day => (
                <div key={day} className={`text-center p-2 ${day === 1 ? 'bg-blue-500 text-white rounded-full' : ''}`}>
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Weekly calendar */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <button className="mr-2">≡</button>
              <div className="relative">
                <select 
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none focus:border-blue-500"
                >
                  <option>01-07 Января 2025</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-8 gap-2 mb-2">
                <div></div>
                {daysOfWeek.map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="font-medium">{day}</div>
                    <div className="text-sm text-gray-500">{index + 1}</div>
                    {index === 0 && <User className="mx-auto mt-1 w-4 h-4" />}
                    {index === 1 && <Briefcase className="mx-auto mt-1 w-4 h-4" />}
                    {index === 2 && <Coffee className="mx-auto mt-1 w-4 h-4" />}
                    {index === 3 && <Utensils className="mx-auto mt-1 w-4 h-4" />}
                    {index === 4 && <Zap className="mx-auto mt-1 w-4 h-4" />}
                    {index === 5 && <Music className="mx-auto mt-1 w-4 h-4" />}
                    {index === 6 && <PartyPopper className="mx-auto mt-1 w-4 h-4" />}
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200">
                {timeSlots.map(time => (
                  <div key={time} className="grid grid-cols-8 gap-2 border-b border-gray-200">
                    <div className="text-right text-sm text-gray-500 pr-2">{time}</div>
                    {daysOfWeek.map(day => (
                      <div key={`${day}-${time}`} className="border-l border-gray-200 h-8"></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-500">
            <PartyPopper className="inline-block mr-2 w-5 h-5" />
            Нет предстоящих событий
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default EventCalendar;