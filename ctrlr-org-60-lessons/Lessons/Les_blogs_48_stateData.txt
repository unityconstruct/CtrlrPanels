atom (November 2014)

stateData is not a MemoryBlock but a ValueTree, you now have the built in debugger, so just put pause(“break”) in the restore method to see what you are getting as parameters to the method.



This is how i suspect you should use the ValueTree class (works for me without errors)

>>> vt = ValueTree("data")
>>> vt:setProperty ("property1", "value")
ERROR: No matching overload found, candidates:
ValueTree& setProperty(ValueTree&,Identifier,var const&,custom [N4juce11UndoManagerE]*)

>>> vt:setProperty ("property1", "value", nil)

>>> vt:setProperty ("property2", 2, nil)

>>> console (vt:toXmlString())
<?xml version="1.0" encoding="UTF-8"?>

<data property1="value" property2="2"/>




atom (december 29 2014)

I have no idea what you are doing here

if you want to set a property you set it bu it’s name, so:

stateData:setProperty (“myPropertyName”, PatchDataCurrent1:toHexString(1), nil)

and when you want to read it then:
stringHexData = stateData:getPropertyName(“myPropertyName”)

now stringHexData contains the string of hex numbers you need to convert to real data.




The panel tree is not flushed to disk with every save, it’s only updated in memory, if you want to flush it to disk you do save ctrlr state (this is the equivalent of saving your project when host ctrlr as a VST). This is done for performance reasons.


dasfaker (April 2016)

Ctrlr: Closing the panel don’t save the stateData. You should do Ctrl+Alt+S (save Ctrlr state) or close Ctrlr with the panel opened to save stateData

Exported Instance Standalone: Closing the instance saves stateData

Exported Instance VST: Saving the DAW project save the stateData.

The state of every modulator is saved in those cases. If you need to store other data (memoryBlocks, variables…) you need to use “Called when Ctrlr state is saved” to store data and “Called when Ctrlr is loaded” to retrieve data.


goodwheater (April 2016)

While waiting to get an answer to my questions in the previous post, I made a test panel for stateData and it works indeed exactly as dasfaker mentioned:

    keeping the panel open and closing Ctrlr saves the stateData
    closing the panel and re-opening it doesn’t save the stateData

Feel free to try with attached panel. You can edit 2 labels, 1 push button and one rotary button. You can also reset the stateData values to see that they are indeed changing.

One way to force the user to close Ctrlr is to hide the panel menu…
Does anyone have some other suggestion?


dasfaker (April 2016)



MemoryBlocks have to be stored like this

stateData:setProperty (“LoadedProgramData”, LoadedProgramData:toHexString(1), nil)


goodwheater (May 2016)

It is working now. Thanks dasfaker, you put me on the way 🙂

Explanation: stateData is saving strings so you need to convert objects like memoryblock to a string but on restore also do the opposite.
I saw this because when using toHexString on Save stateData it didn’t work and by using what(LoadedProgramData) I saw it was a string…

So:

    For memoryblock save, use:

    stateData:setProperty (“LoadedProgramData”, LoadedProgramData:toHexString(1), nil)

    For memoryblock restore, use:

    LoadedProgramData = MemoryBlock()
    LoadedProgramData:loadFromHexString(stateData:getProperty("LoadedProgramData"))

I’ll add this in the Step by Step guide 2.0 as it is needed by panel makers…

Possemo in answer:

Hi, have you found out how you can permanently save stateData? I’m just trying out and it stores the stateData when I save the panel (see screenshot). But when I close and reopen Ctrlr two times it is gone. As you said, when you close the panel within Ctrlr it is gone already. Also when you export the panel to *.bpanelz it is gone as well. Seems to be quite volatile.. :-{} or is this only meant to be used in the vst-plugin version?

