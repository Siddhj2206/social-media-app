"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PostList } from "@/components/post-list"
import { Mail, MapPin, Phone } from "lucide-react"

interface UserProfile {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  phone: string
  image: string
  address: {
    address: string
    city: string
    state: string
  }
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${params.id}`)
        if (!response.ok) {
          throw new Error("User not found")
        }
        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user profile:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold">User not found</h3>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.image} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback>{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center md:text-left">
              <CardTitle className="text-2xl">{`${user.firstName} ${user.lastName}`}</CardTitle>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{`${user.address.address}, ${user.address.city}, ${user.address.state}`}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-6">Posts by {user.firstName}</h2>
        <PostList userId={user.id} />
      </div>
    </div>
  )
}

