Godlike-Productions
1 maart 2021

I'm not sure if anyone has saved panel data to json. json.encode is supposed to encode tables, but I'm wondering if this will also encode memoryBlocks containing sysex data, for example. It doesn't explicitly say whether it does or doesn't.

What I'm trying to acheive.

In my plugin I have a series of list boxes that list the patch names.
The index in those are used to reference an underlying class set up as a table.

patchBank is a table of patches
A patch is set up as follows

patch.name (String)
patch.author (String)
patch.category (String)
patch.sysex (memoryBlock)

I want to be able to export patchbank and load it back in. The sysex dump for the synth does not support the name, author or category, so to be able to preserve that info, I need to export the entire patchBank.

This will also be loaded back in, in conjunction with the normal state data (which does not save memoryBlocks).

I'm looking for a structured way to save this, so json or xml is probably the preference.

Doing a bit of searching, json doesn't support binary data. It will either need to be encoded with toBase64 or toHexString

----
Ugh. json4lua isn't working. Line 380 throws this error

ERROR: [string "json4lua"]:380: attempt to index local 's' (a number value)

Probably because the output of toHexString, while it type command gives String, I suspect json.encode thinks it's a number to it stops.

My structure is too complicated for toHexString. It seems to only like a table of hex values.

I can't find out how to, or even if we can call toBase64 or toBase64Encoding

Soooo, my options are to convert all the structures to text and build a method to cycle through all the structure and write it to text, build my own sysex file structure that encodes all of the strings from the structure and decode it, or try to shoehorn http://lua-users.org/wiki/SaveTableToFile into working. It doesn't work out of the box because it uses calls to io:open, which I need to make compatible with utils.saveFileWindow etc.

I thought this was going to be an easy part of the build.


dnaldoog

In my Juno Alpha panel there are two methods:

    load_cc_mapping_from_file
    save_cc_mapping_to_file.

They might give clues as to how to create a record with a text file with your own custom extension.

I create a lua table structure and save to file and just read it back in when loaded. I have my own file extension .JUMP Here is an example of the file contents:


restore={
["DCO_ENV_MODE"]={positionint=1,ccValue=0},
["HPF_CUTOFF_FREQ"]={positionint=10,ccValue=8},
["DCO_ENV_MOD_DEPTH"]={positionint=13,ccValue=3},
}

You could just save the sysex as one string in the multi dimensional array. Reading it back into a MemoryBlock would be trivial!
I think MacOS and Linux users would need to explicitly add the file extension. Windows prompts for it automatically.

-----------
Also, do you know about


--
-- Called when data needs saving
--
save_state = function(--[[ ValueTree --]] stateData)

...


--
-- Called when data is restored
--
load_state = function(--[[ ValueTree --]] stateData)


I worked out a way to save lua tables and recall them on panel reload. It's in that panel too

They can save anything including variable names as key value pairs (not unlike JSON) so to save MemoryBlock you write to save_state as toHexString(1)



Godlike-Productions



I think I solved my problem


>>> tmpTable = {0xf0, 0x01, 0xf7}

>>> tmpMB = MemoryBlock()

>>> tmpMB:createFromTable(tmpTable)

>>> tmpPatch1 = patch:new({name = "Name 1", author = "Author 1", category = "Bass", sysex = tmpMB})

>>> tmpPatch2 = patch:new({name = "Name 2", author = "Author 2", category = "Lead", sysex = tmpMB})

>>> tmpBank = patchBank:new()

>>> tmpBank[1] = tmpPatch1

>>> tmpBank[2] = tmpPatch2

>>> expBank = tmpBank

>>> console (Sting(expBank[1].name))
ERROR: [string "_runtime"]:1: attempt to call global 'Sting' (a nil value)

>>> console (String(expBank[1].name))
Name 1

>>> expTable = {}

>>> tmpString1 = expBank[1].name..","..expBank[1].author..","..expBank[1].category..",{"..expBank[1].sysex:toHexString(1).."}"

