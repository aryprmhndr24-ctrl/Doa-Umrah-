import React from 'react';
import type { StageId } from '../data/prayers';

interface IconProps {
  className?: string;
}

export function KaabaIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3L4 7.2v9.6L12 21l8-4.2V7.2L12 3z" />
      <path d="M4 7.2L12 11.4l8-4.2" />
      <path d="M12 11.4V21" />
      <path d="M4 10.6l8 4.2 8-4.2" strokeOpacity={0.6} />
      <path d="M15 14.8v3.6" />
    </svg>
  );
}

export function MosqueIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3v2" />
      <path d="M12 5c-3 2-4.5 4.2-4.5 6.5h9C16.5 9.2 15 7 12 5z" />
      <path d="M4 9v11" />
      <path d="M20 9v11" />
      <path d="M4 7.5a1.5 1.5 0 0 1 0 3" />
      <path d="M3 11.5h18V20H3z" />
      <path d="M10 20v-4a2 2 0 0 1 4 0v4" />
    </svg>
  );
}

export function DuaHandsIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 11.5V6.5a1.5 1.5 0 0 1 3 0v6" />
      <path d="M10 12.5V8a1.5 1.5 0 0 1 2 0v5" />
      <path d="M14 12.5V8a1.5 1.5 0 0 1 2 0v5" />
      <path d="M17 11.5V6.5a1.5 1.5 0 0 0-3 0v6" />
      <path d="M4.5 11.5c0 4.5 2.5 7 7.5 7s7.5-2.5 7.5-7" />
      <path d="M8.5 21h7" />
    </svg>
  );
}

export function DepartureIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 20h16" />
      <path d="M6 20V10a6 6 0 0 1 12 0v10" />
      <path d="M12 10v6" />
      <path d="M9.5 12.5L12 10l2.5 2.5" />
    </svg>
  );
}

export function IhramIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15.5 4.5a6.5 6.5 0 1 0 4 11.5 5.2 5.2 0 1 1-4-11.5z" />
      <path d="M16.5 7.5l.7 1.4 1.5.2-1.1 1.1.3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1.1 1.5-.2.7-1.4z" />
    </svg>
  );
}

export function TawafIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="8.5" y="8.5" width="7" height="7" rx="1" />
      <path d="M8.5 11h7" />
      <path d="M12 3.5A8.5 8.5 0 1 1 4.2 15.4" />
      <path d="M10.5 5.2L12 3.5l1.8 1.5" />
    </svg>
  );
}

export function SaiIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 18.5l4.2-6.5 3.3 4.2 2.2-2.2 3.3 4.5" />
      <path d="M14.2 15.5l3.3-4.5 4 7.5" />
      <path d="M2 18.5h20" />
      <path d="M7.5 6.5h9" />
      <path d="M14.5 4.5l2 2-2 2" />
    </svg>
  );
}

export function TahallulIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="7" cy="17" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <path d="M8.8 15.2L17 5" />
      <path d="M15.2 15.2L7 5" />
      <path d="M12 2.5v2" />
    </svg>
  );
}

export function TasbihIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="10" r="6.5" strokeDasharray="0.1 4.2" strokeWidth={2.6} />
      <path d="M12 16.5v4.5" />
      <path d="M10.2 19.5l1.8 1.5 1.8-1.5" />
    </svg>
  );
}

export function StageIcon({
  stageId,
  className = 'w-5 h-5',
}: {
  stageId: StageId;
  className?: string;
}) {
  switch (stageId) {
    case 'berangkat':
      return <DepartureIcon className={className} />;
    case 'ihram':
      return <IhramIcon className={className} />;
    case 'mekkah':
      return <MosqueIcon className={className} />;
    case 'thawaf':
      return <TawafIcon className={className} />;
    case 'sai':
      return <SaiIcon className={className} />;
    case 'tahallul':
      return <TahallulIcon className={className} />;
  }
}

export function IslamicGeometricBackdrop({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="girih-lattice"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M30 0L60 30L30 60L0 30Z"
            stroke="currentColor"
            strokeWidth="0.7"
          />
          <rect
            x="15"
            y="15"
            width="30"
            height="30"
            stroke="currentColor"
            strokeWidth="0.7"
          />
          <circle
            cx="30"
            cy="30"
            r="9"
            stroke="currentColor"
            strokeWidth="0.7"
          />
        </pattern>
      </defs>
      <rect width="240" height="240" fill="url(#girih-lattice)" />
    </svg>
  );
}
