# Differences from Reagent

Fundamentally UIx is different from Reagent in a way how it tries to be as close to React as possible. This way switching from JavaScript to ClojureScript becomes less of a painful process. You will end up in a somewhat familiar environment where everything you know about React is still applicable.

## Functional React components by default

UIx components are compiled into functional React components (plain JS functions). It's still possible to create class-based components using `uix.core/create-class`.

## JSX-like static UI structure

Unlike in Reagent, React elements in UIx are created using `$` macro which enforces static UI structure that is easy to reason about. While Hiccup is quite flexible, it also makes it easy to write highly dynamic code that composes vector elements at runtime which makes it harder to read and maintain.

## Hooks

UIx exposes React hooks, unlike Reagent where it's common to use RAtoms as state primitives.

## Syntax

There's only one way to create a component in UIx, using `defui` hook. No form-1-2-3 components. With hooks you have all of the features that form-1-2-3 components provide.

## Speed

UIx is generally 1.6x slower than plain React, mainly due to use of Clojure's data structures when passing data between components, while Reagent is 2.7x slower due to the same reasons and additionally because of runtime interpreted Hiccup, and a gluing layer that connects React components to RAtoms. Hooks-based Reagent components are even slower.

Here's comparison for the amount of work React, UIx and Reagent are doing when running a synthetic benchmark.

<img src="perf.jpg" width="500" />

## Components are not memoized by default

While it can be tempting to memoize every component because props are immutable maps, UIx does not memoize components by default. Often in React and UIx it's cheaper to re-run a component instead of comparing props map. Immutable data may still come at cost, where in the worst case data structures are fully traversed, essentially performing deep equals.

## No custom scheduling mechanism

In UIx, UI update cycle is managed by React. Reagent is however using `requestAnimationFrame` to enforce _always_ asynchronous UI updates, which leads to issues when user input should be handled synchronously and thus requires additional layer in input fields to fix this problem.

## Built-in linter

UIx has a built-in linter that works well thanks to non ambiguous and static UI structure enforced by `$` macro.

## SSR on JVM

UIx components can be rendered on JVM using serializer borrowed from Rum.

## More

Learn more about differences and migration path from [this slide deck](https://pitch.com/public/821ed924-6fe6-4ce7-9d75-a63f1ee3c61f).
