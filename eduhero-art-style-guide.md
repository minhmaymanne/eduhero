# 🎨 EduHero Art Style Guide
## Tự tạo bộ Assets — Cartoon Chibi · Smooth Vector 2D

> **Target style**: Archero / Angry Birds / Brawl Stars
> **Keywords**: Smooth edges, bold colors, vector-like, oversized head, expressive, mobile-friendly
> **KHÔNG phải pixel art** — Tất cả asset dùng đường cong mượt, gradient mềm, outline rõ ràng

---

## 1. Định nghĩa Art Style

### 1.1 Đặc trưng chính

| Yếu tố | Mô tả |
|---|---|
| **Tỉ lệ cơ thể** | Chibi 2.5-3 head ratio (đầu chiếm 35-40% chiều cao) |
| **Đường nét** | Smooth curves, không có góc cạnh sắc. Outline đậm 2-3px |
| **Màu sắc** | Bold, saturated, flat color + 1 bước shadow đơn giản |
| **Shading** | Cel-shading 2-tone (base + shadow), không gradient phức tạp |
| **Biểu cảm** | Mắt to, đơn giản, rõ emotion ngay cả ở size 48-64px |
| **Readability** | Silhouette rõ ràng — nhìn shadow cũng nhận ra nhân vật |

### 1.2 So sánh với các style khác

```
❌ Pixel Art       → Ô vuông rõ ràng, limited palette, nostalgic
❌ Realistic       → Tỉ lệ thực, chi tiết cao, shading phức tạp
❌ Anime           → Tỉ lệ dài, mắt siêu to kiểu manga
✅ Cartoon Chibi   → Tỉ lệ ngắn, đường cong mềm, bold & playful
```

### 1.3 Reference Games

- **Archero**: Hero chibi, enemy đơn giản, màu sắc rực, hiệu ứng sáng
- **Brawl Stars**: Tỉ lệ chibi mạnh, outline đen dày, palette ấm
- **Angry Birds**: Hình dạng đơn giản, biểu cảm cực rõ, vector-clean
- **Among Us**: Chứng minh rằng shape đơn giản + palette tốt = iconic
- **Clash Royale**: Chibi warriors, cel-shade, silhouette cực rõ

---

## 2. Anatomy — Tỉ lệ cơ thể Chibi

### 2.1 Hero Character (64×64px canvas)

```
        ┌──────────┐
        │   HEAD   │  ← 40% height, chiếm gần nửa sprite
        │  ○    ○  │     Tròn hoặc oval, không vuông
        │    ▽     │     Mắt to, miệng nhỏ
        └────┬─────┘
             │
        ┌────┴─────┐
        │   BODY   │  ← 35% height, nhỏ hơn đầu
        │ ┌──┐┌──┐ │     Vai hẹp, thân ngắn
        │ │  ││  │ │     Tay ngắn, đơn giản
        └─┘  └┘  └─┘
          ┌──┐┌──┐
          │  ││  │     ← 25% height, chân ngắn tròn
          └──┘└──┘        Không cần bàn chân chi tiết
```

### 2.2 Quy tắc vàng

1. **Head ≥ Body**: Đầu luôn bằng hoặc lớn hơn thân
2. **No neck**: Đầu nối thẳng vào thân, hoặc cổ rất ngắn
3. **Stubby limbs**: Tay chân ngắn, tròn đầu, không có khớp rõ
4. **Big eyes, small mouth**: Mắt chiếm 30-40% mặt, miệng chỉ là 1 nét
5. **Oversized props**: Vũ khí, mũ, phụ kiện to quá khổ so với thân

### 2.3 Kích thước đề xuất cho EduHero

| Asset | Canvas Size | Display Size | Lý do |
|---|---|---|---|
| Hero | 128×128 | 64×64 | Vẽ @2x rồi scale down → sắc nét |
| Enemy nhỏ | 96×96 | 48×48 | Đủ detail cho slime, bat |
| Enemy lớn/Boss | 160×160 | 72-80×80 | Cần thêm chi tiết |
| Item/Drop | 64×64 | 24-32×32 | Đơn giản, nhận dạng nhanh |
| Projectile | 32×32 | 16-20×20 | Nhỏ, glow effect phụ trợ |
| Obstacle | 96×96 | 48-64×64 | Tương đương enemy size |
| Decoration | 32-64 | 16-32 | Ambient, không cần sắc |

---

## 3. Color Theory — Palette System

### 3.1 Nguyên tắc chung

**Bold + Readable ở mobile size**. Mỗi entity cần palette 4-6 màu:

