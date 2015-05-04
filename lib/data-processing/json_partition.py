import json
with open('/home/dhruv/Desktop/cmpe239/yelp_dataset_challenge_academic_dataset/yelp_academic_dataset_review.json') as infile:
  o = json.load(infile)
  chunkSize = 1000
  for i in xrange(0, len(o), chunkSize):
    with open('file_' + str(i//chunkSize) + '.json', 'w') as outfile:
      json.dump(o[i:i+chunkSize], outfile)