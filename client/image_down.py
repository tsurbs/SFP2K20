from PIL import Image
import numpy as np
from scipy.stats import mode
import matplotlib.pyplot as plt

img = Image.open("../direct_map.png")

imgArr = np.array(img)

# 3840 x 2160

divisibility = 5

newImArray = np.zeros(list(map(int, np.array(imgArr.shape[:2]) / divisibility)) + [3])

for i in range(newImArray.shape[0]):
	print(i)
	for j in range(newImArray.shape[1]):
		for k in range(3):	
		    newImArray[i, j, k] = mode(
				imgArr[i * divisibility: (i + 1) * divisibility,
					   j * divisibility: (j + 1) * divisibility, k],
					   axis=None)[0]


print("HRERERE")
res = Image.fromarray(newImArray.astype(np.uint8))
res.save("newMap.png")