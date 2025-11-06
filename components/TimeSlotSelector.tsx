import React from 'react';
import { useState } from 'react';
import { TimeSlot, DaySchedule } from '../types';

interface TimeSlotSelectorProps {
  schedule: DaySchedule[];
  onSelectSlot: (slot: TimeSlot, day: DaySchedule) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ schedule, onSelectSlot }) => {
  const activeDays = schedule.filter(day => day.isActive);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(activeDays.length > 0 ? activeDays[0].dayIndex : -1);

  const selectedDay = schedule.find(d => d.dayIndex === selectedDayIndex);

  return (
    <div className="bg-surface p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-on-surface">
        Selecione um Dia e Horário para sua Pelada
      </h2>
      
      <div className="flex justify-center flex-wrap gap-2 border-b border-gray-700 pb-4 mb-6">
        {activeDays.map(day => (
          <button
            key={day.dayIndex}
            onClick={() => setSelectedDayIndex(day.dayIndex)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              selectedDayIndex === day.dayIndex
                ? 'bg-primary text-white shadow-md'
                : 'bg-background text-on-surface-secondary hover:bg-surface hover:text-on-surface'
            }`}
          >
            {day.dayOfWeek}
          </button>
        ))}
        {activeDays.length === 0 && <p className="text-on-surface-secondary">Nenhum dia disponível para agendamento.</p>}
      </div>

      {selectedDay ? (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {selectedDay.slots.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => onSelectSlot(slot, selectedDay)}
                  disabled={slot.isBooked}
                  className={`p-4 rounded-lg text-center font-bold text-lg transition-all duration-300 transform 
                    ${
                      slot.isBooked
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed line-through'
                        : 'bg-background hover:bg-primary hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50'
                    }`}
                >
                  {slot.time}
                </button>
              ))}
               {selectedDay.slots.length === 0 && <p className="text-on-surface-secondary col-span-full text-center">Nenhum horário disponível para {selectedDay.dayOfWeek}.</p>}
            </div>
            <p className="text-center mt-6 text-on-surface-secondary">
              Horários em <span className="text-gray-500">cinza</span> já estão reservados.
            </p>
        </>
      ) : (
        <div className="text-center py-8">
            <p className="text-on-surface-secondary">Selecione um dia da semana para ver os horários disponíveis.</p>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;
