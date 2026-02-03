/**
 * EduHero — Chibi Template Parts (Reusable SVG Components)
 *
 * Phong cách: Đầu SIÊU TO chiếm ~65% sprite, thân rất nhỏ
 * Tham khảo: chibi monk cute (đầu tròn, tai, mắt đen to, miệng cười hở)
 * Outline: 3-3.5px đậm, bo tròn
 * Coordinate system: 128×128px canvas, center = (64, 64)
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

function outlineStyle(width = 3, color = PALETTE.common.outline) {
  return `stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"`;
}

// ═══════════════════════════════════════════════════════════
// CHIBI HEAD — Đầu siêu to kiểu chibi monk
// ═══════════════════════════════════════════════════════════

function chibiHead(opts = {}) {
  const cx = opts.cx || 64;
  const cy = opts.cy || 42;
  const r = opts.radius || 36;  // ĐẦU RẤT TO
  const gId = opts.gradientId || 'headGrad';
  const expr = opts.expression || 'happy';
  const showBlush = opts.showBlush !== false;
  const skin = PALETTE.hero.skin;
  const hair = PALETTE.hero.hair;
  const OL = '#1A1A1A';  // outline đen đậm giống hình mẫu
  const OLW = 3.5;       // outline width đậm

  let defs = '';
  let body = '';

  defs += radialGradient(gId, [skin.highlight, skin.base, skin.shadow], '48%', '38%', '60%') + '\n';

  // ── Tai (vẽ trước để nằm sau đầu) ──
  body += `    <!-- Ears -->\n`;
  const earR = r * 0.18;
  const earY = cy + r * 0.15;
  // Tai trái
  body += `    <ellipse cx="${cx - r * 0.92}" cy="${earY}" rx="${earR}" ry="${earR * 1.2}" fill="url(#${gId})" stroke="${OL}" stroke-width="${OLW}" />\n`;
  body += `    <ellipse cx="${cx - r * 0.92}" cy="${earY}" rx="${earR * 0.5}" ry="${earR * 0.7}" fill="${skin.shadow}" opacity="0.3" />\n`;
  // Tai phải
  body += `    <ellipse cx="${cx + r * 0.92}" cy="${earY}" rx="${earR}" ry="${earR * 1.2}" fill="url(#${gId})" stroke="${OL}" stroke-width="${OLW}" />\n`;
  body += `    <ellipse cx="${cx + r * 0.92}" cy="${earY}" rx="${earR * 0.5}" ry="${earR * 0.7}" fill="${skin.shadow}" opacity="0.3" />\n`;

  // ── Đầu tròn to ──
  body += `    <!-- Head -->\n`;
  body += `    <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.95}" fill="url(#${gId})" stroke="${OL}" stroke-width="${OLW}" />\n`;

  // ── Tóc quả đào chú tiểu ──
  defs += radialGradient(`${gId}Hair`, [hair.highlight, hair.base, hair.shadow], '45%', '30%', '65%') + '\n';
  body += `    <!-- Hair -->\n`;

  // Chân tóc mỏng trên trán
  body += `    <path d="M${cx - r * 0.5} ${cy - r * 0.75}
      Q ${cx - r * 0.2} ${cy - r * 0.9}, ${cx + r * 0.05} ${cy - r * 0.88}
      Q ${cx + r * 0.3} ${cy - r * 0.85}, ${cx + r * 0.5} ${cy - r * 0.7}
      Q ${cx + r * 0.3} ${cy - r * 0.8}, ${cx + r * 0.05} ${cy - r * 0.82}
      Q ${cx - r * 0.2} ${cy - r * 0.84}, ${cx - r * 0.5} ${cy - r * 0.75} Z"
      fill="url(#${gId}Hair)" opacity="0.4" />\n`;

  // Búi tóc quả đào
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
  const eyeL = cx - r * 0.35;
  const eyeR = cx + r * 0.35;
  const eyeY = cy + r * 0.08;
  const eyeRX = r * 0.18;  // chiều ngang mắt
  const eyeRY = r * 0.22;  // chiều dọc mắt (oval đứng)

  if (expr === 'blink') {
    const bw = eyeRX * 1.3;
    body += `    <path d="M${eyeL - bw} ${eyeY} Q ${eyeL} ${eyeY + 4}, ${eyeL + bw} ${eyeY}" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round" />\n`;
    body += `    <path d="M${eyeR - bw} ${eyeY} Q ${eyeR} ${eyeY + 4}, ${eyeR + bw} ${eyeY}" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round" />\n`;
  } else if (expr === 'hurt') {
    const bw = eyeRX * 1.3;
    body += `    <path d="M${eyeL - bw} ${eyeY - 1} Q ${eyeL} ${eyeY + 5}, ${eyeL + bw} ${eyeY - 1}" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round" />\n`;
    body += `    <path d="M${eyeR - bw} ${eyeY - 1} Q ${eyeR} ${eyeY + 5}, ${eyeR + bw} ${eyeY - 1}" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round" />\n`;
    // Mồ hôi
    body += `    <path d="M${cx + r * 0.6} ${cy - r * 0.2} Q ${cx + r * 0.63} ${cy}, ${cx + r * 0.57} ${cy + r * 0.05}" fill="#B3E5FC" stroke="#4FC3F7" stroke-width="1" />\n`;
  } else if (expr === 'celebrate') {
    // Mắt cười híp (celebrate = vui quá nên nhắm mắt cười)
    const bw = eyeRX * 1.3;
    body += `    <path d="M${eyeL - bw} ${eyeY + 1} Q ${eyeL} ${eyeY - 5}, ${eyeL + bw} ${eyeY + 1}" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round" />\n`;
    body += `    <path d="M${eyeR - bw} ${eyeY + 1} Q ${eyeR} ${eyeY - 5}, ${eyeR + bw} ${eyeY + 1}" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round" />\n`;
  } else {
    // ── MẮT MỞ TO — oval đen đơn giản, 1 highlight nhỏ ──
    const drawEye = (ex, ey, lookUp) => {
      const offX = lookUp ? 1 : -0.3;
      const offY = lookUp ? -1 : 0.3;
      body += `    <ellipse cx="${ex + offX}" cy="${ey + offY}" rx="${eyeRX}" ry="${eyeRY}" fill="${OL}" />\n`;
      // 1 chấm highlight nhỏ gọn
      body += `    <ellipse cx="${ex + offX + eyeRX * 0.35}" cy="${ey + offY - eyeRY * 0.35}" rx="${eyeRX * 0.3}" ry="${eyeRY * 0.28}" fill="#FFFFFF" />\n`;
    };
    drawEye(eyeL, eyeY, expr === 'thinking');
    drawEye(eyeR, eyeY, expr === 'thinking');
  }

  // ── Má hồng (vẽ trước miệng) ──
  if (showBlush) {
    body += `    <!-- Blush -->\n`;
    const blushY = cy + r * 0.32;
    body += `    <ellipse cx="${cx - r * 0.48}" cy="${blushY}" rx="${r * 0.14}" ry="${r * 0.09}" fill="#F48FB1" opacity="0.5" />\n`;
    body += `    <ellipse cx="${cx + r * 0.48}" cy="${blushY}" rx="${r * 0.14}" ry="${r * 0.09}" fill="#F48FB1" opacity="0.5" />\n`;
  }

  // ── Miệng ──
  body += `    <!-- Mouth -->\n`;
  const mouthY = cy + r * 0.5;

  if (expr === 'happy' || expr === 'celebrate') {
    // Cười hở miệng cute — hình bán nguyệt đen, không fill đỏ/son
    const mw = r * 0.22;  // nửa chiều rộng miệng
    const mh = r * 0.15;  // chiều cao mở miệng
    body += `    <path d="M${cx - mw} ${mouthY} Q ${cx} ${mouthY + mh * 2}, ${cx + mw} ${mouthY}" fill="${OL}" />\n`;
    // Bên trong miệng tối hơn (không dùng đỏ)
    body += `    <path d="M${cx - mw + 2} ${mouthY + 1} Q ${cx} ${mouthY + mh * 1.6}, ${cx + mw - 2} ${mouthY + 1}" fill="#4E342E" />\n`;
  } else if (expr === 'hurt') {
    const mw = r * 0.12;
    body += `    <path d="M${cx - mw} ${mouthY + 3} Q ${cx} ${mouthY - 1}, ${cx + mw} ${mouthY + 3}" fill="none" stroke="${OL}" stroke-width="2.5" stroke-linecap="round" />\n`;
  } else if (expr === 'serious') {
    body += `    <line x1="${cx - r * 0.1}" y1="${mouthY}" x2="${cx + r * 0.1}" y2="${mouthY}" stroke="${OL}" stroke-width="2.5" stroke-linecap="round" />\n`;
  } else {
    // Miệng nhỏ cute (default / thinking)
    const mw = r * 0.12;
    body += `    <path d="M${cx - mw} ${mouthY} Q ${cx} ${mouthY + r * 0.1}, ${cx + mw} ${mouthY}" fill="none" stroke="${OL}" stroke-width="2.5" stroke-linecap="round" />\n`;
  }

  // ── Celebrate sparkle ──
  if (expr === 'celebrate') {
    body += sparkle(cx - r * 0.7, cy - r * 0.5, 5, '#FFD54F');
    body += sparkle(cx + r * 0.8, cy - r * 0.4, 4, '#FFD54F');
  }

  return { defs, body };
}

// ═══════════════════════════════════════════════════════════
// CHIBI BODY — Thân rất nhỏ so với đầu
// ═══════════════════════════════════════════════════════════

function chibiBody(opts = {}) {
  const cx = opts.cx || 64;
  const torsoY = opts.torsoY || 78;
  const skin = PALETTE.hero.skin;
  const pants = opts.pantsColor === 'green' ? PALETTE.hero.pantsAlt : PALETTE.hero.pants;
  const OL = '#1A1A1A';
  const OLW = 3;

  let defs = '';
  let body = '';

  defs += linearGradient('bodyGrad', [skin.highlight, skin.base, skin.shadow]) + '\n';
  defs += linearGradient('pantsGrad', [pants.highlight, pants.base, pants.shadow]) + '\n';

  // ── Thân trên (nhỏ gọn) ──
  const tw = 14;  // nửa chiều rộng thân
  const th = 12;  // chiều cao thân

  body += `    <!-- Torso -->\n`;
  body += `    <path d="M${cx - tw} ${torsoY}
      Q ${cx - tw - 1} ${torsoY + th * 0.5}, ${cx - tw + 2} ${torsoY + th}
      Q ${cx} ${torsoY + th + 2}, ${cx + tw - 2} ${torsoY + th}
      Q ${cx + tw + 1} ${torsoY + th * 0.5}, ${cx + tw} ${torsoY} Z"
      fill="url(#bodyGrad)" stroke="${OL}" stroke-width="${OLW}" />\n`;

  // ── Quần đùi ──
  const pantsY = torsoY + th - 2;
  const ph = 8;

  body += `    <!-- Pants -->\n`;
  body += `    <path d="M${cx - tw + 2} ${pantsY}
      L${cx - tw + 1} ${pantsY + ph}
      Q ${cx - 2} ${pantsY + ph + 2}, ${cx} ${pantsY + ph - 1}
      Q ${cx + 2} ${pantsY + ph + 2}, ${cx + tw - 1} ${pantsY + ph}
      L${cx + tw - 2} ${pantsY} Z"
      fill="url(#pantsGrad)" stroke="${OL}" stroke-width="${OLW}" />\n`;

  // Dây lưng
  body += `    <line x1="${cx - tw + 3}" y1="${pantsY + 1}" x2="${cx + tw - 3}" y2="${pantsY + 1}" stroke="${pants.shadow}" stroke-width="1.5" stroke-linecap="round" />\n`;

  return { defs, body, pantsBottom: pantsY + ph };
}

// ═══════════════════════════════════════════════════════════
// CHIBI ARMS — Tay ngắn cũn
// ═══════════════════════════════════════════════════════════

function chibiArms(opts = {}) {
  const cx = opts.cx || 64;
  const sy = opts.shoulderY || 80;
  const pose = opts.pose || 'idle';
  const frame = opts.frame || 0;
  const skin = PALETTE.hero.skin;
  const OL = '#1A1A1A';
  const armLen = 12;
  const armW = 5;

  let defs = '';
  let body = '';
  body += `    <!-- Arms -->\n`;

  function arm(sx2, sy2, ex, ey) {
    body += `    <line x1="${sx2}" y1="${sy2}" x2="${ex}" y2="${ey}" stroke="${OL}" stroke-width="${armW + 3}" stroke-linecap="round" />\n`;
    body += `    <line x1="${sx2}" y1="${sy2}" x2="${ex}" y2="${ey}" stroke="${skin.base}" stroke-width="${armW}" stroke-linecap="round" />\n`;
    body += `    <circle cx="${ex}" cy="${ey}" r="${armW * 0.5}" fill="${skin.base}" stroke="${OL}" stroke-width="2" />\n`;
  }

  const sL = cx - 15;
  const sR = cx + 15;

  if (pose === 'idle') {
    const sway = Math.sin(frame * Math.PI / 2) * 1;
    arm(sL, sy, sL - 4, sy + armLen + sway);
    arm(sR, sy, sR + 4, sy + armLen - sway);
  } else if (pose === 'raise') {
    arm(sL, sy, sL - 8, sy - armLen + 3);
    arm(sR, sy, sR + 8, sy - armLen + 3);
  } else if (pose === 'aim_bow') {
    arm(sL, sy, sL - 6, sy + 3);
    arm(sR, sy, sR + 10, sy + 1);
  } else if (pose === 'hold_book') {
    arm(sL, sy, cx - 5, sy + 5);
    arm(sR, sy, cx + 5, sy + 5);
  } else if (pose === 'swing_down') {
    const ang = (frame / 3) * Math.PI * 0.6;
    arm(sL, sy, sL - 4, sy + armLen);
    arm(sR, sy, sR + Math.sin(ang) * armLen, sy - Math.cos(ang) * armLen + 8);
  } else {
    arm(sL, sy, sL - 4, sy + armLen);
    arm(sR, sy, sR + 4, sy + armLen);
  }

  return { defs, body };
}

// ═══════════════════════════════════════════════════════════
// CHIBI LEGS — Chân ngắn
// ═══════════════════════════════════════════════════════════

function chibiLegs(opts = {}) {
  const cx = opts.cx || 64;
  const hipY = opts.hipY || 96;
  const pose = opts.pose || 'idle';
  const frame = opts.frame || 0;
  const skin = PALETTE.hero.skin;
  const OL = '#1A1A1A';
  const legLen = 10;
  const legW = 5;

  let body = '';
  body += `    <!-- Legs -->\n`;

  function leg(sx, sy, ex, ey) {
    body += `    <line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${OL}" stroke-width="${legW + 3}" stroke-linecap="round" />\n`;
    body += `    <line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${skin.base}" stroke-width="${legW}" stroke-linecap="round" />\n`;
    // Bàn chân
    body += `    <ellipse cx="${ex}" cy="${ey + 1}" rx="${legW * 0.65}" ry="${legW * 0.4}" fill="${skin.shadow}" stroke="${OL}" stroke-width="2" />\n`;
  }

  const lL = cx - 5;
  const lR = cx + 5;

  if (pose === 'idle') {
    leg(lL, hipY, lL, hipY + legLen);
    leg(lR, hipY, lR, hipY + legLen);
  } else if (pose === 'sit') {
    leg(lL, hipY, lL - 5, hipY + 4);
    leg(lR, hipY, lR + 5, hipY + 4);
  } else if (pose.startsWith('run')) {
    const phase = frame * (Math.PI / 3);
    const sL = Math.sin(phase) * 6;
    const sR = Math.sin(phase + Math.PI) * 6;
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
// FULL HERO ASSEMBLY — Tỉ lệ đầu:thân ~3:1
// ═══════════════════════════════════════════════════════════

function assembleHero(opts = {}) {
  const frame = opts.frame || 0;
  const bodyOffsetY = opts.bodyOffsetY || 0;
  const cx = 64;

  // Đầu to chiếm phần lớn, thân nhỏ phía dưới
  const headR = 36;
  const headCY = 38 + bodyOffsetY * 0.2;
  const torsoY = 72 + bodyOffsetY;

  let allDefs = '';
  let allBody = '';

  allDefs += blurFilter() + '\n';

  // Shadow
  allBody += shadowBlob(cx, 118, 16, 4);

  // Legs
  const legs = chibiLegs({
    cx,
    hipY: torsoY + 18 + bodyOffsetY * 0.3,
    pose: opts.legPose || 'idle',
    frame,
  });
  allBody += legs.body;

  // Body
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
    shoulderY: torsoY + 2,
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
