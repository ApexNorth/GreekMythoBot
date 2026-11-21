import {Link} from 'react-router-dom';
import olympusTemples from '../assets/home/olympus-temples.webp';
import zeus from '../assets/home/zeus.webp';
import kronos from '../assets/home/kronos.webp';
import chaos from '../assets/home/chaos.webp';
import olympusSky from '../assets/home/olympus-sky.webp';
import olympusMountains from '../assets/home/olympus-mountains.webp';
import olympusCliffs from '../assets/home/olympus-cliffs.webp';
import titansRuins from '../assets/home/titans-ruins.webp';
import primordialsNight from '../assets/home/primordials-night.webp';
import giftApples from '../assets/home/gift-apples.webp';
import giftHoney from '../assets/home/gift-honey.webp';
import giftPomegranate from '../assets/home/gift-pomegranate.webp';
import oakWreath from '../assets/home/oak-wreath.webp';
import './Home.css';

// The three ages of the gods under "Meet the gods", each with its own world behind it
// (same gods and pictures as the god selection page)
const godEras = [
  {
    id: 'olympians',
    family: 'The Olympians',
    title: 'Explore Olympus',
    backgrounds: [olympusSky, olympusMountains, olympusCliffs],
    god: zeus,
    godText: 'Zeus holding lightning bolts, with an eagle on his shoulder',
    story: 'High above the clouds, Zeus and the Olympian gods rule the world from their shining palaces on Mount Olympus. Each one looks after something different, from the sea to wisdom to love.',
    gods: ['Zeus', 'Athena', 'Poseidon', 'Aphrodite', 'Ares', 'Hermes'],
    artStyle: 'red-figure pottery',
  },
  {
    id: 'titans',
    family: 'The Titans',
    title: 'Meet the Titans',
    backgrounds: [titansRuins],
    god: kronos,
    godText: 'Kronos holding a scythe and an hourglass, with broken chains on his wrists',
    story: 'Before the Olympians, the giant Titans ruled the world. Their king, Kronos, ruled over a golden age, until his son Zeus rose up and fought him for the throne.',
    gods: ['Kronos', 'Rhea', 'Atlas', 'Prometheus', 'Hyperion', 'Themis'],
    artStyle: 'black-figure pottery',
  },
  {
    id: 'primordials',
    family: 'The Primordials',
    title: 'Where it all began',
    backgrounds: [primordialsNight],
    god: chaos,
    godText: 'Chaos, a swirling figure in purple and gold holding a glowing orb',
    story: 'Before the gods and the Titans, there was only Chaos. Then came the very first gods: Gaia the Earth, Nyx the Night and Tartarus, the deep, dark pit below the world.',
    gods: ['Chaos', 'Gaia', 'Nyx', 'Uranus', 'Tartarus', 'Chronos'],
    artStyle: 'geometric patterns',
  },
];

/**
 * Homepage: an advert for The Descent that anyone can explore without an account.
 * It shows what the game is about, and signing up is only needed to actually play.
 */
