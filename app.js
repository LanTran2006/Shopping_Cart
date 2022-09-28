let add_to_cart=document.querySelectorAll('.Product-box .bx')

function open_cart() {
        document.querySelector('.cart').classList.toggle('active')
}
function fix_height() {
    document.body.style.height='auto';
    document.body.style.overflow='auto'
}
function hide_overlay() {
    document.querySelector('.overlay').style.visibility='hidden'
    document.querySelector('.overlay').style.opacity='0'
}
document.querySelector('.logo').addEventListener('click',()=>{
    open_cart()
    document.querySelector('.overlay').style.visibility='visible';
    document.querySelector('.overlay').style.opacity='0.5';
    document.body.style.height='100vh'
    document.body.style.overflow='hidden'
})
document.getElementById('close').addEventListener('click',()=>{
    open_cart()
    hide_overlay()
    fix_height()
})
document.querySelector('.overlay').onclick=function() {
    open_cart()
    hide_overlay()
   fix_height()
}
let arr=[]
add_to_cart.forEach(item=>item.addEventListener('click',()=>{
    let name=item.previousElementSibling.previousElementSibling.innerHTML;
    if (checking(name)) {
        let old_quantity=parseInt(document.querySelector('.quantity').innerHTML)
        document.querySelector('.quantity').innerHTML=old_quantity+1;
        let img=item.parentElement.querySelector('img').src;
        let price=item.previousElementSibling.innerHTML;
        let obj= {
            img: img,
            price: price,
            name: name,
            quantity: 1
        }
        arr.push(obj)
        render(arr)
    } else {
        render(arr)
    }
   
}))
function render(arr) {
    let htmls=''
    arr.forEach((element,index)=>{
        htmls+=`<div class="cart-box">
        <img src="${element.img}" alt="">
        <div class="detail-box">
            <p>${element.name}</p>
            <div class="cart-price">${element.price}</div>
            <input class='quantity_change' onchange='update(this)' min="1" type="number" value="${element.quantity}" id="">
        </div>
        <i onclick='Remove_item(${index})' class='bx bxs-trash-alt'></i>
    </div>`
    })
    document.querySelector('.cart-content').innerHTML=htmls;
    caculating(arr)
}
function Remove_item(index) {
     arr.splice(index,1)
     render(arr)
     let old_quantity=parseInt(document.querySelector('.quantity').innerHTML)
     document.querySelector('.quantity').innerHTML=old_quantity-1;
}
function caculating(array=arr) {
    let total=0;
    if (array.length!==0) {
        total= array.reduce((accmulator,element)=>accmulator+element.quantity*parseInt(element.price.slice(1)),0)
       }
       document.querySelector('.total-price').innerHTML='$'+total
   
}
function checking(name) {
    for (let i=0;i<arr.length;i++) {
        if (arr[i].name==name) { 
            arr[i].quantity+=1;
            return false;
        }
    }
    return true;
}
function update(need_item) {
    let total=0;
  let all_quantity=document.querySelectorAll('.quantity_change');
  all_quantity.forEach((element,index)=>{
       if (element==need_item) {
          arr[index].quantity=parseInt(need_item.value);
          for (let i=0;i<all_quantity.length;i++) {
            total+=parseInt(all_quantity[i].value)*parseInt(all_quantity[i].previousElementSibling.innerHTML.slice(1))
       }
       document.querySelector('.total-price').innerHTML='$'+total
    }
  })
}
document.querySelector('.btn-buy').onclick=function() {
    let quantity=parseInt(document.querySelector('.quantity').innerHTML)
    if (quantity<1) {
        alert('please order at least 1 item')
    } else {
        alert('successfully ordered')
    }
    
}