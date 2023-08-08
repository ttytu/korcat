import React, { useState, useEffect } from 'react';
import { Navbar, Button, Offcanvas, Nav, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

function MyNavbar() {
	const [navbarHeight, setNavbarHeight] = useState('90px');
	const [navbarFontSize, setNavbarFontSize] = useState('2.5rem');

	const location = useLocation();
	const isMediumScreen = useMediaQuery({ maxWidth: 991 }); // Set the breakpoint for medium screen (991px)

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.pageYOffset;
			const newNavbarHeight = (90 - Math.min(scrollTop, 50)) + 'px';
			setNavbarHeight(newNavbarHeight);

			const newNavbarFontSize = Math.max((2.5 - (scrollTop * 0.01)), 1.2) + 'rem';
			setNavbarFontSize(newNavbarFontSize);
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<>
			<Navbar className='text-center' expand="lg" fixed="top" style={{ height: navbarHeight, paddingBottom: '10px' }}>
				<Navbar.Brand className='mx-auto' style={{ fontSize: navbarFontSize }} href="">
					KorCAT
				</Navbar.Brand>

				{isMediumScreen ? ( // Render as dropdown on medium screen or smaller
					<Dropdown align="end" style={{ position: 'absolute', top: '10px', right: '10px' }}>
						<Dropdown.Toggle variant="secondary" id="dropdown-basic" className='btn-sm' style={{ background: 'white', color: 'black', border: 'None' }}>
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item as={Link} to="/cohesion" active={location.pathname === '/cohesion'}>
								Cohesion
							</Dropdown.Item>
							<Dropdown.Item as={Link} to="/morpheme" active={location.pathname === '/morpheme'}>
								Morpheme
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				) : (
					<Nav className="lg-2" style={{ position: 'absolute', top: '0', right: '10px', minWidth: '200px'}}>
						<Nav.Link as={Link} to="/cohesion" active={location.pathname === '/cohesion'}>
							Cohesion
						</Nav.Link>
						<Nav.Link as={Link} to="/morpheme" active={location.pathname === '/morpheme'}>
							Morpheme
						</Nav.Link>
					</Nav>
				)}
			</Navbar>
		</>
	);
}

export default MyNavbar;
