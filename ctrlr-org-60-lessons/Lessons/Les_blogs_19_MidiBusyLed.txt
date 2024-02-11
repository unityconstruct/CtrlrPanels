MIDI Out LED

computerchemist

I can see how to hook into the panel for making an animated LED on a timer for when the panel receives MIDI, to make a MIDI IN light really easily.
If I’m sending MIDI using sendMidiMessageNow, is there some method for displaying if the data is still being sent?
I can’t just programmatically adding an “on led” before the sendMidiMessageNow and an “off led” immediately afterwards, becuase the send is asynchronous and happens in a different thread, doesn’t it? I want something that will continue to be on while there is still data in CTRLR’s MIDI buffer to send.

I’m not using snapshots, this is just MIDI sysex being sent in a lump via lua. Can anybody point me in the right direction please? Thanks 🙂

June 8, 2020 at 7:26 pm#118713REPLY | REPORT | QUOTE

dnaldoog


Not really answering the question directly, but a good visual clue for the user is uiProgressBar.

See a working example here https://ctrlr.org/jd-990-sysex-dump-utility/

Actually come to think of it, in that panel there is a neutral 😐 smiley face icon which changes to a smiley face 🙂 when the upload or download is complete (but you won’t see that icon unless you are connected to a JD-990). All you would need to do is substitute your on/off LED for that. It is achieved using timers.

June 9, 2020 at 11:00 am#118731REPLY | REPORT | QUOTE
computerchemist

Thanks for the replies dnaldoog.
Yes, I’m using a timer currently as a “kludge” but that’s highly dependent on what the current MIDI delay settings are set to, so it’s not as straightforward as working out the size for the data packet you’re about to send, although maybe that’s a better way of handling it, even if it’s a kludge.
I guess there must be some magic formula to use to calculate the milliseconds accurately, as 31.25kBaud is a given, the only other two variables would be the delay and the size of the packet. If I made a function that acted as a wrapper around sendMidiMessageNow to instantiate the timer having looked at the size of the packet about to be sent, that would be a sort of answer, right?
I looked at that JD panel but tu_rate doesn’t seem to go anywhere or be used for anything, so guessing there’s no “right” answer for this, if we can’t check the current MIDI output buffer queue everything we do for MIDI out is an approximation.


dnaldoog

tu_rate=tonumber(L(panel:getLabel(“TRATE”):getText()))–[[150 seems okay 100 is too fast–]]

is the delay for the timer. It comes from uiLabel which the user can edit.


computerchemist

What I meant was that tu_rate doesn’t seem to be referenced after that, so I guess it was added in but never implemented?

What I mean by the asynchronous is if you do something like:

console("start")
sendMidiMessageNow (stuff)
console("end")

then even if “stuff” is huge and would take several seconds to transfer, you’ll see “start” “end” immediately in the console. So you can’t just add some logic after the sendMidiMessageNow to turn off the led. That’s what I meant by asynchronous; it’s a “fire and forget” sort of operation that doesn’t stop your main program loop dead while it sends stuff.

I think it sounds like the only way is to figure out how to calculate milliseconds given size of buffer to transfer and current delay settings. So it’ll be something like
milliseconds_to_wait= (mysysexData:getSize() * magic_number )+ panelMidiGlobalDelay
where magic_number will be the time in milliseconds for 10 bits (1 start, 8 data, 1 stop) to travel at 31.25 kBaud – the magic MIDI number.
What the heck is magic_number…. 1/31250baud = 0.000032 seconds for a bit, 10 bits would be times ten so 0.00032 seconds per byte = 0.32 milliseconds per byte, is that right? Anybody? 0.32 is the magic_number? 😀 I’ll try it later an report back. Think you might have just helped steer me here onto something, dnaldoog!


dnaldoog

I think that panel code is confusing.

Here is a watered down version with a timer that triggers an LED to switch on when the upload is complete. Also included is a progress bar. 🎶

upload led and progressbar panel screenshot

Attachments:
timer_test_off_on_led_1_0.bpanelz (gedownload in ctrlr/lessen)


computerchemist


