# Interop with React

## Using React components in UIx

In the [“Elements”](/elements.html) section it was briefly mentioned that React components written in JavaScript can be used in the `$` macro, but with a difference in how props are passed into such a component.

As an example, let's say we have `Button` component that we want to use in a UIx component.

```js
function Button({ onClick, title, style, className, children }) {
  return (
    <button onClick={onClick} title={title} style={style} className={className}>
      {children}
    </button>
  );
}
```

Here’s how to use it in UIx:

```clojure
($ Button {:on-click #(js/console.log :click)
           :title "this is a button"
           :style {:border "1px solid red"}
           :class :button}
  "press me")
```

When a non-UIx component is passed into `$`, the props map is converted into JS object using the following set of rules:

1. kebab-cased keys are automatically converted into camel-cased keys.
   - Similarly to props in a DOM element, the following keys are renamed into their React counterparts:
     - `:class` -> `"className"`
     - `:for` -> `"htmlFor"`
     - `:charset` -> `"charSet"`
1. When a component expects a kebab-cased key, it can be passed as a string to avoid conversion.
1. props map is converted _shallowly_ into a JavaScript object, meaning that nested collections and maps are not converted. If a JS component expects a prop to hold an array or an object, you have to pass it explicitly. There are two exceptions though:

   - `:style` map is always converted into a JS object because it's a common prop, when passing styles into a third-party component.
   - Keyword values are converted into strings.

## Using UIx components in React

Now the other way around, we want to use a UIx component in a React component.

To achieve this we have to write interop layer using `uix.core/as-react` helper that takes a function which will take React props as a bean and call the UIx component.

> Note that `as-react` doesn’t transform camel case keys into kebab case.

```clojure
(defui button [{:keys [on-click children]}]
  ($ :button {:on-click on-click}
    children))

(def Button
  (uix.core/as-react
    (fn [{:keys [onClick children]}]
      ($ button {:on-click onClick :children children}))))
```

Now `Button` can used as a normal React component.

```js
<Button onClick={console.log}>press me</Button>
```

### On `ref` forwarding

Some third party React components can inject a `ref` into a child element,
which requires doing [ref forwarding](https://react.dev/reference/react/forwardRef). It's not needed when passing refs between
UIx elements, but is still required for a case when non-UIx component injects a
ref into UIx element.

For this specific case there's `uix.core/forward-ref`, which should be used exclusively in such cases. The helper takes care of merging and converting props.

> Note that `forward-ref` also doesn’t transform camel case keys into kebab case.

```clojure
(defui button [{:keys [ref children on-click onMouseDown]}]
  ;; both `ref` and `onMouseDown` were injected by `Menu`
  ...)

(def button-forwarded
  (uix/forward-ref button))

($ Menu
  ($ button-forwarded {:on-click handle-click}
    "press me))
```

## Error boundaries

Although [error boundaries](https://reactjs.org/docs/error-boundaries.html) aren't fully supported in functional React components, its still possible to use them in UIx as class-based components.

Error boundaries are SSR compatible in UIx.

```clojure
(def error-boundary
  (uix.core/create-error-boundary
   {:derive-error-state (fn [error]
                          {:error error})
    :did-catch          (fn [error info]
                          (logging/error "Component did catch" error)
                          info)}
   (fn [[state set-state!] {:keys [children]}]
     (if-some [error (:error state)]
       ($ :<>
         ($ :p.warning "There was an error rendering!")
         ($ :pre (pr-str error)))
       children))))

(defui users [{:keys [users]}]
  ($ :<>
    ($ error-boundary
      ($ user-list {:users users})
      ($ :button "Load more ..."))
    ($ :a "Back home")))
```

`derive-error-state` is used to return a value that can be read by the render function passed to `uix.core/create-error-boundary`. You can use this function to parse an exception to a more friendly format, for example. `did-catch` will be called with the exception object and any additional info. In JS the `info` will be the component stack trace. In the JVM `info` will be the name of the error boundary.
