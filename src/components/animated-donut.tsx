'use client';

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function AnimatedDonut() {
  const [imageSize, setImageSize] = useState(600);
  const [docSize, setDocSize] = useState({ width: 0, height: 0 });
  const boundsRef = useRef({ width: 0, height: 0 });
  const velocity = useRef({ x: 2, y: 2 });
  const isInitializedRef = useRef(false);

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

      setImageSize(newImageSize);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // imageSize가 변경될 때마다 "문서 전체" 기준 bounds 재계산
  useEffect(() => {
    let rafId: number | null = null;

    function getDocumentSize() {
      const scrollingEl = document.scrollingElement ?? document.documentElement;
      const body = document.body;

      const width = Math.max(
        scrollingEl.scrollWidth,
        scrollingEl.clientWidth,
        document.documentElement.scrollWidth,
        document.documentElement.clientWidth,
        body.scrollWidth,
        body.clientWidth,
        window.innerWidth,
      );

      const height = Math.max(
        scrollingEl.scrollHeight,
        scrollingEl.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight,
        body.scrollHeight,
        body.clientHeight,
        window.innerHeight,
      );

      return { width, height };
    }

    function updatePageSize() {
      const { width, height } = getDocumentSize();

      const bounds = {
        width: Math.max(0, width - imageSize), // 도넛 크기만큼 여백 확보
        height: Math.max(0, height - imageSize), // 도넛 크기만큼 여백 확보
      };

      boundsRef.current = bounds;
      setDocSize({ width, height });

      // 최초 1회만 랜덤 위치를 지정 (스크롤/DOM 변화로 위치가 계속 리셋되는 문제 방지)
      if (!isInitializedRef.current && bounds.width > 0 && bounds.height > 0) {
        x.set(Math.random() * bounds.width);
        y.set(Math.random() * bounds.height);
        isInitializedRef.current = true;
      }

      // bounds가 줄어든 케이스에서 도넛이 밖으로 나가 "갇힌 것처럼" 보이는 문제 방지
      if (isInitializedRef.current) {
        if (x.get() > bounds.width) x.set(bounds.width);
        if (y.get() > bounds.height) y.set(bounds.height);
        if (x.get() < 0) x.set(0);
        if (y.get() < 0) y.set(0);
      }

      // 디버깅용 (개발 환경에서만)
      if (process.env.NODE_ENV === 'development') {
        console.log('Document size:', { width, height });
        console.log('Bounds:', bounds);
        console.log('Viewport:', { width: window.innerWidth, height: window.innerHeight });
      }
    }

    // 초기 계산
    updatePageSize();

    // 페이지 로드 완료 후 재계산 (콘텐츠가 모두 로드된 후)
    if (document.readyState === 'complete') {
      setTimeout(updatePageSize, 100);
    } else {
      const onLoad = () => setTimeout(updatePageSize, 100);
      window.addEventListener('load', onLoad, { once: true });
    }

    function scheduleUpdate() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updatePageSize();
      });
    }

    window.addEventListener('resize', scheduleUpdate);

    // 모든 요소의 크기 변화를 관찰
    const ro = new ResizeObserver(scheduleUpdate);
    ro.observe(document.documentElement);
    ro.observe(document.body);

    return () => {
      window.removeEventListener('resize', scheduleUpdate);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [imageSize]);

  useAnimationFrame(() => {
    if (!isInitializedRef.current) return;
    if (boundsRef.current.width === 0 && boundsRef.current.height === 0) return;

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
    // 문서 전체를 덮는 absolute 레이어: 도넛이 "document 좌표계"에서 돌아다니며,
    // 스크롤하면 도넛이 같이 따라오지 않고 문서의 다른 위치에 남습니다.
    <div
      className="absolute left-0 top-0 pointer-events-none"
      style={{
        zIndex: 0,
        width: docSize.width || '100vw',
        height: docSize.height || '100vh',
      }}
    >
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