```
┌─────────────────────────────────────────────────┐
│  BASE        → Màu chính, chiếm 60% diện tích  │
│  SHADOW      → Base tối hơn 20-30%, 25% area    │
│  HIGHLIGHT   → Base sáng hơn 15-20%, 10% area   │
│  ACCENT      → Màu tương phản, điểm nhấn nhỏ    │
│  OUTLINE     → Đậm hơn shadow, hoặc đen mềm     │
│  SKIN/DETAIL → Cho mặt, tay (nếu có)            │
└─────────────────────────────────────────────────┘
```

### 3.2 Cách chọn Shadow/Highlight

**KHÔNG đơn giản là thêm đen/trắng**. Shift hue khi tối/sáng:

```
Shadow  = Base - Brightness(20%) + Hue shift warm(+10°) + Saturation(+10%)
Highlight = Base + Brightness(15%) + Hue shift cool(-5°) + Saturation(-5%)
```

Ví dụ với màu xanh lá:
```
Highlight : #6BCB5F  (sáng hơn, hơi vàng)
Base      : #4CAF50  (green gốc)
Shadow    : #2E7D32  (tối hơn, hơi teal)
Outline   : #1B5E20  (rất tối, gần đen-lá)
```

### 3.3 Palette mẫu cho EduHero

#### Heroes

```
🧊 Frost Knight
   Primary   #4F46E5 → #3730A3 (shadow) → #6366F1 (highlight)
   Armor     #3B82F6 → #1D4ED8 → #60A5FA
   Accent    #EF4444 (cape)
   Skin      #FFCFAA → #F0B088

🔥 Fire Knight
   Primary   #EF4444 → #B91C1C → #F87171
   Armor     #F59E0B → #D97706 → #FBBF24
   Accent    #1E293B (dark trim)
   Skin      #FFCFAA → #F0B088

🌿 Nature Knight
   Primary   #22C55E → #15803D → #4ADE80
   Armor     #84CC16 → #4D7C0F → #A3E635
   Accent    #8B5CF6 (flower/gem)
   Skin      #FFCFAA → #F0B088

🌑 Shadow Knight
   Primary   #6D28D9 → #4C1D95 → #8B5CF6
   Armor     #1E293B → #0F172A → #334155
   Accent    #22D3EE (cyan glow)
   Skin      #E2D5C0 → #C4A882
```

#### Enemies (theo Biome)

```
🏰 Dungeon (Room 1-3)
   Slime     #84CC16 base, #4D7C0F shadow, #D9F99D highlight, #1a1a2e outline
   Skeleton  #E8E0D0 bone, #B8A890 shadow, #F5F0E8 highlight, #4A3728 outline
   Bat       #6D28D9 wing, #4C1D95 shadow, #FFD54F eyes

🌲 Forest (Room 4-6)
   Spider    #1E293B body, #0F172A shadow, #EF4444 eyes, #84CC16 marks
   Mushroom  #DC2626 cap, #991B1B shadow, #FBBF24 spots, #F5F0E8 stem

🌋 Lava (Room 7-9)
   Golem     #B45309 body, #78350F shadow, #F59E0B cracks, #EF4444 core glow
   FireSlime #EF4444 body, #B91C1C shadow, #FDE047 core

👑 Shadow Throne (Room 10)
   Ghost     #93C5FD body(50% alpha), #3B82F6 core, #E0F2FE glow
   DragonWhelp #DC2626 body, #7F1D1D shadow, #FDE047 belly, #F97316 wings
```

### 3.4 Outline Color Tips

**Đừng dùng pure black `#000000`** — quá harsh cho cartoon style.

```
Warm subjects  (fire, skin)  → Dark brown outline  #3D2314
Cool subjects  (ice, ghost)  → Dark navy outline   #1E293B
Green subjects (nature, slime) → Dark green outline #1A3A1A
Generic        → Soft black    #2D2D3D
```

---

## 4. Kỹ thuật vẽ trong Canvas 2D

### 4.1 Smooth Shapes — Building Blocks

Cartoon chibi style chỉ cần **6 primitive shapes** kết hợp:

