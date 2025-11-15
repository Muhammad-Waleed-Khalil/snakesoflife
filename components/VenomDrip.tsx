export default function VenomDrip() {
  return (
    <div className="relative w-full h-8 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-full flex justify-around">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-4 bg-venom rounded-full animate-venom-drip opacity-70"
            style={{
              animationDelay: `${i * 0.2}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
