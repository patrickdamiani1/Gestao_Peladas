import React from 'react';
import { useState } from 'react';
import { PaymentMethod } from '../types';

interface PaymentStepProps {
  onSubmit: (method: PaymentMethod) => void;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(PaymentMethod.PIX);
    }, 1500);
  };

  return (
    <div>
      <h4 className="text-lg font-semibold text-center mb-4">Pague com PIX</h4>
      <div className="text-center p-4 bg-background rounded-lg border border-gray-700 mb-6">
        <p className="text-sm text-on-surface-secondary">Aponte a câmera do seu celular para o QR Code</p>
        <div className="w-40 h-40 bg-white mx-auto my-4 flex items-center justify-center text-black font-mono text-xs p-2 rounded-md">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5913NOME%20DO%20RECEBEDOR6008BRASILIA62070503***6304E7C4" alt="QR Code PIX" />
        </div>
        <p className="text-sm text-on-surface-secondary mt-4">Ou use o Pix Copia e Cola:</p>
        <div className="mt-2 p-2 bg-gray-900 rounded-md text-xs text-primary font-mono break-all relative">
          <p>00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5913NOME6008BRASILIA62070503***6304E7C4</p>
          <button 
            onClick={() => navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5913NOME6008BRASILIA62070503***6304E7C4')}
            className="absolute top-2 right-2 text-on-surface-secondary hover:text-on-surface"
            aria-label="Copiar chave PIX"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </button>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-dark transition-colors duration-300 disabled:bg-gray-600 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processando Pagamento...
          </>
        ) : (
          'Confirmar Pagamento'
        )}
      </button>
    </div>
  );
};

export default PaymentStep;
