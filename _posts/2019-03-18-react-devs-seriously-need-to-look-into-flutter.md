---
title: React Devs Seriously Need to Look into Flutter
description: With flutter you can build performant cross platform apps without the JavaScript bridge needed for React Native. But as an React dev should you be committing to Flutter?
image: https://hackr.io/blog/wp-content/uploads/2018/09/Artboard-%E2%80%93-1@2x-1280x800.png
comments: true
---

With flutter you can build performant cross platform apps without the JavaScript bridge needed for React Native. But as an RN dev should you be committing to Flutter? I will go through the pros and cons one by one.

### Pro: You already know whatever there is to know

Flutter is all about nesting `Widget`-s over one another. Each widget represents a logical section of the UI, sound familiar? `Widget`-s are basically what React Devs call `Component`-s. Now there are two types of `Widget`-s, `StatefulWidget` and `StatelessWidget`. `StateLess` widgets are basically components that you know that will not contain any inherent state and will not re-render on parent update. That sounds a lot like `React.PureComponent`. `StateFul` widgets have access to state changing mechanisms. Basically, the UI component changes when the state changes and this change is enabled with the `setState` method. You also have access to lifecycle hooks that all of you are familiar with `React.Component` class. 

Maybe, you need an application wide state management system like redux. Flutter has a library for that,ironically named [flutter_redux](https://pub.dartlang.org/packages/flutter_redux), utilizing all the concepts of redux pattern supercharged with the `StreamBuilder` widget. Speaking of libraries, react devs are all to familiar with `npm`, a package manager for importing libraries to the project. Flutter has that too, with dartlang-s own package manager for either flutter or the web at [Pub website](https://pub.dartlang.org/). Did I mention that flutter also does hot reload by default? Well there's that too. Flutter site has a [tutorial](https://flutter.dev/docs/get-started/flutter-for/react-native-devs) dedicated to onboard React Native devs to the framework using stuff that RN devs are familiar with. 

### Pro: Its actually **Native**

Flutter does not bridge its underlying language to platform specific bytecode, there is no Dart to Byte Code bridge as is the case with React Native involving a JavaScript bridge to make the magic happen. This allows flutter apps to be much more performant than most RN apps. But how does it work then? Flutter does [Just In Time Compilation(JIT)](https://aboullaite.me/understanding-jit-compiler-just-in-time-compiler/) during its debug build and [Ahead Of Time Compilation(AOT)](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) when making a release build. When it does AOT, it takes its sweet time to build platform specific byte code but that's ok since you are sure the code is alright since you have worked making the application do whatever its supposed to in the app in its build cycle. 

**TLDR;** Dart allows faster build cycles when developing the app and compiles to platform specific bytecode in release time. That's what Flutter utilizes to make platform specific native code when releasing the application.

### Con: You need to learn Dart

Never been a fan of learning a new programming language and learning Dart which is not used much outside of Google seems like a major turn off. If you are familiar with TypeScript or Kotlin or ES6 then you should see a lot of similarities in the way code is written. But still Dart seems like a language that you might learn in your free time as a novelty experience than an actual requirement as a job requirement. But if you really want to learn a new language as a fun activity to do then I 100% support learning dart, its an incredibly easy language to learn and it has all the things that programmers love like; both type safe declaration and dynamic type declaration, null value handling etc. 

### Con: Lack of resources

JavaScript is one of the most popular programming languages out there and StackOverflow covers most weird situations where you might get stuck. Dart on the other hand is a relatively new language and programmers are pretty hard to find. Although there are groups out there in Facebook which are pretty active answering Flutter issues and you can find people answering questions on Dart but the JS community is behemoth compared to the Dart community.

### Pro: You own every pixel

With flutter you don't have to be bounded with the same cookie cutter app templates. You can let all the creative juices flowing with fast performing animations, unique designs and work flows without the mental overhead of thinking how it will look over on the other platform. Also Flutter has an amazing feature for [Flare](https://www.2dimensions.com/about-flare) animations. You no longer have to find a middle ground with your animators or designers on what is possible and not possible in your application.

### Con: No web support

A problem with Flutter right now is that there is no web support as of this moment. You can build an awesome Android or iOS app with it but web is something that is still missing. The flutter team is working on [HummingBird](https://medium.com/flutter-io/hummingbird-building-flutter-for-the-web-e687c2a023a8) which basically ports the mobile specific flutter code to the web. Releasing a beta version of HummingBird in the year goals for the flutter team. I am hoping to remove this con in the near feature. 

To conclude, in my personal opinion if you have some experience with React and looking to try your hand in cross platform tools then Flutter is the right tool for you. On the other hand, you already have built a relatively large app with React Native and it has 1000+ downloads, in that case I would not suggest rewriting it to Flutter.