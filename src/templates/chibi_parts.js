/**
 * EduHero — Chibi Template Parts
 *
 * Phong cách: 100% giống mẫu chibi monk cute
 * Đầu siêu to ~65%, outline đen đậm 3-4px, đơn giản, sạch sẽ
 * 128×128px canvas
 */

const PALETTE = require('../constants/palette');

// ═══════════════════════════════════════════════════════════
// SVG HELPERS
// ═══════════════════════════════════════════════════════════

function svgWrap(width, height, defsContent, bodyContent, id = 'sprite') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" id="${id}">
  <defs>
${defsContent}
  </defs>
${bodyContent}
</svg>`;
}

function radialGradient(id, colors, cx = '40%', cy = '35%', r = '60%') {
  const stops = colors.map((c, i) => {
    const offset = i === 0 ? '0%' : i === colors.length - 1 ? '100%' : `${Math.round((i / (colors.length - 1)) * 100)}%`;
    return `      <stop offset="${offset}" stop-color="${c}" />`;
  }).join('\n');
  return `    <radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" fx="${cx}" fy="${cy}">
${stops}
    </radialGradient>`;
}

function linearGradient(id, colors, x1 = '0%', y1 = '0%', x2 = '0%', y2 = '100%') {
  const stops = colors.map((c, i) => {
    const offset = i === 0 ? '0%' : i === colors.length - 1 ? '100%' : `${Math.round((i / (colors.length - 1)) * 100)}%`;
    return `      <stop offset="${offset}" stop-color="${c}" />`;
  }).join('\n');
  return `    <linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
${stops}
    </linearGradient>`;
}

function outlineStyle(width = 3, color = '#1A1A1A') {
  return `stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"`;
}

// ═══════════════════════════════════════════════════════════
// CHIBI HEAD — 100% giống mẫu
// ═══════════════════════════════════════════════════════════

