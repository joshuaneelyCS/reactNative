import GiveScore

# Provide two audio samples and compare similarities

# Returns a distance of 0 because they are identical and there are no differences
print(GiveScore.give_score("Hello World (1).wav","Hello World (1).wav"))

# Returns a greater distance because they are similar but not identical
print(GiveScore.give_score("Hello World (1).wav","Hello World (1.5).wav"))

# Returns a greater distance than the previous because they are less similar
print(GiveScore.give_score("Hello World (1).wav","Hello World (2).wav"))

# Returns a greater distance than the previous because they are no longer similar
print(GiveScore.give_score("Hello World (1).wav","Hello World (3).wav"))

# Returns the largest distance because I am no longer saying the same words
print(GiveScore.give_score("Hello World (1).wav","Dummy Recording.wav"))

