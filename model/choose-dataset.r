socrata <- read.csv('socrata.csv')
s <- subset(socrata, ncol.date > 0 & displayType == 'table')
s[order(s$nrow, decreasing = T), c('portal', 'id', 'nrow', 'name')][1:30,]

s <- subset(socrata, ncol.date > 0 & displayType == 'table' & tableId != 891456 & grepl('onthly', name))

