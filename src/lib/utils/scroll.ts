export function scrollIntoView(id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	el.scrollIntoView({
		behavior: 'auto'
	});
}