function chibiHead(opts = {}) {
  const cx = opts.cx || 64;
  const cy = opts.cy || 42;
  const r = opts.radius || 38;
  const gId = opts.gradientId || 'headGrad';
  const expr = opts.expression || 'happy';
  const showBlush = opts.showBlush !== false;
  const skin = PALETTE.hero.skin;
  const OL = '#1A1A1A';
  const OLW = 3.5;

  let defs = '';
  let body = '';

  // Skin gradient
  defs += radialGradient(gId, [skin.highlight, skin.base, skin.shadow], '48%', '42%', '58%') + '\n';
  // Hair gradient (đen)
  const hair = PALETTE.hero.hair;
  defs += radialGradient(`${gId}Hair`, [hair.highlight, hair.base, hair.shadow], '45%', '30%', '65%') + '\n';

  // ── Tai (nằm sau đầu) ──
  body += `    <!-- Ears -->\n`;
  const earW = r * 0.16;
  const earH = r * 0.22;
  const earY = cy + r * 0.12;
  body += `    <ellipse cx="${cx - r + earW * 0.3}" cy="${earY}" rx="${earW}" ry="${earH}" fill="url(#${gId})" stroke="${OL}" stroke-width="${OLW}" />\n`;
  body += `    <ellipse cx="${cx - r + earW * 0.3}" cy="${earY}" rx="${earW * 0.45}" ry="${earH * 0.55}" fill="${skin.shadow}" opacity="0.25" />\n`;
  body += `    <ellipse cx="${cx + r - earW * 0.3}" cy="${earY}" rx="${earW}" ry="${earH}" fill="url(#${gId})" stroke="${OL}" stroke-width="${OLW}" />\n`;
  body += `    <ellipse cx="${cx + r - earW * 0.3}" cy="${earY}" rx="${earW * 0.45}" ry="${earH * 0.55}" fill="${skin.shadow}" opacity="0.25" />\n`;

  // ── Đầu hơi vuông bo tròn (giống mẫu — không phải hình tròn hoàn toàn) ──
  body += `    <!-- Head -->\n`;
  const ry = r * 0.88;  // chiều dọc ngắn hơn chiều ngang → hơi vuông
  const rc = r * 0.7;   // bo góc
  body += `    <rect x="${cx - r}" y="${cy - ry}" width="${r * 2}" height="${ry * 2}" rx="${rc}" ry="${rc}" fill="url(#${gId})" stroke="${OL}" stroke-width="${OLW}" />\n`;

  // ── Tóc quả đào chú tiểu ──
  body += `    <!-- Hair: quả đào -->\n`;

  // Chân tóc mỏng trên trán
  body += `    <path d="M${cx - r * 0.5} ${cy - r * 0.75}
      Q ${cx - r * 0.2} ${cy - r * 0.9}, ${cx + r * 0.05} ${cy - r * 0.88}
      Q ${cx + r * 0.3} ${cy - r * 0.85}, ${cx + r * 0.5} ${cy - r * 0.7}
      Q ${cx + r * 0.3} ${cy - r * 0.8}, ${cx + r * 0.05} ${cy - r * 0.82}
      Q ${cx - r * 0.2} ${cy - r * 0.84}, ${cx - r * 0.5} ${cy - r * 0.75} Z"
      fill="url(#${gId}Hair)" opacity="0.4" />\n`;

  // Búi tóc quả đào (trái tim lệch phải)
  const peachCX = cx + r * 0.05;
  const peachTopY = cy - r * 0.95;
  const ps = r * 0.42;

  body += `    <path d="
      M${peachCX} ${peachTopY + ps * 0.7}
      Q ${peachCX - ps * 1.1} ${peachTopY + ps * 0.5},
        ${peachCX - ps * 0.8} ${peachTopY - ps * 0.2}
      Q ${peachCX - ps * 0.5} ${peachTopY - ps * 0.8},
        ${peachCX + ps * 0.05} ${peachTopY - ps * 0.5}
      Q ${peachCX + ps * 0.6} ${peachTopY - ps * 0.85},
        ${peachCX + ps * 0.9} ${peachTopY - ps * 0.15}
      Q ${peachCX + ps * 1.1} ${peachTopY + ps * 0.5},
        ${peachCX + ps * 0.3} ${peachTopY + ps * 0.95}
      Q ${peachCX + ps * 0.15} ${peachTopY + ps * 0.85},
        ${peachCX} ${peachTopY + ps * 0.7} Z"
      fill="url(#${gId}Hair)" stroke="${OL}" stroke-width="${OLW}" />\n`;

  // Rãnh trái tim
  body += `    <path d="M${peachCX + ps * 0.05} ${peachTopY - ps * 0.5}
      Q ${peachCX + ps * 0.05} ${peachTopY - ps * 0.15},
        ${peachCX} ${peachTopY + ps * 0.05}"
      fill="none" stroke="${hair.shadow}" stroke-width="1.2" stroke-linecap="round" opacity="0.4" />\n`;

  // Highlight tóc
  body += `    <ellipse cx="${peachCX - ps * 0.3}" cy="${peachTopY - ps * 0.1}" rx="${ps * 0.2}" ry="${ps * 0.28}" fill="${hair.highlight}" opacity="0.2" transform="rotate(-15 ${peachCX - ps * 0.3} ${peachTopY - ps * 0.1})" />\n`;

  // ── Mắt ──
  body += `    <!-- Eyes -->\n`;
  const eyeL = cx - r * 0.33;
  const eyeR = cx + r * 0.33;
  const eyeY = cy + r * 0.12;
  const eyeRX = r * 0.17;
  const eyeRY = r * 0.2;

  if (expr === 'blink') {
    // Mắt nhắm — nét cong đơn giản
    const bw = eyeRX * 1.5;
    body += `    <path d="M${eyeL - bw} ${eyeY} Q ${eyeL} ${eyeY + 4}, ${eyeL + bw} ${eyeY}" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round" />\n`;
    body += `    <path d="M${eyeR - bw} ${eyeY} Q ${eyeR} ${eyeY + 4}, ${eyeR + bw} ${eyeY}" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round" />\n`;
  } else if (expr === 'hurt') {
    // Mắt nhíu đau
    const bw = eyeRX * 1.5;
    body += `    <path d="M${eyeL - bw} ${eyeY - 2} Q ${eyeL} ${eyeY + 5}, ${eyeL + bw} ${eyeY - 2}" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round" />\n`;
    body += `    <path d="M${eyeR - bw} ${eyeY - 2} Q ${eyeR} ${eyeY + 5}, ${eyeR + bw} ${eyeY - 2}" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round" />\n`;
    // Mồ hôi
    body += `    <path d="M${cx + r * 0.65} ${cy - r * 0.15} Q ${cx + r * 0.68} ${cy + r * 0.05}, ${cx + r * 0.62} ${cy + r * 0.08}" fill="#B3E5FC" stroke="#64B5F6" stroke-width="1" />\n`;
  } else if (expr === 'celebrate') {
    // Mắt cười híp (vui sướng)
    const bw = eyeRX * 1.5;
    body += `    <path d="M${eyeL - bw} ${eyeY + 1} Q ${eyeL} ${eyeY - 5}, ${eyeL + bw} ${eyeY + 1}" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round" />\n`;
    body += `    <path d="M${eyeR - bw} ${eyeY + 1} Q ${eyeR} ${eyeY - 5}, ${eyeR + bw} ${eyeY + 1}" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round" />\n`;
  } else {
    // ── MẮT MỞ — tròn đen to, 1 highlight trắng nhỏ (giống mẫu 100%) ──
    const drawEye = (ex, ey, lookUp) => {
      const offX = lookUp ? 1 : 0;
      const offY = lookUp ? -1 : 0;
      // Oval đen to
      body += `    <ellipse cx="${ex + offX}" cy="${ey + offY}" rx="${eyeRX}" ry="${eyeRY}" fill="${OL}" />\n`;
      // Highlight tròn trắng (góc trên-phải, giống mẫu)
      body += `    <ellipse cx="${ex + offX + eyeRX * 0.3}" cy="${ey + offY - eyeRY * 0.32}" rx="${eyeRX * 0.32}" ry="${eyeRY * 0.28}" fill="#FFFFFF" />\n`;
    };
    drawEye(eyeL, eyeY, expr === 'thinking');
    drawEye(eyeR, eyeY, expr === 'thinking');
  }

  // (không có chấm hồng má)

  // ── Miệng — cười hở, bên trong có răng trắng + lưỡi hồng (giống mẫu 100%) ──
  body += `    <!-- Mouth -->\n`;
  const mouthY = cy + r * 0.5;

  if (expr === 'happy' || expr === 'celebrate') {
    // Miệng cười hở to — bán nguyệt
    const mw = r * 0.28;   // nửa chiều rộng
    const mh = r * 0.22;   // chiều cao mở
    // Hình miệng đen (outline)
    body += `    <path d="M${cx - mw} ${mouthY} Q ${cx} ${mouthY + mh * 2.2}, ${cx + mw} ${mouthY} Z" fill="${OL}" />\n`;
    // Khoang miệng đỏ sẫm (bên trong)
    body += `    <path d="M${cx - mw + 2} ${mouthY + 1} Q ${cx} ${mouthY + mh * 2}, ${cx + mw - 2} ${mouthY + 1} Z" fill="#B71C1C" />\n`;
    // Răng trắng trên (hình bán nguyệt nhỏ sát mép trên)
    body += `    <path d="M${cx - mw + 3} ${mouthY + 1} Q ${cx} ${mouthY + mh * 0.7}, ${cx + mw - 3} ${mouthY + 1} Z" fill="#FFFFFF" />\n`;
    // Lưỡi hồng tròn ở dưới
    body += `    <ellipse cx="${cx}" cy="${mouthY + mh * 1.4}" rx="${mw * 0.5}" ry="${mh * 0.45}" fill="#E57373" />\n`;
  } else if (expr === 'hurt') {
    // Miệng méo
    const mw = r * 0.14;
    body += `    <path d="M${cx - mw} ${mouthY + 3} Q ${cx} ${mouthY - 2}, ${cx + mw} ${mouthY + 3}" fill="none" stroke="${OL}" stroke-width="2.5" stroke-linecap="round" />\n`;
  } else if (expr === 'serious') {
    // Mím miệng
    body += `    <line x1="${cx - r * 0.12}" y1="${mouthY}" x2="${cx + r * 0.12}" y2="${mouthY}" stroke="${OL}" stroke-width="2.5" stroke-linecap="round" />\n`;
  } else {
    // Miệng nhỏ cười nhẹ (thinking, default)
    const mw = r * 0.14;
    body += `    <path d="M${cx - mw} ${mouthY} Q ${cx} ${mouthY + r * 0.1}, ${cx + mw} ${mouthY}" fill="none" stroke="${OL}" stroke-width="2.5" stroke-linecap="round" />\n`;
  }

  // ── Celebrate sparkle ──
  if (expr === 'celebrate') {
    body += sparkle(cx - r * 0.8, cy - r * 0.5, 5, '#FFD54F');
    body += sparkle(cx + r * 0.85, cy - r * 0.4, 4, '#FFD54F');
  }

  return { defs, body };
}

