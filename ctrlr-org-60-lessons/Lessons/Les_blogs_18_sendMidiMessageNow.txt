panel:sendMidiMessageNow


May 20, 2020 at 10:09 pm#118532REPLY | REPORT | QUOTE

spiffo


panel:sendMidiMessageNow(CtrlrMidiMessage(“F0 43 11 13 76 7F F7”))

The above in a LUA Script will work fine but:

1: I have hard coded Midi Channel 1 into the Message (3rd Hex in). In the SysEx of the Panel Modulator I would put 1y instead of 11 but that doesn’t seem to work if it’s in a LUA Script?

2: If one of those Hex Codes needs to be a Variable what is the correct way of phrasing that, is it just:
“F0 43 11 13 Variable 7F F7” because although that doesn’t throw up any errors my DX11 seems to ignore it?

To anyone who replies, thanks for you time and help!

This topic was modified 5 days, 15 hours ago by spiffo.

proton


Hi spiffo!

1. What value “1y” suppose to represent? It is not a valid hex number.
2.
declare your variable ex. “yourVariable”:
yourVariable = …(some value coming from somewhere, could be as Hex could be Integer)
in your Lua code you need to concatenate that variable with the rest of the SysEx:
“F0 43 11 13 “..yourVariable..” 7F F7”

dnaldoog


By amazing coincidence, last night I was looking at the TX81Z panel Atom made and I was wondering what the ‘1y’ meant??

So Proton is right, but to get that channel information into lua you need a couple of extra steps:


myMethod=function(mod,value)
local myChannel=panel:getProperty("panelMidiOutputChannelDevice")-1
local mySysex=string.format("F0 43 %2X 13 %.2X 7F F7",16+myChannel,value)
panel:sendMidiMessageNow(CtrlrMidiMessage(mySysex))
end -- function

May 21, 2020 at 8:31 am#118540REPLY | REPORT | QUOTE

spiffo

Thanks guys, so some further questions then:

First Panel Properties:
In the Panel Modulator Properties when you specify a SysEx Formula you put xx for the Data from the Modulator to be inserted, correct? And I assumed that the 1y was for the Panel’s MIDI Channel to be inserted, is that correct or incorrect, I think it’s correct as I just tested it and it seems to work.

Second LUA Scripts:
In Proton’s , you are using the .. to append the variable into the string, do you need the .. after the variable as well? You don’t normally do that if appending a Variable?

dnaldoog’s script: So your function passes in 2 parameters mod (for the Panel’s Midi Channel) and value (for my variable I want to insert in the SysEx string). You then specify a variable called myChannel which is the Panel’s MIDI Channel and you make it negative? You then build a string with 2 Hex Codes missing which you specify at the end of the string as 16+myChannel which is 16 minus the actual MIDI Channel? And value which is a variable I want to insert? Also why is it %2X and %.2X shouldn’t they both be %.2X ?

Sorry to be a bit verbose, but more poor brain is trying to understand what’s going on 🙂

Learning as I go, spiffo.

T


dnaldoog

If I re-edit a third time the post will be ghosted, so there is a correction needed :


local value=10
string.format("%02x = %02X = %2x",value,value,value) -- would print 0a = 0A = A

----
spiffo wrote:
First Panel Properties:
In the Panel Modulator Properties when you specify a SysEx Formula you put xx for the Data from the Modulator to be inserted, correct? And I assumed that the 1y was for the Panel’s MIDI Channel to be inserted, is that correct or incorrect, I think it’s correct as I just tested it and it seems to work.

Yes, those are special sysex identifying tokens. 1y must be for some Yamaha sysex channel implementations perhaps?

The most useful one is xx – this is the modulator value.
But, these ‘codes’ won’t work in lua.

---
spiffo wrote:
You then specify a variable called myChannel which is the Panel’s MIDI Channel and you make it negative? You then build a string with 2 Hex Codes missing which you specify at the end of the string as 16+myChannel which is 16 minus the actual MIDI Channel

Just to answer the question better:

‘myChannel ‘ is the channel number as returned from the panel property panelMidiOutputChannelDevice

This returns a channel number from 1-16, but MIDI needs 0-15, so take the Ctrlr channel number 1-16 i.e. panelMidiOutputChannelDevice-1 which will be a number from 0-15 then add it to 16
channel 1 = 0x00+0x10=0x10 so you’ll see 10 as your channel number in the sysex output.
If you change your channel number out to channel 10 on Ctrlr, that’s:

panelMidiOutputChannelDevice=10
panelMidiOutputChannelDevice -1 = 0x09 (MIDI channel 10)

