import peewee
import configparser
config = configparser.ConfigParser()
config.read('config.ini') 

db=config['DEFAULT']['DB_NAME']
host=config['DEFAULT']['DB_HOST']
user=config['DEFAULT']['DB_USER']
password=config['DEFAULT']['DB_PASSWORD']
port=int(config['DEFAULT']['DB_PORT'])
database= peewee.MySQLDatabase(db, host=host ,user=user ,password= password ,port=port)
#database= peewee.MySQLDatabase("funiber",host="localhost",user="root",password="", port=3306)