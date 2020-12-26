from datetime import datetime

#store vehicle data in this class.
class Vehicle:
    def __init__(self,rawline):
        split_data = rawline.split(',')

        self.rego = split_data[0]
        self.colour = split_data[1]
        self.make = split_data[2]
        self.model = split_data[3]
        self.year = int(split_data[4])
        self.type = split_data[5]
        self.date = datetime.strptime(split_data[6],'%Y-%m-%d')
        self.location= split_data[7]

    def get_sql_tuple(self):
        return (self.rego,self.colour,self.make,self.model,self.year,self.type,self.date,self.location)
