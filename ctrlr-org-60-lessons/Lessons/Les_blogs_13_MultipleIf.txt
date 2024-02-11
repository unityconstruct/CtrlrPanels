multiple if syntax question

human fly

i have 4 partials and they can have 16 combinations. i’ve decided the best way to do this is to just list all 16 combinations, as it isn’t very long.

say the partials are called P1, P2, P3, P4
and i want to say, for example:
if P1==1, P2==0, P3==0, P4==1

ie: partial states are on, off, off, on

what is the correct way to do this? i’ve just put a comma there for the example.

February 11, 2017 at 8:26 pm#71246REPLY | REPORT | QUOTE

dasfaker

Yes, you can do it something like this (not tested)

local p1 = nil
local p2 = nil
local p3 = nil
local p4 = nil  
local sum = nil
if panel:getModulatorByName("P1"):getValue() == 0 then p1 = 0 else p1 = 1 end
if panel:getModulatorByName("P2"):getValue() == 0 then p2 = 0 else p2 = 1 end
if panel:getModulatorByName("P3"):getValue() == 0 then p3 = 0 else p3 = 1 end
if panel:getModulatorByName("P4"):getValue() == 0 then p4 = 0 else p4 = 1 end

sum = (p1*1) + (p2*2) + (p3*4) + (p3*8)
sum variable will give you a unique value for every possible combination.

February 11, 2017 at 10:12 pm#71247REPLY | REPORT | QUOTE

human fly

oh…
that looks pretty inscrutable to me.
i looked at the D-50 panel, and it has this:

—
— Called when a modulator value changes
— @mod http://ctrlr.org/api/class_ctrlr_modulator.html
— @value new numeric value of the modulator

–PartialsOnOff = function(value)

P1 = panel:getModulatorByName(“Partial1_OnOff”):getModulatorValue()
P2 = panel:getModulatorByName(“Partial2_OnOff”):getModulatorValue()
P3 = panel:getModulatorByName(“Partial3_OnOff”):getModulatorValue()
P4 = panel:getModulatorByName(“Partial4_OnOff”):getModulatorValue()

—LowerPartial = (LowerP1 + LowerP2)
—UpperPartial = (UpperP1 + UpperP2)

if P1 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x00, 0x14, 0x12, 0x00, 0x02, 0x6e, 0x01, 0x0f, 0xf7})) end
if P2 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x00, 0x14, 0x12, 0x00, 0x02, 0x6e, 0x02, 0x0e, 0xf7})) end
—if LowerPartial == 2 then
—panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x00, 0x14, 0x12, 0x00, 0x02, 0x6e, 0x03, 0x0d, 0xf7}))
—elseif LowerPartial == 0 then
—panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x00, 0x14, 0x12, 0x00, 0x02, 0x6e, 0x00, 0x10, 0xf7}))
end

if P3 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x00, 0x14, 0x12, 0x00, 0x01, 0x2e, 0x01, 0x50, 0xf7})) end
if P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x00, 0x14, 0x12, 0x00, 0x01, 0x2e, 0x02, 0x4f, 0xf7})) end
—if UpperPartial == 2 then
—panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x00, 0x14, 0x12, 0x00, 0x01, 0x2e, 0x03, 0x4e, 0xf7}))
—elseif UpperPartial == 0 then
—panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x00, 0x14, 0x12, 0x00, 0x01, 0x2e, 0x00, 0x51, 0xf7}))
end

end

February 11, 2017 at 10:17 pm#71248REPLY | REPORT | QUOTE

seeing that the D50 is not strictly the same as the D110, i messed around a bit, and thought of what could be needed, ie: why not a condition for each of the available possibilities -this was mainly to have a look at it, and think about it/show what i’m after – so (don’t laugh) this is where i got to:
(hopefully you can see what i’m getting at)

if P1 == 0 + P2 == 0 + P3 == 0 + P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x00, 0x00, 0xf7})) end

if P1 == 1 + P2 == 0 + P3 == 0 + P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x01, 0x00, 0xf7})) end

if P1 == 0 + P2 == 1 + P3 == 0 + P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x02, 0x00, 0xf7})) end

if P1 == 1 + P2 == 1 + P3 == 0 + P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x03, 0x00, 0xf7})) end

if P1 == 0 + P2 == 0 + P3 == 1 + P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x04, 0x00, 0xf7})) end

if P1 == 1 + P2 == 0 + P3 == 1 + P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x05, 0x00, 0xf7})) end

if P1 == 0 + P2 == 1 + P3 == 1 + P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x06, 0x00, 0xf7})) end

if P1 == 0 + P2 == 1 + P3 == 1 + P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x07, 0x00, 0xf7})) end

