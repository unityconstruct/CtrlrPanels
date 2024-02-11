Radio button in a modulator group needs a default setting
June 29, 2020

damien

Hi,
I have several groups of buttons defined as radio buttons.
I want to set one button let’s say ButtonA as a default ON if none of them are ON.

ButtonA, ButtonB and ButtonC are radio buttons in the same group.
If ButtonA is ON and I press Button B, then ButtonA switch to OFF and B to ON. Perfect.
But If Button A is ON and I press A again or, if Button A receives a Midi IN message to OFF, None of the Button from the Group Will be ON, it’s no longer a Radio button stack.
How do I manage to have a fallback or default button from the group to be ON like Real Radio buttons that you can’t click twice?

Thanks a lot

dnaldoog

I did something similar in my JD-990 panel, but all in lua:
ctrlr.org/roland-jd990-super-editor/
I use similar code for the Tone Switch buttons.


--
-- Called when a mouse is down on this component
--

myRadio = function(--[[ CtrlrComponent --]] comp, --[[ MouseEvent --]] event)
local modName=L(comp:getOwner():getName())

local t={"ButtonA","ButtonB","ButtonC"}
for _,v in ipairs(t)do
	panel:getModulatorByName(v):getComponent():setValue(0,false)--set all other modulators to false
	if v==modName then
		-- do something
		panel:getLabel("debug"):setText(v)
	end
end

end --f
Not sure if this is what you are after?

You might have to initialise one of the buttons on startup to make sure one is engaged perhaps.

Regards,

Radio-1_1_0_Hell-O-Kitty_2020-06-29_18-57.panel


Well it becomes difficult when you need to use these buttons as toggle buttons sending MIDI 0/1 or 0/127.

Here is a more developed version:

First I have an some initialising code in a function that runs when the panel loads.


--
-- Called when the panel has finished loading
--
-- @type the type of instance beeing started, types available in the CtrlrPanel
-- class as enum
--
-- InstanceSingle
-- InstanceMulti
-- InstanceSingleRestriced
-- InstanceSingleEngine
-- InstanceMultiEngine
-- InstanceSingleRestrictedEngine
--
init = function(--[[ CtrlrInstance --]] type)
dontBlock=false
panel:getModulatorByName("ButtonA"):setValue(1,false)
panel:getModulatorByName("ButtonB"):setValue(0,false)
panel:getModulatorByName("ButtonC"):setValue(0,false)
myGlobal="ButtonA"
globalValue=127
end
then a common mouse down function attached to each button:


--
-- Called when a mouse is down on this component
--

myRadio = function(--[[ CtrlrComponent --]] comp, --[[ MouseEvent --]] event)
local modName=L(comp:getOwner():getName())
dontBlock=true
if dontBlock then
local t={ButtonA=75,ButtonB=76,ButtonC=77}
for k,v in pairs(t)do
	panel:getModulatorByName(k):getComponent():setValue(0,false)--set all other modulators to false
	if k==modName then
	if myGlobal==tostring(k) and globalValue==127 then
	globalValue=0
else
	globalValue=127
	end
		-- do something
		panel:sendMidiMessageNow(CtrlrMidiMessage(string.format("B6 %.2x %.2x",v,globalValue)))
		panel:getLabel("debug"):setText(k.."\nsending "..string.format("%.2X",globalValue))
	myGlobal=tostring(k)

	end
end
end -- dontBlock
end --f
Note the change in the t{} table to a hash table:

Regards,

JG

screenshot of lua radio group panel

Attachments:
Radio-1_1_0_Hell-O-Kitty_2020-06-29_18-57-1.panel
June 30, 2020 at 2:40 am#118972REPLY | REPORT | QUOTE

damien


Hi Dnaldoog,
Thanks for the reply, I checked your exemple panel and it’s exactly what I want, same for the one you put on your JD990.
I saw that on your tone selector in the JD990 you used the method on valueChange and in the exemple panel you assigned the method to onClick

Can you explain me the difference and the benefits?

I also cannot manage to make this script work on mine since it’s uiImageButton and not uiButton maybe it’s a bug from ctrlr for mac or my script is wrong, even with a striped down version to check onclick I don’t get anything in the console :

UnitSelect = function(--[[ CtrlrComponent --]] comp, --[[ MouseEvent --]] event)
console("Test Script UnitSelect")
end

Here’s my “intended” script:

--
-- Called when a mouse is down on this component
--

UnitSelect = function(--[[ CtrlrComponent --]] comp, --[[ MouseEvent --]] event)

