"use strict";

let touchStartX = 0;
let touchEndX = 0;
let translationRun = 0;
const languagePackCache = {};

const iconPaths = {
  cloud: '<path d="M17 18H8a5 5 0 1 1 1.3-9.8A7 7 0 0 1 23 10a4 4 0 0 1-1 8h-1"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/><path d="m3 18 9 5 9-5"/>',
  server: '<path d="M5 4h14v6H5z"/><path d="M5 14h14v6H5z"/><path d="M8 7h.01"/><path d="M8 17h.01"/>',
  network: '<path d="M12 4v5"/><path d="M6 20v-5h12v5"/><path d="M4 9h16v6H4z"/>',
  database: '<ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
  shield: '<path d="M12 3 20 7v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V7l8-4Z"/><path d="m9 12 2 2 4-5"/>',
  dollar: '<path d="M12 2v20"/><path d="M17 6.5c-1.2-1-2.9-1.5-5-1.5-3 0-5 1.4-5 3.5s2 3 5 3 5 .9 5 3-2 3.5-5 3.5c-2.3 0-4.2-.6-5.5-1.8"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.7 2.7-3-3 2.7-2.7Z"/>',
  chart: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5"/><path d="M12 16V8"/><path d="M16 16v-3"/>',
  exam: '<path d="M8 4h10v16H6V6a2 2 0 0 1 2-2Z"/><path d="M9 9h6"/><path d="M9 13h6"/><path d="M9 17h4"/>',
  cards: '<rect x="4" y="7" width="13" height="14" rx="2"/><path d="M8 3h10a2 2 0 0 1 2 2v12"/><path d="M8 12h5"/><path d="M8 16h3"/>',
  star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
  back: '<path d="M15 18 9 12l6-6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 10v6"/><path d="M12 7h.01"/>',
  next: '<path d="m9 18 6-6-6-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
};

const topics = [
  {
    id: "exam",
    title: "Final Exam Map",
    icon: "exam",
    color: "#ff9d2e",
    lessons: [
      {
        title: "What The Test Rewards",
        body: [
          "Your final is built around AZ-900: Microsoft Azure Fundamentals. The current Microsoft exam areas are cloud concepts, Azure architecture and services, and Azure management and governance.",
          "Think like a beginner cloud consultant. Most questions ask you to identify the right service, model, tool, or boundary from a short example.",
          "For pacing, practice answering 45 questions in about 45 minutes. That gives you one minute per question, with a little room to mark and revisit harder ones."
        ],
        remember: "If two answers sound similar, ask: is the question about identity, networking, cost, governance, deployment, or monitoring?"
      },
      {
        title: "Microsoft Objective Weights",
        body: [
          "Cloud concepts are 25-30% of the exam. Know cloud models, service models, consumption pricing, high availability, scalability, reliability, and shared responsibility.",
          "Azure architecture and services are 35-40%. This is the biggest section: regions, availability zones, resource groups, subscriptions, compute, networking, storage, identity, and security.",
          "Management and governance are 30-35%. Expect cost tools, Azure Policy, resource locks, Purview, Cloud Shell, ARM templates, Azure Arc, Advisor, Service Health, and Monitor."
        ],
        remember: "Spend the most reps on architecture/services, then governance, then cloud concepts."
      },
      {
        title: "Fast Answer Pattern",
        body: [
          "Read the last sentence first. It usually tells you what role the answer must play: estimate cost, control access, prevent deletion, deploy repeatably, or monitor health.",
          "Eliminate tool mismatches. Pricing Calculator estimates Azure cost. TCO Calculator compares on-premises cost to Azure. Azure Policy audits/enforces rules. RBAC grants permissions.",
          "When stuck, pick the answer with the narrowest match to the example. Fundamentals questions usually reward direct service recognition."
        ],
        remember: "Question verb + Azure service purpose = answer."
      }
    ]
  },
  {
    id: "cloud",
    title: "Cloud Concepts",
    icon: "cloud",
    lessons: [
      {
        title: "What Cloud Computing Means",
        body: [
          "Cloud computing is delivery of computing services over the internet. Those services include compute, storage, networking, databases, analytics, and software.",
          "Instead of buying all hardware up front, you rent capacity from a provider and scale it as demand changes.",
          "Azure is Microsoft cloud platform. You create resources, group them, secure them, monitor them, and pay based on usage and service choices."
        ],
        remember: "Cloud is renting flexible IT capacity over the internet instead of owning every physical layer yourself."
      },
      {
        title: "Public, Private, Hybrid",
        body: [
          "Public cloud is owned by a cloud provider and shared across many customers. It is fast to provision and usually has no capital expense to start.",
          "Private cloud is dedicated to one organization. The organization has more control, but also more responsibility for hardware and operations.",
          "Hybrid cloud combines public and private environments so workloads can run where compliance, latency, cost, or control fits best."
        ],
        remember: "Public = provider owned. Private = organization dedicated. Hybrid = both."
      },
      {
        title: "Consumption And Cost Models",
        body: [
          "Capital expenditure, or CapEx, is money spent up front on physical infrastructure. Operational expenditure, or OpEx, is ongoing spending for services as they are used.",
          "Cloud usually shifts spending toward OpEx because billing is based on actual usage, service tier, region, and configuration.",
          "The consumption-based model means you pay for what you use, can stop paying for resources you no longer need, and can scale spending with demand."
        ],
        remember: "AZ-900 loves this contrast: buying servers is CapEx; paying for running Azure resources is OpEx."
      }
    ]
  },
  {
    id: "benefits",
    title: "Cloud Benefits",
    icon: "star",
    lessons: [
      {
        title: "Availability And Reliability",
        body: [
          "High availability means keeping a service running with minimal downtime. Azure supports this with redundancy, regions, availability zones, and load balancing options.",
          "Reliability means a system can recover from failures and continue functioning. Design choices like region pairs, backups, and failover improve reliability.",
          "Predictability includes predictable performance and predictable cost. Cloud metrics, autoscale, and cost tools help make behavior easier to forecast."
        ],
        remember: "Availability is uptime. Reliability is recovery and continued function after failure."
      },
      {
        title: "Scalability And Elasticity",
        body: [
          "Scalability means adding or removing resources to meet demand. Scaling up means a bigger resource; scaling out means more resource instances.",
          "Elasticity is automatic or rapid scaling based on demand. You can add capacity during a spike and reduce it when demand falls.",
          "This is a major reason cloud beats fixed hardware: you do not need to buy for the highest possible peak all the time."
        ],
        remember: "Scale up = bigger. Scale out = more. Elastic = changes with demand."
      },
      {
        title: "Security, Governance, Manageability",
        body: [
          "Security in the cloud is shared between the provider and the customer. Azure provides secure infrastructure, but customers still configure access and protect data.",
          "Governance helps enforce standards across resources. Policies, locks, tags, and management groups make environments consistent.",
          "Manageability means you can create, configure, monitor, and automate cloud resources through the portal, CLI, PowerShell, APIs, and templates."
        ],
        remember: "Security protects. Governance controls. Manageability operates."
      }
    ]
  },
  {
    id: "service",
    title: "IaaS PaaS SaaS",
    icon: "layers",
    lessons: [
      {
        title: "Shared Responsibility",
        body: [
          "The shared responsibility model explains what Microsoft manages and what the customer manages.",
          "In all cloud models, customers are responsible for their data, accounts, and access. Microsoft is responsible for physical datacenters and hardware.",
          "As you move from IaaS to PaaS to SaaS, Microsoft manages more of the stack."
        ],
        remember: "Data, identities, and access are always important customer responsibilities."
      },
      {
        title: "Infrastructure As A Service",
        body: [
          "IaaS gives you the most control. You rent infrastructure like virtual machines, storage, and networking.",
          "You manage the operating system, installed software, patches, and application configuration.",
          "Use IaaS for lift-and-shift migrations, custom server setups, or when you need operating system control."
        ],
        remember: "IaaS feels closest to running your own servers, but the hardware is rented."
      },
      {
        title: "PaaS And SaaS",
        body: [
          "PaaS gives developers a managed platform for apps. Azure App Service and Azure Functions are common examples.",
          "With PaaS, you focus on application code and configuration while Azure manages much of the runtime and infrastructure.",
          "SaaS is complete software delivered over the internet, like Microsoft 365. Users consume the app and manage the least infrastructure."
        ],
        remember: "PaaS builds apps. SaaS uses apps."
      }
    ]
  },
  {
    id: "architecture",
    title: "Azure Architecture",
    icon: "server",
    lessons: [
      {
        title: "Regions And Zones",
        body: [
          "An Azure region is a geographic area that contains one or more datacenters. Regions help place resources near users and meet data residency needs.",
          "Availability zones are physically separate datacenters inside the same region. They have independent power, cooling, and networking.",
          "Region pairs are two regions in the same geography used for some replication and recovery patterns."
        ],
        remember: "Region = geography. Zone = separate datacenter inside a region. Region pair = recovery partner."
      },
      {
        title: "Resources And Resource Groups",
        body: [
          "An Azure resource is an item you create, such as a virtual machine, storage account, virtual network, app service, SQL database, or function app.",
          "A resource group is a management container for resources. A resource can be in only one resource group at a time.",
          "Resource groups help organize lifecycle, access control, policy, and cost tracking for related resources."
        ],
        remember: "Resource groups are containers for managing resources, not physical locations."
      },
      {
        title: "Subscriptions And Management Groups",
        body: [
          "An Azure subscription is both a billing boundary and an access control boundary.",
          "Management groups sit above subscriptions and let you apply governance across many subscriptions.",
          "The hierarchy is management groups, then subscriptions, then resource groups, then resources."
        ],
        remember: "Management group > subscription > resource group > resource."
      }
    ]
  },
  {
    id: "compute",
    title: "Compute Hosting",
    icon: "tool",
    lessons: [
      {
        title: "Virtual Machines",
        body: [
          "Azure Virtual Machines are IaaS compute. They include virtual CPU, memory, disks, networking, and an operating system.",
          "VMs are useful when you need full control, custom software, legacy app support, or a lift-and-shift migration.",
          "VM Scale Sets manage groups of identical VMs and can scale instances. Availability sets spread VMs across fault and update domains."
        ],
        remember: "VMs give control, but you manage more."
      },
      {
        title: "App Service And Containers",
        body: [
          "Azure App Service is a PaaS option for web apps and APIs. It supports common languages and handles much of the platform management.",
          "Containers package apps with dependencies. Azure Container Instances is a simple way to run containers without managing servers.",
          "Azure Kubernetes Service is for orchestrating many containers in distributed systems."
        ],
        remember: "App Service for web apps. ACI for simple containers. AKS for container orchestration."
      },
      {
        title: "Functions And Virtual Desktop",
        body: [
          "Azure Functions is serverless compute. Code runs in response to events, and you do not manage the server infrastructure.",
          "Serverless is good for short event-driven work such as timers, queue messages, HTTP triggers, or automation tasks.",
          "Azure Virtual Desktop delivers Windows desktops and apps from the cloud."
        ],
        remember: "Functions run code when something triggers them."
      }
    ]
  },
  {
    id: "networking",
    title: "Networking",
    icon: "network",
    lessons: [
      {
        title: "Virtual Networks",
        body: [
          "Azure Virtual Network, or VNet, lets Azure resources communicate with each other, the internet, and on-premises networks.",
          "Subnets segment a VNet into smaller network spaces. This helps organize and secure resources.",
          "VNet peering connects Azure virtual networks so resources can communicate privately."
        ],
        remember: "VNet is the private network foundation for Azure resources."
      },
      {
        title: "Endpoints And DNS",
        body: [
          "A public endpoint is reachable from the internet. A private endpoint is reachable only from inside a private network.",
          "Azure DNS hosts and manages DNS domains using Azure infrastructure.",
          "Private DNS zones help name resolution inside virtual networks."
        ],
        remember: "Public endpoint = internet reachable. Private endpoint = private network access."
      },
      {
        title: "VPN Gateway And ExpressRoute",
        body: [
          "VPN Gateway sends encrypted traffic between Azure and on-premises networks over the public internet.",
          "ExpressRoute connects on-premises networks to Azure through a private connection from a connectivity provider.",
          "Choose VPN Gateway for encrypted internet tunnel. Choose ExpressRoute when the question emphasizes private dedicated connectivity."
        ],
        remember: "VPN uses the public internet. ExpressRoute uses private connectivity."
      }
    ]
  },
  {
    id: "storage",
    title: "Storage Migration",
    icon: "database",
    lessons: [
      {
        title: "Storage Accounts And Services",
        body: [
          "A storage account provides a namespace and configuration boundary for Azure Storage services.",
          "Blob Storage stores massive amounts of unstructured data. Azure Files provides SMB file shares. Queue Storage stores messages. Table Storage stores NoSQL key-value data. Disk Storage supports VMs.",
          "Storage account names must be globally unique."
        ],
        remember: "Blob = objects. Files = shares. Queue = messages. Table = NoSQL key-value. Disk = VM disks."
      },
      {
        title: "Redundancy And Tiers",
        body: [
          "Locally redundant storage copies data within one datacenter. Zone-redundant storage copies across availability zones in a region.",
          "Geo-redundant options replicate to a secondary region. Geo-zone-redundant storage combines zone redundancy in the primary region with geo replication.",
          "Access tiers match data usage: Hot for frequent access, Cool for infrequent access, Cold for less frequent long-term data, and Archive for rarely accessed data."
        ],
        remember: "Hot costs more to store but less to access; Archive costs less to store but takes longer to retrieve."
      },
      {
        title: "File Movement And Migration",
        body: [
          "AzCopy is a command-line tool for copying blobs or files to and from Azure Storage.",
          "Azure Storage Explorer is a graphical tool for working with Azure Storage.",
          "Azure File Sync syncs on-premises file servers with Azure Files. Azure Migrate helps assess and migrate workloads. Azure Data Box moves large data offline with a physical device."
        ],
        remember: "AzCopy = command line copy. Storage Explorer = GUI. File Sync = two-way file sync. Data Box = physical transfer."
      }
    ]
  },
  {
    id: "identity",
    title: "Identity Security",
    icon: "shield",
    lessons: [
      {
        title: "Microsoft Entra ID",
        body: [
          "Microsoft Entra ID is Azure cloud-based identity and access management service.",
          "It supports authentication, single sign-on, application access, device management, and external identities.",
          "Microsoft Entra Domain Services provides managed domain services for legacy apps that need domain join, LDAP, Kerberos, or NTLM without managing domain controllers."
        ],
        remember: "Entra ID is modern cloud identity. Entra Domain Services supports legacy domain needs."
      },
      {
        title: "Authentication And Conditional Access",
        body: [
          "Authentication verifies who a user is. Authorization determines what that user can access.",
          "Single sign-on lets users sign in once to access multiple apps. Multifactor authentication requires additional proof beyond a password.",
          "Conditional Access uses signals such as user, location, device, risk, or app to allow, block, or require controls like MFA."
        ],
        remember: "Authentication = who are you? Authorization = what can you do?"
      },
      {
        title: "RBAC, Zero Trust, Defense In Depth",
        body: [
          "Azure role-based access control grants permissions to users, groups, or service principals at scopes such as subscription, resource group, or resource.",
          "Zero Trust assumes breach and verifies explicitly. Never trust just because traffic is inside a network.",
          "Defense in depth uses multiple security layers so one failed control does not expose the whole environment."
        ],
        remember: "RBAC answers permission questions. Zero Trust answers trust assumptions. Defense in depth answers layered protection."
      }
    ]
  },
  {
    id: "cost",
    title: "Cost Management",
    icon: "dollar",
    lessons: [
      {
        title: "What Affects Cost",
        body: [
          "Azure cost can be affected by resource type, consumption, region, network traffic, subscription type, reserved capacity, support plan, and marketplace purchases.",
          "Consumption is one of the biggest cost drivers because many services are metered by usage.",
          "Monitoring and shutting down unused resources helps reduce waste."
        ],
        remember: "If the question asks why costs changed, look for usage, region, resource size, traffic, or tier."
      },
      {
        title: "Pricing And TCO Calculators",
        body: [
          "The Azure Pricing Calculator estimates the cost of Azure products before you deploy them.",
          "The Total Cost of Ownership Calculator compares the cost of running workloads on-premises with running them in Azure.",
          "Use Pricing Calculator for Azure estimates. Use TCO Calculator for migration cost comparison."
        ],
        remember: "Pricing = future Azure bill. TCO = compare on-premises to Azure."
      },
      {
        title: "Budgets, Alerts, Tags",
        body: [
          "Azure Cost Management helps analyze spending, create budgets, set alerts, and find cost recommendations.",
          "Tags are name-value pairs used to organize resources for reporting, automation, ownership, and cost tracking.",
          "Tags do not change permissions by themselves. They help classify and report."
        ],
        remember: "Tags organize and report; RBAC controls access; Policy enforces rules."
      }
    ]
  },
  {
    id: "governance",
    title: "Governance",
    icon: "lock",
    lessons: [
      {
        title: "Azure Policy",
        body: [
          "Azure Policy helps enforce organizational standards and assess compliance at scale.",
          "Policies can audit or prevent noncompliant resource configurations, such as disallowed regions or missing tags.",
          "An initiative is a group of policy definitions managed together."
        ],
        remember: "Policy is about allowed configuration and compliance, not user permission."
      },
      {
        title: "Resource Locks And Purview",
        body: [
          "Resource locks protect resources from accidental deletion or modification. A delete lock prevents deletion. A read-only lock prevents update and deletion.",
          "Locks can be applied at subscription, resource group, or resource scope.",
          "Microsoft Purview provides data governance, discovery, classification, lineage, risk, and compliance capabilities across data estates."
        ],
        remember: "Use a lock when the example says prevent accidental delete or change."
      },
      {
        title: "Compliance Resources",
        body: [
          "Microsoft provides trust and compliance resources to help organizations understand security, privacy, and regulatory commitments.",
          "Governance tools usually work together: management groups set broad scope, Policy enforces standards, locks protect critical resources, and tags classify cost or ownership.",
          "RBAC is still separate: it controls who can do what."
        ],
        remember: "Governance is the rule system for resources at scale."
      }
    ]
  },
  {
    id: "tools",
    title: "Deploy Tools",
    icon: "tool",
    lessons: [
      {
        title: "Portal, CLI, PowerShell, Cloud Shell",
        body: [
          "The Azure portal is a web interface for creating and managing Azure resources.",
          "Azure CLI and Azure PowerShell are command-line tools for automation and administration.",
          "Azure Cloud Shell is a browser-based shell that includes Azure CLI and Azure PowerShell without installing local tools."
        ],
        remember: "Portal = web UI. CLI/PowerShell = commands. Cloud Shell = commands in the browser."
      },
      {
        title: "ARM And Templates",
        body: [
          "Azure Resource Manager is the management layer for creating, updating, and deleting Azure resources.",
          "ARM templates are JSON files that declare the infrastructure you want Azure to deploy.",
          "Templates support repeatable deployments, validation, orchestration, and infrastructure as code."
        ],
        remember: "ARM is the control plane. ARM templates are declarative deployment files."
      },
      {
        title: "Azure Arc",
        body: [
          "Azure Arc extends Azure management and governance to resources outside Azure.",
          "It can help manage servers, Kubernetes clusters, and data services across on-premises, multicloud, and edge environments.",
          "If the question says manage non-Azure resources with Azure tools, look for Azure Arc."
        ],
        remember: "Azure Arc brings Azure management to hybrid and multicloud resources."
      }
    ]
  },
  {
    id: "monitor",
    title: "Monitoring",
    icon: "chart",
    lessons: [
      {
        title: "Azure Advisor",
        body: [
          "Azure Advisor analyzes deployed resources and recommends improvements based on best practices.",
          "Its recommendation categories include reliability, security, performance, cost, and operational excellence.",
          "Advisor helps optimize. It is not the same as real-time outage tracking."
        ],
        remember: "Advisor = best-practice recommendations."
      },
      {
        title: "Service Health",
        body: [
          "Azure Status shows global health of Azure services across regions.",
          "Azure Service Health is personalized to the services and regions you use.",
          "Resource Health shows the health of individual Azure resources."
        ],
        remember: "Status = global. Service Health = services you use. Resource Health = specific resource."
      },
      {
        title: "Azure Monitor",
        body: [
          "Azure Monitor collects, analyzes, and acts on telemetry from cloud and on-premises environments.",
          "Log Analytics helps query logs. Alerts notify or trigger action when conditions are met.",
          "Application Insights monitors application performance, usage, availability, and failures."
        ],
        remember: "Monitor = telemetry platform. Log Analytics = query logs. Application Insights = app monitoring."
      }
    ]
  }
];

