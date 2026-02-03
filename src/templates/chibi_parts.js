/**
 * EduHero — Chibi Template Parts (Reusable SVG Components)
 *
 * Tỉ lệ chibi: đầu to : thân nhỏ = 2:1 ~ 2.5:1
 * Coordinate system: 128×128px canvas, center = (64, 64)
 * Outline: 2-3px stroke, bo tròn (stroke-linecap: round, stroke-linejoin: round)
 * Shading: gradient 2-3 tone (base + shadow + highlight)
 */

const PALETTE = require('../constants/palette');

// ═══════════════════════════════════════════════════════════
// SVG HELPERS
// ═══════════════════════════════════════════════════════════

/** Tạo SVG wrapper */
function svgWrap(width, height, defsContent, bodyContent, id = 'sprite') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" id="${id}">
  <defs>
${defsContent}
  </defs>
${bodyContent}
</svg>`;
}

/** Tạo radial gradient def */
function radialGradient(id, colors, cx = '40%', cy = '35%', r = '60%') {
  const stops = colors.map((c, i) => {
    const offset = i === 0 ? '0%' : i === colors.length - 1 ? '100%' : `${Math.round((i / (colors.length - 1)) * 100)}%`;
    return `      <stop offset="${offset}" stop-color="${c}" />`;
  }).join('\n');
  return `    <radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" fx="${cx}" fy="${cy}">
${stops}
    </radialGradient>`;
}

/** Tạo linear gradient def */
function linearGradient(id, colors, x1 = '0%', y1 = '0%', x2 = '0%', y2 = '100%') {
  const stops = colors.map((c, i) => {
    const offset = i === 0 ? '0%' : i === colors.length - 1 ? '100%' : `${Math.round((i / (colors.length - 1)) * 100)}%`;
    return `      <stop offset="${offset}" stop-color="${c}" />`;
  }).join('\n');
  return `    <linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
${stops}
    </linearGradient>`;
}

/** Common stroke style cho outline */
function outlineStyle(width = 2.5, color = PALETTE.common.outline) {
  return `stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"`;
}

// ═══════════════════════════════════════════════════════════
// CHIBI HEAD (khuôn mặt)
// ═══════════════════════════════════════════════════════════

/**
 * Vẽ đầu chibi tròn to
 * @param {object} opts
 * @param {number} opts.cx - center x (default 64)
 * @param {number} opts.cy - center y (default 38)
 * @param {number} opts.radius - bán kính đầu (default 28)
 * @param {string} opts.gradientId - id cho gradient fill
 * @param {string} opts.expression - 'happy'|'serious'|'hurt'|'thinking'|'celebrate'|'blink'
 * @param {boolean} opts.showBlush - hiện má hồng
 * @returns {{ defs: string, body: string }}
 */
