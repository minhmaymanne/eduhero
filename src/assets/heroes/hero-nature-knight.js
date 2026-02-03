/**
 * hero-nature-knight.js — Nature Knight (Nature / Staff)
 *
 * Element: Nature
 * Weapon: Staff with leaf/vine ornament
 * Accent: Leaves, green spores
 * Outline: #1A3A1A (dark green)
 */

var base = (typeof require !== 'undefined')
  ? require('./hero-base')
  : window.HeroBase;

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
var NATURE_PALETTE = {
  primary:        '#22C55E',
  primaryShadow:  '#15803D',
  primaryHighlight:'#4ADE80',
  secondary:      '#84CC16',
  secondaryShadow:'#4D7C0F',
  secondaryHighlight:'#A3E635',
  accent:         '#8B5CF6',   // flower/gem
  skin:           '#FFCFAA',
  skinShadow:     '#F0B088',
  outline:        '#1A3A1A',
  staffWood:      '#92400E',
  staffWoodDark:  '#78350F',
  staffGem:       '#8B5CF6',
  staffLeaf:      '#4ADE80'
};

// ---------------------------------------------------------------------------
// Weapon: Nature Staff (oversized, organic shape)
// ---------------------------------------------------------------------------
function drawNatureStaff(ctx, cx, cy, size, palette, frame, anim) {
  var staffLen = size * 0.48;
  var staffW = size * 0.04;
  var handX = cx + size * 0.2;
  var handY = cy + size * 0.05;

  var angle = 0;
  if (anim === 'attack') {
    if (frame === 0) angle = -0.3;
    else if (frame === 1) angle = 0.6;
    else angle = 0.1;
  } else if (anim === 'idle') {
    angle = 0.08 + Math.sin(frame * Math.PI / 2) * 0.04;
  } else if (anim === 'special') {
    angle = -0.4 + frame * 0.25;
  } else {
    angle = 0.08;
  }

  ctx.save();
  ctx.translate(handX, handY);
  ctx.rotate(angle);

  // Staff shaft outline
  base.roundRect(ctx, -staffW / 2 - 1.5, -staffLen, staffW + 3, staffLen + size * 0.08, staffW / 2);
  ctx.fillStyle = palette.outline;
  ctx.fill();

  // Staff shaft
  base.roundRect(ctx, -staffW / 2, -staffLen + 1, staffW, staffLen + size * 0.06, staffW / 2);
  ctx.fillStyle = palette.staffWood;
  ctx.fill();

  // Staff shaft shadow
  base.roundRect(ctx, 0, -staffLen + 1, staffW / 3, staffLen + size * 0.06, staffW / 4);
  ctx.fillStyle = palette.staffWoodDark;
  ctx.fill();

  // Vine wrap (spiral detail)
  for (var i = 0; i < 4; i++) {
    var vy = -staffLen * 0.3 - i * staffLen * 0.15;
    ctx.beginPath();
    ctx.ellipse(0, vy, staffW * 0.8, staffW * 0.3, 0.3 * i, 0, Math.PI);
    ctx.strokeStyle = palette.primaryHighlight;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Staff head — leaf ornament
  ctx.beginPath();
  ctx.ellipse(-staffW * 0.5, -staffLen - size * 0.02, size * 0.04, size * 0.025, -0.6, 0, Math.PI * 2);
  ctx.fillStyle = palette.staffLeaf;
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(staffW * 0.5, -staffLen - size * 0.02, size * 0.04, size * 0.025, 0.6, 0, Math.PI * 2);
  ctx.fillStyle = palette.staffLeaf;
  ctx.fill();

  // Gem at top
  ctx.beginPath();
  ctx.arc(0, -staffLen - size * 0.01, size * 0.03, 0, Math.PI * 2);
  ctx.fillStyle = palette.outline;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, -staffLen - size * 0.01, size * 0.022, 0, Math.PI * 2);
  ctx.fillStyle = palette.staffGem;
  ctx.fill();

  // Gem glow
  ctx.beginPath();
  ctx.arc(0, -staffLen - size * 0.01, size * 0.04, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(139,92,246,0.2)';
  ctx.fill();

  // Gem highlight
  ctx.beginPath();
  ctx.arc(-size * 0.008, -staffLen - size * 0.02, size * 0.008, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Armor Accent: Organic vine/leaf shoulder details
// ---------------------------------------------------------------------------
function drawNatureAccents(ctx, cx, cy, size, palette) {
  // Leaf on left shoulder
  ctx.beginPath();
  ctx.ellipse(cx - size * 0.16, cy - size * 0.1, size * 0.05, size * 0.025, -0.5, 0, Math.PI * 2);
  ctx.fillStyle = palette.primaryHighlight;
  ctx.fill();

  // Leaf on right shoulder
  ctx.beginPath();
  ctx.ellipse(cx + size * 0.16, cy - size * 0.1, size * 0.05, size * 0.025, 0.5, 0, Math.PI * 2);
  ctx.fillStyle = palette.primaryHighlight;
  ctx.fill();

  // Small flower gem on chest
  ctx.beginPath();
  ctx.arc(cx, cy - size * 0.02, size * 0.02, 0, Math.PI * 2);
  ctx.fillStyle = palette.accent;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy - size * 0.02, size * 0.012, 0, Math.PI * 2);
  ctx.fillStyle = '#DDD6FE';
  ctx.fill();
}

// ---------------------------------------------------------------------------
// Accent Particles: Leaves, green spores
// ---------------------------------------------------------------------------
function drawNatureParticles(ctx, cx, cy, size, frame, anim) {
  if (anim !== 'special' && anim !== 'idle') return;

  var count = (anim === 'special') ? 7 : 3;
  for (var i = 0; i < count; i++) {
    var angle = (frame * 0.7 + i * Math.PI * 2 / count);
    var dist = size * 0.28 + Math.sin(frame + i * 1.5) * size * 0.08;
    var px = cx + Math.cos(angle) * dist;
    var py = cy + Math.sin(angle) * dist * 0.6;
    var leafAngle = frame * 0.5 + i;

    // Small leaf shape
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(leafAngle);
    ctx.beginPath();
    ctx.ellipse(0, 0, 2.5, 1.2, 0, 0, Math.PI * 2);
    ctx.fillStyle = (i % 2 === 0) ? 'rgba(74,222,128,0.6)' : 'rgba(163,230,53,0.5)';
    ctx.fill();
    ctx.restore();
  }
}

// ---------------------------------------------------------------------------
// Main draw function
// ---------------------------------------------------------------------------
function drawNatureKnight(ctx, size, palette, frame, anim) {
  palette = palette || NATURE_PALETTE;
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

  // Nature accent details
  drawNatureAccents(ctx, cx, cy - size * 0.05, size, palette);

  // Layer 4: Arms
  base.drawArms(ctx, cx, cy - size * 0.02, armW, palette, frame, anim);

  // Layer 5: Head
  base.drawHead(ctx, cx, cy - size * 0.2, headR, palette);

  // Layer 6: Face
  base.drawFace(ctx, cx, cy - size * 0.2, headR, palette, anim);

  // Layer 7: Weapon
  drawNatureStaff(ctx, cx, cy, size, palette, frame, anim);

  // Layer 8: Particles
  drawNatureParticles(ctx, cx, cy, size, frame, anim);

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NATURE_PALETTE: NATURE_PALETTE,
    drawNatureKnight: drawNatureKnight,
    drawNatureStaff: drawNatureStaff
  };
}