const expandedLessons = {
  exam: [
    {
      title: "Service Recognition Map",
      body: [
        "Use this as a quick match-up guide before a practice final. AZ-900 questions often describe a need, then ask which Azure product or tool fits."
      ],
      sections: [
        {
          title: "If the question says estimate or compare cost",
          items: [
            "Pricing Calculator estimates Azure service cost before deployment.",
            "TCO Calculator compares on-premises cost with Azure migration cost.",
            "Cost Management tracks spending, budgets, alerts, and recommendations."
          ]
        },
        {
          title: "If the question says enforce rules or prevent accidents",
          items: [
            "Azure Policy enforces standards such as allowed regions or required tags.",
            "Resource locks help prevent accidental deletion or modification.",
            "RBAC controls who can access resources and what they can do."
          ]
        },
        {
          title: "If the question says monitor health or performance",
          items: [
            "Azure Monitor collects metrics and logs.",
            "Application Insights monitors apps.",
            "Service Health shows Azure issues that affect your services and regions.",
            "Advisor gives best-practice recommendations."
          ]
        }
      ],
      remember: "Match the verb in the question to the product purpose."
    }
  ],
  cloud: [
    {
      title: "Cloud Model Product Clues",
      body: [
        "These clues help you quickly identify the right cloud model or spending model from an example."
      ],
      sections: [
        {
          title: "Public cloud clues",
          items: [
            "Fast provisioning without buying hardware.",
            "Pay for resources as you use them.",
            "Provider owns the datacenters and physical hardware."
          ]
        },
        {
          title: "Private cloud clues",
          items: [
            "Dedicated environment for one organization.",
            "More direct control over security and hardware.",
            "The organization usually carries more maintenance responsibility."
          ]
        },
        {
          title: "Hybrid cloud clues",
          items: [
            "Some workloads stay on-premises while others run in public cloud.",
            "Useful for compliance, gradual migration, or legacy systems.",
            "Azure Arc can help manage hybrid and multicloud resources."
          ]
        }
      ],
      remember: "Public is provider-owned, private is dedicated, hybrid uses both."
    }
  ],
  benefits: [
    {
      title: "Availability Products and Terms",
      body: [
        "Availability questions usually ask how to reduce downtime or survive failure."
      ],
      sections: [
        {
          title: "Core terms",
          items: [
            "High availability means keeping a service available with minimal downtime.",
            "Reliability means recovering from failures and continuing to function.",
            "Composite SLA is the combined availability of multiple services in one solution."
          ]
        },
        {
          title: "Azure building blocks",
          items: [
            "Availability Zones protect against datacenter failure inside a region.",
            "Region pairs support recovery patterns across regions.",
            "Load Balancer and Application Gateway can distribute traffic across healthy backends."
          ]
        },
        {
          title: "Protection services",
          items: [
            "Azure Backup protects data so it can be restored.",
            "Azure Site Recovery helps replicate and fail over workloads during outages."
          ]
        }
      ],
      remember: "Availability is uptime. Backup and recovery are part of reliability planning."
    }
  ],
  service: [
    {
      title: "IaaS, PaaS, SaaS Product Examples",
      body: [
        "When a question asks for a service model, think about how much the customer manages."
      ],
      sections: [
        {
          title: "IaaS examples",
          items: [
            "Azure Virtual Machines give the most control over the operating system.",
            "Azure Disk Storage supports VM disks.",
            "Virtual networks, public IPs, and network security groups often support IaaS designs."
          ]
        },
        {
          title: "PaaS examples",
          items: [
            "Azure App Service hosts web apps and APIs without managing the underlying OS.",
            "Azure Functions runs event-driven code without server management.",
            "Azure SQL Database is a managed relational database service."
          ]
        },
        {
          title: "SaaS examples",
          items: [
            "Microsoft 365 is a common SaaS example.",
            "Users consume the app; the provider manages most of the platform.",
            "SaaS usually has the least infrastructure responsibility for the customer."
          ]
        }
      ],
      remember: "IaaS controls servers, PaaS builds apps, SaaS uses apps."
    }
  ],
  architecture: [
    {
      title: "Architecture Services to Know",
      body: [
        "These are the building blocks that organize where resources live and how they are managed."
      ],
      sections: [
        {
          title: "Physical layout",
          items: [
            "Regions are geographic areas with Azure datacenters.",
            "Availability Zones are separate datacenters inside a region.",
            "Sovereign regions are isolated for special compliance or government needs."
          ]
        },
        {
          title: "Management layout",
          items: [
            "Management groups organize multiple subscriptions.",
            "Subscriptions separate billing and access control.",
            "Resource groups hold related resources for management."
          ]
        },
        {
          title: "Common resources",
          items: [
            "Virtual machines provide compute.",
            "Storage accounts provide storage services.",
            "Virtual networks provide private networking."
          ]
        }
      ],
      remember: "Management group > subscription > resource group > resource."
    }
  ],
  compute: [
    {
      title: "Compute Product Guide",
      body: [
        "Compute questions usually ask where code, apps, desktops, containers, or servers should run."
      ],
      sections: [
        {
          title: "Server-style compute",
          items: [
            "Azure Virtual Machines are best when you need OS control or lift-and-shift migration.",
            "VM Scale Sets manage and scale groups of identical VMs.",
            "Azure Virtual Desktop delivers Windows desktops and apps from the cloud."
          ]
        },
        {
          title: "App hosting",
          items: [
            "Azure App Service hosts web apps and APIs as a managed platform.",
            "Azure Functions runs short event-driven code.",
            "Azure Container Apps runs containerized apps and microservices with managed scaling."
          ]
        },
        {
          title: "Container options",
          items: [
            "Azure Container Instances runs simple containers without managing servers.",
            "Azure Kubernetes Service orchestrates many containers for larger distributed apps."
          ]
        }
      ],
      remember: "VMs give control, App Service hosts web apps, Functions run triggers, AKS orchestrates containers."
    }
  ],
  networking: [
    {
      title: "Networking Product Guide",
      body: [
        "Networking questions usually describe how traffic should move or how access should be restricted."
      ],
      sections: [
        {
          title: "Private network basics",
          items: [
            "Azure Virtual Network connects Azure resources privately.",
            "Subnets divide a VNet into smaller network segments.",
            "Network Security Groups allow or deny inbound and outbound traffic."
          ]
        },
        {
          title: "Connectivity",
          items: [
            "VPN Gateway connects on-premises networks to Azure over encrypted internet tunnels.",
            "ExpressRoute provides private provider-based connectivity to Azure.",
            "VNet peering connects Azure virtual networks."
          ]
        },
        {
          title: "Traffic and protection",
          items: [
            "Load Balancer distributes layer 4 traffic.",
            "Application Gateway handles layer 7 web traffic and routing.",
            "Azure Firewall filters network traffic.",
            "Azure Bastion provides browser-based RDP/SSH without public VM IPs."
          ]
        }
      ],
      remember: "VPN is encrypted internet. ExpressRoute is private connectivity."
    }
  ],
  storage: [
    {
      title: "Storage and Database Product Guide",
      body: [
        "Storage questions usually ask what kind of data you have and how it should be accessed."
      ],
      sections: [
        {
          title: "Storage account services",
          items: [
            "Blob Storage stores unstructured object data.",
            "Azure Files provides SMB file shares.",
            "Queue Storage stores messages.",
            "Table Storage stores NoSQL key-value data."
          ]
        },
        {
          title: "Databases",
          items: [
            "Azure SQL Database is managed relational SQL storage.",
            "Azure Cosmos DB is globally distributed NoSQL storage.",
            "Azure Database for MySQL and PostgreSQL are managed open-source database services."
          ]
        },
        {
          title: "Movement and recovery",
          items: [
            "AzCopy copies data from the command line.",
            "Storage Explorer is a graphical storage tool.",
            "Azure File Sync syncs on-premises files with Azure Files.",
            "Azure Data Box moves large data with a physical device."
          ]
        }
      ],
      remember: "Blob objects, Files shares, Queue messages, Table key-value, Disk VM storage."
    }
  ],
  identity: [
    {
      title: "Identity and Security Product Guide",
      body: [
        "Identity questions usually ask who can sign in, what they can access, or how resources are protected."
      ],
      sections: [
        {
          title: "Identity",
          items: [
            "Microsoft Entra ID manages cloud identities and access.",
            "Microsoft Entra Domain Services supports legacy domain needs without managing domain controllers.",
            "External ID supports customers, partners, guests, and external users."
          ]
        },
        {
          title: "Access controls",
          items: [
            "MFA requires extra proof beyond a password.",
            "Conditional Access can require MFA, block access, or allow access based on signals.",
            "RBAC assigns permissions at scopes such as subscription, resource group, or resource."
          ]
        },
        {
          title: "Security products",
          items: [
            "Key Vault stores secrets, keys, and certificates.",
            "Defender for Cloud gives security posture management and threat protection.",
            "Microsoft Sentinel is a cloud-native SIEM/SOAR for security analytics and response."
          ]
        }
      ],
      remember: "Authentication proves who you are. Authorization controls what you can do."
    }
  ],
  cost: [
    {
      title: "Cost Product Guide",
      body: [
        "Cost questions often ask whether you are estimating, comparing, tracking, or organizing spending."
      ],
      sections: [
        {
          title: "Estimate and compare",
          items: [
            "Pricing Calculator estimates Azure costs before deployment.",
            "TCO Calculator compares current on-premises costs with Azure costs.",
            "Azure Marketplace shows third-party and Microsoft solutions that may affect cost."
          ]
        },
        {
          title: "Track and control",
          items: [
            "Azure Cost Management shows spending analysis, budgets, alerts, and recommendations.",
            "Budgets notify teams when spending reaches thresholds.",
            "Reservations and savings options can reduce predictable workload costs."
          ]
        },
        {
          title: "Organize cost",
          items: [
            "Tags label resources by department, project, owner, or environment.",
            "Subscriptions can separate billing boundaries.",
            "Resource groups can help organize related app resources."
          ]
        }
      ],
      remember: "Pricing estimates Azure. TCO compares migration. Cost Management tracks spend."
    }
  ],
  governance: [
    {
      title: "Governance Product Guide",
      body: [
        "Governance questions ask how an organization keeps Azure consistent, compliant, and protected."
      ],
      sections: [
        {
          title: "Rules and protection",
          items: [
            "Azure Policy enforces standards and checks compliance.",
            "Initiatives group multiple policies together.",
            "Resource locks prevent accidental deletion or modification."
          ]
        },
        {
          title: "Data and compliance",
          items: [
            "Microsoft Purview helps discover, classify, and govern data.",
            "Service Trust Portal provides Microsoft compliance and trust documents.",
            "Tags support organization, reporting, and cost accountability."
          ]
        },
        {
          title: "Scope",
          items: [
            "Management groups apply governance across subscriptions.",
            "Subscriptions can separate environments, departments, or billing.",
            "Policies and RBAC are different: Policy controls resource configuration; RBAC controls user permissions."
          ]
        }
      ],
      remember: "Policy enforces standards. Locks prevent accidents. Purview governs data."
    }
  ],
  tools: [
    {
      title: "Deployment Tool Guide",
      body: [
        "Deployment questions ask how a person or team should create and manage Azure resources."
      ],
      sections: [
        {
          title: "Interactive tools",
          items: [
            "Azure Portal is the web-based graphical interface.",
            "Cloud Shell is a browser-based shell with Azure CLI and Azure PowerShell.",
            "Storage Explorer is a graphical tool for storage management."
          ]
        },
        {
          title: "Command and code",
          items: [
            "Azure CLI uses az commands and works across platforms.",
            "Azure PowerShell uses PowerShell cmdlets.",
            "ARM templates are JSON infrastructure-as-code files.",
            "Bicep is a simpler language for declaring Azure resources."
          ]
        },
        {
          title: "Hybrid and migration",
          items: [
            "Azure Arc extends Azure management outside Azure.",
            "Azure Migrate helps assess and migrate workloads.",
            "Azure Data Box helps move large data when network transfer is too slow."
          ]
        }
      ],
      remember: "Portal for visual work, CLI/PowerShell for commands, ARM/Bicep for repeatable deployments."
    }
  ],
  monitor: [
    {
      title: "Monitoring Product Guide",
      body: [
        "Monitoring questions ask how to observe health, performance, logs, apps, or Azure outages."
      ],
      sections: [
        {
          title: "Health views",
          items: [
            "Azure Status is the global public health page.",
            "Service Health is personalized to your services and regions.",
            "Resource Health focuses on individual Azure resources."
          ]
        },
        {
          title: "Telemetry",
          items: [
            "Azure Monitor collects metrics and logs.",
            "Metrics are numeric time-series data.",
            "Logs are searchable records that can be queried with Log Analytics."
          ]
        },
        {
          title: "Apps and recommendations",
          items: [
            "Application Insights monitors app performance, availability, usage, and failures.",
            "Azure Monitor Alerts notify or trigger actions when conditions are met.",
            "Azure Advisor recommends improvements for cost, performance, reliability, security, and operations."
          ]
        }
      ],
      remember: "Status is global, Service Health is personal, Resource Health is specific."
    }
  ]
};

Object.entries(expandedLessons).forEach(([topicId, lessons]) => {
  const topic = topics.find((item) => item.id === topicId);
  if (topic) topic.lessons.push(...lessons);
});

