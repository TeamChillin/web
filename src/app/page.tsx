import { HeroSection } from '@/components/hero-section';
import { SloganSequence } from '@/components/slogan-sequence';
import { StudioBridge } from '@/components/studio-bridge';
import { AppHereSection } from '@/components/app-here-section';
import { AppButakhaeSection } from '@/components/app-butakhae-section';
import { AppHonsulSection } from '@/components/app-honsul-section';
import { OutroSection } from '@/components/outro-section';

export default function Home() {
  return (
    <div
      className="flex flex-col items-center min-h-screen bg-white text-black overflow-x-clip w-full"
      /*
        flex: 플렉스박스 레이아웃 사용
        flex-col: 아이템을 세로로 정렬
        items-center: 아이템을 가로축 중앙에 정렬
        min-h-screen: 최소 높이를 화면 전체 높이로 설정
        bg-white: 배경색을 흰색으로 지정
        text-black: 글자색을 검은색으로 지정
        overflow-x-clip: 가로 스크롤 숨김 (hidden은 sticky를 깨뜨려서 clip 사용)
        w-full: 전체 너비 사용
      */
    >
      <div className="relative z-[10] w-full max-w-screen-2xl flex flex-col items-center">
        {/* S1 히어로 — 로고 + @HOTDOG, 스크롤 유도 */}
        <HeroSection />

        {/* S2 슬로건 시퀀스 (핵심 연출) — pinned + scrub로 4줄이 차례대로 쌓임 */}
        <SloganSequence />

        {/* S3 브릿지 — 스튜디오 소개 + 3개 앱 미니 목차 */}
        <StudioBridge />

        {/* S4 APP 01 — HERE */}
        <AppHereSection />

        {/* S5 APP 02 — 부탁해 (마카다미아 깨기 크로스페이드) */}
        <AppButakhaeSection />

        {/* S6 APP 03 — 혼술어때 (COMING SOON, 밤 전환) */}
        <AppHonsulSection />

        {/* S7 아웃트로 — SO FXXXKING HOT 재등장, 밝은 무드 복귀 */}
        <OutroSection />

        {/* S8 Contact / 사업자 정보 / 약관 — 기존 구조·톤 그대로 유지 (오탈자만 수정) */}
        <footer
          className="w-full max-w-5xl px-4 my-8 relative drop-shadow-lg"
          /*
            w-full, max-w-5xl, px-4, my-8: 이전 main 태그와 동일
            relative: 자식 요소의 absolute 위치 기준점
            drop-shadow-lg: 큰 드롭쉐도우 효과
          */
        >
          {/* 배경 블럭 (투명) */}
          <div
            className="bg-gray-100 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 opacity-30 absolute inset-0"
            /*
              bg-gray-100: 배경색 연한 회색
              rounded-3xl: 모서리 둥글게 (1.5rem)
              p-6 sm:p-8 md:p-10 lg:p-12: 반응형 패딩
              opacity-30: 30% 투명도
              absolute inset-0: 부모 요소 전체 크기로 절대 위치
            */
          >
          </div>

          {/* 콘텐츠 블럭 (불투명) */}
          <div
            className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6"
            /*
              relative z-10: 배경 블럭 위에 표시
              p-6 sm:p-8 md:p-10 lg:p-12: 반응형 패딩
              flex flex-col lg:flex-row: 모바일에서는 세로, 데스크톱에서는 가로 정렬
              justify-between: 좌우 정렬
              items-start lg:items-end: 모바일에서는 시작점, 데스크톱에서는 하단 정렬
              gap-6 lg:gap-0: 반응형 간격
            */
          >
            <div className="space-y-1 sm:space-y-2">
              <p className="font-paper4 text-xs sm:text-sm md:text-sm lg:text-base">대표 : 임수</p>
              <p className="font-paper4 text-xs sm:text-sm md:text-sm lg:text-base">사업자 등록 번호 : 628-54-00913</p>
              <p className="font-paper4 text-xs sm:text-sm md:text-sm lg:text-base">주소 : 서울시 성동구 아차산로 68 AU 타워 1011</p>
              <p className="font-paper4 text-xs sm:text-sm md:text-sm lg:text-base">Copyright 2025 @hotdog All rights reserved</p>
            </div>
            <div className="text-left lg:text-right">
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-holtwood mb-1 sm:mb-2">Contact</h2>
              <p className="font-paper4 text-xs sm:text-sm md:text-sm lg:text-base">info@veryveryhotdog.com</p>
              <p className="font-paper4 text-xs sm:text-sm md:text-sm lg:text-base">82+10-8925-4613</p>
              <a
                href="https://www.linkedin.com/in/veryveryhotdog"
                target="_blank"
                rel="noopener noreferrer"
                className="font-paper4 text-xs sm:text-sm md:text-sm lg:text-base hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                www.linkedin.com/in/veryveryhotdog
              </a>
            </div>
          </div>
        </footer>

        {/* Bottom Footer */}
        <div
          className="w-full max-w-5xl text-center py-4 px-4 text-xs sm:text-sm text-gray-500 opacity-100 relative z-[20]"
          /*
            w-full max-w-5xl: 너비 설정
            text-center: 텍스트 중앙 정렬
            py-4: 위아래 패딩 1rem (16px)
            px-4: 좌우 패딩 1rem (16px)
            text-xs sm:text-sm: 반응형 글자 크기
            text-gray-500: 글자색 회색
            opacity-100: 완전 불투명 (투명도 영향 방지)
            relative z-[20]: 다른 요소보다 위에 표시
          */
        >
          <p className="font-paper4 flex flex-col lg:flex-row items-center justify-center gap-1 sm:gap-2 lg:gap-0">
            <a href="https://quickest-hoverfly-9c3.notion.site/veryveryHotdog-135e1477e5348042b408cc42c73a3162" className="hover:underline text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">개인 정보 처리 방침</a>
            <span className="hidden lg:inline"> | </span>
            <a href="https://quickest-hoverfly-9c3.notion.site/146e1477e534809e9553d32a9e61e5e8" className="hover:underline text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">사이트 이용 약관</a>
            <span className="hidden lg:inline"> | </span>
            <span className="text-center">copyright 2025 @hotdog All rights reserved</span>
          </p>
        </div>
      </div>
    </div>
  );
}
