# colour sensor red value (quick)

Reads how much red light the colour sensor sees, as a number.

```sig
planetxRGB.fastRed()
```

## What it does

Gives you the **red** reading as a number, as quickly as possible. Higher numbers mean more red light is bouncing back to the sensor. Shiny silver foil gives a much higher number than white paper, which is how the robot can tell them apart.

This block does not wait, and it only reads the red channel, so it is fast enough to use inside a line-following loop.

## Returns

* a [number](/types/number): the red reading, from 0 up to about 4096.

## Example

Show the red reading on the micro:bit screen. Hold the sensor over different surfaces to compare the numbers.

```blocks
planetxRGB.setupSensor()
basic.forever(function () {
    basic.showNumber(planetxRGB.fastRed())
    basic.pause(500)
})
```

## Example: find your silver threshold

1. Run the program above.
2. Hold the sensor at normal driving height over the black line, the white tiles, and the silver foil.
3. Write down each number.
4. Pick a number between the white and silver readings and use it as the **threshold** in [colour sensor sees silver](/reference/planetxrgb/sees-silver).

## Tips

* Readings change with lighting and with how far the sensor is from the surface. Always test at the height the sensor will be on the robot.
* If you need the green or blue reading too, use [colour sensor [red/green/blue] value](/reference/planetxrgb/channel-value).

## See also

[colour sensor sees silver](/reference/planetxrgb/sees-silver), [set up colour sensor](/reference/planetxrgb/setup-sensor)

```package
planetx-rgb=github:davidebert/planetx-rgb
```
