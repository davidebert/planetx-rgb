// Quick check: print the three colour channels to the serial console twice a second
basic.forever(function () {
    serial.writeLine(
        "R=" + planetxRGB.channelValue(planetxRGB.RGBChannel.Red) +
        " G=" + planetxRGB.channelValue(planetxRGB.RGBChannel.Green) +
        " B=" + planetxRGB.channelValue(planetxRGB.RGBChannel.Blue)
    )
    basic.pause(500)
})
