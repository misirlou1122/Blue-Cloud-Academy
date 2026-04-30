"use strict";

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
          "Think like a beginner cloud consultant. Most questions ask you to identify the right service, model, tool, or boundary from a short scenario.",
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
          "When stuck, pick the answer with the narrowest match to the scenario. Fundamentals questions usually reward direct service recognition."
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
        remember: "Use a lock when the scenario says prevent accidental delete or change."
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

const fullQuestionBank = [...questionBank, ...extraQuestionBank];

const state = {
  screen: "home",
  topicId: null,
  lessonIndex: 0,
  quizIds: [],
  activeQuestions: [],
  quizIndex: 0,
  selected: null,
  checked: false,
  answers: {},
  bookmarked: load("az900-bookmarks", {})
};

function q(topic, prompt, choices, answer, explanation) {
  return { id: `${topic}-${Math.random().toString(36).slice(2)}`, topic, prompt, choices, answer, explanation };
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
  return { complete, totalLessons, doneLessons, bestScore };
}

function render() {
  const app = document.getElementById("app");
  if (state.screen === "home") app.innerHTML = renderHome();
  if (state.screen === "topic") app.innerHTML = renderTopic();
  if (state.screen === "lesson") app.innerHTML = renderLesson();
  if (state.screen === "quiz") app.innerHTML = renderQuiz();
  wire();
}

function topbar(title, right = "info") {
  const back = state.screen === "home" ? `<div></div>` : `<button class="icon-button" data-action="back" aria-label="Back">${svg("back")}</button>`;
  return `
    <header class="topbar">
      ${back}
      <div>
        <h1 class="title">${escapeHtml(title)}</h1>
        ${state.screen === "home" ? '<p class="subtitle">Azure Fundamentals swipe study</p>' : ""}
      </div>
      <button class="icon-button ${right === "star" ? "gold" : ""}" data-action="${right}" aria-label="${right === "star" ? "Bookmark" : "Info"}">${svg(right)}</button>
    </header>
  `;
}

