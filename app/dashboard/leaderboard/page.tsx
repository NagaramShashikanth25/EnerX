import { kwhToCredits, kwhToCarbon } from '@/lib/solar'

const LB = [
  {name:'Sharma Residence',loc:'Mumbai',kwh:312.4,icon:'🏠'},
  {name:'Green Terrace',loc:'Pune',kwh:298.1,icon:'🏘'},
  {name:'Singh Towers',loc:'Delhi',kwh:287.6,icon:'🏠'},
  {name:'Solar Nest',loc:'Bangalore',kwh:265.3,icon:'🏡'},
  {name:'Sun Abode',loc:'Indore',kwh:244.7,icon:'🏠'},
  {name:'Reddy Home',loc:'Hyderabad',kwh:231.2,icon:'🏠'},
  {name:'Gupta Greens',loc:'Jaipur',kwh:218.9,icon:'🏡'},
  {name:'Eco Cottage',loc:'Kolkata',kwh:196.4,icon:'🏘'},
  {name:'Patel Villa',loc:'Ahmedabad',kwh:184.2,icon:'🏡'},
  {name:'Iyer Estate',loc:'Chennai',kwh:171.8,icon:'🏘'},
].sort((a,b)=>b.kwh-a.kwh)

const medals = ['🥇','🥈','🥉']
const medalColors = ['#D4860A','#8A7D6B','#B85C38']

export default function LeaderboardPage() {
  const total = LB.reduce((s,h)=>s+h.kwh,0)
  const s = (extra={}) => ({background:'#fff',border:'1px solid rgba(44,36,23,0.1)',borderRadius:'18px',padding:'24px',...extra})

  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div style={{marginBottom:'28px'}}>
        <h1 style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'26px',fontWeight:600,color:'#2C2417',letterSpacing:'-0.5px'}}>Leaderboard</h1>
        <p style={{fontSize:'13px',color:'#8A7D6B',marginTop:'3px'}}>Top generating households on the EnerX network this month</p>
      </div>

      {/* Top 3 podium */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginBottom:'20px'}}>
        {LB.slice(0,3).map((h,i)=>(
          <div key={h.name} style={{...s({border:`1px solid ${i===0?'rgba(212,134,10,0.3)':'rgba(44,36,23,0.1)'}`,background:i===0?'linear-gradient(135deg,#FDF3E0,#fff)':'#fff'}),textAlign:'center',padding:'32px 24px'}}>
            <div style={{fontSize:'36px',marginBottom:'10px'}}>{medals[i]}</div>
            <div style={{fontSize:'28px',marginBottom:'10px'}}>{h.icon}</div>
            <div style={{fontWeight:600,color:'#2C2417',marginBottom:'4px'}}>{h.name}</div>
            <div style={{fontSize:'12px',color:'#8A7D6B',marginBottom:'14px'}}>{h.loc}</div>
            <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'22px',fontWeight:600,color:medalColors[i]}}>{h.kwh} kWh</div>
            <div style={{fontSize:'12px',color:'#D4860A',marginTop:'4px'}}>{kwhToCredits(h.kwh)} EXC</div>
          </div>
        ))}
      </div>

      {/* Platform stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginBottom:'20px'}}>
        {[
          {l:'Platform Total',v:`${total.toFixed(1)} kWh`,c:'#3D5C3D'},
          {l:'CO₂ Offset',v:`${kwhToCarbon(total)} kg`,c:'#5A7A5A'},
          {l:'Credits Issued',v:`${kwhToCredits(total).toLocaleString()} EXC`,c:'#D4860A'},
        ].map(item=>(
          <div key={item.l} style={{...s(),textAlign:'center'}}>
            <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#8A7D6B',marginBottom:'8px'}}>{item.l}</div>
            <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'24px',fontWeight:600,color:item.c}}>{item.v}</div>
          </div>
        ))}
      </div>

      {/* Full list */}
      <div style={s()}>
        <div style={{fontSize:'13px',fontWeight:600,color:'#2C2417',marginBottom:'16px'}}>Full Rankings — This Month</div>
        {LB.map((h,i)=>(
          <div key={h.name} style={{display:'flex',alignItems:'center',gap:'14px',padding:'13px 0',borderBottom:i<LB.length-1?'1px solid rgba(44,36,23,0.06)':'none'}}>
            <div style={{width:'36px',textAlign:'center',fontFamily:"'Fraunces',Georgia,serif",fontSize:i<3?'18px':'15px',fontWeight:600,color:i<3?medalColors[i]:'#8A7D6B',flexShrink:0}}>
              {i<3?medals[i]:`#${i+1}`}
            </div>
            <span style={{fontSize:'22px',flexShrink:0}}>{h.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,fontSize:'14px',color:'#2C2417'}}>{h.name}</div>
              <div style={{fontSize:'12px',color:'#8A7D6B'}}>{h.loc}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'16px',fontWeight:600,color:'#5A7A5A'}}>{h.kwh} kWh</div>
              <div style={{fontSize:'12px',color:'#D4860A'}}>{kwhToCredits(h.kwh)} EXC</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
