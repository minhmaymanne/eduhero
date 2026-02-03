/**
 * hero-spritesheet.js — Spritesheet generation for all EduHero heroes.
 *
 * Output: 512×768 spritesheet per hero (4 cols × 6 rows × 128px)
 * Registers Phaser animations automatically.
 *
 * Layout:
 *   Row 0: IDLE    (4 frames @ 4 FPS)
 *   Row 1: WALK    (4 frames @ 8 FPS)
 *   Row 2: ATTACK  (3 frames @ 10 FPS, repeat: 0)
 *   Row 3: HURT    (2 frames @ 8 FPS, repeat: 0)
 *   Row 4: DEATH   (3 frames @ 6 FPS, repeat: 0)
 *   Row 5: SPECIAL (4 frames @ 8 FPS, repeat: 0)
 */

var frostKnight = (typeof require !== 'undefined') ? require('./hero-frost-knight') : null;
var fireKnight  = (typeof require !== 'undefined') ? require('./hero-fire-knight')  : null;
var natureKnight = (typeof require !== 'undefined') ? require('./hero-nature-knight') : null;
var shadowKnight = (typeof require !== 'undefined') ? require('./hero-shadow-knight') : null;

// ---------------------------------------------------------------------------
// Animation definitions (shared by all heroes)
// ---------------------------------------------------------------------------
var HERO_ANIM_DEFS = [
  { name: 'idle',    frames: 4, fps: 4,  repeat: -1 },
  { name: 'walk',    frames: 4, fps: 8,  repeat: -1 },
  { name: 'attack',  frames: 3, fps: 10, repeat: 0 },
  { name: 'hurt',    frames: 2, fps: 8,  repeat: 0 },
  { name: 'death',   frames: 3, fps: 6,  repeat: 0 },
  { name: 'special', frames: 4, fps: 8,  repeat: 0 }
];

var FRAME_SIZE = 128;
var COLS = 4;

// ---------------------------------------------------------------------------
// Hero type → draw function + palette mapping
// ---------------------------------------------------------------------------
function getHeroDrawFn(heroType) {
  switch (heroType) {
    case 'frost':
      var fm = frostKnight || window.HeroFrostKnight;
      return { draw: fm.drawFrostKnight, palette: fm.FROST_PALETTE };
    case 'fire':
      var fm2 = fireKnight || window.HeroFireKnight;
      return { draw: fm2.drawFireKnight, palette: fm2.FIRE_PALETTE };
    case 'nature':
      var fm3 = natureKnight || window.HeroNatureKnight;
      return { draw: fm3.drawNatureKnight, palette: fm3.NATURE_PALETTE };
    case 'shadow':
      var fm4 = shadowKnight || window.HeroShadowKnight;
      return { draw: fm4.drawShadowKnight, palette: fm4.SHADOW_PALETTE };
    default:
      throw new Error('Unknown hero type: ' + heroType);
  }
}

// ---------------------------------------------------------------------------
// Generate a hero spritesheet canvas (no Phaser dependency)
// ---------------------------------------------------------------------------
function generateHeroCanvas(heroType) {
  var hero = getHeroDrawFn(heroType);
  var rows = HERO_ANIM_DEFS.length;
  var canvas = document.createElement('canvas');
  canvas.width = FRAME_SIZE * COLS;    // 512
  canvas.height = FRAME_SIZE * rows;   // 768
  var ctx = canvas.getContext('2d');

  HERO_ANIM_DEFS.forEach(function (anim, row) {
    for (var col = 0; col < anim.frames; col++) {
      ctx.save();
      ctx.translate(col * FRAME_SIZE, row * FRAME_SIZE);
      hero.draw(ctx, FRAME_SIZE, hero.palette, col, anim.name);
      ctx.restore();
    }
  });

  return canvas;
}

// ---------------------------------------------------------------------------
// Generate spritesheet + register Phaser animations
// ---------------------------------------------------------------------------
function generateHeroSpriteSheet(scene, key, heroType) {
  var canvas = generateHeroCanvas(heroType);

  // Add spritesheet texture to Phaser
  scene.textures.addSpriteSheet(key, canvas, {
    frameWidth: FRAME_SIZE,
    frameHeight: FRAME_SIZE
  });

  // Register animations
  var frameIndex = 0;
  HERO_ANIM_DEFS.forEach(function (anim) {
    var frames = [];
    for (var i = 0; i < anim.frames; i++) {
      frames.push({ key: key, frame: frameIndex + i });
    }
    scene.anims.create({
      key: key + '_' + anim.name,
      frames: frames,
      frameRate: anim.fps,
      repeat: anim.repeat
    });
    frameIndex += COLS; // each row has COLS slots (padded)
  });

  return canvas;
}

// ---------------------------------------------------------------------------
// Generate all 4 hero spritesheets at once
// ---------------------------------------------------------------------------
function generateAllHeroSpriteSheets(scene) {
  var heroes = ['frost', 'fire', 'nature', 'shadow'];
  var results = {};
  heroes.forEach(function (type) {
    var key = 'hero_' + type;
    results[type] = generateHeroSpriteSheet(scene, key, type);
  });
  return results;
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HERO_ANIM_DEFS: HERO_ANIM_DEFS,
    FRAME_SIZE: FRAME_SIZE,
    generateHeroCanvas: generateHeroCanvas,
    generateHeroSpriteSheet: generateHeroSpriteSheet,
    generateAllHeroSpriteSheets: generateAllHeroSpriteSheets
  };
}
