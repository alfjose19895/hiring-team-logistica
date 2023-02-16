FROM python:3.11
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install mysql-connector-python
ENTRYPOINT python -m uvicorn --host 0.0.0.0 api:app --reload