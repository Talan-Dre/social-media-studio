import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';

const redisConnection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null,
});

export interface PublishJobData {
  postId: string;
  campaignId: string;
  platform: 'instagram' | 'x';
  idempotencyKey: string;
  caption: string;
  imageUrl: string;
}

export const publishQueue = new Queue<PublishJobData>('social-publisher', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: true,
  },
});

export const publishWorker = new Worker<PublishJobData>(
  'social-publisher',
  async (job: Job<PublishJobData>) => {
    console.log(`[Worker] Picked up durable job ${job.id} for post ${job.data.postId}`);
  },
  { connection: redisConnection }
);