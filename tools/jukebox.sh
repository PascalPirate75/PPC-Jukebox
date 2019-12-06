#!/bin/bash
if [ "$1" == "start" ] ; then
    python -m SimpleHTTPServer 8000  >/dev/null 2>&1 &
    firefox http://localhost:8000/index.html
    echo "Run ./jukebox.sh stop to stop server."
elif [ "$1" == "stop" ]; then
    pkill -f "python -m SimpleHTTPServer 8000"
else
    echo "USAGE ./jukeBox.sh start & ./jukeBox.sh stop"
fi
echo "type ps -ef | grep \"python -m SimpleHTTPServer 8000\" to get status of server."