>>> console (tmpString1)
Name 1,Author 1,Bass,{f0 01 f7}

>>> tmpString2 = expBank[2].name..","..expBank[2].author..","..expBank[2].category..",{"..expBank[2].sysex:toHexString(1).."}"

>>> expTable[1] = tmpString1

>>> expTable[2] = tmpString2

>>> tmpJson = json.encode(expTable)

>>> console (String(tmpJson))
["Name 1,Author 1,Bass,{f0 01 f7}","Name 2,Author 2,Lead,{f0 01 f7}"]

>>> ldTable = json.decode(tmpJson)

>>> console (ldTable[1])
Name 1,Author 1,Bass,{f0 01 f7}



Godlike-Productions


Yeah, I just need to rebuild the data from the string.

This is the last bit I need for rebuilding it. Just puting it here so I can code it tomorrow.

>>> console (ldTable[1])
Name 1,Author 1,Bass,{f0 01 f7}

>>> recTable = split(ldTable[1],",")

>>> console (recTable[3])
Bass

>>> console (recTable[4])
{f0 01 f7}


>>> recMB = MemoryBlock()

>>> recMB = MemoryBlock(recTable[4])


>>> console (String(recMB:toHexString(1)))
f0 01 f7



Even Nicer. I only need to convert the mb to a hexstring

>>> tmpStBank = tmpBank

>>> tmpStBank[1].sysex = tmpStBank[1].sysex:toHexString(1)

>>> console (tmpStBank[1].sysex)
f0 01 f7

>>> jsonVar1 = json.encode(tmpStBank[1])

>>> console (String(jsonVar1))
{"sysex":"f0 01 f7","author":"Author 1","name":"Name 1","category":"Bass"}

>>> tmpStBank[2].sysex = tmpStBank[2].sysex:toHexString(1)

>>> jsonVar2 = json.encode(tmpStBank)

>>> consol String(jsonVar2))
ERROR: [string "_runtime"]:1: '=' expected near 'String'

>>> console  (String(jsonVar2))
[{"sysex":"f0 01 f7","author":"Author 1","name":"Name 1","category":"Bass"},{"sysex":"f0 01 f7","author":"Author 2","name":"Name 2","category":"Lead"}]

The decode should rebuild the table, then I can convert the hexString back to a MB.

That will work, and has the benefit of keeping the library human readable, and it retains structure.


Is this the correct way to use ipairs?

Edit: Note that this encodeBank method also converts bankToEncode to a hexString - it's destructive. See the answer for the final non-destrutive method.

function encodeBank(bankToEncode)
	-- This function takes a patchBank, such as libraryBank, converts the sysex MemoryBlocks to a Hex Strings and then encodes the structure
    -- to json and returns a json string that can be written to a file.
    -- decodeBank does the opposite

    local tempBank = bankToEncode -- we want this to be non-destructive
    for i,v in ipairs (tempBank) do
        v.sysex = v.sysex:toHexString(1)
    end --for
    local encodedBank = json.encode(tempBank)
    return encodedBank
end



This is the decode function. I haven't tested yet, but if they don't work, I'll come back and update them.

function decodeBank(jsonToDecode)
		-- This function takes a json String previously encoded with encodeBank, and returns a patchBank
     
    --local tempBank = patchBank:new() 
    local decodedBank = json.decode(jsonToDecode)

    for i,v in ipairs (decodedBank) do
        v.sysex = MemoryBlock(v.sysex)
    end --for
    
    return decodedBank
end


dnaldoog

Looks OK to me. I haven’t tested it. Does it work? The ipairs syntax is correct.



Godlike-Productions


I think it works. It definately exports a valid json file, but I have a bug in my method for copying patches between banks (I have some options for whether to inject them at the start, middle or end of a bank, doing bulk author, name and category changes, and options to load the patches via sysex if we copy them into the Jupiter.). Author and Category aren't getting transferred properly and I haven't found out why yet.

