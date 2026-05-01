# Project TEDxAfrica 2026 — Setup Guide

## Folder Structure

```
tedxafrica/
├── public/                   ← All frontend files (served statically)
│   ├── index.html            ← Homepage
│   ├── about.html            ← About page
│   ├── speakers.html         ← Speaker Experience page
│   ├── experience.html       ← Five-Day Journey page
│   ├── partners.html         ← Partners & Sponsorship
│   ├── team.html             ← Team page
│   ├── coaches.html          ← Coaches page
│   ├── media.html            ← Media & Press page
│   ├── contact.html          ← Contact / All Forms
│   ├── css/
│   │   └── main.css          ← All styles
│   └── js/
│       ├── components.js     ← Nav & Footer injected into every page
│       └── main.js           ← Scroll reveal, forms, interactions
├── server/
│   └── index.js              ← Express backend — all API endpoints
├── data/                     ← Auto-created. Stores form submissions as JSON
│   ├── applications.json
│   ├── contacts.json
│   ├── partners.json
│   ├── attendees.json
│   ├── volunteers.json
│   └── media.json
├── package.json
└── README.md
```

---

## How to Run Locally (VS Code)

### Step 1 — Install Node.js
Download from https://nodejs.org (choose LTS version, v18 or higher)
Verify: open Terminal and type `node -v`

### Step 2 — Open the Project in VS Code
- Open VS Code
- Go to File → Open Folder
- Select the `tedxafrica` folder

### Step 3 — Install Dependencies
In VS Code, open the Terminal (Ctrl + ` or Terminal → New Terminal)
```bash
npm install
```

### Step 4 — Start the Server
```bash
npm start
```
You will see:
```
  SERVER RUNNING AT  http://localhost:3000
  ADMIN DASHBOARD AT http://localhost:3000/admin
```

### Step 5 — View the Website
Open your browser and go to:
```
http://localhost:3000
```
That's it. The full website is live locally.

---

## For Development (Auto-Restart on Save)
```bash
npm run dev
```
This uses `nodemon` — the server restarts automatically whenever you save a file.

---

## Pages & URLs

| Page            | URL                               |
|-----------------|-----------------------------------|
| Homepage        | http://localhost:3000             |
| About           | http://localhost:3000/about.html  |
| Speakers        | http://localhost:3000/speakers.html |
| Experience      | http://localhost:3000/experience.html |
| Partners        | http://localhost:3000/partners.html |
| Team            | http://localhost:3000/team.html   |
| Coaches         | http://localhost:3000/coaches.html |
| Media           | http://localhost:3000/media.html  |
| Contact         | http://localhost:3000/contact.html |
| Admin Dashboard | http://localhost:3000/admin       |

---

## API Endpoints

All form submissions POST to these endpoints:

| Form              | Endpoint         | Saves to                |
|-------------------|------------------|-------------------------|
| Speaker Apply     | POST /api/apply  | data/applications.json  |
| General Contact   | POST /api/contact| data/contacts.json      |
| Partner Enquiry   | POST /api/partner| data/partners.json      |
| Attend            | POST /api/attend | data/attendees.json     |
| Volunteer         | POST /api/volunteer | data/volunteers.json |
| Media Request     | POST /api/media  | data/media.json         |
| Health Check      | GET  /api/health | —                       |

---

## Editing Content

### To change text on any page:
- Open the `.html` file in `public/`
- Edit directly — no build step needed
- Refresh browser to see changes

### To change colors/fonts:
- Open `public/css/main.css`
- Edit CSS variables at the top of the file:
```css
:root {
  --red:   #E8001D;   /* Primary red */
  --black: #0A0A0A;   /* Near-black */
  --white: #FFFFFF;
}
```

### To change nav or footer:
- Open `public/js/components.js`
- Edit the `navHTML` or `footerHTML` strings
- Changes apply to every page automatically

---

## Deploying to the Web

### Option A — Render (Recommended, Free)
1. Push this folder to GitHub
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo
4. Build command: `npm install`
5. Start command: `npm start`
6. Deploy — done. You get a live URL instantly.

### Option B — Railway
1. Push to GitHub
2. Go to https://railway.app → New Project → Deploy from GitHub
3. Select repo → it auto-detects Node.js
4. Set PORT variable to 3000 if needed

### Option C — Vercel (Frontend Only)
If you only want the static frontend with no backend:
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` inside the `public/` folder
3. Follow prompts — live in 60 seconds
Note: Forms will not save server-side in this mode (they show success client-side only)

### Option D — Your Own VPS (DigitalOcean, Hetzner, etc.)
```bash
# On the server:
git clone your-repo
cd tedxafrica
npm install
npm install -g pm2
pm2 start server/index.js --name tedxafrica
pm2 save
pm2 startup
```

---

## Upgrading to a Real Database (Production)

Replace the `saveSubmission` / `readSubmissions` functions in `server/index.js` with:

### MongoDB (via Mongoose):
```bash
npm install mongoose
```
```javascript
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
```

### Firebase Firestore:
```bash
npm install firebase-admin
```
```javascript
const admin = require('firebase-admin');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();
```

---

## Adding Email Notifications (Optional)
Install Nodemailer:
```bash
npm install nodemailer
```
Add to server/index.js after each form save:
```javascript
const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }});
transporter.sendMail({ from: 'noreply@projecttedxafrica.com', to: 'info@projecttedxafrica.com', subject: 'New Application', text: JSON.stringify(submission) });
```

---

## Common Issues

**"Cannot find module 'express'"**
→ Run `npm install` in the project root

**"Port 3000 already in use"**
→ Run `PORT=4000 npm start` to use a different port

**Forms not submitting**
→ Make sure the server is running (`npm start`) before testing forms

**Google Fonts not loading**
→ You need an internet connection; fonts are loaded from Google's CDN
