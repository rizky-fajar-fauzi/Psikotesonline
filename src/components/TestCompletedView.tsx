import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Lock, RefreshCw, Printer, Send, Check } from 'lucide-react';
import { ParticipantInfo } from '../types';
import { motion } from 'motion/react';

interface TestCompletedViewProps {
  submissionResult?: any;
  participant: ParticipantInfo;
  referenceCode: string;
  onReset: () => void;
}

export const TestCompletedView: React.FC<TestCompletedViewProps> = ({
  submissionResult,
  participant,
  referenceCode,
  onReset,
}) => {

  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailTarget, setEmailTarget] = useState(participant.email);

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    setEmailStatus('idle');
    try {
      const res = await fetch('/api/send-participant-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referenceCode,
          email: emailTarget,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setEmailStatus('success');
      } else {
        setEmailStatus('error');
      }
    } catch (err) {
      setEmailStatus('error');
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (

    <div className="max-w-4xl mx-auto my-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-center"
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-8 text-white relative">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30 shadow-inner">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 mb-2">
            Status: Selesai & Terverifikasi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Terima Kasih, {participant.name}!
          </h2>
          <p className="mt-1 text-emerald-100 text-sm sm:text-base">
            Jawaban Tes Kepribadian Anda Telah Berhasil Terkirim.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Reference Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 inline-block w-full max-w-md">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Kode Referensi Pengerjaan
            </span>
            <span className="text-2xl font-black text-indigo-700 font-mono tracking-wider block mt-0.5">
              {referenceCode}
            </span>
          </div>

          {/* Result Section */}
          
          {/* Result Section (HIDDEN) */}
          <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-5 text-left flex items-start space-x-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-blue-600/20">
              <Lock className="w-5 h-5" />
            </div>
            <div className="text-sm text-slate-700 leading-relaxed">
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Proteksi Hasil Tes (Kerahasiaan Evaluasi)
              </h3>
              <p className="mb-2">
                Sesuai standar kerahasiaan evaluasi psikometri dan instruksi pengelola, <strong className="text-blue-900">hasil tes akhir tidak ditampilkan di layar ini</strong>.
              </p>
              <p className="text-xs text-slate-600">
                Data jawaban Anda telah tersimpan otomatis di database server. Admin/pengelola HR dapat mengakses dan melihat hasil evaluasi lengkap Anda melalui Portal Admin.
              </p>
            </div>
          </div>

          {/* Participant Info Summary */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left">
            <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Detail Data Peserta Tes</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-slate-500 block">Nama Lengkap:</span>
                <span className="font-semibold text-slate-800">{participant.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Alamat Email:</span>
                <span className="font-semibold text-slate-800">{participant.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block">No. HP / WhatsApp:</span>
                <span className="font-semibold text-slate-800">{participant.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Posisi / Jabatan:</span>
                <span className="font-semibold text-slate-800">{participant.position || '-'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col space-y-4 no-print border-t border-slate-200 mt-6 pt-6">
            
            <button
              onClick={onReset}
              className="w-full px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-lg flex items-center justify-center space-x-2 mx-auto transition-all"
            >
              <RefreshCw className="w-4 h-4 text-slate-300" />
              <span>Kembali ke Halaman Awal</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