console("UnitSelect is fired")

local modName=L(comp:getOwner():getName())
console(modName)

local t={"ViButComA","ViButComB","ViButComC","ViButComD"}

for _,v in ipairs(t)do

	panel:getModulatorByName(v):setModulatorValue(false, false, false, false)	-- Set all other modulators to false
	
	if v==ViButComA then
		panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, 0x00, 0xf7})) -- Press Button
		panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x08, 0x00, 0xf7})) -- Release Button
		console("Unit Button Pressed"..toString(v))
	elseif v==ViButComB then
		panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, 0x01, 0xf7})) -- Press Button
		panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x08, 0x01, 0xf7})) -- Release Button
		console("Unit Button Pressed"..toString(v))
	elseif v==ViButComC then
		panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, 0x02, 0xf7})) -- Press Button
		panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x08, 0x02, 0xf7})) -- Release Button
		console("Unit Button Pressed"..toString(v))
	elseif v==ViButComD then
		panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, 0x03, 0xf7})) -- Press Button
		panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x08, 0x03, 0xf7})) -- Release Button
		console("Unit Button Pressed"..toString(v))
	end
end

end
When I assign this script in the value change method it loops like crazy 🙂

Any clue about what could be possibly wrong?

I just need 1 shared script by 4 buttons with 4 different messages sent according to the button pressed and the radiobutton feature like in you demo. I am struggling to get this done.


Edit:
Attached a demo script where button launch the script on mouse down, and the same with imageButton does not. (console)

Attachments:
imageButton-onClick-Bug.panel
June 30, 2020 at 5:37 am#118975REPLY | REPORT | QUOTE


DnaldDoog,
Don’t worry my friend. I know your post vanished in the abyss but I received it via mail. I’ll check your method tomorrow. My main concern is that “on mouse down” feature doesn’t work properly with images as button, it’s something wrong with the Ctrlr app itself.
I’ll check and try what you posted.

thanks a lot!

dnaldoog wrote:

Well it becomes difficult when you need to use these buttons as toggle buttons sending MIDI 0/1 or 0/127.

Here is a more developed version:

First I have an some initialising code in a function that runs when the panel loads.

—
— Called when the panel has finished loading
—
— @type the type of instance beeing started, types available in the CtrlrPanel
— class as enum
—
— InstanceSingle
— InstanceMulti
— InstanceSingleRestriced
— InstanceSingleEngine
— InstanceMultiEngine
— InstanceSingleRestrictedEngine
—
init = function(–[[ CtrlrInstance –]] type)
dontBlock=false
panel:getModulatorByName(“ButtonA”):setValue(1,false)
panel:getModulatorByName(“ButtonB”):setValue(0,false)
panel:getModulatorByName(“ButtonC”):setValue(0,false)
myGlobal=”ButtonA”
globalValue=127
end

then a common mouse down function attached to each button:

—
— Called when a mouse is down on this component
—

myRadio = function(–[[ CtrlrComponent –]] comp, –[[ MouseEvent –]] event)
local modName=L(comp:getOwner():getName())
dontBlock=true
if dontBlock then
local t={ButtonA=75,ButtonB=76,ButtonC=77}
for k,v in pairs(t)do
panel:getModulatorByName(k):getComponent():setValue(0,false)–set all other modulators to false
if k==modName then
if myGlobal==tostring(k) and globalValue==127 then
globalValue=0
else
globalValue=127
end
— do something
panel:sendMidiMessageNow(CtrlrMidiMessage(string.format(“B6 %.2x %.2x”,v,globalValue)))
panel:getLabel(“debug”):setText(k..”\nsending “..string.format(“%.2X”,globalValue))
myGlobal=tostring(k)

end
end
end — dontBlock
end –f

Note the change in the t{} table to a hash table:

Regards,

JG

dnaldoog

Hi Damien,

It’s probably a bug, but you can’t use mouse down functions with uiImageButtons. The label will pick up the mousedown, but not the main body of the image button.

What I do sometimes is have an invisible uiButton sitting above in a separate layer. If you do this though, you won’t see the button image changing (like a red light on etc) so if you want all the visuals then you have to use a called when modulator value changes function which means the lua will be always firing ( which could create an infinite loop ) as was discussed here ctrlr.org/forums/topic/lua-scripts-in-positive-feedback-loop/ recently, so a redesign/rethink would be necessary.

In your code if v==ViButComA then is viButComA a variable set to panel:getModulatorByName(“viButComA “)?

