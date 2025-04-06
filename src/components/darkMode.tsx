"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
export function ModeToggle() {
  let { setTheme } = useTheme()
  let  theme = localStorage.getItem("theme")
  return (
   <>
     {theme=="dark" ? <button onClick={()=>setTheme("light")} ><Moon className="w-[30px] h-[30px]"/></button> : <button onClick={()=>setTheme("dark")}><Sun className="w-[30px] h-[30px]" /></button>}
   </>
  )
}
