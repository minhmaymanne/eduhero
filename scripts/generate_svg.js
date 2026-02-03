#!/usr/bin/env node
/**
 * EduHero — SVG Asset Generator
 *
 * Sinh SVG cho từng sprint, export vào output/sprintN/
 * Usage: node scripts/generate_svg.js [--sprint N]
 */

const fs = require('fs');
const path = require('path');
const {
  assembleHero,
  svgWrap,
  radialGradient,
  linearGradient,
  outlineStyle,
  chibiHead,
  sparkle,
  shadowBlob,
  blurFilter,
  PALETTE,
} = require('../src/templates/chibi_parts');

// ── CLI args ──
const args = process.argv.slice(2);
const sprintIdx = args.indexOf('--sprint');
const sprint = sprintIdx >= 0 ? parseInt(args[sprintIdx + 1], 10) : 0;

const OUTPUT_DIR = path.resolve(__dirname, '..', 'output', `sprint${sprint}`);
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function writeSVG(filename, svgContent) {
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, svgContent, 'utf-8');
  console.log(`  ✔ ${filename}`);
  return filepath;
}

// ═══════════════════════════════════════════════════════════
// SPRINT 0 — Setup & Prototype
// ═══════════════════════════════════════════════════════════

function generateSprint0() {
  console.log('\n🎨 Sprint 0: Setup & Prototype\n');

  // ─── T0.3: Hero Idle Test (4 frames) ───
  console.log('📦 Hero Idle (4 frames):');
  for (let f = 0; f < 4; f++) {
    // Idle breathing: thân lên xuống nhẹ 2px
    const breathOffset = Math.sin((f / 4) * Math.PI * 2) * 1.5;
    // Frame 3: chớp mắt
    const expression = f === 2 ? 'blink' : 'happy';

    const svg = assembleHero({
      expression,
      armPose: 'idle',
      legPose: 'idle',
      frame: f,
      bodyOffsetY: breathOffset,
      pantsColor: 'brown',
    });
    writeSVG(`hero_idle_f${f}.svg`, svg);
  }

  // ─── Style Test: Hero biểu cảm ───
  console.log('\n📦 Hero Expressions (5 portraits):');
  const expressions = ['happy', 'serious', 'hurt', 'thinking', 'celebrate'];
  for (const expr of expressions) {
    const svg = generatePortrait(expr);
    writeSVG(`hero_face_${expr}.svg`, svg);
  }

  // ─── Weapon Icon Test: Nỏ An Dương Vương ───
  console.log('\n📦 Weapon Icon Test:');
  const crossbowSvg = generateCrossbowIcon();
  writeSVG('weapon_icon_ranged_a_test.svg', crossbowSvg);

  // ─── Drop Item Test: Đồng Xu Vàng ───
  console.log('\n📦 Drop Item Test:');
  const goldSvg = generateGoldCoin();
  writeSVG('item_gold_test.svg', goldSvg);

  // ─── Drop Item Test: Bánh Chưng ───
  const banhChungSvg = generateBanhChung();
  writeSVG('item_hp_small_test.svg', banhChungSvg);

  // ─── UI Button Test ───
  console.log('\n📦 UI Button Test:');
  const btnSvg = generatePlayButton();
  writeSVG('ui_btn_play_test.svg', btnSvg);

  // ─── Tile Test: Sài Gòn road ───
  console.log('\n📦 Tile Test:');
  const tileSvg = generateSaigonRoadTile();
  writeSVG('tile_sg_road_test.svg', tileSvg);

  console.log(`\n✅ Sprint 0 done! ${fs.readdirSync(OUTPUT_DIR).length} files → ${OUTPUT_DIR}\n`);
}

// ═══════════════════════════════════════════════════════════
// PORTRAIT GENERATOR (64×64 hero face)
// ═══════════════════════════════════════════════════════════

function generatePortrait(expression) {
  const head = chibiHead({
    cx: 32,
    cy: 36,
    radius: 27,
    expression,
    showBlush: true,
  });

  return svgWrap(64, 64, head.defs, head.body, `face_${expression}`);
}

// ═══════════════════════════════════════════════════════════
// WEAPON: Nỏ An Dương Vương (96×96)
// ═══════════════════════════════════════════════════════════

