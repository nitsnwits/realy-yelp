# Parse and create the business table for data mining process

import json
import csv
from pprint import pprint
from collections import defaultdict
import pandas.io.json as pd

# global vars
outputDataFramesList = []

# TODO: abstract all constants to one file later
dataset = "/Users/neerajsharma/Downloads/yelp_dataset_challenge_academic_dataset/yelp_academic_dataset_business.json"
output_csv = "business_meta.csv"
headersList = ["business_id", "business_name", "latitude", "longitude", "address", "city", "state", "hours"]

""""
{
    'type': 'business',
    'business_id': (encrypted business id),
    'name': (business name),
    'neighborhoods': [(hood names)],
    'full_address': (localized address),
    'city': (city),
    'state': (state),
    'latitude': latitude,
    'longitude': longitude,
    'stars': (star rating, rounded to half-stars),
    'review_count': review count,
    'categories': [(localized category names)]
    'open': True / False (corresponds to closed, not business hours),
    'hours': {
        (day_of_week): {
            'open': (HH:MM),
            'close': (HH:MM)
        },
        ...
    },
    'attributes': {
        (attribute_name): (attribute_value),
        ...
    },
}
"""

def getBaselineDictionary():
	"""
	returns an output dictionary, similar to one line of the needed csv
	"""
	outputDict = {}
	for header in headersList:
		outputDict[header] = 0
	return outputDict

def string(object):
	if(type(object) is unicode):
		object = object.encode('utf-8')
		return '"' + str(object) + '"'
	elif(type(object) is dict):
		return '"' + str(object) + '"'
	else:
		return str(object)

def dictToCsv(dictionary):
	"""
	Given a dictionary, serializes it to a csv string, dictionary is similar to baseline dictionary
	"""
	csvString = string(dictionary[headersList[0]]) + "," + string(dictionary[headersList[1]]) + "," + string(dictionary[headersList[2]]) + "," + string(dictionary[headersList[3]]) + "," + string(dictionary[headersList[4]]) + "," + string(dictionary[headersList[5]]) + "," + string(dictionary[headersList[6]]) + "," + string(dictionary[headersList[7]]) + "," + "\n"
	return csvString


def parseDataset():
	"""
	parses the dataset and creates list of dictionaries, similar to a baseline dictionary
	"""
	with open(dataset) as datasetFileHandler:
		datarows = datasetFileHandler.readlines()
		for datarow in datarows:
			dataframe = json.loads(datarow)
			outputDict = getBaselineDictionary()
			
			# cleanse DF as per reqs
			try:
				outputDict["business_id"] = dataframe["business_id"]
				outputDict["business_name"] = dataframe["name"]
				outputDict["latitude"] = dataframe["latitude"]
				outputDict["longitude"] = dataframe["longitude"]
				outputDict["address"] = dataframe["full_address"].replace("\n", " ")
				outputDict["city"] = dataframe["city"]
				outputDict["state"] = dataframe["state"]
				if not dataframe["hours"]:
					outputDict["hours"] = {}
				else:
					hoursDict = {}
					for day, timings in dataframe["hours"].iteritems():
						for attr, time in timings.iteritems():
							if(attr == "open"):
								opentime = time
							if(attr == "close"):
								closetime = time
						hoursDict[day] = str(opentime) + "-" + str(closetime)
					outputDict["hours"] = hoursDict
			except:
				print str(dataframe)

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



	

