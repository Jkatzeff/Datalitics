#parser that helps in rieturning converting data.csv into tree format csv
import re

with open('data_no_newline.csv') as f:
    lines = f.readlines()
    
#create dictionarry and insert states
AL = {'Alabama':'AL', 'AL': 'AL'}
AK = {'Alaska': 'AK', 'AK': 'AK'}
AR = {'Arizona': 'AZ', 'AZ': 'AZ'}
CA = {'California': 'CA', 'CA': 'CA'}
CO = {'Colorado': 'CO', 'CO': 'CO'}
CT = {'Connecticut': 'CT', 'CT': 'CT'}
DE = {'Delaware': 'DE', 'DE': 'DE'}
FL = {'Florida': 'FL', 'FL': 'FL'}
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
MS = {'Mississippi': 'MS', 'MS':'MS'}
MO = {'Missouri':'MO', 'MO':'MO'}
MT = {'Montana': 'MT', 'MT':'MT'}
NE = {'Nebraska': 'NE', 'NE':'NE'}
NV = {'Nevada':'NV', 'NV': 'NV'}
NH = {'New Hampshire': 'NH', 'NH':'NH'}
NJ = {'New Jersey':'NJ', 'NJ':'NJ'}
NM = {'New Mexico': 'NM', 'NM':'NM'}
NY = {'New York': 'NY', 'NY':'NY'}
NC = {'North Carolina':'NC', 'NC':'NC'}
ND = {'North Dakota':'ND', 'ND':'ND'}
OH = {'Ohio':'OH', 'OH':'OH'}
OK = {'Oklahoma':'OK','OK':'OK'}
OR = {'Oregon':'OR','OR':'OR'}
PA = {'Pennslyvania':'PA', 'PA':'PA'}
RI = {'Rhode Island':'RI','RI':'RI'}
SC = {'South Carolina':'SC','SC':'SC'}
SD = {'South Dakota':'SD','SD':'SD'}
TN = {'Tennessee':'TN','TN':'TN'}
TX = {'Texas': 'TX', 'TX': 'TX'}
UT = {'Utah':'UT','UT':'UT'}
VT = {'Vermont':'VT','VT':'VT'}
VA = {'Virginia':'VA', 'VA':'VA'}
WA = {'Washington':'WA', 'WA':'WA'}
WV = {'West Virginia':'WV','WV':'WV'}
WI = {'Wisconsin':'WI', 'WI':'WI'}
WY = {'Wyoming':'WY', 'WY':'WY'}


def stateFind(names):
    with open('treedata.csv','a') as outcsv:
        count = 0
        init = "USA." + names.values()[0] + ",\n"
        outcsv.write(init)
        #iterate over lines
        for x in lines:
            #iterate over state matches
            for y in names:
                #output tree form
                match = re.search(y,x)
                if match:
                    out = "USA." + names[y] + "." + x
                    outcsv.write(out)
                    count += 1
    outcsv.closed

stateFind(IL)
stateFind(IN)
stateFind(IA)
