import React, { useState } from 'react';
import { HelpCircle, ArrowRight, ArrowLeft, Plus, Minus, ShieldAlert } from 'lucide-react';
import { ParticipantInfo } from '../types';

interface TestInstructionsViewProps {
  onStartTest: () => void;
  onBack: () => void;
  participant: ParticipantInfo | null;
}

export const TestInstructionsView: React.FC<TestInstructionsViewProps> = ({ onStartTest, onBack, participant }) => {
  return (
    <div className="max-w-3xl mx-auto my-8 px-4 sm:px-6">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center space-x-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Form Identitas</span>
      </button>
      
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white relative">
          <div className="relative z-10 flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
                Persiapan Sebelum Tes
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Petunjuk Pengisian Tes</h2>
              <p className="mt-1 text-slate-300 text-sm sm:text-base">
                Halo {participant?.name?.split(' ')[0] || 'Peserta'}, mohon baca instruksi berikut dengan teliti.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Instruction Box */}
          <div className="bg-slate-50 border border-indigo-200 shadow-sm rounded-2xl px-5 sm:px-6 py-5">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="mt-0.5 shrink-0">
                <HelpCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-sm sm:text-base text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900">Petunjuk Pengisian Form: </span>
                Pilih <strong className="text-slate-900">1 Tanda (+)</strong> untuk sifat yang <u className="underline-offset-2">PALING menggambarkan</u> diri Anda, dan pilih <strong className="text-slate-900">1 Tanda (-)</strong> untuk sifat yang <u className="underline-offset-2">PALING TIDAK menggambarkan</u> diri Anda. (Setiap nomor wajib memilih 1 (+) dan 1 (-)).
              </div>
            </div>
          </div>

          {/* Example Section */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs mr-2 border border-indigo-200">
                <ShieldAlert className="w-3.5 h-3.5" />
              </span>
              Contoh Cara Mengisi Soal
            </h3>
            
            <div className="border border-slate-200 rounded-xl overflow-hidden mb-4 opacity-90 shadow-sm pointer-events-none">
               <div className="bg-slate-50 p-4 border-b border-slate-200 font-semibold flex items-center text-slate-700 text-sm">
                 <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mr-3 text-xs">Ex</span>
                 Simulasi Tampilan Soal
               </div>
               <div className="divide-y divide-slate-100">
                 {/* Option 1 */}
                 <div className="p-3 flex items-center justify-between bg-emerald-50/50">
                   <span className="text-sm text-slate-800">
                     Gampang bergaul dan ramah <br className="sm:hidden" />
                     <span className="text-emerald-700 font-semibold text-xs sm:ml-2">(Contoh: Ini PALING Menggambarkan Anda)</span>
                   </span>
                   <div className="flex space-x-2 shrink-0 ml-4">
                     <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center ring-2 ring-emerald-500/20"><Plus className="w-5 h-5"/></button>
                     <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-100 text-slate-400 opacity-50"><Minus className="w-5 h-5"/></button>
                   </div>
                 </div>
                 {/* Option 2 */}
                 <div className="p-3 flex items-center justify-between bg-white">
                   <span className="text-sm text-slate-600">Berani mengambil risiko</span>
                   <div className="flex space-x-2 shrink-0 ml-4">
                     <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-100 text-slate-400"><Plus className="w-5 h-5"/></button>
                     <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-100 text-slate-400"><Minus className="w-5 h-5"/></button>
                   </div>
                 </div>
                 {/* Option 3 */}
                 <div className="p-3 flex items-center justify-between bg-rose-50/50">
                   <span className="text-sm text-slate-800">
                     Pendiam dan tertutup <br className="sm:hidden" />
                     <span className="text-rose-700 font-semibold text-xs sm:ml-2">(Contoh: Ini PALING TIDAK Menggambarkan Anda)</span>
                   </span>
                   <div className="flex space-x-2 shrink-0 ml-4">
                     <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-100 text-slate-400 opacity-50"><Plus className="w-5 h-5"/></button>
                     <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-rose-500 text-white flex items-center justify-center ring-2 ring-rose-500/20"><Minus className="w-5 h-5"/></button>
                   </div>
                 </div>
                 {/* Option 4 */}
                 <div className="p-3 flex items-center justify-between bg-white">
                   <span className="text-sm text-slate-600">Sangat teliti dan akurat</span>
                   <div className="flex space-x-2 shrink-0 ml-4">
                     <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-100 text-slate-400"><Plus className="w-5 h-5"/></button>
                     <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-100 text-slate-400"><Minus className="w-5 h-5"/></button>
                   </div>
                 </div>
               </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              * Pastikan Anda menekan tombol bertanda <strong className="text-emerald-600 bg-emerald-100 px-1 py-0.5 rounded">(+)</strong> untuk 1 sifat yang paling cocok, dan tombol bertanda <strong className="text-rose-600 bg-rose-100 px-1 py-0.5 rounded">(-)</strong> untuk 1 sifat yang paling tidak cocok dalam satu kelompok soal.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
             <button
              onClick={onStartTest}
              className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-base shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Saya Mengerti, Mulai Tes Sekarang</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
