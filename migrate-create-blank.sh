#!/bin/bash

# Check if migration name is provided
if [ -z "$1" ]; then
  echo "Error: Migration name is required."
  exit 1
fi

# Get the migration name from the first argument
MIGRATION_NAME=$1

# Construct the TypeORM command
COMMAND="ts-node ./node_modules/typeorm/cli.js migration:create src/db/migration/${MIGRATION_NAME}"

# Run the command and check for errors
echo "Running: $COMMAND"
$COMMAND

if [ $? -ne 0 ]; then
  echo "Error generating migration."
  exit 1
fi

echo "Migration created successfully."
