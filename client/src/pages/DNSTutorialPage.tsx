import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function DNSTutorialPage() {
  const [, setLocation] = useLocation();
  const [registrar, setRegistrar] = useState("hostgator");

  const tutorials = {
    hostgator: {
      name: "Hostgator",
      steps: [
        {
          title: "Acesse sua conta Hostgator",
          description:
            "Faça login em www.hostgator.com.br com seu email e senha",
        },
        {
          title: "Vá para Gerenciar Domínios",
          description:
            "No painel de controle, clique em 'Domínios' e depois em 'Gerenciar Domínios'",
        },
        {
          title: "Selecione seu domínio",
          description: "Encontre e clique no domínio que deseja apontar",
        },
        {
          title: "Acesse as configurações de DNS",
          description:
            "Clique em 'Gerenciar DNS' ou 'Zona DNS' (pode variar conforme a interface)",
        },
        {
          title: "Adicione os registros A",
          description:
            "Procure pelos registros A existentes e atualize o IP para o servidor da sua hospedagem",
        },
        {
          title: "Salve as alterações",
          description:
            "Clique em 'Salvar' ou 'Atualizar'. As mudanças podem levar até 48 horas para propagar",
        },
      ],
    },
    registrobr: {
      name: "Registro.br",
      steps: [
        {
          title: "Acesse o Painel do Registro.br",
          description: "Faça login em https://dcc.registro.br com suas credenciais",
        },
        {
          title: "Selecione seu domínio",
          description:
            "Na lista de domínios, clique no domínio que deseja configurar",
        },
        {
          title: "Vá para Editar Zona de DNS",
          description:
            "No menu lateral, procure por 'Editar zona de DNS' ou 'Gerenciar DNS'",
        },
        {
          title: "Configure os nameservers",
          description:
            "Você pode apontar para os nameservers da sua hospedagem ou configurar registros A manualmente",
        },
        {
          title: "Insira os dados corretos",
          description:
            "Adicione os IPs fornecidos pela sua hospedagem nos registros A",
        },
        {
          title: "Salve as alterações",
          description:
            "Clique em 'Salvar'. A propagação pode levar até 48 horas",
        },
      ],
    },
    godaddy: {
      name: "GoDaddy",
      steps: [
        {
          title: "Acesse sua conta GoDaddy",
          description: "Faça login em www.godaddy.com com seu email e senha",
        },
        {
          title: "Vá para Meus Produtos",
          description: "Clique em 'Meus Produtos' no menu superior",
        },
        {
          title: "Selecione seu domínio",
          description: "Encontre seu domínio na lista e clique em 'Gerenciar'",
        },
        {
          title: "Acesse as Configurações de DNS",
          description:
            "Procure por 'Configurações de DNS' ou 'Gerenciar DNS' na página do domínio",
        },
        {
          title: "Edite os registros A",
          description:
            "Clique em editar para os registros A e insira o IP da sua hospedagem",
        },
        {
          title: "Salve e aguarde",
          description:
            "Clique em 'Salvar'. As mudanças podem levar até 48 horas para propagar",
        },
      ],
    },
    hostinger: {
      name: "Hostinger",
      steps: [
        {
          title: "Acesse o Painel Hostinger",
          description: "Faça login em www.hostinger.com.br com suas credenciais",
        },
        {
          title: "Vá para Domínios",
          description: "No menu lateral, clique em 'Domínios'",
        },
        {
          title: "Selecione seu domínio",
          description: "Clique no domínio que deseja configurar",
        },
        {
          title: "Acesse Gerenciar DNS",
          description:
            "Procure por 'Gerenciar DNS' ou 'Configurações de DNS'",
        },
        {
          title: "Configure os registros",
          description:
            "Adicione ou edite os registros A com o IP da sua hospedagem",
        },
        {
          title: "Salve as alterações",
          description:
            "Clique em 'Salvar'. A propagação pode levar até 48 horas",
        },
      ],
    },
    namecheap: {
      name: "Namecheap",
      steps: [
        {
          title: "Acesse sua conta Namecheap",
          description: "Faça login em www.namecheap.com com seu email e senha",
        },
        {
          title: "Vá para Dashboard",
          description: "Clique em 'Dashboard' no menu superior",
        },
        {
          title: "Selecione seu domínio",
          description: "Encontre seu domínio e clique em 'Manage'",
        },
        {
          title: "Acesse Advanced DNS",
          description: "Clique na aba 'Advanced DNS'",
        },
        {
          title: "Edite os registros A",
          description:
            "Procure pelos registros A e atualize com o IP da sua hospedagem",
        },
        {
          title: "Salve as alterações",
          description:
            "Clique em 'Save'. As mudanças podem levar até 48 horas para propagar",
        },
      ],
    },
    uol: {
      name: "UOL",
      steps: [
        {
          title: "Acesse o Painel UOL",
          description: "Faça login em seu painel de controle UOL",
        },
        {
          title: "Vá para Domínios",
          description: "Procure pela seção de 'Domínios' ou 'Meus Domínios'",
        },
        {
          title: "Selecione seu domínio",
          description: "Clique no domínio que deseja configurar",
        },
        {
          title: "Acesse Configurações de DNS",
          description:
            "Procure por 'Configurações de DNS' ou 'Gerenciar DNS'",
        },
        {
          title: "Configure os registros A",
          description:
            "Adicione ou edite os registros A com o IP fornecido pela hospedagem",
        },
        {
          title: "Salve as alterações",
          description:
            "Clique em 'Salvar'. A propagação pode levar até 48 horas",
        },
      ],
    },
  };

  const currentTutorial = tutorials[registrar as keyof typeof tutorials];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <Button
          onClick={() => setLocation("/")}
          variant="ghost"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Tutorial: Apontamento de DNS
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          Aprenda como apontar seu domínio para a hospedagem em alguns passos simples
        </p>

        {/* Registrar Selector */}
        <Card className="p-6 mb-8">
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Selecione seu registrador de domínio:
          </label>
          <Select value={registrar} onValueChange={setRegistrar}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hostgator">🌐 Hostgator</SelectItem>
              <SelectItem value="registrobr">🇧🇷 Registro.br</SelectItem>
              <SelectItem value="godaddy">🔵 GoDaddy</SelectItem>
              <SelectItem value="hostinger">🏠 Hostinger</SelectItem>
              <SelectItem value="namecheap">💰 Namecheap</SelectItem>
              <SelectItem value="uol">📱 UOL</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Tutorial Steps */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {currentTutorial.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {currentTutorial.name}
              </h2>
              <p className="text-slate-600">
                Siga os passos abaixo para apontar seu domínio
              </p>
            </div>
          </div>

          {currentTutorial.steps.map((step, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Important Info */}
        <Card className="bg-yellow-50 border border-yellow-200 p-6 mt-8">
          <h3 className="font-semibold text-slate-900 mb-3">
            ⚠️ Informações Importantes
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li>
              • <strong>Propagação de DNS:</strong> As mudanças podem levar até 48 horas para se propagar completamente
            </li>
            <li>
              • <strong>IP da Hospedagem:</strong> Certifique-se de usar o IP correto fornecido pela sua hospedagem
            </li>
            <li>
              • <strong>Registros A:</strong> Geralmente você precisa atualizar o registro A principal (sem subdomínio)
            </li>
            <li>
              • <strong>WWW:</strong> Se quiser que www.seudominio.com funcione, configure um registro A ou CNAME também
            </li>
          </ul>
        </Card>

        {/* Support */}
        <Card className="bg-blue-50 border border-blue-200 p-6 mt-8">
          <h3 className="font-semibold text-slate-900 mb-3">
            💬 Precisa de ajuda?
          </h3>
          <p className="text-slate-700 mb-4">
            Se tiver dúvidas durante o processo, entre em contato conosco via WhatsApp:
          </p>
          <Button
            onClick={() => window.open("https://wa.me/5512996103765", "_blank")}
            className="bg-green-600 hover:bg-green-700"
          >
            💬 Falar com Suporte
          </Button>
        </Card>
      </div>
    </div>
  );
}
