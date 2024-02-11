Msepsis(dec 2012)

Hey guys, there really is no Lua for ctrlr tutorial besides the example panels included with the ctrlr installer and of course the panel DDB. I put together a list of frequently used functions here just the other day which should help you out. Hecticc’s follow-up there regarding sending sysex messages pretty much gives you what you should need to get this done.

If your combobox needs to send sysex commands that are unique per value or range of values I’d recommend going about it like this:

set your combobox’s midi message to “none”, and give the combo contents field the range of values it should display (not a value it should send).. something like
very negative = 0
negative = 1
positive = 2
very positive = 3
etc. First part is what the combobox displays, the = 1 part just gives a value to the selection for us to reference next.

Add a script to the combobox, name it what you want, then open the script in the Lua editor. This is all done under a modulator’s “called when modulator value changes” section on the far right.

So in Lua what you want to do is
first get the value of the combobox, then based on the value, send the appropriate sysex message.

assuming the unique name of the combobox in question is “yourComboBox”:


--this is a comment, anything prefixed w/ double dashes is ignored by the interpreter.

--get the combo's value:
comboValue = panel:getModulatorByName(“yourComboBox”):getModulatorValue()

--send appropriate sysex based on combo's value:

if comboValue == 0 then
mySysex1 = CtrlrMidiMessage({0xF0, 0x3E, 0x0e, 0x00, 0x00, 0x00, 0x00, 0x7F, 0xF7})
panel:sendMidiMessageNow(mySysex1)

elseif comboValue == 1 then
mySysex1 = CtrlrMidiMessage({0xF0, 0x3E, 0x0e, 0x00, 0x01, 0x00, 0x00, 0x7F, 0xF7})
panel:sendMidiMessageNow(mySysex2)

elseif comboValue == 2 then
mySysex1 = CtrlrMidiMessage({0xF0, 0x3E, 0x0e, 0x00, 0x02, 0x00, 0x00, 0x7F, 0xF7})
panel:sendMidiMessageNow(mySysex3)

elseif comboValue == 3 then
mySysex1 = CtrlrMidiMessage({0xF0, 0x3E, 0x0e, 0x00, 0x03, 0x00, 0x00, 0x7F, 0xF7})
panel:sendMidiMessageNow(mySysex4)

end


i totally made up those sysex values, replace with what you need. There are other more elegant ways to do this but this method, at least to me reads fairly logically for beginners.

Basically any time you want to trigger a lua script it usually happens when a modulator’s value changes. In Lua you’re usually getting values of some modulator then setting some other value of some other modulator based on a variety of conditions. The Lua documentation is my fav place to go for reference. Definately worth looking over if you get stuck. Doesn’t hurt to read the first few chapters if you’re just getting started.

SWB

For the pan values -1 to -7 I needed different sysex messages then for the pan values form +1 to +7 and also the value ‘0’ needed its own sysex string.

On the panel I picked (right click mouse) from the slider option an ‘uiSlider’ and did set the type to ‘LinearHorizontal’ (choose from Slider Style in the ‘component’ part of the right panel of Ctrlr). I also did set the Minimum value to -7 and the Maximum value to 7 and Interval to 1. The Visible name is ‘pan’ and the Name [unique] is ‘PanSlider”. This last name is the name to be used in the method. Then in the Modulator part of the right panel I choose ‘Called when the modulator value changes’, clicked on the ‘+’ sign and added the name for my method, in this case ‘PanMethod’. In the MIDI part I did set the MIDI message type to ‘none’. Then I selected (click on the ‘\’ sign) the PanMethod and the Lua editor window opened. I typed the following Lua code in this window (the first 5 lines of code were already there):

—
— Called when a modulator value changes
—

PanMethod = function(modulator, newValue)

panValue = panel:getModulatorByName(“PanSlider”):getModulatorValue()

–send appropriate sysex based on slider value:

if panValue < 0 then
mySysex = CtrlrMidiMessage({0xF0, 0x18, 0x04, 0x00, 0x03, 0x02, 0x02, panValue+128, 0x7F, 0xF7})
panel:sendMidiMessageNow(mySysex)

elseif panValue == 0 then
mySysex = CtrlrMidiMessage({0xF0, 0x18, 0x04, 0x00, 0x03, 0x02, 0x02, 0x78, 0x7F, 0xF7})
panel:sendMidiMessageNow(mySysex)

elseif panValue > 0 then
mySysex = CtrlrMidiMessage({0xF0, 0x18, 0x04, 0x00, 0x03, 0x02, 0x02, panValue, 0x00, 0xF7})
panel:sendMidiMessageNow(mySysex)

end
end

and saved the method. Now, when moving the slider, the appropriate pan-value is send to the Proteus-1!

Besides the quite easy way of coding, I discovered to my surprise that I could p[ut just decimal values in the sysex string (and even a simple formula) and still the sysex data are understand by the receiving device!

I’m on a Mac (10.7.5) and I have also at the same time Windows running on this machine. This is handy, because the help file for the Ctrlr Lua classes only opens on a windows machine. Now I understand how things work this help file is necessary when programming/scripting with Lua for Ctrlr.
