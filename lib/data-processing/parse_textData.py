
import simplejson
import ast
from pymongo import MongoClient

# client = MongoClient('localhost', 27017)
# db = client.Really_Yelp

# collection = db.hotel_similarity

# bizpairs = [[ast.literal_eval(j) for j in line.strip().split("\t")] for line in open("/home/dhruv/Desktop/cmpe239/REALLY_Yelp/realy-yelp/lib/data-processing/data/hotel_sim.txt")]
# for bp,corrs in bizpairs:
#      b1,b2=bp
#      sim , com_sup = corrs

#      row = {"restaurant1": b1, "restaurant2" : b2 , "similarity":sim, "common_support":com_sup }
#      collection.insert(row)






if __name__ == '__main__':
	

	bizpairs = [[ast.literal_eval(j) for j in line.strip().split("\t")] for line in open("/home/dhruv/Desktop/cmpe239/REALLY_Yelp/realy-yelp/lib/data-processing/test.txt")]
	for bp,corrs in bizpairs:
		b1,b2=bp
		sim , com_sup = corrs
		row = {"restaurant1": b1, "restaurant2" : b2 , "similarity":sim, "common_support":com_sup }
		print
		row = simplejson.loads(row)
		print row