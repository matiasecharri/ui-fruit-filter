import { arrayFruitsX } from "/arrays.js";

//🐉Declaration of HTML variables:
const $main = document.querySelector("main");
const $containerCards = document.getElementById("containerCards");
const $searchBar = document.getElementById("searchBar");
const $userPanel = document.getElementById("userPanelX");
const $fullUserPanel = document.getElementById("userPanel");
const $led = document.getElementById("ledLight");
const $goToShoppButton = document.getElementById("goToCartButton");
const $muteSoundButton = document.getElementById("muteButton");
const $darkModeButton = document.getElementById("darkModeButton");
const $filterLayer = document.getElementById("backdropProviderID");
const $h1Title = document.querySelector("h1 span");
const $intro = document.getElementById("initialize");

$intro.classList.add("initializeBlured");
$intro.addEventListener("click", event => {
  uiSounds("/assets/sounds/interface-is-open.mp3");
  $intro.classList.add("initializeOut");
  setTimeout(() => {
    $intro.style.setProperty("display", "none");
  }, 1000);
});

//🌏Declaration of global elements and states:
const arrayFruits = arrayFruitsX;
let fruitsOnCart = [];
const storageCart = localStorage.getItem("itemsOnCart");
if (storageCart !== null) {
  fruitsOnCart = JSON.parse(storageCart);
}
let itemCounter = 0;
let userText = "";
let isMuted = false;
let isDarkMode = false;
let isSomethingChecked = false;
const $pShop = document.createElement("p");
$pShop.classList.add("floatingText");
if (storageCart !== null) {
  itemCounter = fruitsOnCart.length;
}
$pShop.innerText = String(itemCounter).padStart(3, "0");
$goToShoppButton.appendChild($pShop);

