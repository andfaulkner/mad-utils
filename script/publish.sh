# Ensure 1st argument given
if [[ ! -n "$1" ]]; then
    echo "Must call with new version number as first arg. e.g.:"
    echo "  publish.sh 0.52.5"
    exit
fi

NEW_VERSION_NUMBER=$1

# Ensure 1st argument is semver number
if [[ $NEW_VERSION_NUMBER =~ .*[a-zA-Z].* ]] || [[ ! $NEW_VERSION_NUMBER =~ ^[0-9]+\.[0-9]+\.[0-9]+(\.[0-9]+)?$ ]]; then
  echo "New version number must be in semver format e.g.:"
  echo "0.10.3"
  exit
fi

# Get values from .env config (Javelin and webclient locations)
. ./script/.env

# Ensure Javelin and webclient locations set in .env config
if [[ ! -n "$JAVELIN_DIR" ]] || [[ ! -n "$WEBCLIENT_DIR" ]]; then
    echo "JAVELIN_DIR or WEBCLIENT_DIR is not set"
    echo "Please add JAVELIN_DIR & WEBCLIENT_DIR vars to .env file."
    echo "Set their paths to the Javelin and webclient repos, respectively."
    echo ""
    echo "e.g.:"
    echo "JAVELIN_DIR=~/projects/ohri/CANImmunize-Javelin"
    echo "WEBCLIENT_DIR=~/projects/ohri/canimmunize-web-client-v2"
    echo ""
    exit
fi

# Git aliases for convenience
alias g_curbr="git status | head -1 | awk '{print \$3}'"
alias gpocur='echo "$(g_curbr)" | xargs git push origin'

# Push current branch and create a new tag
gpocur

# Replace the version number in package.json
replace-in-file /\"version\":\ *\"[0-9]+\.[0-9]+\.[0-9]+\.?[0-9]?[0-9]?[0-9]?[0-9]?/g "\"version\": \"$NEW_VERSION_NUMBER\"" package.json --isRegex
replace-in-file /mad\-utils\.git#v[0-9]+\.[0-9]+\.[0-9]+\.?[0-9]?[0-9]?[0-9]?[0-9]?\"/g "mad-utils.git#v$NEW_VERSION_NUMBER\"" package.json --isRegex

# # git: Add, commit, and push package.json change to repo, then publish new version
git add package.json
git commit -m "Bump to version $NEW_VERSION_NUMBER"
# git push origin master
# git tag v$1
# git push origin v$1
# npm publish
# echo "Published v$1 of $(curdir)!"

# # # gojavelin
# # pushd $JAVELIN_DIR
# # yarn remove mad-utils
# # yarn add mad-utils
# # git add package.json yarn.lock
# # git commit -m "Upgraded mad-utils to v$NEW_VERSION_NUMBER"
# # gpocur
# # gowebclient

# # # gowebclient
# # pushd $WEBCLIENT_DIR
# # yarn remove mad-utils
# # yarn add mad-utils
# # git add package.json yarn.lock
# # git commit -m "Upgraded mad-utils to v$NEW_VERSION_NUMBER"
# # gpocur

# # # Start webclient build again
# # ./common-cmds clean
