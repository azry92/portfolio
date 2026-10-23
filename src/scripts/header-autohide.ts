// Below 600px the sticky header slides away while scrolling down and comes back on any
// scroll up. It stays at the top of the page, while the menu is open and while focus is
// inside it. [data-hidden] on the header moves it; CSS ignores it from 600px.

function initAutohide(header: HTMLElement) {
	const narrow = window.matchMedia('(max-width: 599.98px)');
	// Small enough that a deliberate flick hides it, big enough to ignore jitter.
	const threshold = 8;
	let lastY = window.scrollY;
	let ticking = false;

	const pinned = () =>
		!narrow.matches ||
		window.scrollY <= header.offsetHeight ||
		header.hasAttribute('data-open') ||
		header.contains(document.activeElement);

	const show = () => header.removeAttribute('data-hidden');

	const update = () => {
		ticking = false;
		const y = window.scrollY;
		if (pinned()) {
			show();
			lastY = y;
			return;
		}
		if (Math.abs(y - lastY) < threshold) return;
		if (y > lastY) header.setAttribute('data-hidden', '');
		else show();
		lastY = y;
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
