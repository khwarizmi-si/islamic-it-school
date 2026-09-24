export const SITE_URL = 'https://itmi.khwarizmi.co.id';
export const SITE_NAME = 'Khwarizmi';
export const BRAND_MARK = '/img/khwarizmi-mark.webp';

export const WA_NUMBER = '6285770661868';
export const WA_DISPLAY = '+62 857-7066-1868';
export const EMAIL = 'info@khwarizmi.co.id';
export const waLink = (text?: string) =>
	`https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

// Two backends: book orders/admin live on portalsi, webinar registration on dreamapps.
export const API_BASE = 'https://iis.portalsi.com/api';
export const WEBINAR_API = 'https://iis.dreamapps.id/api';

// Videos/audio were removed from the repo (Workers assets cap files at 25 MiB). Set this to where they're
// hosted (R2 public bucket, CDN...). Empty = same origin, which is fine for the small QCB mp3s in static/.
export const MEDIA_BASE = '';
export const mediaUrl = (path: string) => `${MEDIA_BASE}/${encodeURI(path)}`;

export const SOCIAL = {
	instagram: 'https://www.instagram.com/alkhwarizmi.id/',
	instagramHandle: '@alkhwarizmi.id',
	youtube: 'https://www.youtube.com/@sekolahimpianku',
	school: 'https://sekolahimpian.com/',
	company: 'https://khwarizmi.co.id'
};

// Header nav: only what this site itself offers. The logo already goes home, and the two
// outbound sites live in the footer so the primary nav doesn't send visitors away.
export const NAV = [
	{ href: '/buku', label: 'Buku' },
	{ href: '/pelatihan', label: 'Pelatihan' },
	{ href: '/kursus', label: 'Kursus' },
	{ href: '/webinar', label: 'Webinar' },
	{ href: '/channel', label: 'Channel' }
];

export const OUTBOUND = [
	{ href: SOCIAL.company, label: 'khwarizmi.co.id' },
	{ href: SOCIAL.school, label: 'Sekolah Impian' }
];

export const rupiah = (n: number) => `Rp${n.toLocaleString('id-ID')}`;
