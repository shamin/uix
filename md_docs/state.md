# State

UIx is using [React's state hook](https://reactjs.org/docs/hooks-state.html#hooks-and-function-components) for local state.

```clojure
(defui form []
  (let [[value set-value!] (uix.core/use-state "")]
    ($ :input
      {:value value
       :on-change #(set-value! (.. % -target -value))})))
```

In some React wrappers state is represented using the `Atom` datatype that has has `reset!` and `swap!` operations. We take a similar naming approach and suffix state updating function with a bang `!` denoting that the operation is mutating a value.

> Similar to `swap!`, `set-value!` from the above example also takes a function that will receive the current value and return the next value of component's state. Unlike `swap!`, this state updating function doesn't take additional arguments that will be passed into a callback.

When the initial value has to be computed before it’s used, it is recommended to pass it in a callback to `use-state`. The callback will be executed only once, in component’s initialization stage.

```clojure
(defn calculate-initial-value []
  ;; expensive computation here)

(uix.core/use-state calculate-initial-value)
```

## Reusable state

Because state is not directly coupled with components it is possible to build reusable behaviors on top of it. In the example below we create a `use-validation` function to encapsulate logic that keeps track of a value and applies updates when the value satisfies provided validation function.

<div class="sandbox">
<iframe src="https://www.clojurescript.studio/ee/belligerent-appalling-knife-2630d8e3" style="border:0;border-radius:4px;overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
</div>
