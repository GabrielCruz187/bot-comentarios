import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Bot, Save, Wand2, Target, MessageSquare } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function AISettings() {
  const [tone, setTone] = useState("professional")
  const [creativity, setCreativity] = useState([70])
  const [maxLength, setMaxLength] = useState([280])
  const [useEmojis, setUseEmojis] = useState(true)
  const [avoidControversy, setAvoidControversy] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">IA Personalizada</h1>
          <p className="text-muted-foreground">
            Configure o tom, estilo e personalidade dos comentários automáticos
          </p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Configurações de Tom e Estilo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>Tom e Personalidade</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tone">Tom de voz</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Profissional</SelectItem>
                  <SelectItem value="friendly">Amigável</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="enthusiastic">Entusiasmado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Criatividade: {creativity[0]}%</Label>
              <Slider
                value={creativity}
                onValueChange={setCreativity}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Maior criatividade = comentários mais únicos e variados
              </p>
            </div>

            <div className="space-y-3">
              <Label>Tamanho máximo: {maxLength[0]} caracteres</Label>
              <Slider
                value={maxLength}
                onValueChange={setMaxLength}
                min={50}
                max={500}
                step={10}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emojis">Usar emojis</Label>
                <p className="text-xs text-muted-foreground">
                  Adiciona emojis relevantes aos comentários
                </p>
              </div>
              <Switch
                id="emojis"
                checked={useEmojis}
                onCheckedChange={setUseEmojis}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="controversy">Evitar controvérsia</Label>
                <p className="text-xs text-muted-foreground">
                  Filtra tópicos sensíveis ou polêmicos
                </p>
              </div>
              <Switch
                id="controversy"
                checked={avoidControversy}
                onCheckedChange={setAvoidControversy}
              />
            </div>
          </CardContent>
        </Card>

        {/* Prompts Personalizados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wand2 className="h-5 w-5" />
              <span>Prompts Personalizados</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="system-prompt">Prompt do Sistema</Label>
              <Textarea
                id="system-prompt"
                placeholder="Você é um especialista em marketing digital que sempre adiciona insights valiosos..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="context-prompt">Contexto da Empresa</Label>
              <Textarea
                id="context-prompt"
                placeholder="Nossa empresa atua no segmento de tecnologia, focando em soluções inovadoras..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta-examples">Exemplos de Call-to-Action</Label>
              <Textarea
                id="cta-examples"
                placeholder="O que você acha dessa abordagem?&#10;Gostaria de trocar experiências sobre isso.&#10;Tem alguma dica para compartilhar?"
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tipos de Comentário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Tipos de Comentário</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Pergunta Engajadora</h3>
                <Badge variant="outline">Ativo</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Faz perguntas relevantes para estimular discussão
              </p>
              <div className="text-xs text-muted-foreground">
                Uso: 35% dos comentários
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Insight Complementar</h3>
                <Badge variant="outline">Ativo</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Adiciona informações valiosas ao tópico
              </p>
              <div className="text-xs text-muted-foreground">
                Uso: 40% dos comentários
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Experiência Pessoal</h3>
                <Badge variant="outline">Ativo</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Compartilha experiências relacionadas
              </p>
              <div className="text-xs text-muted-foreground">
                Uso: 25% dos comentários
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview do Comentário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              Excelente perspectiva sobre o futuro do marketing digital! 🚀 
              Na minha experiência, a personalização realmente tem feito a diferença 
              nos resultados das campanhas. Que estratégias vocês têm usado para 
              implementar essa personalização em escala?
            </p>
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <span>Tom: Profissional | Criatividade: 70%</span>
              <span>156 caracteres</span>
            </div>
          </div>
          <Button variant="outline" className="mt-3">
            Gerar Novo Preview
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
