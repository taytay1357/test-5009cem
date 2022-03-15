#!/bin/sh
echo "====================================="
echo "      RUNNING THE TEST SUITE         "
echo "====================================="

deno test --unstable --import-map test.json --coverage=cov_profile
deno coverage cov_profile --lcov > cov_profile.lcov
genhtml -o cov_profile/html cov_profile.lcov

echo "====================================="
echo "  TEST SUITE FINISHED LCOV PRODUCED  "
echo "====================================="