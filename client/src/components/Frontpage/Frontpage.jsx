import React, { useState } from "react";
import "./frontpage.css";
import { Redirect } from "react-router-dom";

const Frontpage = () => {
	const [isClicked, setIsclicked] = useState(false);

	return isClicked ? (
		<Redirect to="/main" />
	) : (
		<div>
			<div className="frontpage">
				<div
					className="title-container"
					onClick={() => setIsclicked(true)}
				>
					<div id="title">ISLA Journal</div>
				</div>
			</div>
		</div>
	);
};

export default Frontpage;
