import cors from 'cors'
import express from 'express'
const classes = [
	{
		id:1,
		classType: 'yoga',
		date: '06/26/2025',
		participants: 0,
		max_participants: 10,
		ages: 'Teens',
	},
	{
		id:2,
		classType: 'yoga',
		date: '06/26/2025',
		participants: 0,
		max_participants: 10,
		ages: 'Teens',
	},
	{
		id:3,
		classType: 'cycling',
		date: '06/25/2025',
		participants: 0,
		max_participants: 10,
		ages: 'Teens',
	},
	{
		id:4,
		classType: 'strength',
		date: '11/30/2025',
		participants: 0,
		max_participants: 10,
		ages: 'Teens',
	},
	{
		id:5,
		classType: 'swimming',
		date: '10/20/2025',
		participants: 0,
		max_participants: 10,
		ages: 'Teens',
	},
];

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) =>
{
    return res.status(200).json({ classes: classes });
});

app.post('/register', (req, res) =>
{
	const { sessionId } = req.body
	const sessionFound = classes.find((s) => s.id === sessionId);
	if (!sessionFound) {
		return res.status(404).json({ message: 'Session not found' });
	}

	if (sessionFound.participants == sessionFound.max_participants)
	{
		return res.status(204).json({success: false, message: 'Class Full'})
	}
	sessionFound.participants += 1 
	return res
		.status(201)
		.json({ success: true, updatedSession: sessionFound });

})
const PORT = 3000;
app.listen(PORT || 3000, () =>
{
    console.log(`listening on oport ${PORT}`)
})