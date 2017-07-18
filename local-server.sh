#/bin/bash

fuser -k 8000/tcp
python -m http.server 8000 &