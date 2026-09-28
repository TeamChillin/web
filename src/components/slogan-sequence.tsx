'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  MotionValue,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useDonutOpacity } from '@/components/donut-opacity-context';
import { useIsMobile } from '@/components/use-is-mobile';

const LINE_CLASS = 'font-holtwood tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-[min(4.5rem,8vh)] leading-none';

/**
 * S2 슬로건 시퀀스 (핵심 연출) — 화면이 고정(pinned)된 채로 스크롤을 내리면
 * `SO FRESH` → `SO DANGEROUS` → `SO HIGH` → `SO FXXXKING HOT`이 차례대로 나타나 쌓인다.
 * 역스크롤 시 정확히 되감기도록 모두 scrollYProgress에 연동(scrub)한다.
 */
export function SloganSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const donutOpacity = useDonutOpacity();

  // S0: 이 섹션이 뷰포트에 30% 이상 들어오면 도넛을 흐리게(0.12), 벗어나면 원상복구(1).
  const inView = useInView(sectionRef, { amount: 0.3 });
  useEffect(() => {
    donutOpacity.set(inView ? 0.12 : 1);
  }, [inView, donutOpacity]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const offset = isMobile ? 24 : 40;

  // 줄마다 등장 구간을 나눠, 한 번 나타난 줄은 그대로 남아 아래로 쌓인다.
  const line1 = useLineReveal(scrollYProgress, [0.02, 0.14], offset);
  const line2 = useLineReveal(scrollYProgress, [0.2, 0.32], offset);
  const line3 = useLineReveal(scrollYProgress, [0.38, 0.5], offset);
  const climax = useLineReveal(scrollYProgress, [0.56, 0.7], offset);

  const climaxScale = useTransform(scrollYProgress, [0.56, 0.7, 1], [0.8, 1, 1.1]);
  // 브랜드 컬러(hotdog.png에서 추출한 #984010)로 서서히 달아오른다.
  const climaxColor = useTransform(scrollYProgress, [0.7, 0.9], ['#000000', '#984010']);

  if (prefersReducedMotion) {
    return (
      <section className="w-full min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <p className={LINE_CLASS}>SO FRESH</p>
        <p className={LINE_CLASS}>SO DANGEROUS</p>
        <p className={LINE_CLASS}>SO HIGH</p>
        <p className="font-holtwood tracking-tight text-5xl sm:text-6xl text-brand">SO<br />FXXXKING<br />HOT</p>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[350vh] lg:h-[450vh] w-full">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center gap-4 lg:gap-6 overflow-hidden px-4 text-center">
        <motion.p className={LINE_CLASS} style={line1}>
          SO FRESH
        </motion.p>
        <motion.p className={LINE_CLASS} style={line2}>
          SO DANGEROUS
        </motion.p>
        <motion.p className={LINE_CLASS} style={line3}>
          SO HIGH
        </motion.p>
        <motion.div
          className="mt-2 lg:mt-4 flex flex-col items-center justify-center gap-1 lg:gap-2 font-holtwood tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[min(6rem,11vh)] leading-none"
          style={{ ...climax, scale: climaxScale, color: climaxColor }}
        >
          <span>SO</span>
          <span>
            F
            {/* Q8: XXX 검열 바 깜빡임 — 스크롤과 무관하게 0.6s 주기로 loop */}
            <motion.span
              animate={{ opacity: [1, 0.2, 1, 0.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              XXX
            </motion.span>
            KING
          </span>
          <span>HOT</span>
        </motion.div>
      </div>
    </section>
  );
}

/** [start, end] 구간 동안 아래에서 떠오르며 나타나고, 이후엔 그대로 유지된다. */
function useLineReveal(progress: MotionValue<number>, [start, end]: [number, number], offset: number) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [offset, 0]);
  return { opacity, y };
}
