echo "RUNNING TEST SUITE\n"

deno test --unstable --allow-all ./modules --coverage=cov_profile
deno coverage cov_profile --lcov > cov_profile.lcov
genhtml -o ./coverage/html/ cov_profile.lcov
rm ./cov_profile.lcov

echo "COVERAGE REPORT PRODUCED AND LCOV REMOVED"