It works when exporting to *.bpanelz. I don’t know why I didn’t noticed it yesterday. It is as you say goodweather, when you close the panel within Ctrlr it is gone. Moreover, when you start and close Ctrlr two times it is gone as well (all parameters zeroed). At least this is the behavior of my SuperJX panel in Ctrlr standalone ver.


goodwheater (mei 2020)

You can achieve this with stateData. StateData is kept in the Ctrlr cache.

Create a method SaveStateData to store the data you want to keep. Example:

--
-- Called when data needs saving
-- StateData is saved when the user press Ctrl+Alt+S (Save Ctrlr StateData in the menu)
-- or when quitting Ctrlr while leaving the panel open.
-- At that time all modulators indicated as Dynamic are saved but by using this method 
-- it is possible to also save values of variables that can then be read when loading the panel
--
SaveStateData = function(--[[ ValueTree --]]stateData)

	-- Saving the last file loaded/saved so it can be reloaded at panel load
	-- This is needed to have all uiLabels restored
	-- If a uiLabel is set to Dynamic instead of Static then it is its value - 0 - and not its uiLabelText property that is saved
	-- Therefore, obliged to keep all uiLabels as Static and to reload the last file
	stateData:setProperty ("LastFileFullPath", sLastFileFullPath, nil)
	stateData:setProperty ("LastFileName", sLastFileName, nil)
	stateData:setProperty ("RootFolder", currentRootFolder, nil)

end

Create a method to read your stateData and put the values in variables. Example:

--
-- Called when data is restored
--
ReadStateData = function(--[[ ValueTree --]] stateData)

	-- Variables to be read
	sLastFileFullPath = stateData:getProperty("LastFileFullPath")
	sLastFileName = stateData:getProperty("LastFileName")
	currentRootFolder = stateData:getProperty("RootFolder")

end

In panel properties, set
Called when Ctrlr state is saved: SaveStateData
Called when Ctrlr is loaded: ReadStateDate

In your PanelLoaded method, you need to check if the StateDate has been restored or not. Yep, it is sometimes failing… Example:

-- Check restored statedata and, if found, inform timer to reload file to secure all uiLabels are correctly set
if sLastFileFullPath == nil or sLastFileFullPath == "" then
	sLastFileFullPath = ""
	sLastFileName = ""
	bLastFile = false
else
	-- if stateData is working then sLastFileFullPath, sLastFileName should have been restored correctly
	-- Check if file has not been moved or been deleted
	f = File(sLastFileFullPath)
	if f:existsAsFile() then
		bLastFile = true
	else
		sLastFileFullPath = ""
		sLastFileName = ""
		bLastFile = false
	end
end

Last info: please be aware that StateData is only saved when the user quit Ctrlr by keeping the panel open. Thus not when simply closing a panel. A bit tricky and for sure not perfect.
Good luck!


dnaldoog (mei 2020)

Hi computerchemist,

You can store a lua table as a JSON like string:

This is in my JD-990 panel:

ccMapArray is an table of modulator names as values with CC numbers as keys. The user can build a set of pairings for controlling the panel -> synth from a keyboard.

So I have for example a modulator I named TVFCUTFR, which is the JD-990 TVF cutoff. I want to save a mapped cc number, for example 41, to that modulator on reload, along with any other pairing.

I can save this using stateLData:addChild instead of Goodweather’s stateData:setProperty by creating a new ValueTree object called ccMapping. Here I use the modulator name as a hash/key, but you could just as easily store an index too, I guess.

First I check that the table is not empty otherwise bad things happen.


SAVE CC MAPPING ARRAY TO stateData:child

if not rawequal(next(ccMapArray), nil) then
	
	local aoc=ValueTree("ccMapping")
	for k,v in pairs (ccMapArray) do
		aoc:setProperty (tostring(v),tostring(k), nil) 
	end
	stateData:addChild (aoc, -1, nil)
	
end -- table not empty

To read that ValueTree table back into Ctrlr on reload:


