'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';

const SCREENSHOTS = [
  { src: '/images/here/1.png', alt: 'HERE 앱 화면 1' },
  { src: '/images/here/2.png', alt: 'HERE 앱 화면 2' },
  { src: '/images/here/3.png', alt: 'HERE 앱 화면 3' },
  { src: '/images/here/4.png', alt: 'HERE 앱 화면 4' },
  { src: '/images/here/5.png', alt: 'HERE 앱 화면 5' },
];

// 기획 확인 필요(designer 임시안) — 실제 기능 카피 확정 전까지 홍보 문구 기반으로 대체
const FEATURES = [
  '장소기반, 익명이라 더 편하게',
  '페스티벌·학교·회사 — 지금 같은 공간',
  '엄마, 아빠가 모르는 우리만의 이야기',
];

/**
 * S4 APP 01 — HERE. 부탁해와 같이 섹션 전체가 화면에 고정(pinned)된 상태에서
 * 아래로 스크롤하면 스크린샷 1→5가 차례로 바뀌고, 옆(모바일은 아래) 기능 카피도 함께 강조가 넘어간다.
 */
export function AppHereSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [imageIndex, setImageIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (prefersReducedMotion) return;
    setImageIndex(Math.min(SCREENSHOTS.length - 1, Math.floor(v * SCREENSHOTS.length)));
  });

  // 스크린샷 5장에 기능 카피 3개를 고르게 나눠 매핑 (0,1 → 0 / 2,3 → 1 / 4 → 2)
  const featureIndex = Math.min(FEATURES.length - 1, Math.floor((imageIndex * FEATURES.length) / SCREENSHOTS.length));

  const storeButtons = (
    <div className="flex flex-row gap-2 lg:gap-3">
      <a
        href="https://apps.apple.com/kr/app/here-%ED%9E%88%EC%96%B4-%EC%9E%A5%EC%86%8C%EA%B8%B0%EB%B0%98-%EC%9D%B5%EB%AA%85-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0/id6746250884"
        target="_blank"
        rel="noopener noreferrer"
        className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 h-10 sm:h-12 md:h-14 lg:h-15 xl:h-16 bg-[#d9d9d9] rounded-lg flex flex-row items-center justify-start shadow-[5px_5px_10px_#c7c7c7,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#c7c7c7,inset_-5px_-5px_10px_#ffffff] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <Image src="/images/apple.png" className="ml-2 sm:ml-3 md:ml-3 lg:ml-4" alt="app store" width={24} height={24} />
        <p className="ml-2 font-paper7 text-xs sm:text-sm md:text-sm lg:text-base">App store</p>
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.hotdog.hereClient"
        target="_blank"
        rel="noopener noreferrer"
        className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 h-10 sm:h-12 md:h-14 lg:h-15 xl:h-16 bg-[#d9d9d9] rounded-lg flex flex-row items-center justify-start shadow-[5px_5px_10px_#c7c7c7,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#c7c7c7,inset_-5px_-5px_10px_#ffffff] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <Image src="/images/android.png" className="ml-2 sm:ml-3 md:ml-3 lg:ml-4" alt="play store" width={24} height={24} />
        <p className="ml-2 font-paper7 text-xs sm:text-sm md:text-sm lg:text-base">Google Play</p>
      </a>
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <section id="app-here" className="relative w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 text-center">
          <p className="flex items-center gap-3 lg:gap-4 font-holtwood tracking-wide text-xl sm:text-2xl lg:text-4xl">
            <Image src="/images/here/icon.png" alt="" width={56} height={56} className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl" />
            01 <span className="font-paper7">/ HERE</span>
          </p>
          <div className="flex justify-center gap-1 w-full">
            {SCREENSHOTS.map((shot) => (
              <Image key={shot.src} src={shot.src} alt={shot.alt} width={780} height={1575} sizes="20vw" className="h-[30vh] w-auto max-w-[calc((100%-1rem)/5)] object-contain" />
            ))}
          </div>
          <h3 className="font-paper8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">지금, 여기 있는 사람들이랑.</h3>
          <ul className="flex flex-col gap-2">
            {FEATURES.map((feature) => (
              <li key={feature} className="font-paper6 text-lg sm:text-2xl lg:text-3xl">· {feature}</li>
            ))}
          </ul>
          {storeButtons}
        </div>
      </section>
    );
  }

  return (
    <section id="app-here" ref={sectionRef} className="relative w-full h-[400vh] lg:h-[450vh] px-4 sm:px-6 lg:px-8">
      <div className="sticky top-0 h-screen w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-12 py-6">
        {/* 스크린샷: 같은 자리에 겹쳐 두고 현재 인덱스만 보이게(크로스페이드) */}
        <div className="relative w-full lg:w-1/2 h-[36vh] lg:h-[70vh] lg:max-h-[640px] shrink-0 order-2 lg:order-1">
          {SCREENSHOTS.map((shot, i) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className={`object-contain transition-opacity duration-500 ${i === imageIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>

        {/* 카피 블록 — 모바일은 번호 태그만 이미지 위, 나머지는 아래 */}
        <div className="contents lg:order-2 lg:flex lg:w-1/2 lg:flex-col lg:items-start lg:gap-6">
          <p className="order-1 flex items-center gap-3 lg:gap-4 font-holtwood tracking-wide text-xl sm:text-2xl lg:text-4xl">
            <Image src="/images/here/icon.png" alt="" width={56} height={56} className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl" />
            01 <span className="font-paper7">/ HERE</span>
          </p>
          <div className="order-3 flex flex-col items-center lg:items-start text-center lg:text-left gap-3 lg:gap-6">
            <h3 className="font-paper8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">지금, 여기 있는 사람들이랑.</h3>
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
            {storeButtons}
          </div>
        </div>
      </div>
    </section>
  );
}
