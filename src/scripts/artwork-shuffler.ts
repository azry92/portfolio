// Artwork shuffler on /fun. The inline bootstrap in ArtworkShuffler.astro has already shown
// a random piece; Shuffle draws the next one from a bag, so nothing repeats until every piece
// has had its turn. Only the piece after the current one is preloaded.

const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');

function shuffled(indexes: number[]): number[] {
	const bag = [...indexes];
	for (let i = bag.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[bag[i], bag[j]] = [bag[j], bag[i]];
	}
	return bag;
}

function initShuffler(root: HTMLElement) {
	const items = [...root.querySelectorAll<HTMLElement>('[data-shuffler-item]')];
	const button = root.querySelector<HTMLButtonElement>('[data-shuffle]')!;
	const status = root.querySelector<HTMLElement>('[data-shuffle-status]')!;
	const all = items.map((_, i) => i);

	let current = Math.max(0, items.findIndex((item) => item.hasAttribute('data-current')));
	let bag = shuffled(all.filter((i) => i !== current));
	let busy = false;

	const imageOf = (i: number) => items[i].querySelector('img')!;

	// The bag's next piece. An empty bag refills, never starting with the piece on show.
	const peek = () => {
		if (!bag.length) {
			bag = shuffled(all);
			if (bag[0] === current) bag.push(bag.shift()!);
		}
		return bag[0];
	};

	const preload = (i: number) => {
		imageOf(i).loading = 'eager';
	};

	const fade = (item: HTMLElement, state: 'data-entering' | 'data-leaving') => {
		item.setAttribute(state, '');
		item.addEventListener('animationend', () => item.removeAttribute(state), { once: true });
	};

	button.addEventListener('click', async () => {
		if (busy) return;
		busy = true;
		const next = peek();
		bag.shift();
		const image = imageOf(next);
		image.loading = 'eager';
		// Swap once the piece can paint, so the stage never fades to an empty frame.
		await image.decode().catch(() => {});

		const from = items[current];
		const to = items[next];
		from.removeAttribute('data-current');
		to.setAttribute('data-current', '');
		if (motion.matches) {
			fade(from, 'data-leaving');
			fade(to, 'data-entering');
		}
		current = next;
		status.textContent = to.querySelector('[data-shuffler-title]')?.textContent?.trim() ?? '';
		preload(peek());
		busy = false;
	});

	if (items.length > 1) preload(peek());
	else button.hidden = true;
}

const root = document.querySelector<HTMLElement>('[data-shuffler].is-enhanced');
if (root) initShuffler(root);
