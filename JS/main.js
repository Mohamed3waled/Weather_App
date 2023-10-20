let Input_Data = document.querySelector('.Input_Value')
let Button_Create = document.querySelector('.Search_Btn')
let Icons = document.querySelector('.Stats_Weather')

Input_Data.defaultValue = 'Egypt'


Button_Create.addEventListener('click', () => {
    if (Input_Data.value !== '') {
        GetData()
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        GetData()
    }
})




// Get Data Function 
function GetData() {
    const Api_Link = `https://api.openweathermap.org/data/2.5/weather?q=${Input_Data.value}&appid=2604d77e2e3330491d79f196bf252abf`
    fetch(Api_Link).then((Data) => {
        let Response = Data.json()
        console.log(Response);
        return Response
    }).then((F_Data) => {
        Display_Data(F_Data)
    }).catch(()=> {
        document.querySelector('.display_data').innerHTML = `<span style = "text-align : center; display : block"> Check Your InterNet </span>`
    })
}

function Display_Data(Data) {
    if (Data.message === 'city not found') {
        // If City Not Found
        document.querySelector('.display_data').style.display = 'none'
        document.querySelector('.Not_Found').style.display = 'block'
    }
    else {
        // If City Found
        document.querySelector('.display_data').style.display = 'block'
        document.querySelector('.Not_Found').style.display = 'none'
        //////
        document.querySelector('.Country').innerHTML = `${Data.name},,${Data.sys.country}`
        document.querySelector('.Number').innerHTML = `${String(Data.main.temp).slice(0, 2)}°c`

        document.querySelector('.Wind').innerHTML = `<i class="fa-light fa-wind"></i> ${Data.wind.speed}kmph `
        document.querySelector('.Precip').innerHTML = `<i class="fa-light fa-snowflake"></i> 0 mb`
        document.querySelector('.Pressure').innerHTML = `<i class="fa-light fa-tire-pressure-warning"></i> ${Data.main.pressure}mb`

        
        document.querySelector('.Stats').innerHTML = Data.weather[0].main
        if (Data.weather[0].main === "Clouds") {
            // Icons.scr = "images/Img_Stats/clouds.png"
            Icons.setAttribute('src', "images/Img_Stats/clouds.png")
        }
        else if (Data.weather[0].main === "Clear") {
            Icons.setAttribute('src', "images/Img_Stats/clear.png")
        }
        else if (Data.weather[0].main === "Drizzle") {
            Icons.setAttribute('src', "images/Img_Stats/drizzle.png")
        }
        else if (Data.weather[0].main === "Rain") {
            Icons.setAttribute('src', "images/Img_Stats/rain.png")
        }
        else if (Data.weather[0].main === "Mist") {
            Icons.setAttribute('src', "images/Img_Stats/mist.png")
        }
        else if (Data.weather[0].main === "Snow") {
            Icons.setAttribute('src', "images/Img_Stats/snow.png")
        }
    }

    // Ctiy Not Found
}
