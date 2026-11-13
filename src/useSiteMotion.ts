import {useLayoutEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/** Shared motion for the homepage, service pages and footer. Content stays static without JS. */
export function useSiteMotion(locale:string){
 useLayoutEffect(()=>{
  let alive=true,refreshFrame=0;
  const resize=new ResizeObserver(()=>{cancelAnimationFrame(refreshFrame);refreshFrame=requestAnimationFrame(()=>{if(alive)ScrollTrigger.refresh()})});
  const main=document.querySelector('main');if(main)resize.observe(main);
  const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   const desktop=matchMedia('(min-width: 1000px)').matches;
   const context=gsap.context(()=>{
    const reveal=(elements:Element[]|NodeListOf<Element>,distance=22,stagger=.06)=>{
     const nodes=Array.from(elements);if(!nodes.length)return;
     gsap.fromTo(nodes,{y:distance,autoAlpha:0},{y:0,autoAlpha:1,duration:.7,stagger,ease:'power3.out',clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:nodes[0].closest('section')||nodes[0],start:'top 92%',once:true}});
    };
    if(document.querySelector('.hero')){
     gsap.fromTo('.hero-slide.current .hero-copy .kicker,.hero-slide.current .hero-copy h1,.hero-slide.current .hero-title,.hero-slide.current .hero-description,.hero-slide.current .hero-copy .btn',{y:25,autoAlpha:0},{y:0,autoAlpha:1,duration:.85,stagger:.1,ease:'power3.out',clearProps:'transform,opacity,visibility'});
     if(desktop)gsap.to('.hero-background',{yPercent:6,scale:1.08,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.7}});
    }
    if(document.querySelector('.sp-hero'))reveal(document.querySelectorAll('.sp-hero-copy>.kicker,.sp-hero-copy>h1,.sp-hero-accent,.sp-hero-intro,.sp-hero-actions,.sp-principles'),24,.09);
    document.querySelectorAll('main section').forEach(section=>{
     // These sections own their own timelines and carousel transforms.
     if(section.matches('.hero,.sp-hero,.sx-testimonials,[data-motion-owned]'))return;
     const heading=section.querySelector('h2');
     if(heading)gsap.fromTo(heading,{y:25,autoAlpha:0},{y:0,autoAlpha:1,duration:.75,ease:'power3.out',clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:heading,start:'top 94%',once:true}});
     const kicker=section.querySelector('.kicker');if(kicker)gsap.fromTo(kicker,{y:10,opacity:.25},{y:0,opacity:1,duration:.65,clearProps:'transform,opacity',scrollTrigger:{trigger:kicker,start:'top 95%',once:true}});
    });
    document.querySelectorAll('.services-grid,.case-grid,.platform-grid,.podcast-grid,.editorial-layout,.engagement-layout,.sp-case-grid').forEach(group=>{
     // Animate card contents, leaving swipe tracks and slide positions untouched.
     const cards=Array.from(group.children).filter(el=>!el.matches('.mobile-slider-controls,.mobile-slider-dots'));
     cards.forEach((card,i)=>{const target=card.querySelector('h3')||card;gsap.fromTo(target,{y:18,opacity:.3},{y:0,opacity:1,duration:.65,delay:Math.min(i,3)*.04,clearProps:'transform,opacity',scrollTrigger:{trigger:card,start:'top 96%',once:true}})});
    });
    document.querySelectorAll('.challenge-result,.industry-overlay,.engagement-detail,.faq-list,.sp-faq-list,.sp-capabilities,.sp-process-content,.sp-capacity-chart,.sp-priority-summary').forEach(el=>{
     gsap.fromTo(el,{y:20,opacity:.35},{y:0,opacity:1,duration:.8,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:el,start:'top 95%',once:true}});
    });
    if(desktop)document.querySelectorAll('.sp-hero-media,.industry-visual,.insight-image,.sp-usecase-image').forEach(frame=>{
     const image=frame.querySelector('img');if(!image)return;
     gsap.fromTo(image,{scale:1.08,yPercent:-2},{scale:1,yPercent:2,ease:'none',scrollTrigger:{trigger:frame,start:'top bottom',end:'bottom top',scrub:1}});
    });
    document.querySelectorAll('.contact-band,.sp-closing').forEach(section=>{
     const children=section.querySelectorAll(':scope>p,:scope>.btn,:scope>div');
     gsap.fromTo(children,{y:20,opacity:.25},{y:0,opacity:1,stagger:.09,duration:.75,clearProps:'transform,opacity',scrollTrigger:{trigger:section,start:'top 90%',once:true}});
    });
    document.querySelectorAll('.district-footer-intro>div,.district-directory>div,.district-footer-meta').forEach((el,i)=>{
     gsap.fromTo(el,{y:20,opacity:.3},{y:0,opacity:1,duration:.7,delay:Math.min(i,3)*.06,clearProps:'transform,opacity',scrollTrigger:{trigger:el,start:'top 96%',once:true}});
    });
   });
   return()=>context.revert();
  });
  media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',()=>{
   const icons=new Set<SVGElement>();
   const animate=(event:PointerEvent,enter:boolean)=>{
    if(!(event.target instanceof Element))return;
    const button=event.target.closest('.btn,.inline-link,.sp-related-link,.footer-round-cta');if(!button)return;
    if(event.relatedTarget instanceof Node&&button.contains(event.relatedTarget))return;
    const icon=button.querySelector('svg');if(!icon)return;icons.add(icon);
    gsap.to(icon,{x:enter?3:0,y:enter?-3:0,duration:.25,ease:'power2.out',overwrite:true});
   };
   const over=(e:PointerEvent)=>animate(e,true),out=(e:PointerEvent)=>animate(e,false);
   document.addEventListener('pointerover',over);document.addEventListener('pointerout',out);
   return()=>{document.removeEventListener('pointerover',over);document.removeEventListener('pointerout',out);icons.forEach(icon=>{gsap.killTweensOf(icon);gsap.set(icon,{clearProps:'transform'})})};
  });
  document.fonts.ready.then(()=>{if(alive)ScrollTrigger.refresh()});
  return()=>{alive=false;resize.disconnect();cancelAnimationFrame(refreshFrame);media.revert()};
 },[locale]);
}
