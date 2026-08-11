import { test } from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { generateImageVariants } from '../src/image/variantGenerator';
import { composeCaption, CampaignContext } from '../src/config/captionComposer';

const sampleCtx: CampaignContext = {
  title: 'Reliability Engineering',
  bodySummary: 'Building resilient background systems.',
  url: 'https://flyrank.io/blog/1',
  hashtags: ['backend', 'nodejs'],
};

test('generates correct platform image dimensions', async () => {
  const testImage = await sharp({
    create: { width: 2000, height: 2000, channels: 3, background: { r: 0, g: 100, b: 200 } }
  }).png().toBuffer();

  const variants = await generateImageVariants(testImage);

  const igMeta = await sharp(variants.instagram.buffer).metadata();
  assert.equal(igMeta.width, 1080);
  assert.equal(igMeta.height, 1080);

  const xMeta = await sharp(variants.x.buffer).metadata();
  assert.equal(xMeta.width, 1600);
  assert.equal(xMeta.height, 900);
});

test('composes distinct platform-aware captions', () => {
  const igCaption = composeCaption('instagram', sampleCtx);
  const xCaption = composeCaption('x', sampleCtx);

  assert.notEqual(igCaption, xCaption);
  assert.ok(igCaption.includes('link in bio'));
  assert.ok(xCaption.includes('⚡ Quick Take:'));
});