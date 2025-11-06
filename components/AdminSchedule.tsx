import React, { useState } from 'react';
import { Booking, DaySchedule, TimeSlot } from '../types';

interface AdminScheduleProps {
  bookings: Booking[];
  schedule: DaySchedule[];
  setSchedule: React.Dispatch<React.SetStateAction<DaySchedule[]>>;
}

type AdminTab = 'schedule' | 'config';

const AdminSchedule: React.FC<AdminScheduleProps> = ({ bookings, schedule, setSchedule }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('schedule');
  const [newTimes, setNewTimes] = useState<Record<number, string>>(
    schedule.reduce((acc, day) => ({ ...acc, [day.dayIndex]: '' }), {})
  );

  const sortedBookings = [...bookings].sort((a, b) => {
    const dayOrder = [1,2,3,4,5,6,7];
    const dayA = schedule.find(d => d.dayOfWeek === a.dayOfWeek)?.dayIndex ?? 0;
    const dayB = schedule.find(d => d.dayOfWeek === b.dayOfWeek)?.dayIndex ?? 0;
    
    const dayAIndex = dayOrder.indexOf(dayA);
    const dayBIndex = dayOrder.indexOf(dayB);

    if (dayAIndex !== dayBIndex) return dayAIndex - dayBIndex;
    return a.time.localeCompare(b.time);
  });

  const handleAddTime = (dayIndex: number) => {
    const time = newTimes[dayIndex].trim();
    if (!/^\d{2}:\d{2}$/.test(time)) {
      alert('Formato de hora inválido. Use HH:MM.');
      return;
    }

    setSchedule(prevSchedule =>
      prevSchedule.map(day => {
        if (day.dayIndex === dayIndex) {
          if (day.slots.some(slot => slot.time === time)) {
            alert('Este horário já existe para este dia.');
            return day;
          }
          const newSlot: TimeSlot = {
            id: `${day.dayOfWeek}-${time}`,
            time,
            isBooked: false,
          };
          const updatedSlots = [...day.slots, newSlot].sort((a, b) =>
            a.time.localeCompare(b.time)
          );
          return { ...day, slots: updatedSlots };
        }
        return day;
      })
    );
    setNewTimes(prev => ({ ...prev, [dayIndex]: '' }));
  };

  const handleRemoveTime = (dayIndex: number, slotId: string) => {
    setSchedule(prevSchedule =>
      prevSchedule.map(day =>
        day.dayIndex === dayIndex
          ? { ...day, slots: day.slots.filter(slot => slot.id !== slotId) }
          : day
      )
    );
  };
  
  const handleToggleDay = (dayIndex: number) => {
     setSchedule(prevSchedule =>
      prevSchedule.map(day =>
        day.dayIndex === dayIndex
          ? { ...day, isActive: !day.isActive }
          : day
      )
    );
  }

  return (
    <div className="bg-surface p-6 rounded-lg shadow-xl">
       <div className="border-b border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`${
              activeTab === 'schedule'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-secondary hover:text-on-surface hover:border-gray-500'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
          >
            Controle de Agendamentos
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`${
              activeTab === 'config'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-secondary hover:text-on-surface hover:border-gray-500'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
          >
            Configurar Horários
          </button>
        </nav>
      </div>

      {activeTab === 'schedule' ? (
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6 text-on-surface">Planilha de Controle de Agendamentos</h2>
          {sortedBookings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-on-surface-secondary text-lg">Nenhuma pelada agendada ainda.</p>
              <p className="text-sm text-gray-500 mt-2">Os agendamentos confirmados aparecerão aqui.</p>
            </div>
          ) : (
            <table className="w-full text-left table-auto">
              <thead className="border-b-2 border-primary">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-on-surface tracking-wider">Dia</th>
                  <th className="px-4 py-3 text-sm font-semibold text-on-surface tracking-wider">Horário</th>
                  <th className="px-4 py-3 text-sm font-semibold text-on-surface tracking-wider">Responsável</th>
                  <th className="px-4 py-3 text-sm font-semibold text-on-surface tracking-wider">CPF</th>
                  <th className="px-4 py-3 text-sm font-semibold text-on-surface tracking-wider">WhatsApp</th>
                  <th className="px-4 py-3 text-sm font-semibold text-on-surface tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedBookings.map((booking, index) => (
                  <tr key={booking.id} className={`border-b border-gray-700 ${index % 2 === 0 ? 'bg-background' : ''}`}>
                    <td className="px-4 py-4 whitespace-nowrap">{booking.dayOfWeek}</td>
                    <td className="px-4 py-4 whitespace-nowrap font-medium">{booking.time}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{booking.playerName}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-on-surface-secondary">{booking.cpf}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-on-surface-secondary">{booking.whatsapp}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-on-surface">Configuração de Dias e Horários</h2>
          <div className="space-y-6">
            {schedule.map(day => (
              <div key={day.dayIndex} className="p-4 bg-background rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-on-surface">{day.dayOfWeek}</h3>
                   <label className="flex items-center cursor-pointer">
                      <span className="mr-3 text-sm font-medium text-on-surface-secondary">
                        {day.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                      <div className="relative">
                        <input type="checkbox" checked={day.isActive} onChange={() => handleToggleDay(day.dayIndex)} className="sr-only peer" />
                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition peer-checked:translate-x-6 peer-checked:bg-primary`}></div>
                      </div>
                    </label>
                </div>
                
                {day.isActive && (
                     <>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
                          {day.slots.map(slot => (
                            <div key={slot.id} className="bg-surface p-2 rounded flex items-center justify-between text-sm">
                              <span>{slot.time}</span>
                              <button
                                onClick={() => handleRemoveTime(day.dayIndex, slot.id)}
                                className="text-red-500 hover:text-red-400 font-bold text-lg"
                                aria-label={`Remover horário ${slot.time}`}
                              >
                               &times;
                              </button>
                            </div>
                          ))}
                          {day.slots.length === 0 && <p className="text-on-surface-secondary text-sm col-span-full">Nenhum horário cadastrado.</p>}
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                           <input
                              type="time"
                              value={newTimes[day.dayIndex]}
                              onChange={e => setNewTimes(prev => ({ ...prev, [day.dayIndex]: e.target.value }))}
                              className="bg-surface border border-gray-600 rounded-md px-3 py-2 text-on-surface focus:ring-primary focus:border-primary w-32"
                           />
                           <button
                             onClick={() => handleAddTime(day.dayIndex)}
                             className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
                             disabled={!newTimes[day.dayIndex]}
                           >
                             Adicionar
                           </button>
                        </div>
                     </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSchedule;
