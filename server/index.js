/**
 * PROJECT TEDXAFRICA 2026 — EXPRESS SERVER
 * Handles all form submissions, stores to JSON files (swap for MongoDB/Firestore in production)
 */

const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');
const path       = require('path');
const fs         = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ─── DATA DIRECTORY ──────────────────────────────────── */
const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function saveSubmission(type, data) {
  const file = path.join(DATA_DIR, `${type}.json`);
  let existing = [];
  if (fs.existsSync(file)) {
    try { existing = JSON.parse(fs.readFileSync(file, 'utf8')); } catch {}
  }
  existing.push({ ...data, submittedAt: new Date().toISOString(), id: Date.now().toString() });
  fs.writeFileSync(file, JSON.stringify(existing, null, 2));
  return existing[existing.length - 1];
}

function readSubmissions(type) {
  const file = path.join(DATA_DIR, `${type}.json`);
  if (!fs.existsSync(file)) return [];
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return []; }
}

/* ─── MIDDLEWARE ──────────────────────────────────────── */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..', 'public')));

/* ─── VALIDATION HELPERS ──────────────────────────────── */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/<[^>]*>/g, ''); // strip HTML tags
}

/* ─── API ENDPOINTS ───────────────────────────────────── */

/* Speaker Application */
app.post('/api/apply', (req, res) => {
  const { first_name, last_name, email, phone, country, profession, organisation, idea, background, source } = req.body;

  const errors = [];
  if (!sanitize(first_name)) errors.push('first_name is required');
  if (!sanitize(last_name))  errors.push('last_name is required');
  if (!email || !isValidEmail(email)) errors.push('valid email is required');
  if (!sanitize(country))    errors.push('country is required');
  if (!sanitize(profession)) errors.push('profession is required');
  if (!sanitize(idea))       errors.push('idea description is required');

  if (errors.length) return res.status(400).json({ success: false, errors });

  const submission = saveSubmission('applications', {
    first_name: sanitize(first_name),
    last_name:  sanitize(last_name),
    email:      sanitize(email),
    phone:      sanitize(phone),
    country:    sanitize(country),
    profession: sanitize(profession),
    organisation: sanitize(organisation),
    idea:       sanitize(idea),
    background: sanitize(background),
    source:     sanitize(source),
  });

  console.log(`[APPLY] New speaker application from ${submission.first_name} ${submission.last_name} <${submission.email}>`);
  res.json({ success: true, message: 'Application received successfully.', id: submission.id });
});

/* General Contact */
app.post('/api/contact', (req, res) => {
  const { name, email, phone, country, subject, message } = req.body;

  if (!sanitize(name))           return res.status(400).json({ success: false, error: 'name required' });
  if (!email || !isValidEmail(email)) return res.status(400).json({ success: false, error: 'valid email required' });
  if (!sanitize(message))        return res.status(400).json({ success: false, error: 'message required' });

  const submission = saveSubmission('contacts', {
    name: sanitize(name), email: sanitize(email),
    phone: sanitize(phone), country: sanitize(country),
    subject: sanitize(subject), message: sanitize(message),
  });

  console.log(`[CONTACT] New message from ${submission.name} <${submission.email}>`);
  res.json({ success: true, message: 'Message received.', id: submission.id });
});

/* Partner Enquiry */
app.post('/api/partner', (req, res) => {
  const { name, title, organisation, email, phone, country, org_type, tier, message } = req.body;

  if (!sanitize(name))         return res.status(400).json({ success: false, error: 'name required' });
  if (!sanitize(organisation)) return res.status(400).json({ success: false, error: 'organisation required' });
  if (!email || !isValidEmail(email)) return res.status(400).json({ success: false, error: 'valid email required' });

  const submission = saveSubmission('partners', {
    name: sanitize(name), title: sanitize(title),
    organisation: sanitize(organisation), email: sanitize(email),
    phone: sanitize(phone), country: sanitize(country),
    org_type: sanitize(org_type), tier: sanitize(tier),
    message: sanitize(message),
  });

  console.log(`[PARTNER] Partnership enquiry from ${submission.name} at ${submission.organisation}`);
  res.json({ success: true, message: 'Partnership enquiry received.', id: submission.id });
});

/* Attendance Registration */
app.post('/api/attend', (req, res) => {
  const { first_name, last_name, email, phone, country, profession, message } = req.body;

  if (!sanitize(first_name) || !sanitize(last_name)) return res.status(400).json({ success: false, error: 'name required' });
  if (!email || !isValidEmail(email)) return res.status(400).json({ success: false, error: 'valid email required' });
  if (!sanitize(country))    return res.status(400).json({ success: false, error: 'country required' });

  const submission = saveSubmission('attendees', {
    first_name: sanitize(first_name), last_name: sanitize(last_name),
    email: sanitize(email), phone: sanitize(phone),
    country: sanitize(country), profession: sanitize(profession),
    message: sanitize(message),
  });

  console.log(`[ATTEND] Attendance registration from ${submission.first_name} ${submission.last_name}`);
  res.json({ success: true, message: 'Attendance registration received.', id: submission.id });
});

