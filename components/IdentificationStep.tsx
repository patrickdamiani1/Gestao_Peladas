import React from 'react';
import { useState } from 'react';
import { TimeSlot, DaySchedule } from '../types';
import { FIELD_PRICE } from '../constants';

interface IdentificationStepProps {
  bookingInfo: { slot: TimeSlot; day: DaySchedule };
  onSubmit: (details: { name: string, cpf: string, whatsapp: string }) => void;
}

const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '') // remove anything that is not a digit
    .replace(/(\d{3})(\d)/, '$1.$2') // capture 2 groups of 3 digits and add a dot
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .substring(0, 14); // limit to 14 characters
};

const formatWhatsApp = (value: string) => {
    return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .substring(0, 15);
}

const IdentificationStep: React.FC<IdentificationStepProps> = ({ bookingInfo, onSubmit }) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && cpf.length === 14 && whatsapp.length >= 14) {
      onSubmit({ name: name.trim(), cpf, whatsapp });
    }
  };

  const isFormValid = name.trim().length > 2 && cpf.length === 14 && whatsapp.length >= 14;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-on-surface-secondary mb-4 text-center">
        Você está agendando a pelada de <span className="font-bold text-primary">{bookingInfo.day.dayOfWeek}</span> às <span className="font-bold text-primary">{bookingInfo.slot.time}</span>.
        O valor é de <span className="font-bold text-primary">R$ {FIELD_PRICE}</span>.
      </p>
      
      <div>
        <label htmlFor="playerName" className="block text-sm font-medium text-on-surface-secondary mb-1">
          Nome Completo do Responsável
        </label>
        <input
          type="text"
          id="playerName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-background border border-gray-600 rounded-md px-3 py-2 text-on-surface focus:ring-primary focus:border-primary"
          placeholder="Ex: João da Silva"
          required
          autoFocus
        />
      </div>

       <div>
        <label htmlFor="cpf" className="block text-sm font-medium text-on-surface-secondary mb-1">
          CPF
        </label>
        <input
          type="text"
          id="cpf"
          value={cpf}
          onChange={(e) => setCpf(formatCPF(e.target.value))}
          className="w-full bg-background border border-gray-600 rounded-md px-3 py-2 text-on-surface focus:ring-primary focus:border-primary"
          placeholder="000.000.000-00"
          required
        />
      </div>

       <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-on-surface-secondary mb-1">
          WhatsApp
        </label>
        <input
          type="tel"
          id="whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
          className="w-full bg-background border border-gray-600 rounded-md px-3 py-2 text-on-surface focus:ring-primary focus:border-primary"
          placeholder="(00) 00000-0000"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!isFormValid}
      >
        Avançar para Pagamento
      </button>
    </form>
  );
};

export default IdentificationStep;
