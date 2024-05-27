function diminui(index){
    let div = document.querySelectorAll('.container')
    div[index].style.transform = 'scale(1)'
    div[index].style.boxShadow = '0px 0px 0px white'
}
function aumenta(index){
    let div = document.querySelectorAll('.container')
    div[index].style.transform = 'scale(1.08)'
    div[index].style.boxShadow = '0px 0px 8px white'    
}