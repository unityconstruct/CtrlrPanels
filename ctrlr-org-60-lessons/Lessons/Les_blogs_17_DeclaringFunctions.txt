ZIE OOK: les03_values2modulators
________________________________


Oktober 2012

Atom


This is how you declare a function:

myFunction = function(parameter1, parameter2, parameter3)
-- function body goes here
console ("this is my function")
console ("parameters: parameter1=%d parameter2=%s parameter3=%d", parameter1, parameter2, parameter3)
end

To call the function;

value = 30
myFunction(1, "i love britney spears", value)



Synthetech


This is something I wish to do with my project.

I want it so that when I do a program/patch change, the Ctrlr panel will do a single patch dump request from my Korg and get something like this back:

F0 42 21 06 00 00 01 00 00 00 00 00 00 00 00 00 04 01 0f 00 00 00 01 00 00 00 00 00 00 00 00 00 07 01 0F 00 00 00 00 00 02 00 00 04 0B 00 0A 00 0A 01 00 00 00 05 05 00 00 00 01 00 00 00 00 00 0C 00 0C 00 01 00 00 01 0B 01 0F 01 0F 01 0F 00 03 00 00 00 00 00 00 01 0F 01 0F 01 0F 01 0F 00 03 00 00 00 00 01 03 00 05 01 0F 00 00 01 0F 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 08 00 00 00 09 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 02 00 06 00 00 00 00 00 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 03 F7

The patch parameter values start with byte’s 6&7. So this patch’s first parameter value is 00 01.

Problem is.. the Ctrlr modulator/controls are set for values 0-127(as they should/need be). But the above patch dump is giving the values in a format/# that the Korg understands/displays.
So say Parameter#1 has a value of 1-2.. two numbers. The above example shows 00 01 and the Korg interprets it as value "2".. if it was 00 00, the Korg would interpret it as a "1".

So since each parameter in the patch dump can vary in max. number size.. like 1-2, 0-15, 0-31, 0-62, 0-99… I have to somehow run the raw data thru a formula that will change the raw number into a number that will span 0-127 that will be appropriate for each parameter’s actual range.

The example above of only two numbers would have to equate as 0=0, 1=127.
That way when the dump is received and translated to the modulator/control, it will display a 0 for 1 and 127 for a two.

The reason behind all this chaos is because the Korg will accept on the fly parameter edits.. but it receives those edits via a multi CC#(like NRPN) with values of 0-127 (just like the modulators default values).. and inside the Korg it changes the 0-127 value into an appropriate number for that parameter before it saves it to it’s proper parameter value memory location and finally update that parameter value to be displayed on the Korg and heard by the change in the patch’s sound (like a VCF opening up).

Cliff notes- I want to make Ctrlr do a dump request, read the raw data, starting at byte 6.. convert the numbers with varying formulas, then send the formulated # to set each modulator/control with a number that falls between 0-127.
It will be a way to update all the modulators values each time I change the patch.. so I can instantly see what each parameter’s value in a patch is the moment it is called.

I’ve never programmed in C or JUCE.. but I think I can catch on quickly if given some hints/tips.

-----

Ok.. msepsis has been helping me out with this-

I’m trying to build a script to read the hex dump from my synth so it can setup all the controls in a patch when I change patches using Ctrlr.

Here’s the code

– Called when a modulator value changes
— @modulator http://ctrlr.org/api/class_ctrlr_modulator.html
— @newValue new numeric value of the modulator
— Patch Configure = function(modulator, newValue)
— end

FilterMsb = midiMessage:getLuaData():getByte(54)
FilterLsb = midiMessage:getLuaData():getByte(55)
FilterValue = (FilterMsb*16)+(FilterLsb)
panel:getModulatorByName("VCF Cutoff"):setModulatorValue(FilterValue, false, false, false)

when I goto save/compile it, it tells me it has errors…


Msepsis

You commented out the name of your script and the "end".. Those two elements should be like the bun of your sandwich, so to speak, and they shouldn’t be commented out with double dashes. One goes at the top, one goes at the bottom. This concept is important to grasp. When you start a function you must end a function.

it should be something like:

Patch Configure = function(modulator, newValue)

FilterMsb = midiMessage:getLuaData():getByte(54)
FilterLsb = midiMessage:getLuaData():getByte(55)

