### run the api
1. cd src/api
2. docker-compose up

### run client
1. cd src/client 
2. docker build -t candidate_evaluation_client .
3. docker run -dp 4200:80 --name candidate_evaluation_client candidate_evaluation_client
