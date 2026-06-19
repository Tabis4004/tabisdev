export function IconBus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M3 11h18M7 17v2M17 17v2M8 5V3M16 5V3" />
      <circle cx="7.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCommerce({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l2.5-5h13L21 9M3 9v11a1 1 0 001 1h16a1 1 0 001-1V9M3 9h18" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

export function IconPayment({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M6 15h4" />
    </svg>
  );
}

export function IconRide({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7" cy="17" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <path d="M9.5 17H14.5M5 17l2-7h8l2 7M7 10l1.5-4h7L17 10" />
    </svg>
  );
}

export function IconArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconExternal({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}
