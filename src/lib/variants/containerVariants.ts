export const containerVariants = {
  hidden: (direction: number) => {
    return direction > 0
      ? { x: "100vh", opacity: 0 }
      : {
          scale: 0,
          opacity: 0,
        };
  },

  visible: (direction: number) => {
    return direction > 0
      ? { x: 0, opacity: 1, transition: { duration: 0.4, delay: 0.2 } }
      : {
          scale: 1,
          opacity: 1,
          transition: { duration: 0.4, delay: 0.2 },
        };
  },

  exit: (direction: number) => {
    return direction > 0
      ? { scale: 1.2, opacity: 0, transition: { ease: "easeInOut" } }
      : {
          x: "100vw",
          opacity: 0,
          transition: { ease: "easeInOut" },
        };
  },
};
