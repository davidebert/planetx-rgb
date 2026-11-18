# see silver

Checks if the colour sensor is looking at shiny silver foil.

```sig
planetxRGB.seesSilver()
```

## What it does

Silver foil reflects much more red light than white paper does. This block measures the red light and reports **true** when it is above the **threshold**, and **false** when it is not.

To avoid being fooled by a flash of glare, it only reports **true** after seeing silver **3 times in a row**.

## Parameters

* **threshold**: the red value above which something counts as silver. Click the **+** on the block to change it. If you leave it out, it uses **1500**.
  * A **higher** number is harder to trigger (fewer false alarms).
  * A **lower** number is easier to trigger (more sensitive).

## Returns

* a [boolean](/types/boolean): **true** if silver has been seen several times in a row, otherwise **false**.

## Example

Show a heart when silver is found and a small heart when it is not.

```blocks
planetxRGB.setupSensor()
basic.forever(function () {
    if (planetxRGB.seesSilver()) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showIcon(IconNames.SmallHeart)
    }
})
```

## Example: stop at the rescue zone

Follow the line until the robot reaches the silver foil, then stop.

```blocks
planetxRGB.setupSensor()
basic.forever(function () {
    if (planetxRGB.seesSilver()) {
        basic.showIcon(IconNames.Heart)
        basic.pause(5000)
    } else {
        // follow the line here
    }
})
```

## Tips

* Use this block **once per loop**. The "3 times in a row" check only works if the block runs every time round the loop.
* Lighting changes the readings. Test on the real silver foil under the lights you will compete under, and adjust the **threshold** if needed.
* To find a good threshold, use [red value (fast)](/reference/planetxrgb/red-fast) to see the numbers for white paper and for silver foil, then pick a value in between.

## See also

[set up colour sensor](./setup-sensor), [red value (fast)](./red-fast)

```package
planetx-rgb=github:davidebert/planetx-rgb
```
