/**
 * projectile-ice-shard.js — Ice Shard projectile for Frost Knight
 *
 * Shape: Elongated triangle (sharp, angular)
 * Canvas: 32×32, display 16-20px
 * Core: #93C5FD, Glow: #DBEAFE @ alpha 0.4
 * Characteristic: Angular, trail particles
 * Animation: 3 frames (flight rotation variants)
 */

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
var ICE_SHARD_PALETTE = {
  core:     '#93C5FD',
  glow:     '#DBEAFE',
  edge:     '#3B82F6',
  outline:  '#1E293B',
  trail:    'rgba(219,234,254,0.4)'
};

// ---------------------------------------------------------------------------
// Draw function
// ---------------------------------------------------------------------------
function drawIceShard(ctx, size, palette, frame) {
  palette = palette || ICE_SHARD_PALETTE;
  var cx = size / 2;
  var cy = size / 2;
  var shardLen = size * 0.42;
  var shardW = size * 0.15;

  // Slight rotation per frame for flight variation
  var rotation = frame * 0.15;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  // Glow behind
  ctx.beginPath();
  ctx.ellipse(0, 0, shardLen * 0.7, shardW * 1.8, 0, 0, Math.PI * 2);
  ctx.fillStyle = palette.trail;
  ctx.fill();

  // Outline (draw twice method — larger shape first)
  ctx.beginPath();
  ctx.moveTo(shardLen + 2, 0);
  ctx.lineTo(-shardLen * 0.3, -shardW - 1.5);
  ctx.lineTo(-shardLen * 0.5 - 1, 0);
  ctx.lineTo(-shardLen * 0.3, shardW + 1.5);
  ctx.closePath();
  ctx.fillStyle = palette.outline;
  ctx.fill();

  // Main shard body
  ctx.beginPath();
  ctx.moveTo(shardLen, 0);
  ctx.lineTo(-shardLen * 0.3, -shardW);
  ctx.lineTo(-shardLen * 0.5, 0);
  ctx.lineTo(-shardLen * 0.3, shardW);
  ctx.closePath();
  ctx.fillStyle = palette.core;
  ctx.fill();

  // Inner facet (highlight — upper half)
  ctx.beginPath();
  ctx.moveTo(shardLen * 0.8, 0);
  ctx.lineTo(-shardLen * 0.2, -shardW * 0.6);
  ctx.lineTo(-shardLen * 0.35, 0);
  ctx.closePath();
  ctx.fillStyle = palette.glow;
  ctx.fill();

  // Edge highlight line
  ctx.beginPath();
  ctx.moveTo(shardLen * 0.9, 0);
  ctx.lineTo(-shardLen * 0.1, -shardW * 0.3);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 0.8;
  ctx.globalAlpha = 0.5;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Trail particles (behind the shard)
  for (var i = 0; i < 3; i++) {
    var tx = -shardLen * 0.5 - (i + 1) * size * 0.06;
    var ty = (Math.sin(frame * 2 + i * 1.5) * shardW * 0.5);
    var tr = 1 + Math.random() * 0.8;
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
function generateIceShardCanvas() {
  var frameSize = 32;
  var frames = 3;
  var canvas = document.createElement('canvas');
  canvas.width = frameSize * frames;
  canvas.height = frameSize;
  var ctx = canvas.getContext('2d');

  for (var i = 0; i < frames; i++) {
    ctx.save();
    ctx.translate(i * frameSize, 0);
    drawIceShard(ctx, frameSize, null, i);
    ctx.restore();
  }

  return canvas;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ICE_SHARD_PALETTE: ICE_SHARD_PALETTE,
    drawIceShard: drawIceShard,
    generateIceShardCanvas: generateIceShardCanvas
  };
}
