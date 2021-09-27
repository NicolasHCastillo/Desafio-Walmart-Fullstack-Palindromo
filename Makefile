project-build:
	docker-compose build

project-up:
	docker-compose up

project-up-background:
	docker-compose up -d

project-execute-background:
	make project-build
	make project-up-background

project-execute:
	make project-build
	make project-up

project-down:
	docker-compose down

project-test:
	docker-compose run backend_test
