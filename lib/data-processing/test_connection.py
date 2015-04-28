from pymongo import MongoClient
client = MongoClient('localhost', 27017)


db = client.test

collection = db.test_collection
example = {'key' : ["-4A5xmN21zi_TXnUESauUQ", "-AAig9FG0s8gYE4f8GfowQ"],
			'val': [1.0, 5]}

collection.insert(example)

