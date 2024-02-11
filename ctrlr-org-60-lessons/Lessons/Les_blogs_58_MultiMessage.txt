
Multi Message List SysEx #300
17 mei 2021

I'm working on a simple Editor for roland Zen-Core synths (Fantom, JupiterX, AX Edge, ..).
To facilitate rapid programming, I am trying (optionally) to send the same value to 4 different parameters via Slider - SysEX - Multi Message list. Example fine tune a partial 1,2,3 and 4
Unfortunately only the first message gives correct values; the following always supply the variable = 0
Multi Message list:
SysEx,Direct,Direct,-1,-1,f0 41 10 00 00 00 52 12 01 01 20 02 xx 00 f7
SysEx,Direct,Direct,-1,-1,f0 41 10 00 00 00 52 12 01 01 21 02 xx 00 f7
SysEx,Direct,Direct,-1,-1,f0 41 10 00 00 00 52 12 01 01 22 02 xx 00 f7
SysEx,Direct,Direct,-1,-1,f0 41 10 00 00 00 52 12 01 01 23 02 xx 00 f7

Output
[16:10:27:000238]: No:[----] Val:[----] RAW:[f0 41 10 00 00 00 52 12 01 01 20 02 11 00 f7] 11 is the correct value
[16:10:27:000238]: No:[----] Val:[----] RAW:[f0 41 10 00 00 00 52 12 01 01 21 02 00 00 f7] 00 instead of 11
[16:10:27:000238]: No:[----] Val:[----] RAW:[f0 41 10 00 00 00 52 12 01 01 23 02 00 00 f7] 00 instead of 11
[16:10:27:000238]: No:[----] Val:[----] RAW:[f0 41 10 00 00 00 52 12 01 01 23 02 00 00 f7] 00 instead of 11

Is it a Bug ?


I entered the message using the mask from the editor (see shot).
For the Sysex the parameters control number and control Value -1 -1 I don't think are used: for both the range is between -2 and +127.
Even inserting the Roland checksum (z5) the result does not change
http://www.benis.it/varie/SYSEX.PNG


Dnaldoog

It is working for me on Windows version 5.3.201 - Which version of Ctrlr are you using?
For Windows you are best to use 5.3.201 and macOS 5.3.198
See attached panel
