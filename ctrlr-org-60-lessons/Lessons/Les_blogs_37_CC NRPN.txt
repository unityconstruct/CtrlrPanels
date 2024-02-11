Panel to send simple CC NRPN using a Slide 
July 10, 2020
Tagged: interpolate 128 values to 100 values, M-VS1, nrpn, null byte

megasis

Since the panel for Roland M-VS1 seems to be lost or unavailable, I would like to create a very simple panel, with just 8 Slides or Pots (see list below), to send a combination of CCs (needed to form a NRPN message ) to change those parameters. Using this method, there is no SysEx (and calculate Check Sum).

These are the parameters I want to control:
Vibrato Rate
Vibrato Depth
Vibreto Delay
TVF Cutoff Freq
TVF Resonance
TVF&TVA Attack
TVF&TVA Decay
TVF&TVA Release

But for now, I would be happy with creating just one.
For example:
To change the Vibrato Rate parameter on Performance 1 (Ch 1), sing the Roland M-VS1 manual, MIDI Implementation, I can change the Vibrato Rate (Range -50 – 0 – +50), sending 4 CC messages NRPN MSB, NRPN LSB, DATA MSB and DATA LSB.

CC Name Byte1 Byte2 Byte3
——–
NRPN MSB B0H 63H 01H
NRPN LSB B0H 62H 08H
DATA MSB B0H 06H mmH <-- Values from 0-127 (actually just from 14-114) DATA LSB B0H 26H 00H <-- Always 0 This is a table to show how values change when turn full to the Left, Center and fill to the right: Display -50 0 +50 Decimal 1792 8192 14592 HEX 0E00H 4000H 7200H I've been looking on all the DEMO samples and existing Panels, but all seams to be mostly SysEx. Is it possible to do this simple Pot in Ctrlr.exe to send these 4 CCs when pot is turn? Thanks in advance for all your help on this. Megasis The real value range for the Pot would bebetween

Attachments:

M-Series-13.tif


dnaldoog

Hi megasis,

Here is an example panel for the Vibrato Rate. Does it work?

I used a formula value=math.ceil(value/1.28+14) to calculate the necessary CC value, but this would be in lua. I calculated a fixed list of values of 128 values ranging from -50 ~ +50 (starting at 0EH or 14) and then just have those static values in a uiFixedSlider control.

The NRPN code in Ctrlr looks something like:


CC,ByteValue,MSB7bitValue,99,-2
CC,ByteValue,LSB7bitValue,98,-2
CC,Default,Default,6,-1
CC,ByteValue,MSB7bitValue,101,16384
CC,ByteValue,LSB7bitValue,100,127
The manual says you need the terminating NULL bytes.

In MIDI Controller Number (in this case) set the number to 8.

Let me know if this works.

Attachments:
Roland-M-VS1_1_0_Hell-O-Kitty_2020-07-10_09-02.bpanelz


Possemo

Hey dnaldoog, you seem to have mixed up NPN and NRPN. You use either CC99 and CC98 (NRPN) or CC101 and CC100 (RPN) but not both together.

NRPN for Vibrato Rate would be like this:

CC,ByteValue,MSB7bitValue,99,-2
CC,ByteValue,LSB7bitValue,98,-2
CC,Default,Default,6,-1

No need to add the LSB-Part as the VS1 only seem to need MSB (CC6 at the end).
As Vibrato goes from -50 to +50 I would use an uiFixedSlider and enter the values like this:

According to the manual range is from 14 to 114 (Hex 0E to 72)

-50=14
-49=15
…
0=65
…
+50=114

This way WYSIWYG (what you see is what you get).


dnaldoog

Hi Possemo,

You’ve got me wondering.

According to this page philrees.co.uk/nrpnq.htm a 101 and 100 shold follow an NRPN message. Other pages seem to imply it’s for RPN only, which would make sense. You would think that the addresses 99 and 98 should be nulled out not the RPN.

