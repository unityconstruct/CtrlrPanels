How I can create a sysex file from table on panel
July 5, 2020

lecleto

Hello Ctrlrs!

How I can create a sysex file to be stored on PC from 5 tables that contais all patch data necessary? Actualy I can store these same information on synth but I want implement the same funtions to store on computer.

In other words how I can select a “Store as Sysex on Hard Disk” and open a dialog box to select a place to store file that information comes from 5 tables in the panel and “write” a file and rename as .sys file that you will can open on MidiOx or Bome?

How I can do this?

Thank ins advance!


dnaldoog

Hi Lecleto,

You need to convert the table data into binary (MemoryBlock()).

The example below is tablecentric using lua loops, but you can also use MemoryBlock functions to do the same thing.


save_sysex_to_file = function(mod, value, source)

local t={}

t1={0xF0,0x41,0x01,0x00,0x01,0xF7} -- these are your 5 global
t2={0xF0,0x41,0x02,0x00,0x02,0xF7} -- sysex tables
t3={0xF0,0x41,0x03,0x00,0x03,0xF7} -- from somewhere in 
t4={0xF0,0x41,0x04,0x00,0x04,0xF7} -- your program
t5={0xF0,0x41,0x05,0x00,0x05,0xF7}

local mergeTable={t1,t2,t3,t4,t5} -- make a table of tables!

for _,v in ipairs (mergeTable) do
for _,val in ipairs (v) do
table.insert(t,val)
end -- inner loop
end -- populate a temp table t with all values

--console(String(table.concat(t,',')))

local dataToSave=MemoryBlock.fromLuaTable(t) -- create MemoryBlock from table

--console(String(dataToSave:toHexString(1)))

   file = utils.saveFileWindow ("Save file",File.getSpecialLocation(File.userDesktopDirectory), "*.syx", true)
    if file:hasWriteAccess() then
      file:replaceWithData(dataToSave)
    end

end --end function
---------------------------------------------------------
See attached panel. Also with a function to read a sysex file back into 5 tables.

Attachments:
Save-Tables-To-File_1_0_Hell-O-Kitty_2020-07-06_08-02.bpanelz


lecleto

Hello Dnaldoog! One more thanks!

I published now a new panel for Roland JV and XP series. In my post I give my special thanks to you that always help me!

I will try here. Will be perfect this feature in my panels.

Thank you sooo much!!


dnaldoog

Well thank you lecleto!

Very kind of you.

Will download it and look at it!

Does it work for the JV1010?

I once started a panel for the JV1010.

I packed the unit away, but might get it out again to test.

Regards,

JG


lecleto

Hello Dnaldoog!

Yes will work on JV-1010!

I also have a JV-1010 and I really like of this unit! In reality JV-1010 was my first motivation to do this job that you really helped me a lot then your comments are really welcome! Part of your vast knowledge is inside of this panel. Remember when we talk about Roland checksums, message box, timers and many other topics. Yes, all these things are working inside of this panel.

So, if possible, try this ang give me your feedback!


dnaldoog

Hi lecleto,

Certainly not vast knowledge, but just much of what you ask I have done myself before and sweated over!

But thank you for the nice compliment. Wish it were true.


lecleto

Yeah, Dnaldoog! Now working perfectly!!!

Saving patches on PC! Your example panel was perfect!!
So, the first upgrade to JV-Patched JV-XP is ready!
I will extend to my other panel to Roland JV-880.

Many thanks!!

samoht

Hi, Donaldoog,

Certainly not vast knowledge, but just much of what you ask I have done myself before and sweated over!

Studying Lua and Ctrlr, your comments are of great help for me too!
Thanks!


dnaldoog

Thanks Samoht. It’s nice to hear that! Appreciated.
