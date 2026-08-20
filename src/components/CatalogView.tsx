import React from 'react';
import { motion } from 'motion/react';
import { Brain, LayoutGrid, List, ArrowRight, Lock, Key } from 'lucide-react';

interface CatalogViewProps {
  onSelectTest: (testId: string) => void;
  onEnterCode: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ onSelectTest, onEnterCode }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Katalog Psikotes
            </h1>
            <p className="text-slate-600 max-w-xl text-base leading-relaxed">
              Selamat datang di portal asesmen. Pilih jenis tes yang ingin Anda kerjakan atau gunakan kode akses jika Anda memilikinya.
            </p>
          </div>
          <button
            onClick={onEnterCode}
            className="inline-flex items-center space-x-2 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            <Key className="w-4 h-4" />
            <span>Masuk dengan Kode Akses</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Card 1: DISC (Active) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col h-full group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Tersedia
              </span>
            </div>
            
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Brain className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2">Analisa Kepribadian</h3>
            <p className="text-slate-600 text-sm mb-6 flex-grow">
              Identifikasi profil kepribadian, gaya perilaku, dan cara berkomunikasi Anda dalam berbagai situasi dan kondisi.
            </p>
            
            <button
              onClick={() => onSelectTest('disc')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-sm flex items-center justify-center space-x-2 transition-colors"
            >
              <span>Mulai Tes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: PAPI Kostick (Coming Soon) */}
          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col h-full relative overflow-hidden opacity-80">
            <div className="absolute top-0 right-0 p-4">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-600">
                Segera Hadir
              </span>
            </div>
            
            <div className="w-12 h-12 bg-slate-200 text-slate-500 rounded-xl flex items-center justify-center mb-5">
              <List className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2">Tes Gaya Perilaku</h3>
            <p className="text-slate-500 text-sm mb-6 flex-grow">
              Ukur kebutuhan dan peran individu dalam keseharian berdasarkan 20 aspek psikologis.
            </p>
            
            <button
              disabled
              className="w-full py-2.5 px-4 rounded-xl bg-slate-200 text-slate-400 font-semibold text-sm flex items-center justify-center space-x-2 cursor-not-allowed"
            >
              <Lock className="w-4 h-4" />
              <span>Terkunci</span>
            </button>
          </div>


        </div>
      </motion.div>
    </div>
  );
};
