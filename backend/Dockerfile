FROM python:3.12.11-alpine3.21

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN apk add --no-cache postgresql-client

COPY . .

EXPOSE ${API_PORT}

CMD ["python", "manage.py", "runserver", "0.0.0.0:${API_PORT}"]