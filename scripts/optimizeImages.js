// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { globSync } = require('glob');

// Répertoires à explorer
const dirs = ['src/assets', 'public/images'];

// Extensions d'images à optimiser
const extensions = ['jpg', 'jpeg', 'png', 'gif'];

// Options de qualité
const quality = 80;

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase().substring(1);
  const fileName = path.basename(filePath);
  const dir = path.dirname(filePath);

  // Skip si l'image est déjà optimisée (vous pouvez adapter cette logique)
  if (fileName.includes('.min.')) {
    console.log(`Skipping already optimized image: ${fileName}`);
    return;
  }

  console.log(`Optimizing: ${filePath}`);

  try {
    const imageProcess = sharp(filePath);
    let outputOptions = {};

    if (ext === 'jpg' || ext === 'jpeg') {
      outputOptions = { quality };
    } else if (ext === 'png') {
      outputOptions = { quality };
    }

    // Conserver l'extension originale
    await imageProcess
      .toFormat(ext, outputOptions)
      .toFile(path.join(dir, `${path.parse(fileName).name}.min.${ext}`));

    // Créer une version WebP plus légère (optionnel)
    await imageProcess
      .toFormat('webp', { quality })
      .toFile(path.join(dir, `${path.parse(fileName).name}.webp`));

    console.log(`✓ Optimized: ${fileName}`);
  } catch (err) {
    console.error(`✗ Error optimizing ${fileName}:`, err);
  }
}

async function main() {
  // Trouver toutes les images
  let allImages = [];

  dirs.forEach((dir) => {
    extensions.forEach((ext) => {
      const pattern = `${dir}/**/*.${ext}`;
      const files = globSync(pattern, { nocase: true });
      allImages = [...allImages, ...files];
    });
  });

  console.log(`Found ${allImages.length} images to optimize`);

  // Optimiser chaque image
  for (const image of allImages) {
    await optimizeImage(image);
  }

  console.log('Image optimization complete!');
}

main();
