'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Map, CreditCard, Trophy, BarChart3, Settings, LogOut, Zap } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const nav = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/map', icon: Map, label: 'Map' },
  { href: '/dashboard/credits', icon: CreditCard, label: 'Credits' },
  { href: '/dashboard/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { href: '/dashboard/esg', icon: BarChart3, label: 'ESG Report' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar({ userName = 'User', userEmail = '', role = 'user' }: { userName?: string, userEmail?: string, role?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const handleLogout = async () => { await supabase.auth.signOut(); router.push('/login') }

  return (
    <aside style={{
      position:'fixed', left:0, top:0, bottom:0, width:'220px',
      background:'#2C2417', display:'flex', flexDirection:'column', zIndex:50,
      fontFamily:"'DM Sans', system-ui, sans-serif"
    }}>
      {/* Logo */}
      <Link href="/" style={{
        display:'flex', alignItems:'center', gap:'10px',
        padding:'20px 20px', borderBottom:'1px solid rgba(247,244,238,0.08)',
        textDecoration:'none'
      }}>
        <div style={{width:'32px',height:'32px',background:'#5A7A5A',borderRadius:'9px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',flexShrink:0}}>☀️</div>
        <span style={{fontFamily:"'Fraunces', Georgia, serif",fontSize:'20px',fontWeight:700,color:'#F7F4EE',letterSpacing:'-0.5px'}}>EnerX</span>
      </Link>

      {/* Role badge */}
      {role !== 'user' && (
        <div style={{margin:'12px 16px 0',padding:'6px 12px',background:'rgba(212,134,10,0.15)',border:'1px solid rgba(212,134,10,0.25)',borderRadius:'100px',fontSize:'11px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',color:'#D4860A',textAlign:'center'}}>
          {role}
        </div>
      )}

      {/* Nav */}
      <nav style={{flex:1,padding:'12px',overflowY:'auto',display:'flex',flexDirection:'column',gap:'2px'}}>
        <div style={{fontSize:'10px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(247,244,238,0.2)',padding:'12px 8px 6px'}}>Navigation</div>
        {nav.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} style={{
              display:'flex', alignItems:'center', gap:'10px',
              padding:'10px 12px', borderRadius:'10px',
              fontSize:'13px', fontWeight:500,
              color: active ? '#F7F4EE' : 'rgba(247,244,238,0.45)',
              background: active ? 'rgba(90,122,90,0.3)' : 'transparent',
              textDecoration:'none', transition:'all 0.15s',
              borderLeft: active ? '2px solid #5A7A5A' : '2px solid transparent'
            }}>
              <item.icon size={15} style={{flexShrink:0}} />
              {item.label}
              {active && <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'#5A7A5A',marginLeft:'auto',flexShrink:0}} />}
            </Link>
          )
        })}

        {role === 'admin' && (
          <>
            <div style={{fontSize:'10px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(247,244,238,0.2)',padding:'16px 8px 6px'}}>Admin</div>
            {[
              {href:'/admin',label:'Overview'},
              {href:'/admin/users',label:'Users'},
              {href:'/admin/analytics',label:'Analytics'},
            ].map(item => (
              <Link key={item.href} href={item.href} style={{
                display:'flex',alignItems:'center',gap:'10px',padding:'10px 12px',
                borderRadius:'10px',fontSize:'13px',fontWeight:500,
                color:'rgba(247,244,238,0.45)',textDecoration:'none',transition:'all 0.15s'
              }}>{item.label}</Link>
            ))}
          </>
        )}
      </nav>

      {/* User */}
      <div style={{padding:'12px',borderTop:'1px solid rgba(247,244,238,0.08)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 12px',background:'rgba(247,244,238,0.05)',border:'1px solid rgba(247,244,238,0.08)',borderRadius:'10px',marginBottom:'8px'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'9px',background:'#5A7A5A',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Fraunces',Georgia,serif",fontSize:'14px',fontWeight:700,color:'#fff',flexShrink:0}}>
            {userName.charAt(0).toUpperCase()}
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:'13px',fontWeight:500,color:'#F7F4EE',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{userName}</div>
            <div style={{fontSize:'10px',color:'rgba(247,244,238,0.3)',letterSpacing:'0.5px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{userEmail}</div>
          </div>
        </div>
        <button onClick={handleLogout} style={{
          display:'flex',alignItems:'center',gap:'8px',width:'100%',padding:'9px 12px',
          background:'transparent',border:'none',borderRadius:'10px',
          fontSize:'13px',fontWeight:500,color:'rgba(247,244,238,0.4)',
          cursor:'pointer',transition:'all 0.15s',textAlign:'left'
        }}>
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </aside>
  )
}
