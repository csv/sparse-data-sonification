library(RJSONIO)

ferry <- read.csv('ferry.csv')
ferry$time <- nrow(ferry):1

k <- 1 # 30 * 1

freq = function(vec) {
  round(440 * (3/2) ^ ((vec - mean(vec)) / sd(vec)), -1)
}

ferry.smooth <- data.frame(
  Year = rep(ferry$Year, each = k),
  Month = rep(ferry$Month, each = k),
  Downtown.Passengers = density(ferry$Downtown.Passengers, n = k * nrow(ferry))$y,
  Midtown.Passengers = density(ferry$Midtown.Passengers, n = k * nrow(ferry))$y
)

a <- arpeggidata(ferry.smooth$Downtown.Passengers, sinewave, bpm = 10 / k)
b <- arpeggidata(ferry.smooth$Midtown.Passengers, sweeplow, bpm = 10 / k)
# play(b)
# play(sequence(list(b)))


# write(toJSON(apply(ferry.smooth, 1, list)), 'ferry.smooth.json')
