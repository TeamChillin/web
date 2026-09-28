'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * S1 히어로 — 핫도그 로고 + `@HOTDOG`만 있는 미니멀한 첫 화면.
 * 로드 시 로고가 캐주얼하게 "툭" 튀어나오고, 하단 스크롤 유도 화살표가 계속 흔들린다.
 * 기존 헤더의 슬로건 4줄은 S2(슬로건 시퀀스)로 이동했으므로 여기서는 제거.
 */
export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full px-4 text-center">
      <motion.div
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-48 xl:h-48 mb-4 sm:mb-6 md:mb-8"
        initial={prefersReducedMotion ? false : { scale: 0.4, opacity: 0, rotate: -15 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: 'backOut' }}
      >
        <Image src="/images/hotdog.png" alt="Hotdog" width={200} height={200} className="w-full h-full object-contain" />
      </motion.div>

      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-[110px] tracking-tighter font-holtwood"
        initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: prefersReducedMotion ? 0 : 0.2 }}
      >
        @HOTDOG
      </motion.h1>

      <p className="mt-4 sm:mt-6 font-paper5 text-sm sm:text-base lg:text-lg text-gray-600">
        Scroll. It&apos;s hot down there.
      </p>

      <motion.div
        className="mt-10 sm:mt-14 text-2xl"
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity }}
        aria-hidden="true"
      >
        ↓
      </motion.div>
    </section>
  );
}
