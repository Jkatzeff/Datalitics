with open("combined.csv", "r") as f:
	a = f.readlines()
	lines = a[1:]
	lines = list(sorted(lines, key=lambda x: (x.split(",")[0], int(x.split(",")[1]))))
	with open("combined_ordered.csv", "w") as g:
		g.write(a[0])
		for line in lines:
			g.write(line)