function generateCrossbowIcon() {
  const c = PALETTE.weapons.rangedA;
  const outline = PALETTE.common.outline;
  let defs = '';
  let body = '';

  defs += linearGradient('crossbowWood', [c.highlight, c.base, c.shadow], '0%', '0%', '100%', '100%') + '\n';
  defs += linearGradient('crossbowGold', [c.accent, '#FFD54F', c.accentShadow], '0%', '0%', '0%', '100%') + '\n';
  defs += blurFilter('glow', 6) + '\n';

  // Glow background
  body += `    <circle cx="48" cy="48" r="38" fill="${c.accent}" opacity="0.15" filter="url(#glow)" />\n`;

  // Thân nỏ (gỗ đỏ)
  body += `    <!-- Crossbow body -->\n`;
  body += `    <path d="M28 52 L68 52 L72 48 L72 56 L68 52" fill="url(#crossbowWood)" ${outlineStyle(2.5, outline)} />\n`;
  // Cánh nỏ cong
  body += `    <path d="M30 52 Q 20 36, 18 24" fill="none" stroke="url(#crossbowWood)" stroke-width="5" stroke-linecap="round" />\n`;
  body += `    <path d="M30 52 Q 20 68, 18 80" fill="none" stroke="url(#crossbowWood)" stroke-width="5" stroke-linecap="round" />\n`;
  // Outline cho cánh
  body += `    <path d="M30 52 Q 20 36, 18 24" fill="none" ${outlineStyle(2, outline)} />\n`;
  body += `    <path d="M30 52 Q 20 68, 18 80" fill="none" ${outlineStyle(2, outline)} />\n`;

  // Dây cung sáng
  body += `    <path d="M18 24 Q 32 48, 18 80" fill="none" stroke="${c.accent}" stroke-width="2" opacity="0.9" />\n`;
  body += `    <path d="M18 24 Q 32 48, 18 80" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.5" />\n`;

  // Mũi tên vàng lửa
  body += `    <!-- Arrow -->\n`;
  body += `    <line x1="30" y1="48" x2="75" y2="48" stroke="url(#crossbowGold)" stroke-width="3" stroke-linecap="round" />\n`;
  // Đầu tên
  body += `    <polygon points="75,48 68,43 68,53" fill="${c.accent}" stroke="${outline}" stroke-width="1.5" />\n`;
  // Trail lửa nhỏ
  body += `    <circle cx="72" cy="48" r="4" fill="${c.accent}" opacity="0.4" filter="url(#glow)" />\n`;

  // Hoa văn chim lạc nhỏ trên thân
  body += `    <circle cx="48" cy="52" r="3" fill="${c.accentShadow}" opacity="0.6" />\n`;
  body += `    <path d="M46 51 L48 49 L50 51" fill="none" stroke="${c.accent}" stroke-width="1" />\n`;

  // Tay cầm
  body += `    <rect x="56" y="54" width="8" height="12" rx="3" fill="${c.shadow}" stroke="${outline}" stroke-width="2" />\n`;
  body += `    <rect x="57" y="55" width="6" height="4" rx="2" fill="${c.base}" />\n`;

  return svgWrap(96, 96, defs, body, 'weapon_crossbow');
}

// ═══════════════════════════════════════════════════════════
// ITEM: Đồng Xu Vàng (32×32)
// ═══════════════════════════════════════════════════════════

function generateGoldCoin() {
  const c = PALETTE.items.gold;
  let defs = '';
  let body = '';

  defs += radialGradient('coinGrad', [c.highlight, c.base, c.shadow], '40%', '35%', '55%') + '\n';
  defs += blurFilter('coinGlow', 3) + '\n';

  // Glow
  body += `    <circle cx="16" cy="16" r="14" fill="${c.glow}" opacity="0.3" filter="url(#coinGlow)" />\n`;
  // Đồng xu chính
  body += `    <circle cx="16" cy="16" r="12" fill="url(#coinGrad)" stroke="${c.shadow}" stroke-width="2" />\n`;
  // Viền trong
  body += `    <circle cx="16" cy="16" r="9" fill="none" stroke="${c.highlight}" stroke-width="1" opacity="0.6" />\n`;
  // Hoa văn trống đồng (mặt trời nhỏ giữa)
  body += `    <circle cx="16" cy="16" r="3" fill="${c.shadow}" opacity="0.5" />\n`;
  body += `    <circle cx="16" cy="16" r="1.5" fill="${c.highlight}" />\n`;
  // Tia sáng nhỏ
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const x1 = 16 + Math.cos(angle) * 4;
    const y1 = 16 + Math.sin(angle) * 4;
    const x2 = 16 + Math.cos(angle) * 7;
    const y2 = 16 + Math.sin(angle) * 7;
    body += `    <line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${c.shadow}" stroke-width="1" opacity="0.4" />\n`;
  }
  // Highlight shine
  body += `    <ellipse cx="13" cy="12" rx="3" ry="4" fill="#FFFFFF" opacity="0.35" transform="rotate(-20 13 12)" />\n`;

  return svgWrap(32, 32, defs, body, 'gold_coin');
}

// ═══════════════════════════════════════════════════════════
// ITEM: Bánh Chưng nhỏ (32×32)
// ═══════════════════════════════════════════════════════════

