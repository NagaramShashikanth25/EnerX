import { kwhToCredits, kwhToCarbon, kwhToMoneyINR } from '@/lib/solar'

const USERS = [
  { id:'H-001', name:'Sharma Residence', email:'sharma@example.com', loc:'Mumbai', kwh:312.4, role:'user', status:'active' },
  { id:'H-002', name:'Patel Villa', email:'patel@example.com', loc:'Ahmedabad', kwh:184.2, role:'user', status:'active' },
  { id:'H-003', name:'Green Terrace', email:'green@example.com', loc:'Pune', kwh:298.1, role:'user', status:'active' },
  { id:'H-004', name:'Reddy Home', email:'reddy@example.com', loc:'Hyderabad', kwh:231.2, role:'user', status:'active' },
  { id:'C-001', name:'Infosys Ltd', email:'esg@infosys.com', loc:'Bangalore', kwh:0, role:'corporate', status:'active' },
  { id:'C-002', name:'Tata Motors', email:'esg@tata.com', loc:'Mumbai', kwh:0, role:'corporate', status:'pilot' },
]

const total = USERS.filter(u=>u.role==='user').reduce((s,u)=>s+u.kwh,0)

const s = (extra={}) => ({ background:'#fff', border:'1px solid rgba(44,36,23,0.1)', borderRadius:'18px', padding:'24px', ...extra })
const lbl = (color:string, text:string) => (
  <span style={{ display:'inline-flex', alignItems:'center', gap:'5px', padding:'3px 10px', borderRadius:'100px', fontSize:'11px', fontWeight:600, background:color==='green'?'#EAF0EA':color==='sun'?'#FDF3E0':'#F7F4EE', color:color==='green'?'#3D5C3D':color==='sun'?'#D4860A':'#6B5D48', border:`1px solid ${color==='green'?'rgba(90,122,90,0.2)':color==='sun'?'rgba(212,134,10,0.2)':'rgba(44,36,23,0.1)'}` }}>
    {text}
  </span>
)

export default function AdminPage() {
  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'28px' }}>
        <div>
          <h1 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'26px', fontWeight:600, color:'#2C2417', letterSpacing:'-0.5px' }}>Admin Overview</h1>
          <p style={{ fontSize:'13px', color:'#8A7D6B', marginTop:'3px' }}>Platform management and analytics</p>
        </div>
        <div style={{ padding:'8px 16px', background:'#FDF3E0', border:'1px solid rgba(212,134,10,0.2)', borderRadius:'100px', fontSize:'12px', fontWeight:500, color:'#D4860A' }}>
          🛡 Admin Access
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', marginBottom:'20px' }}>
        {[
          { label:'Total Users', val:USERS.length, unit:'', color:'#3D5C3D' },
          { label:'Platform kWh', val:total.toFixed(1), unit:'kWh', color:'#5A7A5A' },
          { label:'Credits Issued', val:kwhToCredits(total).toLocaleString(), unit:'EXC', color:'#D4860A' },
          { label:'Carbon Value', val:`₹${kwhToMoneyINR(total).toFixed(0)}`, unit:'', color:'#4A7FA5' },
        ].map(item => (
          <div key={item.label} style={s()}>
            <div style={{ fontSize:'11px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color:'#8A7D6B', marginBottom:'10px' }}>{item.label}</div>
            <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'26px', fontWeight:600, color:item.color, lineHeight:1, marginBottom:'4px' }}>{item.val}</div>
            <div style={{ fontSize:'12px', color:'#8A7D6B' }}>{item.unit}</div>
          </div>
        ))}
      </div>

      {/* Carbon summary */}
      <div style={{ ...s({ background:'linear-gradient(135deg,#EAF0EA,#fff)', border:'1px solid rgba(90,122,90,0.2)' }), marginBottom:'20px' }}>
        <div style={{ fontSize:'11px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase', color:'#5A7A5A', marginBottom:'16px' }}>Platform Carbon Summary</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px' }}>
          {[
            { label:'Total CO₂ Offset', val:`${kwhToCarbon(total)} kg` },
            { label:'Carbon Credits (CCC)', val:`${(total*0.82/1000).toFixed(4)}` },
            { label:'Est. Market Value', val:`₹${kwhToMoneyINR(total).toFixed(0)}` },
          ].map(item => (
            <div key={item.label} style={{ textAlign:'center', padding:'18px', background:'#fff', borderRadius:'14px', border:'1px solid rgba(44,36,23,0.07)' }}>
              <div style={{ fontSize:'12px', color:'#8A7D6B', marginBottom:'6px' }}>{item.label}</div>
              <div style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'20px', fontWeight:600, color:'#3D5C3D' }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Users table */}
      <div style={s()}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
          <div style={{ fontSize:'13px', fontWeight:600, color:'#2C2417' }}>User Management</div>
          <button style={{ padding:'7px 16px', background:'transparent', border:'1.5px solid rgba(44,36,23,0.15)', borderRadius:'100px', fontSize:'12px', fontWeight:500, color:'#4A3F2F', cursor:'pointer' }}>+ Invite User</button>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
            <thead>
              <tr style={{ borderBottom:'1.5px solid rgba(44,36,23,0.1)' }}>
                {['ID','Name','Email','Location','Generation','Credits','Role','Status'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'10px 12px', fontSize:'10px', fontWeight:600, letterSpacing:'1.5px', textTransform:'uppercase', color:'#8A7D6B' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {USERS.map((u,i) => (
                <tr key={u.id} style={{ borderBottom:i<USERS.length-1?'1px solid rgba(44,36,23,0.06)':'none' }}>
                  <td style={{ padding:'12px', fontWeight:600, color:'#5A7A5A', fontSize:'12px' }}>{u.id}</td>
                  <td style={{ padding:'12px', fontWeight:500, color:'#2C2417' }}>{u.name}</td>
                  <td style={{ padding:'12px', color:'#8A7D6B', fontSize:'12px' }}>{u.email}</td>
                  <td style={{ padding:'12px', color:'#8A7D6B' }}>{u.loc}</td>
                  <td style={{ padding:'12px', fontFamily:"'Fraunces',Georgia,serif", fontWeight:600, color:'#5A7A5A' }}>{u.kwh>0?`${u.kwh} kWh`:'—'}</td>
                  <td style={{ padding:'12px', fontFamily:"'Fraunces',Georgia,serif", fontWeight:600, color:'#D4860A' }}>{u.kwh>0?`${kwhToCredits(u.kwh)} EXC`:'—'}</td>
                  <td style={{ padding:'12px' }}>{lbl(u.role==='corporate'?'sun':'green', u.role)}</td>
                  <td style={{ padding:'12px' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:'5px', fontSize:'12px', color:u.status==='active'?'#3D5C3D':u.status==='pilot'?'#D4860A':'#8A7D6B' }}>
                      <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:u.status==='active'?'#5A7A5A':u.status==='pilot'?'#D4860A':'#8A7D6B', display:'inline-block' }} />
                      {u.status}
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
