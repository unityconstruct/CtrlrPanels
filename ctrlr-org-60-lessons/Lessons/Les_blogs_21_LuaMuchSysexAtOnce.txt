artofnois (october 2015)

How can I select several files (syx) at a time to load all of them?
I can olnly open 1 at a time.



atom

something like that should work in the new build


t = {}
utils:openMultipleFilesWindow (String("Title"), File("/"), String("*.*"), false, t)
for i=0,3 do
f = t
if f ~= nil then
console (f:getFileName())
end
end
