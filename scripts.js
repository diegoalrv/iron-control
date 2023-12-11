async function main() {
    const video = document.getElementById('video');

    // Iniciar la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        });

    // Cargar el modelo de detección de poses de manos
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
        runtime: 'mediapipe', // or 'tfjs',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
        modelType: 'full'
    };
    const detector = await handPoseDetection.createDetector(model, detectorConfig);

    // Función para detectar las manos
    async function detect() {
        const hands = await detector.estimateHands(video);
        console.log(hands);

        // Llamar a detect() de nuevo para el siguiente frame
        requestAnimationFrame(detect);
    }

    detect();
}

main();