function generateBanhChung() {
  const c = PALETTE.items.hpSmall;
  const outline = PALETTE.common.outline;
  let defs = '';
  let body = '';

  defs += linearGradient('banhGrad', [c.highlight, c.base, c.shadow]) + '\n';
  defs += blurFilter('banhGlow', 3) + '\n';

  // Glow
  body += `    <rect x="4" y="4" width="24" height="24" rx="3" fill="${c.base}" opacity="0.2" filter="url(#banhGlow)" />\n`;
  // Lá gói bên ngoài (xanh lá)
  body += `    <rect x="6" y="6" width="20" height="20" rx="3" fill="url(#banhGrad)" stroke="${outline}" stroke-width="2" />\n`;
  // Pattern lá
  body += `    <line x1="8" y1="8" x2="24" y2="24" stroke="${c.shadow}" stroke-width="0.8" opacity="0.3" />\n`;
  body += `    <line x1="24" y1="8" x2="8" y2="24" stroke="${c.shadow}" stroke-width="0.8" opacity="0.3" />\n`;
  // Dây lạt vàng chéo
  body += `    <line x1="6" y1="16" x2="26" y2="16" stroke="#FFD54F" stroke-width="2" stroke-linecap="round" />\n`;
  body += `    <line x1="16" y1="6" x2="16" y2="26" stroke="#FFD54F" stroke-width="2" stroke-linecap="round" />\n`;
  // Nút thắt giữa
  body += `    <circle cx="16" cy="16" r="2.5" fill="#FFD54F" stroke="#E6A800" stroke-width="1" />\n`;
  // Highlight
  body += `    <rect x="8" y="8" width="6" height="6" rx="1" fill="#FFFFFF" opacity="0.2" />\n`;

  return svgWrap(32, 32, defs, body, 'banh_chung');
}

// ═══════════════════════════════════════════════════════════
// UI: Nút "CHƠI LUÔN" (280×70)
// ═══════════════════════════════════════════════════════════

function generatePlayButton() {
  const c = PALETTE.ui.secondary;
  let defs = '';
  let body = '';

  defs += linearGradient('btnGrad', [c.highlight, c.base, c.shadow], '0%', '0%', '0%', '100%') + '\n';
  defs += blurFilter('btnShadow', 4) + '\n';

  // Shadow
  body += `    <rect x="6" y="10" width="268" height="56" rx="28" fill="#000000" opacity="0.2" filter="url(#btnShadow)" />\n`;
  // Button background
  body += `    <rect x="4" y="6" width="272" height="56" rx="28" fill="url(#btnGrad)" stroke="${c.shadow}" stroke-width="3" />\n`;
  // Inner highlight
  body += `    <rect x="12" y="10" width="256" height="24" rx="12" fill="#FFFFFF" opacity="0.2" />\n`;
  // Text: CHƠI LUÔN
  body += `    <text x="140" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF" stroke="${c.shadow}" stroke-width="1">CHƠI LUÔN</text>\n`;
  // Play triangle icon
  body += `    <polygon points="48,26 48,44 60,35" fill="#FFFFFF" opacity="0.9" />\n`;

  return svgWrap(280, 70, defs, body, 'btn_play');
}

// ═══════════════════════════════════════════════════════════
// TILE: Sài Gòn Road (50×50)
// ═══════════════════════════════════════════════════════════

function generateSaigonRoadTile() {
  const c = PALETTE.maps.saigon.road;
  let defs = '';
  let body = '';

  defs += linearGradient('roadGrad', [c.highlight, c.base, c.shadow], '0%', '0%', '100%', '100%') + '\n';

  // Nền đường
  body += `    <rect x="0" y="0" width="50" height="50" fill="url(#roadGrad)" />\n`;
  // Vạch kẻ đường mờ
  body += `    <line x1="23" y1="0" x2="23" y2="12" stroke="#FFFFFF" stroke-width="2" opacity="0.3" stroke-dasharray="6 4" />\n`;
  body += `    <line x1="23" y1="20" x2="23" y2="32" stroke="#FFFFFF" stroke-width="2" opacity="0.3" stroke-dasharray="6 4" />\n`;
  body += `    <line x1="23" y1="40" x2="23" y2="50" stroke="#FFFFFF" stroke-width="2" opacity="0.3" stroke-dasharray="6 4" />\n`;
  // Texture: vết mòn nhẹ
  body += `    <ellipse cx="35" cy="30" rx="6" ry="3" fill="${c.shadow}" opacity="0.15" />\n`;
  body += `    <ellipse cx="12" cy="42" rx="4" ry="2" fill="${c.shadow}" opacity="0.1" />\n`;
  // Cạnh vỉa hè
  body += `    <rect x="46" y="0" width="4" height="50" fill="${PALETTE.maps.saigon.sidewalk.base}" opacity="0.6" />\n`;

  return svgWrap(50, 50, defs, body, 'tile_road');
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════

if (sprint === 0) {
  generateSprint0();
} else {
  console.log(`⚠️  Sprint ${sprint} chưa được implement. Hiện chỉ có Sprint 0.`);
  process.exit(1);
}
