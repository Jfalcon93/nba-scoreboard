export const LiveDot = () => {
  return <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-red-400" />;
};

const LiveBadge = ({ children }) => {
  return (
    <span className="inline-flex items-center gap-1.5 font-semibold tracking-wide text-red-400">
      <LiveDot />
      LIVE{children ? <> · {children}</> : null}
    </span>
  );
};

export default LiveBadge;
