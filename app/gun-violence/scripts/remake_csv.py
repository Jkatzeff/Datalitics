#USAGE: remake_csv.py FILENAME.csv OUTPUT_NAME.csv
#OUTPUT: new file OUTPUT_NAME [with vars you'd like -- asks interactively]
import sys
from csv import reader
filename = sys.argv[1]
output = sys.argv[2]
g = open(output, "w+")

with open(filename, "r") as f:
	lines = f.readlines()
	var_names = lines[0].split(",")
	var_names[-1]=var_names[-1][:-1]
	indices = []
	curr_index = 0
	vars_used = []
	num_vars = len(var_names)
	for var_name in var_names:
		get_var = ""
		while(get_var!="n" and get_var!="y"):
			get_var = input("Would you like to use " + var_name + " in your new csv? 'y' for yes 'n' for no.")
		if get_var == 'y':
			indices = indices + [curr_index]
			vars_used = vars_used + [var_name]
		curr_index+=1
	g.write(",".join(vars_used))
	g.write("\n")
	for curr_entry in reader(lines[1:]):
		vars_used = []
		if(len(curr_entry)!=num_vars or '' in curr_entry):
			continue
		for index in indices:
			vars_used = vars_used + [curr_entry[index]]
		g.write(",".join(vars_used))
		g.write("\n")
g.close()