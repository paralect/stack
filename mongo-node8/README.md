# Handy MongoDB wrapper for Node.JS 8

There are few reasons, why we think this wrapper could be helpful to many projects:

1. Every update method emits `*.updated`, `*.created`, `*.deleted` events, which allow to listen for the database changes.
2. Implements more high level api, such as paging.
3. Implements database schema validation
