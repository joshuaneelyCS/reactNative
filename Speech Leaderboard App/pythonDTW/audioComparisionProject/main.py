from flask import Flask, request, jsonify
import GiveScore

app = Flask(__name__)


def compare_audio():
    file1 = request.files['file1']
    file2 = request.files['file2']

    # save the files temporarily
    file1.save('file1.wav')
    file2.save('file2.wav')

    # run the dynamic time warping function
    result = GiveScore.give_score('file1.wav','file2.wav')

    return jsonify({'score': result})


if __name__ == '__main__':
    app.run(debug=True)

