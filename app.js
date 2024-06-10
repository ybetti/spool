const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let elements = [];
let selectedElement = null;
let offsetX, offsetY;

// 線を描画する関数
function drawLine() {
    const line = {
        type: 'line',
        x1: 50,
        y1: 50,
        x2: 450,
        y2: 450,
        color: 'black',
        width: 2
    };
    elements.push(line);
    drawElements();
}

// 画像を表示する関数
function showImage() {
    const img = new Image();
    img.src = 'path/to/your/image.jpg';  // ここで画像のパスを指定
    img.onload = function() {
        const imageElement = {
            type: 'image',
            img: img,
            x: 100,
            y: 100,
            width: img.width,
            height: img.height
        };
        elements.push(imageElement);
        drawElements();
    }
}

// すべての要素を描画する関数
function drawElements() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach(element => {
        if (element.type === 'line') {
            ctx.beginPath();
            ctx.moveTo(element.x1, element.y1);
            ctx.lineTo(element.x2, element.y2);
            ctx.strokeStyle = element.color;
            ctx.lineWidth = element.width;
            ctx.stroke();
        } else if (element.type === 'image') {
            ctx.drawImage(element.img, element.x, element.y, element.width, element.height);
        }
    });
}

// マウスダウンイベント
canvas.addEventListener('mousedown', function(e) {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i];
        if (element.type === 'line' && isMouseOnLine(element, mouseX, mouseY)) {
            selectedElement = element;
            offsetX = mouseX - element.x1;
            offsetY = mouseY - element.y1;
            break;
        } else if (element.type === 'image' && isMouseOnImage(element, mouseX, mouseY)) {
            selectedElement = element;
            offsetX = mouseX - element.x;
            offsetY = mouseY - element.y;
            break;
        }
    }
});

// マウスムーブイベント
canvas.addEventListener('mousemove', function(e) {
    if (selectedElement) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        if (selectedElement.type === 'line') {
            const dx = mouseX - offsetX;
            const dy = mouseY - offsetY;
            selectedElement.x2 += dx - selectedElement.x1;
            selectedElement.y2 += dy - selectedElement.y1;
            selectedElement.x1 = dx;
            selectedElement.y1 = dy;
        } else if (selectedElement.type === 'image') {
            selectedElement.x = mouseX - offsetX;
            selectedElement.y = mouseY - offsetY;
        }

        drawElements();
    }
});

// マウスアップイベント
canvas.addEventListener('mouseup', function() {
    selectedElement = null;
});

// マウスが線の上にあるかどうかをチェックする関数
function isMouseOnLine(line, x, y) {
    const { x1, y1, x2, y2 } = line;
    const dist = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
    return dist < 5;
}

// マウスが画像の上にあるかどうかをチェックする関数
function isMouseOnImage(image, x, y) {
    return x >= image.x && x <= image.x + image.width && y >= image.y && y <= image.y + image.height;
}
