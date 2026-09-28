'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const SCREENSHOTS = [
  { src: '/images/butakhae/1.png', alt: '부탁해 앱 화면 1' },
  { src: '/images/butakhae/2.png', alt: '부탁해 앱 화면 2' },
  { src: '/images/butakhae/3.png', alt: '부탁해 앱 화면 3' },
];

// 마카다미아 깨기 단계(사용자 확정): full → broken → half → clear, 이 순서로 서서히 크로스페이드.
const MACADAMIA_STAGES = [
  { key: 'full', src: '/images/butakhae/full.png', alt: '통 마카다미아' },
  { key: 'broken', src: '/images/butakhae/broken.png', alt: '금이 간 마카다미아' },
  { key: 'half', src: '/images/butakhae/half.png', alt: '반으로 갈라진 마카다미아' },
  { key: 'clear', src: '/images/butakhae/clear.png', alt: '껍질을 깐 마카다미아 알맹이' },
];

/**
 * S5 APP 02 — 부탁해. 가짜 포인트 카운터/체크리스트 대신, 실제 미션인
 * "마카다미아 깨기"를 full→broken→half→clear 4단계 크로스페이드로 표현한다(사용자 확정 사항 B).
 * 하드 컷 없이 opacity로만 서서히 전환되며 역스크롤 시 그대로 되감긴다.
 */
