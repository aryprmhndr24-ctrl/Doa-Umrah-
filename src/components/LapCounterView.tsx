import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Minus, Plus, RotateCcw } from 'lucide-react';
import { SaiIcon, TawafIcon, TasbihIcon } from './IslamicIcons';

export type CounterMode = 'thawaf' | 'sai' | 'tasbih';

interface LapCounterViewProps {
  initialMode?: CounterMode;
  onOpenPrayer: (id: number) => void;
}

export function LapCounterView({
  initialMode = 'thawaf',
  onOpenPrayer,
}: LapCounterViewProps) {
  const [mode, setMode] = useState<CounterMode>(initialMode);
  const [thawafCount, setThawafCount] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('umrah_thawaf') || 0);
    } catch {
      return 0;
    }
  });
  const [saiCount, setSaiCount] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('umrah_sai') || 0);
    } catch {
      return 0;
    }
  });
  const [tasbihCount, setTasbihCount] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('umrah_tasbih') || 0);
    } catch {
      return 0;
    }
  });

  const count =
    mode === 'thawaf' ? thawafCount : mode === 'sai' ? saiCount : tasbihCount;
  const target = mode === 'tasbih' ? 33 : 7;

  const setCurrentCount = (next: number) => {
    const clamped = mode === 'tasbih' ? Math.max(0, next) : Math.max(0, Math.min(7, next));
    if (mode === 'thawaf') {
      setThawafCount(clamped);
      try {
        localStorage.setItem('umrah_thawaf', String(clamped));
      } catch {}
    } else if (mode === 'sai') {
      setSaiCount(clamped);
      try {
        localStorage.setItem('umrah_sai', String(clamped));
      } catch {}
    } else {
      setTasbihCount(clamped);
      try {
        localStorage.setItem('umrah_tasbih', String(clamped));
      } catch {}
    }
  };

  const isCompleted = mode !== 'tasbih' && count >= 7;
  const ringProgress =
    mode === 'tasbih'
      ? (count % 33 || (count > 0 ? 33 : 0)) / 33
      : count / 7;

  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - ringProgress);

  const getSaiDirection = () => {
    if (saiCount === 0) return 'Mulai dari Bukit Safa menuju Bukit Marwah';
    if (saiCount >= 7) return 'Selesai di Bukit Marwah (7 lintasan lengkap)';
    const nextLap = saiCount + 1;
    return nextLap % 2 === 1
      ? `Lintasan ke-${nextLap}: Bukit Safa → Bukit Marwah`
      : `Lintasan ke-${nextLap}: Bukit Marwah → Bukit Safa`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#14221d] dark:text-[#eff3f0]">
          Penghitung Putaran & Dzikir
        </h1>
        <p className="text-sm text-[#5c6b64] dark:text-[#96a89f] mt-1">
          Bantu jaga hitungan selama Thawaf, Sa’i, dan dzikir harian Anda.
        </p>
      </div>

      {/* Mode Switcher */}
      <div
        role="tablist"
        aria-label="Mode penghitung"
        className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-[#ece8dc] dark:bg-[#141e1a] border border-[#e2ddd0] dark:border-[#24342e]"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'thawaf'}
          onClick={() => setMode('thawaf')}
          className={`min-h-[44px] rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            mode === 'thawaf'
              ? 'bg-white dark:bg-[#22332c] text-[#0e5a45] dark:text-[#4cb596] shadow-xs'
              : 'text-[#5c6b64] dark:text-[#96a89f]'
          }`}
        >
          <TawafIcon className="w-4 h-4" />
          <span>Thawaf</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={mode === 'sai'}
          onClick={() => setMode('sai')}
          className={`min-h-[44px] rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            mode === 'sai'
              ? 'bg-white dark:bg-[#22332c] text-[#0e5a45] dark:text-[#4cb596] shadow-xs'
              : 'text-[#5c6b64] dark:text-[#96a89f]'
          }`}
        >
          <SaiIcon className="w-4 h-4" />
          <span>Sa’i</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={mode === 'tasbih'}
          onClick={() => setMode('tasbih')}
          className={`min-h-[44px] rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            mode === 'tasbih'
              ? 'bg-white dark:bg-[#22332c] text-[#0e5a45] dark:text-[#4cb596] shadow-xs'
              : 'text-[#5c6b64] dark:text-[#96a89f]'
          }`}
        >
          <TasbihIcon className="w-4 h-4" />
          <span>Tasbih</span>
        </button>
      </div>

      {/* Main Counter Card */}
      <div className="rounded-3xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] p-6 md:p-8 flex flex-col items-center text-center">
        {/* Progress Ring & Tap Area */}
        <button
          type="button"
          onClick={() => setCurrentCount(count + 1)}
          disabled={isCompleted}
          aria-label="Ketuk untuk menambah hitungan"
          className="relative w-52 h-52 rounded-full flex items-center justify-center active:scale-[0.97] transition-transform focus-visible:outline-2 focus-visible:outline-[#0e5a45] disabled:active:scale-100"
        >
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-[#efece3] dark:text-[#1f2c27]"
            />
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="text-[#0e5a45] dark:text-[#3ca385] transition-all duration-300"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isCompleted ? (
              <CheckCircle2 className="w-9 h-9 text-[#0e5a45] dark:text-[#4cb596] mb-1" />
            ) : null}
            <span className="text-5xl font-extrabold tabular-nums text-[#14221d] dark:text-[#eff3f0]">
              {count}
            </span>
            <span className="text-xs font-semibold text-[#5c6b64] dark:text-[#96a89f] mt-1 tabular-nums">
              {mode === 'tasbih' ? `Putaran ke-${Math.floor(count / 33) + 1}` : `dari ${target} putaran`}
            </span>
          </div>
        </button>

        {/* Contextual Guidance */}
        <div className="mt-5 max-w-md space-y-1.5">
          <p className="text-sm font-bold text-[#14221d] dark:text-[#eff3f0]">
            {mode === 'thawaf' &&
              (isCompleted
                ? 'Alhamdulillah, 7 Putaran Thawaf Selesai'
                : count === 0
                ? 'Mulai sejajar Hajar Aswad (Putaran ke-1)'
                : `Sedang di Putaran ke-${Math.min(count + 1, 7)} menuju Hajar Aswad`)}

            {mode === 'sai' && getSaiDirection()}

            {mode === 'tasbih' &&
              (count === 0
                ? 'Ketuk lingkaran atau tombol di bawah untuk berdzikir'
                : `Total dzikir: ${count} kali`)}
          </p>
          <p className="text-xs md:text-sm text-[#5c6b64] dark:text-[#96a89f]">
            {mode === 'thawaf' &&
              (isCompleted
                ? 'Lanjutkan shalat sunnah dua rakaat di belakang Maqam Ibrahim.'
                : 'Ka’bah berada di sebelah kiri Anda. Saat antara Rukun Yamani & Hajar Aswad disunnahkan membaca Rabbana atina fid-dunya hasanah.')}
            {mode === 'sai' &&
              (isCompleted
                ? 'Lanjutkan dengan tahallul (mencukur atau memotong rambut).'
                : 'Setiap berjalan antara dua lampu hijau (bagi pria), disunnahkan berlari-lari kecil.')}
            {mode === 'tasbih' &&
              'Dapat digunakan untuk Subhanallah, Alhamdulillah, Allahu Akbar, atau Talbiyah.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="mt-6 w-full max-w-sm flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setCurrentCount(count - 1)}
            disabled={count === 0}
            aria-label="Kurangi satu"
            className="min-h-[52px] min-w-[52px] rounded-xl bg-[#f5f2ea] dark:bg-[#1b2923] border border-[#e5e0d5] dark:border-[#24342e] text-[#14221d] dark:text-[#eff3f0] flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all"
          >
            <Minus className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentCount(count + 1)}
            disabled={isCompleted}
            className="flex-1 min-h-[52px] px-5 rounded-xl bg-[#0e5a45] dark:bg-[#247a61] text-white font-bold text-sm md:text-base flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>
              {isCompleted
                ? '7 Putaran Selesai'
                : mode === 'tasbih'
                ? 'Tambah Dzikir'
                : 'Selesai 1 Putaran'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentCount(0)}
            disabled={count === 0}
            aria-label="Ulangi dari nol"
            className="min-h-[52px] min-w-[52px] rounded-xl bg-[#f5f2ea] dark:bg-[#1b2923] border border-[#e5e0d5] dark:border-[#24342e] text-[#5c6b64] dark:text-[#96a89f] flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Matching Prayer Shortcuts */}
      {mode !== 'tasbih' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mode === 'thawaf' ? (
            <>
              <button
                type="button"
                onClick={() => onOpenPrayer(8)}
                className="p-4 rounded-2xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] hover:border-[#0e5a45]/45 text-left flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#0e5a45] dark:text-[#4cb596]">
                    Doa Putaran Thawaf
                  </p>
                  <p className="text-sm font-bold text-[#14221d] dark:text-[#eff3f0] truncate mt-0.5">
                    Antara Rukun Yamani & Hajar Aswad
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8a9690] shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => onOpenPrayer(9)}
                className="p-4 rounded-2xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] hover:border-[#0e5a45]/45 text-left flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#a37e2c] dark:text-[#d9b664]">
                    Setelah 7 Putaran
                  </p>
                  <p className="text-sm font-bold text-[#14221d] dark:text-[#eff3f0] truncate mt-0.5">
                    Di belakang Maqam Ibrahim
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8a9690] shrink-0" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onOpenPrayer(12)}
                className="p-4 rounded-2xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] hover:border-[#0e5a45]/45 text-left flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#0e5a45] dark:text-[#4cb596]">
                    Doa Lintasan Sa’i
                  </p>
                  <p className="text-sm font-bold text-[#14221d] dark:text-[#eff3f0] truncate mt-0.5">
                    Berjalan antara Safa & Marwah
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8a9690] shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => onOpenPrayer(13)}
                className="p-4 rounded-2xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] hover:border-[#0e5a45]/45 text-left flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#a37e2c] dark:text-[#d9b664]">
                    Setelah 7 Lintasan
                  </p>
                  <p className="text-sm font-bold text-[#14221d] dark:text-[#eff3f0] truncate mt-0.5">
                    Selesai umrah & tahallul
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8a9690] shrink-0" />
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
