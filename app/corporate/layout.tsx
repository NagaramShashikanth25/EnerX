import Link from 'next/link'

const nav = [
  { href:'/corporate', label:'ESG Overview', icon:'📊' },
  { href:'/corporate/reports', label:'Reports', icon:'📄' },
  { href:'/corporate/households', label:'Households', icon:'🏠' },
]

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#F7F4EE', fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <aside style={{ position:'fixed', left:0, top:0, bottom:0, width:'220px', background:'#2C2417', display:'flex', flexDirection:'column', zIndex:50 }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:'10px', padding:'20px', borderBottom:'1px solid rgba(247,244,238,0.08)', textDecoration:'none' }}>
          <div style={{ width:'32px', height:'32px', background:'#5A7A5A', borderRadius:'9px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>☀️</div>
          <span style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'20px', fontWeight:700, color:'#F7F4EE', letterSpacing:'-0.5px' }}>EnerX</span>
        </Link>
        <div style={{ margin:'12px 16px 0', padding:'6px 12px', background:'rgba(212,134,10,0.15)', border:'1px solid rgba(212,134,10,0.25)', borderRadius:'100px', fontSize:'11px', fontWeight:600, letterSpacing:'1.5px', textTransform:'uppercase', color:'#D4860A', textAlign:'center' }}>
          Corporate Portal
        </div>
        <nav style={{ flex:1, padding:'12px', display:'flex', flexDirection:'column', gap:'2px', marginTop:'8px' }}>
          {nav.map(item => (
            <Link key={item.href} href={item.href} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px', borderRadius:'10px', fontSize:'13px', fontWeight:500, color:'rgba(247,244,238,0.5)', textDecoration:'none', transition:'all 0.15s' }}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding:'12px', borderTop:'1px solid rgba(247,244,238,0.08)' }}>
          <div style={{ padding:'10px 12px', marginBottom:'6px' }}>
            <div style={{ fontSize:'13px', fontWeight:500, color:'#F7F4EE' }}>Tata Motors ESG</div>
            <div style={{ fontSize:'11px', color:'rgba(247,244,238,0.3)' }}>esg@tata.com</div>
          </div>
          <Link href="/login" style={{ display:'flex', alignItems:'center', gap:'8px', padding:'9px 12px', borderRadius:'10px', fontSize:'13px', color:'rgba(247,244,238,0.4)', textDecoration:'none' }}>
            🚪 Sign out
          </Link>
        </div>
      </aside>
      <main style={{ marginLeft:'220px', flex:1, padding:'36px', minHeight:'100vh' }}>{children}</main>
    </div>
  )
}
