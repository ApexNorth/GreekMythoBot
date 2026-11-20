import './ParallaxScene.css';
import { scenes } from './parallaxScenes.js';

// Display the background layers for the selected god

function ParallaxScene({ god }) {
    const layers = scenes[god];

    if (!layers) return null;

    return (
        <div className="parallax-scene" aria-hidden="true">
            {layers.map((layer) => (
                <img
                    key={layer.id}
                    src={layer.src}
                    alt=""
                    className={`parallax-layer ${layer.className}`}
                />
            ))}
        </div>
    );
}

export default ParallaxScene;
