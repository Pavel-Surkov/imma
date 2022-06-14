import React, { useReducer, useState, useEffect, useRef } from 'react';
import SignaturePad from 'signature_pad';
import { State, reducer } from '../helpers/creationReducer';
import { CreationStep } from './CreationStep';
import { CreationForm } from './CreationForm';
import { CreationVideo } from './CreationVideo';
import { CreationSubmit } from './CreationSubmit';
import { PriceRadio, BlockchainRadio, SocialRadio } from './CreationRadio';
import { ProgressBar } from './ProgressBar';
import {
  confirmCode,
  sendCode,
  getSignedUrl,
  upload,
  getPreSignRedeemVoucher,
  verifySignature,
  claim_request,
  check_address,
  checkNFT
} from "../helpers/api";
import { v4 as uuidv4 } from "uuid";

export const initialState: State = {
	wallets: {
		originalWallet: {
			walletNumber: '',
			isVerified: false
		},
		creatorWallet: {
			walletNumber: '',
			isVerified: false
		}
	},
	price: {
		isFree: null,
		dollarValue: 391.34,
		ethereumValue: 0.14
	},
	blockchain: null,
	video: null,
	signature: null,
	verification: {
		social: null,
		isVerified: false
	}
};

export const Creation = (props) => {
  const loginWallet = props.loginWallet;
  const api_base_url = props.api_base_url;
  const api_details_ref = props.api_details_ref;
  const session = props.session;
  const ethers = props.ethers;
  const signer = props.signer_ref;
  const creator_ref = props.creator_ref;
  const signRedeemVoucher = props.signRedeemVoucher;
  const claim = props.claim;
  console.log("create: session: ", session);
  const uuid_ = uuidv4();
  const partner_address = '0x0000000000000000000000000000000000000000';
  const [confirmCodeVal, setConfirmCodeVal] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState(<p></p>);
  const [blockchain, setBlockchain] = useState("ethereum");
  const [priceEth, setPriceEth] = useState("");
  const [priceUsd, setPriceUsd] = useState("");
  const [social, setSocial] = useState("social_instagram");
  const [rid, setRid] = useState(uuid_);
  const [partnerAddress, setPartnerAddress] = useState(partner_address);
  const [socialUsername, setSocialUsername] = useState("");
  const [socialCode, setSocialCode] = useState("");

  const [signature, setSignature] = useState(null);
  const [video, setVideo] = useState(null);
  const [price, setPrice] = useState("");
  const [originalNft, setOriginalNft] = useState("");
  const [ipfsCid, setIpfsCid] = useState("");
  const [checkPartnerAddressMsg, setCheckPartnerAddressMsg] = useState(null);
  const [checkOriginalNftMsg, setCheckOriginalNftMsg] = useState(null);

	const signFieldRef = useRef(null);
	const containerRef = useRef(null);

	const [state, dispatch] = useReducer(reducer, initialState);
	const [signatureText, setSignatureText] = useState<string>('Sign here');
	const [signaturePad, setSignaturePad] = useState<SignaturePad | null>(null);

	// const [isFormCompleted, setIsFormCompleted] = useState<boolean>(false);

	useEffect(() => {
		const windowWidth = window.innerWidth;

		if (windowWidth < 768) {
			setSignatureText('Put your signature here');
		} else {
			setSignatureText('Sign here');
		}
	}, [window.innerWidth]);

	// TODO: Save signature when submiting creation form
	// (signaturePad.toDataURL("image/svg+xml"))
	const enableSignaturePad = (): void => {
		const canvas: HTMLCanvasElement = signFieldRef.current;

		// Inits signature pad
		if (!signaturePad) {
      console.log('enable signature pad');

			function resizeCanvas(): void {
				var ratio = Math.max(window.devicePixelRatio || 1, 1);
				canvas.width = canvas.offsetWidth * ratio;
				canvas.height = canvas.offsetHeight * ratio;
				canvas.getContext('2d').scale(ratio, ratio);
			}

			window.onresize = resizeCanvas;
			resizeCanvas();

			const signaturePad = new SignaturePad(canvas, {
				penColor: 'rgb(255, 255, 255)'
			});

			setSignaturePad(signaturePad);
		} else {
			signaturePad.clear();
		}
	};

  const dataURItoBlob = (dataURI) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  const handleSaveSign = (): void => {
    if (signaturePad) {
      const dataURL = signaturePad.toDataURL('image/png');
      const blob = dataURItoBlob(dataURL);
      const resultFile = new File([blob], "signature.png", {type:"image/png"});
      setSignature(resultFile);
		} else {
      console.log('no signature pad');
		}
  }

  useEffect(() => {
    console.log('new signature:');
    console.log(signature);
    if (signature) {
      upload_sign_file();
    }
  }, [signature]);

  useEffect(() => {
    console.log('new video file');
    console.log(state.video);
    if (state.video) {
      setVideo(state.video);
      upload_video_file();
    }
  }, [state.video]);

  const handleClearSign = (): void => {
    if (signaturePad) {
			signaturePad.clear();
		} else {
      console.log('no signature pad');
		}
  }

	const createVideo = (): void => {
		const getMedia = async (constraints) => {
			let stream: null | MediaStream = null;

			try {
				stream = await navigator.mediaDevices.getUserMedia(constraints);

				console.log(stream);
				/* use the stream */
			} catch (err) {
				console.log(err);
				/* handle the error */
			}
		};

		getMedia({ audio: true, video: true });
	};

	const send_code = async (event) => {
    try {
      console.log("in send_code");
      event.preventDefault();
      if (!socialUsername) return alert("no username");
      if (!social) return alert("no social selection");
      const type_ = social.replace("social_", "");
      const username = socialUsername;
      const codeSession = session.current;
      console.log("session: ", session);
      sendCode(api_details_ref.current.api_base_url, codeSession, username, type_, rid);
    } catch (error) {
      console.log(error);
    }
  };

  const confirm_code = async (event) => {
    try {
      console.log("in confirm_code");
      event.preventDefault();
      if (confirmCodeVal) return alert("code already confirm");
      if (!socialCode) return alert("no code");
      const code = parseInt(socialCode);
      const codeSession = session.current;
      const response = await confirmCode(api_details_ref.current.api_base_url, codeSession, code);
      if (response) {
        setConfirmCodeVal(true);
        setConfirmMsg(<p style={{ color: "green" }}>code confirm</p>);
      } else {
        console.log("wrong code");
        setConfirmCodeVal(false);
        setConfirmMsg(<p style={{ color: "red" }}>wrong code</p>);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const get_signed_url = async (key) => {
    try {
      console.log("in get_signed_url");
      let signed_url = null;
      if (key === "video") {
        signed_url = await getSignedUrl(
          api_details_ref.current.api_base_url,
          session.current,
          rid,
          'myvideo.mp4',
          'video/mp4',
          state.video
        );
      }
      if (key === "signature") {
        signed_url = await getSignedUrl(
          api_details_ref.current.api_base_url,
          session.current,
          rid,
          signature.name,
          signature.type,
          signature
        );
      }
      return signed_url;
    } catch (error) {
      console.log(error);
    }
  };

  const upload_video_file = async () => {
    try {
      const key = "video";
      if (!state.video) return alert(`no ${key} file`);
      const signed_url_response = await get_signed_url(key);
      if (!signed_url_response) return alert("failed signing url");
      const download_url = signed_url_response.data.results.downloadURL;
      const upload_url = signed_url_response.data.results.uploadURL;
      console.log("downloadURL: ", download_url);
      console.log("uploadURL: ", upload_url);
      if (key === "video") {
        await upload(upload_url, state.video.type, state.video);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const upload_sign_file = async () => {
    try {
      const key = "signature";
      if (key === "signature") {
        if (!signature) return alert(`no ${key} file`);
      }
      console.log(key);
      const signed_url_response = await get_signed_url(key);
      if (!signed_url_response) return alert("failed signing url");
      const download_url = signed_url_response.data.results.downloadURL;
      const upload_url = signed_url_response.data.results.uploadURL;
      console.log("downloadURL: ", download_url);
      console.log("uploadURL: ", upload_url);
      if (key === "signature") {
        await upload(upload_url, signature.type, signature);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (event) => {
    if (!session.current) {
      loginWallet();
    }
    const id = event.target.id;
    if (["video", "signature"].includes(id)) {
      const value = event.target.files[0];
      console.log("test signature url: ");
      console.log(value);
      if (id === "video") {
        setVideo(value);
      } else {
        setSignature(value);
      }
      return;
    }
    if (id === "original_nft") {
      const value = event.target.value;
      setOriginalNft(value);
      return;
    }
    if (id === "partner_address") {
      const value = event.target.value;
      setPartnerAddress(value);
      return;
    }
    if (id === "blockchain") {
      const value = event.target.value;
      setBlockchain(value);
      return;
    }
    if (id === "social") {
      const value = event.target.value;
      setSocial(value);
      return;
    }
    if (id === "social_username") {
      const value = event.target.value;
      setSocialUsername(value);
      return;
    }
    if (id === "social_code") {
      const value = event.target.value;
      setSocialCode(value);
      return;
    }
  };

  const gatherPreSignedData = ()=>{
    try {
      let price_eth = 0;
      if (priceEth!=''){
        price_eth = parseFloat(priceEth);
      }
      let price = '';
      if (state.price.isFree === true) {
        price = 'price_free';
      } else {
        price = 'price_value';
      }
      const essentials = {
        'creator_address': creator_ref.current,
        'original_nft': originalNft,
        'partner_address': partnerAddress,
        'price': price,
        'price_eth': state.price.ethereumValue,
        'price_usd': state.price.dollarValue,
      }
      const invalid = [];
      for (const [key,value] of Object.entries(essentials)){
        if (!value) invalid.push(`${key}`);
      }
      const response = {
        'essentials': null,
        'valid':false,
        invalid,
      }
      if (invalid.length) return response;
      response.valid = true;
      response.essentials = essentials;
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const handle_create = async (event) => {
    try {
      event.preventDefault();
      console.log("in handle_create");
      const response = gatherPreSignedData();
      if (!response) return alert('error in gather');
      if (!response.valid) return alert('missing data: ' + response.invalid.join(', '));
      console.log(response);
      const presigned_response = await getPreSignRedeemVoucher(
        rid,
        api_details_ref.current.api_base_url,
        session.current,
        response.essentials
      );
      if (!presigned_response) return alert("something went wrong");
      if (presigned_response.status !== 200)
        return alert("status code " + presigned_response.status);
      const results = presigned_response.data.results;
      const signature = await signRedeemVoucher(signer.current,results);
      console.log("signature: ", signature);
      if (!signature) return alert('signature failed');
      console.log('rid: ', rid);
      console.log('session: ', session.current);
      const verify_response = await verifySignature(rid, api_details_ref.current.api_base_url, session.current,signature);
      if (!verify_response) return alert('verify failed');
      setIpfsCid(verify_response.data.results.ipfs_cid);
    } catch (error) {
      console.log(error);
    }
  };

  const handle_claim = async (event) => {
    try {
      event.preventDefault();
      console.log("in handle_claim");
      const ipfs_cid = ipfsCid;
      const claim_request_response = await claim_request(api_details_ref.current.api_base_url, session.current, ipfs_cid);
      if (!claim_request_response) return alert('cliam request failed');
      if (claim_request_response.status!==200) return alert('cliam request failed');
      const results = claim_request_response.data.results;
      const claim_response = await claim(signer.current, ethers,results);
      console.log(claim_response);
    } catch (error) {
      console.log(error);
    }
  };

  const check_address_ = async (event)=>{
    try {
      console.log('in check_address_');
      event.preventDefault();
      const id_ = event.target.id;
      if (id_ === 'check_partner_address') {
        const address = partnerAddress;
        console.log('event: ', event.target);
        console.log('address: ', address);
        const check_response = await check_address(api_details_ref.current.api_base_url, session.current,address);
        if (!check_response) return alert('failed check call');
        if (check_response.status !== 200) return alert('failed check call');
        const check_partner_address = check_response.data.results.valid;
        const check_partner_address_msg = check_partner_address ? <div style={{color:"green"}}>valid</div>:<div style={{color:"red"}}>invalid</div>;
        setCheckPartnerAddressMsg(check_partner_address_msg);
        return;
      }
      return alert('unknown id');
    } catch (error) {
      console.log(error);
    }
  }

  const check_nfta = async (event)=>{
    try {
      console.log('in check_address_');
      event.preventDefault();
      const id_ = event.target.id;
      if (id_==='check_original_nft'){
        const original_nft = originalNft;
        console.log('event: ', event.target);
        console.log('original_nft: ', original_nft);
        const [sc,tokenId] = original_nft.split('/');
        const check_response = await checkNFT(api_details_ref.current.api_base_url, session.current,sc, tokenId);
        if (!check_response) return alert('failed check call');
        if (check_response.status!==200) return alert('failed check call');
        const check_original_nft = check_response.data.results.valid;
        const check_original_nft_msg = check_original_nft?<div style={{color:"green"}}>valid</div>:<div style={{color:"red"}}>invalid</div>;
        setCheckOriginalNftMsg(check_original_nft_msg);
        return;
      }
      return alert('unknown id');
    } catch (error) {
      console.log(error);
    }
  }

	return (
		<section id="creation" className="section creation" ref={containerRef}>
			<div className="section-wrapper creation-wrapper">
				<ProgressBar containerRef={containerRef} state={state} />
				<div className="creation-content">
					<h2 className="title title_size-m creation-title">IMMA NFT creation</h2>
					<CreationStep number="01" title="Add wallet">
						<div className="step-wrapper">
              <div className="step-block__wrapper">
                <form action="" className="form step-block">
                  <h4 className="title title_size-xs step-block__title">Original NFT for your imma NFT to follow</h4>
                  <input
                    className="input step-block__input"
                    type="text"
                    id="original_nft"
                    name="original_nft"
                    onChange={handleChange}
                    required
                  />
                  <button
                    id="check_original_nft"
                    type="submit"
                    className="btn-arrow step-block__submit"
                    onClick={check_nfta}
                  >
                    Confirm
                  </button>
                  {checkOriginalNftMsg}
                </form>
              </div>
              <div className="step-block__wrapper">
                <form action="" className="form step-block">
                  <h4 className="title title_size-xs step-block__title">The imma NFT creator wallet</h4>
                  <input
                    className="input step-block__input"
                    type="text"
      	            id="creator_address"
      	            name="creator_address"
      	            value={creator_ref.current}
      	            disabled
                    required
                  />
                  <button
                    id="check_original_nft"
                    type="submit"
                    className="btn-arrow step-block__submit"
                    onClick={null}
                  >
                    Confirm
                  </button>
                </form>
              </div>
							{state.wallets.customWallet && (
                <div className="step-block__wrapper">
            			<form action="" className="form step-block">
            				<h4 className="title title_size-xs step-block__title">Broke wallet</h4>
            				<input
            					className="input step-block__input"
            					type="text"
        	            id="partner_address"
        	            name="partner_address"
            					value={partnerAddress}
            					onChange={handleChange}
            					required
            				/>
            				<button
                      id="check_partner_address"
            					className="btn-arrow step-block__submit"
            					onClick={check_address_}
            				>
            					Confirm
            				</button>
                    {checkPartnerAddressMsg}
            			</form>
            		</div>
							)}
							{!state.wallets.customWallet && (
								<div className="step-block_add">
									<button
										type="button"
										className="step-block__add-btn"
										onClick={() => dispatch({ type: 'ADD_CUSTOM_WALLET' })}
									>
										<span></span>
										<span></span>
									</button>
									<p className="step-block__add-note">
										*add another wallet (third party, intermediary)
									</p>
								</div>
							)}
						</div>
					</CreationStep>
					<CreationStep number="02" title="Price for the first sell">
						<div className="step-wrapper">
							<PriceRadio id="price" isFree={true} price={state.price} dispatch={dispatch} />
							<PriceRadio
								isFree={false}
								price={state.price}
								dispatch={dispatch}
								input={true}
							/>
						</div>
					</CreationStep>
					<CreationStep number="03" title="Blockchain network">
						<div className="step-wrapper step-wrapper_blockchain">
							<BlockchainRadio
								type="ethereum"
								blockchain={state.blockchain}
								dispatch={dispatch}
							/>
							<BlockchainRadio
								type="polygon"
								blockchain={state.blockchain}
								dispatch={dispatch}
							/>
						</div>
					</CreationStep>
					<CreationStep number="04" title="Create a video">
						<CreationVideo dispatch={dispatch} />
					</CreationStep>
					<CreationStep number="05" title="Your signature">
						<div className="step-wrapper">
							<div className="step-block_sign">
								<div
									className="step-block__sign step-block__sign_active"
									style={
										signaturePad ? { display: 'none' } : { display: 'block	' }
									}
								>
									<svg
										width="97"
										height="218"
										viewBox="0 0 97 218"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M56.8427 181.364C33.5056 150.907 18.3445 111.607 6.02359 75.5246C-0.0176277 57.8325 -2.65165 29.6244 9.00498 13.9995C23.8194 -5.85812 36.3543 36.6261 39.903 45.9817C43.0519 54.2834 46.7392 63.2681 47.0855 72.2722C47.4971 82.9748 49.3052 50.9382 51.3543 40.4255C53.3905 29.9787 55.2271 -1.53383 71.2076 1.0576C93.461 4.66625 95.8718 26.4331 95.8718 44.7621C95.8718 81.0366 74.7178 113.931 60.6372 146.468C53.3586 163.288 46.7623 180.353 37.4637 196.203C33.3042 203.293 28.259 209.779 23.9119 216.734"
											stroke="white"
											strokeLinecap="round"
										/>
									</svg>
								</div>
								<button
									type="button"
									className="step-block__sign-btn"
									aria-label="sign"
									onClick={enableSignaturePad}
								>
									<svg
										width="32"
										height="33"
										viewBox="0 0 32 33"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M30.1067 8.04228L24.8889 2.79784C24.5441 2.45479 24.0775 2.26221 23.5912 2.26221C23.1048 2.26221 22.6382 2.45479 22.2934 2.79784L3.79561 21.269L2.10672 28.5578C2.04846 28.8243 2.05045 29.1004 2.11256 29.366C2.17467 29.6315 2.29532 29.8799 2.46571 30.0929C2.63609 30.3058 2.8519 30.4781 3.09736 30.597C3.34283 30.7159 3.61176 30.7784 3.88449 30.7801C4.01158 30.7929 4.13963 30.7929 4.26672 30.7801L11.6356 29.0912L30.1067 10.6378C30.4498 10.293 30.6423 9.82645 30.6423 9.34006C30.6423 8.85368 30.4498 8.38708 30.1067 8.04228V8.04228ZM10.7467 27.4912L3.84005 28.9401L5.41338 22.1667L19.2534 8.38006L24.5867 13.7134L10.7467 27.4912ZM25.7778 12.4245L20.4445 7.09117L23.5378 4.01562L28.7823 9.34895L25.7778 12.4245Z"
											fill="#D6FF7E"
										/>
									</svg>
								</button>
								<canvas
									ref={signFieldRef}
									width="470"
									height="300"
									className="step-wrapper__sign"
								></canvas>
								<span style={signaturePad ? { display: 'none' } : null}>
									{signatureText}
								</span>
                <div className="step-wrapper__sign-buttons">
                  <button className="step-wrapper__sign-button" onClick={handleSaveSign} id="sign-save">
                    <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.46094 4.99989L7.72617 11.2654L17.4666 1.5249" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button className="step-wrapper__sign-button" onClick={handleClearSign} id="sign-clear">
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.84082 1.32715L15.0859 14.5725M15.0859 1.32715L1.84082 14.5722" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
							</div>
						</div>
					</CreationStep>
					<CreationStep
						number="06"
						title="Enter a Twitter or Instagram username to verify your user"
					>
						<div className="step-wrapper step-wrapper_social">
							<SocialRadio
								type="instagram"
								verification={state.verification}
								dispatch={dispatch}
                session={session}
                rid={rid}
                sendCode={sendCode}
                api_details_ref={api_details_ref}
							/>
							<SocialRadio
								type="twitter"
								verification={state.verification}
								dispatch={dispatch}
                session={session}
                rid={rid}
                sendCode={sendCode}
                api_details_ref={api_details_ref}
							/>
						</div>
						<form className="step-code" action="">
							<label>
								Enter the code
								<div className="step-code__input-wrapper">
                  <input
                    className="input"
      	            onChange={handleChange}
      	            type="number"
      	            id="social_code"
      	            name="social_code"
      	            key="social_code"
      	          ></input>
      	          <button
      	            id="submit_code"
      	            name="submit_code"
      	            key="submit_code"
      	            onClick={confirm_code}
                    className="btn step-code__submit"
      	          >
      	            Submit
      	          </button>
      	          <br></br>
      	          {confirmMsg}
								</div>
							</label>
						</form>
					</CreationStep>
					<CreationSubmit handle_create={handle_create} state={state} dispatch={dispatch} />
          {ipfsCid}
				</div>
			</div>
			{/*<div className="container-fluid">
	      <form>
	        <div className="container">
	          <h3>Create IMMA NFT</h3>
	          <button
	            id="create_nft"
	            name="create_nft"
	            key="create_nft"
	            onClick={handle_create}
	          >
	            Create
	          </button>
	          <br></br>
	          {ipfsCid}
	        </div>
	        <br></br>
	        <div className="container">
	          <h3>TestClaim</h3>
	          <button
	            id="test_claim"
	            name="test_claim"
	            key="test_claim"
	            value='bafybeidvuzr7mzfz6vtga622rjjrlftwsgmjnm6wbjh2ahcdh6rx5qnpya'
	            onClick={handle_claim}
	          >
	            Claim
	          </button>
	        </div>
	      </form>
	    </div>*/}
		</section>
	);
};