// ═══════════════════════════════════════════════════════════
// CHIBI BODY — Ở trần + quần đùi
// ═══════════════════════════════════════════════════════════

function chibiBody(opts = {}) {
  const cx = opts.cx || 64;
  const torsoY = opts.torsoY || 76;
  const skin = PALETTE.hero.skin;
  const pants = opts.pantsColor === 'green' ? PALETTE.hero.pantsAlt : PALETTE.hero.pants;
  const OL = '#1A1A1A';
  const OLW = 3;

  let defs = '';
  let body = '';

  defs += linearGradient('bodyGrad', [skin.highlight, skin.base, skin.shadow]) + '\n';
  defs += linearGradient('pantsGrad', [pants.highlight, pants.base, pants.shadow]) + '\n';

  // ── Thân trên (ở trần, bụng tròn) ──
  const tw = 15;
  const th = 14;

  body += `    <!-- Torso -->\n`;
  body += `    <path d="
      M${cx - tw} ${torsoY}
      Q ${cx - tw - 2} ${torsoY + th * 0.5}, ${cx - tw + 1} ${torsoY + th}
      Q ${cx} ${torsoY + th + 3}, ${cx + tw - 1} ${torsoY + th}
      Q ${cx + tw + 2} ${torsoY + th * 0.5}, ${cx + tw} ${torsoY}
      Z"
      fill="url(#bodyGrad)" stroke="${OL}" stroke-width="${OLW}" />\n`;

  // ── Quần đùi ──
  const pantsY = torsoY + th - 2;
  const ph = 10;

  body += `    <!-- Pants -->\n`;
  body += `    <path d="
      M${cx - tw + 1} ${pantsY}
      L${cx - tw} ${pantsY + ph}
      Q ${cx - 2} ${pantsY + ph + 2}, ${cx} ${pantsY + ph - 1}
      Q ${cx + 2} ${pantsY + ph + 2}, ${cx + tw} ${pantsY + ph}
      L${cx + tw - 1} ${pantsY}
      Z"
      fill="url(#pantsGrad)" stroke="${OL}" stroke-width="${OLW}" />\n`;

  // Dây lưng
  body += `    <line x1="${cx - tw + 2}" y1="${pantsY + 1}" x2="${cx + tw - 2}" y2="${pantsY + 1}" stroke="${pants.shadow}" stroke-width="1.5" stroke-linecap="round" />\n`;

  return { defs, body, pantsBottom: pantsY + ph };
}

