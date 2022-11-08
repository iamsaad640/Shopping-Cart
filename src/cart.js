let increment = (id) => {
    const selectedItem = id;
  
    let searchItem = basket.find((x) => x.id === selectedItem.id);
  
    if (searchItem === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      });
    } else {
      searchItem.item += 1;
    }
  
    update(selectedItem.id);
  };
  
const decrement = (id) => {
    const selectedItem = id;
    let searchItem = basket.find((x) => x.id === selectedItem.id);
  
    if (searchItem === undefined) {return};
    if (searchItem.item === 1) {
      basket.splice(basket.indexOf(searchItem),1);

    update(searchItem.id);
      return;
    } else {
      searchItem.item--;
    }
  
    update(selectedItem.id);

};
  
const update = (id) => {
    
    localStorage.setItem("data", JSON.stringify(basket)); 
    let searchItem = basket.find((x) => x.id === id);
    let searchPrice = productsData.find((x) => x.id === id);
    if(searchItem === undefined) {
    document.getElementById(id).innerHTML = "0";
    document.getElementById("total-price-"+id).innerHTML = "$ 0";
    totalBill();
      return;
    } else{
    document.getElementById(id).innerHTML = searchItem.item;
    document.getElementById("total-price-"+searchItem.id).innerHTML = "$ " + searchItem.item * searchPrice.price};

    updateCartCounter();
    totalBill();
};
  
const updateCartCounter = () => {
    let cartCounter = document.getElementById("cart-counter");
    cartCounter.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};


/* */

let basket = JSON.parse(localStorage.getItem("data")) || [];




const totalBill = () => {
    let totalAmount = 0;
    if(basket.length !== 0){
    totalAmount = basket.map((x)=> {
        let search = productsData.find((y)=> x.id===y.id);
        return search.price * x.item;
    }).reduce((x,y)=>x+y);
  }
    document.getElementById("bill-amount").innerHTML = "$ " + totalAmount;
}

const clearCart = () => {
    localStorage.removeItem("data");
    basket = [];
    checkBasket();
}

const deleteItem = (id) => {
  const selectedItem = id;
  let searchItem = basket.find((x) => x.id === selectedItem.id);
  if(searchItem === undefined){
  document.getElementById("selected-item-" + selectedItem.id).innerHTML = "";
  }
  else{
  basket.splice(searchItem.id, 1);
  document.getElementById("selected-item-" + searchItem.id).innerHTML = "";
  localStorage.setItem("data", JSON.stringify(basket));
}
updateCartCounter();
totalBill();
  if(basket.length === 0){
    displayNoItem();
  }
}

const displaySelectedProduct = () =>{
let selectedProduct = document.getElementById("selected-products-container");
    return selectedProduct.innerHTML = basket.map((x)=>{
        let search = productsData.find((y)=> y.id === x.id);
        
        return `<div class="selected-items" id=selected-item-${x.id}>
    <img width="150px" src="${search.image}" alt="" />
    <div class="selected-details">
      <div class="title-price-close">
        <h3 class="unset">${search.name}</h3>
        <p>$ ${search.price}</p>
        <button onclick="deleteItem(${x.id})" class="unset"><svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
      </div>
        <div class="buttons">
          <svg
            onclick="decrement(${x.id})"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-dash-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"
            />
          </svg>
          <div id=${x.id} class="quantity">
          ${search === undefined ? 0 : x.item}
          </div>
          <svg
            onclick="increment(${x.id})"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
        </div>
        <div id=total-price-${x.id} class="selected-total-price">$ ${search===undefined ? 0: search.price * x.item}</div>
      
    </div>
  </div>`
    


}).join("");
}

const displayNoItem = () => {
  
  document.getElementById("main").innerHTML =  `
  <div class="bill">
    <h2>No item Selected</h2>
  </div>
  <div class="action-container">
    <a href="index.html" class="action-buttons bg-primary">Back to Home</a>
  </div>`;
}

const mainDisplay = () => {
displaySelectedProduct();
totalBill();
updateCartCounter();
}

const checkBasket = () => {
  if(basket.length !== 0){
    mainDisplay();
  }
  else
  {
    displayNoItem();
  }
}

checkBasket();