June 27, 2020
damien


It’s really simple compared to what’s under the hood of my ctrlr panel for the Ensoniq DP4 but I can’t figure what’s wrong.

On my panel I have 4 buttons to bypass FX units.
Those buttons work with midi CC

The dedicated channel is ch7
and the cc number are 75, 76, 77 or 78

I set the 2 on/off values like this in the “component button values”:
UnitB Bypass Off = 0
UnitB Bypass On = 127

I tried the formula :
CC,Direct,Direct,75,xx,F0 00 F7

I set my modulator midi:
type : multi or CC
channel : 7
controler : 75
value : 0

but on click it only gives a CC value of 00 (probably because of the fixed midi value of 0 in the modulator midi cc value slider). I wan’t to overide this.

And with a formula, it’s like xx doesn’t work as a modulator value denominator

How can I manage to output the related cc value change (0 or 127)?

thanks a lot

OK
I got it with using the value as MSB

it gives :

CC,Direct,xx,75,-1,F0 00 F7

and it works

hope it helps 🙂


Possemo

it works but it is a bit complicated. CC’s are much easier to setup, see my screenshot. It wouldn’t hurt to study the demo panels either 🙂

Attachments:

ccs.jpg


dnaldoog


Interesting! I’m not so familiar with the multi section of Ctrlr

I don’t think you need the sysex part and you can also just do this with ‘multi’:

CC,Direct,Direct,-1,-1,

but just using CC should work too?

cc multi screengrab

Button values:
off=0
on=127

EDIT::I didn’t see Possemo’s post just ahead of mine!


damien

Possemo wrote:
it works but it is a bit complicated. CC’s are much easier to setup, see my screenshot. It wouldn’t hurt to study the demo panels either 🙂

It does not work this way.
I started doing that but whatever position the button is on, the value sent is 0 not 0 or 127 as defined in the value field in the Modulator Midi section.


dnaldoog wrote:
Interesting! I’m not so familiar with the multi section of Ctrlr

I don’t think you need the sysexpart and you can also just do this with ‘multi’:

CC,Direct,Direct,-1,-1,

but just using CC should work too?

I’ll try this tomorrow. But I’m pretty sure I’ll need a value denominator like xx somewhere to call the 2 values for the 2 different states. I’ll let you know.
thanks 😉

Send a Message

I’ll try with LUA as well with just the 3x hex according to goodweather’s guide:

Control Change messages (CC) belongs to the Channel Voice family of messages. They are made of 3 bytes with n=channel number (0-15), c=controller number (0-127) and v=controller value (0-127) as:
Some controllers may use values 0-16383 instead of 0-127.

Status byte 1011nnnn
Data byte 0ccccccc
Data byte 0vvvvvvv

They will then need 2 messages as above where the CC# of the first message will be 1 to 31 while the CC# of the second message will be 33 to 63.
The value will be the combination of the value bytes of the two messages (value byte message 1 = MSB Most Significant Byte; value byte message 2 = LSB Least Significant Byte)
Example1: setting the Amp EG attack time on Midi channel 1 to 43 will require sending B0 1C 2B hex or 10110000 00011100 00101011 (Midi channel 1 has channel number 0)

dnaldoog

Hi Damien,

You shouldn’t need xx or ‘multi’ as long as you assign the value in the Button Values field thus:

off=0
on=127

Then use CC option:

If you do it in lua, and you have

off=0
on=1

as button values, you can just multiply the incoming value by 127


myFunction=function(mod,value,source)
--local channelOut=panel:getProperty("panelMidiOutputChannelDevice")
--local statusByte=0xb0+(channelOut-1) -- use this code for dynamic channel changes
local midiNum=tonumber(mod:getProperty("modulatorCustomIndex") )
local statusByte=0xB6 -- you are using channel 7
	local myMessage= CtrlrMidiMessage({statusByte, midiNum, value*127})
	panel:sendMidiMessageNow(myMessage)
end
If you want to make this a shared function you would have to work out how to pass in the CC number, maybe using modulatorCustomIndex with a value of 75 etc for each button


damien

Hi,

CC,Direct,Direct,-1,-1 works well.

Thanks for your help


Possemo

Strange – my suggested settings do work on my setup, it sends values 0 and 7f. If I am not mistaken you are on Mac. The Mac version has some addidional quirks compared to the Windows-Ver, maybe this is one of them.

Btw. xx is just for sysex messages, on other messages -1 is the value and -2 ist the controller number.


dnaldoog

damien wrote:
Possemo wrote:
it works but it is a bit complicated. CC’s are much easier to setup, see my screenshot. It wouldn’t hurt to study the demo panels either 🙂

It does not work this way.
I started doing that but whatever position the button is on, the value sent is 0 not 0 or 127 as defined in the value field in the Modulator Midi section.

It works for me. What doesn’t seem to register is the channel byte. If I change ‘channel out’ in Ctrlr MIDI settings to 7 then back to 1 then it works. Don’t know if that’s a bug. If it is, you should probably use lua for a fixed channel assignment like this.

See attached panel.

One button uses an expression modulatorValue*127 and button values 0/1
The other button uses button values 0/127
Attachments:
CC-send-4-Damien_1_0_Hell-O-Kitty_2020-06-27_20-36.panel

------------------------
Possemo August 2020



