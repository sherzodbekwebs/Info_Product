import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
// Yangi bo'limlar uchun qo'shimcha ikonkalar qo'shildi
import { 
  ArrowLeft, Settings, Zap, Fuel, Gauge, Box, Weight, 
  MapPin, CreditCard, Activity, TrendingDown, AlertTriangle, FileText 
} from 'lucide-react';
import './App.css';
import { TRUCKS_DATA } from './data.jsx';


// --- 1-SAHIFA: KATALOG (O'ZGARISHSIZ QOLDI) ---
const CatalogPage = () => {
  const [activeCat, setActiveCat] = useState("All");
  const navigate = useNavigate();

  const filteredTrucks = activeCat === "All"
    ? TRUCKS_DATA
    : TRUCKS_DATA.filter(t => t.category === activeCat);

  return (
    <div className="app-container">
      <div className="truck-grid">
        {filteredTrucks.map(truck => (
          <div className="truck-card" key={truck.id} onClick={() => navigate(`/truck/${truck.id}`)} >
            <img src={truck.img} alt="img" />
            <div className="card-info">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 2-SAHIFA: TRUCK DETAILS (FAQAT SHU YERGA O'ZGARISH KIRITILDI) ---
const TruckDetails = () => {
  const { id } = useParams();
  const truck = TRUCKS_DATA.find(t => t.id === id);

  if (!truck) return <div className="app-container">Техника не найдена!</div>;

  return (
    <div className="app-containerr">
      {/* <Link to="/" className="back-btn"><ArrowLeft size={18} /> Назад в каталог</Link> */}
      <div className="sticky-nav">
        <Link to="/" className="back-btn">
          <ArrowLeft size={18} /> Назад в каталог
        </Link>
      </div>

      <div className="details-page">
        <div className="details-content">
          <h1 style={{ fontSize: '32px', margin: '0' }}>{truck.name}</h1>
          <div className="card-price" style={{ fontSize: '28px', margin: '15px 0' }}>{truck.price}</div>

          {/* Standart specs grid */}
          <div className="spec-grid">
            <div className="spec-card">
              <Settings size={20} color="#64748b" />
              <b>Двигатель</b> <span>{truck.engine}</span>
            </div>
            <div className="spec-card">
              <Zap size={20} color="#64748b" />
              <b>Мощность</b> <span>{truck.power}</span>
            </div>
            <div className="spec-card">
              <Fuel size={20} color="#64748b" />
              <b>Топливо</b> <span>{truck.fuel}</span>
            </div>
            <div className="spec-card">
              <Gauge size={20} color="#64748b" />
              <b>Объем бака</b> <span>{truck.tank}</span>
            </div>
            <div className="spec-card">
              <Box size={20} color="#64748b" />
              <b>Формула</b> <span>{truck.formula}</span>
            </div>
            <div className="spec-card">
              <Weight size={20} color="#64748b" />
              <b>Грузоподъемность</b> <span>{truck.load} тн</span>
            </div>
          </div>

          <div className="package-info-box">
            <h4 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Комплектация кабины</h4>
            <p style={{ margin: 0, color: '#475569', lineHeight: '1.6' }}>{truck.package}</p>
          </div>

          {/* YANGI QO'SHILGAN BATAHSIL MA'LUMOT BLOKLARI */}
          <div className="extra-info-wrapper" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Servis va Ehtiyot qismlar */}
            <div className="info-section-item" style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#1e293b' }}>
                <MapPin size={20} color="#3b82f6" /> <strong style={{fontSize: '18px'}}>Сервис и запчасти</strong>
              </div>
              <p style={{ margin: '5px 0', color: '#475569' }}><strong>Наличие сервиса:</strong> {truck.Наличие_фирменного_сервиса}</p>
              <p style={{ margin: '5px 0', color: '#475569' }}><strong>Доступность запчастей:</strong> {truck.Доступность_ЗЧ}</p>
            </div>

            {/* Moliya */}
            <div className="info-section-item" style={{ background: '#f0fdf4', padding: '20px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#166534' }}>
                <CreditCard size={20} color="#22c55e" /> <strong style={{fontSize: '18px'}}>Финансирование</strong>
              </div>
              <p style={{ margin: 0, color: '#166534' }}>{truck.Финансирование_лизинг_рассрочка}</p>
            </div>

            {/* Ekspluatatsiya */}
            <div className="info-section-item" style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#1e293b' }}>
                <Activity size={20} color="#6366f1" /> <strong style={{fontSize: '18px'}}>Эксплуатационные свойства</strong>
              </div>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.6' }}>{truck.Эксплуатационные_свойтва}</p>
            </div>

            {/* Xarajatlar */}
            <div className="info-section-item" style={{ background: '#eff6ff', padding: '20px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#1e40af' }}>
                <TrendingDown size={20} color="#3b82f6" /> <strong style={{fontSize: '18px'}}>Стоимость владения в год</strong>
              </div>
              <p style={{ margin: 0, color: '#1e40af' }}>{truck.Стоимость_владения_в_год}</p>
            </div>

            {/* Zaif tomonlar */}
            <div className="info-section-item" style={{ background: '#fff1f2', padding: '20px', borderRadius: '12px', border: '1px solid #fecdd3' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#991b1b' }}>
                <AlertTriangle size={20} color="#e11d48" /> <strong style={{fontSize: '18px'}}>Слабые стороны</strong>
              </div>
              <p style={{ margin: 0, color: '#991b1b', lineHeight: '1.6' }}>{truck.Слабые_стороны}</p>
            </div>

            {/* Takliflar */}
            <div className="info-section-item" style={{ background: '#fdfaf1', padding: '20px', borderRadius: '12px', border: '1px solid #fef08a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#854d0e' }}>
                <FileText size={20} color="#eab308" /> <strong style={{fontSize: '18px'}}>Предложения</strong>
              </div>
              <p style={{ margin: 0, color: '#854d0e', lineHeight: '1.6' }}>{truck.Предложения} </p>
              <img src={truck.img2} alt="" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- ASOSIY APP (ROUTING - O'ZGARISHSIZ QOLDI) ---
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/truck/:id" element={<TruckDetails />} />
      </Routes>
    </BrowserRouter>
  );
}