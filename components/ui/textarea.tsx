import * as React from "react"
import { cn } from "../../lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-slate-gray placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-blue/50 focus:border-sky-blue disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-all duration-200",
          error && "border-red-500 focus:ring-red-500/50 focus:border-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }