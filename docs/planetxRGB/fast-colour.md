# RGB value (fast)

Read the red, green or blue level from the PlanetX color sensor without any waiting.

```sig
planetxRGB.fastColor(RGBChannel.Red)
```

## Parameters

* **channel**: the color channel to read: `Red`, `Green` or `Blue`.

## Returns

* a [number](/types/number) showing how much of that colour the sensor sees. Higher numbers mean more of that colour. The value is never higher than 4096.

## Description

This block reads **one color channel** from the sensor and gives you the answer straight away. It does not pause or wait for a new measurement, so it is quick enough to use inside loops where timing matters, such as a line-following program. The existing PlanetX sensors are not able to consistently distinguish white from silver foil using the existing code blocks. This block provides a means for doing that using raw RGB values.

The value you get depends on the color of the surface, the distance from the sensor to the surface, and the amount of light in the room. Because of this, the numbers you see in one place may be different somewhere else.

## Choosing a threshold

To decide if the sensor is looking at silver foil or the white background, you need to find a number that sits between the two readings.

1. Show the reading on the screen while the sensor is over the **silver foil**. Write the number down.
2. Do the same with the sensor over the **background**.
3. Pick a threshold roughly halfway between the two numbers.
4. Test it, and adjust if the robot gets confused.

Repeat these steps if you move to a different course, change the lighting or change the height of the sensor.

## Example: is the sensor over the foil?

This program shows a tick when the red reading is above a threshold (silver foil) and a cross when it is below.
The threshold value that shoudl be used is determined as described above.

```blocks
basic.forever(function () {
    if (planetxRGB.fastColor(RGBChannel.Red) > 1500) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
})
```

## Example: show a reading

This program shows the current green level on the micro:bit screen.

```blocks
basic.forever(function () {
    basic.showNumber(planetxRGB.fastColor(RGBChannel.Green))
})
```

## Tips

* Each call reads **one** channel. If you only need to tell silver foil from a white surface, read one channel and compare it with your threshold.
* Reading all three channels one after the other means each value is taken at a slightly different moment. If you move over a colour edge between reads, the three numbers may not match up.
* This block does not wait for a new measurement, so if you call it repeatedly very quickly you may get the same value more than once. This is normal.
* This block only measures red, green and blue levels. To find the hue or to name a colour (for example "red" or "yellow"), use the color blocks from the PlanetX extension that are designed for that.
* Thresholds you find with this block are specific to this block. Do not reuse numbers from other color-reading blocks.

## See also

[PlanetX RGB](/pkg/planetx-rgb)

```package
planetx-rgb=github:planetx-rgb
```
