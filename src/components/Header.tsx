import React from 'react';
import { ShieldCheck, Lock, FileText, UserCheck, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onOpenInstructions: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInstructions }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg sm:text-xl tracking-tight text-white">Asesmen Kepribadian</h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                24 Nomor Soal
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Tes Online Kepribadian & Evaluasi Perilaku</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenInstructions}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Petunjuk Pengisian Tes"
          >
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span className="hidden md:inline">Petunjuk Tes</span>
          </button>
        </div>
      </div>
    </header>
  );
};