add Yamaha’s 0x10 or 16 to get your correct sysex value.

… you will see 19h in the sysex message as your channel. That’s 19 hex, not decimal.

I’m not sure why Yamaha adds 16 to the channel number in the first place though. ❓


spiffo


Again thanks for your prompt help!

So in summary:

..value.. so you can append on the front and the back, Got it 🙂

% means there’s something to put in here and you’ll find it after the comma
2 means it’s 2 digits long?
x means it should be inserted as Hex?

Got it, I think!

This is working fine, it cycles around simulating the pushing of all 32 Internal Patch Memory Buttons, so I can capture all the Patch Names of the 32 Internal Memories and store them in a Table I think, but haven’t got that far yet:

MidiChannel=panel:getProperty(“panelMidiOutputChannelDevice”)-1

for i = 1,32 do

presetnumber = 75 + i

— Send a simulated ‘Play-Single’ Button Press On/Off

local Play_Single_On = string.format(“F0 43 %2x 13 76 7F F7”, 16+MidiChannel)
local Play_Single_Off = string.format(“F0 43 %2x 13 76 00 F7”, 16+MidiChannel)

panel:sendMidiMessageNow(CtrlrMidiMessage(Play_Single_On))
panel:sendMidiMessageNow(CtrlrMidiMessage(Play_Single_Off))

os.execute(sleep(25))

— Send a simulated ‘Internal’ Button Press On/Off

local Internal_On = string.format(“F0 43 %2x 13 70 7F F7”, 16+MidiChannel)
local Internal_Off = string.format(“F0 43 %2x 13 70 00 F7”, 16+MidiChannel)

panel:sendMidiMessageNow(CtrlrMidiMessage(Internal_On))
panel:sendMidiMessageNow(CtrlrMidiMessage(Internal_Off))

os.execute(sleep(25))

— Send a simulated ‘1-32’ Button Press On/Off

local PresetSysExOn = string.format(“F0 43 %2x 13 %2x 7F F7”,16+MidiChannel, presetnumber)
local PresetSysExOff = string.format(“F0 43 %2x 13 %2x 00 F7”,16+MidiChannel, presetnumber)

panel:sendMidiMessageNow(CtrlrMidiMessage(PresetSysExOn))
panel:sendMidiMessageNow(CtrlrMidiMessage(PresetSysExOff))

os.execute(sleep(25))

console (“Loop no.”..i)
console (“presetnumber is: “..presetnumber)

end

Thoughts:

%2x or %.2x seems to work fine!

local mySysex=”F0 43 “..16+MidiChannel..” 13 “..value..” 7F F7″) this does NOT work, definitely seems to need Hex Formatting, so I used the %2x approach!

May 21, 2020 at 12:23 pm#118558REPLY | REPORT | QUOTE

dnaldoog

spiffo wrote:
local mySysex=”F0 43 “..16+MidiChannel..” 13 “..value..” 7F F7″) this does NOT work, definitely seems to need Hex Formatting, so I used the %2x approach!

That’s right! I realise on second thought that it needs to be hex in that case.

To use the decimal values directly, you would need to put them into a lua table:


mySysex={0xf0,0x43,myChannel+16,0x13,value,0x7f,0xf7}
panel:sendMidiMessageNow(CtrlrMidiMessage(mySysex))
I’ll re-edit that previous post in case someone reads that without reading on!

Aggh! It’s been ghosted! Too many edits. Anyway in summary:

So, in summary you can do:

local mySysex=string.format(“F0 43 %.2X 13 %.2X 7F F7”,16+myChannel,value)

or


mySysex={0xf0,0x43,myChannel+16,0x13,value,0x7f,0xf7}
panel:sendMidiMessageNow(CtrlrMidiMessage(mySysex))
but not:

local mySysex=”F0 43 “..16+myChannel..” 13 “..value..” 7F F7″)


dnaldoog

Original Post re-posted

Hi Spiffo,

Proton’s way is lua concatenate syntax where .. joins a string and another string, or string and integer into a final string.

e.g.

lua ..