I need to fix this bug before I confirm that the encode, decode, save and load are working as I intended.

Similarly I think my load procedure is also working OK, but I probably need an extra step in there for file format confirmation. If we attempt to load any old json into it ctrlr will probably just accept it and it will break things badly as the whole underlying data structure will change, which is not a good thing.



I think I've found a problem with my encodeBank method.

If you save the bank and then do it again, encodeBank fails. I think because ecodeBank converted the memoryBank to a sysexString

tempBank = patchBank:new(bankToEncode) I think, just copies the memory references, so tempBank[i].sysex references the exact same areas in memory as bankToEncode[i].sysex

I think I'm going to have to iterate through every single entry in bankToEncode, extract it to another variable, or possibly change

v.sysex = v.sysex:toHexString(1) to v.sysex = bankToEncode[i].sysex:toHexString(1)

If anyone could shed some light on this, it would be great.

And if you save a file, load it back up and try to save again, ctrlr crashes. Bugger. I thought I'd sorted this one out. :(


I think the crash was caused by .getParentDirectory() I think there's a bug with it.


OK, I've fixed it.

function encodeBank(bankToEncode)
	-- This function takes a patchBank, such as libraryBank, converts the sysex MemoryBlocks to a Hex Strings and then encodes the structure
    -- to json and returns a json string that can be written to a file.
    -- decodeBank does the opposite

    local tempBank = patchBank:new() -- we want this to be non-destructive
    local nameString = ""
    local authorString = ""
    local categoryString = ""
    local sysexString = ""
    for i,v in ipairs (bankToEncode) do
        nameString = bankToEncode[i].name
        authorString = bankToEncode[i].author
        categoryString = bankToEncode[i].category
        sysexString = bankToEncode[i].sysex:toHexString(1)
         
        -- v.sysex = v.sysex:toHexString(1) -- I think this is the bug. This also converts bankToEncode.sysex to a HexString, which is not what we want
        -- perhaps try
        tempBank[i] = patch:new({name=nameString, author=authorString, category=categoryString, sysex=sysexString})
        --jupiterBank[i] = patch:new({name=jupBank.."."..jupProg.."Prg: "..i,author=defAuthor})
    end --for
    -- console (tempBank[1].author)
    local encodedBank = json.encode(tempBank)
    return encodedBank
end

I'll also update the method in the thread. This thread is getting a bit out of hand. I'll copy the final methods to the end, and try and mark it as the answer.


dobo365

Very interesting about json coding/decoding as, as you say, it is readable!

I have handled this with memoryblocks and 2 files, one containing the actual sysex of the synth, the other one the metadata but in fact you could do it with just one single sysex file. If you use only one then for sure you cannot send that one without processing to the synth and it is the reason I used 2.
So, basically, I have:

    single program sysex F0...F7
    there is no single metadata file
    bank file sysex = set of several hundreds of single program files
    metadata bank file sysex = set of several hundreds of metadata
    As I know the positions, it is "just" a matter of reading/writing at the position provided by the Midi documentation or at the ones I defined for the metadata.



Yep, That was the approach I was initially going to take, but stumbled onto the whole class thing, and the sysex and metadata are now associated.

Eg. sysexToDump = patchBank[i].sysex

But in my case I have to add a header, so

sysexToDump = addSysexHeader(programNumber,patchBank[i].sysex) You can make a bank for preparing the dump, where programNumber = i, but equally you could dump any one of thousands of patches from the library to any synth patch location.



dnaldoog

I worked out how to do it and it wasn't easy! See attached:

json experiment_2_0_0_2021-03-03_22-08.zip



Godlike-Productions


I tried it, but it didn't work.

I get these errors when I try to save and then load.

Nothing was written to the json file.

I'm about to test my methods. I'll let you know how I go.

At line [-1]: [C]
What: C
Namewhat: method
Name: replaceWithText
Error message: No matching overload found, candidates:
bool replaceWithText(File const&,String const&,bool,bool,char const*)
Compile: jsonEncode - OK
Compile: save_to_json_file - OK

