Bit operations on a variable
___________________________

I’ve put a value of a component in a variable. I want to alter the value of the variable by shifting bits.

Let’s say I’ve got a value of decunak 15. When I express decimal 15 in binary it is 0 0 0 0 1 1 1 1. My synthesizer accepts for a specific parameter decimal 15 as 0 0 0 1 1 1 1 0, which is in decimal 30. So I have to shift bits 4-7 one position to the left.

I’ve thought it to be in a function like:

function myBitShift(bits, positions, value)

-- bits = how many bits to be shifted
-- positions = how many positions to be shifted
-- value = the decimal value that has to be altered via a someValue = someModulator:getModulatorValue()

	local i
	for i = bits, 1 do 
		local shftValue = bit.lshift(value(i+1),positions)
	end
end
How can I get this to work? Many thanks for all help!

This topic was modified 2 months, 2 weeks ago by EnzoF04.
March 8, 2020 at 12:25 pm#117304REPLY | REPORT | QUOTE


Tedjuh helped me with the correct code, I had to use tonumber to convert the data coming from a modulator value.


bit.lshift(tonumber(modVcoValue),1)

&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

Constructing a byte from 4 bits
_______________________________

February 11, 2017 at 6:39 pm#71243

human fly

i have 4 partials and they can have 16 combinations. i’ve decided the best way to do this is to just list all 16 combinations, as it isn’t very long.

say the partials are called P1, P2, P3, P4
and i want to say, for example:
if P1==1, P2==0, P3==0, P4==1

ie: partial states are on, off, off, on

what is the correct way to do this? i’ve just put a
comma there for the example.

February 11, 2017 at 8:26 pm#71246

dasfaker

Yes, you can do it something like this (not tested)

local p1 = nil
local p2 = nil
local p3 = nil
local p4 = nil  
local sum = nil
if panel:getModulatorByName("P1"):getValue() == 0 then p1 = 0 else p1 = 1 end
if panel:getModulatorByName("P2"):getValue() == 0 then p2 = 0 else p2 = 1 end
if panel:getModulatorByName("P3"):getValue() == 0 then p3 = 0 else p3 = 1 end
if panel:getModulatorByName("P4"):getValue() == 0 then p4 = 0 else p4 = 1 end

sum = (p1*1) + (p2*2) + (p3*4) + (p3*8)
sum variable will give you a unique value for every possible combination.




spiffo

Hi, I’m stuck again,

What I need to do is read the state of 4 Buttons (On or Off) then insert them as bits 0,1,2,3 in a 8bit byte, then update a Modulator with that value.

What I have so far is this, but something isn’t right:

function OP_ON_OFF_BitSet()

bit3 = panel:getModulatorByName(“OP1_ON_OFF”):getModulatorValue()
bit2 = panel:getModulatorByName(“OP2_ON_OFF”):getModulatorValue()
bit1 = panel:getModulatorByName(“OP3_ON_OFF”):getModulatorValue()
bit0 = panel:getModulatorByName(“OP4_ON_OFF”):getModulatorValue()

byte93 = BigInteger()
byte93:setBitRangeAsInt(0,1,bit0)
byte93:setBitRangeAsInt(1,1,bit1)
byte93:setBitRangeAsInt(2,1,bit2)
byte93:setBitRangeAsInt(3,1,bit3)
byte93:setBitRangeAsInt(4,1,0)
byte93:setBitRangeAsInt(5,1,0)
byte93:setBitRangeAsInt(6,1,0)
byte93:setBitRangeAsInt(7,1,0)

byte93Int=byte93:getBitRangeAsInt(0,8)

panel:getModulatorByName(“OP_ON_OFF_BYTE”):setModulatorValue(byte93Int, false, var, false)

end

Can anyone help please?

May 14, 2020 at 9:54 pm#118396REPLY | REPORT | QUOTE


human fly


i ended up going for my long way, because i wanted other UI things to happen. so the method ended up as: (hope this posts ok)
(edit: looking at it now, it depends on some subfunctions, and this is probably not much help to look at) (you only need to look at the first 2 lines of each option)

