#!/bin/bash
AWS_BUCKET="maqpie"

FILES=($(ls | sort))

AMOUNT_REMOVE_FILES=$(( ${#FILES[@]} - 31 ))
COUNTER=$(( $AMOUNT_REMOVE_FILES - 1 ))
while [[ $COUNTER -ge 0 ]]; do
  rm "${FILES[$COUNTER]}"
  s3cmd del s3://$AWS_BUCKET/backups/${FILES[$COUNTER]}
  (( COUNTER-- ))
done
