# Parse and create the reviews table for data mining process

import json
import csv
from pprint import pprint
from collections import defaultdict
import pandas.io.json as pd

# global vars
outputDataFramesList = []

# TODO: abstract all constants to one file later
business_dataset = "/Users/neerajsharma/Downloads/yelp_dataset_challenge_academic_dataset/yelp_academic_dataset_business.json"
review_dataset = "/Users/neerajsharma/Downloads/yelp_dataset_challenge_academic_dataset/yelp_academic_dataset_review.json"
user_dataset = "/Users/neerajsharma/Downloads/yelp_dataset_challenge_academic_dataset/yelp_academic_dataset_user.json"
output_csv = "reviews.csv"
headersList = ["user_id", "business_id", "review_id", "stars", "categories", "business_avg", "business_review_count", "user_avg","user_review_count"]
globalDict = defaultdict(list)
businessDict = defaultdict(list)

# used for pointing to dictionary positions
user_id = 0
business_id = 1
review_id = 2
stars = 3
categories = 4
business_avg = 5
business_review_count = 6
user_avg = 7
user_review_count = 8

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

{
    'type': 'review',
    'business_id': (encrypted business id),
    'user_id': (encrypted user id),
    'stars': (star rating, rounded to half-stars),
    'text': (review text),
    'date': (date, formatted like '2012-03-14'),
    'votes': {(vote type): (count)},
}

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
    csvString = string(dictionary[headersList[0]]) + "," + string(dictionary[headersList[1]]) + "," + string(dictionary[headersList[2]]) + "," + string(dictionary[headersList[3]]) + "," + string(dictionary[headersList[4]]) + "," + string(dictionary[headersList[5]]) + "," + string(dictionary[headersList[6]]) + "," + string(dictionary[headersList[7]]) + "," + string(dictionary[headersList[8]]) + "," + "\n"
    return csvString

def listToCsv(listOfValues):
    """
    Given a list, serialize into a csv based on header values
    """
    csvString = string(listOfValues[0]) + "," + string(listOfValues[1]) + "," + string(listOfValues[2]) + "," + string(listOfValues[3]) + "," + string(listOfValues[4]) + "," + string(listOfValues[5]) + "," + string(listOfValues[6]) + "," + string(listOfValues[7]) + "," + string(listOfValues[8]) + "\n"
    return csvString

def controlExecution():
    if(len(globalDict) == 10):
        return True
    return False

def parseReviews():
    """
    Parses reviews and makes a dictionary. Key: user_id Value: List of values needed
    """
    with open(review_dataset) as datasetFileHandler:
        datarows = datasetFileHandler.readlines()
        for datarow in datarows:
            dataframe = json.loads(datarow)
            key = dataframe["user_id"]
            globalDict[key].append([])
            for i in range(0, len(headersList)):
                globalDict[key][-1].append(0)
            globalDict[key][-1][user_id] = dataframe["user_id"]
            globalDict[key][-1][business_id] = dataframe["business_id"]
            globalDict[key][-1][review_id] = dataframe["review_id"]
            globalDict[key][-1][stars] = dataframe["stars"]

            # control limit for testing, uncomment to test code
            # if controlExecution() == True:
            #     print globalDict
            #     break

def parseUsers():
    """
    Parse users and update global dict with the required information
    """
    with open(user_dataset) as datasetFileHandler:
        datarows = datasetFileHandler.readlines()
        for datarow in datarows:
            dataframe = json.loads(datarow)
            key = dataframe["user_id"]
            if key in globalDict:
                for i in range(0, len(globalDict[key])):
                    globalDict[key][i][user_review_count] = dataframe["review_count"]
                    globalDict[key][i][user_avg] = dataframe["average_stars"]

def parseBusiness():
    """
    Parse business and update global dict with the required information
    """
    with open(business_dataset) as datasetFileHandler:
        datarows = datasetFileHandler.readlines()
        for datarow in datarows:
            dataframe = json.loads(datarow)
            key = dataframe["business_id"]
            businessDict[key].append(dataframe["stars"])
            businessDict[key].append(dataframe["review_count"])
            businessDict[key].append(dataframe["categories"])

    # update global dict with the info
    for user_id in globalDict:
        for i in range(0, len(globalDict[user_id])):
            temp_business_id = globalDict[user_id][i][business_id]
            if temp_business_id in businessDict:
                globalDict[user_id][i][business_avg] = businessDict[temp_business_id][0]
                globalDict[user_id][i][business_review_count] = businessDict[temp_business_id][1]
                globalDict[user_id][i][categories] = businessDict[temp_business_id][2]



def writeOutputDataFramesToCsv(outputDict):
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
        for key in outputDict:
            for i in range(0, len(outputDict[key])):
                csvFileHandler.write(listToCsv(outputDict[key][i]))

def main():
    parseReviews()
    parseUsers()
    parseBusiness()
    writeOutputDataFramesToCsv(globalDict)

if __name__ == '__main__':
    main()