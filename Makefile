REPORTER = spec
MOCHA_OPTS = --ui bdd -c

test:
	clear
	echo Starting test *********************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	test
	echo Ending test

.PHONY: test