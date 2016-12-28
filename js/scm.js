var control = new ScrollMagic.Controller({container: "#cap1"});

var scene = new ScrollMagic.Scene({triggerElement: "#trig", duration: 200})
					// animate color and top border in relation to scroll position
					.setTween("img:first", {filter: "brigthness(0%)"})
					.addTo(control);
