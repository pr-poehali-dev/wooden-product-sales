import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const LOGO_IMG = "https://cdn.poehali.dev/projects/95e4f42a-0a51-4847-a79e-bedf14b4ad03/bucket/10425542-e532-49fe-ae3a-b21941f373b8.png";
const HERO_IMG = "https://cdn.poehali.dev/projects/95e4f42a-0a51-4847-a79e-bedf14b4ad03/files/328c0fba-fdf4-4969-82a2-4c35ef99a430.jpg";
const WORKSHOP_IMG = "https://cdn.poehali.dev/projects/95e4f42a-0a51-4847-a79e-bedf14b4ad03/files/cca37c2e-47b6-471b-b195-2a98e49ce474.jpg";
const COLLECTION_IMG = "https://cdn.poehali.dev/projects/95e4f42a-0a51-4847-a79e-bedf14b4ad03/files/e8868927-b7d3-491a-bdf6-6e9d36f8aa22.jpg";

const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "Каталог", href: "#catalog" },
  { label: "О нас", href: "#about" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Доставка", href: "#delivery" },
  { label: "Контакты", href: "#contacts" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Менажница из ясеня",
    desc: "Круглая менажница для сервировки и подачи. Массив ясеня, 4 секции + соусник по центру. Обработана специальным маслом.",
    price: "900 ₽",
    tag: "Хит",
    img: "https://cdn.poehali.dev/projects/95e4f42a-0a51-4847-a79e-bedf14b4ad03/bucket/8cd7d053-9eec-46bb-bbc1-a26ab62d818b.jpg",
    wood: "Ясень / Дуб",
  },
  {
    id: 2,
    name: "Столик винный",
    desc: "Винный столик со встроенной менажницей. Массив ясеня, складные ножки, высота 12,5 см. Эффектный подарок.",
    price: "4 500 ₽",
    tag: "Подарок",
    img: "https://cdn.poehali.dev/projects/95e4f42a-0a51-4847-a79e-bedf14b4ad03/bucket/06c48f07-d60e-4538-a708-f21148dc8a03.jpg",
    wood: "Дуб",
  },
  {
    id: 3,
    name: "Набор разделочных досок",
    desc: "Комплект из 3 досок разных размеров: 34×24, 29×19, 17×15 см. Натуральное дерево, удобное отверстие для подвеса.",
    price: "3 500 ₽",
    tag: "Набор",
    img: "https://cdn.poehali.dev/projects/95e4f42a-0a51-4847-a79e-bedf14b4ad03/bucket/f3b63da9-3ac5-4fb6-bc0e-2984ad12cb58.jpg",
    wood: "Берёза",
  },
];

