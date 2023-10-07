# Props validation

While in React it's common to use [`PropTypes`](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html) for runtime validation or [TypeScript](https://www.typescriptlang.org/docs/handbook/jsx.html#function-component) for static type checking, in Clojure we can leverage `:pre` conditions to assert component's props at runtime.

Here's a typical example using `defn`.

<div class="sandbox">
<iframe src="https://www.clojurescript.studio/ee/prickly-witty-oil-74226603?console=1" style="border:0;border-radius:4px;overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
</div>

In UIx, the syntax of the `defui` macro inherits most properties of `defn`, including pre conditions.

```clojure
(defui button
  [{:keys [children on-click]}]
  {:pre [(fn? on-click)]}
  ($ :button {:on-click on-click}
    children))
```

To improve things further and leverage `clojure.spec` for rich data validation and helpful error messages, it's recommended to use [adamrenklint/preo](https://github.com/adamrenklint/preo) library.

<div class="sandbox">
<iframe src="https://www.clojurescript.studio/ee/great-panicky-refrigerator-b63d507d?console=1" style="border:0;border-radius:4px;overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
</div>

> Most likely you don't want those runtime checks in production. Make sure `:elide-asserts` compiler option is set to `true`, unless if you are using `shadow-cljs`, where the option is set to `true` for `release` builds by default.

To validate React `children` you can use the following spec.

```clojure
(s/def :react/element
  (s/or
    :string string?
    :number number?
    :nil nil?
    :element react/isValidElement ;; for actual React elements
    :elements :react/elements)) ;; for nested collection of elements

;; a collection of child elements
;; can be either JS array of Clojure's sequential collection
(s/def :react/elements
  (s/coll-of :react/element :kind #(or (array? %) (sequential? %))))

;; `children` can be either a single element
;; or a collection of elements
(s/def :react/children
  (s/or :element :react/element
        :elements :react/elements))
```
