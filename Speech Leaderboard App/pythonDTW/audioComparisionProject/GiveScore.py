import soundfile as sf
import numpy as np
import matplotlib.pyplot as plt
import librosa.feature
from fastdtw import fastdtw
from scipy.spatial import distance

def load_audio(file_path):
    data, sample_rate = sf.read(file_path)
    return data, sample_rate


def extract_mfcc(audio_data, sample_rate):
    mfccs = librosa.feature.mfcc(y=audio_data, sr=sample_rate, n_mfcc=20)
    return mfccs


def compare_audio(mfcc1, mfcc2):
    distance2, path = fastdtw(mfcc1.T, mfcc2.T, dist=distance.euclidean)
    return distance2


def give_score(audioFile1, audioFile2):
    audio1, sr1 = load_audio(audioFile1)
    audio2, sr2 = load_audio(audioFile2)

    mfcc1 = extract_mfcc(audio1, sr1)
    mfcc2 = extract_mfcc(audio2, sr2)

    distance2 = compare_audio(mfcc1, mfcc2)

    return distance2



