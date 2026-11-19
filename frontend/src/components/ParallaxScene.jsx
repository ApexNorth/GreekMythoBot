
import './ParallaxScene.css';
// Zeus images
import sky from '../assets/backgrounds/zeus/sky.png';
import clouds from '../assets/backgrounds/zeus/distant-clouds.png';
import temple from '../assets/backgrounds/zeus/temple-throne.png';
import zeusCharacter from '../assets/backgrounds/zeus/zeus-character.png';
import lightningSparks from '../assets/backgrounds/zeus/lightning-sparks.png';
// Athena images
import athenaSky from '../assets/backgrounds/athena/sky.png';
import athenaLandscape from '../assets/backgrounds/athena/landscape.png';
import athenaAcropolis from '../assets/backgrounds/athena/acropolis.png';
import athenaForeground from '../assets/backgrounds/athena/foreground.png';
import athenaComplete from '../assets/backgrounds/athena/athena-complete.png';
// Aphrodite images
import aphroditeSky from '../assets/backgrounds/aphrodite/sky.png';
import aphroditeSea from '../assets/backgrounds/aphrodite/distant-sea.png';
import aphroditeTemple from '../assets/backgrounds/aphrodite/temple-waves.png';
import aphroditeCharacter from '../assets/backgrounds/aphrodite/aphrodite-character.png';
import aphroditeForeground from '../assets/backgrounds/aphrodite/foreground.png';
import aphroditeDetails from '../assets/backgrounds/aphrodite/doves-petals.png';
// Ares images
import aresSky from '../assets/backgrounds/ares/sky.png';
import aresMountains from '../assets/backgrounds/ares/mountains.png';
import aresFortress from '../assets/backgrounds/ares/fortress.png';
import aresCharacter from '../assets/backgrounds/ares/ares-character.png';
import aresForeground from '../assets/backgrounds/ares/foreground.png';
// Hermes images
import hermesSky from '../assets/backgrounds/hermes/sky.png';
import hermesMountains from '../assets/backgrounds/hermes/mountains.png';
import hermesCrossroads from '../assets/backgrounds/hermes/crossroads.png';
import hermesCharacter from '../assets/backgrounds/hermes/hermes-character.png';
import hermesForeground from '../assets/backgrounds/hermes/foreground.png';
// Poseidon images
import poseidonSky from '../assets/backgrounds/poseidon/sky.png';
import poseidonSeascape from '../assets/backgrounds/poseidon/seascape.png';
import poseidonCharacter from '../assets/backgrounds/poseidon/poseidon.png';
import poseidonForeground from '../assets/backgrounds/poseidon/foreground.png';

// Rhea images
import rheaSky from '../assets/backgrounds/rhea/sky.png';
import rheaMountains from '../assets/backgrounds/rhea/mountains.png';
import rheaMeadow from '../assets/backgrounds/rhea/meadow.png';
import rheaCharacter from '../assets/backgrounds/rhea/rhea.png';
import rheaForeground from '../assets/backgrounds/rhea/foreground.png';

// Themis images
import themisSky from '../assets/backgrounds/themis/sky.png';
import themisMountains from '../assets/backgrounds/themis/mountains.png';
import themisTemple from '../assets/backgrounds/themis/temple.png';
import themisCharacter from '../assets/backgrounds/themis/themis.png';
import themisForeground from '../assets/backgrounds/themis/foreground.png';

// Atlas images
import atlasSky from '../assets/backgrounds/atlas/sky.png';
import atlasLandscape from '../assets/backgrounds/atlas/landscape.png';
import atlasCharacter from '../assets/backgrounds/atlas/atlas.png';
import atlasForeground from '../assets/backgrounds/atlas/foreground.png';

// Hyperion images
import hyperionSky from '../assets/backgrounds/hyperion/sky.png';
import hyperionMountains from '../assets/backgrounds/hyperion/mountains.png';
import hyperionTemple from '../assets/backgrounds/hyperion/temple.png';
import hyperionCharacter from '../assets/backgrounds/hyperion/hyperion.png';
import hyperionForeground from '../assets/backgrounds/hyperion/foreground.png';

// Kronos images
import kronosSky from '../assets/backgrounds/kronos/sky.png';
import kronosHills from '../assets/backgrounds/kronos/hills.png';
import kronosFields from '../assets/backgrounds/kronos/fields.png';
import kronosCharacter from '../assets/backgrounds/kronos/kronos.png';
import kronosForeground from '../assets/backgrounds/kronos/foreground.png';

