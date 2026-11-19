import React, { useMemo, useState } from 'react';
import { Bookmark, Check, ChevronRight, Search, X } from 'lucide-react';
import { PRAYERS, STAGES, type StageId } from '../data/prayers';
import { StageIcon } from './IslamicIcons';

interface StagesAndListViewProps {
  mode: 'all' | 'favorites';
  selectedStage: StageId | 'all';
  completedIds: Record<number, boolean>;
  favoriteIds: Record<number, boolean>;
  onSelectStage: (stage: StageId | 'all') => void;
  onOpenPrayer: (id: number) => void;
  onToggleFavorite: (id: number) => void;
  onSwitchToAll: () => void;
}

export function StagesAndListView({
  mode,
  selectedStage,
  completedIds,
  favoriteIds,
  onSelectStage,
  onOpenPrayer,
  onToggleFavorite,
  onSwitchToAll,
}: StagesAndListViewProps) {
  const [query, setQuery] = useState('');

  const activeStageInfo = useMemo(
    () => STAGES.find((s) => s.id === selectedStage) ?? null,
    [selectedStage]
  );

  const totalFavoritesCount = useMemo(
    () => PRAYERS.filter((p) => favoriteIds[p.id]).length,
    [favoriteIds]
  );

  const filteredPrayers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRAYERS.filter((prayer) => {
      if (mode === 'favorites' && !favoriteIds[prayer.id]) return false;
      if (mode === 'all' && selectedStage !== 'all' && prayer.stageId !== selectedStage) {
        return false;
      }
      if (!q) return true;
      return (
        prayer.title.toLowerCase().includes(q) ||
        prayer.stageName.toLowerCase().includes(q) ||
        prayer.latin.toLowerCase().includes(q) ||
        prayer.meaning.toLowerCase().includes(q)
      );
    });
  }, [mode, selectedStage, favoriteIds, query]);

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#14221d] dark:text-[#eff3f0]">
            {mode === 'favorites'
              ? 'Doa Favorit'
              : activeStageInfo
              ? `Tahap ${activeStageInfo.order}: ${activeStageInfo.name}`
              : 'Daftar Lengkap Doa Umrah'}
          </h1>
          <p className="text-sm text-[#5c6b64] dark:text-[#96a89f] mt-1">
            {mode === 'favorites'
              ? totalFavoritesCount > 0
                ? `${totalFavoritesCount} doa yang sering Anda baca dan tandai untuk akses cepat.`
                : 'Tandai doa yang sering dibaca agar mudah ditemukan kembali di halaman ini.'
              : activeStageInfo
              ? activeStageInfo.subtitle
              : `${PRAYERS.length} bacaan doa berurutan dari keberangkatan hingga tahallul.`}
          </p>
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <Search
            className="w-4.5 h-4.5 text-[#75857e] dark:text-[#84968e] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              mode === 'favorites'
                ? 'Cari di doa favorit...'
                : 'Cari judul atau arti doa...'
            }
            aria-label="Cari doa umrah"
            className="w-full min-h-[44px] pl-10 pr-10 rounded-xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] text-sm text-[#14221d] dark:text-[#eff3f0] placeholder:text-[#86948d] focus:outline-none focus:border-[#0e5a45] dark:focus:border-[#4cb596]"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-[#687770] hover:text-[#14221d] dark:hover:text-[#eff3f0]"
              aria-label="Hapus pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Stage Filter Tabs (only in All Prayers mode) */}
      {mode === 'all' ? (
        <div
          role="tablist"
          aria-label="Filter tahapan umrah"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedStage === 'all'}
            onClick={() => onSelectStage('all')}
            className={`min-h-[40px] px-4 py-2 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
              selectedStage === 'all'
                ? 'bg-[#0e5a45] dark:bg-[#247a61] text-white'
                : 'bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] text-[#5c6b64] dark:text-[#96a89f] hover:text-[#14221d] dark:hover:text-[#eff3f0]'
            }`}
          >
            Semua
          </button>
          {STAGES.map((stage) => {
            const active = selectedStage === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectStage(stage.id)}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap shrink-0 flex items-center gap-2 transition-colors ${
                  active
                    ? 'bg-[#0e5a45] dark:bg-[#247a61] text-white'
                    : 'bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] text-[#5c6b64] dark:text-[#96a89f] hover:text-[#14221d] dark:hover:text-[#eff3f0]'
                }`}
              >
                <StageIcon stageId={stage.id} className="w-4 h-4" />
                <span>{stage.shortName}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Prayer List */}
      {filteredPrayers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredPrayers.map((prayer) => {
            const isDone = Boolean(completedIds[prayer.id]);
            const isFav = Boolean(favoriteIds[prayer.id]);

            return (
              <div
                key={prayer.id}
                className="min-h-[76px] p-2 pl-4 rounded-2xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] hover:border-[#0e5a45]/45 dark:hover:border-[#4cb596]/45 flex items-center gap-2 transition-colors group"
              >
                <button
                  type="button"
                  onClick={() => onOpenPrayer(prayer.id)}
                  className="flex-1 min-w-0 py-2 text-left flex items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-[#0e5a45] rounded-xl"
                >
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold tabular-nums shrink-0 transition-colors ${
                      isDone
                        ? 'bg-[#0e5a45] dark:bg-[#247a61] text-white'
                        : 'bg-[#f4f1e9] dark:bg-[#1b2923] text-[#14221d] dark:text-[#eff3f0]'
                    }`}
                  >
                    {isDone ? <Check className="w-4.5 h-4.5" strokeWidth={2.5} /> : prayer.id + 1}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#5c6b64] dark:text-[#96a89f]">
                      <span>{prayer.stageName}</span>
                      {isDone ? (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#0e5a45] dark:text-[#4cb596] font-semibold">
                            Selesai
                          </span>
                        </>
                      ) : null}
                    </div>
                    <h3 className="text-base font-bold text-[#14221d] dark:text-[#eff3f0] truncate mt-0.5">
                      {prayer.title}
                    </h3>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleFavorite(prayer.id)}
                  aria-pressed={isFav}
                  aria-label={
                    isFav
                      ? `Hapus ${prayer.title} dari favorit`
                      : `Tandai ${prayer.title} sebagai favorit`
                  }
                  title={isFav ? 'Hapus tanda favorit' : 'Tandai sebagai favorit'}
                  className={`min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                    isFav
                      ? 'text-[#a37e2c] dark:text-[#d9b664] bg-[#f8f1dd] dark:bg-[#2c2512]'
                      : 'text-[#8a9690] dark:text-[#667870] hover:text-[#a37e2c] dark:hover:text-[#d9b664] hover:bg-[#f5f2ea] dark:hover:bg-[#1c2823]'
                  }`}
                >
                  <Bookmark className={`w-4.5 h-4.5 ${isFav ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenPrayer(prayer.id)}
                  aria-label={`Buka ${prayer.title}`}
                  className="min-h-[44px] min-w-[36px] flex items-center justify-center text-[#8a9690] dark:text-[#667870] group-hover:text-[#0e5a45] dark:group-hover:text-[#4cb596] shrink-0 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl bg-white dark:bg-[#141e1a] border border-[#e5e0d5] dark:border-[#24342e] p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#f3f0e8] dark:bg-[#1c2b25] text-[#a37e2c] dark:text-[#d9b664] flex items-center justify-center mx-auto">
            <Bookmark className="w-5 h-5" />
          </div>
          <p className="text-base font-bold text-[#14221d] dark:text-[#eff3f0]">
            {mode === 'favorites' && !query
              ? 'Belum ada doa favorit'
              : 'Doa tidak ditemukan'}
          </p>
          <p className="text-sm text-[#5c6b64] dark:text-[#96a89f] max-w-sm mx-auto">
            {mode === 'favorites' && !query
              ? 'Ketuk ikon tanda di daftar doa atau di halaman bacaan doa untuk menyimpannya ke sini.'
              : 'Coba kata kunci lain atau pilih filter tahapan semua.'}
          </p>
          {mode === 'favorites' && !query ? (
            <button
              type="button"
              onClick={onSwitchToAll}
              className="mt-2 min-h-[44px] px-5 py-2 rounded-xl bg-[#0e5a45] dark:bg-[#247a61] text-white text-sm font-semibold"
            >
              Pilih Doa Sekarang
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
