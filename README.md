# Islamic IT School

Website [islamic-it-school.com](https://islamic-it-school.com): SvelteKit 2 + Svelte 5 + Tailwind CSS 4, di-deploy ke Cloudflare Workers.

## Development

```sh
npm install        # butuh npm >= 11 (npm 10 gagal resolve peer deps): npx npm@11 install
npm run dev        # http://localhost:5173
npm run check      # type-check
npm test           # unit test (vitest)
```

## Deploy ke Cloudflare

```sh
npx wrangler login     # sekali saja
npm run deploy         # vite build && wrangler deploy
npm run preview        # uji hasil build di runtime Workers lokal (port 4173)
```

Pertama kali deploy, Worker `islamic-it-school` muncul di `*.workers.dev`. Untuk memakai domain sendiri:
Cloudflare Dashboard → Workers & Pages → islamic-it-school → Settings → Domains & Routes → Add Custom Domain.

## Konfigurasi

| Apa | Di mana |
|---|---|
| Nomor WhatsApp, URL API, link sosial | `src/lib/site.ts` |
| Client key Midtrans (publik, **wajib diisi** sebelum pembayaran jalan) | `src/lib/midtrans.ts` |
| Host video/audio (`MEDIA_BASE`, mis. bucket R2 publik) | `src/lib/site.ts` |
| Konten 7 landing buku (`/itmi`, `/lc`, ...) | `src/lib/books.ts` |
| Redirect URL lama `*.html` | `_redirects` |
| Header keamanan | `_headers` |

Video promo (97 MB) dan video kursus tidak bisa ikut sebagai asset Worker (batas 25 MiB/file). Upload ke R2/CDN lalu isi
`MEDIA_BASE`; sebelum itu halaman menampilkan gambar pengganti. Audio QCB dicari di `MEDIA_BASE/qcb/audios/...`, atau
kembalikan file mp3-nya ke `static/qcb/audios/` kalau `MEDIA_BASE` dibiarkan kosong.

## Struktur

- `src/routes/(site)/`: halaman publik yang memakai navbar bersama
- `src/routes/[book=book]/`: satu template untuk 7 landing buku
- `src/routes/form_beli`, `form_webinar`, `payment-success`: checkout (Midtrans Snap)
- `src/routes/admin/`: panel admin (login, super-admin, admin)
- `src/routes/qcb/audio-qcb`: halaman audio dari QR code buku (jangan ganti URL-nya)

Semua halaman di-prerender menjadi HTML statis. Form, admin, dan halaman QCB dirender di browser karena bergantung
pada query string atau token login.