function partial_ops()
	-- This stops issues during panel bootup
	if panel:getRestoreState() == true or panel:getProgramState() == true 
	then return end
--modulators
--partials_onoff controls views and LEDs
	local p1 = panel:getModulatorByName("Partial1_OnOff_Pt1"):getModulatorValue()
	local p2 = panel:getModulatorByName("Partial2_OnOff_Pt1"):getModulatorValue()
	local p3 = panel:getModulatorByName("Partial3_OnOff_Pt1"):getModulatorValue()
	local p4 = panel:getModulatorByName("Partial4_OnOff_Pt1"):getModulatorValue()
--tvaLevel zero is same as partial Off, AND with partial onoff
	local l1 = panel:getModulatorByName("tvaLevel_p1pt1"):getModulatorValue()
	local l2 = panel:getModulatorByName("tvaLevel_p2pt1"):getModulatorValue()
	local l3 = panel:getModulatorByName("tvaLevel_p3pt1"):getModulatorValue()
	local l4 = panel:getModulatorByName("tvaLevel_p4pt1"):getModulatorValue()
--components
--ledTextA 1st row//normal onoff//
	local ledA1 = panel:getComponent("ledText1")
	local ledA2 = panel:getComponent("ledText2")
	local ledA3 = panel:getComponent("ledText3")
	local ledA4 = panel:getComponent("ledText4")
--ledTextB 2nd row//shows partial is at both inputs//
	local ledB1 = panel:getComponent("ledText5")
	local ledB2 = panel:getComponent("ledText6")
	local ledB3 = panel:getComponent("ledText7")
	local ledB4 = panel:getComponent("ledText8")
--tab OnClick buttons//showhide with partial onoff
	local p1click = panel:getComponent("tabP1OnClick")
	local p2click = panel:getComponent("tabP2OnClick")
	local p3click = panel:getComponent("tabP3OnClick")
	local p4click = panel:getComponent("tabP4OnClick")
--tab showhide
	local tabsWGp1 = panel:getComponent("tabsWGp1pt1")
	local tabsWGp2 = panel:getComponent("tabsWGp2pt1")
	local tabsWGp3 = panel:getComponent("tabsWGp3pt1")
	local tabsWGp4 = panel:getComponent("tabsWGp4pt1")
--struct12/34/clikStrct12/34//showhide for partial pairs
	local struct12 = panel:getComponent("struct12_pt1")
	local struct34 = panel:getComponent("struct34_pt1")
	local clikSt12 = panel:getComponent("clikStrct12_pt1")
	local clikSt34 = panel:getComponent("clikStrct34_pt1")

-- 1st pair
	function doubleA1()
	ledA1:setProperty("uiLabelTextColour","FF00FF00", false) --on
	ledB1:setProperty("uiLabelTextColour","FFD28008", false) --on
	ledA2:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledB2:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	end
--
	function doubleB1()
	ledA1:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledB1:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledA2:setProperty("uiLabelTextColour","FF00FF00", false) --on
	ledB2:setProperty("uiLabelTextColour","FFD28008", false) --on
	end
--
	function allOff1()
	ledA1:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledB1:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledA2:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledB2:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	end
--
	function bothOn1()
	ledA1:setProperty("uiLabelTextColour","FF00FF00", false) --on
	ledB1:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledA2:setProperty("uiLabelTextColour","FF00FF00", false) --on
	ledB2:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	end
-- 2nd pair
	function doubleA2()
	ledA3:setProperty("uiLabelTextColour","FF00FF00", false) --on
	ledB3:setProperty("uiLabelTextColour","FFD28008", false) --on
	ledA4:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledB4:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	end
--
	function doubleB2()
	ledA3:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledB3:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledA4:setProperty("uiLabelTextColour","FF00FF00", false) --on
	ledB4:setProperty("uiLabelTextColour","FFD28008", false) --on
	end
--
	function allOff2()
	ledA3:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledB3:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledA4:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledB4:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	end
