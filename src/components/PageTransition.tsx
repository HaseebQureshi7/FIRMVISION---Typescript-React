import { motion } from "framer-motion";

export const SideFade = ({ children }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-5vw" }}
      animate={{ opacity: 1, x: "0vw" }}
      exit={{ opacity: 0, x: "5vw" }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn = ({ children }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};
