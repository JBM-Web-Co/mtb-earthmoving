// Best-effort in-memory rate limiter. On serverless this is per-instance only
// (Fluid Compute reuses warm instances, so it still blunts bursts) — it is not a
// global guarantee. For strict, distributed limits, back this with Upstash or
// Vercel KV.
type Hit = {
    count: number;
    reset: number;
};

const WINDOW_MS = 60_000;
const MAX_HITS = 5;
const hits = new Map<string, Hit>();

export function rateLimited(key: string): boolean {
    const now = Date.now();
    const existing = hits.get(key);

    if (!existing || now > existing.reset) {
        hits.set(key, { count: 1, reset: now + WINDOW_MS });
        return false;
    }

    existing.count += 1;
    return existing.count > MAX_HITS;
}
