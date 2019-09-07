get:
	aws lambda get-function --function-name ogame-request-parser

deploy:
	chmod 777 * -R
	zip -r function.zip .
	aws lambda update-function-code --function-name ogame-request-parser --zip-file fileb://function.zip
	rm function.zip
		