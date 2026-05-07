import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Lock, User, ArrowLeft } from "lucide-react";

const LOGO_URL = "/manus-storage/Ativo13_5e8a3b2c.png";

export default function AuthPage() {
  const [, navigate] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      if (!isLogin) {
        // Validações para cadastro
        if (!formData.name.trim()) {
          setError("Nome é obrigatório");
          setLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("As senhas não conferem");
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError("A senha deve ter pelo menos 6 caracteres");
          setLoading(false);
          return;
        }
      }

      // Simulação de autenticação
      // Em produção, isso seria uma chamada tRPC
      console.log("Auth attempt:", { isLogin, ...formData });

      // Simular sucesso
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao processar");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex flex-col">
      {/* Header */}
      <div className="p-4 md:p-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <img src={LOGO_URL} alt="Verticale" className="h-12 w-auto mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-900">
              {isLogin ? "Bem-vindo de Volta" : "Criar Conta"}
            </h1>
            <p className="text-slate-600 mt-2">
              {isLogin
                ? "Acesse sua conta para gerenciar seus projetos"
                : "Crie uma conta para começar"}
            </p>
          </div>

          {/* Card */}
          <Card className="p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome (apenas cadastro) */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <Input
                      type="text"
                      name="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-900">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-900">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Confirmar Senha (apenas cadastro) */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-900">
                    Confirmar Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Erro */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2.5 font-semibold rounded-lg transition disabled:opacity-50"
              >
                {loading ? "Processando..." : isLogin ? "Entrar" : "Criar Conta"}
              </Button>

              {/* Toggle */}
              <div className="text-center">
                <p className="text-slate-600 text-sm">
                  {isLogin ? "Não tem conta? " : "Já tem conta? "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setFormData({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                      });
                      setError("");
                    }}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition"
                  >
                    {isLogin ? "Cadastre-se" : "Faça Login"}
                  </button>
                </p>
              </div>
            </form>
          </Card>

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center text-sm text-blue-900">
            <p>
              Nota: Este é um formulário de demonstração. Em produção, será integrado com autenticação real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
