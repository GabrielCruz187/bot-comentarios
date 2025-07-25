import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Download, Filter, Calendar, ExternalLink } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const mockHistory = [
  {
    id: "1",
    date: "2024-01-17 14:30",
    action: "Comentário postado",
    platform: "LinkedIn",
    target: "João Silva",
    content: "Excelente perspectiva sobre marketing digital...",
    status: "success",
    engagement: { likes: 12, replies: 3 }
  },
  {
    id: "2",
    date: "2024-01-17 13:15",
    action: "Perfil adicionado",
    platform: "X",
    target: "Maria Santos",
    content: "Novo perfil-alvo adicionado ao monitoramento",
    status: "success",
    engagement: { likes: 0, replies: 0 }
  },
  {
    id: "3",
    date: "2024-01-17 12:45",
    action: "Comentário falhado",
    platform: "LinkedIn",
    target: "Pedro Costa",
    content: "Erro ao publicar comentário: limite de caracteres",
    status: "error",
    engagement: { likes: 0, replies: 0 }
  }
]

export default function History() {
  const [searchTerm, setSearchTerm] = useState("")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return 'bg-blue-600'
      case 'X': return 'bg-black'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Histórico</h1>
          <p className="text-muted-foreground">
            Registro completo de todas as atividades da plataforma
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Selecionar Período
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Ações</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,457</div>
            <p className="text-xs text-muted-foreground">últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sucessos</CardTitle>
            <Badge className="bg-green-500">✓</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,341</div>
            <p className="text-xs text-muted-foreground">95.3% taxa de sucesso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Falhas</CardTitle>
            <Badge className="bg-red-500">✗</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">116</div>
            <p className="text-xs text-muted-foreground">4.7% taxa de erro</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Atividade</CardTitle>
            <Badge variant="outline">Agora</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">Comentário postado</div>
            <p className="text-xs text-muted-foreground">há 2 minutos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar no histórico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de ação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as ações</SelectItem>
                <SelectItem value="comment">Comentários</SelectItem>
                <SelectItem value="profile">Perfis</SelectItem>
                <SelectItem value="keyword">Palavras-chave</SelectItem>
                <SelectItem value="config">Configurações</SelectItem>
              </SelectContent>
            </Select>

            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">X (Twitter)</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Histórico */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Plataforma</TableHead>
                <TableHead>Alvo</TableHead>
                <TableHead>Detalhes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Engajamento</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs">
                    {item.date}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{item.action}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getPlatformColor(item.platform)} text-white`}>
                      {item.platform}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.target}</TableCell>
                  <TableCell className="max-w-[200px]">
                    <p className="text-sm truncate" title={item.content}>
                      {item.content}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status === 'success' ? 'Sucesso' : 'Erro'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.engagement.likes > 0 || item.engagement.replies > 0 ? (
                      <div className="text-xs">
                        {item.engagement.likes}❤️ {item.engagement.replies}💬
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