FilterValue = (FilterMsb*16)+(FilterLsb)

panel:getModulatorByName("VCF Cutoff"):setModulatorValue(FilterValue, false, false, false)

end


Synthetech

ERROR: [string "Patch Configure = function(modulator, newValue)…"]:1: ‘=’ expected near ‘Configure’


Msepsis

Well.. I said your code should look "something like…" :-)
That first line, as the error indicates is malformed.
Try looking at a new script and notice how the name you give the script must be declared in that first line.
Also.. No spaces in lua script names!!


Synthetech

I cleaned up my code and it appears to compile with "Success", but when I goto use it in my Patch combobox, it fails.
My Patch Select Box is used to not only make my synth select a patch, it also sends a sysex command to get that patch’s dump.
Midi message type is Multi.
I have the sysex command first, then the patch select.
The sysex command works.. it even selects the same single Patch Dump as the Patch# I select as verified in OX’s monitor.

But when I try to use it, I get this error (missing attachment)

Msepsis

The error message tells you what line the error is, and what the problem is on that line. You’re using a nil global on line 7 name ‘midiMessage’. What are you actually trying to do on line 7?

Just a reminder again: you want the function to set modulator values from the patch dump attached to the panel, not to the same combobox you’re requesting patch dumps from. A combobox requests a program and forms a patch dump request to send to the synth based on the program selection. The synth sends the patch dump. The panel receives the patch dump as a midi message. What does the panel do when it receives a midi message? It does what you tell it to do in the "Called when panels receives a MIDI message" script slot.

Synthetech

Ok, so I took this code:


PrgChange = function(modulator, newValue)

FilterMsb = midiMessage:getLuaData():getByte(54)
FilterLsb = midiMessage:getLuaData():getByte(55)

FilterValue = (FilterMsb*16)+(FilterLsb)

panel:getModulatorByName("VCFCutoff"):setModulatorValue(FilterValue, false, false, false)

end


Called it PrgChange, set to be called when Panel receives a midi message.

The Patch change combobox is set to multi midi message. First one is "ProgramChange,Direct,Direct,-1,-1,F0 00 F7", the other is a sysex message that shows up as "SysEx,Direct,Direct,-1,-1,F0 42 21 07 xx F7" in the multimessage listbox after I’ve added it in.

Right below that, Sysex Formula shows as "F0 00 F7"

When I try to change a patch after a fresh load, I get the error msg:

Callback error: PrgChange
at line 6 and a nil value when it attempts to index global "midimessage"

then it disables the script and I’m back to square one.
The synth is sending the dump… I have the combobox setup so it sends the synth a Program Change first, then the sysex dump req.
I tried using the midi program change features you can check off in Panel, but it doesnt seem to help.


Msepsis

change that first line to:

function PrgChange(midiMessage)

that should do it.. report back if not.


Synthetech

OK, I finally have my Filter Knob changing position/value when I do a dump call.

But, I have to set the uiImageslider to a min. of 1 . If I set it to 0, it wont stay at the dump adjustment value… I see the knob try to set/move, and then it just snaps back to 0.
I dont have the snap feature on.

Same thing happens to a uiButton. I see it change, then it goes back to 0.. WTF?

It’s always something..

Atom

Do you have MIDI thru turned on at the synth? Turn it off, and/or make sure you’re coming out of your synth’s MIDI out port, not MIDI thru port if it has one.
That’s a weird one. I haven’t experienced that. You need to just troubleshoot this down. Maybe, unless you’ve already tried this put nothing on the panel but the midiMessageReceived script, a combobox which does the program change and sends the dump request and a knob on the panel that gets assigned a value. Strip it down to the basic functionality and go from there. You don’t have any other scripts in your panel that contain any setModulatorValue calls, do you? Do you happen to have any linked modulators? Disable them if so. I also recommend opening up the MIDI monitor and enable monitoring of both In and Out. Watch the MIDI monitor when you do a program change. Also you can insert lines in your lua script that print messages in the Lua console. This can be helpful to verify you’re getting the correct values for things and to print a message in the console at different steps of the script.
Here are some examples:

console ("this text will print in Lua console")
console (string.format ("my modulator’s value is=%", modulatorsUniqueName))

You’re getting there, you’ll look back at this soon and laugh.. just keep working it.