function chibiHead(opts = {}) {
  const cx = opts.cx || 64;
  const cy = opts.cy || 38;
  const r = opts.radius || 28;
  const gId = opts.gradientId || 'headGrad';
  const expr = opts.expression || 'happy';
  const showBlush = opts.showBlush !== false;
  const skin = PALETTE.hero.skin;
  const hair = PALETTE.hero.hair;
  const outline = PALETTE.hero.outline;

  let defs = '';
  let body = '';

  // ── Head gradient ──
  defs += radialGradient(gId, [skin.highlight, skin.base, skin.shadow], '45%', '35%', '65%') + '\n';

  // ── Head shape (tròn to) ──
  body += `    <!-- Head -->\n`;
  body += `    <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.95}" fill="url(#${gId})" ${outlineStyle(2.5, outline)} />\n`;

  // ── Chỏm tóc ──
  defs += radialGradient(`${gId}Hair`, [hair.highlight, hair.base, hair.shadow], '50%', '30%', '70%') + '\n';
  body += `    <!-- Hair -->\n`;
  // Tóc phủ đỉnh đầu
  body += `    <path d="M${cx - r * 0.7} ${cy - r * 0.5}
      Q ${cx - r * 0.3} ${cy - r * 1.35}, ${cx} ${cy - r * 1.15}
      Q ${cx + r * 0.15} ${cy - r * 1.4}, ${cx + r * 0.1} ${cy - r * 1.5}
      Q ${cx + r * 0.35} ${cy - r * 1.3}, ${cx + r * 0.5} ${cy - r * 1.1}
      Q ${cx + r * 0.7} ${cy - r * 0.7}, ${cx + r * 0.75} ${cy - r * 0.3}
      Q ${cx + r * 0.5} ${cy - r * 0.75}, ${cx} ${cy - r * 0.85}
      Q ${cx - r * 0.5} ${cy - r * 0.7}, ${cx - r * 0.7} ${cy - r * 0.5} Z"
      fill="url(#${gId}Hair)" ${outlineStyle(2, outline)} />\n`;

  // Chỏm tóc phía trước (kiểu chú tiểu)
  body += `    <path d="M${cx - r * 0.15} ${cy - r * 0.8}
      Q ${cx + r * 0.05} ${cy - r * 1.55}, ${cx + r * 0.15} ${cy - r * 1.6}
      Q ${cx + r * 0.2} ${cy - r * 1.3}, ${cx + r * 0.1} ${cy - r * 0.8}"
      fill="url(#${gId}Hair)" ${outlineStyle(2, outline)} />\n`;

  // ── Mắt ──
  body += `    <!-- Eyes -->\n`;
  const eyeL = cx - r * 0.32;
  const eyeR = cx + r * 0.32;
  const eyeY = cy + r * 0.05;

  if (expr === 'blink' || expr === 'hurt') {
    // Mắt nhắm (đường cong)
    body += `    <path d="M${eyeL - 5} ${eyeY} Q ${eyeL} ${eyeY + 3}, ${eyeL + 5} ${eyeY}" fill="none" stroke="${outline}" stroke-width="2.5" stroke-linecap="round" />\n`;
    body += `    <path d="M${eyeR - 5} ${eyeY} Q ${eyeR} ${eyeY + 3}, ${eyeR + 5} ${eyeY}" fill="none" stroke="${outline}" stroke-width="2.5" stroke-linecap="round" />\n`;
  } else if (expr === 'happy' || expr === 'celebrate') {
    // Mắt cười cong
    body += `    <path d="M${eyeL - 5} ${eyeY + 1} Q ${eyeL} ${eyeY - 5}, ${eyeL + 5} ${eyeY + 1}" fill="none" stroke="${outline}" stroke-width="2.5" stroke-linecap="round" />\n`;
    body += `    <path d="M${eyeR - 5} ${eyeY + 1} Q ${eyeR} ${eyeY - 5}, ${eyeR + 5} ${eyeY + 1}" fill="none" stroke="${outline}" stroke-width="2.5" stroke-linecap="round" />\n`;
  } else {
    // Mắt tròn to (serious / thinking / default)
    const eyeSize = 5.5;
    body += `    <ellipse cx="${eyeL}" cy="${eyeY}" rx="${eyeSize * 0.8}" ry="${eyeSize}" fill="${PALETTE.hero.eyes.base}" />\n`;
    body += `    <ellipse cx="${eyeR}" cy="${eyeY}" rx="${eyeSize * 0.8}" ry="${eyeSize}" fill="${PALETTE.hero.eyes.base}" />\n`;
    // Đồng tử sáng (shine)
    body += `    <ellipse cx="${eyeL + 1.5}" cy="${eyeY - 2}" rx="2" ry="2.2" fill="${PALETTE.hero.eyeShine}" />\n`;
    body += `    <ellipse cx="${eyeR + 1.5}" cy="${eyeY - 2}" rx="2" ry="2.2" fill="${PALETTE.hero.eyeShine}" />\n`;
    body += `    <ellipse cx="${eyeL - 1}" cy="${eyeY + 1.5}" rx="1" ry="1" fill="${PALETTE.hero.eyeShine}" opacity="0.6" />\n`;
    body += `    <ellipse cx="${eyeR - 1}" cy="${eyeY + 1.5}" rx="1" ry="1" fill="${PALETTE.hero.eyeShine}" opacity="0.6" />\n`;

    if (expr === 'thinking') {
      // Mắt nhìn lên góc
      body += `    <ellipse cx="${eyeL + 2}" cy="${eyeY - 2}" rx="${eyeSize * 0.5}" ry="${eyeSize * 0.65}" fill="${PALETTE.hero.eyes.base}" />\n`;
      body += `    <ellipse cx="${eyeR + 2}" cy="${eyeY - 2}" rx="${eyeSize * 0.5}" ry="${eyeSize * 0.65}" fill="${PALETTE.hero.eyes.base}" />\n`;
    }
  }

  // ── Miệng ──
  body += `    <!-- Mouth -->\n`;
  const mouthY = cy + r * 0.38;

  if (expr === 'happy' || expr === 'celebrate') {
    // Cười há miệng
    body += `    <path d="M${cx - 4} ${mouthY} Q ${cx} ${mouthY + 6}, ${cx + 4} ${mouthY}" fill="${PALETTE.hero.mouth}" stroke="${outline}" stroke-width="1.5" stroke-linecap="round" />\n`;
  } else if (expr === 'hurt') {
    // Méo miệng
    body += `    <path d="M${cx - 4} ${mouthY + 2} Q ${cx} ${mouthY - 2}, ${cx + 4} ${mouthY + 2}" fill="none" stroke="${outline}" stroke-width="2" stroke-linecap="round" />\n`;
  } else if (expr === 'serious') {
    // Mím miệng
    body += `    <line x1="${cx - 3}" y1="${mouthY}" x2="${cx + 3}" y2="${mouthY}" stroke="${outline}" stroke-width="2" stroke-linecap="round" />\n`;
  } else {
    // Miệng nhỏ xinh (default)
    body += `    <path d="M${cx - 3} ${mouthY} Q ${cx} ${mouthY + 4}, ${cx + 3} ${mouthY}" fill="none" stroke="${outline}" stroke-width="1.8" stroke-linecap="round" />\n`;
  }

  // ── Má hồng (blush) ──
  if (showBlush) {
    body += `    <!-- Blush -->\n`;
    body += `    <ellipse cx="${cx - r * 0.45}" cy="${cy + r * 0.25}" rx="5" ry="3.5" fill="${PALETTE.hero.cheek.base}" opacity="0.45" />\n`;
    body += `    <ellipse cx="${cx + r * 0.45}" cy="${cy + r * 0.25}" rx="5" ry="3.5" fill="${PALETTE.hero.cheek.base}" opacity="0.45" />\n`;
  }

  // ── Celebrate sparkle ──
  if (expr === 'celebrate') {
    body += `    <!-- Sparkles -->\n`;
    body += sparkle(cx - r * 0.6, cy - r * 0.5, 4, '#FFD54F');
    body += sparkle(cx + r * 0.7, cy - r * 0.4, 3, '#FFD54F');
  }

  return { defs, body };
}

