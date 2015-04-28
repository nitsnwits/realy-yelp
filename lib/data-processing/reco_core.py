from collections import defaultdict
import json

import numpy as np
import scipy as sp
import matplotlib.pyplot as plt
import pandas as pd

from matplotlib import rcParams
import matplotlib.cm as cm
import matplotlib as mpl

reviews = pd.read("/home/dhruv/Desktop/cmpe239/data/bigdf.csv")
df = pd.concat(reviews, ignore_index=True)
print df.shape[0]
# print reviews['user_id'].head()
# print "number of reviews: ",reviews.shape[0]
# print "number of users: ",reviews.user_id.unique().shape[0]," number of businesses: ",reviews.business_id.unique().shape[0]

# def recompute_frame(ldf):
#     """
#     takes a dataframe ldf, makes a copy of it, and returns the copy
#     with all averages and review counts recomputed
#     this is used when a frame is subsetted.
#     """
#     ldfu=ldf.groupby('user_id')
#     ldfb=ldf.groupby('business_id')
#     user_avg=ldfu.stars.mean()
#     user_review_count=ldfu.review_id.count()
#     business_avg=ldfb.stars.mean()
#     business_review_count=ldfb.review_id.count()
#     nldf=ldf.copy()
#     nldf.set_index(['business_id'], inplace=True)
#     nldf['business_avg']=business_avg
#     nldf['business_review_count']=business_review_count
#     nldf.reset_index(inplace=True)
#     nldf.set_index(['user_id'], inplace=True)
#     nldf['user_avg']=user_avg
#     nldf['user_review_count']=user_review_count
#     nldf.reset_index(inplace=True)
#     return nldf

# smallidf=reviews[(reviews.user_review_count > 60) & (reviews.business_review_count > 150)]
# smalldf=recompute_frame(smallidf)

# print "For smaller data:"
# print "number of reviews: ",smalldf.shape[0]
# print "number of users: ",smalldf.user_id.unique().shape[0]," number of businesses: ",smalldf.business_id.unique().shape[0]



