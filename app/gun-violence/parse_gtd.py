import sys
labels = ["DATE", "COUNTRY", "FATALITIES"]
g=open(sys.argv[1].split("unparsed")[0]+"parsed.csv", "w")
g.write(",".join(labels))
g.write("\n")
with open(sys.argv[1], "r") as f:
	indices =[]
	lines = f.readlines()
	for label in labels:
		indices.append(lines[0].split(",").index(label))
	data_lines = lines[1:]
	for line in data_lines:
		care = line.split(",")
		b = []
		for index in indices:
			b = b+[care[index]]
		g.write(",".join(b))
		g.write("\n")
	g.close()