// ═══════════════════════════════════════════════════════════
// CHIBI BODY (thân)
// ═══════════════════════════════════════════════════════════

/**
 * Vẽ thân chibi (ở trần + quần đùi)
 * @param {object} opts
 * @param {number} opts.cx - center x
 * @param {number} opts.torsoY - y bắt đầu thân (dưới đầu)
 * @param {string} opts.state - 'idle'|'run_l'|'run_r'|'attack'
 * @param {number} opts.frame - frame number trong animation
 * @param {string} opts.pantsColor - 'brown'|'green'
 * @returns {{ defs: string, body: string }}
 */
function chibiBody(opts = {}) {
  const cx = opts.cx || 64;
  const torsoY = opts.torsoY || 62;
  const state = opts.state || 'idle';
  const frame = opts.frame || 0;
  const skin = PALETTE.hero.skin;
  const pants = opts.pantsColor === 'green' ? PALETTE.hero.pantsAlt : PALETTE.hero.pants;
  const outline = PALETTE.hero.outline;

  let defs = '';
  let body = '';

  const bodyGId = 'bodyGrad';
  const pantsGId = 'pantsGrad';

  defs += linearGradient(bodyGId, [skin.highlight, skin.base, skin.shadow]) + '\n';
  defs += linearGradient(pantsGId, [pants.highlight, pants.base, pants.shadow]) + '\n';

  // ── Thân trên (ở trần, bụng tròn cute) ──
  const torsoW = 18;
  const torsoH = 16;

  body += `    <!-- Torso -->\n`;
  body += `    <path d="M${cx - torsoW / 2} ${torsoY}
      Q ${cx - torsoW / 2 - 2} ${torsoY + torsoH * 0.5}, ${cx - torsoW / 2 + 1} ${torsoY + torsoH}
      Q ${cx} ${torsoY + torsoH + 4}, ${cx + torsoW / 2 - 1} ${torsoY + torsoH}
      Q ${cx + torsoW / 2 + 2} ${torsoY + torsoH * 0.5}, ${cx + torsoW / 2} ${torsoY} Z"
      fill="url(#${bodyGId})" ${outlineStyle(2, outline)} />\n`;

  // Núm vú nhỏ (cute detail)
  body += `    <circle cx="${cx - 4}" cy="${torsoY + 6}" r="0.8" fill="${skin.shadow}" opacity="0.4" />\n`;
  body += `    <circle cx="${cx + 4}" cy="${torsoY + 6}" r="0.8" fill="${skin.shadow}" opacity="0.4" />\n`;

  // ── Quần đùi ──
  const pantsY = torsoY + torsoH - 2;
  const pantsH = 10;

  body += `    <!-- Pants -->\n`;
  body += `    <path d="M${cx - torsoW / 2 + 1} ${pantsY}
      L${cx - torsoW / 2} ${pantsY + pantsH}
      Q ${cx - 3} ${pantsY + pantsH + 2}, ${cx} ${pantsY + pantsH - 1}
      Q ${cx + 3} ${pantsY + pantsH + 2}, ${cx + torsoW / 2} ${pantsY + pantsH}
      L${cx + torsoW / 2 - 1} ${pantsY} Z"
      fill="url(#${pantsGId})" ${outlineStyle(2, outline)} />\n`;

  // Dây thắt lưng
  body += `    <line x1="${cx - torsoW / 2 + 2}" y1="${pantsY + 1}" x2="${cx + torsoW / 2 - 2}" y2="${pantsY + 1}" stroke="${pants.shadow}" stroke-width="1.5" stroke-linecap="round" />\n`;

  return { defs, body, pantsBottom: pantsY + pantsH };
}

