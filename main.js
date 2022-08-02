var search = document.querySelector('.search')
var city = document.querySelector('.city')
var country = document.querySelector('.country')
var value = document.querySelector('.value')
var description = document.querySelector('.description')
var visibility = document.querySelector('.visibility span')
var wind = document.querySelector('.wind span')
var sun = document.querySelector('.sun span')
var time = document.querySelector('.time')
var content = document.querySelector('.content')
var body = document.querySelector('body')


// Hàm thay đổi weather, call API
async function ChangeWeather(capitalValue) {

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitalValue}&appid=a6ec2c888e767c311b4c7b61f853616a`

    var data = await fetch(apiUrl).then(res => res.json())
    console.log(data);

    // Nếu cod == 200 (trạng thái) thì sẽ thực hiện
    if (data.cod == 200) {
        content.classList.remove('hide')
        //đổ dữ liệu vào 
        city.innerText = data.name
        country.innerText = data.sys.country
        time.innerText = new Date().toLocaleString('vi')
        let temp = Math.round((data.main.temp - 273.15))
        value.innerText = temp
        description.innerText = data.weather[0].main
        visibility.innerText = data.visibility + 'm'
        wind.innerText = data.wind.speed + 'm/s'
        sun.innerText = data.main.humidity + '%'

        //set img cho body
        body.setAttribute('class', 'warm')
        if (temp <= 19) {
            body.setAttribute('class', 'cold') //lạnh vl
        }
        if (temp <= 22) {
            body.setAttribute('class', 'warm') //ấm quá
        }
        if (temp <= 26) {
            body.setAttribute('class', 'cool') // mát vc
        }
        if (temp > 26) {
            body.setAttribute('class', 'hot') // nóng vl
        }

        // add class hide vào content (cho content ẩn đi)
    } else {
        content.classList.add('hide')
    }
}

// search bằng cách bấm Enter
search.addEventListener('keypress', function (e) {
    if (e.code === 'Enter') {
        let capitalValue = search.value.trim()
        ChangeWeather(capitalValue)
    }
})

ChangeWeather('Ha Noi')