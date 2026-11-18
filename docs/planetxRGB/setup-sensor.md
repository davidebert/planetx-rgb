# set up colour sensor

Gets the PlanetX colour sensor ready to use.

```sig
planetxRGB.setupSensor()
```

## What it does

When the sensor is first used, the extension has to find out which version of the sensor is connected and switch it on. This takes up to a second. Putting **set up colour sensor** in **on start** means that wait happens at the start of your program, and not later while your robot is driving.

## Example

Set up the sensor once, then use it in the **forever** loop.

```blocks
planetxRGB.setupSensor()
basic.forever(function () {
    basic.showNumber(planetxRGB.fastRed())
})
```

## Tips

* Use this block **once**, in **on start**.
* If you forget it, the sensor will still set itself up the first time you read it, but your robot may freeze for a moment at that point.

## See also

[colour sensor sees silver](/reference/planetxrgb/sees-silver), [colour sensor red value (quick)](/reference/planetxrgb/red-fast)

```package
planetx-rgb=github:davidebert/planetx-rgb
```
