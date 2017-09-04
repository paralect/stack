#!/bin/bash
AWS_BUCKET="your_aws_bucket"

FILES=($(ls | sort))

# We will keep 31 backups, all others will be deleted
AMOUNT_REMOVE_FILES=$(( ${#FILES[@]} - 31 ))

# Index for removed files
COUNTER=$(( $AMOUNT_REMOVE_FILES - 1 ))
while [[ $COUNTER -ge 0 ]]; do
  # remove from server
  rm "${FILES[$COUNTER]}"
  # remove from s3
  s3cmd del s3://$AWS_BUCKET/backups/${FILES[$COUNTER]}
  (( COUNTER-- ))
done
