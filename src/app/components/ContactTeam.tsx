"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
export default function ContactTeam() {
 const [opened, setOpened] = useState(false);
 return <div className="relative z-10">
   <a href="mailto:hacktheridge24@gmail.com?subject=Hello%20HTR%20team" onClick={()=>setOpened(true)} className="htr-register-link rounded-full" style={{borderRadius:9999}}>Connect with the team <ArrowRight className="h-4 w-4" /></a>
   {opened && <p role="status" className="mt-3 max-w-xs text-sm">Email us at <a className="underline" href="mailto:hacktheridge24@gmail.com">hacktheridge24@gmail.com</a>. If your email app didn’t open, <a className="underline" href="https://mail.google.com/mail/?view=cm&to=hacktheridge24%40gmail.com&su=Hello%20HTR%20team" target="_blank" rel="noopener noreferrer">compose in Gmail</a> or copy the address into your inbox.</p>}
 </div>;
}
