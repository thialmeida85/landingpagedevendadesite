import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [, setLocation] = useLocation();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setOrderId(params.get("order_id"));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card className="p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Pagamento Confirmado!
          </h1>

          <p className="text-xl text-slate-600 mb-8">
            Obrigado por contratar nossos serviços. Seu pedido foi recebido com sucesso.
          </p>

          {/* Order Details */}
          <Card className="bg-slate-50 p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Detalhes do Seu Pedido
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Número do Pedido:</span>
                <span className="font-semibold text-slate-900">
                  {orderId || "Processando..."}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Serviço:</span>
                <span className="font-semibold text-slate-900">
                  Site Institucional + Hospedagem
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Status:</span>
                <span className="font-semibold text-green-600">
                  ✓ Aprovado
                </span>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-slate-900 mb-4">
              Próximos Passos
            </h3>
            <ol className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
                <span>
                  Você receberá um e-mail de confirmação com os detalhes do seu pedido
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
                <span>
                  Envie seu material (textos, imagens, informações) via e-mail ou WhatsApp
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
                <span>
                  Nosso time iniciará o desenvolvimento do seu site (prazo: 15 dias)
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
                <span>
                  Você receberá seu site pronto para publicar
                </span>
              </li>
            </ol>
          </div>

          {/* DNS Tutorial */}
          <div className="mb-8">
            <p className="text-slate-600 mb-4">
              Precisa apontar seu domínio para a hospedagem? Temos um tutorial passo a passo:
            </p>
            <Button
              onClick={() => setLocation("/dns-tutorial")}
              variant="outline"
              size="lg"
              className="w-full md:w-auto"
            >
              Ver Tutorial de DNS <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Contact Info */}
          <div className="border-t pt-8">
            <p className="text-slate-600 mb-4">
              Dúvidas? Entre em contato conosco:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open("https://wa.me/5512996103765", "_blank")}
                className="bg-green-600 hover:bg-green-700"
              >
                💬 WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = "mailto:contato@verticale.com.br"}
              >
                📧 Email
              </Button>
            </div>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Button
            onClick={() => setLocation("/")}
            variant="ghost"
            className="text-slate-600 hover:text-slate-900"
          >
            ← Voltar para a página inicial
          </Button>
        </div>
      </div>
    </div>
  );
}
