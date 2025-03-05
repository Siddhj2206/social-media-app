import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Heart, MessageCircle } from "lucide-react"

interface PostCardProps {
  post: {
    id: number
    title: string
    body: string
    userId: number
    tags: string[]
    reactions: {
      likes: number;
      dislikes: number;
    }
    user?: {
      id: number
      username: string
      image: string
    }
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center gap-3">
          <Link href={`/user/${post.userId}`}>
            <Avatar>
              {post.user?.image ? (
                <AvatarImage src={post.user.image} alt={post.user?.username || "User"} />
              ) : (
                <AvatarFallback>U</AvatarFallback>
              )}
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <Link href={`/user/${post.userId}`} className="font-medium hover:underline">
              {post.user?.username || "User"}
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/post/${post.id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.title}</h3>
        </Link>
        <p className="text-muted-foreground line-clamp-3">{post.body}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag) => (
            <Link href={`/tag/${tag}`} key={tag}>
              <Badge variant="secondary" className="hover:bg-secondary/60 cursor-pointer">
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{post.reactions.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Comments</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

