April 18, 2020 at 7:37 pm#117823REPLY | REPORT | QUOTE
shooking

Sure getRange(start, number)

But I am doing this — what’s the correct way to get it working?
I use what/how on via console and it suggests getRange is available but it crashes CTRLR when I do it


function processMulti(
    --[[ CtrlrMidiMessage --]] midiMessage,
    --[[ bool --]] singlePatch 
    )
    debugConsole("in processMulti")
-- single and multiple transfers have similar initial header
-- CHECK ... 
    if validateSysexHeader(midiMessage, singlePatch) == false then
        debugConsole("invalid sysex header")
        return
    end

    if singlePatch == true then
        local size = midiMessage:getSize()
        local patch = midiMessage:getData():getByte(7)
        -- so patch - 64 is the multi we want to update LCD
        patch = patch - 64
        local d = midiMessage:getData()
        local lp
        -- skip the F0 -- first 8 bytes and we dont and the F7 and index is a 0 not 1
        for lp=0, size - 8 - 1 - 1 do
            g_multiPatch[patch]:setByte(lp, d:getByte(lp+8))
        end

        debugConsole(string.format("Single %d", size))
        debugConsole(string.format("Single %d", g_multiPatch[patch]:getSize() ))
        -- we dont want the trailing F7
        process_one_multi( patch, g_multiPatch[patch], g_multiPatch[patch]:getSize() )
so in the above you see I am moving byte at a time from d offset lp+8 to g_multiPatch[patch], a LUA array/table I have created

I would love to


-- I want to move d:getRange(8, size -1)
-- to g_multipatch[patch] array
    d:getRange(8, size -1):copyTo(g_multiPatch[patch])
--doesnt work
Thanks in anticipation.
Steve H

April 19, 2020 at 2:48 am#117828REPLY | REPORT | QUOTE

dnaldoog

The first argument to getRange() is the offset, so getRange(15,n) would be the sixteenth number in a midi string – the second argument, which is confusing, is the number of bytes from that position, so if you use the whole string -1, you will not get what you need.

Example:

F0 43 12 04 05 06 07 08 F7 getRange(3,4) will return 04,05,06,07

You can easily convert to a lua table using the MemoryBlock() method toLuaTable(table):


myMidiReceived = function(--[[ CtrlrMidiMessage --]] midi)
panel:getLabel("debug"):setText("incoming ....")
local t={}
local str = midi:getData():toHexString(1) -- debugging only
panel:getLabel("debug"):append("\n"..str) -- debugging only

midi:getData():getRange(15,5):toLuaTable(t)

for i,v in ipairs (t) do -- debugging only
console(String(i..","..v))
end

local cat=table.concat(t,'-') -- debugging only

panel:getLabel("debug"):append("\n"..cat) -- debugging only
end



If you want to get all data up to, but not including F7, you would have to calculate how many bytes there are from the “offset” to the end of the message “NOT” do getSize()-1 (ignoring f7) that won’t work, so you would have to do something like. (a typical sysex header might be 8 bytes):


local offset,t=8,{}
local sizeOfData=midi:getData():getSize()-1
local result=sizeOfData-offset
midi:getData():getRange(offset,result):toLuaTable(t)

for i,v in ipairs (t) do
console(String(i..","..v))
end
Attachments:
convert-midi-to-lua-table_1_0_Hell-O-Kitty_2020-04-19_09-53.panel
April 19, 2020 at 11:20 am#117835REPLY | REPORT | QUOTE


goodweather

Didn’t know about toLuaTable()… Good to learn, thx 🙂

I’m using the built-in function:
mbName:toHexString(1)

April 19, 2020 at 4:34 pm#117840REPLY | REPORT | QUOTE
shooking

I suspect I am not getting something quite fundamental here.

So I have create my own {} arrays.


--
--  32 slots for multis
--  deliberately starting from 0 - could start from 64? Examine sysex and make decision
--  recall the number == patch, so no need to store header nor F7
    g_multiPatch = {}
    -- let store it as 32
    -- note 76 data -- strip of Sysex Header and F7
    MULTI_SYSEX_STORAGE_SIZE = 76
    for i = 0, 31 do
        g_multiPatch = CtrlrLuaMemoryBlock(MULTI_SYSEX_STORAGE_SIZE, true)
    end

what(g_multiPatch[0])
>>> what(g_multiPatch[0])
Object type [CtrlrLuaMemoryBlock]
-----------------------------------------------------------------

