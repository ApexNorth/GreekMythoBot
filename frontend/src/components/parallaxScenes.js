// Picture layers for god's chat backgrounds 
// Zeus images
import sky from '../assets/backgrounds/zeus/sky.png';
import clouds from '../assets/backgrounds/zeus/distant-clouds.png';
import temple from '../assets/backgrounds/zeus/temple-throne.png';
import zeusCharacter from '../assets/backgrounds/zeus/zeus-character.png';

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

// Ouranos images
import ouranosSky from '../assets/backgrounds/ouranos/sky.png';
import ouranosClouds from '../assets/backgrounds/ouranos/clouds.png';
import ouranosPillars from '../assets/backgrounds/ouranos/pillars.png';
import ouranosCharacter from '../assets/backgrounds/ouranos/ouranos.png';
import ouranosForeground from '../assets/backgrounds/ouranos/foreground.png';

// Chronos images
import chronosSky from '../assets/backgrounds/chronos/sky.png';
import chronosMandala from '../assets/backgrounds/chronos/mandala.png';
import chronosDunes from '../assets/backgrounds/chronos/dunes.png';
import chronosCharacter from '../assets/backgrounds/chronos/chronos.png';
import chronosForeground from '../assets/backgrounds/chronos/foreground.png';

// Gaia images
import gaiaSky from '../assets/backgrounds/gaia/sky.png';
import gaiaMountains from '../assets/backgrounds/gaia/mountains.png';
import gaiaValley from '../assets/backgrounds/gaia/valley.png';
import gaiaCharacter from '../assets/backgrounds/gaia/gaia.png';
import gaiaForeground from '../assets/backgrounds/gaia/foreground.png';

// Nyx images
import nyxSky from '../assets/backgrounds/nyx/sky.png';
import nyxMountains from '../assets/backgrounds/nyx/mountains.png';
import nyxPalace from '../assets/backgrounds/nyx/palace.png';
import nyxCharacter from '../assets/backgrounds/nyx/nyx.png';
import nyxForeground from '../assets/backgrounds/nyx/foreground.png';

// Tartarus images
import tartarusSky from '../assets/backgrounds/tartarus/sky.png';
import tartarusMountains from '../assets/backgrounds/tartarus/mountains.png';
import tartarusFortress from '../assets/backgrounds/tartarus/fortress.png';
import tartarusCharacter from '../assets/backgrounds/tartarus/tartarus.png';
import tartarusForeground from '../assets/backgrounds/tartarus/foreground.png';

// Chaos images
import chaosSky from '../assets/backgrounds/chaos/chaos-sky.png';
import chaosHalo from '../assets/backgrounds/chaos/chaos-halo.png';
import chaosCharacter from '../assets/backgrounds/chaos/chaos-character.png';
import chaosOrb from '../assets/backgrounds/chaos/chaos-orb.png';

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
    ouranos: [
        {
            id: 'ouranos-sky',
            src: ouranosSky,
            className: 'parallax-ouranos-sky',
            depth: 8,
        },
        {
            id: 'ouranos-clouds',
            src: ouranosClouds,
            className: 'parallax-ouranos-clouds',
            depth: 25,
        },
        {
            id: 'ouranos-pillars',
            src: ouranosPillars,
            className: 'parallax-ouranos-pillars',
            depth: 55,
        },
        {
            id: 'ouranos-character',
            src: ouranosCharacter,
            className: 'parallax-ouranos-character',
            depth: 75,
        },
        {
            id: 'ouranos-foreground',
            src: ouranosForeground,
            className: 'parallax-ouranos-foreground',
            depth: 90,
        },
    ],
    chronos: [
        {
            id: 'chronos-sky',
            src: chronosSky,
            className: 'parallax-chronos-sky',
            depth: 8,
        },
        {
            id: 'chronos-mandala',
            src: chronosMandala,
            className: 'parallax-chronos-mandala',
            depth: 25,
        },
        {
            id: 'chronos-dunes',
            src: chronosDunes,
            className: 'parallax-chronos-dunes',
            depth: 55,
        },
        {
            id: 'chronos-character',
            src: chronosCharacter,
            className: 'parallax-chronos-character',
            depth: 75,
        },
        {
            id: 'chronos-foreground',
            src: chronosForeground,
            className: 'parallax-chronos-foreground',
            depth: 90,
        },
    ],
    gaia: [
        {
            id: 'gaia-sky',
            src: gaiaSky,
            className: 'parallax-gaia-sky',
            depth: 8,
        },
        {
            id: 'gaia-mountains',
            src: gaiaMountains,
            className: 'parallax-gaia-mountains',
            depth: 25,
        },
        {
            id: 'gaia-valley',
            src: gaiaValley,
            className: 'parallax-gaia-valley',
            depth: 55,
        },
        {
            id: 'gaia-character',
            src: gaiaCharacter,
            className: 'parallax-gaia-character',
            depth: 75,
        },
        {
            id: 'gaia-foreground',
            src: gaiaForeground,
            className: 'parallax-gaia-foreground',
            depth: 90,
        },
    ],
    nyx: [
        {
            id: 'nyx-sky',
            src: nyxSky,
            className: 'parallax-nyx-sky',
            depth: 8,
        },
        {
            id: 'nyx-mountains',
            src: nyxMountains,
            className: 'parallax-nyx-mountains',
            depth: 25,
        },
        {
            id: 'nyx-palace',
            src: nyxPalace,
            className: 'parallax-nyx-palace',
            depth: 55,
        },
        {
            id: 'nyx-character',
            src: nyxCharacter,
            className: 'parallax-nyx-character',
            depth: 75,
        },
        {
            id: 'nyx-foreground',
            src: nyxForeground,
            className: 'parallax-nyx-foreground',
            depth: 90,
        },
    ],
    tartarus: [
        {
            id: 'tartarus-sky',
            src: tartarusSky,
            className: 'parallax-tartarus-sky',
            depth: 8,
        },
        {
            id: 'tartarus-mountains',
            src: tartarusMountains,
            className: 'parallax-tartarus-mountains',
            depth: 25,
        },
        {
            id: 'tartarus-fortress',
            src: tartarusFortress,
            className: 'parallax-tartarus-fortress',
            depth: 55,
        },
        {
            id: 'tartarus-character',
            src: tartarusCharacter,
            className: 'parallax-tartarus-character',
            depth: 75,
        },
        {
            id: 'tartarus-foreground',
            src: tartarusForeground,
            className: 'parallax-tartarus-foreground',
            depth: 90,
        },
    ],
    chaos: [
        {
            id: 'chaos-sky',
            src: chaosSky,
            className: 'parallax-chaos-sky',
            depth: 8,
        },
        {
            id: 'chaos-halo',
            src: chaosHalo,
            className: 'parallax-chaos-halo',
            depth: 25,
        },
        {
            id: 'chaos-character',
            src: chaosCharacter,
            className: 'parallax-chaos-character',
            depth: 75,
        },
        {
            id: 'chaos-orb',
            src: chaosOrb,
            className: 'parallax-chaos-orb',
            depth: 80,
        },
    ],
};