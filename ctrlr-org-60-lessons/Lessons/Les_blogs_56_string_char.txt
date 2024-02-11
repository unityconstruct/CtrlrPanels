mtarenskeen
22 maart 2021

I have experienced problems using certain characters in a uiListBox uiListBoxContent. In some of my panels I uses a uiListBox to display a list of patchnames. The characters that I found that give problems are:

ASCII 34 (")
ASCII 39 (')
ASCII 44 (,)
ASCII 61 (=)

I have worked around the problem by writing some LUA code to replace these characters with a ".". But maybe someone knows a better solution to allow displaying such characters in a uiListBox? I don't need complete Unicode support for this purpose, but would be happy enough with 7 bits ASCII support for ASCII characters 32 to 126.


DnaldeT

Do you use string.char(arg)?

So (") would become string.char(34)
