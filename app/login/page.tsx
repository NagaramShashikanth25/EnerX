'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<'login'|'register'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email:'', password:'', full_name:'', role:'user' })

  useEffect(() => { if (searchParams.get('tab') === 'register') setTab('register') }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
      if (error) throw error
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
      const role = profile?.role || 'user'
      if (role === 'admin') router.push('/admin')
      else if (role === 'corporate') router.push('/corporate')
      else router.push('/dashboard')
    } catch (err: any) { setError(err.message || 'Login failed') }
    finally { setLoading(false) }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email, password: form.password,
        options: { data: { full_name: form.full_name, role: form.role } }
      })
      if (error) throw error
      await supabase.from('profiles').insert({ id: data.user!.id, email: form.email, full_name: form.full_name, role: form.role })
      setSuccess('Account created! Check your email to verify.')
    } catch (err: any) { setError(err.message || 'Registration failed') }
    finally { setLoading(false) }
  }

  const s: Record<string,any> = {
    page: { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'32px 16px', background:'#F7F4EE', fontFamily:"'DM Sans', system-ui, sans-serif" },
    wrap: { width:'100%', maxWidth:'420px' },
    logo: { display:'flex', alignItems:'center', gap:'10px', justifyContent:'center', marginBottom:'32px', textDecoration:'none' },
    logoMark: { width:'40px', height:'40px', background:'#5A7A5A', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px' },
    logoText: { fontFamily:"'Fraunces', Georgia, serif", fontSize:'26px', fontWeight:700, color:'#2C2417', letterSpacing:'-0.5px' },
    card: { background:'#fff', border:'1px solid rgba(44,36,23,0.1)', borderRadius:'20px', padding:'36px' },
    tabs: { display:'flex', background:'#F7F4EE', borderRadius:'12px', padding:'4px', marginBottom:'28px' },
    tab: (active: boolean) => ({ flex:1, padding:'10px', borderRadius:'9px', border:'none', cursor:'pointer', fontSize:'14px', fontWeight:500, transition:'all 0.15s', background: active ? '#fff' : 'transparent', color: active ? '#2C2417' : '#8A7D6B', boxShadow: active ? '0 1px 4px rgba(44,36,23,0.08)' : 'none' }),
    label: { fontSize:'11px', fontWeight:600, letterSpacing:'1.5px', textTransform:'uppercase' as const, color:'#8A7D6B', display:'block', marginBottom:'8px' },
    input: { width:'100%', padding:'13px 16px', border:'1.5px solid rgba(44,36,23,0.1)', borderRadius:'12px', fontFamily:"'DM Sans', system-ui, sans-serif", fontSize:'14px', color:'#2C2417', background:'#F7F4EE', outline:'none', transition:'all 0.2s', boxSizing:'border-box' as const },
    btn: { width:'100%', padding:'14px', background:'#5A7A5A', color:'#fff', border:'none', borderRadius:'12px', fontFamily:"'DM Sans', system-ui, sans-serif", fontSize:'15px', fontWeight:500, cursor:'pointer', transition:'all 0.2s', marginTop:'8px' },
    err: { background:'rgba(185,28,28,0.06)', border:'1px solid rgba(185,28,28,0.15)', borderRadius:'10px', padding:'12px 16px', color:'#b91c1c', fontSize:'13px', marginBottom:'16px' },
    ok: { background:'rgba(90,122,90,0.08)', border:'1px solid rgba(90,122,90,0.2)', borderRadius:'10px', padding:'12px 16px', color:'#3D5C3D', fontSize:'13px', marginBottom:'16px' },
    grp: { marginBottom:'18px' },
  }

  return (
    <div style={s.page}>
      <div style={s.wrap}>
        <Link href="/" style={s.logo}>
          <div style={s.logoMark}>☀️</div>
          <span style={s.logoText}>EnerX</span>
        </Link>
        <div style={{textAlign:'center',marginBottom:'28px'}}>
          <h1 style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:'26px',fontWeight:400,color:'#2C2417',marginBottom:'6px'}}>{tab==='login'?'Welcome back':'Create account'}</h1>
          <p style={{fontSize:'14px',color:'#8A7D6B'}}>{tab==='login'?'Sign in to your EnerX account':'Start earning from your solar panels'}</p>
        </div>
        <div style={s.card}>
          <div style={s.tabs}>
            <button style={s.tab(tab==='login')} onClick={()=>{setTab('login');setError('');setSuccess('')}}>Sign In</button>
            <button style={s.tab(tab==='register')} onClick={()=>{setTab('register');setError('');setSuccess('')}}>Register</button>
          </div>

          {error && <div style={s.err}>{error}</div>}
          {success && <div style={s.ok}>{success}</div>}

          <form onSubmit={tab==='login'?handleLogin:handleRegister}>
            {tab==='register' && (
              <div style={s.grp}>
                <label style={s.label}>Full Name</label>
                <input style={s.input} type="text" required value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})} placeholder="Your full name" />
              </div>
            )}
            <div style={s.grp}>
              <label style={s.label}>Email</label>
              <input style={s.input} type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com" />
            </div>
            <div style={s.grp}>
              <label style={s.label}>Password</label>
              <div style={{position:'relative'}}>
                <input style={{...s.input,paddingRight:'48px'}} type={showPass?'text':'password'} required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••" />
                <button type="button" onClick={()=>setShowPass(!showPass)} style={{position:'absolute',right:'14px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#8A7D6B',fontSize:'13px'}}>
                  {showPass?'Hide':'Show'}
                </button>
              </div>
            </div>
            {tab==='register' && (
              <div style={s.grp}>
                <label style={s.label}>I am a…</label>
                <select style={s.input} value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
                  <option value="user">Household / Solar Owner</option>
                  <option value="corporate">Corporate (ESG Buyer)</option>
                </select>
              </div>
            )}
            <button type="submit" disabled={loading} style={{...s.btn, opacity:loading?0.6:1}}>
              {loading?'Please wait…':tab==='login'?'Sign In →':'Create Account →'}
            </button>
          </form>
        </div>
        <p style={{textAlign:'center',fontSize:'12px',color:'rgba(44,36,23,0.3)',marginTop:'20px'}}>
          By continuing you agree to our <span style={{color:'#5A7A5A',cursor:'pointer'}}>Terms</span> and <span style={{color:'#5A7A5A',cursor:'pointer'}}>Privacy Policy</span>
        </p>
      </div>
    </div>
  )
}
