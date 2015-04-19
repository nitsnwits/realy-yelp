# Parse and create the checking table for data mining process

import json
import csv
from pprint import pprint
from collections import defaultdict
import pandas.io.json as pd

# global vars
outputDataFramesList = []
weekends = ["0", "6"]
weekdays = [(str(i)) for i in range(1,6)] # 1-5
morning = [(str(i)) for i in range(0,12)] # 0-11
afternoon = [(str(i)) for i in range(12, 17)] # 12-16
evening = [(str(i)) for i in range(17, 24)] # 17-23

# TODO: abstract all constants to one file later
dataset = "/Users/neerajsharma/Downloads/yelp_dataset_challenge_academic_dataset/yelp_academic_dataset_checkin.json"
output_csv = "user_visits_history.csv"
headersList = ["num_of_morning_visits", "num_of_evening_visits", "num_of_afternoon_visits", "num_of_visits_in_weekdays", "num_of_visits_in_weekends", "business_id"]

""""
{
    'type': 'checkin',
    'business_id': (encrypted business id),
    'checkin_info': {
        '0-0': (number of checkins from 00:00 to 01:00 on all Sundays),
        '1-0': (number of checkins from 01:00 to 02:00 on all Sundays),
        ...
        '14-4': (number of checkins from 14:00 to 15:00 on all Thursdays),
        ...
        '23-6': (number of checkins from 23:00 to 00:00 on all Saturdays)
    }, # if there was no checkin for a hour-day block it will not be in the dict
}
"""

def getBaselineDictionary():
	"""
	returns an output dictionary, similar to one line of the needed csv
	"""
	outputDict = {}
	for header in headersList:
		if header == "business_id":
			outputDict[header] = ""
		outputDict[header] = 0
	return outputDict

def dictToCsv(dictionary):
	"""
	Given a dictionary, serializes it to a csv string, dictionary is similar to baseline dictionary
	"""
	csvString = str(dictionary[headersList[0]]) + "," + str(dictionary[headersList[1]]) + "," + str(dictionary[headersList[2]]) + "," + str(dictionary[headersList[3]]) + "," + str(dictionary[headersList[4]]) + "," + str(dictionary[headersList[5]]) + "\n"
	return csvString


def parseDataset():
	"""
	parses the dataset and creates list of dictionaries, similar to a baseline dictionary
	"""
	with open(dataset) as datasetFileHandler:
		datarows = datasetFileHandler.readlines()
		for datarow in datarows:
			dataframe = pd.read_json(datarow)
			outputDict = getBaselineDictionary()

			# cleanse DF as per reqs
			outputDict["business_id"] = dataframe.business_id[0]

			for timeline, number in dataframe.checkin_info.iteritems():
				try:
					hour, day = timeline.split("-")
					if (day in weekends):
						outputDict["num_of_visits_in_weekends"] += number
					if (day in weekdays):
						outputDict["num_of_visits_in_weekdays"] += number
					if (hour in morning):
						outputDict["num_of_morning_visits"] += number
					if (hour in afternoon):
						outputDict["num_of_afternoon_visits"] += number
					if (hour in evening):
						outputDict["num_of_evening_visits"] += number
				except:
					pass

			outputDataFramesList.append(outputDict)

			# control limit for testing, uncomment to test code
			# if(len(outputDataFramesList) == 10):
			# 	break

def writeOutputDataFramesToCsv(outputDataFramesList):
	"""
	Takes the list of dictionaries, writes it to csv as needed
	"""
	headersListToCsv = ",".join(headersList)

	# write headers to csv file
	with open(output_csv, 'w') as csvFileHandler:
		csvFileHandler.write(headersListToCsv)
		csvFileHandler.write("\n")

	# write data to csv file
	with open(output_csv, 'a') as csvFileHandler:
		for df in outputDataFramesList:
			csvFileHandler.write(dictToCsv(df))

def main():
	parseDataset()
	writeOutputDataFramesToCsv(outputDataFramesList)

if __name__ == '__main__':
	main()



	