function Home(){
  return (
    <main className="home-page">
      {/* Welcome section: Olympus picture with the name, what it is, and where to go next */}
      <section className="home-hero" aria-labelledby="home-title">
        {/* alt="" because the picture is only decoration */}
        <img className="home-hero-picture" src={olympusTemples} alt=""/>

        <div className="home-hero-card">
          <h1 id="home-title">The Descent</h1>
          <p className="home-tagline">Chat with the gods of Ancient Greece.</p>
          <p className="home-intro">
            Pick a god, ask them your questions and win their favour with gifts.
            A fun new way to learn the Greek myths, made for ages 13 and up.
          </p>
          <div className="home-actions">
            {/* Main button scrolls down to explore; signing up is the second choice */}
            <a href="#meet-the-gods" className="home-button home-button-main">Explore ↓</a>
            <Link to="/registration" className="home-button">Sign up free</Link>
          </div>
        </div>
      </section>

      {/* Meet the gods: a short intro, then one big screen per age (just to look at, you need an account to chat) */}
      <section id="meet-the-gods" aria-labelledby="gods-title">
        <div className="home-section">
          <h2 id="gods-title">Meet the gods</h2>
          <p className="home-section-intro">
            Three families of gods, each from a different age of the Greek myths.
            Who will you visit first?
          </p>
        </div>

        {godEras.map((era) => (
          <article key={era.id} className={`god-era god-era-${era.id}`} aria-labelledby={`${era.id}-title`}>
            {/* The world behind the god: picture layers, back to front (decoration only) */}
            {era.backgrounds.map((picture) => (
              <img key={picture} className="god-era-background" src={picture} alt="" loading="lazy"/>
            ))}

            <img className="god-era-god" src={era.god} alt={era.godText} width="560" height="840" loading="lazy"/>

            <div className="god-era-card">
              <p className="god-era-family">{era.family}</p>
              <h3 id={`${era.id}-title`}>{era.title}</h3>
              <p>{era.story}</p>
              <ul className="god-era-names" role="list">
                {era.gods.map((name) => <li key={name}>{name}</li>)}
              </ul>
              <p className="god-era-style">Art style: {era.artStyle}</p>
            </div>
          </article>
        ))}
      </section>

      {/* What you can do: describes the game's features (an advert only, nothing here is clickable) */}
      <section className="home-features" aria-labelledby="features-title">
        <div className="home-section">
          <h2 id="features-title">What you can do</h2>
          <p className="home-section-intro">
            Every god has their own personality, their own stories and their own favourite gifts.
          </p>

          <div className="feature-cards">
            <article className="feature-card">
              {/* Little example chat; aria-hidden so screen readers only read the real text below */}
              <div className="feature-picture feature-chat" aria-hidden="true">
                <p className="chat-bubble chat-bubble-god">Who dares to climb Mount Olympus?</p>
                <p className="chat-bubble chat-bubble-player">It's me! Why do you throw lightning?</p>
              </div>
              <h3>Talk to a god</h3>
              <p>Ask them about their lives, their powers and their famous myths. Each god answers in their own way.</p>
            </article>

            <article className="feature-card">
              <div className="feature-picture feature-gifts" aria-hidden="true">
                <img src={giftApples} alt="" width="80" height="80" loading="lazy"/>
                <img src={giftHoney} alt="" width="80" height="80" loading="lazy"/>
                <img src={giftPomegranate} alt="" width="80" height="80" loading="lazy"/>
              </div>
              <h3>Give gifts</h3>
              <p>Golden apples, honey, pomegranates... Every god loves different things. Choose the wrong gift and they won't be happy!</p>
            </article>

            <article className="feature-card">
              <div className="feature-picture feature-favour" aria-hidden="true">
                <img src={oakWreath} alt="" width="64" height="64" loading="lazy"/>
                <div className="favour-meter">
                  <span className="favour-meter-label">Zeus's favour</span>
                  <span className="favour-meter-bar"><span className="favour-meter-fill"></span></span>
                </div>
              </div>
              <h3>Win their favour</h3>
              <p>Your friendship with each god grows with what you say and give. Annoy them too much and they'll stop talking to you!</p>
            </article>

            <article className="feature-card">
              <div className="feature-picture feature-travel" aria-hidden="true">
                <img src={olympusTemples} alt="" loading="lazy"/>
              </div>
              <h3>Travel between worlds</h3>
              <p>The clouds part to carry you to each god's world, from sunny Mount Olympus to the oldest, darkest corners of the myths.</p>
            </article>
          </div>
        </div>
      </section>

      {/* For parents: what the game is, who it's for and what we ask for (NFR-13) */}
      <section className="home-section home-parents" aria-labelledby="parents-title">
        <h2 id="parents-title">For parents and carers</h2>
        <p className="home-section-intro">
          The Descent is a learning game about Greek mythology. Players chat with characters
          based on the Greek gods and find out about their stories along the way.
        </p>
        {/* role="list" keeps it a list for screen readers in Safari (the bullets are hidden) */}
        <ul className="parent-points" role="list">
          <li>
            <strong>Ages 13 and up.</strong> Everyone gives their date of birth when they sign up,
            and younger children can't create an account.
          </li>
          <li>
            <strong>Only what we need.</strong> We ask for an email, a username, a date of birth and
            a password. Nothing else.
          </li>
          <li>
            <strong>Real myths, made simple.</strong> Players learn the stories of the Greek gods by
            asking questions, instead of reading long pages of text.
          </li>
        </ul>
      </section>

      {/* Begin your descent: the one big sign-up push, at the very end of the page */}
      <section className="home-signup" aria-labelledby="signup-title">
        <div className="home-section">
          <h2 id="signup-title">Begin your descent</h2>
          <p className="home-section-intro">
            The gods of Olympus are waiting. Create a free account to start chatting with them.
          </p>
          <Link to="/registration" className="home-button home-button-signup">Create your free account</Link>
          <p className="home-login">
            Already have one? <Link to="/login">Log in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