const useExampleLessons = {
  cloud: [
    exampleLesson("Cloud Model Examples", [
      ["A local bakery expects holiday traffic spikes for online orders.", "Public cloud fits because the bakery can add capacity quickly and pay for the extra usage only when needed."],
      ["A hospital keeps one older records system on-premises while testing cloud analytics.", "Hybrid cloud fits because some workloads remain local while newer services run in Azure."],
      ["A government contractor needs a dedicated environment with strict control.", "Private or specialized cloud options may fit because the organization needs more isolation and control."]
    ], "Ask what the company is trying to control: cost, speed, compliance, or ownership.")
  ],
  benefits: [
    exampleLesson("Reliability Examples", [
      ["A ticketing app crashes whenever concert sales open.", "Elasticity helps because capacity can grow during the surge and shrink later."],
      ["A company wants the app to survive one datacenter failure.", "Availability Zones help because resources can run across separate datacenters in a region."],
      ["A finance team uses three services together and asks about total uptime.", "Composite SLA applies because the solution availability depends on every required service."]
    ], "For benefit examples, look for the pain: downtime, traffic spikes, disaster recovery, or cost control.")
  ],
  service: [
    exampleLesson("Service Model Examples", [
      ["A team must install custom drivers and control the operating system.", "IaaS is the best fit because virtual machines give the most OS control."],
      ["A student club wants to publish a web app without patching servers.", "PaaS fits because App Service handles the platform while they focus on code."],
      ["Employees just need email and collaboration tools.", "SaaS fits because users consume finished software instead of managing infrastructure."]
    ], "The less you manage, the more the answer moves from IaaS toward PaaS and SaaS.")
  ],
  architecture: [
    exampleLesson("Architecture Examples", [
      ["A school separates billing for IT labs and administration.", "Use separate subscriptions because subscriptions are billing and access boundaries."],
      ["A company wants the same policies across many subscriptions.", "Use management groups because they organize subscriptions for governance."],
      ["A project team wants to manage a VM, storage account, and VNet together.", "Use a resource group because it holds related resources."]
    ], "Broad to narrow: management group, subscription, resource group, resource.")
  ],
  compute: [
    exampleLesson("Compute Examples", [
      ["A legacy payroll app needs a full Windows Server environment.", "Use Azure Virtual Machines because the app needs OS-level control."],
      ["A small API runs only when a file is uploaded.", "Use Azure Functions because event-driven serverless code fits short triggered work."],
      ["A company has many containers and needs orchestration.", "Use AKS because Kubernetes manages container scheduling and scaling."]
    ], "Choose compute by asking: full server, web app, event code, container, or virtual desktop?")
  ],
  networking: [
    exampleLesson("Networking Examples", [
      ["An admin needs to RDP to a VM without exposing a public IP.", "Use Azure Bastion because it provides browser-based RDP/SSH over a private path."],
      ["A branch office needs encrypted Azure access over the internet.", "Use VPN Gateway because it creates encrypted tunnels over public internet."],
      ["A company wants private provider connectivity with predictable performance.", "Use ExpressRoute because it avoids the public internet path."]
    ], "Public endpoint means internet reachable; private endpoint means private network path.")
  ],
  storage: [
    exampleLesson("Storage Examples", [
      ["A video app stores millions of uploaded clips.", "Use Blob Storage because videos are unstructured object data."],
      ["Two VMs need to share files through SMB.", "Use Azure Files because it provides managed file shares."],
      ["A retailer needs a globally distributed low-latency NoSQL database.", "Use Cosmos DB because it is built for global NoSQL workloads."]
    ], "Identify the data shape first: object, file share, message, key-value, relational, or NoSQL.")
  ],
  identity: [
    exampleLesson("Identity and Security Examples", [
      ["A user signs in from a risky location and should complete MFA.", "Use Conditional Access with MFA because access can depend on risk signals."],
      ["An app needs to store database passwords safely.", "Use Key Vault because it stores secrets, keys, and certificates."],
      ["Security analysts need to collect alerts and investigate threats.", "Use Microsoft Sentinel because it is a SIEM/SOAR for security analytics and response."]
    ], "Authentication proves identity. Authorization decides access. Security tools protect apps and data.")
  ],
  cost: [
    exampleLesson("Cost Examples", [
      ["A manager wants an estimate before creating a VM.", "Use Pricing Calculator because it estimates Azure service cost before deployment."],
      ["A company wants to compare its datacenter costs with Azure migration.", "Use TCO Calculator because it compares on-premises cost with Azure cost."],
      ["A department needs alerts before monthly spending gets too high.", "Use Cost Management budgets because they track spend and notify at thresholds."]
    ], "Pricing estimates new Azure costs; TCO compares migration; Cost Management watches real spending.")
  ],
  governance: [
    exampleLesson("Governance Examples", [
      ["A school wants students to deploy only in approved regions.", "Use Azure Policy because it can deny resources outside allowed regions."],
      ["An important resource keeps getting deleted by accident.", "Use a resource lock because locks help prevent deletion or changes."],
      ["A company needs to discover and classify sensitive data.", "Use Microsoft Purview because it supports data discovery, classification, and governance."]
    ], "Policy controls what can be deployed. RBAC controls who can do things.")
  ],
  tools: [
    exampleLesson("Tool Choice Examples", [
      ["A beginner wants to create one storage account visually.", "Use Azure Portal because it is the graphical web interface."],
      ["A team wants repeatable deployments from code.", "Use Bicep or ARM templates because they define infrastructure as code."],
      ["A company wants Azure-style management for on-premises servers.", "Use Azure Arc because it extends Azure management beyond Azure."]
    ], "Pick the tool based on the job: visual, command line, repeatable code, migration, or hybrid management.")
  ],
  monitor: [
    exampleLesson("Monitoring Examples", [
      ["A web app is slow and the team needs request failure details.", "Use Application Insights because it monitors app performance, failures, and usage."],
      ["An admin wants to know if one VM is unhealthy.", "Use Resource Health because it focuses on individual resource health."],
      ["A company wants alerts when CPU stays above a threshold.", "Use Azure Monitor Alerts because alerts fire from metrics or logs."]
    ], "Status is global, Service Health is personal, Resource Health is resource-specific.")
  ],
  exam: [
    exampleLesson("Final Exam Service Clues", [
      ["The question says 'block nonapproved regions.'", "Think Azure Policy."],
      ["The question says 'estimate before deploying.'", "Think Pricing Calculator."],
      ["The question says 'private connection, not over public internet.'", "Think ExpressRoute."],
      ["The question says 'event-driven code.'", "Think Azure Functions."]
    ], "On example-based questions, underline the verb before choosing the service.")
  ]
};

Object.entries(useExampleLessons).forEach(([topicId, lessons]) => {
  const topic = topics.find((item) => item.id === topicId);
  if (topic) topic.lessons.push(...lessons);
});


const questionBank = [
  q("cloud", "Which phrase best defines cloud computing?", ["Delivery of computing services over the internet", "A local network inside one building", "Only virtual machines in a datacenter", "A backup drive attached to a server"], 0, "Cloud computing delivers services such as compute, storage, and networking over the internet."),
  q("cloud", "A company wants no up-front hardware purchase and wants to pay only for usage. Which cloud advantage fits?", ["Consumption-based pricing", "Private cloud ownership", "Capital expenditure", "Manual patching"], 0, "Consumption-based pricing means paying for resources as they are used."),
  q("cloud", "Which cloud model combines public cloud and private cloud?", ["Hybrid cloud", "SaaS", "IaaS", "Community DNS"], 0, "Hybrid cloud combines public and private environments."),
  q("cloud", "Which spending type is most associated with buying physical servers before they are needed?", ["CapEx", "OpEx", "Serverless", "Elasticity"], 0, "Capital expenditure is up-front spending on physical assets."),
  q("benefits", "What does scaling out mean?", ["Adding more instances", "Making one instance larger", "Deleting all resources", "Moving data to Archive tier"], 0, "Scaling out adds instances. Scaling up increases the size of an existing instance."),
  q("benefits", "A system automatically adds capacity during a traffic spike and removes it later. What is this?", ["Elasticity", "Data residency", "Sovereignty", "Read-only lock"], 0, "Elasticity is the ability to rapidly adjust capacity with demand."),
  q("benefits", "Which term focuses on keeping a service running with minimal downtime?", ["High availability", "Authentication", "Tagging", "Peering"], 0, "High availability is about uptime."),
  q("benefits", "Which benefit helps an organization enforce standards across resources?", ["Governance", "Latency", "Public endpoint", "Cold tier"], 0, "Governance helps enforce standards and compliance."),
  q("service", "Which cloud service model gives the customer the most control over the operating system?", ["IaaS", "PaaS", "SaaS", "DNS"], 0, "IaaS gives more control and more management responsibility."),
  q("service", "Which service model is Azure App Service most closely associated with?", ["PaaS", "IaaS", "SaaS", "CapEx"], 0, "App Service is a platform for hosting apps without managing the underlying servers."),
  q("service", "Microsoft 365 is an example of which cloud service type?", ["SaaS", "IaaS", "PaaS", "VNet"], 0, "SaaS is complete software delivered over the internet."),
  q("service", "In every cloud model, which responsibility remains important for the customer?", ["Data and identities", "Physical datacenter cooling", "Hardware replacement", "Datacenter power"], 0, "Customers remain responsible for data, identities, and access decisions."),
  q("architecture", "What is an Azure region?", ["A geographic area containing Azure datacenters", "A single virtual machine", "A billing invoice", "A user role"], 0, "A region is a geographic Azure location containing one or more datacenters."),
  q("architecture", "Availability zones protect against what type of failure?", ["Datacenter failure within a region", "A forgotten password", "A missing tag", "A DNS typo only"], 0, "Availability zones are physically separate datacenters in the same region."),
  q("architecture", "Which object is a container for related Azure resources?", ["Resource group", "Availability zone", "ExpressRoute circuit", "Application Insights"], 0, "A resource group is a management container for resources."),
  q("architecture", "Which Azure scope is both a billing boundary and access control boundary?", ["Subscription", "Resource lock", "Private endpoint", "Queue message"], 0, "Subscriptions separate billing and access control."),
  q("architecture", "What is the correct Azure hierarchy from broad to narrow?", ["Management group, subscription, resource group, resource", "Resource, subscription, management group, resource group", "Region, tag, policy, user", "VNet, VM, tenant, management group"], 0, "Management groups contain subscriptions, which contain resource groups, which contain resources."),
  q("compute", "Which compute option is best when you need full operating system control?", ["Azure Virtual Machines", "Azure Functions", "Azure App Service", "Azure DNS"], 0, "Virtual Machines are IaaS and provide OS-level control."),
  q("compute", "Which service is serverless and event driven?", ["Azure Functions", "Azure Virtual Desktop", "Azure Kubernetes Service", "Azure Data Box"], 0, "Azure Functions runs code in response to triggers."),
  q("compute", "Which service orchestrates large numbers of containers?", ["Azure Kubernetes Service", "Azure Files", "Microsoft Purview", "Azure Advisor"], 0, "AKS is Azure managed Kubernetes service for container orchestration."),
  q("compute", "Which option delivers cloud-hosted Windows desktops and apps?", ["Azure Virtual Desktop", "Azure Policy", "Azure Blob Storage", "Azure Monitor"], 0, "Azure Virtual Desktop provides desktop and app virtualization from the cloud."),
  q("networking", "What does an Azure Virtual Network provide?", ["Private network foundation for Azure resources", "A pricing estimate", "A physical shipping device", "A certification transcript"], 0, "A VNet lets Azure resources communicate with each other, the internet, and on-premises networks."),
  q("networking", "Which connection sends encrypted traffic over the public internet?", ["VPN Gateway", "ExpressRoute", "Azure Policy", "Availability set"], 0, "VPN Gateway uses encrypted tunnels over the public internet."),
  q("networking", "Which connection uses private connectivity through a provider?", ["ExpressRoute", "Public endpoint", "VPN Gateway only", "Azure DNS alias"], 0, "ExpressRoute provides private connectivity between on-premises networks and Azure."),
  q("networking", "A service should be reachable only from inside a private network. What should you use?", ["Private endpoint", "Public endpoint", "Hot tier", "Management group"], 0, "Private endpoints restrict access to the private network path."),
  q("storage", "Which Azure Storage service is optimized for unstructured object data?", ["Blob Storage", "Queue Storage", "Table Storage", "Azure Files"], 0, "Blob Storage is for massive amounts of unstructured data."),
  q("storage", "Which storage service provides SMB file shares?", ["Azure Files", "Blob Storage", "Queue Storage", "Table Storage"], 0, "Azure Files provides managed file shares over SMB."),
  q("storage", "Which redundancy option copies data across availability zones in the primary region?", ["ZRS", "LRS", "Archive", "MFA"], 0, "Zone-redundant storage replicates across zones in one region."),
  q("storage", "Which access tier is for data that is rarely accessed and can tolerate retrieval delay?", ["Archive", "Hot", "Queue", "Premium DNS"], 0, "Archive is the lowest-cost tier for rarely accessed data with retrieval latency."),
  q("storage", "Which tool is a command-line utility for copying data to or from Azure Storage?", ["AzCopy", "Azure Advisor", "Microsoft Purview", "Service Health"], 0, "AzCopy is the command-line data copy tool."),
  q("storage", "Which option helps move large amounts of data using a physical device?", ["Azure Data Box", "Azure Monitor", "VNet peering", "Entra ID"], 0, "Azure Data Box supports offline transfer of large data volumes."),
  q("identity", "What is Microsoft Entra ID primarily used for?", ["Cloud identity and access management", "Object storage", "Cost estimation", "Container orchestration"], 0, "Microsoft Entra ID manages identities and access."),
  q("identity", "Which method requires an additional proof beyond a password?", ["Multifactor authentication", "Single sign-on", "A resource tag", "A region pair"], 0, "MFA requires at least one additional verification factor."),
  q("identity", "Which Azure feature grants permissions at scopes such as subscription, resource group, or resource?", ["RBAC", "DNS", "Data Box", "TCO Calculator"], 0, "Role-based access control assigns permissions at Azure scopes."),
  q("identity", "Which security model assumes breach and verifies explicitly?", ["Zero Trust", "Public cloud", "Scaling up", "LRS"], 0, "Zero Trust assumes no implicit trust and verifies every access request."),
  q("identity", "Which service provides threat protection and security recommendations across Azure and hybrid environments?", ["Microsoft Defender for Cloud", "Azure Files", "Azure Pricing Calculator", "Azure DNS"], 0, "Defender for Cloud provides security posture management and threat protection."),
  q("cost", "Which tool should you use to estimate the cost of Azure products before deployment?", ["Azure Pricing Calculator", "TCO Calculator", "Azure Policy", "Resource Health"], 0, "Pricing Calculator estimates Azure service costs."),
  q("cost", "Which tool compares on-premises costs with Azure migration costs?", ["TCO Calculator", "Azure Advisor", "Azure CLI", "Microsoft Entra ID"], 0, "TCO Calculator compares total cost of ownership on-premises vs Azure."),
  q("cost", "What are Azure tags used for?", ["Organizing resources for reporting, ownership, and cost tracking", "Encrypting VPN traffic", "Replacing MFA", "Creating datacenters"], 0, "Tags are metadata for organization and reporting."),
  q("governance", "Which service enforces organizational standards and assesses compliance?", ["Azure Policy", "Azure Monitor", "Azure Functions", "Azure Blob Storage"], 0, "Azure Policy evaluates and can enforce resource compliance."),
  q("governance", "You need to prevent accidental deletion of a critical resource. What should you apply?", ["Resource lock", "Public endpoint", "Availability set", "Hot tier"], 0, "A delete lock prevents accidental deletion."),
  q("governance", "Which Microsoft service provides data governance, discovery, classification, and lineage?", ["Microsoft Purview", "Azure Service Health", "Azure DNS", "Azure Virtual Desktop"], 0, "Microsoft Purview is for data governance and compliance."),
  q("tools", "Which tool is a browser-based shell that includes Azure CLI and Azure PowerShell?", ["Azure Cloud Shell", "Azure Arc", "Azure Data Box", "Azure Status"], 0, "Cloud Shell gives browser-based command-line access."),
  q("tools", "What is the purpose of ARM templates?", ["Repeatable declarative deployments", "Physical datacenter cooling", "Passwordless sign-in only", "Global service outage view"], 0, "ARM templates declare Azure infrastructure for repeatable deployment."),
  q("tools", "Which service extends Azure management to on-premises, multicloud, and edge resources?", ["Azure Arc", "Azure Advisor", "Azure Files", "Azure Queue Storage"], 0, "Azure Arc brings Azure governance and management outside Azure."),
  q("monitor", "Which service gives best-practice recommendations across reliability, security, performance, cost, and operations?", ["Azure Advisor", "Azure Status", "Azure Data Box", "Conditional Access"], 0, "Advisor analyzes deployed resources and recommends optimizations."),
  q("monitor", "Which option gives a personalized view of Azure service issues that may affect your services and regions?", ["Azure Service Health", "Azure Status", "Blob Storage", "ARM template"], 0, "Service Health is personalized to your services and regions."),
  q("monitor", "Which Azure Monitor feature is used to query log data?", ["Log Analytics", "Azure Marketplace", "ExpressRoute", "Resource group"], 0, "Log Analytics lets you query and analyze logs."),
  q("monitor", "Which tool is best for monitoring application performance and failures?", ["Application Insights", "TCO Calculator", "Resource lock", "Azure Files"], 0, "Application Insights monitors application performance, availability, and errors.")
];