--
	function bothOn2()
	ledA3:setProperty("uiLabelTextColour","FF00FF00", false) --on
	ledB3:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	ledA4:setProperty("uiLabelTextColour","FF00FF00", false) --on
	ledB4:setProperty("uiLabelTextColour","FF0E2B01", false) --off
	end

-- 0 --bin0000//AllOff
	if p1 == 0 and p2 == 0 and p3 == 0 and p4 == 0 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x00, 0x70, 0xf7}))

	allOff1()	allOff2()

	p1click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p2click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p3click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p4click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	tabsWGp1:setVisible(false)
	tabsWGp2:setVisible(false)
	tabsWGp3:setVisible(false)
	tabsWGp4:setVisible(false)
	struct12:setVisible(false)
	clikSt12:setVisible(false)
	struct34:setVisible(false)
	clikSt34:setVisible(false)

-- 1 --bin0001//only checkp1, p2 is off,no need to compare 2nd pair, p3 and p4 are off//
	elseif p1 == 1 and p2 == 0 and p3 == 0 and p4 == 0 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x01, 0x6f, 0xf7}))		
		
		if		l1 ~= 0 then doubleA1()	allOff2()
		elseif	l1 == 0 then allOff1()	allOff2()
		end

	p1click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p2click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p3click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p4click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	tabsWGp1:setVisible(true)
	tabsWGp2:setVisible(false)
	tabsWGp3:setVisible(false)
	tabsWGp4:setVisible(false)
	struct12:setVisible(true)
	clikSt12:setVisible(true)
	struct34:setVisible(false)
	clikSt34:setVisible(false)

-- 2 --bin0010//check only p2//
	elseif p1 == 0 and p2 == 1 and p3 == 0 and p4 == 0 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x02, 0x6e, 0xf7}))	
		
		if		l2 ~= 0 then doubleB1()	allOff2()
		elseif	l2 == 0 then allOff1()	allOff2()
		end

	p1click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p2click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p3click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p4click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	tabsWGp1:setVisible(false)
	tabsWGp2:setVisible(true)
	tabsWGp3:setVisible(false)
	tabsWGp4:setVisible(false)
	struct12:setVisible(true)
	clikSt12:setVisible(true)
	struct34:setVisible(false)
	clikSt34:setVisible(false)

-- 3 --bin0011
	elseif p1 == 1 and p2 == 1 and p3 == 0 and p4 == 0 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x03, 0x6d, 0xf7}))

		if		l1 ~= 0 and l2 ~= 0 then bothOn1()	allOff2()
		elseif	l1 ~= 0 and l2 == 0 then doubleA1()	allOff2()
		elseif	l1 == 0 and l2 ~= 0 then doubleB1()	allOff2()
		elseif	l1 == 0 and l2 == 0 then allOff1()	allOff2()		
		end

	p1click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p2click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p3click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p4click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	tabsWGp1:setVisible(true)
	tabsWGp2:setVisible(true)
	tabsWGp3:setVisible(false)
	tabsWGp4:setVisible(false)
	struct12:setVisible(true)
	clikSt12:setVisible(true)
	struct34:setVisible(false)
	clikSt34:setVisible(false)

-- 4 --bin0100//check only p3//
	elseif p1 == 0 and p2 == 0 and p3 == 1 and p4 == 0 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x04, 0x6c, 0xf7}))

		if		l3 ~= 0 then allOff1()	doubleA2()
		elseif	l3 == 0 then allOff1()	allOff2()
		end

	p1click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p2click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p3click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p4click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	tabsWGp1:setVisible(false)
	tabsWGp2:setVisible(false)
	tabsWGp3:setVisible(true)
	tabsWGp4:setVisible(false)
	struct12:setVisible(false)
	clikSt12:setVisible(false)
	struct34:setVisible(true)
	clikSt34:setVisible(true)

