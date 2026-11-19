import React, { useEffect, useState } from 'react';
import { PRAYERS, type StageId } from './data/prayers';
import { Navbar, type NavTab } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { StagesAndListView } from './components/StagesAndListView';
import { PrayerDetailView } from './components/PrayerDetailView';
import { LapCounterView, type CounterMode } from './components/LapCounterView';
import {
  DisplaySettingsModal,
  type DisplaySettings,
} from './components/DisplaySettingsModal';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors
  }
}

function getInitialTheme(): 'light' | 'dark' {
  const saved = readStorage<'light' | 'dark' | null>('umrah_theme', null);
  if (saved === 'light' || saved === 'dark') return saved;
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }
  return 'light';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedStage, setSelectedStage] = useState<StageId | 'all'>('all');
  const [activePrayerId, setActivePrayerId] = useState<number | null>(null);
  const [counterMode, setCounterMode] = useState<CounterMode>('thawaf');
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [completedIds, setCompletedIds] = useState<Record<number, boolean>>(() =>
    readStorage<Record<number, boolean>>('bdone', {})
  );
  const [favoriteIds, setFavoriteIds] = useState<Record<number, boolean>>(() =>
    readStorage<Record<number, boolean>>('bfav', {})
  );

  const [settings, setSettings] = useState<DisplaySettings>(() => ({
    theme: getInitialTheme(),
    arabicSize: readStorage<number>('bfs', 32),
    showLatin: readStorage<boolean>('umrah_latin', true),
    showMeaning: readStorage<boolean>('umrah_meaning', true),
  }));

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    writeStorage('umrah_theme', settings.theme);
  }, [settings.theme]);

  const handleUpdateSettings = (patch: Partial<DisplaySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      if (patch.arabicSize !== undefined) writeStorage('bfs', next.arabicSize);
      if (patch.showLatin !== undefined) writeStorage('umrah_latin', next.showLatin);
      if (patch.showMeaning !== undefined) writeStorage('umrah_meaning', next.showMeaning);
      return next;
    });
  };

  const handleToggleComplete = (id: number) => {
    setCompletedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      writeStorage('bdone', next);
      return next;
    });
  };

  const handleToggleFavorite = (id: number) => {
    setFavoriteIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      writeStorage('bfav', next);
      return next;
    });
  };

  const handleResetProgress = () => {
    setCompletedIds({});
    writeStorage('bdone', {});
  };

  const openPrayer = (id: number) => {
    setActivePrayerId(id);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const selectTab = (tab: NavTab) => {
    setActivePrayerId(null);
    setActiveTab(tab);
    if (tab === 'prayers') {
      setSelectedStage('all');
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const openStage = (stageId: StageId) => {
    setActivePrayerId(null);
    setSelectedStage(stageId);
    setActiveTab('prayers');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const openCounterForStage = (mode: CounterMode) => {
    setCounterMode(mode);
    setActivePrayerId(null);
    setActiveTab('counter');
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const activePrayer =
    activePrayerId !== null
      ? PRAYERS.find((p) => p.id === activePrayerId) ?? null
      : null;

  const favoritesCount = PRAYERS.filter((p) => favoriteIds[p.id]).length;
  const completedCount = PRAYERS.filter((p) => completedIds[p.id]).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f5f0] dark:bg-[#0c1310] text-[#14221d] dark:text-[#eff3f0]">
      <Navbar
        activeTab={activeTab}
        isDetailOpen={activePrayer !== null}
        onSelectTab={selectTab}
        onBackFromDetail={() => setActivePrayerId(null)}
        onOpenSettings={() => setSettingsOpen(true)}
        favoritesCount={favoritesCount}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 pt-5 md:pt-8 pb-24 md:pb-12">
        {activePrayer ? (
          <PrayerDetailView
            prayer={activePrayer}
            settings={settings}
            isCompleted={Boolean(completedIds[activePrayer.id])}
            isFavorite={Boolean(favoriteIds[activePrayer.id])}
            onBack={() => setActivePrayerId(null)}
            onNavigate={openPrayer}
            onToggleComplete={handleToggleComplete}
            onToggleFavorite={handleToggleFavorite}
            onOpenCounterForStage={(mode) => openCounterForStage(mode)}
          />
        ) : activeTab === 'home' ? (
          <HomeView
            completedIds={completedIds}
            favoriteIds={favoriteIds}
            onOpenPrayer={openPrayer}
            onOpenStage={openStage}
            onOpenCounter={() => openCounterForStage('thawaf')}
            onOpenFavorites={() => selectTab('favorites')}
          />
        ) : activeTab === 'counter' ? (
          <LapCounterView
            key={counterMode}
            initialMode={counterMode}
            onOpenPrayer={openPrayer}
          />
        ) : (
          <StagesAndListView
            mode={activeTab === 'favorites' ? 'favorites' : 'all'}
            selectedStage={selectedStage}
            completedIds={completedIds}
            favoriteIds={favoriteIds}
            onSelectStage={setSelectedStage}
            onOpenPrayer={openPrayer}
            onToggleFavorite={handleToggleFavorite}
            onSwitchToAll={() => selectTab('prayers')}
          />
        )}
      </main>

      <DisplaySettingsModal
        open={settingsOpen}
        settings={settings}
        completedCount={completedCount}
        onClose={() => setSettingsOpen(false)}
        onUpdate={handleUpdateSettings}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}
