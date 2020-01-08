import React, { useState, useEffect } from "react";

//create your first component
export let Home = () => {
	const [state, setState] = useState([]);

	useEffect(() => {
		fetch("https://devtest.equisolve-dev.com/ ")
			.then(response => {
				//console.log(resp.ok); // will be true if the response is successfull
				//console.log(resp.status); // the status code = 200 or code = 400 etc.
				//console.log(resp.text()); // will try return the exact result as string
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(list => {
				setState(
					list.map(item => ({
						date: item.published_at,
						title: item.title
					}))
				);

				console.log(list);
			})
			.catch(error => {
				//error handling
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	return (
		<div>
			<ul>
				{state
					.sort((a, b) => {
						let c = new Date(a.date);
						let d = new Date(b.date);
						return d - c;
					})
					.map((item, index) => {
						return (
							<li
								key={index}
								className="list-group-item bg-light d-flex justify-content-between align-items-center">
								<span>{item.date}</span>
								<span>{item.title}</span>
							</li>
						);
					})}
			</ul>
		</div>
	);
};
