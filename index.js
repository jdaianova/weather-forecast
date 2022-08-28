const api = {
  endpoint: "https://api.openweathermap.org/data/2.5/",
  key: "2aa33e001bc90fc629e446c6b66e20ee",
};
const input = document.querySelector("#input");

input.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    getInfo(input.value);
    input.value = "";
  }
});

async function getInfo(data) {
  const info = await fetch(
    `${api.endpoint}weather?q=${data}&units=metric&&APPID=${api.key}`
  );
  const result = await info.json();
  showResult(result);
}

function showResult(data) {
  document.querySelector(
    ".city"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.querySelector(".date").textContent = `${showDate()}`;
  document.querySelector(".temperature").innerHTML = `${Math.round(
    data.main.temp
  )}<span>&#176;<span>`;
  document.querySelector(".feels-like").innerHTML = `feels like ${Math.round(
    data.main.feels_like
  )}<span>&#176;<span>`;
  document.querySelector(".conditions").textContent = `${data.weather[0].main}`;
  document.querySelector(".variations").innerHTML = `min ${Math.round(
    data.main.temp_max
  )}<span>&#176;<span> max ${Math.round(data.main.temp_max)}<span>&#176;<span>`;
}

function showDate() {
  let currentDate = new Date();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${
    daysOfWeek[currentDate.getDay()]
  } ${currentDate.getDate()} ${currentDate.toLocaleString("default", {
    month: "long",
  })} ${currentDate.getFullYear()}`;
}
