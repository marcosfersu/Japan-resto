export default function (textParent) {
	window.addEventListener("scroll", () => {
		let scrollY = window.scrollY;
		console.log(textParent);
		textParent.style.transform = `translate3d(${scrollY / 2}px,1px,1px)`;
	});
}
