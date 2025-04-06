import { cn } from "@/lib/utils"

function Skeconston({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeconston"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeconston }
