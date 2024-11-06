import mutagen
import music_tag 

f = music_tag.load_file("/Users/wcastillo1/Desktop/testSong.mp3")


f['asrtist'] = 'Eladio'
art = f['artwork']



with open('/Users/wcastillo1/Desktop/foto.jpg', 'rb') as img_in:
    f['artwork'] = img_in.read()

del f['artwork']
f.remove_tag('artwork')

f.save()
 
