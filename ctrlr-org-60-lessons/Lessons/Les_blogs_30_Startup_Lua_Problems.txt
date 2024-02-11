So, you have a script that intentionally changes the value of a modulator but that unintentionally triggers a lua script, activated by that modulator when the value of that modulator changes?

Goodweather

To prevent Lua functions to be fired you indeed need to set a boolean, add a test at the beginning of all your “OnChange” methods, launch a timer to reset the boolean after all methods have gone through the test.

I’m using this for loading data in all modulators from a file.
Before starting the load, I set bLoadingProgram=true. In each OnChange methods i’m testing if bLoadingProgram == true and doing a direct return in that case.
All methods will be triggered due to the load of each parameters.
I also start a timer at load. Set it to enough time to have all your methods processed but not too much.
When stopping the timer, reset the boolean to false so your methods are executed nicely on manual turn of a button.

Dnaldoog

You could also have a global toggle in the midiReceived function
in an init function when panel loads

myGlobalBlock=false

then:


midiRecieved=function(--[[ CtrlrMidiMessage --]] midi)
myGlobalBlock=true

-- run midi received code
--uiSlider will be triggered but code not run
myLfo:setValue(val,false) -- could also set to true here
myGlobalBlock=false -- reset back to false
end
and in the callback function attached to the uiSlider myLfo function:


if myGlobalBlock==false then
-- run code
end
Again untested pseudo code, but something to consider and play around with!


Possemo

Also, on instances there is a problem on startup. It will trigger a load of modulators on startup sending a big mess to midi-out. Only way for me: use toggle variabal as dnaldoog suggested. I use it like this:

if doNotSend then return end

This is short and painless.. more or less.
