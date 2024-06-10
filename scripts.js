let currentShape = null;
let offsetX = 0;
let offsetY = 0;

function drawShape(shape) {
    const container = document.getElementById('shape-container');

    let shapeElement = document.createElement('div');
    shapeElement.classList.add('shape', shape);

    // 初期位置を設定
    shapeElement.style.left = '0%';
    shapeElement.style.top = '0%';
    shapeElement.style.transform = 'translate(0%, 0%)';

    // ドラッグイベントを追加
    shapeElement.addEventListener('mousedown', onMouseDown);

    container.appendChild(shapeElement);
}

function onMouseDown(event) {
    currentShape = event.target;
    offsetX = event.clientX - currentShape.getBoundingClientRect().left;
    offsetY = event.clientY - currentShape.getBoundingClientRect().top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(event) {
    if (!currentShape) return;

    let x = event.clientX - offsetX;
    let y = event.clientY - offsetY;

    currentShape.style.left = `${x}px`;
    currentShape.style.top = `${y}px`;
    currentShape.style.transform = 'translate(0, 0)';
}

function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    currentShape = null;
}
