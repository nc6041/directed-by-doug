# Doug Truong — Portfolio

Personal film portfolio built with Next.js (App Router), TypeScript and Tailwind CSS. Design source: the `Doug Portfolio` Figma file.

## Run it locally

You need [Node.js](https://nodejs.org) 18.18 or newer. Node 22 LTS is recommended, since Node 18 no longer gets updates.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edits reload automatically.

To check a production build before deploying:

```bash
npm run build
npm start
```

## Where things live

| What | Where |
| --- | --- |
| Projects (films) | `content/projects.ts` |
| Name, email, bio line, socials, site URL, hero video | `content/site.ts` |
| About page bio and facts | `app/about/page.tsx` (top of file) |
| Colors, fonts, sizes, spacing | `tailwind.config.ts` |
| Hero photo | `public/images/hero.jpg` |
| Favicon / link-preview image | `app/icon.svg`, `app/apple-icon.png`, `app/opengraph-image.jpg` |

## Add a new project

1. Open `content/projects.ts`.
2. Copy one of the existing entries in the `projects` list and edit it:

   ```ts
   {
     slug: "my-new-film",              // becomes /work/my-new-film
     title: "My New Film",
     year: 2026,
     role: "Director",
     client: "LMU SFTV",               // optional
     logline: "One line under the thumbnail", // optional
     description: "Longer text for the project page.\n\nSecond paragraph.", // optional
     runtime: "4:12",                  // optional
     videoUrl: "https://youtu.be/XXXXXXXXXXX", // YouTube or Vimeo link
     previewStart: 30,                 // optional: second the hover preview starts at
     thumbnail: "/images/my-new-film.jpg",     // optional for YouTube, required for Vimeo
     stills: [                         // optional
       { src: "/images/my-new-film-1.jpg", alt: "Describe what's in the frame" },
     ],
   },
   ```

3. Put any images (thumbnail, stills) in `public/images/`. JPGs around 2000px wide are plenty; the site resizes and compresses them automatically.
4. Save. The project appears on the home page, on `/work`, and gets its own page. The order in the file is the order on the site.

**Thumbnails.** If you leave out `thumbnail` for a YouTube video, the video's YouTube thumbnail is used. To use a real still instead, add one to `public/images/` and set `thumbnail`.

**Hover previews.** On desktop, hovering a project plays a silent loop of the film from `previewStart` (default 20s). Previews are off on touch screens and for visitors who have "reduce motion" turned on. For a smoother preview, cut a 5 to 10 second clip, host it on a CDN (see below) and set `previewClip: { mp4: "...", webm: "..." }`.

## Video files

Don't put video files in this repo. They make deploys slow, and Vercel isn't built to stream them. Full films go on YouTube or Vimeo. Short loops (hover previews, an optional hero background clip) go on a file host such as [Vercel Blob](https://vercel.com/docs/storage/vercel-blob), Cloudflare R2, Bunny or Cloudinary, and you paste the URLs into `content/`.

To make a small web-ready loop with [ffmpeg](https://ffmpeg.org) (10 seconds starting at 0:30, 1280px wide, no audio):

```bash
ffmpeg -ss 30 -t 10 -i input.mov -vf "scale=1280:-2" -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart loop.mp4
```

```bash
ffmpeg -ss 30 -t 10 -i input.mov -vf "scale=1280:-2" -an -c:v libvpx-vp9 -crf 38 -b:v 0 loop.webm
```

Aim for under ~3 MB per preview clip and under ~5 MB for a hero clip. To use a hero background loop, set `heroVideo` in `content/site.ts`.

## Deploy to Vercel

1. **Put the code on GitHub.** Create an empty repository on github.com (no README), then from this folder:

   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. **Import it into Vercel.** Sign in at [vercel.com](https://vercel.com) with GitHub, click **Add New → Project**, pick the repository and click **Deploy**. No settings need changing: Vercel detects Next.js automatically.
3. After about a minute you get a live URL like `your-project.vercel.app`. Every later `git push` redeploys automatically.

## Connect a custom domain

1. Buy a domain from any registrar (Namecheap, Cloudflare, Porkbun, Squarespace Domains, etc.), or buy it inside Vercel under **Domains**.
2. In Vercel, open the project → **Settings → Domains**, type the domain (e.g. `dougtruong.com`) and click **Add**. Add the `www.` version too when Vercel offers it.
3. Vercel shows the DNS records to create. At your registrar's DNS settings, add exactly what Vercel lists (typically an `A` record for the bare domain and a `CNAME` for `www`). If you bought the domain through Vercel, this is done for you.
4. Wait for Vercel to show **Valid Configuration** (minutes to a few hours). HTTPS is set up automatically.
5. Update the site URL so link previews and the sitemap use the real domain. In `content/site.ts`, change:

   ```ts
   url: "https://example.com",
   ```

   to your domain, for example `url: "https://dougtruong.com"`, then commit and push.

## Before launch checklist

- [ ] Real email in `content/site.ts` (currently `hello@example.com`)
- [ ] Social links in `content/site.ts`
- [ ] Loglines, descriptions, roles and credits in `content/projects.ts`
- [ ] Optional: real stills as thumbnails instead of YouTube's
- [ ] Site URL in `content/site.ts` once the domain is connected
