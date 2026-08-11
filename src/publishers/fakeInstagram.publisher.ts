import { BaseSocialPublisher } from './base.publisher';

export class FakeInstagramPublisher extends BaseSocialPublisher {
  readonly platform = 'instagram' as const;
}