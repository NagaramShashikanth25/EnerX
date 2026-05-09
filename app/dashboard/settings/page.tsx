'use client'
import { useState } from 'react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    full_name:'Demo User', email:'demo@energx.in', phone:'+91 98765 43210', city:'Hyderabad',
    inverter_brand:'Growatt', inverter_serial:'GRWT-2024-00123', capacity:'5.0',
    notify_daily:true, notify_weekly:true, notify_credits:true, notify_esg:false,
  })

  const save = (e: React.FormEvent) => {
    e.preventDefault(); setSaved(true); setTimeout(()=>setSaved(false),3000)
  }

  const inp = (style={}) => ({
    width:'100%', padding:'12px 16px', border:'1.5px solid rgba(44,36,23,0.12)', borderRadius:'12px',
    fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:'14px', color:'#2C2417', background:'#F7F4EE',
    outline:'none', transition:'all 0.2s', boxSizing:'border-box' as const, ...style
  })

  const s = (extra={}) => ({background:'#fff',border:'1px solid rgba(44,36,23,0.1)',borderRadius:'18px',padding:'28px',...extra})
  const lbl = (t:string) => <label style={{fontSize:'11px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase' as const,color:'#8A7D6B',display:'block',marginBottom:'8px'}}>{t}</label>

  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div style={{marginBottom:'28px'}}>
        <h1 style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'26px',fontWeight:600,color:'#2C2417',letterSpacing:'-0.5px'}}>Settings</h1>
        <p style={{fontSize:'13px',color:'#8A7D6B',marginTop:'3px'}}>Manage your account and installation details</p>
      </div>

      {saved && <div style={{background:'rgba(90,122,90,0.08)',border:'1px solid rgba(90,122,90,0.2)',borderRadius:'12px',padding:'12px 16px',color:'#3D5C3D',fontSize:'13px',marginBottom:'20px'}}>✅ Settings saved successfully!</div>}

      <form onSubmit={save} style={{display:'flex',flexDirection:'column',gap:'20px'}}>
        {/* Profile */}
        <div style={s()}>
          <div style={{fontSize:'14px',fontWeight:600,color:'#2C2417',marginBottom:'20px'}}>👤 Profile</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div>{lbl('Full Name')}<input style={inp()} value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})} /></div>
            <div>{lbl('Email')}<input style={inp()} type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
            <div>{lbl('Phone')}<input style={inp()} type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
            <div>{lbl('City')}<input style={inp()} value={form.city} onChange={e=>setForm({...form,city:e.target.value})} /></div>
          </div>
        </div>

        {/* Solar Installation */}
        <div style={s()}>
          <div style={{fontSize:'14px',fontWeight:600,color:'#2C2417',marginBottom:'20px'}}>☀️ Solar Installation</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div>{lbl('Inverter Brand')}
              <select style={inp()} value={form.inverter_brand} onChange={e=>setForm({...form,inverter_brand:e.target.value})}>
                {['Growatt','Solis','Huawei','SolarEdge','Fronius','Other'].map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
            <div>{lbl('Serial Number')}<input style={inp()} value={form.inverter_serial} placeholder="e.g. GRWT-2024-00123" onChange={e=>setForm({...form,inverter_serial:e.target.value})} /></div>
            <div>{lbl('System Capacity (kWp)')}<input style={inp()} type="number" value={form.capacity} step="0.5" onChange={e=>setForm({...form,capacity:e.target.value})} /></div>
            <div>{lbl('Connection Status')}
              <div style={{...inp(),display:'flex',alignItems:'center',gap:'8px',cursor:'default'}}>
                <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#5A7A5A',display:'inline-block'}} />
                <span style={{color:'#3D5C3D',fontWeight:500}}>Connected & Syncing</span>
              </div>
            </div>
          </div>
          <div style={{marginTop:'16px',padding:'14px',background:'#F7F4EE',borderRadius:'12px',fontSize:'13px',color:'#6B5D48',lineHeight:1.6}}>
            💡 <strong>How to connect:</strong> Enter your inverter serial number above. EnerX pulls generation data from {form.inverter_brand}'s cloud every hour automatically. No additional hardware needed for WiFi-connected inverters.
          </div>
        </div>

        {/* Notifications */}
        <div style={s()}>
          <div style={{fontSize:'14px',fontWeight:600,color:'#2C2417',marginBottom:'20px'}}>🔔 Notifications</div>
          {[
            {k:'notify_daily',l:'Daily Generation Summary',d:'Receive daily kWh and credit update via email'},
            {k:'notify_weekly',l:'Weekly ESG Report',d:'Weekly carbon impact summary every Monday'},
            {k:'notify_credits',l:'Credit Milestones',d:'Alert when you reach 1,000 / 5,000 / 10,000 EXC'},
            {k:'notify_esg',l:'ESG Report Ready',d:'Notification when your corporate ESG report is generated'},
          ].map(item=>(
            <div key={item.k} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0',borderBottom:'1px solid rgba(44,36,23,0.06)'}}>
              <div>
                <div style={{fontSize:'14px',fontWeight:500,color:'#2C2417'}}>{item.l}</div>
                <div style={{fontSize:'12px',color:'#8A7D6B',marginTop:'2px'}}>{item.d}</div>
              </div>
              <button type="button" onClick={()=>setForm({...form,[item.k]:!(form as any)[item.k]})}
                style={{width:'44px',height:'24px',borderRadius:'12px',border:'none',cursor:'pointer',position:'relative',transition:'all 0.2s',background:(form as any)[item.k]?'#5A7A5A':'#EDE8DE'}}>
                <span style={{position:'absolute',top:'2px',width:'20px',height:'20px',borderRadius:'50%',background:'#fff',boxShadow:'0 1px 4px rgba(0,0,0,0.15)',transition:'all 0.2s',left:(form as any)[item.k]?'22px':'2px'}} />
              </button>
            </div>
          ))}
        </div>

        {/* Security */}
        <div style={s()}>
          <div style={{fontSize:'14px',fontWeight:600,color:'#2C2417',marginBottom:'20px'}}>🔒 Security</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
            <div>{lbl('New Password')}<input style={inp()} type="password" placeholder="Leave blank to keep current" /></div>
            <div>{lbl('Confirm Password')}<input style={inp()} type="password" placeholder="Confirm new password" /></div>
          </div>
        </div>

        <button type="submit" style={{padding:'14px 32px',background:'#5A7A5A',color:'#fff',border:'none',borderRadius:'100px',fontFamily:"'DM Sans',system-ui,sans-serif",fontSize:'14px',fontWeight:500,cursor:'pointer',width:'fit-content',transition:'all 0.2s'}}>
          Save All Settings
        </button>
      </form>
    </div>
  )
}