//🍥This function updates the counter base on local storage:
const updateCartCounter = () => {
  $pShop.innerText = String(itemCounter).padStart(3, "0");
};
//🍥This function prints the most part of the elements on the app:
const printer = (array, container, nombre, imagen) => {
  $led.classList.remove("led-red");
  const fragment = document.createDocumentFragment();

  container.innerHTML = "";

  array.forEach(elemento => {
    const $cardDiv = document.createElement("div");
    $cardDiv.classList.add("cardFruits");

    if (elemento.sales > 8) {
      const $mostSelled = document.createElement("button");
      $mostSelled.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">         
          <path d="M9.91 15.42c-.776.775-2.037.773-2.814-.004l-6.07-6.07c-.57-.57-.998-1.59-1.002-2.4L0 1.993C-.005.896.89-.005 1.992 0l4.956.024c.805.004 1.827.428 2.4 1l6.07 6.07c.772.773.78 2.04.003 2.815l-5.51 5.51zM5 7c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="#FFF" fill-rule="evenodd"/>
        </svg>
      `;
      const $tooltip = document.createElement("span");
      $tooltip.textContent = ` ${
        elemento.name.charAt(0).toUpperCase() + elemento.name.slice(1)
      } is a best seller ✨`;
      $tooltip.classList.add("tooltip");
      $mostSelled.appendChild($tooltip);
      $mostSelled.classList.add("bestSeller");

      $mostSelled.addEventListener("mouseenter", () => {
        $tooltip.style.setProperty("opacity", 1);
      });

      $mostSelled.addEventListener("mouseleave", () => {
        $tooltip.style.setProperty("opacity", 0);
      });

      $cardDiv.appendChild($mostSelled);
    }

    const $filterDiv = document.createElement("div");
    $filterDiv.classList.add("filter");
    $cardDiv.appendChild($filterDiv);

    let $buttonCardPlus = document.createElement("button");
    $buttonCardPlus.classList.add("addToCart");
    $buttonCardPlus.id = elemento.name;
    $buttonCardPlus.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="40%"  viewBox="0 0 45.402 45.402"
    xml:space="preserve">
 <g>
   <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
     c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
     c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
     c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/>
 </g>
 </svg>`;

    let $buttonCardMinus = document.createElement("button");
    $buttonCardMinus.classList.add("deleteFromCart");
    $buttonCardMinus.id = elemento.name;
    $buttonCardMinus.innerHTML = `<svg width=40%  viewBox="0 -12 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-414.000000, -1049.000000)">
            <path d="M442,1049 L418,1049 C415.791,1049 414,1050.79 414,1053 C414,1055.21 415.791,1057 418,1057 L442,1057 C444.209,1057 446,1055.21 446,1053 C446,1050.79 444.209,1049 442,1049" id="minus" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`;
    $cardDiv.appendChild($buttonCardPlus);
    $cardDiv.appendChild($buttonCardMinus);

    const pElement = document.createElement("p");
    pElement.textContent = elemento[nombre].toUpperCase();
    $cardDiv.appendChild(pElement);

    const imgElement = document.createElement("img");
    imgElement.src = elemento[imagen];
    imgElement.alt = elemento[nombre];
    $cardDiv.appendChild(imgElement);

    fragment.appendChild($cardDiv);
  });

  container.appendChild(fragment);
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
//🍥This function contains the input search functionality, uses 2 arrays depending of the checkbox:
const searching = array => {
  $searchBar.addEventListener("keyup", event => {
    $containerCards.innerHTML = "";
    userText = event.target.value.toLowerCase();
    updateButtons();
    console.log($buttonsAdd);
    const filteredArray = array.filter(element => {
      return element.name.toLowerCase().includes(userText);
    });

    if (filteredArray.length !== 0) {
      $led.classList.remove("led-red");
    }
    if (filteredArray.length === 0) {
      $containerCards.innerHTML = `<span class="traditionalClass">SORRY WE DON'T HAVE THAT!</span>`;
      $led.classList.add("led-red");
    } else {
      printer(filteredArray, $containerCards, "name", "image");
      imageModal();
      updateButtons();
      console.log($buttonsAdd);
    }

    $searchBar.addEventListener("input", event => {
      if (event.target.value === "") {
        $led.classList.remove("led-red");
      }
      $containerCards.innerHTML = "";
      event.target.value === ""
        ? printer(array, $containerCards, "name", "image")
        : null;
      imageModal();
      updateButtons();
      console.log($buttonsAdd);
    });
  });
};
//🍥This function contains the modal functionality, is called multiple times insider of other functions:
const imageModal = () => {
  const imagesCards = document.querySelectorAll("#containerCards img");

  imagesCards.forEach(img => {
    img.addEventListener("click", event => {
      uiSounds("/assets/sounds/ui-click.wav");
      const clickedImage = event.target;
      const fruitName = clickedImage.alt;
      const fruitData = arrayFruits.find(x => x.name === fruitName);
      if (fruitData) {
        const modal = document.createElement("div");
        modal.id = "modal";
        modal.innerHTML = `
          <img src="${clickedImage.src}" alt="${clickedImage.alt}">
          <div class="modalDiv">
          <p class="modalP"><span>Origin:</span> ${fruitData.origin}</p>
          <p class="modalP"><span>Description:</span> ${fruitData.description}</p>
          </div>
        `;

        $main.appendChild(modal);

        modal.addEventListener("click", x => {
          uiSounds("/assets/sounds/ui-close.wav");
          $main.removeChild(modal);
        });
      }
    });
  });
};
//🍥This function is used to create a dynamic and unrepeated list of every category in the array:
const createUnrepeatedList = (array, property) => {
  const types = array.map(x => {
    return x[property];
  });
  const noDuplicated = new Set(...[types]);
  const arrayNoDuplicated = [...noDuplicated];
  return arrayNoDuplicated;
};
const types = createUnrepeatedList(arrayFruits, "type");
//🍥This function is used to print the unrepeated list in checkbox form:
const printer2 = (array, container) => {
  const fragment = document.createDocumentFragment();
  array.forEach(element => {
    const label = document.createElement("label");
    label.classList.add("custom-checkbox");
    label.setAttribute("for", element);

    label.innerHTML = `
      ${element}
      <input type="checkbox" id="${element}" name="${element}" value="${element}">
      <span class="checkmark"></span>
    `;

    fragment.appendChild(label);
  });

  container.innerHTML = "";
  container.appendChild(fragment);
};
//🍥This function controls the dark/light button:
const darkMode = () => {
  let darkModeStorage = localStorage.getItem("isDarkMode");
  if (darkModeStorage !== null) {
    isDarkMode = JSON.parse(darkModeStorage);
    if (isDarkMode) {
      $filterLayer.classList.add("backdropProviderDark");
      $h1Title.classList.add("backdropProviderDarkH1");
      $fullUserPanel.classList.add("darkModeUserPanel"),
        ($darkModeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-moon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" stroke-width="0" fill="#d7d9d4eb" />
        </svg>          
      `);
    }
  }
  $darkModeButton.addEventListener("click", event => {
    isDarkMode === false
      ? ($filterLayer.classList.add("backdropProviderDark"),
        $h1Title.classList.add("backdropProviderDarkH1"),
        $fullUserPanel.classList.add("darkModeUserPanel"),
        uiSounds("/assets/sounds/mute-app.wav"),
        (($darkModeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-moon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" stroke-width="0" fill="#d7d9d4eb" />
        </svg>     
        
      `),
        (isDarkMode = true)))
      : $filterLayer.classList.remove(
          "backdropProviderDark",
          $h1Title.classList.remove("backdropProviderDarkH1"),
          $fullUserPanel.classList.remove("darkModeUserPanel"),
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

//✨Functions invocation I:
printer(arrayFruits, $containerCards, "name", "image");
printer2(types, $userPanel);
imageModal();
darkMode();
muteButton();

//🐉Declaration of HTML variables which are dynamically generated, (they need the printer and printer2 execution):
const $checkboxes = document.querySelectorAll(".custom-checkbox");
let $buttonsAdd = document.querySelectorAll(".addToCart");
let $buttonsRemove = document.querySelectorAll(".deleteFromCart");
const unrepeatedCategories = new Set();

//🔀 Crossed filters checkbox + searchbar logic:
$checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", event => {
    let activeCheckbox = event.target.value;
    event.target.checked
      ? unrepeatedCategories.add(activeCheckbox)
      : unrepeatedCategories.delete(activeCheckbox);
    const arrayOfActiveCheckbox = [...unrepeatedCategories];
    const filterByCheck = arrayFruits.filter(x => {
      return arrayOfActiveCheckbox.includes(x.type);
    });
    if (filterByCheck.length !== 0) {
      $containerCards.innerHTML = "";
      printer(filterByCheck, $containerCards, "name", "image");
      searching(filterByCheck);
      imageModal();
      updateButtons();
      console.log($buttonsAdd);
      isSomethingChecked = true;
    } else {
      $searchBar.value = "";
      $containerCards.innerHTML = "";
      searching(arrayFruits);
      printer(arrayFruits, $containerCards, "name", "image");
      imageModal();
      updateButtons();
      console.log($buttonsAdd);
      isSomethingChecked = false;
    }
    $searchBar.addEventListener("input", x => {
      if (isSomethingChecked === true) {
        printer(filterByCheck, $containerCards, "name", "image");
      }
    });
  });
});

