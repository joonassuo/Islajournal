import React from "react";

const Publication = (props) => {
	const style = {
		position: "absolute",
		top: props.coords.y + "%",
		left: props.coords.x + "%",
	};

	return (
		<div className="publication" id={props.p._id} style={style}>
			<img
				src={props.p.pictures[0]}
				alt="test"
				id="pub-image"
				onClick={() => props.getPublication(props.p._id)}
			/>
			<div id="pub-creator">{props.p.creator}</div>
			<div id="pub-title">{props.p.title}</div>
		</div>
	);
};

export default Publication;
