#!/usr/local/bin/python3

import random
f = open("population.csv","r")

lines = f.read().splitlines()
f.close()
f = open("population_example2.csv","w")
f.write(lines[0])
f.write("\n")
for i in range(1,len(lines)):
	data = lines[i].split(",")
	dont_change = data[:-1]
	random_num = random.randint(1,10**6)
	dont_change = dont_change + [str(random_num)]
	f.write(','.join(dont_change))
	f.write("\n")
f.close()