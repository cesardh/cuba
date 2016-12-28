var control = new ScrollMagic.Controller({container: "#cap1"});

var scene = new ScrollMagic.Scene({triggerElement: "#trig", duration: 200})
					// animate color and top border in relation to scroll position
					.setTween("img:first", {opacity: 0})
					.addTo(control);

var scene2 = new ScrollMagic.Scene({triggerElement: "#trig", duration: 300})
					// animate color and top border in relation to scroll position
					.setTween("#pin", {transform: "translateX(100px)"})
					.addTo(control);
