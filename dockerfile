FROM ubuntu

#Install dependencies
RUN apt update -y && apt install -y git python3 python3-pip
RUN pip install mysql-connector-python requests

#Clone and run the code
RUN git clone https://github.com/DevilasNZ/VehicleTheftTracker

CMD ["python3","-u","/VehicleTheftTracker/TheftDataGrabber.py"]
