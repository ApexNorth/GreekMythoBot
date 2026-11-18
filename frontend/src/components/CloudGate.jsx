import './CloudGate.css';
import olympus from '../assets/clouds/olympus.webp';
import cloudFrame from '../assets/clouds/cloud-frame.webp';
import cloudLeft from '../assets/clouds/cloud-left.webp';
import cloudRight from '../assets/clouds/cloud-right.webp';

/** Full-screen cloud wall with Mount Olympus behind it. Whatever you put inside (e.g. a form) sits on top. */
function CloudGate({children}){
  return (
    <div className="cloud-gate">
      {/* Picture layers, back to front. alt="" because they are only decoration */}
      <img className="cloud-layer" src={olympus} alt=""/>
      <img className="cloud-layer" src={cloudFrame} alt=""/>
      <img className="cloud-layer cloud-left" src={cloudLeft} alt=""/>
      <img className="cloud-layer cloud-right" src={cloudRight} alt=""/>

      <div className="cloud-gate-content">{children}</div>
    </div>
  );
}

export default CloudGate;
