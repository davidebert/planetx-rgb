/**
 * Read raw red, green and blue values from the ELECFREAKS PlanetX colour
 * sensor (IIC port) on the micro:bit.
 *
 * The sensor-handling code is adapted from ELECFREAKS' pxt-PlanetX extension
 * (MIT licence, see LICENSE). The RGB block is by davidebert.
 */

//% color=#00B1ED icon="" weight=90 block="PlanetX RGB"
namespace planetxRGB {

    export enum RGBChannel {
        //% block="red"
        Red = 1,
        //% block="green"
        Green = 2,
        //% block="blue"
        Blue = 3
    }

    // Newer PlanetX colour sensor
    const NEW_ADDR = 0x43

    // Older PlanetX colour sensor (APDS9960)
    const APDS9960_ADDR = 0x39
    const APDS9960_ENABLE = 0x80
    const APDS9960_ATIME = 0x81
    const APDS9960_CONTROL = 0x8F
    const APDS9960_STATUS = 0x93
    const APDS9960_CDATAL = 0x94
    const APDS9960_RDATAL = 0x96
    const APDS9960_GDATAL = 0x98
    const APDS9960_BDATAL = 0x9A
    const APDS9960_GCONF4 = 0xAB
    const APDS9960_AICLEAR = 0xE7

    // Which sensor was found. Detection runs once, on the first reading.
    let probed = false
    let newSensor = false

    function i2cWriteReg(addr: number, reg: number, value: number): void {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cReadReg(addr: number, reg: number): number {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE)
        return pins.i2cReadNumber(addr, NumberFormat.UInt8BE)
    }

    // 16-bit little-endian value stored in two consecutive registers
    function readWord(addr: number, lowReg: number): number {
        return i2cReadReg(addr, lowReg) + i2cReadReg(addr, lowReg + 1) * 256
    }

    function initSensor(): void {
        probed = true

        // Try the newer sensor first
        for (let i = 0; i < 20; i++) {
            i2cWriteReg(NEW_ADDR, 0x81, 0xCA)
            i2cWriteReg(NEW_ADDR, 0x80, 0x17)
            basic.pause(50)
            if (readWord(NEW_ADDR, 0xA4) != 0) {
                newSensor = true
                return
            }
        }

        // Fall back to the older APDS9960 sensor
        i2cWriteReg(APDS9960_ADDR, APDS9960_ATIME, 252)
        i2cWriteReg(APDS9960_ADDR, APDS9960_CONTROL, 0x03)
        i2cWriteReg(APDS9960_ADDR, APDS9960_ENABLE, 0x00)
        i2cWriteReg(APDS9960_ADDR, APDS9960_GCONF4, 0x00)
        i2cWriteReg(APDS9960_ADDR, APDS9960_AICLEAR, 0x00)
        i2cWriteReg(APDS9960_ADDR, APDS9960_ENABLE, 0x01)
        i2cWriteReg(APDS9960_ADDR, APDS9960_ENABLE, i2cReadReg(APDS9960_ADDR, APDS9960_ENABLE) | 0x2)
    }

    /**
     * Take a fresh reading from the colour sensor and return one channel.
     * Each call measures again, so the value is never out of date.
     * @param channel which colour channel to read
     */
    //% blockId=planetxrgb_value block="colour sensor %channel value"
    //% weight=100
    export function channelValue(channel: RGBChannel): number {
        if (!probed) {
            initSensor()
        }

        let r = 0
        let g = 0
        let b = 0

        if (newSensor) {
            basic.pause(100)
            r = readWord(NEW_ADDR, 0xA0)
            g = readWord(NEW_ADDR, 0xA2)
            b = readWord(NEW_ADDR, 0xA4)

            // Scale each channel to balance the sensor's response
            r *= 1.3 * 0.47 * 0.83
            g *= 0.69 * 0.56 * 0.83
            b *= 0.80 * 0.415 * 0.83

            if (r > b && r > g) {
                b *= 1.18
                g *= 0.95
            }

            r = Math.min(r, 4095.9356)
            g = Math.min(g, 4095.9356)
            b = Math.min(b, 4095.9356)
        } else {
            // Wait until a new measurement is ready
            while (!(i2cReadReg(APDS9960_ADDR, APDS9960_STATUS) & 0x1)) {
                basic.pause(5)
            }
            r = readWord(APDS9960_ADDR, APDS9960_RDATAL)
            g = readWord(APDS9960_ADDR, APDS9960_GDATAL)
            b = readWord(APDS9960_ADDR, APDS9960_BDATAL)
        }

        switch (channel) {
            case RGBChannel.Red:
                return Math.round(r)
            case RGBChannel.Green:
                return Math.round(g)
            case RGBChannel.Blue:
                return Math.round(b)
            default:
                return 0
        }
    }
}
