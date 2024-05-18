document.getElementById('upload').addEventListener('change', handleImageUpload);
document.getElementById('image').addEventListener('click', handleImageClick);
document.getElementById('save-coordinates').addEventListener('click', saveCoordinates);

let coordinates = [];

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('image');
            img.src = e.target.result;
            img.onload = function() {
                resetCoordinates();
            };
        };
        reader.readAsDataURL(file);
    }
}

function handleImageClick(event) {
    const img = document.getElementById('image');
    const rect = img.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);

    coordinates.push({ x, y });
    addPointToImage(x, y);
    updateCoordinatesList();
}

function addPointToImage(x, y) {
    const point = document.createElement('div');
    point.classList.add('point');
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
    document.getElementById('image-container').appendChild(point);
}

function updateCoordinatesList() {
    const coordList = document.getElementById('coord-list');
    coordList.innerHTML = '';
    coordinates.forEach(coord => {
        const li = document.createElement('li');
        li.textContent = `(${coord.x}, ${coord.y})`;
        coordList.appendChild(li);
    });
}

function resetCoordinates() {
    coordinates = [];
    document.getElementById('coord-list').innerHTML = '';
    const points = document.querySelectorAll('.point');
    points.forEach(point => point.remove());
}

function saveCoordinates() {
    const textContent = coordinates.map(coord => `(${coord.x}, ${coord.y})`).join('\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'coordinates.txt';
    link.click();

    URL.revokeObjectURL(url);
}