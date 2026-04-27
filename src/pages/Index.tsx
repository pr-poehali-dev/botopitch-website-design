import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

// ─── EMBERS / SPARKS — фоновые искры из печи ─────────────────────────────────
function Embers({ count = 40 }: { count?: number }) {
  const sparks = useMemo(() =>
    Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
      opacity: Math.random() * 0.6 + 0.2,
    })), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparks.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-orange-400 ember"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 6px 1px rgba(255, 165, 0, 0.7)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Hook: scroll fade-up ────────────────────────────────────────────────────
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Pill / chip ─────────────────────────────────────────────────────────────
function Pill({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-950/40 border border-orange-700/40 text-orange-300 text-sm font-golos backdrop-blur-sm">
      <Icon name={icon} fallback="Flame" size={14} className="text-orange-400" />
      {children}
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "nav-blur" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center glow-orange">
            <Icon name="Bot" fallback="Box" size={20} className="text-white" />
          </div>
          <span className="font-montserrat font-extrabold text-white text-xl tracking-tight">Ботопечь</span>
        </a>
        <a href="#contact"
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium font-golos hover:opacity-90 transition-all hover:scale-[1.03] glow-orange">
          Связаться
        </a>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg overflow-hidden">
      <Embers count={50} />

      {/* Glow ellipse */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,140,0,0.18) 0%, rgba(255,90,0,0.05) 35%, transparent 70%)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 text-center">
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Pill icon="Flame">Выпекаем digital-решения</Pill>
        </div>

        <h1 className="font-montserrat font-black text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-white mt-8 animate-fade-in"
          style={{ animationDelay: "0.25s" }}>
          Свежие боты<br />
          <span className="text-gradient-fire">прямо из печи</span>
        </h1>

        <p className="mt-8 text-white/65 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-golos animate-fade-in"
          style={{ animationDelay: "0.4s" }}>
          Создаём горячие чат-боты и сайты-визитки с жаром и вниманием к деталям.
          Каждый проект — как свежая выпечка: с душой и по рецепту успеха
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.55s" }}>
          <a href="#contact"
            className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-7 py-4 rounded-2xl font-medium font-golos hover:opacity-95 transition-all hover:scale-[1.03] glow-orange-strong flex items-center gap-2">
            Заказать проект
            <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#cases"
            className="bg-white/5 border border-white/10 text-white px-7 py-4 rounded-2xl font-medium font-golos hover:bg-white/10 transition-all">
            Наши работы
          </a>
        </div>
      </div>

      {/* Glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(255,90,0,0.18) 0%, transparent 70%)" }} />
    </section>
  );
}

// ─── CHTO VYPEKAEM (Что выпекаем) ────────────────────────────────────────────
function WhatWeBake() {
  const ref = useFadeUp();

  const items = [
    {
      icon: "MessageCircle",
      tag: "Горячая новинка",
      title: "Чат-боты на заказ",
      desc: "Разрабатываем интеллектуальных ботов для Telegram, WhatsApp и других мессенджеров. Каждый бот выпекается с вниманием к деталям и тестируется до идеала.",
      bullets: ["Автоматизация продаж 24/7", "Умная обработка запросов", "Интеграция с вашими системами"],
    },
    {
      icon: "Globe",
      tag: "Проверенный рецепт",
      title: "Сайты-визитки",
      desc: "Создаем свежие, ароматные сайты-визитки для вашего бизнеса. Современный дизайн, быстрая загрузка и адаптация под все устройства — наш фирменный рецепт.",
      bullets: ["Уникальный дизайн под вас", "Готово за 3-5 дней", "SEO и быстрая загрузка"],
    },
  ];

  return (
    <section id="services" ref={ref} className="fade-up relative py-28 px-6">
      <Embers count={20} />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-white mb-4">Что выпекаем</h2>
          <p className="text-white/45 font-golos text-lg">Наши фирменные рецепты</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <div key={i} className="bake-card relative rounded-3xl p-8 md:p-10 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-8 glow-orange shadow-lg shadow-orange-900/40">
                <Icon name={it.icon} fallback="Star" size={28} className="text-white" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/50 border border-orange-700/40 text-orange-300 text-xs font-golos mb-5">
                <Icon name="Flame" size={11} className="text-orange-400" />
                {it.tag}
              </div>

              <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-4">{it.title}</h3>
              <p className="text-white/60 font-golos leading-relaxed mb-6">{it.desc}</p>

              <ul className="space-y-3">
                {it.bullets.map((b, j) => (
                  <li key={j} className="flex items-center gap-3 text-white/85 font-golos">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RECIPE OF SUCCESS (Рецепт успеха) ───────────────────────────────────────
function RecipeOfSuccess() {
  const ref = useFadeUp();
  const items = [
    { icon: "Flame", title: "Горячая подача", desc: "Запуск проекта от 3-х дней — пока свежий!" },
    { icon: "Sparkles", title: "Отборные ингредиенты", desc: "Только современные технологии и лучшие практики" },
    { icon: "ChefHat", title: "Мастер у плиты", desc: "Поддержка и сопровождение — вы не останетесь голодными" },
  ];

  return (
    <section id="recipe" ref={ref} className="fade-up relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bake-card relative rounded-3xl p-10 md:p-16 overflow-hidden">
          <Embers count={18} />

          <div className="relative text-center mb-14">
            <Pill icon="ChefHat">Наши секреты</Pill>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-white mt-6">Рецепт успеха</h2>
          </div>

          <div className="relative grid md:grid-cols-3 gap-10">
            {items.map((it, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-700/40 to-orange-900/20 border border-orange-600/30 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-900/30">
                  <Icon name={it.icon} fallback="Star" size={32} className="text-orange-400" />
                </div>
                <h3 className="font-montserrat font-bold text-xl text-white mb-3">{it.title}</h3>
                <p className="text-white/55 font-golos leading-relaxed max-w-xs mx-auto">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CASES (Наши работы) ─────────────────────────────────────────────────────
function Cases() {
  const ref = useFadeUp();
  const cases = [
    { emoji: "🍕", tag: "Сайт + Бот", title: "Доставка пиццы", result: "Заявок через сайт выросло на 40%" },
    { emoji: "💆", tag: "Сайт-визитка", title: "Студия массажа", result: "Записи через сайт с первой недели" },
    { emoji: "🏋️", tag: "Чат-бот", title: "Фитнес-клуб", result: "Бот обрабатывает 80% вопросов" },
    { emoji: "🏪", tag: "Сайт + Бот", title: "Магазин одежды", result: "Продажи выросли на 25%" },
    { emoji: "💇", tag: "Сайт-визитка", title: "Барбершоп", result: "100% записей онлайн" },
    { emoji: "🚗", tag: "Чат-бот", title: "Автосервис", result: "Нет пропущенных заявок" },
  ];

  return (
    <section id="cases" ref={ref} className="fade-up relative py-28 px-6">
      <Embers count={15} />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <Pill icon="Award">Витрина пекарни</Pill>
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-white mt-6 mb-4">Наши работы</h2>
          <p className="text-white/45 font-golos text-lg">Свежая выпечка для довольных клиентов</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <div key={i} className="bake-card rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="text-4xl mb-4">{c.emoji}</div>
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-golos mb-3">
                {c.tag}
              </div>
              <h3 className="font-montserrat font-bold text-white text-lg mb-2">{c.title}</h3>
              <p className="text-white/50 text-sm font-golos">{c.result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
function Pricing() {
  const ref = useFadeUp();
  const plans = [
    {
      name: "Закуска",
      price: "от 15 000 ₽",
      desc: "Сайт-визитка под ключ",
      features: ["Дизайн-макет", "Адаптивная вёрстка", "1 месяц хостинга", "SEO-настройка", "Форма обратной связи"],
    },
    {
      name: "Горячее",
      price: "от 12 000 ₽",
      desc: "Чат-бот для мессенджеров",
      features: ["Сценарии диалогов", "Приём заявок", "Уведомления", "Интеграции", "1 месяц поддержки"],
      popular: true,
    },
    {
      name: "Комплексный обед",
      price: "от 24 000 ₽",
      desc: "Сайт + бот в едином стиле",
      features: ["Всё из двух тарифов", "Единый стиль", "Приоритет в работе", "2 месяца поддержки", "Бесплатные правки"],
    },
  ];

  return (
    <section id="pricing" ref={ref} className="fade-up relative py-28 px-6">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <Pill icon="Tag">Меню заведения</Pill>
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-white mt-6 mb-4">Выбирайте по вкусу</h2>
          <p className="text-white/45 font-golos text-lg">Фиксированная цена — никаких скрытых ингредиентов</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div key={i} className={`bake-card relative rounded-3xl p-8 flex flex-col ${p.popular ? "bake-card-hot" : ""}`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-4 py-1 rounded-full font-medium font-golos shadow-lg shadow-orange-900/40">
                  Хит меню
                </div>
              )}
              <h3 className="font-montserrat font-bold text-white text-xl mb-1">{p.name}</h3>
              <p className="text-white/45 text-sm font-golos mb-6">{p.desc}</p>
              <div className="font-montserrat font-black text-3xl text-white mb-7">{p.price}</div>

              <ul className="space-y-2.5 flex-1 mb-7">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-white/65 text-sm font-golos">
                    <Icon name="Check" size={15} className="text-orange-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#contact"
                className={`text-center py-3 rounded-xl text-sm font-medium font-golos transition-all ${p.popular
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:opacity-90 glow-orange"
                  : "bg-white/5 border border-white/10 text-white hover:bg-white/10"}`}>
                Заказать
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQ() {
  const ref = useFadeUp();
  const [open, setOpen] = useState<number | null>(0);

  const items = [
    { q: "Сколько времени занимает разработка?", a: "Сайт-визитку выпекаем за 3-5 рабочих дней. Чат-бот — от 3 до 7 дней в зависимости от сложности рецепта." },
    { q: "Нужно ли мне разбираться в технологиях?", a: "Нет. Мы берём на себя всё: дизайн, разработку, размещение, настройку. Вам нужно только рассказать о своём бизнесе." },
    { q: "Что включает поддержка после запуска?", a: "В течение включённого периода правим тексты, добавляем блоки, исправляем баги. Дальше — по договорённости." },
    { q: "Как происходит оплата?", a: "Предоплата 50% при старте, остаток — при сдаче. Принимаем карты, перевод по реквизитам, оплату для ИП/ООО." },
    { q: "Можете доработать существующий сайт или бота?", a: "Да, берёмся за доработку и улучшение чужих проектов. Напишите — обсудим." },
  ];

  return (
    <section id="faq" ref={ref} className="fade-up relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Pill icon="HelpCircle">Часто спрашивают</Pill>
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-white mt-6">Вопросы о пекарне</h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="bake-card rounded-2xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="font-golos text-white font-medium pr-4">{item.q}</span>
                <Icon name={open === i ? "Minus" : "Plus"} size={20} className="text-orange-400 shrink-0" />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-white/60 font-golos leading-relaxed border-t border-orange-700/20 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useFadeUp();
  return (
    <section id="contact" ref={ref} className="fade-up relative py-28 px-6">
      <Embers count={30} />

      <div className="relative max-w-3xl mx-auto text-center">
        <Pill icon="Flame">Печь разогрета</Pill>

        <h2 className="font-montserrat font-black text-4xl md:text-6xl text-white mt-8 leading-tight">
          Закажите свой проект
        </h2>

        <p className="mt-6 text-white/65 text-lg font-golos max-w-xl mx-auto leading-relaxed">
          Получите бесплатную консультацию и узнайте, как мы можем помочь вашему бизнесу
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a href="mailto:info@botopech.ru"
            className="group flex items-center gap-3 bg-orange-950/30 border border-orange-700/40 px-6 py-3.5 rounded-2xl font-golos text-white hover:bg-orange-950/50 hover:border-orange-500/60 transition-all">
            <Icon name="Mail" size={18} className="text-orange-400" />
            info@botopech.ru
          </a>
          <a href="tel:+79999999999"
            className="group flex items-center gap-3 bg-orange-950/30 border border-orange-700/40 px-6 py-3.5 rounded-2xl font-golos text-white hover:bg-orange-950/50 hover:border-orange-500/60 transition-all">
            <Icon name="Phone" size={18} className="text-orange-400" />
            +7 (999) 999-99-99
          </a>
        </div>

        <p className="mt-8 text-white/35 text-sm font-golos">Работаем по всей России</p>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-orange-900/20">
      <div className="max-w-7xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center glow-orange">
            <Icon name="Bot" fallback="Box" size={20} className="text-white" />
          </div>
          <span className="font-montserrat font-extrabold text-white text-xl">Ботопечь</span>
        </div>
        <p className="text-white/45 text-sm font-golos">Выпекаем digital-решения с 2024 года</p>
        <p className="text-white/25 text-xs font-golos">© 2026 Все права защищены</p>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div className="min-h-screen bg-[#0a0a14] font-golos relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhatWeBake />
      <RecipeOfSuccess />
      <Cases />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
