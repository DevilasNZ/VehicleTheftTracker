import requests,sys,mysql.connector,datetime,time,os
from vehicle import Vehicle

print("starting theft data grabber...")

#establish a connection to the MySQL db.
try:
    db = mysql.connector.connect(
      host=os.getenv('DB_HOST'),
      user=os.getenv('DB_USER'),
      password=os.getenv('DB_PASSWORD')
    )

    cursor = db.cursor()
    print("successfully connected to the MySQL database.")
except:
    sys.exit("There was an error connecting to the Theft Tracker DB. Is the SQL server running?")

#Main process loop
while True:
    print("grabbing the stolen vehicle list...")
    non_added_regos = []
    added_records_count = 0

    try:
        raw_vehicle_data = requests.get("https://www.police.govt.nz/stolenwanted/vehicles/csv/download?tid=&all=true&gzip=false")
        print("done.")
    except:
        sys.exit("Failed to get the raw vehicle data. Has the URL changed, or is the website down?")

    #process the csv.
    print("processing data and writing to MySQL...")
    vehicle_data_lines = raw_vehicle_data.text.split("\n")[0:-1]
    vehicles = []

    for line in vehicle_data_lines:
        this_vehicle = Vehicle(line)
        sql = "INSERT INTO `Vehicle_Theft_Tracker`.`vehicles`(`rego`,`colour`,`make`,`model`,`year`,`type`,`date`,`location`) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
        vehicle_values = this_vehicle.get_sql_tuple()

        try:
            cursor.execute(sql,vehicle_values)
            db.commit()
            added_records_count += 1
        except:
            non_added_regos.append(this_vehicle.rego)

    print("done")
    print('Finished running grabber on {}. A total of {} records were added'.format(datetime.datetime.now(),str(added_records_count)),end='\n\n')
    print('errors occured on vehicles with these registration numbers (chances are they are already in the db): ' + str(non_added_regos),end='\n\n')

    # run the tracker every 6 hours.
    print('tracker will run again in 6 hours.')
    time.sleep(21600)
