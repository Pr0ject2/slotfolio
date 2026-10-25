"""Serve the static export without exposing index-less directory listings."""

from argparse import ArgumentParser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class ExportHandler(SimpleHTTPRequestHandler):
    def list_directory(self, path):
        self.send_error(404, "Not found")
        return None


if __name__ == "__main__":
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("port", type=int, nargs="?", default=3000)
    parser.add_argument("--directory", default="out")
    args = parser.parse_args()
    handler = partial(ExportHandler, directory=args.directory)
    with ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
        server.serve_forever()
