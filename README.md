# Polarsec-task
## Part2:
1. Horizontal Scaling with Load Balancing.
Distribute the load across multiple instances of your application running on separate servers.
- Containerize your Application
- Deploy Multiple Instances
- Implement Load Balancing
2. Rate Limiting
Allow a certain number of requests within a specific time window (e.g., 10 requests per minute).

## How to run:
- Docker file attached to project + .env file with credentials to DataBase.
- after image build completed RUN
docker run -d --name <container_name> -p 9001:9001 -e DB_NAME='users' -e DB_CONN_STRING='mongodb+srv://starship:w4aQo0m6mzqORPAx@starship.lcyoltw.mongodb.net/' -e COLLECTION_NAME='user_details' my_app