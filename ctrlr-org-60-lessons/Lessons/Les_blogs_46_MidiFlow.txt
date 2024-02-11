Atom 2012



Yes the upper part is for the HOST<->CTRLR communication

channelize, means change the channel of the MIDI message.

MIDI-Thru dark green: messages from the host go back to the host, with channelize they go back with a different channel
MIDI-Thru dark red: the same but from INPUT device to OUTPUT device
MIDI Thru light blue: pass MIDI from the host to the MIDI OUTPUT device, if channelized change the MIDI message channel to the OUTPUT MIDI channel
MIDI Thru purple: pass MIDI from the MIDI INPUT device to the host, if channelized set the MIDI channel to the OUTPUT CHANNEL of the host (the green one)

RED settings are for to DEVICES opened by CTRLR
GREEN settings are for HOST bases MIDI communication between CTRLR PLUGIN<->HOST (this should be disabled in Standalone mode, it has no meaning then)
GREY options are Snapshot related




The host->comparator does not go to the device it just goes to the comparator witch is part of the panel, it has nothing to do with devices.

Comparator here means, that messages hit a special Comparator class and are processed for matching to Modulator MIDI types and formulas and if a match is found the found modulator’s value will be changed, normaly MIDI from the host does not hit the comparator.

Also the output from the panel to the host is not from the device (there might be a different set of messages on the device and to the host), it’s the panel that generates the MIDI messages and passes them to the device or to the host, i think it would be better if the whole gui would somehow show what generates messages what receives them, maybe i can even do some animation that shows witch way those messages are traveling.


Niels@dettenbach.de 2014

My first (hopefully simple) application should be a MIDI redirect from plugin host to a external device.

It seems if i just define a new “panel” and try to route any MIDI from plugin host to the outboard gear this doesn’t work. If i load any panel (for another device) this seems to work.

I assume i have to define some minimal stuff within a new panel to get the MIDI routing up “as usual”. What i have to do?

I think i’ve found it. The “new panel” has to get “plugin host to device” setting (default) in the right settings tab.

Next thing i look for is how to make a drop down list with MIDI devices inside the Panel to choose the output device.


atom 2012



You need to be more specific, there are 3 ways you can change a modulator in a Ctrlr panel
– by automating it from the host as a VST/AU parameter (no midi involved)
– by sending it MIDI from the host
– by sending it MIDI from the MIDI Device opened in Ctrlr

witch one is not working 4u. I also must admit that the last nightly was waaaay to early and i need to fix a lot, so be patient i’m working on it (i just don’t have so much time now it’s my first day at my new job tomorrow so i’m stressed to the max)

schpinn

 I was talking about sending MIDI from the host, Ctrlr is not responding to any MIDI (CC) data sent from the host. It is passing it through to my device, but none of the modulators seem to be moving.

I also just checked automating VST parameters, and it seems that my host cannot see any of the modulators in Ctrlr anymore. The strange thing is that if I open an old project with some VST parameters already added and automated, those still work, but I can’t seem to add any new ones.

Sending MIDI from the device opened in Ctrlr works normally.


atom

Exit edit mode in your panel, right click on it and go to panel properties, check "Accept midi from host" and "MIDI input goes to comparator"


Well if Ctrlr receives a MIDI message that changes a modulator it won’t re-send the same MIDI message out, that would cause a feedback loop

You build a panel that has some controls, each control has a MIDI message assigned to it, let’s say a CC message, you hook up your panel to a MIDI in and out, the panel transmits the right CCs to the synth. When you twist the knobs on the synth it generates the same CCs that hit Ctrlr and the right component (with that CC assigned on the panel) changes it’s state depending on the value sent from the synth, in that moment it would be stupid to re-send the same message to the Synth, since it JUST sent it to us (unless some sort of midi THRU option is set).
