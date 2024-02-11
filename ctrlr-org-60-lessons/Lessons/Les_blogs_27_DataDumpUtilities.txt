lua&demo panel question
-------------------------

June 17, 2013 
zeoka


Hi i have questions about the demo panel 'data dump utilities':
What is the number after “modulatorCustomIndex”, an index that defines this command ? Can we use several command that’s why there is an index ?
An index 0 could exist? ( in the rackattack panel i had set a timer id 0 may be that’s why there is errors ? )

Is it possible to use modulatorCustomIndexGroup instead? If yes how i can keep the same order? I ask this for multiple dumps with différents modulators?

Except that , the example is clear for me and can reduce strongly my panel script !

Just a last question o^O what is the console, i know it is evident , i’ve searched on lua website and nothing that explain why a console


atom

A console is used to quickly test Lua snippets and methods.

The number after the property name is the byte length of the written memory block; for values 0-127 one byte is enough, but for values larger then that you will have to use at least 2 bytes to store the value. The functions is defined as:

getModulatorValuesAsData(const String &propertyToIndexBy, const int bytesPerValue, const bool useMappedValues)

the propertyToIndexBy can be any property (you can set/add your own), the example uses modulatorCustomIndex because it’s a pre-defined property visible in the property pane. You can use the group property too sure.

The order is defined by the property, that’s the point if you index your modulators using the modulatorCustomIndex property 0-N then you will get a memory block of size N – 1 and position of the byte in the resulting MemoryBlock will be the same as the value of modulatorCustomIndex for each modulator

But these are only utility methods. there is more to come and a special demo panel for program management will be created. With all those methods documented.


zeoka

Thank you Atom !
So it is generally 1
If i use the group mod index then use custom mod index too or not ?
Exemple group 0 with custom index 0 to 100
group 1 with custom index 0 to 100 or index 101 to 200 ?
or custom groups without custom index ?
Can i combine the two ? if i use groups will i keep the same order ?

What’s happen if for ex : mod1=1(customindex) mod2=4 mod3=5 mod=6….
if there is unused bytes in the receiving dump message from unit ?


atom

If there are “holes” in indexing i thing Juce will fill them with zeros.

In this i doubt you’ll find a good reason to combine both groups and indexes, the groups were designed to be used with method for fetching modulators from the panel. For now there is only one method that does that, but it really doesn’t work with the groups property.

getModulatorsWildcard(const String &wildcardMatch, const bool ignoreCase)

The groups property is also something i’d like to use later when connecting Ctrlr to different control surfaces, via MIDI or OSC. Exporting parameters in groups helps to navigate through them.

Those two properties are sort of extras, or placeholders for whatever a clever panel developer can think of.

Like i said if you want you can assign your own properties to modulators with different names, this is just a “hint”.


zeoka

-“If there are “holes” in indexing i think Juce will fill them with zeros.”
Yes but it does not “take” last modulators corresponding to “holes”.

-setModulatorValuesAsData(“vstIndex”,1,false):setRange(8,20)

Is this possible ?


atom

1. what is missing in your memory block?

2. no, there are 2 methods

LMemoryBlock getModulatorValuesAsData(const String &propertyToIndexBy, const int bytesPerValue, const bool useMappedValues)

and

void setModulatorValuesFromData (const MemoryBlock &dataSource, const String &propertyToIndexBy, int bytesPerValue, const bool useMappedValues)

What would setRange(8,20) do anyway ?


zeoka

I’ ve taken your exemple and change custom indexes
mod1 0, mod2 5, mod3 6 , mod4 7 , mod5 8 , mod7 9
I have 7f(mod1 value) 00 00 00 00 7f(mod2 value) and it miss mod3 to mod7.

A solution could be to make dummy mods

I need setRange to choose indexes i want ex :vstindex 8 to 20

data=setModulatorValuesFromData(“vstIndex”,1,false):setRange(8,20) ?
I want set only a rang of index not possible ?


atom

You can’t do that:

data=setModulatorValuesFromData(“vstIndex”,1,false)
realData = data:getRange(8,20)


zeoka

Hi
i tried this :

myNewMethod = function(midi)

vendor = midi:getLuaData():getByte(1)
 model = midi:getLuaData():getByte(2)
  typ1 = midi:getLuaData():getByte(4)
  typ2 = midi:getLuaData():getByte(5)
  typ3 = midi:getLuaData():getByte(6)
   if vendor == 62 and model == 17 then 
      if typ1 == 16  and typ3 == 0 then  
 i0to13 = midi:getLuaData():getRange(7,14) 