// ═══════════════════════════════════════════════════════════
// CHIBI ARMS (tay)
// ═══════════════════════════════════════════════════════════

/**
 * Vẽ 2 tay chibi ngắn tròn
 * @param {object} opts
 * @param {number} opts.cx - center x
 * @param {number} opts.shoulderY - y vai
 * @param {string} opts.pose - 'idle'|'swing_down'|'swing_up'|'hold_book'|'raise'|'aim_bow'
 * @param {number} opts.frame - frame number
 * @returns {{ defs: string, body: string }}
 */
function chibiArms(opts = {}) {
  const cx = opts.cx || 64;
  const sy = opts.shoulderY || 64;
  const pose = opts.pose || 'idle';
  const frame = opts.frame || 0;
  const skin = PALETTE.hero.skin;
  const outline = PALETTE.hero.outline;
  const armLen = 16;
  const armW = 6;

  let defs = '';
  let body = '';

  body += `    <!-- Arms -->\n`;

  // Helper: vẽ 1 cánh tay (outline dưới, skin trên, bàn tay ở cuối)
  function arm(startX, startY, endX, endY) {
    // Outline layer (thicker, dark)
    body += `    <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="${outline}" stroke-width="${armW + 2.5}" stroke-linecap="round" />\n`;
    // Skin layer (thinner, on top)
    body += `    <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="${skin.base}" stroke-width="${armW}" stroke-linecap="round" />\n`;
    // Bàn tay tròn
    body += `    <circle cx="${endX}" cy="${endY}" r="${armW * 0.55}" fill="${skin.base}" stroke="${outline}" stroke-width="2" />\n`;
  }

  const shoulderL = cx - 18;
  const shoulderR = cx + 18;

  if (pose === 'idle') {
    // Tay buông 2 bên, hơi cong ra
    const sway = Math.sin(frame * Math.PI / 2) * 1.5;
    arm(shoulderL, sy, shoulderL - 5, sy + armLen + sway, 'left');
    arm(shoulderR, sy, shoulderR + 5, sy + armLen - sway, 'right');
  } else if (pose === 'raise') {
    // 2 tay giơ lên (victory)
    arm(shoulderL, sy, shoulderL - 10, sy - armLen + 4, 'left');
    arm(shoulderR, sy, shoulderR + 10, sy - armLen + 4, 'right');
  } else if (pose === 'aim_bow') {
    // Tay trái giữ nỏ, tay phải kéo dây
    arm(shoulderL, sy, shoulderL - 8, sy + 4, 'left');
    arm(shoulderR, sy, shoulderR + 12, sy + 2, 'right');
  } else if (pose === 'hold_book') {
    // 2 tay giơ sách
    arm(shoulderL, sy, cx - 6, sy + 6, 'left');
    arm(shoulderR, sy, cx + 6, sy + 6, 'right');
  } else if (pose === 'swing_down') {
    // Tay phải vung xuống (melee)
    const swingAngle = (frame / 3) * Math.PI * 0.6;
    const endX = shoulderR + Math.sin(swingAngle) * armLen;
    const endY = sy - Math.cos(swingAngle) * armLen + 10;
    arm(shoulderL, sy, shoulderL - 5, sy + armLen, 'left');
    arm(shoulderR, sy, endX, endY, 'right');
  } else {
    // Default fallback
    arm(shoulderL, sy, shoulderL - 5, sy + armLen, 'left');
    arm(shoulderR, sy, shoulderR + 5, sy + armLen, 'right');
  }

  return { defs, body };
}

