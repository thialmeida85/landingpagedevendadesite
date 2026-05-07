import { Resend } from "resend";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
  orderId: number;
  websitePrice: number;
  hostingPlan: string;
  hostingPrice: number;
  totalPrice: number;
}

/**
 * Send confirmation email to customer
 */
export async function sendCustomerConfirmationEmail(data: EmailData): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn("[EMAIL] RESEND_API_KEY not configured. Email not sent.");
      return false;
    }

    const tutorialUrl = `${process.env.VITE_APP_URL || "http://localhost:3000"}/dns-tutorial`;
    
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%); color: white; padding: 20px; border-radius: 8px; }
    .section { margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px; }
    .button { display: inline-block; background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%); color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin: 10px 0; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Obrigado por sua compra!</h2>
    </div>
    
    <p>Olá <strong>${data.customerName}</strong>,</p>
    
    <p>Recebemos seu pedido com sucesso. Aqui estão os detalhes:</p>
    
    <div class="section">
      <h3>📋 Detalhes do Pedido</h3>
      <ul>
        <li><strong>Número do Pedido:</strong> #${data.orderId}</li>
        <li><strong>Site Institucional:</strong> R$ ${(data.websitePrice / 100).toFixed(2)}</li>
        <li><strong>Hospedagem (${data.hostingPlan === "1year" ? "1 ano" : data.hostingPlan === "2years" ? "2 anos" : "3 anos"}):</strong> R$ ${(data.hostingPrice / 100).toFixed(2)}</li>
        <li><strong>Total:</strong> R$ ${(data.totalPrice / 100).toFixed(2)}</li>
      </ul>
    </div>
    
    <div class="section">
      <h3>📝 Próximos Passos</h3>
      <ol>
        <li>Envie seu material (textos, imagens, informações) via WhatsApp ou email</li>
        <li>Nosso time iniciará o desenvolvimento do seu site</li>
        <li>Prazo de entrega: 15 dias após recebimento do material</li>
        <li>Você receberá seu site pronto para publicar</li>
      </ol>
    </div>
    
    <div class="section">
      <h3>🌐 Tutorial de DNS</h3>
      <p>Precisa apontar seu domínio para a hospedagem? Acesse nosso tutorial passo a passo:</p>
      <a href="${tutorialUrl}" class="button">Ver Tutorial de DNS</a>
    </div>
    
    <div class="section">
      <h3>💬 Dúvidas?</h3>
      <p>Entre em contato conosco via WhatsApp: <strong>+55 12 99610-3765</strong></p>
      <p>Ou por email: <strong>contato@verticale.com.br</strong></p>
    </div>
    
    <div class="footer">
      <p>Obrigado por escolher a Verticale!</p>
      <p>© 2026 Verticale - Todos os direitos reservados</p>
    </div>
  </div>
</body>
</html>
    `;

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@verticale.com.br",
      to: data.customerEmail,
      subject: `Confirmação de Pedido #${data.orderId} - Verticale`,
      html: emailContent,
    });

    if (result.error) {
      console.error("[EMAIL] Failed to send customer confirmation:", result.error);
      return false;
    }

    console.log(`[EMAIL] Customer confirmation sent to ${data.customerEmail}`);
    return true;
  } catch (error) {
    console.error("[EMAIL] Failed to send customer confirmation:", error);
    return false;
  }
}

/**
 * Send notification email to owner with customer details
 */
export async function sendOwnerNotificationEmail(data: EmailData): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY || !process.env.OWNER_EMAIL) {
      console.warn("[EMAIL] RESEND_API_KEY or OWNER_EMAIL not configured. Owner notification not sent.");
      return false;
    }

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%); color: white; padding: 20px; border-radius: 8px; }
    .section { margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px; }
    .highlight { background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎉 Novo Pedido Recebido!</h2>
    </div>
    
    <div class="highlight">
      <strong>Pedido #${data.orderId}</strong> - R$ ${(data.totalPrice / 100).toFixed(2)}
    </div>
    
    <div class="section">
      <h3>👤 Dados do Cliente</h3>
      <ul>
        <li><strong>Nome:</strong> ${data.customerName}</li>
        <li><strong>Email:</strong> ${data.customerEmail}</li>
        <li><strong>Telefone/WhatsApp:</strong> ${data.customerPhone}</li>
        <li><strong>Empresa:</strong> ${data.customerCompany || "Não informado"}</li>
      </ul>
    </div>
    
    <div class="section">
      <h3>💰 Detalhes do Pedido</h3>
      <ul>
        <li><strong>Site Institucional:</strong> R$ ${(data.websitePrice / 100).toFixed(2)}</li>
        <li><strong>Hospedagem (${data.hostingPlan === "1year" ? "1 ano" : data.hostingPlan === "2years" ? "2 anos" : "3 anos"}):</strong> R$ ${(data.hostingPrice / 100).toFixed(2)}</li>
        <li><strong>Total:</strong> R$ ${(data.totalPrice / 100).toFixed(2)}</li>
      </ul>
    </div>
    
    <div class="section">
      <h3>✅ Ação Necessária</h3>
      <ol>
        <li>Entre em contato com o cliente para confirmar os detalhes</li>
        <li>Solicite o material (textos, imagens, informações)</li>
        <li>Agende o início do desenvolvimento</li>
        <li>Acompanhe o prazo de 15 dias</li>
      </ol>
    </div>
  </div>
</body>
</html>
    `;

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@verticale.com.br",
      to: process.env.OWNER_EMAIL,
      subject: `Novo Pedido #${data.orderId} - ${data.customerName}`,
      html: emailContent,
    });

    if (result.error) {
      console.error("[EMAIL] Failed to send owner notification:", result.error);
      return false;
    }

    console.log(`[EMAIL] Owner notification sent for order ${data.orderId}`);
    return true;
  } catch (error) {
    console.error("[EMAIL] Failed to send owner notification:", error);
    return false;
  }
}

/**
 * Send email with DNS tutorial link
 */
export async function sendDNSTutorialEmail(
  customerEmail: string,
  customerName: string,
  tutorialUrl: string
): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn("[EMAIL] RESEND_API_KEY not configured. DNS tutorial email not sent.");
      return false;
    }

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .button { display: inline-block; background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%); color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <h2>🌐 Tutorial: Apontamento de DNS</h2>
    <p>Olá ${customerName},</p>
    
    <p>Aqui está o link para o tutorial de apontamento de DNS:</p>
    <p><a href="${tutorialUrl}" class="button">Acessar Tutorial</a></p>
    
    <p>Se tiver dúvidas, entre em contato via WhatsApp: <strong>+55 12 99610-3765</strong></p>
    
    <p>Obrigado,<br/>Verticale</p>
  </div>
</body>
</html>
    `;

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@verticale.com.br",
      to: customerEmail,
      subject: "Tutorial: Apontamento de DNS - Verticale",
      html: emailContent,
    });

    if (result.error) {
      console.error("[EMAIL] Failed to send DNS tutorial:", result.error);
      return false;
    }

    console.log(`[EMAIL] DNS tutorial sent to ${customerEmail}`);
    return true;
  } catch (error) {
    console.error("[EMAIL] Failed to send DNS tutorial:", error);
    return false;
  }
}
