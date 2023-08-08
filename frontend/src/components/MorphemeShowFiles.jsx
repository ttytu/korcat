import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function MorphemeShowFiles() {
	const [files, setFiles] = useState([]);
	const [error, setError] = useState(null);
	const [selectedTraits, setSelectedTraits] = useState([]);

	useEffect(() => {
		async function fetchFiles() {
			try {
				const response = await fetch('http://165.246.44.238:8000/file/morpheme');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const files = await response.json();
				setFiles(files);
			} catch (error) {
				setError(error);
			}
		}
		fetchFiles();
	}, []);

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<>
			{files.length > 0 ? (
				<Accordion defaultActiveKey="0" className="my-accordion" flush>
					{files.map((file) => (
						<Accordion.Item eventKey={file._id} key={file._id}>
							<Accordion.Header>
								<Badge pill bg="dark" text="light">
									{file._id.slice(0, -14)}
								</Badge>
								&nbsp;&nbsp;
								{file.filename}
							</Accordion.Header>
							<Accordion.Body>
								<div className='row row-cols-1 row-cols-md-2'>
									<div className='col file-contents'>
										{file.contents}
										<hr />
									</div>

									<div className='col'>
										<div className='results-table'>
											{file.results}
										</div>
									</div>
								</div>
							</Accordion.Body>
						</Accordion.Item>
					)).reverse()}
				</Accordion>
			) : (
				<p>No files found.</p>
			)}
		</>
	);
}

export default MorphemeShowFiles;
