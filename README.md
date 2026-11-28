# PlanetX RGB

A MakeCode extension for the micro:bit that reads the raw red, green and blue values from the ELECFREAKS PlanetX color sensor (V2.0). 
The standard PlanetX color and light code blocks can't tell silver foil from bright white. Direct access to the raw RGB values provides a means for distinguishing these two surfaces.

## Setting up

Put **set up color sensor** in your **on start** block. It finds the sensor and gets it ready, which takes up to a second. Doing it at the start means the robot doesn't pause later while it is following the line.

```blocks
planetxRGB.setupSensor()
```

## Blocks

### set up color sensor

Gets the sensor ready. Use it once, in **on start**.

### RGB [red/green/blue] value (fast)

Takes a new measurement and gives you the red, green or blue value each time the block is reached. Unlike the code within the PlanetX_Base sensor blocks (`Color sensor IIC port color HUE (0~360)` and `Color sensor IIC detects [red/green/blue]`), there is no delay between the reading of each color.

## Why speed matters for line following

A line-following robot corrects its steering many times per second. If one step in the loop takes too long, the robot is "blind" while it waits and drifts off the line. The **`RGB [red/green/blue] value (fast)`** block is designed to take almost no time.


## Supported hardware

- ELECFREAKS PlanetX color sensor V2.0 (and the older APDS9960-based version)
- micro:bit V2 (recommended) and V1

## Credits and License

The sensor-handling code is adapted from
[elecfreaks/pxt-PlanetX](https://github.com/elecfreaks/pxt-PlanetX), which is
released under the MIT licence. This extension is released under the same
licence (see `LICENSE`).

This is an unofficial extension created by David Ebert and is not affiliated with ELECFREAKS.

## Supported targets

* for PXT/microbit
