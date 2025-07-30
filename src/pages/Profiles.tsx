import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Search, Filter } from "lucide-react"
import { ProfileCard } from "@/components/profile/ProfileCard"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function Profiles() {
  const [searchTerm, setSearchTerm] = useState("")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [newProfile, setNewProfile] = useState({
    name: "",
    username: "",
    platform: "linkedin"
  })
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    loadProfiles()
  }, [])

  const loadProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProfiles(data || [])
    } catch (error) {
      console.error('Erro ao carregar perfis:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os perfis",
        variant: "destructive"
      })
    }
  }

  const handleAddProfile = async () => {
    if (!newProfile.name.trim() || !newProfile.username.trim()) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          name: newProfile.name.trim(),
          username: newProfile.username.trim(),
          platform: newProfile.platform,
          user_id: user?.id
        })

      if (error) throw error

      toast({
        title: "Sucesso",
        description: "Perfil adicionado com sucesso!"
      })

      setNewProfile({ name: "", username: "", platform: "linkedin" })
      setOpen(false)
      loadProfiles()
    } catch (error) {
      console.error('Erro ao adicionar perfil:', error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o perfil",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Perfis-Alvo</h1>
          <p className="text-muted-foreground">
            Gerencie até 50 perfis para monitoramento automático
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Perfil
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Perfil</DialogTitle>
              <DialogDescription>
                Adicione um perfil para monitoramento automático de comentários.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Perfil</Label>
                <Input
                  id="name"
                  placeholder="Ex: João Silva"
                  value={newProfile.name}
                  onChange={(e) => setNewProfile({...newProfile, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username/Handle</Label>
                <Input
                  id="username"
                  placeholder="Ex: joaosilva ou @joaosilva"
                  value={newProfile.username}
                  onChange={(e) => setNewProfile({...newProfile, username: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="platform">Plataforma</Label>
                <Select 
                  value={newProfile.platform} 
                  onValueChange={(value) => setNewProfile({...newProfile, platform: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">X (Twitter)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddProfile} disabled={loading}>
                {loading ? "Adicionando..." : "Adicionar Perfil"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Perfis</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profiles.length}</div>
            <p className="text-xs text-muted-foreground">
              de 50 perfis permitidos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perfis Ativos</CardTitle>
            <Badge className="bg-green-500">Ativo</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profiles.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              monitorando ativamente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comentários Hoje</CardTitle>
            <Badge variant="outline">135</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">135</div>
            <p className="text-xs text-muted-foreground">
              +12% vs ontem
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar perfis..."
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
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="paused">Pausado</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Perfis */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profiles.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">Nenhum perfil cadastrado</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          profiles
            .filter(profile => {
              const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  profile.username.toLowerCase().includes(searchTerm.toLowerCase())
              const matchesPlatform = platformFilter === "all" || profile.platform === platformFilter
              const matchesStatus = statusFilter === "all" || profile.status === statusFilter
              return matchesSearch && matchesPlatform && matchesStatus
            })
            .map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))
        )}
      </div>
    </div>
  )
}

