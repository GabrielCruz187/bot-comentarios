import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Download, TrendingUp, Users, MessageSquare, Target } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"

export default function Reports() {
  const [stats, setStats] = useState({
    totalComments: 0,
    engagementRate: 0,
    newContacts: 0,
    conversionRate: 0
  })
  const [keywords, setKeywords] = useState([])
  const [profiles, setProfiles] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    loadReportsData()
  }, [])

  const loadReportsData = async () => {
    try {
      // Carregar comentários
      const { data: comments } = await supabase
        .from('comments')
        .select('*')
        .eq('user_id', user?.id)

      // Carregar palavras-chave
      const { data: keywordsData } = await supabase
        .from('keywords')
        .select('*')
        .eq('user_id', user?.id)

      // Carregar perfis
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)

      setStats({
        totalComments: comments?.length || 0,
        engagementRate: 8.7, // Placeholder
        newContacts: 89, // Placeholder
        conversionRate: 12.3 // Placeholder
      })

      setKeywords(keywordsData || [])
      setProfiles(profilesData || [])
    } catch (error) {
      console.error('Erro ao carregar dados dos relatórios:', error)
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">
            Análises detalhadas de performance e engajamento
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Últimos 7 dias</SelectItem>
              <SelectItem value="30days">Últimos 30 dias</SelectItem>
              <SelectItem value="90days">Últimos 90 dias</SelectItem>
              <SelectItem value="custom">Período customizado</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Comentários</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalComments}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Engajamento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.engagementRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Contatos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newContacts}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23%</span> vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-1.2%</span> vs período anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="platforms">Plataformas</TabsTrigger>
          <TabsTrigger value="keywords">Palavras-chave</TabsTrigger>
          <TabsTrigger value="profiles">Perfis</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance ao Longo do Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Gráfico de performance será exibido aqui</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Palavras-chave</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {keywords.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhuma palavra-chave cadastrada</p>
                ) : (
                  keywords.slice(0, 3).map((keyword) => (
                    <div key={keyword.id} className="flex items-center justify-between">
                      <span className="text-sm">{keyword.keyword}</span>
                      <Badge>{keyword.matches_count || 0} matches</Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Melhores Perfis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profiles.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhum perfil cadastrado</p>
                ) : (
                  profiles.slice(0, 3).map((profile) => (
                    <div key={profile.id} className="flex items-center justify-between">
                      <span className="text-sm">{profile.name}</span>
                      <Badge>Ativo</Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>LinkedIn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Comentários</span>
                  <span className="font-semibold">786</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Engajamento</span>
                  <span className="font-semibold">12.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Novos contatos</span>
                  <span className="font-semibold">56</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>X (Twitter)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Comentários</span>
                  <span className="font-semibold">448</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Engajamento</span>
                  <span className="font-semibold">6.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Novos contatos</span>
                  <span className="font-semibold">33</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance por Palavra-chave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { term: "marketing digital", matches: 156, engagement: "15.2%" },
                  { term: "inteligência artificial", matches: 134, engagement: "12.8%" },
                  { term: "startup", matches: 98, engagement: "18.1%" },
                  { term: "empreendedorismo", matches: 76, engagement: "11.4%" }
                ].map((keyword) => (
                  <div key={keyword.term} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{keyword.term}</p>
                      <p className="text-sm text-muted-foreground">{keyword.matches} correspondências</p>
                    </div>
                    <Badge>{keyword.engagement} engajamento</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profiles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance por Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "João Silva", platform: "LinkedIn", comments: 67, engagement: "23.4%" },
                  { name: "Maria Santos", platform: "X", comments: 45, engagement: "19.7%" },
                  { name: "Pedro Costa", platform: "LinkedIn", comments: 52, engagement: "18.2%" }
                ].map((profile) => (
                  <div key={profile.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{profile.name}</p>
                      <p className="text-sm text-muted-foreground">{profile.platform} • {profile.comments} comentários</p>
                    </div>
                    <Badge>{profile.engagement} engajamento</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
