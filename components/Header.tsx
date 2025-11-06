import React from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-primary text-white shadow-lg'
        : 'text-on-surface-secondary hover:bg-surface hover:text-on-surface'
    }`}
  >
    {label}
  </button>
);

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="bg-surface shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚽</span>
          <h1 className="text-xl md:text-2xl font-bold text-on-surface">
            Gerenciador de Peladas <span className="text-primary">AI</span>
          </h1>
        </div>
        <nav className="flex items-center gap-2 p-1 bg-background rounded-lg">
          <NavButton
            label="Área do Cliente"
            isActive={currentView === View.CUSTOMER}
            onClick={() => setView(View.CUSTOMER)}
          />
          <NavButton
            label="Área do Gestor"
            isActive={currentView === View.MANAGER}
            onClick={() => setView(View.MANAGER)}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
