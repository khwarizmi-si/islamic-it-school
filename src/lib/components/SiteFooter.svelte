<script lang="ts">
	import { BRAND_MARK, NAV, SITE_NAME, SOCIAL, waLink } from '$lib/site';

	const channels = [
		{ href: SOCIAL.instagram, label: 'Instagram', icon: 'icon-[lucide--instagram]' },
		{ href: SOCIAL.youtube, label: 'YouTube', icon: 'icon-[lucide--youtube]' },
		{ href: waLink(), label: 'WhatsApp', icon: 'icon-[lucide--message-circle]' }
	];
</script>

<footer class="rule">
	<div class="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
		<div>
			<a href="/" class="mb-4 flex items-center gap-2.5">
				<img src={BRAND_MARK} alt="" width="26" height="40" class="h-10 w-auto" />
				<span class="font-display text-xl font-semibold tracking-tight">{SITE_NAME}</span>
			</a>
			<p class="max-w-sm leading-relaxed text-muted">
				Penerbit Buku Seri Teknologi Islami dan penyelenggara pelatihan serta kursus teknologi untuk guru, orang tua,
				dan anak.
			</p>
		</div>

		<nav aria-label="Navigasi footer">
			<h2 class="label mb-4">Jelajahi</h2>
			<ul class="space-y-2.5">
				{#each NAV.slice(1) as item (item.href)}
					<li>
						<a
							href={item.href}
							target={item.external ? '_blank' : undefined}
							rel={item.external ? 'noopener' : undefined}
							class="text-muted transition-colors hover:text-fg">{item.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>

		<div>
			<h2 class="label mb-4">Terhubung</h2>
			<ul class="space-y-2.5">
				{#each channels as c (c.label)}
					<li>
						<a href={c.href} target="_blank" rel="noopener" class="flex items-center gap-2 text-muted transition-colors hover:text-fg">
							<span class="{c.icon} size-4"></span>{c.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="shell rule flex flex-wrap items-center justify-between gap-3 py-6 text-sm text-muted">
		<p>© {new Date().getFullYear()} {SITE_NAME}. Seluruh hak cipta dilindungi.</p>
		<p>Buku Seri Teknologi Islami · Bintang Semesta Media</p>
	</div>
</footer>
