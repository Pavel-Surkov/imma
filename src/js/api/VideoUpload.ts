import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const axios_call = async (payload) => {
	return await axios(payload)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.log(error);
			return null;
		});
};

const getSignedUrl = async (rid, filename, ct) => {
	try {
		const params = {
			rid,
			filename,
			ct
		};
		var config = {
			method: 'get',
			url: 'https://api.imma.club/api/ethereum/rinkeby/getSignedUrl',
			headers: {
				'Content-Type': 'text/plain'
			},
			params
		};

		return await axios_call(config);
	} catch (error) {
		console.log(error);
	}
};

const downloadDemoFile = async (type, url) => {
	try {
		var config = {
			responseType: 'blob', // notice blob
			method: 'get',
			url,
			headers: {}
		};
		const response = await axios_call(config);
		const blob = response.data;
		//or you can convert any other bytes to blob
		// const blob2 = new Blob([blob], { type });
		return blob;
	} catch (error) {
		console.log(error);
	}
};

const uploads3 = async (url, ct, blob) => {
	try {
		const config = {
			method: 'put',
			url,
			headers: {
				'Content-Type': ct
			},
			onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
			data: blob
		};

		return await axios_call(config);
	} catch (error) {
		console.log(error);
	}
};

const downloadTest = async (url) => {
	try {
		const config = {
			method: 'get',
			url
		};
		return await axios_call(config);
	} catch (error) {
		console.log(error);
	}
};

export const UploadTest = async () => {
	try {
		const files = {
			signature: {
				filename: 'mySignature.png',
				ct: 'image/png',
				url: 'https://s3.eu-central-1.amazonaws.com/kobodo.co/test_files/mySignature.png'
			},
			video: {
				filename: 'myVideo.mp4',
				ct: 'video/mp4',
				url: 'https://s3.eu-central-1.amazonaws.com/kobodo.co/test_files/myVideo.mp4'
			}
		};

		const rid = uuidv4();

		console.log('rid: ', rid);

		for (const [key, value] of Object.entries(files)) {
			console.log('uploading : ', key);

			const filename = value.filename;
			const ct = value.ct;
			const url = value.url;
			const blob = await downloadDemoFile(ct, url);
			const signed_respone = await getSignedUrl(rid, filename, ct);
			const results = signed_respone.data.results;
			const uploadURL = results.uploadURL;
			const downloadURL = results.downloadURL;
			const upload_reponse = await uploads3(uploadURL, ct, blob);

			console.log('upload_reponse: ', upload_reponse);

			const download_response = await downloadTest(downloadURL);

			const sum = {
				upload_reponse: upload_reponse.status,
				download_response: download_response.status
			};

			console.log('finished uploading: ', key);
			console.log(sum);
			console.log('paste in browser for additional test: ');
			console.log(downloadURL);
		}
	} catch (error) {
		console.log(error);
	}
};
