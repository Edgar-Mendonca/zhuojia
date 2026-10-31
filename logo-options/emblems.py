import math, sys
N,P,S,A,W,O='#0B1F3A','#004C99','#0066CC','#00A3FF','#FFFFFF','#FFB020'
def gear(cx,cy,n,ro,ri,tw=.42):
    p=[]
    for i in range(n):
        a=i/n*2*math.pi; s=2*math.pi/n
        for r,f in ((ri,0),(ro,.5-tw/2-.08),(ro,.5+tw/2-.08),(ri,.92-.08)):
            p.append(f"{cx+r*math.cos(a+s*f):.2f} {cy+r*math.sin(a+s*f):.2f}")
    return "M"+"L".join(p)+"Z"
def hexpts(cx,cy,r,rot=-90):
    return " ".join(f"{cx+r*math.cos(math.radians(rot+60*i)):.2f},{cy+r*math.sin(math.radians(rot+60*i)):.2f}" for i in range(6))
def wrench(uid,cx,cy,ang,L,col,head=12):
    h=-L/2-head*.5
    return f'''<g transform="translate({cx} {cy}) rotate({ang})"><mask id="{uid}" maskUnits="userSpaceOnUse" x="-80" y="-80" width="160" height="160"><rect x="-80" y="-80" width="160" height="160" fill="#fff"/><path d="M{-head*.42} {h-head-2}h{head*.84}v{head*1.05}a{head*.42} {head*.42} 0 0 1 {-head*.84} 0z" fill="#000"/><polygon points="{hexpts(0,L/2+head*.35,head*.38,0)}" fill="#000"/></mask><g mask="url(#{uid})" fill="{col}"><rect x="{-head*.42}" y="{-L/2}" width="{head*.84}" height="{L}" rx="{head*.3}"/><circle cy="{h}" r="{head}"/><circle cy="{L/2+head*.35}" r="{head*.78}"/></g></g>'''
def driver(cx,cy,ang,L,col,acc):
    return f'''<g transform="translate({cx} {cy}) rotate({ang})"><rect x="-7" y="{L*.05}" width="14" height="{L*.45}" rx="6" fill="{acc}"/><path d="M-3 {L*.15}v{L*.28}M3 {L*.15}v{L*.28}" stroke="{N}" stroke-width="1.6" opacity=".35"/><rect x="-2.6" y="{-L/2+4}" width="5.2" height="{L*.56}" fill="{col}"/><path d="M-2.6 {-L/2+4}L0 {-L/2-2}L2.6 {-L/2+4}z" fill="{col}"/></g>'''