// ═══════════════════════════════════════════════════════════
// CHIBI ARMS — Tay ngắn, màu da
// ═══════════════════════════════════════════════════════════

function chibiArms(opts = {}) {
  const cx = opts.cx || 64;
  const sy = opts.shoulderY || 80;
  const pose = opts.pose || 'idle';
  const frame = opts.frame || 0;
  const OL = '#1A1A1A';
  const armW = 5;
  const armLen = 10;
  const armColor = PALETTE.hero.skin.base;
  const skin = PALETTE.hero.skin;

  let defs = '';
  let body = '';
  body += `    <!-- Arms -->\n`;

  function arm(sx2, sy2, ex, ey) {
    body += `    <line x1="${sx2}" y1="${sy2}" x2="${ex}" y2="${ey}" stroke="${OL}" stroke-width="${armW + 3}" stroke-linecap="round" />\n`;
    body += `    <line x1="${sx2}" y1="${sy2}" x2="${ex}" y2="${ey}" stroke="${armColor}" stroke-width="${armW}" stroke-linecap="round" />\n`;
    // Bàn tay nhỏ (da)
    body += `    <circle cx="${ex}" cy="${ey}" r="${armW * 0.45}" fill="${skin.base}" stroke="${OL}" stroke-width="2" />\n`;
  }

  const sL = cx - 17;
  const sR = cx + 17;

  if (pose === 'idle') {
    const sway = Math.sin(frame * Math.PI / 2) * 1;
    arm(sL, sy, sL - 3, sy + armLen + sway);
    arm(sR, sy, sR + 3, sy + armLen - sway);
  } else if (pose === 'raise') {
    arm(sL, sy, sL - 7, sy - armLen + 2);
    arm(sR, sy, sR + 7, sy - armLen + 2);
  } else if (pose === 'aim_bow') {
    arm(sL, sy, sL - 5, sy + 3);
    arm(sR, sy, sR + 9, sy + 1);
  } else if (pose === 'hold_book') {
    arm(sL, sy, cx - 5, sy + 4);
    arm(sR, sy, cx + 5, sy + 4);
  } else if (pose === 'swing_down') {
    const ang = (frame / 3) * Math.PI * 0.6;
    arm(sL, sy, sL - 3, sy + armLen);
    arm(sR, sy, sR + Math.sin(ang) * armLen, sy - Math.cos(ang) * armLen + 7);
  } else {
    arm(sL, sy, sL - 3, sy + armLen);
    arm(sR, sy, sR + 3, sy + armLen);
  }

  return { defs, body };
}

