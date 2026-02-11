"use client";

import { useEffect, useRef } from 'react';
import { Montserrat } from 'next/font/google';

// 1. CARGAMOS LA FUENTE DE MOBLICO
const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic']
});

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- MOTOR NEURONAL (SUTIL) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouse = { x: -1000, y: -1000 };
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    resize();

    const nodes = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((node, i) => {
        node.x += node.vx; node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath(); ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 112, 243, 0.15)'; ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.sqrt((node.x - other.x)**2 + (node.y - other.y)**2);
          if (dist < 150) {
            ctx.beginPath(); ctx.moveTo(node.x, node.y); ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 112, 243, ${0.1 - dist / 1500})`; ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  const s = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
    bentoCard: {
      backgroundColor: '#fff',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      border: '1px solid #f0f0f0',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'space-between' as const,
      position: 'relative' as const,
      overflow: 'hidden' as const
    },
    button: {
      backgroundColor: '#0070f3',
      color: '#fff',
      padding: '12px 28px',
      borderRadius: '100px',
      fontWeight: 700,
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.2s ease'
    }
  };

  return (
    <main className={montserrat.className} style={{ backgroundColor: '#fcfcfc', color: '#111', minHeight: '100vh' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }} />

      {/* 1. NAVBAR DINÁMICA */}
      <nav style={{ position: 'sticky', top: '20px', zIndex: 100, display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', padding: '10px 30px', borderRadius: '100px', border: '1px solid #eee', display: 'flex', gap: '40px', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <span style={{ fontWeight: 900, fontSize: '18px', fontStyle: 'italic', letterSpacing: '-1px' }}>GUESTCHECK</span>
          <div style={{ display: 'none', md: 'flex', gap: '25px', fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase' } as any}>
            <span style={{ color: '#0070f3', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', backgroundColor: '#0070f3', borderRadius: '50%' }}></span> SYSTEM_LIVE
            </span>
            <span>Solutions</span>
            <span>ERP_Sync</span>
          </div>
          <button style={s.button}>INITIALIZE DEMO</button>
        </div>
      </nav>

      <div style={s.container}>
        {/* 2. HERO SECTION REFORZADA */}
        <section style={{ textAlign: 'center', padding: '120px 0 80px', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#0070f3', letterSpacing: '3px', textTransform: 'uppercase' }}>// Next-Gen Wholesale Protocol</span>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, letterSpacing: '-4px', lineHeight: 0.9, margin: '20px 0' }}>
            WHOLESALE,<br/><span style={{ color: '#d1d1d1' }}>SIMPLIFIED.</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#666', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.5 }}>
            Deliver live inventory to your customers in as little as <strong>3 taps</strong>. No friction, no manuals, and <strong>no login required</strong>.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button style={s.button}>Start Free Uplink</button>
            <button style={{ ...s.button, backgroundColor: 'transparent', color: '#111', border: '1px solid #eee' }}>View Documentation</button>
          </div>
        </section>

        {/* SECCIÓN: PERFORMANCE & MOBILE UX (OVERLAP EFFECT) */}
<section id="performance" style={{ padding: '100px 0', backgroundColor: '#fcfcfc', position: 'relative', zIndex: 1 }}>
  <div style={s.container}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
      
      {/* LADO IZQUIERDO: MOBILE PREVIEW (CARRUSEL SIMULADO) */}
      <div style={{ position: 'relative', height: '500px' }}>
        {/* Card de Fondo: El "Mapa" */}
        <div style={{ position: 'absolute', top: '40px', left: '0', width: '280px', height: '400px', backgroundColor: '#eee', borderRadius: '30px', border: '8px solid #111', zIndex: 1, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
           <div style={{ padding: '20px', backgroundColor: '#fff', height: '100%' }}>
              <div style={{ width: '100%', height: '150px', backgroundColor: '#f0f0f0', borderRadius: '12px', marginBottom: '15px' }}></div>
              <div style={{ width: '80%', height: '10px', backgroundColor: '#eee', marginBottom: '10px' }}></div>
              <div style={{ width: '50%', height: '10px', backgroundColor: '#eee' }}></div>
           </div>
        </div>

        {/* Card Superpuesta: El "Checkout" (EL EFECTO OVERLAP) */}
        <div style={{ position: 'absolute', top: '150px', left: '120px', width: '280px', height: '400px', backgroundColor: '#0070f3', borderRadius: '30px', border: '8px solid #111', zIndex: 2, boxShadow: '0 30px 60px rgba(0,112,243,0.3)', color: '#fff', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
           <span style={{ fontSize: '10px', fontWeight: 900, opacity: 0.7 }}>PRO_CHECKOUT</span>
           <h4 style={{ fontSize: '24px', fontWeight: 900, margin: '15px 0' }}>3 Taps to Fulfillment.</h4>
           <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px' }}>
                 <span>Order Total:</span>
                 <span style={{ fontWeight: 900 }}>$1,240.00</span>
              </div>
              <button style={{ width: '100%', backgroundColor: '#fff', color: '#0070f3', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 800, fontSize: '12px', marginTop: '10px' }}>CONFIRM ORDER</button>
           </div>
        </div>
      </div>

      {/* LADO DERECHO: CONTENIDO ESTRATÉGICO */}
      <div style={{ paddingLeft: '40px' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, color: '#0070f3', letterSpacing: '3px' }}>// OPERATIONAL_EFFICIENCY</span>
        <h2 style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1, margin: '20px 0' }}>Built for the <br/>Speed of Wholesale.</h2>
        
        <div style={{ marginTop: '40px', gap: '30px' }}>
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ fontWeight: 900, fontSize: '16px', color: '#111' }}>◈ Intelligent SKU Prioritization</h4>
            <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>GuestCheck learns customer behavior, placing the items they need most at the top of the list. No more infinite scrolling.</p>
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ fontWeight: 900, fontSize: '16px', color: '#111' }}>◈ Frictionless Account Access</h4>
            <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Zero login protocol means your customers can check pending invoices and inventory levels in the field without remembering passwords.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '40px' }}>
             <div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#0070f3' }}>48s</div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#999', textTransform: 'uppercase' }}>Avg. Order Time</div>
             </div>
             <div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#0070f3' }}>100%</div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#999', textTransform: 'uppercase' }}>Data Accuracy</div>
             </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

{/* SECCIÓN: TECHNICAL ADVANTAGE */}
<section id="advantages" style={{ padding: '100px 0', backgroundColor: '#000', color: '#fff', position: 'relative', zIndex: 1 }}>
  <div style={s.container}>
    <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '80px', alignItems: 'start' }}>
      
      <div>
        <h2 style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1.1 }}>One System.<br/><span style={{ color: '#0070f3' }}>Infinite Sync.</span></h2>
        <p style={{ marginTop: '30px', color: '#888', lineHeight: 1.6 }}>
          GuestCheck offers competitive monthly subscriptions based on your business’ needs. From small distributors to global enterprises.
        </p>
        <button style={{ ...s.button, marginTop: '40px', backgroundColor: '#fff', color: '#000' }}>Review Pricing Plans</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {[
          { t: 'ERP Integration', d: 'Fully integrated with various ERPs (NetSuite, SAP).' },
          { t: 'Promotions', d: 'Create special promotions directly in the app.' },
          { t: 'Smart Suggestions', d: 'AI-driven order suggestions based on history.' },
          { t: 'Invoicing', d: 'View and pay outstanding invoices via mobile.' },
          { t: 'Sales Rep Portal', d: 'Reps can place orders for customers on the road.' },
          { t: 'Map View', d: 'Centralized map view of all customer locations.' }
        ].map((feat, i) => (
          <div key={i} style={{ borderLeft: '1px solid #333', paddingLeft: '20px' }}>
            <h5 style={{ fontWeight: 900, fontSize: '14px', color: '#0070f3', marginBottom: '5px' }}>{feat.t}</h5>
            <p style={{ fontSize: '12px', color: '#666' }}>{feat.d}</p>
          </div>
        ))}
      </div>

    </div>
  </div>
</section>

{/* SECCIÓN: CASE STUDY (CONTENIDA Y LEGIBLE) */}
<section id="case-study-ray" style={{ padding: '100px 0', backgroundColor: '#fff', position: 'relative', zIndex: 1 }}>
  <div style={s.container}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
      
      {/* IMAGEN: CONTENEDOR CON TAMAÑO CONTROLADO */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '540px', margin: '0 auto' }}>
        <div style={{ 
          position: 'relative', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
          border: '1px solid #eee' 
        }}>
          <img 
            src="/images/dashboard.jpg" 
            alt="GuestCheck Dashboard" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block',
              filter: 'contrast(1.05)' 
            }} 
          />
          {/* Badge flotante corregido */}
          <div style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '20px', 
            backgroundColor: '#0070f3', 
            color: '#fff', 
            padding: '8px 16px', 
            fontWeight: 900, 
            fontSize: '10px',
            borderRadius: '4px',
            letterSpacing: '1px'
          }}>
            SYSTEM_INTERFACE_V2
          </div>
        </div>
        
        {/* Decoración técnica (opcional, le da profundidad) */}
        <div style={{ 
          position: 'absolute', 
          bottom: '-20px', 
          right: '-20px', 
          width: '100px', 
          height: '100px', 
          backgroundColor: '#f0f7ff', 
          zIndex: -1, 
          borderRadius: '12px' 
        }}></div>
      </div>

      {/* TEXTO: COMPLEMENTO DE LA IMAGEN */}
      <div style={{ paddingLeft: '20px' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, color: '#0070f3', letterSpacing: '2px', textTransform: 'uppercase' }}>
          // Ray C. — Success Story
        </span>
        <h2 style={{ fontSize: '42px', fontWeight: 900, margin: '20px 0', lineHeight: 1.1 }}>
          Wait times reduced <br/><span style={{ color: '#0070f3' }}>by 65%.</span>
        </h2>
        <p style={{ color: '#666', fontSize: '16px', lineHeight: 1.6 }}>
          "This ordering tool has significantly reduced the wait times at my busy counter. The promotions feature and prioritized item listing have also increased my sales."
        </p>
        <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <span style={{ fontWeight: 900, fontSize: '13px', display: 'block' }}>GPM POOL & SPA</span>
          <span style={{ fontSize: '12px', color: '#999' }}>Operational Efficiency Metrics</span>
        </div>
      </div>

    </div>
  </div>
</section>

{/* SECCIÓN: CASE STUDY (INVERTIDA - IMAGEN A LA DERECHA) */}
<section id="case-study-ray" style={{ padding: '100px 0', backgroundColor: '#fff', position: 'relative', zIndex: 1 }}>
  <div style={s.container}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
      
      {/* TEXTO A LA IZQUIERDA */}
      <div style={{ paddingRight: '20px' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, color: '#0070f3', letterSpacing: '2px', textTransform: 'uppercase' }}>
          // Success Story: GPM Pool & Spa
        </span>
        <h2 style={{ fontSize: '42px', fontWeight: 900, margin: '20px 0', lineHeight: 1.1 }}>
          "Wait times reduced <br/><span style={{ color: '#0070f3' }}>significantly."</span>
        </h2>
        <p style={{ color: '#555', fontSize: '16px', lineHeight: 1.6 }}>
          "This ordering tool has significantly reduced the wait times at my busy counter. The promotions feature and prioritized item listing have also increased my sales."
        </p>
        <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <span style={{ fontWeight: 900, fontSize: '13px', display: 'block' }}>Ray C.</span>
          <span style={{ fontSize: '12px', color: '#999' }}>Operations Manager</span>
        </div>
      </div>

      {/* IMAGEN A LA DERECHA (TAMAÑO CONTROLADO) */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '540px', margin: '0 auto' }}>
        <div style={{ 
          position: 'relative', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
          border: '1px solid #f0f0f0' 
        }}>
          <img 
            src="/images/dashboard.jpg" 
            alt="GuestCheck Dashboard" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block'
            }} 
          />
          <div style={{ 
            position: 'absolute', 
            bottom: '20px', 
            right: '20px', 
            backgroundColor: '#0070f3', 
            color: '#fff', 
            padding: '8px 16px', 
            fontWeight: 900, 
            fontSize: '10px',
            borderRadius: '4px'
          }}>
            OPERATIONAL_VIEW_v2
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

{/* SECCIÓN: THE LOGISTICS ECOSYSTEM */}
<section id="ecosystem" style={{ padding: '100px 0', backgroundColor: '#fff', position: 'relative', zIndex: 1 }}>
  <div style={s.container}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
      <div style={{ maxWidth: '600px' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#0070f3', letterSpacing: '2px' }}>// MARKET_VERTICALS</span>
        <h2 style={{ fontSize: '48px', fontWeight: 900, marginTop: '10px', lineHeight: 1 }}>A Protocol for Every Industry.</h2>
      </div>
      <p style={{ color: '#666', fontSize: '14px', maxWidth: '300px', paddingBottom: '10px' }}>
        GuestCheck scales across complex distribution networks, ensuring data integrity from warehouse to field.
      </p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
      {[
        { title: 'Janitorial', desc: 'Sanitation & Chemical supply chain sync.' },
        { title: 'Food Service', desc: 'Real-time perishable inventory tracking.' },
        { title: 'Electrical', desc: 'Bulk SKU management and project orders.' },
        { title: 'HVAC', desc: 'Technical parts catalog with live pricing.' }
      ].map((item, i) => (
        <div key={i} style={{ ...s.bentoCard, padding: '30px', transition: 'transform 0.2s ease' }}>
          <div style={{ height: '40px', width: '40px', backgroundColor: '#f0f7ff', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', color: '#0070f3', fontWeight: 900 }}>
            0{i + 1}
          </div>
          <h4 style={{ fontWeight: 900, fontSize: '18px', marginBottom: '10px' }}>{item.title}</h4>
          <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* 3. BENTO GRID (LOOK ENDEAVOR) */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: 'minmax(200px, auto)', gap: '20px', paddingBottom: '100px', position: 'relative', zIndex: 1 }}>
          
          {/* Card 1: Main Feature */}
          <div style={{ ...s.bentoCard, gridColumn: 'span 8', gridRow: 'span 2', background: 'linear-gradient(135deg, #fff 0%, #f4f9ff 100%)' }}>
            <div>
              <h3 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '15px' }}>LIVE_INVENTORY_SYNC</h3>
              <p style={{ color: '#666', maxWidth: '450px' }}>Direct neural bridge to your ERP. Pricing, stock levels, and customer-specific catalogs updated in real-time.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
               <div style={{ display: 'flex', gap: '4px' }}>
                 {[...Array(15)].map((_, i) => (
                   <div key={i} style={{ height: `${20 + Math.random() * 40}px`, width: '6px', backgroundColor: '#0070f3', borderRadius: '2px', opacity: 0.2 + (i/15) }}></div>
                 ))}
               </div>
               <span style={{ fontSize: '12px', fontWeight: 800, color: '#0070f3' }}>UPLINK_STATUS: OPTIMAL</span>
            </div>
          </div>

          {/* Card 2: ERP Sync */}
          <div style={{ ...s.bentoCard, gridColumn: 'span 4', backgroundColor: '#000', color: '#fff', border: 'none' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800 }}>NATIVE_ERP</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px', fontWeight: 700, color: '#0070f3', marginTop: '20px' }}>
              <span>» NETSUITE</span>
              <span>» SAP BUSINESS ONE</span>
              <span>» MS DYNAMICS</span>
              <span>» INFOR / EPICOR</span>
            </div>
            <div style={{ fontSize: '40px', marginTop: '20px', opacity: 0.5 }}>⚙️</div>
          </div>

          {/* Card 3: Success Story */}
          <div style={{ ...s.bentoCard, gridColumn: 'span 4', background: '#0070f3', color: '#fff', border: 'none' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, opacity: 0.7 }}>CASE_STUDY // GPM_POOL</span>
            <p style={{ fontSize: '18px', fontWeight: 600, fontStyle: 'italic', margin: '20px 0' }}>"40 locations deployed in 72 hours. We stopped manual entry entirely."</p>
            <div style={{ fontSize: '32px', fontWeight: 900 }}>72hs</div>
          </div>

          {/* Card 4: Metrics */}
          <div style={{ ...s.bentoCard, gridColumn: 'span 5' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800 }}>FRICTION_REDUCTION</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '20px 0' }}>
              <span style={{ fontSize: '56px', fontWeight: 900, color: '#0070f3' }}>-92%</span>
            </div>
            <p style={{ fontSize: '12px', color: '#999' }}>Average reduction in manual order processing time.</p>
          </div>

          {/* Card 5: Geolocation */}
          <div style={{ ...s.bentoCard, gridColumn: 'span 3', background: '#f8f8f8' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800 }}>GEO_AUTO</h3>
            <p style={{ fontSize: '13px', color: '#666' }}>Automatic branch detection via GPS.</p>
          </div>
        </section>
      </div>

      <section id="testimonials" style={{ padding: '100px 0', backgroundColor: '#fff', position: 'relative', zIndex: 1 }}>
  <div style={s.container}>
    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0070f3', letterSpacing: '2px' }}>// FIELD TESTIMONIALS</span>
      <h2 style={{ fontSize: '42px', fontWeight: 900, marginTop: '10px' }}>Trusted by the Experts.</h2>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
      {/* Larkin H. */}
      <div style={{ ...s.bentoCard, height: '100%' }}>
        <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6', fontStyle: 'italic' }}>
          "GuestCheck is an amazing tool for an outside sales rep. The geolocation function searches my customers before I even pull out my phone. It lets me focus on the customer’s needs."
        </p>
        <div style={{ marginTop: '30px' }}>
          <div style={{ fontWeight: 900, fontSize: '14px' }}>Larkin H.</div>
          <div style={{ fontSize: '11px', color: '#999' }}>Sales Rep, Ancient Winds Trading Co.</div>
        </div>
      </div>

      {/* Val M. */}
      <div style={{ ...s.bentoCard, height: '100%', borderTop: '4px solid #0070f3' }}>
        <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6', fontStyle: 'italic' }}>
          "I used to text my sales rep and it led to mistakes. With GuestCheck, I can have my branch managers replenish themselves in seconds, while I monitor the invoices."
        </p>
        <div style={{ marginTop: '30px' }}>
          <div style={{ fontWeight: 900, fontSize: '14px' }}>Val M.</div>
          <div style={{ fontSize: '11px', color: '#999' }}>Owner, Boost Bowls Franchise</div>
        </div>
      </div>

      {/* Ray C. */}
      <div style={{ ...s.bentoCard, height: '100%' }}>
        <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.6', fontStyle: 'italic' }}>
          "This tool significantly reduced the wait times at my busy counter. My contractors love being able to conveniently shop and reference invoices from one place on their phone."
        </p>
        <div style={{ marginTop: '30px' }}>
          <div style={{ fontWeight: 900, fontSize: '14px' }}>Ray C.</div>
          <div style={{ fontSize: '11px', color: '#999' }}>Ops Manager, GPM Pool & Spa</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* SECCIÓN: GUESTCHECK ERP UPLINK PROTOCOL */}
<section id="erp-uplink" style={{ padding: '80px 0', backgroundColor: '#fff', position: 'relative', zIndex: 1 }}>
  <div style={s.container}>
    <div style={{ ...s.bentoCard, gridColumn: 'span 12', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center', background: 'linear-gradient(135deg, #fff 0%, #f9f9f9 100%)', border: '1px solid #eee' }}>
      
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <span style={{ padding: '4px 10px', backgroundColor: '#111', color: '#fff', borderRadius: '4px', fontSize: '10px', fontWeight: 900 }}>INFRASTRUCTURE_CORE</span>
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#0070f3', letterSpacing: '2px' }}>// ERP_NATIVE_INTEGRATION</span>
        </div>
        
        <h2 style={{ fontSize: '42px', fontWeight: 900, lineHeight: 1, marginBottom: '20px' }}>
          Real-Time <br/><span style={{ color: '#0070f3' }}>Inventory Uplink</span>
        </h2>
        
        <p style={{ color: '#555', fontSize: '16px', lineHeight: 1.6, marginBottom: '25px' }}>
          GuestCheck isn't a standalone app—it's a **live extension of your warehouse**. Our SSR architecture ensures that every tap on the mobile screen reflects your current ERP status.
        </p>

        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {[
            'Bi-directional SAP/NetSuite Sync',
            'Customer-Specific Pricing Logic',
            'Automated Invoice Generation',
            'Live Warehouse Stock Levels'
          ].map((item, i) => (
            <li key={i} style={{ fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#0070f3' }}>◈</span> {item}
            </li>
          ))}
        </ul>
      </div>

      {/* TERMINAL TÉCNICA: EL "CEREBRO" DE ALFREDO */}
      <div style={{ position: 'relative', backgroundColor: '#1a1a1a', borderRadius: '16px', padding: '30px', color: '#33ff33', fontFamily: 'monospace', fontSize: '11px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid #333' }}>
        <div style={{ borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', color: '#666' }}>
          <span>GUESTCHECK_CORE_v2.0.4</span>
          <span style={{ color: '#0070f3' }}>UPLINK: STABLE</span>
        </div>
        <div style={{ lineHeight: '1.6' }}>
          <span style={{ color: '#888' }}>{`> Connecting to ERP_Cluster_Alpha...`}</span><br/>
          <span style={{ color: '#fff' }}>{`[AUTH] Credentials Validated: SAP_S4HANA`}</span><br/>
          {`[SYNC] Fetching Customer_ID: #GPM_4402...`}<br/>
          {`[SYNC] Price_List: "Wholesale_Janitorial_2026"`}<br/>
          {`[DATA] Stock_Sync: 1,240 units found.`}<br/>
          <span style={{ color: '#0070f3' }}>{`[PUSH] Mobile_UI updated in 42ms.`}</span><br/>
          <span style={{ color: '#888' }}>{`> Waiting for user order...`}</span>
        </div>
        
        <div style={{ marginTop: '20px', height: '2px', width: '100%', backgroundColor: '#222' }}>
          <div style={{ height: '100%', width: '100%', backgroundColor: '#0070f3', boxShadow: '0 0 10px #0070f3' }}></div>
        </div>
      </div>

    </div>
  </div>
</section>

<section id="book-demo" style={{ padding: '100px 0', backgroundColor: '#fcfcfc', borderTop: '1px solid #eee', position: 'relative', zIndex: 1 }}>
  <div style={{ ...s.container, maxWidth: '800px' }}>
    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
      <h2 style={{ fontSize: '48px', fontWeight: 900 }}>Create a custom plan.</h2>
      <p style={{ color: '#666', marginTop: '10px' }}>Book a demo with our team to see how GuestCheck can simplify wholesale ordering for you.</p>
    </div>

    <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <input type="text" placeholder="Full Name *" style={{ padding: '18px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px' }} required />
      <input type="email" placeholder="Email *" style={{ padding: '18px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px' }} required />
      <input type="text" placeholder="Phone" style={{ padding: '18px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px' }} />
      <input type="text" placeholder="Company Name" style={{ padding: '18px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px' }} />
      <textarea placeholder="How can GuestCheck help your business? *" style={{ gridColumn: 'span 2', padding: '18px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px', minHeight: '120px' }} required></textarea>
      
      <button style={{ ...s.button, gridColumn: 'span 2', padding: '20px', fontSize: '16px', letterSpacing: '1px' }}>
        BOOK A DEMO NOW
      </button>
    </form>
  </div>
</section>

      {/* 9. FOOTER: THE ABBEY PROTOCOL CLOSURE */}
<footer style={{ backgroundColor: '#000', color: '#fff', padding: '80px 0 40px', position: 'relative', zIndex: 1 }}>
  <div style={s.container}>
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '80px', borderBottom: '1px solid #222', paddingBottom: '60px' }}>
      
      {/* BRAND & MISSION */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#0070f3' }}></div>
          <span style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-1px' }}>GUESTCHECK <span style={{ fontWeight: 300, color: '#666' }}>By AbbeyGate</span></span>
        </div>
        <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', maxWidth: '300px' }}>
          Next-generation wholesale infrastructure. Engineering zero-friction logistics for modern distributors.
        </p>
      </div>

      {/* QUICK LINKS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px', fontWeight: 700 }}>
          <span style={{ color: '#333', fontSize: '10px' }}>PLATFORM</span>
          <span>Features</span>
          <span>Success Stories</span>
          <span>ERP Sync</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px', fontWeight: 700 }}>
          <span style={{ color: '#333', fontSize: '10px' }}>RESOURCES</span>
          <span>Documentation</span>
          <span>API Uplink</span>
          <span>Support</span>
        </div>
      </div>

      {/* CONTACT & STATUS */}
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>Contact Us: info@abbeygate.ai</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', color: '#0070f3', fontSize: '11px', fontWeight: 900 }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: '#0070f3', borderRadius: '50%', animatePulse: 'true' } as any}></span>
          ALL_SYSTEMS_OPERATIONAL
        </div>
      </div>
    </div>

    {/* LEGAL BAR */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', fontSize: '10px', fontWeight: 600, color: '#444', textTransform: 'uppercase', letterSpacing: '1px' }}>
      <span>© 2026 GuestCheck. All Rights Reserved.</span>
      <div style={{ display: 'flex', gap: '30px' }}>
        <span>Privacy Protocol</span>
        <span>Terms of Service</span>
        <span>AES-256 Encryption</span>
      </div>
    </div>
  </div>
</footer>
    </main>
  );
}