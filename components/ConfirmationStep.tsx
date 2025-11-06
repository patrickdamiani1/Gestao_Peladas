import React from 'react';
import { useState } from 'react';
import { generateMatchSummary } from '../services/geminiService';

interface ConfirmationStepProps {
  playerName: string;
  time: string;
  dayOfWeek: string;
  onClose: () => void;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ playerName, time, dayOfWeek, onClose }) => {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setSummary('');
    const promptDetails = `${dayOfWeek} às ${time}`;
    const result = await generateMatchSummary(playerName, promptDetails);
    setSummary(result);
    setIsLoading(false);
  };

  return (
    <div className="text-center">
      <div className="mx-auto bg-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <h4 className="text-lg font-semibold text-on-surface">Pagamento Confirmado!</h4>
      <p className="text-on-surface-secondary mt-2">
        A pelada de <span className="font-bold text-primary">{playerName}</span> na <span className="font-bold text-primary">{dayOfWeek}</span> às <span className="font-bold text-primary">{time}</span> está agendada!
      </p>

      <div className="mt-6 text-left p-4 bg-background rounded-lg min-h-[100px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-on-surface-secondary">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Gerando resumo épico...</span>
          </div>
        ) : summary ? (
          <p className="text-sm text-on-surface-secondary italic whitespace-pre-wrap">{summary}</p>
        ) : (
          <p className="text-sm text-gray-500">Gere um resumo da partida com nossa IA!</p>
        )}
      </div>

      <button
        onClick={handleGenerateSummary}
        disabled={isLoading}
        className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:bg-gray-500"
      >
        ✨ Gerar Resumo da Partida com IA
      </button>

      <button
        onClick={onClose}
        className="mt-2 w-full bg-transparent border border-gray-600 text-on-surface-secondary font-bold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300"
      >
        Fechar
      </button>
    </div>
  );
};

export default ConfirmationStep;
