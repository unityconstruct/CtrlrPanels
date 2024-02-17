#!/bin/bash
# 68353

# min=8896
min=68354
max=127000
for (( i=min; i<max; i++)) ; do
    echo "wget https://ctrlr.org/?ddownload=$i" | tee -a loop-wget.log
    # wget -v --content-disposition  -a loop-wget-run.log -O "ctrlr-download-$i.panel" https://ctrlr.org/?ddownload=$i
    wget -v --content-disposition  -a loop-wget-run.log https://ctrlr.org/?ddownload=$i
done 
