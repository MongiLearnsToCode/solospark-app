import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-amber-gold/10 text-amber-gold",
        secondary: "border-transparent bg-sky-blue/10 text-sky-blue",
        accent: "border-transparent bg-indigo/10 text-indigo",
        destructive: "border-transparent bg-red-500/10 text-red-500",
        success: "border-transparent bg-green-500/10 text-green-500",
        outline: "border-neutral-300 text-slate-gray",
        ai: "border-transparent bg-gradient-to-r from-indigo/10 to-sky-blue/10 text-indigo",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }