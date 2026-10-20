// Image lightbox for case study figures. Any a[data-zoom] opens the dialog;
// previous and next step through the zoom links in the same section, or in the
// nearest [data-zoom-group] when a piece should open on its own.

function init(dialog: HTMLDialogElement) {
	const image = dialog.querySelector<HTMLImageElement>('[data-lightbox-image]')!;
	const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption]')!;
	const count = dialog.querySelector<HTMLElement>('[data-lightbox-count]')!;
	const prev = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]')!;
	const next = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]')!;
	const close = dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]')!;

	let group: HTMLAnchorElement[] = [];
	let index = 0;
	let opener: HTMLElement | null = null;

	// The nearest caption: the figure's own, else one shared by an enclosing figure (a row or a set).
	const captionFor = (link: HTMLAnchorElement) => {
		for (let figure = link.closest('figure'); figure; figure = figure.parentElement?.closest('figure') ?? null) {
			const text = figure.querySelector(':scope > figcaption')?.textContent?.trim();
			if (text) return text;
		}
		return '';
	};

	const show = (i: number) => {
		index = (i + group.length) % group.length;
		const link = group[index];
		image.src = link.href;
		image.alt = link.querySelector('img')?.alt ?? '';
		image.width = Number(link.dataset.width);
		image.height = Number(link.dataset.height);
		const text = captionFor(link);
		caption.textContent = text;
		caption.hidden = !text;
		const several = group.length > 1;
		prev.hidden = next.hidden = count.hidden = !several;
		count.textContent = several ? `${index + 1} of ${group.length}` : '';
	};

	document.addEventListener('click', (event) => {
		const link = (event.target as Element).closest<HTMLAnchorElement>('a[data-zoom]');
		if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		event.preventDefault();
		const scope = link.closest('[data-zoom-group], section') ?? document;
		group = [...scope.querySelectorAll<HTMLAnchorElement>('a[data-zoom]')];
		opener = link;
		show(group.indexOf(link));
		dialog.showModal();
		close.focus();
	});

	prev.addEventListener('click', () => show(index - 1));
	next.addEventListener('click', () => show(index + 1));
	close.addEventListener('click', () => dialog.close());

	dialog.addEventListener('keydown', (event) => {
		if (group.length < 2) return;
		if (event.key === 'ArrowLeft') show(index - 1);
		else if (event.key === 'ArrowRight') show(index + 1);
	});

	// A click on the backdrop, outside the image and controls, closes the viewer.
	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) dialog.close();
	});

	dialog.addEventListener('close', () => {
		image.removeAttribute('src');
		opener?.focus();
	});
}

const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');
if (dialog) init(dialog);
