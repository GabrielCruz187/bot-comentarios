import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ExternalLink, Heart, MessageSquare, Calendar } from "lucide-react"

interface CommentCardProps {
  comment: {
    id: string
    text: string
    postUrl: string
    platform: 'linkedin' | 'twitter'
    author: {
      name: string
      handle: string
      avatar?: string
    }
    status: 'posted' | 'pending' | 'failed'
    engagement: {
      likes: number
      replies: number
    }
    createdAt: string
  }
}

export function CommentCard({ comment }: CommentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'posted': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'linkedin': return 'bg-blue-600'
      case 'twitter': return 'bg-black'
      default: return 'bg-gray-600'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.author.avatar} />
              <AvatarFallback className="text-xs">
                {comment.author.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{comment.author.name}</p>
              <p className="text-xs text-muted-foreground">@{comment.author.handle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={`${getPlatformColor(comment.platform)} text-white text-xs`}>
              {comment.platform === 'linkedin' ? 'LinkedIn' : 'X'}
            </Badge>
            <Badge className={getStatusColor(comment.status)}>
              {comment.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed">{comment.text}</p>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3" />
              <span>{comment.engagement.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-3 w-3" />
              <span>{comment.engagement.replies}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{comment.createdAt}</span>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" asChild>
            <a href={comment.postUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}