```javascript
// 1. CIRCLE — Dùng cho: đầu, mắt, joints, items
ctx.arc(x, y, radius, 0, Math.PI * 2);

// 2. ELLIPSE — Dùng cho: thân, shadow, hiệu ứng
ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);

// 3. ROUNDED RECT — Dùng cho: body, limbs, equipment
// Xài helper function:
function roundRect(ctx, x, y, w, h, r) {
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

// 4. BEZIER CURVE — Dùng cho: cánh, đuôi, tóc, shape tự do
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);

// 5. QUADRATIC CURVE — Dùng cho: nét cong đơn giản
ctx.quadraticCurveTo(cpx, cpy, x, y);

// 6. CUSTOM PATH — Kết hợp tất cả cho shape phức tạp
ctx.beginPath();
ctx.moveTo(startX, startY);
// ... mix of lineTo, quadraticCurveTo, bezierCurveTo
ctx.closePath();
```

### 4.2 Layering Order (Painter's Algorithm)

Vẽ từ sau ra trước:

```
Layer 1: Shadow/glow (dưới nhân vật)
Layer 2: Back arm/weapon (cánh tay phía sau)
Layer 3: Body (thân)
Layer 4: Head (đầu — luôn phía trước body)
Layer 5: Front arm/weapon
Layer 6: Face details (mắt, miệng — cuối cùng)
Layer 7: Outline pass (nếu dùng separate outline)
```

### 4.3 Cel-Shading 2-Tone

Kỹ thuật đơn giản nhất cho cartoon look:

```javascript
function drawCelShadedCircle(ctx, x, y, r, baseColor, shadowColor) {
  // 1. Vẽ base shape
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = baseColor;
  ctx.fill();

  // 2. Vẽ shadow (nửa dưới hoặc 1 bên)
  // Dùng clip để shadow không tràn ra ngoài
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.clip();

  // Shadow = ellipse lệch xuống dưới
  ctx.beginPath();
  ctx.ellipse(x, y + r * 0.3, r * 1.1, r * 0.8, 0, 0, Math.PI * 2);
  ctx.fillStyle = shadowColor;
  ctx.fill();
  ctx.restore();

  // 3. Highlight nhỏ (optional)
  ctx.beginPath();
  ctx.ellipse(x - r * 0.25, y - r * 0.25, r * 0.3, r * 0.2, -0.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fill();
}
```

### 4.4 Outline Technique

Có 3 cách tạo outline cho cartoon style:

```javascript
// Cách 1: STROKE — Đơn giản nhất
ctx.beginPath();
ctx.arc(x, y, r, 0, Math.PI * 2);
ctx.fillStyle = baseColor;
ctx.fill();
ctx.strokeStyle = outlineColor;
ctx.lineWidth = 3;
ctx.stroke();

// Cách 2: DRAW TWICE — Outline mềm hơn
// Vẽ shape lớn hơn 2-3px bằng outline color trước
ctx.beginPath();
ctx.arc(x, y, r + 2, 0, Math.PI * 2);
ctx.fillStyle = outlineColor;
ctx.fill();
// Rồi vẽ shape thật bằng base color đè lên
ctx.beginPath();
ctx.arc(x, y, r, 0, Math.PI * 2);
ctx.fillStyle = baseColor;
ctx.fill();

// Cách 3: SHADOW BLUR — Glow outline (tốn performance hơn)
ctx.shadowColor = outlineColor;
ctx.shadowBlur = 3;
ctx.beginPath();
ctx.arc(x, y, r, 0, Math.PI * 2);
ctx.fillStyle = baseColor;
ctx.fill();
ctx.shadowBlur = 0; // Reset
```

**Khuyến nghị cho EduHero**: Dùng **Cách 2 (Draw Twice)** — tạo outline mềm, smooth, performance tốt, và giữ vector-like feel.

### 4.5 Gradient cho Depth (dùng tiết kiệm)

Cartoon style dùng **ít gradient**, nhưng vài chỗ chiến lược rất hiệu quả:

```javascript
// Radial gradient cho items/orbs/gems
var g = ctx.createRadialGradient(x - r*0.3, y - r*0.3, 0, x, y, r);
g.addColorStop(0, highlightColor);  // Sáng ở góc trên-trái
g.addColorStop(0.6, baseColor);     // Base ở giữa
g.addColorStop(1, shadowColor);     // Tối ở rìa
ctx.fillStyle = g;

// Linear gradient cho metallic surfaces (kiếm, khiên)
var g = ctx.createLinearGradient(x, y, x, y + h);
g.addColorStop(0, highlightColor);
g.addColorStop(0.5, baseColor);
g.addColorStop(1, shadowColor);
```

**Quy tắc**: Gradient cho items/gems/effects OK. Character body nên dùng flat cel-shade.

---

## 5. Animation Sprites

### 5.1 Frame Count Guidelines

