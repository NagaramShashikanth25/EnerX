'use client'
import { useState } from 'react'

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    platform_name:'EnerX', support_email:'support@energx.in',
    credit_rate:'10', carbon_factor:'0.82', credit_price:'900',
    pilot_price:'75000', annual_price:'200000',
    maintenance_mode:false, new_signups:true, esg_reports:true,
  })
  const inp = {width:'100%',padding:'12px 16px',border:'1.5px solid rgba(44,36,23,0.12)',borderRadius:'12px',fontFamily:"'DM Sans',system-ui,sans-serif",fontSize:'14px',color:'#2C2417',background:'#F7F4EE',outline:'none',boxSizing:'border-box' as const}
  const s = (extra={}) => ({background:'#fff',border:'1px solid rgba(44,36,23,0.1)',borderRadius:'18px',padding:'28px',...extra})
  const lbl = (t:string) => <label style={{fontSize:'11px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase' as const,color:'#8A7D6B',display:'block',marginBottom:'8px'}}>{t}</label>
  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div style={{marginBottom:'28px'}}>
        <h1 style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'26px',fontWeight:600,color:'#2C2417',letterSpacing:'-0.5px'}}>Platform Settings</h1>
        <p style={{fontSize:'13px',color:'#8A7D6B',marginTop:'3px'}}>Configure EnerX platform-wide settings</p>
      </div>
      {saved && <div style={{background:'rgba(90,122,90,0.08)',border:'1px solid rgba(90,122,90,0.2)',borderRadius:'12px',padding:'12px 16px',color:'#3D5C3D',fontSize:'13px',marginBottom:'20px'}}>✅ Saved!</div>}
      <form onSubmit={(e)=>{e.preventDefault();setSaved(true);setTimeout(()=>setSaved(false),3000)}} style={{display:'flex',flexDirection:'column',gap:'20px'}}>
        <div style={s()}>
          <div style={{fontSize:'14px',fontWeight:600,color:'#2C2417',marginBottom:'20px'}}>⚙️ General</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div>{lbl('Platform Name')}<input style={inp} value={form.platform_name} onChange={e=>setForm({...form,platform_name:e.target.value})} /></div>
            <div>{lbl('Support Email')}<input style={inp} type="email" value={form.support_email} onChange={e=>setForm({...form,support_email:e.target.value})} /></div>
          </div>
        </div>
        <div style={s()}>
          <div style={{fontSize:'14px',fontWeight:600,color:'#2C2417',marginBottom:'20px'}}>🌿 Carbon & Credit Rates</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
            <div>{lbl('EXC per kWh')}<input style={inp} type="number" value={form.credit_rate} onChange={e=>setForm({...form,credit_rate:e.target.value})} /></div>
            <div>{lbl('Carbon Factor (kg/kWh)')}<input style={inp} type="number" step="0.01" value={form.carbon_factor} onChange={e=>setForm({...form,carbon_factor:e.target.value})} /></div>
            <div>{lbl('Carbon Credit Price (₹)')}<input style={inp} type="number" value={form.credit_price} onChange={e=>setForm({...form,credit_price:e.target.value})} /></div>
          </div>
          <div style={{marginTop:'12px',padding:'12px 16px',background:'#F7F4EE',borderRadius:'12px',fontSize:'12px',color:'#6B5D48'}}>
            📌 Carbon factor from CEA India 2023. Credit price based on BEE CCTS voluntary market avg.
          </div>
        </div>
        <div style={s()}>
          <div style={{fontSize:'14px',fontWeight:600,color:'#2C2417',marginBottom:'20px'}}>💰 Pricing</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div>{lbl('Pilot Price (₹)')}<input style={inp} type="number" value={form.pilot_price} onChange={e=>setForm({...form,pilot_price:e.target.value})} /></div>
            <div>{lbl('Annual Price (₹)')}<input style={inp} type="number" value={form.annual_price} onChange={e=>setForm({...form,annual_price:e.target.value})} /></div>
          </div>
        </div>
        <div style={s()}>
          <div style={{fontSize:'14px',fontWeight:600,color:'#2C2417',marginBottom:'20px'}}>🔧 Platform Controls</div>
          {[
            {k:'new_signups',l:'Allow New Signups',d:'Enable or disable new user registration'},
            {k:'esg_reports',l:'ESG Report Generation',d:'Enable automated ESG report generation'},
            {k:'maintenance_mode',l:'Maintenance Mode',d:'Take platform offline for maintenance'},
          ].map(item=>(
            <div key={item.k} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0',borderBottom:'1px solid rgba(44,36,23,0.06)'}}>
              <div><div style={{fontSize:'14px',fontWeight:500,color:'#2C2417'}}>{item.l}</div><div style={{fontSize:'12px',color:'#8A7D6B',marginTop:'2px'}}>{item.d}</div></div>
              <button type="button" onClick={()=>setForm({...form,[item.k]:!(form as any)[item.k]})}
                style={{width:'44px',height:'24px',borderRadius:'12px',border:'none',cursor:'pointer',position:'relative',transition:'all 0.2s',background:(form as any)[item.k]?'#5A7A5A':'#EDE8DE'}}>
                <span style={{position:'absolute',top:'2px',width:'20px',height:'20px',borderRadius:'50%',background:'#fff',boxShadow:'0 1px 4px rgba(0,0,0,0.15)',transition:'all 0.2s',left:(form as any)[item.k]?'22px':'2px'}} />
              </button>
            </div>
          ))}
        </div>
        <button type="submit" style={{padding:'14px 32px',background:'#5A7A5A',color:'#fff',border:'none',borderRadius:'100px',fontFamily:"'DM Sans',system-ui,sans-serif",fontSize:'14px',fontWeight:500,cursor:'pointer',width:'fit-content'}}>Save Settings</button>
      </form>
    </div>
  )
}
