samoth Aug 2020

1. Click on the canvas of your panel and add a component, an uiToggleButton to your canvas.
2. From dropdown menu go to: Panel -> Panel mode. Now you are in edit mode.
3. Click on your uiToggleButton to edit this button. Go to the item “called when the modulator value changes. When in the dropdown menu the item “propertyIDs/Names” is checked, you will not see “called when the modulator value changes”, but instead the technical property description “luaModulatorValueChange”.
On the left in this field you can see three icons. When the mouse is moving over them you can see that there is one to edit the selected method, one to remove the selected method and one to add a new method.
4. Click on this last one and fill in your chosen name for this new method. By instance: myDumpFromSynth.
On the far right of this field there are arrows to open the available methods. Choose myDumpFromSynth.
5. Now click on the “edit selected method” icon and the lua editor is opening showing you the bare bones of the selected method myDumpFromSynth.
BETWEEN the lines, the first beginning with “myDumpFromSynth = function” and the last one with only “end” you have to complete your method.
It should be something like this (this example is for a Roland synth):

myDumpFromSynth = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)
    mD = {}
    mD = CtrlrMidiMessage({0xF0, 0x41, 0x0F, 0x2B, 0x11, 0x00, 0x06, 0x00, 0x00, 0x01, 0x20, 0x59, 0xF7}) -- REQUEST PATCH MESSAGE
    panel:sendMidiMessageNow(mD) -- SENDS THE DUMP REQUEST MESSAGE
end

After completing this step you open the lua editor drop down menu and click on “File –> save and compile all”.
Close the lua editor.

6. Leave the edit mode in Ctrlr by clicking again on Panel -> Panel mode.
Go to the dropdown menu item “Tools” and click on “MIDI Monitor”. This will open this monitor. Go to the dropdown menu of this monitor and check in the menu item “View” three sub items: “monitor input”, “monitor output” and “show RAW data size”.
When clicking on your uiToggleButton you should see the incoming midi you requested. Otherwise there is something wrong with you sysex request in the myDumpFromSunth method.

7. Go in edit mode and click on the withe canvas (not on a component). In the edit panel is an item “Called when a panel receives a midi message”. When in the dropdown menu the item “propertyIDs/Names” is checked, you will not see “Called when a panel receives a midi message”, but instead the technical property description “luaPanelMidiReceived”.
Here, you open a new method with the name “midiMessageReceived” according to the procedure described above.
So here you have to catch the midi flow your synth has sent. Between all the midi flows you can identify the right flow when you know its data size (you can read this size in the midi monitor as described above) or using some of its address bytes.
This method should be something like this:

--
-- Called when a panel receives a midi message (does not need to match any modulator mask)
-- @midi   CtrlrMidiMessage object



--

midiMessageReceived = function(midi)

	local s = midi:getSize()
	local Id1 = midi:getLuaData():getByte(5)
	local Id2 = midi:getLuaData():getByte(6)

	if s == 138 then --s = size
 	   	if Id1 == 0x00 then -- first address byte
    		if Id2 == 0x06 then -- second address byte
		mData1 = midi:getData()
		console (string.format ("size(dec.)=%d Id1(hex)=%x Id2(hex)=%x", s, Id1, Id2))
		mData2 = midi:getData():getRange(0, 135)
		console(midi:getData():toString())
			end --if Id2
		end -- if Id1
	end --if s
end -- function

8. Some notes about the console:

8.1. From dropdown menu go to: Panel -> LUA console
8.2 Click on the bottom part of the Console
8.3 type console(“Hello world”)
8.4 The text “Hello world” should appear on the upper part of the Console.
8.5 If this works, you can try using console(“Any text”) in LUA code you use for your Panels.


dnaldoog


See here for a way of doing this .

I would find out from the manual which control each byte is to be assigned to in the dump message and make a table of your Ctrlr modulators uiSliders variable names etc in that exact order:


 myList={
"VibratoRate",
"VibratoDepth",
"Vibreto Delay", ...
}

You would then in the Ctrlr program create a function that reacts to incoming MIDI LuaPanelMidiReceived eg myMidiReceived()

When you perform a patch dump from the machine it will be a certain size. You monitor for incoming messages of that size and then run code on it triggering the function only when the packet size is the appropriate one; I would pass the MIDI memory block as a parameter to that function updateInterface() and optionally the size of the message to avoid recalculating it.


myMidiReceived = function(--[[ CtrlrMidiMessage --]] midi)

local s = midi:getSize()
---------------------------------------------------------
if s ==  129 then -- update controls 129 = size of dump

    updateInterface(midi,s)
end

end

in the updateInterface() function you would loop through the table assigning MIDI message bytes values to each control.

Usually there will be an offset of about 9 bytes before you get to the data.

The wave forms, of which there are 255, might be represented by two of the bytes in the message MSB and LSB, so you’d have to parse that and then maybe update a uiLabel with the name referenced from a table of waveform names.

Loop though each byte with the table.

For example


local offset =9
for i,v in ipairs (myList) do
panel:getModulatorByname(v):setValue(midi:getData():getByte(i+offset,true)
end

i+offset might be 10, so you’ll have to play around with that to get the correct byte position.

Something like that and it’s just off the top of my head.

There are many clues for this in my Roland JD-990 panel which incorporates the SR-JV80-04 card, but wading through someone else’s code is almost more difficult than writing it yourself!



You can also convert midi:getData() to a lua table using:


t={}
midi:getData():toLuaTable(t)

You could then modify the contents of the table and repack as a MemoryBlock and resend to the Synth:


m=MemoryBlock()
m:createFromTable(t)
panel:sendMidiMessageNow(CtrlrMidiMessage(m:toHexString(1)))

The other option would be to work solely with MemoryBlocks:



Jsh

—
— Called when a panel receives a midi message (does not need to match any modulator mask)
— @midi CtrlrMidiMessage object
—

CheckIncomingMidi = function(–[[ CtrlrMidiMessage –]] midi)

local msgSize = midi:getSize()

if msgSize == 1179 then

progDumpTable = {}
midi:getData():toLuaTable(progDumpTable)
progDumpTable[28] = 0x7f

progDumpMsg = CtrlrMidiMessage(progDumpTable)
panel:sendMidiMessageNow(progDumpMsg)
end
end


dnaldoog

myMethod = function(--[[ CtrlrMidiMessage --]] midi)
	local msgSize = midi:getSize()
	if msgSize == 1179 then -- If message is program dump
		local portaValRaw = panel:getModulatorByName("Portamento"):getModulatorValue()
		progDump = {}
		midi:getData():toLuaTable(progDump)
		progDump[28] = portaValRaw
		progDumpMsg = CtrlrMidiMessage(progDump)
		panel:sendMidiMessageNow(progDumpMsg)
	end
end



