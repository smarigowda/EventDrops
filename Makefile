run:
	./node_modules/webpack-dev-server/bin/webpack-dev-server.js --colors --devtool cheap-module-inline-source-map --host=0.0.0.0

build:
	./node_modules/webpack/bin/webpack.js -p --optimize-minimize --optimize-occurence-order --optimize-dedupe --progress --devtool source-map

test: karma mocha

test-watch:
	./node_modules/.bin/babel-node ./node_modules/.bin/karma start test/karma/karma.conf.js

karma:
	./node_modules/karma/bin/karma start test/karma/karma.conf.js --single-run

mocha:
	./node_modules/mocha/bin/mocha --compilers js:mocha-traceur --recursive test/mocha

install:
	npm install
