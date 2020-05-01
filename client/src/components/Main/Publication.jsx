import React from "react";

const Publication = (props) => {
	const style = {
		position: "absolute",
		top: props.coords.y + "%",
		left: props.coords.x + "%",
	};
	return (
		<div className="publication" style={style}>
			<img src={props.p.pictures[0]} alt="test" id="pub-image" />
			<div id="pub-title">{props.p.title}</div>
		</div>
	);
};

export default Publication;
