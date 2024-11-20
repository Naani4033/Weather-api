import './QrCode.css'
import { useState } from 'react'

const QrCode = () => {
const [img,setImg]=useState("img");
const[loading,setLoading]=useState(false);
const[qrData,setQrData]=useState("https://youtube.com/");
const[qrSize,setQrSize]=useState("150");

async function generateQR() {
    setLoading(true);
    try {
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
        setImg(url);
    } catch (error) {
        console.error("Error generating QR CODE:", error);
    } finally {
        setLoading(false);
    }
}

function downloadQR() {
    fetch(img)
        .then((response) => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.blob();
        })
        .then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            link.click();
            URL.revokeObjectURL(link.href); // Clean up
        })
        .catch((error) => {
            console.error("Error downloading QR CODE:", error);
        });
}

  return (

    <div className="app-con">
        <h1>QR CODE GENERATOR</h1>
        {loading && <p> Please wait...</p>}
        {img && <img src={img} alt="QR Code" className="qr-code-image" />}
    <div>
    <label htmlFor="data input"className="input-labal">Data for QR code</label>

    <input type="text"value={qrData}id="data input"placeholder="enter the data for QR code" onChange={(e) => setQrData(e.target.value)}/>

    <label htmlFor="size input"className="input-labal">Image size (e.g.,150);</label>

    <input type="text"value={qrSize}id="size input"placeholder="enter image size"onChange={(e) => setQrSize(e.target.value)}/>
     <br></br>
     <button className="gen-button" disabled={loading} onClick={generateQR}>Generate QR CODE</button>
                <button className="do-button" onClick={downloadQR} disabled={!img}>Download QR CODE</button>
                <p className="footer">Designed by Naani</p>
    </div>
    </div>
    
    
    
)
}

export default QrCode
