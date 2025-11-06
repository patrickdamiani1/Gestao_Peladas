import React from 'react';
import { useState } from 'react';
import { TimeSlot, PaymentMethod, Booking, BookingStep, DaySchedule } from '../types';
import IdentificationStep from './IdentificationStep';
import PaymentStep from './PaymentStep';
import ConfirmationStep from './ConfirmationStep';

interface BookingModalProps {
  bookingInfo: { slot: TimeSlot; day: DaySchedule };
  onClose: () => void;
  onBookingConfirmed: (newBooking: Omit<Booking, 'id'>) => void;
}

const Modal: React.FC<{ children: React.ReactNode; title: string; onClose: () => void }> = ({ children, title, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
    <div className="bg-surface rounded-lg shadow-2xl w-full max-w-md mx-auto relative animate-fade-in">
      <div className="p-6 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-xl font-bold text-on-surface">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);

const BookingModal: React.FC<BookingModalProps> = ({ bookingInfo, onClose, onBookingConfirmed }) => {
  const { slot, day } = bookingInfo;
  const [step, setStep] = useState<BookingStep>(BookingStep.IDENTIFICATION);
  const [bookingDetails, setBookingDetails] = useState({
      playerName: '',
      cpf: '',
      whatsapp: '',
  });
  
  const handleIdentificationSubmit = (details: { name: string, cpf: string, whatsapp: string }) => {
    setBookingDetails({ playerName: details.name, cpf: details.cpf, whatsapp: details.whatsapp });
    setStep(BookingStep.PAYMENT);
  };

  const handlePaymentSubmit = (method: PaymentMethod) => {
    const newBooking = {
      slotId: slot.id,
      dayOfWeek: day.dayOfWeek,
      time: slot.time,
      playerName: bookingDetails.playerName,
      cpf: bookingDetails.cpf,
      whatsapp: bookingDetails.whatsapp,
      paymentMethod: method,
      status: 'PAGO' as const,
    };
    onBookingConfirmed(newBooking);
    setStep(BookingStep.CONFIRMATION);
  };
  
  const getStepContent = () => {
    switch(step) {
      case BookingStep.IDENTIFICATION:
        return <IdentificationStep bookingInfo={bookingInfo} onSubmit={handleIdentificationSubmit} />;
      case BookingStep.PAYMENT:
        return <PaymentStep onSubmit={handlePaymentSubmit} />;
      case BookingStep.CONFIRMATION:
        return <ConfirmationStep playerName={bookingDetails.playerName} time={slot.time} dayOfWeek={day.dayOfWeek} onClose={onClose} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch(step) {
      case BookingStep.IDENTIFICATION:
        return `Agendar: ${day.dayOfWeek} às ${slot.time}`;
      case BookingStep.PAYMENT:
        return 'Forma de Pagamento';
      case BookingStep.CONFIRMATION:
        return 'Agendamento Confirmado!';
      default:
        return 'Agendamento';
    }
  }

  return (
    <Modal title={getTitle()} onClose={onClose}>
      {getStepContent()}
    </Modal>
  );
};

export default BookingModal;
