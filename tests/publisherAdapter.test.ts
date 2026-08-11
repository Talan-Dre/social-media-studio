import { test } from 'node:test';
import assert from 'node:assert/strict';
import { encryptToken, decryptToken } from '../src/security/encryption';

test('encrypts and decrypts OAuth tokens securely', () => {
  const plainToken = 'oauth2_secret_access_token_12345';
  const encrypted = encryptToken(plainToken);

  assert.notEqual(encrypted.encryptedData, plainToken);
  
  const decrypted = decryptToken(encrypted);
  assert.equal(decrypted, plainToken);
});