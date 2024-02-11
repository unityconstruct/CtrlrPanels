May 10, 2020 at 10:02 am#118288REPLY | REPORT | QUOTE

spiffo

I might very well be missing the obvious here but I cannot work out what seems like it should be quite simple?

I have a Modulator that has values 0-6, but on the Synth it is a Detune Knob that starts at 0 and goes either to -3 or +3, so:

Midi Value 0 = Display Value -3
Midi Value 1 = Display Value -2
Midi Value 2 = Display Value -1
Midi Value 3 = Display Value -0
Midi Value 4 = Display Value +1
Midi Value 5 = Display Value +2
Midi Value 6 = Display Value +3

How do I change or offset just the Displayed Values so they match what is displays on the Synth LCD?

May 10, 2020 at 11:22 am#118289REPLY | REPORT | QUOTE

dnaldoog

You will notice some choices when you create a modulator; uiSlider and uiFixedSlider. You want uiFixedSlider
Create a uiFixedSlider and in the slider contents box enter in what you want the user to see.


-3
-2
-1
0
+1
+2
+3
-3 will send MIDI 0
+3 will send MIDI 6

May 10, 2020 at 11:45 am#118290REPLY | REPORT | QUOTE

spiffo


It needed to be a uiFixedSlider or a uiFixedImageSlider!

I knew it would be something easy, thanks dnaldoog, I’ll crack on!

May 10, 2020 at 3:28 pm#118292REPLY | REPORT | QUOTE

goodweather

It works as well with uiSlider but is a bit more tricky:
– min Value = -3
– max Value = 3
– expression to evaluate when calculating the midi message: modulatorValue+3
– expression to evaluate when calculating the modulator value: midiValue-3

The advantage is that you don’t need to type all the single values
You will understand the advantage when you will have a mod -128 to +128 😉

From my part, I prefer using a separate display of the value label but then you need to code a Lua function that is triggered when the mod value changes.


Atom


Modulators are the basic building block of Ctrlr.

Expressions in Ctrlr
March 13, 2013 by atom

Expression are used to calculate values that Ctrlr sends to the device, and when they return in form of MIDI messages.

To understand expressions we first need to know 2 things:

1. Modulator lifetime
2. Expressions overview
3. Expression functions

1. Modulator lifetime.
The lifetime of a modulator, when we look at it as an object that links a parameter in a synthesizer can be split in two “sending” and “receiving”.

Sending
Remember, a modulator can have many other functions, but this one is the primary function. A modulator sends numeric values and receives them. In MIDI it’s all about numbers, yes you can transmit patch names, waveform data, but it’s all numbers. What is important it’s always positive numbers 0 – N (n is not really defined, you should define it for every modulator). The number sent by the modulator is actually held in an array, the array is linear, it’s size is N. When you change a component, it tells the modulator about the change, it tells it what new value it should have, let’s say x. When modulator is told that it’s new value is now x, it first looks up the number that’s at position x in the array. If you set up the max/min values correctly for a modulator the x will always be inside the array. Once the modulator has the number it does a bit of processing on it. Few things happen with that number

1) a special Lua method is called
2) an expression is processed if it exists
3) the number is inserted into the MIDI message

Once all that is done a MIDI message is produced and sent to the device.

Receiving
When a MIDI message is received by Ctrlr it goes through a lot of checks before it reaches the modulator it’s intended for. There is the whole subject of how the message is matched but we won’t discuss this here, we’ll assume that Ctrlr did it’s job and found the modulator it should deliver the message to. So the modulator gets the MIDI message and a few things happen

1) a numeric value is extracted from the MIDI message
2) an expression is processed if it exists
3) a special Lua method is called

Once the processing finishes, the numeric value received is passed to:
– the associated component (if one exists)
– the plugin host (if Ctrlr is in plugin mode, that will be the actual Host application in standalone mode Ctrlr simulates a Host, so this always happens)

