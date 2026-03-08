"use client";

import { useEffect, useRef } from 'react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic']
});

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();
    const nodes = Array.from({ length: 40 }, () => ({
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
        ctx.fillStyle = 'rgba(0, 112, 243, 0.1)'; ctx.fill();
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.sqrt((node.x - other.x)**2 + (node.y - other.y)**2);
          if (dist < 150) {
            ctx.beginPath(); ctx.moveTo(node.x, node.y); ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 112, 243, ${0.05 - dist / 3000})`; ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  const s = {
    container: { maxWidth: '1350px', margin: '0 auto', padding: '0 40px' },
    button: {
      backgroundColor: '#0070f3',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: '4px', // Canals usa bordes más rectos
      fontWeight: 900,
      border: 'none',
      cursor: 'pointer',
      fontSize: '12px',
      textTransform: 'uppercase' as const,
      letterSpacing: '1px'
    },
    bentoCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '40px',
      border: '1px solid #eee',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'space-between' as const,
      overflow: 'hidden' as const
    }
  };

  return (
    <main className={montserrat.className} style={{ backgroundColor: '#fff', color: '#000', minHeight: '100vh' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }} />

      {/* NAVBAR AL ESTILO CANALS */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, backgroundColor: 'rgba(255,255,255,0.9)', borderBottom: '1px solid #eee', backdropFilter: 'blur(10px)' }}>
        <div style={{ ...s.container, display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
          <span style={{ fontWeight: 950, fontSize: '22px', fontStyle: 'italic', letterSpacing: '-1.5px' }}>GUESTCHECK</span>
          <div style={{ display: 'flex', gap: '30px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
            <span style={{ color: '#0070f3' }}>● SYSTEM_LIVE</span>
            <span style={{ color: '#666' }}>Solutions</span>
            <span style={{ color: '#666' }}>Infrastructure</span>
          </div>
          <button style={s.button}>Initialize Uplink</button>
        </div>
      </nav>

      <div style={{ ...s.container, paddingTop: '150px' }}>
      {/* SECTION 1: HERO CENTRADO + AGENTE ASIMÉTRICO */}
<section style={{ 
  padding: '120px 40px 100px 40px', 
  maxWidth: '1600px', 
  margin: '0 auto' 
}}>
  
  {/* 1. TITULO CENTRADO - Para que no se pise con nada */}
  <div style={{ textAlign: 'center', marginBottom: '80px' }}>
    <h1 style={{ 
      fontSize: 'clamp(4rem, 12vw, 9rem)', 
      fontWeight: 900, 
      letterSpacing: '-0.06em', 
      lineHeight: 0.8, 
      margin: 0,
      textTransform: 'uppercase',
      color: '#000'
    }}>
      AI for<br/>
      <span style={{ color: '#0052FF' }}>Distribution</span>
    </h1>
  </div>

  {/* 2. CONTENIDO INFERIOR - Texto Izquierda | Agente Derecha */}
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: '1fr 1.2fr', 
    gap: '60px', 
    alignItems: 'start' 
  }}>
    
    {/* COLUMNA IZQUIERDA (Minimal) */}
    <div style={{ paddingTop: '40px' }}>
      <p style={{ 
        fontSize: '22px', 
        color: '#444', 
        lineHeight: 1.4, 
        fontWeight: 500,
        maxWidth: '450px',
        marginBottom: '40px'
      }}>
        See what's possible when you automate the busywork in sales, accounting, purchasing, receiving & more.
      </p>
      <button style={{ 
        backgroundColor: '#0052FF', 
        color: '#fff', 
        padding: '18px 45px', 
        borderRadius: '6px', 
        fontWeight: 800, 
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(0,82,255,0.2)'
      }}>
        Get a Demo
      </button>
    </div>

    {/* COLUMNA DERECHA (El Agente) */}
    <div style={{ position: 'relative' }}>
      {/* El bloque oscuro de fondo estilo Canals */}
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        right: '-20px', 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#0A192F', 
        zIndex: -1,
        borderRadius: '12px'
      }}></div>

      {/* Imagen Principal */}
      <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
        <img src="/images/aiplatform.jpg" style={{ width: '100%', display: 'block' }} alt="Platform" />
      </div>

      {/* James Anderson Bubble */}
      <div style={{ 
        position: 'absolute', 
        top: '-40px', 
        left: '-60px', 
        backgroundColor: '#fff', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        border: '1px solid #eee',
        maxWidth: '280px'
      }}>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: 800 }}>James Anderson</p>
        <p style={{ margin: '5px 0', fontSize: '12px', color: '#0052FF', fontWeight: 700 }}>Hello!</p>
        <p style={{ margin: 0, fontSize: '11px', color: '#666', lineHeight: 1.4 }}>
          I need pricing for 400' - 1 1/2" PVC conduit and 16 - 1 1/2" PVC 90.
        </p>
      </div>

      {/* Widget de datos abajo */}
      <div style={{ 
        position: 'absolute', 
        bottom: '-20px', 
        right: '20px', 
        width: '70%', 
        backgroundColor: '#fff', 
        padding: '10px', 
        borderRadius: '8px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }}>
        <img src="/images/erpsyncdata.png" style={{ width: '100%' }} alt="Data Sync" />
      </div>
    </div>

  </div>
</section>

{/* 4. SECCIÓN COMBINADA: CLIENT TICKER & CUSTOM PLAN */}
<section id="distribution-ecosystem" style={{ 
  padding: '80px 0 100px', 
  borderTop: '1px solid #eee', 
  backgroundColor: '#fff',
  position: 'relative',
  zIndex: 1
}}>
  <div style={s.container}>
    
    {/* A. CARROUSEL DE MARCAS (Nuestras referencias + Canals) */}
    <div style={{ marginBottom: '100px', textAlign: 'center' }}>
      <p style={{ fontSize: '12px', fontWeight: 800, color: '#999', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '30px' }}>
        TRUSTED BY INDUSTRY LEADERS // DISTRIBUTORS & CONTRACTORS
      </p>
      <div style={{ 
        padding: '30px 0', 
        overflow: 'hidden', 
        position: 'relative', 
        borderTop: '1px solid #f0f0f0', 
        borderBottom: '1px solid #f0f0f0',
        backgroundColor: '#fafafa' 
      }}>
        {/* Ticker Container - Animación Infinita (40s) */}
        <div style={{
          display: 'flex',
          gap: '70px',
          alignItems: 'center',
          animation: 'scrollTicker 40s linear infinite',
          width: 'max-content'
        }}>
          {/* Muestra 5 marcas a la vez, repetidas 3 veces para scroll infinito */}
          {[
            "KIRBY RISK", "THE COLLINS COMPANIES", "TURTLE", "CDS", "STANDARD ELECTRIC",
            "KIRBY RISK", "THE COLLINS COMPANIES", "TURTLE", "CDS", "STANDARD ELECTRIC",
            "KIRBY RISK", "THE COLLINS COMPANIES", "TURTLE", "CDS", "STANDARD ELECTRIC"
          ].map((brand, i) => (
            <span key={i} style={{ 
              fontSize: '20px', 
              fontWeight: 900, 
              color: '#bbb', // Color sutil estilo Canals
              letterSpacing: '1px',
              whiteSpace: 'nowrap'
            }}>
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* B. SECCIÓN CUSTOM PLAN (Tres Columnas Técnicas) */}
    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
      <p style={{ fontSize: '11px', fontWeight: 900, color: '#0052FF', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
        // DEPLOYMENT_FLEXIBILITY
      </p>
      <h2 style={{ fontSize: '56px', fontWeight: 900, lineHeight: 1, margin: 0, letterSpacing: '-2px' }}>
        Create a Custom Plan.<br/>
        <span style={{ color: '#0052FF' }}>Infinite Sync.</span>
      </h2>
      <p style={{ fontSize: '16px', color: '#666', marginTop: '20px', maxWidth: '600px', margin: '20px auto 0', lineHeight: 1.6 }}>
        GuestCheck offers competitive monthly subscriptions based on your business’ needs. From small distributors to global enterprises.
      </p>
    </div>

    {/* Grilla de 3 Columnas Técnicas */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
      {[
        { 
          title: "ERP & INVENTORY", 
          desc: "Live, bi-directional connection. Real-time stock & pricing data.",
          features: [
            "Fully integrated with various ERPs (NetSuite, SAP Business One, MS Dynamics).",
            "Bi-directional data sync protocol.",
            "Real-time warehouse stock level updates.",
            "Customer-specific pricing logic synchronization."
          ]
        },
        { 
          title: "SALES & COMMERCE", 
          desc: "Mobilize your team. Empower your customers with friction-zero tools.",
          features: [
            "Convenient mobile-friendly order app (Contractor Portal).",
            "No login required (Token Access).",
            "Sales Rep Portal for outside sales efficiency.",
            "Digital invoicing (view & payoutstanding)."
          ]
        },
        { 
          title: "LOGISTICS & SUGGESTIONS", 
          desc: "AI-driven efficiency from procurement to field fulfillment.",
          features: [
            "AI-powered Smart Order suggestions based on history.",
            "Centralized customer & map view data.",
            "Create special promotions directly in-app.",
            "Custom branch map views & geo-fencing."
          ]
        }
      ].map((col, i) => (
        <div key={i} style={{ 
          backgroundColor: '#fff', 
          border: '1px solid #f0f0f0', 
          borderRadius: '8px', 
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.2s ease'
        }}>
          {/* Ícono Técnico Sutil */}
          <div style={{ height: '3px', width: '50px', backgroundColor: '#0052FF', marginBottom: '25px' }}></div>
          
          <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#111', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
            {col.title}
          </h4>
          <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.5, marginBottom: '30px', flexGrow: 1 }}>
            {col.desc}
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {col.features.map((feat, j) => (
              <li key={j} style={{ fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#0052FF' }}>◈</span> {feat}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* BOTÓN DE ACCIÓN FINAL */}
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <button style={{ 
        backgroundColor: '#000', // Botón Negro estilo Canals Secundario
        color: '#fff', 
        padding: '18px 50px', 
        borderRadius: '6px', 
        fontWeight: 800, 
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
      }}>
        Book a demo with our team to see how GuestCheck can simplify wholesale ordering for you.
      </button>
    </div>

  </div>

  {/* FOOTER BLACK // GUESTCHECK & ABBEYGATE SYNC */}
  <footer style={{ backgroundColor: '#000', color: '#fff', padding: '100px 0 60px', marginTop: '100px' }}>
    <div style={{ maxWidth: '1350px', margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.2fr', gap: '80px' }}>
      
      {/* BRAND & LOGO */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#0052FF' }}></div>
          <span style={{ fontWeight: 950, fontSize: '22px', letterSpacing: '-1.5px', fontStyle: 'italic' }}>GUESTCHECK <span style={{ fontWeight: 400, color: '#666' }}>By AbbeyGate</span></span>
        </div>
        <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, maxWidth: '300px' }}>
          Next-generation wholesale infrastructure. Engineering zero-friction logistics for modern distributors.
        </p>
      </div>

      {/* QUICK LINKS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px', fontWeight: 700 }}>
          <span style={{ color: '#555', fontSize: '10px' }}>PLATFORM</span>
          <span>Features</span>
          <span>Integrations (ERP)</span>
          <span>Pricing</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px', fontWeight: 700 }}>
          <span style={{ color: '#555', fontSize: '10px' }}>RESOURCES</span>
          <span>API Documentation</span>
          <span>Customer Stories</span>
          <span>Support</span>
        </div>
      </div>

      {/* CONTACT & STATUS */}
      <div style={{ textAlign: 'right' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', color: '#0052FF', fontSize: '11px', fontWeight: 900 }}>
          <span style={{ width: '6px', height: '6px', backgroundColor: '#0052FF', borderRadius: '50%' }}></span>
          UPLINK STATUS: OPERATIONAL
        </div>
        <div style={{ fontSize: '13px', color: '#fff', marginTop: '10px', fontWeight: 700 }}>info@abbeygate.ai</div>
        <p style={{ fontSize: '11px', color: '#555', marginTop: '40px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          © 2026 GuestCheck. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>

  {/* ESTILOS CSS PARA ANIMACIÓN TICKER */}
  <style jsx global>{`
    @keyframes scrollTicker {
      0% { transform: translateX(0); }
      100% { transform: translateX(-33.33%); } // Scroll de 1/3 de la lista total (los originales)
    }
  `}</style>
</section>
        
        {/* SECTION REFORZADA CON TU IMAGEN-DEJAMOS PARA 4TASECCION */}
        <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'end', marginBottom: '80px', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ display: 'inline-block', padding: '4px 8px', backgroundColor: '#f0f7ff', borderRadius: '4px', marginBottom: '20px', fontSize: '10px', fontWeight: 900, color: '#0070f3' }}>
              // NEXT-GEN WHOLESALE PROTOCOL V2.0
            </div>
            <h1 style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', fontWeight: 950, letterSpacing: '-0.06em', lineHeight: 0.8, margin: 0, textTransform: 'uppercase' }}>
              Wholesale,<br/><span style={{ color: '#0070f3' }}>Simplified.</span>
            </h1>
          </div>
          <div style={{ height: '380px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' }}>
            <img src="/images/aiplatform.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
          </div>
        </section>

        {/* SUB-HERO INFO */}
        <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', borderTop: '1px solid #eee', paddingTop: '40px', marginBottom: '100px', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '26px', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-1px', maxWidth: '600px' }}>
            Deliver live inventory to your customers in as little as <strong>3 taps</strong>. No friction, no manuals, and no login required.
          </p>
          <div>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.5, marginBottom: '25px' }}>
              Connecting SAP and NetSuite directly to the field. Engineering the future of logistics with bi-directional synchronization.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button style={s.button}>Start Free Uplink</button>
              <button style={{ ...s.button, backgroundColor: '#000' }}>View Documentation</button>
            </div>
          </div>
        </section>

        {/* PERFORMANCE SECTION CON OVERLAP REAL */}
        <section style={{ padding: '100px 0', borderTop: '1px solid #eee', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '100px', alignItems: 'center' }}>
            <div style={{ position: 'relative', height: '550px' }}>
              {/* Imagen Principal */}
              <img src="/images/mobile-experience.jpg" style={{ width: '85%', height: '450px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
              {/* Imagen Overlap */}
              <div style={{ position: 'absolute', bottom: '0', right: '0', width: '60%', height: '300px', border: '10px solid #fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}>
                <img src="/images/dashboard.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#0070f3', color: '#fff', padding: '4px 8px', fontSize: '9px', fontWeight: 900, borderRadius: '4px' }}>LIVE_SYNC</div>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#0070f3', letterSpacing: '2px' }}>// OPERATIONAL_SPEED</span>
              <h2 style={{ fontSize: '64px', fontWeight: 950, lineHeight: 0.9, letterSpacing: '-0.04em', margin: '20px 0', textTransform: 'uppercase' }}>
                Built for the Speed of Wholesale.
              </h2>
              <div style={{ marginTop: '40px', display: 'grid', gap: '30px' }}>
                <div>
                  <h4 style={{ fontWeight: 900, fontSize: '15px', color: '#111', marginBottom: '10px' }}>◈ Intelligent SKU Prioritization</h4>
                  <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.4 }}>GuestCheck learns customer behavior, placing high-velocity items at the top. Zero scrolling, maximum efficiency.</p>
                </div>
                <div>
                  <h4 style={{ fontWeight: 900, fontSize: '15px', color: '#111', marginBottom: '10px' }}>◈ Zero Login Protocol</h4>
                  <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.4 }}>Instant access via secure tokens. Let customers check stock and pay invoices in the field without friction.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENTO GRID TÉCNICO */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', padding: '100px 0', position: 'relative', zIndex: 1 }}>
          <div style={{ ...s.bentoCard, gridColumn: 'span 8', background: 'linear-gradient(135deg, #fff 0%, #f4f9ff 100%)' }}>
            <h3 style={{ fontSize: '32px', fontWeight: 900 }}>LIVE_INVENTORY_SYNC</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <p style={{ color: '#666', maxWidth: '400px', fontSize: '14px' }}>Direct neural bridge to your ERP. Pricing, stock levels, and catalogs updated in real-time.</p>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#0070f3' }}>UPLINK: OPTIMAL</span>
            </div>
          </div>
          <div style={{ ...s.bentoCard, gridColumn: 'span 4', backgroundColor: '#000', color: '#fff', border: 'none' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800 }}>NATIVE_ERP</h3>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0070f3', marginTop: '10px' }}>
              » NETSUITE<br/>» SAP BUSINESS ONE<br/>» MS DYNAMICS
            </div>
          </div>
        </section>

      </div>
      
      {/* FOOTER BLACK */}
      <footer style={{ backgroundColor: '#000', color: '#fff', padding: '80px 0', marginTop: '100px' }}>
        <div style={s.container}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '100px' }}>
            <div>
              <span style={{ fontWeight: 950, fontSize: '20px', fontStyle: 'italic' }}>GUESTCHECK</span>
              <p style={{ color: '#555', fontSize: '12px', marginTop: '20px' }}>By AbbeyGate. Engineering zero-friction logistics.</p>
            </div>
            <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ color: '#333', fontWeight: 900 }}>RESOURCES</span>
              <span>API Documentation</span>
              <span>Success Stories</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#0070f3', fontSize: '11px', fontWeight: 900 }}>ALL_SYSTEMS_OPERATIONAL</div>
              <div style={{ fontSize: '12px', color: '#fff', marginTop: '10px' }}>info@abbeygate.ai</div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}