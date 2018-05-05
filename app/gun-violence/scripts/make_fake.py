import random

g=open("combined-fake.csv", "w+")
with open("combined_ordered.csv", "r") as f:
	for line in f.readlines()[1:]:
		x = line.split(",")
		randnum = random.random()*10
		g.write(",".join(x[:-1]+[str(randnum)]))
		g.write("\n")
g.close()