Members:
	                       getSize:	function
	                        __init:	function
	                 removeSection:	function
	                        insert:	function
	             loadFromHexString:	function
	                   toHexString:	function
	                      toString:	function
	                      getRange:	function
	                       getByte:	function
	                  toSafeString:	function
	                      copyFrom:	function
	                        append:	function
	                        copyTo:	function
	                       setByte:	function

Attributes:

-----------------------------------------------------------------

I interpret this as I have created some CtrlrLuaMemoryBlock.
And I can use the methods on it.

So let’ me grab a block of data from it – first 10 byte 0-9 is the name


mydat = g_multiPatch[0]:getRange(0,10)

>>> for i=0, 9 do console(""..mydat:getByte(i)) end
83
89
77
80
72
79
78
73
67
32

name=""

    for i = 0, 9 do
        name = name..string.format("%c", mydat:getByte(i))
    end console(string.format("%.10s", name))
SYMPHONIC
Great – SYMPHONIC is the name.

But I want to avoid looping – ie myData has 10 bytes
So how can I convert it to a string?

Goodweather used toHexString(1).
myDat is apparently a CtrlrLuaMemoryBlock

>>> console(“”..mydat:getSize())
10

If I try
console(“”..mydat:toHexString())

complaint about no method

console(“”..mydat:toHexString(1))

crashes Ctrl. I am guessing because there is no \0?

Fundamentally I want to be able to memmove like in C, then use format like %.10s to read to chars.
But I am not understanding how to get methods to work on my getRange

Hence a lot of for loops – which is ok but I hope this is an easier way to get the same result.

Best regards
Steve

April 20, 2020 at 6:55 am#117844REPLY | REPORT | QUOTE
dnaldoog

Hi shooking,

try L(d:getRange(8,17):toString())

That may stop the crash!

April 20, 2020 at 6:59 am#117845REPLY | REPORT | QUOTE
dnaldoog

Also in that post above you probably posted [i] in that MemoryBlock() loop.

If you post the letter ‘i’ surrounded by square brackets [] the post interprets it as an unterminated BBCode and deletes it. For posting better to make the iterator [j] for example.

:)

April 21, 2020 at 8:21 am#117852REPLY | REPORT | QUOTE
dnaldoog

goodweather wrote:
Didn’t know about toLuaTable()… Good to learn, thx 🙂

I’m using the built-in function:
mbName:toHexString(1)

Hi Goodweather,

And through this post I learnt about toString() as method of MemoryBlock(). Somehow missed that one.

I have been converting each byte of a name in a sysex string to string.char() in a loop all this time.
Still works though. 🙂

April 21, 2020 at 10:50 am#117863REPLY | REPORT | QUOTE
goodweather

I’m using console(mbName:toHexString(1)) to get all my memory blocks visible in an easy and fast way in the console then you just need to copy/paste in HxD for even easier analysis and counting.

April 22, 2020 at 2:25 am#117882REPLY | REPORT | QUOTE
dnaldoog

goodweather wrote:
I’m using console(mbName:toHexString(1)) to get all my memory blocks visible in an easy and fast way in the console then you just need to copy/paste in HxD for even easier analysis and counting.

What is HxD?

April 22, 2020 at 11:03 am#117884REPLY | REPORT | QUOTE
goodweather

HxD is an easy free hexadecimal editor. You can see the hexa and corresponding values, you can visualize them by rows of 10 or 16, replace values…
Very easy and powerful when you know what you are doing 😉

April 22, 2020 at 4:52 pm#117886REPLY | REPORT | QUOTE
shooking

Excellent work!!


        local Pants = ""
--[[        for lp = 0, 9 do
            Pants = Pants..string.format("%c", d:getByte(lp))
        end
--]]
        Pants = d:getRange(0, 9)

        getPatchName = getPatchName..L(d:getRange(0,9):toString())
so I can now replace my for loops – really appreciate the help.

Still not quite geeting the copyTo semantics. But thanks again!

-----
Ok a lightbulb moment I think!


        -- first 8 bytes and we dont and the F7 and index is a 0 not 1
        for lp=0, size - 8 - 1 - 1 do
            g_singlePatch[patch]:setByte(lp, d:getByte(lp+8))
        end
--[[
        g_singlePatch[patch] = d:getRange(8,size -1 - 1)
--]]
        process_one_single( patch, g_singlePatch[patch], g_singlePatch[patch]:getSize() )

        console("now trying with copyTo")

        d:copyTo(g_singlePatch[patch], 8, size - 2)
so looks like I cracked it …

d is the source
g_singlePatch[patch] is address of the destination.

I want to take from 8th byte for size – 2

Seems to work … thanks again for all the tips
