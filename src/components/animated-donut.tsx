'use client';

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function AnimatedDonut() {
  const imageSize = 600;
  const horizontalBuffer = 45; // 가로 이동 보정값
  const verticalBuffer = 45; // 세로 이동 보정값
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 });
  const velocity = useRef({ x: 2, y: 2 });

  // MotionValue는 리액트 리렌더링 없이 값을 업데이트할 수 있어 애니메이션에 최적화되어 있습니다.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 물리 기반 스프링 효과를 추가합니다. (stiffness: 뻣뻣함, damping: 감쇠, restDelta: 멈춤 조건)
  const springX = useSpring(x, { stiffness: 100, damping: 20, restDelta: 0.001 });
  const springY = useSpring(y, { stiffness: 100, damping: 20, restDelta: 0.001 });

  useEffect(() => {
    function handleResize() {
      // 최대 가로사이즈를 1536px (2xl)로 제한
      const maxWidth = Math.min(window.innerWidth, 1536);
      setPageSize({
        width: maxWidth,
        height: document.body.scrollHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (pageSize.width > 0) {
      x.set(Math.random() * (pageSize.width - imageSize));
      y.set(Math.random() * (pageSize.height - imageSize));
    }
  }, [pageSize, imageSize, x, y]);

  useAnimationFrame(() => {
    if (pageSize.width === 0) return;

    const currentX = x.get();
    const currentY = y.get();

    // 다음 위치 계산
    let nextX = currentX + velocity.current.x;
    let nextY = currentY + velocity.current.y;

    // X축 경계 검사 및 보정
    if (nextX <= -horizontalBuffer) {
      nextX = -horizontalBuffer;
      velocity.current.x *= -1;
    } else if (nextX >= pageSize.width - imageSize + horizontalBuffer) {
      nextX = pageSize.width - imageSize + horizontalBuffer;
      velocity.current.x *= -1;
    }

    // Y축 경계 검사 및 보정
    if (nextY <= -verticalBuffer) {
      nextY = -verticalBuffer;
      velocity.current.y *= -1;
    } else if (nextY >= pageSize.height - imageSize + verticalBuffer) {
      nextY = pageSize.height - imageSize + verticalBuffer;
      velocity.current.y *= -1;
    }

    // 보정된 위치로 업데이트
    x.set(nextX);
    y.set(nextY);
  });

  return (
    <>
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${imageSize / 2 - horizontalBuffer}px`,
          top: `${imageSize / 2 - verticalBuffer}px`,
          width: `${pageSize.width - imageSize + horizontalBuffer * 2}px`,
          height: `${pageSize.height - imageSize + verticalBuffer * 2}px`,
          zIndex: 0,
        }}
      />
      {/* motion.div가 스프링 값을 사용해 부드럽게 움직입니다. */}
      <motion.div
        className="absolute top-0 left-0 z-[1]"
        style={{
          x: springX,
          y: springY,
          width: `${imageSize}px`,
          height: `${imageSize}px`,
        }}
      >
        <Image
          src="/images/donut.png"
          alt="donut"
          width={imageSize}
          height={imageSize}
          className="animate-spin-slow"
        />
      </motion.div>
    </>
  );
} 