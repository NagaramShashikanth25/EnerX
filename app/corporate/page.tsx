import { kwhToCarbon, kwhToCarbonCredits, kwhToMoneyINR, kwhToTrees } from '@/lib/solar'
import Link from 'next/link'

const KWH = 8240.6
const HH = 47

const s = (extra={}) => ({ background:'#fff', border:'1px solid rgba(44,36,23,0.1)', borderRadius:'18px', padding:'24px', ...extra })

export default function CorporatePage() {
  const carbon = kwhToCarbon(KWH)
  const ccc = kwhToCarbonCredits(KWH)
  const value = kwhToMoneyINR(KWH)
  const trees = kwhToTrees(KWH)

  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'28px' }}>
        <div>
          <h1 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'26px', fontWeight:600, color:'#2C2417', letterSpacing:'-0.5px' }}>ESG Overview</h1>
          <p style={{ fontSize:'13px', color:'#8A7D6B', marginTop:'3px' }}>Pilot period: Feb 1, 2026 — Apr 30, 2026</p>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', background:'#EAF0EA', border:'1px solid rgba(90,122,90,0.2)', borderRadius:'100px', padding:'8px 16px', fontSize:'12px', fontWeight:500, color:'#3D5C3D' }}>
          ✓ BRSR Compliant
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'20px' }}>
        {[
          { label:'Renewable Generated', val:`${KWH.toFixed(1)} kWh`, color:'#3D5C3D' },
          { label:'CO₂ Offset', val:`${carbon} kg`, color:'#5A7A5A' },
          { label:'Carbon Credits', val:`${ccc.toFixed(3)} CCC`, color:'#D4860A' },
          { label:'Market Value', val:`₹${value.toFixed(0)}`, color:'#4A7FA5' },
        ].map(m => (
          <div key={m.label} style={s()}>
            <div style={{ fontSize:'11px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color:'#8A7D6B', marginBottom:'10px' }}>{m.label}</div>
            <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'24px', fontWeight:600, color:m.color }}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* BRSR compliance */}
      <div style={{ ...s({ background:'linear-gradient(135deg,#EAF0EA,#fff)', border:'1px solid rgba(90,122,90,0.2)' }), marginBottom:'20px' }}>
        <div style={{ fontSize:'11px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color:'#5A7A5A', marginBottom:'16px' }}>SEBI BRSR Compliance Status</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
          {[
            ['Renewable Energy Share','Reported','#3D5C3D'],
            ['GHG Emissions (Scope 2)','Offset Documented','#3D5C3D'],
            ['Carbon Intensity Reduction','Calculated & Verified','#3D5C3D'],
            ['Value Chain ESG','In Progress','#D4860A'],
            ['Third-Party Verification','Pending','#D4860A'],
            ['Annual ESG Report','Q2 2026 Ready','#4A7FA5'],
          ].map(([label,status,color]) => (
            <div key={label as string} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 16px', background:'#fff', borderRadius:'12px', border:'1px solid rgba(44,36,23,0.07)' }}>
              <span style={{ fontSize:'13px', color:'#4A3F2F', fontWeight:500 }}>{label}</span>
              <span style={{ fontSize:'12px', fontWeight:600, color:color as string }}>{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Households */}
      <div style={{ ...s(), marginBottom:'20px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
          <div style={{ fontSize:'13px', fontWeight:600, color:'#2C2417' }}>Pilot Household Network</div>
          <span style={{ fontSize:'13px', color:'#8A7D6B' }}>{HH} households contributing</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px' }}>
          {[
            { label:'Avg per Household', val:`${(KWH/HH).toFixed(1)} kWh` },
            { label:'Trees Equivalent', val:`${trees} trees` },
            { label:'Avg System Size', val:'4.8 kWp' },
          ].map(item => (
            <div key={item.label} style={{ textAlign:'center', padding:'18px', background:'#F7F4EE', borderRadius:'14px', border:'1px solid rgba(44,36,23,0.07)' }}>
              <div style={{ fontSize:'12px', color:'#8A7D6B', marginBottom:'6px' }}>{item.label}</div>
              <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'20px', fontWeight:600, color:'#3D5C3D' }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ ...s(), display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontWeight:600, color:'#2C2417', marginBottom:'4px' }}>Download Full ESG Report</div>
          <div style={{ fontSize:'13px', color:'#8A7D6B' }}>SEBI BRSR formatted · Auditable · Ready for annual filing</div>
        </div>
        <Link href="/corporate/reports" style={{ padding:'12px 24px', background:'#5A7A5A', color:'#fff', borderRadius:'100px', textDecoration:'none', fontSize:'14px', fontWeight:500, whiteSpace:'nowrap' }}>
          📄 View Reports →
        </Link>
      </div>
    </div>
  )
}
