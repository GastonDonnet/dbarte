chcp 1252

python -m venv .venv

call "%cd%\backend_django\.venv\Scripts\activate.bat" 

pip install -r requirements.txt

cd "backend_django/dbarte"

start chrome 127.0.0.1:8000

python manage.py runserver 0.0.0.0:8000

pause


