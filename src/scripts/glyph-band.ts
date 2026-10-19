// Glyph band motion: play the state sequence once per session, then let scroll scrub it.
// Without this script, or with reduced motion, the band rests on state 01.

const STORAGE_KEY = 'glyph-band-played';
// Fraction of the timeline where state 06 is fully shown; scrubbing stops there.
const SCRUB_END = 0.78;

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

function animate(band: HTMLElement): () => void {
	let animations: Animation[] = [];
	let frame = 0;
	let scrubbing = false;

	const scrub = () => {
		frame = 0;
		const progress = Math.min(Math.max(window.scrollY / band.offsetHeight, 0), 1);
		for (const animation of animations) {
			const duration = Number(animation.effect?.getComputedTiming().duration) || 0;
			animation.currentTime = progress * SCRUB_END * duration;
		}
	};
	const onScroll = () => {
		frame ||= requestAnimationFrame(scrub);
	};
	const observer = new IntersectionObserver(([entry]) => {
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
		observer.observe(band);
	};

	if (hasPlayed()) {
		startScrub();
	} else {
		markPlayed();
		band.dataset.motion = 'intro';
		window.addEventListener('scroll', startScrub, { passive: true });
		Promise.all(band.getAnimations({ subtree: true }).map((a) => a.finished)).then(startScrub, () => {});
	}

	return () => {
		observer.disconnect();
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