```
IDLE    : 2-4 frames  @ 4 FPS  → Nhẹ nhàng breathing/bob
WALK    : 4-6 frames  @ 8 FPS  → Bounce walk (lên xuống)
ATTACK  : 3-4 frames  @ 10 FPS → Wind-up, strike, recover
DEATH   : 3-4 frames  @ 6 FPS  → Squash, spin, fade
HURT    : 1-2 frames  @ flash  → Tint đỏ + squash đủ rồi
SPECIAL : 4-6 frames  @ 8 FPS  → Spell cast, transform
```

### 5.2 Squash & Stretch — Nguyên tắc sống còn

Điều khiến cartoon animation sống động:

```
IDLE frame 1:  Normal proportions
IDLE frame 2:  Squash nhẹ (scaleX: 1.03, scaleY: 0.97) ← hít vào
IDLE frame 3:  Stretch nhẹ (scaleX: 0.97, scaleY: 1.03) ← thở ra

WALK frame 1:  Contact  → Squash (chạm đất, nén xuống)
WALK frame 2:  Push off → Normal
WALK frame 3:  Airborne → Stretch lên (nhấc khỏi đất)
WALK frame 4:  Fall     → Normal

ATTACK frame 1: Wind-up  → Lean back, squash
ATTACK frame 2: Strike   → Stretch forward, smear
ATTACK frame 3: Recovery → Bounce back, overshoot
```

### 5.3 Cách vẽ Spritesheet

Mỗi animation = 1 hàng trong spritesheet, mỗi frame cùng kích thước:

```
┌────┬────┬────┬────┐
│idle│idle│idle│idle│  ← Row 0: IDLE (4 frames)
│ 0  │ 1  │ 2  │ 3  │
├────┼────┼────┼────┤
│walk│walk│walk│walk│  ← Row 1: WALK (4 frames)
│ 0  │ 1  │ 2  │ 3  │
├────┼────┼────┼────┤
│ atk│ atk│ atk│    │  ← Row 2: ATTACK (3 frames)
│ 0  │ 1  │ 2  │    │
├────┼────┼────┼────┤
│die │die │die │    │  ← Row 3: DEATH (3 frames)
│ 0  │ 1  │ 2  │    │
└────┴────┴────┴────┘
  128  128  128  128    ← mỗi frame 128×128
```

### 5.4 EduHero Spritesheet Code Pattern

```javascript
function generateSpriteSheet(scene, key, drawFn, params, animDefs, frameSize) {
  var cols = 4; // frames per row
  var rows = animDefs.length;
  var canvas = document.createElement('canvas');
  canvas.width = frameSize * cols;
  canvas.height = frameSize * rows;
  var ctx = canvas.getContext('2d');

  animDefs.forEach(function(anim, row) {
    for (var col = 0; col < anim.frames; col++) {
      ctx.save();
      ctx.translate(col * frameSize, row * frameSize);
      drawFn(ctx, frameSize, params, col, anim.name);
      ctx.restore();
    }
  });

  scene.textures.addSpriteSheet(key, canvas, {
    frameWidth: frameSize, frameHeight: frameSize
  });

  // Register animations
  var frameIndex = 0;
  animDefs.forEach(function(anim) {
    var frames = [];
    for (var i = 0; i < anim.frames; i++) {
      frames.push({ key: key, frame: frameIndex + i });
    }
    scene.anims.create({
      key: key + '_' + anim.name,
      frames: frames,
      frameRate: anim.fps || 6,
      repeat: anim.repeat !== undefined ? anim.repeat : -1,
    });
    frameIndex += anim.frames;
  });
}
```

---

## 6. Thiết kế từng loại Asset

### 6.1 Heroes — Cấu trúc chung

Tất cả hero dùng chung skeleton, khác nhau ở:
- Màu sắc (palette swap)
- Armor shape (vai, mũ, giáp)
- Weapon (kiếm, cung, staff, daggers)
- Accent particles (tuyết, lửa, lá, khói)

