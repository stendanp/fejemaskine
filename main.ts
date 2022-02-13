function BackTurn () {
    while (BackCount <= BackTime) {
        motorbit.back(Speed)
        BackCount += 1
    }
    while (TurnCount <= TurnTime && (pins.digitalReadPin(DigitalPin.P7) == 1 && pins.digitalReadPin(DigitalPin.P9) == 1)) {
        motorbit.turnright(Speed)
        TurnCount += 1
    }
    Repeed += 1
    BackCount = 0
    TurnCount = 0
}
function Start () {
    while (BackCount <= BackTime) {
        motorbit.back(Speed)
        BackCount += 1
    }
    while (TurnCount <= TurnTime) {
        motorbit.turnright(Speed)
        TurnCount += 1
    }
    Repeed += 1
    TurnCount = 0
    BackCount = 0
}
function find () {
    if (pins.digitalReadPin(DigitalPin.P7) == 1 && pins.digitalReadPin(DigitalPin.P9) == 1) {
        motorbit.forward(Speed)
    } else if (pins.digitalReadPin(DigitalPin.P7) == 1 && pins.digitalReadPin(DigitalPin.P9) == 0) {
        motorbit.brake()
        PathFound = 1
    } else if (pins.digitalReadPin(DigitalPin.P7) == 0 && pins.digitalReadPin(DigitalPin.P9) == 1) {
        BackTurn()
    } else if (pins.digitalReadPin(DigitalPin.P7) == 0 && pins.digitalReadPin(DigitalPin.P9) == 0) {
        BackTurn()
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
        Afstand = sonar.ping(
        DigitalPin.P3,
        DigitalPin.P4,
        PingUnit.Centimeters
        )
    } else if (pins.digitalReadPin(DigitalPin.P7) == 0 || pins.digitalReadPin(DigitalPin.P9) == 0 || Afstand < 5) {
        BackTurn()
    }
}
let Afstand = 0
let BackCount = 0
let TurnCount = 0
let home = 0
let PathFound = 0
let homeStart = 0
let start = 0
let TurnTime = 0
let BackTime = 0
let Speed = 0
Speed = 22
BackTime = 2000
TurnTime = 2000
let pas = 40
start = 0
let Repeed = 0
homeStart = 0
PathFound = 0
home = 0
TurnCount = 0
BackCount = 0
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