if P1 == 0 + P2 == 0 + P3 == 0 + P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x08, 0x00, 0xf7})) end

if P1 == 1 + P2 == 0 + P3 == 0 + P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x09, 0x00, 0xf7})) end

if P1 == 0 + P2 == 1 + P3 == 0 + P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0a, 0x00, 0xf7})) end

if P1 == 1 + P2 == 1 + P3 == 0 + P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0b, 0x00, 0xf7})) end

if P1 == 0 + P2 == 0 + P3 == 1 + P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0c, 0x00, 0xf7})) end

if P1 == 1 + P2 == 0 + P3 == 1 + P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0d, 0x00, 0xf7})) end

if P1 == 0 + P2 == 1 + P3 == 1 + P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0e, 0x00, 0xf7})) end

if P1 == 1 + P2 == 1 + P3 == 1 + P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0f, 0x00, 0xf7})) end
—————————————————————————–
so, now, i don’t know how to present the states of P1/P2/P3/P4 toggle buttons (0/1, off/on) but i thought it might not be too terrible to have all 16 lines/possibles, and do something that way. i have zero clue about programming or syntax, *obviously*.

(the message is wrong, but note the value changes. this is essentially
what i want to/need to achieve)

This reply was modified 3 years, 3 months ago by human fly.
This reply was modified 3 years, 3 months ago by human fly. Reason: typos
February 11, 2017 at 11:13 pm#71250REPLY | REPORT | QUOTE

Possemo

I think you are not far away. Correct syntax for such multiple if conditions: instead of your + symbol put an “and”, like this.

if P1 == 1 and P2 == 1 and P3 == 1 and P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0f, 0x00, 0xf7})) end

February 12, 2017 at 6:03 am#71254REPLY | REPORT | QUOTE

human fly

thank you both. very interested in dasfaker’s expression, and how that works. different level for the no(ew)bie!
(and how do you show it in a box? i get a feeling it isn’t good to post this stuff ‘raw’ in the forum text – this forum takes ages to start up in my browser) would be really good to get an explanation of what each part means – or some simple reference to read(without having to read the whole book, yet)
———–
right, so: i’ve tried to do the expression in full with checksums, and for visibility/legibility i included the binary count, ren-ed (if that’s what it’s called?) – which makes me think it’s more convenient to list P1/P2/P3/P4 backwards as P4/P3/P2/P1 to match – (but i didn’t yet)
so here’s what i’m suggesting, in full:
—————————————————————–

--
-- Called when a modulator value changes
-- @mod   http://ctrlr.org/api/class_ctrlr_modulator.html
-- @value    new numeric value of the modulator

-- Partials onoff = function(value)

---P1 = panel:getModulatorByName("Partial1_OnOff"):getModulatorValue()
---P2 = panel:getModulatorByName("Partial2_OnOff"):getModulatorValue()
---P3 = panel:getModulatorByName("Partial3_OnOff"):getModulatorValue()
---P4 = panel:getModulatorByName("Partial4_OnOff"):getModulatorValue()

-- 0000
if P1 == 0 and P2 == 0 and P3 == 0 and P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x00, 0x70, 0xf7})) end
-- 0001
if P1 == 1 and P2 == 0 and P3 == 0 and P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x01, 0x6f, 0xf7})) end
-- 0010
if P1 == 0 and P2 == 1 and P3 == 0 and P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x02, 0x6e, 0xf7})) end
-- 0011
if P1 == 1 and P2 == 1 and P3 == 0 and P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x03, 0x6d, 0xf7})) end
-- 0100
if P1 == 0 and P2 == 0 and P3 == 1 and P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x04, 0x6c, 0xf7})) end
-- 0101
if P1 == 1 and P2 == 0 and P3 == 1 and P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x05, 0x6b, 0xf7})) end
-- 0110
if P1 == 0 and P2 == 1 and P3 == 1 and P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x06, 0x6a, 0xf7})) end
-- 0111
if P1 == 1 and P2 == 1 and P3 == 1 and P4 == 0 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x07, 0x69, 0xf7})) end
-- 1000
if P1 == 0 and P2 == 0 and P3 == 0 and P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x08, 0x68, 0xf7})) end
-- 1001
if P1 == 1 and P2 == 0 and P3 == 0 and P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x09, 0x67, 0xf7})) end
-- 1010
if P1 == 0 and P2 == 1 and P3 == 0 and P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0a, 0x66, 0xf7})) end
-- 1011
if P1 == 1 and P2 == 1 and P3 == 0 and P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0b, 0x65, 0xf7})) end
-- 1100
if P1 == 0 and P2 == 0 and P3 == 1 and P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0c, 0x64, 0xf7})) end
-- 1101
if P1 == 1 and P2 == 0 and P3 == 1 and P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0d, 0x63, 0xf7})) end
-- 1110
if P1 == 0 and P2 == 1 and P3 == 1 and P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0e, 0x62, 0xf7})) end
-- 1111
if P1 == 1 and P2 == 1 and P3 == 1 and P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0f, 0x61, 0xf7})) end

