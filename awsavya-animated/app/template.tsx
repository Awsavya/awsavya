"use client";
import { motion } from "motion/react";
export default function Template({children}:{children:React.ReactNode}){
  return <motion.div className="route-transition" initial={false}>{children}</motion.div>;
}
