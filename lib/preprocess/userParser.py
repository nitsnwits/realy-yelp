# Parse and create the checking table for data mining process

import json
import csv
from pprint import pprint
from collections import defaultdict
import pandas.io.json as pd

# global vars
outputDataFramesList = []

# TODO: abstract all constants to one file later
dataset = "/Users/neerajsharma/Downloads/yelp_dataset_challenge_academic_dataset/yelp_academic_dataset_user.json"
output_csv = "user_meta.csv"
headersList = ["user_id", "name", "review_count", "friends"]

""""
{
    'type': 'user',
    'user_id': (encrypted user id),
    'name': (first name),
    'review_count': (review count),
    'average_stars': (floating point average, like 4.31),
    'votes': {(vote type): (count)},
    'friends': [(friend user_ids)],
    'elite': [(years_elite)],
    'yelping_since': (date, formatted like '2012-03'),
    'compliments': {
        (compliment_type): (num_compliments_of_this_type),
        ...
    },
    'fans': (num_fans),
}
"""

def string(object):
	if(type(object) is unicode):
		object = object.encode('utf-8')
		return '"' + str(object) + '"'
	elif(type(object) is dict or type(object) is list):
		return '"' + str(object) + '"'
	else:
		return str(object)

def getBaselineDictionary():
	"""
	returns an output dictionary, similar to one line of the needed csv
	"""
	outputDict = {}
	for header in headersList:
		outputDict[header] = 0
	return outputDict

def dictToCsv(dictionary):
	"""
	Given a dictionary, serializes it to a csv string, dictionary is similar to baseline dictionary
	"""
	csvString = string(dictionary[headersList[0]]) + "," + string(dictionary[headersList[1]]) + "," + string(dictionary[headersList[2]]) + "," + string(dictionary[headersList[3]]) + "\n"
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
			outputDict["user_id"] = dataframe["user_id"]
			outputDict["name"] = dataframe["name"]
			outputDict["review_count"] = dataframe["review_count"]
			outputDict["friends"] = dataframe["friends"]

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



	

