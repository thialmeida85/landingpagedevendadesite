import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Zap, Globe, Users, Clock, Shield, Star, Quote } from "lucide-react";

const LOGO_URL = "/manus-storage/Ativo13_5e8a3b2c.png";

export default function LandingPageV2() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Verticale" className="h-10 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="text-slate-600 hover:text-slate-900 transition">
              Benefícios
            </a>
            <a href="#detalhes" className="text-slate-600 hover:text-slate-900 transition">
              Detalhes
            </a>
            <a href="#faq" className="text-slate-600 hover:text-slate-900 transition">
              FAQ
            </a>
          </div>
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="text-slate-600"
          >
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-slate-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-blue-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Promo Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">
                Promoção Especial - Apenas R$ 500
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
              Sua Presença Digital
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Profissional em 15 Dias
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Site Institucional ou Landing Page estratégicos, otimizados para conversão e SEO.
              Comece a vender online com uma plataforma que funciona.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() => navigate("/checkout")}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition"
              >
                Começar Agora - R$ 500
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-semibold rounded-lg border-2 border-slate-300 hover:border-slate-400"
              >
                Já sou Cliente
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Pagamento seguro via Mercado Pago</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span>Entrega em 15 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-600" />
                <span>Suporte via WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Opções de Serviço */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
            Escolha o Seu Tipo de Site
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Site Institucional */}
            <Card className="p-8 border-2 border-slate-200 hover:border-blue-400 transition">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Site Institucional
                  </h3>
                  <p className="text-slate-600">
                    Perfeito para empresas, consultórios e profissionais
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">
                      <strong>Até 5 páginas:</strong> Home, Sobre, Serviços/Portfólio, Contato
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Design responsivo e moderno</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Otimizado para SEO</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Formulários de contato</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <p className="text-3xl font-bold text-slate-900 mb-4">R$ 500</p>
                  <Button
                    onClick={() => navigate("/checkout?type=institutional")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold rounded-lg"
                  >
                    Contratar Site Institucional
                  </Button>
                </div>
              </div>
            </Card>

            {/* Landing Page */}
            <Card className="p-8 border-2 border-purple-400 bg-gradient-to-br from-purple-50 to-white">
              <div className="space-y-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-purple-200 text-purple-900 text-xs font-semibold rounded-full mb-2">
                    MAIS POPULAR
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Landing Page
                  </h3>
                  <p className="text-slate-600">
                    Ideal para campanhas, promoções e conversão de vendas
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">
                      <strong>1 página otimizada</strong> para conversão máxima
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Design de alta conversão</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">
                      Link de pagamento integrado (você fornece)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Otimizado para mobile</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <p className="text-3xl font-bold text-slate-900 mb-4">R$ 500</p>
                  <Button
                    onClick={() => navigate("/checkout?type=landing")}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg font-semibold rounded-lg"
                  >
                    Contratar Landing Page
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Prova Social */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
            Quem já transformou suas vendas
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Marina Costa",
                company: "Marina Consultoria",
                text: "Aumentei minhas vendas em 45% após lançar minha landing page. Profissional demais!",
                avatar: "MC"
              },
              {
                name: "Carlos Silva",
                company: "Silva & Cia",
                text: "Recebi leads de qualidade no primeiro mês. A estrutura é perfeita para converter.",
                avatar: "CS"
              },
              {
                name: "Juliana Mendes",
                company: "Mendes Advocacia",
                text: "Meu site ficou pronto em 15 dias cravados e já estou recebendo clientes. Recomendo!",
                avatar: "JM"
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-8 border border-slate-100 hover:shadow-xl transition-shadow bg-slate-50/50 relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-100" />
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic relative z-10">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.company}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
            Por Que Escolher a Verticale?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Rápido",
                description: "Entrega em apenas 15 dias após recebimento do material",
              },
              {
                icon: Globe,
                title: "Profissional",
                description: "Design moderno e otimizado para conversão e SEO",
              },
              {
                icon: Users,
                title: "Suporte",
                description: "Acompanhamento via WhatsApp durante todo o processo",
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detalhes */}
      <section id="detalhes" className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
            Como Funciona
          </h2>

          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Você Contrata</h3>
                <p className="text-slate-600">
                  Escolha entre Site Institucional ou Landing Page e faça o pagamento seguro via Mercado Pago
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Você Envia Material</h3>
                <p className="text-slate-600">
                  Envie textos, imagens, informações e preferências de design via WhatsApp ou email
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Nós Desenvolvemos</h3>
                <p className="text-slate-600">
                  Nosso time cria seu site em 15 dias com design profissional e otimizado
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Você Publica</h3>
                <p className="text-slate-600">
                  Receba seu site pronto e aponte seu domínio. Tutorial completo incluído
                </p>
              </div>
            </div>
          </div>

          {/* Responsabilidades */}
          <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="font-bold text-slate-900 mb-4">Importante - Responsabilidades:</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Você é responsável pelo conteúdo (textos e imagens)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Você é responsável pelo registro do domínio</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>Nós fazemos o apontamento de DNS para sua hospedagem (se contratada)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
            Perguntas Frequentes
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="1" className="border border-slate-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 py-4">
                Qual é o prazo de entrega?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pb-4">
                O prazo é de 15 dias contados a partir do recebimento do seu material (textos, imagens e informações). Após esse período, seu site estará pronto para publicar.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="2" className="border border-slate-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 py-4">
                Posso escolher o design?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pb-4">
                Sim! Você pode enviar referências de design que gosta, e nossa equipe criará um site único e profissional para você, respeitando suas preferências.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="3" className="border border-slate-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 py-4">
                Preciso contratar hospedagem com vocês?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pb-4">
                Não é obrigatório! Você pode usar qualquer hospedagem que preferir. Porém, oferecemos hospedagem profissional com preços competitivos (R$ 150/ano, R$ 250/2 anos ou R$ 380/3 anos) que inclui 3 e-mails profissionais de 1GB cada na plataforma E-mail Titan. A hospedagem é opcional e pode ser contratada no checkout.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="4" className="border border-slate-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 py-4">
                Como funciona a hospedagem?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pb-4">
                A hospedagem é um serviço que mantém seu site online 24/7. Você contrata conosco, recebe acesso, e nós fazemos o apontamento de DNS do seu domínio. Inclui também 3 e-mails profissionais com seu domínio na plataforma E-mail Titan, mais profissional que e-mails genéricos.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="5" className="border border-slate-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 py-4">
                Vocês oferecem VPS?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pb-4">
                Não, ainda não oferecemos VPS. Atualmente oferecemos hospedagem compartilhada com excelente custo-benefício para a maioria dos sites. Não temos previsão de lançamento de VPS no momento.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="6" className="border border-slate-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 py-4">
                Posso usar meu próprio domínio?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pb-4">
                Sim! Você é responsável pelo registro do domínio em qualquer registrador que preferir (Registro.br, GoDaddy, Hostinger, etc.). Nós fazemos o apontamento de DNS para sua hospedagem. Incluímos um tutorial completo com instruções passo a passo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="7" className="border border-slate-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 py-4">
                Qual é a qualidade do site?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 pb-4">
                A qualidade do site depende completamente da qualidade do material que você enviar. Quanto melhor as imagens, textos e informações, melhor será o resultado final. Nós transformamos seu material em um site profissional e otimizado.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-blue-100">
            Transforme seu negócio com um site profissional. Apenas R$ 500.
          </p>
          <Button
            onClick={() => navigate("/checkout")}
            size="lg"
            className="bg-white text-blue-600 hover:bg-slate-100 px-10 py-6 text-lg font-semibold rounded-lg shadow-lg"
          >
            Começar Agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <img src={LOGO_URL} alt="Verticale" className="h-8 w-auto" />
              <span className="text-white font-semibold">Agencia Verticale</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition">
                Termos e Condições
              </a>
              <a href="https://wa.me/5512996103765" className="hover:text-white transition">
                WhatsApp
              </a>
            </div>
            <p className="text-sm">© 2026 Verticale. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
