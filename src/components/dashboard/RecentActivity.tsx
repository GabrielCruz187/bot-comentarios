import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, User, Clock } from "lucide-react"

interface ActivityItem {
  id: string
  type: 'comment' | 'profile' | 'keyword'
  title: string
  description: string
  timestamp: string
  status: 'success' | 'pending' | 'error'
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'comment',
    title: 'Comentário enviado',
    description: 'Post sobre "marketing digital" de @joaosilva',
    timestamp: '2 min atrás',
    status: 'success'
  },
  {
    id: '2',
    type: 'profile',
    title: 'Novo perfil adicionado',
    description: 'Maria Santos - Especialista em Growth',
    timestamp: '15 min atrás',
    status: 'success'
  },
  {
    id: '3',
    type: 'keyword',
    title: 'Palavra-chave ativada',
    description: 'Monitoramento de "inteligência artificial"',
    timestamp: '1 hora atrás',
    status: 'pending'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success': return 'bg-green-100 text-green-800'
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'error': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'comment': return MessageSquare
    case 'profile': return User
    case 'keyword': return Clock
    default: return Clock
  }
}

export function RecentActivity() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Atividade Recente</h3>
      <div className="space-y-4">
        {mockActivities.map((activity) => {
          const Icon = getTypeIcon(activity.type)
          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <Badge variant="secondary" className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}