
import './SelectionParallax.css';
import olympusSky from '../assets/selection/olympus-sky.png';
import olympusMountains from '../assets/selection/olympus-mountains.png';
import olympusFrame from '../assets/selection/olympus-frame.png';
import titansSky from '../assets/selection/titans-sky.png';
import titansRuins from '../assets/selection/titans-ruins.png';
import titansForeground from '../assets/selection/titans-foreground.png';
import primordialsSky from '../assets/selection/primordials-sky.png';
import primordialsHills from '../assets/selection/primordials-hills.png';
import primordialsForeground from '../assets/selection/primordials-foreground.png';

/** Displays the background layers for each god selection area. */
function SelectionParallax({ era }) {

  /* Primordials selection background */
  if (era === 'Primordials') {
    return (
      <div className="selection-parallax" aria-hidden="true">
        {/* Celestial night sky */}
        <img
          src={primordialsSky}
          alt=""
          className="selection-parallax-layer selection-parallax-sky"
        />

        {/* Distant ornamental hills */}
        <img
          src={primordialsHills}
          alt=""
          className="selection-parallax-layer selection-parallax-mountains"
        />

        {/* Rocky foreground */}
        <img
          src={primordialsForeground}
          alt=""
          className="selection-parallax-layer selection-parallax-frame"
        />
      </div>
    );
  }


  /* Titans selection background */
  if (era === 'Titans') {
    return (
      <div className="selection-parallax" aria-hidden="true">
        {/* Sunset sky */}
        <img
          src={titansSky}
          alt=""
          className="selection-parallax-layer selection-parallax-sky"
        />

        {/* Ancient ruins and mountains */}
        <img
          src={titansRuins}
          alt=""
          className="selection-parallax-layer selection-parallax-mountains"
        />

        {/* Foreground ruins and chains */}
        <img
          src={titansForeground}
          alt=""
          className="selection-parallax-layer selection-parallax-frame"
        />
      </div>
    );
  }

    if (era !== 'Olympians') return null;

    return (
        <div className="selection-parallax" aria-hidden="true">
            <img
                src={olympusSky}
                alt=""
                className="selection-parallax-layer selection-parallax-sky"
            />

            <img
                src={olympusMountains}
                alt=""
                className="selection-parallax-layer selection-parallax-mountains"
            />
        
            <img
                src={olympusFrame}
                alt=""
                className="selection-parallax-layer selection-parallax-frame"
            />
        </div>
    );
}

export default SelectionParallax;
