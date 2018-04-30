#parser that helps in rieturning converting data.csv into tree format csv
import re

print("hello world")
with open('data_no_newline.csv') as f:
    lines = f.readlines()

#create dictionarry and insert states
Al = {'Alabama': 'AL', 'AL': 'AL'}
AK = {'Alaska': 'AK', 'AK': 'AK'}
AR = {'Arizona': 'AZ', 'AZ': 'AZ'}
CA = {'California': 'CA', 'CA': 'CA'}
CO = {'Colorado': 'CO', 'CO': 'CO'}
CT = {'Connecticut': 'CT', 'CT': 'CT'}
DE = {'Delaware': 'DE', 'DE': 'DE'}
Fl = {'Florida': 'FL', 'FL': 'FL'}
GA = {'Georgia': 'GA', 'GA':'GA'}
HI = {'Hawaii': 'HI', 'HI': 'HI'}
ID = {'Idaho': 'ID', 'ID': 'ID'}
IL = {'Illinois': 'IL', 'IL': 'IL'}
IN = {'Indiana': 'IN', 'IN':'IN'}
IA = {'Iowa': 'IA', 'IA': 'IA'}
KS = {'Kansas': 'KS', 'KS': 'KS'}
KY = {'Kentucky': 'KY', 'KY': 'KY'}
LA = {'Louisiana': 'LA', 'LA': 'LA'}
ME = {'Maine': 'ME', 'ME': 'ME'}
MD = {'Maryland': 'MD', 'MD': 'MD'}
MA = {'Massachusetts': 'MA', 'MA': 'MA'}
MI = {'Michigan': 'MI', 'MI': 'MI'}
MN = {'Minniesota': 'MN', 'MN': 'MN'}
TX = {'Texas': 'TX', 'TX': 'TX'}


def stateFind(names):
	count = 0
	init = "USA." + names.values()[0] + ","
	print(init)
	#iterate over lines
	for x in lines:
		#iterate over state matches
		for y in names:
			#output tree form
			match = re.search(y,x)
			if match:
				out = "USA." + names[y] + "." + x
				print(out)
				count += 1
	print(count)

stateFind(CA)
