'use client';

import { createContext, useContext } from 'react';
import { MotionValue, useMotionValue } from 'framer-motion';

/*
  AnimatedDonut는 layout.tsx에 전역 단일 인스턴스로 존재하고 섹션과 무관하게 튕겨다닌다.
  S2(슬로건 시퀀스)/S6(혼술어때 밤 전환) 섹션에서만 도넛을 흐리게/숨김 처리하려면
  섹션 컴포넌트와 AnimatedDonut이 opacity 값을 공유해야 한다. 이를 위해 문서 전체를
  감싸는 Context에 단일 MotionValue를 올려두고, 각 섹션은 해당 값을 set()하고
  AnimatedDonut은 그 값을 구독(useSpring)한다 (디자인 명세 S0 참고).
*/
const DonutOpacityContext = createContext<MotionValue<number> | null>(null);

export function DonutOpacityProvider({ children }: { children: React.ReactNode }) {
  // 기본값 1 = 평상시(도넛 완전히 보임). S2 진입 시 0.12, S6 진입 시 0으로 각 섹션이 set() 한다.
  const donutOpacity = useMotionValue(1);

  return (
    <DonutOpacityContext.Provider value={donutOpacity}>
      {children}
    </DonutOpacityContext.Provider>
  );
}

export function useDonutOpacity() {
  const ctx = useContext(DonutOpacityContext);
  if (!ctx) {
    throw new Error('useDonutOpacity는 DonutOpacityProvider 내부에서만 사용할 수 있습니다.');
  }
  return ctx;
}
