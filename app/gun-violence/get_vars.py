import sys
with open(sys.argv[1]) as f:
	print(f.readlines()[0].split(","))
	print("\n")