i16to23 = midi:getLuaData():getRange(23,8)
i26to33 = midi:getLuaData():getRange(33,8)
i36to50 = midi:getLuaData():getRange(43,15)
i53to67 = midi:getLuaData():getRange(60,15)
i69to73 = midi:getLuaData():getRange(76,5)
i75to83 = midi:getLuaData():getRange(82,9)
i85to91 = midi:getLuaData():getRange(92,7)
    i94 = midi:getLuaData():getByte(101)
sound01 = MemoryBlock(string.format("%s %s %s %s %s %s %s %s %s", i0to13:toHexString(1),i16to23:toHexString(1),i26to33:toHexString(1),
i36to50:toHexString(1),i53to67:toHexString(1),
i69to73:toHexString(1),i75to83:toHexString(1),i85to91:toHexString(1),i94:toHexString())) 
panel:setModulatorValuesFromData (sound01, "vstIndex", 0, 1, false)
  elseif typ1 == 16  and typ3 == 1 then
 i0to13 = midi:getLuaData():getRange(7,14) 
i16to23 = midi:getLuaData():getRange(23,8)
i26to33 = midi:getLuaData():getRange(33,8)
i36to50 = midi:getLuaData():getRange(43,15)
i53to67 = midi:getLuaData():getRange(60,15)
i69to73 = midi:getLuaData():getRange(76,5)
i75to83 = midi:getLuaData():getRange(82,9)
i85to91 = midi:getLuaData():getRange(92,7)
    i94 = midi:getLuaData():getByte(101)
sound02 = MemoryBlock(string.format("%s %s %s %s %s %s %s %s %s", i0to13:toHexString(1),i16to23:toHexString(1),i26to33:toHexString(1),
i36to50:toHexString(1),i53to67:toHexString(1),
i69to73:toHexString(1),i75to83:toHexString(1),i85to91:toHexString(1),i94:toHexString())) 
panel:setModulatorValuesFromData (sound02, "vstIndex", 82, 1, false)
     end
  end
end

I have a problem with sound01 variable that doesn’t work at all

The last line is taken from the mopho “panel:setModulatorValuesFromData (unpackedData, “modulatorCustomIndex”, 0, 1, false)” and modified but not sure the first number is the index starting number . i don’t know what it is
Any idea ?

-midi:getLuaData():getRange(92,7) or midi:getLuaData():getByte(101) gives hexstrings ?
-setModulatorValuesFromData wants data ? but accepts hexstrings ?
-do i need to convert hexstring to data ?

Saw the” Data dump utility” panel and tried this :

 myNewMethod = function(midi)

vendor = midi:getLuaData():getByte(1)
 model = midi:getLuaData():getByte(2)
  typ1 = midi:getLuaData():getByte(4)
  typ2 = midi:getLuaData():getByte(5)
  typ3 = midi:getLuaData():getByte(6)
 txt =panel:getComponent("modulator-1")
   if vendor == 62 and model == 17 and typ1 == 16 then 
      i0to13 = midi:getLuaData():getRange(7,14) 
     i16to23 = midi:getLuaData():getRange(23,8)
     i26to33 = midi:getLuaData():getRange(33,8)
     i36to50 = midi:getLuaData():getRange(43,15)
     i53to67 = midi:getLuaData():getRange(60,15)
     i69to73 = midi:getLuaData():getRange(76,5)
     i75to83 = midi:getLuaData():getRange(82,9)
     i85to91 = midi:getLuaData():getRange(92,7)
         i94 = midi:getLuaData():getByte(101)
        txt:setText(string.format("%s %s %s %s %s %s %s %s", i0to13:toHexString(1),i16to23:toHexString(1),i26to33:toHexString(1),i36to50:toHexString(1),i53to67:toHexString(1),i69to73:toHexString(1),i75to83:toHexString(1),i85to91:toHexString(1)))
       sound = MemoryBlock(txt:getText())
       if typ3 == 0 then  
         panel:setModulatorValuesFromData (sound, "vstIndex",0, 1, false)
