import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-amber-gold text-white shadow-sm hover:bg-amber-gold/90 focus:ring-amber-gold/50 hover:shadow-md",
        destructive: "bg-red-500 text-white shadow-sm hover:bg-red-500/90 focus:ring-red-500/50 hover:shadow-md",
        outline: "border-2 border-slate-gray text-slate-gray bg-white hover:bg-slate-gray/10 focus:ring-slate-gray/50",
        secondary: "bg-sky-blue text-white shadow-sm hover:bg-sky-blue/90 focus:ring-sky-blue/50 hover:shadow-md",
        ghost: "text-slate-gray hover:bg-slate-gray/10 focus:ring-slate-gray/50",
        link: "text-sky-blue underline-offset-4 hover:underline focus:ring-sky-blue/50",
        accent: "bg-indigo text-white shadow-sm hover:bg-indigo/90 focus:ring-indigo/50 hover:shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base font-semibold",
        icon: "h-10 w-10",
        xl: "h-14 rounded-lg px-10 text-lg font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="loading-spinner w-4 h-4 mr-2" />
        )}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }