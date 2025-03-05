"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/components/auth-provider";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  user?: {
    id: number;
    username: string;
    image: string;
  };
}

interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
    image: string;
  };
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Fetch post
        const postResponse = await fetch(
          `https://dummyjson.com/posts/${params.id}`,
        );
        if (!postResponse.ok) {
          throw new Error("Post not found");
        }
        const postData = await postResponse.json();

        // Fetch user
        const userResponse = await fetch(
          `https://dummyjson.com/users/${postData.userId}`,
        );
        const userData = await userResponse.json();

        // Fetch comments
        const commentsResponse = await fetch(
          `https://dummyjson.com/comments/post/${params.id}`,
        );
        const commentsData = await commentsResponse.json();

        // Fetch user data for each comment
        const commentsWithUsers = await Promise.all(
          commentsData.comments.map(async (comment: any) => {
            const commentUserResponse = await fetch(
              `https://dummyjson.com/users/${comment.user.id}`,
            );
            const commentUserData = await commentUserResponse.json();
            return {
              ...comment,
              user: commentUserData,
            };
          }),
        );

        setPost({ ...postData, user: userData });
        setComments(commentsWithUsers);
      } catch (error) {
        console.error("Error fetching post details:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">Post not found</h3>
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to posts
        </Link>
      </Button>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Link href={`/user/${post.userId}`}>
            <Avatar>
              {post.user?.image ? (
                <AvatarImage
                  src={post.user.image}
                  alt={post.user?.username || "User"}
                />
              ) : (
                <AvatarFallback>U</AvatarFallback>
              )}
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <Link
              href={`/user/${post.userId}`}
              className="font-medium hover:underline"
            >
              {post.user?.username || "User"}
            </Link>
          </div>
        </div>

        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-lg">{post.body}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag) => (
            <Link href={`/tag/${tag}`} key={tag}>
              <Badge
                variant="secondary"
                className="hover:bg-secondary/60 cursor-pointer"
              >
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 py-4 border-t border-b">
          <div className="flex items-center gap-1">
            <Heart className="h-5 w-5 text-destructive" />
            <span>{post.reactions.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-5 w-5" />
            <span>{comments.length} comments</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Comments</h2>

        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center gap-3">
                    <Link href={`/user/${comment.user.id}`}>
                      <Avatar>
                        {comment.user?.image ? (
                          <AvatarImage
                            src={comment.user.image}
                            alt={comment.user?.username || "User"}
                          />
                        ) : (
                          <AvatarFallback>U</AvatarFallback>
                        )}
                      </Avatar>
                    </Link>
                    <div className="flex flex-col">
                      <Link
                        href={`/user/${comment.user.id}`}
                        className="font-medium hover:underline"
                      >
                        {comment.user?.username || "User"}
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p>{comment.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No comments yet</p>
        )}
      </div>
    </div>
  );
}
