import React, { useState, useRef, useEffect } from 'react';
import { BASE_URL, BLOCKCHAIN, NETWORK_NAME } from '../api/Api';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Chqck for getUserMedia() API availability in current browser
function hasGetUserMedia() {
	return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function wait(delayInSec) {
	return new Promise((resolve) => setTimeout(resolve, delayInSec * 1000));
}

interface ICreationVideo {
	dispatch: React.Dispatch<any>;
}

type Ct = 'video/mp4' | 'image/jpeg' | 'image/gif' | 'image/png';

export const CreationVideo = ({ dispatch }: ICreationVideo) => {
	const videoRef = useRef(null);
	const mediaRef = useRef(null);

	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [recorder, setRecorder] = useState<null | MediaRecorder>(null);
	const [recorderState, setRecorderState] = useState<'recording' | 'inactive'>('inactive');
	const [video, setVideo] = useState<null | Blob>(null);
	const [videoApproved, setVideoApproved] = useState<boolean>(false);

	// Params for signedUrlData query.
	// Maybe not necessary use useState for them
	const [rid, setRid] = useState<string>(uuidv4());
	const [filename, setFilename] = useState<string>('MyVideo.mp4');
	const [ct, setCt] = useState<Ct>('video/mp4');

	const [signedUrlData, setSignedUrlData] = useState(null);

	// Gets signedUrlData
	useEffect(() => {
		const config = {
			method: 'get',
			url: `${BASE_URL}/api/${BLOCKCHAIN}/${NETWORK_NAME}/getSignedUrl?rid=${rid}&filename=${filename}&ct=${ct}`
			// headers: {
			// 	origin: 'imma_postman',
			// 	'Content-Type': 'video/mp4'
			// }
		};

		axios(config)
			.then((response) => {
				setSignedUrlData(response.data.results);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		if (stream) {
			const recorder: MediaRecorder = new MediaRecorder(stream);

			setRecorder(recorder);
		}
	}, [stream]);

	useEffect(() => {
		if (videoApproved && video) {
			dispatch({ type: 'SET_VIDEO', value: video });
		}
	}, [videoApproved]);

	const createVideo = (): void => {
		if (!hasGetUserMedia()) {
			alert('getUserMedia() is not supported by your browser');
		}

		// Disables scroll (fixes the screen)
		const htmlEl = document.documentElement;
		htmlEl.classList.add('is-locked');

		setIsModalOpened(true);

		const getMedia = async (constraints) => {
			const video: HTMLVideoElement = mediaRef.current;

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

		// Options for media stream
		const hdConstraints = {
			audio: true,
			video: { width: { min: 1280 }, height: { min: 720 }, facingMode: 'user' }
		};

		getMedia(hdConstraints);
	};

	const handleRecord = (): void => {
		// Function to record a video useing getUserMedia API
		function startRecording(recorder: MediaRecorder, lengthInSec: number): Promise<Blob[]> {
			const data: Array<null | Blob> = [];

			recorder.ondataavailable = (event) => data.push(event.data);

			const stopped = new Promise((resolve, reject) => {
				recorder.onstop = () => resolve(data);
				recorder.onerror = (event) => reject(event);
			});

			if (recorder.state === 'recording') {
				recorder.stop();
				setRecorderState('inactive');

				return Promise.all([stopped]).then(() => data);
			}

			recorder.start();
			setRecorderState('recording');

			const recorded = wait(lengthInSec).then(
				() => recorder.state == 'recording' && recorder.stop()
			);

			return Promise.all([stopped, recorded]).then(() => data);
		}

		// Blob array with recorded video
		// (60 * 5 means that max video length is 5 minutes)
		const videosArr: Promise<Blob[]> = startRecording(recorder, 60 * 5);

		videosArr.then((videos) => setVideo(videos[0]));
	};

	const closeVideoModal = (): void => {
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

	const discardVideo = (): void => {
		if (video) {
			setVideo(null);
		} else if (recorderState === 'recording') {
			recorder.stop();
			setRecorderState('inactive');
		}
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
								onClick={closeVideoModal}
							></button>
						</div>
						<video
							className="video-modal__video"
							width="540"
							height="660"
							autoPlay={true}
							ref={mediaRef}
							style={video ? { display: 'none' } : { display: 'block' }}
						></video>
						<video
							className="video-modal__video"
							width="540"
							height="660"
							autoPlay={true}
							src={video ? URL.createObjectURL(video) : null}
							ref={videoRef}
							style={video ? { display: 'block' } : { display: 'none' }}
							onEnded={() => videoRef.current.play()}
						>
							Your browser doesn't support video tag
						</video>
						<div className="video-modal__control">
							{video ? (
								<>
									<button
										type="button"
										className="video-modal__control-btn video-modal__control-btn_approve"
										onClick={() => setVideoApproved(true)}
									>
										<svg
											width="28"
											height="20"
											viewBox="0 0 28 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M1 7.06488L11.1774 18L27 1"
												stroke="white"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									</button>
									<button
										type="button"
										className="video-modal__control-btn video-modal__control-btn_refuse"
										onClick={discardVideo}
									>
										<svg
											width="23"
											height="23"
											viewBox="0 0 23 23"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M1 1L22 22M22 1L1 21.9996"
												stroke="white"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									</button>
								</>
							) : (
								<>
									<button
										type="button"
										className="video-modal__control-btn video-modal__control-btn_record"
										aria-label={
											recorderState === 'recording' ? 'stop' : 'record'
										}
										onClick={handleRecord}
										disabled={stream ? false : true}
									>
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle
												cx="12.1839"
												cy="11.8245"
												r="11.389"
												fill={
													recorderState === 'recording'
														? '#F00000'
														: '#D6FF7E'
												}
											/>
										</svg>
									</button>
									<button
										type="button"
										className="video-modal__control-btn video-modal__control-btn_discard"
										aria-label="discard"
										onClick={discardVideo}
										disabled={stream ? false : true}
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
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="bg-blur" style={!isModalOpened ? { display: 'none' } : null}></div>
		</>
	);
};
