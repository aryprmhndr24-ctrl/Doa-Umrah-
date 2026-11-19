import React from 'react';
import { ArrowRight, Bookmark, CheckCircle2, ChevronRight } from 'lucide-react';
import { PRAYERS, STAGES, type StageId } from '../data/prayers';
import {
  IslamicGeometricBackdrop,
  StageIcon,
  TasbihIcon,
} from './IslamicIcons';

interface HomeViewProps {
  completedIds: Record<number, boolean>;
  favoriteIds: Record<number, boolean>;
  onOpenPrayer: (id: number) => void;
  onOpenStage: (stageId: StageId) => void;
  onOpenCounter: () => void;
  onOpenFavorites: () => void;
}

export function HomeView({
  completedIds,
  favoriteIds,
  onOpenPrayer,
  onOpenStage,
  onOpenCounter,
  onOpenFavorites,
}: HomeViewProps) {
  const totalPrayers = PRAYERS.length;
  const completedCount = PRAYERS.filter((p) => completedIds[p.id]).length;
  const favoritePrayers = PRAYERS.filter((p) => favoriteIds[p.id]);
  const favoritesCount = favoritePrayers.length;
  const progressPercent = Math.round((completedCount / totalPrayers) * 100);

  const nextPrayer = PRAYERS.find((p) => !completedIds[p.id]) ?? null;

  return (
    <div className="space-y-8">
      {/* Top Hero + Continuation Split on Desktop */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Main Editorial Hero Card */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-[#0e4a39] dark:bg-[#113d30] text-white p-6 md:p-8 flex flex-col justify-between min-h-[230px]">
          <div className="pointer-events-none absolute -right-10 -top-10 w-72 h-72 text-[#f0dca0] opacity-[0.09]">
            <IslamicGeometricBackdrop className="w-full h-full" />
          </div>

          <div className="relative z-10 space-y-2">
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-2xl md:text-3xl text-[#f2dda2] leading-relaxed"
            >
              لَبَّيْكَ اللَّهُمَّ عُمْرَةً
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-balance">
              Panduan Doa Umrah
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-md">
              Bacaan doa ringkas dan terstruktur dari keberangkatan hingga tahallul.
            </p>
          </div>

          <div className="relative z-10 mt-6 pt-5 border-t border-white/15">
            <div className="flex items-center justify-between text-xs md:text-sm font-semibold mb-2">
              <span className="text-white/85">Progres bacaan umrah</span>
              <span className="tabular-nums text-[#f2dda2]">
                {completedCount} / {totalPrayers} selesai ({progressPercent}%)
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#e8ca7a] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Resume Reading + Quick Tools */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {nextPrayer ? (
            <button
              type="button"
              onClick={() => onOpenPrayer(nextPrayer.id)}
              className="flex-1 text-left rounded-3xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] p-6 hover:border-[#0e5a45]/45 dark:hover:border-[#4cb596]/45 active:scale-[0.99] transition-all flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-[#0e5a45] dark:text-[#4cb596]">
                    Lanjutkan bacaan · {nextPrayer.stageName}
                  </p>
                  <h2 className="text-xl font-bold text-[#14221d] dark:text-[#eff3f0] text-balance">
                    {nextPrayer.title}
                  </h2>
                  <p className="text-sm text-[#5c6b64] dark:text-[#96a89f] line-clamp-2">
                    {nextPrayer.meaning}
                  </p>
                </div>
                <span className="w-10 h-10 rounded-xl bg-[#f3f0e8] dark:bg-[#1c2b25] text-[#0e5a45] dark:text-[#4cb596] flex items-center justify-center shrink-0">
                  <StageIcon stageId={nextPrayer.stageId} className="w-5 h-5" />
                </span>
              </div>

              <div className="mt-5 pt-4 border-t border-[#efece4] dark:border-[#1f2c27] flex items-center justify-between text-sm font-semibold text-[#0e5a45] dark:text-[#4cb596]">
                <span>Buka bacaan doa</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ) : (
            <div className="flex-1 rounded-3xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] p-6 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#e7f3ee] dark:bg-[#17362b] text-[#0e5a45] dark:text-[#4cb596] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-[#14221d] dark:text-[#eff3f0]">
                  Alhamdulillah, Semua Doa Selesai
                </h2>
                <p className="text-sm text-[#5c6b64] dark:text-[#96a89f]">
                  Semoga Allah menerima amal ibadah umrah Anda dan menjadikannya umrah yang mabrur.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenPrayer(0)}
                className="mt-5 min-h-[44px] px-4 py-2 rounded-xl bg-[#0e5a45] dark:bg-[#247a61] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
              >
                <span>Baca Ulang dari Awal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Compact Action Strip: Lap Counter + Favorites */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onOpenCounter}
              className="min-h-[72px] p-4 rounded-2xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] hover:border-[#0e5a45]/45 dark:hover:border-[#4cb596]/45 text-left flex items-center gap-3 active:scale-[0.98] transition-all"
            >
              <span className="w-10 h-10 rounded-xl bg-[#f3f0e8] dark:bg-[#1c2b25] text-[#a37e2c] dark:text-[#d9b664] flex items-center justify-center shrink-0">
                <TasbihIcon className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-[#14221d] dark:text-[#eff3f0] truncate">
                  Penghitung
                </span>
                <span className="block text-xs text-[#5c6b64] dark:text-[#96a89f] truncate">
                  Thawaf & Sa’i
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenFavorites}
              className="min-h-[72px] p-4 rounded-2xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] hover:border-[#0e5a45]/45 dark:hover:border-[#4cb596]/45 text-left flex items-center gap-3 active:scale-[0.98] transition-all"
            >
              <span className="w-10 h-10 rounded-xl bg-[#f3f0e8] dark:bg-[#1c2b25] text-[#a37e2c] dark:text-[#d9b664] flex items-center justify-center shrink-0">
                <Bookmark className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-[#14221d] dark:text-[#eff3f0] truncate">
                  Favorit
                </span>
                <span className="block text-xs tabular-nums text-[#5c6b64] dark:text-[#96a89f] truncate">
                  {favoritesCount} doa ditandai
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Access to Favorited Prayers */}
      {favoritesCount > 0 ? (
        <section aria-labelledby="quick-favorites-heading">
          <div className="flex items-baseline justify-between mb-3.5">
            <h2
              id="quick-favorites-heading"
              className="text-lg md:text-xl font-bold text-[#14221d] dark:text-[#eff3f0]"
            >
              Doa yang Sering Dibaca
            </h2>
            <button
              type="button"
              onClick={onOpenFavorites}
              className="text-xs md:text-sm font-semibold text-[#0e5a45] dark:text-[#4cb596] hover:underline"
            >
              Lihat semua ({favoritesCount})
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favoritePrayers.slice(0, 3).map((prayer) => (
              <button
                key={prayer.id}
                type="button"
                onClick={() => onOpenPrayer(prayer.id)}
                className="min-h-[68px] p-4 rounded-2xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] hover:border-[#a37e2c]/60 dark:hover:border-[#d9b664]/60 text-left flex items-center gap-3 active:scale-[0.99] transition-all"
              >
                <span className="w-9 h-9 rounded-xl bg-[#f8f1dd] dark:bg-[#2c2512] text-[#a37e2c] dark:text-[#d9b664] flex items-center justify-center shrink-0">
                  <Bookmark className="w-4 h-4 fill-current" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#5c6b64] dark:text-[#96a89f] truncate">
                    {prayer.stageName}
                  </p>
                  <p className="text-sm font-bold text-[#14221d] dark:text-[#eff3f0] truncate">
                    {prayer.title}
                  </p>
                </div>
                <ChevronRight className="w-4.5 h-4.5 text-[#8a9690] shrink-0" />
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {/* 6 Manasik Stages Grid */}
      <section aria-labelledby="stages-heading">
        <div className="flex items-baseline justify-between mb-4">
          <h2
            id="stages-heading"
            className="text-lg md:text-xl font-bold text-[#14221d] dark:text-[#eff3f0]"
          >
            Tahapan Manasik Umrah
          </h2>
          <span className="text-xs font-medium text-[#5c6b64] dark:text-[#96a89f]">
            6 rangkaian utama
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {STAGES.map((stage) => {
            const stagePrayers = PRAYERS.filter((p) => p.stageId === stage.id);
            const stageDone = stagePrayers.filter((p) => completedIds[p.id]).length;
            const isAllDone = stageDone === stagePrayers.length;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => onOpenStage(stage.id)}
                className="min-h-[84px] p-4 md:p-5 rounded-2xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] hover:border-[#0e5a45]/45 dark:hover:border-[#4cb596]/45 text-left flex items-center gap-4 active:scale-[0.99] transition-all group"
              >
                <span
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                    isAllDone
                      ? 'bg-[#0e5a45] dark:bg-[#247a61] text-white'
                      : 'bg-[#f4f1e9] dark:bg-[#1b2923] text-[#0e5a45] dark:text-[#4cb596]'
                  }`}
                >
                  <StageIcon stageId={stage.id} className="w-6 h-6" />
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold tabular-nums text-[#a37e2c] dark:text-[#d9b664]">
                      0{stage.order}
                    </span>
                    <span aria-hidden="true" className="text-[#c5bfb1] dark:text-[#3c4f47]">
                      ·
                    </span>
                    <span className="text-xs font-medium tabular-nums text-[#5c6b64] dark:text-[#96a89f]">
                      {stageDone}/{stagePrayers.length} selesai
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#14221d] dark:text-[#eff3f0] truncate mt-0.5">
                    {stage.name}
                  </h3>
                  <p className="text-xs text-[#5c6b64] dark:text-[#96a89f] truncate mt-0.5">
                    {stage.subtitle}
                  </p>
                </div>

                <ChevronRight className="w-5 h-5 text-[#8a9690] dark:text-[#667870] group-hover:text-[#0e5a45] dark:group-hover:text-[#4cb596] shrink-0 transition-colors" />
              </button>
            );
          })}
        </div>
      </section>

      <footer className="pt-2 pb-4 text-center">
        <p className="text-xs md:text-sm text-[#687770] dark:text-[#86978f] max-w-xl mx-auto">
          Doa disusun ringkas sesuai tuntunan utama. Untuk bacaan tambahan dan tata cara khusus, ikuti arahan pembimbing manasik Anda.
        </p>
      </footer>
    </div>
  );
}
