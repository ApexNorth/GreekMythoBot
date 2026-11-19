import {Link} from 'react-router-dom';
import olympusTemples from '../assets/home/olympus-temples.webp';
import zeus from '../assets/home/zeus.webp';
import kronos from '../assets/home/kronos.webp';
import nyx from '../assets/home/nyx.webp';
import './Home.css';

// The three families of gods shown under "Meet the gods" (same gods as the god selection page)
const godFamilies = [
  {
    name: 'The Olympians',
    picture: zeus,
    pictureText: 'Zeus holding lightning bolts, with an eagle on his shoulder',
    about: 'The gods who rule the world from the top of Mount Olympus.',
    artStyle: 'red-figure pottery',
    gods: 'Zeus, Athena, Poseidon, Aphrodite, Ares and Hermes',
  },
  {
    name: 'The Titans',
    picture: kronos,
    pictureText: 'Kronos holding a scythe and an hourglass, with broken chains on his wrists',
    about: 'The giant, ancient rulers who came before the Olympians.',
    artStyle: 'black-figure pottery',
    gods: 'Kronos, Rhea, Atlas, Prometheus, Hyperion and Themis',
  },
  {
    name: 'The Primordials',
    picture: nyx,
    pictureText: 'Nyx, goddess of the night, holding up a cloak full of stars',
    about: 'The very first gods, there at the start of everything.',
    artStyle: 'geometric patterns',
    gods: 'Chaos, Gaia, Nyx, Uranus, Tartarus and Chronos',
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

      {/* Meet the gods: one card per family, just to look at (you need an account to chat) */}
      <section id="meet-the-gods" className="home-section" aria-labelledby="gods-title">
        <h2 id="gods-title">Meet the gods</h2>
        <p className="home-section-intro">
          Three families of gods, each from a different age of the Greek myths.
          Who will you visit first?
        </p>

        <div className="god-family-cards">
          {godFamilies.map((family) => (
            <article key={family.name} className="god-family-card">
              <img src={family.picture} alt={family.pictureText} width="400" height="600" loading="lazy"/>
              <h3>{family.name}</h3>
              <p>{family.about}</p>
              <p className="god-family-gods">{family.gods}</p>
              <p className="god-family-style">Art style: {family.artStyle}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
