import React, { useRef, useEffect } from 'react';
import Quagga from '@ericblade/quagga2';

const BarcodeScanner = ({ onScan, setScanning }) => {
    const scannerRef = useRef(null);

    useEffect(() => {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: scannerRef.current,
                constraints: {
                    width: { min: 640 },
                    height: { min: 480 },
                    facingMode: "environment"
                }
            },
            decoder: {
                readers: [
                    "code_128_reader",
                    "ean_reader",
                    "upc_reader",
                    "code_39_reader",
                    "ean_8_reader",
                    "upc_e_reader"
                ]
            },
            locate: true, // Ativa a localização para melhorar a precisão
            multiple: false // Evita múltiplas leituras simultâneas
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
                console.log("Código detectado:", data.codeResult.code);
                onScan(data.codeResult.code);
                setScanning(false); // Atualiza o estado de escaneamento para parar o scanner
                Quagga.stop(); // Para o Quagga após a detecção
            } else {
                console.log("Código não detectado corretamente.");
            }
        });

        // Aplica a classe para desespelhar o vídeo
        const handleQuaggaProcessed = () => {
            const videoElement = scannerRef.current.querySelector('video');
            if (videoElement) {
                videoElement.classList.add('unmirror-video');
            }
        };

        Quagga.onProcessed(handleQuaggaProcessed);

        return () => {
            Quagga.stop();
            Quagga.offDetected();
            Quagga.offProcessed(handleQuaggaProcessed);
        };
    }, [onScan, setScanning]);

    return (
        <div ref={scannerRef} style={{ width: '100%', height: 'auto' }}>
            {/* Quagga irá injetar os elementos de vídeo e canvas aqui */}
        </div>
    );
};

export default BarcodeScanner;