//🍥This function controls the delete and add products on cart after the card impression:
const buttonEventer = () => {
  $buttonsAdd.forEach(button => {
    button.addEventListener("click", event => {
      const arrayStock = arrayFruits.filter(fruit => {
        if (fruit.stock === 0 && fruit.name === button.id) {
          return;
        }
        if (button.id === fruit.name) {
          fruit.stock--;
          itemCounter++;
          updateCartCounter();
          $goToShoppButton.classList.toggle("scaler");
          uiSounds("/assets/sounds/ui-click.wav");
          $pShop.innerText = String(itemCounter).padStart(3, "0");
          $goToShoppButton.appendChild($pShop);
          fruitsOnCart.push(fruit);
          localStorage.setItem("itemsOnCart", JSON.stringify(fruitsOnCart));
        }
      });
      return arrayStock;
    });
  });

  $buttonsRemove.forEach(button => {
    button.addEventListener("click", event => {
      const fruitToRemove = fruitsOnCart.find(
        fruit => fruit.name === button.id
      );

      if (!fruitToRemove) {
        console.log("La fruta no está en el carrito.");
        return;
      }

      const fruitInArray = arrayFruits.find(fruit => fruit.name === button.id);
      if (fruitInArray && fruitInArray.stock >= 0) {
        fruitInArray.stock++;
        itemCounter--;
        updateCartCounter();
        uiSounds("/assets/sounds/ui-close.wav");
        $pShop.innerText = String(itemCounter).padStart(3, "0");
        $goToShoppButton.appendChild($pShop);
      }

      const indexToRemove = fruitsOnCart.indexOf(fruitToRemove);
      fruitsOnCart.splice(indexToRemove, 1);
      localStorage.setItem("itemsOnCart", JSON.stringify(fruitsOnCart));
      console.log("Fruta eliminada del carrito:", fruitToRemove);
    });
  });
};
//🍥This function is used to keep the buttonEventer functionality after the card re-print with the filters.
const updateButtons = () => {
  $buttonsAdd = document.querySelectorAll(".addToCart");
  $buttonsRemove = document.querySelectorAll(".deleteFromCart");
  buttonEventer();
};

//✨Functions invocation II:
buttonEventer();
searching(arrayFruits);
