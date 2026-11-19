import React from 'react';
import { Bookmark, BookOpen, ChevronLeft, Home, SlidersHorizontal } from 'lucide-react';
import { KaabaIcon, TasbihIcon } from './IslamicIcons';

export type NavTab = 'home' | 'prayers' | 'counter' | 'favorites';

interface NavbarProps {
  activeTab: NavTab;
  isDetailOpen: boolean;
  onSelectTab: (tab: NavTab) => void;
  onBackFromDetail: () => void;
  onOpenSettings: () => void;
  favoritesCount: number;
}

const NAV_ITEMS: { id: NavTab; label: string }[] = [
  { id: 'home', label: 'Beranda' },
  { id: 'prayers', label: 'Daftar Doa' },
  { id: 'counter', label: 'Hitungan' },
  { id: 'favorites', label: 'Favorit' },
];

export function Navbar({
  activeTab,
  isDetailOpen,
  onSelectTab,
  onBackFromDetail,
  onOpenSettings,
  favoritesCount,
}: NavbarProps) {
  return (
    <>
      <header className="sticky top-0 z-30 h-[54px] md:h-16 border-b border-[#e5e0d5] dark:border-[#1f2c27] bg-[#f7f5f0]/90 dark:bg-[#0c1310]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto h-full px-4 md:px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Brand / Mobile Back */}
          <div className="flex items-center gap-2.5 min-w-0 shrink-0">
            {isDetailOpen ? (
              <button
                type="button"
                onClick={onBackFromDetail}
                className="md:hidden -ml-2 min-h-[44px] min-w-[44px] px-2 flex items-center gap-1 text-sm font-semibold text-[#0e5a45] dark:text-[#4cb596] rounded-xl active:scale-95 transition-transform whitespace-nowrap"
                aria-label="Kembali"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Kembali</span>
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => onSelectTab('home')}
              className={`${
                isDetailOpen ? 'hidden md:flex' : 'flex'
              } items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e5a45] rounded-lg`}
            >
              <span className="w-8 h-8 rounded-lg bg-[#0e5a45] dark:bg-[#1f6e57] text-white flex items-center justify-center shrink-0">
                <KaabaIcon className="w-4.5 h-4.5" />
              </span>
              <span className="text-base md:text-lg font-bold tracking-tight text-[#14221d] dark:text-[#eff3f0]">
                Doa Umrah
              </span>
            </button>
          </div>

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-7"
          >
            {NAV_ITEMS.map((item) => {
              const active = !isDetailOpen && activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`relative py-1.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'text-[#0e5a45] dark:text-[#4cb596]'
                      : 'text-[#5c6b64] dark:text-[#96a89f] hover:text-[#14221d] dark:hover:text-[#eff3f0]'
                  }`}
                >
                  {item.label}
                  {item.id === 'favorites' && favoritesCount > 0 ? (
                    <span className="ml-1.5 text-xs tabular-nums text-[#a37e2c] dark:text-[#d9b664]">
                      ({favoritesCount})
                    </span>
                  ) : null}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-[19px] h-0.5 bg-[#0e5a45] dark:bg-[#4cb596]"
                    />
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onOpenSettings}
              className="min-h-[40px] px-3.5 py-2 rounded-xl border border-[#dfd9cc] dark:border-[#24342e] bg-white dark:bg-[#141e1a] text-[#14221d] dark:text-[#eff3f0] text-xs md:text-sm font-semibold flex items-center gap-2 hover:border-[#0e5a45]/40 dark:hover:border-[#4cb596]/40 active:scale-[0.98] transition-all whitespace-nowrap shrink-0"
              aria-label="Pengaturan tampilan bacaan"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#0e5a45] dark:text-[#4cb596]" />
              <span>Tampilan</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar (hidden inside reading detail for maximum reading space) */}
      {!isDetailOpen ? (
        <nav
          aria-label="Menu bawah"
          className="md:hidden fixed bottom-0 inset-x-0 z-40 h-[62px] pb-[env(safe-area-inset-bottom,0px)] border-t border-[#e5e0d5] dark:border-[#1f2c27] bg-white/95 dark:bg-[#101915]/95 backdrop-blur-md"
        >
          <div className="grid grid-cols-4 h-full max-w-lg mx-auto">
            {NAV_ITEMS.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`flex flex-col items-center justify-center gap-1 min-h-[44px] transition-colors ${
                    active
                      ? 'text-[#0e5a45] dark:text-[#4cb596]'
                      : 'text-[#687770] dark:text-[#8fa198]'
                  }`}
                >
                  <span className="relative">
                    {item.id === 'home' && <Home className="w-5 h-5" strokeWidth={active ? 2.2 : 1.75} />}
                    {item.id === 'prayers' && <BookOpen className="w-5 h-5" strokeWidth={active ? 2.2 : 1.75} />}
                    {item.id === 'counter' && <TasbihIcon className="w-5 h-5" />}
                    {item.id === 'favorites' && <Bookmark className="w-5 h-5" strokeWidth={active ? 2.2 : 1.75} />}
                  </span>
                  <span className={`text-[11px] leading-none tracking-tight ${active ? 'font-bold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      ) : null}
    </>
  );
}