export function AppButakhaeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [imageIndex, setImageIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (prefersReducedMotion) return;
    const idx = Math.min(SCREENSHOTS.length - 1, Math.floor(v * SCREENSHOTS.length));
    setImageIndex(idx);
  });

  // 4단계 크로스페이드 (디자인 명세 표 그대로): full→broken→half→clear
  const fullOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 1, 0]);
  const brokenOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0, 1, 0]);
  const halfOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]);
  const clearOpacity = useTransform(scrollYProgress, [0.5, 0.65, 1], [0, 1, 1]);
  const stageOpacities = [fullOpacity, brokenOpacity, halfOpacity, clearOpacity];

  // "톡톡 치는" 느낌의 살짝 흔들림(0~0.2 구간)
  const wiggleRotate = useTransform(scrollYProgress, [0, 0.1, 0.2], [-4, 4, 0]);
  // clear 등장 시 scale 0.9→1.05
  const clearScale = useTransform(scrollYProgress, [0.5, 0.65], [0.9, 1.05]);
  // clear 뒤 브랜드 컬러 글로우
  const glowOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 0.3]);
  // "포인트 GET!" 뱃지
  const badgeOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const badgeY = useTransform(scrollYProgress, [0.65, 0.85], [12, 0]);

  return (
    <section
      id="app-butakhae"
      ref={sectionRef}
      className={`relative w-full px-4 sm:px-6 lg:px-8 ${prefersReducedMotion ? 'py-16' : 'h-[240vh] lg:h-[280vh]'}`}
    >
      <div
        className={`w-full max-w-5xl mx-auto flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 py-6 lg:py-0 ${prefersReducedMotion ? '' : 'sticky top-4 lg:top-0 lg:h-screen'}`}
      >
        {/* 데스크톱 전용: 좌측 sticky 스크린샷 (reduced-motion에서는 아래 정적 필름스트립으로 대체하므로 숨김) */}
        {!prefersReducedMotion && (
          <div className="hidden lg:flex lg:w-1/3 h-[60vh] items-center justify-center relative">
            {SCREENSHOTS.map((shot, i) => (
              <Image
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="30vw"
                className={`object-contain transition-opacity duration-300 ${i === imageIndex ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
        )}

        <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 lg:gap-6">
          <motion.p
            className="flex items-center gap-3 lg:gap-4 font-holtwood tracking-wide text-xl sm:text-2xl lg:text-4xl"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Image src="/images/butakhae/icon.png" alt="" width={56} height={56} className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl" />
            02 <span className="font-paper7">/ 부탁해</span>
          </motion.p>
          <p className="font-paper7 text-base lg:text-xl">부탁해</p>
          <h3 className="font-paper8 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            미션 수행으로 포인트를 모으세요.<br />
            다양한 미니게임으로도 포인트를 모을 수 있어요.
          </h3>

          {/* 마카다미아 깨기 연출 */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-64 lg:h-64 my-1 lg:my-2">
            {/* 브랜드 컬러 글로우 */}
            <motion.div
              className="absolute inset-0 rounded-full bg-brand blur-2xl"
              style={prefersReducedMotion ? { opacity: 0 } : { opacity: glowOpacity }}
            />
            {prefersReducedMotion ? (
              <Image
                src={MACADAMIA_STAGES[3].src}
                alt={MACADAMIA_STAGES[3].alt}
                fill
                sizes="256px"
                className="object-contain relative"
              />
            ) : (
              <motion.div className="relative w-full h-full" style={{ rotate: wiggleRotate }}>
                {MACADAMIA_STAGES.map((stage, i) => (
                  <motion.div
                    key={stage.key}
                    className="absolute inset-0"
                    style={{
                      opacity: stageOpacities[i],
                      scale: stage.key === 'clear' ? clearScale : 1,
                    }}
                  >
                    <Image src={stage.src} alt={stage.alt} fill sizes="256px" className="object-contain" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          <motion.p
            className="font-paper8 text-lg lg:text-xl text-brand"
            style={prefersReducedMotion ? undefined : { opacity: badgeOpacity, y: badgeY }}
          >
            포인트 GET!
          </motion.p>

          <p className="font-paper5 text-sm sm:text-base lg:text-lg">
            마카다미아 하나 깰 때마다 포인트. 모으면 상품권.
          </p>

          {/* 모바일 전용(혹은 reduced-motion 시 전체 breakpoint) 스크린샷 3장 — 스크롤 없이 한 화면에 나란히 붙여 보여준다.
              높이는 화면 높이 기준, 너비는 3장이 화면 폭을 넘지 않도록 제한 */}
          <div className={`flex justify-center gap-1 w-full ${prefersReducedMotion ? '' : 'lg:hidden'}`}>
            {SCREENSHOTS.map((shot) => (
              <Image
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                width={780}
                height={1575}
                sizes="30vw"
                className="h-[22vh] w-auto max-w-[calc((100%-0.5rem)/3)] object-contain"
              />
            ))}
          </div>

          <motion.div
            className="flex flex-row gap-2 lg:gap-3"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <a
              href="https://apps.apple.com/kr/app/%EB%B6%80%ED%83%81%ED%95%B4-%EC%95%B1%ED%85%8C%ED%81%AC-%EC%9E%AC%ED%83%9D-%EC%95%84%EB%A5%B4%EB%B0%94%EC%9D%B4%ED%8A%B8/id6756806604"
              target="_blank"
              rel="noopener noreferrer"
              className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 h-10 sm:h-12 md:h-14 lg:h-15 xl:h-16 bg-[#d9d9d9] rounded-lg flex flex-row items-center justify-start shadow-[5px_5px_10px_#c7c7c7,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#c7c7c7,inset_-5px_-5px_10px_#ffffff] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Image src="/images/apple.png" className="ml-2 sm:ml-3 md:ml-3 lg:ml-4" alt="app store" width={24} height={24} />
              <p className="ml-2 font-paper7 text-xs sm:text-sm md:text-sm lg:text-base">App store</p>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.hotdog.butakhae"
              target="_blank"
              rel="noopener noreferrer"
              className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 h-10 sm:h-12 md:h-14 lg:h-15 xl:h-16 bg-[#d9d9d9] rounded-lg flex flex-row items-center justify-start shadow-[5px_5px_10px_#c7c7c7,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#c7c7c7,inset_-5px_-5px_10px_#ffffff] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Image src="/images/android.png" className="ml-2 sm:ml-3 md:ml-3 lg:ml-4" alt="play store" width={24} height={24} />
              <p className="ml-2 font-paper7 text-xs sm:text-sm md:text-sm lg:text-base">Google Play</p>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
