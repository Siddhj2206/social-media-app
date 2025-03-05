"use client"

import { useSearchParams } from "next/navigation"
import { PostList } from "@/components/post-list"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  return (
    <div>
      <PostList searchQuery={query} />
    </div>
  )
}

