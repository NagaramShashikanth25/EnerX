'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, background:'rgba(247,244,238,0.92)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(44,36,23,0.1)', fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ maxWidth:'1160px', margin:'0 auto', padding:'0 32px', height:'68px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
          <div style={{ width:'36px', height:'36px', background:'#5A7A5A', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>☀️</div>
          <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontWeight:700, fontSize:'22px', color:'#2C2417', letterSpacing:'-0.5px' }}>EnerX</span>
        </Link>
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <Link href="/login" style={{ padding:'9px 20px', background:'transparent', border:'1.5px solid rgba(44,36,23,0.18)', borderRadius:'100px', fontSize:'14px', fontWeight:500, color:'#4A3F2F', textDecoration:'none' }}>Sign in</Link>
          <Link href="/login?tab=register" style={{ padding:'9px 20px', background:'#5A7A5A', color:'#fff', border:'none', borderRadius:'100px', fontSize:'14px', fontWeight:500, textDecoration:'none' }}>Get started</Link>
        </div>
      </div>
    </nav>
  )
}