// Prometheus images
import prometheusSky from '../assets/backgrounds/prometheus/sky.png';
import prometheusMountains from '../assets/backgrounds/prometheus/mountains.png';
import prometheusVillage from '../assets/backgrounds/prometheus/village.png';
import prometheusCharacter from '../assets/backgrounds/prometheus/prometheus.png';
import prometheusForeground from '../assets/backgrounds/prometheus/foreground.png';

// Each god has image layers with different depths to create the parallax effect
export const scenes = {
    zeus: [
        {
            id: 'sky',
            src: sky,
            className: 'parallax-sky',
            depth: 8,
        },
        {
            id: 'clouds',
            src: clouds,
            className: 'parallax-clouds',
            depth: 18,
        },
        {
            id: 'temple',
            src: temple,
            className: 'parallax-temple',
            depth: 30,
        },
        {
            id: 'character',
            src: zeusCharacter,
            className: 'parallax-character',
            depth: 80,
        },
        {
            id: 'lightning',
            src: lightningSparks,
            className: 'parallax-lightning',
            depth: 95,
        },
    ],
    athena: [
        {
            id: 'athena-sky',
            src: athenaSky,
            className: 'parallax-athena-sky',
            depth: 8,
        },
        {
            id: 'athena-landscape',
            src: athenaLandscape,
            className: 'parallax-athena-landscape',
            depth: 16,
        },
        {
            id: 'athena-acropolis',
            src: athenaAcropolis,
            className: 'parallax-athena-acropolis',
            depth: 28,
        },
        {
            id: 'athena-character',
            src: athenaComplete,
            className: 'parallax-athena-character',
            depth: 65,
        },
        {
            id: 'athena-foreground',
            src: athenaForeground,
            className: 'parallax-athena-foreground',
            depth: 75,
        },
    ],
    aphrodite: [
        {
            id: 'aphrodite-sky',
            src: aphroditeSky,
            className: 'parallax-aphrodite-sky',
            depth: 8,
        },
        {
            id: 'aphrodite-sea',
            src: aphroditeSea,
            className: 'parallax-aphrodite-sea',
            depth: 16,
        },
        {
            id: 'aphrodite-temple',
            src: aphroditeTemple,
            className: 'parallax-aphrodite-temple',
            depth: 28,
        },
        {
            id: 'aphrodite-character',
            src: aphroditeCharacter,
            className: 'parallax-aphrodite-character',
            depth: 65,
        },
        {
            id: 'aphrodite-foreground',
            src: aphroditeForeground,
            className: 'parallax-aphrodite-foreground',
            depth: 75,
        },
        {
            id: 'aphrodite-details',
            src: aphroditeDetails,
            className: 'parallax-aphrodite-details',
            depth: 90,
        },
    ],
    ares: [
        {
            id: 'ares-sky',
            src: aresSky,
            className: 'parallax-ares-sky',
            depth: 8,
        },
        {
            id: 'ares-mountains',
            src: aresMountains,
            className: 'parallax-ares-mountains',
            depth: 18,
        },
        {
            id: 'ares-fortress',
            src: aresFortress,
            className: 'parallax-ares-fortress',
            depth: 30,
        },
        {
            id: 'ares-character',
            src: aresCharacter,
            className: 'parallax-ares-character',
            depth: 65,
        },
        {
            id: 'ares-foreground',
            src: aresForeground,
            className: 'parallax-ares-foreground',
            depth: 82,
        },
    ],
    hermes: [
        {
            id: 'hermes-sky',
            src: hermesSky,
            className: 'parallax-hermes-sky',
            depth: 8,
        },
        {
            id: 'hermes-mountains',
            src: hermesMountains,
            className: 'parallax-hermes-mountains',
            depth: 18,
        },
        {
            id: 'hermes-crossroads',
            src: hermesCrossroads,
            className: 'parallax-hermes-crossroads',
            depth: 30,
        },
        {
            id: 'hermes-character',
            src: hermesCharacter,
            className: 'parallax-hermes-character',
            depth: 65,
        },
        {
            id: 'hermes-foreground',
            src: hermesForeground,
            className: 'parallax-hermes-foreground',
            depth: 80,
        },
    ],
    poseidon: [
        {
            id: 'poseidon-sky',
            src: poseidonSky,
            className: 'parallax-poseidon-sky',
            depth: 8,
        },
        {
            id: 'poseidon-seascape',
            src: poseidonSeascape,
            className: 'parallax-poseidon-seascape',
            depth: 20,
        },
        {
            id: 'poseidon-character',
            src: poseidonCharacter,
            className: 'parallax-poseidon-character',
            depth: 55,
        },
        {
            id: 'poseidon-foreground',
            src: poseidonForeground,
            className: 'parallax-poseidon-foreground',
            depth: 75,
        },
    ],
    rhea: [
        {
            id: 'rhea-sky',
            src: rheaSky,
            className: 'parallax-rhea-sky',
            depth: 8,
        },
        {
            id: 'rhea-mountains',
            src: rheaMountains,
            className: 'parallax-rhea-mountains',
            depth: 18,
        },
        {
            id: 'rhea-meadow',
            src: rheaMeadow,
            className: 'parallax-rhea-meadow',
            depth: 30,
        },
        {
            id: 'rhea-character',
            src: rheaCharacter,
            className: 'parallax-rhea-character',
            depth: 55,
        },
        {
            id: 'rhea-foreground',
            src: rheaForeground,
            className: 'parallax-rhea-foreground',
            depth: 75,
        },
    ],
    themis: [
        {
            id: 'themis-sky',
            src: themisSky,
            className: 'parallax-themis-sky',
            depth: 8,
        },
        {
            id: 'themis-mountains',
            src: themisMountains,
            className: 'parallax-themis-mountains',
            depth: 18,
        },
        {
            id: 'themis-temple',
            src: themisTemple,
            className: 'parallax-themis-temple',
            depth: 30,
        },
        {
            id: 'themis-character',
            src: themisCharacter,
            className: 'parallax-themis-character',
            depth: 55,
        },
        {
            id: 'themis-foreground',
            src: themisForeground,
            className: 'parallax-themis-foreground',
            depth: 75,
        },
    ],
    atlas: [
        {
            id: 'atlas-sky',
            src: atlasSky,
            className: 'parallax-atlas-sky',
            depth: 8,
        },
        {
            id: 'atlas-landscape',
            src: atlasLandscape,
            className: 'parallax-atlas-landscape',
            depth: 25,
        },
        {
            id: 'atlas-character',
            src: atlasCharacter,
            className: 'parallax-atlas-character',
            depth: 55,
        },
        {
            id: 'atlas-foreground',
            src: atlasForeground,
            className: 'parallax-atlas-foreground',
            depth: 75,
        },
    ],
    hyperion: [
        {
            id: 'hyperion-sky',
            src: hyperionSky,
            className: 'hyperion-sky',
            depth: 8,
        },
        {
            id: 'hyperion-mountains',
            src: hyperionMountains,
            className: 'hyperion-mountains',
            depth: 25,
        },
        {
            id: 'hyperion-temple',
            src: hyperionTemple,
            className: 'hyperion-temple',
            depth: 55,
        },
        {
            id: 'hyperion-character',
            src: hyperionCharacter,
            className: 'hyperion-character',
            depth: 75,
        },
        {
            id: 'hyperion-foreground',
            src: hyperionForeground,
            className: 'hyperion-foreground',
            depth: 90,
        },
    ],
    kronos: [
        {
            id: 'kronos-sky',
            src: kronosSky,
            className: 'parallax-kronos-sky',
            depth: 8,
        },
        {
            id: 'kronos-hills',
            src: kronosHills,
            className: 'parallax-kronos-hills',
            depth: 25,
        },
        {
            id: 'kronos-fields',
            src: kronosFields,
            className: 'parallax-kronos-fields',
            depth: 55,
        },
        {
            id: 'kronos-character',
            src: kronosCharacter,
            className: 'parallax-kronos-character',
            depth: 75,
        },
        {
            id: 'kronos-foreground',
            src: kronosForeground,
            className: 'parallax-kronos-foreground',
            depth: 90,
        },
    ],
    prometheus: [
        {
            id: 'prometheus-sky',
            src: prometheusSky,
            className: 'parallax-prometheus-sky',
            depth: 8,
        },
        {
            id: 'prometheus-mountains',
            src: prometheusMountains,
            className: 'parallax-prometheus-mountains',
            depth: 25,
        },
        {
            id: 'prometheus-village',
            src: prometheusVillage,
            className: 'parallax-prometheus-village',
            depth: 55,
        },
        {
            id: 'prometheus-character',
            src: prometheusCharacter,
            className: 'parallax-prometheus-character',
            depth: 75,
        },
        {
            id: 'prometheus-foreground',
            src: prometheusForeground,
            className: 'parallax-prometheus-foreground',
            depth: 90,
        },
    ],
};

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
