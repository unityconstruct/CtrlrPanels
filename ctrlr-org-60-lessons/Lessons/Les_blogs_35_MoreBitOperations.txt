Get each bits from hex value to set 8x different values if 1 or 0
July 1, 2020 

damien

Hi,
I am trying to decode a byte (8bits) from a sysex dump. this byte once decoded : stuvwxyz gives the position of 8 different buttons.

I cannot figure the proper way to get each bit with “tonumber” it gives nill values.

here is my script :

function BypassStatusDecode(EditBufferMessage)
-- Get Routing Config from Edit Buffer Sysex Message and Update panel config buttons

BypassStatus = EditBufferMessage:getByte(160)
console ("bypass status: "..tostring(BypassStatus))

-- decompose hex value to binary
BypassStatusBin = tonumber(BypassStatus,2)
console ("bypass status in binary: "..tostring(BypassStatusBin)) -- get a nil value

-- returns 

BypassStatusBit1 = BypassStatusBin:get(1)
BypassStatusBit2 = BypassStatusBin:get(2)
BypassStatusBit3 = BypassStatusBin:get(3)
BypassStatusBit4 = BypassStatusBin:get(4)
BypassStatusBit5 = BypassStatusBin:get(5)
BypassStatusBit6 = BypassStatusBin:get(6)
BypassStatusBit7 = BypassStatusBin:get(7)
BypassStatusBit8 = BypassStatusBin:get(8)

-- bypass & kill formula is : stuvwxyz (bits) with 

-- Bypass status for Unit A
if  BypassStatusBit1 == 0 then
	panel:getModulatorByName("ViButComByPassA"):setModulatorValue(0, false, false, false)
elseif BypassStatusBit1 == 1 then
	panel:getModulatorByName("ViButComByPassA"):setModulatorValue(1, false, false, false)

end

-- bypass status for Unit B
if  BypassStatusBit3 == 0 then
	panel:getModulatorByName("ViButComByPassB"):setModulatorValue(0, false, false, false)
elseif BypassStatusBit3 == 1 then
	panel:getModulatorByName("ViButComByPassB"):setModulatorValue(0, false, false, false)
end

-- ....

end
This is a big pain because I use to decode the byte but want something more streamlined because my script does not take in account the bypass mode (kill or bypass, on bits 1 3 5 7):

function BypassStatusDecode(EditBufferMessage)
-- Get Routing Config from Edit Buffer Sysex Message and Update panel config buttons

BypassStatus = EditBufferMessage:getByte(160)
console ("bypass status: "..tostring(BypassStatus))

-- If All Units are in Bypass mode not in Kill Mode

if BypassStatus == 0 then
	panel:getModulatorByName("ViButComByPassA"):setModulatorValue(0, false, false, false)
	panel:getModulatorByName("ViButComByPassB"):setModulatorValue(0, false, false, false)
	panel:getModulatorByName("ViButComByPassC"):setModulatorValue(0, false, false, false)
	panel:getModulatorByName("ViButComByPassD"):setModulatorValue(0, false, false, false)
	console ("all unbypassed")

elseif BypassStatus == 1 then
	panel:getModulatorByName("ViButComByPassA"):setModulatorValue(1, false, false, false)
	panel:getModulatorByName("ViButComByPassB"):setModulatorValue(0, false, false, false)
	panel:getModulatorByName("ViButComByPassC"):setModulatorValue(0, false, false, false)
	panel:getModulatorByName("ViButComByPassD"):setModulatorValue(0, false, false, false)
	console ("Unit A bypassed")

elseif BypassStatus == 4 then
	panel:getModulatorByName("ViButComByPassA"):setModulatorValue(0, false, false, false)
	panel:getModulatorByName("ViButComByPassB"):setModulatorValue(1, false, false, false)
	panel:getModulatorByName("ViButComByPassC"):setModulatorValue(0, false, false, false)
	panel:getModulatorByName("ViButComByPassD"):setModulatorValue(0, false, false, false)
	console ("Unit B bypassed")

elseif BypassStatus == 5 then
	panel:getModulatorByName("ViButComByPassA"):setModulatorValue(1, false, false, false)
	panel:getModulatorByName("ViButComByPassB"):setModulatorValue(1, false, false, false)
	panel:getModulatorByName("ViButComByPassC"):setModulatorValue(0, false, false, false)
	panel:getModulatorByName("ViButComByPassD"):setModulatorValue(0, false, false, false)
	console ("Unit A and B bypassed")

-- and so on for each value :)
A little bit of cleanup of the 1st script would be great, right now I get errors from the tonumber function.

thanks a lot for your help, have a good night
Damien

Edit:

for bits “stuvwxyz”

s = Unit D Kill mode status (1 = Kill, 0Bypass);
t = UnitD Bypass Status (1=Bypass; 0=Un-Bypassed);
u = Unit C kill mode,
v = Unit C Bypass Status;

and so on…


dnaldoog

Hi Damien! I’m back!

You are trying to get each bit flag in an 8 bit number, right?

This is the first thing that comes to mind. Here I populate a table with either 1s or 0s.

You could then loop through the table and set to 0 or 1.


myMethod = function( mod,  value,  source)
local input=tonumber(L(panel:getLabel("input"):getText()))
console(String(""..input))
local bin={}
local str=''

