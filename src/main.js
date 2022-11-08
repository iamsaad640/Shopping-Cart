const shop = document.getElementById("product-showcase");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const displayProduct = () => {
  return (shop.innerHTML = productsData
    .map((x) => {
      let check = basket.find((y) => y.id === x.id);
      updateCartCounter();
      return `<div  class="product" id = product-id-${x.id} >
        <img width="200" src=${x.image} alt="" />
        <div class="details">
          <h2>${x.name}</h2>
          <p>${x.desc}</p>
          <div class="price-quantity">
            <h2>$ ${x.price}</h2>
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
              ${check === undefined ? 0 : check.item}
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
          </div>
        </div>
      </div>`;
    })
    .join(""));
};

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

  if (searchItem === undefined) return;
  if (searchItem.item === 1) {
    basket.splice(basket.indexOf("searchItem.item"),1);
  update(selectedItem.id);
    return;
  } else {
    searchItem.item--;
  }

  update(selectedItem.id);
};

const update = (id) => {
  
  localStorage.setItem("data", JSON.stringify(basket));
  let searchItem = basket.find((x) => x.id === id);
  if(searchItem === undefined) {
  document.getElementById(id).innerHTML = "0";
  } else{
  document.getElementById(id).innerHTML = searchItem.item;}
  updateCartCounter();
};

const updateCartCounter = () => {
  let cartCounter = document.getElementById("cart-counter");
  cartCounter.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

displayProduct();
