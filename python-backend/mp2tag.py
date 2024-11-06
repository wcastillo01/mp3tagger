from mp3_tagger import MP3File, VERSION_2

mp3 = MP3File("/Users/wcastillo1/Custom Spotify/testSong.mp3")
mp3.set_version(VERSION_2)

del mp3.url
# mp3.artist =
mp3.song = "dadas's boy"
mp3.album  = "Tiny Desk"
mp3.artist  = "Eladio Carrion"
mp3.track = "3"
mp3.comment = "comment"
mp3.year = "2003"
mp3.genre = "Pop"
mp3.band = "i do know"
mp3.composer = "just proving"
mp3.publisher = "universal?"

# MP3File.



mp3.save()





# Buscar tag 
# tags = mp3._get_tags("artist")

# tags = mp3.get_tags()

print(f"{mp3.song}, {mp3.artist}, {mp3.album}")
# print(tags)
