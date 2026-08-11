import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { verifyWebhookSignature } from '../src/security/webhookVerifier';

test('verifies valid HMAC webhook signatures', () => {
  const secret = 'test-secret-key';
  const payload = JSON.stringify({ postId: 'post-123', status: 'delivered' });
  const validSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

  const isValid = verifyWebhookSignature(payload, validSignature, secret);
  assert.equal(isValid, true);
});

test('rejects forged webhook signatures with wrong keys', () => {
  const secret = 'test-secret-key';
  const payload = JSON.stringify({ postId: 'post-123', status: 'delivered' });
  const forgedSignature = crypto.createHmac('sha256', 'bad-secret').update(payload).digest('hex');

  const isValid = verifyWebhookSignature(payload, forgedSignature, secret);
  assert.equal(isValid, false);
});
