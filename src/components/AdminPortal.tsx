import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { DISCSubmission, AdminConfig } from '../types';
import { Graph3Chart } from './Graph3Chart';
import {
  Lock,
  KeyRound,
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Trash2,
  Eye,
  RefreshCw,
  Settings,
  CheckCircle2,
  AlertCircle,
  X,
  Printer,
  ChevronRight,
  TrendingUp,
  BarChart2,
  FileSpreadsheet,
  Send,
  Sliders,
  ShieldAlert,
  Grid,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { exportSingleSubmissionToExcel, exportAllSubmissionsToExcel } from '../utils/excelExporter';
import { MmiFormAGridView } from './MmiFormAGridView';

interface AdminPortalProps {
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [submissions, setSubmissions] = useState<DISCSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'submissions' | 'settings'>('submissions');

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');

  // Selected Submission Modal
  const [selectedSub, setSelectedSub] = useState<DISCSubmission | null>(null);
  const [detailTab, setDetailTab] = useState<'report' | 'mmi_form'>('report');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const [printType, setPrintType] = useState<'admin' | 'client' | null>(null);
    
    useEffect(() => {
      if (printType) {
        setTimeout(() => {
          window.print();
          setPrintType(null);
        }, 300);
      }
    }, [printType]);

    const handleDownloadPDF = (type: 'admin' | 'client') => {
      setPrintType(type);
    };

    const handleDownloadPDF_old = async () => {
    const element = document.getElementById('pdf-content');
    if (!element || !selectedSub) return;
    
    try {
      setIsGeneratingPDF(true);
      
      // Save original styles
      const originalOverflow = element.style.overflow;
      const originalHeight = element.style.height;
      const originalMaxHeight = element.style.maxHeight;
      
      // Prepare element for complete capture
      element.style.overflow = 'visible';
      element.style.height = 'auto';
      element.style.maxHeight = 'none';
      
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true, // Handle any external images/svgs
        logging: false,
        backgroundColor: '#ffffff',
        // Make sure it captures the full scrollable height
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });
      
      // Restore styles
      element.style.overflow = originalOverflow;
      element.style.height = originalHeight;
      element.style.maxHeight = originalMaxHeight;
      
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // First page
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
      
      // Subsequent pages if content is long
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`Laporan_DISC_${selectedSub.participant.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Gagal membuat PDF: " + (error).message);
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  

  // Settings State
  const [config, setConfig] = useState<AdminConfig>({
    adminEmail: 'risky.fauzifajar@gmail.com',
    pin: 'K33SPIRIT',
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPass: '',
    smtpFrom: '',
  });

  const [configSaveMsg, setConfigSaveMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [resendStatusMsg, setResendStatusMsg] = useState<string | null>(null);
  const [resendCustomEmail, setResendCustomEmail] = useState('');

  // Handle PIN login
  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setIsAuthenticated(true);
        fetchSubmissions();
        fetchConfig();
      } else {
        setLoginError(data.message || 'PIN yang Anda masukkan salah');
      }
    } catch (err: any) {
      setLoginError('Gagal menghubungkan ke server.');
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/submissions');
      const data = await res.json();
      setSubmissions(data);
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/admin/config');
      const data = await res.json();
      setConfig(data);
      if (data.adminEmail) setResendCustomEmail(data.adminEmail);
    } catch (err) {
      console.error('Failed to fetch config:', err);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfigSaveMsg(null);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setConfigSaveMsg({ type: 'success', text: 'Konfigurasi Admin & Email berhasil diperbarui!' });
      } else {
        setConfigSaveMsg({ type: 'error', text: 'Gagal menyimpan konfigurasi.' });
      }
    } catch (err) {
      setConfigSaveMsg({ type: 'error', text: 'Gagal menghubungi server.' });
    }
  };

  
  
  const handleDeleteSubmission = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data peserta tes ini?')) return;
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
        if (selectedSub?.id === id) setSelectedSub(null);
      }
    } catch (err) {
      alert('Gagal menghapus data');
    }
  };

  const handleResendEmail = async (id: string) => {
    setResendStatusMsg('Mengirim email...');
    try {
      const res = await fetch(`/api/admin/resend-email/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customEmail: resendCustomEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setResendStatusMsg(`Email laporan berhasil dikirim ulang ke: ${data.recipient}`);
        fetchSubmissions();
      } else {
        setResendStatusMsg('Gagal mengirim email: ' + data.error);
      }
    } catch (err: any) {
      setResendStatusMsg('Gagal mengirim ulang email.');
    }
  };

  const exportToCSV = () => {
    if (submissions.length === 0) {
      alert('Tidak ada data untuk diexport.');
      return;
    }

    const headers = [
      'ID Referensi',
      'Tanggal Pengerjaan',
      'Nama Peserta',
      'Email',
      'No HP',
      'Jenis Kelamin',
      'Posisi/Jabatan',
      'Organisasi/Perusahaan',
      'Tipe Dominan DISC',
      'Most D',
      'Most I',
      'Most S',
      'Most C',
      'Most X',
      'Least D',
      'Least I',
      'Least S',
      'Least C',
      'Least X',
      'Change D',
      'Change I',
      'Change S',
      'Change C',
      'Status Email',
    ];

    const rows = submissions.map((s) => [
      s.referenceCode,
      new Date(s.createdAt).toLocaleString('id-ID'),
      `"${s.participant.name.replace(/"/g, '""')}"`,
      s.participant.email,
      s.participant.phone,
      s.participant.gender,
      `"${(s.participant.position || '').replace(/"/g, '""')}"`,
      `"${(s.participant.organization || '').replace(/"/g, '""')}"`,
      s.interpretation.primaryType,
      s.tally.most.D,
      s.tally.most.I,
      s.tally.most.S,
      s.tally.most.C,
      s.tally.most.X || 0,
      s.tally.least.D,
      s.tally.least.I,
      s.tally.least.S,
      s.tally.least.C,
      s.tally.least.X || 0,
      s.tally.change.D,
      s.tally.change.I,
      s.tally.change.S,
      s.tally.change.C,
      s.emailSentStatus,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Hasil_Tes_DISC_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered submissions
  const filteredSubmissions = submissions.filter((s) => {
    const matchesSearch =
      s.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.participant.position && s.participant.position.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType =
      filterType === 'ALL' || s.interpretation.primaryType === filterType;

    return matchesSearch && matchesType;
  });

  // Calculate statistics
  const typeCounts = { D: 0, I: 0, S: 0, C: 0 };
  submissions.forEach((s) => {
    const t = s.interpretation.primaryType;
    if (typeCounts[t] !== undefined) typeCounts[t]++;
  });

  if (printType === 'admin' && selectedSub) {
    return (
      <div className="bg-white min-h-screen w-full font-sans">
        <div id="pdf-content" className="p-8 max-w-[210mm] mx-auto bg-white">
          <div className="print:break-after-page pb-8">
            <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Lembar Jawaban Asli (MMI Form)</h1>
            <MmiFormAGridView submission={selectedSub} />
          </div>
          <div className="space-y-6 pt-8">
            ${modalContent}
          </div>
        </div>
      </div>
    );
  }


  if (printType === 'client' && selectedSub) {
    const mirrorCode = selectedSub.interpretation.mirror?.code || selectedSub.interpretation.primaryType || 'X';
    const primaryLetter = mirrorCode.replace('Pure ', '').charAt(0);
    let avatarBg = "bg-indigo-100";
    let avatarText = "text-indigo-600";
    let avatarShape = "rounded-full";
    let avatarIcon = "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"; 
    let visualRole = "Pecatur";
    
    if (primaryLetter === 'D') {
      avatarBg = "bg-rose-100";
      avatarText = "text-rose-600";
      avatarShape = "rounded-[2rem]";
      avatarIcon = "M13 10V3L4 14h7v7l9-11h-7z"; // Zap
      visualRole = "Sang Penggerak (Driver)";
    } else if (primaryLetter === 'I') {
      avatarBg = "bg-amber-100";
      avatarText = "text-amber-600";
      avatarShape = "rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl";
      avatarIcon = "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"; // Sparkle
      visualRole = "Sang Inspirator (Influencer)";
    } else if (primaryLetter === 'S') {
      avatarBg = "bg-emerald-100";
      avatarText = "text-emerald-600";
      avatarShape = "rounded-[1rem]";
      avatarIcon = "M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"; // Heart
      visualRole = "Sang Penyeimbang (Steadiness)";
    } else if (primaryLetter === 'C') {
      avatarBg = "bg-sky-100";
      avatarText = "text-sky-600";
      avatarShape = "rounded-none";
      avatarIcon = "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"; // Hexagon
      visualRole = "Sang Analis (Compliance)";
    }

    return (
      <div className="bg-white min-h-screen w-full flex justify-center font-sans">
        <div id="pdf-content" className="w-full max-w-[210mm] bg-white px-8 py-10 mx-auto">
          
          <div className="text-center mb-8 border-b border-slate-100 pb-6">
            <p className="text-slate-600 text-base">Dibuat khusus untuk <span className="font-bold text-slate-900">{selectedSub.participant.name}</span></p>
          </div>
          
          <div className="flex flex-col items-center mb-10 mt-4">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-slate-200 blur-2xl rounded-full scale-150 opacity-40"></div>
              <div className={`relative w-28 h-28 flex items-center justify-center bg-white shadow-xl ${avatarShape}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`w-14 h-14 ${avatarText}`}>
                   <path d={avatarIcon}/>
                 </svg>
              </div>
            </div>
            
            <h2 className="text-4xl font-black text-slate-900 text-center tracking-tight">
              {visualRole}
            </h2>
            
            <div className="text-lg font-bold text-indigo-600 mt-2 text-center uppercase tracking-wide">
              Tipe {mirrorCode} - {selectedSub.interpretation.mirror?.title || selectedSub.interpretation.title}
            </div>
          </div>

          <div className="bg-white border border-indigo-100 rounded-3xl p-8 mb-6 shadow-sm">
            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center space-x-3">
               <span className="text-slate-300 font-black text-xl">1</span>
               <span>Karakteristik Utama</span>
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
              {selectedSub.interpretation.mirror?.summary || selectedSub.interpretation.summary}
            </p>
          </div>

          <div className="bg-white border border-emerald-100 rounded-3xl p-8 mb-6 shadow-sm">
             <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center space-x-3">
               <span className="text-slate-300 font-black text-xl">2</span>
               <span>Rekomendasi Karir (Job Match)</span>
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
              {selectedSub.interpretation.mirror?.jobMatch || "Belum ada rekomendasi spesifik untuk profil ini."}
            </p>
          </div>
          
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {

    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 text-center relative"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900">Portal Admin</h2>
          <p className="mt-1 text-sm text-slate-500">
            Masukkan PIN Keamanan untuk mengakses seluruh hasil tes dan database peserta.
          </p>

          <form onSubmit={handleVerifyPin} className="mt-6 space-y-4">
            <div>
              <div className="relative max-w-xs mx-auto">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Masukkan PIN Admin"
                  maxLength={20}
                  className="w-full text-center tracking-widest text-lg font-bold px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                  autoFocus
                />
              </div>
              {loginError && (
                <p className="mt-2 text-xs text-rose-500 font-semibold flex items-center justify-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                  <span>{loginError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all"
            >
              Masuk Dashboard Admin
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
            Akses Terbatas: Khusus Admin & Pengelola
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 overflow-hidden print:static print:inset-auto print:bg-white print:p-0 print:overflow-visible">
      <div className="bg-slate-900 rounded-3xl w-full max-w-7xl h-[92vh] flex flex-col shadow-2xl border border-slate-800 text-slate-100 overflow-hidden print:hidden">
        {/* Admin Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white">Dashboard Admin & HR Manager</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Database Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Pengelolaan Hasil Tes DISC & Konfigurasi Pengiriman Email Admin
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchSubmissions}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 text-xs font-semibold transition-colors flex items-center space-x-1"
            >
              <X className="w-4 h-4" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 bg-slate-900 border-b border-slate-800 flex items-center space-x-4 shrink-0">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`py-3 text-sm font-bold border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === 'submissions'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Laporan Hasil Peserta ({submissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 text-sm font-bold border-b-2 flex items-center space-x-2 transition-all ${
              activeTab === 'settings'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan Email & Security</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950">
          {activeTab === 'submissions' ? (
            <div className="space-y-6">
              {/* Summary Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                  <span className="text-xs text-slate-400 font-semibold block">Total Peserta Tes</span>
                  <span className="text-2xl font-black text-white block mt-1">{submissions.length}</span>
                </div>
                <div className="bg-slate-900 border border-rose-500/30 rounded-2xl p-4">
                  <span className="text-xs text-rose-400 font-semibold block">Tipe D (Dominance)</span>
                  <span className="text-2xl font-black text-rose-400 block mt-1">{typeCounts.D}</span>
                </div>
                <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4">
                  <span className="text-xs text-amber-400 font-semibold block">Tipe I (Influence)</span>
                  <span className="text-2xl font-black text-amber-400 block mt-1">{typeCounts.I}</span>
                </div>
                <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4">
                  <span className="text-xs text-emerald-400 font-semibold block">Tipe S (Steadiness)</span>
                  <span className="text-2xl font-black text-emerald-400 block mt-1">{typeCounts.S}</span>
                </div>
                <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-4">
                  <span className="text-xs text-blue-400 font-semibold block">Tipe C (Conscientiousness)</span>
                  <span className="text-2xl font-black text-blue-400 block mt-1">{typeCounts.C}</span>
                </div>
              </div>

              {/* Toolbar Search & Export */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="flex flex-1 items-center space-x-3 w-full sm:w-auto">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Cari nama, email, posisi, atau kode..."
                      className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="ALL">Semua Tipe DISC</option>
                    <option value="D">Tipe D (Dominance)</option>
                    <option value="I">Tipe I (Influence)</option>
                    <option value="S">Tipe S (Steadiness)</option>
                    <option value="C">Tipe C (Conscientiousness)</option>
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => exportAllSubmissionsToExcel(filteredSubmissions)}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all"
                    title="Export file Excel (.xlsx) dengan tata letak lembar jawaban presisi & Master Rekap"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export Excel Lembar Jawaban (.xlsx)</span>
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center justify-center space-x-1 transition-all"
                    title="Export file CSV ringkas"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV Ringkas</span>
                  </button>
                </div>
              </div>

              {/* Submissions Table */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="p-4">Ref Code & Waktu</th>
                        <th className="p-4">Nama Peserta & Kontak</th>
                        <th className="p-4">Posisi & Organisasi</th>
                        <th className="p-4 text-center">Tipe Dominan DISC</th>
                        <th className="p-4 text-center">Status Email Admin</th>
                        <th className="p-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredSubmissions.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-500">
                            {submissions.length === 0
                              ? 'Belum ada data peserta yang melakukan tes DISC.'
                              : 'Tidak ada hasil tes yang cocok dengan pencarian Anda.'}
                          </td>
                        </tr>
                      ) : (
                        filteredSubmissions.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-800/60 transition-colors">
                            <td className="p-4">
                              <span className="font-mono font-bold text-indigo-400 block">{s.referenceCode}</span>
                              <span className="text-[10px] text-slate-500 block mt-0.5">
                                {new Date(s.createdAt).toLocaleString('id-ID')}
                              </span>
                            </td>

                            <td className="p-4">
                              <span className="font-bold text-white block text-sm">{s.participant.name}</span>
                              <span className="text-slate-400 block">{s.participant.email}</span>
                              <span className="text-slate-500 text-[10px] block">{s.participant.phone} ({s.participant.gender})</span>
                            </td>

                            <td className="p-4">
                              <span className="text-slate-200 font-medium block">{s.participant.position || '-'}</span>
                              <span className="text-slate-500 text-[11px] block">{s.participant.organization || '-'}</span>
                            </td>

                            <td className="p-4 text-center">
                              <span
                                className={`inline-block px-3 py-1 rounded-full font-black text-xs border ${
                                  s.interpretation.mirror?.code?.includes('D')
                                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                    : s.interpretation.mirror?.code?.includes('I')
                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                    : s.interpretation.mirror?.code?.includes('S')
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                }`}
                              >
                                Tipe {s.interpretation.mirror?.code || s.interpretation.primaryType}
                              </span>
                            </td>

                            <td className="p-4 text-center">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-semibold ${
                                  s.emailSentStatus === 'sent'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : s.emailSentStatus === 'simulated'
                                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                }`}
                              >
                                {s.emailSentStatus === 'sent'
                                  ? '✓ Terkirim'
                                  : s.emailSentStatus === 'simulated'
                                  ? 'Simulated Auto'
                                  : 'Gagal'}
                              </span>
                            </td>

                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => setSelectedSub(s)}
                                className="px-3 py-1.5 rounded-lg bg-indigo-600/30 border border-indigo-500/40 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-semibold transition-all inline-flex items-center space-x-1"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Detail & Grafik</span>
                              </button>

                              <button
                                onClick={() => handleDeleteSubmission(s.id)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 transition-colors inline-block"
                                title="Hapus"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* Settings Tab */
            <div className="max-w-2xl mx-auto py-4">
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-indigo-400" />
                    <span>Pengaturan Email Penerima & SMTP Server</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Atur alamat email pengelola yang menerima otomatis laporan hasil tes DISC setiap kali peserta selesai mengerjakan.
                  </p>
                </div>

                {configSaveMsg && (
                  <div
                    className={`p-4 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
                      configSaveMsg.type === 'success'
                        ? 'bg-emerald-950 border border-emerald-800 text-emerald-300'
                        : 'bg-rose-950 border border-rose-800 text-rose-300'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{configSaveMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handleSaveConfig} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Email Penerima Laporan Admin <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={config.adminEmail}
                      onChange={(e) => setConfig({ ...config, adminEmail: e.target.value })}
                      required
                      placeholder="risky.fauzifajar@gmail.com"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Alamat email ini akan secara otomatis menerima notifikasi & laporan DISC peserta.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <h4 className="font-bold text-sm text-slate-200 mb-3">
                      Pengaturan SMTP Server (Opsional untuk pengiriman email langsung)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">SMTP Host</label>
                        <input
                          type="text"
                          value={config.smtpHost || ''}
                          onChange={(e) => setConfig({ ...config, smtpHost: e.target.value })}
                          placeholder="smtp.gmail.com"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">SMTP Port</label>
                        <input
                          type="number"
                          value={config.smtpPort || 587}
                          onChange={(e) => setConfig({ ...config, smtpPort: parseInt(e.target.value) || 587 })}
                          placeholder="587"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">SMTP Username</label>
                        <input
                          type="text"
                          value={config.smtpUser || ''}
                          onChange={(e) => setConfig({ ...config, smtpUser: e.target.value })}
                          placeholder="user@domain.com"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">SMTP Password</label>
                        <input
                          type="password"
                          value={config.smtpPass || ''}
                          onChange={(e) => setConfig({ ...config, smtpPass: e.target.value })}
                          placeholder="App Password"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                      PIN Keamanan Akses Portal Admin
                    </label>
                    <input
                      type="password"
                      value={config.pin}
                      onChange={(e) => setConfig({ ...config, pin: e.target.value })}
                      required
                      placeholder="PIN Admin"
                      maxLength={20}
                      className="w-full max-w-xs px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all"
                    >
                      Simpan Konfigurasi Admin
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Submission Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto print:static print:inset-auto print:bg-white print:p-0 print:overflow-visible print:block">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white text-slate-900 rounded-3xl max-w-4xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col print:shadow-none print:border-none print:max-h-none print:m-0 print:overflow-visible"
          >
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                  {selectedSub.interpretation.primaryType}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedSub.participant.name}</h3>
                  <p className="text-xs text-slate-400">
                    Ref: {selectedSub.referenceCode} • {new Date(selectedSub.createdAt).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => exportSingleSubmissionToExcel(selectedSub)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Download Excel Lembar Jawaban</span>
                </button>
                <div className="relative group">
                  <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1">
                    <Printer className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </button>
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl hidden group-hover:block z-50 overflow-hidden">
                    <button onClick={() => handleDownloadPDF('admin')} className="w-full text-left px-4 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 border-b border-slate-100">Laporan Lengkap (Admin)</button>
                    <button onClick={() => handleDownloadPDF('client')} className="w-full text-left px-4 py-3 text-xs font-bold text-indigo-700 hover:bg-indigo-50">Laporan Ringkas (Klien)</button>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSub(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* View Tabs Selector */}
            <div className="bg-slate-100 border-b border-slate-200 px-6 py-2 flex items-center space-x-3 shrink-0">
              <button
                onClick={() => setDetailTab('report')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  detailTab === 'report'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>Laporan Evaluasi & Grafik</span>
              </button>

              <button
                onClick={() => setDetailTab('mmi_form')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                  detailTab === 'mmi_form'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span>Formulir Lembar Jawaban Asli (24 Soal)</span>
              </button>
            </div>

            {/* Modal Content Scrollable */}
            <div id="pdf-content" className="p-6 overflow-y-auto space-y-6 print:overflow-visible print:p-0 bg-white">
              {detailTab === 'mmi_form' ? (
                <MmiFormAGridView submission={selectedSub} />
              ) : (
                <>
              {/* Participant Demographic Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block">Nama Lengkap:</span>
                  <span className="font-bold text-slate-900">{selectedSub.participant.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Email:</span>
                  <span className="font-semibold text-slate-800">{selectedSub.participant.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">No HP / WA:</span>
                  <span className="font-semibold text-slate-800">{selectedSub.participant.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Posisi / Org:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedSub.participant.position || '-'} ({selectedSub.participant.organization || '-'})
                  </span>
                </div>
              </div>

              {/* Dominant Type Hero Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 text-center">
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                  Hasil Profil Kepribadian Utama
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-1">
                  Tipe {selectedSub.interpretation.mirror?.code || selectedSub.interpretation.primaryType} - {selectedSub.interpretation.mirror?.title || selectedSub.interpretation.title}
                </h2>
                <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                  {selectedSub.interpretation.mirror?.summary || selectedSub.interpretation.summary}
                </p>
              </div>

              
              {/* Hasil Profil Kepribadian (Mask, Core, Mirror) */}
              <div className="font-sans text-slate-800 mt-5">
                {/* BAGIAN ATAS: MASK, CORE, MIRROR (Berisi List Sifat Sesuai Excel) */}
                <div className="flex flex-wrap gap-5 mb-10">
                  <div className="flex-1 min-w-[250px] bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                    <h3 className="m-0 mb-2.5 text-base underline text-slate-600 font-bold">Mask Public Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black mb-[15px]">
                      {selectedSub.interpretation.mask?.code || 'N/A'} - {selectedSub.interpretation.mask?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                    <ul className="list-none p-0 m-0 text-sm leading-[1.6]">
                      {(selectedSub.interpretation.mask?.traits || []).map((trait, idx) => (
                        <li key={idx} className="mb-1">- {trait}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 min-w-[250px] bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                    <h3 className="m-0 mb-2.5 text-base underline text-slate-600 font-bold">Core Private Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black mb-[15px]">
                      {selectedSub.interpretation.core?.code || 'N/A'} - {selectedSub.interpretation.core?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                    <ul className="list-none p-0 m-0 text-sm leading-[1.6]">
                      {(selectedSub.interpretation.core?.traits || []).map((trait, idx) => (
                        <li key={idx} className="mb-1">- {trait}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 min-w-[250px] bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
                    <h3 className="m-0 mb-2.5 text-base underline text-slate-600 font-bold">Mirror Perceived Self</h3>
                    <div className="font-bold text-[15px] uppercase text-black mb-[15px]">
                      {selectedSub.interpretation.mirror?.code || 'N/A'} - {selectedSub.interpretation.mirror?.title || 'TIDAK TERIDENTIFIKASI'}
                    </div>
                    <ul className="list-none p-0 m-0 text-sm leading-[1.6]">
                      {(selectedSub.interpretation.mirror?.traits || []).map((trait, idx) => (
                        <li key={idx} className="mb-1">- {trait}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* BAGIAN BAWAH: DESKRIPSI PARAGRAF & JOB MATCH (Berdasarkan Kepribadian Utama) */}
                <div className="bg-slate-50 p-[25px] rounded-lg border border-slate-200 mb-8">
                  <h2 className="text-lg mt-0 mb-2.5 uppercase text-slate-800 font-bold">Deskripsi Kepribadian</h2>
                  <p className="text-[15px] leading-[1.8] text-justify mb-[25px] text-slate-700">
                    {selectedSub.interpretation.core?.summary || "Deskripsi tidak tersedia untuk profil ini."}
                  </p>

                  <div className="bg-[#eef7ee] p-[15px] border-l-[5px] border-[#4CAF50] rounded text-sm leading-[1.6] text-slate-900">
                    <strong className="text-[15px] block mb-1">Kesesuaian Karier (Job Match):</strong>
                    <span>{selectedSub.interpretation.core?.jobMatch || '-'}</span>
                  </div>
                </div>
              </div>

              {/* DISC Scores & Visual Comparison Graph */}
              

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Score Table */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
                  <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center space-x-2">
                    <BarChart2 className="w-4 h-4 text-indigo-600" />
                    <span>Tabel Skor DISC (Tally MMI)</span>
                  </h4>

                  <table className="w-full text-center text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-200/80 text-slate-700 font-bold">
                        <th className="p-2 border border-slate-300 text-left">Skor</th>
                        <th className="p-2 border border-slate-300 text-rose-700">D</th>
                        <th className="p-2 border border-slate-300 text-amber-700">I</th>
                        <th className="p-2 border border-slate-300 text-emerald-700">S</th>
                        <th className="p-2 border border-slate-300 text-blue-700">C</th>
                        <th className="p-2 border border-slate-300 bg-purple-100 text-purple-900 font-bold">X (◆)</th>
                        <th className="p-2 border border-slate-300 bg-slate-300 text-slate-900 font-bold">Total (=24)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-2 border border-slate-300 font-bold bg-amber-50 text-left">1 ➔ Most (+)</td>
                        <td className="p-2 border border-slate-300">{selectedSub.tally.most.D}</td>
                        <td className="p-2 border border-slate-300">{selectedSub.tally.most.I}</td>
                        <td className="p-2 border border-slate-300">{selectedSub.tally.most.S}</td>
                        <td className="p-2 border border-slate-300">{selectedSub.tally.most.C}</td>
                        <td className="p-2 border border-slate-300 bg-purple-50 text-purple-900 font-bold">{selectedSub.tally.most.X || 0}</td>
                        <td className="p-2 border border-slate-300 font-bold bg-emerald-100 text-emerald-900">
                          {selectedSub.tally.most.D + selectedSub.tally.most.I + selectedSub.tally.most.S + selectedSub.tally.most.C + (selectedSub.tally.most.X || 0)}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-300 font-bold bg-blue-50 text-left">2 ➔ Least (-)</td>
                        <td className="p-2 border border-slate-300">{selectedSub.tally.least.D}</td>
                        <td className="p-2 border border-slate-300">{selectedSub.tally.least.I}</td>
                        <td className="p-2 border border-slate-300">{selectedSub.tally.least.S}</td>
                        <td className="p-2 border border-slate-300">{selectedSub.tally.least.C}</td>
                        <td className="p-2 border border-slate-300 bg-purple-50 text-purple-900 font-bold">{selectedSub.tally.least.X || 0}</td>
                        <td className="p-2 border border-slate-300 font-bold bg-emerald-100 text-emerald-900">
                          {selectedSub.tally.least.D + selectedSub.tally.least.I + selectedSub.tally.least.S + selectedSub.tally.least.C + (selectedSub.tally.least.X || 0)}
                        </td>
                      </tr>
                      <tr className="bg-indigo-50 font-bold text-indigo-900">
                        <td className="p-2 border border-slate-300 text-left">3 ➔ Net (Change)</td>
                        <td className="p-2 border border-slate-300">{selectedSub.tally.change.D}</td>
                        <td className="p-2 border border-slate-300">{selectedSub.tally.change.I}</td>
                        <td className="p-2 border border-slate-300">{selectedSub.tally.change.S}</td>
                        <td className="p-2 border border-slate-300">{selectedSub.tally.change.C}</td>
                        <td className="p-2 border border-slate-300 bg-slate-200 text-slate-400 italic">—</td>
                        <td className="p-2 border border-slate-300 bg-slate-100 text-slate-400 font-normal">N/A</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-2.5 p-2 bg-purple-50 border border-purple-200 rounded text-[11px] text-purple-950 space-y-0.5">
                    <p className="font-bold text-purple-900 flex items-center justify-between">
                      <span>Kalkulasi Total Skor = 24:</span>
                      <span className="text-[10px] bg-purple-200 text-purple-900 px-1.5 py-0.5 rounded font-black">Poin X (◆) Termasuk</span>
                    </p>
                    <p>• Most (+): D({selectedSub.tally.most.D}) + I({selectedSub.tally.most.I}) + S({selectedSub.tally.most.S}) + C({selectedSub.tally.most.C}) + X({selectedSub.tally.most.X || 0}) = <strong className="text-emerald-700">{selectedSub.tally.most.D + selectedSub.tally.most.I + selectedSub.tally.most.S + selectedSub.tally.most.C + (selectedSub.tally.most.X || 0)}</strong></p>
                    <p>• Least (-): D({selectedSub.tally.least.D}) + I({selectedSub.tally.least.I}) + S({selectedSub.tally.least.S}) + C({selectedSub.tally.least.C}) + X({selectedSub.tally.least.X || 0}) = <strong className="text-emerald-700">{selectedSub.tally.least.D + selectedSub.tally.least.I + selectedSub.tally.least.S + selectedSub.tally.least.C + (selectedSub.tally.least.X || 0)}</strong></p>
                  </div>
                </div>

                {/* SVG Visual Bar Comparison Chart */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 flex flex-col justify-between">
                  <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                    <span>Grafik Perbandingan Dimensi (Net Score)</span>
                  </h4>

                  <div className="space-y-3 py-2">
                    {[
                      { key: 'D', name: 'Dominance', score: selectedSub.tally.change.D, color: 'bg-rose-500' },
                      { key: 'I', name: 'Influence', score: selectedSub.tally.change.I, color: 'bg-amber-500' },
                      { key: 'S', name: 'Steadiness', score: selectedSub.tally.change.S, color: 'bg-emerald-500' },
                      { key: 'C', name: 'Conscientiousness', score: selectedSub.tally.change.C, color: 'bg-blue-500' },
                    ].map((item) => {
                      // Normalize bar width (-24 to +24 range)
                      const clamped = Math.max(-20, Math.min(20, item.score));
                      const percent = Math.round(((clamped + 20) / 40) * 100);

                      return (
                        <div key={item.key} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-700">
                              {item.key} - {item.name}
                            </span>
                            <span className="font-mono text-slate-900">
                              {item.score > 0 ? `+${item.score}` : item.score}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                            <div
                              className={`${item.color} h-full transition-all duration-500 rounded-full`}
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Graph 3 Interactive Line Chart */}
                <div className="md:col-span-12 mt-2">
                  <Graph3Chart
                    rawD={selectedSub.tally.change.D}
                    rawI={selectedSub.tally.change.I}
                    rawS={selectedSub.tally.change.S}
                    rawC={selectedSub.tally.change.C}
                  />
                </div>
              </div>

              {/* Send Email Tool (Participant) */}
              <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
                <div>
                  <h5 className="font-bold text-indigo-950 text-sm">Kirim Laporan Hasil Tes Ke Email Peserta</h5>
                  <p className="text-xs text-indigo-800">
                    Kirimkan salinan dokumen hasil evaluasi DISC ini ke email peserta.
                  </p>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <input
                    type="email"
                    value={resendCustomEmail || selectedSub.participant.email}
                    onChange={(e) => setResendCustomEmail(e.target.value)}
                    placeholder="email.peserta@domain.com"
                    className="px-3 py-2 bg-white border border-indigo-300 rounded-xl text-xs text-slate-900 focus:outline-none flex-1 sm:w-60"
                  />
                  <button
                    onClick={async () => {
                        try {
                          const res = await fetch('/api/send-participant-email', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                                referenceCode: selectedSub.referenceCode, 
                                email: resendCustomEmail || selectedSub.participant.email 
                            }),
                          });
                          const data = await res.json();
                          if (res.ok) {
                            setResendStatusMsg('Email laporan berhasil dikirim ke peserta.');
                          } else {
                            setResendStatusMsg('Gagal mengirim email: ' + data.error);
                          }
                        } catch (err) {
                          setResendStatusMsg('Gagal mengirim email.');
                        }
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim ke Peserta</span>
                  </button>
                  <div className="relative group">
                  <button className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1 shrink-0">
                    <Printer className="w-3.5 h-3.5" />
                    <span>Unduh PDF</span>
                  </button>
                  <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl hidden group-hover:block z-50 overflow-hidden">
                    <button onClick={() => handleDownloadPDF('admin')} className="w-full text-left px-4 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 border-b border-slate-100">Laporan Lengkap (Admin)</button>
                    <button onClick={() => handleDownloadPDF('client')} className="w-full text-left px-4 py-3 text-xs font-bold text-indigo-700 hover:bg-indigo-50">Laporan Ringkas (Klien)</button>
                  </div>
                </div>
                </div>
              </div>

              {resendStatusMsg && (
                <p className="text-xs font-semibold text-center text-indigo-900 bg-indigo-100 p-2 rounded-lg">
                  {resendStatusMsg}
                </p>
              )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
