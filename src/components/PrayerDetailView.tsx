import React, { useState } from 'react';
import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Info,
} from 'lucide-react';
import { PRAYERS, type Prayer } from '../data/prayers';
import type { DisplaySettings } from './DisplaySettingsModal';
import { StageIcon, TasbihIcon } from './IslamicIcons';

interface PrayerDetailViewProps {
  prayer: Prayer;
  settings: DisplaySettings;
  isCompleted: boolean;
  isFavorite: boolean;
  onBack: () => void;
  onNavigate: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onOpenCounterForStage: (mode: 'thawaf' | 'sai') => void;
}

export function PrayerDetailView({
  prayer,
  settings,
  isCompleted,
  isFavorite,
  onBack,
  onNavigate,
  onToggleComplete,
  onToggleFavorite,
  onOpenCounterForStage,
}: PrayerDetailViewProps) {
  const [copied, setCopied] = useState(false);

  const hasPrev = prayer.id > 0;
  const hasNext = prayer.id < PRAYERS.length - 1;

  const handleCopy = async () => {
    const parts = [
      `${prayer.title} (${prayer.stageName})`,
      '',
      prayer.arabic,
      '',
      prayer.latin,
      '',
      `Artinya: "${prayer.meaning}"`,
    ];
    try {
      await navigator.clipboard.writeText(parts.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 md:pb-6 space-y-5">
      {/* Desktop Back & Breadcrumb Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="hidden md:inline-flex min-h-[40px] px-3.5 py-2 rounded-xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] text-sm font-semibold text-[#14221d] dark:text-[#eff3f0] items-center gap-1.5 hover:border-[#0e5a45]/45 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>

          <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#5c6b64] dark:text-[#96a89f]">
            <span className="inline-flex items-center gap-1.5 text-[#0e5a45] dark:text-[#4cb596] font-semibold">
              <StageIcon stageId={prayer.stageId} className="w-4 h-4" />
              <span>{prayer.stageName}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              Doa {prayer.id + 1} dari {PRAYERS.length}
            </span>
          </div>
        </div>

        {/* Action Toolbar: Copy, Favorite, Complete */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="min-h-[40px] px-3.5 py-2 rounded-xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] text-xs md:text-sm font-semibold text-[#14221d] dark:text-[#eff3f0] flex items-center gap-1.5 hover:border-[#0e5a45]/45 transition-colors whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#0e5a45] dark:text-[#4cb596]" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#5c6b64] dark:text-[#96a89f]" />
                <span>Salin</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onToggleFavorite(prayer.id)}
            aria-pressed={isFavorite}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs md:text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              isFavorite
                ? 'bg-[#f8f1dd] dark:bg-[#2c2512] border-[#d3b35c] dark:border-[#6e5a23] text-[#8a6714] dark:text-[#e2c26b]'
                : 'bg-white dark:bg-[#141e1a] border-[#e5e0d5] dark:border-[#24342e] text-[#14221d] dark:text-[#eff3f0] hover:border-[#a37e2c]/50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            <span>{isFavorite ? 'Ditandai' : 'Favorit'}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleComplete(prayer.id)}
            aria-pressed={isCompleted}
            className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs md:text-sm font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              isCompleted
                ? 'bg-[#0e5a45] dark:bg-[#247a61] border-[#0e5a45] dark:border-[#247a61] text-white'
                : 'bg-white dark:bg-[#141e1a] border-[#e5e0d5] dark:border-[#24342e] text-[#14221d] dark:text-[#eff3f0] hover:border-[#0e5a45]/45'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{isCompleted ? 'Selesai' : 'Tandai Selesai'}</span>
          </button>
        </div>
      </div>

      {/* Prayer Title */}
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#14221d] dark:text-[#eff3f0] text-balance">
        {prayer.title}
      </h1>

      {/* Arabic Scripture Card */}
      <div className="relative rounded-3xl bg-white dark:bg-[#141e1a] border border-[#dfd3b2] dark:border-[#342f1e] px-5 py-8 md:px-10 md:py-11">
        {/* Subtle Islamic Geometric Corner Flourishes */}
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className="absolute top-3.5 left-3.5 w-6 h-6 text-[#b38e34]/40 dark:text-[#d9b664]/30"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
        >
          <path d="M2 16V4a2 2 0 0 1 2-2h12" />
          <path d="M6 10V6h4" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          className="absolute bottom-3.5 right-3.5 w-6 h-6 text-[#b38e34]/40 dark:text-[#d9b664]/30 rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
        >
          <path d="M2 16V4a2 2 0 0 1 2-2h12" />
          <path d="M6 10V6h4" />
        </svg>

        <p
          dir="rtl"
          lang="ar"
          className="font-arabic text-center text-[#14221d] dark:text-[#f2f5f3] leading-[2.2] selection:bg-[#e9d9ab]/50"
          style={{ fontSize: `${settings.arabicSize}px` }}
        >
          {prayer.arabic}
        </p>
      </div>

      {/* Latin Transliteration */}
      {settings.showLatin ? (
        <div className="rounded-2xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] p-5 md:p-6">
          <p className="text-xs font-semibold text-[#a37e2c] dark:text-[#d9b664] mb-2">
            Bacaan Latin
          </p>
          <p className="text-base md:text-lg font-semibold text-[#14221d] dark:text-[#eff3f0] leading-relaxed">
            {prayer.latin}
          </p>
        </div>
      ) : null}

      {/* Indonesian Translation */}
      {settings.showMeaning ? (
        <div className="rounded-2xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] p-5 md:p-6">
          <p className="text-xs font-semibold text-[#0e5a45] dark:text-[#4cb596] mb-2">
            Artinya
          </p>
          <p className="text-base md:text-lg text-[#2c3b35] dark:text-[#d4ded9] leading-relaxed">
            “{prayer.meaning}”
          </p>
        </div>
      ) : null}

      {/* Adab / Panduan Note */}
      {prayer.note ? (
        <div className="rounded-2xl bg-[#f2efe5] dark:bg-[#19241f] border border-[#e3decb] dark:border-[#283831] p-5 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-[#a37e2c] dark:text-[#d9b664] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#8a6714] dark:text-[#d9b664]">
              Adab & Tata Cara
            </p>
            <p className="text-sm md:text-base text-[#2c3b35] dark:text-[#cfd9d4] leading-relaxed">
              {prayer.note}
            </p>
          </div>
        </div>
      ) : null}

      {/* Contextual Shortcut to Lap Counter on Thawaf or Sa'i */}
      {prayer.stageId === 'thawaf' || prayer.stageId === 'sai' ? (
        <button
          type="button"
          onClick={() =>
            onOpenCounterForStage(prayer.stageId === 'thawaf' ? 'thawaf' : 'sai')
          }
          className="w-full min-h-[56px] p-4 rounded-2xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] hover:border-[#0e5a45]/45 flex items-center justify-between gap-4 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#f3f0e8] dark:bg-[#1b2923] text-[#a37e2c] dark:text-[#d9b664] flex items-center justify-center shrink-0">
              <TasbihIcon className="w-5 h-5" />
            </span>
            <div className="text-left">
              <p className="text-sm font-bold text-[#14221d] dark:text-[#eff3f0]">
                {prayer.stageId === 'thawaf'
                  ? 'Buka Penghitung 7 Putaran Thawaf'
                  : 'Buka Penghitung 7 Lintasan Sa’i'}
              </p>
              <p className="text-xs text-[#5c6b64] dark:text-[#96a89f]">
                Catat setiap putaran agar tidak lupa hitungan
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#8a9690] shrink-0" />
        </button>
      ) : null}

      {/* Prev / Next Controls (Fixed Thumb Bar on Mobile, Inline on Desktop) */}
      <div className="fixed md:static bottom-0 inset-x-0 z-30 p-3 md:p-0 bg-[#f7f5f0]/95 md:bg-transparent dark:bg-[#0c1310]/95 md:dark:bg-transparent backdrop-blur-md md:backdrop-blur-none border-t md:border-t-0 border-[#e5e0d5] dark:border-[#1f2c27]">
        <div className="max-w-3xl mx-auto grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={!hasPrev}
            onClick={() => onNavigate(prayer.id - 1)}
            className="min-h-[48px] px-4 rounded-xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] text-sm font-semibold text-[#14221d] dark:text-[#eff3f0] flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            disabled={!hasNext}
            onClick={() => onNavigate(prayer.id + 1)}
            className="min-h-[48px] px-4 rounded-xl bg-[#0e5a45] dark:bg-[#247a61] text-white text-sm font-semibold flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] transition-all"
          >
            <span>Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
