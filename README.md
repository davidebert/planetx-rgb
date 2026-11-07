# PlanetX RGB

A MakeCode extension for the micro:bit that reads the **red, green and blue
values** from the ELECFREAKS PlanetX colour sensor, connected to the IIC port.

It works on its own, so you don't need to add the PlanetX extension. It works
with both versions of the PlanetX colour sensor (the newer one and the older
APDS9960 one) and picks the right one automatically.

## Blocks

```blocks
basic.forever(function () {
    basic.showNumber(planetxRGB.channelValue(planetxRGB.RGBChannel.Red))
})
```

**colour sensor [red/green/blue] value** takes a fresh reading and reports the
chosen channel as a number. Every block measures again, so the value is always
current. Reading all three channels takes a fraction of a second, and the three
values come from slightly different moments.

## Example: print all three channels

```blocks
basic.forever(function () {
    serial.writeLine(
        "R=" + planetxRGB.channelValue(planetxRGB.RGBChannel.Red) +
        " G=" + planetxRGB.channelValue(planetxRGB.RGBChannel.Green) +
        " B=" + planetxRGB.channelValue(planetxRGB.RGBChannel.Blue)
    )
    basic.pause(500)
})
```

## Use as an extension

This repository can be added as an **extension** in MakeCode.

1. Open [https://makecode.microbit.org/](https://makecode.microbit.org/)
2. Click **New Project**
3. Click **Extensions** under the gearwheel menu
4. Paste the address of this repository and import it

## Credits and licence

The sensor-handling code is adapted from
[elecfreaks/pxt-PlanetX](https://github.com/elecfreaks/pxt-PlanetX), which is
released under the MIT licence. This extension is released under the same
licence (see `LICENSE`).

This is an unofficial extension and is not affiliated with ELECFREAKS.

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