I found this in a manual for a Roland FP-30 (I have never heard of). It seems to imply the message should be RPN as in the Phil Rees website.


*NRPN**
The NRPN (Non Registered Parameter Number) message allows an extended range
of control changes to be used.
To use these messages, you must first use NRPN MSB and NRPN LSB messages to
specify the parameter to be controlled, and then use Data Entry messages to
specify the value of the specified parameter. Once an NRPN parameter has been
specified, all Data Entry messages received on that channel will modify the value of
that parameter. To prevent accidents, it is recommended that you set RPN Null (RPN
Number = 7FH 7FH) when you have finished setting the value of the desired
parameter. Refer to Section 4. Supplementary Material “Examples of actual MIDI
messages” . On the GS devices, Data entry LSB (llH) of NRPN (controller
number 38) is ignored, so it is no problem to send Data entry MSB (mmH) only
without Data entry LSB (controller number 6).
On this instrument, NRPN can be used to modify the following parameters


Possemo

Ok I quickly read these explanations by Phil Rees. Mhh.. I have to say that I do not share his opinion but I see the point. E.g. “If the active parameter number is left open, and the equipment is not turned off, a parameter could remain set for years! A rogue Data Entry message on the corresponding channel could then cause unintended changes.”
First: We all turn off our equipment, don’t we?
Second: I don’t send “rogue” midi data… but then.. it would be a big coincidence that it would mess up the “still active” parameter.

That may be a matter of preferences. It is true that once the parameter is selected (CC99 and CC98) you just have to send CC6 to edit the value of this particular parameter. But – would you really send “rogue, senseless” CC6? Well for live setup where you want to be 120% sure that everything works as it should, that may be a point to consider. I’d prefer to send the minimum number of data through midi, but that’s my personal preference.

After all: good point anyway. I didn’t knew this “reset” message.


megasis

dnaldoog,

First of all… Thanks you very much for the panel, that’s exactly how I envision the controls for my M-VS1 NRPN panel.

Just so you know, I’ve never used Cntrlr.exe in my life, so this is uncharted territory, I was planning on building a Arduino Controller with 8 knobs to send this via MIDI cable etc., but this is a faster and very flexible alternative. My background is Database Application Developer, so coding shouldn’t be difficult.

Testing:
I tested the panel you sent me (thanks!!) but it didn’t work out-of-the-box. The problem was, after trying to figure out for couple of hours how Ctrolr.exe works, the Controller Number, you set it to 8, but for Vibrato Rate it has to be 136 ( MSL=01, LSB=08 –> 128 + 8 = 136 ).

This is from my initial post related to Vibrato Range:
CC Byte1 Byte2 Byte3
——–
NRPN MSB B0H 63H 01H <-- It has to be 01H NRPN LSB B0H 62H 08H DATA MSB B0H 06H mmH 
My first change was the LUA script I found when I open LUA editor: 

local valu=math.ceil(value/1.28+14) 
local v=string.format("%.2X",valu) 
local str="B"..channel.." 63 00\n" <-- So Here changed it to 01 str=str.."B"..channel.." 62 08\n" str=str.."B"..channel.." 06 "..v.."\n" str=str.."B"..channel.." 65 7F\n" str=str.."B"..channel.." 64 7F" 
panel:getLabel("d"):setText(str) This fixed the Display MIDI Out, but the real MIDI output sent to M-VS1 didn't change, on the Output Monitor continue showing 00 One hour later, I realize there was a MIDI Controller number in the Modulator panel, so when I changed it to 136 it fixed the problem and the M-VS1 responded to the change perfectly. This is still 90% black Box, I would love to find more reference documentation on what are all those parameters on the Modulator Panel, and also how to use LUA editor. Thanks you again and Best regards, Megasis


dnaldoog

Hi Megasis – I see the Midi Controller number value is split into MSB/LSB. In other words 136 will be MSB =1 LSB =8 as you wrote. I wrote a panel for the JD-990

