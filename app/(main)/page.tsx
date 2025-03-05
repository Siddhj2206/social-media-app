import { PostList } from "@/components/post-list"
import { TagCloud } from "@/components/tag-cloud"

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <PostList />
      </div>
      <div className="space-y-6">
        <TagCloud />
      </div>
    </div>
  )
}

