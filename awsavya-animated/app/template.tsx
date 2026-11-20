"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useMotionOff } from "@/lib/motion";

// The template remounts on every navigation. The curtain only plays after the first page,
// so server HTML and the first client render stay identical and content is never hidden on load.
let hasNavigated = false;

export default function Template({children}:{children:React.ReactNode}){
  const [curtain] = useState(() => hasNavigated);
  const reduced = useMotionOff();
  useEffect(() => { hasNavigated = true; }, []);
  return <>
    {curtain && !reduced && <motion.div className="route-curtain" aria-hidden="true" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: .75, ease: [.76, 0, .24, 1], delay: .05 }}><motion.span initial={{ opacity: 1, rotate: 0 }} animate={{ opacity: 0, rotate: 90 }} transition={{ duration: .45 }}>✳</motion.span></motion.div>}
    <motion.div className="route-transition" initial={false}>{children}</motion.div>
  </>;
}
