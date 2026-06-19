"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/portfolio";

export function ScreenshotGallery({
  screenshots,
  accent,
  productName,
}: {
  screenshots: Product["screenshots"];
  accent: string;
  productName: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div
        className="relative overflow-hidden rounded-2xl border-2 shadow-2xl"
        style={{ borderColor: `${accent}55` }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at top right, ${accent}, transparent 60%)`,
          }}
        />
        <Image
          src={screenshots[active].src}
          alt={screenshots[active].alt}
          width={1280}
          height={800}
          className="relative w-full object-cover object-top"
          priority={active === 0}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {screenshots.map((shot, index) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setActive(index)}
            className="group relative overflow-hidden rounded-xl border-2 transition-all duration-200"
            style={{
              borderColor: active === index ? accent : "rgba(255,255,255,0.1)",
              boxShadow: active === index ? `0 0 0 3px ${accent}33` : "none",
            }}
            aria-label={`${productName} — capture ${index + 1}`}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={400}
              height={250}
              className="h-24 w-full object-cover object-top transition-transform duration-200 group-hover:scale-105 md:h-28"
            />
            <div
              className="absolute inset-x-0 bottom-0 px-2 py-1 text-[10px] font-medium text-white"
              style={{ background: `linear-gradient(transparent, ${accent}cc)` }}
            >
              {index + 1}/3
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
