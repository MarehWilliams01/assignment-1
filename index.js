let weather = {
    apiKey: "3e7577b64904af0cb37d20a17b865d61",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".weather-description-icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = temp;
        document.querySelector(".humidity").innerText = humidity;
        document.querySelector(".wind").innerText = speed;

        if (icon === "04d" || icon === "03d" || icon === "02d") {
            document.body.style.backgroundImage =
                "url('images/Cloudy.jpeg')";
        }
        else if (icon === "01d") {
            document.body.style.backgroundImage = "url('images/Sunny.jpg')";
            document.body.style.color = "#141821";
        }
        else if (icon === "09d" || icon === "10d" || icon === "11d") {
            document.body.style.backgroundImage = "url('images/Rain.jpeg')";
        }
        else if (icon === "01n" || icon === "02n" || icon === "03n" || icon === "04n" || icon === "09n" || icon === "10n" || icon === "11n") {
            document.body.style.backgroundImage = "url('images/Dark sky.jpeg')";
        }
        else {
            document.body.style.backgroundImage = "url('images/Any other weather.jpg')";
        }

        document.querySelector(".loading").classList.remove("loading")

    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".weather-input button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Accra");