c takes a time to initialise, but I get what it’s doing – like you said earlier, it’s not answering the original question but it is a really neat way of doing a progress bar.
But my problem isn’t sending lots of little packets, the Poly800 expects a giant floater of a packet in one go – depending upon which version it’s anywhere from 3273 bytes to 5383 bytes – in one single go. This actually takes over a second to upload, and during that time I’ve basically got to try and let the user know it’s happening. But becuase it could be big or small, it can’t be a fixed number.
But I just tried this and it worked:

    mysysexData=MemoryBlock();
     mysysexData=encodeSysex();
     s = mysysexData:getSize();

    totwait = tonumber( ( s * 0.32 ) + 5 );

    -- console("start timer40...");
    panel:getModulatorByName("sendDumpButton"):getComponent():setProperty ("uiButtonTextColourOff","FFFF4545",true); -- set to red
    timer:startTimer (40, totwait); 

    panel:sendMidiMessageNow(CtrlrMidiMessage(mysysexData:toHexString(1))); -- go send it

My callback basically stops the timer and sets the text back to black, but it’s bang on timing now. The trick was that “magic number’ and if you multiply the size of your sysex by 0.32 and add the current mididelay time onto it (in my case 5ms) it’s only bang on perfect 🙂

So hoping this might help someone else out – two ways actually, your very nice bar progress for split packets or a precise LED on time for very big packets.

June 10, 2020 at 1:08 am#118747REPLY | REPORT | QUOTE

dnaldoog


So is this what you are doing? Sending the MIDI should be in the timer function, right?


timerCallback = function(timerId) -- this function name must match the name above in the first line. ;)

if timerId==40 then
    panel:sendMidiMessageNow(CtrlrMidiMessage(mysysexData:toHexString(1))); -- go send it
    panel:getModulatorByName("sendDumpButton"):getComponent():setProperty ("uiButtonTextColourOff","FFFF4545",true); -- set to red
    timer:stopTimer(timerId)
end

end

myMethod=function()
--x = a large sysex string
 mysysexData=MemoryBlock(x);
     --mysysexData=encodeSysex(); -- What is this?
     s = mysysexData:getSize();
    panel:getModulatorByName("sendDumpButton"):getComponent():setProperty ("uiButtonTextColourOff","000000",true); -- set to black etc
    totwait = tonumber( ( s * 0.32 ) + 5 );
    -- console("start timer40...");
timer:setCallback (40, timerCallback)
timer:startTimer (40, totwait); 
end --f


computerchemist


No, like I said above, I think there are two different use cases here – your one where you have little tiny packets you can break up, one at a time – in which case yes, you’d put the send in the timer function.
My use case is completely different – I have one single big packet that I can’t split. So putting it in the timer wouldn’t accomplish anything – I can’t split it, so I can’t do the bar thing, or fire off the packets one at a time to the timer.
In my code fragment above, encodesysex is the bad boy that puts together all the controllers into one sysex string – the Poly800 doesn’t understand CC’s, so it can only take one big sysex load.
My problem was this – sendMidiMessageNow is ASYNCHRONOUS. So putting one giant packet send in the timer would be meaningless, as it would just send it and return instantaneously, then spend 2-3 seconds doing the upload of that giant packet. BUT – and this was the breakthrough moment – if I can accurately calculate the exact time it takes to send that giant packet, I can tell the timer EXACTLY how long to make the LED red. So the timer callback, as above, is purely the place where it makes the LED black at the end of the 2-3 second send. Does that make sense now? There are two different use cases.
Yours works for split packets – not for giant floaters 😀
To prevent any more confusion, here is the use case for big packets in full:

function sendSysex()

-- This stops index issues during panel bootup
	if panel:getRestoreState() or panel:getBootstrapState() then
		return;
	end

    local mysysexData, my_c0, programChange, tempProg, j, currMidi, s, totwait;

	if timer:isRegistered(40) == false then
	    -- console ("timer40 not registered, do it now");
		timer:setCallback(40, timer40Callback);
	end

	if timer:isTimerRunning(40) then
		-- console ("timer40 already running, stop it");
		timer:stopTimer(40);
	end

