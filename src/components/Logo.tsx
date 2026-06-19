import Image from "next/image";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="Tabis Dev"
      width={size}
      height={size}
      className="shrink-0"
      priority
    />
  );
}
