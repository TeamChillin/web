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
  const [imageSize, setImageSize] = useState(600);
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
      
      console.log('Screen width:', screenWidth, 'New image size:', newImageSize);
      setImageSize(newImageSize);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // imageSize가 변경될 때마다 pageSize 재계산
  useEffect(() => {
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    setPageSize({
      width: maxWidth - imageSize, // 도넛 크기만큼 여백 확보
      height: maxHeight - imageSize, // 도넛 크기만큼 여백 확보
    });
  }, [imageSize]);

  useEffect(() => {
    if (pageSize.width > 0) {
      x.set(Math.random() * pageSize.width);
      y.set(Math.random() * pageSize.height);
    }
  }, [pageSize, x, y]);

  useAnimationFrame(() => {
    if (pageSize.width === 0) return;

    const currentX = x.get();
    const currentY = y.get();

    // 다음 위치 계산
    let nextX = currentX + velocity.current.x;
    let nextY = currentY + velocity.current.y;

    // X축 경계 검사 및 보정 (화면 밖으로 나가지 않도록)
    if (nextX <= 0) {
      nextX = 0;
      velocity.current.x *= -1;
    } else if (nextX >= pageSize.width) {
      nextX = pageSize.width;
      velocity.current.x *= -1;
    }

    // Y축 경계 검사 및 보정 (화면 밖으로 나가지 않도록)
    if (nextY <= 0) {
      nextY = 0;
      velocity.current.y *= -1;
    } else if (nextY >= pageSize.height) {
      nextY = pageSize.height;
      velocity.current.y *= -1;
    }

    // 보정된 위치로 업데이트
    x.set(nextX);
    y.set(nextY);
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* motion.div가 스프링 값을 사용해 부드럽게 움직입니다. */}
      <motion.div
        className="absolute z-[1]"
        style={{
          x: springX,
          y: springY,
          width: `${imageSize}px`,
          height: `${imageSize}px`,
        }}
      >
        <div 
          className="w-full h-full animate-spin-slow"
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