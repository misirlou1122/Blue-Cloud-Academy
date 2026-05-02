"use strict";

const endpoint = (process.env.TRANSLATOR_ENDPOINT || "https://api.cognitive.microsofttranslator.com").trim().replace(/\/+$/, "");
const key = (process.env.TRANSLATOR_KEY || "").trim();
const region = (process.env.TRANSLATOR_REGION || "").trim().toLowerCase();
const protectedTerms = [
  "Blue Cloud Academy",
  "Microsoft Azure",
  "Microsoft Entra ID",
  "Microsoft Entra Domain Services",
  "Microsoft Entra External ID",
  "Microsoft Defender for Cloud",
  "Microsoft Sentinel",
  "Microsoft Purview",
  "Azure Resource Manager Templates",
  "Azure Resource Manager",
  "Azure Virtual Desktop",
  "Azure Container Instances",
  "Azure Kubernetes Service",
  "Azure Container Apps",
  "Azure SQL Database",
  "Azure Cosmos DB",
  "Azure Database for PostgreSQL",
  "Azure Database for MySQL",
  "Azure Cache for Redis",
  "Azure Data Lake Storage",
  "Azure Monitor Alerts",
  "Azure Monitor Metrics",
  "Azure Monitor Logs",
  "Azure Monitor",
  "Azure Functions",
  "Azure App Service",
  "Azure Blob Storage",
  "Blob Storage",
  "Azure Files",
  "Azure Data Box",
  "Azure Backup",
  "Azure Site Recovery",
  "Azure Load Balancer",
  "Azure Application Gateway",
  "Azure Front Door",
  "Azure Traffic Manager",
  "Azure Firewall",
  "Azure Bastion",
  "Azure Private Link",
  "Azure Key Vault",
  "Azure DDoS Protection",
  "Azure Cost Management",
  "Azure Marketplace",
  "Azure Blueprints",
  "Azure Portal",
  "Azure CLI",
  "Azure PowerShell",
  "Azure Cloud Shell",
  "Cloud Shell",
  "Azure Arc",
  "Azure Advisor",
  "Azure Status",
  "Service Health",
  "Resource Health",
  "Application Insights",
  "Log Analytics",
  "Pricing Calculator",
  "TCO Calculator",
  "Storage Explorer",
  "VPN Gateway",
  "ExpressRoute",
  "VNet Peering",
  "Network Security Group",
  "Availability Zones",
  "Availability Zone",
  "IaaS",
  "PaaS",
  "SaaS",
  "SLA",
  "SLAs",
  "VM",
  "VMs",
  "VNet",
  "VNets",
  "RBAC",
  "MFA",
  "DNS",
  "SMB",
  "RDP",
  "SSH",
  "AKS",
  "ARM",
  "Bicep",
  "AzCopy",
  "CapEx",
  "OpEx",
  "Zero Trust"
].sort((a, b) => b.length - a.length);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function protectTerms(text) {
  return protectedTerms.reduce((result, term) => {
    const pattern = new RegExp(`\\b${escapeRegExp(term)}\\b`, "g");
    return result.replace(pattern, `<span class="notranslate">${term}</span>`);
  }, text);
}

function restoreTerms(text) {
  return text.replace(/<span class="notranslate">(.*?)<\/span>/g, "$1");
}

module.exports = async function translate(context, req) {
  if (!key || !region) {
    context.res = {
      status: 500,
      body: { error: "Translator is not configured." }
    };
    return;
  }

  const texts = Array.isArray(req.body?.texts)
    ? req.body.texts.filter((text) => typeof text === "string" && text.trim()).slice(0, 100)
    : [];
  const to = typeof req.body?.to === "string" ? req.body.to : "es";

  if (!texts.length) {
    context.res = { status: 200, body: { translations: {} } };
    return;
  }

  try {
    const response = await fetch(`${endpoint}/translate?api-version=3.0&to=${encodeURIComponent(to)}&textType=html`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": key,
        "Ocp-Apim-Subscription-Region": region
      },
      body: JSON.stringify(texts.map((text) => ({ Text: protectTerms(text) })))
    });

    if (!response.ok) {
      context.res = {
        status: response.status,
        body: { error: "Translator request failed." }
      };
      return;
    }

    const translated = await response.json();
    const translations = {};
    texts.forEach((text, index) => {
      translations[text] = restoreTerms(translated[index]?.translations?.[0]?.text || text);
    });

    context.res = {
      status: 200,
      headers: { "Cache-Control": "public, max-age=86400" },
      body: { translations }
    };
  } catch (error) {
    context.log(error);
    context.res = {
      status: 500,
      body: { error: "Translator request failed." }
    };
  }
};
