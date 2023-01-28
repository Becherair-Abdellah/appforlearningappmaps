let address = document.getElementById("address");
let Mylocation = document.getElementById("location");
let timezone = document.getElementById("timezone");
let isp = document.getElementById("isp");
let empty = ''
let error = '';
// function show map 
function Showmap(lat,lng){
    let map = L.map('map').setView([lat,lng], 13);
let layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
layer.addTo(map);
}
// detect zone auto
if(document.getElementById('send-ip').value == ''){
    creatMap();
    detectZone(empty);
}
// if user click at button send applay this function
document.getElementById('send-ip').onclick = function(){
    if(document.querySelector('#map')){
        document.querySelector('#map').remove();
    }
    creatMap();
    detectZone(document.querySelector('#ip-address').value);
    document.querySelector('#map').addEventListener('touchmove',function(){
        document.querySelector(".more-info").classList.remove('height');
    });
    document.querySelector('#map').addEventListener('mousemove',function(){
        document.querySelector(".more-info").classList.remove('height');
    });
}
// detect zone auto
async function detectZone(ipaddress){
    try{
            // fetch data from serve with API
            let response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_SG8vsWZpS1JYThcdvey94zYEHOVV0&ipAddress=${ipaddress}`)
            let dataResponse = await response.json();
            if(dataResponse.messages){
                error = dataResponse.messages;
            }
            Showmap(dataResponse.location.lat,dataResponse.location.lng);
            // full information in element HTML
            address.innerText = dataResponse.ip
            Mylocation.innerText = dataResponse.location.city;
            timezone.innerText = dataResponse.location.timezone
            isp.innerText = dataResponse.isp;
            console.log(dataResponse);
            document.querySelector(".more-info").classList.add('height');
    }catch{
        alert(error);
        document.querySelector('#ip-address').value = '';
        document.querySelector(".more-info").classList.remove('height');
    }
}
// function creat map
function creatMap(){
    let map = document.createElement('div');
    map.id = 'map';
    document.body.appendChild(map);
}