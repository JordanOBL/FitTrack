import React from 'react';
import SessionCard from './SessionCard';

const ClassGrid = ({ classes }) => {
	console.log(classes);

	return (
		<div className="container w-screen flex flex-col items-center bg-black">
			<div className=" w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-black gap-4">
				{!classes && <p>No classes found!</p>}
				{classes &&
					classes.map((session, idx) => {
						return (
							<SessionCard
								key={idx}
								session={session}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default ClassGrid;
