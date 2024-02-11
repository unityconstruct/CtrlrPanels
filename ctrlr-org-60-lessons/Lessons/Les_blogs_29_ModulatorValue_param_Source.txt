You can find info about the arguments of functions in
https://github.com/RomanKubiak/ctrlr/blob/master/Source/Core/CtrlrModulator/CtrlrModulator.h

Dnaldoog

I made a panel in order to try to understand the differences between the following methods see here::

It seems that every method triggers a function call in the receiving modulator (I only tested uiSlider) except those methods marked with a **.


panel:getModulatorByName(n):setModulatorValue(value,false,true,false)
panel:getModulatorByName(n):setModulatorValue(value,false,false,false)
panel:getModulatorByName(n):getComponent():setValue(value,true)
panel:getModulatorByName(n):getComponent():setValue(value,false)**
panel:getModulatorByName(n):setValue(value,true)
panel:getModulatorByName(n):setValue(value,false)
panel:getModulatorByName(n):setValue(value,true,true)
panel:getModulatorByName(n):setValue(value,false,false)
panel:getComponent(n):setValue(value,true)
panel:getComponent(n):setValue(value,false)**
panel:getModulatorByName(n):setValueNonMapped(value,true,true)
panel:getModulatorByName(n):setValueNonMapped(value,false,true)
panel:getModulatorByName(n):setValueNonMapped(value,true,false)
panel:getModulatorByName(n):setValueNonMapped(value,false,false)
Please find attached example panel below

Attachments:
getModulatorByName-etc_1_3_2020-05-16_20-48.panel

(The uiCustomComponent is very powerful. You could almost make a whole panel just using that component. Maybe rotating sliders would be difficult. I tried it once. Haven’t succeeded yet.)


Spiffo

I’ve finished testing the setValue(variable, boolean, boolean) and here are my results:

setValue(var, force, mute)

mute = if true MIDI never sent, if false MIDI is sent only if the Modulator changes value
force = if true LUA Script always runs, if false LUA script only runs if Modulator changes value

And some quick testing of setModulatorValue(var, boolean, boolean, boolean)

setModulatorValue(var, vst, midi, ui)

vst & ui appear to do nothing, I think that is well known?

midi if set to true the panel sends a MIDI Message whether the Modulator changes value or not
midi if set to false the panel does NOT send a midi message whether the Modulator changes value or not

So my conclusion is that dnaldoog is correct, I am better off using setValue, it gives a much better range of control over what happens, but it still won’t stop those LUA scripts from running if the Mod changes value 🙁


Dnaldoog

Use the source

I think this is where you can use that mysterious third parameter to a callback function ‘source’ – I haven’t tested this and it may take some experimenting, but something like:


	if source == 2 then
			--... do something
		elseif source == 4 
			--... do something else
		end --
---------------------------------------------------------
--[[
https://github.com/RomanKubiak/ctrlr/blob/de28dc3ad3591a5832f1e38ce8adabc9369b1011/Source/Lua/CtrlrLuaModulator.cpp
value("initialValue", 0),
value("changedByHost", 1),
value("changedByMidiIn", 2),
value("changedByMidiController", 3),
value("changedByGUI", 4),
value("changedByLua", 5),
value("changedByProgram", 6),
value("changedByLink", 7),
value("changeByUnknown", 8)
--]]

So if you had a function like:

runsource = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)

panel:getLabel("d"):setText(""..source)
end
… all you would need to do to filter out non-user GUI changes to the modulator:


runsource = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)
if source == 4 then
--run the code
end
end
See attached panel.

This reply was modified 11 hours, 54 minutes ago by dnaldoogdnaldoog. Reason: reworded confusing text
Attachments:
use-the-source_1_0_Hell-O-Kitty_2020-06-21_20-58.panel


Samoth

So, you have a script that intentionally changes the value of a modulator but that you don’t want to unintentionally trigger a lua script, activated by that modulator when the value of that modulator changes.
For this purpose you have written another Lua script that sorts out the source of the value change.

In my eyes the problem is this: if the modulatorValue change is not allowed to trigger a Lua script, how is it possible then, when the modulator becomes the command to change value, to trigger a lua script that sorts out the source of his value change to block another Lua script, triggered by that same value change?
So the Lua script to block another lua script when the modulator changes value must be triggered by the modulator BEFORE the command to change value arrives! If not so, the script is blocked by itself.
But how can this be done?


spiffo

samoht wrote:
So, you have a script that intentionally changes the value of a modulator but that you don’t want to unintentionally trigger a lua script, activated by that modulator when the value of that modulator changes.
For this purpose you have written another Lua script that sorts out the source of the value change.

Well something like that but not exactly. My original post was just to see what methods people were using to block LUA Scripts from running when they don’t need to.

And everyone has been very helpful and I now have essentially 3 methods of attack:

1 Use setValue instead of setModulatorValue, you can stop LUA Scripts triggering if the Modulator doesn’t change value
2 Use Variables and Timers to stop any acivity for a certain amount of time
3 Pass the Mod, value & source into the function and use the source in an if statement to determine whether the script runs or not


dnaldoog

Hi Samoht – Not sure I follow, but the idea is to set up some sort of way to detect whether the user changed a value by moving the ‘dial’ or pressing a button or whether the uiSlider/uiButton etc is being modified by lua, for example an incoming midi message that updates the gui.

So the idea is that the parameter ‘source’ passes in an integer value of 4 if the user moved the control, otherwise another number (usually 5?).

Personally I have only used this method once, because I only discovered it towards the end of coding the last panel I did.

What I usually do is have a ‘global’ variable that is initialised to let’s say blockMe=false on init (when the panel loads). When a midi message is received and processed by a function or another control changes the modulator, whose lua function we are trying to disable, that other function will temporarily ‘switch’ the global variable to blockMe=true so when the modulator you want to block is changed it won’t run the lua code it normally runs. So if you have at the beginning of the function you want to block a test if blockMe then return end the lua function you want to block will not run. You then need to make blockMe=false at the end of any function that temporarily writes blockMe=true. You can do this with timers as Goodweather points out, but this method should work in theory.

If the modulator you want to block just sends MIDI via lua you could also try:

panel:setPropertyInt("panelMidiPauseOut",1)

and then

panel:setPropertyInt("panelMidiPauseOut",0)

in that modifying function.

