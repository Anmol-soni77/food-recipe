let plusingridient = document.getElementById('ingridientbtn')
let ingridientslist = document.querySelector('.ingridientslist')
let ingridientsdiv = document.querySelectorAll('.ingridientsdiv')[0]

plusingridient.addEventListener('click',function(){
    let newingridient = ingridientsdiv.cloneNode(true)
    let input = newingridient.getElementsByTagName('input')[0]
    input.value = ''
    ingridientslist.appendChild(newingridient)
})