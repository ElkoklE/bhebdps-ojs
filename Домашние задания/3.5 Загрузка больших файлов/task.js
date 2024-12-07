document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const progress = document.getElementById('progress');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];

        if (!file) {
            alert('Пожалуйста, выберите файл перед отправкой.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', form.action, true);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                progress.value = event.loaded / event.total;
            }
        };

        xhr.onload = () => {
            alert('Файл успешно загружен!');
            progress.value = 0;
        };

        xhr.onerror = () => {
            alert('Произошла ошибка соединения.');
        };

        xhr.send(formData);
    });
});
