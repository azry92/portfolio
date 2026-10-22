// The header's Menu button below 600px: a disclosure, not a modal, so no focus trap.
// [data-open] on the header shows the panel; CSS ignores it from 600px.

function initMenu(header: HTMLElement) {
	const button = header.querySelector<HTMLButtonElement>('[aria-controls]')!;
	const panel = document.getElementById(button.getAttribute('aria-controls')!)!;
	const wide = window.matchMedia('(min-width: 600px)');

	const isOpen = () => header.hasAttribute('data-open');

	const open = () => {
		header.setAttribute('data-open', '');
		button.setAttribute('aria-expanded', 'true');
		panel.querySelector<HTMLAnchorElement>('a')?.focus();
	};

	const close = (returnFocus = false) => {
		header.removeAttribute('data-open');
		button.setAttribute('aria-expanded', 'false');
		if (returnFocus) button.focus();
	};

	button.addEventListener('click', () => (isOpen() ? close() : open()));

	header.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && isOpen()) close(true);
	});

	// A null relatedTarget is a tap on nothing focusable; the outside click below handles it.
	header.addEventListener('focusout', (event) => {
		const next = event.relatedTarget as Node | null;
		if (next && !header.contains(next)) close();
	});

	document.addEventListener('click', (event) => {
		if (isOpen() && !header.contains(event.target as Node)) close();
	});

	// Close before an in-page jump (/#work, #contact) so it lands under a 56px bar.
	panel.addEventListener('click', (event) => {
		if ((event.target as Element).closest('a')) close();
	});

	wide.addEventListener('change', () => close());
}

const header = document.querySelector<HTMLElement>('[data-site-header]');
if (header) initMenu(header);
