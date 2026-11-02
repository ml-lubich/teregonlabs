# Deployment

## Teregon Guide model routing

Configure these values in both Vercel Preview and Production:

- `OPENROUTER_API_KEY` — provider credential; Vercel server environment only.
- `GUIDE_RATE_SECRET` — independent server secret, at least 32 characters.
- `OPENROUTER_FREE_MODELS` — ordered list of exactly these three approved free model IDs. Keep this routing configuration server-side; do not use a `NEXT_PUBLIC_` name.

```dotenv
OPENROUTER_FREE_MODELS=nvidia/nemotron-3.5-super-vl:free,google/gemma-4-31b-it:free,thinkingmachines/inkling:free
```

Never commit or paste credential values into repository files, task notes, screenshots, or logs. Keep the existing rate limits and no-paid-fallback rule.

## Failover behavior

- On an upstream HTTP 429 before stream headers or content are sent, try the next configured free model. Stop at the first successful response or after the third route.
- Do not fail over on Teregon's own visitor/IP limiter 429, authentication or configuration errors, other provider statuses (including 5xx), network errors, or after streaming begins.
- If all three routes return 429, return a sanitized, retryable 429 with bounded `Retry-After` handling. The fallback chain uses one app-side rate-limit reservation.
- Regression tests use a stubbed provider; do not make real provider requests in the test suite.

For a deployment, verify the public Guide route from Preview first, then Production. Confirm one successful streamed answer and a controlled all-model-429 response without exposing prompts, credentials, or provider error bodies.
