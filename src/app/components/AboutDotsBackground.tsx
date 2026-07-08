export default function AboutDotsBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 opacity-60"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1.5px 1.5px, rgba(30,49,89,0.18) 1.5px, transparent 0), radial-gradient(circle at 13px 13px, rgba(125,182,173,0.14) 1.2px, transparent 0)",
        backgroundSize: "26px 26px",
      }}
      aria-hidden="true"
    />
  );
}