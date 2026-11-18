import './CloudGate.css';
import olympus from '../assets/clouds/olympus.webp';
import cloudFrame from '../assets/clouds/cloud-frame.webp';
import cloudLeft from '../assets/clouds/cloud-left.webp';
import cloudRight from '../assets/clouds/cloud-right.webp';

/**
 * Full-screen cloud wall with Mount Olympus behind it. Whatever you put inside (e.g. a form) sits on top.
 * Set isOpen to true to fade the content and slide the clouds apart to reveal Olympus.
 */
function CloudGate({isOpen = false, children}){
  return (
    <div className={isOpen ? 'cloud-gate open' : 'cloud-gate'}>
      {/* Picture layers, back to front. alt="" because they are only decoration */}
      <img className="cloud-layer" src={olympus} alt=""/>
      <img className="cloud-layer cloud-frame" src={cloudFrame} alt=""/>
      <img className="cloud-layer cloud-left" src={cloudLeft} alt=""/>
      <img className="cloud-layer cloud-right" src={cloudRight} alt=""/>

      {/* inert stops keyboard users tabbing into the form once it has faded away */}
      <div className="cloud-gate-content" inert={isOpen}>{children}</div>
    </div>
  );
}

export default CloudGate;
