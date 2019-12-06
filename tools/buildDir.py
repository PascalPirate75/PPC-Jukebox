# see buildDir.sh
import sys

skipList = sys.argv[2:]
fileName = sys.argv[1]
tempList = []
skip = True
print ("\"[", end='')

with open(fileName) as fp:
   line = fp.readline()
   while line:
      if (not(line.strip() in skipList)):
         print("\\\"{}/\\\"".format(line.strip()),end='')
         skip = False
      tempList.append(line)
      oldLine = line
      line = fp.readline()
      if (line and not(line.strip() in skipList)and not(oldLine.strip() in skipList)):
         print(",",end="")
      skip = True
print("]\"",end="")

