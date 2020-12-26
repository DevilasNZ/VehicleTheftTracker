import requests,sys,mysql.connector,datetime,time
from vehicle import Vehicle

print("starting theft data grabber...")

#grab the password from the password file.
password_file = open("/code/dbPassword.txt","r")
db_password = password_file.readline()
password_file.close()

#establish a connection to the MySQL db.
try:
    db = mysql.connector.connect(
      host="192.168.1.176",
      user='vehicle_theft_tracker',
      password=db_password
    )

    cursor = db.cursor()
    print("successfully connected to the MySQL database.")
except:
    sys.exit("There was an error connecting to the Theft Tracker DB. Is the SQL server running?")

#Main process loop
while True:
    #check when another download is due from the stolen vehicle dataset
    #this should take place daily.

    check_due = False
    check_due_sql = "SELECT date FROM Vehicle_Theft_Tracker.vehicles WHERE date >= NOW() - INTERVAL 1 DAY"
    try:
        cursor.execute(check_due_sql)
        check_due_sql_result = cursor.fetchall()
        if(len(check_due_sql_result) == 0): check_due = True#if no recent results show up, it must be due to check again.
    except:
        print("there was an issue with checking if data was due for an update for the search term " + term.search_name)

    if check_due:
        print("grabbing the stolen vehicle list...")
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
            except:
                print("there was an issue writing a record to the SQL database with the rego " + this_vehicle.rego + ". Is it already in the database?")
    print("done")
    print('Finished running grabber on {}'.format(datetime.datetime.now()),end='\n\n')
    print('tracker will run again in 6 hours.')
    time.sleep(21600)
