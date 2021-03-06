function animaciones(){
	var control = new ScrollMagic.Controller({container: "#cap1"});

	new ScrollMagic.Scene({
		triggerElement: "#cap1-p1", duration: "70%", triggerHook: "onLeave"
	})
	.setTween("#cap1 .capitulo", {opacity: 0})
	.addTo(control);

	new ScrollMagic.Scene({
		triggerElement: ".separar", duration: 300, triggerHook: "onEnter"
	})
	.setTween("#cap1-p1 p", {opacity: 1, transform: "scale(1) rotateY(0grad)"})
	.addTo(control);

	new ScrollMagic.Scene({
		triggerElement: "#cap1-p2", duration: "150%", triggerHook: "onEnter"
	})
	.setTween("#avion", {transform: "translateX(120vw)"})
	.addTo(control);

	new ScrollMagic.Scene({
		triggerElement: "#retratos", duration: 300, triggerHook: 0.7
	})
	.setTween(".t2", {opacity: 1, transform: "translatey(0px) rotateX(0grad)"})
	.addTo(control);

	new ScrollMagic.Scene({triggerElement: ".t1", triggerHook: 0.2})
	.setClassToggle("#retratos div", "anim")
	.addTo(control);

	new ScrollMagic.Scene({triggerElement: "#cap1-p3 h1"})
	.setClassToggle("#cap1-p3 h1", "anim")
	.addTo(control);

	new ScrollMagic.Scene({triggerElement: "#cap1-p3", duration: "120%"})
	.setClassToggle("#cap1-p3", "actAudio")
	.addTo(control);

	var imgs = $(".contenedor>img", "#cap1-p3")
	imgs.push($("contenedor>.tuerca", "#cap1-p3")[0])
	for (var i = 0; i < imgs.length; i++) {
		new ScrollMagic.Scene({
			triggerElement: "#cap1-p3 .trig" +  (i+1),
			duration: "150px",
			triggerHook: 0.7
		})
		.setClassToggle("#cap1-p3 .targ" + (i+1), "mostrar")
		.addTo(control);
	}

	var chats = [$(".chat", "#d1"), $(".chat", "#d2")]
			controlChat = []
			controlChat[0] = new ScrollMagic.Controller({container: "#d1"})
			controlChat[1] = new ScrollMagic.Controller({container: "#d2"})

	for (var i = 0; i < 2; i++) {

		for (var j = 0; j < chats[i].length; j++) {
			new ScrollMagic.Scene({
				triggerElement: chats[i][j],
				triggerHook: 0.5,
				duration: 0
			})
			.setClassToggle(chats[i][j], "mostrar")
			.addTo(controlChat[i])
		}
	}

	var pElem = $("p", "#learning"),
			pTrg = $(".trgP", "#learning")
			controlFinal = new ScrollMagic.Controller({container: "#learning"})

		for (var i = 0; i < pElem.length; i++) {
			new ScrollMagic.Scene({
				triggerElement: pTrg[i],
				triggerHook: 1,
				duration: 300
			})
			.setTween(pElem[i], {transform: "scale(1)", opacity: 1})
			.addTo(controlFinal)
		}
}
