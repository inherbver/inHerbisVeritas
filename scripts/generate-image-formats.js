const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// Dossier contenant les images
const imagesDir = path.resolve(__dirname, '../public/assets/images');

// Options de compression
const webpOptions = { quality: 85 };
const avifOptions = { quality: 80 };

// Formats source à traiter
const validExtensions = /\.(jpe?g|png)$/i;

// Fonction principale
async function generateOptimizedFormats() {
  try {
    // Trouver toutes les images compatibles
    const imageFiles = glob.sync(`${imagesDir}/**/*+(jpg|jpeg|png)`, { nocase: true });
    
    console.log(`Found ${imageFiles.length} images to process`);
    
    // Créer des versions optimisées de chaque image
    for (const imagePath of imageFiles) {
      const imageDir = path.dirname(imagePath);
      const imageName = path.basename(imagePath);
      const imageNameNoExt = imageName.replace(validExtensions, '');
      
      // Lire l'image source
      const imageBuffer = await fs.readFile(imagePath);
      
      // Générer WebP
      const webpPath = path.join(imageDir, `${imageNameNoExt}.webp`);
      if (!fs.existsSync(webpPath)) {
        console.log(`Generating WebP for ${imageName}`);
        await sharp(imageBuffer)
          .webp(webpOptions)
          .toFile(webpPath);
      }
      
      // Générer AVIF (si disponible dans votre version de sharp)
      try {
        const avifPath = path.join(imageDir, `${imageNameNoExt}.avif`);
        if (!fs.existsSync(avifPath)) {
          console.log(`Generating AVIF for ${imageName}`);
          await sharp(imageBuffer)
            .avif(avifOptions)
            .toFile(avifPath);
        }
      } catch (err) {
        console.log(`AVIF generation not supported or failed for ${imageName}`);
      }
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error generating optimized images:', error);
  }
}

// Exécuter la fonction
generateOptimizedFormats();
