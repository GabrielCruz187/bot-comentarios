import { StatsCard } from "@/components/dashboard/StatsCard"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  MessageSquare, 
  Users, 
  Target, 
  TrendingUp,
  Plus,
  Play,
  Pause
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [stats, setStats] = useState({
    comments: 0,
    profiles: 0,
    keywords: 0,
    activities: 0
  })

  useEffect(() => {
    if (user) {
      loadStats()
    }
  }, [user])

  const loadStats = async () => {
    try {
      const [commentsRes, profilesRes, keywordsRes] = await Promise.all([
        supabase.from('comments').select('id', { count: 'exact' }).eq('user_id', user?.id),
        supabase.from('profiles').select('id', { count: 'exact' }).eq('user_id', user?.id),
        supabase.from('keywords').select('id', { count: 'exact' }).eq('user_id', user?.id)
      ])

      setStats({
        comments: commentsRes.count || 0,
        profiles: profilesRes.count || 0,
        keywords: keywordsRes.count || 0,
        activities: (commentsRes.count || 0) + (profilesRes.count || 0) + (keywordsRes.count || 0)
      })
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    }
  }
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Bem-vindo ao SocialBot! 👋
        </h2>
        <p className="text-muted-foreground mb-4">
          Automatize seus comentários e acelere seu crescimento no LinkedIn e X
        </p>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/profiles')}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Perfil
          </Button>
          <Button variant="outline" onClick={() => navigate('/keywords')}>
            <Play className="h-4 w-4 mr-2" />
            Configurar Automação
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Comentários Totais"
          value={stats.comments}
          description="Comentários gerados"
          icon={MessageSquare}
        />
        <StatsCard
          title="Perfis-Alvo"
          value={stats.profiles}
          description="Perfis configurados"
          icon={Users}
        />
        <StatsCard
          title="Palavras-Chave"
          value={stats.keywords}
          description="Monitorando ativamente"
          icon={Target}
        />
        <StatsCard
          title="Atividades"
          value={stats.activities}
          description="Registros de histórico"
          icon={TrendingUp}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/profiles')}
            >
              <Users className="h-4 w-4 mr-2" />
              Gerenciar Perfis-Alvo
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/keywords')}
            >
              <Target className="h-4 w-4 mr-2" />
              Configurar Palavras-Chave
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/ai-settings')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Personalizar IA
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/reports')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Ver Relatórios
            </Button>
          </div>
        </Card>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Status Panel */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Status do Sistema</h3>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Ativo</span>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">LinkedIn</p>
            <p className="text-lg font-semibold text-green-600">Conectado</p>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">X (Twitter)</p>
            <p className="text-lg font-semibold text-yellow-600">Configurando</p>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">IA Assistant</p>
            <p className="text-lg font-semibold text-green-600">Online</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
