import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Target, Plus, Search, Activity, Brain } from "lucide-react"
import { KeywordItem } from "@/components/keywords/KeywordItem"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const mockKeywords = [
  {
    id: "1",
    term: "marketing digital",
    operator: "AND" as const,
    active: true,
    matches: 23,
    createdAt: "15/01/2024"
  },
  {
    id: "2",
    term: "inteligência artificial",
    operator: "OR" as const,
    active: true,
    matches: 45,
    createdAt: "14/01/2024"
  },
  {
    id: "3",
    term: "política",
    operator: "NOT" as const,
    active: true,
    matches: 12,
    createdAt: "13/01/2024"
  }
]

export default function Keywords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newKeyword, setNewKeyword] = useState("")
  const [newOperator, setNewOperator] = useState("AND")

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
            <div className="text-2xl font-bold">{mockKeywords.length}</div>
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
              {mockKeywords.reduce((sum, k) => sum + k.matches, 0)}
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
              {mockKeywords.filter(k => k.operator === 'AND').length}
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
              {mockKeywords.filter(k => k.operator === 'NOT').length}
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
              placeholder="Exemplo de lógica: (marketing digital AND startup) OR (empreendedorismo) NOT (política)"
              className="min-h-[60px]"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Use parênteses para agrupar termos e crie lógicas complexas
            </p>
          </div>
          
          <Button>Adicionar Palavra-Chave</Button>
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
        {mockKeywords.map((keyword) => (
          <KeywordItem key={keyword.id} keyword={keyword} />
        ))}
      </div>
    </div>
  )
}