E={}
# 1 Wrench & Gear hex badge
E['wrench-gear']=('Wrench & Gear','The modern descendant of your current mark: a machined gear with a spanner laid across it, set in a hexagon nut. Instantly says "we build and fix industrial hardware".',
 lambda u: f'''<polygon points="{hexpts(50,50,48)}" fill="{P}"/><polygon points="{hexpts(50,50,42)}" fill="none" stroke="{A}" stroke-width="1.6" opacity=".55"/>
<path d="{gear(50,50,12,30,24)}" fill="{A}"/><circle cx="50" cy="50" r="15" fill="{P}"/><circle cx="50" cy="50" r="9" fill="none" stroke="{A}" stroke-width="2.5"/>
{wrench(u+'w',50,50,45,44,W,11)}''')
# 2 Split hex (evolution of current)
E['split-hex']=('Split Hex','Closest to today\'s logo, redrawn cleanly: one half is the mechanical side (spanner), the other the electronic side (half-gear turning into circuit traces). Your two disciplines in one nut.',
 lambda u: f'''<clipPath id="{u}L"><rect x="0" y="0" width="48.5" height="100"/></clipPath><clipPath id="{u}R"><rect x="51.5" y="0" width="50" height="100"/></clipPath><clipPath id="{u}H"><polygon points="{hexpts(50,50,48)}"/></clipPath>
<g clip-path="url(#{u}H)"><g clip-path="url(#{u}L)"><rect width="100" height="100" fill="{N}"/>{wrench(u+'w',34,52,0,40,W,10)}</g>
<g clip-path="url(#{u}R)"><rect width="100" height="100" fill="{S}"/><path d="{gear(52,50,14,30,24)}" fill="{A}"/><circle cx="52" cy="50" r="13" fill="{S}"/>
<path d="M60 30h12l6 6h8M62 44h18M60 58h10l6 6h10M58 70h8l4 6" fill="none" stroke="{W}" stroke-width="2.4" stroke-linecap="round"/>
{''.join(f'<circle cx="{x}" cy="{y}" r="2.8" fill="{O}"/>' for x,y in ((86,36),(80,44),(86,64),(70,76)))}</g></g>
<polygon points="{hexpts(50,50,48)}" fill="none" stroke="{N}" stroke-width="2"/>''')
# 3 Caliper & gear
E['caliper']=('Caliper & Gear','A vernier caliper measuring a gear — precision engineering in one picture. Elegant, technical and very distinctive; nobody else in your space uses it.',
 lambda u: f'''<circle cx="50" cy="50" r="48" fill="{N}"/><circle cx="50" cy="50" r="43" fill="none" stroke="{A}" stroke-width="1.4" opacity=".5"/>
<path d="{gear(44,58,13,17,13.5)}" fill="{A}"/><circle cx="44" cy="58" r="6" fill="{N}"/>
<rect x="17" y="24" width="68" height="8" rx="1.5" fill="{W}"/>{''.join(f'<path d="M{22+i*4} 24v{4 if i%2 else 6}" stroke="{N}" stroke-width="1"/>' for i in range(15))}
<path d="M17 24h9v42l-4.5 9L17 66z" fill="{W}"/><path d="M61 20h12v16h-4v30l-4.5 9L61 66z" fill="{O}"/><circle cx="67" cy="27" r="2" fill="{N}"/>''')
# 4 Crossed tools
E['crossed-tools']=('Crossed Tools','A spanner and screwdriver crossed over a gear ring — the classic engineering crest, done in a crisp flat style. Bold and readable at any size.',
 lambda u: f'''<circle cx="50" cy="50" r="48" fill="{P}"/><path d="{gear(50,50,16,40,34)}" fill="none" stroke="{A}" stroke-width="3" stroke-linejoin="round"/>
{wrench(u+'w',50,50,-45,40,W,10.5)}{driver(50,50,45,62,W,O)}<circle cx="50" cy="50" r="4" fill="{N}"/>''')
# 5 Circuit gear
E['circuit-gear']=('Circuit Gear','A gear whose right half dissolves into circuit traces, with a hex-nut core. Mechanical meets electronics & automation — the most "high-tech" of the set.',
 lambda u: f'''<clipPath id="{u}c"><rect x="0" y="0" width="50" height="100"/></clipPath>
<g clip-path="url(#{u}c)"><path d="{gear(50,50,14,44,36)}" fill="{P}"/></g><path d="M50 14a36 36 0 0 1 0 72" fill="none" stroke="{S}" stroke-width="7"/>
{''.join(f'<path d="M{50+36*math.cos(math.radians(a)):.1f} {50+36*math.sin(math.radians(a)):.1f}l{8*math.cos(math.radians(a)):.1f} {8*math.sin(math.radians(a)):.1f}h{d}" fill="none" stroke="{A}" stroke-width="2.6" stroke-linecap="round"/><circle cx="{50+44*math.cos(math.radians(a))+d:.1f}" cy="{50+44*math.sin(math.radians(a)):.1f}" r="3" fill="{O}"/>' for a,d in ((-60,4),(-25,6),(10,5),(40,7),(70,3)))}
<polygon points="{hexpts(50,50,18,0)}" fill="{N}"/><circle cx="50" cy="50" r="8" fill="{W}"/>''')
# 6 Shield crest
E['crest']=('Industrial Crest','A shield with a gear, spanner and energy bolt — covers mechanical, manufacturing and energy. Feels established and certified, great on documents and uniforms.',
 lambda u: f'''<path d="M50 3L91 15v33c0 26-18 41-41 49C27 89 9 74 9 48V15z" fill="{N}"/><path d="M50 10L84 20v28c0 21-14 34-34 41C30 82 16 69 16 48V20z" fill="none" stroke="{A}" stroke-width="1.4" opacity=".6"/>
<path d="{gear(50,52,12,26,21)}" fill="{P}"/><circle cx="50" cy="52" r="15" fill="{N}"/>
{wrench(u+'w',50,52,-40,36,W,9.5)}<path d="M57 34l-11 18h8l-5 16 14-21h-8l6-13z" fill="{O}" stroke="{N}" stroke-width="1.5"/>''')

