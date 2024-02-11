Atom (2014)


If you want a label to show the name of the last changed modulator, you can do that by selecting a special property on the label component
“Label displays last changed modulator”
and the property
“When displaying last changed modulator, use this format” describes what should be shown in the label:
%N – components visible name
%s – components text (if any)
%v – modulator value
%h – modulator value in HEX
%x – modulator’s midi message in HEX
%g – modulator’s group name (if any)

In order to display date and time, you need to write a Lua script and attach it to some atcion, or display it using a timer, this is a bit more complex task to do. Bo to get you started, create a Button component and find the property “Called when the modulator value changes”, click on the “new” icon, give the method a name, selecte the new method from the combo so it’s associated with the component, and then click the edit button. The Lua editor will open up and you can write a piece of Lua that will run when you click this button.

(assuming you called your method myNewMethod, it could look like this)

--
-- Called when a modulator value changes
-- @mod   http://ctrlr.org/api/class_ctrlr_modulator.html
-- @value    new numeric value of the modulator
--
myNewMethod = function(mod, value)
	s = Time.getCurrentTime():toString(true,true,true,true)
	panel:getComponent("timeAndDateLabel"):setText (s)
end
Now if you have a label on your panel called “timeAndDaateLabel”, after you click the button it should show the current date and time (something like 10 Sep 2014 12:59:18).

To get the details on the Time object in Lua, have a look at the Juce docs: http://www.juce.com/juce/api/classTime.html

I’m attaching an example panel below.

Attachments:
date_and_time.panel


Dear Atom,

How can I separate Label text group please see my pic
modulator-2 and 3 show only “left label text”
modulator-5 and 6 show only “right label text”

and now all name show on left label text

Best Regards,
Kai


atom

As i understand it, you can’t do that without Lua, and it might be complicated to do. This option to display the last changes modulator was made to be global so it will always show ANY modulator that was last changed.


I fetch program names in the MOPHO panel

unpackedData:getRange(184,16):toString()
the toString() method for the MemoryBlock tries to parse the memory part as an ASCII string so that might help.

Use always what()
--Check what(mb) 
and how()

zeoka (2013)


idx363to378 = midi:getLuaData():getRange(370,16)
panel:getComponent(“1-SoundLabel”):setText(idx363to378:toString())

That’s working
The second number was the range not the end byte ! Before I’ve tried string.char() by range with no success

In Lua 5.1:
string.byte (s [, i [, j]])
Returns the internal numerical codes of the characters s[i], s[i+1], ···, s[j]. The default value for i is 1; the default value for j is i.


Dasfaker (2013)

This is what I do to get characters from a uiLabel string:

label = panel:getModulatorByName("Patch Name"):getComponent()
PatchName= label:getProperty ("uiLabelText")

character1 = string.byte((PatchName), 1)
..
character10 = string.byte((PatchName), 10)


atom (2013)

it’s like any other component, just set it’s property, if your LCD Label is named “lcd” and you want to to display “myText”

l = panel:getComponent("lcd")
if l ~= nil then 
     l:setProperty ("uiLabelText", "myText", false) 
end

Goodweather (2019)

I’m using uiLabels for displaying values on patch sheets.
I’m putting a modulator OnChange method on the main modulator where I add something like the following line into it to modify the corresponding uiLabel (lblTune has been declared as modulator in another method)

lblTune:getComponent():setPropertyString ("uiLabelText", tostring((value-50)/20))

