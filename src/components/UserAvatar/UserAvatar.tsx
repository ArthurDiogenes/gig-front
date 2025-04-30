import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface User {
  name: string
  image?: string
}

interface UserAvatarProps {
  user: User
  className?: string
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
      <AvatarFallback>
        {user.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  )
}
