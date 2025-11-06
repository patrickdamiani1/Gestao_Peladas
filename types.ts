export interface TimeSlot {
  id: string; // e.g., "Segunda-feira-18:00"
  time: string;
  isBooked: boolean;
}

export interface DaySchedule {
  dayOfWeek: string;
  dayIndex: number; // 1 for Monday, ..., 7 for Sunday
  isActive: boolean;
  slots: TimeSlot[];
}

export interface Booking {
  id: number;
  slotId: string;
  dayOfWeek: string;
  time: string;
  playerName: string;
  cpf: string;
  whatsapp: string;
  paymentMethod: PaymentMethod;
  status: 'PAGO';
}

export enum PaymentMethod {
  PIX = 'PIX',
}

export enum View {
  CUSTOMER = 'CUSTOMER',
  MANAGER = 'MANAGER',
}

export enum BookingStep {
  IDENTIFICATION = 'IDENTIFICATION',
  PAYMENT = 'PAYMENT',
  CONFIRMATION = 'CONFIRMATION',
}