-- not working (see the picture) 
    elseif typ3 == 1 then  
        txt:setText(string.format("%s %s %s %s %s %s %s %s", i0to13:toHexString(1),i16to23:toHexString(1),i26to33:toHexString(1),i36to50:toHexString(1),i53to67:toHexString(1),i69to73:toHexString(1),i75to83:toHexString(1),i85to91:toHexString(1)))
    elseif typ3 == 2 then  ................  
-- i can get texts formats , that's working 

This is not working and on the demo panel too :

Attachments:

Screenshot_16.png
Screenshot_17.png


atom

I fixed that panel, i added an option and forgot to updat the DEMO, it should be woring in the SVN repo.


zeoka

Cool
Just to clarify the first INT is what ?
I Wonder it is the starting index number
Then i could use range of index to get midi dump for each sounds
What is SVN repo ?


atom

SVn repo is a place i keep my source files, and those are the latest available, the DEMO panels are part of source code so they are also the latest, there is a link to it on the Downloads->Ctrlr page, here it is again:
http://sourceforge.net/p/ctrlrv4/code/HEAD/tree/


zeoka

Thank you Atom !
It seems working now !
But it seems very high cpu usage because simple methods like setText are not working: maybe they are displayed too fast
Other thing i have a delay because all 1968 mods are updated in same time
I’ve compared a few RackAttack&Ctrlr values after received a whole prog (all sounds)
and it’s ok. i must find RA users now to check totally .
I will gain more than 200kb of script if all is ok !

Here is my method :

Attachments:

Screenshot_18.png


atom

what do you mean setText is not working ? in the DEMO panel or in your panel ?


zeoka

This is my panel
First my lcdlabel produce a nil with setText and a normal label not (not a big probl.)
second the problem is the method setModulatorValuesFromData : Ctrlr get busy and i can’t display dump progression (sound01,sound02…)
Only the last text is displayed and all mods are set at once .My old method takes less cpu and works fine (since i changed the fx structure the dump never crashes) but takes 283 kb so would reduce it strongly
I don’t know what i will do….

The RA sends dumps with 90-100 ms between each dump


atom

The LCDLabel issue is there, i fixed it (the class was not registered in Lua). The new nightly build will containt the fix


zeoka

i’ve reduced my code to the max for sound dump
the problem is the same Ctrlr is too busy to do anything else than assign value to mods
Atom is there a way to improve that or stay with the old method : assign values to mods 1 by 1

 myNewMethod = function(midi)

vendor = midi:getLuaData():getByte(1)
 model = midi:getLuaData():getByte(2)
  typ1 = midi:getLuaData():getByte(4)
  typ2 = midi:getLuaData():getByte(5)
  typ3 = midi:getLuaData():getByte(6)
   txt = panel:getComponent("modulator-1")
  lbl2 = panel:getComponent("Current Value")
    if vendor == 62 and model == 17 and typ1 == 16 then
        i0to13 = midi:getLuaData():getRange(7,14) 
       i16to23 = midi:getLuaData():getRange(23,8)
       i26to33 = midi:getLuaData():getRange(33,8)
       i36to50 = midi:getLuaData():getRange(43,15)
       i53to67 = midi:getLuaData():getRange(60,15)
       i69to73 = midi:getLuaData():getRange(76,5)
       i75to83 = midi:getLuaData():getRange(82,9)
       i85to91 = midi:getLuaData():getRange(92,7)
           i94 = midi:getLuaData():getByte(101)
         sound = MemoryBlock(string.format("%s %s %s %s %s %s %s %s %.2x", i0to13:toHexString(1),i16to23:toHexString(1),i26to33:toHexString(1),i36to50:toHexString(1),i53to67:toHexString(1),i69to73:toHexString(1),i75to83:toHexString(1),i85to91:toHexString(1),i94))
                 panel:setModulatorValuesFromData(sound, "vstIndex", CtrlrPanel.EncodeNormal, (typ3 * 82), 1, false)
              if typ3 <= 8 then
                 txt:setText (string.format("Sound 0%s",typ3 + 1))
            else 
                 txt:setText (string.format("Sound %s",typ3 + 1))                 
             end
