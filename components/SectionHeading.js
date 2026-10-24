const SectionHeading = ({ children, className = "" }) => {
  return (
    <h2
      className={`text-xs font-semibold uppercase tracking-[0.08em] text-zinc-400 ${className}`}
    >
      {children}
    </h2>
  );
};

export default SectionHeading;
