import pandas as pd 

df = pd.read_csv("/home/dhruv/Desktop/cmpe239/REALLY_Yelp/realy-yelp/lib/preprocess/data/reviews.csv",error_bad_lines=False)

Restaurants = []
# Restaurants.Mexican = []
# Restaurants.Seafood = []
# Restaurants.Steakhouses = []
# Restaurants.Breakfast_Brunch = []
# Restaurants.Burgers = []
# Restaurants.Chinese = []
# Restaurants.Indian = []
# Restaurants.American = []
Bars = []
Shopping = []
Gym = []
Books = []
columns  = ['user_id','business_id','review_id','stars','categories','business_avg','business_review_count','user_avg','user_review_count' ]
for index , row in df.iterrows():
	if 'Restaurants' in row['categories']: #Sushi Bars ,Seafood', u'Steakhouses , Breakfast & Brunch, Burgers Pizza, Chinese , Indian, American
		Restaurants.append(row)
	if 'Bars'  in row['categories']:  #or 'Nightlife' 
  		Bars.append(row)
	if 'Shopping' in row['categories']: # or 'Beauty & Spas' or 'Hair Salons' or 'Day Spas' 'Fashion' or
		Shopping.append(row)
	if 'Books' in row['categories']: # or 'Beauty & Spas' or 'Hair Salons' or 'Day Spas' 'Fashion' or
		Books.append(row)
	if 'Gym' in row['categories']: # or 'Beauty & Spas' or 'Hair Salons' or 'Day Spas' 'Fashion' or
		Gym.append(row)	
	#Music & DVDs', u'Books
	#Active Life', u'Gyms', u'Pilates', u'Cycling Classes', u'Fitness & Instruction'	
	#Juice Bars & Smoothies', u'Bubble Tea
Rest_df = pd.DataFrame(Restaurants , columns = columns)
Bars_df = pd.DataFrame( Bars , columns = columns)
Shopping_df = pd.DataFrame( Shopping , columns = columns)
Gym_df = pd.DataFrame( Gym , columns = columns)
Books_df = pd.DataFrame( Books , columns = columns)

subsetoffull_rest=Rest_df[['user_id','business_id', 'stars','business_avg','user_avg']]
subsetoffull_bars=Bars_df[['user_id','business_id', 'stars','business_avg','user_avg']]
subsetoffull_shopping=Shopping_df[['user_id','business_id', 'stars','business_avg','user_avg']]
subsetoffull_gym=Gym_df[['user_id','business_id', 'stars','business_avg','user_avg']]
subsetoffull_books=Books_df[['user_id','business_id', 'stars','business_avg','user_avg']]


subsetoffull_rest.to_csv("data/hotel_data.csv", index=False, header=False )
subsetoffull_bars.to_csv("data/bars_data.csv",  index=False, header=False )
subsetoffull_shopping.to_csv("data/shopping_data.csv", index=False, header=False )
subsetoffull_gym.to_csv("data/gym_data.csv",  index=False, header=False)
subsetoffull_books.to_csv("data/books_data.csv",  index=False, header=False)

print 'Rest size',subsetoffull_rest.head()
print 'bars size',subsetoffull_bars.head()
print 'shopping size',Shopping_df.head()
print 'Gym size' , Gym_df.head()
print  'Books size' , Books_df.head()