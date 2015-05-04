from mrjob.job import MRJob 
from itertools import combinations, permutations
from scipy.stats.stats import pearsonr
import numpy as np
import pandas as pd

#from Database import Database 
import simplejson


class item_similarity(MRJob):
	#specify output protocal as json
	#OUTPUT_PROTOCOL = JSONProtocol

	def steps(self):

		thesteps = [
			self.mr(mapper = self.userid_mapper , reducer = self.users_items_collector),
			self.mr(mapper = self.pair_items_mapper , reducer = self.calculate_similarity_collector)
		]
		return thesteps
       
        

	def userid_mapper(self , _ , line):
		
		user_id,business_id,stars,business_avg,user_avg=line.split(',')
		yield user_id , (business_id,stars,business_avg,user_avg)

	def users_items_collector(self, user_id, values):
		ratings = []
		
		for business_id,stars,business_avg,user_avg in values:
			ratings.append((business_id , (stars , user_avg)))
		yield user_id , ratings

	def pair_items_mapper(self , user_id , ratings):
		
		for biz1tuple , biz2tuple in combinations (ratings , 2):
			
			biz1 , biz1_ratings = biz1tuple
			biz2 , biz2_ratings = biz2tuple

			if(biz1 <= biz2):
				yield (biz1 , biz2) , (biz1_ratings , biz2_ratings)
			else:
				yield (biz2 , biz1) , (biz2_ratings , biz1_ratings)

	def calculate_similarity_collector(self , key , values):
		
		(rest1 , rest2) , common_ratings = key , values
		diff1 = []
		diff2 = []
		n_common = 0

		for ratings1 , ratings2  in common_ratings:
			diff1.append(float(ratings1[0]) - float(ratings1[1]))
			diff2.append(float(ratings2[0]) - float(ratings2[1]))
			n_common = n_common+1
		if n_common == 0:
			rho = 0.
		else: 
			rho = pearsonr(diff1 , diff2)[0]
			if np.isnan(rho):
				rho = 0.
		normlize_sim = (rho*n_common)/(n_common+10)		
		yield(rest1 , rest2) , (normlize_sim , n_common)

	


def make_database_from_pairs(df, bizpairs):
    """
    make the database from the pairs returned from mrjob.
    df is the dataframe, smalldf or fulldf.
    bizpairs are a list of elements, each of which is a list of two
        lists. The first of these lists has the two business id's, while
        the second has the similarity and the common support
    Returns an instance of the Database class.
    """
    dbase=Database(df)
    cache={}
    for bp,corrs in bizpairs:
        b1,b2=bp
        i1=dbase.uniquebizids[b1]
        i2=dbase.uniquebizids[b2]
        sim,nsup=corrs
        dbase.database_sim[i1][i2]=sim
        dbase.database_sim[i2][i1]=sim
        dbase.database_sup[i1][i2]=nsup
        dbase.database_sup[i2][i1]=nsup
        if cache.has_key(b1):
            nsup1=cache[b1]
        else:
            nsup1=dbase.df[dbase.df.business_id==b1].user_id.count()
            cache[b1]=nsup1
        if cache.has_key(b2):
            nsup2=cache[b2]
        else:
            nsup2=dbase.df[dbase.df.business_id==b2].user_id.count()
            cache[b2]=nsup2
        dbase.database_sim[i1][i1]=1.0
        dbase.database_sim[i2][i2]=1.0
        dbase.database_sup[i1][i1]=nsup1
        dbase.database_sup[i2][i2]=nsup2
    return dbase

if __name__ == '__main__':
	result =  item_similarity.run()
	
	
	 
