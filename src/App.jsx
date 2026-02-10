import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Zap, Fuel, Gauge, Box, Weight } from 'lucide-react';
import './App.css';

// --- MALUMOTLAR BAZASI ---
const TRUCKS_DATA = [
  {
    id: "1",
    category: "I",
    name: "КАМАЗ 54901-7004-СА 4х2",
    price: "932 848 000 сум",
    engine: "740.55-300",
    power: "300 л.с.",
    fuel: "Дизель",
    tank: "600+700 л",
    formula: "4х2",
    load: "34.5",
    package: "Имеется все кроме холодильника",
    img: "/images/image.png",

  },
  { id: "2", category: "I", name: "Седельный тягач 44108-6010-24 6x6", price: "775 040 000 сум", engine: "КАМАЗ 740.55-300", power: "300 л.с.", fuel: "x", tank: "350 л", formula: "6х6", load: "7", package: "Минимальная комплектация", img: "/images/2.png" },
  { id: "3", category: "I", name: "Седельный тягач 44108-6010-24 КМУ 10 тн длина 9,57 метр 6x6", price: "1 329 440 000 сум", engine: "КАМАЗ 740.55-300", power: "300 л.с.", fuel: "x", tank: "350 л", formula: "6х6", load: "10", package: "Минимальная комплектация", img: "/images/3.png" },
  { id: "4", category: "I", name: "Седельный тягач 6460-001-63 6х4 400 л.с.", price: "882 560 000 сум", engine: "КАМАЗ 740.50-360", power: "360 л.с.", fuel: "Дизель", tank: "550 л", formula: "6х4", load: "62", package: "Минимальная комплектация", img: "/images/4.jpg" },
  { id: "5", category: "I", name: "Автосамосвал 10м3 ST-52 на базе шасси КАМАЗ 53605-1950-15 4х2", price: "696 640 000 сум", engine: "740.15-240", power: "240 л.с.", fuel: "Дизель", tank: "350 л.  35 л/100 км", formula: "4х2", load: "10", Объём: "10", package: "Минимальная комплектация", img: "/images/5.png" },
  { id: "6", category: "I", name: "Автосамосвал 12м3 ST-52 на базе шасси КАМАЗ 53229-1963 6х4", price: "739 200 000 сум", engine: "740.31-240", power: "240 л.с.", fuel: "Дизель", tank: "350 л/100 км", formula: "6х4", load: "15", Объём: "12", package: "Минимальная комплектация", img: "/images/6.png" },
  { id: "7", category: "I", name: "Автосамосвал 18м3 ST-52 на базе шасси КАМАЗ 6520-1043 6х4", price: "845 600 000 сум", engine: "740.51-320", power: "320 л.с.", fuel: "Дизель", tank: "350 л", formula: "6х4", load: "20", Объём: "16", package: "Минимальная комплектация", img: "/images/7.png" },
  { id: "8", category: "I", name: "Автосамосвал 14м3 на базе шасси КАМАЗ 65222-23012 6х6", price: "1 489 600 000 сум", engine: "740.735-400", power: "400 л.с.", fuel: "Дизель", tank: "350 л", formula: "6х6", load: "19", Объём: "14", package: "Минимальная комплектация", img: "/images/8.png" },
  { id: "9", category: "I", name: "Военный бортовой тентовый автофургон на базе шасси КАМАЗ 43118-1053-10 6х6", price: "1 026 704 000 сум", engine: "740.30-260", power: "260 л.с.", fuel: "Дизель", tank: "x", formula: "6х6", load: "10", Объём: "25", package: "Минимальная комплектация", img: "/images/9.png" },
  { id: "10", category: "I", name: "Военный бортовой тентовый автофургон на базе шасси КАМАЗ 4326-1053-15 4х4", price: "966 716 800 сум", engine: "740.65-240", power: "240 л.с.", fuel: "Дизель", tank: "x", formula: "4х4", load: "4", Объём: "19", package: "Минимальная комплектация", img: "/images/10.png" },
  { id: "11", category: "I", name: "Цельнометалический автофургон на базе шасси КАМАЗ 65117 -1029 6х4 объемом 46м3", price: "884 800 000 сум", engine: "740.30-260", power: "260 л.с.", fuel: "Дизель", tank: "x", formula: "6х4", load: "14", Объём: "46", package: "Минимальная комплектация", img: "/images/11.jpg" },
  { id: "12", category: "I", name: "Цельнометаллический автофургон на базе шасси КАМАЗ 43118-1098 6х6 объемом 33 м3", price: "907 200 000 сум", engine: "740.30-260", power: "260 л.с.", fuel: "Дизель", tank: "210+350 л.", formula: "6х6", load: "x", Объём: "33", package: "Минимальная комплектация", img: "/images/12.jpg" },
  { id: "13", category: "I", name: "Бортовая платформа на базе шасси КАМАЗ 43118-1098 6х6", price: "840 000 000 сум", engine: "740.30-260", power: "260 л.с.", fuel: "Дизель", tank: "210+350 л.", formula: "6х6", load: "x", Объём: "x", package: "Минимальная комплектация", img: "/images/13.jpg" },
  { id: "14", category: "I", name: "Бортовая платформа на базе шасси КАМАЗ 65117-1029 6х4", price: "817 600 000 сум", engine: "740.30-260", power: "260 л.с.", fuel: "Дизель", tank: "500 л.", formula: "6х4", load: "x", Объём: "x", package: "Минимальная комплектация", img: "/images/14.jpg" },
  { id: "15", category: "I", name: "Автогидроподъёмник 23м на базе шасси КАМАЗ 43253-1010-15 4х2", price: "1 097 600 000 сум", engine: "x", power: "240 л.с.", fuel: "Дизель", tank: "350 л.", formula: "4х2", load: "x", Объём: "x", package: "Минимальная комплектация", img: "/images/15.jpg" },
  { id: "16", category: "I", name: "Автогидроподъёмник 28м на базе шасси КАМАЗ 43253-1010-15 4х2", price: "1 254 400 000 сум", engine: "x", power: "240 л.с.", fuel: "Дизель", tank: "350 л.", formula: "4х2", load: "x", Объём: "x", package: "Минимальная комплектация", img: "/images/15.jpg" },
  { id: "17", category: "I", name: "Кран манипулятор 6,6 тн. на базе шасси КАМАЗ 65117-1029 6х4 19,5 м.", price: "1 332 800 000 сум", engine: "740.30-260", power: "260 л.с.", fuel: "Дизель", tank: "500 л.", formula: "6х4", load: "6,6", Объём: "x", package: "Минимальная комплектация", img: "/images/16.png" },
  { id: "18", category: "I", name: "Кран манипулятор 6,6 тн. на базе шасси КАМАЗ 43118-1098-10 6х6 19,5 м.", price: "1 368 640 000 сум", engine: "740.30-260", power: "260 л.с.", fuel: "Дизель", tank: "210+350 л.", formula: "6х6", load: "6,6", Объём: "x", package: "Минимальная комплектация", img: "/images/17.png" },
  { id: "19", category: "I", name: "Автокран 25тн. вылет стрелы 28м на базе шасси КАМАЗ 43118-1048-10 6х6 (BOB LIFT)", price: "1 937 600 000 сум", engine: "x", power: "x", fuel: "Дизель", tank: "x", formula: "6х6", load: "x", Объём: "x", package: "Минимальная комплектация", img: "/images/middle.png" },
  { id: "20", category: "I", name: "Автоцистерна водовоз для тех воды 8 м3 на базе шасси КАМАЗ 43253-1010-15 4х2", price: "698 880 000 сум", engine: "740.31-240", power: "176 л.с.", fuel: "Дизель", tank: "x", formula: "4х2", load: "x", Объём: "8", package: "Минимальная комплектация", img: "/images/18.jpg" },
  { id: "21", category: "I", name: "Автоцистерна водовоз для тех воды 10 м3 на базе шасси КАМАЗ 43118-1048-10 6х6", price: "1 030 400 000 сум", engine: "740.30-260", power: "260 л.с.", fuel: "Дизель", tank: "210+350 л.", formula: "6х6", load: "x", Объём: "10", package: "Минимальная комплектация", img: "/images/19.jpg" },
  { id: "22", category: "I", name: "Автоцистерна водовоз для питьевой воды 8 м3 на базе шасси КАМАЗ 43253-1010-15 4х2", price: "1 075 200 000 сум", engine: "КамАЗ 740.31-240", power: "240 л.с.", fuel: "Дизель", tank: "x", formula: "6х6", load: "x", Объём: "x", package: "Минимальная комплектация", img: "/images/20.jpg" },
  { id: "23", category: "I", name: "Автоцистерна водовоз 10м3 для питьевой воды на базе шасси КАМАЗ 43118-1048-10 6х6", price: "1 232 000 000 сум", engine: "740.30-260", power: "260 л.с.", fuel: "Дизель", tank: "210+350 л.", formula: "6х6", load: "x", Объём: "10", package: "Минимальная комплектация", img: "/images/21.jpg" },
  { id: "24", category: "I", name: "Автоцистерна водовоз 10м3 для питьевой воды на базе шасси КАМАЗ 53605-1950-15 4х2", price: "1 052 800 000 сум", engine: "740.15-240", power: "240 л.с.", fuel: "Дизель", tank: "350 л.", formula: "4х2", load: "x", Объём: "10", package: "Минимальная комплектация", img: "/images/22.jpg" },
  { id: "25", category: "I", name: "Автотопливозаправщик 9м3 на базе шасси КАМАЗ 43253-1010 4х2", price: "974 400 000 сум", engine: "740.31-240", power: "240 л.с.", fuel: "Дизель", tank: "350 л.", formula: "4х2", load: "x", Объём: "9", package: "Минимальная комплектация", img: "/images/23.jpg" },
  { id: "26", category: "I", name: "Автотопливозаправщик 9м3 на базе шасси КАМАЗ 43118-1048-10 6х6 3-х секционный", price: "1 086 400 000 сум", engine: "740.30-260", power: "260 л.с.", fuel: "Дизель", tank: "210+350 л.", formula: "6х6", load: "x", Объём: "9", package: "Минимальная комплектация", img: "/images/24.jpg" },
  { id: "27", category: "I", name: "Автотопливозаправщик 12м3 на базе шасси КАМАЗ 43118-1048-10 6х6", price: "1 120 000 000 сум", engine: "740.30-260", power: "260 л.с.", fuel: "Дизель", tank: "210+350 л.", formula: "6х6", load: "x", Объём: "12", package: "Минимальная комплектация", img: "/images/25.png" },
  { id: "28", category: "I", name: "Автотопливозаправщик 17м3 на базе шасси КАМАЗ 53229-1963-15 6х4", price: "1 052 800 000 сум", engine: "740.31-240", power: "240 л.с.", fuel: "Дизель", tank: "x", formula: "6х4", load: "x", Объём: "17", package: "Минимальная комплектация", img: "/images/26.jpg" },
  { id: "29", category: "I", name: "Поливомоечная машина 8 м3 на базе шасси КАМАЗ 43253-1010-15 4х2", price: "1 008 000 000 сум", engine: "740.31-240", power: "240 л.с.", fuel: "Дизель", tank: "350 л.", formula: "4х2", load: "x", Объём: "8", package: "Минимальная комплектация", img: "/images/27.jpg" },
  { id: "30", category: "I", name: "КДМ 8 м3 с пушкой с подметалкой на базе шасси КАМАЗ 43253-1010-15 4х2", price: "1 164 800 000 сум", engine: "740.31-240", power: "240 л.с.", fuel: "Дизель", tank: "350 л.", formula: "4х2", load: "x", Объём: "8", package: "Минимальная комплектация", img: "/images/28.jpg" },
  { id: "31", category: "I", name: "Поливомоечная машина 10 м3 с пушкой без подметалкой на базе шасси КАМАЗ 53605-1950-15 4х2", price: "1 064 000 000 сум", engine: "740.15-240", power: "240 л.с.", fuel: "Дизель", tank: "350 л.", formula: "4х2", load: "x", Объём: "10", package: "Минимальная комплектация", img: "/images/29.jpg" },
  { id: "32", category: "I", name: "КДМ 10 м3 с пушкой с подметалкой на базе шасси КАМАЗ 53605-1950-15 4х2", price: "1 265 600 000 сум", engine: "740.15-240", power: "240 л.с.", fuel: "Дизель", tank: "350 л.", formula: "4х2", load: "x", Объём: "10", package: "Минимальная комплектация", img: "/images/28.jpg" },
  { id: "33", category: "I", name: "Вакуумная машина (ассенизатор) 6 м3 на базе шасси КАМАЗ 43253-1010-15 4х2", price: "884 800 000 сум", engine: "740.31-240", power: "240 л.с.", fuel: "Дизель", tank: "350 л.", formula: "4х2", load: "x", Объём: "6", package: "Минимальная комплектация", img: "/images/30.jpg" },
  { id: "34", category: "I", name: "Вахтовый автобус (24 мест) на базе шасси КАМАЗ 43118-1048-10 6х6", price: "1 243 200 000 сум", engine: "740.30-260", power: "260 л.с.", fuel: "Дизель", tank: "210+350 л.", formula: "6х6", load: "x", Объём: "x", package: "Минимальная комплектация", img: "/images/31.jpg" },
  { id: "35", category: "I", name: "Вахтовый автобус 21 мест на шасси КАМАЗ 4326-1053-15 4х4", price: "1 209 600 000 сум", engine: "740.31-240", power: "260 л.с.", fuel: "Дизель", tank: "x", formula: "4х4", load: "x", Объём: "x", package: "Минимальная комплектация", img: "/images/32.jpg" },
  { id: "36", category: "I", name: "Мусороуборочная машина 11м3 на базе шасси КАМАЗ 43253-1010-15 4х2", price: "1 041 600 000 сум", engine: "740.31-240", power: "260 л.с.", fuel: "Дизель", tank: "350 л.", formula: "4х2", load: "5,5", Объём: "11", package: "Минимальная комплектация", img: "/images/33.png" },
  { id: "37", category: "I", name: "Полуприцеп самосвальный 27-29 м3 ST-52", price: "442 400 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "3-осная", load: "36", Объём: "27", package: "x", img: "/images/37.jpg" },
  { id: "38", category: "I", name: "Полуприцеп шторно тентовый 16,5 метр 3 осный", price: "588 000 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "3-осная", load: "31,1", Объём: "110", package: "x", img: "/images/38.jpg" },
  { id: "39", category: "I", name: "Полуприцеп шторно тентовый 16,5 метр 4 осный", price: "672 000 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "4-осная", load: "39,4", Объём: "110", package: "x", img: "/images/39.jpg" },
  { id: "40", category: "I", name: "Полуприцеп самосвальный 33 м3", price: "509 600 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "3-осная", load: "36", Объём: "33", package: "x", img: "/images/40.png" },
  { id: "41", category: "I", name: "Прицеп самосвальный 16м3", price: "386 400 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "3-осная", load: "40", Объём: "16", package: "x", img: "/images/41.png" },
  { id: "42", category: "I", name: "Полуприцеп самосвал зерновоз 35м3", price: "408 800 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "3-осная", load: "30", Объём: "35", package: "x", img: "/images/42.png" },
  { id: "43", category: "I", name: "Полуприцеп тентовый 92м3", price: "504 000 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "3-осная", load: "31,1", Объём: "92", package: "x", img: "/images/43.png" },
  { id: "44", category: "I", name: "Полуприцеп контейнеровоз бортовой", price: "364 000 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "3-осная", load: "30,5", Объём: "30,5", package: "x", img: "/images/44.png" },
  { id: "45", category: "I", name: "Полуприцеп контейнеровоз рама", price: "296 800 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "3-осная", load: "30,5", Объём: "x", package: "x", img: "/images/45.png" },
  { id: "46", category: "I", name: "Полуприцеп контейнеровоз низкорамный модель HIGH CUBE 3 осный", price: "352 800 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "3-осная", load: "34", Объём: "x", package: "x", img: "/images/46.png" },
  { id: "47", category: "I", name: "Полуприцеп контейнеровоз низкорамный модель HIGH CUBE 4 осный", price: "425 600 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "4-осная", load: "33,5", Объём: "x", package: "x", img: "/images/47.png" },
  { id: "48", category: "I", name: "Тракторный прицеп 5 тн", price: "118 720 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "2-осная", load: "5", Объём: "13,5", package: "x", img: "/images/48.png" },
  { id: "49", category: "I", name: "Тракторный прицеп 8 тн", price: "127 680 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "2-осная", load: "8", Объём: "14", package: "x", img: "/images/49.png" },
  { id: "50", category: "I", name: "JAC W 5082х200 шасси однорядный", price: "244 160 000 сум", engine: "HFC4GA3-3D", power: "147 л.с.", fuel: "Бензин", tank: "x", formula: "4x2", load: "2080", Объём: "x", package: "Максимум комплектация", img: "/images/50.png" },
  { id: "51", category: "I", name: "JAC W 5082х200 бортовой однорядный бензиновый", price: "248 640 000 сум", engine: "HFC4GA3-3D", power: "147 л.с.", fuel: "Бензин", tank: "x", formula: "4x2", load: "2080", Объём: "3100×1650×355", package: "Максимум комплектация", img: "/images/51.png" },
  { id: "52", category: "I", name: "JAC W 5082 промтоварный", price: "275 520 000 сум", engine: "HFC4GA3-3D", power: "147 л.с.", fuel: "Бензин", tank: "x", formula: "4x2", load: "2080", Объём: "3220×1760×1760", package: "Максимум комплектация", img: "/images/52.png" },
  { id: "53", category: "I", name: "JAC W 5082х200 тентовый", price: "255 360 000 сум", engine: "HFC4GA3-3D", power: "147 л.с.", fuel: "Бензин", tank: "x", formula: "4x2", load: "2028", Объём: "3100×1650×1840", package: "Максимум комплектация", img: "/images/53.png" },
  { id: "54", category: "I", name: "Шасси КАМАЗ 4326-1053-15 4х4", price: "907 200 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "4x4", load: "x", Объём: "x", package: "Минимальная комплектация ", img: "/images/54.png" },
  { id: "55", category: "I", name: "Шасси КАМАЗ 43118-1098-10 6х6", price: "940 800 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "6x6", load: "x", Объём: "x", package: "Минимальная комплектация ", img: "/images/55.png" },
  { id: "56", category: "I", name: "Шасси КАМАЗ 43118-1053-10 6х6", price: "940 800 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "6x6", load: "x", Объём: "x", package: "Минимальная комплектация ", img: "/images/55.png" },
  { id: "57", category: "I", name: "Шасси КАМАЗ 43118-1048-10 6х6", price: "940 800 000 сум", engine: "x", power: "x", fuel: "x", tank: "x", formula: "6x6", load: "x", Объём: "x", package: "Минимальная комплектация ", img: "/images/.png" },
];

// --- 1-SAHIFA: KATALOG (ASOSIY SAHIFA) ---
const CatalogPage = () => {
  // Default holatda hamma modellarni ko'rsatish uchun "All" qilindi
  const [activeCat, setActiveCat] = useState("All");
  const navigate = useNavigate();

  // Filtr mantiqi: "All" bo'lsa hammasi, aks holda kategoriya bo'yicha 
  const filteredTrucks = activeCat === "All"
    ? TRUCKS_DATA
    : TRUCKS_DATA.filter(t => t.category === activeCat);

  return (
    <div className="app-container">
      {/* <h1 className="header-title">Каталог грузовой техники</h1> */}

      {/* <div className="select-box">
        <label>Выберите категорию:</label>
        <select className="category-select" onChange={(e) => setActiveCat(e.target.value)} value={activeCat}>
          <option value="All">Все модели</option>
          <option value="I">I. Седельные тягачи</option>
          <option value="II">II. Автосамосвалы</option>
          <option value="III">III. Фургоны и бортовые автомобили</option>
          <option value="IV">IV. Специальная техника</option>
        </select>
      </div> */}

      <div className="truck-grid">
        {filteredTrucks.map(truck => (
          <div className="truck-card" key={truck.id} onClick={() => navigate(`/truck/${truck.id}`)} >
            <img src={truck.img} alt={truck.name} />
            <div className="card-info">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 2-SAHIFA: TRUCK DETAILS (ALOHIDA SAHIFA) ---
const TruckDetails = () => {
  const { id } = useParams();
  const truck = TRUCKS_DATA.find(t => t.id === id);

  if (!truck) return <div className="app-container">Техника не найдена!</div>;

  return (
    <div className="app-containerr">
      <Link to="/" className="back-btn"><ArrowLeft size={18} /> Назад в каталог</Link>

      <div className="details-page">
        <div className="details-content">
          <h1 style={{ fontSize: '32px', margin: '0' }}>{truck.name}</h1>
          <div className="card-price" style={{ fontSize: '28px', margin: '15px 0' }}>{truck.price}</div>

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


        </div>
      </div>
    </div>
  );
};

// --- ASOSIY APP (ROUTING) ---
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