If it is, then you are comparing a string ‘v’ to an object. Would need to be if v == "ViButComA "

Also, I don’t think setModulator() can take a boolean – needs to be an integer.

panel:getModulatorByName(v):setModulatorValue(false, false, false, false) -- Set all other modulators to false

but better to use:

panel:getModulatorByName(v):setValue(0, false,) … I think

And also, the if / else is not necessary in that loop, because you are running through each element anyway, so something like:


for i,v in ipairs(t)do

	panel:getModulatorByName(v):setValue(0, false)	-- Set all other modulators to false
	
-- not sure about what the above achieves
	
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, i-1, 0xf7})) -- Press Button
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x08, i-1, 0xf7})) -- Release Button
		console("Unit Button Pressed"..toString(v))
end
🎶


Here is a panel that might do what you want to do using uiButtonImage.

Previous post has been blocked again and is awaiting moderation.

I’ll post it again here:

This is how to do it using when modulator value changes with uiImageButton. It’s a bit more complicated.
If I understand the sysex you’re trying to send that is,


UnitSelect = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)
if source==4 then -- should stop this code running on start
	
	local n=L(mod:getName())
	local t={ViButComA=0,ViButComB=1,ViButComC=2,ViButComD=3}
	
	for k,v in pairs(t)do
		if k==n then
			panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, value*8, t[n], 0xf7}))
		else
			
			panel:getModulatorByName(k):setValue(0,false) -- true can create an infinite loop
			panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0, v, 0xf7})) 
			
		end -- fi
	end -- for
	
end -- source ==4 (user clicked on a button - not lua generated
end
In an init function:


init = function(--[[ CtrlrInstance --]] type)

panel:getModulatorByName("ViButComA"):setValue(1,true)
panel:getModulatorByName("ViButComB"):setValue(0,true)
panel:getModulatorByName("ViButComC"):setValue(0,true)
panel:getModulatorByName("ViButComD"):setValue(0,true)
end
This reply was modified 1 day, 6 hours ago by dnaldoogdnaldoog. Reason: added blocked post comments
Attachments:
radio-2_1_0_Hell-O-Kitty_2020-06-30_21-58.bpanelz
June 30, 2020 at 9:18 pm#118984REPLY | REPORT | QUOTE

damien

Hi Dnaldoog,

This is awesome! it’s working perfectly.
In my case pressing buttons requires 2 messages : pressing (00) and releasing (08), because there is combo with 2 or 3 button pressing at the same time. In the latter case, you have 2 “press” button registered then a 3rd one that defines the task to do like saving banks or switching FX from Unit A or B etc… the implementation of sysex in this DP4 is very complex.

So the script is :

UnitSelect = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)
if source==4 then -- should stop this code running on start
	
	local n=L(mod:getName())
	local t={ViButComA=0,ViButComB=1,ViButComC=2,ViButComD=3}
	
	for k,v in pairs(t)do
		if k==n then
			panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0, v, 0xf7})) -- press button
			panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, value*8, t[n], 0xf7})) -- release button
		else
			panel:getModulatorByName(k):setValue(0,false) -- true can create an infinite loop			
		end -- fi
	end -- for
	