value=10 -- an integer
console(String("my value="..value))
or
console(String("myValue="..value.." to send))
or 
console(String("myValue="..10.."  to send))
or
console(String("myValue=\n"..value.."  to send) )-- prints a new line after myValue
But to print a hex string representation of a number, use string.format function as in C language printf.
lua string.format

value=10 -- an integer
console(String(string.format("my value=%d",value)))
or
console(String(string.format("myValue=%d  to send",value)))
or
console(String("myValue=\n%d  to send",value))) -- prints a new line after myValue
It’s a little counter-intuitive, but the arguments to be parsed follow the string in comma delimited lists:

console(String(string.format("value=%d, %d * %d and in hex is %.2X",value,value*value,value)))

%.2x or %02x prints a leading 0, but %2x doesn’t. Note that ‘x’ is lower case Hex and ‘X’ is upper case:

string.format("%02x = %02X" = %2x,value,value) would print 0a = 0A = A

panel:getProperty(“panelMidiOutputChannelDevice”) returns the channel number, for example channel 1 is returned as 1, but in MIDI channel 1 is 0 (channel 16 is 0x0f (15) so you have to subtract 1.

On retesting it looks like either %2x or %.2x work. 👀

So, in summary you could either just do:

local mySysex=string.format("F0 43 %.2X 13 %.2X 7F F7",16+myChannel,value)
or


mySysex={0xf0,0x43,myChannel+16,0x13,value,0x7f,0xf7}
panel:sendMidiMessageNow(CtrlrMidiMessage(mySysex))
but not

local mySysex=”F0 43 “..16+myChannel..” 13 “..value..” 7F F7″)


spiffo

Just to answer the question better:

‘myChannel ‘ is the channel number as returned from the panel property panelMidiOutputChannelDevice

This returns a channel number from 1-16, but MIDI needs 0-15, so take the Ctrlr channel number 1-16 i.e. panelMidiOutputChannelDevice-1 which will be a number from 0-15 then add it to 16
channel 1 = 0x00+0x10=0x10 so you’ll see 10 as your channel number in the sysex output.
If you change your channel number out to channel 10 on Ctrlr, that’s:

panelMidiOutputChannelDevice=10
panelMidiOutputChannelDevice -1 = 0x09 (MIDI channel 10)

add Yamaha’s 0x10 or 16 to get your correct sysex value.

… you will see 19h in the sysex message as your channel. That’s 19 hex, not decimal.

I’m not sure why Yamaha adds 16 to the channel number in the first place though.

I didn’t understand this at first but after a cup of tea I think it’s sunk in:

Yes for some reason the Yamaha HEX Code for MIDI Channel 1 is inserted as 11 or 0001 0001 in Binary, and the plus 16 you are referring is that first 1 in the Hex or 16 if you counting in Decimal from the rhs.

Actually thinking about it, why do we need the -1?
If the Panel MIDI Channel is 1 and we take 1 off we get Zero so the HEX would be 10 and I’m pretty sure you send 11 for MIDI Channel 1, in fact I just tested it and it works whether you take the 1 off or you don’t, now I’ve confused myself again 🙁


dnaldoog


spiffo wrote:
Yes for some reason the Yamaha HEX Code for MIDI Channel 1 is inserted as 11 or 0001 0001 in Binary, and the plus 16 you are referring is that first 1 in the Hex or 16 if you counting in Decimal from the rhs.

A cup of tea will do it, but I don’t understand what is producing 11 for channel 1. It should be 10, right?

if you choose 1y in the Ctrlr sysex, channel 1 should output 10 at least it does on Atom’s TX81Z panel.

11 would mean you are on channel 2.

May 21, 2020 at 2:19 pm#118567REPLY | REPORT | QUOTE

BillFM


Hi.
FYI…
DX11 sysex uses 0-f in the channel nibble of sysex to represent MIDI Channel 1-16. The upper nibble of this sysex byte is used to identify different function formatting.

The DX11 service manual illustrates this:
https://www.manualslib.com/manual/966757/Yamaha-Dx11.html?page=31#manual
(you can also download entire manual from the link)

Have a look at the DX81Z panel as it’s compatible to DX11.



dnaldoog

spiffo wrote:
I’m pretty sure you send 11 for MIDI Channel 1, in fact I just tested it and it works whether you take the 1 off or you don’t, now I’ve confused myself again

Hi Spiffo,

So according to BillFM, the upper nibble can be 0,1 or 2 according to functionality, so that means the low nibble must start at 0 and end at F surely? So channel 1 must be 0 ie 00 10 or 20 according to the DX11 manual at least.


spiffo

Yep, just Tested it in Midi-Ox, Parameter Changes must be sent with the MIDI Ch Hex set to 10, assuming Rx Ch on DX11 set to Midi Ch 1

On a side issue I’ve just spent the last hour trying to figure out why my MidiMesseageRx Script was always being triggered twice. After banging my head against the wall for a bit I decided to swap the iRig Midi 2 Interface out for my Roland Quad Capture one and low and behold it doesn’t get triggered twice anymore just the once like it should do.

So for whatever reason this iRig Midi 2 Interface seems to be permanently echoing it’s Ins to Outs and vice versa, so that’s nice 🙁

Cheers for all your help, I’m going to have to give up for today, just had a shout from work, need to go out!


dnaldoog


I had a look at your panel and well done; I plan to test it with my TX81Z but there are a couple of things slowing it down:

Number 1 is a call to console() is really really slow and should only be used in development. They should be commented out.

Number 2 – in an init function which loads at boot time lua panel loaded – I recommend you initialise all your Modulators with lua variable names. Goodweather talks about this a lot. So on load you run the following code (maybe wrapped in a function)

OP4_Ratio_List=panel:getModulatorByName(“OP4_Ratio_List”)

Hereafter you can refer to that modulator by the variable name, not panel:getModulatorByName(“OP4_Ratio_List”) because that is very slow. For each call to that Ctrlr loops through all Modulators looking for that object.

Here is a development function to help you generate the list:

Copy and paste the console output into the init function.


function cacheModNames()
  n = panel:getNumModulators()
  --Assign each modulator to a variable with same name
  --so we can just call myModulatorsName:getValue() etc
  console("\n\n")
  local _t={}
  for i=0,n-1 do
    mod = panel:getModulatorByIndex(i)
    local Name= L(mod:getName())
    table.insert(_t,Name)
  end
  table.sort(_t)
  for i,v in ipairs(_t) do
    console(String(string.format("%s=panel:getModulatorByName(\"%s\") --[%d]",v,v,i)))
  end
  console("\n\n")
end --function
---------------------------------------------------------
In your midi received function, you can now do this:


function assign_VCED_Values()

--console ("Updating VCED Modulators")

-- Assign VCED Values from VCED_Data Memory Block, 1st memory slot is Byte 0

OP4_Ratio_List:setValue(VCED_Data:getByte(11), true)
...
OP2_Ratio_List:setValue(VCED_Data:getByte(24), true)
… or create a table with all the modulators you need to change in this function:


function assign_VCED_Values()
local t={
OP4_Ratio_List=11,
...
OP2_Ratio_List=24
...
}
 --now loop through the table
 for k,v in pairs (t) do
 _G[k]:setValue(VCED_Data:getByte(v), true)
end
end -- function
This is one way of doing it. The first suggestion might be faster than looping through a table, but not much. Either way you are saving a lot of time by eliminating the call to panel:getModulatorByName()

If you use tables as a sort of lookup database, you can organise and structure your program and reduce a lot of typing and potential errors.

This reply was modified 3 days, 22 hours ago by dnaldoogdnaldoog. Reason: changed some wording
May 22, 2020 at 3:38 pm#118572REPLY | REPORT | QUOTE

-----
Number 1 Absolutely, I just commented out a whole load of unecessary Console Calls, you’re right they are only in there so I can figure out where it got to and what state it’s in.

Number 2 Yep, I understand, I think I’ll go with the Variable route. I just created a Script for Panel Load anyway so I can place the Variable Definitions in there. At the moment it has a table I just created for the Internal Patch Names, this is for syncronisation of Internal Patch Names so they can be displayed correctly in their Performance Mode Slots rather than just I01, I02…etc

Number 3 Thanks for all the extra work, you’ve given me, LOL

Number 4 It also occurs to me that the more I speed up the Ctrlr Panel the more delays I’ll have to add to stop the poor old DX11 doing a MIDI Buffer Full, Ha Ha, but seriously thanks, I’ll get right on it!


spiffo

OK, slight issue, Defining your variables in a ‘Intialize Panel’ Script first then using something like:

OP4_Fine_Tune:setValue(ACED_Data:getByte(2), true)

To set Modulator Values works fine for a Modulator with multiple values, however, try the same thing with a Button that only has a True or False state like:

OP1_Ratio_Fix_Button:setValue(ACED_Data:getByte(15), true)

And all sort of weird things happen, from Ctrlr Crashes to nil value errors,C-1 errors, etc. You name it, I’ve seen it in the past 2 hours, but eventually I spotted the common issue.

There must be a different way for setting a Modulator that only has a True or False Value?


dnaldoog

I made a small panel to test it and it seems to work, but I am not receiving MIDI, just changing the button value with a uiSlider value.

Can you post the panel here?


spiffo

OK, have a look at this one from yesterday.

Attachments:
Yamaha-DX11-Editor_2_0_NOT_WORKING.bpanelz

dnaldoog

It’s not crashing at all for me, but I don’t see any of those code changes I proposed in this panel anyway.

Correction: I see you did make some changes as I recommended, but still for me no crash??
