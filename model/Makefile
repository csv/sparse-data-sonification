.PHONY: download
download:
	test -e sewer.csv || wget -O sewer.csv https://data.maryland.gov/api/views/3rgd-zjxx/rows.csv?accessType=DOWNLOAD

model: download
	Rscript regress.r
