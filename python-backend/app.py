from flask import Flask, request, jsonify
import mp3handler

app = Flask(__name__)

@app.route('/')
def home():
    return "hello world"

@app.route('/get_tags', methods=['POST'])
def get_tags():
    data = request.json
    file_path = data.get('file_path')
    print(file_path)
    result = mp3handler.read_tags(file_path)  # Use function from tag_utils
    return jsonify(result)


@app.route('/update_tags', methods=['POST'])
def update_tags():
    data = request.json
    file_path = data.get('file_path')
    title = data.get('title', None)
    artist = data.get('artist', None)
    album = data.get('album', None)
    year = data.get('year', None)
    genre = data.get('genre', None)
    
    result = mp3handler.update_tags(file_path, title, artist, album, year, genre)  # Use function from tag_utils
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)

    