const extraQuestionBank = [
  q("cloud", "A startup wants the fastest way to create test servers without buying hardware. Which model fits best?", ["Public cloud", "Private cloud only", "Manual datacenter build", "Offline storage"], 0, "Public cloud resources can be provisioned quickly without buying physical hardware."),
  q("cloud", "A hospital must keep a regulated database in its own datacenter but wants public cloud web servers. What model is this?", ["Hybrid cloud", "SaaS only", "Private endpoint", "Availability set"], 0, "Hybrid cloud combines private/on-premises resources with public cloud services."),
  q("cloud", "Which statement best describes a private cloud?", ["Cloud resources dedicated to one organization", "A free public website", "A shared consumer email service", "A billing calculator"], 0, "A private cloud is dedicated to a single organization, often with more control and responsibility."),
  q("cloud", "Which cost model lets you stop paying when a resource is deleted or stopped?", ["Consumption-based model", "Fixed hardware purchase", "Long-term datacenter lease only", "Sovereign region model"], 0, "Consumption-based billing follows actual resource usage."),
  q("cloud", "Which cloud model usually gives the provider responsibility for the physical datacenter?", ["Public cloud", "Private cloud in your building", "On-premises only", "Local backup only"], 0, "In public cloud, the provider manages the physical facilities and hardware."),
  q("cloud", "Which term describes moving spending from buying servers to paying monthly service bills?", ["OpEx shift", "Fault domain", "Resource lock", "Geo-replication"], 0, "Cloud commonly shifts spending from CapEx to operational expenditure."),

  q("benefits", "A company wants an app to stay online during planned maintenance. Which cloud benefit is most relevant?", ["High availability", "Passwordless sign-in", "Tag inheritance", "Data classification"], 0, "High availability focuses on reducing downtime."),
  q("benefits", "Which phrase best describes reliability?", ["Recovering from failures and continuing to function", "Signing in once to many apps", "Organizing resources by owner", "Copying files with a command"], 0, "Reliability is about recovery and continued operation after failure."),
  q("benefits", "A retailer needs more capacity during a holiday rush, then less capacity afterward. Which benefit is this?", ["Elasticity", "Sovereignty", "ReadOnly lock", "Data lineage"], 0, "Elasticity adjusts resources as demand rises or falls."),
  q("benefits", "Which action is an example of scaling up?", ["Increasing a VM size", "Adding three more VM instances", "Adding tags to resources", "Creating a region pair"], 0, "Scaling up means making a single resource larger."),
  q("benefits", "Which cloud benefit helps estimate performance and spending more consistently?", ["Predictability", "Guest access", "Peering", "Archive tier"], 0, "Predictability covers expected performance and expected costs."),

  q("service", "You deploy a VM and are responsible for patching the operating system. Which model is this?", ["IaaS", "PaaS", "SaaS", "Serverless SaaS"], 0, "With IaaS virtual machines, customers manage the OS and software."),
  q("service", "You deploy code to a managed web hosting platform and do not manage the OS. Which model fits?", ["PaaS", "IaaS", "Private cloud only", "CapEx"], 0, "PaaS lets you focus on apps while the provider manages much of the platform."),
  q("service", "A user opens a complete cloud-hosted email app in a browser. Which service type is this?", ["SaaS", "IaaS", "PaaS", "VNet peering"], 0, "SaaS provides complete software for users to consume."),
  q("service", "Which model normally has the least customer infrastructure management?", ["SaaS", "IaaS", "Self-hosted private cloud", "Bare metal"], 0, "SaaS shifts the most management responsibility to the provider."),
  q("service", "Which model is best when a team needs custom OS drivers?", ["IaaS", "SaaS", "Managed email", "Azure Policy"], 0, "IaaS is best when operating system control is required."),

  q("architecture", "What is a region pair mainly used to support?", ["Disaster recovery and platform update sequencing", "User password reset only", "Tag naming", "DNS record formatting"], 0, "Region pairs support recovery patterns and staged platform updates."),
  q("architecture", "What does an availability zone contain?", ["One or more physically separate datacenters in a region", "A group of users", "A billing invoice", "A JSON template"], 0, "Availability zones are separate datacenter locations within an Azure region."),
  q("architecture", "Can one Azure resource exist in two resource groups at the same time?", ["No", "Yes, always", "Only if it is a VM", "Only if it has tags"], 0, "A resource can be in only one resource group at a time."),
  q("architecture", "What can management groups help apply across many subscriptions?", ["Governance conditions", "Local file permissions", "Public IP addresses", "VM disk encryption keys only"], 0, "Management groups apply governance at scale across subscriptions."),
  q("architecture", "Which scope would you choose to separate invoices for two departments?", ["Subscriptions", "Availability zones", "Private endpoints", "Azure functions"], 0, "Subscriptions are billing boundaries."),

  q("compute", "Which compute choice is best for lift-and-shift migration of an existing server?", ["Azure Virtual Machines", "Azure Functions", "Azure DNS", "Microsoft Purview"], 0, "VMs are commonly used for lift-and-shift migrations."),
  q("compute", "Which Azure service is a fully managed platform for web apps and APIs?", ["Azure App Service", "Azure Data Box", "Azure Queue Storage", "Azure Service Health"], 0, "Azure App Service hosts web apps and APIs as a managed platform."),
  q("compute", "Which compute option packages an app and its dependencies into a lightweight unit?", ["Container", "Availability zone", "Resource lock", "Tag"], 0, "Containers package apps and dependencies in lightweight environments."),
  q("compute", "Which service is simplest for running one container without managing servers?", ["Azure Container Instances", "Azure Kubernetes Service", "Azure Virtual Desktop", "Azure Advisor"], 0, "Azure Container Instances is a simple serverless container option."),
  q("compute", "What do VM scale sets help manage?", ["A group of load-balanced VM instances", "A DNS domain only", "A cost comparison report", "A compliance portal"], 0, "VM scale sets manage and scale groups of virtual machines."),

  q("networking", "What is the purpose of subnetting a virtual network?", ["Segmenting the address space", "Estimating costs", "Creating a software subscription", "Classifying sensitive data"], 0, "Subnets divide a VNet into smaller network segments."),
  q("networking", "Which feature connects two Azure VNets through Azure backbone networking?", ["VNet peering", "Azure Files", "TCO Calculator", "Resource lock"], 0, "VNet peering connects virtual networks privately."),
  q("networking", "Which service hosts DNS domains in Azure?", ["Azure DNS", "Azure Advisor", "Azure Arc", "Azure Data Box"], 0, "Azure DNS hosts and manages DNS zones."),
  q("networking", "A company needs site-to-site encrypted connectivity to Azure over the internet. What should it use?", ["VPN Gateway", "ExpressRoute only", "Azure Monitor", "Blob Storage"], 0, "VPN Gateway supports encrypted site-to-site traffic over the public internet."),
  q("networking", "Which answer best contrasts ExpressRoute with VPN Gateway?", ["ExpressRoute is private connectivity; VPN Gateway uses encrypted internet tunnels", "ExpressRoute stores blobs; VPN Gateway stores tables", "ExpressRoute is identity; VPN Gateway is billing", "They are the same service"], 0, "ExpressRoute is private provider connectivity, while VPN Gateway uses encrypted tunnels over the internet."),

  q("storage", "Which storage service should hold messages waiting to be processed?", ["Queue Storage", "Blob Storage", "Azure Files", "Azure Disk Storage"], 0, "Queue Storage stores messages for asynchronous processing."),
  q("storage", "Which storage service is schema-less key/value storage?", ["Table Storage", "Azure Files", "Blob Storage", "Azure Data Box"], 0, "Table Storage stores structured NoSQL key/attribute data."),
  q("storage", "Which redundancy option keeps copies in one datacenter?", ["LRS", "ZRS", "GRS", "GZRS"], 0, "Locally redundant storage keeps copies within a single datacenter."),
  q("storage", "Which redundancy option adds a secondary region?", ["GRS", "LRS", "Hot tier", "Azure Files"], 0, "Geo-redundant storage replicates to a secondary region."),
  q("storage", "Which tool gives a graphical interface for Azure Storage?", ["Azure Storage Explorer", "AzCopy", "Azure Policy", "Azure Arc"], 0, "Storage Explorer is the GUI tool for Azure Storage."),

  q("identity", "Which term means confirming a user's identity?", ["Authentication", "Authorization", "Geo-replication", "Peering"], 0, "Authentication verifies who the user is."),
  q("identity", "Which term means deciding what a signed-in user can access?", ["Authorization", "Authentication", "Elasticity", "Replication"], 0, "Authorization determines what actions or resources are allowed."),
  q("identity", "Which feature lets users access multiple apps after one sign-in?", ["Single sign-on", "Resource lock", "AzCopy", "Availability set"], 0, "SSO reduces repeated sign-ins across applications."),
  q("identity", "Which feature can require MFA only when sign-in risk is high?", ["Conditional Access", "Azure Data Box", "Queue Storage", "Region pair"], 0, "Conditional Access uses signals and can require controls such as MFA."),
  q("identity", "Which model uses several protective layers instead of one control?", ["Defense in depth", "Scaling up", "Consumption pricing", "Public endpoint"], 0, "Defense in depth layers security controls."),

  q("cost", "Which item is most likely to increase Azure cost when users download lots of data?", ["Outbound network traffic", "A resource tag", "A management group name", "A private DNS label"], 0, "Outbound data transfer can affect cost."),
  q("cost", "Which Azure feature can notify you when spending crosses a threshold?", ["Budgets and alerts", "Availability zones", "VNet peering", "Azure Files SMB"], 0, "Cost Management budgets can trigger alerts."),
  q("cost", "A team wants to group costs by department. What should they add to resources?", ["Tags", "Fault domains", "MFA prompts", "Private endpoints"], 0, "Tags help classify costs by department, owner, project, or environment."),
  q("cost", "Which calculator is better before creating a new Azure VM estimate?", ["Pricing Calculator", "TCO Calculator", "Service Health", "Azure Arc"], 0, "Pricing Calculator estimates Azure service configurations."),
  q("cost", "Which factor can make the same Azure resource cost different amounts?", ["Region", "Resource group color", "User display name", "Portal theme"], 0, "Azure pricing can vary by region."),

  q("governance", "A company wants to block creation of resources outside approved regions. What should it use?", ["Azure Policy", "Azure Monitor", "Azure Data Box", "Application Insights"], 0, "Azure Policy can enforce allowed regions."),
  q("governance", "What is an Azure Policy initiative?", ["A group of policy definitions", "A group of VM disks", "A DNS record set", "A storage access tier"], 0, "An initiative bundles policies together."),
  q("governance", "Which lock type prevents both deletion and modification?", ["ReadOnly lock", "Delete lock", "Hot lock", "MFA lock"], 0, "A ReadOnly lock prevents updates and deletes."),
  q("governance", "Which lock type prevents deletion but still allows permitted updates?", ["Delete lock", "ReadOnly lock", "Policy initiative", "Management group"], 0, "A delete lock prevents deletion, not all changes."),
  q("governance", "Which governance tool discovers and classifies sensitive data?", ["Microsoft Purview", "Azure Functions", "VM Scale Sets", "Azure DNS"], 0, "Microsoft Purview helps discover, classify, and govern data."),

  q("tools", "Which tool is best for a one-time visual resource creation task?", ["Azure portal", "Azure Arc", "Azure Monitor Logs", "Azure Data Box"], 0, "The portal is the web-based graphical management interface."),
  q("tools", "Which command-line tool uses commands like az group create?", ["Azure CLI", "Azure PowerShell", "ARM template", "Service Health"], 0, "Azure CLI uses az commands."),
  q("tools", "Which tool uses PowerShell cmdlets for Azure administration?", ["Azure PowerShell", "Azure CLI", "Azure Advisor", "Microsoft Purview"], 0, "Azure PowerShell uses cmdlets for Azure tasks."),
  q("tools", "Which deployment approach is declarative JSON infrastructure as code?", ["ARM templates", "Azure Status", "Storage Explorer", "Conditional Access"], 0, "ARM templates declare the desired Azure resources in JSON."),
  q("tools", "Which service is the best answer for managing on-premises servers through Azure?", ["Azure Arc", "Azure App Service", "Azure Blob Storage", "Azure Pricing Calculator"], 0, "Azure Arc extends Azure management to non-Azure resources."),

  q("monitor", "Which Advisor category would recommend resizing an underused VM?", ["Cost", "Identity", "Storage access tier only", "DNS"], 0, "Advisor cost recommendations can identify underused or oversized resources."),
  q("monitor", "Which tool gives a global public view of Azure service health?", ["Azure Status", "Azure Service Health", "Resource Health", "Application Insights"], 0, "Azure Status shows global Azure service health."),
  q("monitor", "Which tool is most specific to one VM's availability issue?", ["Resource Health", "Azure Status", "Pricing Calculator", "Microsoft Entra ID"], 0, "Resource Health focuses on individual resource health."),
  q("monitor", "Which Azure Monitor feature can notify an admin when a metric crosses a threshold?", ["Alerts", "Tags", "Data Box", "VNet peering"], 0, "Azure Monitor Alerts notify or act when conditions are met."),
  q("monitor", "Which service collects telemetry from cloud and on-premises environments?", ["Azure Monitor", "Azure DNS", "Azure Files", "TCO Calculator"], 0, "Azure Monitor collects and analyzes telemetry.")
];

const exampleQuestionBank = [
  q("cloud", "A small online store wants to avoid buying servers before it knows how much traffic it will get. Which cloud idea fits best?", ["OpEx with consumption-based pricing", "CapEx hardware purchasing", "A private datacenter only", "Manual capacity planning only"], 0, "Cloud services usually support operational spending and paying for what is used."),
  tf("cloud", "True or False: In a public cloud, the customer owns the physical datacenter hardware.", false, "In a public cloud, the provider owns and operates the physical infrastructure."),
  q("cloud", "A company keeps a legacy database on-premises but runs new reporting dashboards in Azure. What model is this?", ["Hybrid cloud", "SaaS only", "Private cloud only", "CapEx only"], 0, "Hybrid cloud combines on-premises/private resources with public cloud services."),

  q("benefits", "A concert site needs extra capacity for one hour when tickets go on sale, then should return to normal. Which benefit is most important?", ["Elasticity", "Data classification", "Resource locking", "Manual patching"], 0, "Elasticity is the ability to add and remove capacity as demand changes."),
  tf("benefits", "True or False: Composite SLA usually decreases when a solution depends on multiple required services.", true, "When every service must be available, the combined availability is multiplied together."),
  q("benefits", "A company wants an app to keep running if one datacenter in a region fails. Which design feature helps?", ["Availability Zones", "Tags", "Azure CLI", "Archive tier"], 0, "Availability Zones are physically separate datacenters inside a region."),

  q("service", "A developer wants to deploy code without managing operating system patches. Which service model should they prefer?", ["PaaS", "IaaS", "Private cloud hardware", "Manual datacenter hosting"], 0, "PaaS lets the developer focus more on code while the provider manages the platform."),
  tf("service", "True or False: Azure Virtual Machines are usually considered PaaS because Microsoft fully manages the guest operating system.", false, "Virtual Machines are IaaS; the customer manages the guest operating system."),
  q("service", "Employees need to use a complete cloud email and office suite. Which model does that sound like?", ["SaaS", "IaaS", "VNet peering", "A resource lock"], 0, "SaaS is complete software delivered over the internet."),

  q("architecture", "A school wants separate billing and access for student labs and staff systems. What should it use?", ["Separate subscriptions", "One availability zone", "One tag only", "A single VM disk"], 0, "Subscriptions are billing and access control boundaries."),
  tf("architecture", "True or False: A resource group can contain related resources such as VMs, storage accounts, and virtual networks.", true, "Resource groups are management containers for related Azure resources."),
  q("architecture", "A company needs policies to apply across many subscriptions. Which scope helps?", ["Management group", "Resource Health", "Azure Files", "Availability set"], 0, "Management groups organize subscriptions for governance at scale."),

  q("compute", "A payroll app requires custom Windows services and admin control over the OS. Which compute option fits?", ["Azure Virtual Machines", "Azure Functions", "Azure App Service", "Azure Blob Storage"], 0, "Virtual Machines are best when OS-level control is required."),
  tf("compute", "True or False: Azure Functions are a good fit for event-driven code that runs when something triggers it.", true, "Azure Functions are serverless and event driven."),
  q("compute", "A company wants to run many containers with scheduling, scaling, and orchestration. Which service fits?", ["Azure Kubernetes Service", "Azure Files", "Azure Policy", "Pricing Calculator"], 0, "AKS is used for managed Kubernetes container orchestration."),

  q("networking", "An admin needs secure RDP access to a VM without assigning the VM a public IP address. What should they use?", ["Azure Bastion", "Azure Status", "Blob Archive tier", "TCO Calculator"], 0, "Azure Bastion provides browser-based RDP/SSH without exposing public VM IPs."),
  tf("networking", "True or False: ExpressRoute provides private connectivity to Azure through a connectivity provider.", true, "ExpressRoute is private provider-based connectivity, unlike VPN over the public internet."),
  q("networking", "A company needs encrypted connectivity from an office to Azure over the public internet. Which service fits?", ["VPN Gateway", "ExpressRoute only", "Azure Advisor", "Azure Table Storage"], 0, "VPN Gateway uses encrypted tunnels over the public internet."),

  q("storage", "A video training site stores thousands of uploaded MP4 files. Which storage service fits best?", ["Blob Storage", "Queue Storage", "Table Storage", "Azure Policy"], 0, "Blob Storage is designed for unstructured object data such as videos and images."),
  tf("storage", "True or False: Azure Files can provide SMB file shares for cloud or hybrid use.", true, "Azure Files provides managed file shares over SMB."),
  q("storage", "A retail app needs a globally distributed NoSQL database with low latency. Which service fits?", ["Azure Cosmos DB", "Azure SQL Database only", "Azure Bastion", "Resource locks"], 0, "Cosmos DB is Azure's globally distributed NoSQL database service."),

  q("identity", "A sign-in from an unfamiliar country should require MFA before access is allowed. Which feature fits?", ["Conditional Access", "Azure Data Box", "VNet peering", "Availability Zones"], 0, "Conditional Access can apply controls such as MFA based on signals like location or risk."),
  tf("identity", "True or False: Authentication verifies who someone is; authorization determines what they can do.", true, "Authentication proves identity, while authorization controls permissions."),
  q("identity", "An app needs a safe place to store database passwords and certificates. Which product fits?", ["Azure Key Vault", "Azure Status", "Azure Files", "Pricing Calculator"], 0, "Key Vault securely stores secrets, keys, and certificates."),

  q("cost", "A manager wants to estimate the monthly price of a planned VM before creating it. Which tool should they use?", ["Pricing Calculator", "Service Health", "Azure Policy", "Application Insights"], 0, "Pricing Calculator estimates Azure service costs before deployment."),
  tf("cost", "True or False: Tags can help group Azure costs by department, project, owner, or environment.", true, "Tags are metadata used for organization, reporting, automation, and cost tracking."),
  q("cost", "A company wants to compare current datacenter costs with the cost of moving to Azure. Which tool fits?", ["TCO Calculator", "Azure Portal theme", "Resource Health", "Azure Bastion"], 0, "TCO Calculator compares on-premises costs with estimated Azure costs."),

  q("governance", "A school wants to deny student-created resources outside approved regions. Which service fits?", ["Azure Policy", "Azure Monitor", "Azure Functions", "Azure Files"], 0, "Azure Policy can enforce rules such as allowed locations."),
  tf("governance", "True or False: RBAC controls user permissions, while Azure Policy controls resource compliance rules.", true, "RBAC is about who can do what; Policy is about what resource configurations are allowed."),
  q("governance", "An important production database must not be deleted by accident. Which feature helps?", ["Resource lock", "Azure Status", "Cloud Shell", "Archive tier"], 0, "Resource locks help prevent accidental deletion or modification."),

  q("tools", "A team wants the same environment deployed again and again from code. Which option fits best?", ["Bicep or ARM templates", "Azure Status", "Manual portal clicks only", "Resource Health"], 0, "Bicep and ARM templates support repeatable infrastructure-as-code deployments."),
  tf("tools", "True or False: Azure Cloud Shell includes browser-based access to Azure CLI and Azure PowerShell.", true, "Cloud Shell is a browser-based shell environment for Azure administration."),
  q("tools", "A company wants to manage on-premises servers with Azure governance tools. Which service fits?", ["Azure Arc", "Azure App Service", "Azure Blob Storage", "Azure Pricing Calculator"], 0, "Azure Arc extends Azure management to hybrid and multicloud resources."),

  q("monitor", "A team needs to inspect failures, response times, and usage for a web app. Which service fits?", ["Application Insights", "Azure Data Box", "Resource locks", "TCO Calculator"], 0, "Application Insights monitors application performance, availability, failures, and usage."),
  tf("monitor", "True or False: Azure Status is personalized to only the services and regions in your subscription.", false, "Azure Status is global and public. Azure Service Health is personalized."),
  q("monitor", "An admin wants an alert when VM CPU stays above a threshold. Which feature fits?", ["Azure Monitor Alerts", "Azure Marketplace", "Azure Data Box", "Management groups"], 0, "Azure Monitor Alerts notify or trigger action based on metrics or logs.")
];

