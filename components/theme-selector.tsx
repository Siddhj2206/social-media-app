"use client"

import { useEffect, useState } from "react"
import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const themes = [
  { name: "Default", value: "" },
  { name: "Blue", value: "theme-blue" },
  { name: "Green", value: "theme-green" },
  { name: "Purple", value: "theme-purple" },
  { name: "Orange", value: "theme-orange" },
]

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState("")

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || ""
    setCurrentTheme(savedTheme)
    document.documentElement.className = savedTheme
  }, [])

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme)
    localStorage.setItem("app-theme", theme)

    // Remove all theme classes and add the selected one
    document.documentElement.classList.remove(...themes.map((t) => t.value).filter(Boolean))
    if (theme) {
      document.documentElement.classList.add(theme)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => changeTheme(theme.value)}
            className={currentTheme === theme.value ? "bg-accent" : ""}
          >
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