2. Expressions overview
There are 2 types of expressions, “forward” and “reverse”, “forward points to the “Sending” state of the modulator and the “reverse” to the receiving state of the modulator (as described in point 1)

In Ctrlr an expression is a mathematical function with one argument. It does not use any specific programming language to describe the function. It uses a custom parser included in the JUCE library (more info on this: https://www.juce.com/doc/classExpression) You can use all the basic math operations “+, -, *, /” you can (and often should) use parentheses to group your maths. Along with the basic operation there are some custom functions you can use to get more out of expressions. Also there are variables in expressions, those variables are named and reflect the state of the panel.

We’ll start with “forward” expressions.

A basic expression is a constant for example:

13
That is a valid expression, this would cause any modulator to send the value 13 no matter what it’s state was.

By default the expression is defined as

modulatorValue
This defaults to the current value of the modulator as described by it’s properties and the properties of a component attached to it. No logic is applied, no functions executed.

We can easily combine the two:

modulatorValue+13
This will cause the modulator to send it’s value with 13 added to it always. How is this useful ?

Let’s take the panning example (we’ll assume that we are dealing with MIDI CC messages), we have a parameter that has a range of visible values from -32 to 32 while using range of MIDI values 0 to 64, we need to create a slider that will represent those visible values in the user interface (in form of a Slider) while sending the correct range of numeric MIDI values ranging in 0 to 63 (64 values).

First we’ll set our slider to have it’s minimum value of -32 and maximum value of 31 (why not 32?, well you get 32 values from a numeric range of 0-31, but it might be different with every device), that’s the easy part. With that range applied, the slider will spit out bogus data when setting values from -32 to -1. Once the slider reaches 0 it will start to behave correctly, but it will actually send data for the “left” part of the stereo spectrum, never reaching the “right” (we assume -32:-1 is left and 1:31 is right, 0 is center). Let’s change the expression to

modulatorValue + 32
Now the modulator will add 32 to all it’s values so -32 becomes 0, -31 becomes 1, 0 is 32 and 31 is 63. This is what we wanted. Our “sending” life cycle of our modulator is set and working.

Let’s move over to the “reverse” part, most of the time this part will require some knowledge of MIDI. Since we are dealing with MIDI CC and we are not dealing with numbers larger then 127 we’re safe. We assume that our MIDI device will respond with CC messages that have value 0 – 63. Let’s change our “reverse” expression to

midiValue - 32
What happens now ? When a modulator receives a MIDI message that’s intended for it. It will take it’s numeric value (in some cases the actual value may be the controller number if defined, or some other part of the message) and process the expressions, that is for any value that it receives it will subtract 32 and the result of the subtraction will be passes to the modulator, making it the new value. One very important thing in the reverse expressions is that they happen on the MIDI thread (or the Audio thread if the MIDI messages are coming from the Plugin Host), so keep them simple where possible.

3. Expression functions and constants
To do more complex maths, Ctrlr provides some basic math functions and some logic-like-functions (basic if statements) that can help you. Also there are some constants that represent certain values in the panel, those can help you make your modulator values depend on the panel state. Some constants are not available in both forward and reverse expressions. Here is a list:

Constants:

modulatorValue : The current linear value of the modulator, this is the index of the array of values, it’s always positive.
modulatorMappedValue : The current mapped value in case of components that have mappings. This might be negative.
modulatorMax : The maximum value the modulator can have (non mapped)
modulatorMin : The minimum value the modulator can have (non mapped)
modulatorMappedMax : the maximum value the modulator can have (mapped)
modulatorMappedMin : the maximum value the modulator can have (mapped)
vstIndex : The VST/AU index of the paramter as seen by the host program
midiValue : The current value stored in the MIDI MESSAGE assosiated with the modulator.
midiNumber : The number of the MIDI MESSAGE controller if applicable

Functions:

ceil(x) : Returns the smallest integral value of the parameter
abs(x) : Returns the absolute value of the parameter
floor(x) : Returns the largest integral value that is not greater than the parameter
mod(a,b) : divides two numbers and returns the result of the MODULO operation “%”. Examples 10 % 3 = 1, 0 % 5 = 0; 30 % 6 = 0; 32 % 5 = 2 For more info http://en.wikipedia.org/wiki/Modulo_operation
fmod(numerator,denominator) : Returns the floating-point remainder of the two parameters passed in
pow(a,b) : Returns the first parameter raised to the power of the second (a^b)
gte(a,b,retTrue,retFalse) : Return the larger or equal of the two passed parameters (a >= b). For example
gte (modulatorValue, 0, modulatorValue, 128 - modulatorValue) will return modulatorValue if modulatorValue is greater then 0 and (128 – modulatorValue) if it is less then zero
gt(a,b,retTrue,retFalse) : Same as gte but greater then without the equal sign (a > b)
lt(a,b,retTrue,retFalse) : Same as gte but less then (a < b)
lte(a,b,retTrue,retFalse): Same as gte but less then or equal (a <= b)
eq(a,b,retTrue,retFalse) : Equals sign true if (a == b)
max(a,b) : Returns the bigger of two parameters.
min(a,b) : Returns the smaller of two parameters.
getBitRangeAsInt (value, startBit, numBits) : Get’s a number of bits (numBits) starting at position startBit as an Integer and returns that integer.
setBitRangeAsInt (value, startBit, numBits, valueToSet) :
clearBit (value, bitToClear) : Clears a bit at position bitToClear in the value and return that modified value.
isBitSet (value, bitPosition) : Return true if a bit at position bitPosition in value is set, false otherwise.
setBit (value, bitToSet) : Set’s one bit in an integer at position (bitToSet) and return the modified value with the bit set.
setGlobal (globalIndex, newValueToSet) : This set’s the value of one of the global variables in the panel, and returns that set value so the expression can continue.



&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

modulatorValue vs modulatorMappedValue
--------------------------------------

January 14, 2015 
m.tarenskeen

In http://ctrlr.org/expressions-in-ctrlr-2/

I read below 3.Expression functions and constants:

modulatorValue : The current linear value of the modulator, this is the index of the array of values, it’s always positive.

modulatorMappedValue : The current mapped value in case of components that have mappings. This might be negative

How should I read this? I’m using negative modulatorValues all the time and it works fine. And on the very same page I can read below 2.Expressions overview how to convert such negative modulatorValues to valid midiValues.


atom

All midi is always positive (there is no such thing as negative values in MIDI, you can simulate them but this depends on the manufacturers implementation, it never was part of the MIDI standard)

So you need to map negative values to positive ones somehow. For example:

– you want to send a controller message that controls stereo pan, the range would be -64 +63
– in the midi world the values of a CC message will be 0 – 127
– you need to map 0 – 127 > -64 – +63
– so the modulator value is for example 23 but the mapped value is -64 + 23 = -41

Very often both those values will be the same if no mapping occurs in the modulator.


dasfaker

Use modulatorValue when the list of values is linear (0,1,2,3,4,5…)

Use modulatorMapped Value when the list of values in not linear (Env Attack = 2, Env Decay = 5, Env Sustain = 20…)

There are two kind of sliders, normal and fixed. Fixed ones have a field to store a linear or non linear list of values.

In a normal slider you can set negative values in fields minimum and maximum value (for instance, your panorama knob could be -64 +63), but if you look at the midi monitor, the minimum midi value sent is 0.


m.tarenskeen

Aha I didn’t know about these fixed sliders. I will try that. it’s exactly what I was looking for I think.


loziniak

atom wrote:
…
– you need to map 0 – 127 > -64 – +63
….

So basically modulatorMappedValue is modulatorValue with Expression applied, yes? If not, where exactly the mapping is done? Or maybe modulatorMappedValue is valid only in uiFixedSlider?


human fly

yes i think with expression applied.
or if you have a combo list sending specific values in non-consecutive order that relate to midi values.