const fullQuestionBank = [...questionBank, ...extraQuestionBank, ...exampleQuestionBank];

const flashCardBank = [
  fc("Cloud Computing", "Delivery of computing services over the internet, including compute, storage, networking, databases, analytics, and software.", "cloud"),
  fc("Public Cloud", "Provider-owned cloud resources shared across customers and accessed over a secure network connection.", "cloud"),
  fc("Private Cloud", "Cloud resources dedicated to one organization, usually with more control and more customer responsibility.", "cloud"),
  fc("Hybrid Cloud", "A model that combines public cloud and private/on-premises environments.", "cloud"),
  fc("CapEx", "Up-front spending on physical infrastructure such as servers, datacenters, and hardware.", "cloud"),
  fc("OpEx", "Ongoing operational spending, such as paying monthly for cloud resources as they are used.", "cloud"),
  fc("Consumption-Based Pricing", "A cloud billing model where you pay for actual resource usage.", "cloud"),
  fc("High Availability", "Designing a service to remain available with minimal downtime.", "benefits"),
  fc("Composite SLA", "The combined availability of multiple services in one solution. Multiply each service SLA to estimate the overall SLA.", "benefits"),
  fc("Scalability", "The ability to increase or decrease resources to meet demand.", "benefits"),
  fc("Scale Up", "Increase the size or power of one resource.", "benefits"),
  fc("Scale Out", "Add more instances of a resource.", "benefits"),
  fc("Elasticity", "Automatic or rapid scaling as demand rises and falls.", "benefits"),
  fc("Reliability", "The ability of a system to recover from failures and keep functioning.", "benefits"),
  fc("IaaS", "Infrastructure as a service. You rent infrastructure and manage the OS, apps, and data.", "service"),
  fc("PaaS", "Platform as a service. You focus on app code while the provider manages much of the platform.", "service"),
  fc("SaaS", "Software as a service. Users consume a complete app over the internet.", "service"),
  fc("Shared Responsibility", "Microsoft and the customer split security/management duties; customers always care for data, identities, and access.", "service"),
  fc("Azure Region", "A geographic area containing one or more Azure datacenters.", "architecture"),
  fc("Availability Zone", "Physically separate datacenters inside the same Azure region.", "architecture"),
  fc("Region Pair", "Two Azure regions in the same geography used for some replication and recovery patterns.", "architecture"),
  fc("Resource", "An Azure item you create, such as a VM, storage account, virtual network, or app service.", "architecture"),
  fc("Resource Group", "A management container for Azure resources. A resource can be in only one resource group at a time.", "architecture"),
  fc("Subscription", "An Azure billing boundary and access control boundary.", "architecture"),
  fc("Management Group", "A scope above subscriptions used to apply governance across many subscriptions.", "architecture"),
  fc("Virtual Machine", "IaaS compute with virtual CPU, memory, disks, networking, and an operating system.", "compute"),
  fc("VM Scale Set", "A way to manage and scale a group of virtual machine instances.", "compute"),
  fc("Azure App Service", "A managed platform for hosting web apps and APIs.", "compute"),
  fc("Azure Functions", "Serverless, event-driven compute that runs code when triggered.", "compute"),
  fc("Azure Container Instances", "A simple way to run containers without managing servers.", "compute"),
  fc("Azure Kubernetes Service", "Managed Kubernetes for orchestrating many containers.", "compute"),
  fc("Virtual Network", "Azure private networking foundation for resources, internet access, and on-premises connectivity.", "networking"),
  fc("Subnet", "A segment of a virtual network address space.", "networking"),
  fc("VNet Peering", "Connects Azure virtual networks so resources can communicate privately.", "networking"),
  fc("Public Endpoint", "An endpoint reachable from the internet.", "networking"),
  fc("Private Endpoint", "An endpoint reachable through private network access.", "networking"),
  fc("VPN Gateway", "Encrypted connectivity between Azure and on-premises networks over the public internet.", "networking"),
  fc("ExpressRoute", "Private connectivity from on-premises networks to Azure through a provider.", "networking"),
  fc("Blob Storage", "Object storage for massive amounts of unstructured data.", "storage"),
  fc("Azure Files", "Managed file shares accessed with SMB.", "storage"),
  fc("Queue Storage", "Message storage for asynchronous processing.", "storage"),
  fc("Table Storage", "NoSQL key/attribute storage.", "storage"),
  fc("LRS", "Locally redundant storage; copies data within one datacenter.", "storage"),
  fc("ZRS", "Zone-redundant storage; copies data across availability zones in one region.", "storage"),
  fc("GRS", "Geo-redundant storage; replicates data to a secondary region.", "storage"),
  fc("AzCopy", "Command-line tool for copying blobs or files to and from Azure Storage.", "storage"),
  fc("Azure Data Box", "Physical device option for offline transfer of large amounts of data.", "storage"),
  fc("Microsoft Entra ID", "Cloud-based identity and access management.", "identity"),
  fc("Authentication", "Verifies who a user is.", "identity"),
  fc("Authorization", "Determines what a signed-in user can access or do.", "identity"),
  fc("MFA", "Multifactor authentication; requires extra proof beyond a password.", "identity"),
  fc("Conditional Access", "Uses signals such as user, device, location, app, or risk to allow, block, or require controls.", "identity"),
  fc("RBAC", "Role-based access control; grants permissions at Azure scopes.", "identity"),
  fc("Zero Trust", "Security model that assumes breach and verifies explicitly.", "identity"),
  fc("Defense in Depth", "Layered security controls so one failed layer does not expose everything.", "identity"),
  fc("Pricing Calculator", "Estimates Azure product costs before deployment.", "cost"),
  fc("TCO Calculator", "Compares on-premises costs with estimated Azure costs.", "cost"),
  fc("Tags", "Name-value metadata used for organization, reporting, automation, ownership, and cost tracking.", "cost"),
  fc("Azure Policy", "Enforces standards and assesses compliance at scale.", "governance"),
  fc("Initiative", "A group of Azure Policy definitions managed together.", "governance"),
  fc("Resource Lock", "Protects resources from accidental deletion or modification.", "governance"),
  fc("Microsoft Purview", "Data governance, discovery, classification, lineage, risk, and compliance capabilities.", "governance"),
  fc("ARM", "Azure Resource Manager, the management layer for creating, updating, and deleting Azure resources.", "tools"),
  fc("ARM Template", "Declarative JSON infrastructure-as-code file for repeatable Azure deployments.", "tools"),
  fc("Cloud Shell", "Browser-based shell with Azure CLI and Azure PowerShell.", "tools"),
  fc("Azure Arc", "Extends Azure management and governance to non-Azure resources.", "tools"),
  fc("Azure Advisor", "Best-practice recommendations for reliability, security, performance, cost, and operations.", "monitor"),
  fc("Azure Status", "Global public view of Azure service health.", "monitor"),
  fc("Service Health", "Personalized health view for Azure services and regions you use.", "monitor"),
  fc("Resource Health", "Health information for individual Azure resources.", "monitor"),
  fc("Azure Monitor", "Telemetry platform for collecting, analyzing, and acting on metrics and logs.", "monitor"),
  fc("Log Analytics", "Tool for querying and analyzing log data.", "monitor"),
  fc("Application Insights", "Application performance, usage, availability, and failure monitoring.", "monitor"),
  fc("Azure Virtual Desktop", "Cloud service for delivering Windows desktops and apps to users from Azure.", "compute"),
  fc("Azure Container Apps", "Managed platform for running containerized apps and microservices with scaling and load balancing.", "compute"),
  fc("Azure SQL Database", "Managed relational database service based on SQL Server.", "storage"),
  fc("Azure Cosmos DB", "Globally distributed NoSQL database service for low-latency apps.", "storage"),
  fc("Azure Database for MySQL", "Managed MySQL database service in Azure.", "storage"),
  fc("Azure Database for PostgreSQL", "Managed PostgreSQL database service in Azure.", "storage"),
  fc("Azure Cache for Redis", "Managed in-memory cache used to speed up apps and store frequently accessed data.", "storage"),
  fc("Azure Disk Storage", "Managed disks used by Azure virtual machines and other compute workloads.", "storage"),
  fc("Azure Data Lake Storage", "Storage for big data analytics workloads, built on Azure Blob Storage.", "storage"),
  fc("Azure Backup", "Service for backing up Azure and on-premises data and recovering it when needed.", "storage"),
  fc("Azure Site Recovery", "Disaster recovery service that replicates workloads and helps fail over during outages.", "storage"),
  fc("Azure Load Balancer", "Layer 4 load balancer that distributes inbound traffic across healthy resources.", "networking"),
  fc("Azure Application Gateway", "Layer 7 web traffic load balancer with features such as URL routing and web app firewall integration.", "networking"),
  fc("Azure Front Door", "Global entry point for web apps that improves performance, routing, and availability.", "networking"),
  fc("Azure Traffic Manager", "DNS-based traffic routing service that directs users to endpoints based on routing rules.", "networking"),
  fc("Azure Firewall", "Managed cloud network security service that filters traffic for Azure resources.", "networking"),
  fc("Network Security Group", "Rules that allow or deny inbound and outbound network traffic to Azure resources.", "networking"),
  fc("Azure Bastion", "Secure browser-based RDP/SSH access to virtual machines without exposing public IPs.", "networking"),
  fc("Azure Private Link", "Private connectivity to Azure services through private endpoints.", "networking"),
  fc("Microsoft Entra Domain Services", "Managed domain services for legacy apps without managing domain controllers.", "identity"),
  fc("Microsoft Entra External ID", "Identity features for external users, customers, partners, and guests.", "identity"),
  fc("Microsoft Defender for Cloud", "Security posture management and threat protection for Azure, hybrid, and multicloud workloads.", "identity"),
  fc("Microsoft Sentinel", "Cloud-native SIEM and SOAR service for security analytics and threat response.", "identity"),
  fc("Azure Key Vault", "Securely stores secrets, keys, and certificates used by apps and services.", "identity"),
  fc("Azure DDoS Protection", "Protects Azure resources from distributed denial-of-service attacks.", "identity"),
  fc("Azure Cost Management", "Tools for monitoring, analyzing, budgeting, and optimizing Azure spending.", "cost"),
  fc("Azure Marketplace", "Catalog for finding, buying, and deploying third-party and Microsoft cloud solutions.", "cost"),
  fc("Microsoft Service Trust Portal", "Portal for Microsoft compliance, audit, privacy, and trust resources.", "governance"),
  fc("Azure Blueprints", "Legacy governance service for deploying repeatable sets of resources, policies, and role assignments.", "governance"),
  fc("Azure Resource Manager", "Azure control plane for deploying and managing resources consistently.", "tools"),
  fc("Azure Portal", "Web-based graphical interface for creating and managing Azure resources.", "tools"),
  fc("Azure CLI", "Cross-platform command-line tool that uses az commands to manage Azure.", "tools"),
  fc("Azure PowerShell", "PowerShell module for managing Azure resources with cmdlets.", "tools"),
  fc("Azure Resource Manager Templates", "JSON templates used to deploy Azure infrastructure declaratively and repeatedly.", "tools"),
  fc("Bicep", "Simpler declarative language for deploying Azure resources, compiled to ARM templates.", "tools"),
  fc("Azure Migrate", "Assessment and migration hub for moving servers, databases, apps, and data to Azure.", "tools"),
  fc("Azure Monitor Alerts", "Rules that notify or trigger actions when metrics or logs meet conditions.", "monitor"),
  fc("Azure Monitor Metrics", "Numeric time-series data collected from Azure resources.", "monitor"),
  fc("Azure Monitor Logs", "Log data collected for querying, analysis, alerts, and dashboards.", "monitor"),
  fc("Azure Automation", "Service for automating cloud management tasks such as runbooks and updates.", "tools")
];

const exampleFlashCards = [
  exampleCard("An online store needs extra capacity during a holiday traffic spike, then lower capacity after the rush.", "Elasticity or autoscaling. Capacity grows during demand and shrinks when traffic returns to normal.", "benefits"),
  exampleCard("A company keeps an older records system on-premises while moving new reporting tools to Azure.", "Hybrid cloud. Some workloads stay local while others run in Azure.", "cloud"),
  exampleCard("A payroll app needs operating system control, custom software, and a lift-and-shift migration path.", "Azure Virtual Machines. VMs are best when the workload needs OS-level control.", "compute"),
  exampleCard("Code should run only when a file is uploaded, a timer fires, or a message arrives.", "Azure Functions. Functions are serverless and event driven.", "compute"),
  exampleCard("An admin needs RDP or SSH access to a VM without exposing the VM to a public IP address.", "Azure Bastion. Bastion provides browser-based RDP/SSH access over a private path.", "networking"),
  exampleCard("A company wants a private office-to-Azure connection through a connectivity provider.", "ExpressRoute. For encrypted public internet tunnels, choose VPN Gateway instead.", "networking"),
  exampleCard("A training site stores uploaded videos, images, logs, and backup files.", "Blob Storage. It stores unstructured object data.", "storage"),
  exampleCard("Two virtual machines need to share files through SMB.", "Azure Files. It provides managed file shares.", "storage"),
  exampleCard("A retail app needs globally distributed NoSQL data with low-latency access.", "Azure Cosmos DB. It is built for global NoSQL workloads.", "storage"),
  exampleCard("A sign-in from a risky location should require MFA before access is allowed.", "Conditional Access. It can allow, block, or require controls based on signals such as risk or location.", "identity"),
  exampleCard("An app needs a safe place to store database passwords, certificates, and encryption keys.", "Azure Key Vault. It protects secrets, keys, and certificates.", "identity"),
  exampleCard("A manager wants to estimate the monthly price of a planned VM before creating it.", "Pricing Calculator. It estimates Azure service costs before deployment.", "cost"),
  exampleCard("Leadership wants to compare current datacenter costs with the cost of moving to Azure.", "TCO Calculator. It compares on-premises costs with estimated Azure costs.", "cost"),
  exampleCard("Students should be blocked from creating resources outside approved regions.", "Azure Policy. It can deny or audit resources that do not meet standards.", "governance"),
  exampleCard("A production database must not be deleted by accident.", "Resource lock. A delete lock helps protect important resources from accidental deletion.", "governance"),
  exampleCard("A team needs the same environment deployed repeatedly from code.", "Bicep or ARM templates. They deploy Azure resources consistently from infrastructure as code.", "tools"),
  exampleCard("A company wants Azure management and governance for on-premises servers.", "Azure Arc. It extends Azure management to on-premises, edge, and other-cloud resources.", "tools"),
  exampleCard("A web app has failures and slow response times that developers need to investigate.", "Application Insights. It monitors app performance, failures, availability, and usage.", "monitor"),
  exampleCard("An admin needs to understand why one specific VM is unhealthy.", "Resource Health. It shows health details for individual Azure resources.", "monitor"),
  exampleCard("A team needs personalized notices about Azure outages affecting their services and regions.", "Azure Service Health. It is personalized to the services and regions you use.", "monitor")
];

