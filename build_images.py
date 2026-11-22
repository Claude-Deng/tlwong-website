from PIL import Image
from collections import Counter
import os

src = r"D:\harnessspaces\tlwong-site-20261122"
out = r"D:\harnessspaces\tlwong-site\assets\img"

im = Image.open(os.path.join(src, "original-home.png")).convert("RGB")
crop = im.crop((400, 60, 475, 200))
cnt = Counter(crop.getdata())
print("LOGO COLORS:")
for c, n in cnt.most_common(10):
    print(c, n)

jobs = [
    ("c-kl-dusk.jpg", "hero-kl.webp", 2000, 82),
    ("c-meeting-a.jpg", "about-team.webp", 1600, 82),
    ("c-meeting-c.jpg", "meeting-wide.webp", 1600, 82),
    ("c-account-b.jpg", "detail-accounting.webp", 1600, 82),
    ("c-arch-b.jpg", "arch-tower.webp", 1400, 82),
    ("c-arch-a.jpg", "arch-modern.webp", 1500, 82),
    ("kl-night-1.jpg", "kl-night.webp", 1400, 80),
]
for f, name, w, q in jobs:
    p = os.path.join(src, f)
    img = Image.open(p).convert("RGB")
    if img.width > w:
        h = round(img.height * w / img.width)
        img = img.resize((w, h), Image.LANCZOS)
    dest = os.path.join(out, name)
    img.save(dest, "WEBP", quality=q, method=6)
    print(name, img.size, round(os.path.getsize(dest) / 1024, 1), "KB")
