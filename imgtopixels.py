from PIL import Image
im = Image.open("Model/most_awesome_map_ever.png", "r")
pix_val = list(im.getdata())
print pix_val