def svg(k,size,uid): return f'<svg viewBox="0 0 100 100" width="{size}" height="{size}">{E[k][2](uid)}</svg>'
if len(sys.argv)>1:  # export one SVG
    k=sys.argv[1]; print(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">{E[k][2]("z")}</svg>'); sys.exit()
font='/home/user/zhuojia/node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2'
cards=''
for i,(k,(name,why,_)) in enumerate(E.items()):
    cards+=f'''<article><div class="hero">{svg(k,190,f"a{i}")}</div><div class="tag"><b>{i+1}</b><h2>{name}</h2></div><p>{why}</p>
<div class="lock">{svg(k,48,f"b{i}")}<span class="wm">ZHUOJIA</span><span class="zh">卓嘉</span></div>
<div class="row"><div class="dark">{svg(k,42,f"c{i}")}<span class="wm">ZHUOJIA</span></div><div class="fav">{svg(k,32,f"d{i}")}{svg(k,16,f"e{i}")}</div></div></article>'''
open('emblems.html','w').write(f'''<!doctype html><html><head><meta charset="utf-8"><title>ZHUOJIA Emblem Options</title><style>
@font-face{{font-family:Archivo;src:url(file://{font}) format("woff2");font-stretch:62% 125%;font-weight:100 900}}
body{{margin:0;padding:40px;background:#E9E7E2;font:15px/1.5 system-ui,sans-serif;color:{N}}}
h1{{font:800 34px Archivo;font-stretch:125%;margin:0 0 4px}} .sub{{margin:0 0 28px;color:#666}}
main{{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}}
article{{background:#F2F1EE;border:1px solid #d6d3cc;padding:22px;display:grid;gap:12px}}
.hero{{display:grid;place-items:center;height:240px;background:#fff;border:1px solid #e3e0da}}
.tag{{display:flex;gap:10px;align-items:center}} .tag b{{background:{N};color:#fff;font:700 13px monospace;padding:3px 9px}} h2{{margin:0;font:700 20px Archivo;font-stretch:110%}}
p{{margin:0;color:#555;min-height:66px}}
.lock{{display:flex;align-items:center;gap:12px;background:#fff;padding:14px;border:1px solid #e3e0da}}
.wm{{font:800 24px Archivo;font-stretch:125%}} .zh{{font:500 17px "WenQuanYi Zen Hei";color:#777}}
.row{{display:grid;grid-template-columns:1fr auto;gap:10px}} .dark{{display:flex;align-items:center;gap:10px;background:{N};color:#fff;padding:12px}} .dark .wm{{font-size:19px}}
.fav{{display:flex;align-items:end;gap:10px;background:#fff;padding:12px;border:1px solid #e3e0da}}
</style></head><body><h1>ZHUOJIA — emblem options</h1><p class="sub">Illustrated vector emblems in the spirit of your current spanner-and-gear mark. Shown large, with the wordmark, on dark, and at favicon size (32 / 16px).</p><main>{cards}</main></body></html>''')
