#!/bin/sh
ansible-playbook ../create-backup-db.yml -e env="production" -i ../hosts/production -u root "$@"
