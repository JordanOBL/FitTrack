import './index.css';

import ClassGrid from './components/ClassGrid';
import Dropdown from './components/Dropdown';
import { GridLoader } from 'react-spinners';
import useFetchClasses from './hooks/useFetchClasses';

function App() {
	const mockClassTypes = ['yoga', 'swimming', 'strength', 'cycling'];
	const {
		loading,
    error,
		filteredClasses,
		setClassType,
		classType,
	
	} = useFetchClasses();
	return (
		<div className="container">
			{loading && <GridLoader/>}
			{error && <p className="error">{error}</p>}
			<h1 className="text-orange-500 text-4xl">FIT TRACK</h1>
			<Dropdown
				classTypes={mockClassTypes}	
				setClassType={setClassType}
			/>
			<h2>{`Showing results for ${classType} classes`}</h2>
			<ClassGrid classes={filteredClasses}  />
		</div>
	);
}

export default App;
