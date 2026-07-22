# Danielle Krzeminski Landing Page

This is a simple static landing page for `daniellekrzeminski.com`.

## What to edit

- `index.html`: edit the WHO AM I, FEATURED PROJECTS, and CONNECT content.
- `styles.css`: adjust the Paper-inspired background, spacing, and typography.

## Deploying

This folder is ready for GitHub Pages.

1. Create a GitHub repository.
2. Upload everything in this folder to the repository root.
3. In the repo, go to Settings > Pages.
4. Set Source to `Deploy from a branch`.
5. Choose the `main` branch and `/root`.
6. Under Custom domain, use `daniellekrzeminski.com`.

The `CNAME` file already contains `daniellekrzeminski.com`.

## Cloudflare DNS

In Cloudflare, add these DNS records:

```text
A      @    185.199.108.153
A      @    185.199.109.153
A      @    185.199.110.153
A      @    185.199.111.153
CNAME  www  your-github-username.github.io
```

Replace `your-github-username` with your actual GitHub username. In Cloudflare,
set these records to DNS only at first, then enable GitHub Pages HTTPS.
