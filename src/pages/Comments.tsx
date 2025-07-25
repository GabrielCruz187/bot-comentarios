import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Search, Filter, TrendingUp, Clock, CheckCircle } from "lucide-react"
import { CommentCard } from "@/components/comments/CommentCard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const mockComments = [
  {
    id: "1",
    text: "Excelente perspectiva sobre o futuro do marketing digital! Concordo que a personalização será fundamental.",
    postUrl: "https://linkedin.com/post/1",
    platform: "linkedin" as const,
    author: {
      name: "João Silva",
      handle: "joaosilva",
      avatar: ""
    },
    status: "posted" as const,
    engagement: {
      likes: 12,
      replies: 3
    },
    createdAt: "2 horas atrás"
  },
  {
    id: "2",
    text: "Muito interessante! Seria possível compartilhar mais detalhes sobre a implementação?",
    postUrl: "https://twitter.com/post/1",
    platform: "twitter" as const,
    author: {
      name: "Maria Santos",
      handle: "mariasantos",
      avatar: ""
    },
    status: "pending" as const,
    engagement: {
      likes: 0,
      replies: 0
    },
    createdAt: "1 hora atrás"
  }
]

export default function Comments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Comentários</h1>
          <p className="text-muted-foreground">
            Gerencie e monitore todos os comentários automatizados
          </p>
        </div>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Comentário Manual
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hoje</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              +23% vs ontem
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              90% taxa de sucesso
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">
              aguardando processamento
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <p className="text-xs text-muted-foreground">
              taxa de resposta média
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="posted">Publicados</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="failed">Falharam</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Exportar CSV
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar comentários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as plataformas</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">X (Twitter)</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="posted">Publicados</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="failed">Falharam</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="all" className="space-y-4">
          {mockComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </TabsContent>

        <TabsContent value="posted" className="space-y-4">
          {mockComments.filter(c => c.status === 'posted').map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {mockComments.filter(c => c.status === 'pending').map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </TabsContent>

        <TabsContent value="failed" className="space-y-4">
          <p className="text-center text-muted-foreground py-8">
            Nenhum comentário com falha encontrado
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
