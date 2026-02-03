# 🎨 EduHero — Asset Design Plan

> **Mục đích:** Danh sách chi tiết toàn bộ asset đồ họa cần thiết kế cho game EduHero
> **Phong cách:** Chibi 2D vector-style, tươi sáng, mượt mà — tham khảo Archero, Angry Birds
> **KHÔNG phải pixel art** — Sử dụng đường nét mềm mại, tô bóng gradient, màu sắc rực rỡ
> **Công cụ sinh:** Claude Code + SVG/Canvas rendering → export PNG sprite sheets
> **Ngày tạo:** 03/02/2026

---

## 📐 Quy chuẩn thiết kế chung (Design Guidelines)

### Phong cách đồ họa
- **Art style:** Chibi 2D, đường viền (outline) đậm **3-3.5px** (#1A1A1A), bo tròn mọi góc cạnh
- **Tô bóng:** Gradient mềm mại 2-3 tone (base + shadow + highlight), không flat
- **Màu sắc:** Palette tươi sáng, bão hòa cao, tương phản rõ ràng (xem `src/constants/palette.js`)
- **Tỉ lệ chibi:** Đầu to : thân nhỏ = **2.5:1** (đầu chiếm ~65% sprite), đầu hơi vuông (rounded rect)
- **Mắt:** To, đơn giản, nâu đậm/đen với 1 highlight trắng nhỏ — **KHÔNG long lanh anime**, **KHÔNG nhìn thẳng người chơi** (kiểu Cookie Run)
- **Miệng:** Đơn giản cute, cười há có răng trắng — **KHÔNG son đỏ**, **KHÔNG lưỡi**
- **Blush:** Chấm hồng elip trên má (#F48FB1, opacity 0.5)
- **Cảm giác:** Dễ thương, thân thiện trẻ em 7-15 tuổi, không đáng sợ
- **Tham khảo:** Archero (gameplay sprites), **Chibi monk/chú tiểu** (character style), Cookie Run (mắt đơn giản, UI/UX)

### Thông số kỹ thuật
- **Render size chuẩn:** 128×128px (export 64×64px cho game, giữ 128px để scale)
- **Format:** PNG 32-bit (transparent background)
- **Sprite sheet:** TexturePacker JSON Array format
- **Naming convention:** `category_name_variant_state_frame.png`

---

## 1. 🦸 HERO — Trạng Tí

### 1.1 Base Character Design

| Asset | Mô tả chi tiết | Size | Ghi chú |
|---|---|---|---|
| **Concept chính** | Bé trai Việt Nam chibi kiểu **chibi monk**: đầu to **hơi vuông** (rounded rect, không tròn hoàn toàn), tỉ lệ đầu:thân ≈ 2.5:1. **Tóc đen kiểu "quả đào"** (tuft hình trái tim lệch trên đỉnh đầu, giống chú tiểu). **Mắt to đen/nâu đậm đơn giản** (1 highlight trắng nhỏ, KHÔNG long lanh anime, KHÔNG nhìn thẳng người chơi — kiểu Cookie Run). **Miệng há cười** có răng trắng, khoang miệng đỏ sẫm, KHÔNG có lưỡi, KHÔNG son đỏ. **Chấm hồng trên má** (blush). Tai tròn nhỏ 2 bên. Da tone vàng ấm #FFCC80. Đường viền đen đậm 3-3.5px (#1A1A1A) toàn bộ. Ở trần, mặc quần đùi nâu #795548. Chân đi chân đất. Tay chân ngắn tròn cute | 128×128px | Nhân vật trung tâm — ✅ **Đã hoàn thiện Sprint 0** |

### 1.2 Hero Sprite Sheets

| Sprite Sheet | Frames | Hướng | Mô tả animation | Ưu tiên |
|---|---|---|---|---|
| `hero_idle` | 4 frames | 1 hướng (front) | Đứng yên, thở nhẹ (thân lên xuống ~2px), chỏm tóc lay nhẹ, mắt chớp 1 lần ở frame 3 | ✅ Done |
| `hero_run_down` | 6 frames | Xuống (mặt trước) | Chạy về phía camera, chân luân phiên, tay đung đưa, tóc bay ngược | ⭐ P0 |
| `hero_run_up` | 6 frames | Lên (mặt sau) | Chạy đi ra xa camera, thấy lưng, quần đùi, gáy tóc | ⭐ P0 |
| `hero_run_left` | 6 frames | Trái | Chạy sang trái, thấy profile, tóc bay phải | ⭐ P0 |
| `hero_run_right` | 6 frames | Phải | Mirror của run_left | ⭐ P0 |
| `hero_attack_melee` | 4 frames | Front | Tay phải vung kiếm từ trên xuống chéo, thân xoay nhẹ, biểu cảm nghiêm túc | ⭐ P0 |
| `hero_attack_ranged` | 4 frames | Front | Hai tay giương cung/nỏ, kéo dây, thả → tay đẩy về trước | ⭐ P0 |
| `hero_attack_magic` | 4 frames | Front | Hai tay giơ sách lên, sách mở ra phát sáng, vòng phép hiện dưới chân | ⭐ P0 |
| `hero_hit` | 2 frames | Front | Thân nghiêng ra sau, mắt nhắm đau, nhấp nháy đỏ (tint overlay) | ⭐ P0 |
| `hero_death` | 4 frames | Front | Ngã xuống dần, frame cuối nằm im, hiệu ứng "hồn" bay lên (vòng tròn trắng nhỏ) | P1 |
| `hero_quiz` | 2 frames | Front | Ngồi xếp bằng, tay cầm sách mở, biểu cảm tập trung nghiêm túc dễ thương | P1 |
| `hero_victory` | 4 frames | Front | Nhảy lên cao, hai tay giơ lên vui sướng, mắt cười híp, hiệu ứng sparkle | P1 |

### 1.3 Hero Biểu cảm (dùng cho UI portraits) — ✅ Đã hoàn thành Sprint 0

| Asset | Mô tả | Size | Dùng ở | Status |
|---|---|---|---|---|
| `hero_face_happy` | Miệng há cười to (răng trắng, khoang đỏ sẫm, không lưỡi), mắt nâu to, blush hồng | 64×64px | Menu, Victory | ✅ |
| `hero_face_serious` | Mắt nhìn thẳng nghiêm túc, miệng mím (line ngang) | 64×64px | Combat HUD | ✅ |
| `hero_face_hurt` | Mắt nhắm (đường cong xuống), miệng méo (curve ngược) | 64×64px | HP thấp | ✅ |
| `hero_face_thinking` | Mắt nhìn lên (highlight dời lên), miệng nhỏ cười nhẹ | 64×64px | Quiz mode | ✅ |
| `hero_face_celebrate` | Miệng há cười to (giống happy), mắt nâu to sáng, blush hồng | 64×64px | Quiz đúng, Level up | ✅ |

---

## 2. 🗡️ VŨ KHÍ (Weapons)

### 2.1 Weapon Icons (hiển thị trong UI/Shop)

| Asset | Mô tả chi tiết | Màu chính | Size |
|---|---|---|---|
| `weapon_icon_melee_a` | **Kiếm Thánh Gióng** — Thanh kiếm vàng óng, lưỡi rộng bản, tay cầm đỏ quấn dải lụa, ánh hào quang vàng xung quanh, nhỏ khiên tròn bên cạnh có hoa văn rồng | Vàng cam #FFB300, đỏ #E53935 | 96×96px |
| `weapon_icon_melee_b` | **Kiếm Sơn Tinh** — Kiếm mảnh dài phủ rêu xanh, dây leo quấn quanh tay cầm, lưỡi kiếm ánh ngọc, khiên gỗ phủ rêu bên cạnh | Xanh ngọc #4CAF50, nâu gỗ | 96×96px |
| `weapon_icon_ranged_a` | **Nỏ Thần An Dương Vương** — Nỏ gỗ đỏ đậm cổ kính, dây cung sáng, mũi tên vàng lửa đỏ đặt sẵn, hoa văn chim lạc trên thân nỏ | Đỏ #C62828, vàng lửa | 96×96px |
| `weapon_icon_ranged_b` | **Cung Âu Cơ** — Cung bạc thanh mảnh cong uyển chuyển, dây cung xanh dương sáng, mũi tên ánh trăng bạc, hoa văn chim phượng | Xanh bạc #90CAF9, bạc | 96×96px |
| `weapon_icon_magic_a` | **Sách Trạng Quỳnh** — Cuốn sách cổ dày bìa tím đậm, trang giấy vàng ố, chữ Nôm phát sáng tím, ngọn lửa tím bay ra từ sách | Tím #7B1FA2, hồng lửa | 96×96px |
| `weapon_icon_magic_b` | **Bí Kíp Lạc Long Quân** — Cuộn trúc (scroll) buộc dây xanh ngọc, khi mở có sóng nước xanh tuôn ra, hoa văn rồng nước | Aqua #00BCD4, ngọc | 96×96px |

### 2.2 Weapon Attack Effects (Projectiles & Slash)

| Asset | Frames | Mô tả | Màu |
|---|---|---|---|
| `fx_slash_melee_a` | 4 frames | Vệt chém hình vòng cung 120° màu vàng lửa, ánh sáng rực, tàn lửa nhỏ bay ra | Vàng → cam gradient |
| `fx_slash_melee_b` | 4 frames | Vệt chém xanh lá, lá cây nhỏ bay theo vệt chém, ánh ngọc bích | Xanh lá gradient |
| `fx_arrow_ranged_a` | 2 frames | Mũi tên đỏ rực bay, trail lửa cam phía sau, đầu tên sáng chói | Đỏ #FF5722 + trail cam |
| `fx_arrow_ranged_b` | 2 frames | Mũi tên bạc ánh trăng, trail xanh dương mờ phía sau, phát sáng nhẹ | Xanh bạc + glow trắng |
| `fx_projectile_magic_a` | 3 frames | Cầu lửa tím xoay tròn, particle tím nhỏ bay quanh, lõi sáng hồng | Tím + hồng lõi |
| `fx_projectile_magic_b` | 3 frames | Quả cầu nước xanh ngọc, sóng nước xoáy bên trong, giọt nước bay ra | Aqua + ngọc |
| `fx_arrow_impact_a` | 3 frames | Nổ nhỏ cam đỏ khi mũi tên trúng, tia lửa bắn tỏa | Cam đỏ |
| `fx_arrow_impact_b` | 3 frames | Flash xanh bạc khi trúng, vòng sóng xanh lan ra | Xanh bạc |
| `fx_magic_impact_a` | 3 frames | Nổ AoE tím, vòng tròn lan rộng + cột lửa tím | Tím gradient |
| `fx_magic_impact_b` | 3 frames | Sóng nước xanh lan tỏa tròn, giọt nước bắn lên | Aqua splash |
| `fx_shield_block` | 2 frames | Flash sáng trên khiên khi block đạn, vòng sáng vàng | Vàng glow |

---

## 3. 🛡️ GIÁP (Armor Overlays)

Mỗi bộ giáp là **overlay layer** đặt lên hero base sprite. Cần khớp với mọi animation state.

| Asset | Mô tả chi tiết | Visual thay đổi | Ưu tiên |
|---|---|---|---|
| `armor_0_default` | Không mặc gì — quần đùi nâu/xanh lá (đã có trong hero base) | Hero mặc định | ⭐ P0 |
| `armor_1_baba` | **Áo Bà Ba** — Áo trắng cổ tròn đơn giản, nút bấm nhỏ, tay ngắn, vải mỏng bay nhẹ | Thêm áo trắng, nông dân chất phác | P1 |
| `armor_2_tuthan` | **Áo Tứ Thân** — Áo nâu đỏ dài qua hông, thắt đai vàng, khăn đóng đen trên đầu | Trang phục cổ trang, oai vệ hơn | P1 |
| `armor_3_chienbinh` | **Giáp Chiến Binh** — Giáp ngực đồng sáng, bảo vệ vai, mũ sắt nhỏ cute trên đầu to chibi | Trông mạnh mẽ, giáp đồng sáng bóng | P1 |
| `armor_4_longbao` | **Long Bào** — Áo vàng thêu rồng đỏ, viền vàng kim, mũ miện nhỏ xinh trên đầu, tay áo rộng | Hoàng gia, đẹp lộng lẫy | P2 |
| `armor_5_giapronghan` | **Giáp Rồng Thần** — Full armor vàng ròng, vảy rồng texture, hiệu ứng glow vàng quanh người, mũ rồng nhỏ | Ultimate tier, phát sáng, oai phong | P2 |

---

## 4. 🐃 MOUNT (Phương tiện di chuyển)

Mỗi mount cần: Idle (2f) + Run (4f). Hero ngồi lên mount, sprite kết hợp.

| Asset | Mô tả chi tiết | Animation | Ưu tiên |
|---|---|---|---|
| `mount_0_walk` | Không mount — hero chạy bộ (đã có) | — | ⭐ P0 |
| `mount_1_trau` | **Trâu Nước** — Trâu chibi mập mạp xám đen, sừng cong dễ thương, mắt hiền, hero ngồi trên lưng. Idle: nhai cỏ. Run: bước chậm lắc lư | Idle 2f, Run 4f | P1 |
| `mount_2_ngua` | **Ngựa Gióng** — Ngựa sắt chibi màu xám bạc ánh kim, bờm lửa cam nhỏ, mắt sáng đỏ, trail lửa nhẹ khi chạy. Hero cưỡi oai | Idle 2f, Run 4f + trail fx | P2 |
| `mount_3_thuyen` | **Thuyền Rồng** — Thuyền rồng nhỏ xinh bay lơ lửng (hover), đầu rồng vàng phía trước, thân gỗ đỏ, mây nhỏ bên dưới. Hero đứng trên thuyền | Idle 2f (hover), Run 4f (bay) | P2 |
| `mount_4_rong` | **Rồng Con** — Rồng Việt Nam chibi nhỏ xanh ngọc, râu ngắn cute, cánh nhỏ vỗ, trail mây ngũ sắc. Hero ngồi trên lưng rồng | Idle 2f (bay tại chỗ), Run 4f + rainbow trail | P2 |

---

## 5. 👾 QUÁI VẬT (Enemies) — 5 Maps × 5 loại/map

### 5.1 Map 1: Sài Gòn — Quái thành phố

| Asset | Type | Mô tả chi tiết | Animations | Màu chính |
|---|---|---|---|---|
| `enemy_rat` | Melee Charger | Chuột cống chibi xám nâu, răng nanh nhỏ nhô ra, mắt đỏ hung dữ cute, đuôi dài cong. Chạy bằng 4 chân, nhảy cắn | Idle 2f, Move 4f, Attack 3f, Death 3f | Xám nâu #795548 |
| `enemy_cockroach` | Swarm | Gián chibi nâu bóng, cánh nhỏ rung, râu ngọ nguậy, rất nhỏ (32px). Chạy nhanh lắc lư | Idle 2f, Move 4f, Death 2f | Nâu bóng #5D4037 |
| `enemy_stray_cat` | Ranged Single | Mèo hoang chibi cam/xám, mắt xếch tinh ranh, phun hairball (đạn tròn xám). Ngồi bắn, di chuyển nhảy | Idle 2f, Move 4f, Attack 3f, Death 3f | Cam #FF8F00 |
| `enemy_stray_dog` | Tank | Chó hoang chibi to con nâu vàng, mặt dữ nhưng vẫn cute, răng hở, chạy chậm nhưng mạnh | Idle 2f, Move 4f, Attack 3f, Death 3f | Nâu vàng #8D6E63 |
| `enemy_mosquito` | Swarm | Muỗi chibi tí hon, cánh bay vo ve, vòi dài nhọn, bay lượn ziczac. Rất nhỏ (24px) | Idle 2f (bay), Move 4f, Death 2f | Xám đen |

### 5.2 Map 2: Vũng Tàu — Quái biển

| Asset | Type | Mô tả | Animations | Màu |
|---|---|---|---|---|
| `enemy_crab` | Melee Charger | Cua chibi đỏ cam, càng to giơ lên, mắt trên cuống, di chuyển ngang cute | Idle 2f, Move 4f (đi ngang), Attack 3f (kẹp), Death 3f | Đỏ cam #E64A19 |
| `enemy_jellyfish` | Ranged Burst | Sứa chibi tím hồng trong suốt, xúc tu ngắn lắc lư, bắn 3 gai tím dạng quạt | Idle 2f (lắc lư), Move 4f (trôi), Attack 3f, Death 3f | Tím hồng #CE93D8 |
| `enemy_pufferfish` | Tank | Cá nóc chibi, bình thường nhỏ → phồng to gấp đôi khi bị tấn công, gai nhọn tua tủa, mắt hoảng | Idle 2f, Move 4f, Attack 3f (phồng), Death 3f | Vàng #FDD835 |
| `enemy_starfish` | Ranged Single | Sao biển gai chibi đỏ tím, 5 cánh, mắt ở giữa hung dữ, bắn gai nhỏ | Idle 2f (xoay nhẹ), Move 4f, Attack 3f, Death 3f | Đỏ tím #AD1457 |
| `enemy_mini_octopus` | Ranged Burst | Bạch tuộc mini chibi xanh tím, 4 xúc tu ngắn, phun mực đen (AoE nhỏ) | Idle 2f, Move 4f, Attack 3f, Death 3f | Xanh tím #5C6BC0 |

### 5.3 Map 3: Miền Tây — Quái đồng ruộng

| Asset | Type | Mô tả | Animations | Màu |
|---|---|---|---|---|
| `enemy_snake` | Melee Charger | Rắn chibi xanh lá/nâu, thân uốn lượn chữ S, lưỡi đỏ le ra, mắt kẻ chỉ | Idle 2f, Move 4f (trườn), Attack 3f (mổ), Death 3f | Xanh nâu #689F38 |
| `enemy_poison_frog` | Ranged Single | Ếch độc chibi cam đen sặc sỡ, phồng bụng bắn bọt độc xanh | Idle 2f (ngồi), Move 4f (nhảy), Attack 3f, Death 3f | Cam đen #FF6F00 |
| `enemy_baby_croc` | Tank | Cá sấu con chibi xanh rêu, miệng há to răng trắng, bụng vàng, bơi/bò | Idle 2f, Move 4f, Attack 3f (cắn), Death 3f | Xanh rêu #558B2F |
| `enemy_scorpion` | Melee Charger | Bọ cạp ruộng chibi nâu đỏ, càng nhỏ, đuôi cong lên có ngòi sáng | Idle 2f, Move 4f, Attack 3f (chích), Death 3f | Nâu đỏ #6D4C41 |
| `enemy_leech` | Swarm | Đỉa chibi đen bóng nhỏ, thân mềm co giãn, miệng tròn, di chuyển bám | Idle 2f, Move 4f (bò), Death 2f | Đen nâu #3E2723 |

### 5.4 Map 4: Đà Lạt — Quái rừng thông

| Asset | Type | Mô tả | Animations | Màu |
|---|---|---|---|---|
| `enemy_spider` | Ranged Single | Nhện rừng chibi đen tím, 8 chân ngắn cute, mắt đỏ 4 cặp, bắn tơ trắng | Idle 2f, Move 4f, Attack 3f, Death 3f | Đen tím #4A148C |
| `enemy_beetle` | Tank | Bọ hung chibi nâu đỏ to con, vỏ cứng sáng bóng, sừng nhỏ, chạy chậm húc | Idle 2f, Move 4f, Attack 3f (húc), Death 3f | Nâu đỏ #BF360C |
| `enemy_bat` | Swarm | Dơi chibi đen nhỏ, cánh mở cute, mắt vàng sáng, bay lượn nhanh | Idle 2f (bay), Move 4f, Attack 3f, Death 2f | Đen #212121 + mắt vàng |
| `enemy_mushroom` | Ranged Burst | Nấm độc di động chibi, mũ nấm đỏ chấm trắng, mắt xoáy, phóng bào tử tím | Idle 2f (lắc), Move 4f (nhảy), Attack 3f, Death 3f | Đỏ trắng #D32F2F |
| `enemy_firefly_swarm` | Swarm | Đom đóm chibi tí hon phát sáng vàng, bay thành đàn, nhỏ xíu (20px) | Idle 2f (lập lòe), Move 4f, Death 2f | Vàng sáng glow |

### 5.5 Map 5: Hà Nội — Quái cung đình

| Asset | Type | Mô tả | Animations | Màu |
|---|---|---|---|---|
| `enemy_ghost_soldier` | Melee Charger | Binh lính ma chibi áo giáp cổ xanh mờ, mặt trắng bệch mắt đỏ, cầm giáo, lơ lửng | Idle 2f, Move 4f (bay), Attack 3f, Death 3f (tan biến) | Xanh mờ transparent |
| `enemy_shadow_samurai` | Tank | Samurai bóng tối chibi đen, mắt đỏ sáng, kiếm đen, áo giáp đen sẫm, chậm nhưng mạnh | Idle 2f, Move 4f, Attack 3f (chém), Death 3f | Đen #1A1A2E + đỏ |
| `enemy_fox_spirit` | Ranged Single | Hồ ly tinh chibi trắng/hồng, 3 đuôi, mắt mèo xanh lá, bắn cầu lửa xanh | Idle 2f, Move 4f, Attack 3f, Death 3f | Trắng hồng + xanh lửa |
| `enemy_oni` | Ranged Burst | Quỷ chibi đỏ/xanh, sừng nhỏ, mặc khố, cầm chùy, ném đá/lửa burst | Idle 2f, Move 4f, Attack 3f, Death 3f | Đỏ #C62828 |
| `enemy_paper_lantern` | Swarm | Đèn lồng ma chibi, lửa xanh bên trong, bay lượn, mắt vẽ trên giấy | Idle 2f (bay), Move 4f, Death 2f (cháy rụi) | Đỏ + lửa xanh |

---

## 6. 🐲 BOSS (5 con)

Mỗi boss cần: Idle (4f), Move (4f), Attack 1-3 (3-4f mỗi skill), Hurt (2f), Death (6f), Shield/Immortal (2f)
**Boss lớn gấp 3-4 lần enemy thường**, sprite 256×256px hoặc lớn hơn.

| Asset | Map | Mô tả chi tiết đầy đủ | Kích thước | Attacks cần animate |
|---|---|---|---|---|
| `boss_rat_king` | Sài Gòn | **Chuột Chúa** — Chuột khổng lồ chibi xám đen, vương miện vàng nhỏ xiêu vẹo trên đầu, bụng to tròn, mắt đỏ hung, răng nanh to, đuôi dài quấn, áo choàng đỏ rách. Dễ thương nhưng intimidating | 256×256px | 1. Lao vào cắn (lao nhanh). 2. Triệu hồi chuột con (gầm, 3 chuột nhỏ chạy ra) |
| `boss_octopus` | Vũng Tàu | **Bạch Tuộc Khổng Lồ** — Bạch tuộc khổng lồ chibi tím đậm, 8 xúc tu cuộn, mắt to vàng dữ tợn cute, miệng tròn, nốt ruồi cute, bụng trắng. Nửa thân dưới nước, sóng bắn | 320×320px | 1. Xúc tu quật AoE arc. 2. Phun mực đen (vòng tròn đen). 3. Ném đá san hô |
| `boss_golden_croc` | Miền Tây | **Cá Sấu Vàng** — Cá sấu khổng lồ chibi vàng óng, vảy vàng lấp lánh, mắt đỏ, miệng há to đầy răng trắng, bụng trắng kem, đuôi dài mạnh mẽ. Nửa thân trong nước | 320×256px | 1. Lướt nước tấn công (lao nhanh + sóng). 2. Cắn kéo (hàm đóng). 3. Triệu hồi cá sấu con |
| `boss_pine_spirit` | Đà Lạt | **Tinh Thông Già** — Cây thông cổ thụ chibi sống dậy, mặt trên thân gỗ (mắt xanh phát sáng, miệng nứt gỗ), cành tay dài, rễ làm chân, lá thông phủ đầy, rêu phong | 256×320px | 1. Rễ đâm từ đất (rễ nhọn nhô lên). 2. Phóng lá thông burst. 3. Hồi máu (đứng yên, ánh xanh bao quanh) |
| `boss_dragon` | Hà Nội | **Rồng Thăng Long** — Rồng Việt Nam chibi hoành tráng, thân dài uốn lượn vàng cam, vảy lấp lánh, râu dài bay, mắt đỏ uy nghiêm, mào đỏ, chân có móng, bay lượn trên mây | 384×384px | 1. Phun lửa cone AoE (lửa vàng đỏ). 2. Bay lên + đánh bom (lao xuống). 3. Triệu hồi binh lính ma |

### Boss Special Effects

| Asset | Mô tả | Frames |
|---|---|---|
| `fx_boss_shield` | Bong bóng khiên tím bao quanh boss khi bất tử, xoay nhẹ, ánh sáng lập lòe | 4 frames loop |
| `fx_boss_shield_break` | Khiên vỡ tan thành mảnh kính, tia sáng bắn ra, glass shatter effect | 6 frames |
| `fx_boss_rage` | Aura đỏ bùng lên quanh boss khi chuyển phase, screen shake | 4 frames |
| `fx_boss_summon` | Vòng tròn phép đỏ trên đất, portal nhỏ, enemy nhảy ra | 4 frames |

---

## 7. 💎 DROP ITEMS (Vật phẩm rơi)

Mỗi item: 1 frame chính + glow animation xung quanh (2f pulse). Tất cả float nhẹ lên xuống.

| Asset | Mô tả chi tiết | Size | Glow color |
|---|---|---|---|
| `item_gold` | Đồng xu vàng tròn lấp lánh, chữ "金" hoặc hoa văn trống đồng, xoay 3D nhẹ | 32×32px | Vàng #FFC107 |
| `item_hp_small` | **Bánh Chưng nhỏ** — Bánh chưng vuông xanh lá nhỏ xinh, dây lạt vàng chéo, tươi mới | 32×32px | Xanh lá #4CAF50 |
| `item_hp_large` | **Bánh Chưng lớn** — Bánh chưng to hơn, glow xanh mạnh hơn, có sparkle | 40×40px | Xanh sáng #66BB6A |
| `item_dmg_up` | **Ớt Cay** — Trái ớt đỏ tươi chibi, cuống xanh, tỏa hơi nóng đỏ, biểu cảm mặt giận | 32×32px | Đỏ cam #FF5722 |
| `item_speed_up` | **Đôi Dép Lốp** — Dép lốp nâu đen kiểu VN cũ, mòn cute, có cánh nhỏ 2 bên (speed symbol) | 32×32px | Xanh dương #2196F3 |
| `item_atk_speed` | **Trống Đồng nhỏ** — Trống đồng chibi vàng đồng, hoa văn mặt trời, ánh kim, rung nhẹ | 32×32px | Vàng đồng #FF8F00 |
| `item_multi_shot` | **Nỏ Liên Thanh** — Nỏ nhỏ chibi với 3 mũi tên, ánh sáng phân tán | 32×32px | Cam #FF9800 |
| `item_shield` | **Lá Chắn Rồng** — Khiên vàng nhỏ hình rồng, ánh kim lấp lánh, viền đỏ | 32×32px | Vàng kim #FFD700 |
| `item_magnet` | **Nam Châm** — Nam châm hình móng ngựa đỏ xanh chibi, tia sáng hút | 32×32px | Xanh đỏ gradient |
| `item_crit` | **Mắt Rồng** — Viên ngọc đỏ hình mắt, đồng tử dọc, phát sáng đỏ rực | 32×32px | Đỏ đậm #B71C1C |

---

## 8. 🗺️ MAP TILESETS (5 bộ)

Mỗi map cần: ground tiles, edge tiles, transition tiles. Tile size: 50×50px (game unit).

### 8.1 Map 1: Sài Gòn

| Tile | Mô tả | Variants |
|---|---|---|
| `tile_sg_road` | Mặt đường nhựa xám, kẻ vạch mờ | 3 variants (sạch, vết xe, ổ gà nhẹ) |
| `tile_sg_sidewalk` | Vỉa hè gạch đỏ/vàng xen kẽ, kẻ pattern | 2 variants |
| `tile_sg_grass_patch` | Ô cỏ xanh bên vỉa hè, cỏ ngắn | 2 variants |
| `tile_sg_drain` | Nắp cống tròn kim loại | 1 |
| `tile_sg_crosswalk` | Vạch kẻ đường trắng (zebra crossing) | 1 |
| `tile_sg_building_wall` | Tường nhà phố vàng kem, cửa sổ, ban công | 4 variants |

### 8.2 Map 2: Vũng Tàu

| Tile | Mô tả | Variants |
|---|---|---|
| `tile_vt_sand` | Cát biển vàng nhạt, texture mịn | 3 variants (sạch, vỏ sò, rong) |
| `tile_vt_wet_sand` | Cát ướt nâu đậm hơn, bóng nước | 2 variants |
| `tile_vt_shallow_water` | Nước nông xanh ngọc trong suốt | 2 variants + animation sóng nhẹ |
| `tile_vt_deep_water` | Nước sâu xanh đậm | 2 variants |
| `tile_vt_coral` | Nền san hô hồng/tím dưới nước nông | 2 variants |
| `tile_vt_rock_floor` | Đá biển xám, rêu xanh | 2 variants |

### 8.3 Map 3: Miền Tây

| Tile | Mô tả | Variants |
|---|---|---|
| `tile_mt_rice_green` | Ruộng lúa xanh non, hàng lúa thẳng | 3 variants |
| `tile_mt_rice_gold` | Ruộng lúa chín vàng, hạt nặng trĩu | 3 variants |
| `tile_mt_mud_path` | Đường đất nâu bờ ruộng | 2 variants |
| `tile_mt_water_canal` | Mặt nước kênh xanh ngọc, bèo nhẹ | 2 variants + animation |
| `tile_mt_bridge_plank` | Ván cầu khỉ tre nâu | 1 (kéo dài) |
| `tile_mt_dyke` | Bờ đê đất nâu cao, cỏ mọc | 2 variants |

### 8.4 Map 4: Đà Lạt

| Tile | Mô tả | Variants |
|---|---|---|
| `tile_dl_pine_floor` | Thảm lá thông nâu cam rụng | 3 variants |
| `tile_dl_grass` | Cỏ xanh đậm mịn, sương đọng | 2 variants |
| `tile_dl_dirt_path` | Đường mòn đất nâu đỏ bazan | 2 variants |
| `tile_dl_flower_bed` | Luống hoa đủ màu (cúc, hồng, lavender) | 3 variants |
| `tile_dl_stone_path` | Đá lát lối đi, rêu kẽ | 2 variants |
| `tile_dl_pond` | Mặt hồ nhỏ xanh trong, phản chiếu | 1 + animation |

### 8.5 Map 5: Hà Nội

| Tile | Mô tả | Variants |
|---|---|---|
| `tile_hn_brick_ancient` | Gạch Hoàng thành đỏ/xám cổ, kẽ rêu | 4 variants |
| `tile_hn_stone_court` | Sân đá lát hoàng cung, pattern vuông | 2 variants |
| `tile_hn_wood_floor` | Ván gỗ sẫm trong đền | 2 variants |
| `tile_hn_garden_grass` | Cỏ cung đình xanh tươi, cắt tỉa | 2 variants |
| `tile_hn_lotus_pond` | Mặt hồ sen xanh ngọc, lá sen tròn | 2 variants + animation |
| `tile_hn_autumn_leaves` | Nền rải lá vàng đỏ mùa thu | 3 variants |

---

## 9. 🏗️ CHƯỚNG NGẠI VẬT (Obstacles — SOLID)

### Map 1: Sài Gòn

| Asset | Size (tiles) | Mô tả chi tiết thiết kế |
|---|---|---|
| `obs_sg_motorbike` | 1×2 | Honda Wave chibi xanh/đỏ, nằm nghiêng, giỏ phía trước có rau, gương xe sáng, bánh xe tròn cute |
| `obs_sg_food_cart` | 2×1 | Xe đẩy gỗ nâu, mái che đỏ sọc trắng, chất đầy trái cây nhiều màu, bánh xe nhỏ |
| `obs_sg_trash_bin` | 1×1 | Thùng rác nhựa xanh/cam bo tròn, nắp hở, túi rác nhô ra |
| `obs_sg_lamp_post` | 1×1 | Cột đèn sắt đen thanh mảnh, bóng đèn vàng tròn phát sáng nhẹ (glow) |
| `obs_sg_banyan_tree` | 2×2 | Gốc cây bàng to nâu, tán lá xanh rậm hình tròn, bóng mát xung quanh |
| `obs_sg_banh_mi_stall` | 2×1 | Tủ kính nhỏ chứa bánh mì, biển hiệu đỏ "BÁNH MÌ", vải che sọc |

### Map 2: Vũng Tàu

| Asset | Size | Mô tả |
|---|---|---|
| `obs_vt_coral_rock` | 2×2 | Đá xám tròn, san hô hồng/tím bám, sao biển nhỏ trên đá |
| `obs_vt_basket_boat` | 2×2 | Thuyền thúng tre tròn nâu, úp ngửa, lưới đánh cá vắt qua |
| `obs_vt_fallen_palm` | 1×3 | Thân dừa nâu nằm ngang, lá xanh đầu, quả dừa rơi bên cạnh |
| `obs_vt_big_rock` | 3×2 | Tảng đá lớn xám xanh rêu, sóng trắng vỗ quanh chân |
| `obs_vt_beach_flag` | 1×1 | Cột gỗ + cờ tam giác đỏ phất phới |
| `obs_vt_old_boat` | 3×2 | Xác thuyền gỗ cũ gãy nửa, rêu bám xanh, mũi nhọn |

### Map 3: Miền Tây

| Asset | Size | Mô tả |
|---|---|---|
| `obs_mt_haystack` | 2×2 | Đống rơm vàng óng chất cao hình nón, vài sợi rơi ra |
| `obs_mt_sampan` | 1×3 | Xuồng gỗ nâu sẫm nằm trên bờ, mái lá nhỏ |
| `obs_mt_water_jar` | 1×1 | Lu sành nâu đỏ tròn to, nước tràn nhẹ, rêu bám |
| `obs_mt_mangrove` | 2×2 | Gốc cây bần to, rễ nổi phức tạp, lá xanh đậm |
| `obs_mt_canal` | 2×long | Dải nước kênh xanh ngọc, bèo trôi, animation sóng nhẹ |
| `obs_mt_monkey_bridge` | 1×4 | Cầu khỉ tre nâu mảnh bắc ngang kênh, tay vịn 1 bên |

### Map 4: Đà Lạt

| Asset | Size | Mô tả |
|---|---|---|
| `obs_dl_pine_trunk` | 2×2 | Gốc thông lớn nâu đỏ, vỏ nứt texture, rễ nổi, lá rụng quanh |
| `obs_dl_mossy_rock` | 2×1 | Đá xám phủ rêu xanh đậm dày, ẩm ướt |
| `obs_dl_flower_row` | 1×3 | Luống hoa cúc/hồng/lavender, hàng rào gỗ thấp trắng xinh |
| `obs_dl_old_carriage` | 3×2 | Xe ngựa gỗ cũ nâu không người, bánh gãy 1 bên, dây leo bám |
| `obs_dl_fern_bush` | 1×1 | Bụi dương xỉ xanh đậm rậm rạp, lá cuộn đầu |
| `obs_dl_greenhouse` | 3×3 | Nhà kính cũ khung sắt + kính vỡ, dây leo xanh bám đầy |

### Map 5: Hà Nội

| Asset | Size | Mô tả |
|---|---|---|
| `obs_hn_pillar` | 1×1 | Cột trụ đá chạm rồng, xám cổ, rêu phong, bóng đổ |
| `obs_hn_dragon_statue` | 2×3 | Tượng rồng đá hoành tráng, oai vệ, rêu xanh bám, mắt ngọc đỏ |
| `obs_hn_lotus_pool` | 3×3 | Hồ vuông kiểu Hoàng thành, viền đá, sen hồng, lá sen xanh |
| `obs_hn_low_wall` | 1×long | Tường gạch đỏ cũ thấp, ngói trên đỉnh, rêu |
| `obs_hn_gate` | 2×3 | Cổng thành nhỏ mái ngói cong đỏ vàng — **PASSABLE** (đi xuyên qua) |
| `obs_hn_altar` | 2×2 | Bệ thờ đá xám, bát hương đồng, nến đỏ, hoa tươi |
| `obs_hn_banyan` | 3×3 | Cây đa cổ thụ, gốc khổng lồ, rễ phụ buông dài, tán che rợp |

---

## 10. 🌸 TIỂU CẢNH NỀN (Decorations — Non-collision)

### Map 1: Sài Gòn

| Asset | Mô tả | Animation? |
|---|---|---|
| `deco_sg_cafe` | Bàn ghế nhựa thấp, ly cà phê đá, NPC ngồi (tĩnh) | Không |
| `deco_sg_neon_sign` | Biển neon "PHỞ" / "CÀ PHÊ" nhấp nháy đỏ vàng | 2f nhấp nháy |
| `deco_sg_power_lines` | Dây điện chằng chịt giữa 2 cột | Không |
| `deco_sg_lottery_seller` | Ông cụ NPC ngồi, xấp vé số treo | Không |
| `deco_sg_ice_cream_bike` | Xe đạp kem trắng, cờ nhỏ phất | Cờ 2f |
| `deco_sg_pothole` | Ổ gà vũng nước nhỏ phản chiếu | Không |
| `deco_sg_graffiti` | Hình vẽ dễ thương trên tường gạch | Không |
| `deco_sg_slippers` | Đôi dép tổ ong trước cửa nhà | Không |

### Map 2: Vũng Tàu

| Asset | Mô tả | Animation? |
|---|---|---|
| `deco_vt_wave` | Sóng biển vỗ bờ, bọt trắng | 4f loop animation |
| `deco_vt_shells` | Vỏ sò, sao biển rải rác nhiều màu | Không |
| `deco_vt_footprints` | Dấu chân trên cát mờ dần | Không |
| `deco_vt_umbrella` | Ô dù nhiều màu + ghế gỗ xếp | Không |
| `deco_vt_lighthouse` | Ngọn hải đăng trắng đỏ xa, ánh sáng quét | 4f quét sáng |
| `deco_vt_fisherman` | NPC ngồi câu cá tĩnh, cần câu cong | Không |
| `deco_vt_tiny_crab` | Cua tí hon chạy ngang cosmetic | 4f chạy |
| `deco_vt_sandcastle` | Lâu đài cát nhỏ xây dở, cờ trên đỉnh | Không |
| `deco_vt_ship` | Tàu container nhỏ xa đường chân trời | Parallax di chuyển |

### Map 3: Miền Tây

| Asset | Mô tả | Animation? |
|---|---|---|
| `deco_mt_rice_field` | Lúa xanh/vàng lay gió (nền chính) | 4f lay nhẹ |
| `deco_mt_stilt_house` | Nhà sàn gỗ mái lá, cầu thang, cột cao | Không |
| `deco_mt_nipa_palm` | Cụm dừa nước xanh mướt dọc kênh | Không |
| `deco_mt_water_lily` | Hoa súng hồng + lá tròn trên kênh | 2f lắc nhẹ |
| `deco_mt_ducks` | 3-4 con vịt bơi trên kênh | 4f bơi |
| `deco_mt_egret` | Cò trắng đứng 1 chân trên ruộng | Không |
| `deco_mt_rice_mill` | Cối xay lúa gỗ cũ | Không |
| `deco_mt_hammock` | Võng buộc giữa 2 cây, đong đưa | 4f đong đưa |
| `deco_mt_floating_market` | Ghe bán trái cây background xa | Parallax |

### Map 4: Đà Lạt

| Asset | Mô tả | Animation? |
|---|---|---|
| `deco_dl_fog` | Layer sương mù trắng trôi chậm (overlay) | Scroll liên tục |
| `deco_dl_pine_needles` | Thảm lá thông nâu rụng | Không |
| `deco_dl_strawberry` | Luống dâu tây đỏ, lá xanh | Không |
| `deco_dl_villa` | Biệt thự cổ Pháp mái ngói đỏ rêu phong | Không |
| `deco_dl_pink_grass` | Cỏ hồng (pink muhly) lay nhẹ | 2f lay |
| `deco_dl_lake` | Mặt hồ tĩnh phản chiếu, sương bay | 2f sương |
| `deco_dl_birds` | Đàn chim sẻ bay qua | 4f animation |
| `deco_dl_mushrooms` | Nấm nhỏ nhiều màu quanh gốc cây | Không |
| `deco_dl_fireflies` | Ánh sáng đom đóm lập lòe | 4f lập lòe |

### Map 5: Hà Nội

| Asset | Mô tả | Animation? |
|---|---|---|
| `deco_hn_brick_pattern` | Pattern gạch đỏ/xám cổ kính nền | Không |
| `deco_hn_roof_curve` | Mái ngói cong đình/chùa vàng đỏ | Không |
| `deco_hn_red_lantern` | Dãy đèn lồng đỏ treo, ánh sáng ấm | 2f lung linh |
| `deco_hn_falling_leaves` | Lá vàng đỏ rơi bay chậm | 4f animation |
| `deco_hn_hoan_kiem` | Hồ Gươm xanh ngọc + Tháp Rùa xa | Parallax |
| `deco_hn_but_tower` | Tháp Bút phía xa background | Parallax |
| `deco_hn_calligrapher` | Ông đồ NPC viết thư pháp | Không |
| `deco_hn_bronze_drum` | Trống đồng lớn trang trí, hoa văn | Không |
| `deco_hn_dragon_relief` | Phù điêu rồng trên tường, sơn son | Không |
| `deco_hn_lotus` | Hoa sen hồng + lá xanh trong hồ | 2f nở |

---

## 11. ✨ HIỆU ỨNG (Particle & VFX)

| Asset | Mô tả | Frames | Size |
|---|---|---|---|
| `fx_hit_spark` | Tia sáng vàng bắn ra 4 hướng khi melee hit | 3f | 64×64px |
| `fx_arrow_trail` | Vệt sáng mờ dần theo mũi tên bay | 1f (stretched) | 16×4px |
| `fx_magic_circle` | Vòng tròn phép thuật phát sáng dưới chân khi cast | 4f xoay | 96×96px |
| `fx_explosion_small` | Nổ nhỏ cam vàng, particle bắn ra | 4f | 64×64px |
| `fx_heal_green` | Hạt xanh lá bay lên từ hero, cross (+) sáng | 3f | 48×48px |
| `fx_buff_glow` | Viền sáng trắng/vàng outline quanh hero | 2f pulse | 80×80px |
| `fx_gold_collect` | Coin xoay bay lên vào UI counter, trail vàng | 4f | 32×32px |
| `fx_level_up` | Cột sáng vàng từ dưới lên + vòng tròn mở rộng | 6f | 128×256px |
| `fx_quiz_correct` | Dấu ✓ xanh lá to + sparkle vàng bắn ra | 4f | 96×96px |
| `fx_quiz_wrong` | Dấu ✗ đỏ to + shake effect | 3f | 96×96px |
| `fx_combo_fire` | Ngọn lửa nhỏ cháy quanh combo counter | 4f loop | 64×32px |
| `fx_death_poof` | Tan biến thành particle trắng/xám bay tỏa | 5f | 96×96px |
| `fx_spawn_portal` | Vòng portal nhỏ tím/đỏ xoáy, enemy nhảy ra | 4f | 64×64px |
| `fx_ultimate` | Full screen flash trắng + vòng sóng vàng lan rộng | 6f | Full screen |
| `fx_damage_number` | Font số damage: trắng viền đỏ (thường), vàng viền cam (crit) | Bitmap font | — |
| `fx_streak_fire` | Ngọn lửa gradient cam→đỏ cho streak counter UI | 4f | 48×48px |

---

## 12. 🖥️ UI ASSETS

### 12.1 Màn hình chính & Menu

| Asset | Mô tả chi tiết | Size |
|---|---|---|
| `ui_logo` | Logo "EduHero" — chữ bo tròn vui tươi, gradient vàng→cam, viền trắng dày, bóng đổ nhẹ, ngôi sao nhỏ sparkle | 512×200px |
| `ui_splash_bg` | Background splash: cảnh Việt Nam chibi (ruộng, núi, mây) mờ nhẹ, gradient ấm | Full screen |
| `ui_btn_play` | Nút "CHƠI LUÔN" — bo tròn lớn, gradient xanh lá→xanh đậm, text trắng bold, bóng đổ, nhấn → co nhẹ | 280×70px |
| `ui_btn_login` | Nút "ĐĂNG NHẬP" — bo tròn nhỏ hơn, viền trắng, nền trong suốt, text trắng | 200×50px |
| `ui_btn_generic` | Nút chung bo tròn — gradient cam→đỏ cam, text trắng, bóng đổ (cho menu, shop...) | 240×60px |
| `ui_btn_back` | Nút quay lại — mũi tên trái trong vòng tròn, xám nhạt | 48×48px |
| `ui_btn_settings` | Icon bánh răng cute bo tròn | 48×48px |
| `ui_btn_pause` | Icon ⏸️ trong vòng tròn mờ | 48×48px |
| `ui_panel_bg` | Panel nền UI — bo tròn, gradient trắng→xám nhạt, viền cam/vàng dày, bóng đổ mềm | Scalable 9-slice |
| `ui_panel_dark` | Panel tối cho overlay — bo tròn, nền đen 70% opacity, viền vàng | Scalable 9-slice |

### 12.2 Map Select Screen

| Asset | Mô tả | Size |
|---|---|---|
| `ui_vietnam_map` | Bản đồ Việt Nam hình chữ S chibi dễ thương, xanh lá mạ, viền cam, 2 quần đảo Hoàng Sa/Trường Sa, các tỉnh thành đánh dấu cute | 400×800px |
| `ui_map_pin_locked` | Pin map khóa — ổ khóa xám trên vòng tròn, tone xám mờ | 48×48px |
| `ui_map_pin_unlocked` | Pin map mở — ngôi sao vàng trên vòng tròn sáng, glow | 48×48px |
| `ui_map_pin_current` | Pin map hiện tại — nhấp nháy, viền cam pulse | 48×48px |
| `ui_map_pin_completed` | Pin hoàn thành — check vàng, vòng tròn xanh lá | 48×48px |
| `ui_stars_1` đến `ui_stars_5` | Hiển thị sao đánh giá map (1-5 sao vàng/xám) | 120×24px |

### 12.3 Weapon Select Screen

| Asset | Mô tả | Size |
|---|---|---|
| `ui_weapon_card` | Card chọn weapon — bo tròn, nền gradient theo màu weapon, icon lớn giữa, tên dưới, stats nhỏ | 160×220px |
| `ui_weapon_card_selected` | Card đã chọn — viền vàng sáng glow, scale lên 110% | 176×242px |
| `ui_weapon_card_locked` | Card khóa — xám mờ, icon ổ khóa overlay | 160×220px |
| `ui_triangle_diagram` | Sơ đồ tam giác khắc chế Kiếm→Phép→Cung→Kiếm với mũi tên | 200×180px |

### 12.4 In-Game HUD

| Asset | Mô tả | Size |
|---|---|---|
| `ui_hp_bar_bg` | Nền HP bar bo tròn xám đậm, viền trắng | 200×20px |
| `ui_hp_bar_fill` | Fill HP gradient xanh lá → vàng → đỏ (theo %), bo tròn | 200×20px |
| `ui_hp_bar_frame` | Frame decorative cho HP bar, lá cây 2 bên | 220×28px |
| `ui_boss_hp_bar_bg` | Nền HP boss bar dài, viền đỏ đậm | 400×16px |
| `ui_boss_hp_bar_fill` | Fill boss HP gradient đỏ đậm, pulse khi HP thấp | 400×16px |
| `ui_gold_icon` | Icon đồng xu vàng nhỏ cho counter HUD | 24×24px |
| `ui_wave_indicator` | Badge "Wave 2/4" bo tròn, nền tím nhạt | 80×32px |
| `ui_skill_btn` | Nút skill ⚡ tròn lớn, gradient xanh→tím, viền vàng, cooldown overlay | 64×64px |
| `ui_joystick_base` | Vòng tròn joystick ngoài, trắng mờ 40% | 120×120px |
| `ui_joystick_thumb` | Nút joystick trong, trắng sáng hơn 60% | 50×50px |
| `ui_damage_font` | Bitmap font số damage: 0-9 trắng viền đỏ + 0-9 vàng viền cam (crit) | Sprite sheet |

### 12.5 Quiz Popup

| Asset | Mô tả | Size |
|---|---|---|
| `ui_quiz_panel` | Panel quiz — bo tròn lớn, nền trắng kem, viền cam dày, bóng đổ | 500×600px (scalable) |
| `ui_quiz_timer` | Vòng tròn đếm ngược, viền cam gradient, số giữa | 48×48px |
| `ui_quiz_answer_btn` | Nút đáp án — bo tròn, nền trắng, viền xám nhạt, text đen | 400×50px |
| `ui_quiz_answer_correct` | Nút đáp án đúng — nền xanh lá sáng, viền xanh đậm, icon ✓ | 400×50px |
| `ui_quiz_answer_wrong` | Nút đáp án sai — nền đỏ nhạt, viền đỏ, icon ✗ | 400×50px |
| `ui_quiz_streak_icon` | Icon lửa 🔥 cho streak counter, gradient cam→đỏ | 32×32px |
| `ui_quiz_category_math` | Badge "TOÁN" bo tròn xanh dương | 60×28px |
| `ui_quiz_category_viet` | Badge "TIẾNG VIỆT" bo tròn đỏ | 80×28px |
| `ui_quiz_category_eng` | Badge "ENGLISH" bo tròn tím | 80×28px |
| `ui_quiz_book` | Cuốn sách mở dễ thương cho quiz transition | 128×128px |

### 12.6 Results & Overlays

| Asset | Mô tả | Size |
|---|---|---|
| `ui_victory_banner` | Banner "CHIẾN THẮNG!" gradient vàng, confetti, ngôi sao | 400×80px |
| `ui_gameover_banner` | Banner "GAME OVER" gradient đỏ tối, tone buồn nhẹ | 400×80px |
| `ui_wave_clear_text` | Text "WAVE CLEAR!" bay vào, gradient xanh→vàng | 300×60px |
| `ui_boss_intro_frame` | Frame giới thiệu boss — viền đỏ tối, nền đen mờ, tên boss + HP | 400×100px |
| `ui_score_panel` | Panel tổng kết: score, gold, quiz %, thời gian, sao đánh giá | 350×400px |
| `ui_confetti` | Particle confetti nhiều màu cho victory | 8×8px mỗi mảnh |
| `ui_dark_overlay` | Overlay tối 70% cho pause, quiz, transitions | Full screen |

### 12.7 Shop Screen

| Asset | Mô tả | Size |
|---|---|---|
| `ui_shop_panel` | Panel shop lớn, tabs trên cùng (Giáp/Mount/Buff), scroll content | Full screen |
| `ui_shop_tab_active` | Tab active — nền cam sáng, text trắng bold | 100×40px |
| `ui_shop_tab_inactive` | Tab inactive — nền xám nhạt, text xám | 100×40px |
| `ui_shop_item_card` | Card sản phẩm — icon, tên, giá gold, stats bonus | 150×180px |
| `ui_shop_btn_buy` | Nút "MUA" — gradient xanh lá, icon coin + giá | 120×40px |
| `ui_shop_btn_owned` | Nút "ĐÃ MUA" — xám, icon check | 120×40px |
| `ui_shop_btn_equipped` | Nút "ĐANG DÙNG" — viền vàng sáng glow | 120×40px |

---

## 13. 🎵 ÂM THANH (Audio — reference list)

Không thiết kế đồ họa, nhưng liệt kê để đồng bộ kế hoạch.

### BGM (8 tracks)
`bgm_menu`, `bgm_saigon`, `bgm_vungtau`, `bgm_mientay`, `bgm_dalat`, `bgm_hanoi`, `bgm_boss`, `bgm_quiz`

### SFX (22 files)
`sfx_slash`, `sfx_arrow_shoot`, `sfx_arrow_hit`, `sfx_magic_cast`, `sfx_magic_explode`, `sfx_hit_enemy`, `sfx_hit_player`, `sfx_gold_pickup`, `sfx_item_pickup`, `sfx_heal`, `sfx_level_up`, `sfx_quiz_correct`, `sfx_quiz_wrong`, `sfx_quiz_streak`, `sfx_boss_roar`, `sfx_boss_shield`, `sfx_shield_break`, `sfx_victory`, `sfx_death`, `sfx_button_tap`, `sfx_wave_clear`, `sfx_wave_start`

---

## 14. 📊 TỔNG HỢP SỐ LƯỢNG ASSET

| Danh mục | Số asset ước tính |
|---|---|
| Hero sprites (base + animations) | ~12 sprite sheets |
| Hero portraits (biểu cảm) | 5 |
| Weapon icons | 6 |
| Weapon effects (projectile/slash/impact) | ~11 sheets |
| Armor overlays | 5 bộ (×12 animation states) |
| Mount sprites | 4 con (idle + run) |
| Enemy sprites (25 loại) | 25 sheets |
| Boss sprites (5 con) | 5 large sheets |
| Boss special FX | 4 sheets |
| Drop items | 10 icons |
| Map tilesets (5 maps × ~6 tiles) | ~30 tiles |
| Obstacles (5 maps × ~6 types) | ~31 sprites |
| Decorations (5 maps × ~8-10 types) | ~45 sprites |
| Particle/VFX | ~16 sheets |
| UI screens & components | ~55 assets |
| **TỔNG** | **~260 unique art assets** |

---

## 15. 🗓️ KẾ HOẠCH THIẾT KẾ — Sprint Plan cho Claude Code

### Sprint 0: Setup & Prototype — ✅ HOÀN THÀNH

**Mục tiêu:** Thiết lập pipeline sinh asset SVG → PNG, test style guide

| Task | Mô tả | Output | Status |
|---|---|---|---|
| T0.1 | Tạo script Node.js sinh SVG chibi character bằng code | `scripts/generate_svg.js` | ✅ |
| T0.2 | Tạo color palette constants file (toàn bộ hex codes) | `src/constants/palette.js` | ✅ |
| T0.3 | Prototype hero idle 4 frames + 5 biểu cảm để xác nhận art style | `output/sprint0/hero_idle_f*.svg`, `hero_face_*.svg` | ✅ |
| T0.4 | Setup Sharp cho batch convert SVG → PNG + sprite sheet | `scripts/build_sprites.js` | ✅ |
| T0.5 | Tạo template functions cho chibi head, body, limbs (reusable) | `src/templates/chibi_parts.js` | ✅ |
| T0.6 | Tạo HTML preview page để review assets trực quan | `preview/sprint0.html` | ✅ |

**Output Sprint 0:** 14 SVGs, 14 PNGs (128px + 64px), 1 sprite sheet (hero_idle_sheet.png 512×128), manifest.json
**Pipeline:** `npm run generate` → SVG → `npm run build` → PNG + sprite sheets
**Ghi chú:** Hero art style đã qua ~8 vòng chỉnh sửa, finalized với phong cách chibi monk (đầu hơi vuông, tóc quả đào, mắt Cookie Run, miệng há răng trắng không lưỡi, blush hồng trên má)

### Sprint 1: Hero Core (2-3 ngày) ⭐ P0

| Task | Mô tả | Output |
|---|---|---|
| T1.1 | Hero idle animation (4 frames) | `hero_idle.png` sheet |
| T1.2 | Hero run 4 hướng (6 frames × 4) | `hero_run_*.png` sheets |
| T1.3 | Hero attack ranged (4 frames) — MVP weapon | `hero_attack_ranged.png` |
| T1.4 | Hero hit + death (2f + 4f) | `hero_hit.png`, `hero_death.png` |
| T1.5 | Hero portraits (5 biểu cảm) | `hero_face_*.png` |

### Sprint 2: MVP Weapon & Items (1-2 ngày) ⭐ P0

| Task | Mô tả | Output |
|---|---|---|
| T2.1 | Nỏ An Dương Vương icon + projectile | `weapon_icon_ranged_a.png`, `fx_arrow_ranged_a.png` |
| T2.2 | Arrow impact effect | `fx_arrow_impact_a.png` |
| T2.3 | Drop items MVP (gold, HP small, damage up) | `item_gold.png`, `item_hp_small.png`, `item_dmg_up.png` |
| T2.4 | Basic particle FX (hit spark, heal, gold collect) | `fx_hit_spark.png`, `fx_heal_green.png`, `fx_gold_collect.png` |

### Sprint 3: Map 1 Sài Gòn (2-3 ngày) ⭐ P0

| Task | Mô tả | Output |
|---|---|---|
| T3.1 | Tileset Sài Gòn (6 tiles) | `tile_sg_*.png` |
| T3.2 | Obstacles Sài Gòn (6 loại) | `obs_sg_*.png` |
| T3.3 | Decorations Sài Gòn (8 loại) | `deco_sg_*.png` |

### Sprint 4: Enemies Map 1 + Boss (2-3 ngày) ⭐ P0

| Task | Mô tả | Output |
|---|---|---|
| T4.1 | 5 enemy types Sài Gòn (idle + move + attack + death) | `enemy_*.png` sheets |
| T4.2 | Boss Chuột Chúa (all animations) | `boss_rat_king.png` large sheet |
| T4.3 | Boss FX (shield, summon) | `fx_boss_*.png` |
| T4.4 | Enemy spawn portal FX | `fx_spawn_portal.png` |

### Sprint 5: UI Core (2-3 ngày) ⭐ P0

| Task | Mô tả | Output |
|---|---|---|
| T5.1 | Logo + Splash screen | `ui_logo.png`, `ui_splash_bg.png` |
| T5.2 | Buttons (play, generic, back, settings, pause) | `ui_btn_*.png` |
| T5.3 | HUD elements (HP bar, gold icon, wave, joystick) | `ui_hp_*.png`, `ui_gold_icon.png`, etc. |
| T5.4 | Quiz popup components | `ui_quiz_*.png` |
| T5.5 | Victory/GameOver/WaveClear banners | `ui_victory_*.png`, `ui_gameover_*.png` |
| T5.6 | Damage number bitmap font | `ui_damage_font.png` |

### Sprint 6: Map Select & Weapon Select (1-2 ngày) ⭐ P0

| Task | Mô tả | Output |
|---|---|---|
| T6.1 | Bản đồ Việt Nam chibi | `ui_vietnam_map.png` |
| T6.2 | Map pins (locked, unlocked, current, completed) | `ui_map_pin_*.png` |
| T6.3 | Weapon cards + triangle diagram | `ui_weapon_card*.png`, `ui_triangle_diagram.png` |

### Sprint 7: Remaining Weapons (2-3 ngày) — P1

| Task | Mô tả | Output |
|---|---|---|
| T7.1 | 5 weapon icons còn lại | `weapon_icon_*.png` |
| T7.2 | Hero attack melee + magic animations | `hero_attack_melee.png`, `hero_attack_magic.png` |
| T7.3 | All weapon projectile + impact effects | `fx_slash_*.png`, `fx_projectile_*.png`, etc. |

### Sprint 8: Armor & Mounts (2-3 ngày) — P1

| Task | Mô tả | Output |
|---|---|---|
| T8.1 | 5 armor overlays | `armor_*.png` |
| T8.2 | 4 mount sprites (idle + run) | `mount_*.png` |
| T8.3 | Hero quiz + victory animations | `hero_quiz.png`, `hero_victory.png` |

### Sprint 9: Maps 2-5 Tilesets (3-4 ngày) — P1

| Task | Mô tả | Output |
|---|---|---|
| T9.1 | Vũng Tàu tileset + obstacles + decorations | `tile_vt_*`, `obs_vt_*`, `deco_vt_*` |
| T9.2 | Miền Tây tileset + obstacles + decorations | `tile_mt_*`, `obs_mt_*`, `deco_mt_*` |
| T9.3 | Đà Lạt tileset + obstacles + decorations | `tile_dl_*`, `obs_dl_*`, `deco_dl_*` |
| T9.4 | Hà Nội tileset + obstacles + decorations | `tile_hn_*`, `obs_hn_*`, `deco_hn_*` |

### Sprint 10: Enemies Maps 2-5 + Bosses (4-5 ngày) — P1

| Task | Mô tả | Output |
|---|---|---|
| T10.1 | 5 enemy types Vũng Tàu | `enemy_crab.png`, etc. |
| T10.2 | 5 enemy types Miền Tây | `enemy_snake.png`, etc. |
| T10.3 | 5 enemy types Đà Lạt | `enemy_spider.png`, etc. |
| T10.4 | 5 enemy types Hà Nội | `enemy_ghost_soldier.png`, etc. |
| T10.5 | 4 Boss còn lại | `boss_octopus.png`, etc. |

### Sprint 11: Remaining Items + Shop UI (1-2 ngày) — P1

| Task | Mô tả | Output |
|---|---|---|
| T11.1 | 7 drop items còn lại | `item_*.png` |
| T11.2 | Shop UI components | `ui_shop_*.png` |
| T11.3 | Remaining particle VFX | `fx_*.png` |

### Sprint 12: Polish & Optimization (2-3 ngày) — P2

| Task | Mô tả | Output |
|---|---|---|
| T12.1 | TexturePacker batch tạo sprite sheets | `atlas_*.json` + `.png` |
| T12.2 | Optimize file sizes (tinypng, quantize) | Giảm ~40% size |
| T12.3 | Quality review: consistency, palette check | Fix list |
| T12.4 | Export @1x (game) + @2x (retina) versions | 2 bộ assets |

---

## 16. 📋 HƯỚNG DẪN CHO CLAUDE CODE

### Prompt template khi giao task cho Claude Code:

```
Bạn là game artist chuyên thiết kế đồ họa 2D chibi cho game mobile.

**Style guide:**
- Chibi 2D, đường viền đậm 2-3px, bo tròn mềm mại
- Tô bóng gradient 2-3 tone (base + shadow + highlight)
- Màu sắc tươi sáng, bão hòa cao, tương phản rõ
- KHÔNG pixel art — smooth vector-style rendering
- Tham khảo: Archero, Angry Birds, Cookie Run
- Đối tượng: trẻ em 7-15 tuổi, dễ thương thân thiện

**Task:** [Mô tả cụ thể từ bảng ở trên]
**Output:** SVG code hoặc Canvas drawing code → export PNG
**Size:** [Kích thước từ bảng]
**Color palette:** [Màu cụ thể từ bảng]

Hãy viết code JavaScript/Node.js sử dụng [canvas/svg/sharp] 
để sinh ra asset này với chất lượng cao nhất có thể.
```

### Lưu ý kỹ thuật cho Claude Code:

1. **SVG là format chính** cho tất cả assets — sinh bằng JavaScript string templates
2. **Sharp library (^0.33.5)** cho SVG → PNG conversion, resize, sprite sheet packing (canvas không cần)
3. **Mỗi asset là 1 function** — dễ iterate, chỉnh sửa từng phần (xem `chibi_parts.js`)
4. **Export 2 size**: 128px (source), 64px (game) cho sprites
5. **Consistent style**: shared drawing functions cho head, body, eyes, etc. trong `src/templates/`
6. **Test từng asset** trước khi batch — preview HTML page (`preview/sprint0.html`)
7. **Sprint-based generation**: `scripts/generate_svg.js --sprint N` → `scripts/build_sprites.js --sprint N`
8. **TexturePacker JSON Array** format cho sprite sheet metadata

---

*Tài liệu này là blueprint đầy đủ cho toàn bộ asset đồ họa của EduHero. Mỗi sprint có thể giao cho Claude Code session riêng, chạy song song nếu cần.*

---

## 17. 📝 CHANGELOG — Tiến độ thực hiện

### Sprint 0 — ✅ Hoàn thành (03/02/2026)

**Files đã tạo:**
- `src/constants/palette.js` — Bảng màu master cho toàn bộ game
- `src/templates/chibi_parts.js` — Template library: `chibiHead()`, `chibiBody()`, `chibiArms()`, `chibiLegs()`, `assembleHero()`
- `scripts/generate_svg.js` — Script sinh SVG theo sprint
- `scripts/build_sprites.js` — Pipeline SVG → PNG + sprite sheets (Sharp)
- `preview/sprint0.html` — Trang preview với animation player, gallery, palette swatches

**Assets đã sinh:**
- 4 hero idle frames (hero_idle_f0~f3.svg/png)
- 5 hero expression portraits (hero_face_happy/serious/hurt/thinking/celebrate)
- 1 weapon icon test (weapon_icon_ranged_a_test)
- 2 drop item tests (item_gold_test, item_hp_small_test)
- 1 UI button test (ui_btn_play_test)
- 1 tile test (tile_sg_road_test)
- 1 sprite sheet (hero_idle_sheet.png 512×128)

**Các thay đổi thiết kế hero (qua ~8 vòng iteration):**

| # | Thay đổi | Lý do |
|---|---|---|
| 1 | Tóc → kiểu "quả đào" (tuft trái tim lệch) | Giống chú tiểu trong chùa, không phải chẻ 2 mái |
| 2 | Mắt → nâu đậm đơn giản, 1 highlight | Long lanh anime quá sợ, Cookie Run style tốt hơn |
| 3 | Bỏ son đỏ miệng | Miệng không cần lipstick, cười đơn giản cute |
| 4 | Mắt xa hơn, to hơn, miệng dời xuống | Mặt trông ngắn, miệng dính mắt |
| 5 | Redesign toàn bộ theo mẫu chibi monk | User cung cấp reference image, match 100% style |
| 6 | Quay lại tóc quả đào + ở trần | Giữ face style mới nhưng tóc và body theo concept gốc |
| 7 | Đầu hơi vuông (rounded rect) | Giống mẫu reference, không tròn hoàn toàn |
| 8 | Giữ blush hồng trên má, bỏ lưỡi | Blush ở má (không phải cằm), miệng không thè lưỡi |

**Quyết định kỹ thuật:**
- Dùng **Sharp** thay vì Canvas (dễ cài đặt hơn, đủ tốt cho SVG→PNG)
- SVG sinh bằng **JavaScript string templates** (không dùng thư viện SVG)
- Outline stroke: **3-3.5px #1A1A1A** everywhere
- Head dùng `<rect>` với `rx/ry` thay vì `<ellipse>` để tạo hình hơi vuông
