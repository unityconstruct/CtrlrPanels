Atom March 2013

Don’t do setPropertyInt setPropertyString, setProperty() is enough Ctrlr will figure out what type it is (saves typing).

Also try to avoid calling panel:getModulatorByName() at runtime, this is the biggest mistake people make, in situation where you have hundreds or thousands of modulators in the panel (those static ones count too) Ctrlr needs to go through the table to find the one you want.

If you are done with designing your panel you can type somewhere in the init method for a panel

modulator1 = panel:getModulatorByName("modulator1")
component1 = modulator1:getComponent()
and then later in your code do

modulator1:setProperty("whatever", 0)
component1:getProperty("whatever")
saves time and typing.



Ok the theory behind arrays is very interesting, if anyone is interested: http://en.wikipedia.org/wiki/Array_data_structure

In Ctrlr as in most of software in the world all modulators are kepi in a single dimension linear array of size 0 – n where n = number of modulators, when you want to fetch a modulator as fast as possible, fetch it using it’s index, this is the fastest possible method of accessing memory in a computer, you get a pointer to that modulator and you can run methods on it etc.

When trying to access modulators via some other properties (for example their names). You need to go through the array checking each modulators property and comparing it to the name you passed. Now if the modulator is somewhere on top of the array it will be considerably fast but if you have an array of 1000 modulators and the one you are fetching is on the 999 place, that will take loads of time.

You can create an array of modulators that indexed using their names or some other properties, for that you need something called a Hash Table: http://en.wikipedia.org/wiki/Hash_table. That takes more memory but it speeds up looking for you data in memory. I did not implement a hash array for modulators, i thought about it, but it never happened. You can do some more research and if you can give me a good reason to implement a hash table for modulators i’ll do that.





How to know the index of a modulator (not the VstIndex as they are not the same). Something like panel:getModulatorByName():getIndex() ?

That’s a weird question, cause you don’t use indexes like that, you use that usually in a loop or something similar. The modulator is not aware of it’s index in the array, so getModulatorByName():getIndex() won’t work. I can add a method like that but it would be in the panel object. But if you do:

modulatorIndex = panel:getModulatorByName("name"):getIndex()
and then use modulatorIndex it makes no sense, since it’s better to fetch the modulator

modulator = panel:getModulatorByName("name")
and then use that object.
