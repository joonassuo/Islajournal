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
	const [viewContributors, setViewContributors] = useState(false);
	const [viewAbout, setViewAbout] = useState(false);
	const [viewContact, setViewContact] = useState(false);
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
					x: Math.random() * 80,
					y: Math.random() * 60,
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

	// TOGGLE COMPONENT VIEWS
	const togglePage = (page) => {
		switch (page) {
			case "about":
				setViewAbout(true);
				setViewContributors(false);
				setViewStory(false);
				setViewContact(false);
				break;
			case "story":
				setViewAbout(false);
				setViewContributors(false);
				setViewStory(true);
				setViewContact(false);
				break;
			case "contributors":
				setViewAbout(false);
				setViewContributors(true);
				setViewStory(false);
				setViewContact(false);

				break;
			case "contact":
				setViewAbout(false);
				setViewContributors(false);
				setViewStory(false);
				setViewContact(true);
				break;
			case "home":
				setViewAbout(false);
				setViewContributors(false);
				setViewStory(false);
				setViewContact(false);
				break;
			default:
				break;
		}
	};

	return !isLoaded ? (
		<div>LOADING</div>
	) : (
		<div className="main-page">
			<div className="top-container">
				<div id="logo-container">
					<div id="logo-title" onClick={() => togglePage("home")}>
						ISLA Journal
					</div>
					<div id="logo-legend">issue two</div>
				</div>
				<div className="links-container">
					<div
						className="links"
						id="contributors"
						onClick={() => togglePage("contributors")}
					>
						Contributors
					</div>
					<div
						className="links"
						id="about"
						onClick={() => togglePage("about")}
					>
						About
					</div>
					<div
						className="links"
						id="contact"
						onClick={() => togglePage("contact")}
					>
						Contact
					</div>
				</div>
			</div>
			{viewStory ? (
				<PublicationView p={activePublication} setView={setViewStory} />
			) : viewContributors ? (
				<div className="contributors-container">
					<div id="contributors-title">Contributors</div>
					<div id="contributors-list">
						{publications
							.sort((a, b) => (a.creator > b.creator ? 1 : -1))
							.map((p, index) => {
								return <div id="contributor">{p.creator}</div>;
							})}
					</div>
				</div>
			) : viewAbout ? (
				<div className="about-container">
					<div id="about-title">About</div>
					<div id="about-text">
						ISLA Journal (Ongoing Perceptions of Womanhood) is a
						fashion zine by photographer Aya Brace and stylist Sanna
						Silander founded in 2019.
						<br />
						<br />
						What started as a prjoect for the love of print, turned
						into a website for issue two when the whole world was
						social distancing. We invited contributors to continue
						to discuss perceptions through the theme HOME.
					</div>
				</div>
			) : viewContact ? (
				<div>contact</div>
			) : (
				<div className="main-content">
					<div className="publications-container">
						{publications.map((p, index) => {
							return (
								<Publication
									p={p}
									coords={coords[index]}
									getPublication={getPublication}
								/>
							);
						})}
					</div>
					<div className="info-container">
						<div id="info-title">Isla WHO?</div>
						<div id="info-text">
							ISLA Journal (Ongoing Perceptions of Womanhood) is a
							fashion zine by photographer Aya Brace and stylist
							Sanna Silander founded in 2019.
							<br />
							<br />
							For issue two we created a website and invited
							contributors to continue to discuss perceptions
							through the theme HOME.
						</div>
						<div id="info-copyright">
							Copyright 2020 ISLA Journal
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Main;
