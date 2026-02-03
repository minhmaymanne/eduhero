/**
 * hero-shadow-knight.js — Shadow Knight (Dark / Daggers)
 *
 * Element: Dark
 * Weapon: Dual Daggers
 * Accent: Purple smoke, cyan light streaks
 * Outline: #1E293B (dark navy)
 */

var base = (typeof require !== 'undefined')
  ? require('./hero-base')
  : window.HeroBase;

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
var SHADOW_PALETTE = {
  primary:        '#6D28D9',
  primaryShadow:  '#4C1D95',
  primaryHighlight:'#8B5CF6',
  secondary:      '#1E293B',
  secondaryShadow:'#0F172A',
  secondaryHighlight:'#334155',
  accent:         '#22D3EE',   // cyan glow
  skin:           '#E2D5C0',
  skinShadow:     '#C4A882',
  outline:        '#1E293B',
  daggerBlade:    '#94A3B8',
  daggerEdge:     '#E2E8F0',
  daggerGuard:    '#6D28D9',
  daggerHandle:   '#1E293B'
};

// ---------------------------------------------------------------------------
// Weapon: Dual Daggers (one in each hand)
// ---------------------------------------------------------------------------
function drawDualDaggers(ctx, cx, cy, size, palette, frame, anim) {
  var daggerLen = size * 0.22;
  var daggerW = size * 0.035;

  // Left dagger
  var leftX = cx - size * 0.22;
  var leftY = cy + size * 0.02;
  var leftAngle = 0;

  // Right dagger
  var rightX = cx + size * 0.22;
  var rightY = cy + size * 0.02;
  var rightAngle = 0;

  if (anim === 'attack') {
    if (frame === 0) { leftAngle = 0.4; rightAngle = -0.6; }
    else if (frame === 1) { leftAngle = -1.0; rightAngle = 1.2; }
    else { leftAngle = 0.1; rightAngle = -0.1; }
  } else if (anim === 'idle') {
    leftAngle = -0.15 + Math.sin(frame * Math.PI / 2) * 0.05;
    rightAngle = 0.15 - Math.sin(frame * Math.PI / 2) * 0.05;
  } else if (anim === 'special') {
    leftAngle = -0.8 + frame * 0.4;
    rightAngle = 0.8 - frame * 0.4;
  } else {
    leftAngle = -0.15;
    rightAngle = 0.15;
  }

  _drawDagger(ctx, leftX, leftY, daggerLen, daggerW, palette, leftAngle, true);
  _drawDagger(ctx, rightX, rightY, daggerLen, daggerW, palette, rightAngle, false);
}

