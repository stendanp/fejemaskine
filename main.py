def Start():
    global Repeed
    motorbit.back(Speed)
    basic.pause(BackTime)
    motorbit.turnright(Speed)
    basic.pause(TurnTime)
    Repeed += 1
def find():
    global PathFound
    if pins.digital_read_pin(DigitalPin.P7) == 1 and pins.digital_read_pin(DigitalPin.P9) == 1:
        motorbit.forward(Speed)
    elif pins.digital_read_pin(DigitalPin.P7) == 1 and pins.digital_read_pin(DigitalPin.P9) == 0:
        motorbit.brake()
        PathFound = 1
    elif pins.digital_read_pin(DigitalPin.P7) == 0 and pins.digital_read_pin(DigitalPin.P9) == 1:
        motorbit.back(Speed)
        basic.pause(BackTime)
        motorbit.turnright(Speed)
        basic.pause(TurnTime)
    elif pins.digital_read_pin(DigitalPin.P7) == 0 and pins.digital_read_pin(DigitalPin.P9) == 0:
        motorbit.back(Speed)
        basic.pause(BackTime)
        motorbit.turnright(Speed)
        basic.pause(TurnTime)

def on_microbit_id_button_b_evt():
    global start
    basic.pause(1000)
    start = 1
control.on_event(EventBusSource.MICROBIT_ID_BUTTON_B,
    EventBusValue.MICROBIT_EVT_ANY,
    on_microbit_id_button_b_evt)

def home1():
    global homeStart, home
    if homeStart == 0:
        if pins.digital_read_pin(DigitalPin.P7) == 0 and pins.digital_read_pin(DigitalPin.P9) == 1:
            motorbit.forward(Speed)
        elif pins.digital_read_pin(DigitalPin.P7) == 1 and pins.digital_read_pin(DigitalPin.P9) == 0:
            homeStart = 1
        elif pins.digital_read_pin(DigitalPin.P7) == 1 and pins.digital_read_pin(DigitalPin.P9) == 1:
            motorbit.forward(Speed)
        elif pins.digital_read_pin(DigitalPin.P7) == 0 and pins.digital_read_pin(DigitalPin.P9) == 0:
            motorbit.turnright(Speed)
    elif homeStart == 1:
        if pins.digital_read_pin(DigitalPin.P7) == 0 and pins.digital_read_pin(DigitalPin.P9) == 0:
            motorbit.forward(Speed)
        elif pins.digital_read_pin(DigitalPin.P7) == 0 and pins.digital_read_pin(DigitalPin.P9) == 1:
            motorbit.turnright(Speed)
        elif pins.digital_read_pin(DigitalPin.P7) == 1 and pins.digital_read_pin(DigitalPin.P9) == 0:
            motorbit.turnleft(Speed)
        elif pins.digital_read_pin(DigitalPin.P7) == 1 and pins.digital_read_pin(DigitalPin.P9) == 1:
            home = 1

def on_microbit_id_button_a_evt():
    global start
    start = 0
control.on_event(EventBusSource.MICROBIT_ID_BUTTON_A,
    EventBusValue.MICROBIT_EVT_ANY,
    on_microbit_id_button_a_evt)

def fej():
    global Repeed
    if pins.digital_read_pin(DigitalPin.P7) == 1 and pins.digital_read_pin(DigitalPin.P9) == 1:
        motorbit.forward(Speed)
    elif pins.digital_read_pin(DigitalPin.P7) == 0 and pins.digital_read_pin(DigitalPin.P9) == 1:
        motorbit.back(Speed)
        basic.pause(BackTime)
        motorbit.turnright(Speed)
        basic.pause(TurnTime)
        Repeed += 1
    elif pins.digital_read_pin(DigitalPin.P7) == 1 and pins.digital_read_pin(DigitalPin.P9) == 0:
        motorbit.back(Speed)
        basic.pause(BackTime)
        motorbit.turnright(Speed)
        basic.pause(TurnTime)
        Repeed += 1
    elif pins.digital_read_pin(DigitalPin.P7) == 0 and pins.digital_read_pin(DigitalPin.P9) == 0:
        motorbit.back(Speed)
        basic.pause(BackTime)
        motorbit.turnright(Speed)
        basic.pause(TurnTime)
        Repeed += 1
Repeed = 0
home = 0
PathFound = 0
homeStart = 0
start = 0
TurnTime = 0
BackTime = 0
Speed = 0
Speed = 22
BackTime = 900
TurnTime = 1000
pas = 40
start = 0
homeStart = 0
PathFound = 0
home = 0

def on_forever():
    global start, Repeed, homeStart, PathFound, home
    if start == 1 and home == 0:
        if Repeed == 0:
            Start()
        elif Repeed < pas:
            fej()
        elif Repeed >= pas:
            if PathFound == 0:
                find()
            elif PathFound == 1:
                home1()
    else:
        motorbit.brake()
        start = 0
        Repeed = 0
        homeStart = 0
        PathFound = 0
        home = 0
basic.forever(on_forever)
