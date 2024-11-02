import React, { useEffect, useRef } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onScan }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: videoRef.current,
        constraints: {
          facingMode: 'environment' // Use a câmera traseira
        }
      },
      decoder: {
        readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader']
      }
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      onScan(data.codeResult.code);
    });

    return () => {
      Quagga.stop();
    };
  }, [onScan]);

  return <div ref={videoRef} style={{ width: '100%' }} />;
};

export default BarcodeScanner;