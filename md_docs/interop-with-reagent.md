# Interop with Reagent

## Using Reagent components in UIx

In order to use a Reagent component in UIx you need to wrap Reagent's Hiccup with `r/as-element` so that Reagent can take care of Hiccup and convert it into React calls.

<div class="sandbox">
<iframe src="https://www.clojurescript.studio/ee/apprehensive-gentle-eggplant-8fa6554f" style="border:0;border-radius:4px;overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
</div>

## Using UIx components in Reagent

When using a UIx component in Reagent (or anywhere else) you can continue to use the`$` macro without changing anything. The macro will make sure that UIx component is properly created no matter which context it is used in.

<div class="sandbox">
<iframe src="https://www.clojurescript.studio/ee/rough-nutty-shoe-b7e6841e" style="border:0;border-radius:4px;overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
</div>

## Syncing with ratoms and re-frame

External data sources can be consumed in hooks-based components via `useSyncExternalStoreWithSelector` from the `"use-sync-external-store"` package. This part is only concerned about making the UI components reactive on external data sources. How the state is updated doesn't change.

<div class="sandbox">
<iframe src="https://www.clojurescript.studio/ee/bumpy-old-stone-12d9037c" style="border:0;border-radius:4px;overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
</div>
