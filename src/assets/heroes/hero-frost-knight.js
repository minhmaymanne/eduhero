/**
 * hero-frost-knight.js — Frost Knight (Ice / Sword)
 *
 * Element: Ice
 * Weapon: Oversized Sword
 * Accent: Snow particles, ice crystals
 * Outline: #1E293B (dark navy)
 */

var base = (typeof require !== 'undefined')
  ? require('./hero-base')
  : window.HeroBase;

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
var FROST_PALETTE = {
  primary:        '#4F46E5',
  primaryShadow:  '#3730A3',
  primaryHighlight:'#6366F1',
  secondary:      '#3B82F6',
  secondaryShadow:'#1D4ED8',
  secondaryHighlight:'#60A5FA',
  accent:         '#EF4444',   // cape
  skin:           '#FFCFAA',
  skinShadow:     '#F0B088',
  outline:        '#1E293B',
  weaponBlade:    '#93C5FD',
  weaponEdge:     '#DBEAFE',
  weaponGuard:    '#F59E0B',
  weaponHandle:   '#78350F'
};

// ---------------------------------------------------------------------------
// Weapon: Ice Sword (oversized)
// ---------------------------------------------------------------------------
function drawFrostSword(ctx, cx, cy, size, palette, frame, anim) {
  var swordLen = size * 0.4;
  var swordW = size * 0.08;
  var handX = cx + size * 0.22;
  var handY = cy + size * 0.02;

  var angle = 0;
  if (anim === 'attack') {
    if (frame === 0) angle = -0.8;       // wind-up
    else if (frame === 1) angle = 1.2;   // strike forward
    else angle = 0.2;                     // recover
  } else if (anim === 'idle') {
    angle = 0.15 + Math.sin(frame * Math.PI / 2) * 0.05;
  } else if (anim === 'special') {
    angle = -0.5 + frame * 0.3;
  } else {
    angle = 0.15;
  }

  ctx.save();
  ctx.translate(handX, handY);
  ctx.rotate(angle);

  // Handle
  base.roundRect(ctx, -swordW * 0.35, 0, swordW * 0.7, swordLen * 0.3, 2);
  ctx.fillStyle = palette.weaponHandle;
  ctx.fill();

  // Guard (cross-piece)
  base.roundRect(ctx, -swordW * 1.2, -swordW * 0.3, swordW * 2.4, swordW * 0.6, 2);
  ctx.fillStyle = palette.weaponGuard;
  ctx.fill();

  // Blade outline
  ctx.beginPath();
  ctx.moveTo(0, -swordW * 0.3);
  ctx.lineTo(-swordW * 0.55, -swordW * 0.3);
  ctx.lineTo(-swordW * 0.45, -swordLen);
  ctx.lineTo(0, -swordLen - swordW * 0.5);
  ctx.lineTo(swordW * 0.45, -swordLen);
  ctx.lineTo(swordW * 0.55, -swordW * 0.3);
  ctx.closePath();
  ctx.fillStyle = palette.outline;
  ctx.fill();

  // Blade
  ctx.beginPath();
  ctx.moveTo(0, -swordW * 0.2);
  ctx.lineTo(-swordW * 0.4, -swordW * 0.2);
  ctx.lineTo(-swordW * 0.32, -swordLen + 2);
  ctx.lineTo(0, -swordLen - swordW * 0.3);
  ctx.lineTo(swordW * 0.32, -swordLen + 2);
  ctx.lineTo(swordW * 0.4, -swordW * 0.2);
  ctx.closePath();
  ctx.fillStyle = palette.weaponBlade;
  ctx.fill();

  // Blade highlight (ice gleam)
  ctx.beginPath();
  ctx.moveTo(-swordW * 0.1, -swordW * 0.3);
  ctx.lineTo(-swordW * 0.08, -swordLen * 0.8);
  ctx.lineTo(swordW * 0.08, -swordLen * 0.7);
  ctx.lineTo(swordW * 0.1, -swordW * 0.3);
  ctx.closePath();
  ctx.fillStyle = palette.weaponEdge;
  ctx.fill();

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Cape (accent element)
// ---------------------------------------------------------------------------
function drawCape(ctx, cx, cy, size, palette, frame, anim) {
  var capeW = size * 0.22;
  var capeH = size * 0.2;
  var capeX = cx;
  var capeY = cy + size * 0.05;

  var wave = Math.sin(frame * Math.PI / 2) * capeH * 0.08;

  ctx.save();

  // Cape outline
  ctx.beginPath();
  ctx.moveTo(capeX - capeW / 2 - 1, capeY - 2);
  ctx.quadraticCurveTo(capeX - capeW * 0.6, capeY + capeH + wave + 2, capeX - capeW * 0.15, capeY + capeH + wave + 2);
  ctx.lineTo(capeX + capeW * 0.15, capeY + capeH - wave + 2);
  ctx.quadraticCurveTo(capeX + capeW * 0.6, capeY + capeH - wave + 2, capeX + capeW / 2 + 1, capeY - 2);
  ctx.closePath();
  ctx.fillStyle = palette.outline;
  ctx.fill();

  // Cape fill
  ctx.beginPath();
  ctx.moveTo(capeX - capeW / 2, capeY);
  ctx.quadraticCurveTo(capeX - capeW * 0.55, capeY + capeH + wave, capeX - capeW * 0.1, capeY + capeH + wave);
  ctx.lineTo(capeX + capeW * 0.1, capeY + capeH - wave);
  ctx.quadraticCurveTo(capeX + capeW * 0.55, capeY + capeH - wave, capeX + capeW / 2, capeY);
  ctx.closePath();
  ctx.fillStyle = palette.accent;
  ctx.fill();

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Accent Particles: Snow / Ice Crystals
// ---------------------------------------------------------------------------
function drawFrostParticles(ctx, cx, cy, size, frame, anim) {
  if (anim !== 'special' && anim !== 'idle') return;

  var count = (anim === 'special') ? 6 : 3;
  ctx.fillStyle = 'rgba(219,234,254,0.6)';

  for (var i = 0; i < count; i++) {
    var angle = (frame * 0.8 + i * Math.PI * 2 / count);
    var dist = size * 0.3 + Math.sin(frame + i) * size * 0.08;
    var px = cx + Math.cos(angle) * dist;
    var py = cy + Math.sin(angle) * dist * 0.6;
    var pr = 1 + Math.random() * 1.5;

    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ---------------------------------------------------------------------------
// Main draw function
// ---------------------------------------------------------------------------
function drawFrostKnight(ctx, size, palette, frame, anim) {
  palette = palette || FROST_PALETTE;
  var cx = size / 2;
  var cy = size / 2;
  var headR = size * 0.22;
  var bodyW = size * 0.28;
  var bodyH = size * 0.18;
  var legH = size * 0.12;
  var armW = size * 0.08;

  ctx.save();

  // Death alpha
  if (anim === 'death') {
    ctx.globalAlpha = base.getDeathAlpha(frame);
  }

  // Animation transforms
  base.applyAnimTransform(ctx, cx, cy, frame, anim, size);

  // Layer 1: Shadow
  base.drawShadow(ctx, cx, cy + size * 0.38, size * 0.25);

  // Layer 2: Cape (behind body)
  drawCape(ctx, cx, cy - size * 0.05, size, palette, frame, anim);

  // Layer 3: Legs
  base.drawLegs(ctx, cx, cy + bodyH * 0.4, legH, palette, frame, anim);

  // Layer 4: Body
  base.drawBody(ctx, cx, cy - size * 0.05, bodyW, bodyH, palette);

  // Layer 5: Back arm (simplified — drawn as part of drawArms)
  base.drawArms(ctx, cx, cy - size * 0.02, armW, palette, frame, anim);

  // Layer 6: Head
  base.drawHead(ctx, cx, cy - size * 0.2, headR, palette);

  // Layer 7: Face
  base.drawFace(ctx, cx, cy - size * 0.2, headR, palette, anim);

  // Layer 8: Weapon
  drawFrostSword(ctx, cx, cy, size, palette, frame, anim);

  // Layer 9: Accent particles
  drawFrostParticles(ctx, cx, cy, size, frame, anim);

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FROST_PALETTE: FROST_PALETTE,
    drawFrostKnight: drawFrostKnight,
    drawFrostSword: drawFrostSword
  };
}
