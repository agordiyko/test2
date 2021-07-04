//Валидация input

const inputElem = document.querySelector('.input');
const buttonElem = document.querySelector('.button');
const alertElem = document.querySelector('.alert');
const maxValue = 100;

let prevValue = '';

//Обрабатываем событие input
inputElem.addEventListener('input', function(event){     
    validate(event);   
})

//Обрабатываем событие ctrl+V и cmd+V
inputElem.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.keyCode == 86) {
        validate(event);
    }
})

//Приводим число к двум единицам после запятой
function truncate(num) {
    return Math.trunc(num * 100) / 100;
}

//Функция валидации
function validate(event){
    let userInputValue = event.target.value.trim();
    event.target.value = userInputValue;

    //Проверка на ввод числа
    if(isNaN(event.target.value)){   
        event.target.value = prevValue;
        return;
    }
    
    const DECIMAL_LIMIT = 2;

    const dotPosition=userInputValue.lastIndexOf("."); 

    const isDotExist = !!(dotPosition + 1); 


    //Обрезание после двух чисел после запятой
    if (isDotExist && (dotPosition + DECIMAL_LIMIT < userInputValue.length - 1)) { 
        event.target.value = truncate(userInputValue);
        return;
    }

    //Замена после ввода числа из двух нулей
    if(userInputValue.startsWith('00')){
        event.target.value = maxValue;
        return;
    }

    //Ограничение на ввод числа не более максимального
    if(userInputValue > maxValue){
        event.target.value = maxValue;
        return;
    }
}