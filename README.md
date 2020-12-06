# TakeTheControl

This project ...

### Pre-requisites

[Git](https://git-scm.com/)

[Node](https://nodejs.org/en/)

[Yarn](https://yarnpkg.com/)

[Docker](https://www.docker.com/)

[Docker-Compose](https://docs.docker.com/compose/)

## How to run

Clone project:
> git clone <https://github.com/viniciusflores/TakeTheControl.git>

Install dependencies
> yarn

Run in development environment
> yarn dev:server

## How to run - automated tests

Access directory:
> cd automated_test

Install dependencies
> yarn

Run all tests
> yarn cy:test

Open Cy IDE
> yarn cy:open

## FAQ

#### Database: Postgress in Docker

> docker run --name takethecontrol_postgress -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=takethecontrol -p 5432:5432 -d postgres

> docker-compose up -d

#### Database: Create new migration

> yarn typeorm migration:create -n <migration-name>

#### Database: Run migrations

> yarn typeorm migration:run
