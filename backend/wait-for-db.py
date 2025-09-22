import time
from decouple import config
import psycopg2
from psycopg2 import OperationalError

def wait_for_db():
    print("⏳ Attente de PostgreSQL...")
    db_config = {
        'host': config('POSTGRES_HOST', default='db'),
        'port': config('POSTGRES_PORT', default='5432'),
        'user': config('POSTGRES_USER'),
        'password': config('POSTGRES_PASSWORD'),
        'database': config('POSTGRES_DB'),
    }
    
    while True:
        try:
            conn = psycopg2.connect(**db_config)
            conn.close()
            print("PostgreSQL prêt!")
            break
        except OperationalError:
            print("PostgreSQL pas encore prêt...")
            time.sleep(2)

if __name__ == '__main__':
    wait_for_db()