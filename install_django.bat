chcp 1252

cd "backend_django"

python -m venv .venv

call "%cd%\.venv\Scripts\activate.bat" 



pip install -r requirements.txt

start chrome 127.0.0.1:8000

python manage.py runserver 0.0.0.0:8000

pause


