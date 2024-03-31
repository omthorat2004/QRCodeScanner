import React, { useEffect, useRef } from 'react';
import './home.css';
// Qr Scanner
import QrScanner from "qr-scanner";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QrFrame from "../assets/qr-frame.svg";
const Home = () => {
    const scanner = useRef(null);
    const videoEl = useRef(null);
    const [scannedResult,setScannedResult] = useState('')
    const qrBoxEl = useRef(null);
    const navigate = useNavigate()
    const [qrOn, setQrOn] = useState(true);
    const onScanSuccess = (result) => {
        // 🖨 Print the "result" to browser console.
        console.log(result);
        // ✅ Handle success.
        // 😎 You can do whatever you want with the scanned result.
        setScannedResult(result?.data);
        
      };
    
      // Fail
      const onScanFail = (err) => {
        // 🖨 Print the "err" to browser console.
        console.log(err);
      };
      useEffect(() => {
        if (!qrOn)
          alert(
            "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
          );
      }, [qrOn]);
    
    useEffect(() => {
      if (videoEl?.current && !scanner.current) {
        // 👉 Instantiate the QR Scanner
        scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
          onDecodeError: onScanFail,
          // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
          preferredCamera: "environment",
          // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
          highlightScanRegion: true,
          // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
          highlightCodeOutline: true,
          // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
          overlay: qrBoxEl?.current || undefined,
        });
  
        // 🚀 Start QR Scanner
        scanner?.current
          ?.start()
          .then(() => setQrOn(true))
          .catch((err) => {
            if (err) setQrOn(false);
          });
      }
  
      // 🧹 Clean up on unmount.
      // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
      return () => {
        if (!videoEl?.current) {
          scanner?.current?.stop();
        }
      };
    }, []);
  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
          {scannedResult && (
        <a
        href={scannedResult}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </a>
      )}
      </div>
      
    </div>
  );
}

export default Home;