-- 5 --bin0101//two separate checks here, other partial is already off//
	elseif p1 == 1 and p2 == 0 and p3 == 1 and p4 == 0 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x05, 0x6b, 0xf7}))

		if		l1 ~= 0 then doubleA1()
		elseif	l1 == 0 then allOff1()
		end

		if		l3 ~= 0 then doubleA2()
		elseif	l3 == 0 then allOff2()
		end

	p1click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p2click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p3click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p4click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	tabsWGp1:setVisible(true)
	tabsWGp2:setVisible(false)
	tabsWGp3:setVisible(true)
	tabsWGp4:setVisible(false)
	struct12:setVisible(true)
	clikSt12:setVisible(true)
	struct34:setVisible(true)
	clikSt34:setVisible(true)

-- 6 --bin0110
	elseif p1 == 0 and p2 == 1 and p3 == 1 and p4 == 0 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x06, 0x6a, 0xf7}))

		if		l2 ~= 0 then doubleB1()
		elseif	l2 == 0 then allOff1()
		end

		if		l3 ~= 0 then doubleA2()
		elseif	l3 == 0 then allOff2()
		end

	p1click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p2click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p3click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p4click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	tabsWGp1:setVisible(false)
	tabsWGp2:setVisible(true)
	tabsWGp3:setVisible(true)
	tabsWGp4:setVisible(false)
	struct12:setVisible(true)
	clikSt12:setVisible(true)
	struct34:setVisible(true)
	clikSt34:setVisible(true)

-- 7 --bin0111
	elseif p1 == 1 and p2 == 1 and p3 == 1 and p4 == 0 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x07, 0x69, 0xf7}))

		if		l1 ~= 0 and l2 ~= 0 then bothOn1()
		elseif	l1 ~= 0 and l2 == 0 then doubleA1() 
		elseif	l1 == 0 and l2 ~= 0 then doubleB1()
		elseif	l1 == 0 and l2 == 0 then allOff1()
		end

		if		l3 ~= 0 then doubleA2()
		elseif  l3 == 0 then allOff2() 
		end

	p1click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p2click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p3click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p4click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	tabsWGp1:setVisible(true)
	tabsWGp2:setVisible(true)
	tabsWGp3:setVisible(true)
	tabsWGp4:setVisible(false)
	struct12:setVisible(true)
	clikSt12:setVisible(true)
	struct34:setVisible(true)
	clikSt34:setVisible(true)

-- 8 --bin1000
	elseif p1 == 0 and p2 == 0 and p3 == 0 and p4 == 1 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x08, 0x68, 0xf7}))

		if		l4 ~= 0 then allOff1() doubleB2()
		elseif	l4 == 0 then allOff1() allOff2()
		end

	p1click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p2click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p3click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p4click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	tabsWGp1:setVisible(false)
	tabsWGp2:setVisible(false)
	tabsWGp3:setVisible(false)
	tabsWGp4:setVisible(true)
	struct12:setVisible(false)
	clikSt12:setVisible(false)
	struct34:setVisible(true)
	clikSt34:setVisible(true)

-- 9 --bin1001//two separate checks here, other partial is already off//
	elseif p1 == 1 and p2 == 0 and p3 == 0 and p4 == 1 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x09, 0x67, 0xf7}))

		if		l1 ~= 0 then doubleA1()
		elseif	l1 == 0 then allOff1()
		end

		if		l4 ~= 0 then doubleB2()
		elseif	l4 == 0 then allOff2()
		end

	p1click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p2click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p3click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p4click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	tabsWGp1:setVisible(true)
	tabsWGp2:setVisible(false)
	tabsWGp3:setVisible(false)
	tabsWGp4:setVisible(true)
	struct12:setVisible(true)
	clikSt12:setVisible(true)
	struct34:setVisible(true)
	clikSt34:setVisible(true)

-- 10 --bin1010//two separate checks here, other partial is already off//
	elseif p1 == 0 and p2 == 1 and p3 == 0 and p4 == 1 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0a, 0x66, 0xf7}))

		if		l2 ~= 0 then doubleB1()
		elseif	l2 == 0 then allOff1()
		end

		if		l4 ~= 0 then doubleB2()
		elseif	l4 == 0 then allOff2()
		end

	p1click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p2click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p3click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p4click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	tabsWGp1:setVisible(false)
	tabsWGp2:setVisible(true)
	tabsWGp3:setVisible(false)
	tabsWGp4:setVisible(true)
	struct12:setVisible(true)
	clikSt12:setVisible(true)
	struct34:setVisible(true)
	clikSt34:setVisible(true)
	
