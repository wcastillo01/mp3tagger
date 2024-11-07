from mutagen.mp3 import MP3
from mutagen.id3 import ID3, TIT2, TPE1, TALB, TRCK, TCON, TYER, APIC, error

def load_mp3(file_path:str):
    try:
        song = MP3(file_path, ID3=ID3)
        if song.tags is None:
            song.add_tags()
        return song
    except error as e:
        print(f"Failed to load file. Error: {e}")
        return None
    
def update_tags(file_path:str, title:str=None, artist:str=None, album:str=None, year:str=None, genre:str=None):
    song = load_mp3(file_path)
    if song is None:
        return "Failed to load file."

    if title:
        song["TIT2"] = TIT2(encoding=3, text=title)
    if artist:
        song["TPE1"] = TPE1(encoding=3, text=artist)
    if album:
        song["TALB"] = TALB(encoding=3, text=album)
    if year:
        song["TYER"] = TYER(encoding=3, text=str(year))
    if genre:
        song["TCON"] = TCON(encoding=3, text=genre)

    song.save()
    return "Tags updated successfully."

def add_cover_art(file_path, image_path):
    song = load_mp3(file_path)
    if song is None:
        return "Failed to load file."

    with open(image_path, "rb") as img_file:
        song["APIC"] = APIC(
            encoding=3,  #a UTF-8 encoding
            mime="image/.png",  # Or "image/png"
            type=3,  # Cover art type
            desc="Cover",
            data=img_file.read(),
        )
    song.save()
    return "Cover art added successfully."

def remove_cover_art(file_path):
    song = load_mp3(file_path)
    song.tags.delall("APIC")
    song.save()
    return "Cover art removed successfully."

def read_tags(file_path):
    song = load_mp3(file_path)
    if song is None:
        return "Failed to load file."

    tags = {
        "Title": song.get("TIT2", None),
        "Artist": song.get("TPE1", None),
        "Album": song.get("TALB", None),
        "Year": song.get("TYER", None),
        "Genre": song.get("TCON", None),
    }

    # Convert to readable text
    return {key: val.text[0] if val else None for key, val in tags.items()}

if __name__ == "__main__":
    # load_mp3("/Users/wcastillo1/Custom Spotify/testSong.mp3")
    # update_tags("/Users/wcastillo1/Custom Spotify/testSong.mp3", "mama's boy")
    # print(read_tags("/Users/wcastillo1/Custom Spotify/testSong.mp3"))
    
    add_cover_art("/Users/wcastillo1/Custom Spotify/testSong.mp3", "/Users/wcastillo1/Desktop/foto.jpg")
    # remove_cover_art("/Users/wcastillo1/Custom Spotify/testSong.mp3")