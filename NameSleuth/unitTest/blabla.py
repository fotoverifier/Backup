test = open("factor.txt", "r")
d = {}
a = test.readlines()

def aaa(s):
    s = s.strip().split(": ")[1]
    return int(s)

a = list(map(aaa, a))

for i in a:
    if i in d.keys():
        d[i] += 1
    else:
        d[i] = 1
for i in sorted(d.items(), key=lambda item: item[1], reverse=True):
    print(f"{i[0]}: {i[1]}")