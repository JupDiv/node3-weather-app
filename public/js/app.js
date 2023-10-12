// need to understand how we can start geolocation api automatically

const getWeather = (place) => {
  const url = `/weather?address=${place}`;
  messageOne.textContent = "Page is loading";
  messageTwo.textContent = "";
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.log(response.errored);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        const { location, forecast } = data;
        messageOne.textContent = location;
        messageTwo.textContent = forecast;
      }
    });
};
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  getWeather(location);
});
