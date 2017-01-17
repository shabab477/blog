---
title: Javascript Promises
description: Javascript is single threaded. So one script can be blocked by the other script, which can expose our code to some interesting caveats. Promises gives us a neat solution to all these problems.
image: https://i.imgflip.com/1http0.jpg
comments: true
---

<img src="https://i.imgflip.com/1http0.jpg" title="confession bear"/>

This is my second post on Javascript. People who know me be like "But I thought you hated Javascript?!". Yes, I still do. I still think javascript is not a well designed  language and I will forever be trashing on functional programming.

Now that's out of the way lets start on today's topic. **Javascript promises**.

To understand promises we need to start with **callback functions**. Callback functions are just functions passed as parameters to other functions. Suppose 'X' is a function that is passed on to function 'Y' as a parameter. Now 'Y' calls the function 'X' upon certain event or when something has come up and we need to call that. For example:

{% highlight javascript linenos%}

setTimeout(function(){
	console.log("calling back from callback");
}, 5000);

{% endhighlight %} 

The first parameter in **setTimeout** function is a callback function. Function **setTimeout** knows that it needs to call and give back(aha!) from the function that has been passed into it in the first parameter.

Okay so now you know callbacks. Callbacks are pretty important in javascript. They are pretty much everywhere, specially in handling **events**. I don't know about you but for me every javascript feature seems to bring problems on its own. Callbacks are no different. 

Okay so we have an image tag like this:

{% highlight html linenos%}

<img id='my_image'>

{% endhighlight %}

We want to give the image tag a value in the **src** attribute. After its loaded say we want to print a success message. If there is a problem while loading the image then we print the error message. Thats our problem. Lets start coding.

{% highlight javascript linenos%}

var image = document.getElementById("my_image");

image.src = "https://www.dreamhost.com/blog/wp-content/uploads/2015/10/DHC_blog-image-01-300x300.jpg";

image.addEventListener('load', function() {
  console.log("success");
});

image.addEventListener('error', function() {
  console.log("broken");
});

{% endhighlight %} 

So thats it right? Well it works in most cases but enter javascript, where the scripts are handled in a single thread. The browser is multi-threaded but the scripts are not. So between lines 3 and 4 it might be possible that the image has finished loading even before we have set an **onload** listener, never calling the callback function.

Well people have come up with interesting solutions but it makes the code really ugly. Speaking of ugly code what if our code is heavily dependent on callbacks? Its a pretty common scenario in most cases. Lets see one dumbed down example of such code.


{% highlight javascript linenos%}

myRestCall(url, function(response){
	if(isSuccess)
	{
		process(response, function()
		{
			//check all data and put it in array
			if(allDataPresent)
			{
				insertToDOM(function(array){
					//do insertion to DOM code and blah blah
				});
			}
			else
			{
				console.log("some data missing");
			}
		});
	}
	else
	{
		console.log("network failed");
	}
});

{% endhighlight %} 

The above code is quite plausible when you're working with API calls or working with **Node Js**. This weird phenomenom where you need to chain callbacks one after another has a terrifying name and rightly so, "The pyramid of doom" or "Callback hell".

This is how people have been coding for some time until Promises came in. Promises are just like callbacks but they have some added functionalities:

1. If a promise has succeeded or failed and you later add a success/failure callback, the correct callback will be called, even though the event took place earlier

2. A promise can only succeed or fail once. It cannot succeed or fail twice, neither can it switch from success to failure or vice versa.

So you can see that our first caveat with an image getting loaded before the listener had been loaded is solved by the first property of promises because even though the event had occured we will still call the function. 

This is how promises actually work in code:



{% highlight javascript linenos%}

var promise = new Promise(function(resolve, reject) {
  // do something, in this case our image

  if (/* image loaded out fine */) {
    resolve("Working");
  }
  else {
    reject(Error("Not working"));
  }
});

promise.then(function(message){
	
	console.log(message); //Working

}, function(error){
	
	//handle error
});

{% endhighlight %} 

So we can see that the promise object takes in a callback function which has two parameters. The first is a success function and the second is an error function. We pass these two functions in the **then** call in line 12. 

Now what if I need to do is a chain of promises and error handle all of them with a common function. We have a way to do that too, with **Promise.all** and **catch**.


{% highlight javascript linenos%}
var promise1 = new Promise(function(resolve, reject) { 
	// A mock async action using setTimeout
	setTimeout(function() { resolve('First!'); }, 4000);
});

var promise2 = new Promise(function(resolve, reject) { 
	// A mock async action using setTimeout
	setTimeout(function() { reject('Second!'); }, 3000);
});

Promise.all([promise1, promise2]).then(function(results) {
	console.log('Then: ', results);
}).catch(function(err) {
	console.log('Catch: ', err);
});

{% endhighlight %} 

In the above case the promise1 gives no error but promise2 does firing the catch block.

We can also avoid "The pyramid of doom" like this.

{% highlight javascript linenos%}

var promise = new Promise(function(resolve, reject){
	//get json response from url
	if(status === 200)
	{
		resolve(response);
	}
	else
	{
		//404 error
		reject(Error("error"));
	}
});

promise.then(function(response){
	//send to different function to validate
	return response;
}).then(function(data){
	//check for data and send array to add to DOM
}).then(function(array){
	//add to DOM
});

{% endhighlight %} 

Boom! Now your completely unreadable callback function chain has become absolutely readable, even close to english language I must say. Hope promises are clear now, if something is not understandable please comment below, I will try to get back as soon as I can.







