# Kế hoạch tạo Hero Assets — EduHero

> Dựa trên `eduhero-art-style-guide.md`
> Style: Cartoon Chibi · Smooth Vector 2D · Canvas 128×128 → display 64×64

---

## 1. Tổng quan 4 Heroes

Tất cả hero dùng **chung skeleton** (cùng tỉ lệ cơ thể chibi 2.5-3 head ratio), khác nhau ở palette, armor, weapon, và accent particles.

| # | Hero | Element | Weapon | Accent Particles |
|---|------|---------|--------|-----------------|
| 1 | Frost Knight | Ice | Sword | Tuyết, tinh thể băng |
| 2 | Fire Knight | Fire | Sword | Lửa, tàn lửa |
| 3 | Nature Knight | Nature | Staff | Lá, bào tử xanh |
| 4 | Shadow Knight | Dark | Daggers | Khói tím, tia sáng cyan |

---

## 2. Palette chi tiết từng Hero

### 2.1 Frost Knight 🧊

| Thành phần | Base | Shadow | Highlight |
|---|---|---|---|
| Primary (armor chính) | `#4F46E5` | `#3730A3` | `#6366F1` |
| Secondary (armor phụ) | `#3B82F6` | `#1D4ED8` | `#60A5FA` |
| Accent (cape) | `#EF4444` | — | — |
| Skin | `#FFCFAA` | `#F0B088` | — |
| Outline | `#1E293B` (dark navy) | — | — |

### 2.2 Fire Knight 🔥

| Thành phần | Base | Shadow | Highlight |
|---|---|---|---|
| Primary (armor chính) | `#EF4444` | `#B91C1C` | `#F87171` |
| Secondary (armor phụ) | `#F59E0B` | `#D97706` | `#FBBF24` |
| Accent (dark trim) | `#1E293B` | — | — |
| Skin | `#FFCFAA` | `#F0B088` | — |
| Outline | `#3D2314` (dark brown, warm subject) | — | — |

### 2.3 Nature Knight 🌿

| Thành phần | Base | Shadow | Highlight |
|---|---|---|---|
| Primary (armor chính) | `#22C55E` | `#15803D` | `#4ADE80` |
| Secondary (armor phụ) | `#84CC16` | `#4D7C0F` | `#A3E635` |
| Accent (flower/gem) | `#8B5CF6` | — | — |
| Skin | `#FFCFAA` | `#F0B088` | — |
| Outline | `#1A3A1A` (dark green) | — | — |

### 2.4 Shadow Knight 🌑

| Thành phần | Base | Shadow | Highlight |
|---|---|---|---|
| Primary (armor chính) | `#6D28D9` | `#4C1D95` | `#8B5CF6` |
| Secondary (armor phụ) | `#1E293B` | `#0F172A` | `#334155` |
| Accent (cyan glow) | `#22D3EE` | — | — |
| Skin | `#E2D5C0` | `#C4A882` | — |
| Outline | `#1E293B` (dark navy) | — | — |

---

## 3. Cấu trúc cơ thể Hero (Skeleton chung)

Theo guide, canvas 128×128 (vẽ @2x, display 64×64):

```
Tỉ lệ phân bổ chiều cao:
- Head:  40% height → headR = size * 0.22
- Body:  35% height → bodyW = size * 0.28, bodyH = size * 0.18
- Legs:  25% height → legH = size * 0.12
- Arms:  armW = size * 0.08
```

### Quy tắc vàng:
1. **Head >= Body** — Đầu luôn bằng hoặc lớn hơn thân
2. **No neck** — Đầu nối thẳng vào thân
3. **Stubby limbs** — Tay chân ngắn, tròn đầu, không có khớp rõ
4. **Big eyes, small mouth** — Mắt chiếm 30-40% mặt
5. **Oversized props** — Vũ khí to quá khổ so với thân

### Layer order (vẽ từ sau ra trước):
1. Shadow on ground
2. Legs
3. Body (armor)
4. Back arm
5. Head (helmet)
6. Face (eyes, mouth)
7. Front arm + Weapon

---

## 4. Animations cần tạo

