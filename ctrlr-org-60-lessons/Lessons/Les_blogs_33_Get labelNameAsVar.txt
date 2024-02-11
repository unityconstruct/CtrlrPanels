Get “label” from popup submenu item
June 29, 2020

damien


I am working with popups for preset bank management
I wonder how to get the name between brackets of a popup item.

let’s say :

UA1UnitRamReverbBank:addItem(00, "Small Room Verb", true, false, )

I want to display “Vocal Plate 1” on a label with the function :

UAPstItemName = XXXX -- The item name
UAPstName = string.format("%s", UAPstItemName)
panel:getLabel("lblPrstUA"):setText(UAPstName)
I checked the Juce docs for popups but cannot figure out to get this :
https://docs.juce.com/master/classPopupMenu.html
https://docs.juce.com/master/structPopupMenu_1_1Item.html#details

Thanks a lot for your help.

Attachments:

Capture-d’écran-le-2020-06-28-à-18.19.56.png


dnaldoog

if ret == 0 then -- the selected index of the popup
		return
	end
	panel:getLabel("lblPrstUA"):setText(lookup[ret]))
The way I do this in the ctrlr.org/c-plg150-an/ panel, which has many examples of this, is refer back to a lookup table of names.


lookup={
"Small room verb",
"plate reverb",
"large hall",
...
}


Damien

Hi dnaldoog,

I implemented a LUT like you suggested.
It’s working well with a table like this.

Thanks a lot! Have a good night

Hi,
All the ROM presets and default RAM are in tables and everything is called perfectly.
The only issue is that since I am using for k,v in pairs(t) and not ipairs, when the script iterates the table, they values are sorted for k in an random/arbitrary order. i.e :
01 = plate reverb, 02 = room reverb, 03 = Hall reverb…
returns 02,01,03 …
Is there a way to “index” a keyed table so that “for k,v in pair(t)” I get value in the right ascending order ?

Thanks a lot!


dnaldoog

Hi Damien, it’s not easy to do in lua unlike php, but if you need to, read lua.org/pil/19.3.html.

In your case it looks like the hash is a numerical sequence, so you don’t need a hash table; a vector table is all you need.

t={"plate reverb","room reverb","Hall reverb"}

for i,v in ipairs(t) do
console(String("0"..i.." "..v))
end
Regards,

JG


damien

Thanks for your reply, I tried LUA “while …” function and “sort” without the success I wanted.
I decided to reformat all my tables without keys.

from


local Preset1UnitRamName={[00] = "Vocal Plate 1",...}
local Preset1UnitRomName={[50] = "Small Room Rev",...}
to


local Preset1UnitRamName={"00 Vocal Plate 1",...}
local Preset1UnitRomName={"50 Small Room Rev",...}
and used string.sub to reformat in two parts the value from the selected table(PresetName) [required statements relative to the popup item selected ID where defined beforehand], as the number, and the Preset name.

And there you go:

	for i,v in ipairs(PresetName) do
		local index = tonumber(i-1)
		if index==PstID or index == PstID-50 then -- convert the Preset Number in its Table Index value
			local PstSpecID = tostring(string.sub(v, 1,2))   -- Get bank number from 2 first characters of the Popup Item selected
			local PstSpecName = tostring(string.sub(v, 4,19))   -- Get bank number from #4 characters to #16 of the Popup Item selected
			panel:getLabel(n):setText(PstSpecName)
			panel:getLabel("lblAdditionalInfo"):setText(string.format("%02d", PstSpecID))
			panel:getLabel("lblProgramChanges"):setText(PstSpecName)
		end -- if
	end -- for
This sub.string reformat is very convenient.

Thanks for your help once again


dnaldoog

Hi Damien,

I am a bit confused about where the table Preset is.

You declare two separate tables