```javascript
function drawHero(ctx, size, palette, frame, animState) {
  var cx = size / 2, cy = size / 2;
  var headR = size * 0.22;   // Đầu to
  var bodyW = size * 0.28;   // Thân hẹp hơn đầu
  var bodyH = size * 0.18;
  var legH  = size * 0.12;
  var armW  = size * 0.08;

  // Squash/stretch theo animState
  var sx = 1, sy = 1;
  if (animState === 'idle') {
    sy = 1 + Math.sin(frame * Math.PI / 2) * 0.03;
    sx = 1 - Math.sin(frame * Math.PI / 2) * 0.02;
  }

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(sx, sy);
  ctx.translate(-cx, -cy);

  // Layer 1: Shadow on ground
  drawShadow(ctx, cx, cy + size * 0.38, size * 0.25);

  // Layer 2: Legs
  drawLegs(ctx, cx, cy + bodyH/2, legH, palette, frame, animState);

  // Layer 3: Body
  drawBody(ctx, cx, cy - size*0.05, bodyW, bodyH, palette);

  // Layer 4: Arms
  drawArms(ctx, cx, cy - size*0.02, armW, palette, frame, animState);

  // Layer 5: Head
  drawHead(ctx, cx, cy - size*0.2, headR, palette);

  // Layer 6: Face
  drawFace(ctx, cx, cy - size*0.2, headR, palette, animState);

  // Layer 7: Weapon
  drawWeapon(ctx, cx, cy, size, palette, frame, animState);

  ctx.restore();
}
```

### 6.2 Enemies — Design Principles

Mỗi enemy cần trả lời được 3 câu:

1. **Silhouette gì?** → Nhìn shadow đen biết ngay (tròn=slime, cánh=bat, nấm=mushroom)
2. **Danger signal gì?** → Màu/hình cho thấy nguy hiểm (đỏ=fire, nhọn=spike, lớn=strong)
3. **Behavior gợi ý gì?** → Shape hint cách di chuyển (tròn=lăn, cánh=bay, chân=chạy)

```
SLIME     → Blob tròn, mắt đơn giản, jelly bounce
            Shape: Circle + squash animation
            Signal: Xanh lá (yếu), đỏ/tím (mạnh hơn)

SKELETON  → Đầu lâu + xương, giòn nhưng nhanh
            Shape: Circle head + thin rect limbs
            Signal: Trắng xương, vũ khí nhỏ

SPIDER    → Thân tròn, 4 chân (đơn giản hoá từ 8)
            Shape: Ellipse body + arc legs
            Signal: Đen + mắt đỏ = creepy

BAT       → Cánh rộng, thân nhỏ, bay lượn
            Shape: Triangle wings + small circle body
            Signal: Tím + mắt vàng phát sáng

MUSHROOM  → Mũ nấm to, thân ngắn, đứng yên bắn
            Shape: Semi-circle cap + small rect stem
            Signal: Đỏ + chấm trắng (poison)

GOLEM     → Khối lớn, chậm, mạnh
            Shape: Big rounded rect, no neck
            Signal: Cam/nâu + vết nứt phát sáng

GHOST     → Bán trong suốt, lơ lửng
            Shape: Teardrop/flame shape, no legs
            Signal: Xanh nhạt + alpha thấp + glow
```

### 6.3 Items & Drops

Nguyên tắc: **Nhận dạng trong 0.1 giây** ở kích thước 24px.

```
COIN      → Hình tròn vàng, "C" hoặc star chính giữa
            Palette: #FFD54F base, #F59E0B shadow, #FFF9C4 highlight
            Trick: radial gradient tạo depth ngay

GEM       → Hình thoi/lục giác, facet highlights
            Palette: Cyan #22D3EE hoặc theo biome
            Trick: 2-3 tam giác lệch nhau tạo facet

HP POTION → Chai tròn, chất lỏng đỏ, nút chai
            Palette: #EF4444 liquid, #FCA5A5 highlight, #7F1D1D outline
            Trick: Wave line chia liquid/air trong chai

SHIELD    → Hình tròn xanh dương, viền sáng
            Palette: #3B82F6 base, #93C5FD glow
            Trick: Alpha glow circle phía ngoài

MAGNET    → Hình U đỏ/xám classic
            Palette: #EF4444 + #6B7280
            Trick: Đơn giản nhất, ai cũng nhận ra

KEY       → Vàng, đầu tròn, răng vuông
            Palette: #FFD54F + #B45309
            Trick: Shape đặc trưng, dễ vẽ
```

### 6.4 Projectiles

Phải **nổi bật trên mọi background** và gợi ý thuộc tính:

```
ICE SHARD     → Tam giác dài xanh nhạt + trail particles
                Core: #93C5FD, Glow: #DBEAFE @ alpha 0.4
                Đặc trưng: Nhọn, angular

FIREBALL      → Tròn cam + trail flame
                Core: #FDE047, Mid: #F59E0B, Outer: #EF4444
                Đặc trưng: Radial gradient 3 lớp, edge flickering

LEAF BLADE    → Ellipse xanh lá, xoay (rotate animation)
                Core: #4ADE80, Edge: #15803D
                Đặc trưng: Spin rotation per frame

DARK ORB      → Tròn tím, pulse glow
                Core: #7C3AED, Glow: #A78BFA @ alpha 0.3
                Đặc trưng: Size oscillation

POISON BOLT   → Tròn xanh lá đậm, drip effect
                Core: #84CC16, Glow: #D9F99D
                Đặc trưng: Trailing droplets
```

