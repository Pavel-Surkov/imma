import React, { useState, useRef } from 'react';

// Chqck for getUserMedia() API availability in current browser
function hasGetUserMedia() {
	return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// function log(msg) {
// 	logElement.innerHTML += msg + '\n';
// }

function wait(delayInMS) {
	return new Promise((resolve) => setTimeout(resolve, delayInMS));
}

// TODO: Add this recording finction to the element
// Function to record a video useing getUserMedia API
function startRecording(stream: MediaStream, lengthInMS: number): Promise<Blob[]> {
	let recorder: MediaRecorder = new MediaRecorder(stream);
	let data: Array<null | Blob> = [];

	recorder.ondataavailable = (event) => data.push(event.data);
	recorder.start();
	// log(recorder.state + ' for ' + lengthInMS / 1000 + ' seconds...');

	let stopped = new Promise((resolve, reject) => {
		recorder.onstop = resolve;
		recorder.onerror = (event) => reject(event);
	});

	let recorded = wait(lengthInMS).then(() => recorder.state == 'recording' && recorder.stop());

	return Promise.all([stopped, recorded]).then(() => data);
}

export const CreationVideo = () => {
	const videoRef = useRef(null);

	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
	const [stream, setStream] = useState<MediaStream | null>(null);

	const createVideo = (): void => {
		if (!hasGetUserMedia()) {
			alert('getUserMedia() is not supported by your browser');
		}

		// Disables scroll (fixes the screen)
		const htmlEl = document.documentElement;
		htmlEl.classList.add('is-locked');

		setIsModalOpened(true);

		const getMedia = async (constraints) => {
			const video: HTMLVideoElement = videoRef.current;

			let stream: null | MediaStream = null;

			try {
				stream = await navigator.mediaDevices.getUserMedia(constraints);

				console.log(stream);

				video.srcObject = stream;

				setStream(stream);
			} catch (err) {
				console.log(err);
			}
		};

		// Options for media
		const hdConstraints = {
			audio: true,
			video: { width: { min: 1280 }, height: { min: 720 }, facingMode: 'user' }
		};

		getMedia(hdConstraints);
	};

	const handleRecord = (): void => {
		// Blob object with recorded video
		const video: Promise<Blob[]> = startRecording(stream, 10000);
	};

	const closeVideo = (): void => {
		// Enables scroll
		const htmlEl = document.documentElement;
		htmlEl.classList.remove('is-locked');

		setIsModalOpened(false);

		if (stream) {
			const streamTracks: Array<MediaStreamTrack> = stream.getTracks();

			streamTracks.forEach((track) => track.stop());
		}

		setStream(null);
	};

	return (
		<>
			<div className="step-wrapper step-wrapper_video">
				<button type="button" className="btn-video" onClick={createVideo}>
					Create a video
				</button>
				<span>
					*there is only an option to shoot something at the moment, there is no option to
					upload anything from the gallery
				</span>
			</div>
			<div className="video-modal" style={!isModalOpened ? { display: 'none' } : null}>
				<div className="video-modal-wrapper">
					<h2 className="title title_size-m video-modal__title">Create a video</h2>
					<div className="video-modal__screen">
						<div className="video-modal__close-wrapper">
							<button
								type="button"
								className="close video-modal__close"
								aria-label="close"
								onClick={closeVideo}
							></button>
						</div>
						<video
							className="video-modal__video"
							width="540"
							height="660"
							autoPlay
							ref={videoRef}
						></video>
						<div className="video-modal__control">
							<button
								type="button"
								className="video-modal__control-btn video-modal__control-btn_record"
								aria-label="record and stop"
								onClick={handleRecord}
							>
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<circle cx="12.1839" cy="11.8245" r="11.389" fill="#D6FF7E" />
								</svg>
							</button>
							<button
								type="button"
								className="video-modal__control-btn video-modal__control-btn_discard"
								aria-label="discard"
							>
								<svg
									width="19"
									height="19"
									viewBox="0 0 19 19"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect
										x="0.852539"
										y="0.862793"
										width="17.9226"
										height="17.9226"
										rx="1.38787"
										fill="#828282"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-blur" style={!isModalOpened ? { display: 'none' } : null}></div>
		</>
	);
};