elseif vendor == 62 and model == 17 and typ1 == 21 then 
        i0to12 = midi:getLuaData():getRange(7,13)
       fx1and2 = MemoryBlock(string.format("%s",i0to12:toHexString(1)))
         i0to8 = midi:getLuaData():getRange(7,9)
           i10 = midi:getLuaData():getByte(17)
       fx3and4 = MemoryBlock(string.format("%s %.2x",i0to8:toHexString(1),i10))
              if typ3 == 0 then
                 panel:setModulatorValuesFromData(fx1and2, "vstIndex", CtrlrPanel.EncodeNormal, 1968, 1, false)
          elseif typ3 == 1 then
                 panel:setModulatorValuesFromData(fx1and2, "vstIndex", CtrlrPanel.EncodeNormal, 1981, 1, false)
          elseif typ3 >= 2 then
                 panel:setModulatorValuesFromData(fx3and4, "vstIndex", CtrlrPanel.EncodeNormal, 1994, 1, false)
          elseif typ3 >= 3 then
                 panel:setModulatorValuesFromData(fx3and4, "vstIndex", CtrlrPanel.EncodeNormal, 2004, 1, false)
             end
  end
end


atom

Well this method is just a utility method to set modulator values quickly from a MemoryBlock, it happens in the main thread so it will block the UI and since that change causes any component attached to the modulator to get repainted it will cause a CPU spike, if there is a lot of stuff to change it will have to take a moment. I’ll have to think if it can be done better but i doubt it.


zeoka

Yes all works in fact but not refreshed
I tried to have a monitoring of label with the console :

txt:setText (string.format(“Sound 0%s”,typ3 + 1))
mon = txt:getText()
console(“mon = “..mon)
not sure it is correct…. but your explanation is clear

Anyway i have pleasure to use Ctrlr to make sound and music !

Thank you.

Ok i got the new method working very well on other panel that have only 1 sound params integrated (82).
Replaced :
panel:setModulatorValuesFromData(sound, “vstIndex”, CtrlrPanel.EncodeNormal,
(typ3 * 82), 1, false)
by
panel:setModulatorValuesFromData(sound, “vstIndex”, CtrlrPanel.EncodeNormal,
0, 1, false)

All 24 sounds go to sound 1 , and text is displayed fine

So my question is What this first INT ( i know about the last INT : the nb of byte to assign to modulator, by one byte most of time) ????

From what you see i’ve done , i believed this first INT was the starting vstindex nb ?

Can you confirm please ?? May be i was wrong….


Ok the method is working with a new panel
it seems layer changes on old panel blocks the ui i keep the old method for it
and use the new one with the new panel

This new method is very interesting for multimbral synths


&&&&&&&&&&&&&&&&&&&&&&
Add a parameter to : getModulatorValuesAsData() method
----------------------------------------------------------

August 5, 2014
zeoka

Hi Atom
Is this possible to add a range value to your method :
panel:getModulatorValuesAsData(PROPERTY, CtrlrPanel.EncodeNormal, START INDEX,RANGE, false) ??
This is complicated without.. even that doesn’t work as your panel example
There is no problem with the inverse method : setModulatorValuesFromData()


atom

What range would that be ? Range of modulators, range of property values ?

Also, the return value of the call is a MemoryBlock you can cut it up as you wish (take only parts of it).


zeoka

Yes a range indexes or prop values
ex : start from index 3 , up to index 6
panel:getModulatorValuesAsData(“vstIndex, CtrlrPanel.EncodeNormal, 3,3, false)

Actually my 3 last mods have index 7,8,9 and not exported
except a custom mod with index 10
I do panel:getModulatorValuesAsData(“vstIndex, CtrlrPanel.EncodeNormal, 7, false)
the result is not ex : 00 7f 50
but something like ff 00 00 00 00 00 00 00 00 ……………………………….

even that could be practicle to do other “call bytes” with other mods


atom

I’ve add a third variation for this method:

LMemoryBlock CtrlrPanel::getModulatorValuesAsData(const String &propertyToIndexBy,
                                                    const CtrlrByteEncoding byteEncoding,
                                                    const int propertyValueStart,
                                                    const int howMany,
                                                    const int bytesPerValue, 
                                                    const bool useMappedValues)
it should do what you asked for

&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

getModulatorValuesAsData strange behaviour
-----------------------------------------


t0f4st (August 2016)

i think with this implementation it will be possible to add/remove modulators and the data is still be usable. *i dont care about the unused memory 🙂

