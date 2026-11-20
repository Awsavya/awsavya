"use client";
import { FormEvent, useState } from "react";
import { services } from "@/lib/site";

export function ContactForm(){
  const [status,setStatus]=useState("");const [sending,setSending]=useState(false);
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();if(sending)return;setSending(true);setStatus("");
    const form=event.currentTarget;const data=new FormData(form);
    try{const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(data.entries()))});const result=await response.json();setStatus(result.message||"Something went wrong. Please email us directly.");if(response.ok)form.reset();}
    catch{setStatus("We could not send your message. Please email hello@awsavya.in directly.");}
    finally{setSending(false);}
  }
  return <form className="contact-form" onSubmit={submit}>
    <input className="honeypot" type="text" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <div className="form-row"><label>Your name <span>*</span><input name="name" type="text" autoComplete="name" minLength={2} maxLength={100} required placeholder="How should we call you?" /></label><label>Email address <span>*</span><input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="you@example.com" /></label></div>
    <label>What are you exploring? <span>*</span><select name="service" defaultValue="" required><option value="" disabled>Select a direction</option>{services.map(s=><option key={s.id} value={s.title}>{s.title}</option>)}<option value="Still exploring">Still exploring</option></select></label>
    <label>Tell us a little more <span>*</span><textarea name="message" rows={6} minLength={10} maxLength={5000} required placeholder="The idea, the challenge, or the question you want to solve..." /></label>
    <div className="form-bottom"><p>Fields marked * are required.</p><button className="pill-button dark-button" type="submit" disabled={sending}>{sending?"Sending…":"Send enquiry"} <span aria-hidden="true">↗</span></button></div>
    {status&&<p className="form-status" role="status">{status}</p>}
  </form>;
}
