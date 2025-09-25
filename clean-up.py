
import os
os.system('''docker compose down -v
docker system prune -f
docker compose up --build -d
docker compose logs -f
''')