end -- source ==4 (user clicked on a button - not lua generated
end
I wonder were did you get this “source” tag from and since manually is value = 4 I really want to know what other values represent. This is secret weapon.

I blocked/allowed sending param value on refresh for all the knobs with a statement in my “send message” script :

-- BLOCK UPDATE IF THE VALUE CHANGE IS FROM AN EDIT BUFFER REQUEST
if AllowStatusUpdate == 0 then
	console("Param BLOCKED Because AllowStatusUpdate is OFF")
else
	panel:sendMidiMessageNow(CtrlrMidiMessage(m:toHexString(1)))
end
So the parameter value message bond to the modulators is only sent by hand command.

And added a mousedown method on every knobs


ParamAllowStatusUpdate = function(--[[ CtrlrComponent --]] comp, --[[ MouseEvent --]] event)

-------------------------------------------------------------------------
--	BLOCK CTRLR TO SEND PARAM CHANGE AFTER RECEIVING EDIT BUFFER MESSAGE
--	ONLY PARAM CHANGE FROM MOUSEDOWN ARE ALLOWED
-------------------------------------------------------------------------

AllowStatusUpdate = 1
console("AllowStatusUpdare ON via MouseDown on Param Knob")
end

This source == 4 condition will help me a lot cleaning up my script at the final stage.

Thank you so much for your help and sharing your knowledge, I really improved my logic skills with this project.

This reply was modified 1 day ago by damien. Reason: typo, missing part
June 30, 2020 at 10:39 pm#118986REPLY | REPORT | QUOTE



I am sorry I’ve been to fast, I thought this was working… but in fact it wasn’t.

The radio switching operates properly and the message is sent as well but if the image is clicked twice, the button position can be reset to OFF.
If the button is ON and clicked a second time it has to stay on and it’s not.

Check on your demo if you click a button twice, all set to OFF.



Alright, I fixed the issue with a statement based on the current value of the clicked modulator

It sends the message only if the button was not ON before clicking on it.
And it locks the position to ON if clicked a second time without sending the sysex message twice.


UnitSelect = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)
if source==4 then -- should stop this code running on start
	
	local n=L(mod:getName())
	local UnitModValue = panel:getModulatorByName(n):getModulatorValue()
	local t={ViButComA=0,ViButComB=1,ViButComC=2,ViButComD=3}
	
	console("Unit Selected Value : "..tostring(UnitModValue))

	for k,v in pairs(t)do
		if k==n and UnitModValue == 0 then
			console("Unit Selected : "..tostring(k))
			panel:getModulatorByName(k):setValue(1, true)
		elseif k==n and UnitModValue == 1 then
			panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, v, 0xf7})) -- press button
			panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x08, v, 0xf7})) -- release button
		elseif k~=n then
			panel:getModulatorByName(k):setValue(0, true)

		end -- fi
	end -- for
	
end -- source ==4 (user clicked on a button - not lua generated
end
Hope it will help people having trouble with radio buttons like me 😉


dnaldoog

Hi Damien,

You were right about clicking twice on the button. I could have sworn I had fixed that!

Anyway, your code works beautifully.

The only problem now could be updating the radio button array from incoming MIDI, because source==4 will block that too. source==5 will allow lua code to run, but then you would run into problems with the lua creating infinite loops. This source parameter was a recent discovery for me.

Anyway I am re-posting another panel with your code for other people to look at in the future who might come across this problem.

button array panel

———————————————————
–[[
github.com/RomanKubiak/ctrlr/blob/de28dc3ad3591a5832f1e38ce8adabc9369b1011/Source/Lua/CtrlrLuaModulator.cpp
value(“initialValue”, 0),
value(“changedByHost”, 1),
value(“changedByMidiIn”, 2),
value(“changedByMidiController”, 3),
value(“changedByGUI”, 4),
value(“changedByLua”, 5),
value(“changedByProgram”, 6),
value(“changedByLink”, 7),
value(“changeByUnknown”, 8)
–]]

… so far I have only been seen values 4 or 5 generated

This reply was modified 21 hours, 25 minutes ago by dnaldoogdnaldoog.
Attachments:
radio-2_2_0_Hell-O-Kitty_2020-07-01_07-31.bpanelz
July 1, 2020 at 2:27 am#118999REPLY | REPORT | QUOTE

damien

Buttons are updated via midi since LUA method do the work. On midiIn update, the source = 5 but still fires the buttons sysex.
But I don’t wan’t my buttons to send values again on their update via MidiIn so I added a kind of callback value inside my midiReceived script :

ReceivingBufferEdit = 1 — Block Active Unit Update
script to update all the parameters on dump reception
ReceivingBufferEdit = 0 — Allow Active Unit Update

and on the radio type script I have :

UnitSelect = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)
if source==4 then  -- should stop this code running on start

console("Source for UnitSelect : "..(source))

if ReceivingBufferEdit==0 then -- Send button values only if they are not updated via Midi dump

	local n=L(mod:getName())
	local UnitModValue = panel:getModulatorByName(n):getModulatorValue()
	local t={ViButComA=0,ViButComB=1,ViButComC=2,ViButComD=3}
	
	console("Unit Selected Value : "..tostring(UnitModValue))

	for k,v in pairs(t)do
		if k==n and UnitModValue == 0 then
			console("Unit Selected : "..tostring(k))
			panel:getModulatorByName(k):setValue(1, true)
		elseif k==n and UnitModValue == 1 then
			panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x00, v, 0xf7})) -- press button
			panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0x08, v, 0xf7})) -- release button
		elseif k~=n then
			panel:getModulatorByName(k):setValue(0, true)

		end -- fi
	end -- for

end
	
