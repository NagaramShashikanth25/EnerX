'use client'
import { useEffect, useState } from 'react'
import { kwhToCarbon, kwhToCredits, kwhToMoneyINR, kwhToCarbonCredits, simulateGeneration } from '@/lib/solar'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

const CAP = 5.0
const genData = Array.from({length:24}, (_,h) => simulateGeneration(CAP, h))
const totalKwh = genData.reduce((a,b)=>a+b,0)

const card = (children: React.ReactNode, extra = {}) => (
  <div style={{background:'#fff',border:'1px solid rgba(44,36,23,0.1)',borderRadius:'18px',padding:'24px',...extra}}>{children}</div>
)

const label = (text: string) => (
  <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#8A7D6B',marginBottom:'10px'}}>{text}</div>
)

export default function DashboardPage() {
  const [time, setTime] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t) }, [])

  const currentKw = genData[time.getHours()] || 0
  const stats = [
    { label:'Generated Today', val:`${totalKwh.toFixed(1)} kWh`, sub:`${currentKw.toFixed(2)} kW right now`, color:'#3D5C3D' },
    { label:'CO₂ Offset', val:`${kwhToCarbon(totalKwh)} kg`, sub:'Carbon saved today', color:'#5A7A5A' },
    { label:'Credits Earned', val:`${kwhToCredits(totalKwh)} EXC`, sub:'Redeemable at partners', color:'#D4860A' },
    { label:'Carbon Value', val:`₹${kwhToMoneyINR(totalKwh).toFixed(0)}`, sub:`${kwhToCarbonCredits(totalKwh).toFixed(4)} CCC`, color:'#4A7FA5' },
  ]

  const chartData = {
    labels: Array.from({length:24},(_,i)=>`${String(i).padStart(2,'0')}:00`),
    datasets:[{ label:'kWh', data:genData, borderColor:'#5A7A5A', backgroundColor:'rgba(90,122,90,0.06)', fill:true, tension:0.4, pointRadius:2, pointBackgroundColor:'#5A7A5A', borderWidth:2 }]
  }
  const chartOpts: any = {
    responsive:true, maintainAspectRatio:false,
    plugins:{legend:{display:false}},
    scales:{
      x:{ticks:{color:'#8A7D6B',font:{size:10,family:'DM Sans'}},grid:{color:'rgba(44,36,23,0.05)'}},
      y:{ticks:{color:'#8A7D6B',font:{size:10,family:'DM Sans'}},grid:{color:'rgba(44,36,23,0.05)'},beginAtZero:true}
    }
  }

  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      {/* Topbar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'28px'}}>
        <div>
          <h1 style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'26px',fontWeight:600,color:'#2C2417',letterSpacing:'-0.5px'}}>Dashboard</h1>
          <p style={{fontSize:'13px',color:'#8A7D6B',marginTop:'3px'}}>
            {time.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})}
            <span style={{marginLeft:'10px',color:'#5A7A5A',fontWeight:500}}>{time.toLocaleTimeString('en-IN')}</span>
          </p>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'6px',background:'#EAF0EA',border:'1px solid rgba(90,122,90,0.2)',borderRadius:'100px',padding:'8px 16px',fontSize:'12px',fontWeight:500,color:'#3D5C3D'}}>
          <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#5A7A5A',display:'inline-block'}} />
          System Online
        </div>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',marginBottom:'20px'}}>
        {stats.map(s => (
          <div key={s.label} style={{background:'#fff',border:'1px solid rgba(44,36,23,0.1)',borderRadius:'18px',padding:'22px'}}>
            <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#8A7D6B',marginBottom:'10px'}}>{s.label}</div>
            <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'26px',fontWeight:600,color:s.color,lineHeight:1,marginBottom:'6px'}}>{s.val}</div>
            <div style={{fontSize:'12px',color:'#8A7D6B'}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Chart + Quick Stats */}
      <div style={{display:'grid',gridTemplateColumns:'1.6fr 1fr',gap:'16px',marginBottom:'20px'}}>
        {card(<>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
            <div style={{fontSize:'13px',fontWeight:600,color:'#2C2417'}}>Generation Curve — Today</div>
            <span style={{fontSize:'11px',color:'#8A7D6B',background:'#F7F4EE',border:'1px solid rgba(44,36,23,0.08)',borderRadius:'100px',padding:'4px 12px'}}>5 kWp system</span>
          </div>
          <div style={{height:'220px'}}><Line data={chartData} options={chartOpts} /></div>
        </>)}
        {card(<>
          {label('Quick Stats')}
          {[
            ['This month',`${(totalKwh*22).toFixed(0)} kWh`],
            ['This year',`${(totalKwh*265).toFixed(0)} kWh`],
            ['Total credits',`${kwhToCredits(totalKwh*265).toLocaleString()} EXC`],
            ['Annual CO₂',`${kwhToCarbon(totalKwh*265)} kg`],
            ['Trees equiv.',`${Math.floor(kwhToCarbon(totalKwh*265)/21)} trees`],
            ['Annual value',`₹${kwhToMoneyINR(totalKwh*265).toFixed(0)}`],
          ].map(([l,v])=>(
            <div key={l as string} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'11px 0',borderBottom:'1px solid rgba(44,36,23,0.06)'}}>
              <span style={{fontSize:'13px',color:'#8A7D6B'}}>{l}</span>
              <span style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'15px',fontWeight:600,color:'#2C2417'}}>{v}</span>
            </div>
          ))}
        </>)}
      </div>

      {/* Installation */}
      {card(<>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
          <div style={{fontSize:'13px',fontWeight:600,color:'#2C2417'}}>My Installations</div>
          <button style={{padding:'7px 16px',background:'transparent',border:'1.5px solid rgba(44,36,23,0.15)',borderRadius:'100px',fontSize:'12px',fontWeight:500,color:'#4A3F2F',cursor:'pointer'}}>+ Add Installation</button>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'14px',padding:'16px',background:'#F7F4EE',borderRadius:'14px',border:'1px solid rgba(44,36,23,0.07)'}}>
          <div style={{width:'44px',height:'44px',background:'#EAF0EA',border:'1px solid rgba(90,122,90,0.2)',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>🏠</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:600,fontSize:'14px',color:'#2C2417',marginBottom:'3px'}}>My Home — Hyderabad</div>
            <div style={{fontSize:'12px',color:'#8A7D6B'}}>5 kWp · Growatt MIN 5000TL · Connected via API</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'18px',fontWeight:600,color:'#5A7A5A'}}>{currentKw.toFixed(2)} kW</div>
            <div style={{fontSize:'11px',color:'#8A7D6B'}}>generating now</div>
          </div>
          <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#5A7A5A',flexShrink:0}} />
        </div>
      </>)}
    </div>
  )
}
