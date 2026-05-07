# Plataforma de Vendas de Sites - TODO

## ALTERAÇÕES SOLICITADAS (Prioridade Alta)

### Landing Page - Redesign

- [x] Hero section com promoção R$500 (site institucional ou landing page)
- [x] Opção clara: Site Institucional (home, sobre, serviços/portfólio, contato) OU Landing Page com link de pagamento
- [x] Remover botão "Ver Demonstração"
- [x] Deixar CLARO que hospedagem é OPCIONAL e paga à parte
- [x] Design MUITO mais sofisticado e elegante (não simples)
- [x] Seção de benefícios do serviço
- [x] Prova social com widgets realistas
- [x] Seção de detalhes do serviço
- [x] FAQ atualizada (resposta: "Temos VPS?" - Não, ainda não temos)
- [x] CTA destacado
- [x] Responsivo para mobile, tablet e desktop

### Página de Cadastro/Login

- [ ] Formulário de cadastro para novos clientes
- [ ] Formulário de login para clientes existentes
- [ ] Integração com banco de dados de clientes
- [ ] Validação de email e senha
- [ ] Design sofisticado e elegante

### Página de Checkout - Redesign

- [ ] Redesenhar com hospedagem como ADENDO OPCIONAL
- [ ] Exibição clara: "Deseja incluir hospedagem?"
- [ ] Explicação: "Hospedagem apenas para sites produzidos pela Agencia Verticale"
- [ ] Opções de hospedagem: R$150/1 ano, R$250/2 anos, R$380/3 anos
- [ ] Explicação clara do que é hospedagem e como funciona
- [ ] Formulário de dados do cliente
- [ ] Integração com Mercado Pago
- [ ] Tratamento de erros
- [ ] Design sofisticado e elegante

### Página de Sucesso

- [ ] Mensagem de confirmação clara
- [ ] Exibição dos dados do pedido (site + hospedagem se contratada)
- [ ] Link/botão para tutorial de DNS (apenas se hospedagem contratada)
- [ ] Informações sobre próximos passos
- [ ] Design sofisticado

## Banco de Dados

- [x] Schema de pedidos (orders)
- [x] Schema de clientes (customers)
- [x] Schema de pagamentos (payments)
- [x] Migrations executadas

## Integração com Mercado Pago

- [x] Configuração de credenciais (Access Token) - CONFIGURADO
- [x] Criação de preferência de pagamento
- [x] Webhook para confirmação de pagamento - implementado
- [x] Tratamento de status de pagamento
- [x] Registro de transação no banco de dados

## Automação de E-mails

- [x] Envio de e-mail de confirmação para o cliente
- [x] Envio de e-mail de confirmação para o proprietário
- [x] Integração com serviço de e-mail (Resend) - CONFIGURADO
- [x] Templates de e-mail profissionais
- [x] Tratamento de erros na entrega de e-mails

## Página de Tutorial de DNS

- [x] Tutorial passo a passo para Hostgator (padrão)
- [x] Menu dropdown com registradores: Registro.br, GoDaddy, Hostinger, Namecheap, UOL
- [x] Instruções específicas para cada registrador
- [x] Descrições claras
- [x] Design consistente

## Funcionalidades Adicionais

- [ ] Página de política de privacidade
- [ ] Página de termos e condições
- [ ] Suporte via WhatsApp (link)
- [ ] Google Analytics 4
- [ ] Meta Pixel para retargeting

## Testes e Validação

- [ ] Testes de fluxo de checkout completo
- [ ] Testes de integração com Mercado Pago
- [ ] Testes de envio de e-mails
- [ ] Testes de responsividade
- [ ] Testes de performance

## Deployment e Publicação

- [ ] Teste em ambiente de produção
- [ ] Publicação da plataforma
- [ ] Documentação de uso e manutenção
