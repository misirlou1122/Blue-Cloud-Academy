from __future__ import annotations

import http.server
import ssl
from pathlib import Path


ROOT = Path(__file__).resolve().parent
CERT = ROOT / "certs" / "az900-local-server.pem"
KEY = ROOT / "certs" / "az900-local-server-key.pem"
HOST = "0.0.0.0"
PORT = 4443


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


def main() -> None:
    if not CERT.exists() or not KEY.exists():
        raise SystemExit("Missing HTTPS certificate. Run .\\make_https_cert.ps1 first.")

    httpd = http.server.ThreadingHTTPServer((HOST, PORT), Handler)
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.minimum_version = ssl.TLSVersion.TLSv1_2
    context.load_cert_chain(certfile=CERT, keyfile=KEY)
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
    print(f"Serving AZ-900 Coach at https://localhost:{PORT}/index.html")
    httpd.serve_forever()


if __name__ == "__main__":
    main()
