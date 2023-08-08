import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Korcat from './components/Korcat';
import Morpheme from './components/Morpheme';
import MyNavbar from './components/Navbar';

function App() {
	return (
		<Router>
			<MyNavbar />

			<br></br>
			<br></br>
			<br></br>
			<br></br>
			<br></br>

			<Routes>
				<Route exact path="/" element={<Korcat />} />
				<Route path="/cohesion" element={<Korcat />} />
				<Route path="/morpheme" element={<Morpheme />} />
			</Routes>
		</Router>
	);
}

export default App;
