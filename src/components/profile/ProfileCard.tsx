import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProfileCardProps {
  profile: {
    id: string
    name: string
    handle: string
    platform: 'linkedin' | 'twitter'
    avatar?: string
    status: 'active' | 'paused' | 'inactive'
    totalComments: number
    lastActivity: string
  }
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'inactive': return 'bg-gray-500'
      default: return 'bg-gray-500'
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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback>{profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-sm font-medium">{profile.name}</CardTitle>
            <p className="text-xs text-muted-foreground">@{profile.handle}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Ver Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={`${getPlatformColor(profile.platform)} text-white`}>
            {profile.platform === 'linkedin' ? 'LinkedIn' : 'X (Twitter)'}
          </Badge>
          <Badge variant="outline" className={`${getStatusColor(profile.status)} text-white border-0`}>
            {profile.status}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Comentários</p>
            <p className="font-semibold">{profile.totalComments}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Última atividade</p>
            <p className="font-semibold">{profile.lastActivity}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