At line [-1]: [C]
What: C
Namewhat: method
Name: replaceWithText
Error message: No matching overload found, candidates:
bool replaceWithText(File const&,String const&,bool,bool,char const*)
At line [-1]: [C]
What: C
Namewhat: field
Name: assert
Error message: [string "json4lua"]:122: Unterminated JSON encoded object found at position in []

-----------

Ugh, replaceWithText has changed in the ctrlr version I have. I'll try to get to the bottom of it.

Found the issue.

This fixes it. Looks like the file constant isn't optional in v6

if fileToWrite:replaceWithText(str, false, false, ",") == false then

I still need to test my method. I've got a problem with my import sysex method somewhere. It's not keeping the sysex as a MemoryBlock, but changing it to a string. I need to find out why. Another rabbit hole to dive down.


dnaldoog

Shouldn't be using version 6! Use 5.3.201 - even if 6* works in development it probably won't work for many users!

if fileToWrite:replaceWithText(str, false, false, ",") == false then can't be right, surely!


Godlike-Productions


I'm only releasing this panel as a restricted instance. v6 actually rescued this panel. It crashed in v 5.3 and couldn't be recovered. v6 just opened it up and I'm too far into it to change now.

This is the only programming issue I've found that is different from v5.3.

That is just copy and pasted from your panel that I just ran successfully. It will probably work in 5.3 as well. I think the char is optional, and probably a delimiter character. I don't think it gets used in the json file that is made.

This is the text that is generated in the json from your example.

[{"name":"blah blah","sysex":"f0 01 f7"},{"name":"I am Jupiter","sysex":"f0 01 45 33 0a f7"},{"name":"I am Juno","sysex":"f0 02 45 33 0a 66 77 7f f7"}]


dnaldoog

It breaks on 5.3.201, it doesn't like the third parameter which exist in JUCE, but it is supposed to be either "\r" "\n".

I guess json.decode() ignores the trailing "," which is probably at the end of your file. I can't test that.

Also, I'm pretty sure v 6 breaks when used as VST - Have you tested it as a standalone? Because they are both similar I think. i.e. both static versions.

https://docs.juce.com/master/classFile.html#afb6ed58d3dae457dc306c1f6d1bdf602


bool File::replaceWithText| (  const String &| textToWrite,
  bool asUnicode = false,
  boo writeUnicodeHeaderBytes = false,
  const char * lineEndings = "\r\n"
 )   const


Godlike-Productions

OK, that makes sense. I also tested with \n and it also worked. There are no eol's in the export, so that makes sense.

I don't have any trailing comma's, and I'm not quite sure how you'd get them if you just encode with json.encode(). It translates the entire table structure into json automagically. The issue I was having was that json.encode can't deal with binary data, to the MemoryBlocks were breaking it. All I had to do was convert them toHexString on export, and back to MemoryBlocks on import.

My export code is working fine. Not sure what happened before, maybe some left over data or something in my sysex Import.

Just got to do my loading button now.

This is the save code I ended up with.

