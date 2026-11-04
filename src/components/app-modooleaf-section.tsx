'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const FEATURES = [
  '물·비료 준 날을 캘린더로 한눈에',
  '날짜별 사진으로 남기는 성장 기록',
  '식물 이야기를 나누는 커뮤니티',
];

const Headline = () => (
  <h3 className="font-paper8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl lg:leading-tight">
    우리 집 식물의 <br className="hidden lg:inline" />모든 날.
  </h3>
);

const SectionLabel = () => (
  <p className="flex items-center gap-3 lg:gap-4 font-holtwood tracking-wide text-xl sm:text-2xl lg:text-4xl">
    <Image src="/images/modooleaf/logo-clear.png" alt="" width={56} height={56} className="w-10 h-10 lg:w-14 lg:h-14 object-contain" />
    03 <span className="font-paper7">/ 모두의식물</span>
  </p>
);

const ComingSoonBadge = () => (
  <span className="font-holtwood tracking-widest text-xs sm:text-sm lg:text-base border border-black/60 rounded-full px-4 py-1">
    COMING SOON
  </span>
);

/**
 * S6 APP 03 — 모두의식물 (COMING SOON). 섹션이 고정된 동안 잎이 작은 크기에서 자라나고,
 * 배경이 연한 초록으로 물들었다가 아웃트로 전에 다시 흰색으로 돌아간다.
 * 스토어 출시 전이라 스토어 버튼은 없다. 스크린샷이 생기면 HERE처럼 교체할 수 있다.
 */
export function AppModooleafSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [featureIndex, setFeatureIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (prefersReducedMotion) return;
    setFeatureIndex(Math.min(FEATURES.length - 1, Math.floor(v * FEATURES.length)));
  });

  const tintOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);
  const leafScale = useTransform(scrollYProgress, [0, 0.7], [0.35, 1]);
  const leafRotate = useTransform(scrollYProgress, [0, 0.7], [-18, 0]);

  if (prefersReducedMotion) {
    return (
      <section id="app-modooleaf" className="relative w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 text-center">
          <SectionLabel />
          <ComingSoonBadge />
          <Image src="/images/modooleaf/logo-clear.png" alt="모두의식물 잎 로고" width={693} height={823} className="w-48 h-auto lg:w-80" />
          <Headline />
          <ul className="flex flex-col gap-2">
            {FEATURES.map((feature) => (
              <li key={feature} className="font-paper6 text-lg sm:text-2xl lg:text-3xl">· {feature}</li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id="app-modooleaf" ref={sectionRef} className="relative w-full h-[300vh] lg:h-[320vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0 bg-[#E8F1E9]" style={{ opacity: tintOpacity }} />

        <div className="relative h-full w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-12 py-6">
          <div className="relative w-full lg:w-1/2 h-[36vh] lg:h-[70vh] lg:max-h-[640px] shrink-0 order-2 lg:order-1">
            <motion.div className="absolute inset-0" style={{ scale: leafScale, rotate: leafRotate }}>
              <Image
                src="/images/modooleaf/logo-clear.png"
                alt="모두의식물 잎 로고"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* 카피 블록 — 모바일은 번호 태그만 이미지 위, 나머지는 아래 */}
          <div className="contents lg:order-2 lg:flex lg:w-1/2 lg:flex-col lg:items-start lg:gap-6">
            <div className="order-1 flex flex-col items-center lg:items-start gap-3">
              <SectionLabel />
              <ComingSoonBadge />
            </div>
            <div className="order-3 flex flex-col items-center lg:items-start text-center lg:text-left gap-3 lg:gap-6">
              <Headline />
              <ul className="flex flex-col gap-1 lg:gap-3">
                {FEATURES.map((feature, i) => (
                  <li
                    key={feature}
                    className={`font-paper6 text-lg sm:text-2xl lg:text-3xl transition-all duration-300 ${i === featureIndex ? 'opacity-100' : 'opacity-30'}`}
                  >
                    · {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
