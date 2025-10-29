import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

const copy = {
  brand: "EDECOSMILE",
  slogan: "Lo natural empieza en tú sonrisa",
  cta: "Empieza ahora",
  nav: [
    { label: "PROFESIONALES", to: "/profesionales" },
    { label: "PRODUCTOS", to: "/departamentos/productos" },
    { label: "VÍDEOS", to: "/departamentos/videos" },
    { label: "ARTÍCULOS", to: "/departamentos/articulos" },
    { label: "DESMINTIENDO MITOS", to: "/departamentos/desmintiendo-mitos" },
    { label: "PROFESIONALES", to: "/departamentos/profesionales" },
    { label: "RESEÑAS", to: "/resenas" },
    { label: "PROYECTO SOSTENIBLE", to: "/proyecto-sostenible" },
  ],
};

// este array lo seguimos usando para el submenú interno de /departamentos/*
const deptNav = [
  { label: "PROFESIONALES",               to: "/departamentos/rofesionales" },
  { label: "DESMINTIENDO MITOS",          to: "/departamentos/desmintiendo-mitos" },
  { label: "PRODUCTOS",                   to: "/departamentos/productos" },
  { label: "ARTÍCULOS",                   to: "/departamentos/articulos" },
  { label: "VÍDEOS",                      to: "/departamentos/videos" },
];

