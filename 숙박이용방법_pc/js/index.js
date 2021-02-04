// var imgContainer = document.querySelector('#imgContainer')
// document.querySelector('.link').addEventListener('click',function(e){
//     imgContainer.style.display="none";
//     e.preventDefault();
// })
// document.querySelector('.here').addEventListener('click',function(e){
//     imgContainer.style.display="block"
//     e.preventDefault();
// })

$('.link').click(function(e){
    $('#imgContainer').css({display:'none'})
    e.preventDefault()
})
$('.here').click(function(e){
    $('#imgContainer').css({display:'block'})
    e.preventDefault()
})