import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Settings, Zap, Fuel, Gauge, Box, Weight,
  MapPin, CreditCard, Activity, TrendingDown, AlertTriangle, FileText,
  Maximize, Scale, ArrowRightLeft, Info // Info iconi qo'shildi
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
          <div className="truck-card" key={truck.id} onClick={() => navigate(`/truck/${truck.id}`)}>
            <img src={truck.img} alt="img" />
            <div className="card-info"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 2-SAHIFA: TRUCK DETAILS ---
const TruckDetails = () => {
  const { id } = useParams();
  const truck = TRUCKS_DATA.find(t => t.id === id);

  if (!truck) return <div className="app-container">Техника не найдена!</div>;

  return (
    <div className="app-containerr">
      <div className="sticky-nav">
        <Link to="/" className="back-btn">
          <ArrowLeft size={18} /> Назад в каталог
        </Link>
      </div>

      <div className="details-page">
        <div className="details-content">

          <div style={{ marginBottom: '20px', display: 'flex', gap: "30px", flexWrap: 'wrap' }}>
            <img
              src={truck.img}
              alt={truck.name}
              style={{ maxWidth: '200px', height: 'auto', objectFit: 'contain', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            />

            <div style={{ flex: 1, minWidth: '250px' }}>
              <h1 style={{ fontSize: '32px', margin: '0', color: '#0f172a' }}>{truck.name}</h1>
              <div className="card-price" style={{ fontSize: '28px', margin: '15px 0', color: '#3b82f6' }}>{truck.price}</div>
            </div>
          </div>

          <div className="spec-grid">
            {truck.engine && truck.engine !== "x" && (
              <div className="spec-card">
                <Settings size={20} color="#64748b" />
                <b>Двигатель</b> <span>{truck.engine}</span>
              </div>
            )}
            {truck.power && truck.power !== "x" && (
              <div className="spec-card">
                <Zap size={20} color="#64748b" />
                <b>Мощность</b> <span>{truck.power}</span>
              </div>
            )}
            {truck.fuel && truck.fuel !== "x" && (
              <div className="spec-card">
                <Fuel size={20} color="#64748b" />
                <b>Топливо</b> <span>{truck.fuel}</span>
              </div>
            )}
            {truck.tank && (truck.tank !== "x" || truck.category === "7") && (
              <div className="spec-card">
                <Gauge size={20} color="#64748b" />
                <b>Объем бака</b> <span>{truck.tank}</span>
              </div>
            )}
            {truck.Объем_кузова && truck.Объем_кузова !== "" && (
              <div className="spec-card">
                <Maximize size={20} color="#64748b" />
                <b>Объем кузова</b> <span>{truck.Объем_кузова}</span>
              </div>
            )}
            
            {/* YANGI QO'SHILDI: Снаряженная_масса_тн (Cardlar yoniga) */}
            {truck.Снаряженная_масса_тн && truck.Снаряженная_масса_тн !== "" && (
              <div className="spec-card">
                <Scale size={20} color="#64748b" />
                <b>Снаряженная масса</b> <span>{truck.Снаряженная_масса_тн} тн</span>
              </div>
            )}

            {truck.Масса_снаряженного_полуприцеpa && truck.Масса_снаряженного_полуприцепа !== "" && (
              <div className="spec-card">
                <Scale size={20} color="#64748b" />
                <b>Снаряженная масса п/п</b> <span>{truck.Масса_снаряженного_полуприцепа}</span>
              </div>
            )}
            {truck.Масса_перевозимого_груза && truck.Масса_перевозимого_груза !== "" && (
              <div className="spec-card">
                <Weight size={20} color="#64748b" />
                <b>Масса груза</b> <span>{truck.Масса_перевозимого_груза}</span>
              </div>
            )}
            {truck.Полная_масса_полуприцепа && truck.Полная_масса_полуприцепа !== "" && (
              <div className="spec-card">
                <Scale size={20} color="#64748b" />
                <b>Полная масса</b> <span>{truck.Полная_масса_полуприцепа}</span>
              </div>
            )}
            <div className="spec-card">
              <Box size={20} color="#64748b" />
              <b>Формула</b> <span>{truck.formula}</span>
            </div>

            {truck.category !== "7" && truck.load && truck.load !== "x" && (
              <div className="spec-card">
                <Weight size={20} color="#64748b" />
                <b>Грузоподъемность</b> <span>{truck.load} тн</span>
              </div>
            )}
          </div>

          {truck.package && truck.package !== "x" && (
            <div className="package-info-box">
              <h4 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Комплектация</h4>
              <p style={{ margin: 0, color: '#475569', lineHeight: '1.6' }}>{truck.package}</p>
            </div>
          )}

          <div className="extra-info-wrapper" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div className="info-section-item" style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#1e293b' }}>
                <MapPin size={20} color="#3b82f6" /> <strong style={{ fontSize: '18px' }}>Сервис и запчасти</strong>
              </div>
              <p><strong>Наличие сервиса:</strong> {truck.Наличие_фирменного_сервиса}</p>
              <p><strong>Доступность запчастей:</strong> {truck.Доступность_ЗЧ}</p>
              
              {/* YANGI QO'SHILDI: Назначение (Mavjud list tagidan) */}
              {truck.Назначение && (
                <p><strong>Сфера применения (экспулатации):</strong> {truck.Назначение}</p>
              )}
            </div>

            <div className="info-section-item" style={{ background: '#f0fdf4', padding: '20px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#166534' }}>
                <CreditCard size={20} color="#22c55e" /> <strong style={{ fontSize: '18px' }}>Финансирование</strong>
              </div>
              <p>{truck.Финансирование_лизинг_рассрочка}</p>
            </div>

            <div className="info-section-item" style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#1e293b' }}>
                <Activity size={20} color="#6366f1" /> <strong style={{ fontSize: '18px' }}>Эксплуатационные свойства</strong>
              </div>
              <p>{truck.Эксплуатационные_свойтва}</p>
            </div>

            <div className="info-section-item" style={{ background: '#eff6ff', padding: '20px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#1e40af' }}>
                <TrendingDown size={20} color="#3b82f6" /> <strong style={{ fontSize: '18px' }}>Стоимость владения в год</strong>
              </div>
              <p>{truck.Стоимость_владения_в_год}</p>
            </div>

            <div className="info-section-item" style={{ background: '#fff1f2', padding: '20px', borderRadius: '12px', border: '1px solid #fecdd3' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#991b1b' }}>
                <AlertTriangle size={20} color="#e11d48" /> <strong style={{ fontSize: '18px' }}>Слабые стороны</strong>
              </div>
              <p>{truck.Слабые_стороны}</p>
            </div>

            <div className="info-section-item" style={{ background: '#fdfaf1', padding: '20px', borderRadius: '12px', border: '1px solid #fef08a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#854d0e' }}>
                <FileText size={20} color="#eab308" /> <strong style={{ fontSize: '18px' }}>Предложения</strong>
              </div>
              <div >
                <p>{truck.Предложения} </p>
                {truck.img2 && <img src={truck.img2} alt="" width={235} height={"auto"} />}
              </div>
            </div>

            {/* --- KONKURENTLAR KARTALARI --- */}
            {truck.competitors && truck.competitors.length > 0 && (
              <div style={{ marginTop: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <ArrowRightLeft size={24} color="#f59e0b" />
                  <strong style={{ fontSize: '24px', color: '#1e293b' }}>Конкуренты и сравнение</strong>
                </div>

                <div className="competitors-grid">
                  {truck.competitors.map((comp, index) => (
                    <div className="competitor-card" key={index}>
                      <div className="comp-img-placeholder">
                        {comp.imgk ? (
                          <img src={comp.imgk} alt={comp.name} />
                        ) : (
                          <span style={{ color: '#cbd5e1' }}>Нет фото</span>
                        )}
                      </div>

                      <div className="comp-main-info">
                        <h3 className="comp-title">{comp.name}</h3>
                        <div className="comp-price">{comp.price}</div>

                        <div className="comp-spec-mini">
                          <div className="comp-mini-card">
                            <b>Formula/Грузоподъемность</b>
                            {comp.formula} / {comp.load}
                          </div>
                          <div className="comp-mini-card">
                            <b>Объем кузова/Масса снаряженного полуприцепа</b>
                            {comp.Объем_кузова} / {comp.Масса_снаряженного_полуприцеpa}
                          </div>
                          <div className="comp-mini-card">
                            <b>Масса перевозимого груза</b>
                            {comp.Масса_перевозимого_груза}
                          </div>
                          <div className="comp-mini-card">
                            <b>Полная масса полуприцепа</b>
                            {comp.Полная_масса_полуприцеpa}
                          </div>
                        </div>
                      </div>

                      <div className="comp-details-text">
                        <div className="comp-text-item">
                          <strong>Сервис и запчасти:</strong>
                          {comp.Наличие_фирменного_сервиса}. {comp.Доступность_ЗЧ}
                        </div>
                        <div className="comp-text-item" style={{ background: '#f0fdf4', padding: '10px', borderRadius: '8px' }}>
                          <strong>Финансирование:</strong>
                          {comp.Финансирование_лизинг_рассрочка}
                        </div>
                        <div className="comp-text-item">
                          <strong>Эксплуатационные свойства:</strong>
                          {comp.Эксплуатационные_свойтва}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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