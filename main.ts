function Start () {
    motorbit.back(Speed)
    basic.pause(BackTime)
    motorbit.turnright(Speed)
    basic.pause(TurnTime)
    Repeed += 1
}
function find () {
    if (pins.digitalReadPin(DigitalPin.P7) == 1 && pins.digitalReadPin(DigitalPin.P9) == 1) {
        motorbit.forward(Speed)
    } else if (pins.digitalReadPin(DigitalPin.P7) == 1 && pins.digitalReadPin(DigitalPin.P9) == 0) {
        motorbit.brake()
        PathFound = 1
    } else if (pins.digitalReadPin(DigitalPin.P7) == 0 && pins.digitalReadPin(DigitalPin.P9) == 1) {
        motorbit.back(Speed)
        basic.pause(BackTime)
        motorbit.turnright(Speed)
        basic.pause(TurnTime)
    } else if (pins.digitalReadPin(DigitalPin.P7) == 0 && pins.digitalReadPin(DigitalPin.P9) == 0) {
        motorbit.back(Speed)
        basic.pause(BackTime)
        motorbit.turnright(Speed)
        basic.pause(TurnTime)
    }
}
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MICROBIT_EVT_ANY, function () {
    basic.pause(1000)
    start = 1
})
function home1 () {
    if (homeStart == 0) {
        if (pins.digitalReadPin(DigitalPin.P7) == 0 && pins.digitalReadPin(DigitalPin.P9) == 1) {
            motorbit.forward(Speed)
        } else if (pins.digitalReadPin(DigitalPin.P7) == 1 && pins.digitalReadPin(DigitalPin.P9) == 0) {
            homeStart = 1
        } else if (pins.digitalReadPin(DigitalPin.P7) == 1 && pins.digitalReadPin(DigitalPin.P9) == 1) {
            motorbit.forward(Speed)
        } else if (pins.digitalReadPin(DigitalPin.P7) == 0 && pins.digitalReadPin(DigitalPin.P9) == 0) {
            motorbit.turnright(Speed)
        }
    } else if (homeStart == 1) {
        if (pins.digitalReadPin(DigitalPin.P7) == 0 && pins.digitalReadPin(DigitalPin.P9) == 0) {
            motorbit.forward(Speed)
        } else if (pins.digitalReadPin(DigitalPin.P7) == 0 && pins.digitalReadPin(DigitalPin.P9) == 1) {
            motorbit.turnright(Speed)
        } else if (pins.digitalReadPin(DigitalPin.P7) == 1 && pins.digitalReadPin(DigitalPin.P9) == 0) {
            motorbit.turnleft(Speed)
        } else if (pins.digitalReadPin(DigitalPin.P7) == 1 && pins.digitalReadPin(DigitalPin.P9) == 1) {
            home = 1
        }
    }
}
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_EVT_ANY, function () {
    start = 0
})
function fej () {
    if (pins.digitalReadPin(DigitalPin.P7) == 1 && pins.digitalReadPin(DigitalPin.P9) == 1) {
        motorbit.forward(Speed)
    } else if (pins.digitalReadPin(DigitalPin.P7) == 0 || pins.digitalReadPin(DigitalPin.P9) == 0) {
        motorbit.back(Speed)
        basic.pause(BackTime)
        while (false && (pins.digitalReadPin(DigitalPin.P7) == 1 && pins.digitalReadPin(DigitalPin.P9) == 1)) {
            motorbit.turnright(Speed)
        }
        Repeed += 1
    }
}
let Repeed = 0
let home = 0
let PathFound = 0
let homeStart = 0
let start = 0
let TurnTime = 0
let BackTime = 0
let Speed = 0
Speed = 22
BackTime = 900
TurnTime = 1000
let pas = 40
start = 0
homeStart = 0
PathFound = 0
home = 0
basic.forever(function () {
    if (start == 1 && home == 0) {
        if (Repeed == 0) {
            Start()
        } else if (Repeed < pas) {
            fej()
        } else if (Repeed >= pas) {
            if (PathFound == 0) {
                find()
            } else if (PathFound == 1) {
                home1()
            }
        }
    } else {
        motorbit.brake()
        start = 0
        Repeed = 0
        homeStart = 0
        PathFound = 0
        home = 0
    }
})
