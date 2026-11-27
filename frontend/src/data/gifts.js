/**
 * Alex's gift list, copied from the database (god.giftGroupID, giftGroup and gifts tables).
 * Only the pretend server uses it, to pick a quiz gift from the god's own gift group.
 * TODO BACKEND: the real server picks the gift from the database instead.
 */

// Which gift group each god likes (Aphrodite + Rhea and Athena + Prometheus share one)
export const godGiftGroups = {
  Aphrodite: 'Gems', Ares: 'Weapons', Athena: 'Scrolls', Hermes: 'Coins', Poseidon: 'Pearls', Zeus: 'Gold',
  Atlas: 'Relics', Hyperion: 'Crystals', Kronos: 'Artifacts', Prometheus: 'Scrolls', Rhea: 'Gems', Themis: 'Incense',
  Chaos: 'Curiosities', Chronos: 'Hourglasses', Gaia: 'Stones', Nyx: 'Obsidian', Tartarus: 'Iron', Ouranos: 'Starlight',
};

// The gifts in each group
export const giftGroups = {
  Gems: ['Cut Ruby Ring', 'Raw Emerald Shard', 'Imperial Topaz Brooch'],
  Weapons: ['Bronze Dagger', 'Steel Broadsword', 'Engraved Hunting Bow'],
  Scrolls: ['Faded Papyrus Note', 'Illuminated Philosophy Scroll', 'Ancient Star Chart'],
  Coins: ['Worn Copper Coin', 'Silver Denarius', 'Mint-Condition Gold Sovereign'],
  Pearls: ['Freshwater Seed Pearl', 'Lustrous Akoya Pearl Necklace', 'Rare Black Tahitian Pearl'],
  Gold: ['Gold Filigree Hairpin', 'Hammered Gold Bullion Bar', 'Gilded Laurel Wreath'],
  Relics: ['Weathered Shrine Bell', 'Carved Ivory Reliquary'],
  Crystals: ['Clear Quartz Cluster', 'Amethyst Geode', 'Faceted Citrine Prism'],
  Artifacts: ['Terracotta Amphora Fragment', 'Bronze Astrolabe', 'Inlaid Mosaic Tile'],
  Incense: ['Frankincense Resin Bundle', 'Sandalwood Incense Cones', 'Aged Myrrh Tears'],
  Curiosities: ['Glass Cabinet of Oddities', 'Clockwork Brass Compass', 'Fossilized Nautilus Shell'],
  Hourglasses: ['Pocket Sand Timer', 'Brass and Glass Hourglass'],
  Stones: ['Smooth River Pebble', 'Polished Marble Slab', 'Jade Carving Stone'],
  Obsidian: ['Volcanic Obsidian Blade', 'Mirrored Obsidian Tablet'],
  Iron: ['Forged Wrought-Iron Ingot', 'Meteoric Iron Horseshoe'],
  Starlight: ['Phosphorescent Mineral Sample', 'Aventurine Sparkle Stone'],
};
