# Automatically backup a MongoDB database to S3 and removal from S3

## Files structure

1. **[files](./files)** - this folder consists scripts that we need to execute **manually**: [install-ansible-deps.sh](./files/install-ansible-deps.sh), [deploy-backup-mongodb.sh](./files/deploy-backup-mongodb.sh), and scripts that **will be execute by ansible playbook**: [backup-mongodb.sh](./files/backup-mongodb.sh), [remove-old-backups.sh](./files/remove-old-backups.sh).
2. **[hosts](./hosts)** - this folder consists hosts.
3. **[vars](./vars)** - all variables that use in ansible playbook [create-backup-db.yml](./create-backup-db.yml).

## Main playbook

First and second tasks will copy shell scripts: make backup and upload to s3, remove backup from server and from s3.
```
- name: copy mongodb backup script
  sudo: yes
  copy: src={{src_backup_script}} dest={{dest_backup_script}} owner=root mode=744

- name: copy remove mongodb backups script
  sudo: yes
  copy: src={{src_remove_backup_script}} dest={{dest_remove_backup_script}} owner=root mode=744
```

Third task will create cron job that will be execute [mongodb backup script](./files/backup-mongodb.sh) once a day.
```
- name: create backup cron job
  sudo: yes
  cron: name="mongodb backup in {{env}}" minute="0" hour="0" day="*" month="*" weekday="*" job="{{dest_backup_script}}"
```

And the last task will create cron job that will be execute [remove mongodb backups script](./files/remove-old-backups.sh) once a month.
```
- name: remove old backups cron job
  sudo: yes
  cron: name="remove mongodb backups in {{env}}" minute="0" hour="0" day="1" month="*" weekday="*" job="{{dest_remove_backup_script}}"
```

## Usage

1. Create **credentials.yml** file in [vars](./vars) folder and paste credentials data. It will in a `.gitignore`.
2. Correct variables in [backup-mongodb.sh](./files/backup-mongodb.sh), [remove-old-backups.sh](./files/remove-old-backups.sh), [hosts](./hosts).
3. Install required ansible roles: execute script `sh install-ansible-deps.sh`.
4. Run our [playbook](./create-backup-db.yml): execute script `sh deploy-backup-mongodb.sh`.
