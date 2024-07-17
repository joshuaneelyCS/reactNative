<h1>Comparing Speech with Dynamic Time Warping in Python</h1>

<h2>Description</h2>
This project compares the similarity between two audio files using Dynamic Time Warping (DTW). The GetScore program takes in two audio files, extracts a numpy array representing the frequencies at a given time, converts them into Mel-Frequency Cepstral Coefficients (MFCC), and then performs the DTW algorithm using euclidean distances between each point. This then outputs a distance representing the similarities between them. The lower the number, the more similar they are.
<br />


<h2>Languages and Utilities Used</h2>

- <b>Python</b> 

<h2>Environments Used </h2>

- <b>MacOS</b> (21H2)

<h2>Program walk-through:</h2>

<p align="center">
Output of the test.py file with 5 sample audio clips saying the phrase "Hello World"<br/>
<img src="https://imgur.com/LCLJokY.png" height="80%" width="80%" alt="test.py demo"/>
<br />
</p>

<!--
 ```diff
- text in red
+ text in green
! text in orange
# text in gray
@@ text in purple (and bold)@@
```
--!>
