'use client';

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDonutOpacity } from '@/components/donut-opacity-context';

export function AnimatedDonut() {
  const [imageSize, setImageSize] = useState(600);
  const boundsRef = useRef({ width: 0, height: 0 });
  const velocity = useRef({ x: 2, y: 2 });
  const isInitializedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  // MotionValue는 리액트 리렌더링 없이 값을 업데이트할 수 있어 애니메이션에 최적화되어 있습니다.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 물리 기반 스프링 효과를 추가합니다. (stiffness: 뻣뻣함, damping: 감쇠, restDelta: 멈춤 조건)
  const springX = useSpring(x, { stiffness: 100, damping: 20, restDelta: 0.001 });
  const springY = useSpring(y, { stiffness: 100, damping: 20, restDelta: 0.001 });

  // S0: S2/S6 섹션이 공유 컨텍스트를 통해 도넛의 opacity를 제어(평상시 1, S2 0.12, S6 0).
  const donutOpacity = useDonutOpacity();
  const springOpacity = useSpring(donutOpacity, { stiffness: 120, damping: 24 });

  useEffect(() => {
    function handleResize() {
      // 화면 크기에 따라 도넛 크기 조정
      const screenWidth = window.innerWidth;
      let newImageSize = 600; // 기본 크기
      
      if (screenWidth < 640) {
        newImageSize = 300; // 모바일
      } else if (screenWidth < 768) {
        newImageSize = 400; // 작은 태블릿
      } else if (screenWidth < 1024) {
        newImageSize = 500; // 태블릿
      } else if (screenWidth < 1280) {
        newImageSize = 600; // 데스크톱
      } else if (screenWidth < 1536) {
        newImageSize = 600; // 큰 데스크톱
      } else {
        newImageSize = 700; // 매우 큰 화면
      }

      setImageSize(newImageSize);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // imageSize가 변경될 때마다 "보이는 화면(viewport)" 기준 bounds 재계산
  useEffect(() => {
    function updateBounds() {
      const bounds = {
        width: Math.max(0, window.innerWidth - imageSize), // 도넛 크기만큼 여백 확보
        height: Math.max(0, window.innerHeight - imageSize),
      };
      boundsRef.current = bounds;

      // 최초 1회만 랜덤 위치를 지정
      if (!isInitializedRef.current) {
        x.set(Math.random() * bounds.width);
        y.set(Math.random() * bounds.height);
        isInitializedRef.current = true;
        return;
      }

      // 화면이 줄어들어 도넛이 밖에 걸린 경우 안으로 당겨온다
      x.set(Math.min(Math.max(x.get(), 0), bounds.width));
      y.set(Math.min(Math.max(y.get(), 0), bounds.height));
    }

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, [imageSize, x, y]);

  useAnimationFrame(() => {
    // prefers-reduced-motion: reduce 환경에서는 도넛을 정적 위치에 고정하고 튕김도 멈춘다.
    if (prefersReducedMotion) return;
    if (!isInitializedRef.current) return;

    const currentX = x.get();
    const currentY = y.get();

    // 다음 위치 계산
    let nextX = currentX + velocity.current.x;
    let nextY = currentY + velocity.current.y;

    // X축 경계 검사 및 보정 (화면 밖으로 나가지 않도록)
    if (nextX <= 0) {
      nextX = 0;
      velocity.current.x *= -1;
    } else if (nextX >= boundsRef.current.width) {
      nextX = boundsRef.current.width;
      velocity.current.x *= -1;
    }

    // Y축 경계 검사 및 보정 (화면 밖으로 나가지 않도록)
    if (nextY <= 0) {
      nextY = 0;
      velocity.current.y *= -1;
    } else if (nextY >= boundsRef.current.height) {
      nextY = boundsRef.current.height;
      velocity.current.y *= -1;
    }

    // 보정된 위치로 업데이트
    x.set(nextX);
    y.set(nextY);
  });

  return (
    // 화면(viewport)에 고정된 레이어: 스크롤과 상관없이 도넛이 항상 보이는 화면 안에서 돌아다닙니다.
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* motion.div가 스프링 값을 사용해 부드럽게 움직입니다. opacity는 S0 규칙(S2=0.12, S6=0, 그 외=1)을 따르는 공유 스프링 값 */}
      <motion.div
        className="absolute z-[1]"
        style={{
          x: springX,
          y: springY,
          opacity: springOpacity,
          width: `${imageSize}px`,
          height: `${imageSize}px`,
        }}
      >
        <div
          className={prefersReducedMotion ? 'w-full h-full' : 'w-full h-full animate-spin-slow'}
          style={{
            width: `${imageSize}px`,
            height: `${imageSize}px`,
            backgroundImage: 'url(/images/donut.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
      </motion.div>
    </div>
  );
} 