export interface CampaignContext {
  title: string;
  bodySummary: string;
  url: string;
  hashtags: string[];
}

const SHARED_BRAND_VOICE = "FlyRank Insights: Driving engineering excellence through architecture.";

const PLATFORM_FRAGMENTS = {
  instagram: {
    prefix: "📸 Visual Brief:",
    formatting: (summary: string, url: string, tags: string[]) => 
      `${summary}\n\n🔗 Read more link in bio: ${url}\n\n${tags.map(t => `#${t}`).join(' ')}`,
  },
  x: {
    prefix: "⚡ Quick Take:",
    formatting: (summary: string, url: string, tags: string[]) => 
      `${summary.slice(0, 180)}\n\n${url} ${tags.slice(0, 2).map(t => `#${t}`).join(' ')}`,
  },
};

export function composeCaption(platform: 'instagram' | 'x', ctx: CampaignContext): string {
  const frag = PLATFORM_FRAGMENTS[platform];
  const body = `${SHARED_BRAND_VOICE} ${ctx.title} - ${ctx.bodySummary}`;
  return `${frag.prefix} ${frag.formatting(body, ctx.url, ctx.hashtags)}`;
}