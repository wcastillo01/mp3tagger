import mutagen
from mutagen.id3 import ID3, APIC
from mutagen.mp3 import MP3
import mutagen.mp3


mysong = mutagen.File("/Users/wcastillo1/Custom Spotify/testSong.mp3", options=None, easy=True)

mysong["title"] = "mama's boy"
print(mysong)

mutagen.tags.save()

# from mutagen import File

def add_album_art(music_file_path, image_path):
    try:
        audio = MP3(music_file_path)
        if not audio.tags:
            audio.add_tags()
        
        # Open and read the image
        with open(image_path, 'rb') as image_file:
            image_data = image_file.read()
        
        # Add the image to the audio file
        audio.tags.add(
            APIC(
                encoding=3,  # UTF-8
                mime='image/jpg',  # Change this if using a different image format (e.g., 'image/png')
                type=3,  # 3 is for cover image
                desc='Cover',
                data=image_data
            )
        )
        
        # Save the changes
        audio.save()
        print(f"Successfully added album art to {music_file_path}")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")


def remove_album_art(music_file_path):
    try:
        # Load the audio file
        audio = MP3(music_file_path)
        
        # Check if file has ID3 tags
        if not audio.tags:
            print("No ID3 tags found")
            return
        
        # Remove all APIC frames (album art)
        audio.tags.delall('APIC')
        
        # Save the changes
        audio.save()
        print(f"Successfully removed album art from {music_file_path}")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")


if __name__ == "__main__":

    add_album_art("/Users/wcastillo1/Custom Spotify/testSong.mp3", "/Users/wcastillo1/Desktop/foto.jpg")
    # remove_album_art("/Users/wcastillo1/Custom Spotify/testSong.mp3")
