import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight,X,Check,ShoppingBag,Users,Activity,MapPin,Layers} from 'lucide-react';
import {useLocalization} from './localization';
import {useAutoplay} from './useAutoplay';
import type {SiteCategory,SitePageId} from './sitePageContent';
import {portfolioCopy,portfolioProjects,type PortfolioKind} from './categoryPortfolioContent';
import './category-portfolio.css';

type Pack=typeof portfolioCopy[string];
function ProductPreview({index,copy,large=false}:{index:number;copy:Pack;large?:boolean}){
 const project=portfolioProjects[index],p=copy.projects[index],u=copy.ui;
 const names:Record<PortfolioKind,string>={commerce:u.cart,analytics:u.overview,people:u.team,care:u.appointment,logistics:u.route,crm:u.customer};
 const Icon={commerce:ShoppingBag,analytics:Activity,people:Users,care:Activity,logistics:MapPin,crm:Layers}[project.kind];
 return <div className={`cp-preview cp-preview--${project.kind}${large?' cp-preview--large':''}`}>
  <img src={project.image} alt={p.alt} loading="lazy" width="1200" height="800"/>
  <div className="cp-product" aria-hidden="true">
   <div className="cp-product-bar"><span className="cp-product-mark"><Icon size={15}/></span><b>{p.title}</b><span className="cp-product-dots">•••</span></div>
   <div className="cp-product-body"><div className="cp-product-side"><span/><span/><span/><span/><span/></div>
    <div className="cp-product-content"><div className="cp-product-label">{u.workspace}<span>↗</span></div><strong>{names[project.kind]}</strong>
     {project.kind==='commerce'?<><div className="cp-cart-products"><div className="cp-cart-item"><div className="cp-vase"/><i/><i/></div><div className="cp-cart-item"><div className="cp-lamp"/><i/><i/></div></div><div className="cp-ui-button">{u.checkout}<ArrowRight size={12}/></div></>:project.kind==='logistics'?<><div className="cp-map"><svg viewBox="0 0 300 120"><path className="cp-map-streets" d="M0 20H300M0 65H300M0 100H300M40 0V120M110 0V120M180 0V120M250 0V120"/><path className="cp-map-route" d="M40 100V65H110V20H250V65"/><circle cx="40" cy="100" r="6"/><circle cx="250" cy="65" r="6"/></svg><span><MapPin size={18}/></span></div><div className="cp-ui-row"><b>{u.status}</b><Check size={13}/></div></>:project.kind==='analytics'?<><div className="cp-ui-metrics"><div><small>{u.activity}</small><i/></div><div><small>{u.review}</small><i/></div></div><div className="cp-chart">{[34,58,43,70,56,85,72,95,79,100].map((height,i)=><span key={i} style={{height:`${height}%`}}/>)}</div><div className="cp-ui-row"><b>{u.overview}</b><span>↗</span></div></>:<><div className="cp-ui-tabs"><b>{u.today}</b><span>{u.queue}</span></div>{[0,1,2].map((row)=><div className="cp-task" key={row}><span className="cp-avatar">{project.kind==='care'?'+':project.kind==='people'?<Users size={13}/>:<Layers size={13}/>}</span><div><i/><i/></div><small>{row===1?u.review:u.ready}</small></div>)}</>}
    </div></div>
  </div>
 </div>
}

