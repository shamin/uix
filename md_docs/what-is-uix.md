# What is UIx?

UIx is a ClojureScript library. It is a wrapper for React that provides an idiomatic interface into modern React.

> Because UIx is a wrapper library for React, it's highly recommended to learn more about React.js itself and make yourself comfortable with its concepts. Read [the docs](https://beta.reactjs.org/) and take a [course](https://epicreact.dev/) on [React](https://www.joyofreact.com/).

## What is modern React?

A set of new APIs that also includes revamped rendering machinery. For more information on that topic read [“Introducing Concurrent Mode (Experimental)”](https://17.reactjs.org/docs/concurrent-mode-intro.html).

## How's it different from existing ClojureScript libraries?

Existing libraries came out at the time when React didn't have proper scheduling and prioritization mechanisms and components had to be declared as JavaScript classes. Most of the wrappers had to invent their own scheduling on top of React and deal with JS classes while presenting them nicely as normal ClojureScript functions with Hiccup.

Today what we call modern React includes a rendering mechanism that takes care of putting stuff on the screen efficiently and also allows declaring components directly as functions. New [APIs](https://reactjs.org/docs/hooks-intro.html) to help deal with side effects and state allow better modularity and reusability.

While existing code and ClojureScript wrappers can still use newer versions of React they cannot leverage all of the new features and improved rendering without introducing breaking changes or affecting performance in order to support backwards compatibility.

## Social aspect

UIx v2 is a rewrite of the [original library](https://github.com/roman01la/uix) developed by [Roman Liutikov](https://github.com/roman01la) for [Pitch](https://pitch.com/). One of the main goals of v2 was to get closer to React so that JavaScript engineers familiar with React can start using the library in no time. The motivation for this goal is driven by the fact that majority of front-end engineers switching to Clojure are coming from JavaScript background, thus we wanted to make this transition easier for them and make sure that the knowledge they already aqcuired is still applicable in UI development with ClojureScript.

## What does UIx offer?

As a ClojureScript wrapper the library offers an idiomatic interface into React while trying to be familiar to both those who have used existing wrappers and those who are coming from the JavaScript world.
