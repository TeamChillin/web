'use client';

import { useEffect, useState } from 'react';

/**
 * sm 브레이크포인트(640px) 미만인지 여부를 반환한다.
 * S2 슬로건 시퀀스에서 스크럽 이동 거리를 모바일(24px)/데스크톱(40px)로 나눠 쓰기 위한 용도.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 639px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return isMobile;
}