### 6.5 Environment Tiles

#### Floor Tiles (64×64)

```
DUNGEON    → Stone gray, mortar lines, subtle cracks
             Base: #2A2E3A, Line: #1E2130, Variation: random crack decals

FOREST     → Dirt brown with grass tufts
             Base: #5D4E37, Grass: #4ADE80 small arcs, Variation: leaf spots

LAVA       → Dark obsidian with glowing cracks
             Base: #1C1917, Cracks: #EF4444 with glow, Variation: ember spots

SHADOW     → Dark purple crystal
             Base: #1E1338, Veins: #7C3AED @ alpha 0.2, Variation: shimmer
```

#### Wall Tiles (64×48)

```
DUNGEON    → Brick pattern, moss patches
FOREST     → Root/vine tangle, bark texture
LAVA       → Basalt columns, lava seams
SHADOW     → Crystal formation, runic marks
```

### 6.6 Obstacles

```
PILLAR     → 48×48, stone column, top cap
             Blocks movement & projectiles
             Vẽ: Rounded rect + ellipse cap + shadow

BARREL     → 48×48, wooden slats, metal bands
             Destructible, 2-3 hits, drops loot
             Vẽ: Ellipse top + rect body + horizontal lines

SPIKE TRAP → 48×48, metallic points on stone base
             Damage zone, blinks before activating
             Vẽ: Triangle points + rect base + warning glow

FOUNTAIN   → 48×64, stone basin, blue water glow
             Heal station, 1 use per room
             Vẽ: Trapezoid basin + ellipse water + particle sparkle

CRATE      → 48×48, wooden box, "X" nails
             Pushable, blocks movement
             Vẽ: Rounded rect + cross lines + shadow
```

### 6.7 Decorations (Non-interactive)

```
TORCH      → Wall mount, animated flame (3 frames)
             Orange glow circle underneath
             Placement: On walls, every 3-4 tiles

MUSHROOM   → Small glowing mushroom cluster
(ambient)    Green/blue glow, 2 sizes mixed
             Placement: Floor corners, near walls

BONES      → Scattered skull + femur
             White-gray, random rotation
             Placement: Floor, sparse

CRYSTAL    → Growing crystal formation
             Purple/blue, alpha shimmer
             Placement: Walls and corners

LAVA POOL  → Small bubbling lava puddle
             Orange-red, bubble animation
             Placement: Floor (lava biome only)

COBWEB     → Corner web, gray-white
             Static, alpha 0.3-0.5
             Placement: Wall-wall corners
```

---

## 7. Vẽ trong Canvas — Pattern Templates

### 7.1 Template: Simple Enemy (Slime)

```javascript
function drawSlime(ctx, size, palette, frame, anim) {
  var cx = size / 2, cy = size / 2;
  var r = size * 0.32;
  var outline = '#1a3a1a';
  var base = '#84CC16';
  var shadow = '#4D7C0F';
  var highlight = '#D9F99D';
  var eyeColor = '#1a1a2e';

  // Squash/stretch
  var squash = 1 + Math.sin(frame * Math.PI / 2) * 0.08;
  var stretch = 1 - Math.sin(frame * Math.PI / 2) * 0.05;

  ctx.save();
  ctx.translate(cx, cy + r * 0.2); // anchor bottom

  // Ground shadow
  ctx.beginPath();
  ctx.ellipse(0, r * 0.9, r * 0.7 * squash, r * 0.15, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fill();

  // Body outline (draw bigger first)
  ctx.beginPath();
  ctx.ellipse(0, 0, r * squash + 2, r * stretch + 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = outline;
  ctx.fill();

  // Body base
  ctx.beginPath();
  ctx.ellipse(0, 0, r * squash, r * stretch, 0, 0, Math.PI * 2);
  ctx.fillStyle = base;
  ctx.fill();

  // Shadow (lower half)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, 0, r * squash, r * stretch, 0, 0, Math.PI * 2);
  ctx.clip();
  ctx.beginPath();
  ctx.ellipse(0, r * 0.3, r * squash * 1.1, r * stretch * 0.7, 0, 0, Math.PI * 2);
  ctx.fillStyle = shadow;
  ctx.fill();
  ctx.restore();

  // Highlight
  ctx.beginPath();
  ctx.ellipse(-r * 0.2, -r * 0.3, r * 0.25, r * 0.15, -0.3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fill();

  // Eyes
  var eyeSpacing = r * 0.25;
  var eyeY = -r * 0.1;
  var eyeR = r * 0.12;
  // Left eye
  ctx.beginPath();
  ctx.arc(-eyeSpacing, eyeY, eyeR, 0, Math.PI * 2);
  ctx.fillStyle = eyeColor;
  ctx.fill();
  // Right eye
  ctx.beginPath();
  ctx.arc(eyeSpacing, eyeY, eyeR, 0, Math.PI * 2);
  ctx.fillStyle = eyeColor;
  ctx.fill();
  // Eye highlights
  ctx.beginPath();
  ctx.arc(-eyeSpacing + 2, eyeY - 2, eyeR * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(eyeSpacing + 2, eyeY - 2, eyeR * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // Mouth
  ctx.beginPath();
  ctx.arc(0, r * 0.15, r * 0.12, 0.1, Math.PI - 0.1);
  ctx.strokeStyle = outline;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();
}
```