-- 11 --bin1011//compare all only where both=1//
	elseif p1 == 1 and p2 == 1 and p3 == 0 and p4 == 1 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0b, 0x65, 0xf7}))

		if		l1 ~= 0 and l2 ~= 0 then bothOn1()
		elseif	l1 == 0 and l2 == 0 then allOff1()
		elseif	l1 ~= 0 and l2 == 0 then doubleA1()
		elseif	l1 == 0 and l2 ~= 0 then doubleB1()
		end

		if		l4 ~= 0 then doubleB2()
		elseif	l4 == 0 then allOff2()
		end

	p1click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p2click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p3click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p4click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	tabsWGp1:setVisible(true)
	tabsWGp2:setVisible(true)
	tabsWGp3:setVisible(false)
	tabsWGp4:setVisible(true)
	struct12:setVisible(true)
	clikSt12:setVisible(true)
	struct34:setVisible(true)
	clikSt34:setVisible(true)

-- 12 --bin1100
	elseif p1 == 0 and p2 == 0 and p3 == 1 and p4 == 1 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0c, 0x64, 0xf7}))

		if		l3 ~= 0 and l4 ~= 0 then allOff1() bothOn2()
		elseif	l3 ~= 0 and l4 == 0 then allOff1() doubleA2()
		elseif	l3 == 0 and l4 ~= 0 then allOff1() doubleB2()
		elseif	l3 == 0 and l4 == 0 then allOff1() allOff2()
		end

	p1click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p2click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p3click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p4click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	tabsWGp1:setVisible(false)
	tabsWGp2:setVisible(false)
	tabsWGp3:setVisible(true)
	tabsWGp4:setVisible(true)
	struct12:setVisible(false)
	clikSt12:setVisible(false)
	struct34:setVisible(true)
	clikSt34:setVisible(true)

-- 13 -- bin1101
	elseif p1 == 1 and p2 == 0 and p3 == 1 and p4 == 1 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0d, 0x63, 0xf7}))

		if		l1 ~= 0 then doubleA1()
		elseif	l1 == 0 then allOff1()
		end

		if		l3 ~= 0 and l4 ~= 0 then bothOn2()
		elseif  l3 == 0 and l4 == 0 then allOff2()
		elseif	l3 ~= 0 and l4 == 0 then doubleA2()
		elseif	l3 == 0 and l4 ~= 0 then doubleB2()
		end

	p1click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p2click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p3click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p4click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	tabsWGp1:setVisible(true)
	tabsWGp2:setVisible(false)
	tabsWGp3:setVisible(true)
	tabsWGp4:setVisible(true)
	struct12:setVisible(true)
	clikSt12:setVisible(true)
	struct34:setVisible(true)
	clikSt34:setVisible(true)

-- 14 -- bin1110
	elseif p1 == 0 and p2 == 1 and p3 == 1 and p4 == 1 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0e, 0x62, 0xf7}))

		if		l2 ~= 0 then doubleB1()
		elseif	l2 == 0 then allOff1()
		end

		if		l3 ~= 0 and l4 ~= 0 then bothOn2()
		elseif	l3 ~= 0 and l4 == 0 then doubleA2()
		elseif	l3 == 0 and l4 ~= 0 then doubleB2()
		elseif  l3 == 0 and l4 == 0 then allOff2()
		end

	p1click:setProperty("uiButtonTextColourOff","FF0E2B01", false)
	p2click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p3click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p4click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	tabsWGp1:setVisible(false)
	tabsWGp2:setVisible(true)
	tabsWGp3:setVisible(true)
	tabsWGp4:setVisible(true)
	struct12:setVisible(true)
	clikSt12:setVisible(true)
	struct34:setVisible(true)
	clikSt34:setVisible(true)

