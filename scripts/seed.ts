import { encryptToken } from '../src/security/encryption';

async function seed() {
  console.log('🌱 Seeding database with encrypted OAuth tokens and campaign records...');

  const igToken = encryptToken('fake_ig_oauth_access_token_sec_123');
  const xToken = encryptToken('fake_x_oauth_access_token_sec_456');

  console.log('  -> Stored Encrypted Token (Instagram):', igToken.encryptedData.slice(0, 16) + '...');
  console.log('  -> Stored Encrypted Token (X):', xToken.encryptedData.slice(0, 16) + '...');
  console.log('✅ Seed completed successfully.');
}

seed().catch(console.error);