import urllib.request
import re

url = "https://tiktok-killa-dashboard.vercel.app/"
q = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(q).read().decode('utf-8')
    scripts = re.findall(r'src="(/assets/index-[^"]+\.js)"', html)
    if scripts:
        js_url = url.rstrip('/') + scripts[0]
        print(f"JS URL: {js_url}")
        js_content = urllib.request.urlopen(urllib.request.Request(js_url, headers={'User-Agent': 'Mozilla/5.0'})).read().decode('utf-8')
        if "tiktok-killa-backend.onrender.com" in js_content:
            print("SUCCESS: Vercel is using the Render backend!")
        elif "127.0.0.1" in js_content:
            print("ERROR: Vercel is still using localhost!")
        else:
            print("Unknown backend URL in JS")
    else:
        print("No JS scripts found in HTML")
except Exception as e:
    print(f"Failed: {e}")
