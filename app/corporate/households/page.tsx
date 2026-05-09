import { kwhToCredits, kwhToCarbon } from '@/lib/solar'

const HH = [
  { id:'H-001', name:'Sharma Residence', loc:'Mumbai', kwh:312.4, cap:5, icon:'🏠' },
  { id:'H-003', name:'Green Terrace', loc:'Pune', kwh:298.1, cap:7, icon:'🏘' },
  { id:'H-007', name:'Singh Towers', loc:'Delhi', kwh:287.6, cap:8, icon:'🏠' },
  { id:'H-005', name:'Solar Nest', loc:'Bangalore', kwh:265.3, cap:6, icon:'🏡' },
  { id:'H-010', name:'Sun Abode', loc:'Indore', kwh:244.7, cap:6.5, icon:'🏠' },
  { id:'H-004', name:'Reddy Home', loc:'Hyderabad', kwh:231.2, cap:4.5, icon:'🏠' },
]
const total = HH.reduce((s,h)=>s+h.kwh,0)

const s = (extra={}) => ({ background:'#fff', border:'1px solid rgba(44,36,23,0.1)', borderRadius:'18px', padding:'24px', ...extra })

export default function HouseholdsPage() {
  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ marginBottom:'28px' }}>
        <h1 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'26px', fontWeight:600, color:'#2C2417', letterSpacing:'-0.5px' }}>Pilot Households</h1>
        <p style={{ fontSize:'13px', color:'#8A7D6B', marginTop:'3px' }}>Solar households contributing to your ESG data pool</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'20px' }}>
        {[
          { label:'Total Households', val:HH.length, color:'#3D5C3D' },
          { label:'Total Generation', val:`${total.toFixed(1)} kWh`, color:'#5A7A5A' },
          { label:'CO₂ Offset', val:`${kwhToCarbon(total)} kg`, color:'#D4860A' },
        ].map(item => (
          <div key={item.label} style={{ ...s(), textAlign:'center' }}>
            <div style={{ fontSize:'11px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color:'#8A7D6B', marginBottom:'10px' }}>{item.label}</div>
            <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'26px', fontWeight:600, color:item.color }}>{item.val}</div>
          </div>
        ))}
      </div>

      <div style={s()}>
        <div style={{ fontSize:'13px', fontWeight:600, color:'#2C2417', marginBottom:'16px' }}>Contributing Households</div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
            <thead>
              <tr style={{ borderBottom:'1.5px solid rgba(44,36,23,0.1)' }}>
                {['ID','Household','Location','Capacity','Generation','CO₂ Saved','Status'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'10px 12px', fontSize:'10px', fontWeight:600, letterSpacing:'1.5px', textTransform:'uppercase', color:'#8A7D6B' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HH.map((h,i) => (
                <tr key={h.id} style={{ borderBottom:i<HH.length-1?'1px solid rgba(44,36,23,0.06)':'none' }}>
                  <td style={{ padding:'12px', fontWeight:600, color:'#5A7A5A', fontSize:'12px' }}>{h.id}</td>
                  <td style={{ padding:'12px', fontWeight:500, color:'#2C2417' }}>{h.icon} {h.name}</td>
                  <td style={{ padding:'12px', color:'#8A7D6B' }}>{h.loc}</td>
                  <td style={{ padding:'12px', color:'#8A7D6B' }}>{h.cap} kWp</td>
                  <td style={{ padding:'12px', fontFamily:"'Fraunces',Georgia,serif", fontWeight:600, color:'#5A7A5A' }}>{h.kwh} kWh</td>
                  <td style={{ padding:'12px', color:'#3D5C3D', fontWeight:500 }}>{kwhToCarbon(h.kwh)} kg</td>
                  <td style={{ padding:'12px' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:'5px', fontSize:'12px', color:'#3D5C3D', background:'#EAF0EA', border:'1px solid rgba(90,122,90,0.2)', padding:'3px 10px', borderRadius:'100px' }}>
                      <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#5A7A5A', display:'inline-block' }} />Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
