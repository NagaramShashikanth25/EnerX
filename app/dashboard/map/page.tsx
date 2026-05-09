import { kwhToCredits, kwhToCarbon } from '@/lib/solar'

const HH = [
  {id:'H-001',name:'Sharma Residence',loc:'Mumbai, MH',kwh:312.4,cap:5,icon:'🏠'},
  {id:'H-002',name:'Patel Villa',loc:'Ahmedabad, GJ',kwh:184.2,cap:3.5,icon:'🏡'},
  {id:'H-003',name:'Green Terrace',loc:'Pune, MH',kwh:298.1,cap:7,icon:'🏘'},
  {id:'H-004',name:'Reddy Home',loc:'Hyderabad, TS',kwh:231.2,cap:4.5,icon:'🏠'},
  {id:'H-005',name:'Solar Nest',loc:'Bangalore, KA',kwh:265.3,cap:6,icon:'🏡'},
  {id:'H-006',name:'Iyer Estate',loc:'Chennai, TN',kwh:171.8,cap:3,icon:'🏘'},
  {id:'H-007',name:'Singh Towers',loc:'Delhi, DL',kwh:287.6,cap:8,icon:'🏠'},
  {id:'H-008',name:'Gupta Greens',loc:'Jaipur, RJ',kwh:218.9,cap:5.5,icon:'🏡'},
  {id:'H-009',name:'Eco Cottage',loc:'Kolkata, WB',kwh:196.4,cap:4,icon:'🏘'},
  {id:'H-010',name:'Sun Abode',loc:'Indore, MP',kwh:244.7,cap:6.5,icon:'🏠'},
]

export default function MapPage() {
  const s = (extra={}) => ({background:'#fff',border:'1px solid rgba(44,36,23,0.1)',borderRadius:'18px',padding:'24px',...extra})

  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div style={{marginBottom:'28px'}}>
        <h1 style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'26px',fontWeight:600,color:'#2C2417',letterSpacing:'-0.5px'}}>Network Map</h1>
        <p style={{fontSize:'13px',color:'#8A7D6B',marginTop:'3px'}}>All EnerX connected households across India</p>
      </div>

      {/* Map placeholder */}
      <div style={{...s({padding:0,overflow:'hidden',marginBottom:'20px'})}}>
        <div style={{height:'340px',background:'#F7F4EE',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'12px',borderRadius:'18px'}}>
          <div style={{fontSize:'56px'}}>🗺</div>
          <div style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'18px',color:'#4A3F2F'}}>Interactive Map</div>
          <div style={{fontSize:'13px',color:'#8A7D6B',textAlign:'center',maxWidth:'320px',lineHeight:1.6}}>
            Add <code style={{background:'#EDE8DE',padding:'2px 6px',borderRadius:'4px',fontSize:'12px'}}>NEXT_PUBLIC_GOOGLE_MAPS_KEY</code> in your .env.local to enable the live map.
          </div>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'8px',marginTop:'8px',padding:'0 32px'}}>
            {HH.map(h=>(
              <div key={h.id} style={{display:'flex',alignItems:'center',gap:'6px',background:'#fff',border:'1px solid rgba(44,36,23,0.1)',borderRadius:'100px',padding:'5px 12px',fontSize:'12px',color:'#4A3F2F'}}>
                <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#5A7A5A',display:'inline-block'}} />
                {h.loc.split(',')[0]}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={s()}>
        <div style={{fontSize:'13px',fontWeight:600,color:'#2C2417',marginBottom:'16px'}}>{HH.length} Households Online</div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'13px'}}>
            <thead>
              <tr style={{borderBottom:'1.5px solid rgba(44,36,23,0.1)'}}>
                {['Household','Location','Capacity','This Month','CO₂ Saved','Credits','Status'].map(h=>(
                  <th key={h} style={{textAlign:'left',padding:'10px 12px',fontSize:'10px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',color:'#8A7D6B'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HH.map((h,i)=>(
                <tr key={h.id} style={{borderBottom:i<HH.length-1?'1px solid rgba(44,36,23,0.06)':'none'}}>
                  <td style={{padding:'12px',fontWeight:500,color:'#2C2417'}}>{h.icon} {h.name}</td>
                  <td style={{padding:'12px',color:'#8A7D6B'}}>{h.loc}</td>
                  <td style={{padding:'12px',color:'#8A7D6B'}}>{h.cap} kWp</td>
                  <td style={{padding:'12px',fontFamily:"'Fraunces',Georgia,serif",fontWeight:600,color:'#5A7A5A'}}>{h.kwh} kWh</td>
                  <td style={{padding:'12px',color:'#3D5C3D',fontWeight:500}}>{kwhToCarbon(h.kwh)} kg</td>
                  <td style={{padding:'12px',fontFamily:"'Fraunces',Georgia,serif",fontWeight:600,color:'#D4860A'}}>{kwhToCredits(h.kwh)} EXC</td>
                  <td style={{padding:'12px'}}>
                    <span style={{display:'inline-flex',alignItems:'center',gap:'5px',fontSize:'12px',color:'#3D5C3D',background:'#EAF0EA',border:'1px solid rgba(90,122,90,0.2)',padding:'3px 10px',borderRadius:'100px'}}>
                      <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'#5A7A5A',display:'inline-block'}} />Online
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
