import React, { useState, useEffect } from 'react';
import { discQuestions } from '../data/discQuestions';
import { AnswerSelection, ParticipantInfo } from '../types';
import {
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle2,
  AlertCircle,
  ListOrdered,
  HelpCircle,
  X,
  User,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DiscTestRunnerProps {
  participant: ParticipantInfo;
  onSubmitTest: (answers: Record<number, AnswerSelection>) => void;
  isSubmitting: boolean;
}

export const DiscTestRunner: React.FC<DiscTestRunnerProps> = ({
  participant,
  onSubmitTest,
  isSubmitting,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 0..23
  const [answers, setAnswers] = useState<Record<number, AnswerSelection>>({});
  const [showOverviewDrawer, setShowOverviewDrawer] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  

  

  const currentQ = discQuestions[currentQuestionIndex];
  const totalQuestions = discQuestions.length;

  const currentSelection = answers[currentQ.id] || { mostIndex: -1, leastIndex: -1 };

  const answeredCount = (Object.values(answers) as AnswerSelection[]).filter(
    (a) => a.mostIndex !== -1 && a.leastIndex !== -1
  ).length;

  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectMost = (optionIndex: number) => {
    setValidationError(null);
    setAnswers((prev) => {
      const existing = prev[currentQ.id] || { mostIndex: -1, leastIndex: -1 };
      // If clicking already selected Most, unselect
      if (existing.mostIndex === optionIndex) {
        return { ...prev, [currentQ.id]: { ...existing, mostIndex: -1 } };
      }
      // If same index as Least, reset Least
      const newLeast = existing.leastIndex === optionIndex ? -1 : existing.leastIndex;
      return {
        ...prev,
        [currentQ.id]: { mostIndex: optionIndex, leastIndex: newLeast },
      };
    });
  };

  const handleSelectLeast = (optionIndex: number) => {
    setValidationError(null);
    setAnswers((prev) => {
      const existing = prev[currentQ.id] || { mostIndex: -1, leastIndex: -1 };
      // If clicking already selected Least, unselect
      if (existing.leastIndex === optionIndex) {
        return { ...prev, [currentQ.id]: { ...existing, leastIndex: -1 } };
      }
      // If same index as Most, reset Most
      const newMost = existing.mostIndex === optionIndex ? -1 : existing.mostIndex;
      return {
        ...prev,
        [currentQ.id]: { mostIndex: newMost, leastIndex: optionIndex },
      };
    });
  };

  const isCurrentComplete = currentSelection.mostIndex !== -1 && currentSelection.leastIndex !== -1;

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleAttemptSubmit = () => {
    // Check if all 24 questions are answered
    const unansweredIds: number[] = [];
    for (const q of discQuestions) {
      const sel = answers[q.id];
      if (!sel || sel.mostIndex === -1 || sel.leastIndex === -1) {
        unansweredIds.push(q.id);
      }
    }

    if (unansweredIds.length > 0) {
      setValidationError(
        `Masih ada ${unansweredIds.length} nomor soal yang belum diisi (Soal No: ${unansweredIds.join(', ')}). Mohon lengkapi semua soal.`
      );
      // Jump to first unanswered question
      const firstUnansweredIndex = discQuestions.findIndex((q) => q.id === unansweredIds[0]);
      if (firstUnansweredIndex !== -1) {
        setCurrentQuestionIndex(firstUnansweredIndex);
      }
      return;
    }

    onSubmitTest(answers);
  };

  return (
    <div 
      className="max-w-4xl mx-auto my-6 px-4 sm:px-6 relative"
    >
      

      {/* Top Participant Badge & Progress Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-base">{participant.name}</h2>
              <p className="text-xs text-slate-500">
                {participant.position !== '-' ? `${participant.position} • ` : ''}
                {participant.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowOverviewDrawer(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <ListOrdered className="w-4 h-4 text-slate-600" />
              <span>Daftar Soal ({answeredCount}/24)</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs font-medium text-slate-600 mb-1.5">
            <span>Progress Pengisian</span>
            <span>
              {answeredCount} dari {totalQuestions} Soal ({progressPercentage}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Validation Warning Alert */}
      {validationError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start space-x-3 shadow-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold block">Peringatan Soal Belum Lengkap</span>
            <span>{validationError}</span>
          </div>
          <button onClick={() => setValidationError(null)} className="text-rose-500 hover:text-rose-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
        {/* Question Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-extrabold text-base flex items-center justify-center shadow-md">
              {currentQ.id}
            </span>
            <div>
              <h3 className="font-bold text-base sm:text-lg">Nomor Soal {currentQ.id}</h3>
              <p className="text-xs text-slate-400">Pilihlah 1 (+ Most) dan 1 (- Least)</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isCurrentComplete ? (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Complete
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Belum Lengkap
              </span>
            )}
          </div>
        </div>

        {/* Options Table Header */}
        <div className="hidden sm:grid grid-cols-12 bg-slate-100/90 px-6 py-3 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
          <div className="col-span-8">Pernyataan Sifat</div>
          <div className="col-span-2 text-center text-emerald-700 font-extrabold flex items-center justify-center space-x-1">
            <Plus className="w-4 h-4" /> <span>Most</span>
          </div>
          <div className="col-span-2 text-center text-rose-700 font-extrabold flex items-center justify-center space-x-1">
            <Minus className="w-4 h-4" /> <span>Least</span>
          </div>
        </div>

        {/* Options List */}
        <div className="divide-y divide-slate-100">
          {currentQ.options.map((opt, idx) => {
            const isMost = currentSelection.mostIndex === idx;
            const isLeast = currentSelection.leastIndex === idx;

            return (
              <div
                key={idx}
                className={`p-4 sm:px-6 sm:py-4 transition-colors ${
                  isMost
                    ? 'bg-emerald-50/50'
                    : isLeast
                    ? 'bg-rose-50/50'
                    : 'hover:bg-slate-50/80'
                }`}
              >
                <div className="flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:items-center">
                  {/* Statement Text */}
                  <div className="sm:col-span-8 flex items-start space-x-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-slate-800 font-medium text-sm sm:text-base leading-snug">
                      {opt.text}
                    </span>
                  </div>

                  {/* Buttons for Mobile & Desktop */}
                  <div className="sm:col-span-4 flex items-center justify-end space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* (+) Most Button */}
                    <button
                      type="button"
                      onClick={() => handleSelectMost(idx)}
                      className={`flex-1 sm:flex-none py-2 px-3 sm:px-4 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                        isMost
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 ring-2 ring-emerald-600/30'
                          : 'bg-white border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Paling</span>
                    </button>
                    {/* (-) Least Button */}
                    <button
                      type="button"
                      onClick={() => handleSelectLeast(idx)}
                      className={`flex-1 sm:flex-none py-2 px-3 sm:px-4 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                        isLeast
                          ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20 ring-2 ring-rose-600/30'
                          : 'bg-white border-rose-300 text-rose-700 hover:bg-rose-50'
                      }`}
                    >
                      <Minus className="w-4 h-4" />
                      <span>Tidak</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <span className="text-xs font-semibold text-slate-500 hidden sm:inline-block">
            Gunakan tombol panah untuk berpindah nomor
          </span>

          {currentQuestionIndex < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 shadow-md transition-all"
            >
              <span>Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleAttemptSubmit}
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              <span>Selesai & Kirim Tes</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Submit Banner if on last question or answered all */}
      {answeredCount === totalQuestions && (
        <div className="mt-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-base">Semua 24 Soal Telah Terisi!</h4>
              <p className="text-xs text-emerald-100">
                Silakan periksa kembali atau tekan tombol di samping untuk mengirimkan jawaban Anda.
              </p>
            </div>
          </div>

          <button
            onClick={handleAttemptSubmit}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-emerald-800 font-extrabold text-sm hover:bg-emerald-50 transition-all shadow-md shrink-0 flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Kirimkan Tes Sekarang</span>
          </button>
        </div>
      )}

      {/* Overview Drawer Modal */}
      {showOverviewDrawer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Daftar Nomor Soal (24 Soal)</h3>
                <p className="text-xs text-slate-500">
                  {answeredCount} dari 24 nomor telah lengkap diisi
                </p>
              </div>
              <button
                onClick={() => setShowOverviewDrawer(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 overflow-y-auto grid grid-cols-6 sm:grid-cols-8 gap-2.5">
              {discQuestions.map((q, idx) => {
                const sel = answers[q.id];
                const isComplete = sel && sel.mostIndex !== -1 && sel.leastIndex !== -1;
                const isCurrent = currentQuestionIndex === idx;

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestionIndex(idx);
                      setShowOverviewDrawer(false);
                    }}
                    className={`h-11 rounded-xl text-xs font-bold flex flex-col items-center justify-center border transition-all ${
                      isCurrent
                        ? 'ring-2 ring-indigo-600 ring-offset-1 border-indigo-600 bg-indigo-50 text-indigo-900'
                        : isComplete
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{q.id}</span>
                    <span className="text-[9px]">
                      {isComplete ? '✓' : '-'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center space-x-3">
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5"></span> Lengkap</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 mr-1.5"></span> Belum</span>
              </div>

              <button
                onClick={() => setShowOverviewDrawer(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
