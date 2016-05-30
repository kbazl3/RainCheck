<h1> RainCheck - http://kbazl3.github.io/RainCheck/#/ </h1>
<img src="/style/images/screenshot.png">
Raincheck is a web based weather application that uses <a href="https://developer.forecast.io/"> The Dark Sky API</a> and <a href="https://developers.google.com/maps/documentation/geocoding/intro">The Google Maps Geocoding API</a> to allow weather search by city and zip.

This was a project I chose to create for my "No-Server" project at DevMountain. It's called the No-Server project because it is all front end with
no db's or servers.  I've wanted to make a weather app for sometime so I figure this would be a perfect opportunity.

<h3>Google Maps Geocoding</h3>
One of the initial problems I ran into when using the Dark Sky api was that I noticed it would only allow you to search areas by latitude and longitude.  Seeing as how nobody every knows that info off of the top of their head, I figured it would make most sense for the user to search by city or zip.  I was excited to work with the google maps API.  There documents make it real easy to work with and it is a very powerful tool that I would like to utilize again on future projects.

<h3>The Dark Sky API</h3>
There were a lot of different weather api's out there that I could have chosen to use but this particular one was highly touted as the most reliable and most accurate with its weather predictions.  Because I had to use google geocoding to grab the latitude/longitude of a location, it made the the HTTP get call to this api tricky because of promises.  This problem made me utilize angular's custom promise $q to achieve hitting both api calls and parsing through each response to grab the data I needed.  It was a great learning experience.


<h3>Tech I Used</h3>
<img src="https://cdn0.iconfinder.com/data/icons/social-network-7/50/22-128.png">
<img src="https://cdn3.iconfinder.com/data/icons/programming/100/css_3-128.png">
<img src="http://www.kalmstrom.com/images/logos/Icons/JavaScript128.png">
<img src="https://cdn0.iconfinder.com/data/icons/long-shadow-web-icons/512/angular-symbol-128.png">
<img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Google_Maps_Icon.png/128px-Google_Maps_Icon.png">