// ═══════════════════════════════════════════════════════════
// CHIBI LEGS — Chân ngắn, màu da
// ═══════════════════════════════════════════════════════════

function chibiLegs(opts = {}) {
  const cx = opts.cx || 64;
  const hipY = opts.hipY || 100;
  const pose = opts.pose || 'idle';
  const frame = opts.frame || 0;
  const OL = '#1A1A1A';
  const legLen = 8;
  const legW = 5;
  const legColor = PALETTE.hero.skin.base;
  const skin = PALETTE.hero.skin;

  let body = '';
  body += `    <!-- Legs -->\n`;

  function leg(sx, sy, ex, ey) {
    body += `    <line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${OL}" stroke-width="${legW + 3}" stroke-linecap="round" />\n`;
    body += `    <line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${legColor}" stroke-width="${legW}" stroke-linecap="round" />\n`;
    // Bàn chân
    body += `    <ellipse cx="${ex}" cy="${ey + 1}" rx="${legW * 0.6}" ry="${legW * 0.35}" fill="${skin.shadow}" stroke="${OL}" stroke-width="1.8" />\n`;
  }

  const lL = cx - 5;
  const lR = cx + 5;

  if (pose === 'idle') {
    leg(lL, hipY, lL, hipY + legLen);
    leg(lR, hipY, lR, hipY + legLen);
  } else if (pose === 'sit') {
    leg(lL, hipY, lL - 5, hipY + 3);
    leg(lR, hipY, lR + 5, hipY + 3);
  } else if (pose.startsWith('run')) {
    const phase = frame * (Math.PI / 3);
    const sL = Math.sin(phase) * 5;
    const sR = Math.sin(phase + Math.PI) * 5;
    leg(lL, hipY, lL + sL, hipY + legLen - Math.abs(sL) * 0.3);
    leg(lR, hipY, lR + sR, hipY + legLen - Math.abs(sR) * 0.3);
  } else {
    leg(lL, hipY, lL, hipY + legLen);
    leg(lR, hipY, lR, hipY + legLen);
  }

  return { defs: '', body };
}

// ═══════════════════════════════════════════════════════════
// DECORATIVE HELPERS
// ═══════════════════════════════════════════════════════════

function sparkle(x, y, size = 3, color = '#FFD54F') {
  return `    <path d="M${x} ${y - size} L${x + size * 0.3} ${y - size * 0.3} L${x + size} ${y}
      L${x + size * 0.3} ${y + size * 0.3} L${x} ${y + size}
      L${x - size * 0.3} ${y + size * 0.3} L${x - size} ${y}
      L${x - size * 0.3} ${y - size * 0.3} Z" fill="${color}" opacity="0.9" />\n`;
}

function shadowBlob(cx, y, rx = 16, ry = 4) {
  return `    <ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${ry}" fill="#000000" opacity="0.12" />\n`;
}

function glowCircle(cx, cy, r, color, opacity = 0.25) {
  return `    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${opacity}" filter="url(#blur)" />\n`;
}

function blurFilter(id = 'blur', stdDev = 4) {
  return `    <filter id="${id}"><feGaussianBlur stdDeviation="${stdDev}" /></filter>`;
}

// ═══════════════════════════════════════════════════════════
// FULL HERO ASSEMBLY
// ═══════════════════════════════════════════════════════════

function assembleHero(opts = {}) {
  const frame = opts.frame || 0;
  const bodyOffsetY = opts.bodyOffsetY || 0;
  const cx = 64;

  const headR = 38;
  const headCY = 40 + bodyOffsetY * 0.2;
  const torsoY = 74 + bodyOffsetY;

  let allDefs = '';
  let allBody = '';

  allDefs += blurFilter() + '\n';

  // Shadow
  allBody += shadowBlob(cx, 120, 16, 4);

  // Legs
  const legs = chibiLegs({
    cx,
    hipY: torsoY + 24 + bodyOffsetY * 0.3,
    pose: opts.legPose || 'idle',
    frame,
  });
  allBody += legs.body;

  // Body (robe)
  const torso = chibiBody({
    cx,
    torsoY,
    pantsColor: opts.pantsColor || 'brown',
  });
  allDefs += torso.defs;
  allBody += torso.body;

  // Arms
  const arms = chibiArms({
    cx,
    shoulderY: torsoY + 3,
    pose: opts.armPose || 'idle',
    frame,
  });
  allDefs += arms.defs;
  allBody += arms.body;

  // Head (on top)
  const head = chibiHead({
    cx,
    cy: headCY,
    radius: headR,
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
