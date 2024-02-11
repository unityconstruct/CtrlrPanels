Demo panel for MIDI receive/transmit routines


human fly

thought for today (before my next Ctrlr session): i want to put together a little demo panel to represent a ‘standard’ 2-way MIDI communication setup, that can easily be adapted for any device, with visual feedback in the panel to demonstrate it working.

i’m going to look at the ‘midiReceive’ methods more closely, and build a little panel with 20 parameters, and hopefully a ‘virtual device’ with a patchbank, for the ‘panel’ to interface with.

(thinking about it from newb’ point of view)

October 12, 2017 at 6:38 am#73156REPLY | REPORT | QUOTE

here’s a first simple panel, with a ctrlr panel side, and an ‘external device’ side. doesn’t do anything yet, it’s just a mock-up with 10 parameters.

need to give it a kind of ‘sysex’ data and work out how it’s going to work next.

Attachments:

panel-and-device1a.png

MIDI_txrx-v01.panel
October 12, 2017 at 8:00 am#73159REPLY | REPORT | QUOTE

here’s a quick v02 – ‘save’ panel side has a method that collects the panel values, and puts data on a ‘lcd’ label at the bottom. but it crashes the 1st time it runs, and if you recompile it, it does send something to the lcd. (nothing else does anything yet – this is a quick attempt to collect data from the panel faders)

edit: skip to v03(where you can click the Data box to delete contents)

This reply was modified 2 years, 7 months ago by human fly.
Attachments:
MIDI_txrx-v02.panel
MIDI_txrx-v03.panel
October 12, 2017 at 2:25 pm#73163REPLY | REPORT | QUOTE
– – – –
one problem here of course is that midiMessage commands are send externally over MIDI, so this has to come up with something to sidestep that, if it’s to send data to a ‘virtual external device’.

October 13, 2017 at 8:04 am#73181REPLY | REPORT | QUOTE

‘morning.. here’s today’s installment, v04:
still not got very far – now has randomising to generate new data quickly, and i fixed the ‘save’ method that collects data to the screen at the bottom – this still isn’t doing what i expected but it does return new data. so it’s more of a demo of those at the moment, along the way. orange buttons work. there’s an ‘info’ method for dev’notes.

Attachments:
MIDI_txrx-v04_randm.panel
October 13, 2017 at 8:24 pm#73183REPLY | REPORT | QUOTE

in the MKS-50 Advanced bpanelz by layzer/bomma72, there’s a method called ‘setPatch’ that seems to be the basis of a typical sysex receive operation.

after a dump request has been sent to the device, this is used to check size and identify the type of data dump. in this case, whether it is Tone or Patch data

setPatch = function(midiMessage)

s = midiMessage:getSize()
if s == 54 then
	assignToneValues(midiMessage)  
	end

if s == 31 then
	assignPatchValues(midiMessage)  
	end
end
assignToneValues and assignPatchValues are 2 functions tacked
onto the end of the method, as:

function assignToneValues(midiMessage)
	
	programData = midiMessage:getLuaData()

	--console ("RAW DATA: ")
	--console (programData:toHexString(1))
	
	panel:getModulatorByName("DcoEvMd"):setValueMapped(programData:getByte(7), true)
	panel:getModulatorByName("VcfEvMd"):setValueMapped(programData:getByte(8), true)

