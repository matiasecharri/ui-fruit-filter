//🐉Declaration of HTML variables:
const $muteSoundButton = document.getElementById("muteButton");
const $darkModeButton = document.getElementById("darkModeButton");
const $containerCards = document.getElementById("containerCards");
const $goBackButton = document.getElementById("goBackButton");
const $filterLayer = document.getElementById("backdropProviderID");

//🌏Declaration of global elements and states:
const itemsToBuy = JSON.parse(localStorage.getItem("itemsOnCart"));
console.log(itemsToBuy);
let isMuted = false;
let isDarkMode = false;

//🍥This function controls the dark/light button:
const darkMode = () => {
  let darkModeStorage = localStorage.getItem("isDarkMode");
  if (darkModeStorage !== null) {
    isDarkMode = JSON.parse(darkModeStorage);
    if (isDarkMode) {
      $filterLayer.classList.add("backdropProviderDark");
      $darkModeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-moon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" stroke-width="0" fill="#d7d9d4eb" />
          </svg>          
        `;
    }
  }
  $darkModeButton.addEventListener("click", event => {
    isDarkMode === false
      ? ($filterLayer.classList.add("backdropProviderDark"),
        uiSounds("/assets/sounds/mute-app.wav"),
        (($darkModeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-moon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" stroke-width="0" fill="#d7d9d4eb" />
          </svg>     
          
        `),
        (isDarkMode = true)))
      : $filterLayer.classList.remove(
          "backdropProviderDark",
          uiSounds("/assets/sounds/mute-app.wav"),
          (($darkModeButton.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sun-filled" width="24"
            height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
            stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
                d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z"
                stroke-width="0" fill="#d7d9d4eb" />
            <path
                d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z"
                stroke-width="0" fill="#d7d9d4eb" />
            <path
                d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z"
                stroke-width="0" fill="#d7d9d4eb" />
            <path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z"
                stroke-width="0" fill="#d7d9d4eb" />
            <path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z"
                stroke-width="0" fill="#d7d9d4eb" />
            <path
                d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z"
                stroke-width="0" fill="#d7d9d4eb" />
            <path
                d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z"
                stroke-width="0" fill="#d7d9d4eb" />
            <path
                d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z"
                stroke-width="0" fill="#d7d9d4eb" />
            <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"
                stroke-width="0" fill="#d7d9d4eb" />
        </svg>`),
          (isDarkMode = false))
        );
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  });
};
//🍥This function controls the mute/sound button:
const muteButton = () => {
  $muteSoundButton.addEventListener("click", event => {
    if (isMuted === false) {
      uiSounds("/assets/sounds/mute-app.wav"),
        (isMuted = true),
        localStorage.setItem("isMuted", JSON.stringify(isMuted)),
        ($muteSoundButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell-off" width="75%" height="75%" viewBox="0 0 24 24" stroke-width="1.5" stroke="#d7d9d4eb" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9.346 5.353c.21 -.129 .428 -.246 .654 -.353a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3m-1 3h-13a4 4 0 0 0 2 -3v-3a6.996 6.996 0 0 1 1.273 -3.707" />
        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        <path d="M3 3l18 18" />
      </svg>  
      `);
    } else {
      isMuted = false;
      localStorage.setItem("isMuted", JSON.stringify(isMuted)),
        uiSounds("/assets/sounds/mute-app.wav"),
        ($muteSoundButton.innerHTML = `  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell-filled" width="70%"
        height="70%" viewBox="0 0 24 24" stroke-width="1.5" stroke="#1C274C" fill="#1C274C"
        stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
            d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z"
            stroke-width="0" fill="#d7d9d4eb" />
        <path
            d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z"
            stroke-width="0" fill="#d7d9d4eb" />
      </svg>
      `);
    }
  });
};

