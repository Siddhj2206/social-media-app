"use client"

import { PostList } from "@/components/post-list"

export default function TagPage({ params }: { params: { tag: string } }) {
  return (
    <div>
      <PostList tag={params.tag} />
    </div>
  )
}