/* Volunteer Application */
app.post('/api/volunteer', (req, res) => {
  const { first_name, last_name, email, phone, country, profession, skills } = req.body;

  if (!sanitize(first_name) || !sanitize(last_name)) return res.status(400).json({ success: false, error: 'name required' });
  if (!email || !isValidEmail(email)) return res.status(400).json({ success: false, error: 'valid email required' });
  if (!sanitize(country))    return res.status(400).json({ success: false, error: 'country required' });
  if (!sanitize(skills))     return res.status(400).json({ success: false, error: 'skills required' });

  const submission = saveSubmission('volunteers', {
    first_name: sanitize(first_name), last_name: sanitize(last_name),
    email: sanitize(email), phone: sanitize(phone),
    country: sanitize(country), profession: sanitize(profession),
    skills: sanitize(skills),
  });

  console.log(`[VOLUNTEER] Volunteer application from ${submission.first_name} ${submission.last_name}`);
  res.json({ success: true, message: 'Volunteer application received.', id: submission.id });
});

/* Media Request */
app.post('/api/media', (req, res) => {
  const { name, publication, email, request_type, message } = req.body;

  if (!sanitize(name))         return res.status(400).json({ success: false, error: 'name required' });
  if (!sanitize(publication))  return res.status(400).json({ success: false, error: 'publication required' });
  if (!email || !isValidEmail(email)) return res.status(400).json({ success: false, error: 'valid email required' });

  const submission = saveSubmission('media', {
    name: sanitize(name), publication: sanitize(publication),
    email: sanitize(email), request_type: sanitize(request_type),
    message: sanitize(message),
  });

  console.log(`[MEDIA] Media request from ${submission.name} at ${submission.publication}`);
  res.json({ success: true, message: 'Media request received.', id: submission.id });
});

/* ─── ADMIN DASHBOARD (basic, no auth — add in production) */
app.get('/admin', (req, res) => {
  const types = ['applications','contacts','partners','attendees','volunteers','media'];
  const counts = {};
  const recent = {};

  types.forEach(t => {
    const data = readSubmissions(t);
    counts[t] = data.length;
    recent[t] = data.slice(-5).reverse();
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Admin — TEDxAfrica 2026</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'DM Sans',system-ui,sans-serif;background:#f5f4f0;color:#0a0a0a;font-size:14px;}
    .admin-header{background:#0a0a0a;color:#fff;padding:24px 40px;display:flex;justify-content:space-between;align-items:center;}
    .admin-header h1{font-size:1rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;}
    .admin-header p{font-size:0.78rem;color:rgba(255,255,255,0.4);}
    .admin-body{padding:40px;max-width:1200px;margin:0 auto;}
    .stats{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;margin-bottom:48px;}
    .stat-card{background:#fff;border:1px solid #e2e1dc;padding:24px;text-align:center;}
    .stat-card .n{font-size:2.5rem;font-weight:300;color:#e8001d;line-height:1;margin-bottom:8px;}
    .stat-card .l{font-size:0.68rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#9b9990;}
    .section-title{font-size:0.68rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#9b9990;margin-bottom:16px;border-bottom:1px solid #e2e1dc;padding-bottom:12px;}
    .table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2e1dc;margin-bottom:40px;}
    .table th{background:#f5f4f0;padding:10px 16px;text-align:left;font-size:0.65rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#9b9990;border-bottom:1px solid #e2e1dc;}
    .table td{padding:12px 16px;border-bottom:1px solid #f0efeb;font-size:0.85rem;color:#5a5855;}
    .table tr:last-child td{border-bottom:none;}
    .tag{display:inline-block;padding:3px 10px;font-size:0.65rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;background:#f0faf4;color:#1a5c36;border:1px solid #b3dfc7;}
  </style>
</head>
<body>
<div class="admin-header">
  <div><h1>Project TEDxAfrica — Admin</h1><p>Submission overview</p></div>
  <div style="font-size:0.75rem;color:rgba(255,255,255,0.4);">${new Date().toLocaleString()}</div>
</div>
<div class="admin-body">
  <div class="stats">
    ${types.map(t=>`<div class="stat-card"><div class="n">${counts[t]}</div><div class="l">${t}</div></div>`).join('')}
  </div>
  ${types.map(t=>`
    <div class="section-title">${t} — last 5 submissions</div>
    ${recent[t].length===0 ? '<p style="margin-bottom:40px;color:#9b9990;font-size:0.85rem;">No submissions yet.</p>' :
    `<table class="table">
      <thead><tr>${Object.keys(recent[t][0]||{}).map(k=>`<th>${k}</th>`).join('')}</tr></thead>
      <tbody>${recent[t].map(row=>`<tr>${Object.values(row).map(v=>`<td>${typeof v==='string'&&v.length>80?v.slice(0,80)+'…':v}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>`}
  `).join('')}
</div>
</body></html>`;

  res.send(html);
});

/* ─── HEALTH CHECK ────────────────────────────────────── */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', platform: 'Project TEDxAfrica 2026', time: new Date().toISOString() });
});

/* ─── CATCH-ALL: serve index.html ─────────────────────── */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

/* ─── START ───────────────────────────────────────────── */
app.listen(PORT, () => {
  console.log('');
  console.log('  PROJECT TEDXAFRICA 2026');
  console.log('  ─────────────────────────────────────────');
  console.log(`  Server running at  http://localhost:${PORT}`);
  console.log(`  Admin dashboard at http://localhost:${PORT}/admin`);
  console.log('  ─────────────────────────────────────────');
  console.log('');
});

module.exports = app;
