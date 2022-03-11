# Assigning the file to variable
# Openning the file
log_file = open("um-server-01.txt")

# declaring methods or function
def sales_reports(log_file):
    #looping in each line of the file
    for line in log_file:
        #striping the right side of a text
        line = line.rstrip()
        #accessing the first value in the line
        day = line[0:3]
        #codition using if
        if day == "Tue":
            #printing each line
            print(line)

#invoking the methods 
sales_reports(log_file)
