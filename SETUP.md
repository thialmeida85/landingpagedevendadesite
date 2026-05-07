# Plataforma de Vendas de Sites - Guia de Setup

## 🚀 Visão Geral

Sistema completo de venda de sites institucionais com integração de pagamentos via Mercado Pago e automação de e-mails.

**URL de Produção:** `https://agenciaverticale.com.br`
**Checkout:** `/checkout` (acessível via landing page)

## 📋 Requisitos

- Node.js 22+
- pnpm 10+
- MySQL/TiDB database
- Credenciais do Mercado Pago
- API Key do Resend

## 🔧 Configuração Inicial

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# ============================================
# MERCADO PAGO - Integração de Pagamentos
# ============================================
MERCADO_PAGO_ACCESS_TOKEN=seu_access_token_aqui
MERCADO_PAGO_PUBLIC_KEY=sua_public_key_aqui

# ============================================
# RESEND - Serviço de Email
# ============================================
RESEND_API_KEY=seu_api_key_resend_aqui
RESEND_FROM_EMAIL=noreply@verticale.com.br
OWNER_EMAIL=seu_email@verticale.com.br

# ============================================
# URL da Aplicação
# ============================================
VITE_APP_URL=https://agenciaverticale.com.br
```

### 2. Obter Credenciais do Mercado Pago

1. Acesse https://www.mercadopago.com.br/developers/panel
2. Crie uma nova aplicação com os seguintes dados:
   - **Nome:** Agencia Verticale
   - **Descrição:** Plataforma de venda de sites
   - **Categoria:** Serviços de consultoria
   - **URL de Produção:** https://agenciaverticale.com.br
   - **Tipo de Integração:** Checkout Pro
   - **URL de Redirecionamento:** https://agenciaverticale.com.br/site500

3. Copie o **Access Token** e a **Public Key**

### 3. Obter API Key do Resend

1. Acesse https://resend.com
2. Crie uma conta (gratuita com 100 emails/dia)
3. Vá para "API Keys"
4. Copie a chave (começa com `re_`)

### 4. Verificar Domínio no Resend (Opcional mas Recomendado)

Para enviar e-mails de um domínio customizado (ex: noreply@verticale.com.br):

1. Acesse https://resend.com/domains
2. Clique em "Add Domain"
3. Adicione seu domínio (verticale.com.br)
4. Siga as instruções para adicionar registros DNS
5. Após verificação, atualize `RESEND_FROM_EMAIL` no `.env`

### 5. Instalar Dependências

```bash
pnpm install
```

### 5. Configurar Banco de Dados

As migrations já foram executadas. Se precisar reiniciar:

```bash
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

## 🏃 Executar em Desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📱 Estrutura de Páginas

| Página | URL | Descrição |
|--------|-----|-----------|
| Landing Page | `/` | Página inicial com informações do serviço |
| Checkout | `/checkout` | Formulário de pedido e pagamento |
| Sucesso | `/success` | Confirmação de pedido |
| Tutorial DNS | `/dns-tutorial` | Instruções de apontamento de domínio |

## 🔗 Fluxo de Pagamento

1. **Cliente acessa:** `agenciaverticale.com.br` (landing page)
2. **Clica em "Quero Meu Site Agora":** Redireciona para `/checkout`
3. **Preenche formulário:** Nome, email, telefone, empresa, plano de hospedagem
4. **Clica em "Pagar":** Sistema cria preferência no Mercado Pago
5. **Redirecionado:** Para checkout do Mercado Pago
6. **Após pagamento:** Webhook confirma e envia e-mails
7. **Cliente recebe:** E-mail de confirmação com próximos passos

## 🔐 Configuração do Webhook

**Endpoint:** `https://agenciaverticale.com.br/webhook/payments`

**Configuração no Mercado Pago:**

1. Acesse o painel do Mercado Pago
2. Vá para "Notificações"
3. Clique em "Adicionar notificação"
4. Preencha:
   - **URL:** `https://agenciaverticale.com.br/webhook/payments`
   - **Eventos:** Selecione `payment.created` e `payment.updated`
5. Clique em "Salvar"

**Validação de Assinatura:**

O webhook valida automaticamente as requisições usando a chave secreta configurada em `MERCADO_PAGO_WEBHOOK_SECRET`.

## 📧 Automação de E-mails

### E-mail ao Cliente

- **Quando:** Após pagamento confirmado
- **Conteúdo:** 
  - Confirmação do pedido
  - Detalhes do pagamento
  - Link para tutorial de DNS
  - Próximos passos

### E-mail ao Proprietário

- **Quando:** Após pagamento confirmado
- **Conteúdo:**
  - Dados do cliente
  - Detalhes do pedido
  - Ações necessárias

## 🪝 Webhook do Mercado Pago

**Endpoint:** `/api/webhook/mercadopago`

**Configuração:**

1. Acesse o painel do Mercado Pago
2. Vá para "Notificações"
3. Adicione URL: `https://agenciaverticale.com.br/api/webhook/mercadopago`
4. Selecione eventos: `payment.created`, `payment.updated`

**Nota:** O webhook será chamado automaticamente após o pagamento ser confirmado no Mercado Pago.

**Teste do Webhook:**

Para testar o webhook em desenvolvimento, use:

```bash
curl -X POST http://localhost:3000/webhook/payments \
  -H "Content-Type: application/json" \
  -d '{
    "type": "payment",
    "data": {
      "id": "123456789",
      "status": "approved",
      "external_reference": "order_1"
    }
  }'
```

## 💾 Banco de Dados

### Tabelas

- **customers:** Dados dos clientes
- **orders:** Pedidos de sites
- **payments:** Transações de pagamento

### Consultas Úteis

```sql
-- Ver todos os pedidos
SELECT o.*, c.name, c.email FROM orders o 
JOIN customers c ON o.customerId = c.id;

-- Ver pedidos aprovados
SELECT * FROM orders WHERE paymentStatus = 'approved';

-- Ver pagamentos pendentes
SELECT * FROM payments WHERE status = 'pending';
```

## 🧪 Testes

```bash
# Executar testes
pnpm test

# Modo watch
pnpm test --watch
```

## 📦 Build para Produção

```bash
pnpm build
pnpm start
```

## 🐛 Troubleshooting

### E-mails não estão sendo enviados

- Verifique se `RESEND_API_KEY` está preenchido
- Verifique se `OWNER_EMAIL` está correto
- Verifique os logs do servidor

### Pagamento não redireciona

- Verifique se `MERCADO_PAGO_ACCESS_TOKEN` está correto
- Verifique se a URL de redirecionamento está configurada no Mercado Pago
- Verifique se `VITE_APP_URL` está correto

### Webhook não funciona

- Verifique se a URL está acessível publicamente
- Verifique se a URL está configurada corretamente no Mercado Pago
- Verifique os logs do servidor para erros

## 📚 Documentação Adicional

- [Mercado Pago Docs](https://www.mercadopago.com.br/developers/pt)
- [Resend Docs](https://resend.com/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [tRPC](https://trpc.io/)

## 📞 Suporte

- WhatsApp: +55 12 99610-3765
- Email: contato@verticale.com.br

---

**Versão:** 1.0.0  
**Última atualização:** Maio 2026
