import Image from 'next/image';

export default function Home() {
  return (
    <div
      className="flex flex-col items-center min-h-screen bg-white text-black overflow-x-hidden w-full"
      /*
        flex: 플렉스박스 레이아웃 사용
        flex-col: 아이템을 세로로 정렬
        items-center: 아이템을 가로축 중앙에 정렬
        min-h-screen: 최소 높이를 화면 전체 높이로 설정
        bg-white: 배경색을 흰색으로 지정
        text-black: 글자색을 검은색으로 지정
        overflow-x-hidden: 가로 스크롤 숨김으로 가로사이즈 고정
        w-full: 전체 너비 사용
      */
    >
      <div className="relative z-[10] w-full max-w-screen-2xl flex flex-col items-center">
        {/* Header Section */}
        <header
          className="flex flex-col items-center w-full py-6 sm:py-8 md:py-10 lg:py-12 px-4"
          /*
            flex, flex-col, items-center: 아이템을 세로 및 가로 중앙 정렬
            w-full: 너비를 100%로 설정
            py-6 sm:py-8 md:py-10 lg:py-12: 반응형 위아래 패딩
            px-4: 좌우 패딩 1rem
          */
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-48 xl:h-48 mb-4 sm:mb-6 md:mb-8">
            <Image src="/images/hotdog.png" alt="Hotdog" width={200} height={200} className="w-full h-full object-contain" />
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8' >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[110px] tracking-tighter font-holtwood text-center"
            /*
              반응형 글자 크기: 모바일 2.25rem → 데스크톱 110px
              tracking-tighter: 자간을 좁게 설정
              font-holtwood: Holtwood One SC 폰트 적용
              text-center: 텍스트 중앙 정렬
            */
          >
            @HOTDOG
          </h1>
          <div
            className="flex flex-col text-center lg:text-left font-holtwood"
            /*
              flex flex-col: 세로 정렬
              text-center lg:text-left: 모바일에서는 중앙, 데스크톱에서는 왼쪽 정렬
              font-holtwood: Holtwood One SC 폰트 적용
            */
          >
            <div className='flex flex-col text-center lg:text-left' >
            <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[30px] leading-tight" > SO FREASH</p>
            <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[30px] leading-tight" >SO DANGEROUS</p>
            <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[30px] leading-tight" >SO HIGH</p>
            <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[30px] leading-tight" >SO FXXXKING HOT</p>
            </div>
          </div>
          </div>
        </header>

        <main
          className="w-full max-w-5xl px-4"
          /*
            w-full: 너비 100%
            max-w-5xl: 최대 너비 64rem (1024px)
            px-4: 좌우 패딩 1rem (16px)
          */
        >


          {/* Community Section */}
          <section
            className="w-full flex flex-row justify-center lg:justify-end gap-4 lg:gap-2 my-8 items-center"
            /*
              flex flex-col lg:flex-row: 모바일에서는 세로, 데스크톱에서는 가로 정렬
              justify-center lg:justify-end: 모바일에서는 중앙, 데스크톱에서는 오른쪽 정렬
              gap-4 lg:gap-2: 반응형 간격
              my-8: 위아래 마진 2rem (32px)
              items-center: 아이템을 세로축 중앙에 정렬
            */
          >
             <div className="drop-shadow-lg w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96">
               <Image src="/images/here/1-1.png" alt="section1" width={300} height={300} className="w-full h-full object-contain" />
             </div>
             <div className="drop-shadow-lg w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96">
               <Image src="/images/here/1-2.png" alt="section2" width={300} height={300} className="w-full h-full object-contain" />
             </div>
          </section>
      
          
          {/* App Promotion Section */}
          <section
            className="drop-shadow-lg bg-gray-100 rounded-3xl p-5 sm:p-5 md:p-8 lg:p-8 xl:p-8 2xl:p-8 flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-5 xl:gap-5 2xl:gap-5 max-w-full overflow-hidden"
            /*
              bg-gray-100: 배경색 연한 회색
              rounded-3xl: 모서리 둥글게 (1.5rem)
              p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-16: 반응형 패딩
              flex flex-col lg:flex-row: 모바일에서는 세로, 데스크톱에서는 가로 정렬
              items-center: 아이템 세로축 중앙 정렬
              gap-6 lg:gap-12 xl:gap-16 2xl:gap-20: 반응형 간격
              max-w-full overflow-hidden: 최대 너비 제한 및 넘침 방지
            */
          >
            <div
              className="flex flex-col items-center lg:items-start space-y-4 gap-2"
              /*
                flex flex-col: 아이템 세로 정렬
                items-center lg:items-start: 모바일에서는 중앙, 데스크톱에서는 시작점 정렬
                space-y-4 lg:space-y-6 xl:space-y-8 2xl:space-y-10: 반응형 세로 간격
              */
            >
              <a href="https://apps.apple.com/kr/app/here-%ED%9E%88%EC%96%B4-%EC%9E%A5%EC%86%8C%EA%B8%B0%EB%B0%98-%EC%9D%B5%EB%AA%85-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0/id6746250884" target="_blank" rel="noopener noreferrer" className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 h-10 sm:h-12 md:h-14 lg:h-15 xl:h-16 bg-[#d9d9d9] rounded-lg flex flex-row items-center justify-start shadow-[5px_5px_10px_#c7c7c7,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#c7c7c7,inset_-5px_-5px_10px_#ffffff] transition-all duration-150">
                  <Image src="/images/apple.png" className='ml-2 sm:ml-3 md:ml-3 lg:ml-4' alt="app store" width={24} height={24} />
                <p className="ml-2 font-paper7 text-xs sm:text-sm md:text-sm lg:text-base">App store</p>
                </a>
              <a href="https://play.google.com/store/apps/details?id=com.hotdog.hereClient" target="_blank" rel="noopener noreferrer" className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 h-10 sm:h-12 md:h-14 lg:h-15 xl:h-16 bg-[#d9d9d9] rounded-lg flex flex-row items-center justify-start shadow-[5px_5px_10px_#c7c7c7,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#c7c7c7,inset_-5px_-5px_10px_#ffffff] transition-all duration-150">
                  <Image src="/images/android.png" className='ml-2 sm:ml-3 md:ml-3 lg:ml-4' alt="play store" width={24} height={24} />
                <p className="ml-2 font-paper7 text-xs sm:text-sm md:text-sm lg:text-base">Google Play</p>
              </a>
            </div>
            <div
              className="flex flex-wrap justify-center gap-1"
              /*
                flex flex-wrap: 플렉스박스 래핑으로 자동 줄바꿈
                justify-center: 아이템 가로축 중앙 정렬
                gap-2 lg:gap-3 xl:gap-4 2xl:gap-6: 반응형 간격
              */
            >
              <div className="w-35 h-70 ">
                <Image src="/images/here/1.png" alt="Phone 1" width={130} height={130} className="w-full h-full object-contain" />
              </div>
              <div className="w-35 h-70 ">
                <Image src="/images/here/2.png" alt="Phone 2" width={130} height={130} className="w-full h-full object-contain" />
              </div>
              <div className="w-35 h-70 ">
                <Image src="/images/here/3.png" alt="Phone 3" width={130} height={130} className="w-full h-full object-contain" />
              </div>
              <div className="w-35 h-70 ">
                <Image src="/images/here/4.png" alt="Phone 4" width={130} height={130} className="w-full h-full object-contain" />
              </div>
              <div className="w-35 h-70 "> 
                <Image src="/images/here/5.png" alt="Phone 5" width={130} height={130} className="w-full h-full object-contain" />
              </div>
            </div>
          </section>


          {/* Community Section */}
          <section
            className="w-full flex flex-row justify-center lg:justify-start gap-4 lg:gap-2 my-8 items-center"
            /*
              flex flex-col lg:flex-row: 모바일에서는 세로, 데스크톱에서는 가로 정렬
              justify-center lg:justify-end: 모바일에서는 중앙, 데스크톱에서는 오른쪽 정렬
              gap-4 lg:gap-2: 반응형 간격
              my-8: 위아래 마진 2rem (32px)
              items-center: 아이템을 세로축 중앙에 정렬
            */
          >
                <div className="drop-shadow-lg w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96">
               <Image src="/images/butakhae/1-4.png" alt="section2" width={300} height={300} className="w-full h-full object-contain" />
             </div>
             <div className="drop-shadow-lg w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96">
               <Image src="/images/butakhae/1-3.png" alt="section2" width={300} height={300} className="w-full h-full object-contain" />
             </div>
         
    
    
          </section>



          <section
            className="drop-shadow-lg bg-gray-100 rounded-3xl p-5 sm:p-5 md:p-8 lg:p-8 xl:p-8 2xl:p-8 flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-5 xl:gap-5 2xl:gap-5 max-w-full overflow-hidden"
            /*
              bg-gray-100: 배경색 연한 회색
              rounded-3xl: 모서리 둥글게 (1.5rem)
              p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-16: 반응형 패딩
              flex flex-col lg:flex-row: 모바일에서는 세로, 데스크톱에서는 가로 정렬
              items-center: 아이템 세로축 중앙 정렬
              gap-6 lg:gap-12 xl:gap-16 2xl:gap-20: 반응형 간격
              max-w-full overflow-hidden: 최대 너비 제한 및 넘침 방지
            */
          >
            <div
              className="flex flex-col items-center lg:items-start space-y-4 gap-2"
              /*
                flex flex-col: 아이템 세로 정렬
                items-center lg:items-start: 모바일에서는 중앙, 데스크톱에서는 시작점 정렬
                space-y-4 lg:space-y-6 xl:space-y-8 2xl:space-y-10: 반응형 세로 간격
              */
            >
              <a href="https://apps.apple.com/kr/app/%EB%B6%80%ED%83%81%ED%95%B4-%EC%95%B1%ED%85%8C%ED%81%AC-%EC%9E%AC%ED%83%9D-%EC%95%84%EB%A5%B4%EB%B0%94%EC%9D%B4%ED%8A%B8/id6756806604" target="_blank" rel="noopener noreferrer" className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 h-10 sm:h-12 md:h-14 lg:h-15 xl:h-16 bg-[#d9d9d9] rounded-lg flex flex-row items-center justify-start shadow-[5px_5px_10px_#c7c7c7,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#c7c7c7,inset_-5px_-5px_10px_#ffffff] transition-all duration-150">
                  <Image src="/images/apple.png" className='ml-2 sm:ml-3 md:ml-3 lg:ml-4' alt="app store" width={24} height={24} />
                <p className="ml-2 font-paper7 text-xs sm:text-sm md:text-sm lg:text-base">App store</p>
                </a>
              <a href="https://play.google.com/store/apps/details?id=com.hotdog.hereClient" target="_blank" rel="noopener noreferrer" className="w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 h-10 sm:h-12 md:h-14 lg:h-15 xl:h-16 bg-[#d9d9d9] rounded-lg flex flex-row items-center justify-start shadow-[5px_5px_10px_#c7c7c7,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#c7c7c7,inset_-5px_-5px_10px_#ffffff] transition-all duration-150">
                  <Image src="/images/android.png" className='ml-2 sm:ml-3 md:ml-3 lg:ml-4' alt="play store" width={24} height={24} />
                <p className="ml-2 font-paper7 text-xs sm:text-sm md:text-sm lg:text-base">Google Play</p>
              </a>
            </div>
            <div
              className="flex flex-wrap justify-center gap-1"
              /*
                flex flex-wrap: 플렉스박스 래핑으로 자동 줄바꿈
                justify-center: 아이템 가로축 중앙 정렬
                gap-2 lg:gap-3 xl:gap-4 2xl:gap-6: 반응형 간격
              */
            >
              <div className="w-35 h-70 ">
                <Image src="/images/butakhae/1.png" alt="Phone 1" width={130} height={130} className="w-full h-full object-contain" />
              </div>
              <div className="w-35 h-70 ">
                <Image src="/images/butakhae/2.png" alt="Phone 2" width={130} height={130} className="w-full h-full object-contain" />
              </div>
              <div className="w-35 h-70 ">
                <Image src="/images/butakhae/3.png" alt="Phone 3" width={130} height={130} className="w-full h-full object-contain" />
              </div>
              </div>
          </section>

          </main>


        {/* Contact Section */}
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
              <p className="font-paper4 text-xs sm:text-sm md:text-sm lg:text-base">Copyright 2025 @hotdog All right reseved</p>
            </div>
            <div className="text-left lg:text-right">
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-holtwood mb-1 sm:mb-2">Contact</h2>
              <p className="font-paper4 text-xs sm:text-sm md:text-sm lg:text-base">info@veryveryhotdog.com</p>
              <p className="font-paper4 text-xs sm:text-sm md:text-sm lg:text-base">82+10-8925-4613</p>
              <p className="font-paper4 text-xs sm:text-sm md:text-sm lg:text-base">www.linkedin.com/in/veryveryhotdog</p>
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
            <a href="https://quickest-hoverfly-9c3.notion.site/veryveryHotdog-135e1477e5348042b408cc42c73a3162" className="hover:underline text-center">개인 정보 처리 방침</a>
            <span className="hidden lg:inline"> | </span>
            <a href="https://quickest-hoverfly-9c3.notion.site/146e1477e534809e9553d32a9e61e5e8" className="hover:underline text-center">사이트 이용 약관</a>
            <span className="hidden lg:inline"> | </span>
            <span className="text-center">copyright 2025 @hotdog All Right Reseved</span>
          </p>
        </div>
      </div>
    </div>
  );
}
