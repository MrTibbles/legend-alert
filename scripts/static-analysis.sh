#!/bin/bash

main() {
  check_eslint
  check_prettier

  echo "All src files are formatted correctly 🤙"
}

check_eslint() {
  eslint --quiet 'src/**/*.{js,ts,tsx}'

  exitStatus=$?
  if [[ $exitStatus -ne 0 ]]; then
    exit $exitStatus
  fi
}

check_prettier() {
  local ugly="$(prettier --list-different 'src/**/*.{js,ts,tsx}')"

  if [[ "${ugly}" != "" ]]; then
    cat >&2 <<ERROR
The following files are formatted correctly:
${ugly}

ERROR
    exit 1
  fi
}

main "$@"
