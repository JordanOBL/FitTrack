import React from 'react';

const useFetchClasses = () => {
	const [classes, setClasses] = React.useState();
	const [filteredClasses, setFilteredClasses] = React.useState();
	const [classType, setClassType] = React.useState('all');
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState();
	const TTL = 20 * 30 * 1000;

	async function fetchClasses() {
		try {
			setLoading(true);
			const currentTime = Date.now();
			let classCache =
				JSON.parse(localStorage.getItem('classCache')) || {};
			//if classCache alrady has classes for user defined classtype && its not stale
			// eslint-disable-next-line no-undef
			if (classCache && currentTime - classCache['timeframe'] < TTL) {
				setClasses([...classCache['data']]);
				
				setLoading(false);
				return;
			}

			const response = await fetch('http://localhost:3000/');

			console.log(response);
			if (response.ok) {
				const data = await response.json();
				console.debug('data from server', data);

				classCache['data'] = [...data.classes];
				classCache['timeframe'] = currentTime;
				localStorage.setItem('classCache', JSON.stringify(classCache));
				setClasses([...data.classes]);
			
				setLoading(false);
			}
		} catch (err) {
			console.log('error caught from fetchData hook', err);
			setError(err);
		}
	}
	React.useEffect(() => {
		fetchClasses();
	}, []); // only run once on mount

	React.useEffect(() => {
		if (!classes) return;

		if (classType === 'all') {
			setFilteredClasses([...classes]);
		} else {
			setFilteredClasses(
				classes.filter(
					(session) =>
						session.classType.toLowerCase() ===
						classType.toLowerCase()
				)
			);
		}
	}, [classType, classes]);


	return {
		classType,
		setClassType,
		loading,
		error,
		classes,
		filteredClasses,
	};
};

export default useFetchClasses;