function _drawDagger(ctx, x, y, len, w, palette, angle, mirrored) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  if (mirrored) ctx.scale(-1, 1);

  // Handle
  base.roundRect(ctx, -w * 0.4, 0, w * 0.8, len * 0.3, 1);
  ctx.fillStyle = palette.daggerHandle;
  ctx.fill();

  // Guard
  base.roundRect(ctx, -w * 1.5, -w * 0.25, w * 3, w * 0.5, 1);
  ctx.fillStyle = palette.daggerGuard;
  ctx.fill();

  // Blade outline
  ctx.beginPath();
  ctx.moveTo(-w * 0.5, -w * 0.2);
  ctx.lineTo(-w * 0.4, -len);
  ctx.lineTo(0, -len - w * 0.8);
  ctx.lineTo(w * 0.4, -len);
  ctx.lineTo(w * 0.5, -w * 0.2);
  ctx.closePath();
  ctx.fillStyle = palette.outline;
  ctx.fill();

  // Blade
  ctx.beginPath();
  ctx.moveTo(-w * 0.35, -w * 0.1);
  ctx.lineTo(-w * 0.28, -len + 1);
  ctx.lineTo(0, -len - w * 0.5);
  ctx.lineTo(w * 0.28, -len + 1);
  ctx.lineTo(w * 0.35, -w * 0.1);
  ctx.closePath();
  ctx.fillStyle = palette.daggerBlade;
  ctx.fill();

  // Blade edge highlight
  ctx.beginPath();
  ctx.moveTo(-w * 0.1, -w * 0.15);
  ctx.lineTo(-w * 0.05, -len * 0.8);
  ctx.lineTo(w * 0.08, -len * 0.75);
  ctx.lineTo(w * 0.1, -w * 0.15);
  ctx.closePath();
  ctx.fillStyle = palette.daggerEdge;
  ctx.fill();

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Armor Accent: Sleek dark trim with cyan glow
// ---------------------------------------------------------------------------
function drawShadowAccents(ctx, cx, cy, size, palette) {
  // Shoulder spikes (angular, sleek)
  // Left
  ctx.beginPath();
  ctx.moveTo(cx - size * 0.17, cy - size * 0.04);
  ctx.lineTo(cx - size * 0.22, cy - size * 0.12);
  ctx.lineTo(cx - size * 0.13, cy - size * 0.06);
  ctx.closePath();
  ctx.fillStyle = palette.secondaryShadow;
  ctx.fill();

  // Right
  ctx.beginPath();
  ctx.moveTo(cx + size * 0.17, cy - size * 0.04);
  ctx.lineTo(cx + size * 0.22, cy - size * 0.12);
  ctx.lineTo(cx + size * 0.13, cy - size * 0.06);
  ctx.closePath();
  ctx.fillStyle = palette.secondaryShadow;
  ctx.fill();

  // Cyan glow accents on armor
  ctx.beginPath();
  ctx.arc(cx, cy + size * 0.01, size * 0.015, 0, Math.PI * 2);
  ctx.fillStyle = palette.accent;
  ctx.fill();

  // Glow around accent
  ctx.beginPath();
  ctx.arc(cx, cy + size * 0.01, size * 0.03, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(34,211,238,0.15)';
  ctx.fill();
}

// ---------------------------------------------------------------------------
// Accent Particles: Purple smoke, cyan streaks
// ---------------------------------------------------------------------------
function drawShadowParticles(ctx, cx, cy, size, frame, anim) {
  if (anim !== 'special' && anim !== 'idle') return;

  var count = (anim === 'special') ? 8 : 3;
  for (var i = 0; i < count; i++) {
    var angle = (frame * 0.9 + i * Math.PI * 2 / count);
    var dist = size * 0.25 + Math.sin(frame + i * 2) * size * 0.1;
    var px = cx + Math.cos(angle) * dist;
    var py = cy + Math.sin(angle) * dist * 0.5;
    var pr = 1.5 + Math.random() * 2;

    if (i % 3 === 0) {
      // Cyan streak
      ctx.beginPath();
      ctx.arc(px, py, pr * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34,211,238,0.5)';
      ctx.fill();
    } else {
      // Purple smoke
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(109,40,217,0.3)';
      ctx.fill();
    }
  }
}

// ---------------------------------------------------------------------------
// Main draw function
// ---------------------------------------------------------------------------
function drawShadowKnight(ctx, size, palette, frame, anim) {
  palette = palette || SHADOW_PALETTE;
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

  // Shadow accent details
  drawShadowAccents(ctx, cx, cy - size * 0.05, size, palette);

  // Layer 4: Arms
  base.drawArms(ctx, cx, cy - size * 0.02, armW, palette, frame, anim);

  // Layer 5: Head
  base.drawHead(ctx, cx, cy - size * 0.2, headR, palette);

  // Layer 6: Face
  base.drawFace(ctx, cx, cy - size * 0.2, headR, palette, anim);

  // Layer 7: Weapons (dual daggers)
  drawDualDaggers(ctx, cx, cy, size, palette, frame, anim);

  // Layer 8: Particles
  drawShadowParticles(ctx, cx, cy, size, frame, anim);

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SHADOW_PALETTE: SHADOW_PALETTE,
    drawShadowKnight: drawShadowKnight,
    drawDualDaggers: drawDualDaggers
  };
}
