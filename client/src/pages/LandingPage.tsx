import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Zap, BarChart3, Shield, Users, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Marina Costa",
      company: "Marina Consultoria",
      text: "Aumentei minhas vendas em 45% após lançar minha landing page. Profissional demais!",
      avatar: "MC",
    },
    {
      name: "Carlos Silva",
      company: "Silva & Cia",
      text: "Recebi leads de qualidade no primeiro mês. Excelente investimento!",
      avatar: "CS",
    },
    {
      name: "Juliana Mendes",
      company: "Mendes Advocacia",
      text: "Meu site ficou pronto em 15 dias e já estou recebendo clientes. Recomendo!",
      avatar: "JM",
    },
  ];

  const faqs = [
    {
      question: "Qual é o prazo de entrega?",
      answer:
        "O prazo é de 15 dias corridos contados a partir da entrega do seu material (textos, imagens e informações). Esse tempo inclui design, desenvolvimento e testes completos.",
    },
    {
      question: "Preciso ter domínio próprio?",
      answer:
        "Sim, você é responsável pelo registro do seu domínio. Oferecemos hospedagem profissional e podemos ajudar com o apontamento de DNS para sua hospedagem.",
    },
    {
      question: "Vocês fazem o conteúdo (textos e imagens)?",
      answer:
        "Não. Você é responsável por fornecer todo o conteúdo (textos, fotos, descrições). Nós transformamos esse material em um site profissional e de alta conversão.",
    },
    {
      question: "Posso parcelar o pagamento?",
      answer:
        "Sim! O Mercado Pago oferece opções de parcelamento em até 12 vezes. Os juros são cobrados pelo Mercado Pago, não por nós.",
    },
    {
      question: "Qual é a diferença entre site e hospedagem?",
      answer:
        "O site é o projeto visual e funcional que criamos para você. A hospedagem é o serviço que mantém seu site online 24/7. Oferecemos hospedagem profissional com suporte técnico.",
    },
    {
      question: "Vocês oferecem suporte após a entrega?",
      answer:
        "Sim! Incluímos suporte inicial para garantir que tudo funcione perfeitamente. Para dúvidas futuras, estamos disponíveis via WhatsApp.",
    },
  ];

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Carregamento Ultra Rápido",
      description: "Sites otimizados para velocidade extrema, melhorando SEO e conversão",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Otimizado para Conversão",
      description: "Design estratégico focado em transformar visitantes em clientes",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Segurança Garantida",
      description: "SSL, backup automático e proteção contra ataques inclusos",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Suporte Profissional",
      description: "Equipe disponível para ajudar com dúvidas e ajustes",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/manus-storage/Ativo13_ec58d377.png" alt="Verticale" className="h-10" />
          </div>
          <div className="hidden md:flex gap-8">
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
            onClick={() => setLocation("/checkout")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Começar Agora
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            ✨ Transforme seu negócio com um site profissional
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Sua Presença Digital Profissional em{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              15 Dias
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Landing pages e sites institucionais estratégicos, otimizados para conversão e SEO. Comece a vender online com uma plataforma que funciona.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => setLocation("/checkout")}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-lg"
            >
              Quero Meu Site Agora <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-lg"
            >
              Ver Demonstração
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Pagamento seguro via Mercado Pago
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Suporte via WhatsApp
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Hospedagem profissional incluída
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Seu negócio está perdendo vendas?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-red-500/30 p-6">
              <p className="text-red-400 font-semibold mb-2">❌ Sem estrutura</p>
              <p className="text-slate-300">
                Mandar cliente para WhatsApp sem página de venda profissional reduz credibilidade
              </p>
            </Card>
            <Card className="bg-slate-800 border-red-500/30 p-6">
              <p className="text-red-400 font-semibold mb-2">❌ Sem prova social</p>
              <p className="text-slate-300">
                Visitantes não sabem se você é confiável. Falta depoimentos e casos de sucesso
              </p>
            </Card>
            <Card className="bg-slate-800 border-red-500/30 p-6">
              <p className="text-red-400 font-semibold mb-2">❌ Sem pagamento automático</p>
              <p className="text-slate-300">
                Depender de atendimento manual para cada venda é ineficiente e caro
              </p>
            </Card>
            <Card className="bg-slate-800 border-red-500/30 p-6">
              <p className="text-red-400 font-semibold mb-2">❌ Sem SEO</p>
              <p className="text-slate-300">
                Seu site não aparece no Google. Você perde oportunidades todos os dias
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">
            A Solução: Um Site que Vende
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-6">
              <p className="text-green-600 font-semibold mb-2">✅ Estrutura profissional</p>
              <p className="text-slate-700">
                Página estratégica que apresenta sua oferta, quebra objeções e leva direto ao pagamento
              </p>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-6">
              <p className="text-green-600 font-semibold mb-2">✅ Prova social real</p>
              <p className="text-slate-700">
                Depoimentos, casos de sucesso e números que aumentam confiança e conversão
              </p>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-6">
              <p className="text-green-600 font-semibold mb-2">✅ Pagamento automático</p>
              <p className="text-slate-700">
                Integração com Mercado Pago. Cliente paga sozinho, você recebe na hora
              </p>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 p-6">
              <p className="text-green-600 font-semibold mb-2">✅ Otimizado para SEO</p>
              <p className="text-slate-700">
                Seu site aparece no Google. Tráfego orgânico gratuito e contínuo
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">
              Pacote Landing Page Express
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900">Site Institucional até 5 páginas</p>
                  <p className="text-slate-600">Home, Sobre, Serviços, FAQ e Contato</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900">Design responsivo e profissional</p>
                  <p className="text-slate-600">Funciona perfeitamente em celular, tablet e desktop</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900">Integração com Mercado Pago</p>
                  <p className="text-slate-600">Receba pagamentos automaticamente (Pix, cartão, boleto)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900">Otimizado para SEO</p>
                  <p className="text-slate-600">Seu site aparece no Google naturalmente</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900">Página de obrigado automática</p>
                  <p className="text-slate-600">Cliente recebe confirmação após o pagamento</p>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-purple-200 pt-6 mb-6">
              <p className="text-slate-600 mb-2">
                <strong>Prazo de entrega:</strong> 15 dias após recebimento do seu material
              </p>
              <p className="text-slate-600 mb-4">
                <strong>Responsabilidades do cliente:</strong> Fornecer textos, imagens, informações e registrar domínio
              </p>
              <p className="text-2xl font-bold text-purple-600">
                Valor: <span className="text-3xl">R$ 1.500</span>
              </p>
            </div>

            <Button
              onClick={() => setLocation("/checkout")}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg py-6"
            >
              Contratar Agora <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">
            Por que escolher nossos sites?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition">
                <div className="text-purple-600 mb-4">{benefit.icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">
            Clientes que já aumentaram suas vendas
          </h2>

          <div className="relative">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 md:p-12 border border-purple-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-sm text-slate-600">
                    {testimonials[activeTestimonial].company}
                  </p>
                </div>
              </div>

              <p className="text-lg text-slate-700 mb-6 italic">
                "{testimonials[activeTestimonial].text}"
              </p>

              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition ${
                      index === activeTestimonial
                        ? "bg-purple-600 w-8"
                        : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="detalhes" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">
            Como funciona o processo
          </h2>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Você escolhe o plano",
                description: "Selecione entre site institucional ou landing page e a hospedagem",
              },
              {
                step: 2,
                title: "Faz o pagamento",
                description: "Pagamento seguro via Mercado Pago (Pix, cartão, boleto)",
              },
              {
                step: 3,
                title: "Envia seu material",
                description: "Textos, imagens, informações sobre seu negócio",
              },
              {
                step: 4,
                title: "Recebe seu site pronto",
                description: "Em 15 dias, seu site está pronto para publicar e vender",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">
            Perguntas Frequentes
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-slate-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para transformar seu negócio?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Comece sua presença digital profissional hoje mesmo
          </p>
          <Button
            onClick={() => setLocation("/checkout")}
            size="lg"
            className="bg-white text-purple-600 hover:bg-slate-100 text-lg px-8 py-6"
          >
            Contratar Agora <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-semibold text-white mb-4">WebSites Pro</p>
              <p className="text-sm">Criação de sites profissionais para vender mais</p>
            </div>
            <div>
              <p className="font-semibold text-white mb-4">Produto</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Features</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-4">Legal</p>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-white transition">Privacidade</a></li>
                <li><a href="/terms" className="hover:text-white transition">Termos</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-4">Contato</p>
              <ul className="space-y-2 text-sm">
                <li><a href="https://wa.me/5512996103765" className="hover:text-white transition">WhatsApp</a></li>
                <li><a href="mailto:contato@websitespro.com" className="hover:text-white transition">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2026 WebSites Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
