/**
 * projectile-dark-orb.js — Dark Orb projectile for Shadow Knight
 *
 * Shape: Circle with pulse glow
 * Canvas: 32×32, display 16-20px
 * Core: #7C3AED, Glow: #A78BFA @ alpha 0.3
 * Characteristic: Size oscillation, pulse glow
 * Animation: 3 frames (pulse size + glow intensity cycle)
 */

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
var DARK_ORB_PALETTE = {
  core:      '#7C3AED',
  glow:      '#A78BFA',
  inner:     '#DDD6FE',
  outline:   '#1E293B',
  cyanAccent:'#22D3EE',
  trail:     'rgba(124,58,237,0.2)'
};

// ---------------------------------------------------------------------------
// Draw function
// ---------------------------------------------------------------------------
function drawDarkOrb(ctx, size, palette, frame) {
  palette = palette || DARK_ORB_PALETTE;
  var cx = size / 2;
  var cy = size / 2;

  // Size oscillation: pulse between 0.24 and 0.32 of size
  var pulsePhase = frame * Math.PI * 2 / 3;
  var r = size * (0.28 + Math.sin(pulsePhase) * 0.04);
  var glowIntensity = 0.2 + Math.sin(pulsePhase) * 0.1;

  ctx.save();

  // Outer glow (large, soft)
  ctx.beginPath();
  ctx.arc(cx, cy, r * 2.2, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(124,58,237,' + (glowIntensity * 0.5) + ')';
  ctx.fill();

  // Mid glow
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(167,139,250,' + glowIntensity + ')';
  ctx.fill();

  // Outline
  ctx.beginPath();
  ctx.arc(cx, cy, r + 1.5, 0, Math.PI * 2);
  ctx.fillStyle = palette.outline;
  ctx.fill();

  // Core orb with radial gradient
  var grad = ctx.createRadialGradient(
    cx - r * 0.2, cy - r * 0.2, 0,
    cx, cy, r
  );
  grad.addColorStop(0, palette.inner);
  grad.addColorStop(0.35, palette.core);
  grad.addColorStop(1, '#4C1D95');

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Inner bright spot
  ctx.beginPath();
  ctx.arc(cx - r * 0.25, cy - r * 0.25, r * 0.25, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fill();

  // Cyan accent spark (rotating)
  var sparkAngle = frame * Math.PI * 2 / 3;
  var sparkDist = r * 0.6;
  var sparkX = cx + Math.cos(sparkAngle) * sparkDist;
  var sparkY = cy + Math.sin(sparkAngle) * sparkDist;
  ctx.beginPath();
  ctx.arc(sparkX, sparkY, 1.2, 0, Math.PI * 2);
  ctx.fillStyle = palette.cyanAccent;
  ctx.fill();

  // Second cyan accent (opposite side)
  var spark2X = cx + Math.cos(sparkAngle + Math.PI) * sparkDist * 0.8;
  var spark2Y = cy + Math.sin(sparkAngle + Math.PI) * sparkDist * 0.8;
  ctx.beginPath();
  ctx.arc(spark2X, spark2Y, 0.8, 0, Math.PI * 2);
  ctx.fillStyle = palette.cyanAccent;
  ctx.fill();

  // Trailing shadow particles
  for (var i = 0; i < 3; i++) {
    var tAngle = sparkAngle + Math.PI + (i - 1) * 0.5;
    var tDist = r * (1.3 + i * 0.4);
    var tx = cx + Math.cos(tAngle) * tDist;
    var ty = cy + Math.sin(tAngle) * tDist;
    var tr = 1.2 - i * 0.3;

    ctx.beginPath();
    ctx.arc(tx, ty, tr, 0, Math.PI * 2);
    ctx.fillStyle = palette.trail;
    ctx.fill();
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Spritesheet generation (3 frames in a row)
// ---------------------------------------------------------------------------
function generateDarkOrbCanvas() {
  var frameSize = 32;
  var frames = 3;
  var canvas = document.createElement('canvas');
  canvas.width = frameSize * frames;
  canvas.height = frameSize;
  var ctx = canvas.getContext('2d');

  for (var i = 0; i < frames; i++) {
    ctx.save();
    ctx.translate(i * frameSize, 0);
    drawDarkOrb(ctx, frameSize, null, i);
    ctx.restore();
  }

  return canvas;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DARK_ORB_PALETTE: DARK_ORB_PALETTE,
    drawDarkOrb: drawDarkOrb,
    generateDarkOrbCanvas: generateDarkOrbCanvas
  };
}