mi=stateData:getChildWithName("ccMapping")
for i=0,mi:getNumProperties()-1 do
	local k=mi:getPropertyName(i) -- k is the name of the control
	local v=mi:getProperty(k) -- v is the cc number
	ccMapArray[tonumber(v)]=k -- re-populate ccMapArray with data
end

Note: In my case I am reading the value back in as the key to my table. You probably would keep it the same as how it was saved, i.e.


	local k=mi:getPropertyName(k) -- k is the name of the control
	local v=mi:getProperty(i) -- v is the cc number
	ccMapArray[tonumber(k)]=v -- re-populate ccMapArray with data

I don’t seem to be checking whether mi exists . Maybe don’t have to? And mi should probably be declared local.

What Goodweather suggested is stored as <panelCustomData></panelCustomData> and <ccmapping /> will be stored within that node as XML Attributes. (I looked this all up on XML, so I may have the terminology wrong)


<panelCustomData graphlinecolour="4282400832" envbackgroundbrightness="0" <ccMapping WGBENDSW="0" WGPICHRN="10" TVFCUTFR="41"/></panelCustomData></panel>

I would leave it to you to work out how to do this with a three dimensional array or table in lua speak, but it must be doable!



    computerchemist wrote:

    Why not store the sysex dump which is a MemoryBlock prior to writing, I could treat the save state as a thrid way of storing sysex. Duh. On it now… 😀

Or just do it that way!!!


x=function()
str="F0 43 12 03 00 00 57 f7" 
m=MemoryBlock()
m:loadFromHexString(str)
end


save = function(--[[ ValueTree --]]stateData)
stateData:setProperty ("mylongsysexdump", m:toHexString(1), nil)
end

P.S. unless you need those hash key or value names recorded …


damiensellier
on 11 May 2021

Hi,
I worked with stateData to save user banks informations and the last preset parameters before quiting the app.
It works very well but if ever I work on a project with cubase hosting my panel as a vst, the stateData valuetree will be the same for whatever session I am working on. So if I work on 2 different cubase projects the recall will be the same for both projects.
stateData is more fitted to save global panel values. It's perfect for user banks or global settings (midi i/o, paths etc)

Is there a way to save a memoryblock containing an hexstring of the program parameter values inside a Cubase or any DAW session file?
I thought about making an invisible uiLabel containing the program sysex dump hex string, this modulator's property "export parameter to VST host" would be set to "export", then it should be saved by the host as a VST parameter value?
On launch This would make it possible to get the string from this label and send it back to the machine this way the program is entirely saved within the host session. I am not sure about how it really works between datas stored by the host and the ctrlr plugin instance.

Is it the proper way to go or do you have another common practice for that?

Thanks for your insight, have a nice day.

Damien

EDIT:

    After trying multiple ideas I came to the conclusion that this saveData function is not that much related specifically to the VST host. Sure it's a trick to save the last state of the panel and recall it, but it's just a property value of the panel so if you work on several projects You'll recall the latest state of the pannel whatever session you're in and that's it. There must be a way to recall a memoryblock stored in the plugin prefs within the host session like any other plugins. But I really don't know how it works.
    As a VST plugin my panel doesn't send the midi messages I execute in my LuaPanelLoaded script. In Ctrlr App it's working. Is it normal?
    As a VST plugin is the LuaPannelLoaded before or after the LuaPannelRestoreState ?

Thanks ;)


dobo365

My 2c ;-)

    Im using State Data but only to save single values not entire memoryblocks. As you know, the state data is coming in the temp file of the panel. So you could save one patch but not a complete bank
    what I'm then doing is storing a variable with the full path of the last saved file and I load it at panel opening (or an Init patch if not found). Loading a patch automatically at panel opening is made optional by a switch the user can set.
    I also store full pathnames for each bank that the user loaded in the librarian so I know which bank has been loaded in which slot
    I spent quite a time earlier this year (or was it last year) to identify the order of things at startup and where to put what. In my Pro-2 panel I had the bank restore in PanelLoaded but I realized with my Prologue panel that it was not working well. I also discovered that ReadStateDate was called 2 times, once before PanelLoaded and once after. It is only after the second time that the variables are restored. This is the reason I re-ordered things (and I still need to do that in the Pro-2 panel)

