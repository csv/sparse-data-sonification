.PHONY: download
download:
	test -f ferry.csv || wget -O ferry.csv https://data.ny.gov/api/views/v2hx-3snr/rows.csv?accessType=DOWNLOAD

smooth: download
	Rscript ferry.r
