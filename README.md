# Md. Minul Islam Shovon
## ECE'15, RUET
#### Linkedin: https://www.linkedin.com/in/mainulislam588/

## What is this repository?
This repository contain codes for a super interactive todo list project with basic operations (Add/Delete/Edit/Done).
The frontend is coded using ReactJs and for backend django is being used and they are connected using 
django rest framework.

## How to get it working?
=> Clone the repository:
```
git clone https://github.com/Shovon588/react-to-do-list.git
```
=> Create a virtual environment and activate it
```
i. virtualenv venv
ii. For windows: venv/Scripts/activate
ii. For Ubuntu: source venv/bin/activate
```
=> install required files
```
pip install -r requirements.txt
```

## Now you need to start server for both django and react
### Backend (Django):
Go to backend folder where manage.py file is located using ```cd backend``` command. Make sure the virtual environment is activated.

Then run ```python manage.py runserver``` command to start the django server. 

Go to ```http://127.0.0.1:8000/api/todos/``` to see the data.


### Frontend (ReactJs)
Go to frontend folder where package.json file is located using ```cd frontend``` command.

Install the project using ```npm install``` command.

Then after finishing installing run ```npm run``` to run the project.

Go to ```http://localhost:3000/``` to see the frontend and now you should be able to use the project.
