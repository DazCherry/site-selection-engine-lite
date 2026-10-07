"""Render an original static brand card with Pillow; no location or result data."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root=Path(__file__).resolve().parent.parent
im=Image.new('RGB',(1200,630),'#f5f4ef');d=ImageDraw.Draw(im)
fontroot=Path('/System/Library/Fonts/Supplemental')
def font(name,size):return ImageFont.truetype(str(fontroot/name),size)
sans=font('Arial.ttf',24);small=font('Arial.ttf',18);bold=font('Arial Bold.ttf',26);hero=font('Georgia.ttf',62)
d.rounded_rectangle((24,24,1176,606),radius=25,outline='#d3d8ce',width=2)
d.polygon([(72,72),(93,93),(72,114),(51,93)],fill='#325948');d.ellipse((67,88,77,98),fill='#debd74')
d.text((112,76),'SITEBUDDY',font=bold,fill='#263a30');d.rounded_rectangle((289,75,367,113),radius=7,outline='#bac5ba',width=1);d.text((307,84),'FREE',font=small,fill='#263a30')
d.text((60,174),'A first look at',font=hero,fill='#293c31');d.text((60,250),'your next location.',font=hero,fill='#66755b')
d.text((62,360),'Explore a public U.S. address.',font=sans,fill='#293c31');d.text((62,401),'No account. Three simple dimensions.',font=sans,fill='#293c31')
d.line((62,483,665,483),fill='#d3d8ce',width=2);d.text((62,511),'Mapped context, not a prediction of success.',font=small,fill='#536456')
for i,(title,subtitle) in enumerate([('Retail variety','Nearby shop categories'),('Everyday amenities','Useful local services'),('Transit proximity','Distance to a mapped stop')]):
 y=166+i*125;d.rounded_rectangle((758,y,1135,y+105),radius=15,fill='#e7ece3');d.text((780,y+15),'0'+str(i+1),font=small,fill='#71806a');d.text((824,y+15),title,font=bold,fill='#293c31');d.text((780,y+60),subtitle,font=small,fill='#536456')
im.save(root/'dist/social-card.png',optimize=True)