for i=1,8 do
local bg=BigInteger(input)
table.insert(bin,bg:getBitRangeAsInt(8-i,1))
end
panel:getLabel("output"):setText(table.concat(bin,','))
end

So if you enter 253 for example, you will get a table t={1,1,1,1,1,1,0,1} for example.

Attachments:
find-bits-in-integer_1_0_Hell-O-Kitty_2020-07-01_12-43.panel

Possemo

For bitoperations I too am using biginterger. For me it is easier to understand without loops:

	-- get values from Nibble in Byte 55 **********************************************
	local byte55=BigInteger(DumpData:getByte(49))

	Byte55bit1=byte55:getBitRangeAsInt(0,1)
	panel:getModulator("Sync_Switch"):setValue(Byte55bit1,false)

	Byte55bit2=byte55:getBitRangeAsInt(1,1)
	panel:getModulator("Trigger_SingleMulti"):setValue(Byte55bit2,false)

	Byte55bit3=byte55:getBitRangeAsInt(2,1)
	panel:getModulator("LFO_ToFilterCutoff"):setValue(Byte55bit2,false)
At the time when I made this I didn’t knew :getBit(bitnumber) which would have been even easier.

All biginterger options:
https://docs.juce.com/master/classBigInteger.html

Ctrlr probably does not support all of them but the most important ones are there.

bit.band would be another way to do it. For me it is less easy to understand but once you get into it it works quite well.


dnaldoog

Hi Possemo, I triedBigInteger():getBit() but it didn’t work for me. I looked in the source code and couldn’t see it in the luabind code. Would be a useful feature for sure.

Regards,

github.com/RomanKubiak/ctrlr/blob/de28dc3ad3591a5832f1e38ce8adabc9369b1011/Source/Lua/JuceClasses/LMemory.cpp


Possemo

It is some time ago when I found that getBit and setBit does actually work. If I remember well it needs a boolean (true or false e.g. bit set or not set). So, depending on the code it could make more sense to use getBitRange where you could directly use values or variables.

Edit: Ah, no as you said it is not implemented. Only setBit.



damien

Hello,

I tried both method they all are working well, this BigInter Function from Juce is really nice.

I went with Possemo’s way it was more straight forward in my case.

Here is the final script wich is 1% smaller than the one before with all the different possibilities : 4x3x2, that was lot of statements…

function BypassStatusDecodeBin(EditBufferMessage, value, source)

	local BypassStatusBin = BigInteger(EditBufferMessage:getByte(160))
	
	BypassStatusBit1=BypassStatusBin:getBitRangeAsInt(0,1)
	panel:getModulator("ViButComByPassA"):setModulatorValue(BypassStatusBit1, false, false, false)
	console ("UA Bypass Status: "..tostring(BypassStatusBit1))

	BypassStatusBit2=BypassStatusBin:getBitRangeAsInt(1,1)
--	panel:getModulator("ViButComByPassAMode"):setModulatorValue(Byte55bit2, false, false, false)
	
	BypassStatusBit3=BypassStatusBin:getBitRangeAsInt(2,1)
	panel:getModulator("ViButComByPassB"):setModulatorValue(BypassStatusBit2, false, false, false)
	console ("UB Bypass Status: "..tostring(BypassStatusBit3))

	BypassStatusBit4=BypassStatusBin:getBitRangeAsInt(3,1)
--	panel:getModulator("ViButComByPassBMode"):setModulatorValue(BypassStatusBit4, false, false, false)
	
	BypassStatusBit5=BypassStatusBin:getBitRangeAsInt(4,1)
	panel:getModulator("ViButComByPassC"):setModulatorValue(BypassStatusBit5, false, false, false)
	console ("UC Bypass Status: "..tostring(BypassStatusBit5))

	BypassStatusBit6=BypassStatusBin:getBitRangeAsInt(5,1)
--	panel:getModulator("ViButComByPassCMode"):setModulatorValue(BypassStatusBit6, false, false, false)

	BypassStatusBit7=BypassStatusBin:getBitRangeAsInt(6,1)
	panel:getModulator("ViButComByPassD"):setModulatorValue(BypassStatusBit7, false, false, false)
	console ("UD Bypass Status: "..tostring(BypassStatusBit7))

	BypassStatusBit8=BypassStatusBin:getBitRangeAsInt(7,1)
--	panel:getModulator("ViButComByPassDMode"):setModulatorValue(BypassStatusBit8, false, false, false)

end
Thanks guys for your precious help!


dnaldoog

That’s great Damien!

You could also just loop through a table.


function BypassStatusDecodeBin(EditBufferMessage, value, source)

local t={
"ViButComByPassA",
"ViButComByPassAMode",
"ViButComByPassB",
"ViButComByPassBMode",
"ViButComByPassC",
"ViButComByPassCMode",
"ViButComByPassD",
"ViButComByPassDMode"
}
	local BypassStatusBin = BigInteger(EditBufferMessage:getByte(160))

	for i,v in ipairs (t) do
		local flag=BypassStatusBin:getBitRangeAsInt(i-1,1)
		panel:getModulatorByName(v):setValue(flag, false)
	end --loop
	
	end --function (untested code)

Attachments:
find-bits-in-integer_1_2_Hell-O-Kitty_2020-07-02_14-44.bpanelz
