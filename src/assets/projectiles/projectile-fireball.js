/**
 * projectile-fireball.js — Fireball projectile for Fire Knight
 *
 * Shape: Circle with radial gradient (3 layers)
 * Canvas: 32×32, display 16-20px
 * Core: #FDE047, Mid: #F59E0B, Outer: #EF4444
 * Characteristic: Radial gradient 3 layers, edge flickering
 * Animation: 3 frames (flicker variation)
 */

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
var FIREBALL_PALETTE = {
  core:    '#FDE047',
  mid:     '#F59E0B',
  outer:   '#EF4444',
  outline: '#3D2314',
  glow:    'rgba(239,68,68,0.3)'
};

// ---------------------------------------------------------------------------
// Draw function
// ---------------------------------------------------------------------------
function drawFireball(ctx, size, palette, frame) {
  palette = palette || FIREBALL_PALETTE;
  var cx = size / 2;
  var cy = size / 2;
  var r = size * 0.3;

  ctx.save();

  // Outer glow
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.6, 0, Math.PI * 2);
  ctx.fillStyle = palette.glow;
  ctx.fill();

  // Flicker offset per frame
  var flickerX = Math.sin(frame * 1.8) * r * 0.08;
  var flickerY = Math.cos(frame * 1.3) * r * 0.06;

  // Radial gradient (3 layers)
  var grad = ctx.createRadialGradient(
    cx + flickerX - r * 0.15,
    cy + flickerY - r * 0.15,
    0,
    cx + flickerX,
    cy + flickerY,
    r * 1.1
  );
  grad.addColorStop(0, palette.core);
  grad.addColorStop(0.4, palette.mid);
  grad.addColorStop(1, palette.outer);

  // Outline circle
  ctx.beginPath();
  ctx.arc(cx + flickerX, cy + flickerY, r + 1.5, 0, Math.PI * 2);
  ctx.fillStyle = palette.outline;
  ctx.fill();

  // Main fireball
  ctx.beginPath();
  ctx.arc(cx + flickerX, cy + flickerY, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Core bright spot
  ctx.beginPath();
  ctx.arc(cx + flickerX - r * 0.2, cy + flickerY - r * 0.2, r * 0.3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fill();

  // Edge flicker particles
  var flickerCount = 4 + frame;
  for (var i = 0; i < flickerCount; i++) {
    var angle = (frame * 0.8 + i * Math.PI * 2 / flickerCount);
    var dist = r * (0.85 + Math.random() * 0.4);
    var fx = cx + flickerX + Math.cos(angle) * dist;
    var fy = cy + flickerY + Math.sin(angle) * dist;
    var fr = 0.8 + Math.random() * 1.2;

    ctx.beginPath();
    ctx.arc(fx, fy, fr, 0, Math.PI * 2);
    ctx.fillStyle = (i % 2 === 0) ? palette.core : palette.mid;
    ctx.fill();
  }

  // Trail flame shapes (behind)
  for (var j = 0; j < 2; j++) {
    var tx = cx - r * (1.2 + j * 0.5) + Math.sin(frame + j) * r * 0.2;
    var ty = cy + Math.cos(frame * 2 + j) * r * 0.3;
    var tr = r * (0.3 - j * 0.08);

    ctx.beginPath();
    ctx.arc(tx, ty, tr, 0, Math.PI * 2);
    ctx.fillStyle = (j === 0) ? 'rgba(245,158,11,0.5)' : 'rgba(239,68,68,0.3)';
    ctx.fill();
  }

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Spritesheet generation (3 frames in a row)
// ---------------------------------------------------------------------------
function generateFireballCanvas() {
  var frameSize = 32;
  var frames = 3;
  var canvas = document.createElement('canvas');
  canvas.width = frameSize * frames;
  canvas.height = frameSize;
  var ctx = canvas.getContext('2d');

  for (var i = 0; i < frames; i++) {
    ctx.save();
    ctx.translate(i * frameSize, 0);
    drawFireball(ctx, frameSize, null, i);
    ctx.restore();
  }

  return canvas;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FIREBALL_PALETTE: FIREBALL_PALETTE,
    drawFireball: drawFireball,
    generateFireballCanvas: generateFireballCanvas
  };
}
