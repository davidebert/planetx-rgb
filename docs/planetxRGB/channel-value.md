# color sensor [red/green/blue] value (slow)

Takes a new measurement and reports the red, green or blue value.

```sig
planetxRGB.channelValue(planetxRGB.RGBChannel.Red)
```

## What it does

Each time this block runs, it waits about a tenth of a second for a fresh measurement from the sensor, then gives you the value for the color channel you chose. The reading is always up to date, but the wait makes it **slow**.

## Parameters

* **channel**: which color to read: **red**, **green** or **blue**.

## Returns

* a number: the reading for that color is from 0 up to about 4096.

## Example

Show the red, green and blue values one after another.

```blocks
planetxRGB.setupSensor()
basic.forever(function () {
    basic.showNumber(planetxRGB.channelValue(planetxRGB.RGBChannel.Red))
    basic.pause(1000)
    basic.showNumber(planetxRGB.channelValue(planetxRGB.RGBChannel.Green))
    basic.pause(1000)
    basic.showNumber(planetxRGB.channelValue(planetxRGB.RGBChannel.Blue))
    basic.pause(1000)
})
```

## Tips

* **Don't use this block inside a line-following loop.** The wait makes the robot slow to react and it will drift off the line. Use [color sensor value (fast)](/reference/planetxrgb/red-fast) instead.
* This block is good for checking colors when speed doesn't matter, for example when sorting colored objects or testing the sensor.

## See also

[color sensor red value (quick)](./red-fast)

```package
planetx-rgb=github:davidebert/planetx-rgb
```