//🍥This function is used to play every single sound effect on the app:
const uiSounds = file => {
  let isMutedStorage = JSON.parse(localStorage.getItem("isMuted"));
  if (isMutedStorage !== null) {
    isMuted = isMutedStorage;
  }
  if (isMuted === true) {
    $muteSoundButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell-off" width="75%" height="75%" viewBox="0 0 24 24" stroke-width="1.5" stroke="#d7d9d4eb" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M9.346 5.353c.21 -.129 .428 -.246 .654 -.353a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3m-1 3h-13a4 4 0 0 0 2 -3v-3a6.996 6.996 0 0 1 1.273 -3.707" />
        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        <path d="M3 3l18 18" />
      </svg>  
      `;
    return;
  }
  let uiSound = new Audio(file);
  uiSound.play();
};

//🍥This function provides the link to the cart:
const linkToCart = () => {
  $goBackButton.addEventListener("click", () => {
    uiSounds("/assets/sounds/mute-app.wav");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 200);
  });
};

//🍥This function print the cards.
const printerCart = array => {
  $containerCards.innerHTML = "";
  if (array.length === 0) {
    $containerCards.style.setProperty("align-items", "center");
    $containerCards.innerHTML = `<p class="traditionalClass">LOOKS LIKE THE CART IS EMPTY!</p>`;
  }
  array.forEach(fruit => {
    $containerCards.style.setProperty("align-items", "flex-start");
    $containerCards.innerHTML += `<div class="cards_cart">
        <img src="${fruit.photo}" alt="${fruit.name}">
        <div class="card_cart__content">
            <h3>${fruit.name.charAt(0).toUpperCase() + fruit.name.slice(1)}</h3>
            <p>Items on cart: ${fruit.unitsOnCart}</p>
            <p>Price/KG: $${fruit.individualPrice.toFixed(2)} USD</p>
            <p>Total price: $${fruit.totalPrice.toFixed(2)} USD</p>
        </div>
    </div>`;
  });
};

//✨Getting the final price of the items on the cart.
const totalPrice = itemsToBuy.reduce((accumulator, item) => {
  let totalAmount = accumulator + item.price;
  return totalAmount;
}, 0);
const finalPrice = totalPrice.toFixed(2);
console.log(finalPrice);

//✨The idea is showing 1 card per item and not 1 card for each fruit, we need a new array with the categories of the items in the cart.
const fruitCategories = itemsToBuy.map(fruit => {
  return fruit.name;
});
const unrepeatedCategories = new Set([...fruitCategories]);
const arrayUnrepeated = [...unrepeatedCategories];
//✨For each categorie im going to create an object with the 5 properties that I need, the only one that im defining is name, im pushing that object to the array objectFruit.
const objectFruitArray = [];
arrayUnrepeated.forEach(categorie => {
  let fruitObject = {
    name: categorie,
    photo: "",
    totalPrice: 0,
    individualPrice: 0,
    unitsOnCart: 0,
  };
  objectFruitArray.push(fruitObject);
});

//✨Now im iterating my array of empty object and im filling that objects based on "items to buy"  (the items on cart).
objectFruitArray.forEach(emptyFruit => {
  itemsToBuy.forEach(fruit => {
    if (fruit.name === emptyFruit.name) {
      emptyFruit.totalPrice += fruit.price;
      emptyFruit.unitsOnCart++;
      emptyFruit.individualPrice = fruit.price;
      emptyFruit.photo = fruit.image;
    }
  });
});

//✨Just creating a new array with the items sorted.
const sortedArray = [...objectFruitArray];
sortedArray.sort((a, b) => a.name.localeCompare(b.name));

//✅Function execution
darkMode();
muteButton();
linkToCart();
printerCart(sortedArray);

//Pending: showing a resume an allow the user to remove all items or finish the buy, probably an IF is going to be needed before the reduce.
//Remove the localstorage theme problem, modulate the code (more), transitions with gsap
// https://www.youtube.com/watch?v=ergc889Jghc
