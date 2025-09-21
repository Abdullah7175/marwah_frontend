'use client'
import Image from "next/image";

type ButtonProps = {
  child?:any   ;
  type: 'button' | 'submit';
  title?: string;
  icon?: string;
  variant: string;
  full?: boolean;
  onClick?:any;
}

const Button = ({ type, title, icon, variant, full,child,onClick }: ButtonProps) => {
  return (
    <button 
    onClick={onClick}
    className={`h-12 flexCenter rounded-full border ${variant} p-2 sm:w-full w-10/12`}
      type={type}
    >
      {icon && <img src={icon} alt={title??""} width={24} height={24} />}
      {child}
      {title && <label className="bold-16 whitespace-nowrap cursor-pointer">{title}</label>}
      
    </button>
  )
}

export default Button