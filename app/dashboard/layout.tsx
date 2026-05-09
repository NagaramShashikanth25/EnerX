import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#F7F4EE', fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      <Sidebar userName="Demo User" userEmail="demo@energx.in" role="user" />
      <main style={{ marginLeft:'220px', flex:1, padding:'36px', minHeight:'100vh' }}>
        {children}
      </main>
    </div>
  )
}