const data = {
  reviews: [
    {
      name: "Alexa Young, CA",
      text:
        "No sabía con certeza cómo usar el hilo dental apropiadamente y siempre lo ignoraba. Con Edocosmile aprendí a hacerlo correctamente, comprendiendo cuáles espacios limpiar, con qué frecuencia y por qué. Y también me explicaron que utilizar hilo no es un castigo, sino una parte de la rutina higiénica. Mi dentista se dio cuenta en mi última revisión que ahora lo hago cada noche. Me gusta que haya vídeos, desmitifiquen cosas antiguas y cuente con apoyo profesional cuando tengo dudas.",
      stars: 5,
    },
    { name: "María G.", text: "Trato excelente y resultados naturales.", stars: 5 },
    { name: "Carlos R.", text: "Muy profesionales, explican cada paso.", stars: 5 },
    { name: "Lucía P.", text: "Volveré sin duda.", stars: 4 },
  ],
  productos: [
    { name: "Pasta Vitis Anticaries", img: "/media/fotos/productos/producto-01.jpg", url: "https://vitis.es/productos-vitis/colutorios/vitis-anticaries/" },
    { name: "Colutorio Vitis Ortodoncia", img: "/media/fotos/productos/producto-02.png", url: "https://vitis.es/productos-vitis/colutorios/vitis-orthodontic-colutorio/" },
    { name: "Colutorio Vitis Anticaries ", img: "/media/fotos/productos/producto-03.png", url: "https://vitis.es/productos-vitis/colutorios/vitis-anticaries-colutorio/" },
    { name: "Pasta dentrífrica Gingilacer", img: "/media/fotos/productos/producto-04.jpg", url: "https://www.nutritienda.com/es/lacer/gingilacer-pasta-dentifrica-200-ml/52678?gad_source=1&gad_campaignid=20274145903&gbraid=0AAAAADNFI0GWoo1cowbi_WOaYO2i5F29Q&gclid=CjwKCAjw04HIBhB8EiwA8jGNbXKeGnR7rfhyiJOvOsJPLAz41oIbgwNLq9X8wK5_V35TtuBB-He8OBoCJsoQAvD_BwE" },
    { name: "Colutorio reducción de sangrado Gingilacer", img: "/media/fotos/productos/producto-05.jpg", url: "https://www.boticas23.com/gingilacer-colutorio-500ml.htm?gad_source=1&gad_campaignid=21569285982&gbraid=0AAAAADLFCRsDhCcDc-mh3i4uaTwHbg4EM&gclid=CjwKCAjw04HIBhB8EiwA8jGNbSjuNJcPr946swEMfHASMDfQTTLTJVIOQTp0AvBf8mjS9vFpQGD-gBoCH8AQAvD_BwE" },
    { name: "Seda dental suave Vitis", img: "/media/fotos/productos/producto-06.jpg", url: "https://vitis.es/productos-vitis/cintas-y-sedas-dentales/seda-dental-suave/" },
    { name: "Pasta dental para dientes sensibles Sensodyne", img: "/media/fotos/productos/producto-07.jpg", url: "https://es.iherb.com/pr/sensodyne-fluoride-toothpaste-for-sensitive-teeth-mint-3-4-oz-96-4-g/94191?gad_campaignid=675868793&gad_source=1&gclid=CjwKCAjw04HIBhB8EiwA8jGNbfDWmxjWQvjAezBriUiu8H51F_jD3KjkukuphmJN0klLYcMb5kFaSxoCuv0QAvD_BwE&gclsrc=aw.ds" },
    { name: "Cepillo dental Sonic S10 Vitis", img: "/media/fotos/productos/producto-08.jpg", url: "https://vitis.es/productos-vitis/cepillos-dentales/vitis-sonic-s10/" },
    { name: "Raspador lingual", img: "/media/fotos/productos/producto-09.jpg", url: "https://www.amazon.es/Raspador-lingual-Curaprox-CTC-bordes/dp/B00KTDBBQ0/ref=asc_df_B00KTDBBQ0?mcid=b029a3adbb3439ee8f91cf57e4d3790c&tag=googshopes-21&linkCode=df0&hvadid=704474534293&hvpos=&hvnetw=g&hvrand=10491177349092746638&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9061036&hvtargid=pla-618965267687&hvocijid=10491177349092746638-B00KTDBBQ0-&hvexpln=0&th=1" },
    { name: "Pasta dental protección completa Parodontax", img: "/media/fotos/productos/producto-10.jpg", url: "https://es.iherb.com/pr/parodontax-daily-fluoride-anticavity-and-antigingivitis-toothpaste-complete-protection-pure-fresh-mint-3-4-oz-96-4-g/113210?gad_campaignid=23087078138&gad_source=1&gclid=CjwKCAjw04HIBhB8EiwA8jGNbRckGZFhDs1lIIXPjylEXR3_xUbFrAi5UWeFV-HV4uOfAh-10lyhSBoCoHMQAvD_BwE&gclsrc=aw.ds" },
    { name: "Cepillo de dientes para bebés y niños Curaprox", img: "/media/fotos/productos/producto-11.jpg", url: "hhttps://curaprox.es/cepillos-de-dientes/cepillos-de-dientes-para-bebes-y-ninos/cepillo-dental-baby-p665#/286-baby_toothbrush_colors-verde_verde" },
    { name: "Cepillos interdentales Curaprox", img: "/media/fotos/productos/producto-12.jpg", url: "https://curaprox.es/espacios-interdentales/cepillos-interdentales-especializados/juego-de-cepillos-interdentales-perio-start-tamano-405-5-uds-p701?utm_assetgroup=6544539532&utm_device=c&utm_loc_interest=&utm_loc_physical=9061036&utm_term=&utm_campaign=22099325265&utm_source=google&utm_medium=cpc&utm_content=&hsa_acc=4767268060&hsa_cam=22099325265&hsa_grp=&hsa_ad=&hsa_src=x&hsa_tgt=&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=22105605065&gbraid=0AAAAApJe5-gjozMhyeofv2Hw8RjI8W1qJ&gclid=CjwKCAjw04HIBhB8EiwA8jGNbfvrLCh4rcW_beWQJbAQ011ZcFFgCfXEEVqssXK5OpxpYA9P6sJ9RBoCSa4QAvD_BwE" },
  ],
  articulos: [
  {
    title: "Más que cepillarse: efecto de enjuagues + hilo dental en el control de placa",
    cover: "/media/fotos/articulos/portada1.png",
    excerpt:
      "Este estudio analiza cómo la combinación de cepillado manual, uso de hilo dental y enjuagues bucales (especialmente sin alcohol) mejora la eliminación de placa, la inflamación gingival y el sangrado comparado sólo con cepillado.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10837857/"
  },
  {
    title: "Microbioma de las encías: qué revelan los hábitos de higiene oral",
    cover: "/media/fotos/articulos/portada2.png",
    excerpt:
      "Esta investigación evalúa la relación entre los hábitos de higiene bucal (frecuencia, uso de hilo, sangrado) y la diversidad bacteriana gingival en adultos, ofreciendo nuevas perspectivas para adaptar las recomendaciones profesionales.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9542802/"
  },
  {
    title: "Salud bucal y envejecimiento: cambios en la flora oral con la edad",
    cover: "/media/fotos/articulos/portada3.png",
    excerpt:
      "El estudio examina cómo el envejecimiento influye en el equilibrio del microbioma oral y la salud de las encías, identificando los principales factores asociados al deterioro de la flora protectora y al aumento de bacterias patógenas.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3894074/"
  },
  {
    title: "¿Estás cepillando bien? Un estudio sobre técnica y efectividad del cepillado",
    cover: "/media/fotos/articulos/portada4.png",
    excerpt:
      "Una revisión que compara la eficacia de distintas técnicas de cepillado manual en la eliminación de placa y el cuidado gingival, destacando la importancia de la orientación profesional y la regularidad del cepillado.",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10327354/"
  }
],


  videos: [
  {
    title: "Cepillado adecuado",
    src: "/media/videos/cepillado-adecuado.mp4",
  },
  {
    title: "Errores a evitar después de la profilaxis",
    src: "/media/videos/errores-evitar-despues-profilaxis.mp4",
  },
  {
    title: "Implementos para una buena higiene bucodental",
    src: "/media/videos/implementos-higiene-bucodental.mp4",
  },
  {
    title: "Limpieza de prótesis",
    src: "/media/videos/limpieza-protesis.mp4",
  },
  {
    title: "Solución a dientes apiñados, desalineados o separados",
    src: "/media/videos/solucion-dientes-apinados-desalineados-separados.mp4",
  },
  {
    title: "Uso adecuado del irrigador",
    src: "/media/videos/uso-adecuado-irrigador.mp4",
  },
],

equipoPro: [
  {
    name: "Paula Villegas Pérez",
    img: "/media/fotos/equipo/paula.jpg",
  },
  {
    name: "Rocío Sánchez Rosario",
    img: "/media/fotos/equipo/rocio.jpg",
  },
  {
    name: "Alberto Pérez Romeo",
    img: "/media/fotos/equipo/alberto.jpg",
  },
  {
    name: "Lina Buchely Duque",
    img: "/media/fotos/equipo/lina.jpg",
  },
  {
    name: "Alejandra Agudo Romero ",
    img: "/media/fotos/equipo/alejandra.jpg",
  },
  {
    name: "Nicol Mejía Briones",
    img: "/media/fotos/equipo/nicol.jpg",
  },
],

};