flashCardBank.push(...exampleFlashCards);

const ORIGINAL_DATA = {
  topics: deepClone(topics),
  fullQuestionBank: deepClone(fullQuestionBank),
  flashCardBank: deepClone(flashCardBank)
};

const DATA_TRANSLATION_SKIP_KEYS = new Set(["id", "topic", "icon", "color", "kind"]);
const LANGUAGE_PACK_URLS = {
  es: "./i18n/es.json"
};

const state = {
  screen: "home",
  topicId: null,
  lessonIndex: 0,
  quizIds: [],
  activeQuestions: [],
  quizMode: "topic",
  quizSourceTopic: null,
  quizSourceLessonIndex: null,
  resultSaved: false,
  flashCards: [],
  flashIndex: 0,
  flashFlipped: false,
  flashFilterTopic: "all",
  quizIndex: 0,
  selected: null,
  checked: false,
  answers: {},
  bookmarked: load("az900-bookmarks", {}),
  flashSaved: load("az900-saved-flashcards", {}),
  searchQuery: "",
  language: load("bca-language", "en"),
  translating: false,
  translationError: ""
};

const uiTranslations = {
  "English": "English",
  "Español": "Español",
  "lessons": "lecciones",
  "readiness": "preparación",
  "best final": "mejor final",
  "Daily Quick Drill": "Práctica rápida diaria",
  "Search": "Buscar",
  "Flash Cards": "Tarjetas",
  "Bookmarked Lessons": "Lecciones guardadas",
  "Exam Readiness": "Preparación para el examen",
  "Focus Next": "Enfócate después",
  "Take a quiz or quick drill to reveal weak areas.": "Haz un quiz o práctica rápida para ver tus áreas débiles.",
  "Start Practicing": "Empieza a practicar",
  "Keep Practicing": "Sigue practicando",
  "Almost Ready": "Casi listo",
  "Ready": "Listo",
  "Run a quick drill or 45-question final to calibrate.": "Haz una práctica rápida o un final de 45 preguntas para calibrarte.",
  "Use quick drills and review missed answers.": "Usa prácticas rápidas y revisa las respuestas falladas.",
  "Keep drilling missed questions and weaker areas.": "Sigue practicando preguntas falladas y áreas débiles.",
  "Recent final practice is in a strong pass range.": "Tu práctica final reciente está en un rango fuerte para aprobar.",
  "Choose Subject": "Elegir tema",
  "All Flash Cards": "Todas las tarjetas",
  "Saved Flash Cards": "Tarjetas guardadas",
  "All subjects": "Todos los temas",
  "Saved cards": "Tarjetas guardadas",
  "Subject": "Tema",
  "Save": "Guardar",
  "Saved": "Guardada",
  "Shuffle": "Mezclar",
  "Flip": "Voltear",
  "Tap to reveal the answer": "Toca para revelar la respuesta",
  "Tap to see the term": "Toca para ver el termino",
  "Tap to see the example": "Toca para ver el ejemplo",
  "Home tile: Study": "Sección: Estudio",
  "Home tile": "Sección",
  "Study": "Estudio",
  "Quiz Results": "Resultados del quiz",
  "Review Missed": "Revisar falladas",
  "Next Lesson": "Siguiente lección",
  "Home": "Inicio",
  "Try Again": "Intentar otra vez",
  "Question": "Pregunta",
  "of": "de",
  "answered": "respondidas",
  "Check": "Revisar",
  "Correct": "Correcto",
  "Review": "Revisar",
  "Reveal": "Mostrar",
  "Prev": "Anterior",
  "Next": "Siguiente",
  "Done": "Listo",
  "Quiz": "Quiz",
  "Answer breakdown": "Desglose de respuestas",
  "Fresh 45 Final": "Final nuevo de 45",
  "Missed Questions": "Preguntas falladas",
  "Search lessons and flash cards by service, term, or exam clue.": "Busca lecciones y tarjetas por servicio, término o pista del examen.",
  "Search SLA, RBAC, Bastion...": "Busca SLA, RBAC, Bastion...",
  "No matches yet. Try a shorter term.": "Todavía no hay resultados. Prueba un término más corto.",
  "Lesson": "Lección",
  "Flash Card": "Tarjeta",
  "correct": "correctas",
  "Strong pass pace. Review missed questions once, then run another 45-question set.": "Vas a ritmo de aprobación. Revisa las preguntas falladas y luego haz otro set de 45 preguntas.",
  "Keep going. Tap review and focus on the explanations for missed questions.": "Sigue adelante. Toca revisar y enfócate en las explicaciones de las preguntas falladas.",
  "Cloud Concepts": "Conceptos de la nube",
  "Cloud Benefits": "Beneficios de la nube",
  "Service Models": "Modelos de servicio",
  "Azure Architecture": "Arquitectura de Azure",
  "Compute Hosting": "Hospedaje de computo",
  "Networking": "Redes",
  "Storage + Databases": "Almacenamiento + bases de datos",
  "Identity + Security": "Identidad + seguridad",
  "Cost Management": "Administracion de costos",
  "Governance": "Gobernanza",
  "Deployment Tools": "Herramientas de implementacion",
  "Monitoring": "Monitoreo",
  "Final Exam Map": "Mapa del examen final",
  "Start 45-question final practice": "Comenzar práctica final de 45 preguntas",
  "Updating language...": "Actualizando idioma...",
  "Spanish translation could not load. Check Azure Translator settings, then tap Español again.": "La traducción al español no pudo cargarse. Revisa la configuración de Azure Translator y toca Español otra vez."
};

function t(text) {
  return state.language === "es" ? (uiTranslations[text] || text) : text;
}

function q(topic, prompt, choices, answer, explanation) {
  return { id: `${topic}-${Math.random().toString(36).slice(2)}`, topic, prompt, choices, answer, explanation };
}

function tf(topic, prompt, answerIsTrue, explanation) {
  return q(topic, prompt, ["True", "False"], answerIsTrue ? 0 : 1, explanation);
}