function saveLibraryButtonMethod()
	-- This is a manual save of the Library. We will use a different method for autosaving, because we don't want to prompt for 
    -- file location. All library files will be saved with a .jp8, but it will be json files.  We don't want to import any json files, as we don't
    -- do checking at the moment. It would almost certainly break stuff.

        if isPanelReady() == false then -- check panel readiness
		    return
	    end

        if type(libraryBank) ~= "table" then
            utils.warnWindow("No Library", "Plugin Library is Empty. Transfer something into the library, or load from disk, and try again.")
            panel:getComponent("pluginLibraryListbox"):setPropertyString("uiListBoxContent","")
            return
        end --if

        local exportJson = encodeBank(libraryBank)
        fileToWrite = utils.saveFileWindow("Save Library to .jp8 (json) format", File.getSpecialLocation(File.userDocumentsDirectory), "*.jp8", true)
        if fileToWrite:isValid() == false then
		    return
	    end

	    -- Let's see if the file exists
	    if fileToWrite:existsAsFile() == false then
		
		    -- The file is not there, that's ok, let's try to create it
		    if fileToWrite:create() == false then
			    -- Ooooh we can't create it, we need to fail here
			    utils.warnWindow ("File write", "The destination file does not exist, and i can't create it")
			    return
		    end
	    end
    
        -- If we reached this point, we have a valid file we can try to write to
	
	    -- There are two falgs when writing text
	    -- asUnicode - if should write our text as UNICODE
	    -- writeUnicodeHeaderBytes - if we should add a special unicode header at the beginning of the file
	    -- we set both to false

        -- Update the file path
        local fullPath = fileToWrite:getFullPathName()
        local fileName = fileToWrite:getFileName()
        lastPath = string.gsub(fullPath,fileName,"")
        panel:getLabelComponent("filePathLabel"):setText ("> "..lastPath)

        if fileToWrite:replaceWithText (exportJson, false, false, "\n") == false then
		    utils.warnWindow ("File write", "Failed to write data to file: "..fileToWrite.getFullPathName())
	    end
end



Here's the load method.

All tested and working.

With json you MUST make sure there is no userdata. Strings, numbers and tables only.

function loadLibraryButtonMethod()
	-- This method loads a .jp8 file (JSON format) and puts the data into the Library Table.
    -- There is a confirm box, because this is destructive (ie it will overwrite the old library)
    -- We'll need to check if the file is ok to load.  Will probably do a simple check of the first few bytes.

    if isPanelReady() == false then -- check panel readiness
	    return
    end

        local tempBank = patchBank:new() -- temporary return

    	fileToRead = utils.openFileWindow(
		"Open Library File to read (*.jp8)",
		File.getSpecialLocation(File.userDocumentsDirectory),
		"*.jp8",
		true
	)

	if fileToRead:existsAsFile() then
       
        local str=fileToRead:loadFileAsString()
	if str:find('sysex') ~= 4 then
            
	     utils.warnWindow(
					"Wrong File Type", 
					"This doesn't seem to be a Jupiter 8 Morph File, or it may have been corrupted. Loading this file will break stuff... badly, so we are aborting. Sorry!"
				)
	     return
	end --if
    

	tempBank = decodeBank(str)
        if type(tempBank) ~= "table" then
            utils.warnWindow("Import Error", "Something went wrong with the Import. Aborting")
            return
	    end

        if table.getn(tempBank) <1 then
            utils.warnWindow("No Data Here", "There's no records in this file. Hell, I don't even know how we got to this section of the program. Please contact us at https://godlike.com.au and let us know what the hell you did")
            return
        end

        -- We should be good to copy over libraryBank, but we need a confirmation window.

        ret = AlertWindow.showOkCancelBox(
		AlertWindow.QuestionIcon, 
		"Confirm Library Overwrite",
		"You are about to overwrite the library. This cannot be undone and everything in the library will be lost... forever. This is your last chance to backup the library. If you want to append data to the library, load to the clipboard and then copy to the Library",
		"OK",
		"Cancel"
	    )
        if ret then -- ret is true, so continue
            libraryBank = tempBank
            buildNameTable(libraryBank, "pluginLibraryListbox")
        else
            return
        end --if
    else return
    end --if

end



dnaldoog

Excellent!

Just one note ⇒ "/n" should read "\n"

