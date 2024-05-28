function getCoordintes() { 
    var options = { 
        enableHighAccuracy: true, 
        timeout: 5000, 
        maximumAge: 0 
    }; 
  
    function success(pos) { 
        var crd = pos.coords; 
        var lat = crd.latitude.toString(); 
        var lng = crd.longitude.toString(); 
        var coordinates = [lat, lng]; 
        console.log(`Latitude: ${lat}, Longitude: ${lng}`); 
        getCity(coordinates); 
        return; 
  
    } 
  
    function error(err) { 
        console.warn(`ERROR(${err.code}): ${err.message}`); 
    } 
  
    navigator.geolocation.getCurrentPosition(success, error, options); 
} 
  
function getCity(coordinates) { 
    var xhr = new XMLHttpRequest(); 
    var lat = coordinates[0]; 
    var lng = coordinates[1]; 
  
    xhr.open('GET', " https://us1.locationiq.com/v1/reverse.php?key=pk.1b3227ba0f772bfdf526d12d4b1c6762&lat=" + lat + "&lon=" + lng + "&format=json", true); 
    xhr.send(); 
    xhr.onreadystatechange = processRequest; 
    xhr.addEventListener("readystatechange", processRequest, false); 
  
    function processRequest(e) { 
        if (xhr.readyState == 4 && xhr.status == 200) { 
            var response = JSON.parse(xhr.responseText); 
            var city = response.address.state_district;
            cityNameFilter(city);
            return; 
        } 
    } 
}

function cityNameFilter(city)
{
    let spaceIndex = city.indexOf(' ');
    if (spaceIndex !== -1) {
        Cname = city.substring(0, spaceIndex + 1);
    } else {
        Cname = city;
    }
    console.log(Cname);
    return Cname;
}
  
getCoordintes();