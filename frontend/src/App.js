import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Korcat from './components/Korcat';
import MyNavbar from './components/Navbar';
import Container from 'react-bootstrap/Container';

function App() {
	return (
		<Router>
			<MyNavbar />

			<Routes>
				<Route path="/" element={<Navigate to="/cohesion" />} />
				<Route path="/cohesion" element={<Korcat />} />
				<Route path="/morpheme" element={<Korcat />} />
			</Routes>

			<footer className="footer">
				<Container fluid>
					<Row className="justify-content-center">
						<Col style={{padding: "17px", paddingTop: "0"}}>
							<Card border="dark" id="footer-card">
								<Card.Body>
									<Container fluid style={{padding: "20px", paddingBottom: "5px"}}>
										<p>{new Date().getFullYear()} INHA KDD Korcat <a href="https://github.com/ttytu/korcat">github.com/ttytu/korcat</a></p>
									</Container>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</footer>
		</Router>
	);
}

export default App;