-- 15 -- bin1111
	elseif p1 == 1 and p2 == 1 and p3 == 1 and p4 == 1 then
	panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0f, 0x61, 0xf7}))

		if		l1 ~= 0 and l2 ~= 0 then bothOn1()
		elseif	l1 ~= 0 and l2 == 0 then doubleA1()
		elseif	l1 == 0 and l2 ~= 0 then doubleB1()
		elseif	l1 == 0 and l2 == 0 then allOff1()
		end

		if		l3 ~= 0 and l4 ~= 0 then bothOn2()
		elseif	l3 ~= 0 and l4 == 0 then doubleA2()
		elseif	l3 == 0 and l4 ~= 0 then doubleB2()
		elseif  l3 == 0 and l4 == 0 then allOff2()
		end

	p1click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p2click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p3click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	p4click:setProperty("uiButtonTextColourOff","FF1291DF", false)
	tabsWGp1:setVisible(true)
	tabsWGp2:setVisible(true)
	tabsWGp3:setVisible(true)
	tabsWGp4:setVisible(true)
	struct12:setVisible(true)
	clikSt12:setVisible(true)
	struct34:setVisible(true)
	clikSt34:setVisible(true)
	end
end

May 15, 2020 at 2:12 am#118410REPLY | REPORT | QUOTE



dnaldoog

Hi Spiffo,

I understand from your post that the upper four bits are always 0, right? I hope I understand correctly.

So, you just need to return the lower 4 bits and set the upper four to zero (automatically):


local switches={
panel:getComponent("OP1_ON_OFF"):getValue()*8,
panel:getComponent("OP2_ON_OFF"):getValue()*4,
panel:getComponent("OP3_ON_OFF"):getValue()*2,
panel:getComponent("OP4_ON_OFF"):getValue()*1,
}

local sum=0
for _,v in ipairs (switches) do
sum=sum+v
end
panel:getComponent(“OP_ON_OFF_BYTE”):setValue(sum,true)
May 15, 2020 at 2:18 am#118411REPLY | REPORT | QUOTE

--------------------------

The post will get deleted if I re-edit. What I meant was

dnaldoog wrote:
…and set the upper four to zero (automatically):

… and the upper four bits will automatically be set to zero.

**Note If this is a MIDI data byte the MSBit x000 0000 will always be set to zero anyway.

Regards,

--------------------

Actually, I just checked your code and it seems to work fine, so maybe I don’t understand the question completely?

May 15, 2020 at 9:07 am#118413REPLY | REPORT | QUOTE



spiffo

Yep

bit7, bit6, bit5 & bit 4 are always Zero, according to the Yamaha DX11 MIDI Spec
bit3, bit2, bit1 & bit 0 set Operators 1 to 4 On/Off

So the HEX value to send ends up with a Max of 0F and a Min of 00

My code was throwing up:

Error Message: No matching overload found, candidates: void setModulatorValue(CtrlrModulator&,int,bool,bool,bool)

I just change the line to:

panel:getModulatorByName(“OP_ON_OFF_BYTE”):setModulatorValue(byte93Int, true, true, true)

And now it works fine!

I’m not sure why there was a var in there, I must have copied that from somewhere else, they are all supposed to be a Boolean right?

Anyways thanks for your propmt help as always, learning as I go!

May 15, 2020 at 10:45 am#118414REPLY | REPORT | QUOTE


goodweather


Different things to improve:
– declare all your modulators in a separate AssignModulators() method instead of calling each time getModulatorByName(). Call that method from your PanelLoaded() method on panel init.
Later on, you can directly use those mod variables.
So:
in AssignModulators you have declarations like modOPOnOff = panel:getModulatorByName(“OP_ON_OFF_BYTE”)
then in your other methods you simply use modOPOnOff:setValue(byte93Int, true)
– this is actually the second improvement, use setValue() io setModulatorValue(). The last 2 args of setModulatorValue() are not used (saw that in another post)
– to get the value of a mod, simply do modOPOnOff:getModulatorValue(). You should not go through the component as indicated in dnaldoog code.

For the rest, indeed dnaldoog code is the right answer. Just take each value and multiply it by 8,4,2,1 according to the bit position then add everything and you get your final value.
