import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/680e3020-2135-4a71-85ad-9ee4903bce61/files/e942d5d9-f7ff-40ff-9799-a3aa5e2d2212.jpg";

// ─── Scroll-triggered fade-up hook ───────────────────────────────────────────
function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Reusable Section Wrapper ─────────────────────────────────────────────────
function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  const ref = useFadeUp();
  return (
    <section id={id} ref={ref} className={`fade-up py-20 md:py-28 ${className || ""}`}>
      {children}
    </section>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Услуги", href: "#services" },
    { label: "Как работаем", href: "#process" },
    { label: "Тарифы", href: "#pricing" },
    { label: "Кейсы", href: "#cases" },
    { label: "О нас", href: "#about" },
    { label: "Контакты", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-blur" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center glow-orange">
            <span className="text-white font-bold text-sm font-montserrat">Б</span>
          </div>
          <span className="font-montserrat font-700 text-white text-lg tracking-tight">
            Ботопечь
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-golos">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a href="#contact"
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium font-golos hover:opacity-90 transition-opacity glow-orange">
            Обсудить проект
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/80">
          <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden nav-blur border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className="text-white/70 hover:text-white text-base font-golos transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium text-center mt-2">
            Обсудить проект
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <div className="relative min-h-screen flex items-center hero-bg overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c0e14]/60 to-[#0c0e14]" />
      </div>

      {/* Decorative orbs */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-blue-400/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6 animate-fade-in" style={{animationDelay: "0.1s"}}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 pulse-dot" />
            <span className="text-orange-300 text-xs font-medium font-golos">Разработка сайтов и чат-ботов</span>
          </div>

          <h1 className="font-montserrat font-black text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white mb-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
            Ваш бизнес —<br />
            <span className="text-gradient-orange">в сети за 7 дней</span>
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md font-golos animate-fade-in" style={{animationDelay: "0.35s"}}>
            Создаём сайты-визитки и чат-боты под ключ. Дизайн, разработка и запуск — всё включено.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: "0.5s"}}>
            <a href="#contact"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-7 py-3.5 rounded-xl font-medium font-golos hover:opacity-90 transition-all hover:scale-[1.02] glow-orange">
              Заказать проект
            </a>
            <a href="#services"
              className="bg-white/6 border border-white/10 text-white px-7 py-3.5 rounded-xl font-medium font-golos hover:bg-white/10 transition-all flex items-center gap-2">
              Наши услуги
              <Icon name="ArrowDown" size={16} />
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 animate-fade-in" style={{animationDelay: "0.65s"}}>
            {[
              { num: "50+", label: "проектов" },
              { num: "7 дней", label: "средний срок" },
              { num: "100%", label: "клиентов довольны" },
            ].map(s => (
              <div key={s.num}>
                <div className="font-montserrat font-black text-2xl text-orange-400">{s.num}</div>
                <div className="text-white/45 text-xs mt-0.5 font-golos">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — floating chat bubble mockup */}
        <div className="hidden md:flex justify-center items-center animate-float">
          <div className="relative">
            <div className="w-72 h-72 rounded-3xl card-glass border border-white/10 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-base">🤖</span>
                </div>
                <div>
                  <div className="text-white text-sm font-medium font-golos">Ботопечь</div>
                  <div className="text-white/40 text-xs font-golos flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot inline-block" />
                    онлайн
                  </div>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="bg-orange-500/15 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-white/80 text-sm font-golos max-w-[80%]">
                  Привет! Хочу заказать сайт 👋
                </div>
                <div className="bg-white/5 rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-white/80 text-sm font-golos max-w-[80%] ml-auto">
                  Отлично! Расскажите подробнее о вашем бизнесе
                </div>
                <div className="bg-orange-500/15 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-white/80 text-sm font-golos max-w-[80%]">
                  Кафе в центре Москвы 🍕
                </div>
              </div>
              <div className="mt-auto flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
                <span className="text-white/30 text-xs font-golos flex-1">Написать...</span>
                <Icon name="Send" size={14} className="text-orange-400" />
              </div>
            </div>
            {/* Badge */}
            <div className="absolute -bottom-4 -right-4 card-glass border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-2">
              <Icon name="Zap" size={16} className="text-orange-400" />
              <span className="text-white text-sm font-golos">Запуск за 7 дней</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/30 text-xs font-golos">листайте вниз</span>
        <Icon name="ChevronDown" size={18} className="text-white/30" />
      </div>
    </div>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      icon: "Globe",
      title: "Сайт-визитка",
      desc: "Стильный одностраничный сайт, который представит ваш бизнес клиентам 24/7. Адаптивный дизайн, SEO-оптимизация.",
      features: ["Дизайн под ключ", "Адаптивная вёрстка", "SEO-базис", "Домен и хостинг"],
      accent: "orange",
    },
    {
      icon: "MessageSquare",
      title: "Чат-бот",
      desc: "Автоматизируйте приём заявок и консультации. Бот работает круглосуточно в Telegram и на вашем сайте.",
      features: ["Telegram & сайт", "Приём заявок", "FAQ-автоответы", "Интеграция с CRM"],
      accent: "blue",
    },
    {
      icon: "Package",
      title: "Сайт + Бот",
      desc: "Полный пакет: профессиональный сайт и умный чат-бот, которые работают вместе и приносят клиентов.",
      features: ["Всё из двух тарифов", "Единая система", "Приоритетная поддержка", "Бесплатные правки 30 дней"],
      accent: "orange",
      popular: true,
    },
  ];

  return (
    <Section id="services" className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-golos mb-4">
          <Icon name="Layers" size={12} />
          Что мы делаем
        </div>
        <h2 className="font-montserrat font-black text-3xl md:text-4xl text-white mb-4">
          Наши услуги
        </h2>
        <p className="text-white/50 max-w-lg mx-auto font-golos">
          Всё что нужно для присутствия вашего бизнеса в интернете
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div key={i}
            className={`relative card-glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group ${s.popular ? "border-orange-500/30 ring-1 ring-orange-500/20" : ""}`}>
            {s.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-4 py-1 rounded-full font-medium font-golos">
                Популярный выбор
              </div>
            )}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${s.accent === "orange" ? "bg-orange-500/15" : "bg-blue-400/15"}`}>
              <Icon name={s.icon} fallback="Star" size={22} className={s.accent === "orange" ? "text-orange-400" : "text-blue-400"} />
            </div>
            <h3 className="font-montserrat font-bold text-xl text-white mb-3">{s.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed font-golos mb-5">{s.desc}</p>
            <ul className="space-y-2">
              {s.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-white/70 text-sm font-golos">
                  <Icon name="Check" size={14} className="text-orange-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className={`mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium font-golos transition-all
              ${s.popular
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:opacity-90"
                : "bg-white/6 border border-white/10 text-white hover:bg-white/10"}`}>
              Заказать
              <Icon name="ArrowRight" size={14} />
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── HOW WE WORK ──────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { num: "01", title: "Бриф", desc: "Обсуждаем задачу, цели и аудиторию. Фиксируем требования — всё прозрачно." },
    { num: "02", title: "Дизайн", desc: "Готовим макет в фирменном стиле. Согласуем с вами до начала разработки." },
    { num: "03", title: "Разработка", desc: "Пишем код, настраиваем бота или сайт. Вы видите прогресс на каждом этапе." },
    { num: "04", title: "Запуск", desc: "Размещаем на хостинге, подключаем домен. Сдаём работу и проводим обучение." },
  ];

  return (
    <Section id="process" className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-golos mb-4">
          <Icon name="GitBranch" size={12} />
          Процесс
        </div>
        <h2 className="font-montserrat font-black text-3xl md:text-4xl text-white mb-4">
          Как мы работаем
        </h2>
        <p className="text-white/50 max-w-lg mx-auto font-golos">
          Чёткий процесс от идеи до запуска — без сюрпризов
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 relative">
        {/* Connector line */}
        <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

        {steps.map((s, i) => (
          <div key={i} className="text-center relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 border border-orange-500/20 flex items-center justify-center mx-auto mb-5 relative z-10">
              <span className="font-montserrat font-black text-2xl text-orange-400">{s.num}</span>
            </div>
            <h3 className="font-montserrat font-bold text-white text-lg mb-2">{s.title}</h3>
            <p className="text-white/45 text-sm font-golos leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────────
function Pricing() {
  const plans = [
    {
      name: "Сайт-визитка",
      price: "от 15 000 ₽",
      period: "под ключ",
      desc: "Одностраничный сайт для представления бизнеса",
      features: ["Дизайн-макет", "Адаптивная вёрстка", "1 месяц хостинга", "SEO-настройка", "Форма обратной связи"],
      cta: "Заказать сайт",
    },
    {
      name: "Чат-бот",
      price: "от 12 000 ₽",
      period: "под ключ",
      desc: "Умный бот для Telegram или вашего сайта",
      features: ["Сценарии диалогов", "Приём заявок", "Уведомления", "Интеграции", "1 месяц поддержки"],
      cta: "Заказать бота",
      popular: true,
    },
    {
      name: "Всё включено",
      price: "от 24 000 ₽",
      period: "под ключ",
      desc: "Сайт + бот в единой экосистеме",
      features: ["Всё из двух тарифов", "Единый стиль", "Приоритет в работе", "2 месяца поддержки", "Бесплатные правки"],
      cta: "Заказать пакет",
    },
  ];

  return (
    <Section id="pricing" className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-golos mb-4">
          <Icon name="Tag" size={12} />
          Стоимость
        </div>
        <h2 className="font-montserrat font-black text-3xl md:text-4xl text-white mb-4">
          Тарифы
        </h2>
        <p className="text-white/50 max-w-lg mx-auto font-golos">
          Фиксированная цена — никаких скрытых платежей
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <div key={i} className={`relative card-glass rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${p.popular ? "border-orange-500/30 ring-1 ring-orange-500/20" : ""}`}>
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-4 py-1 rounded-full font-golos font-medium">
                Хит продаж
              </div>
            )}
            <div className="mb-6">
              <h3 className="font-montserrat font-bold text-white text-xl mb-1">{p.name}</h3>
              <p className="text-white/40 text-sm font-golos">{p.desc}</p>
            </div>
            <div className="mb-6">
              <div className="font-montserrat font-black text-3xl text-white">{p.price}</div>
              <div className="text-white/40 text-xs font-golos mt-1">{p.period}</div>
            </div>
            <ul className="space-y-2.5 flex-1 mb-7">
              {p.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2.5 text-sm text-white/65 font-golos">
                  <Icon name="CheckCircle2" size={15} className="text-orange-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact"
              className={`w-full text-center py-3 rounded-xl text-sm font-medium font-golos transition-all ${p.popular
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:opacity-90 glow-orange"
                : "bg-white/6 border border-white/10 text-white hover:bg-white/10"}`}>
              {p.cta}
            </a>
          </div>
        ))}
      </div>

      <p className="text-center text-white/30 text-sm font-golos mt-8">
        Нужен индивидуальный расчёт? <a href="#contact" className="text-orange-400 hover:underline">Напишите нам</a>
      </p>
    </Section>
  );
}

// ─── CASES ────────────────────────────────────────────────────────────────────
function Cases() {
  const cases = [
    { emoji: "🍕", title: "Доставка пиццы", tag: "Сайт + Бот", result: "Заявок через сайт выросло на 40%" },
    { emoji: "💆", title: "Студия массажа", tag: "Сайт-визитка", result: "Записи через сайт с первой недели" },
    { emoji: "🏋️", title: "Фитнес-клуб", tag: "Чат-бот", result: "Бот обрабатывает 80% вопросов" },
    { emoji: "🏪", title: "Магазин одежды", tag: "Сайт + Бот", result: "Продажи выросли на 25% за месяц" },
    { emoji: "💇", title: "Барбершоп", tag: "Сайт-визитка", result: "100% записей онлайн" },
    { emoji: "🚗", title: "Автосервис", tag: "Чат-бот", result: "Нет пропущенных заявок" },
  ];

  return (
    <Section id="cases" className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-golos mb-4">
          <Icon name="TrendingUp" size={12} />
          Портфолио
        </div>
        <h2 className="font-montserrat font-black text-3xl md:text-4xl text-white mb-4">
          Наши кейсы
        </h2>
        <p className="text-white/50 max-w-lg mx-auto font-golos">
          Реальные результаты для реального бизнеса
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cases.map((c, i) => (
          <div key={i} className="card-glass rounded-2xl p-5 group hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div className="text-3xl mb-4">{c.emoji}</div>
            <div className="inline-block px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-300 text-xs font-golos mb-2">
              {c.tag}
            </div>
            <h3 className="font-montserrat font-bold text-white text-base mb-2">{c.title}</h3>
            <p className="text-white/45 text-sm font-golos leading-snug">{c.result}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const values = [
    { icon: "Clock", title: "Точно в срок", desc: "Соблюдаем дедлайны — сдаём в оговоренный день" },
    { icon: "MessageCircle", title: "На связи 24/7", desc: "Отвечаем быстро, держим в курсе каждого этапа" },
    { icon: "Shield", title: "Гарантия качества", desc: "Правки и поддержка после запуска входят в цену" },
    { icon: "Sparkles", title: "Авторский дизайн", desc: "Ни одного шаблона — только уникальные решения" },
  ];

  return (
    <Section id="about" className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-golos mb-5">
            <Icon name="Users" size={12} />
            О нас
          </div>
          <h2 className="font-montserrat font-black text-3xl md:text-4xl text-white mb-5 leading-tight">
            Команда,<br />
            <span className="text-gradient-orange">которой можно доверять</span>
          </h2>
          <p className="text-white/55 font-golos leading-relaxed mb-5">
            Ботопечь — это небольшая команда разработчиков и дизайнеров, которые делают сайты и ботов
            для малого бизнеса. Мы не работаем с корпорациями — наш фокус это небольшие компании
            и предприниматели, кому нужен результат быстро и без лишней бюрократии.
          </p>
          <p className="text-white/55 font-golos leading-relaxed">
            За каждым проектом стоит реальный специалист, который вникает в ваш бизнес и делает
            так, чтобы сайт или бот приносил клиентов, а не просто красиво выглядел.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {values.map((v, i) => (
            <div key={i} className="card-glass rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center mb-3">
                <Icon name={v.icon} fallback="Star" size={18} className="text-orange-400" />
              </div>
              <h4 className="font-montserrat font-bold text-white text-sm mb-1.5">{v.title}</h4>
              <p className="text-white/40 text-xs font-golos leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const items = [
    { q: "Сколько времени занимает разработка?", a: "Сайт-визитку мы делаем за 5–7 рабочих дней. Чат-бот — от 3 до 7 дней в зависимости от сложности сценариев." },
    { q: "Нужно ли мне разбираться в технологиях?", a: "Нет. Мы берём на себя всё: дизайн, разработку, размещение, настройку. Вам нужно только рассказать о своём бизнесе." },
    { q: "Могу ли я сам редактировать сайт после запуска?", a: "Да, мы передаём доступы и обучаем работе с сайтом. Также можно написать нам — мы внесём правки." },
    { q: "Что входит в поддержку?", a: "В течение включённого периода мы правим тексты, добавляем блоки, исправляем баги. После — по договорённости." },
    { q: "Как происходит оплата?", a: "Предоплата 50% при старте, остаток — при сдаче. Принимаем карты, перевод по реквизитам, оплату для ИП/ООО." },
    { q: "Можете доработать существующий сайт или бота?", a: "Да, берёмся за доработку и улучшение существующих проектов. Напишите — обсудим." },
  ];

  return (
    <Section id="faq" className="max-w-3xl mx-auto px-6">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-golos mb-4">
          <Icon name="HelpCircle" size={12} />
          Вопросы
        </div>
        <h2 className="font-montserrat font-black text-3xl md:text-4xl text-white">
          Частые вопросы
        </h2>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="card-glass rounded-2xl overflow-hidden transition-all duration-200">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left">
              <span className="font-golos text-white font-medium text-sm md:text-base pr-4">{item.q}</span>
              <Icon name={open === i ? "Minus" : "Plus"} size={18} className="text-orange-400 shrink-0" />
            </button>
            {open === i && (
              <div className="px-6 pb-5 text-white/55 text-sm font-golos leading-relaxed border-t border-white/5 pt-4">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Section id="contact" className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-golos mb-5">
            <Icon name="Mail" size={12} />
            Контакты
          </div>
          <h2 className="font-montserrat font-black text-3xl md:text-4xl text-white mb-5 leading-tight">
            Готовы обсудить<br />
            <span className="text-gradient-orange">ваш проект?</span>
          </h2>
          <p className="text-white/55 font-golos mb-8 leading-relaxed">
            Напишите нам — ответим в течение 30 минут и предложим решение под ваши задачи и бюджет.
          </p>

          <div className="space-y-4">
            {[
              { icon: "MessageCircle", label: "Telegram", value: "@botopech", href: "https://t.me/botopech" },
              { icon: "Phone", label: "Телефон", value: "+7 (999) 000-00-00", href: "tel:+79990000000" },
              { icon: "Mail", label: "Email", value: "hello@botopech.ru", href: "mailto:hello@botopech.ru" },
            ].map((c, i) => (
              <a key={i} href={c.href}
                className="flex items-center gap-4 p-4 card-glass rounded-xl hover:-translate-y-0.5 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                  <Icon name={c.icon} fallback="Star" size={18} className="text-orange-400" />
                </div>
                <div>
                  <div className="text-white/40 text-xs font-golos">{c.label}</div>
                  <div className="text-white text-sm font-medium font-golos group-hover:text-orange-300 transition-colors">{c.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="card-glass rounded-2xl p-7">
          {sent ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-orange-500/15 flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle2" size={28} className="text-orange-400" />
              </div>
              <h3 className="font-montserrat font-bold text-white text-xl mb-2">Заявка отправлена!</h3>
              <p className="text-white/50 font-golos text-sm">Мы свяжемся с вами в течение 30 минут</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-montserrat font-bold text-white text-xl mb-5">Оставить заявку</h3>
              <div>
                <label className="block text-white/50 text-xs font-golos mb-1.5">Ваше имя</label>
                <input
                  type="text" required placeholder="Иван Иванов"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm font-golos focus:outline-none focus:border-orange-500/50 transition-colors" />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-golos mb-1.5">Телефон или Telegram</label>
                <input
                  type="text" required placeholder="+7 999 000 00 00"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm font-golos focus:outline-none focus:border-orange-500/50 transition-colors" />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-golos mb-1.5">Расскажите о проекте</label>
                <textarea
                  rows={4} placeholder="Чем занимается ваш бизнес и что хотите получить..."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm font-golos focus:outline-none focus:border-orange-500/50 transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-xl font-medium font-golos hover:opacity-90 transition-all hover:scale-[1.01] glow-orange">
                Отправить заявку
              </button>
              <p className="text-white/25 text-xs font-golos text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs font-montserrat">Б</span>
          </div>
          <span className="font-montserrat font-bold text-white text-base">Ботопечь</span>
        </div>
        <p className="text-white/30 text-sm font-golos">
          © 2024 Ботопечь — разработка сайтов и чат-ботов
        </p>
        <div className="flex items-center gap-5">
          <a href="https://t.me/botopech" className="text-white/35 hover:text-white/70 transition-colors">
            <Icon name="Send" size={18} />
          </a>
          <a href="#" className="text-white/35 hover:text-white/70 transition-colors text-xs font-golos">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div className="min-h-screen bg-[#0c0e14] font-golos">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Pricing />
      <Cases />
      <About />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}