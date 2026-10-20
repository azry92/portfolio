// Motion pieces: play when the viewer allows motion, and always offer Pause/Play.
// Under prefers-reduced-motion the poster stays until the viewer presses Play.

const allowsMotion = matchMedia('(prefers-reduced-motion: no-preference)');

for (const root of document.querySelectorAll<HTMLElement>('[data-motion-video]')) {
	const video = root.querySelector('video')!;
	const toggle = root.querySelector<HTMLButtonElement>('[data-motion-video-toggle]')!;

	const label = () => {
		toggle.textContent = video.paused ? 'Play' : 'Pause';
	};

	video.addEventListener('play', label);
	video.addEventListener('pause', label);
	toggle.addEventListener('click', () => (video.paused ? video.play().catch(label) : video.pause()));
	toggle.hidden = false;

	// A refused play() (e.g. data saver) leaves the poster and a Play button.
	if (allowsMotion.matches) video.play().catch(label);
	label();
}
