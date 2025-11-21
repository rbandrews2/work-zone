export function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      bg-[rgba(255,255,255,0.03)]
      backdrop-blur-md
      border border-[rgba(255,255,255,0.12)]
      rounded-xl
      p-6
      shadow-[0_0_15px_rgba(255,217,0,0.10)]
      hover:shadow-[0_0_22px_rgba(255,217,0,0.18)]
      transition-all
    ">
      {children}
    </div>
  )
}
