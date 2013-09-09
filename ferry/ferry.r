library(RJSONIO)

ferry <- read.csv('ferry.csv')
ferry$time <- nrow(ferry):1

k <- 30 * 1

ferry.smooth <- data.frame(
  Year = rep(ferry$Year, each = k),
  Month = rep(ferry$Month, each = k),
  Downtown.Passengers = density(ferry$Downtown.Passengers, n = k * nrow(ferry))$y,
  Midtown.Passengers = density(ferry$Midtown.Passengers, n = k * nrow(ferry))$y
)

write(toJSON(apply(ferry.smooth, 1, list)), 'ferry.smooth.json')