// ═══════════════════════════════════════════════════════════
// CHIBI LEGS (chân)
// ═══════════════════════════════════════════════════════════

/**
 * Vẽ 2 chân chibi ngắn (chân đất)
 * @param {object} opts
 * @param {number} opts.cx
 * @param {number} opts.hipY - y hông (dưới quần)
 * @param {string} opts.pose - 'idle'|'run_1'|'run_2'|'run_3'...|'sit'
 * @param {number} opts.frame
 * @returns {{ defs: string, body: string }}
 */
function chibiLegs(opts = {}) {
  const cx = opts.cx || 64;
  const hipY = opts.hipY || 86;
  const pose = opts.pose || 'idle';
  const frame = opts.frame || 0;
  const skin = PALETTE.hero.skin;
  const outline = PALETTE.hero.outline;
  const legLen = 14;
  const legW = 6;

  let body = '';
  body += `    <!-- Legs -->\n`;

  function leg(startX, startY, endX, endY) {
    body += `    <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}"
        stroke="${outline}" stroke-width="${legW + 2.5}" stroke-linecap="round" />\n`;
    body += `    <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}"
        stroke="${skin.base}" stroke-width="${legW}" stroke-linecap="round" />\n`;
    // Bàn chân oval
    body += `    <ellipse cx="${endX}" cy="${endY + 1}" rx="${legW * 0.7}" ry="${legW * 0.45}" fill="${skin.shadow}" stroke="${outline}" stroke-width="1.8" />\n`;
  }

  const legL = cx - 6;
  const legR = cx + 6;

  if (pose === 'idle') {
    leg(legL, hipY, legL, hipY + legLen);
    leg(legR, hipY, legR, hipY + legLen);
  } else if (pose === 'sit') {
    // Ngồi xếp bằng
    leg(legL, hipY, legL - 6, hipY + 5);
    leg(legR, hipY, legR + 6, hipY + 5);
  } else if (pose.startsWith('run')) {
    // Run animation: chân luân phiên
    const phase = frame * (Math.PI / 3);
    const strideL = Math.sin(phase) * 8;
    const strideR = Math.sin(phase + Math.PI) * 8;
    leg(legL, hipY, legL + strideL, hipY + legLen - Math.abs(strideL) * 0.3);
    leg(legR, hipY, legR + strideR, hipY + legLen - Math.abs(strideR) * 0.3);
  } else {
    leg(legL, hipY, legL, hipY + legLen);
    leg(legR, hipY, legR, hipY + legLen);
  }

  return { defs: '', body };
}