### 7.2 Template: Item (Gem)

```javascript
function drawGem(ctx, size) {
  var cx = size / 2, cy = size / 2;
  var s = size * 0.35;

  // Glow behind
  ctx.beginPath();
  ctx.arc(cx, cy, s * 1.2, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(34,211,238,0.15)';
  ctx.fill();

  // Diamond shape with facets
  ctx.beginPath();
  ctx.moveTo(cx, cy - s);       // Top
  ctx.lineTo(cx + s * 0.7, cy); // Right
  ctx.lineTo(cx, cy + s);       // Bottom
  ctx.lineTo(cx - s * 0.7, cy); // Left
  ctx.closePath();

  // Outline
  ctx.fillStyle = '#0E7490';
  ctx.fill();

  // Inner facet (lighter)
  ctx.beginPath();
  ctx.moveTo(cx, cy - s + 3);
  ctx.lineTo(cx + s * 0.7 - 3, cy);
  ctx.lineTo(cx, cy + s - 3);
  ctx.lineTo(cx - s * 0.7 + 3, cy);
  ctx.closePath();
  ctx.fillStyle = '#22D3EE';
  ctx.fill();

  // Highlight facet (top-left triangle)
  ctx.beginPath();
  ctx.moveTo(cx, cy - s + 4);
  ctx.lineTo(cx - s * 0.7 + 4, cy);
  ctx.lineTo(cx, cy);
  ctx.closePath();
  ctx.fillStyle = '#67E8F9';
  ctx.fill();

  // Sparkle
  ctx.beginPath();
  ctx.arc(cx - s * 0.15, cy - s * 0.3, 2, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
}
```

### 7.3 Template: Environment Tile

```javascript
function drawDungeonFloor(ctx, size) {
  // Base stone color
  ctx.fillStyle = '#2A2E3A';
  ctx.fillRect(0, 0, size, size);

  // Stone pattern (2×2 blocks with mortar lines)
  ctx.strokeStyle = '#1E2130';
  ctx.lineWidth = 1;
  var half = size / 2;

  // Horizontal mortar
  ctx.beginPath();
  ctx.moveTo(0, half);
  ctx.lineTo(size, half);
  ctx.stroke();

  // Vertical mortar (offset per row for brick pattern)
  ctx.beginPath();
  ctx.moveTo(half, 0);
  ctx.lineTo(half, half);
  ctx.moveTo(0, half);
  ctx.moveTo(size * 0.25, half);
  ctx.lineTo(size * 0.25, size);
  ctx.moveTo(size * 0.75, half);
  ctx.lineTo(size * 0.75, size);
  ctx.stroke();

  // Random subtle crack (30% chance)
  if (Math.random() < 0.3) {
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    var sx = Math.random() * size, sy = Math.random() * size;
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + (Math.random() - 0.5) * 20, sy + Math.random() * 15);
    ctx.lineTo(sx + (Math.random() - 0.5) * 25, sy + Math.random() * 25);
    ctx.stroke();
  }

  // Random moss patch (20% chance)
  if (Math.random() < 0.2) {
    ctx.fillStyle = 'rgba(74,222,128,0.08)';
    ctx.beginPath();
    ctx.arc(Math.random() * size, Math.random() * size, 4 + Math.random() * 6, 0, Math.PI * 2);
    ctx.fill();
  }
}
```

---

## 8. Performance & Optimization

### 8.1 Spritesheet là King

```
❌ Vẽ real-time mỗi frame      → 60 draw calls/sec/entity
✅ Pre-render vào spritesheet   → 1 draw call/sec/entity (GPU cached)
```

