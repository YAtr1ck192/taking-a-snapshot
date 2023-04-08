
let webkam = {  
    //создание ключей
    hVid: null, hSnaps: null, hTake: null, hSave: null,

    init: () => {
        // получение элементов из html
        
        webkam.hVid = document.getElementById("kam-live"),
        webkam.hSnaps = document.getElementById("kam-snaps"),
        webkam.hTake = document.getElementById("kam-take"),
        webkam.hSave = document.getElementById("kam-save");

        // получение разрешения на использование камеры у пользователя
        
        navigator.mediaDevices.getUserMedia({ video: true })

        .then((stream) => {
        
        // вывод "прямой трансляции" в блок video (его я скрыл в css)
        
        webkam.hVid.srcObject = stream;
        
        //взаимодействие с пользователем и включение кнопок) 
        
        let userAnswer = prompt('Хотите ли вы скачать эту фотографию?', 'да')
        if (userAnswer == 'да'){
            alert('нажмите на кнопку <<Сохранить>>');
        } else {
            alert('нажмите на кнопку <<Сфотографировать>>');
        }
        webkam.hSave.onclick = webkam.save;
        webkam.hTake.onclick = webkam.take;
        webkam.hTake.disabled = false;
        webkam.hSave.disabled = false;
        })
    },
    // функция для создания холста и захвата видеокадра на холст
    snap: () => {
        
        // создание холста
        
        let canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        vWidth = webkam.hVid.videoWidth,
        vHeight = webkam.hVid.videoHeight;
        
        // захват кадра на холст
        
        canvas.width = vWidth;
        canvas.height = vHeight;
        ctx.drawImage(webkam.hVid, 0, 0, vWidth, vHeight);
        return canvas;
    },
    
    // функция для создания снимка
    
    take: () => {
        webkam.hSnaps.appendChild(webkam.snap());
    },
    
    // функция для создания и сохранения снимка
    
    save: () => {
        
        // создаю переменную, где будет храниться фотка;
        
        let canvas = webkam.snap(),
        
        //создаю ссылку в html, добавляю ей атрибуты
        
        anchor = document.createElement("a");
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = "snap.png";
        
        // "кликаю" по ссылке, удаляю ссылку и переменную
        
        anchor.click();
        anchor.remove();
        canvas.remove();
    }
};
window.addEventListener("load", webkam.init);