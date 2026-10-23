// Below 600px the sticky header slides away after 8px of scrolling down and comes back
// after a deliberate 24px up. It stays at the top of the page, while the menu is open and
// while focus is inside it. [data-hidden] on the header moves it; CSS ignores it from 600px.

function initAutohide(header: HTMLElement) {
	const narrow = window.matchMedia('(max-width: 599.98px)');
	// Down hides quickly; up needs more, so a small drift or the end of a fling doesn't
	// bring the bar back.
	const hideAfter = 8;
	const revealAfter = 24;
	let lastY = window.scrollY;
	let ticking = false;

	const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

	const pinned = (y: number) =>
		!narrow.matches ||
		y <= header.offsetHeight ||
		header.hasAttribute('data-open') ||
		header.contains(document.activeElement);

	const show = () => header.removeAttribute('data-hidden');

	const update = () => {
		ticking = false;
		const raw = window.scrollY;
		const max = maxScroll();
		// iOS rubber-band overscroll reports positions past either end; its spring back at
		// the bottom would read as a scroll up. Skip those frames and keep the last position.
		if (raw < 0 || raw > max) return;
		const y = Math.min(Math.max(raw, 0), max);
		if (pinned(y)) {
			show();
			lastY = y;
			return;
		}
		// lastY only moves when the bar does, so slow scrolls add up to the thresholds.
		const delta = y - lastY;
		if (delta >= hideAfter) {
			header.setAttribute('data-hidden', '');
			lastY = y;
		} else if (delta <= -revealAfter) {
			show();
			lastY = y;
		}
	};

	window.addEventListener(
		'scroll',
		() => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(update);
		},
		{ passive: true },
	);

	header.addEventListener('focusin', show);
	narrow.addEventListener('change', show);
}

const siteHeader = document.querySelector<HTMLElement>('[data-site-header]');
if (siteHeader) initAutohide(siteHeader);
