var control = new ScrollMagic.Controller({container: "#cap1"});

new ScrollMagic.Scene({triggerElement: "#cap1-p1", duration: "100%", triggerHook: "onLeave"})
	.setTween("#cap1 .capitulo", {opacity: 0})
	.addTo(control);

new ScrollMagic.Scene({triggerElement: ".separar", duration: 300, triggerHook: "onEnter"})
	.setTween("#cap1-p1 p", {opacity: 1, transform: "scale(1) rotateY(0grad) translateX(0px)"})
	.addTo(control);

new ScrollMagic.Scene({triggerElement: "#cap1-p2", duration: "150%", triggerHook: "onEnter"})
	.setTween("#avion", {transform: "translateX(100vw)"})
	.addTo(control);

new ScrollMagic.Scene({triggerElement: "#cap1-p2", duration: 400, triggerHook: "onLeave"})
	.setTween("#cap1-p2 p:nth-child(3)", {opacity: 1, transform: "translatey(00px) rotateX(0grad)"})
	.addTo(control);
