import sharp from 'sharp';

export interface ImageVariant {
  platform: 'instagram' | 'x';
  width: number;
  height: number;
  buffer: Buffer;
}

export async function generateImageVariants(inputBuffer: Buffer): Promise<Record<'instagram' | 'x', ImageVariant>> {
  const instagramBuffer = await sharp(inputBuffer)
    .resize(1080, 1080, {
      fit: 'cover',
      position: sharp.strategy.entropy,
    })
    .toFormat('jpeg', { quality: 90 })
    .toBuffer();

  const xBuffer = await sharp(inputBuffer)
    .resize(1600, 900, {
      fit: 'cover',
      position: sharp.strategy.entropy,
    })
    .toFormat('jpeg', { quality: 90 })
    .toBuffer();

  return {
    instagram: { platform: 'instagram', width: 1080, height: 1080, buffer: instagramBuffer },
    x: { platform: 'x', width: 1600, height: 900, buffer: xBuffer },
  };
}