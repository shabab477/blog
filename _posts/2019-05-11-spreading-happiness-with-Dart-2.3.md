---
title: Spreading Happiness With Dart 2.3
description: Dartlang is an amazing language which is always developing to suit the developer needs. Dart 2.3 focuses on 'UI-as-code' and gives us some cool features to make our UI code clean and intuitive
comments: true
image: https://jaxenter.com/wp-content/uploads/2019/05/shutterstock_757814905-350x233.jpg
---

![dart-image](https://jaxenter.com/wp-content/uploads/2019/05/shutterstock_757814905-350x233.jpg)


`Dartlang` is an amazing language which is always developing to suit the developer needs. Dart 2.3 focuses on `UI-as-code` and gives us some cool features to make our UI code clean and intuitive. 

First lets go through a sample Flutter code.

{% highlight dart linenos %}

Widget build(BuildContext context) {
    return Column(
        children: <Widget>[
            Text("My Name is Shabab"),
            Text("I usually write code in Java"),
            Text("But now I write code in Dart(on the side)")   
        ]
    );
}

{% endhighlight %}

Now, requirements come that if the UI state comes in as `_knowsJava` then add a job status as employed. Lets see how we would do that.

{% highlight dart linenos %}

Widget build(BuildContext context) {
    var textChildren = <Widget>[Text("My Name is Shabab")];

    if (_knowsJava) {
        textChildren.add(Text("I am employed!"));
    }

    textChildren.addAll(<Widget>[
        Text("I usually write code in Java"),
        Text("But now I write code in Dart(on the side)") 
    ]);


    return Column(
        children: textChildren
    );
}

{% endhighlight %}

See this code? Its a pretty simple UI code but still I had to go through some serious mental overhead to understand what the UI is supposed to be like. I basically had to do the job of the compiler to understand what's going on. Lets now see how we can change this with Dart 2.3

{% highlight dart linenos %}

Widget build(BuildContext context) {
    return Column(
        children: <Widget>[
            Text("My Name is Shabab"),
            if (_knowsJava)
                Text("I am employed!"),
            Text("I usually write code in Java"),
            Text("But now I write code in Dart(on the side)")   
        ]
    );
}

{% endhighlight %}

That's it! No need to go through the lines of code, adding widgets conditionally to an array and then passing it as children. 

But wait a minute? Do you hear the rumbling of new requirements?! There's a new requirement where I need to list out things I love doing in leisure time. So how would we do that before.

{% highlight dart linenos %}

Widget build(BuildContext context) {
    var textChildren = <Widget>[Text("My Name is Shabab")];

    if (_knowsJava) {
        textChildren.add(Text("I am employed!"));
    }

    textChildren.addAll(<Widget>[
        Text("I usually write code in Java"),
        Text("But now I write code in Dart(on the side)") 
    ]);

    textChildren.add(Text("Here's a list of things I like:"));
    textChildren.addAll(_listOfThingsILike);

    return Column(
        children: textChildren
    );
}

{% endhighlight %}

So, if there's a requirement where I need to add a list then I would need to do programatic approach to show in the UI. With Dart 2.3 we don't have to anymore with the `spread` operator. 

{% highlight dart linenos %}

Widget build(BuildContext context) {
    return Column(
        children: <Widget>[
            Text("My Name is Shabab"),
            if (_knowsJava)
                Text("I am employed!"),
            Text("I usually write code in Java"),
            Text("But now I write code in Dart(on the side)"),
            Text("Here's a list of things I like:"),
            ..._listOfThingsILike
        ]
    );
}

{% endhighlight %}

This works like the spread operator in JavaScript. Actually, since Dart 2.3 allows conditionals inside the UI code so one would wonder whether they allow the same with loops too. Actually it does! Here's an where we add padding around the text in a `for` loop.

{% highlight dart linenos %}

Widget build(BuildContext context) {
    return Column(
        children: <Widget>[
            Text("My Name is Shabab"),
            if (_knowsJava)
                Text("I am employed!"),
            Text("I usually write code in Java"),
            Text("But now I write code in Dart(on the side)"),
            Text("Here's a list of things I like:"),
            for (var likedThing in _listOfThingsILike)
                Padding(
                    padding: EdgeInsets.all(8.0),
                    child: likedThing
                ),
        ]
    );
}

{% endhighlight %}

We can do something better and use maps in the UI code.

{% highlight dart linenos %}

Widget build(BuildContext context) {
    return Column(
        children: <Widget>[
            Text("My Name is Shabab"),
            if (_knowsJava)
                Text("I am employed!"),
            Text("I usually write code in Java"),
            Text("But now I write code in Dart(on the side)"),
            Text("Here's a list of things I like:"),
            ..._listOfThingsILike.map((likedThing) =>
                Padding(
                    padding: EdgeInsets.all(8.0),
                    child: likedThing
                )
            ),
        ]
    );
}

{% endhighlight %}

These are just some of the improvements in the language that were added in Dart 2.3. There are other awesome features that you can check out [here](https://github.com/dart-lang/sdk/blob/master/CHANGELOG.md#230)