end
——————————————————————————
how does that look? i don’t know how many ‘-‘ to use for a ‘ren’, it doesn’t look like it matters too much (at least 2 with space?)

is this *too long*?
how does it compare with dasfaker’s? and is that a more elegant formula? i don’t know the maths/logic, so …

(aaw f***, have 3 cats here, squabbling…f*** off you cats…)

This reply was modified 3 years, 3 months ago by human fly.
February 12, 2017 at 7:05 am#71256REPLY | REPORT | QUOTE

ok, so i’m inputting that anyway for now, as ‘myMethod partials’.
i just pasted all that into luaModulatorValueChange, and it doesn’t look like it’s right, because the bar is red..oh i don’t seem to be able to examine it now…oh it’s because it’s already open in a window.

the ‘function’ tag was not highlighted blue, like in the example.
i used ‘add new method’don’t think it will work yet, this is a familiarisation stage. all suggestions welcome at this point.

lets append the text file here>see attached: lua method Partials select.txt

i’ve disabled ‘sysex’ at midiMessageType, but i’ve left the original midiMessageSysexFormula where it was; don’t think that will do any harm.
——————————–
small separate question: i’m using the UIbuttonContent entry as the button title display (Component) but i’ve got a feeling this could interfere with the button’s state? or is it ok? i’ve got the same thing for the pitchbend enable buttons, it was to save UI space at construction stage. i guess i could find another way for that if it’s problematic. i was just seeing what i could exploit with the UI display options provided by the program, at the time.

Attachments:
lua-method-Partials-select.txt
February 12, 2017 at 11:11 am#71259REPLY | REPORT | QUOTE

dasfaker

You code is correct, just replace the “end” with “elseif”

if P1 == 1 and P2 == 0 and P3 == 1 and P4 == 1 then
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, 0x0d, 0x63, 0xf7}))
elseif ....
My code just lacks the midi message, but you get the same result.

local p1 = nil 
local p2 = nil
local p3 = nil
local p4 = nil  
local sum = nil

if panel:getModulatorByName("P1"):getValue() == 0 then p1 = 0 else p1 = 1 end
if panel:getModulatorByName("P2"):getValue() == 0 then p2 = 0 else p2 = 1 end
if panel:getModulatorByName("P3"):getValue() == 0 then p3 = 0 else p3 = 1 end
if panel:getModulatorByName("P4"):getValue() == 0 then p4 = 0 else p4 = 1 end

sum = (p1*1) + (p2*2) + (p3*4) + (p4*8)

panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, sum, 112 - sum, 0xf7})) 
February 12, 2017 at 11:48 am#71260REPLY | REPORT | QUOTE

goodweather

I support dasfaker’s way of programming.
Always try to analyze the logic and build a formula rather than coding all possible cases!
Easier maintenance, less text, less risk of errors (all or nothing works)… 🙂

Try to gradually learn that, human fly. You will feel good each time you derive some few lines formulas instead of trying enumerating all possibilities.
Good luck!

February 12, 2017 at 11:57 am#71262REPLY | REPORT | QUOTE

human fly

i will of course try to understand it now. i’m of the school of get-it-working-and-sort-it-out-later. (and i think we’re all learning Ctrlr that way, right?)

February 12, 2017 at 1:00 pm#71271REPLY | REPORT | QUOTE

goodweather

Try this course (just found it; seems to be some adds but seems covering Lua and teach you programming step by step – in french)
http://fr.craftstudio.wikia.com/wiki/Tutoriels/Apprendre_%C3%A0_programmer_en_Lua

February 12, 2017 at 1:04 pm#71272REPLY | REPORT | QUOTE

human fly

so, if i may go through your expression, section by section:
(please tell me how to put this stuff in boxes like you do)

    local p1 = nil 
    local p2 = nil
    local p3 = nil
    local p4 = nil  
    local sum = nil
——————————————————————-
what are these for? local? remember, i don’t know anything about
programming, c++, etc.
——————————————————————-

    if panel:getModulatorByName("P1"):getValue() == 0 then p1 = 0 else p1 = 1 end
    if panel:getModulatorByName("P2"):getValue() == 0 then p2 = 0 else p2 = 1 end
    if panel:getModulatorByName("P3"):getValue() == 0 then p3 = 0 else p3 = 1 end
    if panel:getModulatorByName("P4"):getValue() == 0 then p4 = 0 else p4 = 1 end
