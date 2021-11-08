import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import AuthContext from '../../context/authContext/authContext';
import AuthContextProvidor from '../../context/authContext/authContextProvidor';
import PostCard from '../../containers/postCard';
import ThemeContext from '../../context/themeContext';
import Title from '../../containers/title';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UpdateCheck from '../../containers/updateCheck';
import WhoAmI from '../../containers/updateCheck';
import useGetPosts from '../../apis/getPosts';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  card: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 4,
  },
  text: {
    fontWeight: 'bold',
    marginVertical: 3,
  },
});

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showWhoAmI, setShowWhoAmI] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]);
  const navigator = useNavigation<any>();
  const [user, setUser] = useState<{name: string; email: string; id: number}>();
  const {data, loading: getPostsLoading, error, refetch} = useGetPosts();

  const themeValue = useContext(ThemeContext);
  const authContext= useContext(AuthContext);

  console.log("Auth context", authContext)

  console.log('ReRender');
  useEffect(() => {
    // get token / user data (get user data)
    setUser({
      name: 'demo',
      email: 'demo123@xyz.com',
      id: 1,
    });


    
  }, []);
  useEffect(() => {
    console.log('use Effect for data');
    if (data) {
      console.log('Data updated ', data.length);
      setPosts(data);
    }
  }, [data]);

  useEffect(() => {
    console.log('use effect for Error');
    if (error) {
      console.log(error);
    }
  }, [error]);

  const showPostDetails = (post: any) => {
    navigator.navigate('PostDetails', {
      ...post,
    });
  };

  const refresh = () => {
    refetch();
  };

  const handleAddNewItem = () => {
    navigator.navigate('AddPost');
  };

  const updateItem = (item: any) => {
    navigator.navigate('UpdatePost', {
      ...item,
    });
  };

  const renderItem = ({item, index}: any) => (
    <PostCard
      item={item}
      showPostDetails={showPostDetails}
      updateItem={updateItem}
      currentUser={user}
    />
  );

  const handleShowWhoAmI = () => {
    setShowWhoAmI(!showWhoAmI);
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* <UpdateCheck /> */}
      {/* <Title text={'Posts'} size={'large'} /> */}
      <TouchableOpacity onPress={handleShowWhoAmI}>
        <Text>who am i?</Text>
      </TouchableOpacity>

      {/* switch case */}
      {showWhoAmI && user && <WhoAmI currentUser={user} />}

      <Title text={`welcome again, ${user?.name}`} size={'large'} />
      <TouchableOpacity
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          marginVertical: 5,
        }}
        onPress={handleAddNewItem}>
        <Text>+ Add new post</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={renderItem}
        ListEmptyComponent={() => <Text>Could not find data.</Text>}
        ListFooterComponent={() => {
          return (
            <>
              {getPostsLoading ? (
                <ActivityIndicator size={'large'} />
              ) : (
                <Text>This is it!</Text>
              )}
            </>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
      />
    </View>
  );
};

export default Home;
