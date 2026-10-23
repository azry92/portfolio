// Motion pieces: play when the viewer allows motion, and always offer Pause/Play.
// Under prefers-reduced-motion the poster stays until the viewer presses Play.
// A video plays only while on screen, so nothing downloads until it is close.
const allowsMotion = matchMedia('(prefers-reduced-motion: no-preference)');

for (const root of document.querySelectorAll<HTMLElement>('[data-motion-video]')) {
	const video = root.querySelector('video')!;
	const toggle = root.querySelector<HTMLButtonElement>('[data-motion-video-toggle]')!;
	// What the viewer wants; scrolling away pauses without changing it.
	let wanted = allowsMotion.matches;
	let onScreen = false;

	const label = () => {
		const playing = !(video.paused && !(wanted && onScreen));
		toggle.dataset.state = playing ? 'playing' : 'paused';
		toggle.setAttribute('aria-label', playing ? 'Pause clip' : 'Play clip');
	};

	// A refused play() (e.g. data saver) leaves the poster and a Play button.
	const sync = () => {
		if (wanted && onScreen) {
			video.play().catch(() => {
				wanted = false;
				label();
			});
		} else if (!video.paused) {
			video.pause();
		}
		label();
	};

	// The poster picture covers the video until it first has frames to show.
	video.addEventListener('playing', () => (root.dataset.playing = ''), { once: true });
	video.addEventListener('play', label);
	video.addEventListener('pause', label);
	toggle.addEventListener('click', () => {
		wanted = !wanted;
		sync();
	});
	toggle.hidden = false;

	new IntersectionObserver(
		([entry]) => {
			onScreen = entry.isIntersecting;
			sync();
		},
		{ rootMargin: '200px 0px' },
	).observe(video);

	label();
}
