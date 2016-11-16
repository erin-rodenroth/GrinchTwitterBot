//used code from the examplebot to assist with my project
var Twit = require('twit');

var T = new Twit(require('./config.js'));
var prevUserName;
var lastTweet;

function grinchReply() {

	hashtags = [
			"#christmas",
			"#christmas2016",
			"#ChristmasIsComing",
			"#SantaClaus",
			"#Santa",
			"#rudolf",
		];

	phrases = [
			"BAH HUMBUG!",
			"Hate, hate. Double hate. LOATHE ENTIRELY!",
			"Christmas is the one thing I HATE!",
			"Christmas, what a lot of rot",
			"Are you having a holly jolly Christmas? Bc I'm NOT!",
			"The Christmas presents... they'll be DESTROYED!",
			"Rudolf is a freak with a nose and no one likes him.",
			"Christmas smells like joy and I HATE joy.",
			"If you utter so much as one syllable, I'LL HUNT YOU DOWN AND GUT YOU LIKE A FISH!!",
			"Christmas means VENGEANCE!",
		];


	var tagsIndex = Math.floor(Math.random()*hashtags.length);
	var tagsSearch = {q: hashtags[tagsIndex] , count: 10, result_type: "recent"};

	T.get('search/tweets', tagsSearch, function (error, data) {

	  console.log(error, data);

	  if (!error) {

		var userName = data.statuses[0].user.screen_name;

		T.post('statuses/update', {status: "@" + userName + " " + phrases[Math.floor((Math.random() * phrases.length))] }, function (err, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}

			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }

	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}


var grinchSearch = {q: "#grinch", count: 10, result_type: "recent"};


function grinchRetweet() {
	T.get('search/tweets', grinchSearch, function (error, data) {

	  console.log(error, data);

	  if (!error) {

		var retweetId = data.statuses[0].id_str;

		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}

			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }

	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}



function grinchTweets() {
	tweets = [
			"Hmm, dinner tonight with me. Can't cancel that again... #dinnerplans",
			"I guess I could use a little...social interaction. #antisocial #idontlikepeople",
			"Blast this Christmas music! It's joyful and triumphant >:( #ihatechristmasmusic",
			"Am I just eating because I'm bored?? #bored",
			"Kids today. So desensitized by movies and TV...",
			"I don't know why I ever leave my house.",
			"Ah, it's time to wallow in self-pity!",
			"Should I go out tonight?... nah I'm not going to #ughpeople",
			"All I want for Christmas is you... to stop breathing my air #goaway",
			"I guess I could use a little social interaction...",
		];
		T.post('statuses/update', { status: tweets[Math.floor((Math.random() * 10))]}, function(err, data, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
			}
	});
}

function tweetBack() {
	myTweets = [
			"BAH HUMBUG!",
			"One man's toxic waste is another man's potpourri",
			"Oh the who-manity...",
			"What a lot of rot you are.",
			"Ugh.",
			"Ugh, it's because I'm green isn't it?",
			"I know I'm just so fun to be around, but leave me alone!",
			"Christmas smells like joy and I HATE joy.",
			"If you utter so much as one syllable, I'LL HUNT YOU DOWN AND GUT YOU LIKE A FISH!!",
			"I don't like people, especially people who enjoy Christmas.",
		];

			T.get('search/tweets', {q: '@theXMAS_Grinch', count: 10, result_type: "recent"} , function (error, data) {

			  console.log(error, data);

			  if (!error) {

				var userName = data.statuses[0].user.screen_name;
				if (userName != prevUserName || lastTweet != data.statuses[0].id_str) {

				T.post('statuses/update',  {status: '@' + userName + " " + myTweets[Math.floor((Math.random() * 10))], in_reply_to_status_id: data.statuses[0].id_str}, function (error, response) {
					if (response) {
						console.log('Success! Check your bot, it should have retweeted something.')
						console.log(data.statuses[0].id_str);
					}

					if (error) {
						console.log('There was an error with Twitter:', error);
					}

				})
				}
				prevUserName = userName;
				lastTweet = data.statuses[0].id_str;
			 }

			  else {
			  	console.log('There was an error with your search:', error);
			  }
	  });

  }

grinchTweets();
grinchRetweet();
grinchReply();
tweetBack();

setInterval(grinchReply, 1000 * 60 * 60);
setInterval(grinchRetweet, 1000 * 60 * 30);
setInterval(grinchTweets, 1000 * 60 * 60 * 2);
setInterval(tweetBack, 1000 * 60 * 10);
