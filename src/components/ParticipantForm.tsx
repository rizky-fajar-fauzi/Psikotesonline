import React, { useState } from 'react';
import { ParticipantInfo } from '../types';
import { User, Mail, Phone, Briefcase, Building, AlertCircle, ShieldAlert, ArrowRight, CheckCircle2, ArrowLeft, HelpCircle } from 'lucide-react';

interface ParticipantFormProps {
  onSubmit: (info: ParticipantInfo) => void;
  onCancel?: () => void;
  selectedTestName?: string;
  initialData?: ParticipantInfo | null;
}

export const ParticipantForm: React.FC<ParticipantFormProps> = ({ onSubmit, onCancel, selectedTestName = 'DISC Assessment', initialData }) => {
  const [formData, setFormData] = useState<Partial<ParticipantInfo>>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    gender: initialData?.gender || 'Pria',
    age: initialData?.age !== '-' ? initialData?.age : '',
    position: initialData?.position !== '-' ? initialData?.position : '',
    organization: initialData?.organization !== '-' ? initialData?.organization : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = 'Nama lengkap wajib diisi';
    if (!formData.email?.trim()) {
      newErrors.email = 'Alamat email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.phone?.trim()) newErrors.phone = 'Nomor HP/WhatsApp wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        name: formData.name!.trim(),
        email: formData.email!.trim(),
        phone: formData.phone!.trim(),
        gender: formData.gender as 'Pria' | 'Wanita',
        age: formData.age?.trim() || '-',
        position: formData.position?.trim() || '-',
        organization: formData.organization?.trim() || '-',
        date: initialData?.date || new Date().toISOString(),
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 px-4 sm:px-6">
      {onCancel && (
        <button
          onClick={onCancel}
          className="mb-6 inline-flex items-center space-x-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog</span>
        </button>
      )}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white relative">
          <div className="relative z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
              Form Registrasi Peserta Tes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{selectedTestName}</h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
              Isi data diri Anda dengan benar sebelum memulai pengisian soal. Data ini digunakan untuk verifikasi dan laporan evaluasi.
            </p>
          </div>
        </div>

        {/* Confidentiality Notice */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-6 sm:px-8 py-3.5 flex items-start space-x-3 text-xs sm:text-sm text-amber-900">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Informasi Kerahasiaan Result:</span> Sesuai standar prosedur evaluasi psikometri, hasil tes akhir Anda akan diproses secara rahasia dan disimpan otomatis ke database pengelola serta dikirim langsung ke Admin.
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Nama Lengkap <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Budi Santoso, S.T."
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-500'
                    : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-500'
                }`}
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-rose-500 flex items-center space-x-1"><AlertCircle className="w-3.5 h-3.5 inline mr-1" />{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Alamat Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@domain.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-500'
                      : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-500'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-rose-500 flex items-center space-x-1"><AlertCircle className="w-3.5 h-3.5 inline mr-1" />{errors.email}</p>}
            </div>

            {/* No HP / WA */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                No. HP / WhatsApp <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-5 h-5" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="081234567890"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-rose-300 bg-rose-50/30 focus:ring-rose-500'
                      : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-indigo-500'
                  }`}
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-rose-500 flex items-center space-x-1"><AlertCircle className="w-3.5 h-3.5 inline mr-1" />{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Jenis Kelamin */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Jenis Kelamin <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'Pria' })}
                  className={`py-2.5 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center space-x-2 transition-all ${
                    formData.gender === 'Pria'
                      ? 'bg-blue-50 border-blue-600 text-blue-700 ring-2 ring-blue-600/20'
                      : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>Pria</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: 'Wanita' })}
                  className={`py-2.5 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center space-x-2 transition-all ${
                    formData.gender === 'Wanita'
                      ? 'bg-pink-50 border-pink-600 text-pink-700 ring-2 ring-pink-600/20'
                      : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>Wanita</span>
                </button>
              </div>
            </div>

            {/* Usia */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Usia (Tahun)</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="25"
                min="15"
                max="80"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Profesi / Status */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Profesi / Status</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Contoh: Mahasiswa / Pegawai"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Asal Instansi */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Asal Instansi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Building className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Contoh: Universitas / Perusahaan"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-base shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Lanjutkan ke Petunjuk</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
