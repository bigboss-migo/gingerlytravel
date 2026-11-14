import type { ReactNode } from "react";

const PATHS: Record<string, ReactNode> = {
  cruise: <path d="M2 20c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0M4 17l-1-5 9-3 9 3-1 5M12 9V3l5 2-5 2M7 12V9" />,
  plane: <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />,
  resort: <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35zM11 15.5 7 21" />,
  group: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m16 8-2 6-6 2 2-6z" />
    </>
  ),
  star: <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3L8 14.2 3 9.3l6.9-1z" />,
  hotel: <path d="M2 18v-8M2 14h20v4M22 18v-5a3 3 0 0 0-3-3h-8v4M6 10h.01" />,
  pin: <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
  home: <path d="m3 11 9-8 9 8M5 10v10h14V10M10 20v-6h4v6" />,
  key: <path d="M12.5 12.3 20 4.8M17 6l3 3M14 9l2 2M7.5 11a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" />,
  download: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />,
};

export default function Icon({ name, size }: { name?: string | null; size?: number }) {
  if (!name || !PATHS[name]) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
