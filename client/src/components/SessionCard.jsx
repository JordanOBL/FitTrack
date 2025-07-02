import React from 'react';

const SessionCard = ({ session }) => {
	const [isRegistered, setIsRegistered] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [participantCount, setParticipantCount] = React.useState(
		session.participants
	);

	const availableSlots = session.max_participants - participantCount;

	async function register() {
		if (isRegistered || availableSlots <= 0) return;

		try {
			setLoading(true);
			const response = await fetch('http://localhost:3000/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ sessionId: session.id }),
			});

			if (response.status === 201) {
				setIsRegistered(true);
				setParticipantCount((prev) => prev + 1);
			}
		} catch (err) {
			console.error('Registration error:', err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="h-full w-full bg-white shadow p-4 rounded-lg flex flex-col items-center my-2 border border-gray-200">
			<h2 className="text-xl font-semibold text-blue-600">
				{session.classType}
			</h2>
			<p className="text-gray-700">Date: {session.date}</p>
			<p className="text-gray-700">Available Slots: {availableSlots}</p>
			<p className="text-gray-700">Age Group: {session.ages}</p>
			<button
				onClick={register}
				disabled={isRegistered || availableSlots <= 0 || loading}
				className={`mt-3 px-4 py-2 rounded w-full text-center ${
					isRegistered
						? 'bg-green-500 text-white cursor-default'
						: availableSlots <= 0
						? 'bg-gray-400 text-white cursor-not-allowed'
						: 'bg-blue-500 hover:bg-blue-600 text-white'
				} ${loading ? 'opacity-50 cursor-wait' : ''}`}>
				{loading
					? 'Registering...'
					: isRegistered
					? 'Registered'
					: availableSlots <= 0
					? 'Full'
					: 'Register'}
			</button>
		</div>
	);
};

export default SessionCard;
