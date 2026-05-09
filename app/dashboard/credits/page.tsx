'use client'
import { useState } from 'react'
import { kwhToCredits } from '@/lib/solar'

const PARTNERS = [
  {icon:'⛽',name:'Indian Oil',offer:'100 EXC = ₹10 fuel discount',desc:'Fuel',cost:100},
  {icon:'🛒',name:'BigBasket',offer:'200 EXC = ₹20 grocery voucher',desc:'Grocery',cost:200},
  {icon:'💡',name:'MSEDCL',offer:'500 EXC = ₹50 electricity bill credit',desc:'Utility',cost:500},
  {icon:'☕',name:'Café Coffee Day',offer:'50 EXC = One free coffee',desc:'Food',cost:50},
  {icon:'🚌',name:'BEST Bus',offer:'150 EXC = 5 free bus rides',desc:'Transport',cost:150},
  {icon:'🏪',name:'DMart',offer:'300 EXC = ₹30 shopping voucher',desc:'Retail',cost:300},
]

const TOTAL_KWH = 156.4 * 22
const INITIAL_BAL = kwhToCredits(TOTAL_KWH)

export default function CreditsPage() {
  const [bal, setBal] = useState(INITIAL_BAL)
  const [txns, setTxns] = useState<{time:string,partner:string,cost:number}[]>([])
  const [msg, setMsg] = useState('')

  const redeem = (p: typeof PARTNERS[0]) => {
    if (bal < p.cost) { setMsg(`Need ${p.cost} EXC — you have ${bal}`); setTimeout(()=>setMsg(''),3000); return }
    setBal(b => b - p.cost)
    setTxns(t => [{time:new Date().toLocaleTimeString('en-IN'),partner:p.name,cost:p.cost},...t])
    setMsg(`✅ Redeemed at ${p.name}!`)
    setTimeout(()=>setMsg(''),3000)
  }

  const s = (extra={}) => ({background:'#fff',border:'1px solid rgba(44,36,23,0.1)',borderRadius:'18px',padding:'24px',...extra})

  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div style={{marginBottom:'28px'}}>
        <h1 style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'26px',fontWeight:600,color:'#2C2417',letterSpacing:'-0.5px'}}>Credits</h1>
        <p style={{fontSize:'13px',color:'#8A7D6B',marginTop:'3px'}}>Redeem your EnerX Credits at partner locations</p>
      </div>

      {/* Balance hero */}
      <div style={{...s(),background:'linear-gradient(135deg,#EAF0EA,#fff)',border:'1px solid rgba(90,122,90,0.2)',textAlign:'center',marginBottom:'24px',padding:'40px'}}>
        <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#8A7D6B',marginBottom:'12px'}}>Your Balance</div>
        <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'72px',fontWeight:600,color:'#D4860A',lineHeight:1,marginBottom:'6px'}}>{bal.toLocaleString()}</div>
        <div style={{fontSize:'14px',color:'#8A7D6B',marginBottom:'24px'}}>EnerX Credits (EXC)</div>
        <div style={{display:'flex',justifyContent:'center',gap:'48px'}}>
          {[['Generated',(bal/10).toFixed(1)+' kWh','#3D5C3D'],['Est. Value','₹'+(bal*0.1).toFixed(0),'#5A7A5A'],['Redemptions',Math.floor(bal/100),'#D4860A']].map(([l,v,c])=>(
            <div key={l as string} style={{textAlign:'center'}}>
              <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'20px',fontWeight:600,color:c as string}}>{v}</div>
              <div style={{fontSize:'12px',color:'#8A7D6B',marginTop:'2px'}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {msg && <div style={{background: msg.includes('✅')?'rgba(90,122,90,0.08)':'rgba(185,28,28,0.06)',border:`1px solid ${msg.includes('✅')?'rgba(90,122,90,0.2)':'rgba(185,28,28,0.15)'}`,borderRadius:'12px',padding:'12px 16px',color:msg.includes('✅')?'#3D5C3D':'#b91c1c',fontSize:'13px',marginBottom:'20px'}}>{msg}</div>}

      {/* Partners */}
      <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#8A7D6B',marginBottom:'16px'}}>Redemption Partners</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginBottom:'28px'}}>
        {PARTNERS.map(p=>(
          <div key={p.name} style={{...s(),transition:'all 0.2s'}}>
            <div style={{fontSize:'32px',marginBottom:'10px'}}>{p.icon}</div>
            <div style={{fontSize:'11px',color:'#8A7D6B',marginBottom:'3px'}}>{p.desc}</div>
            <div style={{fontWeight:600,fontSize:'15px',color:'#2C2417',marginBottom:'4px'}}>{p.name}</div>
            <div style={{fontSize:'13px',color:'#8A7D6B',marginBottom:'16px'}}>{p.offer}</div>
            <button onClick={()=>redeem(p)} style={{
              width:'100%',padding:'10px',borderRadius:'10px',border:'none',cursor:'pointer',
              fontSize:'13px',fontWeight:600,transition:'all 0.2s',
              background: bal>=p.cost ? '#5A7A5A' : '#F7F4EE',
              color: bal>=p.cost ? '#fff' : '#8A7D6B',
            }}>
              {p.cost} EXC — Redeem
            </button>
          </div>
        ))}
      </div>

      {/* History */}
      <div style={s()}>
        <div style={{fontSize:'13px',fontWeight:600,color:'#2C2417',marginBottom:'16px'}}>Transaction History</div>
        {txns.length===0
          ? <div style={{textAlign:'center',padding:'32px',color:'#8A7D6B',fontSize:'13px'}}>No transactions yet. Redeem your first credit above!</div>
          : txns.map((t,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom:'1px solid rgba(44,36,23,0.06)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <div style={{width:'32px',height:'32px',background:'#FDF3E0',borderRadius:'9px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px'}}>🎁</div>
                <span style={{fontSize:'14px',color:'#2C2417',fontWeight:500}}>{t.partner}</span>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'15px',fontWeight:600,color:'#D4860A'}}>−{t.cost} EXC</div>
                <div style={{fontSize:'11px',color:'#8A7D6B'}}>{t.time}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
