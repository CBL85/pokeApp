import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import IPost from '@/api/interfaces/IPost';
import { getPosts } from '@/api/placeHolderApi';

const HolderScreen = () => {
  const [data, setData] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (): Promise<void> => {
    console.log('llamando al fetchdata....');
    if(loading) return;
    setLoading(true);
    try {
      const newPost = await getPosts(page);
      setData((prevPost) => [...prevPost, ...newPost ]);
      setPage((prevPage)=> prevPage + 1);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}: {item: IPost}) => (
          <TouchableOpacity className="p-5 mb-2 bg-gray-200 rounded-lg shadow-md">
            <Text className="text-lg font-semibold text-gray-800">{item.id} - {item.title}</Text>
          </TouchableOpacity>
        )}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (<ActivityIndicator className="mt-4" size="large" color="#5cd65c"/>): null
        }
      />
    </View>
  )
}

export default HolderScreen;

/*
onEndReached 
onEndReachedThreshold
*/