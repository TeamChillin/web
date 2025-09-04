import { AnimatedDonut } from '@/components/animated-donut';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const hotdogImageStyle = {
    width: '12rem', // w-48 -> 너비 12rem (192px)
    marginBottom: '1rem', // mb-4 -> 아래쪽 마진 1rem (16px)
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-white text-black"
      /*
        flex: 플렉스박스 레이아웃 사용
        flex-col: 아이템을 세로로 정렬
        items-center: 아이템을 가로축 중앙에 정렬
        min-h-screen: 최소 높이를 화면 전체 높이로 설정
        bg-white: 배경색을 흰색으로 지정
        text-black: 글자색을 검은색으로 지정
      */
    >
      <AnimatedDonut />

      <div className="relative z-[10] w-full flex flex-col items-center">
        {/* Header Section */}
        <header
          className="flex flex-col items-center w-full py-12"
          /*
            flex, flex-col, items-center: 아이템을 세로 및 가로 중앙 정렬
            w-full: 너비를 100%로 설정
            py-12: 위아래 패딩 3rem (48px)
          */
        >
          <div style={hotdogImageStyle}>
            <Image src="/images/hotdog.png" alt="Hotdog" width={200} height={200} />
          </div>
          <div className='flex-1 flex flex-row items-center justify-center' >
          <h1
            className="text-[110px] tracking-tighter font-holtwood"
            /*
              text-80px: 글자 크기 80px (tailwind.config.ts에서 설정)
              tracking-tighter: 자간을 좁게 설정
              font-holtwood: Holtwood One SC 폰트 적용
            */
          >
            @HOTDOG
          </h1>
          <div
            className="text-right flex top-20 right-20 font-holtwood"

          >
            <div className='flex flex-col text-left justify-left ml-3' >
            <p className="font-bold text-lg text-[30px] leading-[30px]" > SO FREASH</p>
            <p className="font-bold text-lg text-[30px] leading-[30px]" >SO DANGEROUS</p>
            <p className="font-bold text-lg text-[30px] leading-[30px]" >SO HIGH</p>
            <p className="font-bold text-lg text-[30px] leading-[30px]" >SO FXXXKING HOT</p>
            </div>
          </div>
          </div>
        </header>

        <main
          className="w-full max-w-5xl px-4">
          {/* App Promotion Section */}
          <section
            className="bg-gray-100 rounded-3xl p-12 flex items-center flex-1 justify-center">
            <div
              className="flex-1 flex flex-col items-start space-y-6">
              <Link href="https://apps.apple.com/kr/app/here-%EC%9E%A5%EC%86%8C-%EA%B8%B0%EB%B0%98-%EC%9D%B5%EB%AA%85-%EC%BB%A4%EB%AE%A4%EB%8B%88%ED%8B%B0/id6746250884" target="_blank" rel="noopener noreferrer">
                <div className="w-48 h-16 bg-[#d9d9d9] rounded-lg flex flex-row items-center justify-start shadow-[5px_5px_10px_#c7c7c7,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#c7c7c7,inset_-5px_-5px_10px_#ffffff] transition-all duration-150 cursor-pointer hover:opacity-80">
                    <Image src="/images/apple.png" className='ml-4' alt="app store" width={40} height={40} />
                  <p className="ml-2 font-paper7">App store</p>
                  </div>
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=com.hotdog.hereClient" target="_blank" rel="noopener noreferrer">
                <div className="w-48 h-16 bg-[#d9d9d9] rounded-lg flex flex-row items-center justify-start shadow-[5px_5px_10px_#c7c7c7,-5px_-5px_10px_#ffffff] active:shadow-[inset_5px_5px_10px_#c7c7c7,inset_-5px_-5px_10px_#ffffff] transition-all duration-150 cursor-pointer hover:opacity-80">
                    <Image src="/images/android.png" className='ml-4' alt="play store" width={40} height={40} />
                  <p className="ml-2 font-paper7">Google Play</p>
                  </div>
                </Link>
            </div>
            <div
              className="flex-1 flex justify-center space-x-4">
              <div className="w-30 h-60 ">
                <Image src="/images/1.png" alt="Phone 1" width={130} height={130} />
              </div>
              <div className="w-30 h-60   ">
                <Image src="/images/2.png" alt="Phone 2" width={130} height={130} />
              </div>
              <div className="w-30 h-60 ">
                <Image src="/images/3.png" alt="Phone 3" width={130} height={130} />
              </div>
              <div className="w-30 h-60 ">
                <Image src="/images/4.png" alt="Phone 4" width={130} height={130} />
                </div>
              <div className="w-30 h-60 "> 
                <Image src="/images/5.png" alt="Phone 5" width={130} height={130} />
              </div>
            </div>
          </section>

          {/* Community Section */}
          <section
            className="flex-row flex justify-end gap-2 my-8 items-center">
             <Image src="/images/1-1.png" alt="section1" width={300} height={300} />
             <Image src="/images/1-2.png" alt="section2" width={300} height={300} />
          </section>
        </main>

        {/* Contact Section */}
        <footer
          className="w-full max-w-5xl px-4 my-8 relative"
        >
          {/* 배경 블럭 (투명) */}
          <div
            className="bg-gray-100 rounded-3xl p-12 opacity-30 absolute inset-0"
          >
          </div>
          
          {/* 콘텐츠 블럭 (불투명) */}
          <div
            className="relative z-10 p-12 flex justify-between items-end"
          >
            <div>
              <p className="font-paper4">대표 : 임수</p>
              <p className="font-paper4">사업자 등록 번호 : 628-54-00913</p>
              <p className="font-paper4">주소 : 서울시 성동구 아차산로 68 AU 타워 1011</p>
              <p className="font-paper4">Copyright 2025 @hotdog All right reseved</p>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-holtwood">Contact</h2>
              <p className="font-paper4">info@veryveryhotdog.com</p>
              <p className="font-paper4">82+10-8925-4613</p>
              <p className="font-paper4">www.linkedin.com/in/veryveryhotdog</p>
            </div>
          </div>
        </footer>

        {/* Bottom Footer */}
        <div
          className="w-full max-w-5xl text-center py-4 text-sm text-gray-500 opacity-100 relative z-[20]"
          /*
            ...
            text-center: 텍스트 중앙 정렬
            py-4: 위아래 패딩 1rem (16px)
            text-sm: 글자 크기 0.875rem (14px)
            text-gray-500: 글자색 회색
            opacity-100: 완전 불투명 (투명도 영향 방지)
            relative z-[20]: 다른 요소보다 위에 표시
          */
        >
          <p className="font-paper4">
            <a href="https://quickest-hoverfly-9c3.notion.site/veryveryHotdog-135e1477e5348042b408cc42c73a3162" className="ml-2 hover:underline">개인 정보 처리 방침</a>  | 
            <a href="https://quickest-hoverfly-9c3.notion.site/146e1477e534809e9553d32a9e61e5e8" className="ml-2 hover:underline">  사이트 이용 약관</a> |
            <a className='ml-2'>copyright 2025 @hotdog All Right Reseved</a>
          </p>
        </div>
      </div>
    </div>
  );
}