Mỗi hero cần **6 animation states**, tổng cộng **17-25 frames/hero**:

| Animation | Frames | FPS | Mô tả | Kỹ thuật |
|---|---|---|---|---|
| **IDLE** | 4 | 4 | Nhẹ nhàng breathing/bob | Squash: `scaleX:1.03, scaleY:0.97` ↔ Stretch: `scaleX:0.97, scaleY:1.03` |
| **WALK** | 4 | 8 | Bounce walk lên xuống | Contact→Squash, Push off→Normal, Airborne→Stretch, Fall→Normal |
| **ATTACK** | 3 | 10 | Wind-up, strike, recover | Lean back→Stretch forward (smear)→Bounce back (overshoot) |
| **HURT** | 2 | flash | Tint đỏ + squash | Flash tint `#EF4444` + squash nhanh |
| **DEATH** | 3 | 6 | Squash, spin, fade | Squash mạnh → spin → alpha fade to 0 |
| **SPECIAL** | 4 | 8 | Spell cast / power up | Wind-up glow → release particles → recover |

### Spritesheet layout mỗi hero:

```
┌────┬────┬────┬────┐
│idle│idle│idle│idle│  Row 0: IDLE (4 frames)
├────┼────┼────┼────┤
│walk│walk│walk│walk│  Row 1: WALK (4 frames)
├────┼────┼────┼────┤
│ atk│ atk│ atk│    │  Row 2: ATTACK (3 frames)
├────┼────┼────┼────┤
│hurt│hurt│    │    │  Row 3: HURT (2 frames)
├────┼────┼────┼────┤
│die │die │die │    │  Row 4: DEATH (3 frames)
├────┼────┼────┼────┤
│spc │spc │spc │spc │  Row 5: SPECIAL (4 frames)
└────┴────┴────┴────┘
  128  128  128  128   → Spritesheet: 512×768 per hero
```

---

## 5. Hero Projectiles (4 variants)

Mỗi hero có 1 projectile riêng, canvas 32×32, display 16-20px:

| Hero | Projectile | Shape | Palette | Đặc trưng |
|---|---|---|---|---|
| Frost Knight | Ice Shard | Tam giác dài | Core: `#93C5FD`, Glow: `#DBEAFE` @0.4 | Nhọn, angular, trail particles |
| Fire Knight | Fireball | Tròn | Core: `#FDE047`, Mid: `#F59E0B`, Outer: `#EF4444` | Radial gradient 3 lớp, edge flicker |
| Nature Knight | Leaf Blade | Ellipse | Core: `#4ADE80`, Edge: `#15803D` | Spin rotation per frame |
| Shadow Knight | Dark Orb | Tròn | Core: `#7C3AED`, Glow: `#A78BFA` @0.3 | Size oscillation, pulse glow |

---

## 6. Kỹ thuật vẽ áp dụng

### 6.1 Outline: Draw Twice (khuyến nghị từ guide)
- Vẽ shape lớn hơn 2-3px bằng outline color trước
- Vẽ shape thật bằng base color đè lên
- Tạo outline mềm, smooth, performance tốt

### 6.2 Shading: Cel-Shading 2-Tone
- Mỗi part: base color + shadow (nửa dưới / 1 bên)
- Shadow = Base - Brightness(20%) + Hue shift warm(+10°) + Saturation(+10%)
- Highlight nhỏ = `rgba(255,255,255,0.25)` ellipse góc trên-trái

### 6.3 Outline Colors (không dùng pure black)
- Frost/Shadow Knight: `#1E293B` (dark navy)
- Fire Knight: `#3D2314` (dark brown)
- Nature Knight: `#1A3A1A` (dark green)

### 6.4 Performance
- Pre-render vào spritesheet offline, không vẽ real-time trong game loop
- Vẽ @2x (128px) rồi display @1x (64px) → smooth edges
- Dùng `setTint()` cho color variants thay vì vẽ lại

---

## 7. Danh sách file cần tạo

### 7.1 Source code (Canvas 2D drawing functions)

