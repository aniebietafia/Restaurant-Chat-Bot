// const socket = io();

// socket.on("message", (message) => {
//   console.log(message);
// });

const btn = document.querySelector("button");
const displayArea = document.querySelector("#available-products");
const productsEl = document.querySelector("#products");
const optionsEl = document.querySelector("#options");
const inputEl = document.querySelector("#title");

const url = "http://localhost:4000/products";

const chats = [
  { option: "Type 1 to Place an order" },
  { option: "Select 99 to checkout order" },
  { option: "Select 98 to see order history" },
  { option: "Select 97 to see current order" },
  { option: "Select 0 to see cancel order" },
];

btn.addEventListener("click", async () => {
  if (+inputEl.value === 1) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }
});

const displayProducts = (items) => {
  const displayData = items
    .map((item) => {
      const { id, product } = item;
      return `<li>${id}: ${product}</li>`;
    })
    .join(" ");
  productsEl.innerHTML = displayData;
  displayArea.appendChild(productsEl);
};

const gettingStarted = () => {
  const displayOptions = chats
    .map((chat) => {
      const { option } = chat;
      return `<li>${option}</li>`;
    })
    .join(" ");
  optionsEl.innerHTML = displayOptions;
  displayArea.appendChild(optionsEl);
};

window.addEventListener("DOMContentLoaded", gettingStarted);
