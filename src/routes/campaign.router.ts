import { Router, Request, Response } from 'express';
import { generateImageVariants } from '../image/variantGenerator';
import { composeCaption } from '../config/captionComposer';
import { publishQueue } from '../jobs/publisherQueue';

export const campaignRouter = Router();

campaignRouter.post('/campaigns', async (req: Request, res: Response) => {
  const { title, bodySummary, url, hashtags, imageBufferBase64 } = req.body;

  if (!title || !imageBufferBase64) {
    return res.status(400).json({ error: 'Missing required campaign payload fields' });
  }

  const inputBuffer = Buffer.from(imageBufferBase64, 'base64');
  const imageVariants = await generateImageVariants(inputBuffer);

  const ctx = { title, bodySummary, url, hashtags };
  const igCaption = composeCaption('instagram', ctx);
  const xCaption = composeCaption('x', ctx);

  const campaignId = `cmp_${Date.now()}`;

  return res.status(201).json({
    campaignId,
    variants: {
      instagram: { caption: igCaption, dimensions: '1080x1080' },
      x: { caption: xCaption, dimensions: '1600x900' },
    },
  });
});

campaignRouter.post('/publish', async (req: Request, res: Response) => {
  const { campaignId, platform, idempotencyKey, delayMs } = req.body;

  const job = await publishQueue.add(
    'publish-job',
    {
      postId: `post_${Date.now()}`,
      campaignId,
      platform,
      idempotencyKey,
      caption: 'Demo caption payload',
      imageUrl: 'https://storage.local/demo.jpg',
    },
    { delay: delayMs || 0 }
  );

  return res.status(202).json({ jobId: job.id, status: 'queued' });
});