import React, { useState, useEffect } from "react";
import "./main.css";
import axios from "axios";
import Publication from "./Publication";

const Main = () => {
	const [publications, setPublications] = useState([]);
	const [coords, setCoords] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		axios.get("/api/publications").then((res) => {
			setPublications(res.data);

			const coordsArray = [];
			let coords = {};
			let overlapping = false;
			const protection = 100000;
			let counter = 0;

			while (
				coordsArray.length < res.data.length &&
				counter < protection
			) {
				coords = {
					x: Math.random() * 70,
					y: Math.random() * 70,
				};
				overlapping = false;

				for (let i = 0; i < coordsArray.length; i++) {
					if (
						Math.abs(coordsArray[i].x - coords.x) < 20 &&
						Math.abs(coordsArray[i].y - coords.y < 20)
					) {
						overlapping = true;
						break;
					}
				}

				if (!overlapping) {
					coordsArray.push(coords);
				}
				counter++;
			}
			setCoords(coordsArray);
			setIsLoaded(true);
		});
	}, []);

	return !isLoaded ? (
		<div>LOADING</div>
	) : (
		<div>
			<div className="pub-container">
				{publications.map((p, index) => {
					return <Publication p={p} coords={coords[index]} />;
				})}
			</div>
			<div id="logo">ISLA Journal</div>
			<button onClick={() => console.log(coords)}>asdasdasdasd</button>
		</div>
	);
};

export default Main;
