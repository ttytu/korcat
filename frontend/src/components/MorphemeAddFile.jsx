import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


function MorphemeAddFile() {
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [uploadInProgress, setUploadInProgress] = useState(false);

	const handleFileSelect = (event) => {
		setSelectedFiles(Array.from(event.target.files));
	};

	const handleUpload = async (event) => {
		event.preventDefault(); 	// prevent default form submission
		setUploadInProgress(true); 	// set state to indicate upload is in progress

		const formData = new FormData();
		selectedFiles.forEach((file) => {
			formData.append("files", file);
		});

		try {
			const response = await fetch("http://165.246.44.238:8000/file/morpheme", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();
			console.log(data);

			window.location.reload(); 	// reload the page after upload completes
		} catch (error) {
			console.error(error);
		} finally {
			setUploadInProgress(false); // reset state to indicate upload is complete
		}
	};

	return (
		<div>
			<form onSubmit={handleUpload}>
				<InputGroup className="inputgroup">
					<Form.Control
						className="rounded-start-pill border-dark"
						type="file"
						id="fileInput"
						aria-describedby="basic-addon2"
						multiple
						accept=".txt"
						onChange={handleFileSelect}
					/>
					{!uploadInProgress && (
						<Button
							className="rounded-end-pill"
							variant="dark"
							id="button-addon2"
							type="submit"
						>
							Upload File
						</Button>
					)}
					{uploadInProgress && (
						<Button
							className="rounded-end-pill"
							variant="dark"
							id="button-addon2"
							type="submit"
							disabled
						>
							Upload File
							<Spinner
								className="ms-2"
								animation="border"
								role="status"
								size="sm"
							/>
						</Button>
					)}
				</InputGroup>
			</form>
		</div>
	);
};

export default MorphemeAddFile;
