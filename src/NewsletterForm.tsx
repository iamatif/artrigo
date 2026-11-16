import{useEffect,useRef,useState,type FormEvent}from'react';
import{ArrowRight,ArrowUpRight,Check}from'lucide-react';
import{Localized,useLocalization}from'./localization';
export function NewsletterForm({id='newsletter-email'}:{id?:string}={}){
const[status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
const pending=useRef<AbortController|null>(null);const{locale}=useLocalization();
useEffect(()=>()=>pending.current?.abort(),[]);
const submit=async(e:FormEvent<HTMLFormElement>)=>{
e.preventDefault();if(pending.current)return;const data=new FormData(e.currentTarget);if(data.get('_honey'))return;
const controller=new AbortController();pending.current=controller;setStatus('sending');const timeout=setTimeout(()=>controller.abort(),20000);
try{const response=await fetch('https://formsubmit.co/ajax/atifabbas296@gmail.com',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},signal:controller.signal,body:JSON.stringify({email:data.get('email'),request:'Newsletter signup',consent:'Visitor requested newsletter updates using the website signup form.',language:locale,_subject:'Artrigo — new newsletter signup',_replyto:data.get('email'),_template:'table',_url:window.location.href})});const result=await response.json();if(!response.ok||!(result.success===true||result.success==='true'))throw Error('Newsletter submission failed');if(pending.current===controller)setStatus('success')}
catch{if(pending.current===controller)setStatus('error')}
finally{clearTimeout(timeout);if(pending.current===controller)pending.current=null}};
return <Localized><>{status==='success'?<div className="newsletter-result" role="status"><Check size={20}/><p>Thanks for signing up.<small>Your newsletter request has been received.</small></p><button aria-label="Reset newsletter form" onClick={()=>setStatus('idle')}><ArrowRight size={19}/></button></div>:<><form onSubmit={submit} aria-busy={status==='sending'}><label className="visually-hidden" htmlFor={id}>Your email address</label><input id={id} name="email" maxLength={254} type="email" required placeholder="Your email address" autoComplete="email"/><label className="form-honey" aria-hidden="true">Leave this field empty<input name="_honey" tabIndex={-1} autoComplete="off"/></label><button type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Stay in the loop'}<ArrowUpRight size={16}/></button></form>{status==='error'&&<p className="newsletter-error" role="alert">We couldn’t send your signup. Please try again.</p>}</>}<p className="newsletter-note">Sign up for newsletter updates. Your email is sent to our team through FormSubmit.</p></></Localized>}