This is going to be very useful. For example, you could save each modulator value panel:getModulatorByName("lfoRate"):getModulatorValue() i.e.
[{"mod":"lfoRate","value":"53},{"mod":"resonance","value":"31"} ]

either using Hex or Decimal for the values.

Cool for panels that don't have banks of patch data as sysex etc. Just pull the current values from uiSlider etc.

Saves looping through an ordered list of modulator names in a table and assigning each a value on file reload/save.
You could set up a lua set to determine which modulators to record.



Godlike-Productions

Cheers, fixed it, in case any one copies and paste's in the future (probably me when I do my next panel :P)

And yeah for collecting modulators. If you want to quickly go through all modulators use

n = panel:getNumModulators()

for i=0,n-1 do
mod = panel:getModulatorByIndex(i)
end


Godlike-Productions

😏️OK - THE THREAD HAS GOT A BIT MESSY. HERE'S THE 4 FINAL METHODS I ENDED UP WITH.😏️

ENCODE BANK

function encodeBank(bankToEncode)
	-- This function takes a patchBank, such as libraryBank, converts the sysex MemoryBlocks to a Hex Strings and then encodes the structure
    -- to json and returns a json string that can be written to a file.
    -- decodeBank does the opposite

    local tempBank = patchBank:new() -- we want this to be non-destructive
    local nameString = ""
    local authorString = ""
    local categoryString = ""
    local sysexString = ""
    for i,v in ipairs (bankToEncode) do
        nameString = bankToEncode[i].name
        authorString = bankToEncode[i].author
        categoryString = bankToEncode[i].category
        sysexString = bankToEncode[i].sysex:toHexString(1)
         
        -- v.sysex = v.sysex:toHexString(1) -- I think this is the bug. This also converts bankToEncode.sysex to a HexString, which is not what we want
        -- perhaps try
        tempBank[i] = patch:new({name=nameString, author=authorString, category=categoryString, sysex=sysexString})
        --jupiterBank[i] = patch:new({name=jupBank.."."..jupProg.."Prg: "..i,author=defAuthor})
    end --for
    -- console (tempBank[1].author)
    local encodedBank = json.encode(tempBank)
    return encodedBank
end

DECODE BANK

function decodeBank(jsonToDecode)
		-- This function takes a json String previously encoded with encodeBank, and returns a patchBank
     
    --local tempBank = patchBank:new() 
    local decodedBank = json.decode(jsonToDecode)

    for i,v in ipairs (decodedBank) do
        v.sysex = MemoryBlock(v.sysex)
    end --for
    
    return decodedBank
end

SAVE LIBRARY (EXPORT JSON)

function saveLibraryButtonMethod()
	-- This is a manual save of the Library. We will use a different method for autosaving, because we don't want to prompt for 
    -- file location. All library files will be saved with a .jp8, but it will be json files.  We don't want to import any json files, as we don't
    -- do checking at the moment. It would almost certainly break stuff.

        if isPanelReady() == false then -- check panel readiness
		    return
	    end

        if type(libraryBank) ~= "table" then
            utils.warnWindow("No Library", "Plugin Library is Empty. Transfer something into the library, or load from disk, and try again.")
            panel:getComponent("pluginLibraryListbox"):setPropertyString("uiListBoxContent","")
            return
        end --if

        local exportJson = encodeBank(libraryBank)
        fileToWrite = utils.saveFileWindow("Save Library to .jp8 (json) format", File.getSpecialLocation(File.userDocumentsDirectory), "*.jp8", true)
        if fileToWrite:isValid() == false then
		    return
	    end

	    -- Let's see if the file exists
	    if fileToWrite:existsAsFile() == false then
		
		    -- The file is not there, that's ok, let's try to create it
		    if fileToWrite:create() == false then
			    -- Ooooh we can't create it, we need to fail here
			    utils.warnWindow ("File write", "The destination file does not exist, and i can't create it")
			    return
		    end
	    end
    
        -- If we reached this point, we have a valid file we can try to write to
	
	    -- There are two falgs when writing text
	    -- asUnicode - if should write our text as UNICODE
	    -- writeUnicodeHeaderBytes - if we should add a special unicode header at the beginning of the file
	    -- we set both to false

        -- Update the file path. Note that getParentDirectory() doesn't work. It crashes ctrlr as of v6.0.26
        local fullPath = fileToWrite:getFullPathName()
        local fileName = fileToWrite:getFileName()
        lastPath = string.gsub(fullPath,fileName,"")
        panel:getLabelComponent("filePathLabel"):setText ("> "..lastPath)

        if fileToWrite:replaceWithText (exportJson, false, false, "\n") == false then
		    utils.warnWindow ("File write", "Failed to write data to file: "..fileToWrite.getFullPathName())
	    end
end

LOAD LIBRARY (JSON)

function loadLibraryButtonMethod()
	-- This method loads a .jp8 file (JSON format) and puts the data into the Library Table.
    -- There is a confirm box, because this is destructive (ie it will overwrite the old library)
    -- We'll need to check if the file is ok to load.  Will probably do a simple check of the first few bytes.

    if isPanelReady() == false then -- check panel readiness
	    return
    end

        local tempBank = patchBank:new() -- temporary return

    	fileToRead = utils.openFileWindow(
		"Open Library File to read (*.jp8)",
		File.getSpecialLocation(File.userDocumentsDirectory),
		"*.jp8",
		true
	)

	if fileToRead:existsAsFile() then
        
        local str=fileToRead:loadFileAsString()
		if str:find('sysex') ~= 4 then
            
		    utils.warnWindow(
					"Wrong File Type", 
					"This doesn't seem to be a Jupiter 8 Morph File, or it may have been corrupted. Loading this file will break stuff... badly, so we are aborting. Sorry!"
				)
		return
		end 
    

		tempBank = decodeBank(str)
        if type(tempBank) ~= "table" then
            utils.warnWindow("Import Error", "Something went wrong with the Import. Aborting")
            return
	    end

        if table.getn(tempBank) <1 then
            utils.warnWindow("No Data Here", "There's no records in this file. Hell, I don't even know how we got to this section of the program. Please contact us at https://godlike.com.au and let us know what the hell you did")
            return
        end

        -- We should be good to copy over libraryBank, but we need a confirmation window.

        ret = AlertWindow.showOkCancelBox(
		AlertWindow.QuestionIcon, 
		"Confirm Library Overwrite",
		"You are about to overwrite the library. This cannot be undone and everything in the library will be lost... forever. This is your last chance to backup the library. If you want to append data to the library, load to the clipboard and then copy to the Library",
		"OK",
		"Cancel"
	    )
        if ret then -- ret is true, so continue
            libraryBank = tempBank
            buildNameTable(libraryBank, "pluginLibraryListbox")
        else
            return
        end --if
    else return
    end --if

end

YOU WILL ALSO NEED THE FOLLOWING DECLARED IN YOUR INITIALIZEPANEL. THIS BUILDS THE PATCH CLASS AND THE PATCHBANK CLASS.

-- Intialize Classes
defaultSysex = {0xf0,0x00,0x00,0x2f,0x03,0x02,0x00,0x00,0x00,0x00,0x00,0x09,0x00,0x0c,0x00,0x00,0x00,0x00,0x0b,0x02,0x06,0x02,0x0f,0x0f,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x0f,0x0f,0x00,0x00,0x09,0x0c,0x00,0x00,0x00,0x00,0x08,0x08,0x00,0x00,0x02,0x0c,0x01,0x07,0x0f,0x07,0xf7}
defaultSysexMB = MemoryBlock()
defaultSysexMB:createFromTable(defaultSysex)
patch = {name = "No Name", author = "Default Author", category = "None", sysex = defaultSysexMB} -- Initialize table structure. Category only allows a single value currently.  Maybe redefine as a table
function patch:new (o)
    o = o or {} -- create object if user does not provide one
    setmetatable(o, self) -- define prototype
    self.__index = self
    return o
end

patchBank = {} -- each index is the patch ID. As we add patches we should call them as patchBank[1] = patch:new(). We can then access data by patchBank[1].name etc.
function patchBank:new(o)
    o = o or {} -- create object if user does not provide one
    setmetatable(o,self) -- define prototype
    self.__index = self
    return o
end


