/* Global Variables */
const apiKey = "&appid=80d6ac480ff5b09ff4efb46f0a45976c&units=imperial";
const baseurl = "http://api.openweathermap.org/data/2.5/weather?zip=";

document.getElementById("generate").addEventListener("click", () => {
  const newzip = document.getElementById("zip").value;
  const newfeeling = document.getElementById("feelings").value;
  let d = new Date();
  let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

  //get coordinates from user input zip, from the geo API
  getData(baseurl, newzip, apiKey)
    .then(function (data) {
      postData("/add", {
        temperature: data.main.temp,
        date: newDate,
        userResponse: newfeeling,
      });
      updateUI();
    })
    .catch((error) => console.log("error", error));
});

const getData = async (baseurl, newzip, apiKey) => {
  const resWeather = await fetch(`${baseurl}${newzip}${apiKey}`);

  try {
    const data = await resWeather.json();
    return data;
  } catch (error) {
    console.log("weather data error", error);
  }
};

const postData = async (url, data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });
  /*   console.log("postres", response.json());
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  } */
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML =
      Math.round(allData.temperature) + " degrees";
    document.getElementById("content").innerHTML = allData.userResponse;
  } catch (error) {
    console.log("UI error", error);
  }
};