/* ----------------- LAYOUT ----------------- */
function Layout({ children }) {
  return (
    <div className="site">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="container header-row">
        {/* Marca / logo */}
        <Link to="/" className="brand">
          <div className="brand-box">
            <img src="/LogoWeb.jpeg" alt="Edecosmile" />
          </div>
          <span className="brand-name">{copy.brand}</span>
        </Link>

        {/* Botón hamburguesa SOLO móvil */}
        <button
          className="burger"
          aria-label="Abrir menú"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Menú escritorio */}
        <nav className="main-nav desktop-nav">
          <ul>
            {copy.nav.map((item) => (
              <li key={item.label}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Menú móvil desplegable */}
      <nav className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <ul>
          {copy.nav.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}


function Footer() {
  return (
    <footer className="footer">
      <div className="container foot">
        <div className="brand foot-brand">
          <div className="brand-box small">
            <img src="/LogoWeb.jpeg" alt="logo" />
          </div>
          <span className="brand-name">{copy.brand}</span>
        </div>
        <div className="foot-right">
          <p>© {new Date().getFullYear()} {copy.brand}</p>
        </div>
      </div>
    </footer>
  );
}

/* ----------------- PAGES ----------------- */
function Home() {
  return (
    <>
      <section className="hero">
        <img src="/media/hero/hero.png" alt="hero" />
        <div className="overlay" />
        <div className="center-card">
          <h1>¡BIENVENIDOS!</h1>
          <p>{copy.slogan}</p>
          <Link to="/profesionales" className="btn primary">
            {copy.cta}
          </Link>
        </div>
        <div className="reserve">
          <Link to="/reservar" className="btn pill">
            Reservar ahora
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Sobre nosotros</h2>
          <p>
            Bienvenidos a Edecosmile, somos una empresa con un objetivo claro:
            promover una salud bucodental óptima para toda la población.
            Creemos en la prevención, la educación y los hábitos responsables,
            con un foco especial en la sostenibilidad.
          </p>
          <div className="socials">
            <a href="#">Facebook</a> · <a href="#">Twitter</a> ·{" "}
            <a href="#">LinkedIn</a> · <a href="#">Instagram</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Instalaciones limpias y seguras.</h2>
          <p>Envía tu declaración de salud.</p>
        </div>
      </section>
    </>
  );
}

// opcional: deja la ruta /sobre-nosotros viva por si alguien entra directo
function SobreNosotros() {
  return (
    <Page title="Sobre nosotros">
      <p>
        Bienvenidos a Edecosmile, somos una empresa con un objetivo claro:
        promover una salud bucodental óptima para toda la población. Creemos
        en la prevención, la educación y los hábitos responsables, con un
        foco especial en la sostenibilidad.
      </p>
      <div className="socials">
        <a href="#">Facebook</a> · <a href="#">Twitter</a> ·{" "}
        <a href="#">LinkedIn</a> · <a href="#">Instagram</a>
      </div>
    </Page>
  );
}

function Profesionales() {
  return (
    <Page title="Contáctanos">
      <div className="grid two">
        <div>
          <h3>Ubicación</h3>
          <p>Av. Fray A. Alcalde 10, 44100 Guad., Jal., México</p>
          <p>Tel: +52-1-33-12345678 · Fax: +52-1-33-12345678</p>
          <p>info@misitio.com</p>
        </div>
        <form className="contact-form">
          <input placeholder="Nombre" />
          <input placeholder="Apellido" />
          <input placeholder="Email" />
          <input placeholder="Asunto" />
          <textarea rows={5} placeholder="Mensaje" />
          <button type="button" className="btn primary">
            Enviar
          </button>
        </form>
      </div>
    </Page>
  );
}

function ProyectoSostenible() {
  return (
    <section className="section proyecto-sostenible">
      <div className="container">
        <h2>Proyecto sostenible</h2>
        <div className="body">
          <p>
            Desde Edecosmile, estamos concienciados con el medio ambiente
            y tenemos en cuenta cumplir los objetivos de la agenda 2030; por ello
            nuestro crecimiento económico irá de la mano con la responsabilidad
            para generar un impacto positivo en el entorno.
          </p>
          <p>Nos esforzamos para reducir nuestra huella digital ayudándonos de:</p>
          <ul className="bullets">
            <li>La optimización del uso de recursos naturales.</li>
            <li>La gestión responsable de residuos y emisiones.</li>
            <li>La adopción de tecnologías limpias y eficientes.</li>
            <li>El fomento de la economía circular y el reciclaje.</li>
            <li>
              Promovemos un entorno laboral inclusivo, seguro y equitativo, y
              colaboramos con marcas locales para contribuir al desarrollo
              sostenible en nuestro entorno.
            </li>
          </ul>
        </div>
        <div className="reserve">
          <Link to="/reservar" className="btn pill">
            Reservar ahora
          </Link>
        </div>
      </div>
    </section>
  );
}

function Resenas() {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("reviews");
    return saved ? JSON.parse(saved) : data.reviews;
  });

  const addReview = (review) => {
    const newList = [...reviews, review];
    setReviews(newList);
    localStorage.setItem("reviews", JSON.stringify(newList));
  };

  return (
    <Page title="Reseñas" className="reseñas reviews">
      <ReviewsCarousel items={reviews} />
      <ReviewForm onAdd={addReview} />
    </Page>
  );
}

/* ---- Departamentos (con subnav interno) ---- */
function DeptLayout({ title, children }) {
  return (
    <section className="section">
      <div className="container">
        <h2>{title}</h2>
        {/* Quitado el submenú interno de departamentos */}
        <div className="body">{children}</div>
      </div>
    </section>
  );
}


function DeptContacto() {
  return (
    <DeptLayout title="Contacto con profesionales">
      {/* Bloque equipo */}
      <div className="equipo-grid">
        {data.equipoPro.map((p, idx) => (
          <div key={idx} className="card pro-card">
            <div className="pro-photo">
              <img src={p.img} alt={p.name} />
            </div>
            <div className="pro-info">
              <strong className="pro-name">{p.name}</strong>
              {p.role && (
                <div className="pro-role">{p.role}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Formulario de contacto */}
      <div className="contact-wrapper card">
        <p style={{ marginTop: 0 }}>
          ¿Eres profesional? Escríbenos para colaborar en contenidos, casos clínicos o charlas.
        </p>

        <form className="contact-form" style={{ maxWidth: 600 }}>
          <input placeholder="Nombre" />
          <input placeholder="Centro / Empresa" />
          <input placeholder="Email" />
          <textarea rows={5} placeholder="Propuesta" />
          <button className="btn primary" type="button">Enviar</button>
        </form>
      </div>
    </DeptLayout>
  );
}


function DeptMitos() {
  // lista de mitos y realidad
  const faqs = [
    {
      q: "El azúcar es la única causa de caries",
      a: `Aunque el azúcar es un gran contribuyente, las caries pueden formarse por la acción de cualquier tipo de carbohidrato.
Lo que realmente importa es cómo esos azúcares interactúan con las bacterias de la boca. Las bacterias transforman los azúcares en ácidos que atacan el esmalte. Por eso también importan la frecuencia de consumo y la higiene posterior.`,
    },
    {
      q: "Si no hay ningún problema visible con mis dientes, no tengo que ir al dentista",
      a: `Que tus dientes “se vean bien” no significa que todo esté sano. Muchas caries, problemas de encías e incluso infecciones empiezan sin dolor ni signos visibles.
Se recomienda una revisión y limpieza profesional al menos 2 veces al año para mantener la boca sana y prevenir problemas mayores.`,
    },
    {
      q: "Cepillarse las encías es malo",
      a: `Al contrario. Cepillar suavemente encías y lengua ayuda a eliminar placa bacteriana que, si se acumula, causa inflamación, sangrado y finalmente enfermedad periodontal.
Lo importante es hacerlo con la técnica correcta: movimiento suave, ángulo adecuado y nunca apretar demasiado. Cepillado + hilo dental alrededor del diente mantiene el tejido de la encía limpio y sano.`,
    },
    {
      q: "Los colutorios no manchan los dientes",
      a: `Depende. La mayoría de los enjuagues bucales de uso diario no manchan.
Pero algunos enjuagues con clorhexidina sí pueden provocar tinciones superficiales si se usan de forma prolongada o sin indicación profesional.
Conclusión: sigue siempre las pautas de tu dentista, sobre todo si estás usando colutorios “especiales”.`,
    },
    {
      q: "Los cepillos duros limpian mejor",
      a: `Peligroso. Un cepillo duro puede ser demasiado agresivo y causar retracción de encías, sensibilidad y desgaste del esmalte en el cuello del diente.
Un cepillo de cerdas suaves (o extra suaves) limpia igual de bien la placa si la técnica es correcta, y protege encías y esmalte.`,
    },
    {
      q: "La odontología no es importante durante el embarazo",
      a: `Totalmente falso. Durante el embarazo cambian las hormonas y puede aumentar el riesgo de inflamación de encías, sangrado y caries.
El cuidado dental durante el embarazo es importante y seguro: higiene diaria, control profesional y tratamiento si hace falta.
Cuidar la boca también forma parte del cuidado del embarazo.`,
    },
    {
      q: "Es normal perder dientes con la edad",
      a: `No. Perder dientes NO es “lo normal” del envejecimiento.
Generalmente se pierden por enfermedad de las encías, caries no tratadas o hábitos de higiene insuficientes.
Con buena higiene diaria y revisiones periódicas puedes conservar tus dientes sanos durante toda la vida.`,
    },
    {
      q: "El bicarbonato no hace daño a los dientes",
      a: `El bicarbonato se ha usado “para blanquear”, pero su uso casero y repetido puede desgastar el esmalte y aumentar la sensibilidad.
Si quieres aclarar el color de los dientes, la vía segura es hacerlo con un profesional. Evita la automedicación estética, porque puedes hacer daño real sin darte cuenta.`,
    },
    {
      q: "El blanqueamiento dental debilita los dientes",
      a: `Hecho correctamente por un profesional, el blanqueamiento no “adelgaza” ni “quema” el diente.
El objetivo es reducir manchas y recuperar un tono más limpio, no limar el esmalte. En clínicas de confianza se controla el producto, el tiempo y la sensibilidad.`,
    },
    {
      q: "Las limpiezas dentales dañan los dientes",
      a: `La limpieza profesional elimina placa y sarro que el cepillo no quita. No desgasta el esmalte.
Después de una limpieza, es posible notar algo de sensibilidad o encías más “despiertas”, pero eso no es daño: es una señal de que había inflamación previa y necesita controlarse, no una consecuencia negativa de la higiene.`,
    },
  ];

  return (
    <DeptLayout title="Desmintiendo mitos">
      <div className="mitos-intro card" style={{ padding: "20px", marginBottom: "24px" }}>
        <h3 style={{ marginTop: 0 }}>Mitos dentales que seguro que no sabías</h3>
        <p className="muted" style={{ marginBottom: "12px" }}>
          En Edecosmile  sabemos que una parte muy importante de la población española asegura tener miedo a su dentista. De hecho, hasta un 12%  de los adultos afirma ponerse nervioso antes de acudir a la visita de su dentista.
        </p>
        <p className="muted" style={{ marginBottom: "12px" }}>
          Con tanto estrés y ansiedad acumulados, no es de extrañar que a lo largo de los últimos años se hayan difundido algunos mitos falsos sobre la salud bucodental. 
        </p>
        <p className="muted" style={{ marginBottom: 0 }}>
          Cuando se trata de salud bucal, existen muchas creencias populares que, aunque parecen veraces, son simplemente mitos. Estos malentendidos pueden llevarnos a adoptar malos hábitos que afectan negativamente nuestros dientes y encías. En este departamento, desmentimos mitos dentales comunes para que sepas qué es realmente bueno para tu sonrisa.
        </p>
      </div>

      <div className="accordion">
        {faqs.map((f, i) => (
          <details key={i} className="faq-card">
            <summary className="faq-q">
              <span>{i + 1}. {f.q}</span>
              <span className="faq-icon">+</span>
            </summary>
            <div className="faq-a">
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </DeptLayout>
  );
}


function DeptProductos() {
  const items = Array.isArray(data?.productos) ? data.productos : [];
  return (
    <DeptLayout title="Productos">
      {items.length === 0 ? (
        <div className="muted">
          Aún no hay productos. Sube 12 fotos a <code>/public/media/fotos/productos/</code> con los nombres
          <code> producto-01.jpg … producto-12.jpg</code> y rellena los enlaces en <code>data.productos</code>.
        </div>
      ) : (
        <div className="grid products">
          {items.map((p, idx) => (
            <div key={p.name || idx} className="card product">
              <div className="thumb square">
                <img src={p.img} alt={p.name || `Producto ${idx + 1}`} />
              </div>
              <div className="p-12" style={{ textAlign: "center" }}>
                <h4 style={{ margin: "8px 0 4px" }}>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                      {p.name || `Producto ${idx + 1}`}
                    </a>
                  ) : (
                    p.name || `Producto ${idx + 1}`
                  )}
                </h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </DeptLayout>
  );
}

function DeptArticulos() {
  return (
    <DeptLayout title="Artículos">
      <div className="grid two">
        {data.articulos.map((a) => (
          <article key={a.title} className="card article">
            <div className="thumb">
              <img src={a.cover} alt={a.title} />
            </div>
            <div className="p-16">
              <h4>{a.title}</h4>
              <p className="muted">{a.excerpt}</p>

              {/* Botón que redirige al enlace */}
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{ marginTop: 8, display: "inline-block", textDecoration: "none" }}
              >
                Leer más
              </a>
            </div>
          </article>
        ))}
      </div>
    </DeptLayout>
  );
}


function DeptVideos() {
  return (
    <DeptLayout title="Vídeos">
      <p>
        Desde el equipo de Edecosmile compartimos material audiovisual con consejos
        claros y directos para el cuidado diario: cepillado, encías sanas, prótesis,
        irrigador y más.
      </p>

      <div className="grid videos-grid">
        {data.videos.map((v) => (
          <div key={v.title} className="card video">
            <div className="video-frame">
              <video
                src={v.src}
                controls
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  backgroundColor: "#000",
                  borderRadius: "12px 12px 0 0",
                }}
              />
            </div>
            <div style={{ padding: 12 }}>
              <strong
                style={{
                  color: "var(--ink)",
                  fontSize: "15px",
                  lineHeight: 1.4,
                  textAlign: "center",
                  display: "block",
                }}
              >
                {v.title}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </DeptLayout>
  );
}



/* ----------------- Shared components ----------------- */
function ReviewsCarousel({ items = [], auto = 5000 }) {
  const [i, setI] = useState(0);
  const go = (n) => setI((p) => (n + items.length) % items.length);
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  useEffect(() => {
    const t = setInterval(next, auto);
    return () => clearInterval(t);
  }, [i, auto]);

  const [touchStart, setTouchStart] = useState(null);
  const onTouchStart = (e) => setTouchStart(e.changedTouches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart == null) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    setTouchStart(null);
  };

  if (!items.length) return null;
  const it = items[i];

  return (
    <div className="carousel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button className="nav prev" aria-label="Anterior" onClick={prev}>‹</button>

      <div className="slide card">
        <blockquote>
          <p>“{it.text}”</p>
          <footer>— {it.name}</footer>
          <div className="stars">{"★".repeat(it.stars)}{"☆".repeat(5 - it.stars)}</div>
        </blockquote>
      </div>

      <button className="nav next" aria-label="Siguiente" onClick={next}>›</button>

      <div className="dots">
        {items.map((_, idx) => (
          <button
            key={idx}
            className={idx === i ? "dot active" : "dot"}
            onClick={() => go(idx)}
            aria-label={`Ir a la reseña ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewForm({ onAdd }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState(5);

  const handleSubmit = () => {
    if (!name || !text) return alert("Por favor, rellena todos los campos.");
    const newReview = { name, text, stars: Number(stars) || 5 };
    onAdd(newReview);
    setName("");
    setText("");
    setStars(5);
  };

  return (
    <div className="card" style={{ marginTop: "40px", padding: "20px", maxWidth: "640px", marginInline: "auto" }}>
      <h3 style={{ textAlign: "center", marginBottom: "16px" }}>Deja tu reseña</h3>
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px" }}
      />
      <textarea
        rows="4"
        placeholder="Tu reseña"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px" }}
      />
      <label>
        Puntuación:{" "}
        <select value={stars} onChange={(e) => setStars(e.target.value)} style={{ marginLeft: "6px" }}>
          {[5,4,3,2,1].map((n) => (
            <option key={n} value={n}>{n} ★</option>
          ))}
        </select>
      </label>
      <button onClick={handleSubmit} className="btn primary" style={{ display: "block", marginTop: "16px", width: "100%" }}>
        Enviar reseña
      </button>
    </div>
  );
}

function Page({ title, children, className = "" }) {
  return (
    <section className={`section ${className}`}>
      <div className="container">
        <h2>{title}</h2>
        <div className="body">{children}</div>
      </div>
    </section>
  );
}

/* ----------------- APP ----------------- */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* sigue existiendo, aunque no está en el header */}
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />

      <Route path="/resenas" element={<Resenas />} />
      <Route path="/reseñas" element={<Resenas />} />

      <Route path="/proyecto-sostenible" element={<ProyectoSostenible />} />
      <Route path="/profesionales" element={<Profesionales />} />

      {/* subpáginas "departamentos" expuestas individualmente */}
      <Route path="/departamentos/profesionales" element={<DeptContacto />} />
      <Route path="/departamentos/desmintiendo-mitos" element={<DeptMitos />} />
      <Route path="/departamentos/productos" element={<DeptProductos />} />
      <Route path="/departamentos/articulos" element={<DeptArticulos />} />
      <Route path="/departamentos/videos" element={<DeptVideos />} />

      {/* la vista general de /departamentos como tal ya no la necesitamos en el header,
          pero la dejo accesible */}
      <Route path="/departamentos" element={<DeptLayout title="Departamentos"><p>Explora las secciones.</p></DeptLayout>} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
}
