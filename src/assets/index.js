/**
 * index.js — Export all EduHero asset generators.
 *
 * Usage (CommonJS / Node):
 *   var assets = require('./src/assets');
 *   assets.generateHeroSpriteSheet(scene, 'hero_frost', 'frost');
 *
 * Usage (Browser — load scripts via <script> tags):
 *   window.EduHeroAssets is assembled from individual global objects.
 */

// ---------------------------------------------------------------------------
// CommonJS Imports
// ---------------------------------------------------------------------------
if (typeof require !== 'undefined') {
  // Heroes
  var heroBase        = require('./heroes/hero-base');
  var frostKnight     = require('./heroes/hero-frost-knight');
  var fireKnight      = require('./heroes/hero-fire-knight');
  var natureKnight    = require('./heroes/hero-nature-knight');
  var shadowKnight    = require('./heroes/hero-shadow-knight');
  var heroSpritesheet = require('./heroes/hero-spritesheet');

  // Projectiles
  var iceShard  = require('./projectiles/projectile-ice-shard');
  var fireball  = require('./projectiles/projectile-fireball');
  var leafBlade = require('./projectiles/projectile-leaf-blade');
  var darkOrb   = require('./projectiles/projectile-dark-orb');

  module.exports = {
    // Hero base
    heroBase: heroBase,

    // Individual hero draw + palettes
    frostKnight: frostKnight,
    fireKnight:  fireKnight,
    natureKnight: natureKnight,
    shadowKnight: shadowKnight,

    // Spritesheet generator (Phaser integration)
    heroSpritesheet: heroSpritesheet,
    generateHeroSpriteSheet:     heroSpritesheet.generateHeroSpriteSheet,
    generateHeroCanvas:          heroSpritesheet.generateHeroCanvas,
    generateAllHeroSpriteSheets: heroSpritesheet.generateAllHeroSpriteSheets,
    HERO_ANIM_DEFS:              heroSpritesheet.HERO_ANIM_DEFS,

    // Projectile draw + palettes
    iceShard:  iceShard,
    fireball:  fireball,
    leafBlade: leafBlade,
    darkOrb:   darkOrb,

    // Convenience: projectile canvas generators
    generateIceShardCanvas:  iceShard.generateIceShardCanvas,
    generateFireballCanvas:  fireball.generateFireballCanvas,
    generateLeafBladeCanvas: leafBlade.generateLeafBladeCanvas,
    generateDarkOrbCanvas:   darkOrb.generateDarkOrbCanvas,

    // Palettes quick-access
    palettes: {
      frost:  frostKnight.FROST_PALETTE,
      fire:   fireKnight.FIRE_PALETTE,
      nature: natureKnight.NATURE_PALETTE,
      shadow: shadowKnight.SHADOW_PALETTE
    }
  };
}
