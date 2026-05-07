import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [hostingPlan, setHostingPlan] = useState<'1year' | '2years' | '3years' | null>(null);

  // Pricing
  const websitePrice = 1500;
  const hostingPrices = {
    "1year": 150,
    "2years": 250,
    "3years": 380,
  };

  const hostingPrice = hostingPlan ? hostingPrices[hostingPlan] : 0;
  const totalPrice = websitePrice + hostingPrice;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (!hostingPlan) {
      setError("Por favor, selecione um plano de hospedagem");
      return;
    }

    setLoading(true);

    try {
      // Call backend to create Mercado Pago preference
      const response = await fetch("/api/trpc/checkout.createPreference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerCompany: formData.company,
          hostingPlan,
          totalAmount: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao processar pagamento");
      }

      const data = await response.json();

      // Redirect to Mercado Pago or success page
      if (data.result?.init_point) {
        window.location.href = data.result.init_point;
      } else if (data.result?.orderId) {
        // Fallback: redirect to success page
        window.location.href = `/success?order_id=${data.result.orderId}`;
      } else {
        throw new Error("Erro ao gerar link de pagamento");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar pagamento");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <button
          onClick={() => setLocation("/")}
          className="text-slate-600 hover:text-slate-900 mb-6 font-semibold"
        >
          ← Voltar
        </button>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Finalize sua compra</h1>
        <p className="text-slate-600">Preencha os dados abaixo e escolha seu plano de hospedagem</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {/* Customer Info */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Dados Pessoais</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-700 font-semibold">
                      Nome Completo *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-semibold">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-slate-700 font-semibold">
                      Telefone/WhatsApp *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-slate-700 font-semibold">
                      Empresa/Negócio
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Nome da sua empresa"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Hosting Plans */}
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Escolha seu Plano de Hospedagem
                </h2>

                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>O que é hospedagem?</strong> É o serviço que mantém seu site online 24/7. Inclui 3 e-mails profissionais de 1GB cada na plataforma E-mail Titan com seu domínio.
                  </p>
                </div>

                <RadioGroup value={hostingPlan || ""} onValueChange={(value) => setHostingPlan(value as any)}>
                  <div className="space-y-4">
                    {[
                      { plan: "1year", duration: "1 ano", price: 150 },
                      { plan: "2years", duration: "2 anos", price: 250 },
                      { plan: "3years", duration: "3 anos", price: 380 },
                    ].map((option) => (
                      <div
                        key={option.plan}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                          hostingPlan === option.plan
                            ? "border-purple-600 bg-purple-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <RadioGroupItem value={option.plan} id={option.plan} />
                          <div className="flex-1">
                            <Label htmlFor={option.plan} className="cursor-pointer font-semibold text-slate-900">
                              Hospedagem por {option.duration}
                            </Label>
                            <p className="text-sm text-slate-600">
                              3 e-mails profissionais de 1GB na E-mail Titan
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-purple-600">
                              R$ {option.price}
                            </p>
                            <p className="text-xs text-slate-600">
                              {(option.price / (parseInt(option.plan.charAt(0)) || 1)).toFixed(2)}/mês
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                {/* Competitor Comparison */}
                <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <p className="text-sm font-semibold text-slate-900 mb-3">
                    📊 Comparação com concorrentes:
                  </p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Hostgator: R$ 200-400/ano (sem e-mail profissional)</li>
                    <li>• Bluehost: R$ 150-350/ano (suporte em inglês)</li>
                    <li>• Locaweb: R$ 300-500/ano (sem e-mail Titan)</li>
                    <li>• <strong>Nós: R$ 150-380/ano + 3 e-mails Titan profissionais</strong></li>
                  </ul>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-800">{error}</p>
                </div>
              )}
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Resumo do Pedido</h3>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-slate-600">Site Institucional</span>
                  <span className="font-semibold text-slate-900">R$ {websitePrice.toFixed(2)}</span>
                </div>

                {hostingPlan && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">
                      Hospedagem ({hostingPlan === "1year" ? "1 ano" : hostingPlan === "2years" ? "2 anos" : "3 anos"})
                    </span>
                    <span className="font-semibold text-slate-900">
                      R$ {hostingPrice.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-3xl font-bold text-purple-600">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Parcelamento disponível via Mercado Pago
                </p>
              </div>

              {/* Features */}
              <div className="mb-6 space-y-3 pb-6 border-b">
                <div className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-slate-600">Pagamento seguro</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-slate-600">Pix, cartão, boleto</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-slate-600">Suporte via WhatsApp</span>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-slate-600">Entrega em 15 dias</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={loading || !hostingPlan}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-6 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  "Ir para Pagamento"
                )}
              </Button>

              <p className="text-xs text-slate-600 text-center mt-4">
                Você será redirecionado para o Mercado Pago para completar o pagamento de forma segura.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
