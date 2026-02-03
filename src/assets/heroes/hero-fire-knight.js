/**
 * hero-fire-knight.js — Fire Knight (Fire / Sword)
 *
 * Element: Fire
 * Weapon: Flame Sword
 * Accent: Fire embers, sparks
 * Outline: #3D2314 (dark brown, warm subject)
 */

var base = (typeof require !== 'undefined')
  ? require('./hero-base')
  : window.HeroBase;

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
var FIRE_PALETTE = {
  primary:        '#EF4444',
  primaryShadow:  '#B91C1C',
  primaryHighlight:'#F87171',
  secondary:      '#F59E0B',
  secondaryShadow:'#D97706',
  secondaryHighlight:'#FBBF24',
  accent:         '#1E293B',   // dark trim
  skin:           '#FFCFAA',
  skinShadow:     '#F0B088',
  outline:        '#3D2314',
  weaponBlade:    '#F59E0B',
  weaponEdge:     '#FDE047',
  weaponGuard:    '#EF4444',
  weaponHandle:   '#78350F'
};

// ---------------------------------------------------------------------------
// Weapon: Flame Sword (oversized, wider than frost)
// ---------------------------------------------------------------------------
function drawFireSword(ctx, cx, cy, size, palette, frame, anim) {
  var swordLen = size * 0.42;
  var swordW = size * 0.09;
  var handX = cx + size * 0.22;
  var handY = cy + size * 0.02;

  var angle = 0;
  if (anim === 'attack') {
    if (frame === 0) angle = -0.9;
    else if (frame === 1) angle = 1.3;
    else angle = 0.2;
  } else if (anim === 'idle') {
    angle = 0.15 + Math.sin(frame * Math.PI / 2) * 0.05;
  } else if (anim === 'special') {
    angle = -0.6 + frame * 0.35;
  } else {
    angle = 0.15;
  }

  ctx.save();
  ctx.translate(handX, handY);
  ctx.rotate(angle);

  // Handle
  base.roundRect(ctx, -swordW * 0.35, 0, swordW * 0.7, swordLen * 0.28, 2);
  ctx.fillStyle = palette.weaponHandle;
  ctx.fill();

  // Guard — flame-shaped
  ctx.beginPath();
  ctx.ellipse(0, -swordW * 0.1, swordW * 1.3, swordW * 0.45, 0, 0, Math.PI * 2);
  ctx.fillStyle = palette.weaponGuard;
  ctx.fill();

  // Blade outline
  ctx.beginPath();
  ctx.moveTo(-swordW * 0.5, -swordW * 0.3);
  ctx.lineTo(-swordW * 0.55, -swordLen * 0.7);
  ctx.quadraticCurveTo(-swordW * 0.4, -swordLen, 0, -swordLen - swordW * 0.4);
  ctx.quadraticCurveTo(swordW * 0.4, -swordLen, swordW * 0.55, -swordLen * 0.7);
  ctx.lineTo(swordW * 0.5, -swordW * 0.3);
  ctx.closePath();
  ctx.fillStyle = palette.outline;
  ctx.fill();

  // Blade base
  ctx.beginPath();
  ctx.moveTo(-swordW * 0.38, -swordW * 0.2);
  ctx.lineTo(-swordW * 0.42, -swordLen * 0.68);
  ctx.quadraticCurveTo(-swordW * 0.3, -swordLen * 0.95, 0, -swordLen - swordW * 0.2);
  ctx.quadraticCurveTo(swordW * 0.3, -swordLen * 0.95, swordW * 0.42, -swordLen * 0.68);
  ctx.lineTo(swordW * 0.38, -swordW * 0.2);
  ctx.closePath();
  ctx.fillStyle = palette.weaponBlade;
  ctx.fill();

  // Blade highlight (fire gleam)
  ctx.beginPath();
  ctx.moveTo(0, -swordW * 0.3);
  ctx.lineTo(-swordW * 0.12, -swordLen * 0.7);
  ctx.quadraticCurveTo(0, -swordLen * 0.85, swordW * 0.12, -swordLen * 0.7);
  ctx.closePath();
  ctx.fillStyle = palette.weaponEdge;
  ctx.fill();

  // Flame tip flicker
  if (anim === 'attack' || anim === 'special') {
    ctx.beginPath();
    ctx.arc(0, -swordLen - swordW * 0.3, swordW * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(253,224,71,0.5)';
    ctx.fill();
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Armor Accent: Rounded shoulder pads with flame trim
// ---------------------------------------------------------------------------
function drawFireAccents(ctx, cx, cy, size, palette) {
  // Left shoulder pad
  ctx.beginPath();
  ctx.arc(cx - size * 0.16, cy - size * 0.08, size * 0.06, 0, Math.PI * 2);
  ctx.fillStyle = palette.outline;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx - size * 0.16, cy - size * 0.08, size * 0.045, 0, Math.PI * 2);
  ctx.fillStyle = palette.secondary;
  ctx.fill();

  // Right shoulder pad
  ctx.beginPath();
  ctx.arc(cx + size * 0.16, cy - size * 0.08, size * 0.06, 0, Math.PI * 2);
  ctx.fillStyle = palette.outline;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + size * 0.16, cy - size * 0.08, size * 0.045, 0, Math.PI * 2);
  ctx.fillStyle = palette.secondary;
  ctx.fill();
}

// ---------------------------------------------------------------------------
// Accent Particles: Fire embers
// ---------------------------------------------------------------------------
function drawFireParticles(ctx, cx, cy, size, frame, anim) {
  if (anim !== 'special' && anim !== 'attack') return;

  var count = (anim === 'special') ? 8 : 4;
  for (var i = 0; i < count; i++) {
    var angle = (frame * 1.2 + i * Math.PI * 2 / count);
    var dist = size * 0.25 + Math.sin(frame * 2 + i) * size * 0.1;
    var px = cx + Math.cos(angle) * dist;
    var py = cy + Math.sin(angle) * dist * 0.5 - size * 0.1;
    var pr = 1 + Math.random() * 1.5;

    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fillStyle = (i % 2 === 0) ? 'rgba(253,224,71,0.7)' : 'rgba(239,68,68,0.6)';
    ctx.fill();
  }
}

// ---------------------------------------------------------------------------
// Main draw function
// ---------------------------------------------------------------------------
function drawFireKnight(ctx, size, palette, frame, anim) {
  palette = palette || FIRE_PALETTE;
  var cx = size / 2;
  var cy = size / 2;
  var headR = size * 0.22;
  var bodyW = size * 0.28;
  var bodyH = size * 0.18;
  var legH = size * 0.12;
  var armW = size * 0.08;

  ctx.save();

  if (anim === 'death') {
    ctx.globalAlpha = base.getDeathAlpha(frame);
  }

  base.applyAnimTransform(ctx, cx, cy, frame, anim, size);

  // Layer 1: Shadow
  base.drawShadow(ctx, cx, cy + size * 0.38, size * 0.25);

  // Layer 2: Legs
  base.drawLegs(ctx, cx, cy + bodyH * 0.4, legH, palette, frame, anim);

  // Layer 3: Body
  base.drawBody(ctx, cx, cy - size * 0.05, bodyW, bodyH, palette);

  // Fire accent shoulder pads
  drawFireAccents(ctx, cx, cy - size * 0.05, size, palette);

  // Layer 4: Arms
  base.drawArms(ctx, cx, cy - size * 0.02, armW, palette, frame, anim);

  // Layer 5: Head
  base.drawHead(ctx, cx, cy - size * 0.2, headR, palette);

  // Layer 6: Face
  base.drawFace(ctx, cx, cy - size * 0.2, headR, palette, anim);

  // Layer 7: Weapon
  drawFireSword(ctx, cx, cy, size, palette, frame, anim);

  // Layer 8: Particles
  drawFireParticles(ctx, cx, cy, size, frame, anim);

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FIRE_PALETTE: FIRE_PALETTE,
    drawFireKnight: drawFireKnight,
    drawFireSword: drawFireSword
  };
}