function fc(term, definition, topic) {
  return { id: `${topic}-${term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, term, definition, topic };
}

function exampleCard(term, definition, topic) {
  return { ...fc(term, definition, topic), kind: "example" };
}

function exampleLesson(title, examples, remember) {
  return {
    title,
    body: [],
    sections: [
      {
        title: "Examples",
        items: examples.map(([situation, answer]) => `${situation} ${answer}`)
      }
    ],
    remember
  };
}

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function replaceArrayContents(target, source) {
  target.splice(0, target.length, ...deepClone(source));
}

function restoreEnglishData() {
  replaceArrayContents(topics, ORIGINAL_DATA.topics);
  replaceArrayContents(fullQuestionBank, ORIGINAL_DATA.fullQuestionBank);
  replaceArrayContents(flashCardBank, ORIGINAL_DATA.flashCardBank);
}

async function setLanguage(language) {
  state.language = language;
  state.translationError = "";
  save("bca-language", language);
  document.documentElement.lang = language === "es" ? "es" : "en";
  state.translating = true;
  render();
  try {
    await localizeData(language);
  } catch (error) {
    state.translationError = error.message || "Translation failed";
    restoreEnglishData();
  }
  state.translating = false;
  render();
}

async function localizeData(language) {
  if (language !== "es") {
    restoreEnglishData();
    state.translationError = "";
    return;
  }
  const packTranslations = await loadLanguagePack(language);
  if (!packTranslations) throw new Error("Spanish language pack could not load.");
  const localized = applyTranslationMapToDataSet(ORIGINAL_DATA, packTranslations);
  assertSpanishDataLoaded(localized);
  replaceArrayContents(topics, localized.topics);
  replaceArrayContents(fullQuestionBank, localized.fullQuestionBank);
  replaceArrayContents(flashCardBank, localized.flashCardBank);
  state.translationError = "";
}

function applyTranslationMapToDataSet(data, translations) {
  const localized = deepClone(data);
  translateStringsInPlace(localized, translations);
  return localized;
}

async function loadLanguagePack(language) {
  if (!LANGUAGE_PACK_URLS[language]) return null;
  if (languagePackCache[language]) return languagePackCache[language];
  try {
    const response = await fetch(LANGUAGE_PACK_URLS[language], { cache: "force-cache" });
    if (!response.ok) throw new Error("Language pack not found");
    const pack = await response.json();
    languagePackCache[language] = pack.translations || {};
    return languagePackCache[language];
  } catch {
    return null;
  }
}

async function translateDataSet(data, language) {
  const localized = deepClone(data);
  const strings = [];
  collectTranslatableStrings(localized, strings);
  const translations = await getTranslations([...new Set(strings)], language, { throwOnFailure: true });
  translateStringsInPlace(localized, translations);
  return localized;
}

function assertSpanishDataLoaded(localized) {
  const networking = localized.topics.find((topic) => topic.id === "networking");
  const lesson = networking?.lessons?.find((item) => item.title === "Endpoints And DNS");
  if (lesson || networking?.title === "Networking") {
    throw new Error("Spanish study content was not translated.");
  }
}

function collectTranslatableStrings(value, bucket, key = "") {
  if (typeof value === "string") {
    if (shouldTranslateDataString(value, key)) bucket.push(value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectTranslatableStrings(item, bucket, key));
    return;
  }
  if (!value || typeof value !== "object") return;
  Object.entries(value).forEach(([childKey, childValue]) => {
    collectTranslatableStrings(childValue, bucket, childKey);
  });
}

function translateStringsInPlace(value, translations, key = "") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      if (typeof item === "string") {
        if (shouldTranslateDataString(item, key) && translations[item]) value[index] = translations[item];
        return;
      }
      translateStringsInPlace(item, translations, key);
    });
    return;
  }
  if (!value || typeof value !== "object") return;
  Object.entries(value).forEach(([childKey, childValue]) => {
    if (typeof childValue === "string") {
      if (shouldTranslateDataString(childValue, childKey) && translations[childValue]) {
        value[childKey] = translations[childValue];
      }
      return;
    }
    translateStringsInPlace(childValue, translations, childKey);
  });
}

function shouldTranslateDataString(value, key = "") {
  const text = value.trim();
  if (!text || DATA_TRANSLATION_SKIP_KEYS.has(key)) return false;
  if (!/[A-Za-z]/.test(text)) return false;
  return true;
}

function $(selector) {
  return document.querySelector(selector);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isNoTranslateNode(node) {
  const parent = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  return Boolean(parent?.closest("[data-no-translate], svg, script, style"));
}

function collectTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.nodeValue.trim();
      if (!text || !/[A-Za-z]/.test(text) || isNoTranslateNode(node)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}

function preserveSpacing(original, translated) {
  const leading = original.match(/^\s*/)?.[0] || "";
  const trailing = original.match(/\s*$/)?.[0] || "";
  return `${leading}${translated}${trailing}`;
}

async function applyLanguage() {
  const root = document.getElementById("app");
  if (!root) return;
  document.documentElement.lang = state.language === "es" ? "es" : "en";
  if (state.language !== "es") return;
  const run = ++translationRun;
  const nodes = collectTextNodes(root);
  const placeholderNodes = [...root.querySelectorAll("input[placeholder]")].filter((node) => !node.closest("[data-no-translate]"));
  const texts = [
    ...nodes.map((node) => node.nodeValue.trim()),
    ...placeholderNodes.map((node) => node.getAttribute("placeholder").trim())
  ];
  const translations = await getTranslations([...new Set(texts)], "es");
  if (run !== translationRun) return;
  nodes.forEach((node) => {
    const original = node.nodeValue;
    const translated = translations[original.trim()];
    if (translated) node.nodeValue = preserveSpacing(original, translated);
  });
  placeholderNodes.forEach((node) => {
    const original = node.getAttribute("placeholder").trim();
    if (translations[original]) node.setAttribute("placeholder", translations[original]);
  });
}

async function getTranslations(texts, language, options = {}) {
  const packTranslations = await loadLanguagePack(language);
  const output = {};
  texts.forEach((text) => {
    if (!text || text.length > 900) return;
    if (language === "es" && uiTranslations[text]) output[text] = uiTranslations[text];
    else if (packTranslations?.[text]) output[text] = packTranslations[text];
  });
  if (options.throwOnFailure) {
    const missingRequiredText = texts.some((text) => text && text.length <= 900 && !output[text]);
    if (missingRequiredText) throw new Error("Language pack is missing required text.");
  }
  return output;
}

function svg(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.cloud}</svg>`;
}

function topicById(id) {
  return topics.find((topic) => topic.id === id);
}

function progress() {
  const complete = load("az900-complete", {});
  const totalLessons = topics.reduce((sum, topic) => sum + topic.lessons.length, 0);
  const doneLessons = Object.keys(complete).length;
  const bestScore = load("az900-best-final", 0);
  const readiness = examReadiness();
  return { complete, totalLessons, doneLessons, bestScore, readiness };
}

function render() {
  const app = document.getElementById("app");
  if (state.translating) {
    app.innerHTML = renderLanguageLoading();
    wire();
    return;
  }
  if (state.screen === "home") app.innerHTML = renderHome();
  if (state.screen === "topic") app.innerHTML = renderTopic();
  if (state.screen === "lesson") app.innerHTML = renderLesson();
  if (state.screen === "quiz") app.innerHTML = renderQuiz();
  if (state.screen === "flashcards") app.innerHTML = renderFlashCards();
  if (state.screen === "flashSubjects") app.innerHTML = renderFlashSubjectPicker();
  if (state.screen === "search") app.innerHTML = renderSearch();
  wire();
  applyVisibleSpanishFallback();

  setTimeout(() => {
    document.querySelectorAll(".stat-ring").forEach((ring) => {
      const value = ring.style.getPropertyValue("--value");
      const color = ring.classList.contains("readiness-ready")
        ? "var(--green)"
        : ring.classList.contains("readiness-build") ? "#ffb84d" : "var(--cyan)";
      ring.style.background =
        `conic-gradient(${color} ${value}, rgba(255,255,255,0.08) 0)`;
    });
  }, 100);
}

function topbar(title, right = "info") {
  const back = state.screen === "home" ? `<div></div>` : `<button class="icon-button" data-action="back" aria-label="Back">${svg("back")}</button>`;
  const titleAttr = title === "Blue Cloud Academy" ? ` data-no-translate="true"` : "";
  return `
    <header class="topbar">
      ${back}
      <div>
        <h1 class="title"${titleAttr}>${escapeHtml(title)}</h1>
      </div>
      <button class="icon-button ${right === "star" ? "gold" : ""}" data-action="${right}" aria-label="${right === "star" ? "Bookmark" : "Info"}">${svg(right)}</button>
    </header>
  `;
}

function renderLanguageToggle() {
  return `
    <div class="language-toggle" data-no-translate="true" aria-label="Language">
      <button class="${state.language === "en" ? "active" : ""}" data-language="en">English</button>
      <span>|</span>
      <button class="${state.language === "es" ? "active" : ""}" data-language="es">Español</button>
    </div>
  `;
}

function renderHome() {
  const p = progress();
  return `
    <main class="screen">
      ${topbar("Blue Cloud Academy")}
      ${renderLanguageToggle()}
      ${renderTranslationWarning()}
      <section class="hero-stat" aria-label="Study stats">
  <div class="stat-card">
    <div class="stat-ring" style="--value:${Math.round((p.doneLessons / p.totalLessons) * 100)}%;">
      <div class="stat-ring-inner"><strong>${p.doneLessons}/${p.totalLessons}</strong></div>
    </div>
    <span>${escapeHtml(t("lessons"))}</span>
  </div>

  <div class="stat-card">
    <div class="stat-ring readiness-${p.readiness.level}" style="--value:${p.readiness.score}%;">
      <div class="stat-ring-inner"><strong>${p.readiness.score}%</strong></div>
    </div>
    <span>${escapeHtml(t("readiness"))}</span>
  </div>

  <div class="stat-card">
    <div class="stat-ring" style="--value:${p.bestScore}%;">
      <div class="stat-ring-inner"><strong>${p.bestScore}%</strong></div>
    </div>
    <span>${escapeHtml(t("best final"))}</span>
  </div>
</section>
      ${renderStudyDashboard(p)}
      ${renderHomeBookmarks()}
      <section class="topic-grid">
        <button class="topic-card feature-card" data-action="startDailyDrill" aria-label="Daily Quick Drill">
          <span class="topic-icon">${svg("exam")}</span>
          <span>${escapeHtml(t("Daily Quick Drill"))}</span>
        </button>
        <button class="topic-card feature-card" data-action="openSearch" aria-label="Search Study Guide">
          <span class="topic-icon">${svg("tool")}</span>
          <span>${escapeHtml(t("Search"))}</span>
        </button>
        <button class="topic-card feature-card" data-action="startFlashCards" aria-label="Flash Cards">
          <span class="topic-icon">${svg("cards")}</span>
          <span>${escapeHtml(t("Flash Cards"))}</span>
        </button>
        ${topics.map((topic) => `
          <button class="topic-card" data-topic="${topic.id}" aria-label="${escapeHtml(topic.title)}">
            <span class="topic-icon">${svg(topic.icon)}</span>
            <span>${escapeHtml(topic.title)}</span>
          </button>
        `).join("")}
      </section>
    </main>
  `;
}

function renderStudyDashboard(p) {
  const weak = weakAreas();
  const readiness = p.readiness;
  return `
    <section class="study-dashboard" aria-label="Study dashboard">
      <div class="readiness-card">
        <div>
          <span>${escapeHtml(t("Exam Readiness"))}</span>
          <strong>${escapeHtml(readiness.label)}</strong>
          <small>${escapeHtml(readiness.note)}</small>
        </div>
        <button class="mini-action" data-action="startFinalPractice">45 Q</button>
      </div>
      <div class="weak-panel">
        <div class="section-heading">
          <h2>${escapeHtml(t("Focus Next"))}</h2>
          <span>${weak.length ? weak.length : "0"}</span>
        </div>
        ${weak.length ? weak.map((item) => `
          <button class="weak-row" data-topic="${item.topic.id}">
            <span>${escapeHtml(item.topic.title)}</span>
            <strong>${item.score}%</strong>
          </button>
        `).join("") : `<p class="empty-note">${escapeHtml(t("Take a quiz or quick drill to reveal weak areas."))}</p>`}
      </div>
    </section>
  `;
}

function renderHomeBookmarks() {
  const bookmarks = bookmarkedLessons();
  if (!bookmarks.length) return "";
  return `
    <section class="bookmark-panel" aria-label="Bookmarked lessons">
      <div class="section-heading">
        <h2>${escapeHtml(t("Bookmarked Lessons"))}</h2>
        <span>${bookmarks.length}</span>
      </div>
      <div class="bookmark-list">
        ${bookmarks.map((item) => `
          <button class="bookmark-row" data-bookmark-topic="${item.topic.id}" data-bookmark-lesson="${item.lessonIndex}">
            <span class="bookmark-star">${svg("star")}</span>
            <span>
              <strong>${escapeHtml(item.lesson.title)}</strong>
              <small>${escapeHtml(item.topic.title)}</small>
            </span>
            <span class="chevron">&rsaquo;</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function bookmarkedLessons() {
  return Object.keys(state.bookmarked)
    .map((key) => {
      const [topicId, lessonIndexText] = key.split(":");
      const topic = topicById(topicId);
      const lessonIndex = Number(lessonIndexText);
      const lesson = topic?.lessons[lessonIndex];
      if (!topic || !lesson) return null;
      return { key, topic, lesson, lessonIndex };
    })
    .filter(Boolean);
}

function examReadiness() {
  const history = load("az900-final-history", []);
  const recent = history.slice(-3);
  const score = recent.length
    ? Math.round(recent.reduce((sum, item) => sum + item.score, 0) / recent.length)
    : load("az900-best-final", 0);
  if (score >= 85) return { score, level: "ready", label: t("Ready"), note: t("Recent final practice is in a strong pass range.") };
  if (score >= 70) return { score, level: "close", label: t("Almost Ready"), note: t("Keep drilling missed questions and weaker areas.") };
  if (score > 0) return { score, level: "build", label: t("Keep Practicing"), note: t("Use quick drills and review missed answers.") };
  return { score: 0, level: "build", label: t("Start Practicing"), note: t("Run a quick drill or 45-question final to calibrate.") };
}

function applyVisibleSpanishFallback() {
  if (state.language !== "es" || state.translating) return;
  applyLanguage();
}

function renderLanguageLoading() {
  return `
    <main class="screen">
      ${topbar("Blue Cloud Academy")}
      ${renderLanguageToggle()}
      <section class="score-card language-loading">
        <div class="score">...</div>
        <p>${escapeHtml(t("Updating language..."))}</p>
      </section>
    </main>
  `;
}

function renderTranslationWarning() {
  if (state.language !== "es" || !state.translationError) return "";
  return `
    <section class="translation-warning">
      <p>${escapeHtml(t("Spanish translation could not load. Check Azure Translator settings, then tap Español again."))}</p>
    </section>
  `;
}

function weakAreas() {
  const stats = load("az900-topic-stats", {});
  return topics
    .filter((topic) => topic.id !== "exam")
    .map((topic) => {
      const item = stats[topic.id];
      if (!item || item.total < 3) return null;
      return { topic, score: Math.round((item.correct / item.total) * 100), total: item.total };
    })
    .filter(Boolean)
    .sort((a, b) => a.score - b.score || b.total - a.total)
    .slice(0, 3);
}

function renderTopic() {
  const topic = topicById(state.topicId);
  const rows = topic.lessons.map((lesson, index) => `
    <button class="lesson-row" data-lesson="${index}">
      <span class="mini-icon">${index + 1}</span>
      <strong>${escapeHtml(lesson.title)}</strong>
      <span class="chevron">&rsaquo;</span>
    </button>
  `).join("");
  return `
    <main class="screen topic-screen">
      ${topbar(topic.title)}
      <section class="list">
        ${rows}
        <button class="lesson-row" data-action="topicQuiz">
          <span class="mini-icon">Q</span>
          <strong>${topic.id === "exam" ? escapeHtml(t("Start 45-question final practice")) : `${escapeHtml(t("Quiz"))}: ${escapeHtml(topic.title)}`}</strong>
          <span class="chevron">&rsaquo;</span>
        </button>
      </section>
    </main>
  `;
}

function renderLesson() {
  const topic = topicById(state.topicId);
  const lesson = topic.lessons[state.lessonIndex];
  const key = `${topic.id}:${state.lessonIndex}`;
  const bookmarked = state.bookmarked[key];
  return `
    <main class="screen reader">
      ${topbar(topic.title, "star").replace("gold", bookmarked ? "gold" : "")}
      <article class="reader-card" data-swipe="lesson">
        <h2>${escapeHtml(lesson.title)}</h2>
        ${(lesson.body || []).map((para) => `<p>${escapeHtml(para)}</p>`).join("")}
        ${renderLessonSections(lesson.sections)}
        ${lesson.remember ? `<div class="memory-box">${escapeHtml(lesson.remember)}</div>` : ""}
        ${lesson.code ? `<pre class="code-strip">${escapeHtml(lesson.code)}</pre>` : ""}
      </article>
      ${dots(topic.lessons.length, state.lessonIndex)}
      <nav class="bottom-nav">
        <button class="icon-button" data-action="prevLesson" aria-label="Previous">${svg("back")}</button>
        <button class="pill-button secondary" data-action="markDone">${escapeHtml(t("Done"))}</button>
        <button class="pill-button" data-action="topicQuiz">${escapeHtml(t("Quiz"))}</button>
        <button class="icon-button" data-action="nextLesson" aria-label="Next">${svg("next")}</button>
      </nav>
    </main>
  `;
}

function renderLessonSections(sections = []) {
  if (!sections.length) return "";
  return `
    <div class="lesson-sections">
      ${sections.map((section) => `
        <section class="lesson-section">
          <h3>${escapeHtml(section.title)}</h3>
          <ul>
            ${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </section>
      `).join("")}
    </div>
  `;
}

function renderQuiz() {
  const questions = state.activeQuestions;
  const current = questions[state.quizIndex];
  if (!current) return renderResults(questions);
  const answerRecord = state.answers[current.id];
  const checked = Boolean(answerRecord);
  const selected = checked ? answerRecord.selected : state.selected;
  const answeredCount = Object.keys(state.answers).length;
  const percent = Math.round(((state.quizIndex + 1) / questions.length) * 100);
  return `
    <main class="screen quiz-card" data-swipe="quiz">
      ${topbar(quizTitle())}
      <section class="quiz-panel">
        <div class="quiz-status">
          <span>${escapeHtml(t("Question"))} ${state.quizIndex + 1} ${escapeHtml(t("of"))} ${questions.length}</span>
          <span>${answeredCount} ${escapeHtml(t("answered"))}</span>
        </div>
        <div class="quiz-meter" aria-hidden="true"><span style="width:${percent}%"></span></div>
        <p class="question">${escapeHtml(current.prompt)}</p>
        <section class="answer-list">
          ${current.choices.map((choice, index) => {
            let cls = selected === index ? "selected" : "";
            if (checked && index === current.answer) cls += " correct";
            if (checked && selected === index && index !== current.answer) cls += " wrong";
            return `
              <button class="answer ${cls}" data-answer="${index}">
                <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
                <span class="answer-text">${escapeHtml(choice)}</span>
              </button>
            `;
          }).join("")}
        </section>
        ${checked ? `
          <div class="feedback">${escapeHtml(current.explanation)}</div>
          ${renderChoiceBreakdown(current)}
        ` : ""}
      </section>
      <nav class="quiz-actions">
        <button class="quiz-nav-button" data-action="prevQuestion">${svg("back")}<span>${escapeHtml(t("Prev"))}</span></button>
        <button class="quiz-primary ${checked ? (answerRecord.correct ? "correct" : "wrong") : ""}" data-action="check">${escapeHtml(checked ? (answerRecord.correct ? t("Correct") : t("Review")) : t("Check"))}</button>
        <button class="quiz-ghost" data-action="showAnswer">${escapeHtml(t("Reveal"))}</button>
        <button class="quiz-nav-button" data-action="nextQuestion"><span>${escapeHtml(t("Next"))}</span>${svg("next")}</button>
      </nav>
    </main>
  `;
}

function renderFlashCards() {
  const cards = state.flashCards.length ? state.flashCards : flashCardBank;
  const card = cards[state.flashIndex] || cards[0];
  const topic = topicById(card.topic);
  const filterTitle = flashSubjectTitle(state.flashFilterTopic);
  const isExample = card.kind === "example";
  const saved = Boolean(state.flashSaved[card.id]);
  return `
    <main class="screen flash-screen" data-swipe="flashcards">
      ${topbar(t("Flash Cards"))}
      <div class="flash-meta">
        <span>${state.flashIndex + 1} / ${cards.length}</span>
        <span>${escapeHtml(filterTitle)}</span>
      </div>
      <div class="flash-tools">
        <button class="flash-tool" data-action="chooseFlashSubject">${escapeHtml(t("Subject"))}</button>
        <button class="flash-tool ${saved ? "saved" : ""}" data-action="saveFlashCard">${escapeHtml(saved ? t("Saved") : t("Save"))}</button>
        <button class="flash-tool" data-action="openFlashTopic">${escapeHtml(t("Home tile"))}: ${escapeHtml(topic?.title || t("Study"))}</button>
      </div>
      <button class="flash-card ${state.flashFlipped ? "flipped" : ""} ${isExample ? "example-card" : ""}" data-action="flipFlashCard" aria-label="Flip flash card">
        ${isExample ? "" : `<span class="flash-label">${state.flashFlipped ? "Answer" : "Term"}</span>`}
        <strong>${escapeHtml(state.flashFlipped ? card.definition : card.term)}</strong>
        <small>${escapeHtml(state.flashFlipped ? (isExample ? t("Tap to see the example") : t("Tap to see the term")) : t("Tap to reveal the answer"))}</small>
      </button>
      ${dots(cards.length, state.flashIndex)}
      <nav class="bottom-nav">
        <button class="icon-button" data-action="prevFlashCard" aria-label="Previous">${svg("back")}</button>
        <button class="pill-button secondary" data-action="shuffleFlashCards">${escapeHtml(t("Shuffle"))}</button>
        <button class="pill-button" data-action="flipFlashCard">${escapeHtml(t("Flip"))}</button>
        <button class="icon-button" data-action="nextFlashCard" aria-label="Next">${svg("next")}</button>
      </nav>
    </main>
  `;
}

function renderFlashSubjectPicker() {
  const subjectRows = flashSubjects().map((subject) => `
    <button class="lesson-row flash-subject-row" data-flash-topic="${subject.id}">
      <span class="mini-icon">${subject.id === "all" ? "All" : svg(subject.icon)}</span>
      <strong>${escapeHtml(subject.title)}</strong>
      <span class="subject-count">${subject.count}</span>
    </button>
  `).join("");
  return `
    <main class="screen topic-screen">
      ${topbar(t("Choose Subject"))}
      <section class="list">
        ${subjectRows}
      </section>
    </main>
  `;
}

function renderSearch() {
  return `
    <main class="screen topic-screen">
      ${topbar(t("Search"))}
      <section class="search-panel">
        <input id="searchBox" class="search-input" type="search" value="${escapeHtml(state.searchQuery)}" placeholder="${escapeHtml(t("Search SLA, RBAC, Bastion..."))}" autocomplete="off" />
        <div class="search-results">
          ${renderSearchResults(state.searchQuery)}
        </div>
      </section>
    </main>
  `;
}

function renderSearchResults(query) {
  const results = searchItems(query);
  if (!query.trim()) return `<p class="empty-note">${escapeHtml(t("Search lessons and flash cards by service, term, or exam clue."))}</p>`;
  if (!results.length) return `<p class="empty-note">${escapeHtml(t("No matches yet. Try a shorter term."))}</p>`;
  return results.map((item) => {
    if (item.kind === "lesson") {
      return `
        <button class="search-row" data-search-topic="${item.topic.id}" data-search-lesson="${item.lessonIndex}">
          <span>${escapeHtml(t("Lesson"))}</span>
          <strong>${escapeHtml(item.lesson.title)}</strong>
          <small>${escapeHtml(item.topic.title)}</small>
        </button>
      `;
    }
    return `
      <button class="search-row" data-search-card="${item.card.id}">
        <span>${escapeHtml(t("Flash Card"))}</span>
        <strong>${escapeHtml(item.card.term)}</strong>
        <small>${escapeHtml(topicById(item.card.topic)?.title || t("Study"))}</small>
      </button>
    `;
  }).join("");
}

function renderResults(questions) {
  const correct = questions.filter((item) => state.answers[item.id]?.correct).length;
  const score = Math.round((correct / questions.length) * 100);
  const missed = questions.filter((item) => state.answers[item.id] && !state.answers[item.id].correct);
  const nextLesson = resultNextLessonTarget();
  if (!state.resultSaved) {
    recordQuizResult(questions, correct);
    state.resultSaved = true;
  }
  if (state.quizMode === "final") {
    const best = Math.max(load("az900-best-final", 0), score);
    save("az900-best-final", best);
  }
  return `
    <main class="screen">
      ${topbar(t("Quiz Results"))}
      <section class="score-card">
        <p>${correct} ${escapeHtml(t("of"))} ${questions.length} ${escapeHtml(t("correct"))}</p>
        <div class="score">${score}%</div>
        <p>${escapeHtml(score >= 80 ? t("Strong pass pace. Review missed questions once, then run another 45-question set.") : t("Keep going. Tap review and focus on the explanations for missed questions."))}</p>
        ${missed.length ? `<button class="pill-button" data-action="reviewMissed">${escapeHtml(t("Review Missed"))} (${missed.length})</button>` : ""}
        ${nextLesson ? `<button class="pill-button" data-action="quizNextLesson">${escapeHtml(t("Next Lesson"))}</button>` : ""}
        <button class="pill-button secondary" data-action="goHome">${escapeHtml(t("Home"))}</button>
        <button class="pill-button secondary" data-action="restartQuiz">${escapeHtml(t("Try Again"))}</button>
      </section>
    </main>
  `;
}

function quizTitle() {
  if (state.quizMode === "final") return t("Fresh 45 Final");
  if (state.quizMode === "daily") return t("Daily Quick Drill");
  if (state.quizMode === "review") return t("Missed Questions");
  return `${topicById(state.topicId)?.title || t("Study")} ${t("Quiz")}`;
}

function renderChoiceBreakdown(question) {
  return `
    <div class="choice-breakdown">
      <strong>${escapeHtml(t("Answer breakdown"))}</strong>
      ${question.choices.map((choice, index) => `
        <p class="${index === question.answer ? "right" : ""}">
          <span>${String.fromCharCode(65 + index)}.</span>
          ${escapeHtml(index === question.answer ? `${t("Correct")}: ${question.explanation}` : whyChoiceIsWrong(choice, question))}
        </p>
      `).join("")}
    </div>
  `;
}

function recordQuizResult(questions, correct) {
  const stats = load("az900-topic-stats", {});
  questions.forEach((question) => {
    const topic = question.topic;
    if (!stats[topic]) stats[topic] = { correct: 0, total: 0, attempts: 0 };
    stats[topic].total += 1;
    stats[topic].attempts += 1;
    if (state.answers[question.id]?.correct) stats[topic].correct += 1;
    stats[topic].lastScore = Math.round((stats[topic].correct / stats[topic].total) * 100);
  });
  save("az900-topic-stats", stats);

  if (state.quizMode === "final") {
    const score = Math.round((correct / questions.length) * 100);
    const history = load("az900-final-history", []);
    history.push({ score, date: new Date().toISOString() });
    save("az900-final-history", history.slice(-10));
  }
}

function resultNextLessonTarget() {
  if (state.quizMode !== "topic" || state.quizSourceLessonIndex === null) return null;
  return nextLessonTarget(state.quizSourceTopic || state.topicId, state.quizSourceLessonIndex);
}

function nextLessonTarget(topicId, lessonIndex) {
  const topicIndex = topics.findIndex((topic) => topic.id === topicId);
  if (topicIndex < 0) return null;
  const topic = topics[topicIndex];
  const nextIndex = lessonIndex + 1;
  if (nextIndex < topic.lessons.length) return { topicId, lessonIndex: nextIndex };
  for (let index = topicIndex + 1; index < topics.length; index += 1) {
    if (topics[index].id !== "exam" && topics[index].lessons.length) {
      return { topicId: topics[index].id, lessonIndex: 0 };
    }
  }
  return null;
}

function whyChoiceIsWrong(choice, question) {
  const hint = serviceHint(choice);
  if (state.language === "es") {
    if (hint) return `${choice} no es la mejor respuesta aquí.`;
    if (isTrueFalseQuestion(question)) return `${choice} no coincide con la afirmación. ${question.explanation}`;
    return `${choice} no coincide con el requisito principal de esta pregunta.`;
  }
  if (hint) return `${choice} is not the best match here. ${hint}`;
  if (isTrueFalseQuestion(question)) return `${choice} does not match the statement. ${question.explanation}`;
  return `${choice} does not match the main requirement in this question.`;
}

function dots(total, active) {
  return `<div class="progress-strip">${Array.from({ length: total }, (_, index) => `<span class="progress-dot ${index === active ? "active" : ""}"></span>`).join("")}</div>`;
}

function startQuiz(topicId, options = {}) {
  state.screen = "quiz";
  state.topicId = topicId;
  state.quizSourceTopic = options.sourceTopic || topicId;
  state.quizSourceLessonIndex = typeof options.sourceLessonIndex === "number" ? options.sourceLessonIndex : null;
  state.quizMode = options.mode || (topicId === "final" ? "final" : "topic");
  state.quizIndex = 0;
  state.selected = null;
  state.answers = {};
  state.resultSaved = false;
  const source = options.questions || pickQuizSource(topicId);
  state.activeQuestions = source.map(randomizeQuestion);
  state.quizIds = state.activeQuestions.map((item) => item.id);
  render();
}

function startDailyDrill() {
  startQuiz("daily", {
    mode: "daily",
    sourceTopic: "daily",
    questions: shuffle(fullQuestionBank).slice(0, 5)
  });
}

function startReviewMissed() {
  const missed = state.activeQuestions.filter((item) => state.answers[item.id] && !state.answers[item.id].correct);
  if (!missed.length) return;
  startQuiz("review", {
    mode: "review",
    sourceTopic: state.quizSourceTopic || state.topicId,
    questions: missed
  });
}

function startFlashCards(topicId = "all") {
  const source = topicId === "saved"
    ? flashCardBank.filter((card) => state.flashSaved[card.id])
    : topicId === "all" ? flashCardBank : flashCardBank.filter((card) => card.topic === topicId);
  state.screen = "flashcards";
  state.flashCards = shuffle(source);
  state.flashIndex = 0;
  state.flashFlipped = false;
  state.flashFilterTopic = topicId;
  render();
}

function flashSubjects() {
  const subjects = [{
    id: "all",
    title: t("All Flash Cards"),
    icon: "cards",
    count: flashCardBank.length
  }];
  const savedCount = flashCardBank.filter((card) => state.flashSaved[card.id]).length;
  if (savedCount) {
    subjects.push({
      id: "saved",
      title: t("Saved Flash Cards"),
      icon: "star",
      count: savedCount
    });
  }
  topics
    .filter((topic) => topic.id !== "exam")
    .forEach((topic) => {
      const count = flashCardBank.filter((card) => card.topic === topic.id).length;
      if (count) subjects.push({ id: topic.id, title: topic.title, icon: topic.icon, count });
    });
  return subjects;
}

function flashSubjectTitle(topicId) {
  if (topicId === "all") return t("All subjects");
  if (topicId === "saved") return t("Saved cards");
  return topicById(topicId)?.title || t("Study");
}

function searchItems(query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const results = [];
  topics.forEach((topic) => {
    topic.lessons.forEach((lesson, lessonIndex) => {
      const haystack = [
        lesson.title,
        ...(lesson.body || []),
        lesson.remember || "",
        ...(lesson.sections || []).flatMap((section) => [section.title, ...(section.items || [])])
      ].join(" ").toLowerCase();
      if (haystack.includes(needle)) results.push({ kind: "lesson", topic, lesson, lessonIndex });
    });
  });
  flashCardBank.forEach((card) => {
    const haystack = `${card.term} ${card.definition} ${topicById(card.topic)?.title || ""}`.toLowerCase();
    if (haystack.includes(needle)) results.push({ kind: "flash", card });
  });
  return results.slice(0, 24);
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function pickQuizSource(topicId) {
  if (topicId === "final") {
    return balancedFinalQuestions();
  }
  if (topicId === "daily") {
    return shuffle(fullQuestionBank).slice(0, 5);
  }
  const topicQuestions = fullQuestionBank.filter((item) => item.topic === topicId);
  const limit = Math.min(8, topicQuestions.length);
  const trueFalse = topicQuestions.filter(isTrueFalseQuestion);
  if (trueFalse.length && limit > 1) {
    const required = shuffle(trueFalse).slice(0, 1);
    const rest = shuffle(topicQuestions.filter((item) => !required.some((picked) => picked.id === item.id))).slice(0, limit - 1);
    return shuffle([...required, ...rest]);
  }
  return shuffle(topicQuestions).slice(0, limit);
}

function balancedFinalQuestions() {
  const buckets = {
    cloud: ["cloud", "benefits", "service"],
    architecture: ["architecture", "compute", "networking", "storage", "identity"],
    governance: ["cost", "governance", "tools", "monitor"]
  };
  const picked = [
    ...pickFromTopics(buckets.cloud, 13),
    ...pickFromTopics(buckets.architecture, 18),
    ...pickFromTopics(buckets.governance, 14)
  ];
  const seen = new Set(picked.map((item) => item.id));
  const fill = shuffle(fullQuestionBank.filter((item) => !seen.has(item.id))).slice(0, 45 - picked.length);
  return shuffle([...picked, ...fill]).slice(0, 45);
}

function pickFromTopics(topicIds, count) {
  const items = fullQuestionBank.filter((item) => topicIds.includes(item.topic));
  return shuffle(items).slice(0, count);
}

function randomizeQuestion(item) {
  if (isTrueFalseQuestion(item)) return { ...item };
  const choices = item.choices.map((text, index) => ({ text, isCorrect: index === item.answer }));
  const shuffledChoices = shuffle(choices);
  return {
    ...item,
    choices: shuffledChoices.map((choice) => choice.text),
    answer: shuffledChoices.findIndex((choice) => choice.isCorrect)
  };
}

function isTrueFalseQuestion(item) {
  return item.choices.length === 2 && item.choices.includes("True") && item.choices.includes("False");
}

function serviceHint(choice) {
  const text = choice.toLowerCase();
  const hints = [
    ["pricing calculator", "Pricing Calculator estimates Azure costs before deployment."],
    ["tco calculator", "TCO Calculator compares on-premises costs with Azure migration costs."],
    ["cost management", "Cost Management tracks actual Azure spending, budgets, and alerts."],
    ["azure policy", "Azure Policy enforces or audits resource rules such as regions, tags, or allowed SKUs."],
    ["rbac", "RBAC controls who can access Azure resources and what actions they can perform."],
    ["resource lock", "Resource locks protect resources from accidental deletion or modification."],
    ["azure monitor", "Azure Monitor collects metrics and logs and can power alerts."],
    ["application insights", "Application Insights focuses on application performance, failures, and usage."],
    ["service health", "Service Health is personalized to your Azure services and regions."],
    ["resource health", "Resource Health focuses on one individual Azure resource."],
    ["azure status", "Azure Status is the public global Azure health page."],
    ["virtual machines", "Virtual Machines are IaaS and fit workloads needing OS control."],
    ["azure functions", "Azure Functions fits short event-driven serverless code."],
    ["app service", "App Service hosts web apps and APIs without managing servers."],
    ["kubernetes", "AKS orchestrates containerized workloads."],
    ["blob", "Blob Storage stores unstructured object data."],
    ["azure files", "Azure Files provides managed SMB file shares."],
    ["cosmos", "Cosmos DB is a globally distributed NoSQL database service."],
    ["vpn", "VPN Gateway uses encrypted tunnels over the public internet."],
    ["expressroute", "ExpressRoute provides private provider-based connectivity."],
    ["bastion", "Azure Bastion provides RDP/SSH without exposing VM public IPs."],
    ["key vault", "Key Vault stores secrets, keys, and certificates."],
    ["conditional access", "Conditional Access applies access decisions based on signals such as risk, device, or location."],
    ["mfa", "MFA requires an extra proof beyond a password."],
    ["purview", "Microsoft Purview is for data governance, discovery, and classification."],
    ["arc", "Azure Arc extends Azure management to on-premises, edge, and other-cloud resources."],
    ["arm template", "ARM templates are JSON infrastructure-as-code deployments."],
    ["bicep", "Bicep is a simpler declarative language for Azure deployments."]
  ];
  return hints.find(([key]) => text.includes(key))?.[1] || "";
}

function markDone() {
  const complete = load("az900-complete", {});
  complete[`${state.topicId}:${state.lessonIndex}`] = true;
  save("az900-complete", complete);
}

function wire() {
  document.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "topic";
      state.topicId = button.dataset.topic;
      render();
    });
  });


  document.querySelectorAll("[data-lesson]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "lesson";
      state.lessonIndex = Number(button.dataset.lesson);
      render();
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const current = currentQuestion();
      if (state.answers[current.id]) return;
      state.selected = Number(button.dataset.answer);
      render();
    });
  });

  document.querySelectorAll("[data-flash-topic]").forEach((button) => {
    button.addEventListener("click", () => startFlashCards(button.dataset.flashTopic));
  });

  document.querySelectorAll("[data-bookmark-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "lesson";
      state.topicId = button.dataset.bookmarkTopic;
      state.lessonIndex = Number(button.dataset.bookmarkLesson);
      render();
    });
  });

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", async () => {
      await setLanguage(button.dataset.language);
    });
  });

  document.querySelectorAll("[data-search-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "lesson";
      state.topicId = button.dataset.searchTopic;
      state.lessonIndex = Number(button.dataset.searchLesson);
      render();
    });
  });

  document.querySelectorAll("[data-search-card]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = flashCardBank.find((item) => item.id === button.dataset.searchCard);
      if (!card) return;
      state.screen = "flashcards";
      state.flashCards = [card];
      state.flashIndex = 0;
      state.flashFlipped = false;
      state.flashFilterTopic = card.topic;
      render();
    });
  });

  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    searchBox.addEventListener("input", () => {
      state.searchQuery = searchBox.value;
      const results = document.querySelector(".search-results");
      if (results) results.innerHTML = renderSearchResults(state.searchQuery);
      wireSearchResults();
    });
  }

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => act(button.dataset.action));
  });

  document.querySelectorAll("[data-swipe]").forEach(addSwipe);
}

