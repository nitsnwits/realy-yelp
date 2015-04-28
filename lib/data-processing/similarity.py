import pandas as pd 

df = pd.read_csv("/home/dhruv/Desktop/cmpe239/REALLY_Yelp/reviews.csv",error_bad_lines=False)

print df.shape[0]
