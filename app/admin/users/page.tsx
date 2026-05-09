'use client'
import { useState } from 'react'
import { kwhToCredits } from '@/lib/solar'

const ALL_USERS = [
  { id:'H-001', name:'Sharma Residence', email:'sharma@example.com', loc:'Mumbai', kwh:312.4, role:'user', status:'active', joined:'Jan 15, 2026' },
  { id:'H-002', name:'Patel Villa', email:'patel@example.com', loc:'Ahmedabad', kwh:184.2, role:'user', status:'active', joined:'Jan 18, 2026' },
  { id:'H-003', name:'Green Terrace', email:'green@example.com', loc:'Pune', kwh:298.1, role:'user', status:'active', joined:'Jan 20, 2026' },
  { id:'H-004', name:'Reddy Home', email:'reddy@example.com', loc:'Hyderabad', kwh:231.2, role:'user', status:'active', joined:'Feb 1, 2026' },
  { id:'H-005', name:'Solar Nest', email:'solar@example.com', loc:'Bangalore', kwh:265.3, role:'user', status:'active', joined:'Feb 5, 2026' },
  { id:'C-001', name:'Infosys Ltd', email:'esg@infosys.com', loc:'Bangalore', kwh:0, role:'corporate', status:'active', joined:'Feb 10, 2026' },
  { id:'C-002', name:'Tata Motors', email:'esg@tata.com', loc:'Mumbai', kwh:0, role:'corporate', status:'pilot', joined:'Mar 1, 2026' },
]

export default function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = ALL_USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || u.role === filter
    return matchSearch && matchFilter
  })

  const s = (extra={}) => ({ background:'#fff', border:'1px solid rgba(44,36,23,0.1)', borderRadius:'18px', padding:'24px', ...extra })

  return (
    <div style={{ fontFamily:"'DM Sans',system-ui,sans-serif" }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'28px' }}>
        <div>
          <h1 style={{ fontFamily:"'Fraunces',Georgia,serif", fontSize:'26px', fontWeight:600, color:'#2C2417', letterSpacing:'-0.5px' }}>User Management</h1>
          <p style={{ fontSize:'13px', color:'#8A7D6B', marginTop:'3px' }}>{ALL_USERS.length} total users on platform</p>
        </div>
        <button style={{ padding:'10px 20px', background:'#5A7A5A', color:'#fff', border:'none', borderRadius:'100px', fontSize:'13px', fontWeight:500, cursor:'pointer' }}>+ Invite User</button>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:'12px', marginBottom:'20px', flexWrap:'wrap' }}>
        <div style={{ position:'relative', flex:1, maxWidth:'320px' }}>
          <span style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:'#8A7D6B', fontSize:'14px' }}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search users…"
            style={{ width:'100%', padding:'10px 14px 10px 38px', border:'1.5px solid rgba(44,36,23,0.1)', borderRadius:'12px', fontFamily:"'DM Sans',system-ui,sans-serif", fontSize:'14px', color:'#2C2417', background:'#fff', outline:'none', boxSizing:'border-box' }} />
        </div>
        {['all','user','corporate'].map(f => (
          <button key={f} onClick={()=>setFilter(f)}
            style={{ padding:'10px 18px', borderRadius:'100px', border:'1.5px solid', fontSize:'13px', fontWeight:500, cursor:'pointer', textTransform:'capitalize', transition:'all 0.15s',
              background: filter===f ? '#5A7A5A' : 'transparent',
              color: filter===f ? '#fff' : '#4A3F2F',
              borderColor: filter===f ? '#5A7A5A' : 'rgba(44,36,23,0.15)' }}>
            {f === 'all' ? 'All Users' : f}
          </button>
        ))}
      </div>

      <div style={s()}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'13px' }}>
            <thead>
              <tr style={{ borderBottom:'1.5px solid rgba(44,36,23,0.1)' }}>
                {['ID','Name','Email','Location','Joined','Generation','Credits','Role','Status'].map(h => (
                  <th key={h} style={{ textAlign:'left', padding:'10px 12px', fontSize:'10px', fontWeight:600, letterSpacing:'1.5px', textTransform:'uppercase', color:'#8A7D6B' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u,i) => (
                <tr key={u.id} style={{ borderBottom:i<filtered.length-1?'1px solid rgba(44,36,23,0.06)':'none' }}>
                  <td style={{ padding:'12px', fontWeight:600, color:'#5A7A5A', fontSize:'12px' }}>{u.id}</td>
                  <td style={{ padding:'12px', fontWeight:500, color:'#2C2417' }}>{u.name}</td>
                  <td style={{ padding:'12px', color:'#8A7D6B', fontSize:'12px' }}>{u.email}</td>
                  <td style={{ padding:'12px', color:'#8A7D6B' }}>{u.loc}</td>
                  <td style={{ padding:'12px', color:'#8A7D6B', fontSize:'12px' }}>{u.joined}</td>
                  <td style={{ padding:'12px', fontFamily:"'Fraunces',Georgia,serif", fontWeight:600, color:'#5A7A5A' }}>{u.kwh>0?`${u.kwh} kWh`:'—'}</td>
                  <td style={{ padding:'12px', fontFamily:"'Fraunces',Georgia,serif", fontWeight:600, color:'#D4860A' }}>{u.kwh>0?`${kwhToCredits(u.kwh)} EXC`:'—'}</td>
                  <td style={{ padding:'12px' }}>
                    <span style={{ padding:'3px 10px', borderRadius:'100px', fontSize:'11px', fontWeight:600, background:u.role==='corporate'?'#FDF3E0':'#EAF0EA', color:u.role==='corporate'?'#D4860A':'#3D5C3D', border:`1px solid ${u.role==='corporate'?'rgba(212,134,10,0.2)':'rgba(90,122,90,0.2)'}` }}>{u.role}</span>
                  </td>
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
          {filtered.length === 0 && <div style={{ textAlign:'center', padding:'40px', color:'#8A7D6B', fontSize:'14px' }}>No users found.</div>}
        </div>
      </div>
    </div>
  )
}
