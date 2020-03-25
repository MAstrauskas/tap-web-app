#!/bin/bash

echo "Running tests with coverage..."

yarn

yarn client-dependencies

yarn test-client

echo "Tests ran successfully & report generated."