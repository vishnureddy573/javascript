var weatherinfo={};
window.addEventListener('load',() =>{
    // alert("window loaded")
    var weatherinfo={};
    var lat, lon;
    var apikey = 'ybWqcZ7E8ftx2d9OAZcXLscH54T32SwH';
     var country,locationname,locationkey,timezone;
    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat + " " + lon);
        
        var geoposition = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${lat},${lon}`;
        // console.log(geoposition);       
        axios.get(geoposition)
            .then((response) => {
                // console.log(response);
                // country=response.data.EnglishName;
                // locationkey=response.data.Key;
                // timezone=response.data.TimeZone;
                // locationname=response.data.LocalizedName;
                weatherinfo['country']=response.data.Country.EnglishName;
                weatherinfo['locationkey']=response.data.Key;
                weatherinfo['timezone']=response.data.TimeZone;
                weatherinfo['locationname']=response.data.LocalizedName;
                // for checking purpose
                // console.log('country',country);
                // console.log('locationkey',locationkey);
                // console.log('locationname',locationname);
                // console.log('tiimezone',timezone);
                getweatherapi(weatherinfo.locationkey,apikey);
                returnId('country').textContent = "Country"+"  "+":"+"  "+weatherinfo['country'];
                returnId('currentloc').textContent ="Location"+"  "+":"+"  "+weatherinfo['locationname'];
                // console.log("res",weatherinfo);

            });
    });
});

function getweatherapi(locationkey,apikey){
    
    var weatherurl=`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationkey}?apikey=${apikey}`;
    axios.get(weatherurl).then((response)=>{
        // console.log("weather response" ,response);
        weatherinfo['date']=response.data.DailyForecasts[0].Date;
        weatherinfo['day']=response.data.DailyForecasts[0].Day;
        weatherinfo['night']=response.data.DailyForecasts[0].Night;
        weatherinfo['temp']=response.data.DailyForecasts[0].Temperature;
        // console.log("weather",weatherinfo);

        // var imageurl="https://developer.accuweather.com/sites/default/files/02-s.png";
        var today=new Date(weatherinfo['date']);

        
        
        returnId('today').textContent ="Date"+"  "+":"+"  "+today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        if(weatherinfo.day.Icon<10){
            returnId('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${weatherinfo.day.Icon}-s.png`);
        }else{
            returnId('morning').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${weatherinfo.day.Icon}-s.png`);
        }
        if(weatherinfo.night.Icon<10){
            returnId('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/0${weatherinfo.night.Icon}-s.png`);
        }else{
            returnId('night').setAttribute('src',`https://developer.accuweather.com/sites/default/files/${weatherinfo.night.Icon}-s.png`);
        }
        returnId('mrng-desc').textContent=weatherinfo.day.IconPhrase;
        returnId('night-desc').textContent=weatherinfo.night.IconPhrase;
        returnId('max').textContent="maximum temparature"+"  "+":"+"  "+weatherinfo.temp.Maximum.Value;
        returnId('min').textContent="minimum temparature"+"  "+":"+"  "+weatherinfo.temp.Minimum.Value;
    })
    return {};
}

function returnId(id){
    return document.getElementById(id);
}
