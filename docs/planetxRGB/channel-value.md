# colour sensor [red/green/blue] value

Takes a new measurement and reports the red, green or blue value.

```sig
planetxRGB.channelValue(planetxRGB.RGBChannel.Red)
```

## What it does

Each time this block runs, it waits about a tenth of a second for a fresh measurement from the sensor, then gives you the value for the colour channel you chose. The reading is always up to date, but the wait makes it **slow**.

## Parameters

* **channel**: which colour to read: **red**, **green** or **blue**.

## Returns

* a [number](/types/number): the reading for that colour, from 0 up to about 4096.

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

* **Don't use this block inside a line-following loop.** The wait makes the robot slow to react and it will drift off the line. Use [colour sensor red value (quick)](/reference/planetxrgb/red-fast) or [colour sensor sees silver](/reference/planetxrgb/sees-silver) instead.
* This block is good for checking colours when speed doesn't matter, for example when sorting coloured objects or testing the sensor.

## See also

[colour sensor red value (quick)](/reference/planetxrgb/red-fast), [set up colour sensor](/reference/planetxrgb/setup-sensor)

```package
planetx-rgb=github:davidebert/planetx-rgb
```
