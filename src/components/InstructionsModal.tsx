import React from 'react';
import { HelpCircle, X, CheckCircle2, Plus, Minus, Lock } from 'lucide-react';

interface InstructionsModalProps {
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <HelpCircle className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-slate-900">Petunjuk Pengisian Tes Kepribadian</h3>
        <p className="mt-1 text-xs text-slate-500">Standar Pengisian Formulir (24 Nomor Soal)</p>

        <div className="mt-5 space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
              <span>24 Nomor Soal dengan 4 Pernyataan</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Setiap nomor soal berisi 4 baris pernyataan sifat kepribadian. Tidak ada jawaban benar atau salah, jawablah secara jujur sesuai diri Anda yang sebenarnya.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
              <span>Pilih 1 (+) Most & 1 (-) Least</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Di setiap nomor soal, Anda <strong>WAJIB</strong> memilih:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
              <li>
                <strong className="text-emerald-700">1 Tanda (+) Most:</strong> Pernyataan yang <u>PALING menggambarkan</u> sifat Anda.
              </li>
              <li>
                <strong className="text-rose-700">1 Tanda (-) Least:</strong> Pernyataan yang <u>PALING TIDAK menggambarkan</u> sifat Anda.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
            <h4 className="font-bold text-amber-950 flex items-center space-x-1.5">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>Proteksi Kerahasiaan Hasil Tes</span>
            </h4>
            <p className="text-amber-900 text-xs leading-relaxed">
              Di akhir pengerjaan, hasil tes tidak ditampilkan kepada peserta di layar ini. Hasil tes disimpan secara otomatis di database server dan dikirimkan secara langsung ke Email Admin / pengelola.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md"
          >
            Paham & Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};
