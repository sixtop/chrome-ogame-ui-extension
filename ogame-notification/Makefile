get:
	aws lambda get-function --function-name ogame-scheduler-notification

deploy:
	chmod 777 * -R
	zip -r function.zip .
	aws lambda update-function-code --function-name ogame-scheduler-notification --zip-file fileb://function.zip
	rm function.zip	
		