function wireSearchResults() {
  document.querySelectorAll("[data-search-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "lesson";
      state.topicId = button.dataset.searchTopic;
      state.lessonIndex = Number(button.dataset.searchLesson);
      render();
    });
  });
  document.querySelectorAll("[data-search-card]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = flashCardBank.find((item) => item.id === button.dataset.searchCard);
      if (!card) return;
      state.screen = "flashcards";
      state.flashCards = [card];
      state.flashIndex = 0;
      state.flashFlipped = false;
      state.flashFilterTopic = card.topic;
      render();
    });
  });
}

function currentQuestion() {
  return state.activeQuestions[state.quizIndex];
}

function act(action) {
  if (action === "back") return back();
  if (action === "info") return alert("Swipe left or right on lesson and quiz screens. This app stores progress only on this device.");
  if (action === "star") return toggleBookmark();
  if (action === "startFlashCards") return startFlashCards();
  if (action === "startDailyDrill") return startDailyDrill();
  if (action === "startFinalPractice") return startQuiz("final");
  if (action === "openSearch") {
    state.screen = "search";
    state.searchQuery = "";
    return render();
  }
  if (action === "chooseFlashSubject") return chooseFlashSubject();
  if (action === "openFlashTopic") return openFlashTopic();
  if (action === "flipFlashCard") return flipFlashCard();
  if (action === "saveFlashCard") return toggleSaveFlashCard();
  if (action === "shuffleFlashCards") return startFlashCards(state.flashFilterTopic);
  if (action === "prevFlashCard") return moveFlashCard(-1);
  if (action === "nextFlashCard") return moveFlashCard(1);
  if (action === "topicQuiz") {
    const quizTopic = state.topicId === "exam" ? "final" : state.topicId;
    const options = state.screen === "lesson"
      ? { sourceTopic: state.topicId, sourceLessonIndex: state.lessonIndex }
      : {};
    return startQuiz(quizTopic, options);
  }
  if (action === "prevLesson") return moveLesson(-1);
  if (action === "nextLesson") return moveLesson(1);
  if (action === "markDone") {
    markDone();
    return moveLesson(1);
  }
  if (action === "check") return checkAnswer();
  if (action === "showAnswer") return showAnswer();
  if (action === "prevQuestion") return moveQuestion(-1);
  if (action === "nextQuestion") return moveQuestion(1);
  if (action === "reviewMissed") return startReviewMissed();
  if (action === "quizNextLesson") return openQuizNextLesson();
  if (action === "goHome") {
    state.screen = "home";
    return render();
  }
  if (action === "restartQuiz") {
    if (state.quizMode === "daily") return startDailyDrill();
    return startQuiz(state.quizSourceTopic || state.topicId, {
      sourceTopic: state.quizSourceTopic || state.topicId,
      sourceLessonIndex: state.quizSourceLessonIndex
    });
  }
}

function back() {
  if (state.screen === "topic") {
    state.screen = "home";
    return render();
  }
  if (state.screen === "lesson") {
    state.screen = "topic";
    return render();
  }
  if (state.screen === "quiz") {
    state.screen = ["final", "daily", "review"].includes(state.quizMode) ? "home" : "topic";
    return render();
  }
  if (state.screen === "flashcards") {
    state.screen = "home";
    return render();
  }
  if (state.screen === "flashSubjects") {
    state.screen = "flashcards";
    return render();
  }
  if (state.screen === "search") {
    state.screen = "home";
    return render();
  }
}

function toggleBookmark() {
  if (state.screen !== "lesson") return;
  const key = `${state.topicId}:${state.lessonIndex}`;
  if (state.bookmarked[key]) delete state.bookmarked[key];
  else state.bookmarked[key] = true;
  save("az900-bookmarks", state.bookmarked);
  render();
}

function moveLesson(delta) {
  const topic = topicById(state.topicId);
  const next = state.lessonIndex + delta;
  if (next < 0) {
    state.screen = "topic";
  } else if (next >= topic.lessons.length) {
    startQuiz(state.topicId);
    return;
  } else {
    state.lessonIndex = next;
  }
  render();
}

function checkAnswer() {
  const current = currentQuestion();
  if (!current || state.answers[current.id] || state.selected === null) return;
  state.answers[current.id] = {
    selected: state.selected,
    correct: state.selected === current.answer
  };
  render();
}

function showAnswer() {
  const current = currentQuestion();
  if (!current || state.answers[current.id]) return;
  state.selected = current.answer;
  state.answers[current.id] = { selected: current.answer, correct: true };
  render();
}

function moveQuestion(delta) {
  const next = state.quizIndex + delta;
  if (next < 0) return;
  state.quizIndex = next;
  state.selected = null;
  render();
}

function openQuizNextLesson() {
  const target = resultNextLessonTarget();
  if (!target) return;
  state.screen = "lesson";
  state.topicId = target.topicId;
  state.lessonIndex = target.lessonIndex;
  render();
}

function flipFlashCard() {
  state.flashFlipped = !state.flashFlipped;
  render();
}

function toggleSaveFlashCard() {
  const cards = state.flashCards.length ? state.flashCards : flashCardBank;
  const card = cards[state.flashIndex] || cards[0];
  if (!card) return;
  if (state.flashSaved[card.id]) delete state.flashSaved[card.id];
  else state.flashSaved[card.id] = true;
  save("az900-saved-flashcards", state.flashSaved);
  render();
}

function moveFlashCard(delta) {
  const total = state.flashCards.length || flashCardBank.length;
  state.flashIndex = (state.flashIndex + delta + total) % total;
  state.flashFlipped = false;
  render();
}

function chooseFlashSubject() {
  state.screen = "flashSubjects";
  render();
}

function openFlashTopic() {
  const cards = state.flashCards.length ? state.flashCards : flashCardBank;
  const card = cards[state.flashIndex] || cards[0];
  state.topicId = card.topic;
  state.screen = "topic";
  state.flashFlipped = false;
  render();
}

function addSwipe(node) {
  let startX = 0;
  let startY = 0;
  node.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    startX = touch.clientX;
    startY = touch.clientY;
  }, { passive: true });
  node.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    if (Math.abs(dx) < 52 || Math.abs(dx) < Math.abs(dy)) return;
    if (node.dataset.swipe === "lesson") moveLesson(dx < 0 ? 1 : -1);
    if (node.dataset.swipe === "quiz") moveQuestion(dx < 0 ? 1 : -1);
    if (node.dataset.swipe === "flashcards") moveFlashCard(dx < 0 ? 1 : -1);
  }, { passive: true });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js"));
}

async function initializeApp() {
  document.documentElement.lang = state.language === "es" ? "es" : "en";
  try {
    await localizeData(state.language);
  } catch (error) {
    state.translationError = error.message || "Translation failed";
    restoreEnglishData();
  }
  render();
}

initializeApp();