function renderHome() {
  const p = progress();
  return `
    <main class="screen">
      ${topbar("AZ-900 Coach")}
      <section class="hero-stat" aria-label="Study stats">
        <div class="stat-pill"><strong>${p.doneLessons}/${p.totalLessons}</strong><span>lessons</span></div>
        <div class="stat-pill"><strong>45</strong><span>final reps</span></div>
        <div class="stat-pill"><strong>${p.bestScore}%</strong><span>best final</span></div>
      </section>
      <section class="topic-grid">
        ${topics.map((topic) => `
          <button class="topic-card" data-topic="${topic.id}" aria-label="${escapeHtml(topic.title)}">
            <span class="topic-icon">${svg(topic.icon)}</span>
            <span>${escapeHtml(topic.title)}</span>
          </button>
        `).join("")}
      </section>
      <p class="source-note">Built from your AZ-900 class decks/study guide and Microsoft Learn AZ-900 objectives updated January 14, 2026.</p>
    </main>
  `;
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
    <main class="screen">
      ${topbar(topic.title)}
      <section class="list">
        ${rows}
        <button class="lesson-row" data-action="topicQuiz">
          <span class="mini-icon">Q</span>
          <strong>${topic.id === "exam" ? "Start 45-question final practice" : `Quiz: ${escapeHtml(topic.title)}`}</strong>
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
        ${lesson.body.map((para) => `<p>${escapeHtml(para)}</p>`).join("")}
        <div class="memory-box">${escapeHtml(lesson.remember)}</div>
        ${lesson.code ? `<pre class="code-strip">${escapeHtml(lesson.code)}</pre>` : ""}
      </article>
      ${dots(topic.lessons.length, state.lessonIndex)}
      <nav class="bottom-nav">
        <button class="icon-button" data-action="prevLesson" aria-label="Previous">${svg("back")}</button>
        <button class="pill-button secondary" data-action="markDone">Done</button>
        <button class="pill-button" data-action="topicQuiz">Quiz</button>
        <button class="icon-button" data-action="nextLesson" aria-label="Next">${svg("next")}</button>
      </nav>
    </main>
  `;
}

function renderQuiz() {
  const questions = state.activeQuestions;
  const current = questions[state.quizIndex];
  if (!current) return renderResults(questions);
  const answerRecord = state.answers[current.id];
  const checked = Boolean(answerRecord);
  const selected = checked ? answerRecord.selected : state.selected;
  return `
    <main class="screen quiz-card" data-swipe="quiz">
      ${topbar(state.topicId === "final" ? "Fresh 45 Final" : `${topicById(state.topicId).title} Quiz`)}
      <div class="quiz-progress">
        ${questions.map((item, index) => {
          const result = state.answers[item.id];
          const cls = index === state.quizIndex ? "active" : result ? (result.correct ? "correct" : "wrong") : "";
          return `<span class="${cls}">${index + 1}</span>`;
        }).join("")}
      </div>
      <p class="question">${state.quizIndex + 1}. ${escapeHtml(current.prompt)}</p>
      <section class="answer-list">
        ${current.choices.map((choice, index) => {
          let cls = selected === index ? "selected" : "";
          if (checked && index === current.answer) cls += " correct";
          if (checked && selected === index && index !== current.answer) cls += " wrong";
          return `
            <button class="answer ${cls}" data-answer="${index}">
              <span class="ring">${checked && index === current.answer ? svg("check") : checked && selected === index ? svg("x") : ""}</span>
              <span><strong>${String.fromCharCode(65 + index)}.</strong>${escapeHtml(choice)}</span>
            </button>
          `;
        }).join("")}
      </section>
      ${checked ? `<div class="feedback">${escapeHtml(current.explanation)}</div>` : ""}
      <nav class="bottom-nav">
        <button class="icon-button" data-action="prevQuestion" aria-label="Previous">${svg("back")}</button>
        <button class="pill-button ${checked ? (answerRecord.correct ? "correct" : "wrong") : ""}" data-action="check">${checked ? (answerRecord.correct ? "Correct" : "Review") : "Check"}</button>
        <button class="pill-button secondary" data-action="showAnswer">Show Answer</button>
        <button class="icon-button" data-action="nextQuestion" aria-label="Next">${svg("next")}</button>
      </nav>
    </main>
  `;
}

function renderResults(questions) {
  const correct = questions.filter((item) => state.answers[item.id]?.correct).length;
  const score = Math.round((correct / questions.length) * 100);
  if (state.topicId === "final") {
    const best = Math.max(load("az900-best-final", 0), score);
    save("az900-best-final", best);
  }
  return `
    <main class="screen">
      ${topbar("Quiz Results")}
      <section class="score-card">
        <p>${correct} of ${questions.length} correct</p>
        <div class="score">${score}%</div>
        <p>${score >= 80 ? "Strong pass pace. Review missed questions once, then run another 45-question set." : "Keep going. Tap review and focus on the explanations for missed questions."}</p>
        <button class="pill-button" data-action="restartQuiz">Try Again</button>
      </section>
    </main>
  `;
}

function dots(total, active) {
  return `<div class="progress-strip">${Array.from({ length: total }, (_, index) => `<span class="progress-dot ${index === active ? "active" : ""}"></span>`).join("")}</div>`;
}

function startQuiz(topicId) {
  state.screen = "quiz";
  state.topicId = topicId;
  state.quizIndex = 0;
  state.selected = null;
  state.answers = {};
  const source = pickQuizSource(topicId);
  state.activeQuestions = source.map(randomizeQuestion);
  state.quizIds = state.activeQuestions.map((item) => item.id);
  render();
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function pickQuizSource(topicId) {
  if (topicId === "final") {
    return balancedFinalQuestions();
  }
  const topicQuestions = fullQuestionBank.filter((item) => item.topic === topicId);
  return shuffle(topicQuestions).slice(0, Math.min(8, topicQuestions.length));
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
  const choices = item.choices.map((text, index) => ({ text, isCorrect: index === item.answer }));
  const shuffledChoices = shuffle(choices);
  return {
    ...item,
    choices: shuffledChoices.map((choice) => choice.text),
    answer: shuffledChoices.findIndex((choice) => choice.isCorrect)
  };
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

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => act(button.dataset.action));
  });

  document.querySelectorAll("[data-swipe]").forEach(addSwipe);
}

function currentQuestion() {
  return state.activeQuestions[state.quizIndex];
}

function act(action) {
  if (action === "back") return back();
  if (action === "info") return alert("Swipe left or right on lesson and quiz screens. This app stores progress only on this device.");
  if (action === "star") return toggleBookmark();
  if (action === "topicQuiz") return startQuiz(state.topicId === "exam" ? "final" : state.topicId);
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
  if (action === "restartQuiz") return startQuiz(state.topicId);
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
    state.screen = state.topicId === "final" ? "home" : "topic";
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
  }, { passive: true });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js"));
}

render();
