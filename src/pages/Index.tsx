import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageCircle, Target, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Bot className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Bot de Comentários Inteligente
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Automatize seus comentários em redes sociais com IA avançada. 
            Monitore perfis, responda automaticamente e aumente seu engajamento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8" asChild>
              <Link to="/auth">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Ver Demonstração
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Target className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Monitoramento Inteligente</CardTitle>
              <CardDescription>
                Monitore perfis específicos e receba notificações quando há novas atividades
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <MessageCircle className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Comentários com IA</CardTitle>
              <CardDescription>
                Gere comentários relevantes e contextuais usando inteligência artificial avançada
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Automação Completa</CardTitle>
              <CardDescription>
                Configure palavras-chave e deixe o bot trabalhar automaticamente para você
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Por que escolher nosso bot?</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="text-lg">Aumento de 300% no engajamento</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="text-lg">Respostas em tempo real 24/7</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="text-lg">Comentários personalizados e naturais</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="text-lg">Análises detalhadas de performance</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Pronto para começar?</h3>
            <p className="text-lg mb-6 opacity-90">
              Junte-se a milhares de usuários que já automatizaram seus comentários
            </p>
            <Button size="lg" variant="secondary" className="px-8" asChild>
              <Link to="/auth">
                Criar Conta Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
