import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { CatalogView } from './components/CatalogView';
import { ParticipantForm } from './components/ParticipantForm';
import { TestInstructionsView } from './components/TestInstructionsView';
import { DiscTestRunner } from './components/DiscTestRunner';
import { TestCompletedView } from './components/TestCompletedView';
import { AdminPortal } from './components/AdminPortal';
import { InstructionsModal } from './components/InstructionsModal';
import { ParticipantInfo, AnswerSelection } from './types';

function AssessmentDashboard() {
  const [step, setStep] = useState<'catalog' | 'form' | 'instructions' | 'test' | 'completed'>('catalog');
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [participant, setParticipant] = useState<ParticipantInfo | null>(null);
  const [referenceCode, setReferenceCode] = useState<string>('');
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modals state
  const [showInstructions, setShowInstructions] = useState(false);

  // Handle Catalog selection
  const handleSelectTest = (testId: string) => {
    setSelectedTest(testId);
    setStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelForm = () => {
    setStep('catalog');
    setSelectedTest(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Participant registration submit
  const handleProceedToInstructions = (info: ParticipantInfo) => {
    setParticipant(info);
    setStep('instructions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleStartTest = () => {
    setStep('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToForm = () => {
    setStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Test answers submit
  const handleSubmitTest = async (answers: Record<number, AnswerSelection>) => {
    if (!participant) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submit-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participant, answers }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setReferenceCode(data.referenceCode);
        setSubmissionResult(data.result);
        setStep('completed');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('Gagal mengirimkan tes: ' + (data.error || 'Terjadi kesalahan server'));
      }
    } catch (err: any) {
      alert('Gagal menghubungi server. Silakan periksa koneksi Anda dan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSession = () => {
    setParticipant(null);
    setReferenceCode('');
    setSelectedTest(null);
    setStep('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header Bar */}
      <Header
        onOpenInstructions={() => setShowInstructions(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {step === 'catalog' && (
          <CatalogView 
            onSelectTest={handleSelectTest}
            onEnterCode={() => alert('Fitur kode akses (Token) akan segera hadir!')}
          />
        )}
        
        {step === 'form' && (
          <ParticipantForm 
            onSubmit={handleProceedToInstructions} 
            onCancel={handleCancelForm}
            selectedTestName={selectedTest === 'disc' ? 'Analisa Kepribadian' : 'Tes Kepribadian'}
            initialData={participant}
          />
        )}
        
        {step === 'instructions' && (
          <TestInstructionsView
            onStartTest={handleStartTest}
            onBack={handleBackToForm}
            participant={participant}
          />
        )}

        {step === 'test' && participant && (
          <DiscTestRunner
            participant={participant}
            onSubmitTest={handleSubmitTest}
            isSubmitting={isSubmitting}
          />
        )}

        {step === 'completed' && participant && (
          <TestCompletedView
            participant={participant}
            referenceCode={referenceCode}
            submissionResult={submissionResult}
            onReset={handleResetSession}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Personality Assessment System (MMI Form A). All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowInstructions(true)}
              className="hover:text-slate-200 transition-colors"
            >
              Petunjuk Tes
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<AssessmentDashboard />} />
      <Route path="/admin" element={<AdminPortal onClose={() => navigate('/')} />} />
    </Routes>
  );
}
