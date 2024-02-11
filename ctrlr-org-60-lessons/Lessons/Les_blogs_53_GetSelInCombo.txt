DnaldeT 5 maart 2021

Does this work?

comboId = panel:getcombo(name):getSelectedId()

If comboId == 0 then
-- do something
end

Or you have to use getSelectedItemIndex, can't remember.


Godlike-Productions


That will work.

This is my entire method.

I'm not sure if there is an index method as well, because Id is essentially Index.

updatePatchName = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)

    local patchSelected = panel:getCombo("upperProgramCombo"):getSelectedId()
    patchNameLabel:getComponent():setPropertyString ("uiLabelText", jupiterBank[patchSelected].name)

end



dnaldoog

Here are a few functions I use:


function returnComboSelectedItemIndex(myCombo)
	-- Your method code here
    local c = panel:getComboComponent(myCombo)
        local combo = c:getOwnedComboBox()
return combo:getSelectedItemIndex()
end

function returnComboElementCount(myCombo)
	-- Your method code here
return panel:getModulatorByName(myCombo):getProperty("modulatorMax")
end

function returnSelectedPatchNameFromCombo(myCombo)
	-- Your method code here
    local c = panel:getComboComponent(myCombo)
        local combo = c:getOwnedComboBox()
            return combo:getText() 
end


Godlike-Productions

Also Atom gives some good examples of multi level combos in the DEMO - popup menu panel, which comes with ctrlr

dobo365

As usual, the full list of capabilities can be found in the Juce API.
Look at: https://docs.juce.com/master/classComboBox.html
But this is also a full model and you need to check what has been ported to Ctrlr by testing the different methods/functions.


Godlike-Productions

I still get confused with the c++ coding from Juce.

I can never remember if comboBox::getSelectedId() ends up as comboBox.getSelectedId or comboBox:getSelectedId, and where we end up with brackets etc in LUA, though this is more due to my lack of knowledge, than a lack of documentation.

My search strategy is

Is there an example in ctrlr?
Is there an example in LUA? Yes - will it work in 5.1? Does it rely on a module like LuaJIT?
Is it documented in Juce?
