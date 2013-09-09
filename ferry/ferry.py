import numm
import pandas
import numpy
import math
tau = 2 * math.pi

def wave(row):
    return math.sin(tau * row['Date'] * 440) * 2**15 - 1
    power = 1 # round(math.log(row['Downtown.Passengers'])+16)
    return math.sin(tau/8 * row['Date'] * 440 * (3/2)**power) * 2**15 - 1

ferry = pandas.read_csv('ferry.smooth.csv')
ferry['Date'] = range(ferry.shape[0])
ferry['Downtown.Passengers.Wave'] = ferry.apply(wave, axis = 1)
numm.np2sound(ferry['Downtown.Passengers.Wave'].values, '/tmp/a.wav')
