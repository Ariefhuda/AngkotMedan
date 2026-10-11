const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;
const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.csv': 'text/csv; charset=utf-8',
};
// Sama dengan aturan di _redirects (Netlify).
const ROUTES = {
  '/tentang': '/tentang.html',
  '/semua-trayek': '/semua-trayek.html',
};

function sendFile(res, status, filePath) {
  const ext = path.extname(filePath);
  res.writeHead(status, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}

http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(req.url.split('?')[0]);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Bad request');
  }

  const noSlash = urlPath.length > 1 && urlPath.endsWith('/') ? urlPath.slice(0, -1) : urlPath;
  const resolved = ROUTES[noSlash] || urlPath;

  // Tolak path yang keluar dari folder proyek (mis. /../../etc/passwd).
  const filePath = path.join(ROOT, resolved);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Forbidden');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return sendFile(res, 200, filePath);
  }
  // Berkas statis yang tidak ada dijawab 404; alamat halaman lain jatuh ke beranda.
  if (path.extname(urlPath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not found');
  }
  sendFile(res, 200, path.join(ROOT, 'index.html'));
}).listen(PORT, () => console.log(`AngkotMedan → http://localhost:${PORT}`));
