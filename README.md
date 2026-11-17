# PlanetX RGB

A MakeCode extension for the micro:bit that reads the raw red, green and blue values from the ELECFREAKS PlanetX colour sensor (V2.0), and detects shiny silver foil for RoboCup Junior Rescue Line.

The standard PlanetX colour and light blocks can't tell silver foil from bright white. The **raw red value** can, so this extension gives you direct access to it.

## Setting up

Put **set up colour sensor** in your **on start** block. It finds the sensor and gets it ready, which takes up to a second. Doing it at the start means the robot doesn't pause later while it is following the line.

```blocks
planetxRGB.setupSensor()
```

## Blocks

### set up colour sensor

Gets the sensor ready. Use it once, in **on start**.

### see silver

Reports **true** when the sensor sees silver foil (red value above the threshold), and **false** otherwise.

It only says true after 3 silver foil readings in a row, so a single flash of glare won't trigger it. Because of this, **use it once per loop** (for example, once inside **forever**).

Click the **+** on the block to change the **threshold**. The default is 1500. A higher number makes the sensor harder to fool, a lower number makes it more sensitive.

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

### red value (fast)

Gives the red reading as a number, as fast as possible. Use it when you want to see the actual numbers, for example to find the right threshold for your field.

```blocks
planetxRGB.setupSensor()
basic.forever(function () {
    basic.showNumber(planetxRGB.fastRed())
})
```

### RGB [red/green/blue] value (slow)

Takes a brand new measurement and gives you the red, green or blue value. It waits about a tenth of a second each time, so **don't use it inside a line-following loop**. It is good for checking colours when speed doesn't matter.

## Why speed matters for line following

A line-following robot corrects its steering many times per second. If one step in the loop takes too long, the robot is "blind" while it waits and drifts off the line. The **quick** red block and **sees silver** block are designed to take almost no time. The **slow** block is not.

## Finding your silver threshold

1. Use the quick red block with **show number** (see the example above).
2. Hold the sensor at normal driving height over the black line, white tiles, and the silver foil.
3. Write down the numbers. Silver should read clearly higher than white.
4. Pick a threshold between the white and silver readings, and put it in the **threshold** setting of **sees silver**.

Lighting changes the numbers, so check again at the competition venue.

## Example: line following with a silver check

```blocks
let start = false
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

## Supported hardware

- ELECFREAKS PlanetX colour sensor V2.0 (and the older APDS9960-based version)
- micro:bit V2 (recommended) and V1

## Credits and License

The sensor-handling code is adapted from
[elecfreaks/pxt-PlanetX](https://github.com/elecfreaks/pxt-PlanetX), which is
released under the MIT licence. This extension is released under the same
licence (see `LICENSE`).

This is an unofficial extension created by David Ebert and is not affiliated with ELECFREAKS.

## Supported targets

* for PXT/microbit
