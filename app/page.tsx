import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        :root{--cream:#F7F4EE;--cream2:#EDE8DE;--earth:#2C2417;--earth2:#4A3F2F;--sage:#5A7A5A;--sage2:#3D5C3D;--sage-light:#EAF0EA;--sage-mid:#C8D8C8;--sun:#D4860A;--sun-light:#FDF3E0;--muted:#8A7D6B;--border:rgba(44,36,23,0.10);--border2:rgba(44,36,23,0.18);--ff-head:'Fraunces',Georgia,serif;--ff-body:'DM Sans',system-ui,sans-serif;}
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:var(--cream);color:var(--earth);font-family:var(--ff-body);-webkit-font-smoothing:antialiased;}
        a{text-decoration:none;color:inherit;}
        .nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(247,244,238,0.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);}
        .nav-inner{max-width:1160px;margin:0 auto;padding:0 32px;height:68px;display:flex;align-items:center;justify-content:space-between;}
        .logo{display:flex;align-items:center;gap:10px;}
        .logo-mark{width:36px;height:36px;background:var(--sage);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;}
        .logo-text{font-family:var(--ff-head);font-weight:700;font-size:22px;color:var(--earth);letter-spacing:-0.5px;}
        .nav-links{display:flex;align-items:center;gap:36px;list-style:none;}
        .nav-links a{font-size:14px;font-weight:500;color:var(--muted);transition:color 0.2s;}
        .nav-links a:hover{color:var(--earth);}
        .nav-ctas{display:flex;align-items:center;gap:12px;}
        .btn{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;border-radius:100px;font-family:var(--ff-body);font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;border:none;white-space:nowrap;}
        .btn-ghost{background:transparent;color:var(--earth2);border:1.5px solid var(--border2);}
        .btn-ghost:hover{border-color:var(--earth);background:rgba(44,36,23,0.04);}
        .btn-primary{background:var(--sage);color:#fff;box-shadow:0 2px 12px rgba(90,122,90,0.3);}
        .btn-primary:hover{background:var(--sage2);transform:translateY(-1px);box-shadow:0 4px 20px rgba(90,122,90,0.35);}
        .btn-sun{background:var(--sun);color:#fff;}
        .btn-sun:hover{background:#b8720a;transform:translateY(-1px);}
        .btn-lg{padding:15px 32px;font-size:15px;}
        .hero{min-height:100vh;display:flex;align-items:center;padding:120px 32px 80px;position:relative;overflow:hidden;}
        .hero::before{content:'';position:absolute;top:-200px;right:-200px;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(90,122,90,0.07) 0%,transparent 70%);pointer-events:none;}
        .hero-inner{max-width:1160px;margin:0 auto;width:100%;position:relative;z-index:1;}
        .hero-tag{display:inline-flex;align-items:center;gap:8px;background:var(--sage-light);border:1px solid rgba(90,122,90,0.2);border-radius:100px;padding:6px 16px 6px 8px;font-size:13px;color:var(--sage2);font-weight:500;margin-bottom:32px;}
        .hero-tag-dot{width:20px;height:20px;background:var(--sage);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;}
        .hero-headline{font-family:var(--ff-head);font-size:clamp(48px,7vw,86px);font-weight:400;line-height:1.06;letter-spacing:-2px;color:var(--earth);max-width:760px;margin-bottom:28px;}
        .hero-headline em{font-style:italic;color:var(--sage);}
        .hero-sub{font-size:18px;color:var(--muted);max-width:520px;line-height:1.7;margin-bottom:44px;}
        .hero-actions{display:flex;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:72px;}
        .hero-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:20px;overflow:hidden;max-width:620px;}
        .hero-stat{background:#fff;padding:28px 32px;}
        .hero-stat-val{font-family:var(--ff-head);font-size:34px;font-weight:600;color:var(--earth);line-height:1;margin-bottom:6px;}
        .hero-stat-label{font-size:13px;color:var(--muted);line-height:1.4;}
        .marquee-wrap{background:var(--earth);padding:13px 0;overflow:hidden;white-space:nowrap;}
        .marquee-inner{display:inline-flex;gap:48px;animation:marquee 26s linear infinite;}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .marquee-item{display:inline-flex;align-items:center;gap:10px;font-size:13px;color:rgba(247,244,238,0.5);font-weight:500;}
        .marquee-item span{color:rgba(247,244,238,0.85);}
        .section{padding:100px 32px;max-width:1160px;margin:0 auto;}
        .section-label{display:inline-block;font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:var(--sage);margin-bottom:14px;}
        .section-title{font-family:var(--ff-head);font-size:clamp(34px,4.5vw,54px);font-weight:400;line-height:1.1;letter-spacing:-1.5px;color:var(--earth);margin-bottom:18px;}
        .section-title em{font-style:italic;color:var(--sage);}
        .section-sub{font-size:17px;color:var(--muted);max-width:520px;line-height:1.7;}
        .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;background:var(--border);border:1px solid var(--border);border-radius:22px;overflow:hidden;margin-top:56px;}
        .step{background:#fff;padding:40px 30px;transition:background 0.2s;}
        .step:hover{background:var(--sage-light);}
        .step-num{font-family:var(--ff-head);font-size:12px;color:var(--muted);margin-bottom:22px;letter-spacing:1px;}
        .step-icon{width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:18px;}
        .step-title{font-family:var(--ff-head);font-size:19px;font-weight:600;color:var(--earth);margin-bottom:10px;}
        .step-body{font-size:14px;color:var(--muted);line-height:1.7;}
        .impact-bg{background:var(--earth);padding:100px 32px;}
        .impact-inner{max-width:1160px;margin:0 auto;}
        .impact-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
        .impact-numbers{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:rgba(247,244,238,0.08);border:1px solid rgba(247,244,238,0.1);border-radius:20px;overflow:hidden;}
        .impact-num{background:rgba(247,244,238,0.04);padding:34px 30px;}
        .impact-num-val{font-family:var(--ff-head);font-size:40px;font-weight:600;color:var(--sun);line-height:1;margin-bottom:8px;}
        .impact-num-label{font-size:13px;color:rgba(247,244,238,0.4);line-height:1.5;}
        .whom-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:56px;}
        .whom-card{border:1px solid var(--border);border-radius:20px;overflow:hidden;background:#fff;transition:transform 0.2s,box-shadow 0.2s;}
        .whom-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(44,36,23,0.08);}
        .whom-card-top{padding:34px 30px 26px;border-bottom:1px solid var(--border);}
        .whom-card-icon{width:52px;height:52px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:18px;}
        .whom-card-title{font-family:var(--ff-head);font-size:21px;font-weight:600;color:var(--earth);margin-bottom:10px;}
        .whom-card-sub{font-size:14px;color:var(--muted);line-height:1.65;}
        .whom-card-features{padding:22px 30px;}
        .whom-card-features li{list-style:none;display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--earth2);padding:8px 0;border-bottom:1px solid rgba(44,36,23,0.05);}
        .whom-card-features li:last-child{border-bottom:none;}
        .chk{width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;margin-top:2px;}
        .calc-bg{background:var(--sage-light);border-top:1px solid rgba(90,122,90,0.15);border-bottom:1px solid rgba(90,122,90,0.15);padding:100px 32px;}
        .calc-inner{max-width:1160px;margin:0 auto;}
        .calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;margin-top:56px;}
        .calc-card{background:#fff;border-radius:22px;padding:38px;box-shadow:0 4px 24px rgba(44,36,23,0.06);}
        .slider-group{margin-bottom:26px;}
        .slider-row{display:flex;justify-content:space-between;font-size:14px;color:var(--earth2);font-weight:500;margin-bottom:10px;}
        .slider-val{color:var(--sage2);font-weight:600;}
        input[type=range]{width:100%;height:4px;border-radius:2px;background:var(--cream2);outline:none;cursor:pointer;-webkit-appearance:none;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:var(--sage);box-shadow:0 2px 8px rgba(90,122,90,0.4);}
        .calc-results{background:#fff;border-radius:22px;padding:38px;box-shadow:0 4px 24px rgba(44,36,23,0.06);}
        .calc-row{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid rgba(44,36,23,0.07);}
        .calc-row:last-of-type{border-bottom:none;}
        .calc-row-label{font-size:14px;color:var(--muted);}
        .calc-row-val{font-family:var(--ff-head);font-size:17px;font-weight:600;color:var(--earth);}
        .calc-highlight{background:var(--sage-light);border:1px solid rgba(90,122,90,0.2);border-radius:16px;padding:24px;margin-top:20px;text-align:center;}
        .calc-big-val{font-family:var(--ff-head);font-size:52px;font-weight:600;color:var(--sage2);line-height:1;margin-bottom:6px;}
        .calc-big-label{font-size:13px;color:var(--muted);}
        .partners-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-top:48px;}
        .partner-card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:22px 14px;text-align:center;cursor:pointer;transition:all 0.2s;}
        .partner-card:hover{border-color:var(--sage);transform:translateY(-2px);box-shadow:0 6px 20px rgba(90,122,90,0.1);}
        .pricing-wrap{background:var(--cream2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:100px 32px;}
        .pricing-inner{max-width:1160px;margin:0 auto;}
        .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:56px;}
        .price-card{border:1.5px solid var(--border);border-radius:22px;padding:38px;background:#fff;position:relative;transition:all 0.2s;}
        .price-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(44,36,23,0.08);}
        .price-card.featured{border-color:var(--sage);background:var(--earth);}
        .price-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:var(--sage);color:#fff;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:4px 16px;border-radius:100px;white-space:nowrap;}
        .price-plan{font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:14px;}
        .price-card.featured .price-plan{color:rgba(247,244,238,0.35);}
        .price-amount{font-family:var(--ff-head);font-size:40px;font-weight:600;color:var(--earth);line-height:1;margin-bottom:4px;letter-spacing:-1px;}
        .price-card.featured .price-amount{color:#F7F4EE;}
        .price-period{font-size:13px;color:var(--muted);margin-bottom:26px;}
        .price-card.featured .price-period{color:rgba(247,244,238,0.35);}
        .price-divider{height:1px;background:var(--border);margin-bottom:22px;}
        .price-card.featured .price-divider{background:rgba(247,244,238,0.1);}
        .price-features{list-style:none;margin-bottom:0;}
        .price-features li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--earth2);margin-bottom:12px;}
        .price-card.featured .price-features li{color:rgba(247,244,238,0.65);}
        .contact-bg{background:var(--cream2);border-top:1px solid var(--border);padding:100px 32px;}
        .contact-inner{max-width:1160px;margin:0 auto;}
        .contact-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:80px;margin-top:56px;}
        .form-card{background:#fff;border-radius:22px;padding:44px;box-shadow:0 4px 32px rgba(44,36,23,0.06);}
        .form-row{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px;}
        .form-grp{display:flex;flex-direction:column;gap:8px;margin-bottom:18px;}
        .form-grp label{font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);}
        .form-grp input,.form-grp select,.form-grp textarea{padding:13px 16px;border:1.5px solid var(--border);border-radius:12px;font-family:var(--ff-body);font-size:14px;color:var(--earth);background:var(--cream);outline:none;transition:all 0.2s;}
        .form-grp input:focus,.form-grp select:focus,.form-grp textarea:focus{border-color:var(--sage);background:#fff;box-shadow:0 0 0 3px rgba(90,122,90,0.1);}
        .form-grp textarea{resize:none;line-height:1.6;}
        .form-grp input::placeholder,.form-grp textarea::placeholder{color:var(--muted);}
        footer{background:var(--earth);padding:60px 32px 40px;}
        .footer-inner{max-width:1160px;margin:0 auto;}
        .footer-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px;padding-bottom:48px;border-bottom:1px solid rgba(247,244,238,0.08);}
        .footer-tagline{font-size:13px;color:rgba(247,244,238,0.3);margin-top:8px;max-width:200px;line-height:1.5;}
        .footer-links{display:flex;gap:64px;}
        .footer-col h4{font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:rgba(247,244,238,0.35);margin-bottom:14px;}
        .footer-col ul{list-style:none;display:flex;flex-direction:column;gap:10px;}
        .footer-col ul a{font-size:14px;color:rgba(247,244,238,0.5);transition:color 0.2s;}
        .footer-col ul a:hover{color:#F7F4EE;}
        .footer-bottom{display:flex;justify-content:space-between;font-size:12px;color:rgba(247,244,238,0.2);}
        @media(max-width:900px){
          .nav-links{display:none;}
          .steps,.whom-grid,.impact-grid,.calc-grid,.pricing-grid,.contact-grid{grid-template-columns:1fr;}
          .partners-grid{grid-template-columns:repeat(3,1fr);}
          .hero-stats{grid-template-columns:1fr 1fr;}
          .footer-top{flex-direction:column;gap:40px;}
          .footer-links{flex-wrap:wrap;gap:32px;}
        }
        @media(max-width:600px){
          .steps,.partners-grid{grid-template-columns:1fr 1fr;}
          .hero-stats,.impact-numbers,.form-row{grid-template-columns:1fr;}
        }
      `}</style>

      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="logo"><div className="logo-mark">☀️</div><span className="logo-text">EnerX</span></Link>
          <ul className="nav-links">
            {[['#how','How it works'],['#impact','Impact'],['#who','For you'],['#pricing','Pricing'],['#contact','Contact']].map(([h,l])=>(
              <li key={h}><a href={h}>{l}</a></li>
            ))}
          </ul>
          <div className="nav-ctas">
            <Link href="/login" className="btn btn-ghost">Sign in</Link>
            <Link href="/login?tab=register" className="btn btn-primary">Get started</Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-tag"><div className="hero-tag-dot">⚡</div>India's green energy intelligence platform</div>
          <h1 className="hero-headline">Your rooftop solar<br/>deserves to <em>earn more</em></h1>
          <p className="hero-sub">EnerX converts your solar generation into verified carbon credits, ESG reports, and real rewards — redeemable at fuel stations and grocery stores across India.</p>
          <div className="hero-actions">
            <Link href="/login?tab=register" className="btn btn-primary btn-lg">Start earning free →</Link>
            <a href="#how" className="btn btn-ghost btn-lg">See how it works</a>
          </div>
          <div className="hero-stats">
            {[['₹900','Per carbon credit — India Govt. CCTS rate'],['0.82 kg','CO₂ saved per kWh you generate'],['40L+','Eligible households by 2026']].map(([v,l])=>(
              <div key={v} className="hero-stat"><div className="hero-stat-val">{v}</div><div className="hero-stat-label">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee-inner">
          {[...Array(2)].map((_,r)=>(
            <span key={r} style={{display:'inline-flex',gap:'48px'}}>
              {['☀️ PM Surya Ghar','📊 SEBI BRSR','🌿 BEE CCTS','⛽ Fuel Stations','🏭 ESG Reports','🔒 Auditable Ledger','📱 Growatt & Solis','🇮🇳 Built for India'].map(t=>(
                <span key={t} className="marquee-item">{t.split(' ')[0]} <span>{t.split(' ').slice(1).join(' ')}</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div id="how"><div className="section">
        <span className="section-label">Simple process</span>
        <h2 className="section-title">Four steps to <em>real value</em></h2>
        <p className="section-sub">No new hardware. No electricity law changes. Just connect your existing inverter and start earning.</p>
        <div className="steps">
          {[
            {n:'01',icon:'🔌',bg:'#EAF0EA',t:'Connect',b:"Enter your inverter serial number. EnerX auto-connects to Growatt, Solis, Huawei, or SolarEdge — no electrician needed."},
            {n:'02',icon:'⚡',bg:'#FDF3E0',t:'Track',b:"We pull real-time generation every hour into a tamper-proof, timestamped ledger verifiable by any third party."},
            {n:'03',icon:'🌿',bg:'#E8F2F8',t:'Earn',b:"10 EnerX Credits per kWh, automatically. Carbon savings use India's official grid factor of 0.82 kg CO₂/kWh from CEA."},
            {n:'04',icon:'🎁',bg:'#FBF0EC',t:'Redeem',b:"Spend credits at Indian Oil, BigBasket, MSEDCL and more. Or let EnerX sell your carbon credits to corporates and share earnings."},
          ].map(s=>(
            <div key={s.n} className="step">
              <div className="step-num">{s.n}</div>
              <div className="step-icon" style={{background:s.bg}}>{s.icon}</div>
              <div className="step-title">{s.t}</div>
              <div className="step-body">{s.b}</div>
            </div>
          ))}
        </div>
      </div></div>

      <div id="impact"><div className="impact-bg"><div className="impact-inner">
        <div className="impact-grid">
          <div>
            <span className="section-label" style={{color:'rgba(212,134,10,0.85)'}}>Real numbers</span>
            <h2 className="section-title" style={{color:'#F7F4EE'}}>The <em style={{color:'#D4860A'}}>money</em> your solar leaves on the table</h2>
            <p className="section-sub" style={{color:'rgba(247,244,238,0.45)',marginBottom:'32px'}}>Every unit of solar has a verified monetary value in India's growing carbon market. EnerX captures that value for you.</p>
            <Link href="/login?tab=register" className="btn btn-sun btn-lg">Calculate my earnings →</Link>
            <p style={{fontSize:'12px',color:'rgba(247,244,238,0.25)',marginTop:'12px'}}>Based on BEE CCTS 2023 rates. Results vary by system size.</p>
          </div>
          <div className="impact-numbers">
            {[['₹4,410','Annual carbon value for a 5kW system'],['410 kg','CO₂ offset per month per household'],['₹33L','EnerX revenue from 1,000 households/year'],['Mid-2026','India compliance carbon market launch']].map(([v,l])=>(
              <div key={v} className="impact-num"><div className="impact-num-val">{v}</div><div className="impact-num-label">{l}</div></div>
            ))}
          </div>
        </div>
      </div></div></div>

      <div id="who"><div className="section">
        <span className="section-label">Built for everyone</span>
        <h2 className="section-title">One platform, <em>three stakeholders</em></h2>
        <p className="section-sub">EnerX connects people who generate green energy with companies that need to prove it.</p>
        <div className="whom-grid">
          {[
            {icon:'🏠',bg:'#EAF0EA',chkBg:'#EAF0EA',chkC:'#3D5C3D',t:'Households',sub:"You installed solar. Now make it work harder. Earn credits every hour your panels generate power.",feats:['Real-time generation tracking','Automatic credit earning','Fuel & grocery redemptions','Carbon impact dashboard','PM Surya Ghar compatible']},
            {icon:'🏢',bg:'#FDF3E0',chkBg:'#FDF3E0',chkC:'#D4860A',t:'Corporates',sub:"Your BRSR deadline is real. Get verified renewable energy data ready for submission in 30 days.",feats:['SEBI BRSR formatted reports','Verified carbon offset data','Auditable ESG ledger','Value chain ESG tracking','One-click report download']},
            {icon:'🏛',bg:'#E8F2F8',chkBg:'#E8F2F8',chkC:'#4A7FA5',t:'Government',sub:"No infrastructure changes. No new laws. EnerX gives you the data to prove India's green progress.",feats:['City-level green dashboards','MNRE reporting compatible','BEE CCTS aligned data','Ward-level solar analytics','Net Zero progress tracking']},
          ].map(w=>(
            <div key={w.t} className="whom-card">
              <div className="whom-card-top">
                <div className="whom-card-icon" style={{background:w.bg}}>{w.icon}</div>
                <div className="whom-card-title">{w.t}</div>
                <div className="whom-card-sub">{w.sub}</div>
              </div>
              <ul className="whom-card-features">
                {w.feats.map(f=>(
                  <li key={f}><span className="chk" style={{background:w.chkBg,color:w.chkC}}>✓</span>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div></div>

      <div className="calc-bg"><div className="calc-inner">
        <span className="section-label">Earnings calculator</span>
        <h2 className="section-title">How much will <em>your system</em> earn?</h2>
        <p className="section-sub">Adjust your system details. See real estimates based on India Govt. CCTS 2023 rates.</p>
        <div className="calc-grid">
          <div className="calc-card">
            <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'var(--muted)',marginBottom:'28px'}}>System Details</div>
            <div className="slider-group">
              <div className="slider-row"><span>System Capacity</span><span className="slider-val" id="cap-val">5 kWp</span></div>
              <input type="range" id="capacity" min={1} max={20} defaultValue={5} step={0.5} />
            </div>
            <div className="slider-group">
              <div className="slider-row"><span>Daily Sun Hours</span><span className="slider-val" id="sun-val">5 hrs</span></div>
              <input type="range" id="sunhours" min={3} max={8} defaultValue={5} step={0.5} />
            </div>
            <div className="slider-group">
              <div className="slider-row"><span>System Efficiency</span><span className="slider-val" id="eff-val">80%</span></div>
              <input type="range" id="efficiency" min={60} max={95} defaultValue={80} step={1} />
            </div>
          </div>
          <div className="calc-results">
            <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'var(--muted)',marginBottom:'20px'}}>Your Earnings</div>
            {[['Daily generation','r-daily'],['Monthly generation','r-monthly'],['Monthly CO₂ offset','r-co2'],['Credits / month','r-credits'],['Carbon credits / year','r-ccc']].map(([l,id])=>(
              <div key={id} className="calc-row">
                <span className="calc-row-label">{l}</span>
                <span className="calc-row-val" id={id}>—</span>
              </div>
            ))}
            <div className="calc-highlight">
              <div className="calc-big-val" id="r-money">—</div>
              <div className="calc-big-label">Estimated annual carbon credit value</div>
            </div>
            <Link href="/login?tab=register" className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'14px',marginTop:'20px',borderRadius:'12px',fontSize:'15px'}}>Claim my earnings →</Link>
          </div>
        </div>
      </div></div>

      <div className="section">
        <span className="section-label">Redemption network</span>
        <h2 className="section-title">Spend your credits <em>everywhere</em></h2>
        <p className="section-sub">EnerX Credits work at fuel stations, grocery stores, utilities, and cafes across India.</p>
        <div className="partners-grid">
          {[['⛽','Indian Oil','100 EXC = ₹10 fuel'],['🛒','BigBasket','200 EXC = ₹20 grocery'],['💡','MSEDCL','500 EXC = ₹50 bill'],['☕','Café Coffee Day','50 EXC = Free coffee'],['🚌','BEST Bus','150 EXC = 5 rides'],['🏪','DMart','300 EXC = ₹30 voucher']].map(([ic,n,o])=>(
            <div key={n} className="partner-card">
              <div style={{fontSize:'26px',marginBottom:'8px'}}>{ic}</div>
              <div style={{fontSize:'12px',fontWeight:600,color:'var(--earth2)',marginBottom:'4px'}}>{n}</div>
              <div style={{fontSize:'11px',color:'var(--muted)',lineHeight:1.4}}>{o}</div>
            </div>
          ))}
        </div>
      </div>

      <div id="pricing" className="pricing-wrap"><div className="pricing-inner">
        <span className="section-label">Transparent pricing</span>
        <h2 className="section-title">Simple, <em>honest</em> plans</h2>
        <p className="section-sub">Households always free. Corporates pay for verified ESG data that saves far more in compliance costs.</p>
        <div className="pricing-grid">
          <div className="price-card">
            <div className="price-plan">Household</div>
            <div className="price-amount">Free</div>
            <div className="price-period">Forever. No catch.</div>
            <div className="price-divider"/>
            <ul className="price-features">
              {['1 solar installation','Real-time tracking','EnerX credits','Partner redemptions','Monthly reports'].map(f=>(
                <li key={f}><span className="chk" style={{background:'#EAF0EA',color:'#3D5C3D'}}>✓</span>{f}</li>
              ))}
            </ul>
            <Link href="/login?tab=register" className="btn btn-ghost" style={{width:'100%',justifyContent:'center',padding:'13px',marginTop:'28px'}}>Get started free</Link>
          </div>
          <div className="price-card featured">
            <div className="price-badge">Most popular</div>
            <div className="price-plan">Corporate Pilot</div>
            <div className="price-amount">₹75,000</div>
            <div className="price-period">90-day pilot · Fixed price</div>
            <div className="price-divider"/>
            <ul className="price-features">
              {['Up to 200 households','BRSR-formatted ESG report','Carbon offset certificates','Auditable data ledger','Priority support'].map(f=>(
                <li key={f}><span style={{color:'#D4860A',fontWeight:'bold',flexShrink:0}}>✓</span>&nbsp;{f}</li>
              ))}
            </ul>
            <a href="#contact" className="btn btn-sun" style={{width:'100%',justifyContent:'center',padding:'13px',marginTop:'28px'}}>Start pilot</a>
          </div>
          <div className="price-card">
            <div className="price-plan">Corporate Annual</div>
            <div className="price-amount">₹2,00,000</div>
            <div className="price-period">Per year · Unlimited scale</div>
            <div className="price-divider"/>
            <ul className="price-features">
              {['Unlimited households','Monthly ESG reports','SEBI BRSR compliance','Carbon credit sales','Dedicated manager'].map(f=>(
                <li key={f}><span className="chk" style={{background:'#FDF3E0',color:'#D4860A'}}>✓</span>{f}</li>
              ))}
            </ul>
            <a href="#contact" className="btn btn-ghost" style={{width:'100%',justifyContent:'center',padding:'13px',marginTop:'28px'}}>Contact sales</a>
          </div>
        </div>
      </div></div>

      <div id="contact" className="contact-bg"><div className="contact-inner">
        <span className="section-label">Get in touch</span>
        <h2 className="section-title">Ready to <em>start</em>?</h2>
        <div className="contact-grid">
          <div>
            <p style={{fontSize:'16px',color:'var(--muted)',lineHeight:1.8,marginBottom:'44px'}}>Whether you have solar panels at home, run a company with ESG obligations, or want to partner as a solar installer — we'd love to hear from you.</p>
            {[['Email','hello@energx.in'],['Phone','+91 98765 43210'],['Based in','Hyderabad, Telangana 🇮🇳'],['Response time','Within 24 hours']].map(([l,v])=>(
              <div key={l} style={{marginBottom:'26px'}}>
                <div style={{fontSize:'11px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',color:'var(--muted)',marginBottom:'4px'}}>{l}</div>
                <div style={{fontSize:'15px',color:'var(--earth)',fontWeight:500}}>{v}</div>
              </div>
            ))}
          </div>
          <div className="form-card">
            <form>
              <div className="form-row">
                <div className="form-grp" style={{marginBottom:0}}><label>Your name</label><input type="text" placeholder="Rajesh Kumar"/></div>
                <div className="form-grp" style={{marginBottom:0}}><label>Company</label><input type="text" placeholder="Tata Motors Ltd"/></div>
              </div>
              <div className="form-grp"><label>Email</label><input type="email" placeholder="you@company.com"/></div>
              <div className="form-grp"><label>I am a…</label>
                <select>
                  <option>Household with solar panels</option>
                  <option>Corporate (ESG / BRSR compliance)</option>
                  <option>Solar installer / distributor</option>
                  <option>Government body</option>
                  <option>Investor</option>
                </select>
              </div>
              <div className="form-grp"><label>Message</label><textarea rows={4} placeholder="Tell us about your solar setup or ESG needs…"/></div>
              <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'15px',fontSize:'15px',borderRadius:'12px'}}>Send message →</button>
            </form>
          </div>
        </div>
      </div></div>

      <footer><div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="logo"><div className="logo-mark">☀️</div><span className="logo-text" style={{color:'#F7F4EE'}}>EnerX</span></div>
            <div className="footer-tagline">Making India's rooftop solar work harder for everyone.</div>
          </div>
          <div className="footer-links">
            <div className="footer-col"><h4>Platform</h4><ul><li><a href="#how">How it works</a></li><li><a href="#who">For households</a></li><li><a href="#who">For corporates</a></li><li><a href="#pricing">Pricing</a></li></ul></div>
            <div className="footer-col"><h4>Company</h4><ul><li><a href="#">About EnerX</a></li><li><a href="#">Blog</a></li><li><a href="#">Careers</a></li><li><a href="#contact">Contact</a></li></ul></div>
            <div className="footer-col"><h4>Legal</h4><ul><li><a href="#">Privacy policy</a></li><li><a href="#">Terms of service</a></li><li><a href="#">Data security</a></li></ul></div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 EnerX. Built in India for India's green future.</span>
          <span>SEBI BRSR · BEE CCTS · PM Surya Ghar aligned</span>
        </div>
      </div></footer>

      <script dangerouslySetInnerHTML={{__html:`
        function calc(){
          var cap=parseFloat(document.getElementById('capacity').value);
          var sun=parseFloat(document.getElementById('sunhours').value);
          var eff=parseFloat(document.getElementById('efficiency').value)/100;
          document.getElementById('cap-val').textContent=cap+' kWp';
          document.getElementById('sun-val').textContent=sun+' hrs';
          document.getElementById('eff-val').textContent=Math.round(eff*100)+'%';
          var daily=cap*sun*eff;
          var monthly=daily*30;
          document.getElementById('r-daily').textContent=daily.toFixed(2)+' kWh';
          document.getElementById('r-monthly').textContent=monthly.toFixed(1)+' kWh';
          document.getElementById('r-co2').textContent=(monthly*0.82).toFixed(1)+' kg CO₂';
          document.getElementById('r-credits').textContent=Math.floor(monthly*10).toLocaleString()+' EXC';
          var ccc=daily*365*0.82/1000;
          document.getElementById('r-ccc').textContent=ccc.toFixed(3)+' CCC';
          document.getElementById('r-money').textContent='₹'+(ccc*900).toFixed(0);
        }
        ['capacity','sunhours','efficiency'].forEach(function(id){
          var el=document.getElementById(id);if(el)el.addEventListener('input',calc);
        });
        calc();
      `}}/>
    </>
  )
}
