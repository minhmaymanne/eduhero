/**
 * projectile-leaf-blade.js — Leaf Blade projectile for Nature Knight
 *
 * Shape: Ellipse (leaf shape)
 * Canvas: 32×32, display 16-20px
 * Core: #4ADE80, Edge: #15803D
 * Characteristic: Spin rotation per frame
 * Animation: 3 frames (rotation at different angles)
 */

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
var LEAF_BLADE_PALETTE = {
  core:     '#4ADE80',
  edge:     '#15803D',
  vein:     '#22C55E',
  outline:  '#1A3A1A',
  glow:     'rgba(74,222,128,0.25)'
};

// ---------------------------------------------------------------------------
// Draw function
// ---------------------------------------------------------------------------
function drawLeafBlade(ctx, size, palette, frame) {
  palette = palette || LEAF_BLADE_PALETTE;
  var cx = size / 2;
  var cy = size / 2;
  var leafLen = size * 0.38;
  var leafW = size * 0.16;

  // Spin rotation: each frame rotates 60 degrees (full spin over 6 frames)
  var rotation = frame * Math.PI / 3;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  // Glow behind
  ctx.beginPath();
  ctx.arc(0, 0, leafLen * 0.8, 0, Math.PI * 2);
  ctx.fillStyle = palette.glow;
  ctx.fill();

  // Leaf outline (draw twice)
  ctx.beginPath();
  ctx.ellipse(0, 0, leafLen + 1.5, leafW + 1.5, 0, 0, Math.PI * 2);
  ctx.fillStyle = palette.outline;
  ctx.fill();

  // Leaf body
  ctx.beginPath();
  ctx.ellipse(0, 0, leafLen, leafW, 0, 0, Math.PI * 2);
  ctx.fillStyle = palette.core;
  ctx.fill();

  // Shadow on lower half (cel-shade)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, 0, leafLen, leafW, 0, 0, Math.PI * 2);
  ctx.clip();
  ctx.beginPath();
  ctx.ellipse(0, leafW * 0.4, leafLen * 1.05, leafW * 0.7, 0, 0, Math.PI * 2);
  ctx.fillStyle = palette.edge;
  ctx.fill();
  ctx.restore();

  // Center vein (stem line)
  ctx.beginPath();
  ctx.moveTo(-leafLen * 0.8, 0);
  ctx.lineTo(leafLen * 0.8, 0);
  ctx.strokeStyle = palette.vein;
  ctx.lineWidth = 1;
  ctx.stroke();

  // Side veins
  for (var i = -2; i <= 2; i++) {
    if (i === 0) continue;
    var vx = leafLen * 0.2 * i;
    ctx.beginPath();
    ctx.moveTo(vx, 0);
    ctx.lineTo(vx + leafLen * 0.12, -leafW * 0.5 * (i > 0 ? 1 : -1));
    ctx.strokeStyle = palette.vein;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Highlight (top-left area)
  ctx.beginPath();
  ctx.ellipse(-leafLen * 0.2, -leafW * 0.25, leafLen * 0.25, leafW * 0.2, -0.3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fill();

  // Tip point highlight
  ctx.beginPath();
  ctx.arc(leafLen * 0.75, 0, 1.2, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.globalAlpha = 0.5;
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Spritesheet generation (3 frames in a row)
// ---------------------------------------------------------------------------
function generateLeafBladeCanvas() {
  var frameSize = 32;
  var frames = 3;
  var canvas = document.createElement('canvas');
  canvas.width = frameSize * frames;
  canvas.height = frameSize;
  var ctx = canvas.getContext('2d');

  for (var i = 0; i < frames; i++) {
    ctx.save();
    ctx.translate(i * frameSize, 0);
    drawLeafBlade(ctx, frameSize, null, i);
    ctx.restore();
  }

  return canvas;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LEAF_BLADE_PALETTE: LEAF_BLADE_PALETTE,
    drawLeafBlade: drawLeafBlade,
    generateLeafBladeCanvas: generateLeafBladeCanvas
  };
}
