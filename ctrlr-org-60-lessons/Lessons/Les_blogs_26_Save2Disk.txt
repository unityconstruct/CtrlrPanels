How to capture Cancel from utils.SaveFileWindow?
------------------------------------------------

May 29, 2016 
goodweather

Hi,
is it possible to capture the click on Cancel button when using utils.saveFileWindow and when the filename is already known (name of the file that was loaded)?

if Pro2PackedBankData:getSize() == 116622 then
	f = utils.saveFileWindow ("Save Pro 2 bank dump sysex file", File(sFullPath), "*.syx", true)
	f:create()
	f:replaceWithData(Pro2PackedBankData)
With the above code, as the filename is predefined, the file is created whatever button is pressed.
Testing f==nil seems not working.
Any clue?

Thx in advance!


Possemo

I just copied this from Carl Licroys panel. It won’t save the file when hit cancel. It does a few checks, don’t know which is relevant for the cancel button:

	fileToWrite=utils.saveFileWindow("Save patch to disk",File(suggestPatchNameFolder),"*.syx",true)

	if fileToWrite:isValid()==false then return end

	-- Check if the file exists
	if fileToWrite:existsAsFile()==false then
		
		-- If file does not exist, then create it
		if fileToWrite:create()==false then

			-- If file cannot be created, then fail here
			utils.warnWindow("\n\nSorry, the Editor failed to\nsave the patch to disk!", "The file does not exist.")

			return
		end
	end

	if dataToWrite:getSize()<=0 then
		utils.warnWindow("Data to write", "There is no data to write, we'll default to \"f0 00 f7\"")
		dataToWrite=MemoryBlock("f0 00 f7")
	end

	-- If we reached this point, we have a valid file we can try to write to disk
	if fileToWrite:replaceWithData (dataToWrite)==false then
		utils.warnWindow ("File write", "Sorry, the Editor failed to\nwrite the data to file!")
	end

	
goodweather

Thx Poss. Unfortunately by reading the code I can see it won’t help as I’m opening the dialog window with already an existing filename…
So: the file is valid and existing and will be overwritten…

