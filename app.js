// Canvasの設定
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 線を描画する関数
function drawLine() {
    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 線を描画
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(450, 450);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// 画像を表示する関数
function showImage() {
    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = document.getElementById('myImage');
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    img.style.display = 'block'; // 画像を表示
}
