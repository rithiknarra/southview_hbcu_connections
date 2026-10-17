"""Convert a saved Overpass out-geom JSON response to locally bundled SVG.
Usage: python scripts/build-map.py /path/to/overpass.json
Map data copyright OpenStreetMap contributors, ODbL 1.0.
"""
import json, math, sys
from pathlib import Path
from html import escape
source=json.loads(Path(sys.argv[1]).read_text())
west,east,south,north=-84.44,-84.36,33.70,33.78
scale=30000
merc=lambda lat: math.degrees(math.log(math.tan(math.pi/4+math.radians(lat)/2)))
project=lambda lon,lat: ((lon-west)*scale,(merc(north)-merc(lat))*scale)
width=(east-west)*scale;height=(merc(north)-merc(south))*scale
layers={'park':[],'campus':[],'minor':[],'road':[],'major':[],'highway':[]}
labels={}
count=0
for el in source['elements']:
 tags=el.get('tags',{});geom=el.get('geometry',[])
 if not geom:continue
 h=tags.get('highway')
 if tags.get('leisure')=='park':layer='park'
 elif tags.get('amenity')=='university':layer='campus'
 elif h in ['motorway','motorway_link','trunk','trunk_link']:layer='highway'
 elif h in ['primary','primary_link','secondary','secondary_link']:layer='major'
 elif h in ['tertiary','tertiary_link','residential','unclassified','living_street']:layer='road'
 elif h in ['service','pedestrian']:layer='minor'
 else:continue
 points=[project(p['lon'],p['lat']) for p in geom]
 d='M'+'L'.join(f'{x:.1f},{y:.1f}' for x,y in points)
 if layer in ['park','campus']:d+='Z'
 layers[layer].append(f'<path d="{d}"/>');count+=1
 name=tags.get('name','')
 if layer in ['road','major'] and name and len(points)>2:
  length=sum(math.hypot(b[0]-a[0],b[1]-a[1]) for a,b in zip(points,points[1:]))
  if length>labels.get(name,(0,None))[0]:labels[name]=(length,points)
svg=''.join('<g class="geo-'+layer+'">'+''.join(paths)+'</g>' for layer,paths in layers.items())
selected=['Joseph E. Lowery Boulevard Southwest','Joseph E. Lowery Boulevard Northwest','Westview Drive Southwest','Fair Street Southwest','Lee Street Southwest','Peters Street Southwest','Northside Drive Southwest','Northside Drive Northwest','Martin Luther King Junior Drive Southwest','Ralph David Abernathy Boulevard Southwest','McDaniel Street Southwest','Whitehall Street Southwest','Joseph E. Boone Boulevard Northwest','James P Brawley Drive Southwest','Greensferry Avenue Southwest','James P Brawley Drive Northwest','Centennial Olympic Park Drive Northwest']
svg+='<g class="street-labels">'
for name,(length,pts) in labels.items():
 if name not in selected or length<60:continue
 a,b=pts[len(pts)//2-1],pts[len(pts)//2];x,y=b;angle=math.degrees(math.atan2(b[1]-a[1],b[0]-a[0]))
 if angle>90:angle-=180
 if angle< -90:angle+=180
 short=name.replace('Southwest','SW').replace('Northwest','NW').replace('Boulevard','Blvd').replace('Drive','Dr').replace('Street','St').replace('Avenue','Ave').replace('Junior','Jr.')
 svg+=f'<text transform="translate({x:.1f} {y:.1f}) rotate({angle:.1f})">{escape(short)}</text>'
svg+='</g>'
for name,lon,lat in [('DOWNTOWN',-84.39,33.755),('WEST END',-84.425,33.738),('VINE CITY',-84.416,33.761),('CASTLEBERRY HILL',-84.402,33.747),('SUMMERHILL',-84.385,33.737),('ADAIR PARK',-84.408,33.731),('MECHANICSVILLE',-84.395,33.733)]:
 x,y=project(lon,lat);svg+=f'<text class="area-label" x="{x:.1f}" y="{y:.1f}">{name}</text>'
data={'width':width,'height':height,'west':west,'north':north,'scale':scale,'source':'OpenStreetMap contributors','timestamp':source.get('osm3s',{}).get('timestamp_osm_base'),'featureCount':count,'svg':svg}
Path('dist/map-data.js').write_text('/* OpenStreetMap contributors, ODbL 1.0. See MAP-LICENSE.txt. */\nconst MAP_DATA='+json.dumps(data,separators=(',',':'))+';\n')
print('Generated real SVG map:',count,'features,',len(svg),'characters')