NRPN 99/98 is not coarse/fine setting but msb and lsb part of ONE value – the controller number. You have to understand that msb and lsb are two parts of one value broken into two bit-pieces. E.g. 11111110000000 is a 14-Bit value. You can break this into msb (in this case 1111111) and lsb (in this case 0000000).

CC,ByteValue,MSB7bitValue,99,-2
CC,ByteValue,LSB7bitValue,98,-2
CC,ByteValue,LSB7bitValue,6,-1

This is a NRPN “multi” message in Ctrlr. -2 corresponds to the MIDI controller number. It can be as big as 16363 (a 14-bit value) broken into two 7-bit nibbles.
Btw. xx is just for sysex messages, on other messages -1 is the value and -2 ist the controller number.

Sysex does work similar. Use MS and LS for 7-bit nibbles and ms and ls for 4-bit nibbles. So a sysex message could look like this:

F0 42 3g 58 B0 63 04 B0 62 08 B0 ms ls F7

-----

I guess you are talking about parameters like this:

osc1 LFO1 depth cc 28:60 -127 to 127*

Interesting, I have never seen that. I don’t see any other way than Lua scripting eiter. The script of dnaldoog should do the trick. I would have done it similar.

Btw. this has not much to do with MSB/LSB. It’s just that cc60 takes over where cc28 ends.

If you are thinking 7-bit msb/lsb that would look as follows:

0-127 = MSB 0 / LSB 0 to 127
128-255 = MSB 1 / LSB 0 to 127

This may be hard to understand when using decimal notation. In binary it makes much more sense:

This is 127: 01111111 (see the 8th bit is 0 thus msb is 0)
This is 255: 11111111 (8th bit is 1)

For a value up to 255 you need just 8 bits. So, if you have 7-bit lsb/msb split you will just need 1 bit for msb.



@Possemo:

It’s also possible that cc 28 handles midi values -127 to 0 (7bits) and cc60 handles 0 to 127 (also 7 bits)
In this case, both cc’s are 7 bits. So there has te be then a constructor that is switching both CC’s at 0


Dnaldoog

I think you might have to do that in Lua. I looked at the manual. Is this what you are after?

See attached panel. I think the CC number changes when the value exceeds a 7 bit number. Not sure how to do that without resorting to lua.


lfo_sweep = function(--[[ CtrlrModulator --]] mod --[[ number --]], value --[[ number --]], source)
    local channelOut = panel:getProperty("panelMidiOutputChannelDevice")
    local statusByte = 0xb0 + (channelOut - 1) -- use this code for dynamic channel changes

    local ccNumber = 51
    
	if value < 0 then -- values range -127 ~ +127
        value = value + 127
        ccNumber = 18
    end
    -- DEBUGGING
	panel:getLabel("OUT"):setText(string.format("%.2x %.2x %.2x", statusByte, ccNumber, value))
    -- SEND MESSAGE
	local myMessage = CtrlrMidiMessage({statusByte, ccNumber, value})
    panel:sendMidiMessageNow(myMessage)
end

Regards,

I had to stare at Possemo’s suggestion for a long time, before I realised that is probably it and the best way!

Brilliant!

Does this work? No lua, just


CC,ByteValue,MSB7bitValue,18,-1
CC,ByteValue,LSB7bitValue,50,-1

with

(modulatorValue+128)*64

in the expression field and no uiFixedSlider necessary.

✨
Possemo

That’s it. It is a bit weird but after all not that complicated. It just uses msb/lsb method with 2 CC’s. A bit odd that they use the full spectrum of 2x7bits (16364 values) when they are just using 256 values of them. This is achieved by steps of 64. I added a uiFixedSlider method to dnaldoogs version. I like the fixedslider. It allows to show the positive sign, like this: +127. FixedSlider contents are done very easy with Excel. No problem making hundreds of entries in sequence.

Attachments:
Bass-Station-2-using-CC-MUlti__FixedSlider_Alternative.panel

Dnaldoog

Here is another panel, this time using Possemo’s uiFixedSlider solution as well as my original lua solution plus a new lua function that uses the JUCE class BigInteger() for your perusal. It is much similar and basically just emulates the Ctrlr way!

It has been very interesting seeing an answer to this emerge! In the end the best most elegant solution supplied by Possemo, seems simple in hindsight. Great thing – hindsight.


lfo_new = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)
local mValue=mod:getValueMapped()
    local channelOut = panel:getProperty("panelMidiOutputChannelDevice")
    local statusByte = 0xb0 + (channelOut - 1) -- use this code for dynamic channel changes

local bi=BigInteger(mValue)
local msb7=bi:getBitRangeAsInt(7,14)
local lsb7=bi:getBitRangeAsInt(0,7)

        local mb= CtrlrMidiMessage({statusByte, 17, msb7})
        panel:sendMidiMessageNow(mb)

        local lb= CtrlrMidiMessage({statusByte, 49 ,lsb7})
        panel:sendMidiMessageNow(lb)

end

😂

    This reply was modified 4 days, 18 hours ago by dnaldoogdnaldoog. Reason: added BigInteger() lua function
    This reply was modified 4 days, 8 hours ago by dnaldoogdnaldoog. Reason: added extra message in reply to a message that was under moderation

Attachments:

    Bass-Station-2-using-4-methods_1_0.bpanelz


