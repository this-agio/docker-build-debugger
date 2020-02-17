#! /bin/bash

dockerfile=${1:-Dockerfile}
STEP_COMMAND=${STEP_COMMAND:-"/bin/sh"}
compressedDockerfile=".compressed_dockerfile"
incrementalDockerfile=".incremental_dockerfile"

[[ ! -f "${dockerfile}" ]] && echo "File ${dockerfile} does not exist. Please specify a valid Dockerfile." && exit 1

echo "Debugging the build of ${dockerfile} step by step."
echo "Using step command: ${STEP_COMMAND}"

rm -rf "${compressedDockerfile}"
rm -rf "${incrementalDockerfile}"

cat ${dockerfile}| sed '/^$/d' | perl -p0e 's/[\s]*\\[\s]*/ /s' > ${compressedDockerfile}

while read p; do
  echo "$p" >> ${incrementalDockerfile}
  echo "Incremental is now:"
  cat ${incrementalDockerfile}
  image=`docker build -f "${incrementalDockerfile}" . | sed -rn 's/ ---> ([^\s]*)$/\1/p' | tail -n 1`
  echo "Running ${STEP_COMMAND} on ${image}: docker run -it ${image} ${STEP_COMMAND}"
  bash -c "docker run -it ${image} ${STEP_COMMAND}"
done < ${compressedDockerfile}
