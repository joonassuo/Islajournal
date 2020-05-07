import React from "react";
import "./publicationView.css";

const PublicationView = (props) => {
	return (
		<div className="publication-view">
			<div className="pview-title-container">
				<div id="pview-creator">{props.p.creator}</div>
				<div id="pview-title">{props.p.title}</div>
			</div>
			<div className="pview-content-container">
				{props.p.pictures.map((pic, index) => {
					return (
						<img
							src={pic}
							id={"pview-image" + index}
							className="pview-image"
							alt="pview"
						/>
					);
				})}
			</div>
		</div>
	);
};

export default PublicationView;
