export PATH=$PATH:/opt/bitnami/nodejs/bin/
forever stopall || true  # true stops script exit code 1 (will stop deploy process) if no servers to stop