import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const iconButtonVariants = tv({
  base: 'flex items-center justify-center rounded-lg houver:bg-zinc-700 p-2 transition-colors duration-200',
  variants:{
    size: {
      sm:'size-6',
      md:'size-8'
    }
  },
  defaultVariants:{
    size:'md' 
  },
})

interface IconButtonProps extends ComponentProps<'button'>,VariantProps<typeof iconButtonVariants>{
  icon: ReactNode
}

export function IconButton({icon, size, className, ...props}: IconButtonProps){
  return(
    <button 
      type = 'button'
      className={iconButtonVariants({size, className})}
      {...props}
    >
      {icon}
    </button>
  )
}