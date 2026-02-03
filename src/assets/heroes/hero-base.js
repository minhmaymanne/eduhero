/**
 * hero-base.js — Shared skeleton drawing functions for all EduHero heroes.
 *
 * Style: Cartoon Chibi · Smooth Vector 2D
 * Canvas: 128×128 (render @2x, display 64×64)
 * Proportions: 2.5-3 head ratio (head = 40% height)
 * Shading: Cel-shading 2-tone (base + shadow)
 * Outline: Draw Twice method (larger outline layer + base color overlay)
 */

// ---------------------------------------------------------------------------
// Helper: Rounded Rectangle
// ---------------------------------------------------------------------------
function roundRect(ctx, x, y, w, h, r) {
  if (r > w / 2) r = w / 2;
  if (r > h / 2) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ---------------------------------------------------------------------------
// Layer 1: Ground Shadow
// ---------------------------------------------------------------------------
function drawShadow(ctx, x, y, r) {
  ctx.beginPath();
  ctx.ellipse(x, y, r, r * 0.25, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fill();
}

// ---------------------------------------------------------------------------
// Layer 2: Legs
// ---------------------------------------------------------------------------
function drawLegs(ctx, cx, cy, legH, palette, frame, anim) {
  var legW = legH * 0.55;
  var spacing = legW * 1.1;
  var outlineSize = 2;

  // Walk animation: alternate leg offset
  var leftOff = 0;
  var rightOff = 0;
  if (anim === 'walk') {
    leftOff = Math.sin(frame * Math.PI / 2) * legH * 0.35;
    rightOff = -leftOff;
  }

  // Left leg
  _drawLeg(ctx, cx - spacing, cy + leftOff, legW, legH, palette, outlineSize);
  // Right leg
  _drawLeg(ctx, cx + spacing, cy + rightOff, legW, legH, palette, outlineSize);
}

function _drawLeg(ctx, x, y, w, h, palette, ol) {
  // Outline
  roundRect(ctx, x - w / 2 - ol, y - ol, w + ol * 2, h + ol * 2, w / 2);
  ctx.fillStyle = palette.outline;
  ctx.fill();

  // Base
  roundRect(ctx, x - w / 2, y, w, h, w / 2);
  ctx.fillStyle = palette.primaryShadow;
  ctx.fill();

  // Shoe / boot highlight
  roundRect(ctx, x - w / 2, y + h * 0.5, w, h * 0.5, w / 2);
  ctx.fillStyle = palette.primary;
  ctx.fill();
}

// ---------------------------------------------------------------------------
// Layer 3: Body (Armor)
// ---------------------------------------------------------------------------
function drawBody(ctx, cx, cy, bodyW, bodyH, palette) {
  var ol = 2;

  // Outline
  roundRect(ctx, cx - bodyW / 2 - ol, cy - bodyH / 2 - ol, bodyW + ol * 2, bodyH + ol * 2, bodyW * 0.3);
  ctx.fillStyle = palette.outline;
  ctx.fill();

  // Base armor
  roundRect(ctx, cx - bodyW / 2, cy - bodyH / 2, bodyW, bodyH, bodyW * 0.3);
  ctx.fillStyle = palette.primary;
  ctx.fill();

  // Shadow (lower portion of body via clip)
  ctx.save();
  roundRect(ctx, cx - bodyW / 2, cy - bodyH / 2, bodyW, bodyH, bodyW * 0.3);
  ctx.clip();
  ctx.beginPath();
  ctx.ellipse(cx, cy + bodyH * 0.25, bodyW * 0.65, bodyH * 0.55, 0, 0, Math.PI * 2);
  ctx.fillStyle = palette.primaryShadow;
  ctx.fill();
  ctx.restore();

  // Belt / waist detail
  roundRect(ctx, cx - bodyW * 0.4, cy + bodyH * 0.15, bodyW * 0.8, bodyH * 0.18, 2);
  ctx.fillStyle = palette.secondary;
  ctx.fill();

  // Chest highlight
  ctx.beginPath();
  ctx.ellipse(cx - bodyW * 0.1, cy - bodyH * 0.15, bodyW * 0.2, bodyH * 0.15, -0.3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.fill();
}

// ---------------------------------------------------------------------------
// Layer 4: Arms
// ---------------------------------------------------------------------------
function drawArms(ctx, cx, cy, armW, palette, frame, anim) {
  var armH = armW * 2.2;
  var ol = 2;
  var bodyW = armW * 3.5;

  // Attack animation: front arm swings
  var frontArmAngle = 0;
  var backArmAngle = 0;
  if (anim === 'attack') {
    if (frame === 0) { frontArmAngle = -0.4; backArmAngle = 0.2; }       // wind-up
    else if (frame === 1) { frontArmAngle = 0.8; backArmAngle = -0.1; }   // strike
    else { frontArmAngle = 0.15; backArmAngle = 0; }                      // recover
  }
  if (anim === 'walk') {
    frontArmAngle = Math.sin(frame * Math.PI / 2) * 0.25;
    backArmAngle = -frontArmAngle;
  }

  // Back arm (drawn first, behind body)
  _drawArm(ctx, cx - bodyW / 2 - armW * 0.3, cy, armW, armH, palette, ol, backArmAngle);
  // Front arm
  _drawArm(ctx, cx + bodyW / 2 + armW * 0.3, cy, armW, armH, palette, ol, frontArmAngle);
}

function _drawArm(ctx, x, y, w, h, palette, ol, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  // Outline
  roundRect(ctx, -w / 2 - ol, -ol, w + ol * 2, h + ol * 2, w / 2);
  ctx.fillStyle = palette.outline;
  ctx.fill();

  // Base arm
  roundRect(ctx, -w / 2, 0, w, h, w / 2);
  ctx.fillStyle = palette.primary;
  ctx.fill();

  // Hand (skin circle at bottom)
  ctx.beginPath();
  ctx.arc(0, h, w * 0.55, 0, Math.PI * 2);
  ctx.fillStyle = palette.outline;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, h, w * 0.45, 0, Math.PI * 2);
  ctx.fillStyle = palette.skin;
  ctx.fill();

  ctx.restore();
}

// ---------------------------------------------------------------------------
// Layer 5: Head (with helmet)
// ---------------------------------------------------------------------------
function drawHead(ctx, cx, cy, headR, palette) {
  var ol = 2.5;

  // Head outline
  ctx.beginPath();
  ctx.arc(cx, cy, headR + ol, 0, Math.PI * 2);
  ctx.fillStyle = palette.outline;
  ctx.fill();

  // Head base (skin)
  ctx.beginPath();
  ctx.arc(cx, cy, headR, 0, Math.PI * 2);
  ctx.fillStyle = palette.skin;
  ctx.fill();

  // Skin shadow (lower half)
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, headR, 0, Math.PI * 2);
  ctx.clip();
  ctx.beginPath();
  ctx.ellipse(cx, cy + headR * 0.35, headR * 1.1, headR * 0.7, 0, 0, Math.PI * 2);
  ctx.fillStyle = palette.skinShadow;
  ctx.fill();
  ctx.restore();

  // Helmet — top half arc covering the head
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, headR + ol, Math.PI, 0); // top semicircle
  ctx.closePath();
  ctx.fillStyle = palette.outline;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, headR, Math.PI, 0);
  ctx.closePath();
  ctx.fillStyle = palette.primary;
  ctx.fill();

  // Helmet shadow
  ctx.beginPath();
  ctx.arc(cx, cy, headR, Math.PI, 0);
  ctx.closePath();
  ctx.save();
  ctx.clip();
  ctx.beginPath();
  ctx.ellipse(cx + headR * 0.2, cy - headR * 0.1, headR * 0.9, headR * 0.6, 0.3, 0, Math.PI * 2);
  ctx.fillStyle = palette.primaryShadow;
  ctx.fill();
  ctx.restore();
  ctx.restore();

  // Helmet visor ridge
  roundRect(ctx, cx - headR * 0.85, cy - headR * 0.08, headR * 1.7, headR * 0.18, 3);
  ctx.fillStyle = palette.outline;
  ctx.fill();
  roundRect(ctx, cx - headR * 0.8, cy - headR * 0.04, headR * 1.6, headR * 0.12, 2);
  ctx.fillStyle = palette.secondary;
  ctx.fill();

  // Highlight on helmet
  ctx.beginPath();
  ctx.ellipse(cx - headR * 0.25, cy - headR * 0.55, headR * 0.22, headR * 0.12, -0.4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.fill();
}

