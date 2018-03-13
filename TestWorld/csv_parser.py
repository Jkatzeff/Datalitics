f = open("population.csv","r")
lines = f.readlines()
lastyr_only = []
for line in lines[1:]:
	year = line.split(",")[-2]
	if int(year) == 2016:
		lastyr_only.append(line)
f.close()
f = open("population_parsed.csv", "w")
f.write(lines[0])
for country_data in lastyr_only:
	f.write(country_data)
f.close()