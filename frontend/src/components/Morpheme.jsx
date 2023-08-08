import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import React from 'react';

import MorphemeAddFile from './MorphemeAddFile';
import MorphemeShowFiles from './MorphemeShowFiles';

function Morpheme() {
	return (
		<Container fluid>
			<div style={{ marginTop: "6em" }}>
				<Row className="justify-content-center" style={{ marginTop: "7em" }}>
					<Col xs={12} md={6} className="addfile">
						<h5 className='text-center headings'>형태소 분석</h5>
						<MorphemeAddFile />
					</Col>
				</Row>

				<Row className="justify-content-center" style={{ marginTop: "5em" }}>
					<Col className='showfiles'>
						<h5 className='text-center headings'>Process Result</h5>
						<Card border="dark">
							<Card.Body>
								<MorphemeShowFiles />
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		</Container>
	);
}

export default Morpheme;