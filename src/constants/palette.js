/**
 * EduHero — Master Color Palette
 * Chibi 2D vector-style, tươi sáng, bão hòa cao
 * Mỗi màu có 3 tone: base, shadow (darker), highlight (lighter)
 */

const PALETTE = {

  // ─── HERO: Trạng Tí ───────────────────────────────────
  hero: {
    skin:      { base: '#F5D0A9', shadow: '#D4A574', highlight: '#FFE4C4' },
    hair:      { base: '#2C2C2C', shadow: '#1A1A1A', highlight: '#4A4A4A' },
    eyes:      { base: '#1A1A1A', shadow: '#000000', highlight: '#FFFFFF' },
    eyeShine:  '#FFFFFF',
    mouth:     '#E57373',
    cheek:     { base: '#FFB6C1', shadow: '#FF9AAE' },   // blush
    pants:     { base: '#5D4037', shadow: '#3E2723', highlight: '#795548' },
    pantsAlt:  { base: '#4CAF50', shadow: '#388E3C', highlight: '#66BB6A' },
    outline:   '#2C1810',
  },

  // ─── VŨ KHÍ (Weapons) ─────────────────────────────────
  weapons: {
    meleeA: { // Kiếm Thánh Gióng
      base: '#FFB300', shadow: '#E69500', highlight: '#FFD54F',
      accent: '#E53935', accentShadow: '#C62828',
    },
    meleeB: { // Kiếm Sơn Tinh
      base: '#4CAF50', shadow: '#388E3C', highlight: '#81C784',
      accent: '#795548', accentShadow: '#5D4037',
    },
    rangedA: { // Nỏ An Dương Vương
      base: '#C62828', shadow: '#8E0000', highlight: '#EF5350',
      accent: '#FFB300', accentShadow: '#E69500',
    },
    rangedB: { // Cung Âu Cơ
      base: '#90CAF9', shadow: '#5C9CE6', highlight: '#BBDEFB',
      accent: '#E0E0E0', accentShadow: '#BDBDBD',
    },
    magicA: { // Sách Trạng Quỳnh
      base: '#7B1FA2', shadow: '#4A0072', highlight: '#AB47BC',
      accent: '#FF80AB', accentShadow: '#F50057',
    },
    magicB: { // Bí Kíp Lạc Long Quân
      base: '#00BCD4', shadow: '#00838F', highlight: '#4DD0E1',
      accent: '#80CBC4', accentShadow: '#4DB6AC',
    },
  },

  // ─── GIÁP (Armor) ─────────────────────────────────────
  armor: {
    baba:       { base: '#FAFAFA', shadow: '#E0E0E0', highlight: '#FFFFFF' },
    tuthan:     { base: '#8D6E63', shadow: '#5D4037', highlight: '#A1887F', accent: '#FFD54F' },
    chienbinh:  { base: '#FFB74D', shadow: '#E69500', highlight: '#FFE082', accent: '#757575' },
    longbao:    { base: '#FFD54F', shadow: '#FFAB00', highlight: '#FFF176', accent: '#E53935' },
    giapronghan:{ base: '#FFD700', shadow: '#DAA520', highlight: '#FFF8E1', glow: '#FFF59D' },
  },

  // ─── MOUNT ─────────────────────────────────────────────
  mounts: {
    trau:    { base: '#424242', shadow: '#212121', highlight: '#616161', horn: '#8D6E63' },
    ngua:    { base: '#9E9E9E', shadow: '#616161', highlight: '#E0E0E0', fire: '#FF6D00' },
    thuyen:  { base: '#C62828', shadow: '#8E0000', highlight: '#EF5350', gold: '#FFD54F' },
    rong:    { base: '#00BCD4', shadow: '#00838F', highlight: '#4DD0E1', whisker: '#FFD54F' },
  },

  // ─── ENEMIES ───────────────────────────────────────────
  enemies: {
    // Map 1: Sài Gòn
    rat:         { base: '#795548', shadow: '#5D4037', highlight: '#8D6E63', eye: '#F44336' },
    cockroach:   { base: '#5D4037', shadow: '#3E2723', highlight: '#795548' },
    strayCat:    { base: '#FF8F00', shadow: '#E65100', highlight: '#FFB74D', eye: '#4CAF50' },
    strayDog:    { base: '#8D6E63', shadow: '#5D4037', highlight: '#A1887F' },
    mosquito:    { base: '#424242', shadow: '#212121', highlight: '#616161' },
    // Map 2: Vũng Tàu
    crab:        { base: '#E64A19', shadow: '#BF360C', highlight: '#FF7043' },
    jellyfish:   { base: '#CE93D8', shadow: '#AB47BC', highlight: '#E1BEE7' },
    pufferfish:  { base: '#FDD835', shadow: '#F9A825', highlight: '#FFF176' },
    starfish:    { base: '#AD1457', shadow: '#880E4F', highlight: '#D81B60' },
    miniOctopus: { base: '#5C6BC0', shadow: '#3949AB', highlight: '#7986CB' },
    // Map 3: Miền Tây
    snake:       { base: '#689F38', shadow: '#558B2F', highlight: '#8BC34A' },
    poisonFrog:  { base: '#FF6F00', shadow: '#E65100', highlight: '#FFA000', spots: '#212121' },
    babyCroc:    { base: '#558B2F', shadow: '#33691E', highlight: '#7CB342', belly: '#FFF9C4' },
    scorpion:    { base: '#6D4C41', shadow: '#4E342E', highlight: '#8D6E63' },
    leech:       { base: '#3E2723', shadow: '#1B0000', highlight: '#5D4037' },
    // Map 4: Đà Lạt
    spider:      { base: '#4A148C', shadow: '#12005E', highlight: '#7B1FA2', eye: '#F44336' },
    beetle:      { base: '#BF360C', shadow: '#870000', highlight: '#E64A19' },
    bat:         { base: '#212121', shadow: '#000000', highlight: '#424242', eye: '#FFEB3B' },
    mushroom:    { base: '#D32F2F', shadow: '#9A0007', highlight: '#FF6659', spots: '#FFFFFF' },
    fireflySwarm:{ base: '#FFEB3B', shadow: '#FBC02D', highlight: '#FFF9C4', glow: '#FFF59D' },
    // Map 5: Hà Nội
    ghostSoldier:{ base: '#80CBC4', shadow: '#4DB6AC', highlight: '#B2DFDB', eye: '#F44336' },
    shadowSamurai:{ base: '#1A1A2E', shadow: '#0D0D1A', highlight: '#2D2D4A', eye: '#F44336' },
    foxSpirit:   { base: '#FFFFFF', shadow: '#E0E0E0', highlight: '#FFFFFF', fire: '#00E676' },
    oni:         { base: '#C62828', shadow: '#8E0000', highlight: '#EF5350' },
    paperLantern:{ base: '#E53935', shadow: '#C62828', highlight: '#EF5350', fire: '#00E676' },
  },

  // ─── BOSS ──────────────────────────────────────────────
  bosses: {
    ratKing:     { base: '#424242', shadow: '#212121', highlight: '#616161', crown: '#FFD54F', cape: '#C62828' },
    octopus:     { base: '#7B1FA2', shadow: '#4A0072', highlight: '#AB47BC', eye: '#FFEB3B' },
    goldenCroc:  { base: '#FFD54F', shadow: '#FFAB00', highlight: '#FFF176', eye: '#F44336', teeth: '#FFFFFF' },
    pineSpirit:  { base: '#5D4037', shadow: '#3E2723', highlight: '#795548', eye: '#00E676', leaves: '#2E7D32' },
    dragon:      { base: '#FFB300', shadow: '#E69500', highlight: '#FFD54F', eye: '#F44336', mane: '#C62828' },
  },

  // ─── DROP ITEMS ────────────────────────────────────────
  items: {
    gold:      { base: '#FFC107', shadow: '#FFA000', highlight: '#FFD54F', glow: '#FFF8E1' },
    hpSmall:   { base: '#4CAF50', shadow: '#388E3C', highlight: '#81C784' },
    hpLarge:   { base: '#66BB6A', shadow: '#43A047', highlight: '#A5D6A7', glow: '#E8F5E9' },
    dmgUp:     { base: '#FF5722', shadow: '#D84315', highlight: '#FF8A65' },
    speedUp:   { base: '#2196F3', shadow: '#1976D2', highlight: '#64B5F6' },
    atkSpeed:  { base: '#FF8F00', shadow: '#E65100', highlight: '#FFB74D' },
    multiShot: { base: '#FF9800', shadow: '#EF6C00', highlight: '#FFB74D' },
    shield:    { base: '#FFD700', shadow: '#DAA520', highlight: '#FFF8E1' },
    magnet:    { base: '#F44336', shadow: '#D32F2F', highlight: '#EF5350', blue: '#2196F3' },
    crit:      { base: '#B71C1C', shadow: '#7F0000', highlight: '#E53935', glow: '#FFCDD2' },
  },

  // ─── MAP TILESETS ──────────────────────────────────────
  maps: {
    saigon: {
      road:     { base: '#757575', shadow: '#616161', highlight: '#9E9E9E' },
      sidewalk: { base: '#D32F2F', shadow: '#B71C1C', highlight: '#EF5350', alt: '#FDD835' },
      grass:    { base: '#66BB6A', shadow: '#43A047', highlight: '#A5D6A7' },
      building: { base: '#FFF8E1', shadow: '#FFECB3', highlight: '#FFFFFF' },
    },
    vungtau: {
      sand:     { base: '#FFE0B2', shadow: '#FFCC80', highlight: '#FFF3E0' },
      wetSand:  { base: '#D7CCC8', shadow: '#BCAAA4', highlight: '#EFEBE9' },
      shallow:  { base: '#4DD0E1', shadow: '#00ACC1', highlight: '#80DEEA' },
      deep:     { base: '#0277BD', shadow: '#01579B', highlight: '#0288D1' },
      coral:    { base: '#F48FB1', shadow: '#EC407A', highlight: '#F8BBD0' },
    },
    mientay: {
      riceGreen: { base: '#8BC34A', shadow: '#689F38', highlight: '#AED581' },
      riceGold:  { base: '#FFD54F', shadow: '#FFAB00', highlight: '#FFF176' },
      mud:       { base: '#8D6E63', shadow: '#6D4C41', highlight: '#A1887F' },
      water:     { base: '#4DB6AC', shadow: '#00897B', highlight: '#80CBC4' },
    },
    dalat: {
      pineFloor: { base: '#A1887F', shadow: '#8D6E63', highlight: '#BCAAA4' },
      grass:     { base: '#388E3C', shadow: '#1B5E20', highlight: '#4CAF50' },
      dirt:      { base: '#8D6E63', shadow: '#5D4037', highlight: '#A1887F' },
      flowers:   { base: '#F06292', shadow: '#EC407A', highlight: '#F8BBD0' },
    },
    hanoi: {
      brick:     { base: '#C62828', shadow: '#8E0000', highlight: '#E53935' },
      stone:     { base: '#9E9E9E', shadow: '#757575', highlight: '#BDBDBD' },
      wood:      { base: '#5D4037', shadow: '#3E2723', highlight: '#795548' },
      garden:    { base: '#43A047', shadow: '#2E7D32', highlight: '#66BB6A' },
      lotus:     { base: '#EC407A', shadow: '#C2185B', highlight: '#F48FB1' },
    },
  },

  // ─── VFX ───────────────────────────────────────────────
  fx: {
    fire:     { base: '#FF9800', shadow: '#F57C00', highlight: '#FFB74D', core: '#FFF176' },
    ice:      { base: '#4FC3F7', shadow: '#0288D1', highlight: '#B3E5FC', core: '#FFFFFF' },
    poison:   { base: '#7B1FA2', shadow: '#4A0072', highlight: '#CE93D8', core: '#F48FB1' },
    heal:     { base: '#4CAF50', shadow: '#388E3C', highlight: '#A5D6A7' },
    gold:     { base: '#FFC107', shadow: '#FFA000', highlight: '#FFD54F' },
    electric: { base: '#FFEB3B', shadow: '#FBC02D', highlight: '#FFF9C4' },
    water:    { base: '#00BCD4', shadow: '#00838F', highlight: '#4DD0E1' },
  },

  // ─── UI ────────────────────────────────────────────────
  ui: {
    primary:    { base: '#FF9800', shadow: '#E65100', highlight: '#FFB74D' },
    secondary:  { base: '#4CAF50', shadow: '#2E7D32', highlight: '#81C784' },
    danger:     { base: '#F44336', shadow: '#C62828', highlight: '#EF5350' },
    info:       { base: '#2196F3', shadow: '#1565C0', highlight: '#64B5F6' },
    dark:       { base: '#37474F', shadow: '#263238', highlight: '#546E7A' },
    light:      { base: '#FAFAFA', shadow: '#E0E0E0', highlight: '#FFFFFF' },
    gold:       { base: '#FFD54F', shadow: '#FFAB00', highlight: '#FFF176' },
    panelBg:    { base: '#FFFFFF', border: '#FF9800', shadow: 'rgba(0,0,0,0.15)' },
    panelDark:  { base: 'rgba(0,0,0,0.70)', border: '#FFD54F' },
    hpGreen:    '#4CAF50',
    hpYellow:   '#FFC107',
    hpRed:      '#F44336',
  },

  // ─── COMMON ────────────────────────────────────────────
  common: {
    outline:       '#2C1810',
    outlineLight:  '#5D4037',
    white:         '#FFFFFF',
    black:         '#000000',
    transparent:   'rgba(0,0,0,0)',
  },
};

module.exports = PALETTE;
