Moving Components with LUA #268  26 april 2021


Godlike-Productions 

I couldn't find how to do this on the old forums

If you need to move a component with LUA this code works.

mainText = panel:getModulatorByName("mainText")

mainText:getComponent():setTopLeftPosition(193, 35)



Dobo

You can get all properties of a component with

what(panel:getModulatorByName("modulator-2"):getComponent())

for example
