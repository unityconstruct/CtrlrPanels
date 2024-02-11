#END USER UTILITIES

## send sysex from file

Simple utility to load a sysex file and send to MIDI device

> **CHANGELOG**

* Version 1.0  ※ 03/23/2023 first release panel:panelMidiGlobalDelay version
* Version 2.0  ※ 03/23/2023 first release timer delay version

## Volume Randomiser

> **CHANGELOG**

* Version 1.0  ※ 01/17/2023 first release

## Template

> **CHANGELOG**

* Version 1.0  ※ 12/09/2022 first release

## MIDI Channel changer

> **CHANGELOG**

* Version 1.0  ※ 12/08/2022 first release

## Generic Sysex Dump Recorder

> **CHANGELOG**

* Version 0.97  ※ 09/18/2020 added editable sysex feature
* Version 0.95  ※ 09/17/2020 added panel zoom feature
* Version 0.90  ※ 09/16/2020 first release

## ReDominator XML Converter

> **CHANGELOG**

* Version 0.4 alpha  ※ 05/12/2021 -0.4 05/12/2021 panel automatically truncates name to 10 characters.  Switch file load *.*|.repatch
* Version 0.3 alpha  ※ 05/01/2021 -suppressed assert error message when wrong file type/size loaded.
* Version 0.2 alpha  ※ 12/14/2020 – fixed load file cancel crash – added rename function.
* Version 0.1 alpha  ※ 11/26/2020

## Roland JD-990 Sysex Dump Utility

> **CHANGELOG**

* Version 1.5  ※ 07/08/2019 Uses native lua modulo function.
* Version 1.4  ※ 09/28/2018 Minor Code & Interface updates.
* Version 1.3  ※ 09/25/2018 Fixed popup dialogue potentially showing on panel load.
* Version 1.2  ※ 08/19/2018 Fixed panel size (24px Ctrlr Bug).
* Version 1.1  ※ 07/09/2018 Changed checksum function; minor interface updates.
* Version 1.0  ※ 07/06/2018

----

#DEVELOPER TOOLS
###(_See "developer tools" directory_)
## Radio Button Code Generator

> **CHANGELOG**

* Version 1.0 ※ 10/22/2020

## Roland-Yamaha Checksum Calculator

Calculate checksums for sysex messages for either Roland or Yamaha devices.

> **CHANGELOG**

* Version 3.0 ※ 01/19/2023
* Version 2.0 ※ 05/16/2021
* Version 1.0 ※0 4/26/2020

## Interpolate Displayed Values Generator

If you have a uiSlider (_for example_) that needs to send 0-127 values to MIDI device, but the values to display range (_for example_) -24 - +24 this panel can generate interpolated values which are then pasted into **uiFixedSlider** _Slider Contents_. The _uiSlider_ needs to be changed to _uiFixedSlider_.

> **CHANGELOG**

* Version 1.0 ※  06/24/2021

##LCD xpm Matrix

An example of how to create (XPM like) dot matrices of text saved in lua tables as 0/1s.

> **CHANGELOG**

* Version 1.0 ※  06/24/2021

##zipFile-SVG

An example of how to load zipped SVG files into a panel.
As far as I know SVG files cannot be loaded directly.

> **CHANGELOG**

* Version 1.0 ※  06/24/2021

##paint tab bgcolor

An example of how to change the background colour of a tab. Credit to TEDJUH for discovering how to do this.

> **CHANGELOG**

* Version 1.0 ※  06/24/2021

##JSON example

An example of how to use JSON to save data to disk and reload.

> **CHANGELOG**

* Version 1.0 ※  06/24/2021


JSON example_2.0.simplified &#8226; A simplified version of how to use JSON to save data to disk and reload.

> **CHANGELOG**

* Version 2.0 ※  07/03/2021

JSON example_3.0.simplified with timer.
A simplified version of how to use JSON to save data to disk and reload.
On loading JSON file modulators send MIDI back to MIDI device at designated interval.

> **CHANGELOG**

* Version 3.0 ※  07/11/2021
