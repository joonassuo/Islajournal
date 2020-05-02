import React from "react";
import "./publicationView.css";

const PublicationView = (props) => {
	const getStyle = () => {
		return {
			left: 5 + Math.random() * 50,
			bottom: 6 + Math.random() * 25,
		};
	};

	return (
		<div className="publication-view">
			<div id="pview-title">{props.p.title}</div>
			{props.p.pictures.map((pic, index) => {
				let random = getStyle();
				return (
					<img
						src={pic}
						id={"pview-image" + index}
						className="pview-image"
						alt="shit"
						style={{
							display: "block",
							height: "40vh",
							"margin-left": random.left + "%",
							"margin-bottom": random.bottom + "em",
						}}
					/>
				);
			})}
		</div>
	);
};

export default PublicationView;
