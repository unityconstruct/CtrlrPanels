Dnaldoog (mei 2020)

Here are a few constructors:

HexString
empty *two examples
Lua table
mB=MemoryBlock(“0a 14 1e”)
console(String(mB:getSize()))
console(String(“tohex”..mB:toHexString(1)))

mB=MemoryBlock()
mB:loadFromHexString(string.format(“%.2X”,10))
mB:append(MemoryBlock(“14”))
mB:append(MemoryBlock({0x1e}))
console(String(mB:getSize()))
console(String(mB:toHexString(1)))

t={10,20,30}
mB=MemoryBlock()
mB:createFromTable(t)
console(String(mB:getSize()))
console(String(mB:toHexString(1)))

mB=MemoryBlock({10,20,30})
console(String(mB:getSize()))
console(String(mB:toHexString(1)))


Goodweather

My most used commands are:
– memory block creation
ProgramFileData = MemoryBlock()
– memory block copy to a new one
mbName = MemoryBlock(mbNameEmpty)
– copy a memory block into another one
LoadedProgramData:copyFrom (mbName, 465, 11)
– size check
ProgramFileData:getSize()
– Filling amemory block from a file
file:loadFileAsData(ProgramFileData)
– extracting single byte
LoadedProgramData:getByte(6)
– extracting range of bytes
LoadedProgramData:getRange(440,15)
– setting a byte
LoadedProgramData:setByte(6, modOsc1Tune:getModulatorValue())

What is not working (bad implementation?) is to create a memory block containing predefined data (by default a memory block is empty).
So, to achieve this, I pre-define memory blocks like
mbNameEmpty = MemoryBlock ({0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00})
Then I use it to fill the memory block I’m using
mbName = MemoryBlock(mbNameEmpty)

They are really great and easy to use for all your file manipulations

