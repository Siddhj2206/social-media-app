"use client"

import { useState, useEffect, useCallback } from "react"
import { PostCard } from "./post-card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"
import { Button } from "./ui/button"
import { ArrowUpDown, SortAsc, SortDesc } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

interface Post {
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

interface PostListProps {
  initialPosts?: Post[]
  userId?: number
  tag?: string
  searchQuery?: string
}

export function PostList({ initialPosts, userId, tag, searchQuery }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts || [])
  const [loading, setLoading] = useState(!initialPosts)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState("default")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const postsPerPage = 10

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      let url = `https://dummyjson.com/posts?limit=${postsPerPage}&skip=${(currentPage - 1) * postsPerPage}`

      if (userId) {
        url = `https://dummyjson.com/posts/user/${userId}`
      } else if (tag) {
        url = `https://dummyjson.com/posts/tag/${tag}`
      } else if (searchQuery) {
        url = `https://dummyjson.com/posts/search?q=${searchQuery}`
      }

      const response = await fetch(url)
      const data = await response.json()

      const fetchedPosts = data.posts || []

      // Fetch user data for each post
      const postsWithUsers = await Promise.all(
        fetchedPosts.map(async (post: Post) => {
          const userResponse = await fetch(`https://dummyjson.com/users/${post.userId}`)
          const userData = await userResponse.json()
          return { ...post, user: userData }
        }),
      )

      // Sort posts
      const sortedPosts = sortPosts(postsWithUsers, sortBy, sortOrder)

      setPosts(sortedPosts)
      setTotalPages(Math.ceil((data.total || fetchedPosts.length) / postsPerPage))
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, sortBy, sortOrder, userId, tag, searchQuery])

  useEffect(() => {
    if (!initialPosts) {
      fetchPosts()
    } else {
      setPosts(initialPosts)
      setTotalPages(Math.ceil(initialPosts.length / postsPerPage))
    }
  }, [initialPosts, fetchPosts, postsPerPage])

  const sortPosts = (postsToSort: Post[], sortByField: string, order: "asc" | "desc") => {
    const sorted = [...postsToSort]

    switch (sortByField) {
      case "reactions.likes":
        sorted.sort((a, b) => {
          return order === "asc" ? a.reactions.likes - b.reactions.likes : b.reactions.likes - a.reactions.likes
        })
        break
      case "title":
        sorted.sort((a, b) => {
          return order === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        })
        break
      default:
        // Default sort by id
        sorted.sort((a, b) => {
          return order === "asc" ? a.id - b.id : b.id - a.id
        })
    }

    return sorted
  }

  const handleSort = (field: string) => {
    if (sortBy === field) {
      // Toggle sort order if same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      // Set new field and default to descending
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No posts found</h3>
        <p className="text-muted-foreground">Try a different search or filter</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {tag ? `#${tag} Posts` : userId ? "User Posts" : searchQuery ? `Search: ${searchQuery}` : "Recent Posts"}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort
              {sortOrder === "asc" ? <SortAsc className="ml-2 h-4 w-4" /> : <SortDesc className="ml-2 h-4 w-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleSort("default")}>Default</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("reactions.likes")}>By Likes</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("title")}>By Title</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink isActive={currentPage === page} onClick={() => handlePageChange(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

