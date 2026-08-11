export interface PublishPayload {
  idempotencyKey: string;
  caption: string;
  imageUrl: string;
}

export interface PublishResult {
  externalPostId: string;
  platform: 'instagram' | 'x';
  status: 'queued' | 'publishing' | 'published' | 'failed';
  publishedAt?: Date;
}

export interface SocialPublisher {
  readonly platform: 'instagram' | 'x';
  publish(payload: PublishPayload, encryptedAccessToken: string): Promise<PublishResult>;
}