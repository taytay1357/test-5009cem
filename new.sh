echo "RUNNING TEST SUITE"

rm -r -f ./coverage/
rm -r -f ./cov_profile/
deno test --unstable --allow-all ./modules --coverage=cov_profile
deno coverage cov_profile --lcov > cov_profile.lcov
genhtml -o ./coverage/html/ cov_profile.lcov
rm -r -f ./cov_profile/

echo "COVERAGE REPORT PRODUCED AND LCOV REMOVED"