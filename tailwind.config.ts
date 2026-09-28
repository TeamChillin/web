import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // hotdog.png(회사 로고)에서 실제 픽셀을 추출한 브랜드 컬러(소시지의 채도 높은 레드-오렌지 톤).
        // 추출 방법: sips로 무손실 BMP 변환 후 node로 픽셀을 순회, hue<=30 & 채도>=0.55인
        // 픽셀 중 가장 빈도 높은 양자화 색상을 채택(#984010). brand-dark는 그 70% 명도 버전.
        brand: '#984010',
        'brand-dark': '#6a2d0b',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
    },
  },
  plugins: [],
}
export default config 