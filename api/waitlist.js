// Vercel serverless function — receives waitlist sign-ups from the landing page.
//
// Every valid submission is written to the function logs (visible in the Vercel
// dashboard under this deployment). If you want sign-ups to land somewhere you
// can read day to day — a Google Sheet, Slack, Discord, Notion, Zapier, etc. —
// set a WAITLIST_WEBHOOK_URL environment variable in the Vercel project and each
// entry will also be POSTed there as JSON. No code change needed to switch it on.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const email = (body && body.email ? String(body.email) : '').trim().toLowerCase();
  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ ok: false, error: 'Enter a valid email address.' });
  }

  const entry = {
    email,
    source: 'vericode-landing',
    at: new Date().toISOString(),
    ua: req.headers['user-agent'] || '',
  };

  // Always recorded in the Vercel function logs.
  console.log('[waitlist]', JSON.stringify(entry));

  // Optional forward to an external collector.
  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    } catch (err) {
      console.error('[waitlist] webhook forward failed:', err && err.message);
    }
  }

  return res.status(200).json({ ok: true });
}
