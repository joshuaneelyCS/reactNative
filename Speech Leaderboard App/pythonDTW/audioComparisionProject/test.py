import GiveScore

# Provide two audio samples and compare similarities

sample1 = "test_audio/Hello World (1).wav"
sample2 = "test_audio/Hello World (1.5).wav"
sample3 = "test_audio/Hello World (2).wav"
sample4 = "test_audio/Hello World (3).wav"
sample5 = "test_audio/Dummy Recording.wav"

# Returns a distance of 0 because they are identical and there are no differences
print(GiveScore.give_score(sample1, sample1))

# Returns a greater distance because they are similar but not identical
print(GiveScore.give_score(sample1, sample2))

# Returns a greater distance than the previous because they are less similar
print(GiveScore.give_score(sample1, sample3))

# Returns a greater distance than the previous because they are no longer similar
print(GiveScore.give_score(sample1, sample4))

# Returns the largest distance because I am no longer saying the same words
print(GiveScore.give_score(sample1, sample5))