end -- source ==4 (user clicked on a button - not lua generated

end
And it’s all good. Thank you for your help


dnaldoog


Excellent!

I was thinking something like that would be necessary.

I haven’t really tested this ‘source’ thing too much.

Should be a good reference post for to others wanting to do this in future, because radio buttons aint easy!

Regards,

JG



This is how to do it using when modulator value changes with uiImageButton. It’s a bit more complicated.
If I understand the sysex you’re trying to send that is,


--
-- Called when a modulator value changes
-- @mod http://ctrlr.org/api/class_ctrlr_modulator.html
-- @value new numeric value of the modulator
--
UnitSelect = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)
if source==4 then -- should stop this code running on start
	
	local n=L(mod:getName())
	local t={ViButComA=0,ViButComB=1,ViButComC=2,ViButComD=3}
	
	for k,v in pairs(t)do
		if k==n then
			panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, value*8, t[n], 0xf7}))
		else
			
			panel:getModulatorByName(k):setValue(0,false) -- true can create an infinite loop
			panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x01, 0x00, 0x02, 0, v, 0xf7})) 
			
		end -- fi
	end -- for
	
end -- source ==4 (user clicked on a button - not lua generated
end
In an init function:


--
-- Called when the panel has finished loading
--
-- @type the type of instance beeing started, types available in the CtrlrPanel
-- class as enum
--
-- InstanceSingle
-- InstanceMulti
-- InstanceSingleRestriced
-- InstanceSingleEngine
-- InstanceMultiEngine
-- InstanceSingleRestrictedEngine
--
init = function(--[[ CtrlrInstance --]] type)

panel:getModulatorByName("ViButComA"):setValue(1,true)
panel:getModulatorByName("ViButComB"):setValue(0,true)
panel:getModulatorByName("ViButComC"):setValue(0,true)
panel:getModulatorByName("ViButComD"):setValue(0,true)
end

graphic: Radio Buttons using uiImageButton


Damien

dnaldoog wrote:

myRadio = function(--[[ CtrlrComponent --]] comp, --[[ MouseEvent --]] event)
local modName=L(comp:getOwner():getName())
dontBlock=true
if dontBlock then
local t={ButtonA=75,ButtonB=76,ButtonC=77}
for k,v in pairs(t)do
	panel:getModulatorByName(k):getComponent():setValue(0,false)--set all other modulators to false
	if k==modName then
	if myGlobal==tostring(k) and globalValue==127 then
	globalValue=0
else
	globalValue=127
	end
		-- do something
		panel:sendMidiMessageNow(CtrlrMidiMessage(string.format("B6 %.2x %.2x",v,globalValue)))
		panel:getLabel("debug"):setText(k.."\nsending "..string.format("%.2X",globalValue))
	myGlobal=tostring(k)

	end
end
end -- dontBlock
end --f
Hi JG,
I am working on a preset popup populated with tables containing the preset names.
Everything is working perfectly but I have some issues with a statement between label names and what it should equals for the statement to be true.

It’s a method fired when some labels are clicked :


--  GET THE LABEL CLICKED SOURCE
	local n = L(comp:getOwner():getName())
	console ("name of the display label"..(n))

--	MAIN MENU
		--PstSelectMain:addSectionHeader ("Select Unit Type")
		if n==lblPrstUA or n==lblPrstUB or n==lblPrstUC or n==lblPrstUD then
			PstSelectMain:addSubMenu("1 Unit RAM", Algo1UnitRamPreset, true, Image(), false, 0)
			PstSelectMain:addSubMenu("1 Unit ROM", Algo1UnitRomPreset, true, Image(), false, 0)
		end
		if n==lblPrstUA or n==lblPrstUC then
			console("U2 submenu")
			PstSelectMain:addSubMenu("2 Unit RAM", Algo2UnitRamPreset, true, Image(), false, 0)
			PstSelectMain:addSubMenu("2 Unit ROM", Algo2UnitRomPreset, true, Image(), false, 0)
		end
		if n==lblPrstUA then
			console("U4 submenu")
			PstSelectMain:addSubMenu("4 Unit RAM", Algo4UnitRamPreset, true, Image(), false, 0)
			PstSelectMain:addSubMenu("4 Unit ROM", Algo4UnitRomPreset, true, Image(), false, 0)
		end
		if n==lblProgramName or lblAdditionalInfo then
			console("Config submenu")
			PstSelectMain:addSubMenu("Config RAM", ConfigRamPreset, true, Image(), false, 0)
			PstSelectMain:addSubMenu("Config ROM", ConfigRomPreset, true, Image(), false, 0)
		end

I don’t know why but even if n returns lblPrstUA i.e the statement if n==lblPrstUA is never true.

My script is alright if I remove all the above statements.

Thanks for your help, have a nice weekend

Damien


dnaldoog

Hi Damien,

You need to surround those if statements with quotes (single or double) else lua is interpreting those as object names.

if n=="lblPrstUA" or n=="lblPrstUB" or n=="lblPrstUC" or n=="lblPrstUD" then

In the hash table example local t={ButtonA=75,ButtonB=76,ButtonC=77} ButtonA etc are variable names so no quotes needed. In a regular lua table of elements, you need quotes (unless it is a table of objects) local t={"ButtonA","ButtonB","ButtonC"}

Regards.

PS
Be careful with if n==lblProgramName or lblAdditionalInfo – the second part of the if statement is checking for boolean truth.

This reply was modified 1 day, 12 hours ago by dnaldoogdnaldoog. Reason: added warning about missing "or"
July 4, 2020 at 8:38 am#119043REPLY | REPORT | QUOTE

damien


dnaldoog wrote:
if n=="lblPrstUA" or n=="lblPrstUB" or n=="lblPrstUC" or n=="lblPrstUD" then

Thank you very much, it makes sense. I changed it and it worked right away, like magic!
take care



Goodweather


That’s why it is best to use a variable name like sName (s for string) instead of n even if Lua do not make the difference.

About the Called on mouse down vs Called when changed:
– with uiImageButton, indeed, the OnClick is only fired when you click on the label. I’m using that to display some value or help text without changing the actual value
– but I’m going further by redirecting my OnChange method to the OnClick one because I also want to display the value and help text when the user changes the value

--
-- Called when a modulator value changes
-- @mod   http://ctrlr.org/api/class_ctrlr_modulator.html
-- @value    new numeric value of the modulator
--
OnOff_OnChange = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)

	-- No action while loading a program or if the panel is in bootstrap or program states
	if not isPanelReady() then
		return
	end

	OnOff_OnClick(mod:getComponent())

