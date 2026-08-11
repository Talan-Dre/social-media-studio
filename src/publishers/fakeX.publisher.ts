import { BaseSocialPublisher } from './base.publisher';

export class FakeXPublisher extends BaseSocialPublisher {
  readonly platform = 'x' as const;
}