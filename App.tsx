import React from 'react';
import { useState, useCallback } from 'react';
import { Booking, TimeSlot, View, DaySchedule } from './types';
import { INITIAL_SCHEDULE } from './constants';
import Header from './components/Header';
import TimeSlotSelector from './components/TimeSlotSelector';
import AdminSchedule from './components/AdminSchedule';
import BookingModal from './components/BookingModal';
import Notification from './components/Notification';

type SelectedBookingInfo = { slot: TimeSlot; day: DaySchedule };

export default function App() {
  const [view, setView] = useState<View>(View.CUSTOMER);
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBookingInfo, setSelectedBookingInfo] = useState<SelectedBookingInfo | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSelectSlot = (slot: TimeSlot, day: DaySchedule) => {
    if (slot.isBooked) return;
    setSelectedBookingInfo({ slot, day });
  };

  const handleCloseModal = () => {
    setSelectedBookingInfo(null);
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleBookingConfirmed = useCallback((newBooking: Omit<Booking, 'id'>) => {
    setBookings(prevBookings => {
        const newBookingWithId = { ...newBooking, id: Date.now() };
        return [...prevBookings, newBookingWithId];
    });
    
    setSchedule(prevSchedule =>
      prevSchedule.map(day => {
        if (day.dayOfWeek === newBooking.dayOfWeek) {
          return {
            ...day,
            slots: day.slots.map(slot =>
              slot.id === newBooking.slotId ? { ...slot, isBooked: true } : slot
            )
          };
        }
        return day;
      })
    );
    
    handleCloseModal();
    showNotification(`⚽ Nova pelada agendada para ${newBooking.dayOfWeek} às ${newBooking.time}!`);
    console.log(`MANAGER NOTIFICATION: New booking by ${newBooking.playerName} for ${newBooking.dayOfWeek} at ${newBooking.time}.`);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header currentView={view} setView={setView} />
      <main className="container mx-auto p-4 md:p-8">
        {view === View.CUSTOMER ? (
          <TimeSlotSelector schedule={schedule} onSelectSlot={handleSelectSlot} />
        ) : (
          <AdminSchedule bookings={bookings} schedule={schedule} setSchedule={setSchedule} />
        )}
      </main>

      {selectedBookingInfo && (
        <BookingModal
          bookingInfo={selectedBookingInfo}
          onClose={handleCloseModal}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}

      {notification && <Notification message={notification} />}
    </div>
  );
}
