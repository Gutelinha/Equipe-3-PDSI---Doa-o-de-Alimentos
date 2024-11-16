import React, { useEffect, useRef, useState } from 'react';
import Quagga from '@ericblade/quagga2';

const BarcodeScanner = ({ onScan }) => {
    const scannerRef = useRef(null);
    const [scanning, setScanning] = useState(true);

    const handleQuaggaProcessed = (result) => {
        const videoElement = scannerRef.current.querySelector('video');
        if (videoElement) {
            videoElement.classList.add('unmirror-video');
        }
        if (result) {
            console.log("Frame processado:", result);
            if (result.barcodes && result.barcodes.length > 0) {
                console.log("Barcodes detectados:", result.barcodes);
            }
        }
    };

    useEffect(() => {
        if (scanning) {
            Quagga.init({
                inputStream: {
                    type: "LiveStream",
                    target: scannerRef.current,
                    constraints: {
                        facingMode: "environment",
                    },
                },
                decoder: {
                    readers: [
                        "ean_reader" // Leitor para códigos EAN-13
                    ],
                    multiple: false // Permitir a detecção de múltiplos códigos de barras
                },
                locate: true,
                locator: {
                    patchSize: "x-large",
                    halfSample: true
                },
                numOfWorkers: 4,
                frequency: 50
            }, (err) => {
                if (err) {
                    console.error('Erro ao iniciar o Quagga:', err);
                    return;
                }
                console.log("Inicialização concluída. Pronto para começar");
                Quagga.start();
            });

            Quagga.onDetected((data) => {
                if (data && data.codeResult && data.codeResult.code) {
                    const code = data.codeResult.code;
                    console.log("Código detectado:", code);
                    if (code.length === 13 && code.startsWith('781')) {
                        onScan(code);
                        Quagga.stop();
                        setScanning(false);
                    } else {
                        console.log("Código inválido. Apenas códigos com 13 dígitos e iniciando com '781' são aceitos.");
                        // Continuar escaneando sem parar o Quagga
                    }
                } else {
                    console.log("Código não detectado corretamente.");
                }
            });

            Quagga.onProcessed(handleQuaggaProcessed);
        }

        return () => {
            Quagga.stop();
        };
    }, [scanning, onScan]);

    return (
        <div ref={scannerRef} style={{ width: '100%', height: '100%' }}>
            {!scanning && <p>Escaneamento parado.</p>}
        </div>
    );
};

export default BarcodeScanner;