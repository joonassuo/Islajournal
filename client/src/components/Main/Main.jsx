import React, { useState, useEffect } from "react";
import "./main.css";
import axios from "axios";
import Publication from "./Publication";
import PublicationView from "../PublicationView/PublicationView";

const Main = () => {
	const [publications, setPublications] = useState([]);
	const [coords, setCoords] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [viewStory, setViewStory] = useState(false);
	const [activePublication, setActivePublication] = useState({});

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
					y: Math.random() * 60 + 10,
				};
				overlapping = false;

				for (let i = 0; i < coordsArray.length; i++) {
					if (
						Math.abs(coordsArray[i].x - coords.x) < 10 &&
						Math.abs(coordsArray[i].y - coords.y < 10)
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

	// GET PUBLICATION FROM DB WITH ID
	const getPublication = (id) => {
		axios
			.get("/api/publications/" + id)
			.then((res) => {
				setActivePublication(res.data);
				setViewStory(true);
			})
			.catch((err) => console.log(err));
	};

	return !isLoaded ? (
		<div>LOADING</div>
	) : viewStory ? (
		<PublicationView p={activePublication} setView={setViewStory} />
	) : (
		<div className="mainPage">
			<div id="logo-container">
				<div id="logo-title">ISLA Journal</div>
				<div id="logo-legend">issue two</div>
			</div>
			<div className="links-container">
				<div className="bottom-links" id="contributors">
					Contributors
				</div>
				<div className="bottom-links" id="about">
					About
				</div>
				<div className="bottom-links" id="contact">
					Contact
				</div>
			</div>
			{publications.map((p, index) => {
				return (
					<Publication
						p={p}
						coords={coords[index]}
						getPublication={getPublication}
					/>
				);
			})}
			<div className="info-container">
				<div id="info-title">Isla WHO?</div>
				<div id="info-text">
					ISLA Journal (Ongoing Perceptions of Womanhood) is a fashion
					zine by photographer Aya Brace and stylist Sanna Silander
					founded in 2019.
					<br />
					<br />
					For issue two we created a website and invited contributors
					to continue to discuss perceptions through the theme HOME.
				</div>
				<div id="info-copyright">Copyright 2020 ISLA Journal</div>
			</div>
		</div>
	);
};

export default Main;