// ---------------------------------------------------------------------------
// Layer 6: Face (eyes + mouth)
// ---------------------------------------------------------------------------
function drawFace(ctx, cx, cy, headR, palette, anim) {
  var eyeSpacing = headR * 0.32;
  var eyeY = cy + headR * 0.15;
  var eyeW = headR * 0.18;
  var eyeH = headR * 0.22;

  // Hurt: tint overlay
  if (anim === 'hurt') {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, headR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(239,68,68,0.35)';
    ctx.fill();
    ctx.restore();
  }

  // Death: X eyes
  if (anim === 'death') {
    _drawXEye(ctx, cx - eyeSpacing, eyeY, eyeW, palette.outline);
    _drawXEye(ctx, cx + eyeSpacing, eyeY, eyeW, palette.outline);
    // Mouth — wavy line
    ctx.beginPath();
    ctx.moveTo(cx - headR * 0.15, cy + headR * 0.45);
    ctx.quadraticCurveTo(cx - headR * 0.05, cy + headR * 0.4, cx, cy + headR * 0.45);
    ctx.quadraticCurveTo(cx + headR * 0.05, cy + headR * 0.5, cx + headR * 0.15, cy + headR * 0.45);
    ctx.strokeStyle = palette.outline;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    return;
  }

  // Normal eyes
  // Left eye white
  ctx.beginPath();
  ctx.ellipse(cx - eyeSpacing, eyeY, eyeW, eyeH, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  // Left pupil
  ctx.beginPath();
  ctx.ellipse(cx - eyeSpacing + eyeW * 0.1, eyeY + eyeH * 0.05, eyeW * 0.55, eyeH * 0.6, 0, 0, Math.PI * 2);
  ctx.fillStyle = palette.outline;
  ctx.fill();
  // Left eye highlight
  ctx.beginPath();
  ctx.arc(cx - eyeSpacing - eyeW * 0.15, eyeY - eyeH * 0.2, eyeW * 0.28, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // Right eye white
  ctx.beginPath();
  ctx.ellipse(cx + eyeSpacing, eyeY, eyeW, eyeH, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  // Right pupil
  ctx.beginPath();
  ctx.ellipse(cx + eyeSpacing + eyeW * 0.1, eyeY + eyeH * 0.05, eyeW * 0.55, eyeH * 0.6, 0, 0, Math.PI * 2);
  ctx.fillStyle = palette.outline;
  ctx.fill();
  // Right eye highlight
  ctx.beginPath();
  ctx.arc(cx + eyeSpacing - eyeW * 0.15, eyeY - eyeH * 0.2, eyeW * 0.28, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // Mouth
  if (anim === 'attack') {
    // Open mouth (shout)
    ctx.beginPath();
    ctx.ellipse(cx, cy + headR * 0.48, headR * 0.12, headR * 0.08, 0, 0, Math.PI * 2);
    ctx.fillStyle = palette.outline;
    ctx.fill();
  } else if (anim === 'special') {
    // Determined smile
    ctx.beginPath();
    ctx.arc(cx, cy + headR * 0.38, headR * 0.14, 0.15, Math.PI - 0.15);
    ctx.strokeStyle = palette.outline;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  } else {
    // Small smile
    ctx.beginPath();
    ctx.arc(cx, cy + headR * 0.38, headR * 0.1, 0.2, Math.PI - 0.2);
    ctx.strokeStyle = palette.outline;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

function _drawXEye(ctx, x, y, size, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - size, y - size);
  ctx.lineTo(x + size, y + size);
  ctx.moveTo(x + size, y - size);
  ctx.lineTo(x - size, y + size);
  ctx.stroke();
}

// ---------------------------------------------------------------------------
// Animation Transform Helper
// ---------------------------------------------------------------------------
function applyAnimTransform(ctx, cx, cy, frame, anim, size) {
  var sx = 1, sy = 1;
  var tx = 0, ty = 0;
  var rotation = 0;

  switch (anim) {
    case 'idle':
      sy = 1 + Math.sin(frame * Math.PI / 2) * 0.03;
      sx = 1 - Math.sin(frame * Math.PI / 2) * 0.02;
      break;
    case 'walk':
      ty = -Math.abs(Math.sin(frame * Math.PI / 2)) * size * 0.04;
      sy = 1 - Math.abs(Math.sin(frame * Math.PI / 2)) * 0.02;
      sx = 1 + Math.abs(Math.sin(frame * Math.PI / 2)) * 0.015;
      break;
    case 'attack':
      if (frame === 0) { sx = 1.04; sy = 0.96; tx = -size * 0.03; }       // wind-up
      else if (frame === 1) { sx = 0.94; sy = 1.06; tx = size * 0.06; }    // strike
      else { sx = 1.02; sy = 0.98; }                                        // recover
      break;
    case 'hurt':
      sx = 1.06; sy = 0.94;
      tx = (frame === 0 ? -1 : 1) * size * 0.03;
      break;
    case 'death':
      if (frame === 0) { sy = 0.7; sx = 1.3; }                             // squash
      else if (frame === 1) { rotation = 0.5; sy = 0.85; sx = 1.15; }      // spin
      else { sy = 0.5; sx = 1.4; }                                          // flatten + fade
      break;
    case 'special':
      sy = 1 + Math.sin(frame * Math.PI / 2) * 0.05;
      sx = 1 - Math.sin(frame * Math.PI / 2) * 0.03;
      ty = -Math.abs(Math.sin(frame * Math.PI / 2)) * size * 0.03;
      break;
  }

  ctx.translate(cx + tx, cy + ty);
  ctx.rotate(rotation);
  ctx.scale(sx, sy);
  ctx.translate(-cx, -cy);
}

// ---------------------------------------------------------------------------
// Death fade alpha
// ---------------------------------------------------------------------------
function getDeathAlpha(frame) {
  var alphas = [1, 0.65, 0.25];
  return alphas[frame] !== undefined ? alphas[frame] : 0.25;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    roundRect: roundRect,
    drawShadow: drawShadow,
    drawLegs: drawLegs,
    drawBody: drawBody,
    drawArms: drawArms,
    drawHead: drawHead,
    drawFace: drawFace,
    applyAnimTransform: applyAnimTransform,
    getDeathAlpha: getDeathAlpha
  };
}
