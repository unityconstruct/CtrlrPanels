Dnaldoog 3 maart 2021

You can fix this by using the source Luke


x=function(mod,value,source)
   if source == 4 then
          uitls.warnWindow("You made it",""please do something!")
    end
end

The only problem is you will not be able to run this function from another lua function, because the parameter to the sending function will send 5 or 6, so the call will naturally be blocked!

:)
Popups bug panel_0_9_added source to block_2021-03-03_21-32.zip


Well for the longest time I was wondering what that parameter, ‘source’ was. I thought it must be very important for Atom to have included it in any function that reacts to ‘changes in value’ callbacks. You don’t see it in the mouseDown functions.

Atom must have encountered that same problem.

Right now the only solution I can think of is you might have to have a completely separate message/function that is fired by lua and not the user.

So in that function you would have to have:


if source == 5 or source == 6 then
utils .warnWindow(“”,””)
end 

Doubling up like that could be a drag if the method is very large.

I think I wrote to you a long time ago when we were discussing this issue that my JD990 panel had all of these functions in it that weren’t getting triggered when the panel loaded, I never worked out why they weren’t triggered like this.

I have tried setting a variable from ‘true’ to ‘false’ on load by using a timer, which is something I think you often do and that sometimes works really well - other times doesn’t work; I still don’t know why. Maybe it has something to do with panels that have a lot of code in them? But if you do a small test panel like the one you did it seems that those functions are exposed / fired off when you load the panel.


It seems like you can block functions at boot by adding


x=function(mod,value,source)
if source ~= 6 then
-- do stuff
end
end -- callback for modulator named myMod1

If you change another modulator from a second one:


y=function(mod,value,source)
if source ~= 6 then
x(mod,value,source)
end
end

then function x() will receive '4' as source. But you could change this to any arbitrary number I suppose.


y=function(mod,value,source)
if source ~= 6 then
x(nil,value,100)
end
end

If the user changes the modulator - its own callback Called When the Modulator Changes it will pass '4' to itself. Of course. So instead of source ~=6, you could do if source==4 if this function is never called except when the user changes it.


x=function(mod,value,source)
if source ==4  then
-- do stuff
end
end -- callback for modulator named myMod1

If you do :


z=function(mod,value,source)
if source ~= 6 then
panel:getModulatorByName("myMod1"):setValue(value,true)
end
end

then function x() (attached to myMod1)will receive '5' as source.


From: /Source/Lua/CtrlrLuaModulator.cpp
value(“initialValue”, 0),
value(“changedByHost”, 1),
value(“changedByMidiIn”, 2),
value(“changedByMidiController”, 3),
value(“changedByGUI”, 4),
value(“changedByLua”, 5),
value(“changedByProgram”, 6),
value(“changedByLink”, 7),
value(“changeByUnknown”, 8)

So you could set source at -1 or anything over 9 for custom purposes.
changedByProgram '6' must be at boot time? changedByMidiIn might be interesting '2'.

There is some deeper issue, because I could have sworn a test panel I made showed a utils.warnWindow() using the above logic, but then I couldn't duplicate it.

That JD-990 panel confuses me because I never did any of this and it never runs functions at startup when it should. There must be some timeout or something, so panels with a large number of methods don't do this, but a small panel does. Something like that. Will be interesting to hear about your test results. If this really works well, one could do away with all those bootstrap functions and flag variables set with timers etc.



dobo365


Yes, if the source parameter is listened to at boot time / panel opening. I'll let yo know the results of my tests.

And, FYI, I have been using the source=2 several times to have the panel showing the right tab based on what the user is doing on the synth. Turning a knob on the synth sends a CC (or NRPN or sysex) to the modulator that is triggering its change method. The first thing in the change method is to switch to the tab where that modulator is lying.
dobo365
14 days ago
Author

Yes, if the source parameter is listened to at boot time / panel opening. I'll let yo know the results of my tests.

And, FYI, I have been using the source=2 several times to have the panel showing the right tab based on what the user is doing on the synth. Turning a knob on the synth sends a CC (or NRPN or sysex) to the modulator that is triggering its change method. The first thing in the change method is to switch to the tab where that modulator is lying.


dnaldoog

Ah so source ==2 is what comes in when the user  changes a knob on the
synth? That’s going to be very useful because then we can change functions
depending on that source parameter different To when the user changes a
lknob on the panel. Excellent.



dobo365

OK. I made a few tests and need to do more (esp. with VST instances).
Current status is mixed and can drives you nuts... 

    source=6 is indeed used at panel start and source=4 is used when you press the button in the panel
    as is, I can see that when you open the second panel, each method is called 2 times. I guess once for the first panel and once for the second one
    when adding the source=6 protection, the second panel opens without the popup issue; Great!!!
    when clicking on a button in the second panel (Rename for example), the method is called 2 times and the popup appears 2 times, once for the new panel and once for the second one