-- update sysex and add crc
    mysysexData=MemoryBlock();
	
    mysysexData=encodeSysex();  -- create the full sysex dump

    s = mysysexData:getSize();

    totwait = tonumber( ( s * 0.32 ) + 5 ); -- 5ms for the global delay, totwait in ms

    -- console("start timer40...");
    panel:getModulatorByName("sendDumpButton"):getComponent():setProperty ("uiButtonTextColourOff","FFFF4545",true); -- make it red
    timer:startTimer (40, totwait); 

    panel:sendMidiMessageNow(CtrlrMidiMessage(mysysexData:toHexString(1)));

end

function timer40Callback()
    panel:getModulatorByName("sendDumpButton"):getComponent():setProperty ("uiButtonTextColourOff","FF454545",true); -- back to black
	timer:stopTimer(40);
    -- console("stop timer40");
end





Timer and Progressbar
---------------------


-- Called when a modulator value changes
-- @mod   http://ctrlr.org/api/class_ctrlr_modulator.html
-- @value    new numeric value of the modulator
--
sendMidi = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)
iuCounter=0 --picked up by timer callback function
upatch64=0 --picked up by timer callback function
panel:getComponent("led"):setValue(0,true)
timer:setCallback (999, timerCallback)
timer:startTimer(999,400) 
end

------
t={
"F0 41 12 10 00 00 00 F7",
"F0 41 12 10 00 00 01 F7",
"F0 41 12 10 00 00 02 F7",
"F0 41 12 10 00 00 03 F7",
"F0 41 12 10 00 00 04 F7",
"F0 41 12 10 00 00 05 F7",
"F0 41 12 10 00 00 06 F7",
"F0 41 12 10 00 00 07 F7",
"F0 41 12 10 00 00 08 F7",
"F0 41 12 10 00 00 09 F7",
"F0 41 12 10 00 00 0A F7",
"F0 41 12 10 00 00 0B F7",
"F0 41 12 10 00 00 0C F7",
"F0 41 12 10 00 00 0D F7",
"F0 41 12 10 00 00 0E F7",
"F0 41 12 10 00 00 0F F7",
"F0 41 12 10 00 00 10 F7",
"F0 41 12 10 00 00 11 F7",
"F0 41 12 10 00 00 12 F7",
"F0 41 12 10 00 00 13 F7",
"F0 41 12 10 00 00 14 F7",
"F0 41 12 10 00 00 15 F7",
"F0 41 12 10 00 00 16 F7-------------
}

----------------
--
-- Called when a modulator value changes
-- @mod   http://ctrlr.org/api/class_ctrlr_modulator.html
-- @value    new numeric value of the modulator
--
resetProgressBar = function(--[[ CtrlrModulator --]] mod, --[[ number --]] value, --[[ number --]] source)
c = panel:getComponent("PROGRESSBAR")
c:setComponentValue (0, true) 
c:setComponentText("Ready")
panel:getComponent("led"):setValue(0,true)
end

---------------------------
timerCallback = function(timerId) -- this function name must match the name above in the first line. ;)

if timerId == 999 then -- upload SYSEX re:function uploadSysex
iuCounter=iuCounter+1
local mem=MemoryBlock(t[iuCounter])
panel:sendMidiMessageNow(CtrlrMidiMessage(mem:toHexString(1)))
--console(String(t[iuCounter]))
percentComplete=math.floor(iuCounter/#t*100,0)
local bar=math.floor(iuCounter/#t,2)
c:setComponentValue (bar, false) --> percentage complete
c:setComponentText("Please wait:: "..percentComplete.."% complete")

if iuCounter >= #t then
--killtimer==1 then
    timer:stopTimer(timerId)
    iuCounter=0 -- reset
    c:setComponentValue (0, true) --> percentage complete
    c:setComponentText("Complete")
panel:getComponent("led"):setValue(1,true)
--if killtimer ~= 1 then
--panel:getComponent("led"):setValue(0,true)
--    killtimer=0
--end
end

--end

end -- timerID
end --function
-------------------------------------
