import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Edit, Trash2, Activity } from "lucide-react"

interface KeywordItemProps {
  keyword: {
    id: string
    term: string
    operator: 'AND' | 'OR' | 'NOT'
    active: boolean
    matches: number
    createdAt: string
  }
}

export function KeywordItem({ keyword }: KeywordItemProps) {
  const getOperatorColor = (operator: string) => {
    switch (operator) {
      case 'AND': return 'bg-green-100 text-green-800'
      case 'OR': return 'bg-blue-100 text-blue-800'
      case 'NOT': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <Badge className={getOperatorColor(keyword.operator)}>
            {keyword.operator}
          </Badge>
          <h3 className="font-medium">{keyword.term}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Switch checked={keyword.active} />
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Activity className="h-4 w-4" />
            <span>{keyword.matches} correspondências</span>
          </div>
          <span className="text-muted-foreground">
            Criado em {keyword.createdAt}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