etc...
	panel:getModulatorByName("BndRange"):setModulatorValue(programData:getByte(42), false, false, true)
	pName = string.format("%s%s%s%s%s%s%s%s%s%s",
			TranslateChar (string.format (programData:getByte(43), number )),
			TranslateChar (string.format (programData:getByte(44), number )),

etc..

end

function assignPatchValues(midiMessage)
	
	programData = midiMessage:getLuaData()

	--console ("RAW DATA: ")
	--console (programData:toHexString(1))

	tNumber = string.format("%.2x",programData:getByte(7))
	KeyLow =  string.format("%.2x",programData:getByte(8))
	KeyHigh = string.format("%.2x",programData:getByte(9))

etc...
	
end
so programData = midiMessage:getLuaData() creates a ?memory block?

and then bytes can be accessed as items, and values used to set panel modulator values, eg:

panel:getModulatorByName("DcoEvMd"):setValueMapped(programData:getByte(7), true)
parameter data starts at byte7 -previous 6 bytes are the sysex header.

October 14, 2017 at 6:25 am#73188REPLY | REPORT | QUOTE

there is this also, for sending a patch to the device:

--
-- Called when a modulator value changes
--

SendFullTone = function(modulator, newValue)

if tChar ~= nil then

	label = panel:getModulatorByName("lblPhTtl"):getComponent()
	PatchName = label:getProperty("uiLabelText")

	if PatchName == "" then 
		PatchName = tostring(pNumber) 
		label:setPropertyString ("uiLabelText", PatchName)
	end
	

	if PatchName ~= "*Roland MKS-50*" then

		TransName = ""
		addspace = 0
		b = 0

		for l=1,10 do

			char = string.sub(PatchName,l,l) 

			if char=="%" then char="@" end -- % causes issues. 
			charNum = TranslateStr(string.format(char))

			if tonumber(charNum) > 63 then -- this is for special charicters that are skipped.
				addspace = addspace + 1
			else
				TransName = string.format("%s%s", TransName, string.format(" %.2x", charNum))	
			end

		end
		
		while b < addspace do
			TransName = string.format("%s%s", TransName, string.format(" %.2x", 62)) -- adding blank spaces at the end if characters are not available.
			b = b + 1
		end

		---------------- Tone Transmit ------------------

		PatchCommand = "F0 41 35 00 23 20 01"
		PatchCommand = AddHexCommand("DcoEvMd", tostring(PatchCommand))
		PatchCommand = AddHexCommand("VcfEvMd", tostring(PatchCommand))
		PatchCommand = AddHexCommand("VcaEvMd", tostring(PatchCommand))
		PatchCommand = AddHexCommand("DcoPuls", tostring(PatchCommand))
		PatchCommand = AddHexCommand("DcoSaw", tostring(PatchCommand))
		PatchCommand = AddHexCommand("DcoSub", tostring(PatchCommand))
		PatchCommand = AddHexCommand("DcoRnge", tostring(PatchCommand))
		PatchCommand = AddHexCommand("DcoSbLv", tostring(PatchCommand))
		PatchCommand = AddHexCommand("DcoNse", tostring(PatchCommand))
		PatchCommand = AddHexCommand("VcfHpf", tostring(PatchCommand))
		PatchCommand = AddHexCommand("ChrsOF", tostring(PatchCommand))
		PatchCommand = AddHexCommand("DcoLfo", tostring(PatchCommand))
		PatchCommand = AddHexCommand("DcoEnv", tostring(PatchCommand))
		PatchCommand = AddHexCommand("DcoAftr", tostring(PatchCommand))
		PatchCommand = AddHexCommand("DcoPwm", tostring(PatchCommand))
		PatchCommand = AddHexCommand("DcoPwRt", tostring(PatchCommand))
		PatchCommand = AddHexCommand("VcfFrq", tostring(PatchCommand))
		PatchCommand = AddHexCommand("VcfRes", tostring(PatchCommand))
		PatchCommand = AddHexCommand("VcfLfo", tostring(PatchCommand))
		PatchCommand = AddHexCommand("VcfEnv", tostring(PatchCommand))
		PatchCommand = AddHexCommand("VcfFolw", tostring(PatchCommand))
		PatchCommand = AddHexCommand("VcfAftr", tostring(PatchCommand))
		PatchCommand = AddHexCommand("VcaLvl", tostring(PatchCommand))
		PatchCommand = AddHexCommand("VcaAftr", tostring(PatchCommand))
		PatchCommand = AddHexCommand("LfoRate", tostring(PatchCommand))
		PatchCommand = AddHexCommand("LfoDly", tostring(PatchCommand))
		PatchCommand = AddHexCommand("EnvT1", tostring(PatchCommand))
		PatchCommand = AddHexCommand("EnvL1", tostring(PatchCommand))
		PatchCommand = AddHexCommand("EnvT2", tostring(PatchCommand))
		PatchCommand = AddHexCommand("EnvL2", tostring(PatchCommand))
		PatchCommand = AddHexCommand("EnvT3", tostring(PatchCommand))
		PatchCommand = AddHexCommand("EnvL3", tostring(PatchCommand))
		PatchCommand = AddHexCommand("EnvT4", tostring(PatchCommand))
		PatchCommand = AddHexCommand("EnvFolw", tostring(PatchCommand))
		PatchCommand = AddHexCommand("ChrsRt", tostring(PatchCommand))
		PatchCommand = AddHexCommand("BndRange", tostring(PatchCommand))

		PatchCommand = string.format("%s%s%s", PatchCommand, TransName, " F7")

		panel:sendMidiMessageNow(CtrlrMidiMessage(PatchCommand))

	end

end

end
so this shows how the outgoing bulk message is put together -and presumably would let you write *.syx files for a patch library.
don’t yet understand ‘PatchCommand = string.format(..’ etc.
what is "%s%s%s"?

fascinating stuff for the midi fan. apologies if this is longwinded 🙂

October 14, 2017 at 8:45 am#73189REPLY | REPORT | QUOTE

meanwhile, this now produces the hex bytes correctly. had omitted ‘string.format(%..’ etc.

preset buttons will send some set values to faders. now have to make those set values ‘luaData’ blocks somehow, that can be written to.

(got rid of the 2nd ‘extDevice’ for the time being)

this is a bit of a detour from the original purpose, to look at how the datadump is built (‘duh’ mode).

edit: i think the crash error is a conflict after modulator names have been used to assign values.
edit2: yes, just checked: the presets work when it opens, but not after ‘save’ has been used, bcs that method assigns those variable names as values.
(i think..)
edit3: just changed the variable names in the ‘save’ method, adding ‘val_’ as a prefix to all of them, and it fixed the ‘preset’ crashing.

Attachments:

MIDI_txrx-v08-panel.png

MIDI_txrx-v08_preset.panel
October 14, 2017 at 10:57 am#73192REPLY | REPORT | QUOTE

i just tried to concatenate strings that i’m sending
to text labels, containing hexdata for values. seems
to do something…
edit: but it is outputting gibberish. doesn’t correspond
to what’s in the ‘lcds'(labels) – so it shouldn’t be
‘tostring’..

function buildBankA()
--concatenate strings
local data1=panel:getComponent("lcd_presetData1"):getPropertyString("uiLabelText")
local data2=panel:getComponent("lcd_presetData2"):getPropertyString("uiLabelText")
local data3=panel:getComponent("lcd_presetData3"):getPropertyString("uiLabelText")
local data4=panel:getComponent("lcd_presetData4"):getPropertyString("uiLabelText")

	tabl_bankA = {}

	tabl_bankA[1]	= tostring(data1)
	tabl_bankA[2]	= tostring(data2)
	tabl_bankA[3]	= tostring(data3)
	tabl_bankA[4]	= tostring(data4)

--concatenate table into single string
	DatasConcat = table.concat(tabl_bankA, " ", 1, 4)
	
--make a memory block from the string
	memB = MemoryBlock(DatasConcat)

--send it to lcd
panel:getComponent("lcd_bankDataA"):setPropertyString("uiLabelText",""..memB:toHexString(1))
end
Attachments:
MIDI_txrx-v10_bank.panel
October 15, 2017 at 9:55 am#73200REPLY | REPORT | QUOTE

anyone able to help with concatenating multiple strings
from a table into a single string?
seems like a logical way to approach sticking several
preset values together to produce ‘bank’ data (?)

above does not work.

October 15, 2017 at 10:28 am#73201REPLY | REPORT | QUOTE

sending the checksum is not so difficult, it is a Ctrlr routine,
using ‘z(n)’, where n is the number of bytes you want to checksum.

October 15, 2017 at 10:40 am#73202REPLY | REPORT | QUOTE


dnaldoog

Hi Human Fly,

This code below works and I think you were on the right track (didn’t know about that table.concat function), but I think the problem was the method getPropertyString – getProperty seems to work though. Also for the sendMidi function I think you wrote Memb, should be memB. Interesting!

function buildBankA()

--add strings to table
	tabl_bankA = {}
for i=1,4 do
local s=L(panel:getComponent("lcd_presetData"..i):getProperty("uiLabelText"))
    table.insert(tabl_bankA,s)
end
--concatenate table into single string
	DatasConcat = table.concat(tabl_bankA, " ")
--	console (String("DatasConcat : "..DatasConcat))
--make a memory block from the string
memB = MemoryBlock(DatasConcat)

--send it to synth
panel:sendMidiMessageNow(CtrlrMidiMessage(memB))
console(String("memBlock :"..memB:toHexString(1)))

--send it to lcd
panel:getComponent("lcd_bankDataA"):setPropertyString("uiLabelText",""..memB:toHexString(1))

end

Or this, which is much closer to your original code:


function buildBankA()

--concatenate strings

	local data1=panel:getComponent("lcd_presetData1"):getProperty("uiLabelText")
	local data2=panel:getComponent("lcd_presetData2"):getProperty("uiLabelText")
	local data3=panel:getComponent("lcd_presetData3"):getProperty("uiLabelText")
	local data4=panel:getComponent("lcd_presetData4"):getProperty("uiLabelText")

	tabl_bankA = {}

	tabl_bankA[1]	= data1 -- tostring() not necessary
	tabl_bankA[2]	= data2
	tabl_bankA[3]	= data3
	tabl_bankA[4]	= data4

--concatenate table into single string
	DatasConcat = table.concat(tabl_bankA," ")
	console ("DatasConcat : "..DatasConcat)

--make a memory block from the string
	memB = MemoryBlock(DatasConcat)

--send it to synth
	panel:sendMidiMessageNow(CtrlrMidiMessage(memB))
	--console("memBlock :"..memB:toHexString(1))

--send it to lcd
	panel:getComponent("lcd_bankDataA"):setPropertyString("uiLabelText",""..memB:toHexString(1))

end
panel:sendMidiMessageNow(CtrlrMidiMessage(DatasConcat )) also works, so there’s no need for the MemoryBlock function

October 15, 2017 at 6:09 pm#73206REPLY | REPORT | QUOTE

human fly


😀 GREAT ! thank you !
perfect: i now get all my bytes as they should be. excellent.
i’ve just done it the way most resembling my original,

so i only need to specify start and end with the table if i’m not concatenating all of it? and ‘data1…4’ are already strings, so no need for tostring.. and yes i did have ‘MemB’, and it does make sense to go direct with ‘DatasConcat’. i used the memory block bit because it was in what i was adapting : -)

it’s the first time i’ve attempted something like this.
along the way i’ve looked at getLuaData/getData again, and that seems pretty straightforward (hoho, sure i’ll have some problem there) – i’m wondering if i should just ditch the notion of using a ‘virtual external device’ for this demo panel, for the sake of clarity (it means figuring out how to do it, when i won’t even be using it, as well). any ideas how i might do a ‘virtual’ getData? (haven’t actually thought of it yet)

ie: the idea there is to achieve transfer/receive without having an external device connected, of course. so i guess it needs to be something as close to a midimessage as poss’, without using that Ctrlr function.(don’t know if you opened the panel?)

October 15, 2017 at 6:31 pm#73207REPLY | REPORT | QUOTE

very interesting, how you ‘collect’ the table like that, since they all have the same prefix: you can just append the number of each using:

for i=1,4 do
local s=L(panel:getComponent("lcd_presetData"..i):getProperty("uiLabelText"))
table.insert(tabl_bankA,s)
end
table.insert(tabl_bankA,s) … waAaah!

anyway: here’s the sorted-out version:

Attachments:
MIDI_txrx-v11_bank2.panel
October 15, 2017 at 8:22 pm#73209REPLY | REPORT | QUOTE


just one little problem remaining: if i try to buildBank with empty source labels, Ctrlr crashes – see error png –

strange, because it has started doing that since i added another function elsewhere (a popup menu to select preset to send – at present it just sends “preset sent” 1..4 to the various labels) – and i’m fairly sure it didn’t crash when i tried an ’empty’ buildBank before.

so it needs some contingency for when there’s nothing to write, i guess. going to try it now with one or more source slots empty.. no: that’s ok. it’s just if there’s nothing to write = crash

Attachments:

buildBankEmptyCrash.png

…meanwhile.. thinking of a way to save parameter values to presets…(different thing here, another little detour):

there’s a method called panelSaveCurrent, and the preset buttons display which is active with a ‘led’ above it: this is just a
label with a text hyphen, which changes colour for off(dark)/on(orange)

(this is to avoid using an imported image, and because Ctrlr doesn’t have a native LED graphic)

so, i was thinking that if ‘save’ checked “uiLabelTextColour” for all button ‘leds’ to find out which one is ‘on’ ie: colour == FFD28008, then that will be the preset to be saved ie: at this point, it will just write the bytes to the corresponding presetData label.

anyway, so if i could use something like this:

for i=1,4 do
local s=L(panel:getComponent("ledText"..i):getProperty("uiLabelTextColour"))
		
etc.
end
end

haven’t got it to work yet, but:
if i can get it to send a string, it can also collect the current values, concatenate them, and send that instead. well that’s the current idea anyway.

October 15, 2017 at 10:25 pm#73212REPLY | REPORT | QUOTE

ok, this works: (hehe.. 😀 but i think the 2nd part could get rid of
all the ‘if/elseifs’ with another iteration -couldn’t get it to compile
like that though)

for i=1,4 do
local s=L(panel:getComponent("ledText"..i):getProperty("uiLabelTextColour"))
if s == "FFD28008" then 
	if i == 1 then panel:getComponent("lcd_presetData1"):setPropertyString("uiLabelText","saved1") 
	elseif 	i == 2 then panel:getComponent("lcd_presetData2"):setPropertyString("uiLabelText","saved2")
	elseif 	i == 3 then panel:getComponent("lcd_presetData3"):setPropertyString("uiLabelText","saved3")
	elseif 	i == 4 then panel:getComponent("lcd_presetData4"):setPropertyString("uiLabelText","saved4")
	end
end
end
Attachments:
MIDI_txrx-v13_send.panel
October 15, 2017 at 11:08 pm#73214REPLY | REPORT | QUOTE

here’s another one… now it can write the parameter values for current preset selection to corresponding display – the preset buttons *do not yet retrieve the data*. that’s the next step, and then it will be assigning retrieved data to update controls, hopefully.
(the methods need tidying up, now have stuff they don’t need in the preset methods)

Attachments:
MIDI_txrx-v15_writeNewData.panel
October 16, 2017 at 1:37 am#73218REPLY | REPORT | QUOTE


dnaldoog


It looks like sendMidiMessageNow doesn’t like receiving an empty string

if string.len(memB:toHexString(1)) >0 then
	panel:sendMidiMessageNow(CtrlrMidiMessage(memB))
end
Maybe the L() function is an alias for

std::string LGlobalFunctions::stringToLua (const String &string)
{
    return (string.toUTF8().getAddress());
}
Looks like it converts the string to utf8.

Regards,

October 16, 2017 at 7:53 am#73225REPLY | REPORT | QUOTE

this morning’s installment: preset recall.
preset1 will recall values written to the label(should do!)
see demo panel below.

(edit: just saw your reply )

edit2: all presets recall now, and the ‘send’ menu will get the text from any presetData label to the DataA label at the bottom.
rockin’. 😀

Attachments:
MIDI_txrx-v16_getData.panel
MIDI_txrx-v18_recallMenu.panel
October 16, 2017 at 9:27 am#73228REPLY | REPORT | QUOTE

dnaldoog wrote:
It looks like sendMidiMessageNow doesn’t like receiving an empty string

spot on: i commented out the sendMidiMessageNow line and it stopped crashing.


YEP: that fixed it – thanks again.

and here the ‘recv’ menu recalls values to parameters/updating controls.

Attachments:
MIDI_txrx-v20_recvMenu.panel
October 17, 2017 at 7:39 am#73238REPLY | REPORT | QUOTE

quick attempt to add ten name bytes to the ‘preset’.
(see assignValues and saveCurrent)

there’s something here to change the ledtext colour, that i thought was working, but haven’t yet succeeded in reproducing it with the ‘recv’ button (don’t know if it would logically need to happen, if one was recalling data to a different preset)

>try the 2nd file, i couldn’t remove the first attachment.
made a quick change with hex string.

Attachments:
MIDI_txrx-v23_addName2.panel
October 18, 2017 at 8:55 pm#73246REPLY | REPORT | QUOTE

latest silly idea: i want to do something like this:
i have an ‘external bank’, a string representing 80 bytes of data, that i need to retrieve, and split into 4 ‘presets’, with something like this (this doesn’t work):

--convert bank to table
	tabl_extBank = {}
	for i=1,80 do
	local s=L(memB)
    table.insert(tabl_extBank,s)
	end
	--console(tostring(tabl_extBank))

it doesn’t like local s=L(memB) -i think it needs to be converted to a hex string first or something. the plan then is to select table items in ranges to make new hex strings or strings to represent the 4 presets in the bank.(any alternative ideas welcome for this, i’m just progressing step by step. if it compiles, give it a try, and then move on)

here’s the panel:

(btw: found i can getSize() on a memblock so that’s what i’m using here instead of midi message – what else can we ‘getSize’ on?
what’s the requirement?)

Attachments:
MIDI_txrx-v24_nameBytes.panel
MIDI_txrx-v24_nameBytes-1.panel
October 20, 2017 at 7:23 am#73253REPLY | REPORT | QUOTE

*strange*: i have managed to create *new properties in the properties pane* -??- by using ‘custom index’ to try to define ‘uiSliderThumbColour’
for a group of objects contained on a uiTabs.

this now appears as a custom thumb colour, and it still has the original thumb colour ( and i can’t seem to get rid of the new property…)

see file below (is anyone following the topic?)

Attachments:
MIDI_txrx-v25_tidyUp.panel
October 20, 2017 at 11:51 am#73256REPLY | REPORT | QUOTE

this is what i did:

--custom group items
for k=1,10 do
modul	= panel:getModulatorWithProperty("modulatorCustomIndex",k)
tab	= modul:getComponent():getProperty("componentTabName")

if tab =="tabs_ctrlrPanel" then
modul:setProperty("uiSliderThumbColour","FFD28008", false)
end
end
so this has created a new property that only refers to ‘custom’ items -and doesn’t do anything to the component on the panel, which still has its regular “uiSliderThumbColour” property, remaining the colour it was before. aagh. how do i get rid of the extra property now? 🙂

and can you suggest anything as an alternative to what i’ve done to select all slider components on the tab to change their thumb colour?

October 21, 2017 at 11:26 am#73265REPLY | REPORT | QUOTE

dnaldoog

I did that a few times and wrote a function to clear them.

Is this what you mean? You created a new modulator that is now showing on the panel editor menu (or whatever it is called)?

removeComponentsIcreated=function(NAME)
    --[[While developing I occasionally accidentally created a component or Modulator -- this code removes that entity--]]
    --[[ COMPONENTS --]]
    panel:getModulatorByName(NAME):getComponent():removeProperty("uiSliderThumbColour")
       --[[ MODULATORS --]]
    panel:getModulatorByName(NAME):removeProperty("uiSliderThumbColour")
end --function
October 21, 2017 at 12:58 pm#73267REPLY | REPORT | QUOTE

human fly

umm, *nearly*: (i’m a bit worried about deleting an entire property that i want here ! ) – if you look at the previous panel above, and
click on any fader modulator(component) and scroll down to the ‘custom’ entries, you will see an extra ‘thumb colour’ entry:
it has TWO thumb colour entries ! 🙂 (one is orange, and the other is with the regular ‘component’ properties, and is blue.

so i’ve created a uiSlider property that only refers to the ‘custom’ attributes … pretty weird…
it probably doesn’t matter too much, but may cause some issue somewhere later – but i guess it’s like a plug that doesn’t have a socket to go into,
so may not matter, but it disturbs my..how to call it.. desire for organisation? anyway, it’s an ‘anomaly’.

maybe it should be removeCustomProperty?

October 21, 2017 at 2:15 pm#73268REPLY | REPORT | QUOTE

dnaldoog

You created a Modulator called uiSliderThumbColour (orange) , but uiSliderThumbColour is a Component (blue).

You would need to make a backup and try something like this: 🙂

n = panel:getNumModulators()
for i=0,n-1 do
mod = panel:getModulatorByIndex(i)
mod:removeProperty("uiSliderThumbColour")
end
October 21, 2017 at 2:28 pm#73269REPLY | REPORT | QUOTE

human fly

hang on.. i’m struggling to understand that..
what do you mean? i *created a modulator*?
the modulator existed beforehand, but without that property.
i wrote and ran that method, and it created an extra ‘property’, as far as i can see, on an existing modulator.

because i did(whatever it was…)
modul = panel:getModulatorWithProperty("modulatorCustomIndex",k)
it seems to have added the ‘new’ property to the ‘custom’-relevant properties.

i’m not going to pretend i understand ‘custom’: it doesn’t behave as expected. i just use this normally to ‘get’ a bunch of items that i want to apply (normally a random) to. and in this case it was so that i could have the thumb colour change on all faders each time i switched presets which i thought could look quite cool.

meeeeh, but i don’t have any problem going back a version, i didn’t do that much in between v24 and v25, lost worse stuff before.

just thought it was an interesting little glitch. hey it looks like one could spend a lifetime finding out stuff like this..

October 22, 2017 at 7:58 am#73270REPLY | REPORT | QUOTE

ker-raazy ! you da man, dnaldoog 😀
congrats, i have fixed it with that. brilliant.

i have replaced the line:

modul:setProperty("uiSliderThumbColour","FFD28008", false)

with

modul:removeProperty("uiSliderThumbColour")

and ran it once, and the additional property is no longer there.
nb: this only relates to the
getModulatorWithProperty("modulatorCustomIndex",k)
thing that i did. not something you want to do in everyday use..

okay, seems to be back to normal now, and will remove both of those bits of code, and try to do it another way.

>see the v.26 panel here, in the method: ‘panelPreset1’: it is all commented out now.(you should be able to reproduce it by using the first part once, then the second part, once, separately)

so: what could you suggest to change ‘thumb colour’ on all 10 faders belonging to that uiTabs? bearing in mind that already have a custom index.

(mm: really do not grasp how the ‘custom’ properties work: had originally assumed that they all related to each other, but that does not seem to be the case, and now i find out that it is not necessarily a viable way to ‘tag’ modulators in order to apply an action to them.. merits a closer look, detailed explanation.)

This reply was modified 2 years, 6 months ago by human fly.
Attachments:
MIDI_txrx-v26_removeXtraProperty.panel
October 22, 2017 at 2:10 pm#73273REPLY | REPORT | QUOTE

dnaldoog

Glad it worked for you!

To change the thumb colour on all sliders, you could put them into an array:

_s={"wave","coarse","fine","cutoff","reso","atk","dec","sus","rel","level"} 
-- some example properties you can change
for _,v in pairs(_s) do -- 'v' is each element in the array _s
panel:getModulatorByName(v):getComponent():setProperty ("uiSliderRotaryTextColour","FF00FFFF",true)
panel:getModulatorByName(v):getComponent():setProperty ("uiSliderRotaryFillColour","FFffFFFF",true)
panel:getModulatorByName(v):getComponent():setProperty ("uiSliderThumbColour","FF00FF00",true)
panel:getModulatorByName(v):getComponent():setProperty ("uiSliderValueBgColour","FF00FFFF",true)
panel:getModulatorByName(v):getComponent():setProperty ("uiSliderValueTextColour","FF000000",true)
panel:getModulatorByName(v):getComponent():setProperty ("uiSliderTrackColour","FF000000",true)

end
then loop through and change any property you like. There is a full list of constructor?? (property) names in :

panel -> modulator list -> View -> Visible Columns
..scroll down and you will see all the uiSlider constructors (I don’t know if that’s the right term) – looking down the list, you can see uiSliderThumbColour (you already know the name)

October 22, 2017 at 3:01 pm#73274REPLY | REPORT | QUOTE

human fly

ok, i will give that a try next.

something else i’m stuck on, is getting my big block of data, the ‘bank’, which is a text string, and splitting that into the 4 smaller ‘preset’ strings – i’ve been trying to put it into a format where i can getRange()
ie: (1,20),(21,40),(41,60),(61,80)

so i get this far:

-- Retrieving ext Bank
extBank = L(panel:getModulatorByName("lcd_bankDataB"):getComponent():getProperty("uiLabelText"))
console("Retreiving external bank : "..extBank)

--make a memory block from the string
memB = MemoryBlock(extBank)

--check size of received dump
local size = memB:getSize()
   console("midiMessageReceived: " .. size .. "bytes")

if size == 80 then 	--bank dump
console("bank dump detected!")
end
but then it doesn’t like this:

--convert bank to table
	tabl_extBank = {}
	for i=1,80 do
	s=extBank:toHexString(1)
  	table.insert(tabl_extBank,s)
	end
and tells me toHexString() is a nil value. i was then thinking
of doing getRange() on the table.

it also doesn’t like:
preset1Data = L(memB:getRange(1, 20))

(i don’t really know what i can do with L() macros)

October 22, 2017 at 6:40 pm#73276REPLY | REPORT | QUOTE

ok, here are your slider thumbs with changing colours. this is fun, and very useful.

little question: you refer to this as an array: it looks much like a table, using {} brackets. is that just a different terminology, or to be considered as something distinct from a table? (tables have an index?)

also, seeing the form you use: _s
why the ‘_’, and how is it that you can use the 2 characters, ‘_’ and ‘s’ separately? does it have to take this form? is it a syntax form, or just something you are in the habit of using?

(or, alternatively, why these characters, and why is ‘s’ used so often? – in the same way ‘i’ is used for iterations, and i’ve also seen ‘k’ used, as in the custom index example previously, which i cribbed from methods i’ve seen.)

Attachments:
MIDI_txrx-v28_thumbColour.panel
October 23, 2017 at 2:05 am#73278REPLY | REPORT | QUOTE

dnaldoog


I don’t know why I used ‘s’ 😕 – using an underscore for arrays is a matter of personal style for me, but I think underscore + capital letter should be avoided in Lua from what I read:

http://www.lua.org/pil/1.3.html You should avoid identifiers starting with an underscore followed by one or more uppercase letters (e.g., _VERSION); they are reserved for special uses in Lua. Usually, I reserve the identifier _ (a single underscore) for a dummy variable.

Maybe I should say table and not array? Maybe table is the more correct term in Lua?

i is commonly used as the index and v as the value in looping though arrays tables. If another counter is needed then j is often used and then k for key in associative arrays or tables, but of course generally variable names should have more descriptive titles.


October 23, 2017 at 3:22 am#73279REPLY | REPORT | QUOTE

dnaldoog

myMethod = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)
	extBank = L(panel:getModulatorByName("lcd_bankDataB"):getComponent():getProperty("uiLabelText"))
	console("Retrieving external bank : "..extBank)

--make a memory block from the string
	memB = MemoryBlock(extBank) -- this variable is used to send midi????

--check size of received dump
	local size = memB:getSize() -- same as size=string.len(extBank)???
    console("midiMessageReceived: " .. size .. "bytes")

		if size == 80 then 	--bank dump
		console("bank dump detected!")
		end
extBank:gsub("(%w+)",function(c) table.insert(tabl_extBank,c) end)
for i,v in ipairs(tabl_extBank) do
console("i="..i.." v="..v)
end
console("size of tabl_extBank="..#tabl_extBank)
end
human fly wrote:
–convert bank to table tabl_extBank = {} for i=1,80 do s=extBank:toHexString(1) table.insert(tabl_extBank,s) end

I think toHexString(1) just dumps a memory block into a string. ‘extBank’ is a string obtained from a uiTextLabel, so it is not a memory block. To convert a string into a table, you would need to split or explode it somehow using a delimiter (like excel does with csv files). The code above gsub(“(%w+)” does a similar thing by ignoring whitespace and just loading the number 0-9 or letter A-F into each element of the table. Not fully tested though 🙂

extBank:gsub("(%w+)",function(c) table.insert(tabl_extBank,c) end)
I found it here.

October 23, 2017 at 8:23 pm#73281REPLY | REPORT | QUOTE

human fly

scary. going to have to get my head round that.

quick recap: i put extBank into memory block memB just so that i could getSize() on it without it returning a nil error.
trying to (ermm) keep it as similar as possible to what happens when it’s a Ctrlr midi message. as in (midiMessage).

i’m thinking that if i can get all the bytes of the big string into a table, then it will be easier to get them by index with getRange() – which has been returning nil errors as well – and then i can do what i want with them (within the limited capabilities
at my current disposal lol). i’m very heath-robinson/string+sellotape.
but this is what happens, isn’t it, when a bulk dump comes in, and the device, or panel, want to send its little presets into their little pigeonhole memory slots, and then everyone’s happy. right?

hello device, send me your stuff. ok, here it is, do your thing. ok, thanks. this goes here, this goes here…etc…and this one goes here, done.

mainly called ‘midiMessageReceived’ in most of these panels i look at. edit: no it, isn’t, i just looked; i can’t remember where i’ve seen the thing i remember.

say, if i had a sysex header in there: ‘f0 41 10 blabla’ and f7 at the end, on the bulkdata – then i’d want to skip the header and ender, but all would have an index position, say, in a table(i like array, that’s cool too – seems people talk about tables here), so i just want to grab index ranges and send the data to the preset slots. i think that would do it.

(believe it or not, i was trying/achieving text based sequencers in synthedit with similar techniques – sirsicksik/siksick was the master of this, but nobody ever understood his prefabs. or his plugins…)

can we skip gsub for the time being? 😀

October 24, 2017 at 3:28 am#73283REPLY | REPORT | QUOTE

dnaldoog

Well I never looked at the reason for this function, just focusing on the errors you were dealing with and offering a way of fixing those (particular issues), but it seems that all you are trying to do is process the data coming in from the synth.

I don’t think you need to do all that memoryblock converting or midi:getLuaData():getRange(), gsub() stuff. Needs to be as simple as possible or else all these compilation errors start seeping in as you are finding out.

If you know a certain midi dump will be say 65 bytes long then:

myMidiReceived = function(--[[ CtrlrMidiMessage --]] midi)
    local s = midi:getSize()
 if s == 65 then
…now work out a way of writing into the values of a midi:getLuaData():getByte() to various modulator/components (uiSliders uiCombos etc); that magic moment when you see all the sliders change values on screen!

You can do this by mapping the position of each byte in midi:getLuaData():getByte() to a table of modulator/Component names.

This would be the foundation/core of your whole program!!! Everything else should be designed around this central function of Ctrlr 🙂

e.g.


t={
"WG_PITCH_COARSE", --  0x00 this would be the name of the Modulator/Component
"WG_PITCH_FINE", -- 0x01
"any_mod_name_I_choose", -- 0x10
-- <em>54 more elements to be listed here</em>
"TV_ENV_SUSTAIN_LEVEL”, -- 0x39 
}
--pseudo code follows untested!!
j=1
for i=5,65-2 do
--  5 could be the offset from the sysex header F0 41 ?? ?? ??
-- -2 = ignore checksum and F7 (in the case of Roland Synths)
m=midi:getLuaData():getByte(i)
panel:getModulatorByName(t[j]):getComponent():setValue(m,false)
j=j+1
end
This is all untested, but hopefully it will help you understand the core idea of getting data out of the D-110 and into ctrlr. 🙂

October 24, 2017 at 7:52 am#73284REPLY | REPORT | QUOTE

human fly

ok, i see how that last section works – this is ok as long as all values incoming are ‘literal’, and i don’t have to deal with any ‘mapped’ offsets ie: pan with midi value 0-14 where it is displayed as -7<0>+7

October 24, 2017 at 9:20 am#73285REPLY | REPORT | QUOTE

dnaldoog

human fly wrote:
ok, i see how that last section works – this is ok as long as all values incoming are ‘literal’, and i don’t have to deal with any ‘mapped’ offsets ie: pan with midi value 0-14 where it is displayed as -7<0>+7

As you know, in such a case -7 to +7 are actually the values 0-14 so as far as midi and the D-110 are concerned. It’s only at the interface level that you would need to display -7 – +7 and in fact 0 to the D-110 would be 7 for the control at that address (you know this, but someone else reading this might not). That’s where you would use uiFixedSlider etc.

I suppose there could be some reason to convert the midi values 0,1 to -7, -6 etc in lua (ie sending text to uiLabel), but for pure sending of midi and receiving I don’t think it is necessary 🙂

human fly wrote:
in practice, i will have to split this read-off of values from
the incoming data whenever i…

Sometimes you may want to load every byte into a table and then run various functions on the address stored in the table rather than run a series of if/else on every midi-data-byte. But either would work.

human fly wrote:
i wanted to play with it without it being a Ctrlr midi
message type – because that seems to require it to be a message
incoming on the midi bus.(if you see what i mean..)

Do you mean doing all this without being connected to the D-110? No doubt that makes it a bit more difficult to test, but maybe you could set up a program like Midi-Ox to transmit sysex messages to your panel? 😕

October 24, 2017 at 6:33 pm#73286REPLY | REPORT | QUOTE

human fly

yup point/s taken – this little demo panel, though, is/was merely a test thing – a ‘paraphrasing’, ..a simili !
hard day’s painting&decorating today, so if i recover from that and get some inspiration, i’ll have a go at getRange().
my 6am sessions are on hold at the moment because i tend to forget i’m supposed to go to work if i start up Ctrlr 😉

October 25, 2017 at 7:35 am#73291REPLY | REPORT | QUOTE

human fly

tried the last code thing, loads of ways 🙂 didn’t compile – but doesn’t matter: there’s a very nice example in this tg33 panel that was posted in september, i should be able to work from that, for the D-110 panel.

just for now, i’m going to focus (for the hell of it…but do i really need to do this? whatever: just want to see how to do it…) on splitting this big 80’byte’ string into 4 separate 20’byte’ strings, and send them to the labels.
(i realise this has little to do with the midi receive routine, but it will make sense of this panel ..aargh, getting lost here, never mind: i’ve found my thing for the D-110, gotta finish that thing.)

October 25, 2017 at 10:13 am#73293REPLY | REPORT | QUOTE

dnaldoog

human fly wrote:
this little demo panel, though,
is/was merely a test thing – a ‘paraphrasing’, ..a simili !

Oh I see, but it’s all very interesting and for me and leads to greater understanding generally. 🙂

October 26, 2017 at 8:44 pm#73297REPLY | REPORT | QUOTE

human fly

okay, playtime again. had fun trying that untested script: it made Ctrlr crash in a loop, as i tried it 🙂 so i had to delete Ctrlr roaming settings..

anyway: so, inspired by the TG33 midiReceived, i had another go at splitting the ‘big’ string with getRange()
-so far, just trying to have a look at what can be sent to console. getting wrong data, evidently. best thing to do is have a look at the getBank method(annotated, with all previous junk in it).
nb: the reason i’m trying to go via memory block is that you can getSize() on it (whereas i couldn’t with other attempts)

it is then able to getRange() – at this point i send each one to console, and get – ? – wrong data type, anyway.

> all i would like to do right now is see the ‘big’ string split into 4 separate strings – i know this isn’t specifically hex at this stage, just text.

i s’pose i’m mixing stuff up here, aren’t i? (i need an empty day to get into this properly)

October 27, 2017 at 8:22 am#73298REPLY | REPORT | QUOTE

dnaldoog

Hi there Human Fly,

I have got that code working from above. See panel. Here I am sending a made-up Sysex string …

F0 41 10 16 12 03 00 00 00 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F 10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D 2E 2F 30 31 32 33 34 35 36 37 38 41 F7

… from MidiOx to trigger the midi received function in the panel using virtual midiports (LoopMidi).

Enjoy!

🙂

Attachments:
test_D110_midi_received_midiOx.panel
October 27, 2017 at 5:35 pm#73308REPLY | REPORT | QUOTE

human fly

hey, ok thanks. will load it up in a minute.

here’s another version of what i was doing, from this morning (see below) – if you look at the getBank method, you’ll see what i’ve been trying: managed to generate two separate strings from the ‘big’ one – read to console only atm. but for some reason, i don’t get all four, and didn’t have time to check the bytes to see if they corresponded – hope it makes sense if you look at it.

need to tidy this up before i try again(loads of commented-out stuff in there, things i tried/failed with)

Attachments:
MIDI_txrx-v32_presetData.panel
October 27, 2017 at 6:52 pm#73310REPLY | REPORT | QUOTE

mmm? i tried your panel – my onboard midi interface is loopbe1, how i link to midiox. didn’t get anything there yet. but i’m going to look at it more closely.

can we look at this splitting of a string into 4 strings thing? i call the string content ‘extBank’, then i make a memory block of that, so i can getSize – the way you can with a midi message – (not essential, but just so i can ‘tick that box’)

if i do memB toHexString, i don’t get hex data, i get something else – so i’ve skipped that.

instead, i’m doing:

prog1Data 	= memB:getRange(1,20)
preset1 = prog1Data:toHexString(1)
	console("preset1 :"..preset1)
and the same, through prog2data, prog3data, prog4data.

what i get back is prog1 has 20 bytes, but starts at byte2 (misses the first one), and then all the rest of the data is in prog2, and prog3 + 4 have nothing.
and i’m not getting any errors.
confoooosed 🙂

thinking: if i can get the ‘data’ with these, it should be possible to send it to the label slots that the presets refer to…. -?- (hey just for kicks)

October 27, 2017 at 7:00 pm#73311REPLY | REPORT | QUOTE

i will say that i’m liking the tg33 panel midi received method.
Peter Scheidt says that calling modulators by VST Index was his best option – i do like the idea of having a common ID system:
it means building the entire thing and numbering it before you can test – which is a bit daunting when you haven’t yet attributed all of your VST Index #s

look at the D-110 .. when you’ve got a synth wave selected, it’s the same MIDI parameter # as the PCM Bank: you end up with 2 objects to select the same parameter, which will necessarily have different VST index numbers, so when you give a quick headcount of your parameters, *it won’t correspond* aargh: i should know by now how many parameters
each partial has, i think it’s 58, not counting the Common params.
um, i’d like to sidestep that for the time being; i’m still pondering
some layout issues on that one.

yesss. grrrrr ! 😀 sussed it. getRange numbers are not start and end, it’s start, the the number of items. so it’s done like this: (note i had to specify start minus 1)
`prog1Data = memB:getRange(1-1,20)
preset1 = prog1Data:toHexString(1)
console(“preset1 :”..preset1)

prog2Data = memB:getRange(21-1,20)
preset2 = prog2Data:toHexString(1)
console(“preset2 :”..preset2)

prog3Data = memB:getRange(41-1,20)
preset3 = prog3Data:toHexString(1)
console(“preset3 :”..preset3)

prog4Data = memB:getRange(61-1,20)
preset4 = prog4Data:toHexString(1)
console(“preset4 :”..preset4)`

and that produces (in console):

LUA>> midiMessageReceived: 80bytes
LUA>> bank dump detected!
LUA>> preset1 :6f 6e 65 20 20 20 20 20 20 20 2a 33 59 64 34 00 78 7f 62 4e
LUA>> preset2 :74 77 6f 20 20 20 20 20 20 20 74 3b 64 59 08 51 7f 7c 3c 2b
LUA>> preset3 :74 68 72 65 65 20 20 20 20 20 55 12 7f 3b 0f 11 2b 60 58 19
LUA>> preset4 :66 6f 75 72 20 20 20 20 20 20 55 5d 3b 2e 69 51 7f 7c 3c 2b

he he.

(‘code’ buttons not working tonight)

October 28, 2017 at 7:57 am#73313REPLY | REPORT | QUOTE

more: have tidied up script into a re-usable:

function restoreBank()

	-- This variable stops index issues during panel bootup
	if panel:getRestoreState() == true or panel:getProgramState() == true then
		return
	end

-- retrieving BankA
	bankA = L(panel:getModulatorByName("lcd_bankDataA"):getComponent():getProperty("uiLabelText"))

	local memB = MemoryBlock(bankA)

	local size = memB:getSize()

	if size == 80 then

	local prog1Data 	= memB:getRange(0,20)
	local preset1 = prog1Data:toHexString(1)

	local prog2Data 	= memB:getRange(20,20)
	local preset2 = prog2Data:toHexString(1)

	local prog3Data 	= memB:getRange(40,20)
	local preset3 = prog3Data:toHexString(1)

	local prog4Data 	= memB:getRange(60,20)
	local preset4 = prog4Data:toHexString(1)

	panel:getComponent("lcd_presetData1"):setPropertyString("uiLabelText",""..preset1)
	panel:getComponent("lcd_presetData2"):setPropertyString("uiLabelText",""..preset2)
	panel:getComponent("lcd_presetData3"):setPropertyString("uiLabelText",""..preset3)
	panel:getComponent("lcd_presetData4"):setPropertyString("uiLabelText",""..preset4)
	end
end
here’s another version of the panel – it can write to the external, receive it, and restore previous now. still a bit fiddly to observe this but does work.
probably on the wrong track re: midi and preset routines but does what i setout to do (so far). ‘send prog’ is now an idea for copying presets/data?

Attachments:
MIDI_txrx-v36_restoreBank.panel

edit: woops, messed that up somehow (at least here),
i think that file has wrong methods triggered by wrong
buttons – try this one instead:
(mods if you can delete the previous file; i can’t remove it)

>quickest test is to toggle ‘recv’ and ‘restore’ pressing the same ‘preset’ buttons each time: you see the data changing in the preset windows that contain the settings of the faders.

Attachments:
MIDI_txrx-v36_restoreBank-1.panel
October 29, 2017 at 9:11 am#73326REPLY | REPORT | QUOTE

when collecting values with a table, i noticed a difference in output when i do memB(getByte,n) and tableX[n]: getByte produced the wrong values, whereas table is correct. so what format will getByte produce? hex?
table[n] seems to give me the literal values.

um, i suppose when i do concatenatation and then a memory block, i’m producing a string?

October 29, 2017 at 9:37 am#73327REPLY | REPORT | QUOTE

ok, never mind, figured out what it was: needed to getByte from the labels. now transfers all four presets:
(see panel/send single method>orange ‘send’ button)

(lol, not convinced any of this is necessary but whatever… it’s practice)

Attachments:
MIDI_txrx-v40_transferViaGetByte.panel
October 29, 2017 at 10:31 am#73329REPLY | REPORT | QUOTE

good job i uploaded because i scr***d up just after that, and it wouldn’t load at all 🙂 (turns out i forgot to rename function titles after copying – was able to fix it in notepad > method name vs -duplicate- function title conflict?)
– last version wasn’t copying names, does now.

there is now a virtual ‘external device’ receiving data.
need to sort this out properly now.

Attachments:
MIDI_txrx-v43_tempSend.panel
October 29, 2017 at 11:39 am#73331REPLY | REPORT | QUOTE

dnaldoog

Hey Human Fly,

I finally worked out how to split a 240 byte string (e.g. direct from uiTextLabel) into 4 segments.


mySplitString = function(mod,value,source)
    a=panel:getModulatorByName("stringtosplit"):getComponent():getProperty("uiLabelText")
    local st = mySplitStringIntoFourSegments(a,60)
    for i,v in ipairs(st) do
        console(String(i.."[".. v.."]"))
        panel:getComponent("string0"..i):setPropertyString("uiLabelText",v)
    end
end --function
------------------------------------
function myTrim(s) -- trim leading/trailing whitespace
    return (s:gsub("^%s*(.-)%s*$", "%1"))
end --function
-----------------------------------
function mySplitStringIntoFourSegments(text, stringSize)
    local j=1 -- counts to 4
    local s = {}
    for i=1,#text,stringSize do
        s[j] = myTrim(string.sub(text,i,stringSize*j))
        j=j+1
    end
    return s
end --function
-----------------------------------
🙂

October 29, 2017 at 12:44 pm#73334REPLY | REPORT | QUOTE

human fly

yeah, connected loopbe1 as output device.
i don’t see the ‘click me once’ button moving, and nothing lands in midiox. the method associated with that is ‘namethemall’. what is supposed to happen? 🙂

your code kicks up a lot of questions:
1/(recurrent) i’m perplexed by the way code that is needed early on is defined later in the script ie: where mySplitStringIntoFourSegments() appears, when it is referred to at the start. how does that work?

2/meaning of all the symbols in return (s:gsub("^%s*(.-)%s*$", "%1"))
(how thff does that work?!!)

3/format of this? console(String(i.."[".. v.."]"))

it’s quite heavy for me to follow ! this is quite sophisticated stuff for a novice.

October 29, 2017 at 3:04 pm#73335REPLY | REPORT | QUOTE

dnaldoog

I should have explained that panel more clearly. The green button just a trigger for a script that fills all modulators named modulator-1 … modulator56 with names from a table of D110 parameters or controls. I didn’t have to type each name into Ctrlr, so I thought that might be of interest to you. Once initialized it is no longer needed. What you do is send a sysex message (see attached syx file) from MidiOx to the panel through LoopBe1 (input device in Ctrlr) and it will load each sysex value into each modulator. You don’t do anything with the panel, it is just receiving data.

s:gsub("^%s*(.-)%s*$", "%1") is a regex expression that looks for space at the beginning or end of a string and removes it (in this case). I don’t think I could come up with that expression.

console(String(i.."[".. v.."]")) this is just printing the index number “i” of the table and its value “v” to the console. There are four strings printed that were split from the 80 character (240 byte string). The 240 byte string ends with a space, hence the function that strips that space at the end.

Each process or function that works on the string is broken down into separate functions or methods as they may be called, which makes for easier readability (perhaps?) and easier management of code (perhaps?).

Attachments:

SENDSYSEX.jpg

splitastring.panel
my_fake_dump.syx
October 29, 2017 at 3:34 pm#73339REPLY | REPORT | QUOTE

proton

Hi dnaldoog,

I did tested your code and what I’ve found out is that the Sysex that comes from OX indeed changes the numbers on all the modulators BUT the actual value of the modulator is not affected at all. Can you please explain why this might be happening? I was under the impression that Sysex will cause the value to change and not only the values display. I hope this make sense to you. For testing purposes send Sysex to a modulator that had a value of 0 for example and after you see the new value displayed go to edit mode and see that the value is still 0 and there was no change in value caused by the incoming Sysex data. Weird right?
Cheers!

October 29, 2017 at 4:03 pm#73340REPLY | REPORT | QUOTE

human fly

okay, i’m going to have to digest this more slowly.
thanks for panel/jpg/syx. off to try that again now.

worth noting:
first time i’ve ever heard of regex ! 🙂
(but somewhat reassured that you cribbed it)
i’ve bookmarked that page to have a look later.
ok, so i get what that does – i think i saw another way of doing that elsewhere (lost in the fog back there..),
maybe with more conventional Lua – or it could have been a gsub thing; possibly Possemo..

question: 80 characters is 240 bytes? can you clarify the obviousness i’m oblivious to? 🙂 i’m obviously considering bytes in the wrong way.

and [".. v.."] this is the bit that looks weird to me.
-bearing in mind i’m only just barely getting to grips
with basic iteration stuff (only done my own one ONCE !)

October 29, 2017 at 4:29 pm#73341REPLY | REPORT | QUOTE

alright, yes, your ‘kit’ was good; got it to work.
see below.
went looking for the value as described by Proton, but?? can’t find a current value entry in my properties column. can’t remember if it’s supposed to have one..
but i think i’ve seen one…scrolling up and down, not finding it.

..nope. not there. must’ve imagined it.

hey: ‘*reverseNameThemAll*’? what’s that for?

i can see how this can be useful – in some form – for making one’s lists quickly, with a bit of practice.
did kinda wonder about it while arduously bashing out lists of names, and matching sysex messages – how do the pros do this – certainly, if there’s another 7 parts to do on the D-110. lot of legwork there.

Attachments:

fakeDumpDone.png

October 29, 2017 at 4:59 pm#73343REPLY | REPORT | QUOTE

human fly


and… yes i see now: you’ve broken down the midi receive into 2 operations: myMidiReceived() and received()
– you didn’t say ‘check the console’ ! 😉

and offset=10 … is that a 10 byte dummy header you’ve got?
params start at 01? (possibly 00 on real D-110 .. yes, 00h for name1) and t# is table ‘t’ item number, got that.. why is offset-1?

(appreciate that you’re imparting quite a bit of technique here)
with j=1, you’re using that to?define a start point? oh yeah,
and to be able to increment with that: j=j+1
phew. and does it matter what order you put all of these expressions in there?(my earlier observation that some things that seemed to need to be ‘known’ earlier in a method, often come later)

can i just point out that line 13 in table of modulators is misnamed “P-ENV TIME I” (not “1”). doubt it is of any importance.
(oh same again at 43+44)

October 29, 2017 at 5:48 pm#73344REPLY | REPORT | QUOTE

hey i’m not imagining things: i have opened your panel, and there is no ‘current value’ entry. i have to leave panel edit, twiddle the control, and the edit again, and the current value is there. very weird.

have 2 other panels open at the same time, and they do not have ‘current value’ either…time to close them all and see what this is about… !

October 30, 2017 at 12:01 am#73345REPLY | REPORT | QUOTE

Dnaldoog

Hi Proton,

The reason why the values are all zero is that in the received() function I had written:
panel:getModulatorByName(t[j]):getComponent():setValue(m,false)
Changing it to
panel:getModulatorByName(t[j]):getComponent():setValue(m,true)
fixes that!

Regards,

Attachments:
Receive-from-MidiOx_2_0_Version-2_2017-10-30_07-53.panel
October 30, 2017 at 12:35 am#73347REPLY | REPORT | QUOTE

Hi Human Fly,

I just put that panel together quickly and maybe there’s a much better way of doing it, but *reverse_nameThemAll* if renamed to *nameThemAll* and *nameThemAll* given a temporary name (say *nameThemAll2*) will return the names back to the original modulator-1,.. modulator-56. If you change a name in the table/array like those typos you spotted, you then run the original *nameThemAll* function again. Bit clumsy I realise, but just cobbled together quickly.

human fly wrote:
my earlier observation that some things
that seemed to need to be ‘known’ earlier in a method, often
come later

When you define a function it can reside anywhere in your program (often in another file) and the great thing is you can use that function again anywhere in your program rather than have some code in-line when you need it in one function and repeat that same code in another function, which could lead to more confusion and errors. In other words, if you are going to use that gsub code more than once, then bundle it into a function that you can call anywhere.

human fly wrote:
is that a 10 byte dummy header you’ve got?

That sysex is completely made up from what I thought the D110 should look like, but not fully checked. Have you looked at my JD-990 panel which might function similarly to the D110?

for i=offset,#t+(offset-1)
‘offset=10’ is minus the headers and address locations, but F0 is ignored. You would have to check the real offset in the D110, so from that point (‘offset=10’, which is really 11!!! (remembering we ignore the first byte F0)) we load data into the modulators on Ctrlr.

#t means the size of table #t=56 – keep looping until you reach #t (56)+(offset-1) (or + 9) so loop through 56 times from position 10 to 65.

The (offset-1) is unnecessary – it’s just to show you what’s happening. The last two numbers are ‘checksum’ and ‘F7 end sysex’ and so are ignored. Confusing! 🙁


offset=10
j=1
for i=10,65 do
m=midi:getLuaData():getByte(i)
panel:getModulatorByName(t[j]):getComponent():setValue(m,true)
j=j+1
end
because ‘i’ starts at 10, we can’t use it to reference t[1] through to t[56] so I use another counter ‘j’ instead. You can do this too:


for i=10,65 do
m=midi:getLuaData():getByte(i)
panel:getModulatorByName(t[i-9]):getComponent():setValue(m,true)
end
October 30, 2017 at 1:12 am#73348REPLY | REPORT | QUOTE
dnaldoog
dnaldoog
Participant
Topics: 3
Replies: 301
Total: 304
★★
Send a Message

human fly wrote:
80 characters is 240 bytes? can you clarify
the obviousness i’m oblivious to? 🙂 i’m obviously
considering bytes in the wrong way.

I haven’t gone right into it, but I think lua treats strings as a series of bytes, so the length of a string of 80 sysex values is F+0+” ” (space) that’s 3 bytes: ,multiply 3 by 80 and you get 240, except I was slightly wrong there – there is no trailing space, so the correct length is 239. My panel still divides 239 into 4 strings of 20 sysex values, but there could be a potential bug in there somewhere. I’ve changed the code slightly, from
local st = mySplitStringIntoFourSegments(a,60)
to
local st = mySplitStringIntoFourSegments(a,#a/4)
but it would need to be tested.

human fly wrote:
and [“.. v..”] this is the bit that looks weird to me

with console() or console(String()) you can mix strings with data:
console(String(">>"..i.." = my test value= "..(v*3).."\n_____\\n prints a new line!_____"))
Regards,

Attachments:
splitastring_1_0_2_2017-10-30_08-56.panel
October 30, 2017 at 6:46 am#73350REPLY | REPORT | QUOTE

human fly

ok, thanks. i’ll have a messaround with those.
(and i don’t think i’ve seen your JD990 panel yet)

i think the other weirdness i’m getting here, ie: the current value entry not appearing initially must be related to situations where initial values
are no longer preset on startup – which could be due to high VST Index numbers – i’m up in the 5000’s here at the moment, and none of the panels i had open had the current value entry until the modulator had its value changed – at which point the current value entry appears.

this is a general flaw with this version of Ctrlr (5.4.2x):
any loaded panels seem to share a common VST Index# list, so that if panel A goes up to, say, 20, and you start another panel, your first modulator there will start at 21, so it just keeps going up.

and if 2 panels have modulators with sysex messages at the same VST Index#, and you trigger one, the sysex from both will be sent out to midiox/etc.

it would be good if Ctrlr, as the ‘host’, could treat panels completely separately – would certainly make the workflow easier. maybe something for Atom to consider, if it is possible. (anyway, so i wasn’t able to observe that issue of values not corresponding)