—————————————————————
ok, this refers to the Ctrlr modulator/button itself. k so the first part is a scanning process? and if it doesn’t match it must be 1?
—————————————————————
sum = (p1*1) + (p2*2) + (p3*4) + (p4*8)
—————————————————————
sum. i don’t understand how this works. me cr*p at maths.
—————————————————————
panel:sendMidiMessageNow(CtrlrMidiMessage({0xf0, 0x41, 0x10, 0x16, 0x12, 0x04, 0x00, 0x0c, sum, 112 - sum, 0xf7}))
—————————————————————
? sum, 112 – sum, ? not recognising how this generates the checksum

This reply was modified 3 years, 3 months ago by human fly.
February 12, 2017 at 1:53 pm#71274REPLY | REPORT | QUOTE

goodweather

In the beginning above, you declare the variables (=placeholders) that will contain some data. They are initialized to nil which is a special word in Lua saying “empty”

local means that the variables are only valid within this function. You can use the same variable name in another function and it will be different. If you are not using the keyword local then you can share the content of the same variables throughout your complete program/panel

Then you have 4 condition statements if something is true then do this else do that end
panel:getModulatorByName(“P1”):getValue() is something specific to Ctrlr implementation. You use it to retrieve a value from a modulator.

each Pn is a 0 or a 1 and thus represents a bit in binary (base 2)
a decimal number is a number in base 10. You can express the same number (0 to 15 for example) in binary with 4 bits (P1 to P4) by multiplying each bit to its corresponding value.

10 = 0 x (10 exp 0) + 1 x (10 exp 1) this is decimal representation
10 = 0 x (2 exp 0) + 1 x (2 exp 1) + 0 x (2 exp 2) + 1 x (2 exp 3) = 1010 in binary
10 = 0x1 + 1×2 + 0x4 + 1×8
You find back the formula used by dasfaker to calculate a sum…

THen you observer all your if statements and you will see that first a sum is calculated then 112-sum is also calculated. All the rest remaining the same…

To this explanation, you should know about hexadecimal representation… Like binary (base 2), decimal (base 10) you have hexadecimal (base 16)
In hexa, you go 01 to 09 then A, B, C, D, E and F to reach 15
So, 10 = 0A = 0101

Now you can understand dasfaker’s code and the message that is sent 🙂

So many things to learn…What a wonderfull world!

February 12, 2017 at 2:13 pm#71275REPLY | REPORT | QUOTE

dasfaker

Great. I couldn’t explain it better, I have no academic programming formation (what I know was learned here) and English is still a barrier for me. I even still get lost when talking about bits, binaries and all that naming stuff.

Einstein said once that you don’t understand something until you can make you grandma understand it… so there’s a long way ahead.

Human fly, to put code on a post, select the text and press the button “code”.

February 12, 2017 at 2:46 pm#71277REPLY | REPORT | QUOTE

SWB

to put code on a post, select the text and press the button “code”.

Doesn’t seem to work for my code-snippet…

February 12, 2017 at 2:53 pm#71278REPLY | REPORT | QUOTE

dasfaker

It works here

I see two yellow text fields over the buttons saying:

“You can use BBCodes to format your content”
“Your account has the ability to post unrestricted HTML content”

Maybe some of you don’t have this option?

February 12, 2017 at 4:40 pm#71281REPLY | REPORT | QUOTE

human fly

trying again

a- haa, worked this time: click code to create an apostrophe, type whatever, and your ‘code’ button now is ‘/code’ and when you’re done click it again,
and it closes the apostrophied part, and it comes out in red like that.

that is a superb explanation, loads of starter info,
thanks.

February 12, 2017 at 5:09 pm#71288REPLY | REPORT | QUOTE

human fly

i did at one point have ambitions to write my sequencers in C++, but i had to put it off. i think you might have just got me a little bit closer to being able to do stuff like that.

at least i know what ‘declaring variables’ means now lol. i’m pretty conversant with hex, i keep a table on my desktop

sum = (p1*1) + (p2*2) + (p3*4) + (p4*8)
yes, of course, if high, bit=1, bit2=2 bit3=4, bit4=8,
and it’s either 0x or 1x

what does exp mean?
and where does 112 come from?

This reply was modified 3 years, 3 months ago by human fly.
February 12, 2017 at 5:23 pm#71289REPLY | REPORT | QUOTE

goodweather

exp = exponent
2 exp 0 = 1
2 exp 1 = 2
2 exp 2 = 2 x 2 = 4
2 exp 3 = 2 x 2 x 2 = 8
etc…

Didn’t check the actual content/meaning of the message (just looked at it to explain) so I let dasfaker explaining the 112-sum…

