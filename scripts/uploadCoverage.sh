#!/bin/bash

echo "Uploading code coverage to Codecov..."
 
cd client

bash <(curl -s https://codecov.io/bash) -t $CODECOV_TOKEN

echo "Code coverage uploaded successfully."