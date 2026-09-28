'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

/*
  S3 브릿지 — 3개 앱 미니 카드(목차, 클릭 시 해당 섹션으로 스무스 스크롤).
*/
const APPS = [
  { num: '01', name: 'HERE', targetId: 'app-here', icon: '/images/here/icon.png' },
  { num: '02', name: '부탁해', targetId: 'app-butakhae', icon: '/images/butakhae/icon.png' },
  { num: '03', name: '혼술어때', targetId: 'app-honsul', icon: '/images/honsul/icon.png' },
];

export function StudioBridge() {
  const prefersReducedMotion = useReducedMotion();

  function handleNavigate(event: React.MouseEvent<HTMLAnchorElement>, targetId: string) {
    event.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }

  return (
    <section className="w-full flex flex-col items-center justify-center gap-8 sm:gap-10 lg:gap-14 px-4 py-24 sm:py-32 text-center">
      <div className="flex flex-row justify-center gap-3 sm:gap-4 lg:gap-8">
        {APPS.map((app, idx) => (
          <motion.a
            key={app.targetId}
            href={`#${app.targetId}`}
            onClick={(e) => handleNavigate(e, app.targetId)}
            className="flex flex-col items-center gap-2 bg-gray-100 rounded-3xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6 w-24 sm:w-28 lg:w-36 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: prefersReducedMotion ? 0 : idx * 0.12 }}
          >
            <Image
              src={app.icon}
              alt={`${app.name} 아이콘`}
              width={96}
              height={96}
              className="w-16 h-16 lg:w-24 lg:h-24 rounded-2xl"
            />
            <span className="font-holtwood text-xl lg:text-2xl">{app.num}</span>
            <span className="font-paper7 text-sm lg:text-base">{app.name}</span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