const PORTFOLIO_ITEMS = [
  { img: "https://cdn.poehali.dev/projects/95e4f42a-0a51-4847-a79e-bedf14b4ad03/bucket/8cd7d053-9eec-46bb-bbc1-a26ab62d818b.jpg", title: "Менажница из ясеня", size: "Ø 30 см" },
  { img: "https://cdn.poehali.dev/projects/95e4f42a-0a51-4847-a79e-bedf14b4ad03/bucket/06c48f07-d60e-4538-a708-f21148dc8a03.jpg", title: "Столик винный", size: "Высота 12,5 см" },
  { img: "https://cdn.poehali.dev/projects/95e4f42a-0a51-4847-a79e-bedf14b4ad03/bucket/f3b63da9-3ac5-4fb6-bc0e-2984ad12cb58.jpg", title: "Набор досок", size: "3 размера" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const catalogRef = useInView();
  const aboutRef = useInView();
  const portfolioRef = useInView();
  const deliveryRef = useInView();
  const contactsRef = useInView();

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>

      {/* NAV */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(247,240,227,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(120,74,30,0.12)" : "none",
          boxShadow: scrolled ? "0 2px 20px rgba(61,32,8,0.06)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
            className="flex items-center"
          >
            <img
              src={LOGO_IMG}
              alt="MyWOOD Kostroma"
              style={{ height: "44px", width: "44px", objectFit: "contain", borderRadius: "50%", background: "#fff", boxShadow: scrolled ? "none" : "0 2px 12px rgba(0,0,0,0.18)" }}
            />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.3rem",
                fontWeight: 600,
                color: scrolled ? "var(--wood-dark)" : "var(--cream)",
                letterSpacing: "0.04em",
                transition: "color 0.3s",
                marginLeft: "0.6rem",
              }}
            >
              МоёДерево <span style={{ color: "var(--gold)", fontWeight: 400, fontSize: "0.9rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Кострома</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                style={{ color: scrolled ? "var(--wood-mid)" : "rgba(240,228,204,0.85)" }}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#catalog"
            className="btn-gold hidden md:block"
            onClick={(e) => { e.preventDefault(); scrollTo("#catalog"); }}
          >
            Купить
          </a>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: scrolled ? "var(--wood-dark)" : "var(--cream)" }}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden border-t"
            style={{ background: "rgba(247,240,227,0.98)", borderColor: "rgba(120,74,30,0.12)" }}
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#catalog"
                className="btn-gold text-center mt-2"
                onClick={(e) => { e.preventDefault(); scrollTo("#catalog"); }}
              >
                Купить
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Менажница из ясеня"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.42) saturate(0.75)" }}
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(120deg, rgba(61,32,8,0.72) 0%, rgba(122,74,30,0.35) 60%, rgba(61,32,8,0.15) 100%)" }}
          />
        </div>
        <div className="absolute inset-0 wood-texture opacity-20" style={{ pointerEvents: "none" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
          <div className="max-w-2xl">
            <p
              className="animate-fade-in opacity-0-start delay-100"
              style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.75rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--wood-light)", marginBottom: "1.5rem" }}
            >
              Ручная работа · Натуральное дерево
            </p>
            <h1
              className="animate-fade-up opacity-0-start delay-200"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 600, color: "#f7f0e3", lineHeight: 1.05, marginBottom: "1.5rem" }}
            >
              Изделия из дерева,<br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>созданные с душой</em>
            </h1>
            <p
              className="animate-fade-up opacity-0-start delay-300"
              style={{ color: "rgba(240,228,204,0.82)", fontSize: "1.1rem", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: "500px" }}
            >
              Менажницы, разделочные доски и лотки из ясеня, ореха, дуба и вишни.
              Каждое изделие — единственное в своём роде.
            </p>
            <div className="animate-fade-up opacity-0-start delay-400 flex flex-wrap gap-4">
              <button className="btn-gold" onClick={() => scrollTo("#catalog")}>
                Смотреть каталог
              </button>
              <button
                style={{ fontFamily: "'Golos Text', sans-serif", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.75rem 2rem", border: "1px solid rgba(247,240,227,0.3)", color: "#f7f0e3", background: "rgba(247,240,227,0.08)", borderRadius: "2px", transition: "background 0.2s", cursor: "pointer" }}
                onClick={() => scrollTo("#contacts")}
              >
                Связаться
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "rgba(240,228,204,0.4)" }}>
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* STRIP */}
      <div style={{ background: "var(--wood-mid)", borderTop: "3px solid var(--gold)" }}>
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "Leaf", text: "Натуральное дерево" },
            { icon: "Hand", text: "Ручная работа" },
            { icon: "Truck", text: "Доставка по России" },
            { icon: "ShieldCheck", text: "Гарантия качества" },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-3" style={{ color: "var(--cream)" }}>
              <Icon name={f.icon} fallback="Star" size={20} style={{ color: "var(--gold)", flexShrink: 0 }} />
              <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CATALOG */}
      <section id="catalog" className="py-24 px-6">
        <div ref={catalogRef.ref} className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${catalogRef.inView ? "animate-fade-up" : "opacity-0"}`}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "0.5rem" }}>Наши изделия</p>
            <h2 className="section-title">Каталог</h2>
            <div className="divider-wood mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p, i) => (
              <div key={p.id} className={`card-wood ${catalogRef.inView ? `animate-fade-up delay-${(i + 1) * 100}` : "opacity-0"}`}>
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    style={{ transition: "transform 0.5s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    loading="lazy"
                  />
                  {p.tag && (
                    <span style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "var(--gold)", color: "var(--wood-dark)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "2px" }}>
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--wood-light)", marginBottom: "0.25rem", fontWeight: 600 }}>{p.wood}</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: "var(--wood-dark)", marginBottom: "0.5rem", lineHeight: 1.2 }}>{p.name}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--wood-mid)", lineHeight: 1.6, marginBottom: "1rem" }}>{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--wood-dark)" }}>{p.price}</span>
                    <button className="btn-gold" style={{ padding: "0.5rem 1.2rem", fontSize: "0.78rem" }}>Купить</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: "rgba(120,74,30,0.05)", borderTop: "1px solid rgba(120,74,30,0.1)", borderBottom: "1px solid rgba(120,74,30,0.1)" }} className="py-24 px-6">
        <div ref={aboutRef.ref} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className={aboutRef.inView ? "animate-fade-up" : "opacity-0"}>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "0.5rem" }}>Наша история</p>
              <h2 className="section-title" style={{ marginBottom: "1rem" }}>О нас</h2>
              <div className="divider-wood" />
              <p style={{ color: "var(--wood-mid)", lineHeight: 1.8, fontSize: "1rem", marginBottom: "1.5rem", marginTop: "1rem" }}>
                Мы создаём изделия из дерева с любовью к натуральным материалам.
                Каждая менажница, доска или лоток проходит через наши руки от заготовки до финишной обработки маслом и воском.
              </p>
              <p style={{ color: "var(--wood-mid)", lineHeight: 1.8, fontSize: "1rem", marginBottom: "2rem" }}>
                Дерево — живой экологичный материал, и в каждом изделии сохраняется его уникальный природный рисунок.
                Никакой химии — только натуральные масла и воск.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[{ num: "5+", label: "Лет опыта" }, { num: "500+", label: "Изделий создано" }, { num: "100%", label: "Экологично" }].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 700, color: "var(--wood-dark)", lineHeight: 1 }}>{s.num}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--wood-light)", marginTop: "0.25rem" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative ${aboutRef.inView ? "animate-fade-up delay-200" : "opacity-0"}`}>
              <img src={WORKSHOP_IMG} alt="Мастерская" className="w-full rounded-sm object-cover" style={{ aspectRatio: "4/3", boxShadow: "0 20px 60px rgba(61,32,8,0.18)" }} loading="lazy" />
              <div style={{ position: "absolute", bottom: "-1.5rem", left: "-1.5rem", background: "var(--gold)", color: "var(--wood-dark)", padding: "1.2rem 1.5rem", borderRadius: "2px", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 600, lineHeight: 1.4, maxWidth: "180px" }}>
                🪵 Живое дерево<br />в каждом изделии
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 px-6">
        <div ref={portfolioRef.ref} className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${portfolioRef.inView ? "animate-fade-up" : "opacity-0"}`}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "0.5rem" }}>Работы</p>
            <h2 className="section-title">Портфолио</h2>
            <div className="divider-wood mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`relative group overflow-hidden rounded-sm ${portfolioRef.inView ? `animate-fade-up delay-${(i + 1) * 100}` : "opacity-0"}`}
                style={{ aspectRatio: "1/1" }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  style={{ transition: "transform 0.5s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.07)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100" style={{ background: "linear-gradient(0deg, rgba(61,32,8,0.82) 0%, transparent 55%)", transition: "opacity 0.3s" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 600, color: "#f7f0e3" }}>{item.title}</p>
                  {item.size && <p style={{ fontSize: "0.78rem", color: "var(--wood-light)" }}>{item.size}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" style={{ background: "var(--wood-dark)", color: "var(--cream)" }} className="py-24 px-6">
        <div ref={deliveryRef.ref} className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${deliveryRef.inView ? "animate-fade-up" : "opacity-0"}`}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "0.5rem" }}>Доставка и оплата</p>
            <h2 className="section-title" style={{ color: "var(--cream)" }}>Доставка</h2>
            <div className="divider-wood mx-auto" />
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${deliveryRef.inView ? "animate-fade-up delay-200" : "opacity-0"}`}>
            {[
              { icon: "Package", title: "Упаковка", text: "Каждое изделие бережно упаковывается в крафтовую бумагу и коробку. Доходит без повреждений." },
              { icon: "Truck", title: "Доставка", text: "Отправляем Почтой России и СДЭК по всей России. Сроки от 3 до 14 дней в зависимости от региона." },
              { icon: "CreditCard", title: "Оплата", text: "Принимаем карты Visa, Mastercard, Мир. Также возможна оплата через СБП. Безопасно и быстро." },
            ].map((d) => (
              <div key={d.title} style={{ background: "rgba(240,228,204,0.05)", border: "1px solid rgba(240,228,204,0.1)", borderRadius: "4px", padding: "2rem" }}>
                <div style={{ width: "48px", height: "48px", background: "rgba(201,151,42,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <Icon name={d.icon} fallback="Star" size={22} style={{ color: "var(--gold)" }} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "var(--cream)", marginBottom: "0.75rem" }}>{d.title}</h3>
                <p style={{ color: "rgba(240,228,204,0.65)", lineHeight: 1.7, fontSize: "0.9rem" }}>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6">
        <div ref={contactsRef.ref} className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 ${contactsRef.inView ? "animate-fade-up" : "opacity-0"}`}>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "0.5rem" }}>Мы на связи</p>
            <h2 className="section-title">Контакты</h2>
            <div className="divider-wood mx-auto" />
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${contactsRef.inView ? "animate-fade-up delay-200" : "opacity-0"}`}>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: "var(--wood-dark)", marginBottom: "1.5rem" }}>Напишите нам</h3>
              <form className="flex flex-col gap-4">
                {["Ваше имя", "Телефон"].map((ph) => (
                  <input
                    key={ph}
                    type="text"
                    placeholder={ph}
                    style={{ border: "1px solid rgba(120,74,30,0.25)", borderRadius: "2px", padding: "0.75rem 1rem", background: "rgba(120,74,30,0.04)", color: "var(--wood-dark)", fontFamily: "'Golos Text', sans-serif", fontSize: "0.9rem", outline: "none" }}
                  />
                ))}
                <textarea
                  placeholder="Ваш вопрос или пожелание по заказу"
                  rows={4}
                  style={{ border: "1px solid rgba(120,74,30,0.25)", borderRadius: "2px", padding: "0.75rem 1rem", background: "rgba(120,74,30,0.04)", color: "var(--wood-dark)", fontFamily: "'Golos Text', sans-serif", fontSize: "0.9rem", outline: "none", resize: "none" }}
                />
                <button type="submit" className="btn-wood" style={{ alignSelf: "flex-start" }}>Отправить</button>
              </form>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: "var(--wood-dark)", marginBottom: "1.5rem" }}>Наши контакты</h3>
              <div className="flex flex-col gap-6">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (000) 000-00-00" },
                  { icon: "Mail", label: "Email", value: "info@drevomaster.ru" },
                  { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "+7 (000) 000-00-00" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00 – 18:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div style={{ width: "40px", height: "40px", background: "rgba(201,151,42,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Icon name={c.icon} fallback="Star" size={18} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--wood-light)", fontWeight: 600, marginBottom: "0.15rem" }}>{c.label}</p>
                      <p style={{ color: "var(--wood-dark)", fontWeight: 500 }}>{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--wood-dark)", borderTop: "3px solid var(--gold)", color: "rgba(240,228,204,0.55)" }} className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={LOGO_IMG} alt="MyWOOD Kostroma" style={{ height: "36px", width: "36px", objectFit: "contain", borderRadius: "50%", background: "#fff" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, color: "var(--cream)" }}>
              МоёДерево <span style={{ color: "var(--gold)", fontWeight: 400, fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Кострома</span>
            </span>
          </div>
          <p style={{ fontSize: "0.8rem", textAlign: "center" }}>© 2024 МоёДерево Кострома. Авторские изделия из дерева ручной работы.</p>
          <nav className="flex gap-6 flex-wrap justify-center">
            {NAV_ITEMS.slice(1).map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,228,204,0.45)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,228,204,0.45)")}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}