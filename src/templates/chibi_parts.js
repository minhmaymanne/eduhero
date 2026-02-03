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

  // ── Má hồng (ngay má, 2 bên mắt) ──
  if (showBlush) {
    body += `    <!-- Blush -->\n`;
    const blushY = eyeY + eyeRY + r * 0.06;
    body += `    <ellipse cx="${cx - r * 0.48}" cy="${blushY}" rx="${r * 0.12}" ry="${r * 0.07}" fill="#F48FB1" opacity="0.5" />\n`;
    body += `    <ellipse cx="${cx + r * 0.48}" cy="${blushY}" rx="${r * 0.12}" ry="${r * 0.07}" fill="#F48FB1" opacity="0.5" />\n`;
  }

  // ── Miệng — cười hở, bên trong có răng trắng, khoang đỏ sẫm, KHÔNG lưỡi ──
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
  } else if (pose === 'run') {
    const p = frame * (Math.PI / 3);
    const swL = Math.sin(p + Math.PI) * 4;
    const swR = Math.sin(p) * 4;
    arm(sL, sy, sL + swL, sy + armLen - 2 - Math.abs(swL) * 0.2);
    arm(sR, sy, sR + swR, sy + armLen - 2 - Math.abs(swR) * 0.2);
  } else if (pose === 'hit') {
    arm(sL, sy, sL - 7, sy + armLen - 3);
    arm(sR, sy, sR + 7, sy + armLen - 3);
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
  } else if (pose === 'spread') {
    leg(lL, hipY, lL - 3, hipY + legLen);
    leg(lR, hipY, lR + 3, hipY + legLen);
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
// SPRINT 1: DIRECTIONAL RUN ANIMATIONS
// ═══════════════════════════════════════════════════════════

/**
 * Run Down (front-facing, toward camera) — 6 frames
 */
function assembleHeroRunDown(opts = {}) {
  const frame = opts.frame || 0;
  const cx = 64;
  const headR = 38;

  const phase = (frame / 6) * Math.PI * 2;
  const bodyBob = -Math.abs(Math.sin(phase)) * 1.5;
  const headCY = 40 + bodyBob * 0.3;
  const torsoY = 74 + bodyBob;

  let allDefs = '';
  let allBody = '';

  allDefs += blurFilter() + '\n';

  // Shadow (bounces with run)
  const shadowScale = 1 - Math.abs(Math.sin(phase)) * 0.15;
  allBody += shadowBlob(cx, 120, 16 * shadowScale, 4 * shadowScale);

  // Legs
  const legs = chibiLegs({
    cx, hipY: torsoY + 24 + bodyBob * 0.3, pose: 'run', frame,
  });
  allBody += legs.body;

  // Body
  const torso = chibiBody({ cx, torsoY, pantsColor: 'brown' });
  allDefs += torso.defs;
  allBody += torso.body;

  // Arms (run pose)
  const arms = chibiArms({ cx, shoulderY: torsoY + 3, pose: 'run', frame });
  allDefs += arms.defs;
  allBody += arms.body;

  // Head
  const head = chibiHead({
    cx, cy: headCY, radius: headR, expression: 'happy', showBlush: true,
  });
  allDefs += head.defs;
  allBody += head.body;

  return svgWrap(128, 128, allDefs, allBody, `hero_run_down_f${frame}`);
}

/**
 * Run Up (back view, running away from camera) — 6 frames
 */
function assembleHeroRunUp(opts = {}) {
  const frame = opts.frame || 0;
  const cx = 64;
  const headR = 38;

  const phase = (frame / 6) * Math.PI * 2;
  const bodyBob = -Math.abs(Math.sin(phase)) * 1.5;
  const headCY = 40 + bodyBob * 0.3;
  const torsoY = 74 + bodyBob;

  const skin = PALETTE.hero.skin;
  const hair = PALETTE.hero.hair;
  const pants = PALETTE.hero.pants;
  const OL = '#1A1A1A';

  let allDefs = '';
  let allBody = '';

  allDefs += blurFilter() + '\n';
  allDefs += radialGradient('headGradB', [skin.base, skin.shadow], '50%', '55%', '55%') + '\n';
  allDefs += radialGradient('hairGradB', [hair.highlight, hair.base, hair.shadow], '45%', '30%', '65%') + '\n';
  allDefs += linearGradient('bodyGradB', [skin.base, skin.shadow]) + '\n';
  allDefs += linearGradient('pantsGradB', [pants.highlight, pants.base, pants.shadow]) + '\n';

  const shadowScale = 1 - Math.abs(Math.sin(phase)) * 0.15;
  allBody += shadowBlob(cx, 120, 16 * shadowScale, 4 * shadowScale);

  // ── Legs (back, running) ──
  const legLen = 8;
  const legW = 5;
  const hipY = torsoY + 22 + bodyBob * 0.3;
  const legSwing = Math.sin(phase);
  allBody += `    <!-- Legs (back) -->\n`;
  [[cx - 5, legSwing], [cx + 5, -legSwing]].forEach(([lx, sw]) => {
    const ex = lx + sw * 5;
    const ey = hipY + legLen - Math.abs(sw) * 2;
    allBody += `    <line x1="${lx}" y1="${hipY}" x2="${ex}" y2="${ey}" stroke="${OL}" stroke-width="${legW + 3}" stroke-linecap="round" />\n`;
    allBody += `    <line x1="${lx}" y1="${hipY}" x2="${ex}" y2="${ey}" stroke="${skin.base}" stroke-width="${legW}" stroke-linecap="round" />\n`;
    allBody += `    <ellipse cx="${ex}" cy="${ey + 1}" rx="${legW * 0.6}" ry="${legW * 0.35}" fill="${skin.shadow}" stroke="${OL}" stroke-width="1.8" />\n`;
  });

  // ── Torso (back, bare skin) ──
  const tw = 15;
  const th = 14;
  allBody += `    <!-- Torso (back) -->\n`;
  allBody += `    <path d="M${cx - tw} ${torsoY} Q ${cx - tw - 2} ${torsoY + th * 0.5}, ${cx - tw + 1} ${torsoY + th} Q ${cx} ${torsoY + th + 3}, ${cx + tw - 1} ${torsoY + th} Q ${cx + tw + 2} ${torsoY + th * 0.5}, ${cx + tw} ${torsoY} Z" fill="url(#bodyGradB)" stroke="${OL}" stroke-width="3" />\n`;
  // Spine hint
  allBody += `    <line x1="${cx}" y1="${torsoY + 3}" x2="${cx}" y2="${torsoY + th - 2}" stroke="${skin.shadow}" stroke-width="1" opacity="0.2" stroke-linecap="round" />\n`;

  // ── Pants (back) ──
  const pantsY = torsoY + th - 2;
  const ph = 10;
  allBody += `    <path d="M${cx - tw + 1} ${pantsY} L${cx - tw} ${pantsY + ph} Q ${cx - 2} ${pantsY + ph + 2}, ${cx} ${pantsY + ph - 1} Q ${cx + 2} ${pantsY + ph + 2}, ${cx + tw} ${pantsY + ph} L${cx + tw - 1} ${pantsY} Z" fill="url(#pantsGradB)" stroke="${OL}" stroke-width="3" />\n`;
  allBody += `    <line x1="${cx - tw + 2}" y1="${pantsY + 1}" x2="${cx + tw - 2}" y2="${pantsY + 1}" stroke="${pants.shadow}" stroke-width="1.5" stroke-linecap="round" />\n`;

  // ── Arms (back, running swing) ──
  const armW = 5;
  const armLen = 10;
  const sL = cx - 17;
  const sR = cx + 17;
  const sy = torsoY + 3;
  const armSw = Math.sin(phase + Math.PI) * 4;
  allBody += `    <!-- Arms (back) -->\n`;
  [[sL, armSw], [sR, -armSw]].forEach(([sx, sw]) => {
    const ex = sx + sw;
    const ey = sy + armLen - 2 - Math.abs(sw) * 0.2;
    allBody += `    <line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${OL}" stroke-width="${armW + 3}" stroke-linecap="round" />\n`;
    allBody += `    <line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${skin.base}" stroke-width="${armW}" stroke-linecap="round" />\n`;
    allBody += `    <circle cx="${ex}" cy="${ey}" r="${armW * 0.45}" fill="${skin.base}" stroke="${OL}" stroke-width="2" />\n`;
  });

  // ── Head (back view) ──
  const hcy = headCY;
  const r = headR;
  const ry = r * 0.88;
  const rc = r * 0.7;

  // Ears (from behind)
  const earW = r * 0.14;
  const earH = r * 0.2;
  const earY = hcy + r * 0.12;
  allBody += `    <ellipse cx="${cx - r + earW * 0.1}" cy="${earY}" rx="${earW}" ry="${earH}" fill="url(#headGradB)" stroke="${OL}" stroke-width="3.5" />\n`;
  allBody += `    <ellipse cx="${cx + r - earW * 0.1}" cy="${earY}" rx="${earW}" ry="${earH}" fill="url(#headGradB)" stroke="${OL}" stroke-width="3.5" />\n`;

  // Head shape
  allBody += `    <rect x="${cx - r}" y="${hcy - ry}" width="${r * 2}" height="${ry * 2}" rx="${rc}" ry="${rc}" fill="url(#headGradB)" stroke="${OL}" stroke-width="3.5" />\n`;

  // Hair covering back of head
  allBody += `    <path d="M${cx - r * 0.65} ${hcy - r * 0.6} Q ${cx - r * 0.7} ${hcy - ry + 2}, ${cx - r * 0.3} ${hcy - ry + 1} Q ${cx} ${hcy - ry - 1}, ${cx + r * 0.3} ${hcy - ry + 1} Q ${cx + r * 0.7} ${hcy - ry + 2}, ${cx + r * 0.65} ${hcy - r * 0.6} Q ${cx + r * 0.4} ${hcy - r * 0.45}, ${cx} ${hcy - r * 0.42} Q ${cx - r * 0.4} ${hcy - r * 0.45}, ${cx - r * 0.65} ${hcy - r * 0.6} Z" fill="url(#hairGradB)" stroke="${OL}" stroke-width="2.5" />\n`;

  // Quả đào tuft (same shape, visible from back)
  const peachCX = cx + r * 0.05;
  const peachTopY = hcy - r * 0.95;
  const ps = r * 0.42;
  allBody += `    <path d="M${peachCX} ${peachTopY + ps * 0.7} Q ${peachCX - ps * 1.1} ${peachTopY + ps * 0.5}, ${peachCX - ps * 0.8} ${peachTopY - ps * 0.2} Q ${peachCX - ps * 0.5} ${peachTopY - ps * 0.8}, ${peachCX + ps * 0.05} ${peachTopY - ps * 0.5} Q ${peachCX + ps * 0.6} ${peachTopY - ps * 0.85}, ${peachCX + ps * 0.9} ${peachTopY - ps * 0.15} Q ${peachCX + ps * 1.1} ${peachTopY + ps * 0.5}, ${peachCX + ps * 0.3} ${peachTopY + ps * 0.95} Q ${peachCX + ps * 0.15} ${peachTopY + ps * 0.85}, ${peachCX} ${peachTopY + ps * 0.7} Z" fill="url(#hairGradB)" stroke="${OL}" stroke-width="3.5" />\n`;
  allBody += `    <path d="M${peachCX + ps * 0.05} ${peachTopY - ps * 0.5} Q ${peachCX + ps * 0.05} ${peachTopY - ps * 0.15}, ${peachCX} ${peachTopY + ps * 0.05}" fill="none" stroke="${hair.shadow}" stroke-width="1.2" stroke-linecap="round" opacity="0.4" />\n`;

  return svgWrap(128, 128, allDefs, allBody, `hero_run_up_f${frame}`);
}

/**
 * Run Side (profile view, facing left) — 6 frames
 * For run_right: wrap output in <g transform="translate(128,0) scale(-1,1)">
 */
function assembleHeroRunSide(opts = {}) {
  const frame = opts.frame || 0;
  const flip = opts.flip || false; // true = facing right
  const cx = 64;
  const headR = 38;

  const phase = (frame / 6) * Math.PI * 2;
  const bodyBob = -Math.abs(Math.sin(phase)) * 1.5;
  const headCY = 40 + bodyBob * 0.3;
  const torsoY = 74 + bodyBob;

  const skin = PALETTE.hero.skin;
  const hair = PALETTE.hero.hair;
  const pants = PALETTE.hero.pants;
  const OL = '#1A1A1A';
  const OLW = 3.5;

  let allDefs = '';
  let innerBody = '';

  allDefs += blurFilter() + '\n';
  allDefs += radialGradient('headGradS', [skin.highlight, skin.base, skin.shadow], '35%', '40%', '55%') + '\n';
  allDefs += radialGradient('hairGradS', [hair.highlight, hair.base, hair.shadow], '45%', '30%', '65%') + '\n';
  allDefs += linearGradient('bodyGradS', [skin.highlight, skin.base, skin.shadow]) + '\n';
  allDefs += linearGradient('pantsGradS', [pants.highlight, pants.base, pants.shadow]) + '\n';

  const shadowScale = 1 - Math.abs(Math.sin(phase)) * 0.15;
  innerBody += shadowBlob(cx, 120, 14 * shadowScale, 3.5 * shadowScale);

  // ── Legs (side, running — x axis = forward/back) ──
  const legLen = 10;
  const legW = 5;
  const hipY = torsoY + 22 + bodyBob * 0.3;
  const legFwd = Math.sin(phase) * 7;
  const legBack = Math.sin(phase + Math.PI) * 7;

  innerBody += `    <!-- Legs (side) -->\n`;
  // Back leg (drawn first, behind body)
  const blEx = cx + legBack;
  const blEy = hipY + legLen - 2 - Math.abs(legBack) * 0.15;
  innerBody += `    <line x1="${cx}" y1="${hipY}" x2="${blEx}" y2="${blEy}" stroke="${OL}" stroke-width="${legW + 3}" stroke-linecap="round" />\n`;
  innerBody += `    <line x1="${cx}" y1="${hipY}" x2="${blEx}" y2="${blEy}" stroke="${skin.shadow}" stroke-width="${legW}" stroke-linecap="round" />\n`;
  innerBody += `    <ellipse cx="${blEx}" cy="${blEy + 1}" rx="${legW * 0.7}" ry="${legW * 0.3}" fill="${skin.shadow}" stroke="${OL}" stroke-width="1.8" />\n`;

  // ── Back arm (behind body) ──
  const armLen = 10;
  const armW = 5;
  const sy = torsoY + 3;
  const backArmSw = Math.sin(phase) * 5;
  const baEx = cx + backArmSw;
  const baEy = sy + armLen - 1 - Math.abs(backArmSw) * 0.15;
  innerBody += `    <!-- Back arm -->\n`;
  innerBody += `    <line x1="${cx}" y1="${sy}" x2="${baEx}" y2="${baEy}" stroke="${OL}" stroke-width="${armW + 3}" stroke-linecap="round" />\n`;
  innerBody += `    <line x1="${cx}" y1="${sy}" x2="${baEx}" y2="${baEy}" stroke="${skin.shadow}" stroke-width="${armW}" stroke-linecap="round" />\n`;
  innerBody += `    <circle cx="${baEx}" cy="${baEy}" r="${armW * 0.45}" fill="${skin.shadow}" stroke="${OL}" stroke-width="2" />\n`;

  // ── Torso (side, thinner) ──
  const tw = 10;
  const th = 14;
  innerBody += `    <!-- Torso (side) -->\n`;
  innerBody += `    <path d="M${cx - tw} ${torsoY} Q ${cx - tw - 1} ${torsoY + th * 0.5}, ${cx - tw + 1} ${torsoY + th} Q ${cx} ${torsoY + th + 2}, ${cx + tw - 1} ${torsoY + th} Q ${cx + tw + 1} ${torsoY + th * 0.5}, ${cx + tw} ${torsoY} Z" fill="url(#bodyGradS)" stroke="${OL}" stroke-width="3" />\n`;

  // Pants (side)
  const pantsY = torsoY + th - 2;
  const ph = 10;
  innerBody += `    <path d="M${cx - tw + 1} ${pantsY} L${cx - tw} ${pantsY + ph} Q ${cx} ${pantsY + ph + 1}, ${cx + tw} ${pantsY + ph} L${cx + tw - 1} ${pantsY} Z" fill="url(#pantsGradS)" stroke="${OL}" stroke-width="3" />\n`;
  innerBody += `    <line x1="${cx - tw + 2}" y1="${pantsY + 1}" x2="${cx + tw - 2}" y2="${pantsY + 1}" stroke="${pants.shadow}" stroke-width="1.5" stroke-linecap="round" />\n`;

  // Front leg (on top of body)
  const flEx = cx + legFwd;
  const flEy = hipY + legLen - 2 - Math.abs(legFwd) * 0.15;
  innerBody += `    <!-- Front leg -->\n`;
  innerBody += `    <line x1="${cx}" y1="${hipY}" x2="${flEx}" y2="${flEy}" stroke="${OL}" stroke-width="${legW + 3}" stroke-linecap="round" />\n`;
  innerBody += `    <line x1="${cx}" y1="${hipY}" x2="${flEx}" y2="${flEy}" stroke="${skin.base}" stroke-width="${legW}" stroke-linecap="round" />\n`;
  innerBody += `    <ellipse cx="${flEx}" cy="${flEy + 1}" rx="${legW * 0.7}" ry="${legW * 0.3}" fill="${skin.shadow}" stroke="${OL}" stroke-width="1.8" />\n`;

  // ── Front arm (on top of body) ──
  const frontArmSw = Math.sin(phase + Math.PI) * 5;
  const faEx = cx + frontArmSw;
  const faEy = sy + armLen - 1 - Math.abs(frontArmSw) * 0.15;
  innerBody += `    <!-- Front arm -->\n`;
  innerBody += `    <line x1="${cx}" y1="${sy}" x2="${faEx}" y2="${faEy}" stroke="${OL}" stroke-width="${armW + 3}" stroke-linecap="round" />\n`;
  innerBody += `    <line x1="${cx}" y1="${sy}" x2="${faEx}" y2="${faEy}" stroke="${skin.base}" stroke-width="${armW}" stroke-linecap="round" />\n`;
  innerBody += `    <circle cx="${faEx}" cy="${faEy}" r="${armW * 0.45}" fill="${skin.base}" stroke="${OL}" stroke-width="2" />\n`;

  // ── Head (side profile) ──
  const r = headR;
  const hcy = headCY;
  const rx = r * 0.82;
  const ry = r * 0.88;
  const rc = r * 0.65;

  // Ear (on back side — right side of head, visible to camera)
  innerBody += `    <!-- Ear (side) -->\n`;
  const earX = cx + rx - r * 0.02;
  const earY = hcy + r * 0.1;
  innerBody += `    <ellipse cx="${earX}" cy="${earY}" rx="${r * 0.13}" ry="${r * 0.18}" fill="url(#headGradS)" stroke="${OL}" stroke-width="${OLW}" />\n`;
  innerBody += `    <ellipse cx="${earX}" cy="${earY}" rx="${r * 0.06}" ry="${r * 0.1}" fill="${skin.shadow}" opacity="0.25" />\n`;

  // Head shape
  innerBody += `    <rect x="${cx - rx}" y="${hcy - ry}" width="${rx * 2}" height="${ry * 2}" rx="${rc}" ry="${rc}" fill="url(#headGradS)" stroke="${OL}" stroke-width="${OLW}" />\n`;

  // Hair fringe on front side (left) + quả đào
  innerBody += `    <!-- Hair (side) -->\n`;
  innerBody += `    <path d="M${cx + rx * 0.2} ${hcy - ry + rc * 0.3} Q ${cx - rx * 0.3} ${hcy - ry - 1}, ${cx - rx * 0.8} ${hcy - r * 0.55} Q ${cx - rx * 0.5} ${hcy - r * 0.7}, ${cx + rx * 0.2} ${hcy - ry + rc * 0.3} Z" fill="url(#hairGradS)" stroke="${OL}" stroke-width="2.5" />\n`;

  // Quả đào
  const peachCX = cx + r * 0.05;
  const peachTopY = hcy - r * 0.95;
  const ps = r * 0.38;
  innerBody += `    <path d="M${peachCX} ${peachTopY + ps * 0.7} Q ${peachCX - ps * 1.0} ${peachTopY + ps * 0.5}, ${peachCX - ps * 0.7} ${peachTopY - ps * 0.15} Q ${peachCX - ps * 0.4} ${peachTopY - ps * 0.7}, ${peachCX + ps * 0.05} ${peachTopY - ps * 0.4} Q ${peachCX + ps * 0.5} ${peachTopY - ps * 0.75}, ${peachCX + ps * 0.8} ${peachTopY - ps * 0.1} Q ${peachCX + ps * 1.0} ${peachTopY + ps * 0.5}, ${peachCX + ps * 0.25} ${peachTopY + ps * 0.85} Q ${peachCX + ps * 0.12} ${peachTopY + ps * 0.78}, ${peachCX} ${peachTopY + ps * 0.7} Z" fill="url(#hairGradS)" stroke="${OL}" stroke-width="${OLW}" />\n`;

  // Eye (one visible, on front/left side)
  const eyeX = cx - rx * 0.25;
  const eyeY = hcy + r * 0.1;
  const eyeRX = r * 0.15;
  const eyeRY = r * 0.18;
  innerBody += `    <ellipse cx="${eyeX}" cy="${eyeY}" rx="${eyeRX}" ry="${eyeRY}" fill="${OL}" />\n`;
  innerBody += `    <ellipse cx="${eyeX + eyeRX * 0.25}" cy="${eyeY - eyeRY * 0.3}" rx="${eyeRX * 0.3}" ry="${eyeRY * 0.25}" fill="#FFFFFF" />\n`;

  // Nose bump (on the left edge)
  const noseX = cx - rx + 2;
  const noseY = hcy + r * 0.2;
  innerBody += `    <path d="M${noseX} ${noseY - 2} Q ${noseX - 3} ${noseY}, ${noseX} ${noseY + 2}" fill="none" stroke="${skin.shadow}" stroke-width="1.5" stroke-linecap="round" opacity="0.4" />\n`;

  // Blush (one cheek visible)
  const blushX = cx - rx * 0.35;
  const blushY = eyeY + eyeRY + r * 0.05;
  innerBody += `    <ellipse cx="${blushX}" cy="${blushY}" rx="${r * 0.1}" ry="${r * 0.06}" fill="#F48FB1" opacity="0.5" />\n`;

  // Mouth (side)
  const mouthX = cx - rx * 0.15;
  const mouthY = hcy + r * 0.42;
  innerBody += `    <path d="M${mouthX - r * 0.06} ${mouthY} Q ${mouthX} ${mouthY + r * 0.06}, ${mouthX + r * 0.06} ${mouthY}" fill="none" stroke="${OL}" stroke-width="2" stroke-linecap="round" />\n`;

  // Wrap with flip if right-facing
  let allBody = '';
  if (flip) {
    allBody = `  <g transform="translate(128, 0) scale(-1, 1)">\n${innerBody}  </g>\n`;
  } else {
    allBody = innerBody;
  }

  const dir = flip ? 'right' : 'left';
  return svgWrap(128, 128, allDefs, allBody, `hero_run_${dir}_f${frame}`);
}

// ═══════════════════════════════════════════════════════════
// SPRINT 1: COMBAT ANIMATIONS (front view)
// ═══════════════════════════════════════════════════════════

/**
 * Attack Ranged — 4 frames, front view with crossbow
 * f0: Ready (serious), f1: Raising crossbow, f2: Aim, f3: Release + flash
 */
function assembleHeroAttackRanged(opts = {}) {
  const frame = opts.frame || 0;
  const cx = 64;
  const headR = 38;
  const headCY = 40;
  const torsoY = 74;

  const armPoses = ['idle', 'raise', 'aim_bow', 'aim_bow'];
  const expressions = ['serious', 'serious', 'serious', 'happy'];

  let allDefs = '';
  let allBody = '';

  allDefs += blurFilter() + '\n';

  // Shadow
  allBody += shadowBlob(cx, 120, 16, 4);

  // Legs
  const legs = chibiLegs({ cx, hipY: torsoY + 24, pose: 'spread', frame });
  allBody += legs.body;

  // Body
  const torso = chibiBody({ cx, torsoY, pantsColor: 'brown' });
  allDefs += torso.defs;
  allBody += torso.body;

  // Arms
  const arms = chibiArms({ cx, shoulderY: torsoY + 3, pose: armPoses[frame], frame });
  allDefs += arms.defs;
  allBody += arms.body;

  // Crossbow (frames 1-3)
  if (frame >= 1) {
    const wc = PALETTE.weapons.rangedA;
    allDefs += linearGradient('xbowGrad', [wc.highlight, wc.base, wc.shadow]) + '\n';

    if (frame === 1) {
      // Raising — crossbow at right side going up
      allBody += `    <!-- Crossbow raising -->\n`;
      allBody += `    <rect x="74" y="60" width="14" height="5" rx="2" fill="url(#xbowGrad)" stroke="#1A1A1A" stroke-width="2" transform="rotate(-30 81 62)" />\n`;
      allBody += `    <path d="M76 62 Q 72 55, 71 48" fill="none" stroke="url(#xbowGrad)" stroke-width="3" />\n`;
    } else if (frame === 2) {
      // Aiming — crossbow extended right, arrow ready
      allBody += `    <!-- Crossbow aiming -->\n`;
      allBody += `    <rect x="80" y="76" width="16" height="5" rx="2" fill="url(#xbowGrad)" stroke="#1A1A1A" stroke-width="2" />\n`;
      allBody += `    <path d="M82 78 Q 78 70, 76 62" fill="none" stroke="url(#xbowGrad)" stroke-width="3" />\n`;
      allBody += `    <path d="M82 78 Q 78 86, 76 94" fill="none" stroke="url(#xbowGrad)" stroke-width="3" />\n`;
      allBody += `    <path d="M76 62 Q 84 78, 76 94" fill="none" stroke="${wc.accent}" stroke-width="1.5" opacity="0.8" />\n`;
      // Arrow
      allBody += `    <line x1="82" y1="78" x2="100" y2="78" stroke="${wc.accent}" stroke-width="2.5" stroke-linecap="round" />\n`;
      allBody += `    <polygon points="100,78 95,74 95,82" fill="${wc.accent}" stroke="#1A1A1A" stroke-width="1" />\n`;
    } else if (frame === 3) {
      // Release — crossbow recoil, flash effect
      allBody += `    <!-- Crossbow release -->\n`;
      allBody += `    <rect x="78" y="76" width="14" height="5" rx="2" fill="url(#xbowGrad)" stroke="#1A1A1A" stroke-width="2" />\n`;
      // Release flash
      allBody += `    <circle cx="100" cy="78" r="8" fill="${wc.accent}" opacity="0.4" filter="url(#blur)" />\n`;
      allBody += `    <circle cx="100" cy="78" r="3" fill="#FFFFFF" opacity="0.7" />\n`;
    }
  }

  // Head
  const head = chibiHead({
    cx, cy: headCY, radius: headR, expression: expressions[frame], showBlush: true,
  });
  allDefs += head.defs;
  allBody += head.body;

  return svgWrap(128, 128, allDefs, allBody, `hero_attack_ranged_f${frame}`);
}

/**
 * Hit reaction — 2 frames
 * f0: Impact (lean back, hurt), f1: Recovery flash
 */
function assembleHeroHit(opts = {}) {
  const frame = opts.frame || 0;
  const cx = 64;
  const headR = 38;

  const leanBack = frame === 0 ? 4 : 2;
  const headCY = 40;
  const torsoY = 74;

  let allDefs = '';
  let allBody = '';

  allDefs += blurFilter() + '\n';

  // Shadow
  allBody += shadowBlob(cx + leanBack, 120, 16, 4);

  // Group with lean
  allBody += `  <g transform="translate(${leanBack}, 0)">\n`;

  // Legs
  const legs = chibiLegs({ cx, hipY: torsoY + 24, pose: 'spread', frame });
  allBody += legs.body;

  // Body
  const torso = chibiBody({ cx, torsoY, pantsColor: 'brown' });
  allDefs += torso.defs;
  allBody += torso.body;

  // Arms (thrown back)
  const arms = chibiArms({ cx, shoulderY: torsoY + 3, pose: 'hit', frame });
  allDefs += arms.defs;
  allBody += arms.body;

  // Head
  const head = chibiHead({
    cx, cy: headCY, radius: headR, expression: 'hurt', showBlush: false,
  });
  allDefs += head.defs;
  allBody += head.body;

  allBody += `  </g>\n`;

  // Red damage flash overlay (frame 0)
  if (frame === 0) {
    allBody += `    <rect x="0" y="0" width="128" height="128" fill="#FF0000" opacity="0.15" />\n`;
  }

  return svgWrap(128, 128, allDefs, allBody, `hero_hit_f${frame}`);
}

/**
 * Death sequence — 4 frames
 * f0: Stagger, f1: Falling, f2: Almost down, f3: Flat + soul
 */
function assembleHeroDeath(opts = {}) {
  const frame = opts.frame || 0;
  const cx = 64;
  const headR = 38;
  const headCY = 40;
  const torsoY = 74;

  const rotations = [10, 30, 60, 85];
  const rotation = rotations[frame] || 0;
  const yShift = [0, 5, 15, 25][frame] || 0;
  const opacity = frame === 3 ? 0.6 : 1;

  let allDefs = '';
  let allBody = '';

  allDefs += blurFilter() + '\n';

  // Shadow (gets wider and flatter as hero falls)
  const sRx = 16 + frame * 3;
  const sRy = 4 - frame * 0.5;
  allBody += shadowBlob(cx, 120, sRx, Math.max(sRy, 2));

  // Falling body group (rotated around feet/bottom)
  allBody += `  <g transform="rotate(${rotation}, ${cx}, 115)" opacity="${opacity}">\n`;

  // Legs
  const legs = chibiLegs({ cx, hipY: torsoY + 24, pose: 'spread', frame: 0 });
  allBody += legs.body;

  // Body
  const torso = chibiBody({ cx, torsoY, pantsColor: 'brown' });
  allDefs += torso.defs;
  allBody += torso.body;

  // Arms (limp)
  const arms = chibiArms({ cx, shoulderY: torsoY + 3, pose: 'hit', frame: 0 });
  allDefs += arms.defs;
  allBody += arms.body;

  // Head (hurt expression)
  const head = chibiHead({
    cx, cy: headCY, radius: headR,
    expression: frame < 2 ? 'hurt' : 'blink',
    showBlush: false,
  });
  allDefs += head.defs;
  allBody += head.body;

  allBody += `  </g>\n`;

  // Soul floating up (frame 3)
  if (frame === 3) {
    allBody += `    <!-- Soul -->\n`;
    allBody += `    <circle cx="${cx}" cy="25" r="6" fill="#FFFFFF" opacity="0.6" />\n`;
    allBody += `    <circle cx="${cx}" cy="25" r="10" fill="#FFFFFF" opacity="0.2" filter="url(#blur)" />\n`;
    allBody += `    <path d="M${cx - 4} 28 Q ${cx - 6} 35, ${cx - 3} 40" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.4" stroke-linecap="round" />\n`;
    allBody += `    <path d="M${cx + 4} 28 Q ${cx + 6} 35, ${cx + 3} 40" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.4" stroke-linecap="round" />\n`;
  }

  return svgWrap(128, 128, allDefs, allBody, `hero_death_f${frame}`);
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
  assembleHeroRunDown,
  assembleHeroRunUp,
  assembleHeroRunSide,
  assembleHeroAttackRanged,
  assembleHeroHit,
  assembleHeroDeath,
  PALETTE,
};
