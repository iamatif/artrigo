import {additionalServiceContent} from './additionalServiceContent';
export const serviceSlugs=["ai-agent-development","application-engineering","ai-data-systems","website-development","mobile-app-development","cloud-infrastructure","product-studio","technology-advisory","dedicated-engineering-teams","solution-implementation","ecommerce-engineering","quality-security","game-immersive-experiences"] as const;
export type ServicePageId=typeof serviceSlugs[number];
export type PageId='home'|ServicePageId|import('./sitePageContent').SitePageId;
export const isServicePage=(page:PageId):page is ServicePageId=>(serviceSlugs as readonly string[]).includes(page);
export interface ServicePageContent{name:string;eyebrow:string;title:string;accent:string;intro:string;photo:string;photoAlt:string;heroNote:string;primary:string;secondary:string;principles:readonly string[];sectionIntro:string;description:string;description2:string;capabilityHeading:string;capabilities:readonly {title:string;body:string;points:readonly string[]}[];usecaseHeading:string;usecases:readonly {title:string;body:string;image:string;alt:string}[];processHeading:string;process:readonly {title:string;body:string;deliverables:readonly string[]}[];techHeading:string;techIntro:string;tech:readonly string[];faqHeading:string;faqs:readonly {q:string;a:string}[];closingTitle:string;closingBody:string}
const baseServiceContent={
'ai-agent-development':{
name:'AI Agent Development',
eyebrow:'AI AGENT DEVELOPMENT SERVICES',
title:'AI agents that move work forward.',
accent:'Your systems. Your rules. Clear human control.',
intro:'Turn repetitive work into connected, reviewable workflows. Artrigo designs and develops custom AI agents that retrieve the right context, work with your business tools and bring people into the decisions that need judgment.',
photo:'/services/ai-network.jpg',photoAlt:'A blue network of connected data points',
heroNote:'Purpose-built workflows, from first use case to everyday operation.',
primary:'Discuss your AI workflow',secondary:'Explore agent capabilities',
principles:['A focused business use case','Permissions shaped around the task','Evaluation before wider rollout'],
sectionIntro:'An agent should solve a specific problem.',
description:'A useful AI agent is more than a chat window. It combines a model, relevant knowledge, well-defined tools and a controlled workflow. We start with the work your team needs to complete, then choose where automation and human review belong.',
description2:'The result is a practical system your team can understand: what the agent can read, what it can change, how quality is evaluated and when a person takes over. Integrations, monitoring and operating guidance are part of the delivery plan.',
capabilityHeading:'Everything between a good idea and a useful AI agent.',
capabilities:[
{title:'Use-case discovery & agent strategy',body:'Map the workflow, identify exceptions and agree on a measurable definition of useful. Compare a custom agent with simpler automation before committing to a build.',points:['Workflow and data-readiness review','Scope, evaluation criteria and delivery priorities']},
{title:'Custom AI agent development',body:'Build task-focused agents around your process, with explicit instructions, tool boundaries and recovery paths. Keep important decisions visible rather than hiding them in a conversation.',points:['Tool use and workflow orchestration','State, error handling and human handoffs']},
{title:'Knowledge & retrieval systems',body:'Connect relevant documents and business data so responses can draw on the information your team actually uses. Design retrieval, source references and access filtering together.',points:['Retrieval-augmented generation','Document ingestion and source-aware answers']},
{title:'Business-system integrations',body:'Link agents with CRMs, help desks, internal APIs and data services. Separate read access from write actions and define what should happen when a connected system is unavailable.',points:['API contracts and scoped permissions','Approval gates for consequential actions']},
{title:'Evaluation & quality controls',body:'Test the workflow with representative examples and difficult edge cases. Track task completion, groundedness, exceptions and operating cost against the criteria agreed during discovery.',points:['Repeatable evaluation datasets','Reviewable traces and regression checks']},
{title:'Monitoring & continuous improvement',body:'Prepare the agent for everyday operation with logging, feedback capture and ownership. Review failures and changing data before expanding its permissions or scope.',points:['Operational dashboards and feedback loops','Model, prompt and knowledge-base updates']}
],
usecaseHeading:'Start with the workflow your team knows best.',
usecases:[
{title:'Customer support assistance',body:'Retrieve relevant policies, prepare a useful response and route exceptions to the right person. Keep source context attached so an agent or support specialist can review the answer.',image:'/services/team-workshop.jpg',alt:'People reviewing a shared plan in a meeting'},
{title:'Document intake & review',body:'Classify incoming documents, extract agreed fields and check them against business rules. Send uncertain or sensitive cases to a reviewer before downstream systems are updated.',image:'/images/photo-1677442136019-21780ecad995.jpg',alt:'An abstract visualization of connected information'},
{title:'Internal knowledge assistants',body:'Help teams find answers across approved documents and systems. Respect access boundaries and make the underlying sources available when a person needs to check the context.',image:'/services/engineer-work.jpg',alt:'A person working with a laptop in a collaborative office'}
],
processHeading:'A clear path from workflow to working agent.',
process:[
{title:'Understand the work',body:'Walk through real examples with the people doing the task. Identify the goal, available data, exception cases and the decisions that must remain with a person.',deliverables:['Workflow map and scope','Data-access and evaluation plan']},
{title:'Build a bounded pilot',body:'Connect a limited set of tools and knowledge sources. Prototype the workflow with representative data and make every proposed action easy to inspect.',deliverables:['Working agent prototype','Initial integrations and approval flow']},
{title:'Evaluate & prepare for release',body:'Run normal and difficult cases, compare outputs with the agreed criteria and test failure recovery. Confirm permissions and operating responsibilities before rollout.',deliverables:['Evaluation results and issue backlog','Release and operational checklist']},
{title:'Operate & improve',body:'Review feedback, quality, exceptions and cost after release. Expand the workflow only when the evidence supports a broader scope.',deliverables:['Monitoring and support guidance','Prioritized improvement roadmap']}
],
techHeading:'The right tools for the workflow.',
techIntro:'Model providers, orchestration frameworks and infrastructure are selected around your data, integration requirements and operating constraints.',
tech:['OpenAI','Anthropic','Python','TypeScript','LangGraph','PostgreSQL','Redis','Docker','AWS','Microsoft Azure'],
faqHeading:'Questions about AI agent development.',
faqs:[
{q:'What is the difference between an AI agent and a chatbot?',a:'A chatbot mainly provides a conversational interface. An agent can follow a workflow, retrieve context and use defined tools to complete parts of a task. A useful implementation still needs explicit permissions, evaluation and a clear route to human review.'},
{q:'Which workflow should we automate first?',a:'Start with a repeated task that has a clear input, a recognizable good outcome and people who understand the exceptions. Discovery checks whether an agent, a simpler automation or a change to the process is the most practical first step.'},
{q:'Can an AI agent work with our existing systems?',a:'Integration depends on the APIs, access policies and data available in your current tools. We review those boundaries first, then define read access, proposed write actions, approval requirements and recovery when an integration fails.'},
{q:'How do you approach data privacy and human oversight?',a:'Data sources, permissions, retention and deployment boundaries are agreed during scoping. Sensitive or consequential actions can require explicit approval. The design should make it possible to inspect sources, tool calls and exceptions.'},
{q:'How are timelines and costs determined?',a:'The scope of the workflow, data readiness, integration complexity and evaluation requirements shape the delivery plan. A bounded discovery and pilot provide a more useful estimate than a fixed promise made before the systems are understood.'},
{q:'How will we know whether the agent is useful?',a:'Agree on evaluation criteria before the pilot. Depending on the workflow, these may include accepted task completions, review effort, source accuracy, exception handling and operating cost. Compare results with the current process before expanding the rollout.'}
],
closingTitle:'Bring one workflow. Let’s find its next step.',
closingBody:'Tell us what arrives, what your team does next and where the work gets stuck. We can shape a focused starting point around the systems you already use.'
},
'application-engineering':{
name:'Application Engineering',
eyebrow:'APPLICATION ENGINEERING SERVICES',
title:'Application engineering. Built around your business.',
accent:'Clear architecture. Useful software. Room to evolve.',
intro:'Build the software your business needs to run and grow. Artrigo brings product thinking, experience design and engineering together for custom applications, connected platforms and careful modernization.',
photo:'/services/engineer-work.jpg',photoAlt:'A software professional working at a laptop in a collaborative workspace',
heroNote:'From the first product decision to the way the software runs.',
primary:'Discuss your application',secondary:'Explore engineering capabilities',
principles:['Business needs before technology choices','Connected product and engineering decisions','A practical plan for release and support'],
sectionIntro:'Software should fit the work, then help it improve.',
description:'A new application is rarely an isolated build. It needs to connect with existing data, fit the way people work and operate within real constraints. We turn those requirements into a clear scope, a maintainable architecture and a product your team can use.',
description2:'Whether the next step is a customer-facing platform, an internal operations tool or a phased modernization, the delivery plan connects design, engineering, testing and release. Progress stays visible through working software and shared decisions.',
capabilityHeading:'One product, connected engineering disciplines.',
capabilities:[
{title:'Custom software & enterprise platforms',body:'Build business applications around the workflows, rules and integrations that make your organization different. Define system boundaries and data ownership before the platform grows.',points:['Product and architecture discovery','Domain models, APIs and core workflows']},
{title:'Web application development',body:'Create responsive portals, dashboards and SaaS experiences with a shared component system. Treat accessibility, content structure and performance as part of the product.',points:['React, TypeScript and modern web interfaces','API integration and accessible interaction design']},
{title:'Mobile application engineering',body:'Design mobile workflows around the context in which people use them. Select a native or cross-platform approach based on device features, release needs and the product roadmap.',points:['Mobile experience and integration planning','Device, connectivity and release considerations']},
{title:'System integrations & APIs',body:'Connect applications with CRM, ERP, payment and data services. Make contracts, authentication, retries and failure handling explicit so each system has a reliable role.',points:['API design and integration boundaries','Event flows, retries and observability']},
{title:'Legacy application modernization',body:'Understand the current codebase and its dependencies before choosing a migration path. Replace focused capabilities in stages, with testing and recovery planned around the live business.',points:['Codebase and dependency assessment','Incremental migration and release planning']},
{title:'Quality, delivery & product evolution',body:'Build review, automated checks and operational visibility into the delivery process. Define what happens after release so improvements remain connected to the product’s goals.',points:['Testing, CI/CD and release readiness','Monitoring, handover and continuous improvement']}
],
usecaseHeading:'Different products. A clear engineering approach.',
usecases:[
{title:'Connected operations platforms',body:'Bring requests, approvals and work queues into one usable application. Connect the systems behind the process and give teams visibility into what needs attention.',image:'/services/team-workshop.jpg',alt:'A team discussing a shared workflow'},
{title:'Customer portals & digital products',body:'Create a focused experience for customers to manage their information, requests or transactions. Connect front-end journeys with the business services that support them.',image:'/services/engineer-work.jpg',alt:'A professional reviewing information on a laptop'},
{title:'Phased platform modernization',body:'Replace a constrained part of an existing system without treating every dependency as a new build. Use clear interfaces, testing and a release plan to make the transition reviewable.',image:'/images/photo-1497366754035-f200968a6e72.jpg',alt:'A modern office workspace'}
],
processHeading:'A shared plan from discovery through evolution.',
process:[
{title:'Discover & define',body:'Understand users, business rules, current systems and delivery constraints. Turn the important questions into a focused scope and an initial product roadmap.',deliverables:['Requirements and workflow map','Architecture direction and delivery priorities']},
{title:'Design & validate',body:'Make key journeys and system boundaries tangible with prototypes, data models and API contracts. Review the approach before the most expensive assumptions become production code.',deliverables:['Experience prototypes and design system','Data models and integration contracts']},
{title:'Build & verify',body:'Develop in reviewable increments with code review and appropriate automated checks. Demonstrate working software and test the flows that matter to the business.',deliverables:['Tested application increments','Visible progress and a release-ready backlog']},
{title:'Release & evolve',body:'Plan deployment, monitoring, recovery and ownership alongside the application. Use feedback from real operation to guide the next improvement.',deliverables:['Release and handover plan','Support responsibilities and evolution roadmap']}
],
techHeading:'A stack chosen for the product’s real needs.',
techIntro:'We select technologies for maintainability, integration fit and the people who will operate the application. The stack follows the requirements rather than defining them.',
tech:['React','Next.js','TypeScript','Node.js','Python','.NET','PostgreSQL','Redis','Docker','Kubernetes','AWS','Microsoft Azure'],
faqHeading:'Questions about application engineering.',
faqs:[
{q:'What does application engineering include?',a:'The scope can cover product discovery, user experience, architecture, application development, integrations, testing, release and ongoing improvement. The engagement is shaped around the product and the responsibilities your existing team already owns.'},
{q:'Can you modernize an existing application?',a:'Yes. We start by understanding the codebase, data, dependencies and operational constraints. A phased plan can separate a focused capability, establish a stable interface and migrate gradually, with tests and recovery planned around the current system.'},
{q:'Can you work with our internal development team?',a:'The engagement can complement your team through a focused project or shared delivery. Clear ownership, review practices, communication and access boundaries are agreed so product and engineering decisions remain connected.'},
{q:'How do you choose the technology stack?',a:'We consider the product’s users, data, integrations, expected workload and operational needs, alongside the team that will maintain it. Discovery compares the practical trade-offs before a stack is agreed.'},
{q:'What determines the project timeline?',a:'Scope, dependencies, integration readiness and the decisions needed during delivery all affect timing. We turn those factors into milestones and review them against working software rather than relying on a generic promise.'},
{q:'What happens after the application launches?',a:'Release is followed by the monitoring, support and improvement responsibilities agreed in the engagement. A practical handover covers operating guidance, access, known limitations and the next priorities for the product.'}
],
closingTitle:'Tell us what your application needs to do.',
closingBody:'A new product, a difficult integration or a platform that needs to evolve—start with the problem and the systems around it.'
}
} as const;

export const serviceContent:Record<ServicePageId,ServicePageContent>={...additionalServiceContent,...baseServiceContent};
export const serviceMenuOrder:ServicePageId[]=["ai-data-systems","application-engineering","website-development","mobile-app-development","cloud-infrastructure","product-studio","technology-advisory","dedicated-engineering-teams","solution-implementation","ecommerce-engineering","quality-security","game-immersive-experiences","ai-agent-development"];
