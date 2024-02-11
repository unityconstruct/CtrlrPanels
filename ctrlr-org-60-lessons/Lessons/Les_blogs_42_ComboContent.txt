Atom (February 2016)

Well once you have the native JUCE comboBox object you can do anything with it:


c = panel:getComboComponent("modulator-1")

if c ~= nil then
combo = c:getOwnedComboBox()
combo:setText(string.format("Item %d", value), 0)
combo:clear(0)
combo:addItem (string.format("Item %d", value+1),1)
combo:addItem (string.format("Item %d", value+2),2)
combo:addItem (string.format("Item %d", value+3),3)
end

you can use any of the https://www.juce.com/doc/classComboBox methods on it


------------------------


August 25, 2015 at 2:32 pm

atom

There is a special method to control the Combo as a GUI only component, and you can change the contents of the combo without it doing anything else.

c = panel:getCombo(“myCombo”)
c:setText (“Value 1”, true)

(true means DONT send change message, this is the only place where JUCE has this the other way aroung, instead of true meaning YES SEND CHANGE message this is the other way around)


dasfaker

But this only DISPLAYS the new content in the combo, and as soon you click on the combo to show the list of elements, the new content is gone and the old list is still there.

---------------------------------------


atom (May 2013)

This is how i fill a combo with random 10 values

alterCombo = function(mod, value)
	myCombo = panel:getComponent("myCombo")

	comboContent = ""

	for i=1,10 do
		r = math.random(127)
		comboContent = comboContent..string.format("NUM:%d\n", r)
	end
	myCombo:setProperty ("uiComboContent", comboContent, false)
end


zeoka

Tried hours to understand and see what this gives

the 10 of i=1,10 is the number of values of the combo
you use random operation and display the result as a variabe you use %d , r (in this case) but i can’t apply to my needs
i need to put 5 names or 5 others not numbers. I fail to adapt.Thank you anyway
What define in LUA the number of values in the combo content??

I can put a text in a combocontent with LUA but not several corresponding to nb of values


atom

The point was to use “\n” as a separator between values

combo:setProperty ("uiComboContent", "Combo entry1\nCombo Entry2\nCombo Entry3", false)



You can refresh (repoaint) any component by calling it’s repaint() method (you can do that on the entire panel too, but remember this will cause a major CPU spike)

example

panel:getModulatorByname("modulator-1"):getComponent():repaint()
panel:getEditor():repaint()


do not repaint the panel unless you need to, it will cause major CPU usage.
It works, but it depends what are you repainting and if the data to repaint is valid. those calls are JUCE native, not implemented by me.



Hecticcc

If i understand correctly you have modulators that need different value mappings for a selected fx type?

You can try resetting the value content of the modulators before assigning new ranges/values.
IE setting the propery to an empty string (so the old values go away) before you assign the actual data it should hold (for the selected fx-type in your case).
This happens very fast, you don’t even see it glitching 😉

f you set the content to “” before assigning the actual values for uiFixedSliderContent it resets the value to the minimum.
You can use a variable to store the value temporarily and use that one to set the modulator’s value correctly.


---------------------------



April 23, 2012
stoecklem

I can’t figure out how to tell CTRL what sysex message to send for each individual selection in a combo drop down box. Its probably something simple I’m missing. I would appreciate some help.


atom

Depends what you want, if you want just a simple linear mapping for example 0-3, you’d type
[code:184kxxhq]
Option one
Option two
Option three
Option four
[/code:184kxxhq]

int the Combo content property, if you want to map some other MIDI values you just type "=" after the option for example
[code:184kxxhq]
Option one=0
Option two=32
Option three=64
Option four=127
[/code:184kxxhq]


It’s the same rule for FixedSliders/Buttons anywhere there is a "Content" property the same rules apply. In combos there are additional __SEPARATOR and __SECTION fields but leave those for now cause i’m not sure if they’re working right.



Atom (July 2012)

if modulator-3 is a Combo and value is the new value of the Combo i want, then this works for me:

[code:26mk4i04]
m = panel:getModulatorByName("modulator-3")
m:setValue(value,true)
[/code:26mk4i04]

[code:34kxmwbp]
m = panel:getModulatorByName("modulator-3")
m:setValueMapped(newValue,true)
[/code:34kxmwbp]

where newValue is the assigned value after the = in the combo contents not the index. You need to understand that the MAX value is the non-mapped count of values in a component not the max value you assign to a certain position in the component. It needs to be linear, actual numeric values are spread from 0 to MAX.




