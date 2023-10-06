# Props validation

While in React it's common to use [`PropTypes`](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html) for runtime validation or [TypeScript](https://www.typescriptlang.org/docs/handbook/jsx.html#function-component) for static type checking, in Clojure we can leverage `:pre` conditions to assert component's props at runtime.

Here's a typical example using `defn`.

```clojure
(defn user->full-name
  [{:keys [fname lname]}]
  {:pre [(string? fname) (string? lname)]}
  (str fname " " lname))

(user->full-name {:lname "Doe"})

;; Execution error (AssertionError) at user/user->full-name (form-init2978563934614804694.clj:1).
;; Assert failed: (string? fname)
```

In UIx, the syntax of the `defui` macro inherits most properties of `defn`, including pre conditions.

```clojure
(defui button
  [{:keys [children on-click]}]
  {:pre [(fn? on-click)]}
  ($ :button {:on-click on-click}
    children))
```

To improve things further and leverage `clojure.spec` for rich data validation and helpful error messages, it's recommended to use [adamrenklint/preo](https://github.com/adamrenklint/preo) library.

```clojure
(ns app.ui
  (:require [clojure.spec.alpha :as s]
            [preo.core :as p]))

(s/def :prop/on-click fn?)
(s/def ::button (s/keys :req-un [:prop/on-click]))

(defui button
  [{:keys [children on-click] :as props}]
  {:pre [(p/arg! ::button props)]}
  ($ :button {:on-click on-click}
    children))

;; trigger spec error
($ button {})


Invalid argument: props
-- Spec failed --------------------

  {}

should contain key: :on-click

| key       | spec |
|===========+======|
| :on-click | fn?  |

-- Relevant specs -------

:app.ui/button:
  (clojure.spec.alpha/keys :req-un [:prop/on-click])

-------------------------
Detected 1 error
```

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
