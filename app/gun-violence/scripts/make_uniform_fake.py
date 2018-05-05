import sys
import random
with open(sys.argv[1], "w+") as f:
	f.write("Country,Year,Deaths Per Capita\n")
	countries = ["AUS", "FR", "USA"]
	for i in range(3):
		for j in range(1979,2018):
			f.write(countries[i]+","+str(j)+","+str(random.random()*10)+"\n")
