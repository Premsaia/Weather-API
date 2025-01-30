let input = document.getElementById("searchInput")
let place = document.querySelector(".place")
let temp = document.querySelector(".valueText")
let humidity = document.querySelector(".humidityValueSpan")
let windSpeed = document.querySelector(".windSpeedValueSpan2")
let logoContainer = document.querySelector(".logoContainer")
let totalContainer = document.querySelector(".totalContainer")

let image = document.createElement("img")
logoContainer.appendChild(image)

var value;
input.addEventListener("change",(e)=>{
    value=e.target.value.trim();
})

let fetchWeather = async()=>{
    if (!value) {
        console.error("City name cannot be empty.");
        return;
    }

    const apiKey = "e49d0c483fa8f8c784040048545bcc6f";
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${value}&appid=${apiKey}`;

    try{
        const response= await fetch(url)
        if(!response.ok){
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json()
        console.log(data)
        temp.innerHTML= data.main.temp
        place.innerHTML= data.name
        windSpeed.innerHTML = data.wind.speed
        humidity.innerHTML = data.main.humidity
        let tempImg = data.weather[0].main
        
        switch (tempImg) {
            case "Clear":
                image.src="../images/clear.png"
                break;
            case "Clouds":
                image.src="../images/clouds.png"
                break;
            case "Drizzle":
                image.src="../images/drizzle.png"
                break;
            case "Mist":
                image.src="../images/mist.png"
                break;
            case "Rain":
                image.src="../images/rain.png"
                break;
            case "Snow":
                image.src="../images/snow.png"
                break;
            default:
                image.src="../images/clear.png"
                break;
        }
    }catch(err){
        console.error("Failed to fetch weather data:", err.message);
    }
}

let search = document.querySelector(".searchlogo")
search.addEventListener("click",()=>{
    totalContainer.classList.remove("totalContainer")
    fetchWeather()
})
