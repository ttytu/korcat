import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navbar, Button, Offcanvas, Nav, Dropdown, Container } from 'react-bootstrap';
import './App.css';
import Korcat from './components/Korcat';
import MyNavbar from './components/Navbar';

function App() {
	return (
		<Router>
			<MyNavbar />

			<Routes>
				<Route exact path="/" element={<Korcat />} />
			</Routes>

		</Router>
	);
}

export default App;
