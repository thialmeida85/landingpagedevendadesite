import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check, Info, Server } from "lucide-react";

const LOGO_URL = "/manus-storage/Ativo13_5e8a3b2c.png";

const HOSTING_PLANS = [
  { id: "1year", label: "1 Ano", price: 15000, description: "R$ 150/ano" },
  { id: "2years", label: "2 Anos", price: 25000, description: "R$ 250/2 anos" },
  { id: "3years", label: "3 Anos", price: 38000, description: "R$ 380/3 anos" },
];

export default function CheckoutPageV2() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [includeHosting, setIncludeHosting] = useState(false);
  const [hostingPlan, setHostingPlan] = useState("1year");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const WEBSITE_PRICE = 50000; // R$ 500
  const hostingPrice = includeHosting
    ? HOSTING_PLANS.find((p) => p.id === hostingPlan)?.price || 0
    : 0;
  const totalPrice = WEBSITE_PRICE + hostingPrice;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validação
      if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
        setError("Por favor, preencha todos os campos obrigatórios");
        setLoading(false);
        return;
      }

      // Aqui seria chamada a API tRPC para criar o pedido
      console.log("Checkout data:", {
        ...formData,
        includeHosting,
        hostingPlan,
        totalPrice,
      });

      // Simular sucesso
      setTimeout(() => {
        navigate("/success");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Voltar</span>
          </button>
          <img src={LOGO_URL} alt="Verticale" className="h-8 w-auto" />
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dados Pessoais */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Seus Dados</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Nome Completo *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Telefone/WhatsApp *
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="(12) 99999-9999"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Empresa (Opcional)
                    </label>
                    <Input
                      type="text"
                      name="company"
                      placeholder="Nome da sua empresa"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Hospedagem */}
              <div className="space-y-6 p-6 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={includeHosting}
                    onCheckedChange={(checked) => setIncludeHosting(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Deseja incluir Hospedagem?
                    </h3>
                    <p className="text-slate-600 text-sm">
                      Hospedagem profissional apenas para sites produzidos pela Agencia Verticale
                    </p>
                  </div>
                </div>

                {includeHosting && (
                  <div className="space-y-4 pl-8">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-900">
                          <p className="font-semibold mb-2">O que é Hospedagem?</p>
                          <p className="mb-3">
                            Hospedagem é o serviço que mantém seu site online 24/7. Você contrata conosco, e nós fazemos o apontamento de DNS do seu domínio.
                          </p>
                          <p className="font-semibold mb-2">Incluso na Hospedagem:</p>
                          <ul className="space-y-1 ml-4">
                            <li>✓ 3 e-mails profissionais de 1GB cada</li>
                            <li>✓ Plataforma E-mail Titan (mais profissional)</li>
                            <li>✓ Suporte técnico via WhatsApp</li>
                            <li>✓ Apontamento de DNS</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-slate-900">Escolha o Plano:</p>
                      <RadioGroup value={hostingPlan} onValueChange={setHostingPlan}>
                        {HOSTING_PLANS.map((plan) => (
                          <div key={plan.id} className="flex items-center gap-3 p-3 border border-slate-300 rounded-lg hover:border-blue-400 cursor-pointer transition">
                            <RadioGroupItem value={plan.id} id={plan.id} />
                            <label
                              htmlFor={plan.id}
                              className="flex-1 cursor-pointer"
                            >
                              <div className="font-semibold text-slate-900">
                                {plan.label}
                              </div>
                              <div className="text-sm text-slate-600">
                                {plan.description}
                              </div>
                            </label>
                            <div className="text-lg font-bold text-blue-600">
                              R$ {(plan.price / 100).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                )}
              </div>

              {/* Erro */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-lg disabled:opacity-50"
              >
                {loading ? "Processando..." : "Ir para Pagamento"}
              </Button>
            </form>
          </div>

          {/* Resumo */}
          <div className="md:col-span-1">
            <Card className="p-6 sticky top-24 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Resumo do Pedido</h3>

              <div className="space-y-4">
                {/* Site */}
                <div className="pb-4 border-b border-slate-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-slate-900">Site Profissional</p>
                      <p className="text-xs text-slate-600 mt-1">
                        Institucional ou Landing Page
                      </p>
                    </div>
                    <p className="font-bold text-slate-900">
                      R$ {(WEBSITE_PRICE / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Até 5 páginas</span>
                    </div>
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>15 dias de prazo</span>
                    </div>
                    <div className="flex gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Otimizado para SEO</span>
                    </div>
                  </div>
                </div>

                {/* Hospedagem */}
                {includeHosting && (
                  <div className="pb-4 border-b border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-slate-900 flex items-center gap-2">
                          <Server className="w-4 h-4" />
                          Hospedagem
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                          {HOSTING_PLANS.find((p) => p.id === hostingPlan)?.label}
                        </p>
                      </div>
                      <p className="font-bold text-slate-900">
                        R$ {(hostingPrice / 100).toFixed(2)}
                      </p>
                    </div>
                    <div className="space-y-1 text-xs text-slate-600">
                      <div className="flex gap-2">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>3 e-mails profissionais</span>
                      </div>
                      <div className="flex gap-2">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>E-mail Titan</span>
                      </div>
                      <div className="flex gap-2">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>Suporte 24/7</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>R$ {((WEBSITE_PRICE + hostingPrice) / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Parcelamento</span>
                    <span>Sem juros no Mercado Pago</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-slate-900 pt-4 border-t border-slate-200">
                    <span>Total</span>
                    <span>R$ {(totalPrice / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                <p className="font-semibold mb-1">Responsabilidades:</p>
                <ul className="space-y-1 ml-3">
                  <li>• Você fornece conteúdo (textos e imagens)</li>
                  <li>• Você registra o domínio</li>
                  <li>• Nós fazemos o apontamento de DNS</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