export function CategoryPortfolio({category,page,onContact}:{category:SiteCategory;page:SitePageId;onContact:(context?:string)=>void}){
 const {locale}=useLocalization(),copy=portfolioCopy[locale]||portfolioCopy.EN;
 const preferred:Partial<Record<SitePageId,number>>={'shopify-ecommerce':0,'retail-ecommerce':0,'financial-services':1,'microsoft-dynamics-365':1,'microsoft-power-platform':2,healthcare:3,'logistics-supply-chain':4,salesforce:5};
 const first=preferred[page]??0;
 const [active,setActive]=useState(first),[focused,setFocused]=useState(false),[userControlled,setUserControlled]=useState(false),[selected,setSelected]=useState<number|null>(null);
 const section=useRef<HTMLElement>(null),dialog=useRef<HTMLDialogElement>(null),opener=useRef<HTMLElement|null>(null);
 useEffect(()=>{setActive(preferred[page]??0);setUserControlled(false)},[page]);
 const restart=useAutoplay(section,()=>setActive(i=>(i+1)%portfolioProjects.length),{delay:6500,enabled:category==='solutions'&&!focused&&!userControlled&&selected===null});
 const advance=(step:number)=>{setUserControlled(true);setActive(i=>(i+step+portfolioProjects.length)%portfolioProjects.length);restart()};
 const open=(index:number)=>{setUserControlled(true);opener.current=document.activeElement as HTMLElement;setSelected(index)};
 const close=()=>{dialog.current?.close();setSelected(null)};
 useEffect(()=>{
  if(selected===null)return;
  const el=dialog.current;if(!el)return;
  const overflow=document.body.style.overflow;
  el.showModal();document.body.style.overflow='hidden';
  return()=>{if(el.open)el.close();document.body.style.overflow=overflow;opener.current?.focus({preventScroll:true})};
 },[selected]);
 const order=[first,...portfolioProjects.map((_,i)=>i).filter(i=>i!==first)];
 const projectButton=(index:number,variant='')=><button type="button" key={index} className={`cp-project-card ${variant}`} onClick={()=>open(index)} aria-label={`${copy.open}: ${copy.projects[index].title}`}><ProductPreview index={index} copy={copy}/><span className="cp-card-meta"><span>{copy.projects[index].field}</span><ArrowUpRight size={23}/></span><h3>{copy.projects[index].title}</h3>{category==='resources'&&<p>{copy.projects[index].summary}</p>}<span className="cp-card-link">{category==='resources'?copy.read:copy.concept}<span aria-hidden="true"> ↗</span></span></button>;
 return <section className={`category-portfolio cp-portfolio cp-${category}`} ref={section} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setFocused(false)}} data-no-translate dir={locale==='AR'?'rtl':'ltr'} aria-labelledby="cp-heading">
  <div className="cp-shell"><header className="cp-heading"><p className="cp-eyebrow"><span/> {copy.eyebrow}</p><div><h2 id="cp-heading">{copy.heading}</h2><p>{copy.intro}</p></div></header>
   {category==='solutions'?<div className="cp-slider"><div className="cp-slide" key={active}><button className="cp-slide-visual" type="button" onClick={()=>open(active)} aria-label={`${copy.open}: ${copy.projects[active].title}`}><ProductPreview index={active} copy={copy} large/></button><div className="cp-slide-copy"><span className="cp-eyebrow">{copy.concept}</span><p className="cp-field">{copy.projects[active].field}</p><h3>{copy.projects[active].title}</h3><p>{copy.projects[active].summary}</p><span className="cp-tech">{portfolioProjects[active].tech}</span><button type="button" className="cp-text-button" onClick={()=>open(active)}>{copy.open}<ArrowUpRight size={20}/></button></div></div><div className="cp-slider-controls"><div className="cp-progress" aria-describedby="cp-rotation-hint" aria-label={`${copy.slide} ${active+1} / ${portfolioProjects.length}`}>{portfolioProjects.map((_,i)=><button type="button" key={i} onClick={()=>{setUserControlled(true);setActive(i);restart()}} className={i===active?'is-active':''} aria-label={`${copy.slide} ${i+1}: ${copy.projects[i].title}`} aria-pressed={i===active}><span/></button>)}</div><p className="cp-rotation-hint" id="cp-rotation-hint">{{EN:'Choose a project to stop automatic rotation.',AR:'اختر مشروعًا لإيقاف التبديل التلقائي.',DE:'Wählen Sie ein Projekt, um den automatischen Wechsel zu stoppen.',FR:'Choisissez un projet pour arrêter le défilement automatique.'}[locale]||'Choose a project to stop automatic rotation.'}</p><div className="cp-controls" aria-describedby="cp-rotation-hint"><button type="button" onClick={()=>advance(-1)} aria-label={copy.previous}><ArrowLeft/></button><button type="button" onClick={()=>advance(1)} aria-label={copy.next}><ArrowRight/></button></div></div></div>:
    category==='industries'?<div className="cp-sector"><button type="button" className="cp-sector-spotlight" onClick={()=>open(order[0])} aria-label={`${copy.open}: ${copy.projects[order[0]].title}`}><ProductPreview index={order[0]} copy={copy} large/><span className="cp-sector-caption"><span><small>{copy.projects[order[0]].field}</small><span className="cp-sector-title">{copy.projects[order[0]].title}</span></span><span className="cp-round-arrow"><ArrowUpRight/></span></span></button><div className="cp-secondary">{order.slice(1,4).map(i=>projectButton(i))}</div></div>:
    category==='resources'?<div className="cp-editorial">{order.map(i=>projectButton(i))}</div>:
    <div className="cp-mosaic">{[0,4,2,1,3,5].map(i=>projectButton(i))}</div>}
  </div>
  <dialog className="cp-dialog" ref={dialog} onCancel={event=>{event.preventDefault();close()}} onClose={()=>setSelected(null)} onClick={event=>{if(event.target===event.currentTarget){const r=event.currentTarget.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close()}}} aria-labelledby="cp-dialog-title">
   {selected!==null&&<><button className="cp-dialog-close" type="button" onClick={close} aria-label={copy.close} autoFocus><X size={23}/></button><ProductPreview index={selected} copy={copy} large/><div className="cp-dialog-content"><span className="cp-eyebrow">{copy.concept} · {copy.projects[selected].field}</span><h2 id="cp-dialog-title">{copy.projects[selected].title}</h2><p>{copy.projects[selected].summary}</p><h3>{copy.approach}</h3><p>{copy.projects[selected].approach}</p><span className="cp-tech">{portfolioProjects[selected].tech}</span><button className="cp-contact" type="button" onClick={()=>{const context=copy.projects[selected].title;close();window.setTimeout(()=>onContact(context),0)}}>{copy.contact}<ArrowUpRight size={20}/></button></div></>}
  </dialog>
 </section>
}