LMemoryBlock CtrlrPanel::getModulatorValuesAsData(const String &propertyToSortBy, const CtrlrByteEncoding byteEncoding, const int bytesPerValue, const bool useMappedValues)
{

	int minIndex = 999999;
	int maxIndex = 0;

	for (int i=0; i<getNumModulators(); i++)
	{
		const int index = getModulatorByIndex(i)->getProperty(propertyToSortBy);

		if (index >= 0)
		{
			if (index > maxIndex)
				maxIndex = index;
			if (index < minIndex)
				minIndex = index;
		}
	}

	MemoryBlock modulatorData (maxIndex * bytesPerValue, true);
	uint32 modulatorValue;

	for (int i=0; i<getNumModulators(); i++)
	{
		const int index = getModulatorByIndex(i)->getProperty(propertyToSortBy);

		if (index >= 0)
		{
			if (useMappedValues)
				modulatorValue = getModulatorByIndex(i)->getValueMapped();
			else
				modulatorValue = getModulatorByIndex(i)->getValueNonMapped();

			modulatorData.setBitRange (index * (bytesPerValue * 8), bytesPerValue * 8, modulatorValue);
		}
	}

	return (modulatorData);
}


goodweather

Thx for the explanation!
I didn’t know this serializing/parsing of all modulators. Can indeed be useful.
On my side, I rely on the sysex dumps from the synth manufacturer and I load/save based on their structure.
Maybe that, as a workaround, you can read the vstindex and value of each modulator and set them one by one with the simple setValue?


atom

is the code above a patch you would like to add to Ctrlr ? can you explaing what’s going on there ?


t0f4st

current usecase:

you have a panel with some modulators. during panel designing you delete and add some new modulators. this will lead to vstIndex’s which aren’t continously (0,1,2,3,4,5,6) rath discontinuity (0,1,2,5,6,100,102,..).

with this panel design scenario in mind data = panel:getModulatorValuesAsData("vstIndex", CtrlrPanel.EncodeNormal, 1, false) will not result valid data !!!

problem is the current getModulatorValuesAsData implementation! the method is expecting and requiring that the propertyToIndexBy is continously!

with the following getModulatorValuesAsData implementation the method call data = panel:getModulatorValuesAsData("vstIndex", CtrlrPanel.EncodeNormal, 1, false) will result in valid data, althought it has alot of unused space – which i dont mind.

first it gets the maximum vstIndex of all modulators used in panel.
with that info it creates an memoryblock with the size equal to the maximum vstIndex.

then the loop starts to iterate through all modulators in panel.
read the moduatorValues and store it in the memoryblock at the position defined by the vstIndex of the modulator.

t0f4st wrote:
i think with this implementation it will be possible to add/remove modulators and the data is still be usable. *i dont care about the unused memory ?

LMemoryBlock CtrlrPanel::getModulatorValuesAsData(const String &propertyToSortBy, const CtrlrByteEncoding byteEncoding, const int bytesPerValue, const bool useMappedValues)
{

	int minIndex = 999999;
	int maxIndex = 0;

	for (int i=0; i<getNumModulators(); i++)
	{
		const int index = getModulatorByIndex(i)->getProperty(propertyToSortBy);

		if (index >= 0)
		{
			if (index > maxIndex)
				maxIndex = index;
			if (index < minIndex)
				minIndex = index;
		}
	}

	MemoryBlock modulatorData (maxIndex * bytesPerValue, true);
	uint32 modulatorValue;

	for (int i=0; i<getNumModulators(); i++)
	{
		const int index = getModulatorByIndex(i)->getProperty(propertyToSortBy);

		if (index >= 0)
		{
			if (useMappedValues)
				modulatorValue = getModulatorByIndex(i)->getValueMapped();
			else
				modulatorValue = getModulatorByIndex(i)->getValueNonMapped();

			modulatorData.setBitRange (index * (bytesPerValue * 8), bytesPerValue * 8, modulatorValue);
		}
	}

	return (modulatorData);
}


goodweather wrote:
Maybe that, as a workaround, you can read the vstindex and value of each modulator and set them one by one with the simple setValue?

yeah, i already though about that manual looping and parsing but it is very slow!

atom wrote:
is the code above a patch you would like to add to Ctrlr ? can you explaing what’s going on there ?

will you implement it in the next built?


atom

yes i’ll just do it a bit better, i’ll iterate till the end and just NOT return those modulators that are currently NULL, the modulator table just has “holes” in it, but i’ll skip over the holes and return all the modulators that have the vstIndex smaller then the passed in largest index. will that be ok ?

please post this as a bug on github i’ll have that on my list
