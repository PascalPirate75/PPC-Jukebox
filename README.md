A web-based music player. 

Have a bunch of music files and want to serve them to your home place this in a root music with sub folders containing the wav or mp3 files. 

In the tools folder you will find some tools. One is "buildDir.sh" that uses "buildDir.py" to create a folder list for the jukebox to find songs. "cleanDir.sh" is experimental and I don't trust it, but it is designed to clean up file names, capitalizing words, removing spaces and other specials. "jukebox.sh" creates a web server and allows you to find jukebox at "localhost:8000". I like to use these out of the music root but for clarity I moved them to tools. Python is needed to run some of these. I have tested this using the python web server on Linux and W10 and on Linux running apache2 web server. 

Enjoy. 