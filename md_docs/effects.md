# Effects

UIx provides a way to perform side effects in components via [React’s effect hook](https://reactjs.org/docs/hooks-effect.html). Effects are useful for making HTTP requests, interacting with the DOM, or performing any kind of impure operation that mutates some global state and might need to be cleaned up at some point in the future.

The `uix.core/use-effect` function wraps React's `useEffect` hook and takes care of handling certain inconsistencies between JS and Clojure worlds so that you don't have to. More information about effect hook is available in [React documentation on effect hook](https://reactjs.org/docs/hooks-effect.html).

In the example below, the effect's callback will execute and bring up an alert after every update of the component.

<div class="sandbox">
<iframe src="https://www.clojurescript.studio/ee/busy-late-architect-3778b7f8" style="border:0;border-radius:4px;overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
</div>

An optional dependencies vector allows conditional execution of an effect. In the example above, dependencies are not passed into the effect causing it to execute on every update of the component. [Read more about conditional effect execution in React docs](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect).

In the example below the effect will be executed every time when a number of `clicks` becomes a multiple of 5.

<div class="sandbox">
<iframe src="https://www.clojurescript.studio/ee/glamorous-whining-zebra-15d4d34d" style="border:0;border-radius:4px;overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
</div>
