import './CloudGate.css';
import olympus from '../assets/clouds/olympus.webp';
import cloudFrame from '../assets/clouds/cloud-frame.webp';
import cloudLeft from '../assets/clouds/cloud-left.webp';
import cloudRight from '../assets/clouds/cloud-right.webp';
import cloudLeftFront from '../assets/clouds/cloud-left-front.webp';
import cloudRightFront from '../assets/clouds/cloud-right-front.webp';

/**
 * Full-screen cloud wall with Mount Olympus behind it. Whatever you put inside (e.g. a form) sits on top.
 * Set isOpen to true to fade the content and slide the clouds apart to reveal Olympus.
 * openMessage (e.g. "Welcome, Hermes!") appears over Olympus once the clouds have opened.
 */
function CloudGate({isOpen = false, openMessage, children}){
  return (
    <div className={isOpen ? 'cloud-gate open' : 'cloud-gate'}>
      {/* Picture layers, back to front. alt="" because they are only decoration */}
      <img className="cloud-layer" src={olympus} alt=""/>
      <img className="cloud-layer cloud-frame" src={cloudFrame} alt=""/>
      <img className="cloud-layer cloud-left" src={cloudLeft} alt=""/>
      <img className="cloud-layer cloud-right" src={cloudRight} alt=""/>
      <img className="cloud-layer cloud-front cloud-left" src={cloudLeftFront} alt=""/>
      <img className="cloud-layer cloud-front cloud-right" src={cloudRightFront} alt=""/>

      {/* inert stops keyboard users tabbing into the form once it has faded away */}
      <div className="cloud-gate-content" inert={isOpen}>{children}</div>

      {/* role="status" makes screen readers read the message out */}
      {isOpen && openMessage && <p className="cloud-gate-message" role="status">{openMessage}</p>}
    </div>
  );
}

export default CloudGate;
