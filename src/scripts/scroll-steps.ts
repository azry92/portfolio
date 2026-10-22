// Scrolling steps (ScrollSteps.astro): from 900px, the step whose text crosses the middle
// of the viewport gets data-active, and CSS shows its phone. Below 900px, and without
// this script, every step shows its own phone inline.
const wide = window.matchMedia('(min-width: 900px)');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

for (const root of document.querySelectorAll<HTMLElement>('[data-scroll-steps]')) {
	const steps = [...root.querySelectorAll<HTMLElement>('.scroll-steps__step')];
	const textOf = (step: HTMLElement) => step.querySelector<HTMLElement>('.scroll-steps__text')!;
	const activate = (active: HTMLElement) => {
		for (const step of steps) step.toggleAttribute('data-active', step === active);
	};

	// A thin band just above the middle of the viewport: the text in it is the step on show.
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) activate(entry.target.closest<HTMLElement>('.scroll-steps__step')!);
			}
		},
		{ rootMargin: '-45% 0px -50% 0px' },
	);

	const update = () => {
		if (wide.matches) {
			root.dataset.enhanced = '';
			if (!steps.some((step) => step.hasAttribute('data-active'))) activate(steps[0]);
			for (const step of steps) observer.observe(textOf(step));
		} else {
			delete root.dataset.enhanced;
			observer.disconnect();
			for (const step of steps) step.removeAttribute('data-active');
		}
	};

	// Tabbing to a step's zoom link shows its phone and brings its text into view.
	root.addEventListener('focusin', (event) => {
		const step = (event.target as HTMLElement).closest<HTMLElement>('.scroll-steps__step');
		if (!wide.matches || !step) return;
		activate(step);
		textOf(step).scrollIntoView({ block: 'center', behavior: reduced.matches ? 'auto' : 'smooth' });
	});

	wide.addEventListener('change', update);
	update();
}
