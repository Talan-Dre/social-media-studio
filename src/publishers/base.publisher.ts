import { SocialPublisher, PublishPayload, PublishResult } from './publisher.interface';

export abstract class BaseSocialPublisher implements SocialPublisher {
  abstract readonly platform: 'instagram' | 'x';
  protected baseUrl = process.env.FAKE_PLATFORM_BASE_URL || 'http://localhost:4000';

  async publish(payload: PublishPayload, decryptedAccessToken: string): Promise<PublishResult> {
    const endpoint = `${this.baseUrl}/api/${this.platform}/publish`;

    const executeRequest = async (): Promise<Response> => {
      return fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${decryptedAccessToken}`,
          'Idempotency-Key': payload.idempotencyKey,
        },
        body: JSON.stringify({
          caption: payload.caption,
          imageUrl: payload.imageUrl,
        }),
      });
    };

    let response = await executeRequest();

    if (response.status === 429) {
      const retryAfterHeader = response.headers.get('Retry-After');
      const waitSeconds = retryAfterHeader ? parseInt(retryAfterHeader, 10) : 2;
      
      await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
      response = await executeRequest();
    }

    if (!response.ok) {
      throw new Error(`[${this.platform}] Publish failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      externalPostId: data.postId,
      platform: this.platform,
      status: 'publishing',
    };
  }
}