end

Best of both worlds 😉



Dnaldoog

Just an observation that the following code I wrote(see this post) is not logical:


local UnitModValue = panel:getModulatorByName(n):getModulatorValue()
	local t={ViButComA=0,ViButComB=1,ViButComC=2,ViButComD=3}
	
	console("Unit Selected Value : "..tostring(UnitModValue))

	for k,v in pairs(t)do
		if k==n and UnitModValue == 0 then
			console("Unit Selected : "..tostring(k))
			panel:getModulatorByName(k):setValue(1, true)



1.	!!! local UnitModValue = panel:getModulatorByName(n):getModulatorValue()!!!-> This could just be value, but we don’t need it anyway 		as value passed in to the function parameter is always 1:

2.	if k==n and UnitModValue == 0 then this condition can never be reached (See #1)!
    
3.	Should be:

	    for k,v in pairs(t) do
    		if k==n then -- n = name of modulator clicked on
    			--do something
                    else
    			panel:getModulatorByName(k):setValue(0, true)
                   --set other radio buttons to 0 or off
	    end


Dashie

I’m using a function via “Called when the modulator value changes” to send an appropriate Prg change when using some switchs and have an issue with the lua code.

I have three groups of 6, 3 and 3 uiToggleButton, each with a different name and each in a Radio group of 1, 2 and 3 respectively (with Is component a member of a group checked”.
This part is OK, I can have only one button checked at a time in one of each groups.

In the Modulator list window I can correctly see all buttons with modulatorValue of 0 excepted the one checked in each group.


Goodwheater

Without looking further, I would advise you to reduce the size of this problem…
In a new panel, create 2 uiToggleButton (I’m using uiImageButton – not sure it is the same but it works fine for On/Off things).

In the console check you get the correct value:

You need in fact to retrieve the value of the Components and not the Modulator!
So, you should use the following code that works fine

console(tostring(panel:getModulatorByName("typeRoom"):getComponent():getValue()))
console(tostring(panel:getModulatorByName("typeHall"):getComponent():getValue()))

Then group them as radio button and do the same check.

In my panel, I do all panel:getModulatorByName(“name”) in a method called at panel load. This is more efficient when you have a large number of components (getModulatorByName is searching line by line in a table of all components so better doing this only once)

So:

modReverbRoom = panel:getModulatorByName("typeRoom")
modReverbHall = panel:getModulatorByName("typeHall")

Then in my code I just use

console(tostring(modReverbRoom:getComponent():getValue()))
console(tostring(modReverbHall:getComponent():getValue()))




