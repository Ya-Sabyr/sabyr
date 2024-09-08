'use client'

import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, User, Briefcase, Coffee, Utensils, Zap, Music, PartyPopper, Plus } from 'lucide-react';
import { Header } from '../header/header';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);
const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
}

const EventCalendar: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState('01-07 Января 2025');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    date: '',
    time: '',
    description: '',
  });

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setIsLoggedIn(!!user);

    // Load events from localStorage
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const updatedEvents = [...events, { ...newEvent, id: Date.now() }];
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setIsModalOpen(false);
      setNewEvent({ title: '', date: '', time: '', description: '' });
    }
  };

  const renderEvent = (event: Event) => {
    const dayIndex = new Date(event.date).getDay();
    const timeIndex = timeSlots.indexOf(event.time);
    if (timeIndex === -1) return null;

    return (
      <div
        key={event.id}
        className="absolute bg-blue-500 text-white text-xs p-1 rounded"
        style={{
          top: `${timeIndex * 32 + 4}px`,
          left: `${(dayIndex + 1) * 12.5}%`,
          width: '12%',
          height: '28px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={`${event.title}\n${event.description}`}
      >
        {event.title}
      </div>
    );
  };

  return (
    <>
      <Header />
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
                <div className="border-t border-gray-200 relative">
                  {timeSlots.map(time => (
                    <div key={time} className="grid grid-cols-8 gap-2 border-b border-gray-200">
                      <div className="text-right text-sm text-gray-500 pr-2">{time}</div>
                      {daysOfWeek.map(day => (
                        <div key={`${day}-${time}`} className="border-l border-gray-200 h-8"></div>
                      ))}
                    </div>
                  ))}
                  {events.map(renderEvent)}
                </div>
              </div>
            </div>
            <div className="mt-4 text-center text-gray-500">
              {events.length === 0 ? (
                <>
                  <PartyPopper className="inline-block mr-2 w-5 h-5" />
                  Нет предстоящих событий
                </>
              ) : (
                <p>{events.length} предстоящих событий</p>
              )}
            </div>
            {isLoggedIn && (
              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить событие
                </button>
                {isModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                      <h2 className="text-xl font-bold mb-4">Добавить новое событие</h2>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Название
                          </label>
                          <input
                            type="text"
                            id="title"
                            value={newEvent.title}
                            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Дата
                          </label>
                          <input
                            type="date"
                            id="date"
                            value={newEvent.date}
                            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                            Время
                          </label>
                          <select
                            id="time"
                            value={newEvent.time}
                            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option value="">Выберите время</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Описание
                          </label>
                          <input
                            type="text"
                            id="description"
                            value={newEvent.description}
                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end space-x-3">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300"
                        >
                          Отмена
                        </button>
                        <button
                          onClick={handleAddEvent}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                        >
                          Добавить событие
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCalendar;