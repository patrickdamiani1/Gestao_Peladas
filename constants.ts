import { DaySchedule } from './types';

export const INITIAL_SCHEDULE: DaySchedule[] = [
  { dayIndex: 1, dayOfWeek: 'Segunda-feira', isActive: true, slots: [
      { id: 'Segunda-feira-18:00', time: '18:00', isBooked: false },
      { id: 'Segunda-feira-19:00', time: '19:00', isBooked: false },
      { id: 'Segunda-feira-20:00', time: '20:00', isBooked: true },
    ]
  },
  { dayIndex: 2, dayOfWeek: 'Terça-feira', isActive: true, slots: [
      { id: 'Terça-feira-19:00', time: '19:00', isBooked: false },
      { id: 'Terça-feira-21:00', time: '21:00', isBooked: false },
    ]
  },
  { dayIndex: 3, dayOfWeek: 'Quarta-feira', isActive: true, slots: [
      { id: 'Quarta-feira-18:00', time: '18:00', isBooked: false },
      { id: 'Quarta-feira-19:00', time: '19:00', isBooked: false },
      { id: 'Quarta-feira-20:00', time: '20:00', isBooked: false },
      { id: 'Quarta-feira-21:00', time: '21:00', isBooked: false },
    ]
  },
  { dayIndex: 4, dayOfWeek: 'Quinta-feira', isActive: true, slots: [
      { id: 'Quinta-feira-19:00', time: '19:00', isBooked: false },
      { id: 'Quinta-feira-20:00', time: '20:00', isBooked: false },
    ]
  },
  { dayIndex: 5, dayOfWeek: 'Sexta-feira', isActive: true, slots: [
      { id: 'Sexta-feira-18:00', time: '18:00', isBooked: false },
      { id: 'Sexta-feira-19:00', time: '19:00', isBooked: false },
      { id: 'Sexta-feira-20:00', time: '20:00', isBooked: false },
      { id: 'Sexta-feira-21:00', time: '21:00', isBooked: false },
      { id: 'Sexta-feira-22:00', time: '22:00', isBooked: false },
    ]
  },
  { dayIndex: 6, dayOfWeek: 'Sábado', isActive: false, slots: [] },
  { dayIndex: 7, dayOfWeek: 'Domingo', isActive: false, slots: [] },
];

export const FIELD_PRICE = "99,90";
