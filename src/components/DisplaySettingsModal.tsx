import React, { useState } from 'react';
import { Check, Minus, Moon, Plus, RotateCcw, Sun, X } from 'lucide-react';

export interface DisplaySettings {
  theme: 'light' | 'dark';
  arabicSize: number;
  showLatin: boolean;
  showMeaning: boolean;
}

interface DisplaySettingsModalProps {
  open: boolean;
  settings: DisplaySettings;
  completedCount: number;
  onClose: () => void;
  onUpdate: (next: Partial<DisplaySettings>) => void;
  onResetProgress: () => void;
}

export function DisplaySettingsModal({
  open,
  settings,
  completedCount,
  onClose,
  onUpdate,
  onResetProgress,
}: DisplaySettingsModalProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  if (!open) return null;

  const decreaseSize = () =>
    onUpdate({ arabicSize: Math.max(24, settings.arabicSize - 4) });
  const increaseSize = () =>
    onUpdate({ arabicSize: Math.min(48, settings.arabicSize + 4) });

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setConfirmReset(false);
          onClose();
        }
      }}
    >
      <div className="w-full md:max-w-md bg-white dark:bg-[#141e1a] border-t md:border border-[#e5e0d5] dark:border-[#24342e] rounded-t-3xl md:rounded-2xl p-6 shadow-xl">
        {/* Mobile drag affordance */}
        <div className="md:hidden w-10 h-1 bg-[#d8d2c5] dark:bg-[#2d3e37] rounded-full mx-auto -mt-2 mb-4" />

        <div className="flex items-center justify-between mb-5">
          <h2
            id="settings-title"
            className="text-lg font-bold text-[#14221d] dark:text-[#eff3f0]"
          >
            Tampilan Bacaan
          </h2>
          <button
            type="button"
            onClick={() => {
              setConfirmReset(false);
              onClose();
            }}
            className="min-h-[44px] min-w-[44px] -mr-2 flex items-center justify-center rounded-xl text-[#5c6b64] dark:text-[#96a89f] hover:bg-[#f2efe8] dark:hover:bg-[#1e2c26]"
            aria-label="Tutup pengaturan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Theme switch */}
          <div>
            <p className="text-xs font-semibold text-[#5c6b64] dark:text-[#96a89f] mb-2.5">
              Tema Warna
            </p>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#f3f0e8] dark:bg-[#0e1714]">
              <button
                type="button"
                onClick={() => onUpdate({ theme: 'light' })}
                className={`min-h-[44px] rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                  settings.theme === 'light'
                    ? 'bg-white text-[#14221d] shadow-xs'
                    : 'text-[#5c6b64] hover:text-[#14221d] dark:text-[#96a89f]'
                }`}
              >
                <Sun className="w-4 h-4 text-[#a37e2c]" />
                <span>Terang</span>
              </button>
              <button
                type="button"
                onClick={() => onUpdate({ theme: 'dark' })}
                className={`min-h-[44px] rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                  settings.theme === 'dark'
                    ? 'bg-[#1b2923] text-[#eff3f0] shadow-xs'
                    : 'text-[#5c6b64] hover:text-[#14221d] dark:text-[#96a89f] dark:hover:text-[#eff3f0]'
                }`}
              >
                <Moon className="w-4 h-4 text-[#d9b664]" />
                <span>Gelap</span>
              </button>
            </div>
          </div>

          {/* Arabic font size stepper + live preview */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-xs font-semibold text-[#5c6b64] dark:text-[#96a89f]">
                Ukuran Huruf Arab
              </p>
              <span className="text-xs font-semibold tabular-nums text-[#0e5a45] dark:text-[#4cb596]">
                {settings.arabicSize}px
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-[#e5e0d5] dark:border-[#24342e] bg-[#faf8f4] dark:bg-[#0f1814]">
              <button
                type="button"
                onClick={decreaseSize}
                disabled={settings.arabicSize <= 24}
                className="min-h-[44px] min-w-[44px] rounded-lg bg-white dark:bg-[#192620] border border-[#e5e0d5] dark:border-[#293b34] flex items-center justify-center text-[#14221d] dark:text-[#eff3f0] disabled:opacity-40"
                aria-label="Perkecil huruf Arab"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div
                dir="rtl"
                lang="ar"
                className="flex-1 text-center font-arabic text-[#14221d] dark:text-[#eff3f0] leading-normal truncate py-1"
                style={{ fontSize: `${Math.min(settings.arabicSize, 36)}px` }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <button
                type="button"
                onClick={increaseSize}
                disabled={settings.arabicSize >= 48}
                className="min-h-[44px] min-w-[44px] rounded-lg bg-white dark:bg-[#192620] border border-[#e5e0d5] dark:border-[#293b34] flex items-center justify-center text-[#14221d] dark:text-[#eff3f0] disabled:opacity-40"
                aria-label="Perbesar huruf Arab"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reading layers toggles */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#5c6b64] dark:text-[#96a89f] mb-1">
              Komponen Bacaan
            </p>
            <button
              type="button"
              onClick={() => onUpdate({ showLatin: !settings.showLatin })}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-[#e5e0d5] dark:border-[#24342e] flex items-center justify-between text-left hover:bg-[#faf8f4] dark:hover:bg-[#18241f] transition-colors"
            >
              <span className="text-sm font-semibold text-[#14221d] dark:text-[#eff3f0]">
                Tampilkan Bacaan Latin
              </span>
              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                  settings.showLatin
                    ? 'bg-[#0e5a45] dark:bg-[#2b8a6e] text-white'
                    : 'border border-[#cfc9bc] dark:border-[#344840]'
                }`}
              >
                {settings.showLatin ? <Check className="w-4 h-4" /> : null}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onUpdate({ showMeaning: !settings.showMeaning })}
              className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl border border-[#e5e0d5] dark:border-[#24342e] flex items-center justify-between text-left hover:bg-[#faf8f4] dark:hover:bg-[#18241f] transition-colors"
            >
              <span className="text-sm font-semibold text-[#14221d] dark:text-[#eff3f0]">
                Tampilkan Arti Terjemahan
              </span>
              <span
                className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                  settings.showMeaning
                    ? 'bg-[#0e5a45] dark:bg-[#2b8a6e] text-white'
                    : 'border border-[#cfc9bc] dark:border-[#344840]'
                }`}
              >
                {settings.showMeaning ? <Check className="w-4 h-4" /> : null}
              </span>
            </button>
          </div>

          {/* Progress reset */}
          {completedCount > 0 ? (
            <div className="pt-2 border-t border-[#e5e0d5] dark:border-[#24342e]">
              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="w-full min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold text-[#8c4332] dark:text-[#e5917d] hover:bg-[#fdf3f1] dark:hover:bg-[#2a1916] flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Progres Bacaan ({completedCount} selesai)</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="flex-1 min-h-[44px] rounded-xl border border-[#e5e0d5] dark:border-[#24342e] text-sm font-semibold text-[#5c6b64] dark:text-[#96a89f]"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onResetProgress();
                      setConfirmReset(false);
                      onClose();
                    }}
                    className="flex-1 min-h-[44px] rounded-xl bg-[#9e3324] text-white text-sm font-semibold"
                  >
                    Ya, Reset
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
