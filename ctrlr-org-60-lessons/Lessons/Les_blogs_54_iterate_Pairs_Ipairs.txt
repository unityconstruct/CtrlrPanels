Dnaldoog 1 maart 2021

ipairs is a looping function for indexed tables


t={"one",23,"lua"}

for i,v in ipairs (t)
print(i,v)
end

will print

1   one
2   23
3   lua

lua arrays start at 1 not 0

You can do the same with:


for i=1,3 do
print(i,t[i])
end

for i,#t do
print(i,t[i])
end

for large tables these are faster than ipairs
(# means the size of the array =3)

when you use hash or keys things are different; you need pairs not ipairs


t={length="one",width=23,language="lua"}
for k,v in pairs (t) do
print(k,v)
end

returns


length  one
language    lua
width   23

**Note that the order returned is not the same order as listed.



Godlike-Productions

And yeah for collecting modulators. If you want to quickly go through all modulators use

n = panel:getNumModulators()

for i=0,n-1 do
mod = panel:getModulatorByIndex(i)
end

