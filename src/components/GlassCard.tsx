import { ReactNode } from "react"

export function GlassCard({ children }: { children: ReactNode }) {
  return (
    <div className="
      bg-wz_glass
      backdrop-blur-md
      border border-wz_border
      rounded-xl
      shadow-glow
      p-5
      text-white
      transition
      hover:shadow-[0_0_25px_rgba(255,204,0,0.45)]
    ">
      {children}
    </div>
  )
}
