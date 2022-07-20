
(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			alignment: 'center',
			detach: false
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo h1').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

})(jQuery);
// 'https://api.watchmode.com/v1/autocomplete-search/?apiKey=cragphpKTzQkID1PoMMIlfPlGbUb9fOEU5JJjykQ&search_value=benjamin&search_type=2'

//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)
// let id =[];
let KEY = "cragphpKTzQkID1PoMMIlfPlGbUb9fOEU5JJjykQ"
// const sourceurl = `https://api.watchmode.com/v1/title/{title_id}/sources/`
const proxy = "https://cors-anywhere.herokuapp.com/corsdemo"

function getFetch(){
  const choice = document.querySelector('input').value
  const searchurl = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${KEY}&search_value=${choice}&search_type=2`
  fetch(searchurl)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector("#main").classList.remove("hideTillSearch") 
        const resultList = document.querySelector("#titleResultList");
        let list = (data["results"])
		while(resultList.firstChild){
			resultList.removeChild(resultList.firstChild)
		}
        
        for(let result in list){
            let thing;
            document.querySelector('#titleResultList').scrollIntoView({behavior: 'smooth',alignToTop: true})
            if(thing == ""){
                thing = (list[result]).name + `\n` + `(${(list[result]).year})`
            }
            if(thing != (list[result]).name + `\n` + `(${(list[result]).year})`){
                let li = document.createElement('li');
                let anchor = document.createElement('a')
                let image = document.createElement('img');
                let h4 = document.createElement("h4")
                h4.innerText = (list[result]).name + `\n` + `(${(list[result]).year})`
                h4.classList.add("frostedGlass") 
                h4.classList.add("movieTitle") 
                cid = (list[result]).id
                li.classList.add("titleResultItem")
                resultList.appendChild(li)
                li.addEventListener('click',getSource.bind(null,cid), false)
                anchor.href ="#streamList"
                if((list[result]).image_url){
                    image.src = (list[result]).image_url
                    image.classList.add("image")
                    image.classList.add("fit")
                }else{
                    image = document.createElement("h3")
                    image.innerText = "No Poster Available"
                    image.style = "background-color: black; color:white; text-align:center; padding-top:25%;padding-bottom:25%;"
                }
                li.appendChild(anchor)
                anchor.appendChild(image)
                anchor.appendChild(h4)
                thing = h4.innerText 
                //   li.appendChild(getSource(cid)) 
            }else{
                continue;
            }
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
// `https://api.watchmode.com/v1/title/4147874/sources/?apiKey=cragphpKTzQkID1PoMMIlfPlGbUb9fOEU5JJjykQ`

function getSource(cid){
  let title_id = cid
  console.log(cid)
  let sourceurl = `https://api.watchmode.com/v1/title/${title_id}/sources/?apiKey=${KEY}`
  fetch(sourceurl,{
  })
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
		const streamlist = document.querySelector("#streamList");
        let section = document.querySelector("#serviceSection")
        while(section.firstElementChild == streamlist ){
            let availableon = document.createElement("h2")
            availableon.textContent = "Available on:"
            section.insertBefore(availableon,section.firstChild)

        }
		while(streamlist.firstChild){
            streamlist.removeChild(streamlist.firstChild)
		}
        let idList = []
        for (let thing in data){
            let sourceId = (data[thing])["source_id"]
            let nostreams = false;
            if ((data[thing])["region"] == "US" && !idList.includes(sourceId)){
                let listitem = document.createElement("li")
                let a = document.createElement("a")
                a.href=(data[thing])["web_url"]
                let span = document.createElement("span")
                span.textContent = `${(data[thing])["name"]}`
                listitem.id = "serviceResultItem"
                // listitem.classList.add("frostedGlass")
                listitem.appendChild(a)
                a.appendChild(span)
                streamlist.appendChild(listitem)
                let logos =document.createElement("img")
                logos.src =(data[thing])["logo_100px"] 
                logos.classList.add("image")
                // listitem.appendChild(logos)
                idList.push(sourceId)
                // return streamlist
            }else{ 
                nostreams = true
            }
        }
        // for (let thing in data){
            
        //     let nostreams = false;
        //     for(let item in services){

        //         if ((data[thing])["source_id"] == (services[item])["id"] && (data[thing])["region"] == "US"){
        //             let listitem = document.createElement("li")
        //             let span = document.createElement("span")
        //             span.textContent = `${(services[item])["name"]}`
        //             listitem.id = "serviceResultItem"
        //             // listitem.classList.add("frostedGlass")
        //             listitem.appendChild(span)
        //             streamlist.appendChild(listitem)
        //             let logos =document.createElement("img")
        //             logos.src =(services[item])["logo_100px"] 
        //             logos.classList.add("image")
        //             listitem.appendChild(logos)
        //             // return streamlist
        //         }else{ 
        //             nostreams = true
        //         }
        //     }
        // }

		if(nostreams === true){
			let listitem = document.createElement("li")
			listitem.innerText = "Not available."
			streamlist.appendChild(listitem)
		}

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

let services = [
  {
      "id": 203,
      "name": "Netflix",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/netflix_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/netflix/id363590051",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.netflix.mediaclient&hl=en",
      "android_scheme": "nflx",
      "ios_scheme": "nflx",
      "regions": [
          "US",
          "CA",
          "GB",
          "AU",
          "BR",
          "AR",
          "BE",
          "BG",
          "CH",
          "CL",
          "CO",
          "CZ",
          "DE",
          "DK",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GR",
          "HK",
          "HR",
          "HU",
          "ID",
          "IE",
          "IL",
          "IN",
          "IS",
          "JP",
          "KR",
          "LT",
          "MX",
          "MY",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "RO",
          "RS",
          "RU",
          "SE",
          "SG",
          "TH",
          "TR",
          "UA",
          "VN",
          "ZA",
          "ar",
          "ch",
          "cl",
          "co",
          "ec",
          "ee",
          "fr",
          "gr",
          "id",
          "jp",
          "kr",
          "lt",
          "mx",
          "my",
          "pe",
          "ph",
          "sg",
          "th",
          "tr",
          "vn",
          "za"
      ]
  },
  {
      "id": 157,
      "name": "Hulu",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/hulu_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/hulu-plus/id376510438",
      "android_playstore_url": "https://play.google.com/store/apps/details?id=com.hulu.plus",
      "android_scheme": "hulu",
      "ios_scheme": "hulu",
      "regions": [
          "US"
      ]
  },
  {
      "id": 26,
      "name": "Amazon Prime",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/prime_video_100px.png",
      "ios_appstore_url": "http://itunes.apple.com/app/amazon-instant-video/id545519333",
      "android_playstore_url": "http://amazon.com/GetAndroidVideo",
      "android_scheme": "intent",
      "ios_scheme": "aiv",
      "regions": [
          "AR",
          "CH",
          "CL",
          "CO",
          "EC",
          "FR",
          "MX",
          "PA",
          "PE",
          "US",
          "IE",
          "GB",
          "ES",
          "NZ",
          "ZA",
          "DE",
          "HK",
          "ID",
          "IN",
          "MY",
          "PH",
          "PT",
          "TH",
          "VN",
          "RO",
          "BE",
          "IL",
          "KR",
          "RU",
          "DK",
          "FI",
          "IS",
          "NO",
          "SE",
          "PL",
          "NL",
          "SG",
          "HU",
          "BG",
          "CZ",
          "EE",
          "GR",
          "HR",
          "LT",
          "RS",
          "TR",
          "UA",
          "BR",
          "JP",
          "CA",
          "AU",
          "be",
          "dk",
          "fi",
          "in",
          "nl",
          "no",
          "se"
      ]
  },
  {
      "id": 387,
      "name": "HBO MAX",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/hbomax_100px.png",
      "ios_appstore_url": null,
      "android_playstore_url": null,
      "android_scheme": "hbomax",
      "ios_scheme": "hbomax",
      "regions": [
          "US",
          "AR",
          "CL",
          "CO",
          "EC",
          "MX",
          "PE",
          "BR"
      ]
  },
  {
      "id": 372,
      "name": "Disney+",
      "type": "sub",
      "logo_100px": "https://cdn.watchmode.com/provider_logos/disneyPlus_100px.png",
      "ios_appstore_url": "https://apps.apple.com/app/disney/id1446075923",
      "android_playstore_url": null,
      "android_scheme": "disneyplus",
      "ios_scheme": "disneyplus",
      "regions": [
          "FR",
          "US",
          "CA",
          "GB",
          "AU",
          "BR",
          "AR",
          "BE",
          "CH",
          "CL",
          "CO",
          "DE",
          "DK",
          "ES",
          "FI",
          "MX",
          "NL",
          "NO",
          "NZ",
          "PT",
          "SE"
      ]
  }
]

const menu = document.querySelector("#servicelist");
for (let item in services){
  let li = document.createElement('li');
  let img = document.createElement('img')
  img.src = (services[item])["logo_100px"]
  img.id = "searchServiceIcon"
//   li.innerText = (services[item]).name
  li.appendChild(img)
  menu.appendChild(li)
}


let titleres = {
  "results": [
      {
          "name": "Breaking Bad",
          "relevance": 445.19,
          "type": "tv_series",
          "id": 3173903,
          "year": 2008,
          "result_type": "title",
          "tmdb_id": 1396,
          "tmdb_type": "tv",
          "image_url": "https://cdn.watchmode.com/posters/03173903_poster_w185.jpg"
      },
      {
          "name": "El Camino: A Breaking Bad Movie",
          "relevance": 169.83,
          "type": "movie",
          "id": 1586594,
          "year": 2019,
          "result_type": "title",
          "tmdb_id": 559969,
          "tmdb_type": "movie",
          "image_url": "https://cdn.watchmode.com/posters/01586594_poster_w185.jpg"
      },
      {
          "name": "No Half Measures: Creating the Final Season of Breaking Bad",
          "relevance": 162.62,
          "type": "movie",
          "id": 1672293,
          "year": 2013,
          "result_type": "title",
          "tmdb_id": 239459,
          "tmdb_type": "movie",
          "image_url": "https://cdn.watchmode.com/posters/01672293_poster_w185.jpg"
      },
      {
          "name": "The Road to El Camino: Behind the Scenes of El Camino: A Breaking Bad Movie",
          "relevance": 125.58,
          "type": "movie",
          "id": 539605,
          "year": 2019,
          "result_type": "title",
          "tmdb_id": 934809,
          "tmdb_type": "movie",
          "image_url": "https://cdn.watchmode.com/posters/0539605_poster_w185.jpg"
      },
      {
          "name": "Breaking Bad Wolf",
          "relevance": 59.2,
          "type": "tv_movie",
          "id": 4146033,
          "year": 2018,
          "result_type": "title",
          "tmdb_id": 635602,
          "tmdb_type": "movie",
          "image_url": "https://cdn.watchmode.com/posters/04146033_poster_w185.jpg"
      }
  ]
}


let exsourceres = [
    {
        "source_id": 344,
        "name": "YouTube",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.youtube.com/watch?v=WAq0hksGGVE",
        "format": "4K",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 398,
        "name": "Microsoft Store",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.microsoft.com/en-us/p/up/8d6kgwzl5wms",
        "format": "4K",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 398,
        "name": "Microsoft Store",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.microsoft.com/en-us/p/up/8d6kgwzl5wms",
        "format": "HD",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 398,
        "name": "Microsoft Store",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.microsoft.com/en-us/p/up/8d6kgwzl5wms",
        "format": "SD",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 24,
        "name": "Amazon",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.amazon.com/gp/video/detail/amzn1.dv.gti.5aa9f738-a7d8-4eb8-1c76-2ac08130e097?",
        "format": "4K",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 24,
        "name": "Amazon",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.amazon.com/gp/video/detail/amzn1.dv.gti.5aa9f738-a7d8-4eb8-1c76-2ac08130e097?",
        "format": "HD",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 24,
        "name": "Amazon",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.amazon.com/gp/video/detail/amzn1.dv.gti.5aa9f738-a7d8-4eb8-1c76-2ac08130e097?",
        "format": "SD",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 307,
        "name": "VUDU",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.vudu.com/content/movies/details/content/169679",
        "format": "4K",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 307,
        "name": "VUDU",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.vudu.com/content/movies/details/content/169679",
        "format": "HD",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 307,
        "name": "VUDU",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.vudu.com/content/movies/details/content/169679",
        "format": "SD",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 140,
        "name": "Google Play",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://play.google.com/store/movies/details?id=wTpsA1myfPw",
        "format": "4K",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 349,
        "name": "iTunes",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://itunes.apple.com/us/movie/up/id322447599?uo=4&at=10laHb",
        "format": "4K",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 349,
        "name": "iTunes",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://itunes.apple.com/us/movie/up/id322447599?uo=4&at=10laHb",
        "format": "HD",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 349,
        "name": "iTunes",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://itunes.apple.com/us/movie/up/id322447599?uo=4&at=10laHb",
        "format": "SD",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 442,
        "name": "DirecTV On Demand",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.directv.com/movies/Up-MHNjb05obnp1aXduUC95ZVY4SER5QT09",
        "format": "HD",
        "price": 3.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 443,
        "name": "Spectrum On Demand",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://ondemand.spectrum.net/movies/190662/up/",
        "format": "HD",
        "price": 4.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 443,
        "name": "Spectrum On Demand",
        "type": "rent",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://ondemand.spectrum.net/movies/190662/up/",
        "format": "SD",
        "price": 4.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 344,
        "name": "YouTube",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.youtube.com/watch?v=WAq0hksGGVE",
        "format": "4K",
        "price": 9.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 344,
        "name": "YouTube",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.youtube.com/watch?v=WAq0hksGGVE",
        "format": "HD",
        "price": 7.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 398,
        "name": "Microsoft Store",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.microsoft.com/en-us/p/up/8d6kgwzl5wms",
        "format": "4K",
        "price": 9.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 398,
        "name": "Microsoft Store",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.microsoft.com/en-us/p/up/8d6kgwzl5wms",
        "format": "HD",
        "price": 19.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 398,
        "name": "Microsoft Store",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.microsoft.com/en-us/p/up/8d6kgwzl5wms",
        "format": "SD",
        "price": 19.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 24,
        "name": "Amazon",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.amazon.com/gp/video/detail/amzn1.dv.gti.5aa9f738-a7d8-4eb8-1c76-2ac08130e097?",
        "format": "4K",
        "price": 9.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 24,
        "name": "Amazon",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.amazon.com/gp/video/detail/amzn1.dv.gti.5aa9f738-a7d8-4eb8-1c76-2ac08130e097?",
        "format": "HD",
        "price": 19.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 24,
        "name": "Amazon",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.amazon.com/gp/video/detail/amzn1.dv.gti.5aa9f738-a7d8-4eb8-1c76-2ac08130e097?",
        "format": "SD",
        "price": 19.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 307,
        "name": "VUDU",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.vudu.com/content/movies/details/content/169679",
        "format": "4K",
        "price": 9.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 307,
        "name": "VUDU",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.vudu.com/content/movies/details/content/169679",
        "format": "HD",
        "price": 9.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 307,
        "name": "VUDU",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.vudu.com/content/movies/details/content/169679",
        "format": "SD",
        "price": 9.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 140,
        "name": "Google Play",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://play.google.com/store/movies/details?id=wTpsA1myfPw",
        "format": "4K",
        "price": 9.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 140,
        "name": "Google Play",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://play.google.com/store/movies/details?id=wTpsA1myfPw",
        "format": "HD",
        "price": 7.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 349,
        "name": "iTunes",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://itunes.apple.com/us/movie/up/id322447599?uo=4&at=10laHb",
        "format": "4K",
        "price": 9.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 349,
        "name": "iTunes",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://itunes.apple.com/us/movie/up/id322447599?uo=4&at=10laHb",
        "format": "HD",
        "price": 9.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 349,
        "name": "iTunes",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://itunes.apple.com/us/movie/up/id322447599?uo=4&at=10laHb",
        "format": "SD",
        "price": 9.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 442,
        "name": "DirecTV On Demand",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.directv.com/movies/Up-MHNjb05obnp1aXduUC95ZVY4SER5QT09",
        "format": "HD",
        "price": 19.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 442,
        "name": "DirecTV On Demand",
        "type": "buy",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.directv.com/movies/Up-MHNjb05obnp1aXduUC95ZVY4SER5QT09",
        "format": "4K",
        "price": 19.99,
        "seasons": null,
        "episodes": null
    },
    {
        "source_id": 372,
        "name": "Disney+",
        "type": "sub",
        "region": "US",
        "ios_url": "Deeplinks available for paid plans only.",
        "android_url": "Deeplinks available for paid plans only.",
        "web_url": "https://www.disneyplus.com/movies/up/3XiRSXriK0E8",
        "format": "4k",
        "price": null,
        "seasons": null,
        "episodes": null
    }
]