// ═══════════════════════════════════════════════════════════
// DECORATIVE HELPERS
// ═══════════════════════════════════════════════════════════

/** Vẽ sparkle / ngôi sao nhỏ */
function sparkle(x, y, size = 3, color = '#FFD54F') {
  return `    <path d="M${x} ${y - size} L${x + size * 0.3} ${y - size * 0.3} L${x + size} ${y}
      L${x + size * 0.3} ${y + size * 0.3} L${x} ${y + size}
      L${x - size * 0.3} ${y + size * 0.3} L${x - size} ${y}
      L${x - size * 0.3} ${y - size * 0.3} Z" fill="${color}" opacity="0.9" />\n`;
}

/** Vẽ bóng đổ dưới chân */
function shadowBlob(cx, y, rx = 16, ry = 4) {
  return `    <ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${ry}" fill="#000000" opacity="0.12" />\n`;
}

/** Vẽ halo glow quanh object */
function glowCircle(cx, cy, r, color, opacity = 0.25) {
  return `    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${opacity}" filter="url(#blur)" />\n`;
}

/** Blur filter def */
function blurFilter(id = 'blur', stdDev = 4) {
  return `    <filter id="${id}"><feGaussianBlur stdDeviation="${stdDev}" /></filter>`;
}

// ═══════════════════════════════════════════════════════════
// FULL HERO ASSEMBLY
// ═══════════════════════════════════════════════════════════

/**
 * Assemble full hero sprite
 * @param {object} opts
 * @param {string} opts.expression - 'happy'|'serious'|'hurt'|'thinking'|'celebrate'|'blink'
 * @param {string} opts.armPose - 'idle'|'raise'|'aim_bow'|'hold_book'|'swing_down'
 * @param {string} opts.legPose - 'idle'|'run'|'sit'
 * @param {number} opts.frame - frame index
 * @param {number} opts.bodyOffsetY - bounce offset for idle breathing
 * @param {string} opts.pantsColor - 'brown'|'green'
 * @returns {string} complete SVG string
 */
function assembleHero(opts = {}) {
  const frame = opts.frame || 0;
  const bodyOffsetY = opts.bodyOffsetY || 0;
  const cx = 64;

  // Head position (chibi head stays higher, body bounces)
  const headCY = 34 + bodyOffsetY * 0.3;
  const torsoY = 58 + bodyOffsetY;

  let allDefs = '';
  let allBody = '';

  allDefs += blurFilter() + '\n';

  // Shadow on ground
  allBody += shadowBlob(cx, 108, 18, 5);

  // Legs (behind body)
  const legs = chibiLegs({
    cx,
    hipY: torsoY + 24 + bodyOffsetY * 0.5,
    pose: opts.legPose || 'idle',
    frame,
  });
  allBody += legs.body;

  // Body
  const torso = chibiBody({
    cx,
    torsoY,
    state: opts.legPose || 'idle',
    frame,
    pantsColor: opts.pantsColor || 'brown',
  });
  allDefs += torso.defs;
  allBody += torso.body;

  // Arms (in front of body, behind head for some poses)
  const arms = chibiArms({
    cx,
    shoulderY: torsoY + 3,
    pose: opts.armPose || 'idle',
    frame,
  });
  allDefs += arms.defs;
  allBody += arms.body;

  // Head (always on top)
  const head = chibiHead({
    cx,
    cy: headCY,
    radius: 26,
    expression: opts.expression || 'happy',
    showBlush: true,
  });
  allDefs += head.defs;
  allBody += head.body;

  return svgWrap(128, 128, allDefs, allBody, `hero_f${frame}`);
}

// ═══════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════

module.exports = {
  svgWrap,
  radialGradient,
  linearGradient,
  outlineStyle,
  chibiHead,
  chibiBody,
  chibiArms,
  chibiLegs,
  sparkle,
  shadowBlob,
  glowCircle,
  blurFilter,
  assembleHero,
  PALETTE,
};
