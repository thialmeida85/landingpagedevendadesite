import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Check,
  Star,
  Quote,
  Zap,
  Globe,
  Users,
  Clock,
  Shield,
  Menu,
  X,
  ChevronDown,
  Heart,
  Share2,
  Calendar,
  User,
  Folder
} from 'lucide-react';

export default function LandingPageV2() {
  const [, navigate] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initialize carousel
    const initCarousel = () => {
      const carousel = document.getElementById('heroCarousel');
      if (carousel && window.bootstrap) {
        new window.bootstrap.Carousel(carousel, {
          interval: 3000,
          wrap: true
        });
      }
    };

    // Load Bootstrap JS if not loaded
    if (!window.bootstrap) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
      script.onload = initCarousel;
      document.head.appendChild(script);
    } else {
      initCarousel();
    }
  }, []);

  const toggleLike = async (postId: string) => {
    setLikes(prev => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src="/assets/images/logo.png"
                alt="Agência Verticale"
                className="h-8 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-purple-400 transition">Home</a>
              <a href="#about" className="hover:text-purple-400 transition">Sobre</a>
              <a href="#services" className="hover:text-purple-400 transition">Serviços</a>
              <a href="#skills" className="hover:text-purple-400 transition">Habilidades</a>
              <a href="#blog" className="hover:text-purple-400 transition">Blog</a>
              <a href="#contact" className="hover:text-purple-400 transition">Contato</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <nav className="flex flex-col space-y-4">
                <a href="#home" className="hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>Home</a>
                <a href="#about" className="hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>Sobre</a>
                <a href="#services" className="hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>Serviços</a>
                <a href="#skills" className="hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>Habilidades</a>
                <a href="#blog" className="hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>Blog</a>
                <a href="#contact" className="hover:text-purple-400 transition" onClick={() => setIsMenuOpen(false)}>Contato</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Video Background */}
      <section id="home" className="relative min-h-screen flex items-center">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Carousel */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>

            <div className="carousel-inner">
              {/* Slide 1 - Diagnóstico */}
              <div className="carousel-item active">
                <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
                  <div className="text-white space-y-6">
                    <h6 className="text-blue-400 font-semibold text-lg uppercase tracking-wide">Descubra os vazamentos de receita do seu negócio</h6>
                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                      Transforme seu site em uma <em>máquina de vendas</em> <span className="text-white">automática</span>
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                      Seu concorrente vende mais porque o site dele é otimizado para fechar negócios, e não apenas para ser bonito. Identifique as falhas que bloqueiam o seu faturamento com nosso <strong className="text-white">Diagnóstico de Saúde Digital</strong> gratuito e instantâneo.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="https://analisador-de-site.lovable.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Gerar Diagnóstico Agora
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <div className="flex items-center gap-2 text-green-400 font-semibold">
                        <Shield className="w-5 h-5" />
                        <span>Mais de 50 projetos escalados com foco absoluto em ROI</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <img
                      src="/assets/images/banner-right-image.png"
                      alt="Equipe da agência de marketing digital trabalhando em alta conversão"
                      className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Slide 2 - Identidade Visual */}
              <div className="carousel-item">
                <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
                  <div className="text-white space-y-6">
                    <h6 className="text-blue-400 font-semibold text-lg uppercase tracking-wide">Arquitetura de Marca & Neurodesign</h6>
                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                      Pare de perder clientes por um <em>visual</em> <span className="text-purple-400">amador.</span>
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                      Criamos Identidades Visuais e Manuais de Marca focados em posicionamento e valor percebido. Eleve sua empresa e pare de competir por preço.
                    </p>
                    <div>
                      <a
                        href="identidade-visual.html"
                        className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Reposicionar Minha Marca
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <img
                      src="/assets/images/banner-right-image.png"
                      alt="Imagem Slide 2"
                      className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Slide 3 - Social Media */}
              <div className="carousel-item">
                <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
                  <div className="text-white space-y-6">
                    <h6 className="text-blue-400 font-semibold text-lg uppercase tracking-wide">Gestão Estratégica e Funis de Conteúdo</h6>
                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                      Seu Instagram atrai clientes ou é um <em>cemitério de</em> <span className="text-purple-400">curtidas?</span>
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                      O "postar por postar" está destruindo sua marca. Faça uma análise gratuita do seu perfil e descubra as falhas ocultas no seu conteúdo.
                    </p>
                    <div>
                      <a
                        href="https://analise-seu-insta.lovable.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Analisar Meu Instagram
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <img
                      src="/assets/images/banner-right-image.png"
                      alt="Imagem Slide 3"
                      className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Próximo</span>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h6 className="text-blue-400 font-semibold text-lg uppercase tracking-wide">Sobre a Verticale</h6>
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  Quem é a <em>Verticale?</em>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Nascemos com um propósito claro: transformar negócios através de engenharia digital de ponta e estratégias de alta performance. Não somos apenas uma agência; somos o seu parceiro de crescimento acelerado.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h4 className="text-blue-400 font-semibold text-lg mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      🎯
                    </div>
                    Missão
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Acelerar as vendas dos nossos clientes unindo design premium, código limpo e tráfego de alta conversão.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h4 className="text-purple-400 font-semibold text-lg mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      👁️
                    </div>
                    Visão
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Ser a principal referência em Ecossistemas Digitais 360º para empresas que buscam liderança em seus mercados.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                  <h4 className="text-green-400 font-semibold text-lg mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      💎
                    </div>
                    Valores
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Transparência absoluta, foco implacável no ROI, inovação tecnológica constante e design centrado na experiência do usuário.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <img
                src="/assets/images/astronauta sentado.png"
                alt="Mascote da agência de marketing digital em São José dos Campos"
                className="w-full max-w-md mx-auto lg:ml-auto rounded-lg shadow-2xl filter drop-shadow-[0_20px_40px_rgba(138,43,226,0.3)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h6 className="text-blue-400 font-semibold text-lg uppercase tracking-wide">Nossos Serviços</h6>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Por que escolher a <em>Verticale?</em>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Na Verticale, não entregamos apenas serviços isolados. Construímos ecossistemas digitais completos que trabalham juntos para vender mais. Identificamos o que sua marca precisa hoje para alcançar o próximo nível amanhã.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '💻',
                title: 'Desenvolvimento Web e Criação de Sites',
                description: 'Especialistas em desenvolvimento web e criação de sites e landing pages para alta conversão. Tenha uma landing page otimizada para o Google (SEO).',
                link: 'desenvolvimento-web.html',
                image: '/assets/images/service-icon-01.png'
              },
              {
                icon: '🎨',
                title: 'Design & Branding Profissional',
                description: 'Criação de logotipos e identidades visuais que constroem autoridade e diferenciam sua empresa da concorrência.',
                link: 'identidade-visual.html',
                image: '/assets/images/service-icon-02.png'
              },
              {
                icon: '📱',
                title: 'Gestão Estratégica de Social Media',
                description: 'Presença digital inteligente com conteúdo de valor e estratégias focadas em engajar a audiência que realmente compra.',
                link: 'social-media.html',
                image: '/assets/images/service-icon-03.png'
              },
              {
                icon: '🤖',
                title: 'CRM & Automação de Vendas',
                description: 'Centralize o WhatsApp, elimine tarefas manuais e escale seu atendimento com nossos Agentes de Inteligência Artificial 24/7.',
                link: 'crm-automacao.html',
                image: '/assets/images/service-icon-01.png'
              },
              {
                icon: '📈',
                title: 'SEO & Tráfego de Performance',
                description: 'Anúncios de alta precisão no Google e Meta para colocar sua marca na frente de quem já quer comprar de você.',
                link: 'trafego-pago.html',
                image: '/assets/images/service-icon-02.png'
              },
              {
                icon: '🚀',
                title: 'Combos Integrados (360º)',
                description: 'A potência máxima: unimos desenvolvimento, design, social e tecnologia em uma única estratégia integrada para resultados exponenciais.',
                link: 'combos-360.html',
                image: '/assets/images/service-icon-03.png'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <img src={service.image} alt={service.title} className="w-12 h-12" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-lg mb-2">{service.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">{service.description}</p>
                    <a
                      href={service.link}
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors"
                    >
                      Saiba mais
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h6 className="text-blue-400 font-semibold text-lg uppercase tracking-wide">Nossas Habilidades</h6>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Tecnologias que <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">dominamos</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'React', level: 95 },
              { name: 'Node.js', level: 90 },
              { name: 'Python', level: 85 },
              { name: 'TypeScript', level: 92 },
              { name: 'Next.js', level: 88 },
              { name: 'PostgreSQL', level: 87 },
              { name: 'AWS', level: 83 },
              { name: 'Docker', level: 80 }
            ].map((skill, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">{skill.level}%</div>
                <div className="text-white font-semibold mb-2">{skill.name}</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h6 className="text-blue-400 font-semibold text-lg uppercase tracking-wide">Blog & Insights</h6>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Conteúdo que <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">transforma</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 'sinfonia-dos-dados-tom-de-voz',
                title: 'A Sinfonia dos Dados: O Tom de Voz da sua Marca',
                excerpt: 'Em 2026, a IA não apenas "escreve" por você; ela atua como um maestro decodificando a alma do seu negócio.',
                image: '/assets/blog/sinfonia-dados.jpg',
                date: '2026-01-15',
                readTime: '5 min'
              },
              {
                id: 'neurodesign-vendas',
                title: 'Neurodesign: A Ciência por Trás das Vendas Online',
                excerpt: 'Como aplicar princípios neurocientíficos para criar interfaces que convertem visitantes em clientes.',
                image: '/assets/blog/neurodesign.jpg',
                date: '2026-01-10',
                readTime: '7 min'
              },
              {
                id: 'ia-marketing-2026',
                title: 'IA no Marketing Digital: O Futuro Chegou',
                excerpt: 'Como a inteligência artificial está revolucionando estratégias de marketing e vendas.',
                image: '/assets/blog/ia-marketing.jpg',
                date: '2026-01-05',
                readTime: '6 min'
              }
            ].map((post, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-white text-4xl">📄</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-full text-sm">
                      Ler Mais
                    </Button>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors ${localStorage.getItem(`liked_${post.id}`) === 'true' ? 'text-red-400' : ''}`}
                      >
                        <Heart className={`w-4 h-4 ${localStorage.getItem(`liked_${post.id}`) === 'true' ? 'fill-current' : ''}`} />
                        <span>{likes[post.id] || 0}</span>
                      </button>
                      <button className="text-gray-400 hover:text-blue-400 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h6 className="text-blue-400 font-semibold text-lg uppercase tracking-wide">Fale com um especialista</h6>
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  Pronto para <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">transformar</span> seu negócio?
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Agende uma consultoria gratuita e descubra como podemos ajudar sua empresa a alcançar o próximo nível no mercado digital.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Atendimento Personalizado</div>
                    <div className="text-gray-400 text-sm">Cada cliente recebe uma estratégia exclusiva</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Resultados Comprovados</div>
                    <div className="text-gray-400 text-sm">Mais de 50 projetos de sucesso entregues</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Garantia de Satisfação</div>
                    <div className="text-gray-400 text-sm">98% dos clientes recomendam nossos serviços</div>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Agendar Consultoria Gratuita
              </Button>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Informações de Contato</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">São José dos Campos - SP</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                    </svg>
                    <a href="https://wa.me/5512996103765" className="text-gray-300 hover:text-purple-400 transition">WhatsApp: (12) 99610-3765</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <img
                src="/assets/images/logo.png"
                alt="Agência Verticale"
                className="h-8 w-auto"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                Somos uma agência de marketing digital especializada em alta conversão, criando ecossistemas digitais completos que trabalham juntos para vender mais.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Serviços</h4>
              <div className="space-y-2">
                <a href="desenvolvimento-web.html" className="block text-gray-400 hover:text-purple-400 transition text-sm">Desenvolvimento Web</a>
                <a href="identidade-visual.html" className="block text-gray-400 hover:text-purple-400 transition text-sm">Identidade Visual</a>
                <a href="social-media.html" className="block text-gray-400 hover:text-purple-400 transition text-sm">Social Media</a>
                <a href="crm-automacao.html" className="block text-gray-400 hover:text-purple-400 transition text-sm">CRM & Automação</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Empresa</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-gray-400 hover:text-purple-400 transition text-sm">Sobre Nós</a>
                <a href="#blog" className="block text-gray-400 hover:text-purple-400 transition text-sm">Blog</a>
                <a href="#contact" className="block text-gray-400 hover:text-purple-400 transition text-sm">Contato</a>
                <a href="politica-de-privacidade.html" className="block text-gray-400 hover:text-purple-400 transition text-sm">Política de Privacidade</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Conecte-se</h4>
              <div className="flex gap-4">
                <a href="https://wa.me/5512996103765" className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-6 text-sm">
              <span className="text-white font-semibold tracking-wide">Agência Verticale</span>
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

      {/* WhatsApp Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/5512996103765"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
          </svg>
          <span className="hidden md:inline">Falar no WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
