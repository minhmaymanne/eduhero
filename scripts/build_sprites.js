#!/usr/bin/env node
/**
 * EduHero — Build Sprites Pipeline
 *
 * Converts SVG files → PNG (128px source + 64px game size)
 * Generates sprite sheet JSON metadata
 *
 * Usage: node scripts/build_sprites.js [--sprint N]
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// ── CLI args ──
const args = process.argv.slice(2);
const sprintIdx = args.indexOf('--sprint');
const sprint = sprintIdx >= 0 ? parseInt(args[sprintIdx + 1], 10) : 0;

const INPUT_DIR = path.resolve(__dirname, '..', 'output', `sprint${sprint}`);
const PNG_DIR = path.join(INPUT_DIR, 'png');
const PNG_64_DIR = path.join(INPUT_DIR, 'png_64');
const SHEETS_DIR = path.join(INPUT_DIR, 'sheets');

async function main() {
  console.log(`\n🖼️  Build Sprites — Sprint ${sprint}\n`);

  // Ensure output directories
  fs.mkdirSync(PNG_DIR, { recursive: true });
  fs.mkdirSync(PNG_64_DIR, { recursive: true });
  fs.mkdirSync(SHEETS_DIR, { recursive: true });

  // Find all SVG files
  const svgFiles = fs.readdirSync(INPUT_DIR)
    .filter(f => f.endsWith('.svg'))
    .sort();

  if (svgFiles.length === 0) {
    console.log('⚠️  No SVG files found. Run generate_svg.js first!');
    process.exit(1);
  }

  console.log(`📂 Found ${svgFiles.length} SVG files\n`);

  // ── Convert each SVG → PNG ──
  let converted = 0;
  for (const svgFile of svgFiles) {
    const svgPath = path.join(INPUT_DIR, svgFile);
    const baseName = svgFile.replace('.svg', '');
    const pngName = `${baseName}.png`;
    const svgBuffer = fs.readFileSync(svgPath);

    try {
      // Get SVG dimensions from viewBox
      const viewBoxMatch = svgBuffer.toString().match(/viewBox="0 0 (\d+) (\d+)"/);
      const srcWidth = viewBoxMatch ? parseInt(viewBoxMatch[1]) : 128;
      const srcHeight = viewBoxMatch ? parseInt(viewBoxMatch[2]) : 128;

      // Full size PNG (source resolution)
      await sharp(svgBuffer)
        .resize(srcWidth, srcHeight)
        .png({ compressionLevel: 9 })
        .toFile(path.join(PNG_DIR, pngName));

      // Half size PNG (game resolution) - only for sprites >= 64px
      if (srcWidth >= 64 && srcHeight >= 64) {
        await sharp(svgBuffer)
          .resize(Math.round(srcWidth / 2), Math.round(srcHeight / 2))
          .png({ compressionLevel: 9 })
          .toFile(path.join(PNG_64_DIR, pngName));
      }

      converted++;
      console.log(`  ✔ ${pngName} (${srcWidth}×${srcHeight})`);
    } catch (err) {
      console.error(`  ✗ ${svgFile}: ${err.message}`);
    }
  }

  // ── Generate sprite sheets for all animation sets ──
  const sheetConfigs = [
    { prefix: 'hero_idle_f', name: 'hero_idle', w: 128, h: 128 },
    { prefix: 'hero_run_down_f', name: 'hero_run_down', w: 128, h: 128 },
    { prefix: 'hero_run_up_f', name: 'hero_run_up', w: 128, h: 128 },
    { prefix: 'hero_run_left_f', name: 'hero_run_left', w: 128, h: 128 },
    { prefix: 'hero_run_right_f', name: 'hero_run_right', w: 128, h: 128 },
    { prefix: 'hero_attack_ranged_f', name: 'hero_attack_ranged', w: 128, h: 128 },
    { prefix: 'hero_hit_f', name: 'hero_hit', w: 128, h: 128 },
    { prefix: 'hero_death_f', name: 'hero_death', w: 128, h: 128 },
  ];

  const generatedSheets = [];
  for (const cfg of sheetConfigs) {
    const frameFiles = svgFiles.filter(f => f.startsWith(cfg.prefix)).sort();
    if (frameFiles.length > 0) {
      await generateSpriteSheet(
        frameFiles.map(f => f.replace('.svg', '')),
        cfg.name,
        cfg.w,
        cfg.h
      );
      generatedSheets.push(`${cfg.name}_sheet.png`);
    }
  }

  // ── Generate metadata JSON ──
  const metadata = {
    sprint,
    generated: new Date().toISOString(),
    assets: svgFiles.map(f => {
      const baseName = f.replace('.svg', '');
      const svgBuffer = fs.readFileSync(path.join(INPUT_DIR, f)).toString();
      const viewBoxMatch = svgBuffer.match(/viewBox="0 0 (\d+) (\d+)"/);
      return {
        name: baseName,
        svg: f,
        png: `${baseName}.png`,
        width: viewBoxMatch ? parseInt(viewBoxMatch[1]) : 128,
        height: viewBoxMatch ? parseInt(viewBoxMatch[2]) : 128,
      };
    }),
    spriteSheets: generatedSheets,
  };

  const metaPath = path.join(INPUT_DIR, 'manifest.json');
  fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2));
  console.log(`\n📋 Manifest: ${metaPath}`);

  console.log(`\n✅ Build done! ${converted}/${svgFiles.length} PNGs created\n`);
  console.log(`   📁 Full size → ${PNG_DIR}`);
  console.log(`   📁 Half size → ${PNG_64_DIR}`);
  console.log(`   📁 Sheets    → ${SHEETS_DIR}\n`);
}

/**
 * Combine multiple PNGs into a horizontal sprite sheet
 */
async function generateSpriteSheet(frameNames, sheetName, frameW, frameH) {
  const frames = [];
  const jsonFrames = {};

  for (let i = 0; i < frameNames.length; i++) {
    const pngPath = path.join(PNG_DIR, `${frameNames[i]}.png`);
    if (!fs.existsSync(pngPath)) continue;

    frames.push({
      input: pngPath,
      left: i * frameW,
      top: 0,
    });

    jsonFrames[frameNames[i]] = {
      frame: { x: i * frameW, y: 0, w: frameW, h: frameH },
      sourceSize: { w: frameW, h: frameH },
      spriteSourceSize: { x: 0, y: 0, w: frameW, h: frameH },
    };
  }

  if (frames.length === 0) return;

  const sheetW = frames.length * frameW;
  const sheetH = frameH;

  // Create sprite sheet image
  try {
    await sharp({
      create: {
        width: sheetW,
        height: sheetH,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite(frames)
      .png({ compressionLevel: 9 })
      .toFile(path.join(SHEETS_DIR, `${sheetName}_sheet.png`));

    // TexturePacker-compatible JSON
    const sheetJson = {
      frames: jsonFrames,
      meta: {
        app: 'EduHero Asset Pipeline',
        version: '1.0',
        image: `${sheetName}_sheet.png`,
        format: 'RGBA8888',
        size: { w: sheetW, h: sheetH },
        scale: '1',
      },
    };

    fs.writeFileSync(
      path.join(SHEETS_DIR, `${sheetName}_sheet.json`),
      JSON.stringify(sheetJson, null, 2)
    );

    console.log(`\n  🗂️  Sheet: ${sheetName}_sheet.png (${sheetW}×${sheetH}, ${frames.length} frames)`);
  } catch (err) {
    console.error(`  ✗ Sheet ${sheetName}: ${err.message}`);
  }
}

main().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
