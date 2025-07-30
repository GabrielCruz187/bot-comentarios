import { useState, useEffect } from "react"
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
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"

export default function Comments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [comments, setComments] = useState([])
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    posted: 0,
    pending: 0,
    failed: 0
  })
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    loadComments()
    loadProfiles()
  }, [])

  const loadComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const commentsData = data || []
      setComments(commentsData)

      // Calcular estatísticas
      const total = commentsData.length
      const posted = commentsData.filter(c => c.status === 'posted').length
      const pending = commentsData.filter(c => c.status === 'pending').length
      const failed = commentsData.filter(c => c.status === 'failed').length

      setStats({ total, posted, pending, failed })
    } catch (error) {
      console.error('Erro ao carregar comentários:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os comentários",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const loadProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')

      if (error) throw error
      setProfiles(data || [])
    } catch (error) {
      console.error('Erro ao carregar perfis:', error)
    }
  }

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = platformFilter === "all" || comment.platform === platformFilter
    const matchesStatus = statusFilter === "all" || comment.status === statusFilter
    return matchesSearch && matchesPlatform && matchesStatus
  })

  const formatCommentForCard = (comment) => {
    const profile = profiles.find(p => p.id === comment.profile_id) || {}
    return {
      id: comment.id,
      text: comment.content,
      postUrl: comment.post_url || "#",
      platform: profile.platform || "linkedin",
      author: {
        name: profile.name || "Usuário",
        handle: profile.username || "username",
        avatar: profile.avatar_url || ""
      },
      status: comment.status,
      engagement: {
        likes: 0, // Dados de engajamento não estão sendo coletados ainda
        replies: 0
      },
      createdAt: new Date(comment.created_at).toLocaleDateString('pt-BR')
    }
  }

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
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              total de comentários
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.posted}</div>
            <p className="text-xs text-muted-foreground">
              {stats.total > 0 ? Math.round((stats.posted / stats.total) * 100) : 0}% taxa de sucesso
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
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
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Carregando comentários...</p>
          ) : filteredComments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhum comentário encontrado</p>
          ) : (
            filteredComments.map((comment) => (
              <CommentCard key={comment.id} comment={formatCommentForCard(comment)} />
            ))
          )}
        </TabsContent>

        <TabsContent value="posted" className="space-y-4">
          {filteredComments.filter(c => c.status === 'posted').length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhum comentário publicado encontrado</p>
          ) : (
            filteredComments.filter(c => c.status === 'posted').map((comment) => (
              <CommentCard key={comment.id} comment={formatCommentForCard(comment)} />
            ))
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filteredComments.filter(c => c.status === 'pending').length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhum comentário pendente encontrado</p>
          ) : (
            filteredComments.filter(c => c.status === 'pending').map((comment) => (
              <CommentCard key={comment.id} comment={formatCommentForCard(comment)} />
            ))
          )}
        </TabsContent>

        <TabsContent value="failed" className="space-y-4">
          {filteredComments.filter(c => c.status === 'failed').length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Nenhum comentário com falha encontrado</p>
          ) : (
            filteredComments.filter(c => c.status === 'failed').map((comment) => (
              <CommentCard key={comment.id} comment={formatCommentForCard(comment)} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

