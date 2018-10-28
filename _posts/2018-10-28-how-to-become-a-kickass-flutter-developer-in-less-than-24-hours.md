---
title: How to become a kickass Flutter developer in less than 24 hours.
description: From noob to ninja in Flutter development.
image: https://flutter.io/images/flutter-logo-sharing.png
comments: true
---
If you are reading this article I am assuming you know what Flutter is so I am skipping the whole **[Introducing Flutter](https://www.youtube.com/watch?v=fq4N0hgOWzU)** part. Ok the title can be a bit misleading. By 24 hours I don't necessarily mean 1 day because we don't work for the whole 24 hours. If you do then kudos for you but I don't recommend doing that. This article is more about dividing up time to learn different aspects of Flutter development. 

### Learning Dart

Flutter uses Dart as its programming language so go right ahead at [Bootstrap into Dart](https://flutter.io/bootstrap-into-dart/). Also don't be afraid of writing and failing on [Dartpad](https://dartpad.dartlang.org/). I would recommend going through the first 4 links and keeping the last two **Asynchronous Programming** tutorials for later.

**Estimated Time Required: 2 hours**

### Installing Flutter

Go to [this](https://flutter.io/get-started/install/) link and install flutter and its dependencies. I prefer using Android Studio for Flutter development but you can use any of your favorite text editor. Run a project by creating a test application. Also try a hot reload after you have run it. An article which dictates how flutter hot reloads the app and why Dart lang actually helps in doing so is [here](https://hackernoon.com/why-flutter-uses-dart-dd635a054ebf).

**Estimated Time Required: 2 hours**

### Understanding Widgets

Flutter is fully dependent on nested widgets. There are two kinds of widgets. **Stateless**  widgets and **Stateful** widgets. A flutter developer needs to understand what these are and how to work with them and how the widget tree is designed. Also take a brief intro to all the built in material widgets that flutter already provides. I suggest [this](https://flutterbyexample.com/flutter-widgets/) link for taking a brief introduction. 

**Estimated Time Required: 3 hours**

### Async Programming With Dart and HTTP

If you have skipped the last two links in [Bootstrap into Dart](https://flutter.io/bootstrap-into-dart/) now is when you should go through them. If you are familiar with `JavaScript Promises` then `Future` is pretty much that. Streams kinda work like `Observers` but not necessarily. Just a heads up. 

After you have understood the basics of `Future` and `Streams` then we can continue with calling a web service. We can do this with the `http` module. Follow [this](https://flutter.io/cookbook/networking/fetch-data/)

**Estimated Time Required: 4 hours**

### Getting serious with Flutter development

Now you have got the basics and a bit of advanced concepts down we can start getting serious with reactive programming. Flutter encourages reactive way of development but it comes with a bunch of caveats, like re-rendering the whole widget when a child widget changes. I would recommend first watching this video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/RS36gBEp8OI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

After watching this I would tell you to re-watch at **9:35** introducing inherited widget and the following topic of **ScopedModel** library. Then re-watch from **10:25** which introduces to the concept of using `Streams` as observables. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/zKXz3pUkw9A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Its imperative that you understand what problems you face with state management and how to solve them. In the first video they show state management with dart `Streams` and in the second video with a library named `flutter_redux`, each with its pros and cons. `Streams` are good if you want to be in sync with standard Dart library and the downside is that you might have to write a bit of extra code. 

The advantage of using `flutter_redux` is that its pretty much same as `React Native Redux` package. The bad thing is you're adding an extra library dependency when there is something pretty close to it already built-in.  

**Estimated Time Required: 6 hours**

That's it. In a maximum of 17 hours you're pretty good at Flutter or at least have the toolset to understand **MOST** issues while developing your application. How can you be sure? `flutter create`. 