Here is the order I have in my Prologue panel:

    PanelLoaded: call for different Init methods + AssignModulators + check button positions on panel. At the end I call a timer 50ms
    in Timers, my 50ms timer is directly stopped. Meanwhile, ReadStateDate has done its job. I do some further initializations (and optionaly can load a patch or init patch) then I start another 200ms timer (time needed to have all controls processed without displaying something in my LCD)
    in Timers, I stop the 200ms timer directly and then I initialize / restore the patch banks. I also show the welcome message

I would recommend to not use snapshots. I read somewhere that it was a technique developed and used to store patches but that it has not been developed further. Maybe it works fine. I don't know.

I have no issue in all my panels to send/receive Midi messages in standalone or in VST using sendMidiMessageNow(). Simple sysex or full patches.
In VST, when using the panel 2 times on different tracks, each track keeps its patch at project reload.

Hope this will help you a bit...



damiensellier
28 days ago
Author

Thanks @Godlike-Productions and @dobo365 for your answers I finally have some answers and have it working properly.
Beforehand I investigated like Dominique about the order of function calls on startup.
I made a script with flags for each steps triggered with a timer. And from what I can see I can confirm LuaPannelLoaded
happens after LuaPannelRestoreState. So from my experience LuaPannelRestoreState happened first then LuaPannelLoaded second. Not sure if LuaPannelLoaded is executed twice though like @dobo365 said but it would explain why init settings are read twice.

I cannot get the initial messages sent via LuaPannelLoaded in the plugin version. I really don't know why, but I work with the latest macos version and there's some bugs...
So I set some timers and let 1000ms before the initial messages sent from the LuaPannelRestoreState script. And it worked first try.

LuaPannelSaveState is definitely a bridge to the host to store some values in the session files.
I stored the current Program Sysex (316bytes) as a MemoryBlock and restored it on launch without any issues.

To save the MemoryBlock as an hex string in the valueTree:

SaveStateData = function(--[[ ValueTree --]]stateData)
	if  MbLastUsedProgram ~= nil then
		stateData:setProperty ("LastUsedProgram", MbLastUsedProgram:toHexString(1), nil)
	end -- if
end -- function

To read the hex string in the valueTree and convert it to a MemoryBlock:

ReadStateData = function(--[[ ValueTree --]] stateData)
	if stateData:hasProperty("LastUsedProgram") == true then
		MbLastUsedProgram = MemoryBlock()
		MbLastUsedProgram:loadFromHexString(stateData:getProperty("LastUsedProgram"))
	end -- if
end -- function

Et voilà! Different sessions either from a VST host or from Ctrlr App don't intefere and I can have several projects running at the same time and the values are restored properly without being messed up.

Thanks a lot for your help to both of you.

Damien



Godlike-Productions

Donimique,

Do you know the order that things are executed regarding:

panelLoaded
panelBeforeLoad (before Panel Loaded I assume, but where in relation to the others?)
luaPanelResourcesLoaded
luaPanelRestoreState (when is this automatically called the first time)

damiensellier

Hi @dobo365 I struggled with the repetition of "ReadStateDate " today, which was driving me crazy while recalling the last used preset from Cubase . After 4 hours of brainstorming I figured out a button was connected to the method and, since on startup every single button's value is reset, it triggers all the method "when value changes". So I added
if source == 4 then ... and it blocke the script playing twice. (from the buttton value reset, and the global panel properties).
I cannot get the ReadStateDate twice now. Filtering the source of the method is really important.
To come back to our observation, no, the "ReadStateDate" is not called twice natively.