```
src/assets/
├── heroes/
│   ├── hero-base.js          # Skeleton chung: drawHead, drawBody, drawLegs, drawArms, drawFace
│   ├── hero-frost-knight.js   # Palette + armor shape + weapon riêng Frost
│   ├── hero-fire-knight.js    # Palette + armor shape + weapon riêng Fire
│   ├── hero-nature-knight.js  # Palette + armor shape + weapon riêng Nature
│   ├── hero-shadow-knight.js  # Palette + armor shape + weapon riêng Shadow
│   └── hero-spritesheet.js    # generateSpriteSheet() cho tất cả heroes
├── projectiles/
│   ├── projectile-ice-shard.js
│   ├── projectile-fireball.js
│   ├── projectile-leaf-blade.js
│   └── projectile-dark-orb.js
└── index.js                   # Export all asset generators
```

### 7.2 Các function chính cần implement

| Function | File | Mô tả |
|---|---|---|
| `drawShadow(ctx, x, y, r)` | hero-base.js | Ellipse shadow dưới chân |
| `drawHead(ctx, x, y, r, palette)` | hero-base.js | Đầu tròn + helmet shape |
| `drawBody(ctx, x, y, w, h, palette)` | hero-base.js | Thân + armor |
| `drawLegs(ctx, x, y, h, palette, frame, anim)` | hero-base.js | Chân ngắn tròn + walk animation |
| `drawArms(ctx, x, y, w, palette, frame, anim)` | hero-base.js | Tay ngắn + attack animation |
| `drawFace(ctx, x, y, r, palette, anim)` | hero-base.js | Mắt to + miệng nhỏ + biểu cảm |
| `drawWeapon(ctx, x, y, size, palette, frame, anim)` | mỗi hero file | Vũ khí riêng từng hero |
| `drawHero(ctx, size, palette, frame, animState)` | mỗi hero file | Kết hợp tất cả layers |
| `generateHeroSpriteSheet(scene, key, heroType)` | hero-spritesheet.js | Tạo spritesheet 512×768 |

---

## 8. Thứ tự thực hiện (Priority)

### Step 1: Hero Base Skeleton
- Tạo `hero-base.js` với tất cả shared drawing functions
- Test với 1 hero (Frost Knight) trước
- Đảm bảo silhouette rõ ràng ở size 64×64

### Step 2: Frost Knight (Hero đầu tiên)
- Apply palette Frost Knight vào skeleton
- Vẽ armor shape: vai angular, helmet có visor
- Vẽ weapon: Sword (oversized)
- Tạo 4 animation states cơ bản: idle, walk, attack, death

### Step 3: Palette swap 3 Heroes còn lại
- Fire Knight: armor rounded, flame accents, sword
- Nature Knight: armor organic, vine details, staff
- Shadow Knight: armor sleek, dark, dual daggers
- Mỗi hero có armor shape và weapon riêng

### Step 4: Hero Projectiles
- 4 projectiles với shape và animation riêng
- Ice Shard, Fireball, Leaf Blade, Dark Orb
- Canvas 32×32, mỗi cái 2-3 animation frames

### Step 5: Spritesheet Generation
- `generateSpriteSheet()` function
- Output: 512×768 spritesheet per hero (6 rows × 4 cols × 128px)
- Register Phaser animations tự động

### Step 6: Polish
- Thêm HURT và SPECIAL animations
- Fine-tune squash/stretch values
- Thêm accent particles per hero
- Test readability ở mobile size

---

## 9. Metrics & Kiểm tra chất lượng

Mỗi hero asset cần pass các tiêu chí:

- [ ] **Silhouette test**: Tô đen toàn bộ sprite → vẫn nhận ra là hero
- [ ] **Size test**: Display ở 64×64 → vẫn đọc được chi tiết chính
- [ ] **48px test**: Scale xuống 48px → vẫn phân biệt được 4 heroes
- [ ] **Animation test**: Idle smooth, walk có bounce, attack có impact feel
- [ ] **Color test**: 4 heroes đặt cạnh nhau → palette khác biệt rõ ràng
- [ ] **Performance test**: Spritesheet pre-render, không vẽ real-time trong game loop
