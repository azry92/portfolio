// Glyph band motion: play the state sequence once per session when the band comes into view,
// then let scroll scrub it. Without this script, or with reduced motion, the band rests on state 01.

const STORAGE_KEY = 'glyph-band-played';
// Fraction of the timeline where state 06 is fully shown; scrubbing stops there.
const SCRUB_END = 0.78;
// The intro waits for the band to be mostly in view and the scroll to settle.
const INTRO_VISIBLE = 0.6;
const INTRO_SETTLE_MS = 200;

const band = document.querySelector<HTMLElement>('[data-glyph-band]');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function hasPlayed(): boolean {
	try {
		return sessionStorage.getItem(STORAGE_KEY) === '1';
	} catch {
		return false;
	}
}

function markPlayed(): void {
	try {
		sessionStorage.setItem(STORAGE_KEY, '1');
	} catch {
		// Storage blocked: the sequence may replay, which is harmless.
	}
}

/** The sticky header's height, so the scrub ends as the band slides under it. */
function headerHeight(): number {
	return document.querySelector<HTMLElement>('[data-site-header]')?.offsetHeight ?? 0;
}

function animate(band: HTMLElement): () => void {
	let animations: Animation[] = [];
	let frame = 0;
	let settle = 0;
	let scrubbing = false;
	let visible = 0;

	// 0 when the band first sits whole in the viewport, 1 when its top reaches the header.
	const scrub = () => {
		frame = 0;
		const top = band.getBoundingClientRect().top;
		const start = window.innerHeight - band.offsetHeight;
		const travel = Math.max(start - headerHeight(), 1);
		const progress = Math.min(Math.max((start - top) / travel, 0), 1);
		for (const animation of animations) {
			const duration = Number(animation.effect?.getComputedTiming().duration) || 0;
			animation.currentTime = progress * SCRUB_END * duration;
		}
	};
	const onScroll = () => {
		frame ||= requestAnimationFrame(scrub);
	};
	const scrubObserver = new IntersectionObserver(([entry]) => {
		if (entry.isIntersecting) window.addEventListener('scroll', onScroll, { passive: true });
		else window.removeEventListener('scroll', onScroll);
		scrub();
	});

	const startScrub = () => {
		if (scrubbing) return;
		scrubbing = true;
		window.removeEventListener('scroll', startScrub);
		band.dataset.motion = 'scrub';
		animations = band.getAnimations({ subtree: true });
		for (const animation of animations) animation.pause();
		scrub();
		scrubObserver.observe(band);
	};

	// Scrolling during the intro hands over to the scrub, as on first load.
	const playIntro = () => {
		introObserver.disconnect();
		window.removeEventListener('scroll', waitForSettle);
		markPlayed();
		band.dataset.motion = 'intro';
		window.addEventListener('scroll', startScrub, { passive: true });
		Promise.all(band.getAnimations({ subtree: true }).map((a) => a.finished)).then(startScrub, () => {});
	};
	const waitForSettle = () => {
		clearTimeout(settle);
		settle = window.setTimeout(() => {
			if (visible >= INTRO_VISIBLE) playIntro();
		}, INTRO_SETTLE_MS);
	};
	const introObserver = new IntersectionObserver(
		([entry]) => {
			visible = entry.intersectionRatio;
			if (entry.isIntersecting) {
				window.addEventListener('scroll', waitForSettle, { passive: true });
				waitForSettle();
			} else {
				window.removeEventListener('scroll', waitForSettle);
				clearTimeout(settle);
			}
		},
		{ threshold: [0, INTRO_VISIBLE, 1] },
	);

	if (hasPlayed()) startScrub();
	else introObserver.observe(band);

	return () => {
		introObserver.disconnect();
		scrubObserver.disconnect();
		clearTimeout(settle);
		window.removeEventListener('scroll', waitForSettle);
		window.removeEventListener('scroll', onScroll);
		window.removeEventListener('scroll', startScrub);
		cancelAnimationFrame(frame);
		delete band.dataset.motion;
	};
}

if (band) {
	let stop = reducedMotion.matches ? undefined : animate(band);
	reducedMotion.addEventListener('change', () => {
		stop?.();
		stop = reducedMotion.matches ? undefined : animate(band);
	});
}
