import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Target, Plus, Search, Activity, Brain } from "lucide-react"
import { KeywordItem } from "@/components/keywords/KeywordItem"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Keywords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newKeyword, setNewKeyword] = useState("")
  const [newOperator, setNewOperator] = useState("AND")
  const [newDescription, setNewDescription] = useState("")
  const [keywords, setKeywords] = useState([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    loadKeywords()
  }, [])

  const loadKeywords = async () => {
    try {
      const { data, error } = await supabase
        .from('keywords')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setKeywords(data || [])
    } catch (error) {
      console.error('Erro ao carregar palavras-chave:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as palavras-chave",
        variant: "destructive"
      })
    }
  }

  const handleAddKeyword = async () => {
    if (!newKeyword.trim()) {
      toast({
        title: "Erro",
        description: "Digite uma palavra-chave",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('keywords')
        .insert({
          keyword: newKeyword.trim(),
          operator: newOperator as 'AND' | 'OR' | 'NOT',
          description: newDescription.trim() || null,
          user_id: user?.id
        })

      if (error) throw error

      toast({
        title: "Sucesso",
        description: "Palavra-chave adicionada com sucesso!"
      })

      setNewKeyword("")
      setNewDescription("")
      setNewOperator("AND")
      loadKeywords()
    } catch (error) {
      console.error('Erro ao adicionar palavra-chave:', error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar a palavra-chave",
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
          <h1 className="text-3xl font-bold">Palavras-Chave</h1>
          <p className="text-muted-foreground">
            Configure palavras-chave com lógica booleana para monitoramento
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Palavra-Chave
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Palavras</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keywords.length}</div>
            <p className="text-xs text-muted-foreground">palavras ativas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Correspondências</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {keywords.reduce((sum, k) => sum + (k.matches_count || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">últimas 24h</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AND</CardTitle>
            <Badge className="bg-green-100 text-green-800">AND</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {keywords.filter(k => k.operator === 'AND').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NOT</CardTitle>
            <Badge className="bg-red-100 text-red-800">NOT</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {keywords.filter(k => k.operator === 'NOT').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Adicionar Nova Palavra-Chave */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Adicionar Palavra-Chave</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Input
                placeholder="Digite a palavra-chave ou frase..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
              />
            </div>
            <Select value={newOperator} onValueChange={setNewOperator}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AND">AND - Deve conter</SelectItem>
                <SelectItem value="OR">OR - Pode conter</SelectItem>
                <SelectItem value="NOT">NOT - Não deve conter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Textarea 
              placeholder="Descrição opcional da palavra-chave..."
              className="min-h-[60px]"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Descreva o contexto ou objetivo desta palavra-chave
            </p>
          </div>
          
          <Button onClick={handleAddKeyword} disabled={loading}>
            {loading ? "Adicionando..." : "Adicionar Palavra-Chave"}
          </Button>
        </CardContent>
      </Card>

      {/* Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar palavras-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Palavras-Chave */}
      <div className="space-y-4">
        {keywords.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">Nenhuma palavra-chave cadastrada</p>
            </CardContent>
          </Card>
        ) : (
            keywords
            .filter(keyword => keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((keyword) => (
              <KeywordItem 
                key={keyword.id} 
                keyword={keyword} 
                onDelete={loadKeywords}
              />
            ))
        )}
      </div>
    </div>
  )
}