Further tests to be done:

    different panels but with the same philosophy and method names. I really hope this will work because will make copy/paste of code between panels easier
    same panel in VST on 2 different tracks
    
 Dnaldoog
    
Here is a test panel I made that also tests for source==2. You can change the CC number for the uiSlider labelled "incoming", but I found I had to close the panel and reopen it for that to work. 

    When this panel is loaded source = 6 is generated.
    When another modulator modifies another modulator source = 5 is generated.
    When the user changes the value on a modulator source = 4 is generated

source parameter_1_0_0_2021-03-05_21-49.zip

dobo365

I have now done further tests and have an happy face thanks to you, @dnaldoog !
So:

    it is needed to add a test for source==6 and source==1 in the beginning of all methods containing calls to utils.xxx functions
    On my panels I have such code:

--
-- Called when a modulator value changes
-- @mod   http://ctrlr.org/api/class_ctrlr_modulator.html
-- @value    new numeric value of the modulator
--
Load_OnChange = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)

	-- No action while loading a program or if the panel is in bootstrap or program states
	if bLoadingProgram or not isPanelReady() or source==6 or source==1 then
		return
	end	
...
end

    I can now open different panels in parallel
    I can now open the same panel several times either in standalone or in VST
    In VST it is now possible to save DAW presets and replaced them without the multiple popups issue

I'm now adapting all my panels one by one including their manual.
Many thanks again!!!



dnaldoog

Great to hear Goodweather,

I didn't know about source==1 -- will look into that - thanks.
Looks like I might have to go back and change all my panels too!

Here is a suggested function that all this could be wrapped in:


panelLoadBlock=function(src)
local set = {
  [0] = false, --value(“initialValue”, 0),
  true, --value(“changedByHost”, 1),
  false, --value(“changedByMidiIn”, 2),
  false, --value(“changedByMidiController”, 3),
  false, --value(“changedByGUI”, 4),
  false, --value(“changedByLua”, 5),
  true, --value(“changedByProgram”, 6),
  false,  --value(“changedByLink”, 7),
  false, --value(“changeByUnknown”, 8)
  } -- false allows function to be run 
return set[src]
end -- function

So, any function that needs to be blocked or muted when the panel loads would have this code at the beginning of the function.


myFunctionToBlock=function(mod,value,source)
if panelLoadBlock(source) then return end
utils.warnWindow("Hello","World")
end -- my function


dobo365

Yes of course with a function it works as well.

I don't know what source == 1 really mean. I thought it was coming when in VST mode (the DAW is the host) but if I'm not wrong I got it while in standalone.

What you must also know is that opening a second panel (different or not from the first one) was launching the methods from the first one. So, this helped me tracked the source values thanks to the console.
I had also to do the opposite to be sure (when opening panel2 after panel1, you need to try panel1 after panel2) to not forget some methods.

I didn't put the source limitation in other methods. Maybe they are also fired but that this is not visible.
Will try that by putting a simple console(tostring(source)) statement in some of them as I did for my main tests.


Dnaldoog 1 mei 2021

Here is code I use for radio buttons using source to avoid infinite loops.

Table t{} contains the names of the buttons in the radio group:


ProgramSelect = function(mod,value,source)
    if source == 4 then
        local sName = L(mod:getName())
        local t = {"PROGRAM01", "PROGRAM02", "PROGRAM03", "PROGRAM04"} -- local table of 4 radio buttons
        for i, v in pairs(t) do
            if sName == v then
                local sysMess = string.format("F0 00 00 23 01 43 C1 00 %.2X F7", i - 1)
                panel:sendMidiMessageNow(CtrlrMidiMessage(sysMess))
            else
                _G[v]:setValue(0, true) 
               -- don't use panel:getComponent(v) // use panel:getModulatorByName(v)
            end
        end
    end
end -- source == 4 (user clicked on a button - not lua generated - that would be 5 or 6) end

--[[ 
*NOTE: Where PROGRAM01 etc are initialised in an init script
"Called when the panel has finished loading"
PROGRAM01=panel:getModulatorByName("PROGRAM01")
PROGRAM02=panel:getModulatorByName("PROGRAM02")
PROGRAM03=panel:getModulatorByName("PROGRAM03")
PROGRAM04=panel:getModulatorByName("PROGRAM04")
--]]


https://ctrlr.org/radio-button-code-generator/


Godlike-Productions

Oh nice, that's probably an even nicer way of doing it.

Does source 4 work if a button is pressed via MIDI (ie a user has mapped an Ableton Modulator to press the button)?


dnaldoog

I think in this post Goodweather talks about source=2 being passed in for incoming.

Maybe set up some console() code to detect what you get then do something like if source == 4 or source ==2 then … end perhaps?.
