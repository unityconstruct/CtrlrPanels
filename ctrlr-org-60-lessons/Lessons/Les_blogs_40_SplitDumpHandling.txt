Multi-message (large) sysex dumps handling? February 2013


Hecticcc

I am trying to save the result of large multi-message sysex dumps into one memoryblock for further manipulation (eg saving, updating modulators..), but can’t for the life of me figure out how to do this.

For example a average sized preset of 3142 bytes on the machine sends out 11 x 266 bytes and a remaining 200 bytes in the end.
How does one put this together into one big memoryblock – if possible?

The things i tried until now always get re-triggered by every midimessage & only stores the last received message – so no good…


atom

You get 11 calls to MIDI Message received callback. Can you dump the MIDI data that’s comming in ? Are these valid SysEx messages or are those just chunks of memory ?


Hecticcc

Yes, these are all valid sysex strings, starting with a 7 byte header (not counting f0) and ending with f7 and can dump the messages to the console.
Appending to a memoryblock works, but the block is re-initialised every time a message comes in (of course), this is where i’m stuck.

It would be awesome if i got this to work, because now i am getting values for individual parameters & it is getting a bit “messy” sometimes.


atom

Then it’s not a proper SysEx dump, if it was just a large sysex message then you would get one callback with the entire message 3142 bytes long, but your hardware is splitting up the large dump into smaller SysEx messages.

You can create one big memory blob out of those messages, just initialize a MemoryBlock when you send out the request, make that variable global and append data to it whenever a part comes in.

Something like this, assuming each time you get a midi message (m0,m3), and the initialized MemoryBlock is called “block”

m0 = CtrlrMidiMessage({0xf0, 00, 01, 02, 03, 0xf7})
m1 = CtrlrMidiMessage({0xf0, 04, 05, 06, 07, 0xf7})
m2 = CtrlrMidiMessage({0xf0, 0x0a, 0x0b, 0x0c, 0x0d, 0xf7})
m3 = CtrlrMidiMessage({0xf0, 0x0c, 0x0d, 0x0e, 0x0f, 0xf7})

block = MemoryBlock()
block:append(m0:getData():getRange(1,4))
block:append(m1:getData():getRange(1,4))
block:append(m2:getData():getRange(1,4))
block:append(m3:getData():getRange(1,4))

console ("memory block is "..block:getSize().." bytes, data:")
console (block:toHexString(1))
The output will be:

memory block is 16 bytes, data:
00 01 02 03 04 05 06 07 0a 0b 0c 0d 0c 0d 0e 0f


SWB

I’m not sure I have the same issue, but let me explain. Depending which button I push on my device it sends a different amount of MIDI CC messages to the CTRLR  panel (see attached screen print). The number of messages is each time the same, depending on which button I push. I need to analyze this ‘bunch’ of messages. My question: does CTRLR somewhere keep track of  these messages or stores them temporarily or do I need the above ‘append’ method to put all these incoming midi messages in one memory block?


atom

No there is no midi storage that would be pointless, you need to store it yourself, i can add the MidiBuffer class that does that (it’s part of the JUCE framework i just never added it to Lua). But even for now you can easily store your MIDI messages in a normal Lua table, you can do that always with anything.

