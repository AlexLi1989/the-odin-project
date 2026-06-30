const img = document.querySelector("img");
const button = document.querySelector(".new-button");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const message = document.querySelector(".message");
fetch(
  "https://api.giphy.com/v1/gifs/translate?api_key=JnggetAr2IvmYp4C3Ze9OpUDfBS5g5NQ&s=cats",
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    img.src = response.data.images.original.url;
  });
button.addEventListener("click", function () {
  fetch(
    "https://api.giphy.com/v1/gifs/translate?api_key=JnggetAr2IvmYp4C3Ze9OpUDfBS5g5NQ&s=cats",
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      img.src = response.data.images.original.url;
    });
});
searchButton.addEventListener("click", function () {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=JnggetAr2IvmYp4C3Ze9OpUDfBS5g5NQ&s=${searchInput.value}`,
  )
    .then(function (response) {
      // to check response for 2xx
      if (!response.ok) {
        throw new Error(`HTTP 錯誤！狀態碼：${response.status}`);
      }
      return response.json();
    })
    .then(function (response) {
      // case for 200 response but no results
      if (
        !response.data ||
        (Array.isArray(response.data) && response.data.length === 0) ||
        Object.keys(response.data).length === 0
      ) {
        throw new Error("找不到與該關鍵字相關的 GIF");
      }

      // success case
      img.src = response.data.images.original.url;
    })
    .catch(function (error) {
      img.src = "#";
      message.textContent = `錯誤：${error.message}`;
      console.error("偵測到錯誤:", error);
    });
});
