import React from "react";
import "./publicationView.css";

const PublicationView = (props) => {
	const getStyle = () => {
		return {
			left: Math.random() * 30,
			bottom: Math.random() * 30,
		};
	};

	return (
		<div className="publication-view">
			<div className="pview-title-container">
				<div id="pview-creator">{props.p.creator}</div>
				<div id="pview-title">{props.p.title}</div>
			</div>
			<div className="pview-content-container">
				{props.p.pictures.map((pic, index) => {
					let random = getStyle();
					return (
						<img
							src={pic}
							id={"pview-image" + index}
							className="pview-image"
							alt="shit"
							/* style={{
								"margin-left": random.left + "%",
								"margin-bottom": random.bottom + "%",
							}} */
						/>
					);
				})}
			</div>
		</div>
	);
};

export default PublicationView;
