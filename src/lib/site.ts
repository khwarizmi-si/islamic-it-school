export const SITE_URL = 'https://islamic-it-school.com';
export const SITE_NAME = 'Islamic IT School';

export const WA_NUMBER = '6285161231559';
export const waLink = (text?: string) =>
	`https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

// Two backends: book orders/admin live on portalsi, webinar registration on dreamapps.
export const API_BASE = 'https://iis.portalsi.com/api';
export const WEBINAR_API = 'https://iis.dreamapps.id/api';

// ponytail: large videos/audio were removed from the repo (Workers assets cap files at 25 MiB).
// Point this at wherever they're hosted (R2 public bucket, CDN...) and they reappear.
export const MEDIA_BASE = '';
export const mediaUrl = (path: string) => (MEDIA_BASE ? `${MEDIA_BASE}/${encodeURI(path)}` : null);

export const SOCIAL = {
	instagram: 'https://www.instagram.com/sekolahimpianofficial',
	youtube: 'https://www.youtube.com/@sekolahimpianku',
	school: 'https://sekolahimpian.com/'
};

export const NAV = [
	{ href: '/', label: 'Home' },
	{ href: SOCIAL.school, label: 'Sekolah', external: true },
	{ href: '/buku', label: 'Buku' },
	{ href: '/pelatihan', label: 'Pelatihan' },
	{ href: '/kursus', label: 'Kursus' },
	{ href: '/webinar', label: 'Webinar' },
	{ href: '/channel', label: 'Channel' }
];

export const rupiah = (n: number) => `Rp${n.toLocaleString('id-ID')}`;
