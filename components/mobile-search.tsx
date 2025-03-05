"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Search, X } from "lucide-react"

export function MobileSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsOpen(false)
    }
  }

  return (
    <div className="md:hidden">
      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-background p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Search</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
      ) : (
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Search className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}

