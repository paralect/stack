#!/bin/bash

# WARNING: Ensure that locale variable are set to default during script execution
# locale variables MUST BE set for successful backup
export LC_ALL="C"

MONGODUMP_PATH="mongodump"
MONGO_HOST="localhost"
MONGO_PORT="27017"

CHAT_DB=maqpie-chat-production # replace with your name of DB

TIMESTAMP=`date +%F-%H%M`

AWS_BUCKET="your_aws_bucket"

# Create backup
$MONGODUMP_PATH -h $MONGO_HOST:$MONGO_PORT -d $CHAT_DB

# Add timestamp to backup
mv dump mongodb-$HOSTNAME-$TIMESTAMP
tar -czvf mongodb-$HOSTNAME-$TIMESTAMP.tar mongodb-$HOSTNAME-$TIMESTAMP

s3cmd put mongodb-$HOSTNAME-$TIMESTAMP.tar s3://$AWS_BUCKET/backups/mongodb-$HOSTNAME-$TIMESTAMP.tar

rm -rf ./mongodb-$HOSTNAME-$TIMESTAMP
