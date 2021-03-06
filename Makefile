REPORTER = spec
MOCHA_OPTS = --ui bdd -c

test:
	clear
	echo Starting test *********************************************************
	export NODE_ENV=test; \
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	test; \
	export NODE_ENV=development;
	echo Ending test

.PHONY: test
