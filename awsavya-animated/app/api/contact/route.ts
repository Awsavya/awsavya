import { NextResponse } from "next/server";

export const runtime="nodejs";
const LIMIT=5, WINDOW=10*60*1000;
const attempts=new Map<string,{count:number;reset:number}>();
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function response(message:string,status:number){return NextResponse.json({message},{status});}

export async function POST(request:Request){
  const length=Number(request.headers.get("content-length")||0);
  if(length>16_384)return response("Your message is too long.",413);
  const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
  const now=Date.now();
  if(attempts.size>1000)for(const [key,value] of attempts)if(value.reset<now)attempts.delete(key);
  const prior=attempts.get(ip);const entry=prior&&prior.reset>now?prior:{count:0,reset:now+WINDOW};
  if(entry.count>=LIMIT)return response("Too many enquiries. Please wait a few minutes and try again.",429);
  entry.count++;attempts.set(ip,entry);
  let body:Record<string,unknown>;
  try{body=await request.json();}catch{return response("Please check your form and try again.",400);}
  if(!body||typeof body!=="object"||Array.isArray(body))return response("Please check your form and try again.",400);
  if(body.website_url)return response("Submission blocked by spam protection.",400);
  const name=typeof body.name==="string"?body.name.trim():"";
  const email=typeof body.email==="string"?body.email.trim():"";
  const service=typeof body.service==="string"?body.service.trim():"";
  const message=typeof body.message==="string"?body.message.trim():"";
  if(name.length<2||name.length>100||!emailPattern.test(email)||email.length>254||!service||service.length>120||message.length<10||message.length>5000)return response("Please complete the required fields with valid information.",400);
  const key=process.env.WEB3FORMS_ACCESS_KEY;
  if(!key)return response("Email delivery is not configured yet. Your message has not been sent. Please email hello@awsavya.in directly.",503);
  try{
    const delivery=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({access_key:key,subject:`AWSAVYA enquiry — ${service}`,from_name:"AWSAVYA Website",replyto:email,name,email,service,message}),cache:"no-store"});
    const result=await delivery.json().catch(()=>({success:false}));
    if(!delivery.ok||!result.success)return response("We could not deliver your enquiry. Please email hello@awsavya.in directly.",502);
    return response("Your enquiry has been sent. Thank you for getting in touch.",200);
  }catch{return response("We could not deliver your enquiry. Please email hello@awsavya.in directly.",502);}
}
