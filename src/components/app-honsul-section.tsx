'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion, MotionValue, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useDonutOpacity } from '@/components/donut-opacity-context';

const HEADLINE_WORDS = ['혼자', '왔어요?', '다들', '그래요.'];
const SEAT_COUNT = 6;

/**
 * S6 APP 03 — 혼술어때 (COMING SOON). 스크롤할수록 배경이 밤으로 전환되고,
 * 좌석 6개가 순서대로 채워진다. 자산이 없으므로 전부 텍스트/CSS로만 구성(사용자 확정 사항).
 * 스토어 버튼/알림 버튼 없음(확정) — 문구만 표시.
 */
export function AppHonsulSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const donutOpacity = useDonutOpacity();

  // S0: 이 섹션에 30% 이상 들어오면 도넛을 완전히 숨긴다(0), 벗어나면 1로 복귀.
  const inView = useInView(sectionRef, { amount: 0.3 });
  useEffect(() => {
    donutOpacity.set(inView ? 0 : 1);
  }, [inView, donutOpacity]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 0.95]);
  const badgeOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const badgeY = useTransform(scrollYProgress, [0.1, 0.25], [16, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.45, 0.9], [0, 1]);
  const subY = useTransform(scrollYProgress, [0.45, 0.9], [16, 0]);

  return (
    <section
      id="app-honsul"
      ref={sectionRef}
      className={`relative w-full ${prefersReducedMotion ? 'py-24' : 'h-[300vh] lg:h-[320vh]'}`}
    >
      <div className={`w-full overflow-hidden ${prefersReducedMotion ? 'min-h-screen' : 'sticky top-0 h-screen'}`}>
        {/* 밤 오버레이: body 배경은 흰색 유지, 이 div만 opacity 스크럽으로 어두워짐 */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={prefersReducedMotion ? { opacity: 0.95 } : { opacity: overlayOpacity }}
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-5 sm:gap-6 lg:gap-8 px-4 text-center text-white">
          <motion.p
            className="flex items-center gap-3 lg:gap-4 font-holtwood tracking-wide text-xl sm:text-2xl lg:text-4xl"
            style={prefersReducedMotion ? undefined : { opacity: badgeOpacity, y: badgeY }}
          >
            <Image src="/images/honsul/icon.png" alt="" width={56} height={56} className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl" />
            03 <span className="font-paper7">/ 혼술어때</span>
          </motion.p>

          <motion.span
            className="font-holtwood tracking-widest text-xs sm:text-sm lg:text-base border border-white/60 rounded-full px-4 py-1"
            style={prefersReducedMotion ? undefined : { opacity: badgeOpacity, y: badgeY }}
            animate={prefersReducedMotion ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            COMING SOON
          </motion.span>

          <p className="font-paper7 text-base lg:text-xl">혼술어때</p>

          <h3 className="font-paper8 text-3xl sm:text-4xl lg:text-6xl leading-tight">
            {HEADLINE_WORDS.map((word, i) => {
              const start = 0.25 + (i / HEADLINE_WORDS.length) * 0.2;
              const end = start + 0.2 / HEADLINE_WORDS.length;
              return (
                <HonsulWord
                  key={word}
                  word={word}
                  scrollYProgress={scrollYProgress}
                  range={[start, end]}
                  reduced={!!prefersReducedMotion}
                />
              );
            })}
          </h3>

          <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4">
            {Array.from({ length: SEAT_COUNT }).map((_, i) => (
              <Seat key={i} index={i} scrollYProgress={scrollYProgress} reduced={!!prefersReducedMotion} />
            ))}
          </div>

          <motion.p
            className="font-paper4 text-sm sm:text-base lg:text-lg text-gray-300 max-w-md"
            style={prefersReducedMotion ? undefined : { opacity: subOpacity, y: subY }}
          >
            혼술바 가기 전에, 다녀온 다음에. 오늘 어디가 붐비는지, 누가 와 있는지, 어땠는지 — 혼술러들의 커뮤니티.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function HonsulWord({
  word,
  scrollYProgress,
  range,
  reduced,
}: {
  word: string;
  scrollYProgress: MotionValue<number>;
  range: [number, number];
  reduced: boolean;
}) {
  const opacity = useTransform(scrollYProgress, range, [0, 1]);
  const y = useTransform(scrollYProgress, range, [16, 0]);
  return (
    <motion.span className="inline-block mr-[0.3em]" style={reduced ? undefined : { opacity, y }}>
      {word}
    </motion.span>
  );
}

function Seat({
  index,
  scrollYProgress,
  reduced,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
  reduced: boolean;
}) {
  const start = 0.4 + index * 0.075;
  const end = 0.4 + (index + 1) * 0.075;
  const fill = useTransform(scrollYProgress, [start, end], [0, 1]);
  const backgroundColor = useTransform(fill, [0, 1], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)']);
  const scale = useTransform(fill, [0, 1], [0.8, 1]);

  return (
    <motion.div
      className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full border border-white/30"
      style={reduced ? { backgroundColor: 'rgba(255,255,255,0.8)' } : { backgroundColor, scale }}
    />
  );
}
