'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * S7 아웃트로 — S6(혼술어때 밤 전환)에서 이어지는 다크 오버레이가 섹션 진입 초반(첫 스크린)에
 * 0.95 → 0으로 사라지며 밝은 무드로 복귀하고(도넛 복귀는 S6의 useInView 규칙으로 처리됨),
 * "SO FXXXKING HOT"이 다시 한 번 등장한다.
 */
export function OutroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // 섹션이 뷰포트 아래에서 올라와 상단에 닿기까지(진입 첫 화면)를 0→1로 매핑
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start start'] });
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.95, 0]);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        style={prefersReducedMotion ? { opacity: 0 } : { opacity: overlayOpacity }}
      />

      <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 text-center">
        <motion.p
          className="font-holtwood tracking-tight text-6xl sm:text-7xl lg:text-9xl text-brand"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
        >
          SO FXXXKING HOT
        </motion.p>
        <motion.p
          className="font-paper5 text-base lg:text-xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          Next one&apos;s hotter.
        </motion.p>
      </div>
    </section>
  );
}