ctrlr.org/roland-jd990-super-editor/
that has a lot of sysex code for the SR-JV80-04 card (and a popup menu of all patch names) which is the same as the m-VS1 – maybe it could help you if you want to get into the sysex side of things.


@possemo I tried using NRPN with my PLG-150-AN but it seemed to be corrupting the card, so I then discovered the NULL byte thing and added the end NULL(reset) bytes, but the problem persisted so I gave up on NRPN for that particular card itself.


Possemo

I see. I think in most cases NRPN has no advantage compared to Sysex. The numer of bytes transferred is about the same, that is if you always send the Controller-Number together with a value change. This probably was not the way it was meant to be done. With Lua you could do a very efficient method, only sending the MSB/LSB Ctrlr-Nr. when the Controller changes. Anyway when you automate parameters and you change several controllers at once with NRPN there could always be a risk that parameters collide and some CC6 will not edit the right Ctrlr-Nr. With Sysex this is not possible.


dnaldoog

@possemo I agree – that was actually my first and last foray into the world of NRPN. When it corrupted the PLG150-AN card I thought to leave well alone and go back to sysex. There seem to be many warnings about it even in manuals and usually sysex or CC is offered to do the same thing anyway. I wonder if the OP megasis will find this. Will be interesting to hear if it all works flawlessly with the m-VS1.


Possemo

My SuperJX-panel is using NRPN on more than 160 parameters and is working without probs. I guess it depends on how well it is implemented in the firmware of the synth. The SuperJX firmware v4 is a recent update/fix by Fred Vecoven, a skilled firmware specialist.

In the case of the SuperJX the amount of data is slightly smaller on NRPN even when always sending the CtrlrNr:

NRPN 9 Bytes:
b0 63 00
b0 62 00
b0 06 00

Sysex 10 Bytes:
F0 41 39 00 24 20 01 0B 00 F7

Well, it shouldn’t be that big of an advantage.


megasis

Thanks all for clarify a lot for me, now I’m thinking on using SysEx to explore more parameters in my M-VS1 that are not available using CC, RPN or NRPN.
A week ago, when I discover ctrlr, I found references to a M-VS1 panel in the Forums, somebody was working on it 7 years ago and was about to release it…, but that was the last message.
M-VS1 panel is listed on the deprecated panels, but the the download link doesn’t work, is it save somewhere else?

I guess I’ll have to start from scratch, now that I know the basics, the next step is figuring out how to Load a patch from the temporary memory in M-VS1 to set Modulators, so I can change them and send back to the module.
Yes, I know there is a Dump Block (or something like that), but… once I have the Block, how are the parameters assigned to their specific value in the modulators? a Lua script to decode byte by byte of the dump block and put a value on each modulator? or instead of using dump block, use a lua script sending sysEx requests, one by one for each Modulator value?

I have download panels that apparently do that Load/Change/Save from the Synth, so I could try revers engineering, but I would like to have a more clear understanding of the workflow inside ctrlr panel.

Any recommendation?


Dnaldoog

Hi megasis,

I would find out from the manual which control each byte is to be assigned to in the dump message and make a table of your Ctrlr modulators uiSliders variable names etc in that exact order:

myList={
“VibratoRate”,
“VibratoDepth”,
“Vibreto Delay”, …
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

The waveforms, of which there are 255. might be represented by two of the bytes in the message MSB and LSB, so you’d have to parse that and then maybe update a uiLabel with the name referenced from a table of waveform names.

Loop though each byte with the table.

For example


local offset =9
for i,v in ipairs (myList) do
panel:getModulatorByname(v):setValue(midi:getData():getByte(i+offset,true)
end
i+offset might be 10, so you’ll have to play around with that to get the correct byte position.

Something like that and it’s just off the top of my head.

There are many clues for this in my Roland JD-990 panel which incorporates the SR-JV80-04 card, but wading through someone else’s code is almost more difficult than writing it yourself!

Good luck!
