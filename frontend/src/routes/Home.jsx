import {Link} from 'react-router-dom';
import olympusTemples from '../assets/home/olympus-temples.webp';
import './Home.css';

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

      {/* Meet the gods: the three families of gods (the cards come in the next step) */}
      <section id="meet-the-gods" className="home-section" aria-labelledby="gods-title">
        <h2 id="gods-title">Meet the gods</h2>
        <p className="home-section-intro">
          Three families of gods, each from a different age of the Greek myths.
          Who will you visit first?
        </p>
      </section>
    </main>
  );
}

export default Home;
