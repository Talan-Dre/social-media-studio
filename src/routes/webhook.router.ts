import { Router, Request, Response } from 'express';
import { verifyWebhookSignature } from '../security/webhookVerifier';

export const webhookRouter = Router();

webhookRouter.post('/social-delivery', (req: Request, res: Response) => {
  const signature = req.headers['x-platform-signature'] as string;
  const secret = process.env.WEBHOOK_SECRET || 'super-secret-webhook-key';

  if (!signature) {
    return res.status(400).json({ error: 'Missing signature header' });
  }

  const rawBody = JSON.stringify(req.body);
  const isValid = verifyWebhookSignature(rawBody, signature, secret);

  if (!isValid) {
    return res.status(400).json({ error: 'Invalid HMAC signature' });
  }

  const { postId, status } = req.body;
  
  return res.status(200).json({
    received: true,
    postId,
    status: status === 'delivered' ? 'published' : 'failed',
  });
});