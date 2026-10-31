import math, sys
N,P,S,A,L,O='#0B1F3A','#004C99','#0066CC','#00A3FF','#8FD3FF','#FFB020'
def iso_top(cx,cy,s): return f"matrix({.866*s:.3f} {.5*s:.3f} {-.866*s:.3f} {.5*s:.3f} {cx} {cy})"
M={}
M['block']=('Machined Block','An isometric part with the Z precision-milled into its face. It shows exactly what you do: a design turned into a real, manufactured component. Three faces = design, manufacture, deliver.',
 lambda u,d: f'''<polygon points="50,6 88,28 50,50 12,28" fill="{A}"/><polygon points="12,28 50,50 50,94 12,72" fill="{P}"/><polygon points="88,28 50,50 50,94 88,72" fill="{N if not d else '#1B3B66'}"/>
<g transform="matrix(.866 .5 0 1 31 61)"><path d="M-12 -14h24v6L-4 8h16v6h-24v-6L4 -8h-16z" fill="{A}"/></g><ellipse cx="50" cy="28" rx="9" ry="5.2" fill="{S}"/>
''')
M['lines']=('Precision Lines','A Z drawn with parallel machined lines, like a CNC surface finish or a technical scan. It is calm, exact and corporate, and it stays crisp from a billboard down to a favicon.',
 lambda u,d: f'''<clipPath id="{u}"><path d="M10 12h80v20L42 70h48v18H10V68l48-38H10z"/></clipPath>
<g clip-path="url(#{u})">{''.join(f'<rect x="0" y="{12+i*7.6:.1f}" width="100" height="4.6" fill="{[P,P,S,S,S,A,A,A,A,L,L][i] if not d else [L,L,A,A,A,A,S,S,S,S,S][i]}"/>' for i in range(11))}</g>''')
M['globe']=('Global Route','A globe with a single Z-shaped route linking two points. It stands for international sourcing and delivery: engineering in one place, manufacturing in another, connected by ZHUOJIA.',
 lambda u,d: f'''<circle cx="50" cy="50" r="42" fill="{P}"/><g fill="none" stroke="{A}" stroke-width="1.2" opacity=".55"><ellipse cx="50" cy="50" rx="18" ry="42"/><ellipse cx="50" cy="50" rx="34" ry="42"/><path d="M8 50h84M14 30h72M14 70h72"/></g>
<path d="M27 32h40L33 68h40" fill="none" stroke="{'#fff'}" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="27" cy="32" r="6" fill="{O}"/><circle cx="73" cy="68" r="6" fill="{O}"/>''')
M['layers']=('Rising Layers','Five stacked layers building upwards, like additive manufacturing or a structure being erected. Reads as growth, capability and building things layer by layer, from drawing to delivery.',
 lambda u,d: ''.join(f'<path d="M{18+i*6} {82-i*15}h{50}l{10} -10h-{50}z" fill="{c}"/>' for i,c in enumerate([N if not d else '#2A4D7A',P,S,A,L])))
M['toolpath']=('Toolpath ZJ','The letters Z and J drawn as toolpaths, the way a CNC machine traces a toolpath. The dotted orange line is the machine\'s travel move between cuts. Elegant and personal: it is your name, machined.',
 lambda u,d: f'''<path d="M12 22h38L12 78h38" fill="none" stroke="{P if not d else A}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M50 78L64 22" stroke="{O}" stroke-width="2" stroke-dasharray="2.5 3.5" stroke-linecap="round"/>
<path d="M64 22h24M80 22v40a13 13 0 0 1-26 2" fill="none" stroke="{S if not d else L}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="12" cy="22" r="6" fill="{O}"/>''')
M['datum']=('Centre of Mass','The engineering centre-of-mass symbol: a circle in four quarters, two filled. It means balance and getting the fundamentals exactly right. Very minimal and confident, the kind of mark a large engineering firm would use.',
 lambda u,d: f'''<circle cx="50" cy="50" r="42" fill="{'#fff' if not d else N}" stroke="{P if not d else A}" stroke-width="5"/><path d="M50 50V8a42 42 0 0 1 42 42z" fill="{P if not d else A}"/><path d="M50 50v42A42 42 0 0 1 8 50z" fill="{S if not d else L}"/>
<path d="M50 2v96M2 50h96" stroke="{N if not d else '#fff'}" stroke-width="2"/><circle cx="50" cy="50" r="4" fill="{O}"/>''')
def svg(k,size,u,d=False): return f'<svg viewBox="0 0 100 100" width="{size}" height="{size}">{M[k][2](u,d)}</svg>'
if len(sys.argv)>1: print(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">{M[sys.argv[1]][2]("z",False)}</svg>'); sys.exit()
font='/home/user/zhuojia/node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2'
cards=''
for i,(k,(name,why,_)) in enumerate(M.items()):
    cards+=f'''<article><div class="hero">{svg(k,180,f"a{i}")}</div><div class="tag"><b>{i+1}</b><h2>{name}</h2></div><p>{why}</p>
<div class="lock">{svg(k,46,f"b{i}")}<span><span class="wm">ZHUOJIA</span><small>卓嘉 · ENGINEERING &amp; CONSULTANTS</small></span></div>
<div class="row"><div class="dark">{svg(k,40,f"c{i}",True)}<span class="wm">ZHUOJIA</span></div><div class="fav">{svg(k,32,f"d{i}")}{svg(k,16,f"e{i}")}</div></div></article>'''
open('marks.html','w').write(f'''<!doctype html><html><head><meta charset="utf-8"><title>ZHUOJIA Logo Concepts</title><style>
@font-face{{font-family:Archivo;src:url(file://{font}) format("woff2");font-stretch:62% 125%;font-weight:100 900}}
body{{margin:0;padding:40px;background:#E9E7E2;font:15px/1.5 system-ui,sans-serif;color:{N}}}
h1{{font:800 34px Archivo;font-stretch:125%;margin:0 0 4px}} .sub{{margin:0 0 28px;color:#666;max-width:900px}}
main{{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}}
article{{background:#F2F1EE;border:1px solid #d6d3cc;padding:22px;display:grid;gap:12px;align-content:start}}
.hero{{display:grid;place-items:center;height:240px;background:#fff;border:1px solid #e3e0da}}
.tag{{display:flex;gap:10px;align-items:center}} .tag b{{background:{N};color:#fff;font:700 13px monospace;padding:3px 9px}} h2{{margin:0;font:700 20px Archivo;font-stretch:110%}}
p{{margin:0;color:#555;min-height:90px}}
.lock{{display:flex;align-items:center;gap:14px;background:#fff;padding:14px;border:1px solid #e3e0da}} .lock>span{{display:grid}}
.wm{{font:800 25px/1 Archivo;font-stretch:125%}} small{{font:600 9.5px monospace;letter-spacing:.14em;color:#667;margin-top:5px}}
.row{{display:grid;grid-template-columns:1fr auto;gap:10px}} .dark{{display:flex;align-items:center;gap:12px;background:{N};color:#fff;padding:12px}} .dark .wm{{font-size:19px}}
.fav{{display:flex;align-items:end;gap:10px;background:#fff;padding:12px;border:1px solid #e3e0da}}
</style></head><body><h1>ZHUOJIA — logo concepts</h1><p class="sub">Each mark tells part of the company story: you engineer, manufacture and source industrial parts to exact standards. Shown large, as a full lockup, on dark, and at favicon size (32 / 16px).</p><main>{cards}</main></body></html>''')
