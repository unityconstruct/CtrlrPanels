Radio button in a modulator group needs a default setting
June 29, 2020


Tagged: Radio Button

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

Hi Damien,

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

Attachments:
Radio-1_1_0_Hell-O-Kitty_2020-06-29_18-57.panel
