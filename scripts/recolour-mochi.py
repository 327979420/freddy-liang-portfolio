import sys; from PIL import Image; import numpy as np
src, out = sys.argv[1], sys.argv[2]
c=np.asarray(Image.open(src)).astype(float); rgb,a=c[...,:3],c[...,3:]
L=rgb@[.299,.587,.114]
def gmap(L,stops):
    xs=[s[0] for s in stops]; return np.stack([np.interp(L,xs,[s[1][i] for s in stops]) for i in range(3)],-1)
fur=gmap(L,[(0,(10,8,7)),(35,(31,24,19)),(80,(72,57,45)),(130,(146,125,101)),(185,(217,204,184)),(225,(240,234,222)),(255,(250,248,242))])
blue=gmap(L,[(0,(5,6,9)),(45,(14,20,30)),(110,(72,114,160)),(170,(142,180,214)),(235,(226,237,246)),(255,(255,255,255))])
H,W=L.shape; yy,xx=np.mgrid[0:H,0:W]
m=np.zeros((H,W))
for cx,cy in [(505,280),(663,283)]:
    d=np.sqrt(((xx-cx)/31)**2+((yy-cy)/28)**2); m=np.maximum(m,np.clip((1.08-d)/0.18,0,1))
m=m[...,None]*0.78
res=fur*(1-m)+blue*m
Image.fromarray(np.dstack([res,a]).clip(0,255).astype(np.uint8),'RGBA').save(out,optimize=True)