Luôn vẽ vào canvas offline → addSpriteSheet → dùng sprite. **Không bao giờ** vẽ Canvas2D trực tiếp trong game loop.

### 8.2 Atlas Packing

Gom tất cả small textures vào 1 atlas lớn giảm GPU texture switches:

```javascript
// Thay vì 20 textures nhỏ riêng lẻ:
scene.textures.addImage('coin', coinCanvas);
scene.textures.addImage('gem', gemCanvas);
// ...

// Gom vào 1 atlas:
var atlas = document.createElement('canvas');
atlas.width = 512; atlas.height = 512;
var ctx = atlas.getContext('2d');
// Vẽ tất cả items vào atlas ở các vị trí khác nhau
// Rồi dùng atlas + frame coordinates
```

### 8.3 Mipmap Mental Model

Vẽ ở **2× display size** rồi let Phaser scale down:
- Canvas 128×128 → display 64×64 = sharp, smooth edges
- Đặc biệt quan trọng cho cartoon style vì đường cong cần anti-aliasing

### 8.4 Color Tint cho Variants

Thay vì vẽ 5 loại slime khác nhau, vẽ 1 lần rồi tint:

```javascript
// 1 spritesheet gốc "slime_green"
// Runtime:
enemy.setTint(0xff4444); // Red slime
enemy.setTint(0x8b5cf6); // Purple slime
enemy.setTint(0x3b82f6); // Blue slime
```

Tiết kiệm asset nhưng vẫn diverse. Kết hợp với size scaling cho boss variants.

---

## 9. Checklist cho EduHero Assets

### Phase 1 — Core (Đang có, cần nâng cấp)

- [ ] Hero 4 skins: Thêm cel-shade shadow layer
- [ ] Hero projectile: 4 variants match hero color
- [ ] Slime: Thêm squash/stretch animation mượt hơn
- [ ] Bat: Thêm wing flap animation
- [ ] Mushroom: Thêm spore puff khi shoot

### Phase 2 — Biomes (Impact cao nhất)

- [ ] 4 bộ floor tile (dungeon/forest/lava/shadow)
- [ ] 4 bộ wall tile matching
- [ ] Biome decorations (torch, mushroom glow, lava pool, crystal)
- [ ] Biome transition effect (room flash + color shift)

### Phase 3 — Enemy Expansion

- [ ] Skeleton: Walk + attack anim, bone throw projectile
- [ ] Spider: Crawl anim, web slow projectile
- [ ] Golem: Slow walk, ground slam AoE visual
- [ ] Ghost: Float + phase anim, transparency
- [ ] Dragon Whelp: Fly + fire breath cone

### Phase 4 — Items & Obstacles

- [ ] 3 obstacles: Pillar, Barrel (destructible), Spike Trap
- [ ] 3 new drops: Magnet, Shield Orb, Speed Boots
- [ ] Healing Fountain (room furniture)
- [ ] Treasure Chest (bonus loot, locked/unlocked state)

### Phase 5 — Polish

- [ ] Death animations cho mỗi enemy (squash, dissolve, explode)
- [ ] Upgrade icons (13 upgrades × 32×32 icon mỗi cái)
- [ ] UI elements: Button states, panel backgrounds
- [ ] Victory/defeat screen art

---

## 10. Tools & Resources

### Vẽ & Design

| Tool | Dùng cho | Free? |
|---|---|---|
| **Figma** | Vector design, palette test | ✅ Free tier |
| **Aseprite** | Sprite animation preview | 💰 $20 |
| **Piskel** | Quick sprite test | ✅ Free |
| **Lospec Palette** | Tìm palette đẹp | ✅ Free |
| **Coolors.co** | Generate color schemes | ✅ Free |
| **ShaderToy** | Test glow/particle effects | ✅ Free |

### Color Palette Resources

- **Lospec**: lospec.com/palette-list — filter "16 colors", "warm", "fantasy"
- **Color Hunt**: colorhunt.co — curated 4-color palettes
- **Coolors**: coolors.co — random generator, lock colors you like
- **Adobe Color**: color.adobe.com — color wheel, harmony rules

### Reference Art

- Search: "chibi game sprites", "cute RPG characters", "mobile game art style"
- ArtStation: filter "stylized", "mobile game", "2D"
- Pinterest boards: "cute game art", "chibi character design"

---

*Tài liệu này là style guide cho dự án EduHero — Cartoon Chibi Vector 2D.*
*Cập nhật theo tiến độ Sprint.*
