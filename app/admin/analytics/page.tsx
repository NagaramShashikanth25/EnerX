import { kwhToCarbon, kwhToCredits, kwhToMoneyINR } from '@/lib/solar'

const MONTHLY = [
  { month:'Jan', kwh:4820, users:5 },
  { month:'Feb', kwh:7240, users:8 },
  { month:'Mar', kwh:9680, users:12 },
  { month:'Apr', kwh:11200, users:15 },
]
const total = MONTHLY.reduce((s,m)=>s+m.kwh,0)
const maxKwh = Math.max(...MONTHLY.map(m=>m.kwh))

const s = (extra={}) => ({ background:'#fff', border:'1px solid rgba(44,36,23,0.1)', borderRadius:'18px', padding:'24px', ...extra })

export default function AnalyticsPage() {
  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ marginBottom:'28px' }}>
        <h1 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'26px', fontWeight:600, color:'#2C2417', letterSpacing:'-0.5px' }}>Analytics</h1>
        <p style={{ fontSize:'13px', color:'#8A7D6B', marginTop:'3px' }}>Platform performance overview</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'20px' }}>
        {[
          { label:'Total kWh', val:`${total.toLocaleString()}`, unit:'kWh', color:'#3D5C3D' },
          { label:'CO₂ Offset', val:kwhToCarbon(total).toString(), unit:'kg', color:'#5A7A5A' },
          { label:'Credits Issued', val:kwhToCredits(total).toLocaleString(), unit:'EXC', color:'#D4860A' },
          { label:'Platform Revenue', val:`₹${kwhToMoneyINR(total).toFixed(0)}`, unit:'', color:'#4A7FA5' },
        ].map(item => (
          <div key={item.label} style={s()}>
            <div style={{ fontSize:'11px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color:'#8A7D6B', marginBottom:'10px' }}>{item.label}</div>
            <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'26px', fontWeight:600, color:item.color, lineHeight:1, marginBottom:'4px' }}>{item.val}</div>
            <div style={{ fontSize:'12px', color:'#8A7D6B' }}>{item.unit}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ ...s(), marginBottom:'20px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'28px' }}>
          <div style={{ fontSize:'13px', fontWeight:600, color:'#2C2417' }}>Monthly Generation (kWh)</div>
          <span style={{ fontSize:'12px', color:'#5A7A5A', fontWeight:500 }}>↑ +16% MoM growth</span>
        </div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:'16px', height:'160px' }}>
          {MONTHLY.map(m => (
            <div key={m.month} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', height:'100%', justifyContent:'flex-end' }}>
              <div style={{ fontSize:'12px', fontWeight:600, color:'#5A7A5A' }}>{m.kwh.toLocaleString()}</div>
              <div style={{ width:'100%', background:'linear-gradient(to top, #5A7A5A, #3D5C3D)', borderRadius:'8px 8px 0 0', transition:'height 0.8s ease', height:`${(m.kwh/maxKwh)*100}%`, minHeight:'8px' }} />
              <div style={{ fontSize:'13px', color:'#8A7D6B', fontWeight:500 }}>{m.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* User growth */}
      <div style={s()}>
        <div style={{ fontSize:'13px', fontWeight:600, color:'#2C2417', marginBottom:'20px' }}>User Growth</div>
        {MONTHLY.map(m => (
          <div key={m.month} style={{ marginBottom:'16px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', marginBottom:'8px' }}>
              <span style={{ color:'#4A3F2F', fontWeight:500 }}>{m.month} 2026</span>
              <span style={{ color:'#5A7A5A', fontWeight:600 }}>{m.users} households</span>
            </div>
            <div style={{ height:'6px', background:'#EDE8DE', borderRadius:'3px', overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${(m.users/20)*100}%`, background:'linear-gradient(90deg,#5A7A5A,#3D5C3D)', borderRadius:'3px', transition:'width 0.8s ease' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