local Preset1UnitRamName={"00 Vocal Plate 1",...}
local Preset1UnitRomName={"50 Small Room Rev",...
but then I don’t see them being looped through.

Another way to do this is have an array matrix:

local Preset={{"00","Vocal Plate 1"},{"50","Small Room Rev",}}
then:


for i,v in ipairs(Preset) do
local index = i-1 -- no need for tonumber()
 if index==PstID or index == PstID-50 then -- convert the Preset Number
	local PstSpecID = v[1]   -- Get bank number
	local PstSpecName = v[2]   -- Get bank name
	panel:getLabel(n):setText(PstSpecName)-- or just setText(v[2])
	panel:getLabel("lblAdditionalInfo"):setText(PstSpecID)-- or just setText(v[1])
	panel:getLabel("lblProgramChanges"):setText(PstSpecName)-- or just setText(v[2])
 end -- if
end -- for
Probably faster?

Didn’t know about %02d!

PS


local Preset1UnitRamName={[00] = "Vocal Plate 1",...}
local Preset1UnitRomName={[50] = "Small Room Rev",...}
if you used a hash table, you would have had to declare it like this:


local Preset1UnitRamName={["00"] = "Vocal Plate 1",...}
local Preset1UnitRomName={["50"] = "Small Room Rev",...}
If you’re just updating labels, the order of the loop probably doesn’t matter, so you could do it that way using pairs, but you need quotes around the irregular hash key name:


local Preset={["00"]="Vocal Plate 1",["50"]="Small Room Rev"}

for k,v in pairs(Preset) do
local index = k-1 -- no need for tonumber()
if index==PstID or index == PstID-50 then -- convert the Preset Number
	panel:getLabel(n):setText(v)
	panel:getLabel("lblAdditionalInfo"):setText(k)
	panel:getLabel("lblProgramChanges"):setText(v)

 end -- if
end -- for
So using pairs is probably the most straightforward.

Regards,


damien

Everything is fine this is because what I paste in my previous post was not the whole script:

I have other statements beforehand :

first I defined the presets name in tables according if they use 1DSP 2DSP and so on and if they are in ROM or RAM



Preset2UnitRamName={"00 ....
Preset2UnitRomName={"50 ....
Preset4UnitRamName={"00 ....
Preset4UnitRamName={"50 ....
...
I created the different submenu for the popup and Then I populate the popup :


...
--	SUB MENU - 2U
--	RAM
	for i,v in ipairs(Preset2UnitRamName) do
		Algo2UnitRamPreset:addItem(i+299, v, true, false, Image())
	end -- for

--	ROM
	for i,v in ipairs(Preset2UnitRomName) do
		Algo2UnitRomPreset:addItem(i+449, v, true, false, Image())
	end -- for

--	SUB MENU - 4U
--	RAM
	for i,v in ipairs(Preset4UnitRamName) do
		Algo4UnitRamPreset:addItem(i+499, v, true, false, Image())
	end -- for

--	ROM
	for i,v in ipairs(Preset4UnitRomName) do
		Algo4UnitRomPreset:addItem(i+649, v, true, false, Image())
	end -- for

--	CONFIG
--	RAM
	for i,v in ipairs(PresetConfigRamName) do
		ConfigRamPreset:addItem(i+699, v, true, false, Image())
	end -- for

--	ROM
	for i,v in ipairs(PresetConfigRomName) do
		ConfigRomPreset:addItem(i+849, v, true, false, Image())
	end -- for
Then I decode the “itemReselultID” returned by the popup with show()
bank is 1st number
preset is 2&3 number

--  FUNCTIONS REQUIRED FOR PRG CHANGE
	local PstBank = tonumber(string.sub(itemResultID, 1,1))   -- Get bank number from #1 digit of the Popup Item selected
	console("PstBank : "..(PstBank))

	local PstID = tonumber(string.sub(itemResultID, 2,3))  -- Get bank number from #2 to #3 digit of the Popup Item selected
	console("PstID : "..tostring(PstID))

Then I created the different messages to select the right banks on the machine before sending the midi program change for the selected preset. It’s required because the same prgr chg can send 5 different presets change. We need to tell the machine wich bank to change (1U, 2U, 4U, the config routing etc) beforhand:


--	PREPEND TO PRG CHANGE MESSAGE
	local Src1ConfigChange = function()
		SelectButton() -- Call Select Button Press/Release
		ConfigButton() -- Call Select Config Press/Release
		panel:sendMidiMessageNow(CtrlrMidiMessage({0x04, 0x34})) -- Config Program 52 (34h) Select 1U Psets
	end

	local Src2ConfigChange = function()
		SelectButton() -- Call Select Button Press/Release
		ConfigButton() -- Call Select Config Press/Release
		panel:sendMidiMessageNow(CtrlrMidiMessage({0x04, 0x33})) -- Config Program 51 (33h) Select 2U Psets
	end

	local Src4ConfigChange = function()
		SelectButton() -- Call Select Button Press/Release
		ConfigButton() -- Call Select Config Press/Release
		panel:sendMidiMessageNow(CtrlrMidiMessage({0x04, 0x32})) -- Config Program 50 (32h) Select 4U Psets
	end

	local ConfigChange = function()
		SelectButton() -- Call Select Button Press/Release
		ConfigButton() -- Call Select Config Press/Release
	end

This is what you asked about, depending on the 1 number of the popup item, it changes the table containing the number of the preset and the preset name :



--  STATEMENTS RELATED TO BANK OF ITEM SELECTED
	if PstBank == 1 then
		PresetName = Preset1UnitRamName
		SrcConfigChange = Src1ConfigChange
	elseif PstBank == 2 then
		PresetName = Preset1UnitRomName
		SrcConfigChange = Src1ConfigChange
	elseif PstBank == 3 then
		PresetName = Preset2UnitRamName
		SrcConfigChange = Src2ConfigChange
	elseif PstBank == 4 then
		PresetName = Preset2UnitRomName
		SrcConfigChange = Src2ConfigChange
	elseif PstBank == 5 then
		PresetName = Preset4UnitRamName
		SrcConfigChange = Src4ConfigChange
	elseif PstBank == 6 then
		PresetName = Preset4UnitRomName
		SrcConfigChange = Src4ConfigChange
	elseif PstBank == 7 then
		PresetName = PresetConfigRamName
		SrcConfigChange = ConfigChange
	elseif PstBank == 8 then
		PresetName = PresetConfigRomName
		SrcConfigChange = ConfigChange
	end

and after all that we send the right prgrm change message to the machine and update the different labels on ctrlr:

--	MIDI MESSAGE
--  PRESET CHANGE FULL MESSAGE SEND

if PstID~=nil then -- check if PstId in not nil for click outside the popup
	for k,v in pairs(ChannelSend) do
		if k==n then
			console("Label Clicked : "..(n))
			console ("Program Change Value : "..(PstID))
			console ("Preset Bank : "..(PstBank))
			SrcConfigChange() -- Config Change Sysex message prepend to Program Change
			PstProgramChange = CtrlrMidiMessage({v, PstID})
			panel:sendMidiMessageNow(PstProgramChange)
		end -- if
	end -- for

	for i,v in ipairs(PresetName) do
		local index = tonumber(i-1)
		if index==PstID or index == PstID-50 then
			local PstSpecID = tostring(string.sub(v, 1,2))   -- Get bank number from 2 first characters of the Popup Item selected
			local PstSpecName = tostring(string.sub(v, 4,19))   -- Get bank number from #4 characters to #16 of the Popup Item selected
			console("Preset Number : "..tostring(PstSpecID))
			console("Preset Name : "..tostring(PstSpecName))
			panel:getLabel(n):setText(PstSpecName)
			panel:getLabel("lblAdditionalInfo"):setText(string.format("%02d", PstSpecID))
			panel:getLabel("lblProgramChanges"):setText(PstSpecName)
		end -- if
	end -- for

	os.execute(sleep(200))
Once the whole instruction is sent to the machine we need to receive the settings of the differents new parameters for the requested preset:


panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x0f, 0x40, 0x00, 0x00, 0x15, 0xf7}))
The message is received by ctrlr and the parameters are then updated.


damien

That would have been easier if we could get the popupitem “itemText” directly.

And the +100, +150, +200 …added up to the index “i” of the preset number was a neat trick to distinguish one bank to call to another.


dnaldoog

damien wrote:
That would have been easier if we could get the popupitem “itemText” directly.

You could probably do this if everything was contained in a single lookup matrix table; kind of like a database, but you would have to do a full re-write re-design and if it’s already working there’s no need.


damien

dnaldoog wrote:
You could probably do this if everything was contained in a single lookup matrix table; kind of like a database, but you would have to do a full re-write re-design and if it’s already working there’s no need.

I thought about that last weekend, but it’s too late. I’ll do it for my next project from the early design. A big table and a loop like in php with while.

So this topic is officially “solved” but I won’t edit the title, I’m too scared about losing all.
My next step for this project is to manage sysex dumps in and out for loading/saving presets and banks as .syx files.
Thank you once again for your precious help. This is priceless.


dnaldoog

Hi Damien,

I recently posted this ctrlr.org/forums/topic/how-i-can-create-a-sysex-file-from-table-on-panel/ about loading and saving lua tables to sysex files. There’s an example panel attachment there.

Regards,

JG


damien

Hi JG,
Your post is absolutely on point, I’ll study this chapter this weekend I am really looking forward to working on that.
Thanks a lot
Damien

