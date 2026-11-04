'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * S7 아웃트로 — "SO FXXXKING HOT"이 다시 한 번 등장한다.
 */
export function OutroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 text-center">
        <motion.p
          className="font-holtwood tracking-tight text-6xl sm:text-7xl lg:text-[min(8rem,14vh)] leading-none text-brand"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
        >
          SO<br />FXXXKING<br />HOT
        </motion.p>
        <motion.p
          className="font-paper5 text-base lg:text-xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: prefersReducedMotion ? 0 : 0.2 }}
        >
          Next one&apos;s hotter.
        </motion.p>
      </div>
    </section>
  );
}
