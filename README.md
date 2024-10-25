# atropos-takehome

## Getting Started

To startup the project, ensure you have `docker` installed and run `docker-compose build`, followed by `docker-compose up`.

To run tests, ensure you have `jest` installed and run `npm run test`.

- Currently the only tests are unit tests which mock the underlying postgres and redis servers, so these can be run independently of a spun-up app.

## Summary

This project is a full-stack to simulate the initiation, and management of long-running tasks. The front-end is built with React, using Typescript and a modern ES6-modules-based Vite dev server. The React production build is served from the same Node-based Express server which exposes the simple task management API. The application API utilizes a Redis-based Bull queue for asynchronous task management with Bull background workers picking up and simulating long-running tasks. Task metadata is stored in a PostgreSQL DB for easy reference. The application code is containerized and the entire project setup is orchestrated using docker-compose v2.

This project is pretty bare bones but aims to demonstrate important concepts in full-stack application development. Given no performance or throughput requirements, no cloud service integration was added. Before release, there are many additional improvements that one would seek to accomplish, both in terms of product features and infrastructure/monitoring.
